'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { fadeInUp, staggerContainer, staggerItem } from '@/lib/animations'

export function Hero() {
  return (
    <section
      data-testid="hero-section"
      className="max-w-container mx-auto px-6 lg:px-12 pt-24 lg:pt-32 pb-16 lg:pb-24"
    >
      <motion.div
        className="flex flex-col items-center text-center gap-8 lg:gap-10 max-w-4xl mx-auto"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        <motion.div className="flex flex-col items-center gap-4 lg:gap-5" variants={staggerItem}>
          <motion.span
            variants={fadeInUp}
            className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-background/40 backdrop-blur-sm px-4 py-1.5 text-[11px] font-mono uppercase tracking-[0.18em] text-text-secondary"
          >
            <span className="h-1 w-1 rounded-full bg-text-secondary/60" />
            For B2B founders done with agency retainers
          </motion.span>

          <motion.h1
            className="text-4xl md:text-5xl lg:text-[56px] font-bold text-text-primary leading-[1.1] tracking-tight"
            variants={fadeInUp}
          >
            Pay us ONCE to find out if cold email will work for you{' '}
            <em className="font-serif italic font-normal text-text-primary">(90 days, no retainer)</em>
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl text-text-secondary leading-relaxed"
            variants={fadeInUp}
          >
            A turnkey outbound engine for B2B founders whose sales reps should be closing, not prospecting.
          </motion.p>
        </motion.div>

        <motion.div variants={fadeInUp} className="flex flex-col items-center gap-4">
          <Button
            variant="shimmer"
            size="xl"
            className="font-semibold text-lg md:text-xl px-10 py-6"
            onClick={() => {
              document.getElementById('book-call')?.scrollIntoView({ behavior: 'smooth' })
            }}
          >
            Book Free Growth Mapping Call &rarr;
          </Button>
          <p className="text-xs text-text-secondary/60 font-mono">
            Taking 2 new B2B clients per month · June 2026 spots open now
          </p>
        </motion.div>

        <motion.div variants={staggerItem} className="w-full max-w-[720px]">
          <div
            data-testid="vsl-player"
            className="relative aspect-video w-full rounded-card overflow-hidden"
          >
            <iframe
              src="https://www.youtube.com/embed/hwHyER9B_V0?rel=0"
              title="VSL"
              allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}

export default Hero
