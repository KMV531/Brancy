import AdvertisementSection from "@/sections/BlogPage/Advertisement";
import BlogHero from "@/sections/BlogPage/Hero";
import NewBlogSectionServer from "@/sections/BlogPage/(NewPosts)/NewBlogSectionServer";
import { Metadata } from "next";
import React from "react";
import OtherPostsServer from "@/sections/BlogPage/(OtherPosts)/OtherPostsServer";
import NewsletterSection from "@/components/Newsletter";

export const metadata: Metadata = {
  title: "Blog | Brancy – Insights on Beauty & Self-Care",
  description:
    "Explore the latest tips, trends, and expert advice on beauty and self-care from Brancy. Stay inspired with our blog dedicated to empowering your confidence naturally.",
};

const BlogPage = () => {
  return (
    <main>
      <BlogHero />
      <NewBlogSectionServer />
      <AdvertisementSection />
      <OtherPostsServer />
      <NewsletterSection />
    </main>
  );
};

export default BlogPage;
