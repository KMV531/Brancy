"use client";
import React from "react";
import { FaArrowUp } from "react-icons/fa";

const NewsletterSection = () => {
  return (
    <section className="pb-10 px-5">
      <div className="container mx-auto max-w-6xl">
        <div
          className="relative h-96 rounded-xl overflow-hidden"
          style={{
            backgroundImage: "url('/assets/newsletter-background.webp')",
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
        >
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/50 flex flex-col justify-center p-10 md:p-12">
            <div className="max-w-4xl mx-auto text-center space-y-6">
              {/* Heading */}
              <h2 className="text-xl md:text-4xl font-bold text-white title">
                Join with us
              </h2>

              {/* Description */}
              <p className="text-sm md:text-lg text-white/90 leading-relaxed sub-title">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam.
              </p>

              {/* Form */}
              <form className="flex justify-center">
                <div className="relative w-full max-w-md">
                  <input
                    type="email"
                    placeholder="Your email address"
                    className="w-full px-5 pr-14 py-3 rounded-lg text-white bg-white/20 backdrop-blur-sm border-2 border-green-400 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent placeholder:text-white/80"
                    aria-label="Your email address"
                  />
                  <button
                    type="submit"
                    className="absolute right-0 top-1/2 -translate-y-1/2 bg-green-500 hover:bg-green-600 text-white p-4 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-400 cursor-pointer"
                  >
                    <FaArrowUp size={20} />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
