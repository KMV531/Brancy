"use client";

import CheckoutDetail from "@/components/(Checkout)/CheckoutDetail";
import CheckoutHero from "@/components/(Checkout)/Hero";
import { useCartStore } from "@/store/useCartSTore";

const CheckoutPage = () => {
  const cartItems = useCartStore((state) => state.cart);
  // You might want to add shippingOption to your zustand store as well to sync shipping cost
  // For now, let's assume flat rate shipping for example
  const shippingCost = 3.0;

  return (
    <main>
      <CheckoutHero />
      <CheckoutDetail cartItems={cartItems} shippingCost={shippingCost} />
    </main>
  );
};

export default CheckoutPage;
