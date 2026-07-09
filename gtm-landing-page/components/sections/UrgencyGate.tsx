'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { fadeInUp, staggerContainer, viewportOptions } from '@/lib/animations'

/**
 * Urgency + workshop-gate section.
 * Sits between the case studies and the final CTA: explains WHY only a few
 * free tests run per month, and why the workshop exists as the filter.
 */
export function UrgencyGate() {
  return (
    <section
      data-testid="urgency-gate-section"
      className="max-w-container mx-auto px-6 lg:px-12 pb-32 lg:pb-48"
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
          We take on 5 of these per month. Not more.
        </motion.h2>

        <motion.p
          className="text-lg md:text-xl text-text-secondary leading-relaxed"
          variants={fadeInUp}
        >
          Every test runs on our infrastructure and our own dime. That math only works
          when the offer converts, so we&apos;re picky about whose offer we run.
        </motion.p>

        <motion.p
          className="text-lg md:text-xl text-text-secondary leading-relaxed"
          variants={fadeInUp}
        >
          That&apos;s what the workshop is for. We dig into what you sell and shape one offer
          so good that a stranger who&apos;s never heard of you can&apos;t ignore it.{' '}
          <span className="text-text-primary font-medium">
            If we find it, we front the 5,000-contact test. If we can&apos;t, we tell you straight,
            and you keep the mapped offer either way.
          </span>
        </motion.p>

        <motion.div variants={fadeInUp}>
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
        </motion.div>
      </motion.div>
    </section>
  )
}

export default UrgencyGate
