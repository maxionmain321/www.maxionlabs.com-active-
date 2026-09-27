'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { fadeInUp, staggerContainer, staggerItem } from '@/lib/animations'

export type HeroCopy = {
  eyebrow?: string
  headline: string
  guarantee: string
  sub: string
  without?: string
  cta: string
}

export const MAIN_HERO: HeroCopy = {
  headline: 'Qualified sales meetings, booked for you.',
  guarantee: 'You only pay per meeting when they show up and are qualified.',
  sub: "Done-for-you cold outbound, to accounts you'd actually want as customers.",
  without:
    'Without spending hours a week on it yourself, chasing no-shows, or sitting through meetings that go nowhere.',
  cta: 'Book your intro growth call',
}

export function Hero({ copy = MAIN_HERO }: { copy?: HeroCopy }) {
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
          {copy.eyebrow && (
            <motion.span
              className="text-sm sm:text-base font-semibold tracking-[0.02em] text-text-secondary"
              variants={fadeInUp}
            >
              {copy.eyebrow}
            </motion.span>
          )}

          <motion.h1
            className="text-4xl md:text-5xl lg:text-[56px] font-bold text-text-primary leading-[1.1] tracking-tight text-balance"
            variants={fadeInUp}
          >
            {copy.headline}
            <span className="block mt-3 text-accent">{copy.guarantee}</span>
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl text-text-secondary leading-relaxed text-balance"
            variants={fadeInUp}
          >
            {copy.sub}
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
            {copy.cta} &rarr;
          </Button>
          {copy.without && (
            <p className="text-sm text-text-secondary/70 text-center text-balance max-w-md">
              {copy.without}
            </p>
          )}
        </motion.div>
      </motion.div>
    </section>
  )
}

export default Hero
