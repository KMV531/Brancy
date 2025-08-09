import BlogSection from '@/sections/BlogPage/Blog'
import BlogHero from '@/sections/BlogPage/Hero'
import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: 'Blog | Brancy – Insights on Beauty & Self-Care',
  description:
    'Explore the latest tips, trends, and expert advice on beauty and self-care from Brancy. Stay inspired with our blog dedicated to empowering your confidence naturally.',
}

const BlogPage = () => {
  return (
    <main>
      <BlogHero />
      <BlogSection />
    </main>
  )
}

export default BlogPage
