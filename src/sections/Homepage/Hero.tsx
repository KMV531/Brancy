'use client'

import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { motion, Variants } from 'framer-motion'

// Define the animation variants properly
const textVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1], // cubic-bezier
    },
  },
}

// Helper function for delayed text
const getDelayedTransition = (index: number) => ({
  variants: textVariants,
  initial: 'hidden',
  animate: 'visible',
  transition: { delay: index * 0.2 },
})

const HeroSection = () => {
  return (
    <main>
      <section className='relative w-full h-screen overflow-hidden'>
        {/* Background split */}
        <div className='absolute inset-0 flex w-full h-full'>
          <div className='w-1/2 bg-[#f2f2f2]' />
          <div className='w-1/2 bg-green-100' />
        </div>

        <div className='relative z-10 flex flex-col lg:flex-row w-full h-full'>
          {/* Left content */}
          <div className='flex-1 flex items-center justify-center px-4 sm:px-8 md:px-14 lg:px-16 h-1/2 lg:h-full'>
            <div className='flex flex-col items-start justify-center space-y-6 sm:space-y-8 max-w-md relative w-full'>
              {/* Decorative theme image */}
              <motion.div
                initial={{ x: -80, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 1 }}
                className='relative w-full flex justify-start lg:justify-center'
              >
                <Image
                  src='/assets/text-theme.webp'
                  alt='Decorative theme'
                  width={300}
                  height={300}
                  className='absolute translate-x-1/2 translate-y-1 lg:top-1/2 lg:left-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2 pointer-events-none mt-8 lg:mt-0 w-[90px] h-[90px] sm:w-[150px] sm:h-[150px] lg:w-[280px] lg:h-[280px]'
                  aria-hidden='true'
                />
              </motion.div>

              {/* Heading */}
              <motion.h1
                {...getDelayedTransition(0)}
                className='relative z-10 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 pt-20 text-left'
              >
                CLEAN FRESH
              </motion.h1>

              {/* Paragraph */}
              <motion.p
                {...getDelayedTransition(1)}
                className='text-gray-700 text-sm sm:text-base md:text-lg lg:text-xl text-left leading-relaxed'
              >
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Laudantium, labore tenetur facere dolor natus corrupti!
              </motion.p>

              {/* Button */}
              <motion.div {...getDelayedTransition(2)}>
                <Link
                  href='/shop'
                  aria-label='Go to shop page'
                  className='border-2 border-gray-600 py-3 px-6 rounded-full text-sm sm:text-base tracking-wider self-start hover:bg-orange-400 hover:text-white transition-colors'
                >
                  B&nbsp;U&nbsp;Y&nbsp;&nbsp;N&nbsp;O&nbsp;W
                </Link>
              </motion.div>
            </div>
          </div>

          {/* Right Image */}
          <div className='flex-1 flex items-center justify-center px-4 sm:px-8 md:px-14 lg:px-16 h-1/2 lg:h-full'>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
              className='w-[80%] sm:w-[70%] md:w-[65%] lg:w-auto lg:-translate-x-72'
            >
              <Image
                src='/assets/slider1.webp'
                alt='Hero image slider 1'
                width={1200}
                height={1200}
                className='object-contain'
                priority
              />
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default HeroSection
