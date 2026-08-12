'use client'

import { motion } from 'framer-motion'
import { fadeInUp, staggerContainer, viewportOptions } from '@/lib/animations'

/**
 * Cost + selection section.
 * Sits directly under the hero, before the proof: states the exclusivity
 * constraint and the reason behind it, then the commercial terms.
 * No price goes on this page, only the structure.
 * Ends by routing DOWN to #proof rather than to the CTA, because the
 * question this section raises is "does it work", not "where do I sign".
 */
export function UrgencyGate() {
  return (
    <section
      data-testid="urgency-gate-section"
      className="max-w-container mx-auto px-6 lg:px-12 pt-20 lg:pt-28 pb-32 lg:pb-48"
    >
      <motion.div
        className="flex flex-col items-center gap-8 text-center max-w-3xl mx-auto"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOptions}
      >
        <motion.h2
          className="text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary leading-tight"
          variants={fadeInUp}
        >
          We work with one operator per metro at a time.
        </motion.h2>

        <motion.p
          className="text-lg md:text-xl text-text-secondary leading-relaxed"
          variants={fadeInUp}
        >
          <span className="text-text-primary font-semibold">Exclusivity.</span> As soon as you
          become our client, we won&apos;t take on your competitor from the same metro for as long
          as we are working together. Two of you in one city means we put the same decision maker
          in front of both, and you both look worse for it.
        </motion.p>

        <motion.p
          className="text-lg md:text-xl text-text-secondary leading-relaxed"
          variants={fadeInUp}
        >
          <span className="text-text-primary font-semibold">Selectivity.</span> For that same
          reason we vet hard who we take on, since there are other operators in your market we
          might end up working with instead.
        </motion.p>

        <motion.p
          className="text-lg md:text-xl text-text-secondary leading-relaxed"
          variants={fadeInUp}
        >
          Every engagement starts with a pilot on your own market. Two walkthroughs, so you see
          what this actually produces in your area before either of us commits.{' '}
          <span className="text-text-primary font-medium">
            No card on file, and nothing owed if they are not what you asked for.
          </span>
        </motion.p>

        <motion.p
          className="text-lg md:text-xl text-text-secondary leading-relaxed"
          variants={fadeInUp}
        >
          After that, if you are happy, we go into a paid engagement.{' '}
          <span className="text-text-primary font-medium">
            It will likely be one of the most expensive options you have in front of you.
          </span>{' '}
          That is what it takes to get you those contracts in the shortest time, with the highest
          chance it actually works.
        </motion.p>

        <motion.p
          className="text-lg md:text-xl text-text-secondary leading-relaxed"
          variants={fadeInUp}
        >
          If you are optimizing for price, this won&apos;t be for you. If you are not confident in
          your ability to close deals, it won&apos;t be for you. If you are not confident in your
          ability to hire to match demand, it won&apos;t be for you.
        </motion.p>

        <motion.div variants={fadeInUp} className="w-full max-w-2xl">
          <button
            onClick={() => {
              document.getElementById('proof')?.scrollIntoView({ behavior: 'smooth' })
            }}
            className="group w-full rounded-card border border-accent/40 bg-accent/[0.08] px-6 py-5 text-center transition-all duration-200 hover:border-accent/70 hover:bg-accent/[0.12]"
          >
            <p className="text-base md:text-lg text-text-primary">
              Now, it is fair to be skeptical whether it is worth it.{' '}
              <span className="font-semibold text-accent group-hover:underline">
                See what our clients have achieved with us &darr;
              </span>
            </p>
          </button>
        </motion.div>
      </motion.div>
    </section>
  )
}

export default UrgencyGate
