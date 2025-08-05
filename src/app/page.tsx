import CategoriesSection from '@/sections/Homepage/Categories'
import FeaturedSection from '@/sections/Homepage/Featured'
import HeroSection from '@/sections/Homepage/Hero'
import React from 'react'

const HomePage = () => {
  return (
    <main>
      <HeroSection />
      <CategoriesSection />
      <FeaturedSection />
    </main>
  )
}

export default HomePage
