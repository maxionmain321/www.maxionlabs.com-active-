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
    <section className="bg-secondary py-24 lg:py-32">
      <div className="max-w-5xl mx-auto px-6 lg:px-12">
        <motion.div
          className="flex flex-col gap-10 max-w-2xl"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOptions}
        >
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-text-primary leading-tight"
            variants={fadeInUp}
          >
            Not for you if:
          </motion.h2>

          <div className="flex flex-col gap-6">
            <motion.p className="text-text-secondary text-xl" variants={fadeInUp}>
              Your reps cannot close warm leads.
            </motion.p>
            <motion.p className="text-text-secondary text-xl" variants={fadeInUp}>
              You need results in under 30 days.
            </motion.p>
            <motion.p className="text-text-secondary text-xl" variants={fadeInUp}>
              You want an agency on retainer.
            </motion.p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
