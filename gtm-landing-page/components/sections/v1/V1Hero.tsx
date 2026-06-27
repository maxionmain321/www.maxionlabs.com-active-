'use client'

import { motion } from 'framer-motion'
import { fadeInUp, staggerContainer, viewportOptions } from '@/lib/animations'

export function V1Hero() {
  const handleScroll = () => {
    document.getElementById('v1-book')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="bg-background pt-32 pb-24 lg:pt-48 lg:pb-32">
      <div className="max-w-5xl mx-auto px-6 lg:px-12">
        <motion.div
          className="flex flex-col items-start gap-8"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOptions}
        >
          <motion.h1
            className="text-6xl sm:text-7xl lg:text-9xl font-bold text-text-primary leading-[0.88] tracking-tight"
            variants={fadeInUp}
          >
            Your reps close deals.{' '}
            <span className="text-accent">Not lists.</span>
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl text-text-secondary max-w-xl leading-relaxed"
            variants={fadeInUp}
          >
            Pay once. 8 qualified meetings in 90 days or full money back.
          </motion.p>

          <motion.div variants={fadeInUp}>
            <button
              onClick={handleScroll}
              className="bg-accent text-background px-8 py-4 rounded-button font-semibold hover:opacity-90 transition-opacity text-base"
            >
              See if you qualify
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
