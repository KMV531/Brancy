import { NextResponse } from "next/server";
import { writeClient } from "@/sanity/lib/client";
import { getTranzakToken } from "@/lib/tranzak-utils";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const transactionRef = `ORDER-${Date.now()}`;
    const token = await getTranzakToken();

    const paymentPayload = {
      amount: body.totalAmount,
      currencyCode: "XAF",
      description: "Purchase on MyStore",
      payerNote: `Order - ${body.customer.firstName} ${body.customer.lastName}`,
      customer: body.customer,
      cartItems: body.cartItems,
      mchTransactionRef: transactionRef,
      returnUrl: `${process.env.NEXT_PUBLIC_URL}/payment-success`,
      cancelUrl: `${process.env.NEXT_PUBLIC_URL}/checkout`,
      callbackUrl: `${process.env.NEXT_PUBLIC_URL}/api/payment/webhook`,
      paymentChannel: body.paymentMethod.toUpperCase(),
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
    const redirectUrl = data?.data?.redirectUrl;

    // Save order to Sanity
    await writeClient.create({
      _type: "order",
      transactionRef,
      resourceId: data.data.requestId,
      paymentStatus: "pending",
      amount: body.totalAmount,
      currency: "XAF",
      paymentMethod: body.paymentMethod,
      customer: body.customer,
      items: body.cartItems,
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
