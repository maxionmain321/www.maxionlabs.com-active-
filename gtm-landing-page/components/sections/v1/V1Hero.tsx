'use client'

import { motion } from 'framer-motion'
import { fadeInUp, staggerContainer, viewportOptions } from '@/lib/animations'

/**
 * V1 Hero Section Component
 *
 * Dream after-state headline, no VSL.
 * Hero CTA button scrolls to #v1-book.
 * Guarantee pill below button.
 *
 * Principle 1.5 (Haynes): Stack two desires - time freed + pipeline
 * Principle 2.3 (Iles): Reframe metric from meetings to closed revenue
 * Principle 8.1 (Iles): Desirability before quality
 */
export function V1Hero() {
  const handleScroll = (e: React.MouseEvent) => {
    e.preventDefault()
    const element = document.getElementById('v1-book')
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
          {/* H1: Dream after-state */}
          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary leading-tight max-w-4xl"
            variants={fadeInUp}
          >
            Your reps close deals instead of prospecting.
          </motion.h1>

          {/* Sub: Mechanism in one line */}
          <motion.p
            className="text-lg md:text-xl text-text-secondary max-w-2xl leading-relaxed"
            variants={fadeInUp}
          >
            Pay once. 90 days. Qualified meetings guaranteed or full money back.
          </motion.p>

          {/* CTA Button */}
          <motion.div variants={fadeInUp}>
            <button
              onClick={handleScroll}
              className="bg-accent text-background px-8 py-4 rounded-button font-semibold hover:opacity-90 transition-opacity text-lg"
            >
              See if your business qualifies
            </button>
          </motion.div>

          {/* Guarantee pill */}
          <motion.div
            className="border border-accent rounded-card px-4 py-2 text-text-secondary text-sm"
            variants={fadeInUp}
          >
            8 qualified meetings in 90 days or full money back
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
