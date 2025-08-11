import Link from "next/link";
import React from "react";

const CheckoutHero = () => {
  return (
    <main>
      <section className="relative w-full h-[200px] overflow-hidden">
        <div className="w-full h-[100px] bg-amber-50 text-gray-800 text-center flex items-center justify-center space-x-4 mt-20">
          <Link
            href={"/"}
            aria-label="Go to home page"
            className="hover:text-orange-600"
          >
            Home
          </Link>{" "}
          / &nbsp;<p>Checkout</p>
        </div>
      </section>
    </main>
  );
};

export default CheckoutHero;
