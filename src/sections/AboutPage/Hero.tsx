import Image from 'next/image'
import React from 'react'

const AboutHeroSection = () => {
  return (
    <main>
      <section className='relative w-full h-screen overflow-hidden'>
        {/* Foreground content */}
        <div className='relative z-10 flex flex-col lg:flex-row items-center justify-center h-full'>
          {/* Left content */}
          <div className='flex items-center justify-center px-4 sm:px-8 md:px-14 lg:px-16 h-1/2 lg:h-full'>
            <div className='flex flex-col items-start justify-center space-y-6 sm:space-y-8 max-w-md relative w-full'>
              {/* Text image behind heading */}
              <div className='relative w-full flex justify-start lg:justify-center'>
                <Image
                  src='/assets/about/about-title.webp'
                  alt='Decorative about title'
                  width={300}
                  height={300}
                  className='absolute translate-x-1/2 translate-y-1 lg:top-1 lg:left-1 lg:-translate-x-4 lg:-translate-y-1/2 pointer-events-none mt-8 lg:mt-0 w-[90px] h-[90px] sm:w-[150px] sm:h-[150px] lg:w-[280px] lg:h-[280px]'
                  aria-hidden='true'
                />
                <h1 className='relative z-10 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 pt-20 text-left'>
                  We, are Brancy
                </h1>
              </div>
              <h2 className='underline text-sm md:text-lg'>
                B&nbsp;e&nbsp;s&nbsp;t&nbsp;&nbsp;
                c&nbsp;o&nbsp;s&nbsp;m&nbsp;e&nbsp;t&nbsp;i&nbsp;c&nbsp;s&nbsp;&nbsp;
                p&nbsp;r&nbsp;o&nbsp;v&nbsp;i&nbsp;d&nbsp;e&nbsp;r
              </h2>

              <p className='text-gray-700 text-sm sm:text-base md:text-lg lg:text-xl text-left leading-relaxed'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Laudantium, labore tenetur facere dolor natus corrupti!
              </p>
            </div>
          </div>

          {/* Right image */}
          <div className='flex items-center justify-center px-4 sm:px-8 md:px-14 lg:px-16 h-1/2 lg:h-full'>
            <Image
              src='/assets/about/about1.webp'
              alt='About hero image'
              width={1200}
              height={1200}
              className='object-contain w-[80%] sm:w-[70%] md:w-[65%] lg:w-auto'
              priority
            />
          </div>
        </div>
      </section>
    </main>
  )
}

export default AboutHeroSection
