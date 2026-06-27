'use client'

import { motion } from 'framer-motion'
import { fadeInUp, staggerContainer, staggerItem, viewportOptions } from '@/lib/animations'

/**
 * V2 Problem Section Component
 *
 * "I tried cold email before" - names the three common failure modes:
 * - Wrong list
 * - Untested offer
 * - Copy variants on bad offer
 *
 * Principle 6.1 (Iles/Gordon): Pre-empt the primary objection with mechanism
 */
export function V2Problem() {
  const failureMode = [
    { title: 'You tested copy', description: 'But not the offer. Copy variants on a bad offer still fail.' },
    { title: 'You hit wrong list', description: 'Scraped database or untargeted segment. Wrong person, no matter the email.' },
    { title: 'You scaled too fast', description: 'No validation. One email template to 5,000 people. Most bounced or marked spam.' },
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
          {/* Section intro */}
          <motion.div className="text-center max-w-3xl mx-auto" variants={fadeInUp}>
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
              If you tried cold email and got nothing.
            </h2>
            <p className="text-text-secondary text-lg">
              You probably hit one of three walls. Most setups fail at the same point.
            </p>
          </motion.div>

          {/* Three failure modes */}
          <motion.div
            className="grid md:grid-cols-3 gap-6 lg:gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOptions}
          >
            {failureMode.map((mode, idx) => (
              <motion.div
                key={idx}
                className="bg-secondary rounded-card p-8 border border-border hover:border-accent hover:border-opacity-50 transition-colors"
                variants={staggerItem}
              >
                <h3 className="text-xl font-semibold text-text-primary mb-3">{mode.title}</h3>
                <p className="text-text-secondary leading-relaxed">{mode.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
