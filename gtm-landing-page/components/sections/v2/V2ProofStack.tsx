'use client'

import { motion } from 'framer-motion'
import { fadeInUp, staggerContainer, staggerItem, viewportOptions } from '@/lib/animations'

/**
 * V2 Proof Stack Section Component
 *
 * Rapid-fire one-liners from clients + stats strip (volume = trust signal)
 * Each labeled [PLACEHOLDER] since no real client quotes in CONTENT.md
 *
 * Principle 5.6 (Gordon): 10-15 stacked case study one-liners for proof volume
 */
export function V2ProofStack() {
  const stats = [
    { number: '7', label: 'active B2B clients' },
    { number: '92K', label: 'emails sent' },
    { number: '287', label: 'interested engaged leads' },
  ]

  const proofs = [
    '[PLACEHOLDER] SaaS founder: "First qualified meetings in 3 months."',
    '[PLACEHOLDER] Fintech operator: "Pipeline velocity tripled."',
    '[PLACEHOLDER] Professional services: "9 qualified leads from cold reach."',
    '[PLACEHOLDER] B2B founder: "Reps actually want to use this."',
    '[PLACEHOLDER] Startup founder: "Not one dollar on ads. This works."',
    '[PLACEHOLDER] Agency owner: "Built a real cold channel."',
    '[PLACEHOLDER] SaaS marketer: "Closed two customers from this."',
    '[PLACEHOLDER] B2B operator: "Finally something that scales."',
  ]

  return (
    <section className="bg-background py-20 lg:py-28">
      <div className="max-w-5xl mx-auto px-6 lg:px-12">
        <motion.div
          className="flex flex-col gap-20"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOptions}
        >
          {/* Stats strip */}
          <motion.div
            className="flex flex-col md:flex-row items-center justify-center gap-16 md:gap-24 lg:gap-32"
            variants={staggerContainer}
          >
            {stats.map((stat) => (
              <motion.div
                key={stat.number}
                className="flex flex-col items-center gap-2"
                variants={staggerItem}
              >
                <div className="text-7xl md:text-8xl lg:text-9xl font-bold text-text-primary leading-none">{stat.number}</div>
                <div className="text-xs text-text-secondary uppercase tracking-[0.2em] mt-2">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* Testimonials */}
          <motion.div className="flex flex-col gap-8" variants={staggerContainer}>
            <motion.h2
              className="text-2xl md:text-3xl font-bold text-text-primary"
              variants={staggerItem}
            >
              From clients.
            </motion.h2>
            <div className="grid md:grid-cols-2 gap-6">
              {proofs.map((proof, idx) => (
                <motion.p
                  key={idx}
                  className="text-text-secondary text-base leading-relaxed border-l-2 border-accent pl-6"
                  variants={staggerItem}
                >
                  {proof}
                </motion.p>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
