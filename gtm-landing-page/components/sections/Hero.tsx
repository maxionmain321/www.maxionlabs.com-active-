'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { fadeInUp, staggerContainer, staggerItem, viewportOptions } from '@/lib/animations'

/**
 * Hero Section Component
 *
 * Centered single-column layout with VSL above the fold.
 * Headline, sub-headline, VSL player, and CTA button.
 */
export function Hero() {
  return (
    <section
      data-testid="hero-section"
      className="max-w-container mx-auto px-6 lg:px-12 py-16 lg:py-24"
    >
      <motion.div
        data-testid="hero-content"
        className="flex flex-col items-center text-center gap-8 max-w-4xl mx-auto"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        {/* Headline and Subhead */}
        <HeroContent />

        {/* VSL Player */}
        <VSLPlayer />

        {/* CTA Button */}
        <HeroCTA />

        {/* Scroll Hint */}
        <motion.p
          variants={fadeInUp}
          className="text-sm text-text-secondary/70 mt-2"
        >
          Don&apos;t want to watch? Scroll down for the breakdown →
        </motion.p>
      </motion.div>
    </section>
  )
}

/**
 * Hero Content Component
 *
 * Contains H1 headline and sub-headline paragraph.
 * Applies fade-in-up animation on page load.
 */
function HeroContent() {
  return (
    <motion.div
      className="flex flex-col gap-4 lg:gap-6"
      variants={staggerItem}
    >
      {/* H1 Headline */}
      <motion.h1
        className="text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary leading-tight tracking-tight"
        variants={fadeInUp}
      >
        Pay Only for Sales Meetings That{' '}
        <span className="text-[#00d9ff]">Actually Show Up</span>
      </motion.h1>

      {/* Sub-headline - Split into 3 parts for emphasis */}
      <motion.div
        data-testid="hero-subheadline"
        className="flex flex-col gap-4 items-center w-full"
        variants={fadeInUp}
      >
        <p className="text-lg md:text-xl text-text-secondary leading-relaxed">
          Performance-based appointment setting for B2B companies
        </p>

        {/* Highlighted Pricing Card */}
        <div className="relative px-8 py-6 rounded-xl bg-accent-primary/10 border-2 border-accent-primary/30 backdrop-blur-sm">
          <div className="absolute inset-0 bg-gradient-to-r from-accent-primary/5 via-accent-primary/10 to-accent-primary/5 rounded-xl" />
          <div className="relative flex flex-col items-center gap-1">
            <p className="text-5xl md:text-6xl font-bold text-accent-primary">
              $300
            </p>
            <p className="text-base md:text-lg text-text-primary font-medium">
              per qualified meeting
            </p>
          </div>
        </div>

        <p className="text-base md:text-lg text-text-secondary/80">
          No retainers. No brand damage. Just sales calls.
        </p>
      </motion.div>
    </motion.div>
  )
}

/**
 * Hero CTA Component
 *
 * CTA button with shimmer effect positioned below VSL.
 */
function HeroCTA() {
  return (
    <motion.div variants={fadeInUp} className="mt-4">
      <Button
        variant="shimmer"
        size="xl"
        className="font-semibold"
        onClick={() => {
          document.getElementById('book-call')?.scrollIntoView({ behavior: 'smooth' })
        }}
      >
        Book Your Strategy Call
      </Button>
    </motion.div>
  )
}

/**
 * VSL Player Component
 *
 * 16:9 aspect ratio container with YouTube embed.
 * Max-width 800px, centered, full width on mobile.
 * No autoplay, controls visible.
 */
function VSLPlayer() {
  return (
    <motion.div
      variants={staggerItem}
      className="w-full max-w-[800px]"
    >
      <div
        data-testid="vsl-player"
        className="relative aspect-video w-full rounded-card border border-border bg-background/50 backdrop-blur-md overflow-hidden"
      >
        <iframe
          src="https://www.youtube.com/embed/hwHyER9B_V0?rel=0"
          title="VSL Video"
          allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 w-full h-full"
        />
      </div>
    </motion.div>
  )
}


export default Hero
