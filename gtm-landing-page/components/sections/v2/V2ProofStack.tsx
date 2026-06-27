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
    <section className="bg-background py-20 lg:py-32 border-b border-border">
      <div className="max-w-container mx-auto px-6 lg:px-12">
        <motion.div
          className="flex flex-col gap-16"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOptions}
        >
          {/* Stats strip */}
          <motion.div
            className="flex flex-col md:flex-row items-center justify-center gap-12 md:gap-20 py-8 border-y border-border"
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
                <div className="text-text-secondary text-sm md:text-base">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* One-liners section */}
          <motion.div variants={fadeInUp}>
            <h2 className="text-2xl md:text-3xl font-bold text-text-primary text-center mb-10">
              What our clients say.
            </h2>
            <motion.div
              className="grid md:grid-cols-2 gap-4"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOptions}
            >
              {proofs.map((proof, idx) => (
                <motion.div
                  key={idx}
                  className="bg-secondary rounded-card p-6 border border-border"
                  variants={staggerItem}
                >
                  <p className="text-text-secondary text-sm md:text-base leading-relaxed">{proof}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
