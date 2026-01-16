import type { Variants, Transition, TargetAndTransition } from 'framer-motion'

// Default transition settings matching spec (200ms ease-out for interactions)
export const defaultTransition: Transition = {
  duration: 0.2,
  ease: 'easeOut',
}

// Page load transition (600ms as per spec)
export const pageLoadTransition: Transition = {
  duration: 0.6,
  ease: [0.22, 1, 0.36, 1],
}

// Fade in from bottom animation (page load - y: 20px to 0, 600ms per spec)
export const fadeInUp: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
}

// Scroll reveal animation (whileInView, threshold 0.2, once: true per spec)
export const scrollReveal: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
}

// Stagger children animation container (100ms delay between items per spec)
export const staggerContainer: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1, // 100ms delay between items
      delayChildren: 0,
    },
  },
}

// Stagger children item - used with staggerContainer
export const staggerItem: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
}

// Scale on hover with 200ms transition
export const scaleOnHover: Variants = {
  initial: {
    scale: 1,
  },
  hover: {
    scale: 1.02,
    transition: {
      duration: 0.2,
      ease: 'easeOut',
    },
  },
}

// Glow pulse animation for VSL border (2s infinite as per spec)
export const glowPulse: Variants = {
  animate: {
    boxShadow: [
      '0 0 20px rgba(94, 92, 230, 0.3)',
      '0 0 40px rgba(94, 92, 230, 0.6)',
      '0 0 20px rgba(94, 92, 230, 0.3)',
    ],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
}

// Card glow border on hover
export const cardGlow: Variants = {
  initial: {
    borderColor: '#1F1F1F',
    boxShadow: '0 0 0 rgba(94, 92, 230, 0)',
  },
  hover: {
    borderColor: '#5E5CE6',
    boxShadow: '0 0 20px rgba(94, 92, 230, 0.3)',
    transition: {
      duration: 0.2,
      ease: 'easeOut',
    },
  },
}

// Fade in animation (simple opacity)
export const fadeIn: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
}

// Viewport options for scroll-triggered animations (threshold 0.2, once: true per spec)
export const viewportOptions = {
  once: true,
  amount: 0.2,
}

// Alternative viewport options for sections that need higher threshold
export const viewportOptionsHigh = {
  once: true,
  amount: 0.4,
}

// Helper function to check if reduced motion is preferred
export const prefersReducedMotion = (): boolean => {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

// Get animation variants based on reduced motion preference
// Returns undefined (no animation) when reduced motion is preferred
export const getAnimationVariants = (variants: Variants): Variants | undefined => {
  if (typeof window !== 'undefined' && prefersReducedMotion()) {
    return undefined
  }
  return variants
}

// No-animation variants for reduced motion - instant state
export const reducedMotionVariants: Variants = {
  hidden: {
    opacity: 1,
    y: 0,
  },
  visible: {
    opacity: 1,
    y: 0,
  },
}

// Create a motion-safe variant that respects reduced motion
export const createMotionSafeVariants = (variants: Variants): Variants => {
  return {
    hidden: variants.hidden,
    visible: {
      ...variants.visible,
      transition: {
        duration: 0,
      },
    },
  }
}

// Hover animation for interactive elements
export const hoverScale: TargetAndTransition = {
  scale: 1.02,
  transition: {
    duration: 0.2,
    ease: 'easeOut',
  },
}

// Tap animation for buttons
export const tapScale: TargetAndTransition = {
  scale: 0.98,
}

// Combined hover and tap props for motion components
export const interactiveProps = {
  whileHover: hoverScale,
  whileTap: tapScale,
}
