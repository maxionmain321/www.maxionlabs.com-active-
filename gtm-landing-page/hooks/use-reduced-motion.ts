'use client'

import { useState, useEffect } from 'react'

/**
 * Custom hook to detect if the user prefers reduced motion
 * Returns true if the user has reduced motion preference enabled
 */
export function useReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    // Check if window is available (client-side)
    if (typeof window === 'undefined') return

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')

    // Set initial value
    setPrefersReducedMotion(mediaQuery.matches)

    // Listen for changes
    const handleChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches)
    }

    // Add event listener
    mediaQuery.addEventListener('change', handleChange)

    // Cleanup
    return () => {
      mediaQuery.removeEventListener('change', handleChange)
    }
  }, [])

  return prefersReducedMotion
}

/**
 * Returns animation variants based on reduced motion preference
 * If reduced motion is preferred, returns undefined to disable animations
 */
export function useMotionSafeVariants<T>(variants: T): T | undefined {
  const prefersReducedMotion = useReducedMotion()

  if (prefersReducedMotion) {
    return undefined
  }

  return variants
}
