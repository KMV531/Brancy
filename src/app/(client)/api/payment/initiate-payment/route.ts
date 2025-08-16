import { NextResponse } from "next/server";
import { writeClient } from "@/sanity/lib/client";
import { getTranzakToken } from "@/lib/tranzak-utils";

type CartItem = {
  _id: string;
  title: string;
  variantLabel?: string;
  price: number;
  quantity: number;
  image: { asset?: { _ref?: string } }; // assuming you attach this
};

type Customer = {
  firstName: string;
  lastName: string;
  company: string;
  email: string;
  phone: string;
  address: string;
  district: string;
  country: string;
  postcode: string;
};

type RequestBody = {
  totalAmount: number;
  customer?: Customer;
  cartItems: CartItem[];
  description?: string;
  phone?: string;
  discountAmount?: number;
  paymentMethod?: "mobile" | "bank" | "card";
  bankDetails?: { accountNumber?: string; bankCode?: string };
  clerkUserId?: string; // 👈 Add this
};

export async function POST(request: Request) {
  try {
    const body: RequestBody = await request.json();

    const transactionRef = `ORDER-${Date.now()}`;
    const token = await getTranzakToken();

    const paymentPayload = {
      amount: body.totalAmount,
      currencyCode: "XAF",
      description: "Purchase on MyStore",
      payerNote: `Order - ${body?.customer?.firstName} ${body?.customer?.lastName}`,
      customer: body.customer,
      cartItems: body.cartItems,
      mchTransactionRef: transactionRef,
      returnUrl: `${process.env.NEXT_PUBLIC_URL}/payment-success`,
      cancelUrl: `${process.env.NEXT_PUBLIC_URL}/checkout`,
      callbackUrl: `${process.env.NEXT_PUBLIC_MERCHANT_URL}/api/payment/webhook`,
      paymentChannel:
        body.paymentMethod === "mobile"
          ? "MWALLET"
          : body.paymentMethod === "card"
            ? "CARD"
            : "BANK",
      receivingEntityName: "Brancy",
      transactionTag: `client-${body.phone || "N/A"}`,
      serviceDiscountAmount: body.discountAmount || 0,
      customization: {
        title: "Brancy - Paiement sécurisé",
        logoUrl: `${process.env.NEXT_PUBLIC_URL}/assets/logo.webp`,
      },
      mobileWalletNumber:
        body.paymentMethod === "mobile" ? body.phone : undefined,
      bankAccountNumber:
        body.paymentMethod === "bank"
          ? body.bankDetails?.accountNumber
          : undefined,
      bankCode:
        body.paymentMethod === "bank" ? body.bankDetails?.bankCode : undefined,
    };

    const response = await fetch(
      `${process.env.TRANZAK_BASE_URL}/xp021/v1/request/create`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          "X-App-ID": process.env.TRANZAK_APP_ID || "",
        },
        body: JSON.stringify(paymentPayload),
      }
    );

    const data = await response.json();
    console.log("✅ Tranzak response:", data);

    const redirectUrl =
      data?.data?.redirectUrl ||
      data?.data?.paymentUrl ||
      data?.data?.links?.paymentAuthUrl;

    if (!redirectUrl) {
      console.error("❌ No redirect URL returned from Tranzak");
      return NextResponse.json(
        { error: "No redirect URL from Tranzak" },
        { status: 500 }
      );
    }

    // Save order to Sanity
    await writeClient.create({
      _type: "order",
      transactionRef,
      resourceId: data.data.requestId,
      paymentStatus: "pending",
      amount: body.totalAmount,
      currency: "XAF",
      paymentMethod: body.paymentMethod,
      clerkUserId: body.clerkUserId || "", // 👈 Store it here
      customer: body.customer,
      items: body.cartItems.map((item) => ({
        _key: `${item._id}`,
        name: item.title,
        variant: item.variantLabel,
        price: item.price,
        quantity: item.quantity,
        productImage: item.image?.asset?._ref
          ? {
              _type: "image",
              asset: {
                _type: "reference",
                _ref: item.image.asset._ref,
              },
            }
          : null,
      })),
      payerNote: `Brancy Order - ${body?.customer?.firstName || "Client inconnu"}`,
      createdAt: new Date().toISOString(),
    });

    return NextResponse.json({ paymentUrl: redirectUrl });
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Internal server error",
      },
      { status: 500 }
    );
  }
}
