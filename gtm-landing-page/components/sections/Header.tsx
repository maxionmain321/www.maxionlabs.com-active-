'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'

/**
 * Header Component
 *
 * Sticky navigation bar that stays at top when scrolling.
 * Contains navigation links and CTA button.
 */
export function Header() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-background/80 backdrop-blur-md border-b border-border'
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-container mx-auto px-6 lg:px-12 py-4 flex items-center justify-between">
        {/* Logo / Brand */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="text-xl font-bold text-text-primary hover:text-accent-primary transition-colors"
        >
          Maxionlabs
        </button>

        {/* Navigation Links */}
        <div className="flex items-center gap-2 md:gap-6">
          <button
            onClick={() => scrollToSection('case-study')}
            className="text-sm md:text-base text-text-secondary hover:text-text-primary transition-colors px-2 py-1"
          >
            Our Work
          </button>
          <button
            onClick={() => scrollToSection('how-it-works')}
            className="text-sm md:text-base text-text-secondary hover:text-text-primary transition-colors px-2 py-1"
          >
            Our Method
          </button>
          <Button
            variant="shimmer"
            size="sm"
            className="font-semibold hidden sm:inline-flex"
            onClick={() => scrollToSection('book-call')}
          >
            Book Free Strategy Call
          </Button>
          <Button
            variant="shimmer"
            size="sm"
            className="font-semibold sm:hidden text-xs px-3"
            onClick={() => scrollToSection('book-call')}
          >
            Book Call
          </Button>
        </div>
      </nav>
    </motion.header>
  )
}

export default Header
