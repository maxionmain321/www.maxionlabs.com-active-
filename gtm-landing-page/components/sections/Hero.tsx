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
        className="flex flex-col items-center text-center gap-12 lg:gap-16 max-w-4xl mx-auto"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        <motion.div className="flex flex-col items-center gap-7 lg:gap-9" variants={staggerItem}>
          <motion.span
            className="inline-flex items-center gap-2.5 rounded-full border border-accent/35 bg-accent/[0.09] px-4 py-1.5 text-xs sm:text-sm font-semibold tracking-[0.02em] text-accent"
            variants={fadeInUp}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-accent" aria-hidden="true" />
            Performance based. You pay per qualified meeting held.
          </motion.span>

          <motion.h1
            className="text-4xl md:text-5xl lg:text-[56px] font-bold text-text-primary leading-[1.1] tracking-tight"
            variants={fadeInUp}
          >
            Who on your team owns filling your pipeline?
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl text-text-secondary leading-relaxed"
            variants={fadeInUp}
          >
            We do, completely hands off. 7 to 15 qualified meetings a month with the accounts you
            actually want, and you only pay for the ones that happen.
          </motion.p>
        </motion.div>

        <motion.div variants={fadeInUp} className="flex flex-col items-center gap-6">
          <Button
            variant="shimmer"
            size="xl"
            className="font-semibold text-base sm:text-lg md:text-xl px-6 sm:px-10 py-6 max-w-full"
            onClick={() => {
              document.getElementById('book-call')?.scrollIntoView({ behavior: 'smooth' })
            }}
          >
            Book a 20 minute call &rarr;
          </Button>
          <p className="text-sm text-text-secondary/70 text-center text-balance max-w-md">
            We take more risk with a performance based deal structure. That&apos;s exactly why we
            don&apos;t work with everyone. You&apos;ll know if we&apos;re a good fit in the first
            10 minutes.
          </p>
        </motion.div>


      </motion.div>
    </section>
  )
}

export default Hero
