import NotFoundPage from "@/app/not-found";
import NewsletterSection from "@/components/Newsletter";
import { fetchBlogDetail } from "@/sanity/helpers";
import OtherPostsServer from "@/sections/BlogPage/(OtherPosts)/OtherPostsServer";
import PostDetailComponent from "@/sections/BlogPage/PostDetailComponent";
import Link from "next/link";
import React from "react";

export default async function SingleBlogPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  // Await params to resolve slug dynamically
  const { slug } = await params;

  // Fetch data by slug
  const data = await fetchBlogDetail(slug);

  if (!data?.post) {
    NotFoundPage();
  }

  return (
    <main>
      <section className="relative w-full h-[300px] overflow-hidden">
        <div className="w-full h-[100px] bg-amber-50 text-gray-800 text-center flex items-center justify-center space-x-4 mt-20">
          <Link
            href={"/"}
            aria-label="Go to home page"
            className="hover:text-orange-600"
          >
            Home
          </Link>{" "}
          / &nbsp;<p>Blog Detail</p>
        </div>
      </section>
      <PostDetailComponent post={data.post} />
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
}
