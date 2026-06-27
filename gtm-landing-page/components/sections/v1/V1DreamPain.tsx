'use client'

import { motion } from 'framer-motion'
import { fadeInUp, staggerContainer, viewportOptions } from '@/lib/animations'

/**
 * V1 Dream/Pain Section Component
 *
 * Two-column "Before / After" showing reps grinding lists vs reps just closing
 * Principle X.1 (Iles): One claim per section - focus on the contrast
 */
export function V1DreamPain() {
  return (
    <section className="bg-background py-20 lg:py-32 border-b border-border">
      <div className="max-w-container mx-auto px-6 lg:px-12">
        <motion.div
          className="grid md:grid-cols-2 gap-8 lg:gap-12"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOptions}
        >
          {/* Before Column */}
          <motion.div
            className="flex flex-col gap-4"
            variants={fadeInUp}
          >
            <div className="text-text-secondary text-sm font-medium">Right now</div>
            <div className="bg-secondary rounded-card p-8 border border-border">
              <p className="text-text-primary text-lg leading-relaxed">
                Your reps are grinding lists instead of closing. Cold email feels personal but scales to zero. Meetings dried up. CAC went up.
              </p>
            </div>
          </motion.div>

          {/* After Column */}
          <motion.div
            className="flex flex-col gap-4"
            variants={fadeInUp}
          >
            <div className="text-accent text-sm font-medium">With validated cold outbound</div>
            <div className="bg-secondary rounded-card p-8 border border-accent border-opacity-30">
              <p className="text-text-primary text-lg leading-relaxed">
                Your reps close. We own the prospecting. Offer frames get tested before scaling. Cold email works because it is built on actual demand.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
