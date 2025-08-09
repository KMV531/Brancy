"use client";

import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const categoryBgClass = (categoryName: string) => {
  switch (categoryName?.toLowerCase()) {
    case "beauty":
      return "bg-orange-400";
    case "fashion":
      return "bg-purple-600";
    default:
      return "bg-gray-400";
  }
};

export default function OtherPostsClient({ posts }: { posts: any[] }) {
  return (
    <main className="bg-white">
      <section className="max-w-6xl mx-auto pb-20 lg:py-10 px-5 lg:px-0">
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <Link
              key={post.slug.current}
              href={`/blog/${post.slug.current}`}
              aria-label={`Read more about ${post.title}`}
              className="group relative overflow-hidden rounded-xl block hover-flash-scale"
            >
              {/* Cover Image */}
              {post.coverImage && (
                <Image
                  src={urlFor(post?.coverImage).url()}
                  alt={post.coverImage.alt || post.title}
                  width={500}
                  height={500}
                  className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
                />
              )}

              {/* Shine Overlays */}
              <div className="shine-overlay"></div>
              <div className="shine-overlay-reverse"></div>

              <div className="p-4 bg-white">
                {/* Category */}
                {post.category?.title && (
                  <span
                    className={`inline-block px-4 py-2 text-white text-sm font-semibold rounded-full ${categoryBgClass(
                      post.category.title
                    )}`}
                  >
                    {post.category.title}
                  </span>
                )}

                {/* Title */}
                <h2 className="mt-2 text-xl font-bold">{post.title}</h2>

                {/* Author and Date */}
                <p className="mt-1 text-gray-600 text-sm">
                  BY:{" "}
                  <span className="font-medium">
                    {post.author?.name || "Unknown"}
                  </span>{" "}
                  |{" "}
                  {new Date(post._createdAt).toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
