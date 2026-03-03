'use client'

import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { fadeInUp, staggerContainer, staggerItem } from '@/lib/animations'

/**
 * Hero Section Component
 *
 * Centered single-column layout with VSL above the fold.
 * Headline, sub-headline, VSL player, benefit strip, and CTA button.
 */
export function Hero() {
  return (
    <section
      data-testid="hero-section"
      className="max-w-container mx-auto px-6 lg:px-12 pt-24 lg:pt-32 pb-16 lg:pb-24"
    >
      <motion.div
        data-testid="hero-content"
        className="flex flex-col items-center text-center gap-10 lg:gap-12 max-w-4xl mx-auto"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        {/* Headline and Subhead */}
        <HeroContent />

        {/* VSL Player */}
        <div className="w-full flex justify-center">
          <VSLPlayer />
        </div>

        {/* Benefit Strip */}
        <BenefitStrip />

        {/* CTA Button */}
        <HeroCTA />

        {/* Mini Testimonial */}
        <motion.p
          variants={fadeInUp}
          className="text-sm md:text-base text-text-secondary/80 italic max-w-lg"
        >
          &ldquo;Max&apos;s system is incredibly thorough.&rdquo;{' '}
          <span className="not-italic text-text-secondary/60">
            - Kidous Mahteme, Co-founder @ Inframail
          </span>
        </motion.p>
      </motion.div>
    </section>
  )
}

/**
 * Hero Content Component
 *
 * Contains H1 headline and sub-headline paragraph.
 */
function HeroContent() {
  return (
    <motion.div
      className="flex flex-col gap-4 lg:gap-6"
      variants={staggerItem}
    >
      <motion.h1
        className="text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary leading-tight tracking-tight"
        variants={fadeInUp}
      >
        We Book Sales Meetings. You Only Pay When They{' '}
        <span className="text-gradient">Actually Show Up</span>
      </motion.h1>

      <motion.p
        data-testid="hero-subheadline"
        className="text-lg md:text-xl text-text-secondary leading-relaxed"
        variants={fadeInUp}
      >
        We run cold outbound that books qualified meetings on your calendar. You pay per meeting.
      </motion.p>
    </motion.div>
  )
}

/**
 * Benefit Strip Component
 *
 * Horizontal inline checkmarks below VSL.
 */
function BenefitStrip() {
  return (
    <motion.div
      variants={fadeInUp}
      className="flex flex-wrap justify-center gap-x-8 gap-y-3"
    >
      <span className="flex items-center gap-2 text-sm md:text-base text-text-secondary">
        <Check className="w-4 h-4 text-[#00d9ff]" strokeWidth={3} />
        Pay Per Meeting
      </span>
      <span className="flex items-center gap-2 text-sm md:text-base text-text-secondary">
        <Check className="w-4 h-4 text-[#00d9ff]" strokeWidth={3} />
        No Meetings = No Bill
      </span>
      <span className="flex items-center gap-2 text-sm md:text-base text-text-secondary">
        <Check className="w-4 h-4 text-[#00d9ff]" strokeWidth={3} />
        No Long-Term Lock-In
      </span>
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
        Free Growth Mapping Call
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
        className="relative aspect-video w-full rounded-card overflow-hidden"
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
