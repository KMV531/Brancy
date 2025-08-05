import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const categories = [
  {
    img: '/assets/1.webp',
    alt: 'Health care image',
    label: 'Health Care',
    bg: 'bg-green-200',
  },
  {
    img: '/assets/2.webp',
    alt: 'Skin care image',
    label: 'Skin Care',
    bg: 'bg-yellow-200',
  },
  {
    img: '/assets/3.webp',
    alt: 'Lip Stick image',
    label: 'Lip Stick',
    bg: 'bg-violet-200',
  },
  {
    img: '/assets/4.webp',
    alt: 'Face Skin image',
    label: 'Face Skin',
    bg: 'bg-orange-200',
  },
  {
    img: '/assets/5.webp',
    alt: 'Blusher image',
    label: 'Blusher',
    bg: 'bg-pink-200',
  },
  {
    img: '/assets/6.webp',
    alt: 'Natural image',
    label: 'Natural',
    bg: 'bg-orange-200',
  },
]

const CategoriesSection = () => {
  return (
    <main className='container mx-auto px-5 py-20'>
      <section className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 justify-center gap-5 max-w-6xl mx-auto'>
        {categories.map((cat, idx) => (
          <Link
            href={'/shop'}
            aria-label='Go to shop page'
            key={idx}
            className={`${cat.bg} group rounded-lg p-5 flex flex-col items-center justify-center space-y-8 transition-shadow duration-300 ease-in-out hover:shadow-2xl hover:shadow-gray-400`}
          >
            {/* Flip container */}
            <div className='flip-container'>
              <div className='flip-card group-hover:flipped'>
                <Image src={cat.img} alt={cat.alt} width={80} height={80} />
              </div>
            </div>

            <div className='w-10 h-0.5 bg-red-700 rounded-full' />
            <p className='text-lg text-green-700 font-semibold'>{cat.label}</p>
          </Link>
        ))}
      </section>
    </main>
  )
}

export default CategoriesSection
