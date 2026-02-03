'use client'

import { motion } from 'framer-motion'
import {
  Target,
  Zap,
  Grid3X3,
  Cog,
  MessageSquare,
  Briefcase,
  Shield,
  Rocket
} from 'lucide-react'
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { staggerContainer, staggerItem, viewportOptions } from '@/lib/animations'

interface DeliverableCard {
  id: string
  icon: React.ElementType
  title: string
  value: string
}

const deliverables: DeliverableCard[] = [
  {
    id: 'genesis-strategy',
    icon: Target,
    title: 'The "Genesis" Strategy Blueprint',
    value: 'Skip weeks of guessing. Our AI analyzes your digital footprint to instantly build your Ideal Client Profile for high-ROI targeting.',
  },
  {
    id: 'day-3-priority',
    icon: Zap,
    title: 'The "Day 3" Priority Lane',
    value: 'Gain 21 days of sales activity while competitors are stuck in domain warmup. We deploy on pre-warmed infrastructure.',
  },
  {
    id: 'validation-matrix',
    icon: Grid3X3,
    title: 'The 9-Cell Validation Matrix',
    value: 'Scientific proof of what your market wants in 7 days, not 6 months. We test 9 angles with 9,000 targeted touchpoints.',
  },
  {
    id: 'revenue-utility',
    icon: Cog,
    title: 'The "Hands-Off" Revenue Utility',
    value: 'Zero technical effort. Full management of infrastructure, scraping, Clay, sequencer—you focus on closing & fulfilment, we run the engine.',
  },
  {
    id: 'ghost-proof',
    icon: MessageSquare,
    title: 'The "Ghost-Proof" Nurture System',
    value: 'Drastically reduce no-shows. Automated Email & WhatsApp follow-ups keep prospects warm until the call.',
  },
  {
    id: 'sales-toolkit',
    icon: Briefcase,
    title: 'The "Outbound-to-Close" Sales Toolkit',
    value: 'High-conversion VSL scripts and sales frameworks designed to turn cold leads into $60k+ contracts.',
  },
  {
    id: 'brand-safety',
    icon: Shield,
    title: 'The "Brand-Safety" Firewall',
    value: 'Protect your brand reputation. Total domain isolation from your primary email while scaling high-volume outreach.',
  },
  {
    id: 'month-2-expansion',
    icon: Rocket,
    title: 'Month 2 Expansion (Bonus)',
    value: 'Full CRM integration + custom AI Reply Agent trained on your knowledge base. No lead falls through the cracks.',
  },
]

export function BentoGrid() {
  return (
    <section
      data-testid="bento-grid-section"
      className="max-w-container mx-auto px-6 lg:px-12 py-16 lg:py-24"
    >
      {/* Section Header */}
      <motion.div
        className="text-center mb-12 lg:mb-16"
        initial="hidden"
        whileInView="visible"
        viewport={viewportOptions}
        variants={staggerItem}
      >
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary mb-4">
          The Deliverable Stack
        </h2>
        <p className="text-lg text-text-secondary max-w-2xl mx-auto">
          Everything you need to build a predictable, scalable outbound engine.
        </p>
      </motion.div>

      {/* Bento Grid - 2 columns on tablet, 4 columns on desktop */}
      <motion.div
        data-testid="bento-grid"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOptions}
      >
        {deliverables.map((item) => (
          <BentoCard key={item.id} item={item} />
        ))}
      </motion.div>
    </section>
  )
}

interface BentoCardProps {
  item: DeliverableCard
}

function BentoCard({ item }: BentoCardProps) {
  const Icon = item.icon

  return (
    <motion.div variants={staggerItem}>
      <Card
        variant="glow"
        className="h-full p-6 cursor-default"
        data-testid={`bento-card-${item.id}`}
      >
        <CardHeader className="p-0 mb-4">
          <div className="w-12 h-12 rounded-card bg-accent/10 flex items-center justify-center mb-4">
            <Icon className="w-6 h-6 text-accent" />
          </div>
          <CardTitle className="text-lg leading-tight">{item.title}</CardTitle>
        </CardHeader>
        <CardDescription className="text-sm leading-relaxed">
          {item.value}
        </CardDescription>
      </Card>
    </motion.div>
  )
}

export default BentoGrid
