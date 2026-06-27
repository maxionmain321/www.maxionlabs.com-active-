'use client'

import { motion } from 'framer-motion'
import { fadeInUp, staggerContainer, staggerItem, viewportOptions } from '@/lib/animations'

/**
 * V2 Offer Section Component
 *
 * 4-step plan: Day 1, Day 14, Day 30, Day 90
 * Each step resolves one objection.
 *
 * Principle 4.3 (Iles): Plan section IS the objection stack
 * Principle 9.7 (Haynes): Speed-to-result is an offer-design primitive
 */
export function V2Offer() {
  const plan = [
    {
      day: 'Day 1',
      title: 'Lock your ICP and test offer frames',
      description: 'We validate who buys from you. Four offer angles get sent to a small segment. We measure replies.',
    },
    {
      day: 'Day 14',
      title: 'First campaign goes live',
      description: 'Validated offer, qualified segment, professional copy. Your reps start getting inbound.',
    },
    {
      day: 'Day 30',
      title: 'First reply data hits your inbox',
      description: 'You see what works. We adjust based on data. Qualified leads flow in.',
    },
    {
      day: 'Day 90',
      title: 'Validated channel or extend free',
      description: 'You hit 8 qualified meetings and close them, or we run it again free until you do.',
    },
  ]

  return (
    <section className="bg-background py-20 lg:py-32 border-b border-border">
      <div className="max-w-container mx-auto px-6 lg:px-12">
        <motion.div
          className="flex flex-col gap-12 lg:gap-16"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOptions}
        >
          {/* Section headline */}
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-text-primary text-center max-w-3xl mx-auto"
            variants={fadeInUp}
          >
            Here is how the 90-day pilot works.
          </motion.h2>

          {/* Four-step plan */}
          <motion.div
            className="grid md:grid-cols-2 gap-8 lg:gap-10"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOptions}
          >
            {plan.map((step, idx) => (
              <motion.div
                key={idx}
                className="flex flex-col gap-3 bg-secondary rounded-card p-8 border border-border"
                variants={staggerItem}
              >
                <div className="text-accent text-sm font-semibold">{step.day}</div>
                <h3 className="text-xl font-semibold text-text-primary">{step.title}</h3>
                <p className="text-text-secondary leading-relaxed">{step.description}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Pricing highlight */}
          <motion.div
            className="bg-secondary rounded-card p-12 border border-accent border-opacity-30 text-center max-w-2xl mx-auto"
            variants={fadeInUp}
          >
            <p className="text-text-secondary text-lg mb-4">Flat rate. No retainer. No hidden fees.</p>
            <p className="text-text-primary text-2xl md:text-3xl font-bold">$9K for the 90-day pilot</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
