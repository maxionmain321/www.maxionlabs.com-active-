'use client'

import { motion } from 'framer-motion'
import { fadeInUp, viewportOptions } from '@/lib/animations'

/**
 * V3 Claim Section Component
 *
 * One bold mechanism claim, full viewport breathing room.
 * Centered, simple, one claim only.
 *
 * Principle 4.1 (Iles): Text-first, one claim per section
 * Principle X.1 (Iles): Lead with the gift and stop
 */
export function V3Claim() {
  return (
    <section className="bg-background py-32 lg:py-48 border-b border-border">
      <div className="max-w-container mx-auto px-6 lg:px-12 flex items-center justify-center min-h-[50vh]">
        <motion.div
          className="text-center"
          initial="hidden"
          whileInView="visible"
          viewport={viewportOptions}
        >
          <motion.p
            className="text-3xl md:text-4xl lg:text-5xl font-semibold text-text-primary max-w-3xl leading-tight"
            variants={fadeInUp}
          >
            We test offer frames before scaling. Most setups skip this and fail.
          </motion.p>
        </motion.div>
      </div>
    </section>
  )
}
