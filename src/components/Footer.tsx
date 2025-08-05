import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { FaFacebook, FaHeart, FaPinterest, FaTwitter } from 'react-icons/fa'

const Footer = () => {
  return (
    <footer className='bg-[#f2f2f2] text-gray-700'>
      <section className='max-w-7xl mx-auto px-6 sm:px-10 py-16'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-16 justify-items-start lg:justify-items-center'>
          {/* Logo + Description */}
          <div className='col-span-1 lg:col-span-2 space-y-5'>
            <Link href='/' aria-label='Go to home page'>
              <Image
                src='/assets/logo.webp'
                alt='Brancy Logo Image'
                width={120}
                height={120}
                className='w-auto h-auto'
              />
            </Link>
            <p className='text-sm md:text-base leading-relaxed pt-8 max-w-[400px]'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Laudantium, labore tenetur facere dolor natus corrupti!
            </p>
          </div>

          {/* Information Links */}
          <div className='space-y-4'>
            <h2 className='text-lg font-semibold'>Information</h2>
            <div className='grid grid-cols-2 gap-2 text-sm'>
              <Link href='/blog' className='hover:underline'>
                Blog
              </Link>
              <Link href='/privacy' className='hover:underline'>
                Privacy
              </Link>
              <Link href='/account' className='hover:underline'>
                My Account
              </Link>
              <Link href='/about' className='hover:underline'>
                About Us
              </Link>
              <Link href='/login' className='hover:underline'>
                Login
              </Link>
              <Link href='/faq' className='hover:underline'>
                FAQs
              </Link>
              <Link href='/contact' className='hover:underline'>
                Contact
              </Link>
              <Link href='/shop' className='hover:underline'>
                Shop
              </Link>
            </div>
          </div>

          {/* Social Links */}
          <div className='space-y-4'>
            <h2 className='text-lg font-semibold'>Social Info</h2>
            <div className='flex space-x-6'>
              <Link
                href='/'
                aria-label='Twitter'
                className='hover:text-blue-500'
              >
                <FaTwitter size={20} />
              </Link>
              <Link
                href='/'
                aria-label='Facebook'
                className='hover:text-blue-700'
              >
                <FaFacebook size={20} />
              </Link>
              <Link
                href='/'
                aria-label='Pinterest'
                className='hover:text-red-500'
              >
                <FaPinterest size={20} />
              </Link>
            </div>
          </div>
        </div>
      </section>
      <hr className='py-2 text-gray-300' />
      <p className='text-gray-500 text-sm flex items-center justify-center py-2'>
        &copy; {new Date().getFullYear()} Brancy. Made with &nbsp;
        <FaHeart fill='red' /> &nbsp; by &nbsp;
        <Link
          href={'https://kmvdev.vercel.app'}
          aria-label='Go to KMV Dev portfolio'
        >
          KMV Dev
        </Link>
        .
      </p>
    </footer>
  )
}

export default Footer
