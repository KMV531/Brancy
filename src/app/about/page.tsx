import AboutSection from '@/sections/AboutPage/About'
import AboutHeroSection from '@/sections/AboutPage/Hero'
import IntroSection from '@/sections/AboutPage/Intro'
import WhyUsSection from '@/sections/AboutPage/Us'
import React from 'react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Us | Brancy – Beauty & Self-Care Experts',
  description:
    'Discover the story behind Brancy – your trusted beauty and self-care brand. Learn about our values, commitment to natural products, and passion for empowering confidence through cosmetics.',
}

const AboutPage = () => {
  return (
    <main>
      <AboutHeroSection />
      <IntroSection />
      <AboutSection />
      <WhyUsSection />
    </main>
  )
}

export default AboutPage
