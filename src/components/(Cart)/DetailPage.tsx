"use client";

import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import { urlFor } from "@/sanity/lib/image";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/store/useCartStore";

export default function DetailPage() {
  const router = useRouter();
  const cartItems = useCartStore((state) => state.cart);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const subtotal = useCartStore((state) => state.totalPrice());

  const [shippingOption, setShippingOption] = useState<
    "flat" | "free" | "pickup"
  >("flat");

  const shippingCost = {
    flat: 3.0,
    free: 0.0,
    pickup: 0.0,
  };

  const total = subtotal + shippingCost[shippingOption];

  return (
    <div className="max-w-5xl mx-auto p-6">
      {cartItems?.length === 0 ? (
        <div className="flex items-center justify-center space-y-6 flex-col">
          <h2 className="text-center text-5xl font-bold">
            Your cart is empty.
          </h2>
          <Link
            href={"/shop"}
            className="my-3 cursor-pointer underline text-blue-600"
          >
            Start Shopping
          </Link>
        </div>
      ) : (
        <>
          {/* Cart Items Table */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300 min-w-[600px]">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-3 border border-gray-300 text-center">
                    Remove
                  </th>
                  <th className="p-3 border border-gray-300 text-center">
                    Product
                  </th>
                  <th className="p-3 border border-gray-300 text-center">
                    Price
                  </th>
                  <th className="p-3 border border-gray-300 text-center">
                    Quantity
                  </th>
                  <th className="p-3 border border-gray-300 text-center">
                    Total
                  </th>
                </tr>
              </thead>
              <tbody>
                {cartItems?.map(
                  ({ _id, variantLabel, title, price, quantity, image }) => (
                    <tr
                      key={_id + (variantLabel ?? "")}
                      className="border-b border-gray-300"
                    >
                      <td
                        className="p-3 border border-gray-300 text-center cursor-pointer text-red-600 font-bold hover:text-red-800"
                        onClick={() => removeFromCart(_id, variantLabel)}
                      >
                        &times;
                      </td>
                      <td className="p-3 border border-gray-300 flex items-center gap-4">
                        <div className="relative w-16 h-16">
                          {image && (
                            <Image
                              width={96}
                              height={96}
                              src={urlFor(image).width(96).height(96).url()}
                              alt={`${title}`}
                              className="w-full h-full object-cover object-center"
                            />
                          )}
                        </div>
                        <div>
                          <span>{title}</span>
                          {variantLabel && (
                            <div className="text-sm text-gray-500">
                              Variant: {variantLabel}
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="p-3 border border-gray-300">
                        ${price.toFixed(2)}
                      </td>
                      <td className="p-3 border border-gray-300">
                        <input
                          type="number"
                          min={1}
                          value={quantity}
                          onChange={(e) => {
                            const val = Number(e.target.value);
                            if (val >= 1)
                              updateQuantity(_id, variantLabel, val);
                          }}
                          className="w-16 border-2 border-red-500 rounded-full px-2 py-1 text-center"
                        />
                      </td>
                      <td className="p-3 border border-gray-300 font-semibold">
                        ${(price * quantity).toFixed(2)}
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>

          {/* Cart Totals Box */}
          <div className="mt-8 p-6 bg-gray-100 rounded shadow max-w-md ml-auto">
            <h2 className="text-xl font-bold mb-4">Cart totals</h2>
            <hr className="my-3" />
            <div className="flex justify-between mb-2">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>

            <hr className="my-3" />

            <div className="mb-4 flex justify-between space-x-8">
              <span className="block font-semibold mb-2">Shipping</span>
              <div>
                <div className="space-y-1">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="shipping"
                      value="flat"
                      checked={shippingOption === "flat"}
                      onChange={() => setShippingOption("flat")}
                    />
                    Flat rate: $3.00
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="shipping"
                      value="free"
                      checked={shippingOption === "free"}
                      onChange={() => setShippingOption("free")}
                    />
                    Free shipping
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="shipping"
                      value="pickup"
                      checked={shippingOption === "pickup"}
                      onChange={() => setShippingOption("pickup")}
                    />
                    Local pickup
                  </label>
                </div>
                <p className="mt-2 text-sm text-gray-600">
                  Shipping to USA. <br />
                  <button className="underline text-blue-600 hover:text-blue-800">
                    Change address
                  </button>
                </p>
              </div>
            </div>

            <div className="flex justify-between border-t border-gray-300 pt-3 font-bold text-lg">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>

            <hr className="my-3" />

            <button
              onClick={() => router.push("/checkout")}
              className="mt-6 w-full bg-red-500 text-white py-3 rounded-full hover:bg-red-600 transition cursor-pointer uppercase"
            >
              Proceed To Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}
