"use client";

import { useEffect, useState } from "react";
import { useCartStore } from "@/store/useCartStore";
import { toast } from "sonner";
import { useUser } from "@clerk/nextjs";

const countries = [
  "United Kingdom",
  "France",
  "Germany",
  "United States",
  // add more
];

const districts = [
  "District 1",
  "District 2",
  "District 3",
  // add more
];

// Define prop types
interface CartItemProps {
  _id: string;
  title: string;
  variantLabel?: string;
  price: number;
  quantity: number;
  image: string // assuming you attach this;
}

interface CheckoutPageProps {
  cartItems: CartItemProps[];
  shippingCost: number;
}

export default function CheckoutDetail({
  cartItems,
  shippingCost,
}: CheckoutPageProps) {
  const clearCart = useCartStore((state) => state.clearCart);
  const { user, isSignedIn } = useUser();

  // Form state
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    company: "",
    country: "",
    streetAddress1: "",
    houseNumber: "",
    streetAddress2: "",
    apartment: "",
    city: "",
    district: "",
    postcode: "",
    phone: "",
    email: user?.primaryEmailAddress?.emailAddress || "",
  });

  const [termsAccepted, setTermsAccepted] = useState(false);
  const [loading, setLoading] = useState(false);



  // Handle input change
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

      useEffect(() => {
    if (isSignedIn && user) {
      setForm((prev) => ({
        ...prev,
        email: user.primaryEmailAddress?.emailAddress || "",
      }));
    }
  }, [isSignedIn, user]);

  // Basic validation for required fields
  const requiredFields = [
    "firstName",
    "lastName",
    "country",
    "streetAddress1",
    "city",
    "district",
  ];

  const isFormValid =
    requiredFields.every(
      (field) => form[field as keyof typeof form].trim() !== ""
    ) && termsAccepted;

  // Calculate subtotal
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const total = subtotal + shippingCost;

  // **Trigger Tranzak payment**
  const handleTranzakPayment = async () => {
    if (!isFormValid) {
      toast.error("Please fill in required fields and accept terms");
      return;
    }

    setLoading(true);

    try {
      const payload = {
        totalAmount: total,
        customer: {
          firstName: form.firstName,
          lastName: form.lastName,
          company: form.company,
          email: form.email,
          phone: form.phone,
          address:
            form.streetAddress1 +
            (form.streetAddress2 ? `, ${form.streetAddress2}` : ""),
          district: form.district,
          country: form.country,
          postcode: form.postcode,
        },
        clerkUserId: user?.id ?? null,
        cartItems: cartItems.map((item) => ({
          _id: item._id,
          title: item.title,
          variantLabel: item.variantLabel,
          price: item.price,
          quantity: item.quantity,
          image: item.image,
        })),
      };

      console.log("💡 Payload sent to initiate-payment:", payload);

      const startTime = performance.now();
      const response = await fetch("/api/payment/initiate-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const endTime = performance.now();

      console.log(
        `⏱ API call duration: ${(endTime - startTime).toFixed(2)}ms`
      );
      console.log("📡 Response status:", response.status);
      console.log("📡 Response headers:", [...response.headers.entries()]);

      const data = await response.json();
      console.log("📦 Response JSON:", data);

      if (data.paymentUrl) {
        clearCart();
        console.log("✅ Redirecting to payment page:", data.paymentUrl);
        window.location.href = data.paymentUrl;
      } else {
        console.error(
          "❌ Payment initiation failed:",
          data.error || "Unknown error"
        );
        toast.error(
          "Payment initiation failed: " + (data.error || "Unknown error")
        );
      }
    } catch (err) {
      console.error("🚨 Network or code error during payment initiation:", err);
      toast.error("An error occurred while initiating payment.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-10">
      {/* Left side: Billing details */}
      <form className="space-y-6">
        <h2 className="text-xl font-semibold mb-4">Billing details</h2>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-medium">
              First name <span className="text-red-500">*</span>
            </label>
            <input
              name="firstName"
              value={form.firstName}
              onChange={handleChange}
              required
              className="w-full border p-2 rounded"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">
              Last name <span className="text-red-500">*</span>
            </label>
            <input
              name="lastName"
              value={form.lastName}
              onChange={handleChange}
              required
              className="w-full border p-2 rounded"
            />
          </div>
        </div>

        <div>
          <label className="block mb-1 font-medium">
            Company name (optional)
          </label>
          <input
            name="company"
            value={form.company}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">
            Country <span className="text-red-500">*</span>
          </label>
          <select
            name="country"
            value={form.country}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          >
            <option value="">Select country</option>
            {countries.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-1 font-medium">
            Street address <span className="text-red-500">*</span>
          </label>
          <input
            name="streetAddress1"
            value={form.streetAddress1}
            onChange={handleChange}
            required
            placeholder="House number and street name"
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">
            Street address 2 (optional)
          </label>
          <input
            name="streetAddress2"
            value={form.streetAddress2}
            onChange={handleChange}
            placeholder="Apartment, suite, unit etc."
            className="w-full border p-2 rounded"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-medium">
              Town / City <span className="text-red-500">*</span>
            </label>
            <input
              name="city"
              value={form.city}
              onChange={handleChange}
              required
              className="w-full border p-2 rounded"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">
              District <span className="text-red-500">*</span>
            </label>
            <select
              name="district"
              value={form.district}
              onChange={handleChange}
              required
              className="w-full border p-2 rounded"
            >
              <option value="">Select district</option>
              {districts.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block mb-1 font-medium">
            Postcode / ZIP (optional)
          </label>
          <input
            name="postcode"
            value={form.postcode}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Phone (optional)</label>
          <input
            name="phone"
            type="tel"
            value={form.phone}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">
            Email address <span className="text-red-500">*</span>
          </label>
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            disabled
          />
        </div>

        {/* Just remember to add the submit button inside the form to handle enter key and semantic correctness */}
        <div className="space-y-3">
          {/* Stripe button */}
          <button
            type="submit"
            disabled={!isFormValid}
            className={`w-full py-3 rounded text-white font-semibold ${
              isFormValid
                ? "bg-red-600 hover:bg-gray-700 cursor-pointer"
                : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            Place order via Stripe
          </button>

          {/* Tranzak button */}
          <button
            type="button"
            onClick={handleTranzakPayment}
            disabled={!isFormValid || loading}
            className={`w-full py-3 rounded text-white font-semibold ${
              isFormValid
                ? "bg-blue-600 hover:bg-blue-700 cursor-pointer"
                : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            {loading ? "Processing..." : "Place order via Tranzak"}
          </button>
        </div>
      </form>

      {/* Right side: Order summary */}
      <div className="border p-6 rounded-md space-y-6">
        <h2 className="text-xl font-semibold mb-4">Your order</h2>

        <table className="w-full text-sm">
          <thead>
            <tr>
              <th className="text-left pb-2 border-b">Product</th>
              <th className="text-right pb-2 border-b">Total</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map(({ _id, title, variantLabel, quantity, price }) => (
              <tr key={_id + (variantLabel ?? "")}>
                <td className="py-2">
                  {title}
                  {variantLabel && (
                    <span className="text-gray-600 text-sm">
                      {" "}
                      ({variantLabel})
                    </span>
                  )}{" "}
                  × {quantity}
                </td>
                <td className="py-2 text-right">
                  ${(price * quantity).toFixed(2)}
                </td>
              </tr>
            ))}

            <tr>
              <td className="pt-3 border-t font-semibold">Subtotal</td>
              <td className="pt-3 border-t text-right">
                ${subtotal.toFixed(2)}
              </td>
            </tr>

            <tr>
              <td className="pt-1">Shipping</td>
              <td className="pt-1 text-right">
                Flat rate: ${shippingCost.toFixed(2)}
              </td>
            </tr>

            <tr>
              <td className="pt-3 border-t font-semibold">Total</td>
              <td className="pt-3 border-t text-right font-semibold">
                ${total.toFixed(2)}
              </td>
            </tr>
          </tbody>
        </table>

        <div>
          <label className="inline-flex items-center space-x-2">
            <input
              type="checkbox"
              checked={termsAccepted}
              onChange={(e) => setTermsAccepted(e.target.checked)}
              required
            />
            <span className="sub-title">
              I have read and agree to the website terms and conditions{" "}
              <span className="text-red-500">*</span>
            </span>
          </label>
        </div>
      </div>
    </div>
  );
}
