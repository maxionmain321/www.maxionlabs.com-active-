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
            Profitable AND predictable acquisition, from a channel you control.
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl text-text-secondary leading-relaxed"
            variants={fadeInUp}
          >
            A custom cold outbound engine that fills your calendar with qualified meetings, so sales reps just close and collect revenue.
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
              src="https://www.youtube.com/embed/QlpX7tN8hIE?rel=0"
              title="VSL"
              allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
            />
          </div>
        </motion.div>

        <motion.div variants={fadeInUp} className="w-full max-w-[600px]">
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
                Pay <span className="text-accent">ONCE</span> for the 90-day build. No retainer, no variable cost.
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
                <span className="font-semibold text-accent">Guaranteed:</span> at least 8 qualified meetings in 90 days, or{' '}
                <span className="font-serif italic">FULL money back.</span>
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          variants={staggerItem}
          className="w-full max-w-[720px] flex flex-col gap-5 text-left"
        >
          <div className="rounded-card border border-border/70 bg-background/40 p-5 lg:p-6">
            <p className="text-base md:text-lg font-semibold text-text-primary mb-1.5">
              Already know cold email works for you?
            </p>
            <p className="text-sm md:text-base text-text-secondary leading-relaxed">
              Let&apos;s discuss whether we can skip the pilot and just scale it profitably for you.{' '}
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
              Self-serve or PLG motions don&apos;t fit the standard pilot. But the case studies below show what we can do, and we&apos;re confident we can make it work profitably for both of us.{' '}
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
