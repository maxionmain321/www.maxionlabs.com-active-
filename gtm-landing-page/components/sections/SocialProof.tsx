'use client'

import { motion } from 'framer-motion'
import { staggerContainer, staggerItem, viewportOptions } from '@/lib/animations'

/**
 * Social Proof Strip Component
 *
 * Three-stat strip between Hero and CaseStudy with prominent numbers.
 */
export function SocialProof() {
  return (
    <section
      data-testid="social-proof-section"
      className="max-w-container mx-auto px-6 lg:px-12 py-12 lg:py-16"
    >
      <motion.div
        className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOptions}
      >
        <StatItem value="4" label="Active Clients" />
        <StatItem value="a16z-backed" label="Startup in Portfolio" />
        <StatItem value="500K+" label="Emails Sent in 5 Months" />
      </motion.div>
    </section>
  )
}

function StatItem({ value, label }: { value: string; label: string }) {
  return (
    <motion.div variants={staggerItem} className="flex flex-col items-center gap-1 text-center">
      <p className="text-2xl md:text-3xl font-bold text-gradient">{value}</p>
      <p className="text-sm text-text-secondary/70">{label}</p>
    </motion.div>
  )
}

export default SocialProof
