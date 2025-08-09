import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const AdvertisementSection = () => {
  return (
    <main className="my-10 px-5 lg:px-0">
      <Link
        href="/shop"
        aria-label="Go to shop page"
        className="group relative overflow-hidden rounded-xl block hover-flash-scale max-w-3xl mx-auto"
      >
        <Image
          src="/assets/8.webp"
          alt="Advertising image"
          width={1920}
          height={600}
          priority
          className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Shine Overlays */}
        <div className="shine-overlay"></div>
        <div className="shine-overlay-reverse"></div>
      </Link>
    </main>
  )
}

export default AdvertisementSection
