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
  const handleScroll = (e: React.MouseEvent) => {
    e.preventDefault()
    const element = document.getElementById('v3-book')
    element?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="bg-background pt-48 pb-32 lg:py-64 border-b border-border">
      <div className="max-w-container mx-auto px-6 lg:px-12">
        <motion.div
          className="flex flex-col items-center text-center gap-12 lg:gap-16"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOptions}
        >
          {/* Guarantee as headline */}
          <motion.h1
            className="text-5xl md:text-6xl lg:text-7xl font-bold text-text-primary leading-tight max-w-4xl"
            variants={fadeInUp}
          >
            8 qualified meetings in 90 days or full money back.
          </motion.h1>

          {/* Sub: Open loop */}
          <motion.p
            className="text-lg md:text-2xl text-text-secondary max-w-2xl leading-relaxed font-light"
            variants={fadeInUp}
          >
            Meetings don't pay bills. Close rate does.
          </motion.p>

          {/* Single CTA */}
          <motion.div variants={fadeInUp} className="pt-8">
            <button
              onClick={handleScroll}
              className="bg-accent text-background px-10 py-5 rounded-button font-semibold hover:opacity-90 transition-opacity text-lg"
            >
              See if you qualify
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
