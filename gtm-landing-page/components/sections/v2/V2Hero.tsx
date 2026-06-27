'use client'

import { motion } from 'framer-motion'
import { fadeInUp, staggerContainer } from '@/lib/animations'

/**
 * V2 Hero Section Component
 *
 * Mechanism headline + locked public hook as sub-headline + CTA button
 *
 * Principle 1.3 (Gordon): Stage-3 market requires mechanism headline
 * Principle 1.1 (Iles): Locked public hook frames the offer
 */
export function V2Hero() {
  const handleScroll = () => {
    document.getElementById('v2-book')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="bg-background pt-32 pb-24 lg:pt-48 lg:pb-32">
      <div className="max-w-5xl mx-auto px-6 lg:px-12">
        <motion.div
          className="flex flex-col items-start gap-8"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.span
            className="text-accent text-xs font-mono uppercase tracking-[0.25em]"
            variants={fadeInUp}
          >
            Cold outbound — validated before it scales
          </motion.span>

          <motion.h1
            className="text-6xl sm:text-7xl lg:text-9xl font-bold text-text-primary leading-[0.88] tracking-tight"
            variants={fadeInUp}
          >
            We test four offer frames.{' '}
            <span className="text-accent">Before one email scales.</span>
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl text-text-secondary max-w-xl leading-relaxed"
            variants={fadeInUp}
          >
            Pay us once to find out if cold email will work for you. 90 days. No retainer.
          </motion.p>

          <motion.div variants={fadeInUp}>
            <button
              onClick={handleScroll}
              className="bg-accent text-background px-8 py-4 rounded-button font-semibold hover:opacity-90 transition-opacity text-base"
            >
              Apply now
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
