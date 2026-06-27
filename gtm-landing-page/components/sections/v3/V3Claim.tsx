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
    <section className="bg-background min-h-[70vh] flex items-center px-6 lg:px-12">
      <div className="max-w-5xl mx-auto w-full">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOptions}
        >
          <motion.p
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary leading-tight max-w-3xl"
            variants={fadeInUp}
          >
            We test offer frames before scaling. Most setups skip this and fail.
          </motion.p>
        </motion.div>
      </div>
    </section>
  )
}
