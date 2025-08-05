import Image from 'next/image'
import React from 'react'

const features = [
  {
    img: '/assets/about/feature1.webp',
    title: 'SUPPORT TEAM',
    description:
      'Lorem ipsum dolor amet, consectetur adipiscing. Ac tortor enim metus, turpis.',
  },
  {
    img: '/assets/about/feature2.webp',
    title: 'CERTIFICATION',
    description:
      'Lorem ipsum dolor amet, consectetur adipiscing. Ac tortor enim metus, turpis.',
  },
  {
    img: '/assets/about/feature3.webp',
    title: 'NATURAL PRODUCTS',
    description:
      'Lorem ipsum dolor amet, consectetur adipiscing. Ac tortor enim metus, turpis.',
  },
]

const WhyUsSection = () => {
  return (
    <main className='bg-pink-50 p-10'>
      <section className='container mx-auto px-5 py-20'>
        <div className='flex flex-col space-y-10 lg:flex-row lg:space-y-0 lg:space-x-8 items-center justify-center'>
          {features.map((feature, idx) => (
            <div
              key={idx}
              className='flex flex-col space-y-4 text-center lg:text-left items-center lg:items-start max-w-md'
            >
              <div className='flex items-center space-x-3'>
                <Image
                  src={feature.img}
                  alt={`${feature.title} icon`}
                  width={70}
                  height={70}
                />
                <h2 className='text-blue-950 text-lg md:text-xl font-medium'>
                  {feature.title}
                </h2>
              </div>
              <p className='text-base md:text-lg text-gray-600 max-w-[400px]'>
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}

export default WhyUsSection
