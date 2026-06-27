'use client'

import { useEffect, useState } from 'react'

/**
 * V3 Navigation Component
 *
 * Ultra minimal: logo left, one CTA button right
 * Button scrolls to #v3-book on click
 */
export function V3Nav() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleScroll = (e: React.MouseEvent) => {
    e.preventDefault()
    const element = document.getElementById('v3-book')
    element?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all ${isScrolled ? 'bg-background border-b border-border' : 'bg-transparent'}`}>
      <div className="max-w-container mx-auto px-6 lg:px-12 py-4 flex items-center justify-between">
        <div className="text-lg font-semibold text-text-primary">Maxionlabs</div>
        <button
          onClick={handleScroll}
          className="bg-accent text-background px-6 py-2 rounded-button font-medium hover:opacity-90 transition-opacity"
        >
          Book
        </button>
      </div>
    </nav>
  )
}
