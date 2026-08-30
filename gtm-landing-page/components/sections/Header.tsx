'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'

export function Header() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
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
        scrolled ? 'bg-background/80 backdrop-blur-md border-b border-border' : 'bg-transparent'
      }`}
    >
      <nav className="max-w-container mx-auto px-6 lg:px-12 py-4 flex items-center justify-between">
        <a
          href="/"
          className="text-xl font-bold text-text-primary hover:text-accent-primary transition-colors"
        >
          Maxionlabs
        </a>

        <div className="hidden md:flex items-center gap-8">
          <button
            onClick={() => scrollToSection('how-it-works')}
            className="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors"
          >
            How it works
          </button>
          <button
            onClick={() => scrollToSection('client-wins')}
            className="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors"
          >
            Client wins
          </button>
        </div>

        <Button
          variant="shimmer"
          size="sm"
          className="font-semibold"
          onClick={() => {
            if (window.location.pathname === '/') {
              scrollToSection('book-call')
            } else {
              window.location.href = '/#book-call'
            }
          }}
        >
          Book a 20 minute call &rarr;
        </Button>
      </nav>

    </motion.header>
  )
}

export default Header
