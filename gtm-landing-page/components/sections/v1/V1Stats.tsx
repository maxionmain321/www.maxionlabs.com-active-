'use client'

import { motion } from 'framer-motion'
import { fadeInUp, staggerContainer, staggerItem, viewportOptions } from '@/lib/animations'

/**
 * V1 Stats Section Component
 *
 * Three-stat strip: 7 active B2B clients · 92K emails sent · 287 interested engaged leads
 * Source: May 2026 across active clients
 *
 * Principle 1.6 (Iles): Lead with verifiable facts, not asserted expertise
 */
export function V1Stats() {
  const stats = [
    { number: '7', label: 'active B2B clients' },
    { number: '92K', label: 'emails sent' },
    { number: '287', label: 'interested engaged leads' },
  ]

  return (
    <section className="bg-background py-16 lg:py-20 border-b border-border">
      <div className="max-w-container mx-auto px-6 lg:px-12">
        <motion.div
          className="flex flex-col md:flex-row items-center justify-center gap-12 md:gap-20"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOptions}
        >
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              className="flex flex-col items-center gap-2"
              variants={staggerItem}
            >
              <div className="text-4xl md:text-5xl font-bold text-accent">{stat.number}</div>
              <div className="text-text-secondary text-sm md:text-base text-center">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
        <motion.p
          className="text-center text-text-secondary text-sm mt-8"
          variants={fadeInUp}
        >
          May 2026 across active clients
        </motion.p>
      </div>
    </section>
  )
}
