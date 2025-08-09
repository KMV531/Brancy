import Image from "next/image";
import Link from "next/link";
import React from "react";

const NotFoundPage = () => {
  return (
    <main className="container mx-auto">
      <section className="flex items-center justify-center flex-col space-y-8 h-screen px-5 lg:px-0">
        <Image
          src={"/assets/page-not-found.webp"}
          alt="Page not found image"
          width={800}
          height={800}
          className="object-cover"
          priority
        />
        <h1 className="text-2xl md:text-4xl lg:text-6xl text-gray-700 font-semibold">
          Opps! You Lost
        </h1>
        <p className="text-gray-700 text-sm md:text-lg">
          Go to{" "}
          <Link
            href={"/"}
            aria-label="Go to home page"
            className="text-blue-500 underline"
          >
            Home
          </Link>{" "}
          Page
        </p>
      </section>
    </main>
  );
};

export default NotFoundPage;
