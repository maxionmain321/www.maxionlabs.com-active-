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
    <section className="bg-background py-20 lg:py-32 border-b border-border">
      <div className="max-w-container mx-auto px-6 lg:px-12">
        <motion.div
          className="flex flex-col gap-12 max-w-3xl mx-auto"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOptions}
        >
          {/* Push-away section */}
          <motion.div variants={fadeInUp}>
            <h2 className="text-2xl md:text-3xl font-bold text-text-primary mb-6">
              This is not for you if:
            </h2>
            <ul className="space-y-4">
              <li className="flex gap-3">
                <span className="text-accent font-bold">•</span>
                <span className="text-text-secondary">Your reps cannot close warm leads. This only works if your close process is already solid.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-accent font-bold">•</span>
                <span className="text-text-secondary">You need results in 30 days. We validate first. 90 days is the minimum to show real volume.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-accent font-bold">•</span>
                <span className="text-text-secondary">You want a retainer-first agency. We charge flat. One price. Done.</span>
              </li>
            </ul>
          </motion.div>

          {/* Cost of inaction */}
          <motion.div
            className="bg-secondary rounded-card p-8 lg:p-12 border border-border"
            variants={fadeInUp}
          >
            <h3 className="text-xl font-semibold text-text-primary mb-4">
              The cost of not having a cold channel.
            </h3>
            <p className="text-text-secondary text-lg leading-relaxed mb-4">
              If your reps spend 60% of their time prospecting at a 30% close rate, that is roughly $25K per month in opportunity cost for every rep not closing. A $9K investment to reclaim that time and build a real cold channel pays for itself in one closed deal.
            </p>
            <p className="text-text-accent font-semibold">
              The question is not whether you can afford the pilot. It is whether you can afford not to run it.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
