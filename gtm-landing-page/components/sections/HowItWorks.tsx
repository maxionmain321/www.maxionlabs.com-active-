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
      className="max-w-container mx-auto px-6 lg:px-12 py-20 lg:py-32 scroll-mt-20"
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
            <span className="text-[#00d9ff]">One Month</span>
          </h2>
          <p className="text-lg md:text-xl text-text-secondary">
            No retainers during setup. You only pay when meetings start booking.
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
            description="The moment you sign up, we spin up domains, configure tools, and begin warming your sending infrastructure. This runs in the background for 21-28 days while we work on strategy."
          />

          {/* Phase 2: Week 1-2 */}
          <PhaseCard
            number="2"
            icon={Target}
            title="Week 1-2"
            subtitle="Strategy & Positioning"
            description="We optimize your offer for cold email and develop a targeting strategy for your ICP, including multiple personas if needed. This is where we nail down who we're reaching and what we're saying."
          />

          {/* Phase 3: Week 3 */}
          <PhaseCard
            number="3"
            icon={Database}
            title="Week 3"
            subtitle="Data & Messaging"
            description="We scrape and enrich prospect data, prepare it for outreach, and write multiple A/B test variations. We test heavily to find what resonates."
          />

          {/* Phase 4: Week 4+ */}
          <PhaseCard
            number="4"
            icon={TrendingUp}
            title="Week 4+"
            subtitle="Launch & Optimize"
            description="Campaigns go live to thousands of prospects. We nurture responses, book qualified meetings on your calendar, and continuously optimize. You only pay when they show up."
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
      className="flex flex-col gap-4 p-6 rounded-card border border-border bg-background/30 backdrop-blur-sm hover:border-accent/50 transition-colors duration-200"
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
      <p className="text-base md:text-lg text-text-secondary leading-relaxed">{description}</p>
    </motion.div>
  )
}

export default HowItWorks
