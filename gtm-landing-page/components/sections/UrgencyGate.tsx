'use client'

import { motion } from 'framer-motion'
import { fadeInUp, staggerContainer, viewportOptions } from '@/lib/animations'

/**
 * Problem / mechanism section.
 * Sits directly under the hero, before the proof.
 *
 * Deliberate before/after rhythm: the problems read MUTED (grey markers,
 * secondary text, flat cards) and the mechanism reads LIVE (accent checks,
 * primary text). Same list shape both times so the eye reads it as the same
 * three things being answered, not two unrelated lists.
 *
 * No price on this page, only the structure.
 */

const PROBLEMS = [
  'You want a more proactive way to win accounts, instead of relying only on referrals',
  'Outbound works, right up until it is nobody\'s full-time job and it quietly stops',
  'Every time you have paid for leads, they were resold, recycled, or tire-kickers',
]

const SOLVES = [
  'Setting up cold email outbound for you',
  'Crafting a compelling, offer-focused message to people who have never heard of you',
  'Booking qualified meetings onto your calendar',
  'Making sure they show up',
]

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-xs font-semibold tracking-[0.16em] uppercase text-text-secondary/70">
      {children}
    </span>
  )
}

export function UrgencyGate() {
  return (
    <section
      data-testid="urgency-gate-section"
      className="max-w-container mx-auto px-6 lg:px-12 pt-32 lg:pt-44 pb-20 lg:pb-24"
    >
      <motion.div
        className="flex flex-col items-center max-w-3xl mx-auto"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOptions}
      >
        {/* ---- the problem ---- */}
        <motion.div className="flex flex-col items-center gap-5 text-center" variants={fadeInUp}>
          <Eyebrow>Where you probably are</Eyebrow>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary leading-tight">
            Common problems you&apos;re most likely facing
          </h2>
        </motion.div>

        <motion.ul className="flex flex-col gap-3 w-full max-w-2xl mt-12" variants={fadeInUp}>
          {PROBLEMS.map((p) => (
            <li
              key={p}
              className="flex gap-4 items-start rounded-card bg-secondary px-6 py-5 text-left ring-1 ring-inset ring-border/70"
            >
              <span
                className="flex-shrink-0 w-6 h-6 rounded-full border border-border bg-card text-text-secondary/60 text-sm flex items-center justify-center mt-0.5"
                aria-hidden="true"
              >
                –
              </span>
              <span className="text-lg md:text-xl text-text-secondary leading-relaxed">{p}</span>
            </li>
          ))}
        </motion.ul>

        {/* ---- the turn: makes the two halves read as one argument ---- */}
        <motion.div
          className="flex flex-col items-center mt-16 lg:mt-20"
          variants={fadeInUp}
          aria-hidden="true"
        >
          <span className="block w-px h-16 lg:h-20 bg-gradient-to-b from-transparent to-accent/40" />
          <span className="flex items-center justify-center w-11 h-11 rounded-full bg-accent text-white shadow-[0_8px_24px_-8px_rgba(94,92,230,0.7)]">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14m0 0l-6-6m6 6l6-6" />
            </svg>
          </span>
        </motion.div>

        {/* ---- the mechanism ---- */}
        <motion.div
          className="flex flex-col items-center gap-5 text-center mt-12 lg:mt-16"
          variants={fadeInUp}
        >
          <Eyebrow>What we do about it</Eyebrow>
          <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary leading-tight">
            We&apos;ll help you solve all that by
          </h3>
        </motion.div>

        <motion.ul className="flex flex-col gap-5 w-full max-w-2xl mt-12" variants={fadeInUp}>
          {SOLVES.map((s) => (
            <li key={s} className="flex gap-4 items-start text-left">
              <span
                className="flex-shrink-0 w-6 h-6 rounded-full bg-accent text-white text-xs flex items-center justify-center mt-1"
                aria-hidden="true"
              >
                ✓
              </span>
              <span className="text-lg md:text-xl text-text-primary leading-relaxed">{s}</span>
            </li>
          ))}
        </motion.ul>

        {/* ---- the pricing line, given its own weight ---- */}
        <motion.p
          className="w-full max-w-2xl mt-12 text-lg md:text-xl text-text-primary font-semibold leading-relaxed text-left"
          variants={fadeInUp}
        >
          What that gets you: a predictable number of the right accounts, without adding headcount
          to chase them.
        </motion.p>

        <motion.div
          className="w-full max-w-2xl mt-8 rounded-card border border-accent/40 bg-accent/[0.07] px-7 py-6"
          variants={fadeInUp}
        >
          <p className="text-lg md:text-xl leading-relaxed text-text-secondary text-left">
            <span className="text-text-primary font-semibold">
              And charging you only if they show up qualified
            </span>
            , via the criteria we agreed on when starting the engagement.
          </p>
        </motion.div>
      </motion.div>
    </section>
  )
}

export default UrgencyGate
