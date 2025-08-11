import Link from 'next/link'
import React from 'react'

const HeroSection = () => {
  return (
    <main>
      <section className="relative w-full h-[300px] overflow-hidden">
        <div className="w-full h-[300px] bg-amber-50 text-gray-800 mt-20">
          <div className="max-w-6xl mx-auto px-5 lg:px-0">
            <div className="flex items-center justify-start gap-4 py-4 pt-14">
            <Link
              href={"/"}
              aria-label="Go to home page"
              className="hover:text-orange-600"
            >
              Home
            </Link>{" "}
            / &nbsp;<p>Product Detail</p>
          </div>
          <div className="flex items-center justify-between flex-col space-y-4 lg:flex-row">
            <h3 className="font-medium text-lg md:text-xl lg:text-2xl">Product Detail</h3>
             <h3>Showing Single Product</h3>
          </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default HeroSection