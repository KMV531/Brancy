import ContactInfo from '@/sections/ContactPage/Contact'
import Image from 'next/image'
import React from 'react'
import type { Metadata } from 'next'
import { MapSection } from '@/sections/ContactPage/Map'

export const metadata: Metadata = {
  title: 'Contact Us | Brancy – Beauty & Cosmetics',
  description:
    'Have questions or need assistance? Reach out to Brancy for inquiries, support, or collaboration. We’re here to help with all your beauty and cosmetic needs.',
}

const ContactPage = () => {
  return (
    <main className='pt-14 lg:pt-24 bg-white'>
      <section className='w-full min-h-screen flex flex-col-reverse lg:flex-row items-center justify-center'>
        {/* Left Image - visible below form on small screens, left on large */}
        <div className='w-full lg:w-1/2 h-64 sm:h-80 md:h-96 lg:h-full'>
          <Image
            src='/assets/contact-bg.PNG'
            alt='Contact background'
            width={1200}
            height={800}
            className='w-full h-full object-cover rounded-xl'
            priority
          />
        </div>

        {/* Right Contact Content */}
        <div className='w-full lg:w-1/2 flex items-start justify-start px-6 sm:px-10 md:px-14 py-10 lg:py-0'>
          <div className='w-full max-w-xl space-y-6 sm:space-y-8'>
            <h1 className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium text-gray-800'>
              Get in Touch
            </h1>

            <p className='text-gray-700 text-sm sm:text-base md:text-lg leading-relaxed'>
              Lorem ipsum dolor sit amet, consectetur adipiscing aliquam, purus
              sit amet luctus venenatis
            </p>

            {/* Contact Form */}
            <form className='space-y-6'>
              {/* First & Last Name */}
              <div className='flex flex-col lg:flex-row lg:space-x-4 space-y-4 lg:space-y-0'>
                <input
                  type='text'
                  placeholder='First Name'
                  className='w-full px-4 py-3 border-b border-gray-300 focus:outline-none focus:border-b text-gray-700'
                />
                <input
                  type='text'
                  placeholder='Last Name'
                  className='w-full px-4 py-3 border-b border-gray-300 focus:outline-none focus:border-b text-gray-700'
                />
              </div>

              {/* Email */}
              <input
                type='email'
                placeholder='Email Address'
                className='w-full px-4 py-3 border-b border-gray-300 focus:outline-none focus:border-b text-gray-700'
              />

              {/* Message */}
              <textarea
                placeholder='Message'
                rows={4}
                className='w-full px-4 py-3 border-b border-gray-300 resize-none focus:outline-none focus:border-b text-gray-700'
              />

              {/* Submit Button */}
              <button
                type='submit'
                className='px-6 py-3 bg-pink-500 text-white hover:bg-pink-600 transition rounded-full tracking-widest cursor-pointer placeholder:text-gray-700'
              >
                S&nbsp;U&nbsp;B&nbsp;M&nbsp;I&nbsp;T
              </button>
            </form>
          </div>
        </div>
      </section>
      <ContactInfo />
      <MapSection />
    </main>
  )
}

export default ContactPage
