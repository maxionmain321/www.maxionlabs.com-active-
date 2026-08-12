'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { fadeInUp, staggerContainer, staggerItem } from '@/lib/animations'

export function Hero() {
  return (
    <section
      data-testid="hero-section"
      className="max-w-container mx-auto px-6 lg:px-12 pt-24 lg:pt-32 pb-16 lg:pb-24 min-h-[100svh] flex flex-col justify-center"
    >
      <motion.div
        className="flex flex-col items-center text-center gap-8 lg:gap-10 max-w-4xl mx-auto"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        <motion.div className="flex flex-col items-center gap-4 lg:gap-5" variants={staggerItem}>
          <motion.h1
            className="text-4xl md:text-5xl lg:text-[56px] font-bold text-text-primary leading-[1.1] tracking-tight"
            variants={fadeInUp}
          >
            Bigger and better commercial contracts in your area, just like your best accounts.
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl text-text-secondary leading-relaxed"
            variants={fadeInUp}
          >
            Those accounts are already working with another vendor. The only way in is the right
            message, to the person who actually signs, at the moment they are looking.
            That&apos;s what we help with.
          </motion.p>
        </motion.div>

        <motion.div variants={fadeInUp} className="flex flex-col items-center gap-4">
          <Button
            variant="shimmer"
            size="xl"
            className="font-semibold text-base sm:text-lg md:text-xl px-6 sm:px-10 py-6 max-w-full"
            onClick={() => {
              document.getElementById('book-call')?.scrollIntoView({ behavior: 'smooth' })
            }}
          >
            Apply for a pilot &rarr;
          </Button>
          <p className="text-xs text-text-secondary/60 font-mono text-center text-balance">
            Two commercial walkthroughs. One operator per metro at a time.
          </p>
        </motion.div>

        <motion.div variants={fadeInUp} className="w-full max-w-[600px] mt-10 lg:mt-20">
          <div className="rounded-card border border-accent/40 bg-accent/[0.08] px-6 py-5 flex flex-col gap-3 shadow-[0_0_45px_-12px_rgba(94,92,230,0.55)]">
            <div className="flex items-center justify-center gap-2.5 text-center">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                className="w-5 h-5 text-accent flex-shrink-0"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
              <p className="text-base md:text-lg font-semibold text-text-primary">
                You name the property types and the radius. We go after the{' '}
                <span className="text-accent">next tier of accounts</span> in it, and get you in the room with whoever signs.
              </p>
            </div>
          </div>
        </motion.div>

      </motion.div>
    </section>
  )
}

export default Hero
