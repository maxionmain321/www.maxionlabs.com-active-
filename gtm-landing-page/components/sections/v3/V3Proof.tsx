'use client'

import { motion } from 'framer-motion'
import { staggerContainer, staggerItem, viewportOptions } from '@/lib/animations'

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
    <section className="bg-secondary py-20 lg:py-28">
      <div className="max-w-5xl mx-auto px-6 lg:px-12">
        <motion.div
          className="flex flex-col md:flex-row items-center justify-center gap-16 md:gap-24 lg:gap-32"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOptions}
        >
          {stats.map((stat) => (
            <motion.div
              key={stat.number}
              className="flex flex-col items-center"
              variants={staggerItem}
            >
              <div className="text-7xl md:text-8xl lg:text-9xl font-bold text-text-primary leading-none">{stat.number}</div>
              <div className="text-xs text-text-secondary uppercase tracking-[0.2em] mt-3">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
