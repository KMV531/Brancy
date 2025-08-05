'use client'

import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { FaHamburger, FaSearch, FaShoppingBag, FaUser } from 'react-icons/fa'
import Nav from './Nav'

const Header = () => {
  const [mobileNavOpen, setMobileNavOpen] = useState(false)

  const closeMobileNav = () => setMobileNavOpen(false)

  return (
    <header className='absolute top-0 left-0 w-full z-50 bg-white/50 lg:bg-transparent'>
      <div className='flex items-center justify-between px-4 py-4 lg:px-14'>
        <div className='flex items-center space-x-10'>
          <Link href='/' aria-label='Go to home page'>
            <Image
              src='/assets/logo.webp'
              alt='Brancy Logo'
              width={100}
              height={100}
              className='w-auto h-auto'
              priority
            />
          </Link>

          {/* Desktop Nav */}
          <div className='hidden lg:flex'>
            <Nav
              containerStyles='flex space-x-10'
              linkStyles='hover:text-orange-400'
            />
          </div>
        </div>

        <div className='flex items-center space-x-6 lg:space-x-10 text-gray-800'>
          <FaSearch size={20} className='cursor-pointer' />
          <FaShoppingBag size={20} className='cursor-pointer' />
          <FaUser size={20} className='cursor-pointer' />
          <div className='lg:hidden'>
            <FaHamburger
              size={22}
              className='cursor-pointer'
              onClick={() => setMobileNavOpen(!mobileNavOpen)}
            />
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileNavOpen && (
        <div className='lg:hidden bg-white px-6 py-4 shadow-md animate-slide-down'>
          <Nav
            containerStyles='flex flex-col space-y-4'
            linkStyles='text-lg'
            onLinkClick={closeMobileNav}
          />
        </div>
      )}
    </header>
  )
}

export default Header
