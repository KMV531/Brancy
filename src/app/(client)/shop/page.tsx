import CategoriesSection from "@/sections/Homepage/Categories";
import ShopHeroPage from "@/sections/ShopPage/Hero";
import AllProducts from "@/sections/ShopPage/Products";
import SaleBanner from "@/sections/ShopPage/SaleBanner";
import React from "react";

const ShopPage = () => {
  return (
    <main>
      <ShopHeroPage />
      <CategoriesSection />
      <AllProducts />
      <SaleBanner />
    </main>
  );
};

export default ShopPage;
