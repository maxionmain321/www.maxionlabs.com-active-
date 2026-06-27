'use client'

import { motion } from 'framer-motion'
import { fadeInUp, staggerContainer, staggerItem, viewportOptions } from '@/lib/animations'

/**
 * V3 Proof Section Component
 *
 * Single stat strip (3 numbers, no narrative)
 * Pure numbers. No explanation.
 *
 * Principle X.1 (Iles): One benefit, one proof, stop.
 */
export function V3Proof() {
  const stats = [
    { number: '7', label: 'clients' },
    { number: '92K', label: 'emails' },
    { number: '287', label: 'leads' },
  ]

  return (
    <section className="bg-background py-32 lg:py-48 border-b border-border">
      <div className="max-w-container mx-auto px-6 lg:px-12">
        <motion.div
          className="flex flex-col md:flex-row items-center justify-center gap-16 md:gap-32"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOptions}
        >
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              className="flex flex-col items-center"
              variants={staggerItem}
            >
              <div className="text-6xl md:text-7xl font-bold text-accent mb-3">{stat.number}</div>
              <div className="text-text-secondary text-base">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
