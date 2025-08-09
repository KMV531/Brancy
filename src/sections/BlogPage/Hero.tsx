import Image from "next/image";
import Link from "next/link";
import React from "react";

const BlogHero = () => {
  return (
    <main>
      <section className="relative w-full h-screen overflow-hidden">
        <div className="w-full h-[100px] bg-amber-50 text-gray-800 text-center flex items-center justify-center space-x-4 mt-20">
          <Link
            href={"/"}
            aria-label="Go to home page"
            className="hover:text-orange-600"
          >
            Home
          </Link>{" "}
          / &nbsp;<p>Blog</p>
        </div>
        <div className="my-10">
          <Image
            src={"/assets/bg-image.png"}
            alt="Blog Hero image"
            width={800}
            height={800}
            className="w-full h-full object-contain"
            priority
          />
        </div>
      </section>
    </main>
  );
};

export default BlogHero;
