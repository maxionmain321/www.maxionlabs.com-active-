'use client'

import { motion } from 'framer-motion'
import { fadeInUp, staggerContainer, viewportOptions } from '@/lib/animations'

export function V1Guarantee() {
  return (
    <section className="bg-background py-24 lg:py-32">
      <div className="max-w-5xl mx-auto px-6 lg:px-12">
        <motion.div
          className="flex flex-col items-center"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOptions}
        >
          <motion.div
            className="border border-accent rounded-card p-12 lg:p-16 max-w-3xl w-full text-center"
            variants={fadeInUp}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-6 leading-tight">
              8 qualified meetings in 90 days.
            </h2>
            <p className="text-text-secondary text-lg">
              Or we return every dollar. No questions.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
