'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { fadeInUp, staggerContainer, staggerItem } from '@/lib/animations'

/**
 * Proof numbers shown in the hero.
 *
 * emails: EmailBison live all-time across 8 workspaces = 242,128 (pulled 2026-08-29)
 *         + Instantly era 65,000 (Max's figure, hardcoded, not platform-verifiable:
 *           the Instantly account was deleted)
 *         + PlusVibe era 821,626 (ClearSpider 28k, PayPath 15k, Denvo 15k,
 *           Inframail 763,626)
 *         = 1,128,754
 *
 *   ⚠️ UNCONFIRMED: Inframail's 763,626 is 68% of that total on its own and is
 *   8.7x our largest-ever EmailBison account. Strip it and the claim drops to
 *   ~350K. Max to confirm before this ships.
 *
 * meetings: `meetings` ledger, status='qualified' = 98 (queried 2026-08-29).
 *   Note 10 of the 98 are Maxionlabs' own acquisition calls, not client delivery.
 *
 * clients: Max's list runs to 17 names; 15+ is the conservative claim.
 *
 * Canonical record of what is public: knowledge_base/maxionlabs-acquisition/
 * proof/case-studies/live-landing-page.md in the GTM repo.
 */
const STATS = [
  {
    value: '1,128,000+',
    label: 'Cold emails sent',
    note: 'Across every platform we have run since 2025',
  },
  {
    value: '98+',
    label: 'Qualified meetings held',
    note: 'Counted since we moved from delivering leads to booking meetings',
  },
  {
    value: '15+',
    label: 'Clients served',
    note: 'Done-for-you and advisory, over the last year',
  },
]

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
            Performance based 10 to 30 qualified meetings a month with small businesses.
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl text-text-secondary leading-relaxed"
            variants={fadeInUp}
          >
            Done for you, through cold outbound. You pay per qualified meeting held. So no-shows
            and not qualified ones are free of charge.
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
            Book a 20 minute call &rarr;
          </Button>
          <p className="text-sm text-text-secondary/70 text-center text-balance max-w-md">
            We take more risk with a performance based deal structure. That&apos;s exactly why we
            don&apos;t work with everyone. You&apos;ll know if we&apos;re a good fit in the first
            10 minutes.
          </p>
        </motion.div>

        <motion.div variants={fadeInUp} className="w-full max-w-3xl mt-12 lg:mt-16">
          <p className="text-xs font-semibold tracking-[0.14em] uppercase text-text-secondary/70 mb-6">
            Real client results
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-6">
            {STATS.map((s) => (
              <div key={s.label} className="flex flex-col items-center gap-1.5">
                <span className="text-3xl md:text-4xl font-bold text-text-primary tracking-tight">
                  {s.value}
                </span>
                <span className="text-sm font-medium text-text-primary">{s.label}</span>
                {s.note && (
                  <span className="text-xs text-text-secondary/80 leading-snug max-w-[210px]">
                    {s.note}
                  </span>
                )}
              </div>
            ))}
          </div>
        </motion.div>

      </motion.div>
    </section>
  )
}

export default Hero
