'use client'

import { motion } from 'framer-motion'
import { fadeInUp, staggerContainer, viewportOptions } from '@/lib/animations'

/**
 * V2 Hero Section Component
 *
 * Mechanism headline + locked public hook as sub-headline + CTA button
 *
 * Principle 1.3 (Gordon): Stage-3 market requires mechanism headline
 * Principle 1.1 (Iles): Locked public hook frames the offer
 */
export function V2Hero() {
  const handleScroll = (e: React.MouseEvent) => {
    e.preventDefault()
    const element = document.getElementById('v2-book')
    element?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="bg-background pt-32 pb-20 lg:py-48 border-b border-border">
      <div className="max-w-container mx-auto px-6 lg:px-12">
        <motion.div
          className="flex flex-col items-center text-center gap-8"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOptions}
        >
          {/* Mechanism Headline */}
          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary leading-tight max-w-4xl"
            variants={fadeInUp}
          >
            We test four offer frames before a single email scales.
          </motion.h1>

          {/* Locked Public Hook */}
          <motion.p
            className="text-lg md:text-xl text-text-secondary max-w-2xl leading-relaxed"
            variants={fadeInUp}
          >
            Pay us once to find out if cold email will work for you. 90 days. No retainer.
          </motion.p>

          {/* CTA Button */}
          <motion.div variants={fadeInUp}>
            <button
              onClick={handleScroll}
              className="bg-accent text-background px-8 py-4 rounded-button font-semibold hover:opacity-90 transition-opacity text-lg"
            >
              Apply now to see if we can help
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
