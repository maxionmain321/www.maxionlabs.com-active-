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
            For B2B revenue leaders done with agency retainers
          </motion.span>

          <motion.h1
            className="text-4xl md:text-5xl lg:text-[56px] font-bold text-text-primary leading-[1.1] tracking-tight"
            variants={fadeInUp}
          >
            Qualified meetings on your calendar before you pay us anything.
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl text-text-secondary leading-relaxed"
            variants={fadeInUp}
          >
            We build your cold outbound engine and front the first 5,000-contact test ourselves.
            If it books meetings, we scale it together. If it doesn&apos;t, you&apos;ve spent nothing.
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
            Book Profitable Outbound Workshop &rarr;
          </Button>
          <p className="text-xs text-text-secondary/60 font-mono">
            5 free tests per month, we front every one ourselves · July 2026 spots open now
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
                The test is <span className="text-accent">FREE</span>: 5,000 contacts, 7 days of sending, meetings land on your calendar.
              </p>
            </div>
            <div className="h-px w-full bg-accent/20" />
            <div className="flex items-center justify-center gap-2.5 text-center">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                className="w-5 h-5 text-accent flex-shrink-0"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
              </svg>
              <p className="text-base md:text-lg text-text-primary">
                <span className="font-semibold text-accent">One gate:</span> a free workshop first, where we find the one offer that pulls cold.
                We only run the test if we think it converts. We&apos;re fronting it, so we&apos;re honest about fit.
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          variants={staggerItem}
          className="w-full max-w-[720px] flex flex-col gap-5 text-left mt-8 lg:mt-14"
        >
          <div className="rounded-card border border-border/70 bg-background/40 p-5 lg:p-6">
            <p className="text-base md:text-lg font-semibold text-text-primary mb-1.5">
              Already know cold email works for you?
            </p>
            <p className="text-sm md:text-base text-text-secondary leading-relaxed">
              Let&apos;s skip the test and talk about scaling it profitably.{' '}
              <button
                onClick={() => document.getElementById('book-call')?.scrollIntoView({ behavior: 'smooth' })}
                className="text-accent font-medium hover:underline"
              >
                Book a call.
              </button>
            </p>
          </div>
          <div className="rounded-card border border-border/70 bg-background/40 p-5 lg:p-6">
            <p className="text-base md:text-lg font-semibold text-text-primary mb-1.5">
              Your sales motion isn&apos;t booked calls?
            </p>
            <p className="text-sm md:text-base text-text-secondary leading-relaxed">
              Self-serve and PLG motions don&apos;t fit the standard test. The case studies below show what we&apos;ve done for signup-driven products.{' '}
              <button
                onClick={() => document.getElementById('book-call')?.scrollIntoView({ behavior: 'smooth' })}
                className="text-accent font-medium hover:underline"
              >
                Book a call to scope a custom model.
              </button>
            </p>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}

export default Hero
