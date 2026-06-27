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
    <section className="bg-secondary py-24 lg:py-32">
      <div className="max-w-5xl mx-auto px-6 lg:px-12">
        <motion.div
          className="flex flex-col gap-16"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOptions}
        >
          <motion.h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary leading-tight"
            variants={staggerItem}
          >
            The 90-day pilot.
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
            {plan.map((step) => (
              <motion.div key={step.day} className="flex flex-col gap-4" variants={staggerItem}>
                <span className="text-accent font-mono text-xs uppercase tracking-widest">{step.day}</span>
                <h3 className="text-xl font-semibold text-text-primary">{step.title}</h3>
                <p className="text-text-secondary text-base leading-relaxed">{step.description}</p>
              </motion.div>
            ))}
          </div>

          <motion.div className="pt-8 border-t border-border" variants={staggerItem}>
            <p className="text-text-secondary text-base mb-2">Flat rate. No retainer. No hidden fees.</p>
            <p className="text-text-primary text-4xl md:text-5xl font-bold">$9K</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
