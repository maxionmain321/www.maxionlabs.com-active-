'use client'

import { motion } from 'framer-motion'
import { staggerContainer, staggerItem, viewportOptions } from '@/lib/animations'

export function V1DreamPain() {
  return (
    <section className="bg-secondary py-24 lg:py-32">
      <div className="max-w-5xl mx-auto px-6 lg:px-12">
        <motion.div
          className="grid md:grid-cols-2 gap-16 lg:gap-24"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOptions}
        >
          <motion.div className="flex flex-col gap-6" variants={staggerItem}>
            <span className="text-text-secondary text-xs uppercase tracking-[0.2em]">Right now</span>
            <div className="flex flex-col gap-4">
              <p className="text-text-secondary text-lg">Reps spend half their week building lists.</p>
              <p className="text-text-secondary text-lg">Cold email is inconsistent and hard to scale.</p>
              <p className="text-text-secondary text-lg">Meetings dried up. Inbound is not enough.</p>
            </div>
          </motion.div>

          <motion.div className="flex flex-col gap-6" variants={staggerItem}>
            <span className="text-accent text-xs uppercase tracking-[0.2em]">90 days from now</span>
            <div className="flex flex-col gap-4">
              <p className="text-text-primary text-lg">Reps close. We prospect.</p>
              <p className="text-text-primary text-lg">Tested offer angles. Predictable cold pipeline.</p>
              <p className="text-text-primary text-lg">8 qualified meetings guaranteed.</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
