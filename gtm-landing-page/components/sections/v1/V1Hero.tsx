'use client'

import { motion } from 'framer-motion'
import { fadeInUp, staggerContainer } from '@/lib/animations'

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
          animate="visible"
        >
          <motion.span
            className="text-accent text-xs font-mono uppercase tracking-[0.25em]"
            variants={fadeInUp}
          >
            B2B cold outbound — 90-day pilot
          </motion.span>

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

          <motion.div
            className="flex items-center gap-8 pt-8 border-t border-border w-full"
            variants={fadeInUp}
          >
            <div className="flex flex-col">
              <span className="text-3xl font-bold text-text-primary">7</span>
              <span className="text-xs text-text-secondary uppercase tracking-[0.2em] mt-1">clients</span>
            </div>
            <div className="flex flex-col">
              <span className="text-3xl font-bold text-text-primary">92K</span>
              <span className="text-xs text-text-secondary uppercase tracking-[0.2em] mt-1">emails sent</span>
            </div>
            <div className="flex flex-col">
              <span className="text-3xl font-bold text-text-primary">287</span>
              <span className="text-xs text-text-secondary uppercase tracking-[0.2em] mt-1">engaged leads</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
