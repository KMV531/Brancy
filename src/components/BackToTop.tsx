'use client'

import { ArrowUp } from 'lucide-react'
import React, { useEffect, useState } from 'react'

const BackToTop = () => {
  const [Isvisible, setIsVisible] = useState(false)

  // Show the button when the user scrolls down 300px
  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true)
    } else {
      setIsVisible(false)
    }
  }

  // Scroll to top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility)

    return () => {
      window.removeEventListener('scroll', toggleVisibility)
    }
  }, [])
  return (
    Isvisible && (
      <button
        onClick={scrollToTop}
        className='fixed bottom-8 cursor-pointer right-8 bg-orange-700 z-[999] text-white p-3 rounded-full shadow-lg hover:bg-primary/90 transition-all'
      >
        <ArrowUp />
      </button>
    )
  )
}

export default BackToTop