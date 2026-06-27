'use client'

import { motion } from 'framer-motion'
import { fadeInUp, staggerContainer, staggerItem, viewportOptions } from '@/lib/animations'

/**
 * V2 Guarantee Section Component
 *
 * Two guarantee cards: entry guarantee + results guarantee
 *
 * Principle 3.1 (Iles): Two guarantees, two different fears. Both are required.
 */
export function V2Guarantee() {
  const guarantees = [
    {
      title: 'Entry Guarantee',
      description: 'We screen for fit before you commit. If we don\'t think your business qualifies, we tell you upfront. No surprises.',
      highlight: 'Or your money back',
    },
    {
      title: 'Results Guarantee',
      description: '8 qualified meetings in 90 days. You get them or we run the next 30 days free until you do.',
      highlight: 'Full money back if not',
    },
  ]

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
            variants={fadeInUp}
          >
            Two ways we remove your risk.
          </motion.h2>

          <motion.div
            className="grid md:grid-cols-2 gap-8 lg:gap-10"
            variants={staggerContainer}
          >
            {guarantees.map((guarantee, idx) => (
              <motion.div
                key={idx}
                className="border border-border rounded-card p-8 flex flex-col gap-6"
                variants={staggerItem}
              >
                <div>
                  <h3 className="text-xl font-bold text-text-primary mb-3">{guarantee.title}</h3>
                  <p className="text-text-secondary leading-relaxed">{guarantee.description}</p>
                </div>
                <p className="text-accent font-semibold text-sm">{guarantee.highlight}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
