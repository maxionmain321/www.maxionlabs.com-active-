'use client'

import { motion } from 'framer-motion'
import { fadeInUp, staggerContainer, viewportOptions } from '@/lib/animations'

/**
 * V3 Hero Section Component
 *
 * Guarantee as headline (Principle 1.1).
 * Sub creates open loop (Principle 1.2).
 * Single CTA button.
 *
 * Massive whitespace, large type, minimal hierarchy.
 */
export function V3Hero() {
  const handleScroll = () => {
    document.getElementById('v3-book')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="bg-background min-h-screen flex flex-col justify-center px-6 lg:px-12 py-32">
      <div className="max-w-5xl mx-auto w-full">
        <motion.div
          className="flex flex-col items-start gap-10"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOptions}
        >
          <motion.h1
            className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold text-text-primary leading-[0.88] tracking-tight"
            variants={fadeInUp}
          >
            8 qualified meetings.{' '}
            <span className="text-accent">90 days.</span>{' '}
            Or your money back.
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl text-text-secondary max-w-lg leading-relaxed"
            variants={fadeInUp}
          >
            We handle cold outreach. You take the meetings.
          </motion.p>

          <motion.div variants={fadeInUp}>
            <button
              onClick={handleScroll}
              className="bg-accent text-background px-10 py-5 rounded-button font-semibold hover:opacity-90 transition-opacity text-base"
            >
              See if you qualify
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
