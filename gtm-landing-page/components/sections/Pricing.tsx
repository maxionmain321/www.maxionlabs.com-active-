'use client'

import { motion } from 'framer-motion'
import { Check, X } from 'lucide-react'
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
      className="max-w-container mx-auto px-6 lg:px-12 py-20 lg:py-32"
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
          How <span className="text-[#00d9ff]">Pricing</span> Works
        </motion.h2>

        {/* Giant Pricing Display - Highlighted Card */}
        <motion.div
          variants={fadeInUp}
          className="relative px-12 py-8 rounded-2xl bg-accent-primary/10 border-2 border-accent-primary/30 backdrop-blur-sm"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-accent-primary/5 via-accent-primary/10 to-accent-primary/5 rounded-2xl" />
          <div className="relative flex flex-col items-center gap-3">
            <p className="text-6xl md:text-7xl lg:text-8xl font-bold text-accent-primary">
              $300
            </p>
            <p className="text-xl md:text-2xl text-text-primary font-semibold">
              per qualified meeting
            </p>
          </div>
        </motion.div>

        {/* Qualified = 3 Checkmarks */}
        <motion.div
          variants={fadeInUp}
          className="flex flex-col gap-3 max-w-2xl"
        >
          <p className="text-base text-text-secondary mb-2">Qualified means:</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <QualifiedBadge text="Decision-maker with budget" />
            <QualifiedBadge text="Matches your ICP" />
            <QualifiedBadge text="Actually shows up" />
          </div>
        </motion.div>

        {/* No Charge Grid (4 cards) */}
        <motion.div
          variants={staggerItem}
          className="w-full max-w-3xl"
        >
          <p className="text-lg font-semibold text-text-primary mb-4">No Charge For:</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <NoChargeCard label="No-shows" />
            <NoChargeCard label="Tire-kickers" />
            <NoChargeCard label="Wrong fit" />
            <NoChargeCard label="Unqualified" />
          </div>
        </motion.div>

        {/* Comparison Table */}
        <motion.div
          variants={fadeInUp}
          className="w-full max-w-4xl"
        >
          <p className="text-2xl font-bold text-text-primary mb-6">The Difference</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Traditional Agencies */}
            <div className="flex flex-col gap-4 p-6 rounded-card border border-border bg-background/30">
              <p className="text-xl md:text-2xl font-bold text-text-secondary">Traditional Agencies</p>
              <div className="flex flex-col gap-2 text-left">
                <p className="text-base text-text-secondary flex items-center gap-2">
                  <X className="w-4 h-4 text-red-400 flex-shrink-0" />
                  $5-10k/month retainer
                </p>
                <p className="text-base text-text-secondary flex items-center gap-2">
                  <X className="w-4 h-4 text-red-400 flex-shrink-0" />
                  Pay regardless of results
                </p>
                <p className="text-base text-text-secondary flex items-center gap-2">
                  <X className="w-4 h-4 text-red-400 flex-shrink-0" />
                  Long-term commitments
                </p>
              </div>
            </div>

            {/* Us (Performance-Based) */}
            <div className="flex flex-col gap-4 p-6 rounded-card border-2 border-accent-primary bg-accent/5">
              <p className="text-xl md:text-2xl font-bold text-accent-primary">Us (Performance-Based)</p>
              <div className="flex flex-col gap-2 text-left">
                <p className="text-base text-text-primary flex items-center gap-2">
                  <Check className="w-4 h-4 text-accent-primary flex-shrink-0" />
                  <span className="text-accent-primary font-semibold">$300</span> per meeting
                </p>
                <p className="text-base text-text-primary flex items-center gap-2">
                  <Check className="w-4 h-4 text-accent-primary flex-shrink-0" />
                  Pay only for shows
                </p>
                <p className="text-base text-text-primary flex items-center gap-2">
                  <Check className="w-4 h-4 text-accent-primary flex-shrink-0" />
                  No long-term lock-in
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Bottom Text - Guarantee Highlight */}
        <motion.div
          variants={fadeInUp}
          className="relative px-6 py-4 rounded-xl bg-accent-primary/5 border border-accent-primary/20 max-w-2xl"
        >
          <p className="text-base md:text-lg text-text-primary font-semibold text-center">
            If meetings don&apos;t show up, we&apos;re working for free. We&apos;re incentivized to make this work.
          </p>
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
            Book Your Free Growth Mapping Call
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
    <div className="flex items-center gap-2 p-3 rounded-card border border-border bg-background/30">
      <Check className="w-5 h-5 text-accent-primary flex-shrink-0" strokeWidth={3} />
      <p className="text-sm text-text-secondary text-left">{text}</p>
    </div>
  )
}

/**
 * No Charge Card Component
 *
 * X icon with short label indicating what doesn't get charged.
 */
interface NoChargeCardProps {
  label: string
}

function NoChargeCard({ label }: NoChargeCardProps) {
  return (
    <div className="flex flex-col items-center gap-2 p-4 rounded-card border border-border bg-background/20">
      <X className="w-6 h-6 text-red-400" strokeWidth={2.5} />
      <p className="text-sm font-medium text-text-secondary">{label}</p>
    </div>
  )
}

export default Pricing
