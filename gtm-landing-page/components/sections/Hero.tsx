'use client'

import { motion } from 'framer-motion'
import { Play } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { fadeInUp, staggerContainer, staggerItem, viewportOptions } from '@/lib/animations'

/**
 * Hero Section Component
 *
 * 50/50 split layout for desktop (1024px+), stacked for mobile/tablet.
 * Left column: H1 headline, sub-headline, CTA button with shimmer effect.
 * Right column: VSL player container with glassmorphism and pulsing indigo border glow.
 */
export function Hero() {
  return (
    <section
      data-testid="hero-section"
      className="max-w-container mx-auto px-6 lg:px-12 py-16 lg:py-24"
    >
      <motion.div
        data-testid="hero-grid"
        className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        {/* Left Column - Content */}
        <HeroContent />

        {/* Right Column - VSL Player */}
        <VSLPlayer />
      </motion.div>
    </section>
  )
}

/**
 * Hero Content Component
 *
 * Contains H1 headline, sub-headline paragraph, and CTA button.
 * Applies fade-in-up animation on page load.
 */
function HeroContent() {
  return (
    <motion.div
      className="flex flex-col gap-6 lg:gap-8"
      variants={staggerItem}
    >
      {/* H1 Headline */}
      <motion.h1
        className="text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary leading-tight tracking-tight"
        variants={fadeInUp}
      >
        GTM Systems for Agencies &amp; SaaS.
      </motion.h1>

      {/* Sub-headline */}
      <motion.p
        data-testid="hero-subheadline"
        className="text-lg md:text-xl text-text-secondary max-w-xl leading-relaxed"
        variants={fadeInUp}
      >
        Book 10+ qualified sales calls in 30 days or your money back.
        Premium outbound infrastructure built for growth.
      </motion.p>

      {/* CTA Button with Shimmer Effect */}
      <motion.div variants={fadeInUp}>
        <Button
          variant="shimmer"
          size="xl"
          className="font-semibold"
          onClick={() => {
            // External booking link - placeholder for actual implementation
            window.open('#book-call', '_blank')
          }}
        >
          Let&apos;s Book You Sales Calls
        </Button>
      </motion.div>
    </motion.div>
  )
}

/**
 * VSL Player Component
 *
 * 16:9 aspect ratio container with glassmorphism overlay,
 * centered play icon button, and pulsing indigo border glow.
 */
function VSLPlayer() {
  return (
    <motion.div
      variants={staggerItem}
      className="order-first lg:order-last"
    >
      <div
        data-testid="vsl-player"
        className="relative aspect-video w-full rounded-card border border-border bg-background/50 backdrop-blur-md overflow-hidden animate-pulse-glow"
      >
        {/* Glassmorphism Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent" />

        {/* Video Placeholder Container */}
        <div className="absolute inset-0 flex items-center justify-center">
          {/* Play Button */}
          <PlayButton />
        </div>

        {/* Video Embed Placeholder */}
        {/*
          Replace with actual YouTube embed or video source:
          <iframe
            src="https://www.youtube.com/embed/VIDEO_ID"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 w-full h-full"
          />
        */}
      </div>
    </motion.div>
  )
}

/**
 * Play Button Component
 *
 * Centered play icon button with keyboard accessibility,
 * visible focus ring, and hover effects.
 */
function PlayButton() {
  const handlePlay = () => {
    // Placeholder for video play functionality
    // This would typically show a modal with the video or start playback
    console.log('Play video clicked')
  }

  return (
    <button
      type="button"
      onClick={handlePlay}
      aria-label="Play video"
      className="group relative flex items-center justify-center w-20 h-20 rounded-full bg-accent/90 hover:bg-accent text-white transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background hover:scale-110"
    >
      {/* Outer Glow Ring */}
      <span
        className="absolute inset-0 rounded-full bg-accent/20 animate-ping"
        aria-hidden="true"
      />

      {/* Play Icon */}
      <Play className="w-8 h-8 ml-1 fill-current" />
    </button>
  )
}

export default Hero
