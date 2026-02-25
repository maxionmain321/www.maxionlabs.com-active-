'use client'

import { motion } from 'framer-motion'
import { Server, Target, Database, TrendingUp, LucideIcon } from 'lucide-react'
import { fadeInUp, staggerContainer, staggerItem, viewportOptions } from '@/lib/animations'

/**
 * How It Works Section Component
 *
 * Four-column timeline showing the 4-phase process from setup to meetings.
 * Stacks vertically on mobile, 2x2 grid on tablet, 4 columns on desktop.
 */
export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      data-testid="how-it-works-section"
      className="max-w-container mx-auto px-6 lg:px-12 py-24 lg:py-36 scroll-mt-20"
    >
      <motion.div
        className="flex flex-col gap-12"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOptions}
      >
        {/* Headline */}
        <motion.div className="flex flex-col gap-4 text-center" variants={fadeInUp}>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary leading-tight">
            From Setup to Meetings in{' '}
            <span className="text-gradient">One Month</span>
          </h2>
          <p className="text-base text-text-secondary/80">
            We build your outbound infrastructure in parallel with strategy. You pay per meeting once campaigns go live.
          </p>
        </motion.div>

        {/* Four-Column Timeline */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
          variants={staggerItem}
        >
          {/* Phase 1: Day 1 */}
          <PhaseCard
            number="1"
            icon={Server}
            title="Day 1"
            subtitle="Infrastructure Setup"
            description="We spin up domains, inboxes, and start 14-day warmup. This runs in the background while we work on strategy."
          />

          {/* Phase 2: Week 1 */}
          <PhaseCard
            number="2"
            icon={Target}
            title="Week 1"
            subtitle="Onboarding & Strategy"
            description="Onboarding form, kickoff call. We nail down your market segmentation, offer positioning, targeting, and personas."
          />

          {/* Phase 3: Week 2 */}
          <PhaseCard
            number="3"
            icon={Database}
            title="Week 2"
            subtitle="Messaging & Data"
            description="We build lead lists, enrich prospect data, and write 20+ copy variants for A/B testing."
          />

          {/* Phase 4: Week 3+ */}
          <PhaseCard
            number="4"
            icon={TrendingUp}
            title="Week 3+"
            subtitle="Launch & Optimize"
            description="Campaigns go live. We handle responses, book qualified meetings on your calendar, and optimize weekly. You only pay when they show up."
          />
        </motion.div>
      </motion.div>
    </section>
  )
}

/**
 * Phase Card Component
 *
 * Individual phase card with icon, number, title, subtitle, and description.
 */
interface PhaseCardProps {
  number: string
  icon: LucideIcon
  title: string
  subtitle: string
  description: string
}

function PhaseCard({ number, icon: Icon, title, subtitle, description }: PhaseCardProps) {
  return (
    <motion.div
      variants={fadeInUp}
      className="flex flex-col gap-4 p-6 rounded-card surface border-l-2 border-[#00d9ff]/20"
    >
      {/* Icon + Number */}
      <div className="flex items-center gap-3">
        <Icon className="w-8 h-8 text-accent-primary" />
        <span className="text-4xl font-bold text-accent-primary">{number}</span>
      </div>

      {/* Title */}
      <h3 className="text-xl font-bold text-text-primary">{title}</h3>

      {/* Subtitle */}
      <p className="text-base font-semibold text-accent-primary">{subtitle}</p>

      {/* Description */}
      <p className="text-sm text-text-secondary/80 leading-relaxed">{description}</p>
    </motion.div>
  )
}

export default HowItWorks
