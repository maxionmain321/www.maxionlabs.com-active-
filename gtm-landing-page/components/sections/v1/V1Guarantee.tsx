'use client'

import { motion } from 'framer-motion'
import { fadeInUp, staggerContainer, viewportOptions } from '@/lib/animations'

/**
 * V1 Guarantee Section Component
 *
 * 8 qualified meetings in 90 days or full money back guarantee card.
 * Headline + PS format per mentor principle 3.4
 *
 * Principle 3.2 (Iles): Guarantee the conservative floor you always hit
 * Principle 3.4 (Gordon): Guarantee is standing out in marketing, not closing on calls
 */
export function V1Guarantee() {
  return (
    <section className="bg-background py-20 lg:py-32 border-b border-border">
      <div className="max-w-container mx-auto px-6 lg:px-12">
        <motion.div
          className="flex flex-col items-center"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOptions}
        >
          <motion.div
            className="bg-secondary border border-accent border-opacity-30 rounded-card p-12 lg:p-16 max-w-2xl w-full text-center"
            variants={fadeInUp}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-6">
              8 qualified meetings in 90 days or full money back.
            </h2>
            <p className="text-text-secondary text-lg leading-relaxed mb-8">
              We guarantee you will get qualified meetings. If you don't, you don't pay. That's it.
            </p>
            <p className="text-text-secondary text-sm">
              You approve our copy fast. We execute. Simple.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
