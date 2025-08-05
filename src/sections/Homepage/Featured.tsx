import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const featuredImages = [
  {
    src: '/assets/category1.webp',
    alt: 'Category 1',
  },
  {
    src: '/assets/category2.webp',
    alt: 'Category 2',
  },
  {
    src: '/assets/category3.webp',
    alt: 'Category 3',
  },
]

const FeaturedSection = () => {
  return (
    <main className='container mx-auto px-5 py-20'>
      <section className='grid grid-cols-1 lg:grid-cols-3 gap-5 max-w-6xl mx-auto'>
        {featuredImages.map((item, index) => (
          <Link
            href='/shop'
            key={index}
            aria-label={`Go to shop page - ${item.alt}`}
            className='group relative overflow-hidden rounded-xl block hover-flash-scale'
          >
            <Image
              src={item.src}
              alt={item.alt}
              width={500}
              height={500}
              priority
              className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-105'
            />
            {/* Shine Overlays */}
            <div className='shine-overlay'></div>
            <div className='shine-overlay-reverse'></div>
          </Link>
        ))}
      </section>
    </main>
  )
}

export default FeaturedSection
