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
    <section className="bg-background py-20 lg:py-32 border-b border-border">
      <div className="max-w-container mx-auto px-6 lg:px-12">
        <motion.div
          className="flex flex-col gap-12"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOptions}
        >
          {/* Section headline */}
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-text-primary text-center"
            variants={fadeInUp}
          >
            Our guarantee is simple.
          </motion.h2>

          {/* Two-guarantee grid */}
          <motion.div
            className="grid md:grid-cols-2 gap-8 lg:gap-10 max-w-4xl mx-auto w-full"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOptions}
          >
            {guarantees.map((guarantee, idx) => (
              <motion.div
                key={idx}
                className="bg-secondary rounded-card p-8 lg:p-10 border border-border flex flex-col gap-6"
                variants={staggerItem}
              >
                <div>
                  <h3 className="text-2xl font-bold text-text-primary mb-4">{guarantee.title}</h3>
                  <p className="text-text-secondary leading-relaxed">{guarantee.description}</p>
                </div>
                <div className="pt-4 border-t border-border">
                  <p className="text-accent font-semibold">{guarantee.highlight}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
