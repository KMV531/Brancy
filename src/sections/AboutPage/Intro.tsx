import Image from 'next/image'
import React from 'react'

const stats = [
  {
    img: '/assets/about/funfact1.webp',
    alt: 'funfact 1',
    value: '5000+',
    label: 'CLIENTS',
  },
  {
    img: '/assets/about/funfact2.webp',
    alt: 'funfact 2',
    value: '250+',
    label: 'PROJECTS',
  },
  {
    img: '/assets/about/funfact3.webp',
    alt: 'funfact 3',
    value: '1.5M+',
    label: 'REVENUE',
  },
]

const IntroSection = () => {
  return (
    <main className='container mx-auto pb-20'>
      <section className='bg-pink-50 px-6 py-20 sm:px-10 lg:p-28 rounded-xl'>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:max-w-6xl mx-auto'>
          {stats.map((item, index) => (
            <div
              key={index}
              className='flex flex-col space-y-5 items-center justify-center border-4 border-orange-500 rounded-xl py-10 px-4 bg-white'
            >
              <Image src={item.img} alt={item.alt} width={100} height={100} />
              <div className='w-[70%] h-0.5 bg-orange-300' />
              <h2 className='text-gray-700 font-bold text-xl lg:text-4xl'>
                {item.value}
              </h2>
              <p className='text-black text-base md:text-lg lg:text-xl'>
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}

export default IntroSection
