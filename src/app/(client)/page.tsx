import NewsletterSection from "@/components/Newsletter";
import OtherPostsServer from "@/sections/BlogPage/(OtherPosts)/OtherPostsServer";
import CategoriesSection from "@/sections/Homepage/Categories";
import FeaturedSection from "@/sections/Homepage/Featured";
import HeroSection from "@/sections/Homepage/Hero";
import TopSaleSection from "@/sections/Homepage/TopSaleSection";
import React from "react";

const HomePage = () => {
  return (
    <main>
      <HeroSection />
      <CategoriesSection />
      <TopSaleSection />
      <FeaturedSection />
      <div className="flex flex-col items-center justify-center space-y-4">
        <h1 className="text-2xl md:text-4xl lg:text-6xl text-gray-700">
          Blog Posts
        </h1>
        <p className="max-w-[500px] text-center text-gray-500 text-sm">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam,
          purus sit amet luctus venenatis
        </p>
      </div>
      <OtherPostsServer />
      <NewsletterSection />
    </main>
  );
};

export default HomePage;
