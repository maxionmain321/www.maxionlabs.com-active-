'use client'

import { motion } from 'framer-motion'
import { fadeInUp, staggerContainer, viewportOptions } from '@/lib/animations'

/**
 * The terms. Publishes the qualified-meeting definition before anyone asks.
 *
 * Why this exists: "what counts as qualified" is the single most disputed point
 * in this category and the thing the research says destroys these relationships.
 * Every source describes the same failure, an agency billing for a meeting the
 * buyer considers worthless. Publishing the definition up front is the strongest
 * available move on perceived likelihood, and nobody else does it.
 *
 * Source: 00_foundation/offer-v3.md § 4.
 */

const CONDITIONS = [
  'They showed up',
  'They match the profile you gave us',
  'The person can sign, or can bring it to whoever does',
  'They knew what the meeting was about before they took it',
]

const WE_DONT = [
  'We do not touch your primary domain, ever',
  'We do not promise revenue. We promise meetings. Your sales cycle is yours',
]

export function TheTerms() {
  return (
    <section
      data-testid="terms-section"
      className="max-w-container mx-auto px-6 lg:px-12 py-20 lg:py-28"
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
            The part everyone argues about
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary leading-tight">
            What counts as qualified, agreed in writing before we send anything
          </h2>
        </motion.div>

        <motion.p
          className="text-lg md:text-xl text-text-secondary leading-relaxed mt-6 text-center max-w-2xl"
          variants={fadeInUp}
        >
          On your criteria, not ours. All four have to be true, and only on things we can
          actually verify.
        </motion.p>

        <motion.ul className="grid sm:grid-cols-2 gap-4 w-full max-w-2xl mt-10" variants={fadeInUp}>
          {CONDITIONS.map((c) => (
            <li
              key={c}
              className="flex gap-3 items-start rounded-card bg-secondary px-5 py-4 text-left ring-1 ring-inset ring-border/70"
            >
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent text-white text-xs flex items-center justify-center mt-0.5" aria-hidden="true">
                ✓
              </span>
              <span className="text-base md:text-lg text-text-primary leading-snug">{c}</span>
            </li>
          ))}
        </motion.ul>

        <motion.p
          className="text-lg md:text-xl text-text-primary font-semibold mt-8 text-center"
          variants={fadeInUp}
        >
          Miss any one and it is not billable.
        </motion.p>

        <motion.div className="w-full max-w-2xl mt-16 flex flex-col gap-4" variants={fadeInUp}>
          <span className="text-xs font-semibold tracking-[0.16em] uppercase text-text-secondary/70">
            And what we do not do
          </span>
          {WE_DONT.map((w) => (
            <p key={w} className="text-lg text-text-secondary leading-relaxed">
              {w}
            </p>
          ))}
        </motion.div>

        <motion.div
          className="w-full max-w-2xl mt-12 rounded-card border border-border bg-secondary px-7 py-6 flex flex-col gap-2"
          variants={fadeInUp}
        >
          <p className="text-lg md:text-xl text-text-primary font-semibold">
            Month to month. About an hour a week from you.
          </p>
          <p className="text-base text-text-secondary leading-relaxed">
            That hour is strategy and approvals. Stop whenever you want, including the month your
            crews are already full.
          </p>
        </motion.div>
      </motion.div>
    </section>
  )
}

export default TheTerms
