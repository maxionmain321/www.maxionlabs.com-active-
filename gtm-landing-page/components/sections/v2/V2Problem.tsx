'use client'

import { motion } from 'framer-motion'
import { fadeInUp, staggerContainer, staggerItem, viewportOptions } from '@/lib/animations'

/**
 * V2 Problem Section Component
 *
 * "I tried cold email before" - names the three common failure modes:
 * - Wrong list
 * - Untested offer
 * - Copy variants on bad offer
 *
 * Principle 6.1 (Iles/Gordon): Pre-empt the primary objection with mechanism
 */
export function V2Problem() {
  return (
    <section className="bg-secondary py-24 lg:py-32">
      <div className="max-w-5xl mx-auto px-6 lg:px-12">
        <motion.div
          className="flex flex-col gap-12"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOptions}
        >
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-text-primary leading-tight"
            variants={staggerItem}
          >
            Cold email has a reputation problem.
          </motion.h2>

          <div className="flex flex-col gap-6 max-w-2xl">
            <motion.p className="text-text-secondary text-xl leading-relaxed" variants={staggerItem}>
              Most agencies copy-paste the same sequence and call it outbound.
            </motion.p>
            <motion.p className="text-text-secondary text-xl leading-relaxed" variants={staggerItem}>
              They test copy. Not offer. Not ICP. Not timing.
            </motion.p>
            <motion.p className="text-text-primary text-xl font-medium leading-relaxed" variants={staggerItem}>
              That is why it did not work for you before.
            </motion.p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
