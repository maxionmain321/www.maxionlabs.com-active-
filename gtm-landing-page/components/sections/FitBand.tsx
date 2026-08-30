'use client'

import { motion } from 'framer-motion'
import { fadeInUp, staggerContainer, viewportOptions } from '@/lib/animations'

/**
 * Qualification band. Sits between the Hero and the problems section.
 *
 * Deliberately NOT positioning copy. The hero stays problem-shaped ("we book
 * qualified meetings with small businesses"); this band does the FILTERING.
 * Naming three markets here is a self-selection device, not a claim to be a
 * specialist in all three.
 *
 * The three verticals are the survivors of the 2026-08-30 niche screen. They
 * are expected to narrow to one as campaign data separates them, at which
 * point two rows get deleted and nothing else on the page has to change.
 */

const CRITERIA = [
  {
    head: '$2M to $15M in annual revenue',
    sub: 'Big enough to afford real outbound, small enough that building it in-house is the wrong use of your time.',
  },
  {
    head: 'You already have someone whose job is closing, and you already spend on winning new work',
    sub: 'This is not a new budget line. It is a better use of one you already have.',
  },
  {
    head: 'Your retention is fine. The growth has to come from new accounts',
    sub: 'You are not trying to fix churn. You are trying to add logos you chose, not the ones that happened to find you.',
  },
  {
    head: 'You run a commercial trades, commercial insurance, or commercial lending business',
    sub: 'These are the three markets where we get the best results right now.',
  },
]

export function FitBand() {
  return (
    <section
      data-testid="fit-band-section"
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
            Who this works best for
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary leading-tight">
            We get the best results for
          </h2>
        </motion.div>

        <motion.ul className="flex flex-col gap-4 w-full max-w-2xl mt-10" variants={fadeInUp}>
          {CRITERIA.map((c) => (
            <li
              key={c.head}
              className="flex gap-4 items-start rounded-card bg-secondary px-6 py-5 text-left ring-1 ring-inset ring-border/70"
            >
              <span
                className="flex-shrink-0 w-6 h-6 rounded-full bg-accent text-white text-xs flex items-center justify-center mt-1"
                aria-hidden="true"
              >
                ✓
              </span>
              <span className="flex flex-col gap-1">
                <span className="text-lg md:text-xl font-semibold text-text-primary leading-snug">
                  {c.head}
                </span>
                <span className="text-base text-text-secondary leading-relaxed">{c.sub}</span>
              </span>
            </li>
          ))}
        </motion.ul>
      </motion.div>
    </section>
  )
}

export default FitBand
