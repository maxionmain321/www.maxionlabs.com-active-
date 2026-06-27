'use client'

import { motion } from 'framer-motion'
import { fadeInUp, staggerContainer, viewportOptions } from '@/lib/animations'

/**
 * V3 Push-Away Section Component
 *
 * "This is NOT for you if" list (3 items max)
 * Disqualification = trust for right buyers
 *
 * Principle 6.4 (Iles): Push-away strengthens pull for right buyers
 */
export function V3PushAway() {
  return (
    <section className="bg-background py-24 lg:py-32 border-b border-border">
      <div className="max-w-container mx-auto px-6 lg:px-12">
        <motion.div
          className="flex flex-col gap-8 max-w-2xl mx-auto"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOptions}
        >
          <motion.h2
            className="text-2xl md:text-3xl font-bold text-text-primary"
            variants={fadeInUp}
          >
            This is not for you if:
          </motion.h2>

          <motion.ul
            className="space-y-4"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOptions}
          >
            <motion.li className="flex gap-4" variants={fadeInUp}>
              <span className="text-accent font-bold text-lg flex-shrink-0">•</span>
              <span className="text-text-secondary text-lg">Your reps cannot close warm leads.</span>
            </motion.li>
            <motion.li className="flex gap-4" variants={fadeInUp}>
              <span className="text-accent font-bold text-lg flex-shrink-0">•</span>
              <span className="text-text-secondary text-lg">You need results in under 90 days.</span>
            </motion.li>
            <motion.li className="flex gap-4" variants={fadeInUp}>
              <span className="text-accent font-bold text-lg flex-shrink-0">•</span>
              <span className="text-text-secondary text-lg">You want monthly retainers instead of flat fees.</span>
            </motion.li>
          </motion.ul>
        </motion.div>
      </div>
    </section>
  )
}
