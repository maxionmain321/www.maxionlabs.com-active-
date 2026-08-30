'use client'

import { motion } from 'framer-motion'
import { fadeInUp, staggerContainer, viewportOptions } from '@/lib/animations'

/**
 * Disqualifiers. Pairs directly with FitBand: who it works for, then who it does not.
 *
 * Restores the no-list that was live before the problems-section rewrite dropped it.
 * Every entry is paid-for doctrine from business-model.md § NEVER. With a burned,
 * cynical buyer, naming who you turn away is the fastest credibility purchase
 * available, and it does the filtering before anyone books.
 */

const NOT_FOR = [
  ['You sell to enterprises', 'Big companies have forty vendors pointed at them and a gatekeeper. Cold outbound does not reach that buyer, and we have the scar tissue to prove it.'],
  ['You are creating a category', 'If the market is not already buying what you sell, meetings do not convert and we both waste a quarter finding out.'],
  ['Buying takes a committee', 'Same problem as enterprise, slower.'],
  ['You cannot staff the meetings', 'Fifteen meetings a month is a real load. If you cannot service them we will book meetings you resent, and you will be right.'],
  ['You are optimizing for price', 'We will be one of the more expensive options in front of you.'],
]

export function NotForYou() {
  return (
    <section
      data-testid="not-for-you-section"
      className="max-w-container mx-auto px-6 lg:px-12 py-20 lg:py-24"
    >
      <motion.div
        className="flex flex-col items-center max-w-3xl mx-auto"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOptions}
      >
        <motion.div className="flex flex-col items-center gap-4 text-center" variants={fadeInUp}>
          <span className="text-xs font-semibold tracking-[0.16em] uppercase text-text-secondary/70">
            And who it is not for
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary leading-tight">
            We would rather tell you now
          </h2>
        </motion.div>

        <motion.ul className="flex flex-col gap-4 w-full max-w-2xl mt-10" variants={fadeInUp}>
          {NOT_FOR.map(([head, sub]) => (
            <li key={head} className="flex gap-4 items-start text-left">
              <span
                className="flex-shrink-0 w-6 h-6 rounded-full border border-border bg-secondary text-text-secondary/70 text-sm flex items-center justify-center mt-1"
                aria-hidden="true"
              >
                ×
              </span>
              <span className="flex flex-col gap-1">
                <span className="text-lg md:text-xl font-semibold text-text-primary leading-snug">
                  {head}
                </span>
                <span className="text-base text-text-secondary leading-relaxed">{sub}</span>
              </span>
            </li>
          ))}
        </motion.ul>
      </motion.div>
    </section>
  )
}

export default NotForYou
