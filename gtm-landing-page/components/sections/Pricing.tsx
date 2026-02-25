'use client'

import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { fadeInUp, staggerContainer, staggerItem, viewportOptions } from '@/lib/animations'

/**
 * Pricing Section Component
 *
 * Visual comparison grid with bold pricing display, icon-based benefits,
 * and side-by-side agency comparison. Data-driven, scannable layout.
 */
export function Pricing() {
  return (
    <section
      data-testid="pricing-section"
      className="max-w-container mx-auto px-6 lg:px-12 py-24 lg:py-36"
    >
      <motion.div
        className="max-w-5xl mx-auto flex flex-col items-center gap-12 lg:gap-16 text-center"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOptions}
      >
        {/* Headline */}
        <motion.h2
          className="text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary leading-tight"
          variants={fadeInUp}
        >
          How <span className="text-gradient">Pricing</span> Works
        </motion.h2>

        {/* Giant Pricing Display */}
        <motion.div
          variants={fadeInUp}
          className="flex flex-col items-center gap-3"
        >
          <p className="text-6xl md:text-7xl lg:text-8xl font-bold text-accent-primary">
            $400
          </p>
          <p className="text-xl md:text-2xl text-text-primary font-semibold">
            per qualified meeting
          </p>
          <p className="text-sm text-text-secondary mt-2">
            No meetings? You don&apos;t pay. Plus a small infrastructure fee to cover your sending setup.
          </p>
        </motion.div>

        {/* Qualified = 3 Checkmarks */}
        <motion.div
          variants={fadeInUp}
          className="flex flex-wrap justify-center gap-4 max-w-2xl"
        >
          <QualifiedBadge text="Decision-maker with budget" />
          <QualifiedBadge text="Matches your ICP" />
          <QualifiedBadge text="Actually shows up" />
        </motion.div>

        {/* CTA */}
        <motion.div variants={fadeInUp}>
          <Button
            variant="shimmer"
            size="xl"
            className="font-semibold"
            onClick={() => {
              document.getElementById('book-call')?.scrollIntoView({ behavior: 'smooth' })
            }}
          >
            Free Growth Mapping Call
          </Button>
        </motion.div>
      </motion.div>
    </section>
  )
}

/**
 * Qualified Badge Component
 *
 * Checkmark icon with short label.
 */
interface QualifiedBadgeProps {
  text: string
}

function QualifiedBadge({ text }: QualifiedBadgeProps) {
  return (
    <span className="flex items-center gap-2 text-sm text-text-secondary">
      <Check className="w-4 h-4 text-[#00d9ff] flex-shrink-0" strokeWidth={3} />
      {text}
    </span>
  )
}

export default Pricing
