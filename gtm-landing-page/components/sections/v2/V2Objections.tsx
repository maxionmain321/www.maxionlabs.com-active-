'use client'

import { motion } from 'framer-motion'
import { fadeInUp, staggerContainer, viewportOptions } from '@/lib/animations'

/**
 * V2 Objections Section Component
 *
 * "Not for you if" disqualification + cost of inaction paragraph
 *
 * Principle 6.4 (Iles): Push-away mid-page strengthens pull for right buyers
 * Principle 6.3 (Iles): Quantify the cost of inaction
 */
export function V2Objections() {
  return (
    <section className="bg-background py-24 lg:py-32">
      <div className="max-w-5xl mx-auto px-6 lg:px-12">
        <motion.div
          className="flex flex-col gap-12 max-w-3xl"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOptions}
        >
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-text-primary leading-tight"
            variants={fadeInUp}
          >
            Not for you if:
          </motion.h2>

          <div className="flex flex-col gap-6">
            <motion.p className="text-text-secondary text-xl leading-relaxed" variants={fadeInUp}>
              Your reps cannot close warm leads. This only works if your close process is solid.
            </motion.p>
            <motion.p className="text-text-secondary text-xl leading-relaxed" variants={fadeInUp}>
              You need results in under 30 days. We validate first. 90 days is the minimum.
            </motion.p>
            <motion.p className="text-text-secondary text-xl leading-relaxed" variants={fadeInUp}>
              You want a retainer agency. We charge flat. One price. Done.
            </motion.p>
          </div>

          <motion.div className="pt-8 border-t border-border" variants={fadeInUp}>
            <p className="text-text-secondary text-base leading-relaxed mb-4">
              Across 7 clients we have sent 92K emails and produced 287 engaged leads. The $9K pilot exists so you can find out if this works for your market in 90 days, not 12 months.
            </p>
            <p className="text-accent font-semibold">
              8 qualified meetings in 90 days or we return every dollar.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
