'use client'

import { motion } from 'framer-motion'
import { Zap, CheckCircle, Server } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { staggerContainer, staggerItem, viewportOptions } from '@/lib/animations'

interface RiskCard {
  id: string
  icon: React.ElementType
  badge: string
  title: string
  description: string
}

const riskCards: RiskCard[] = [
  {
    id: '7-day-sprint',
    icon: Zap,
    badge: '$500 Cashback',
    title: '7-Day Sprint Guarantee',
    description: 'If we don\'t deliver your first campaign live within 7 days, you get $500 back. No questions asked.',
  },
  {
    id: '30-day-milestone',
    icon: CheckCircle,
    badge: '100% Refund',
    title: '30-Day Milestone Guarantee',
    description: 'Hit zero qualified meetings in 30 days? Full refund. We only win when you win.',
  },
  {
    id: 'data-ownership',
    icon: Server,
    badge: '100% Yours',
    title: 'Data Ownership',
    description: 'Keep all analytics, highest converting angles × ICP combinations, and all the contacts we managed if you decide to leave. You paid for this data so it\'s yours.',
  },
]

export function RiskReversal() {
  return (
    <section
      data-testid="risk-reversal-section"
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
          Zero Risk. All Upside.
        </h2>
        <p className="text-lg text-text-secondary max-w-2xl mx-auto">
          We put our money where our mouth is. Three guarantees that make saying yes a no-brainer.
        </p>
      </motion.div>

      {/* Risk Cards Grid */}
      <motion.div
        data-testid="risk-cards-grid"
        className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOptions}
      >
        {riskCards.map((card) => (
          <RiskCardComponent key={card.id} card={card} />
        ))}
      </motion.div>
    </section>
  )
}

interface RiskCardProps {
  card: RiskCard
}

function RiskCardComponent({ card }: RiskCardProps) {
  const Icon = card.icon

  return (
    <motion.div variants={staggerItem}>
      <Card
        variant="glow"
        className="h-full p-6 lg:p-8 text-center"
        data-testid={`risk-card-${card.id}`}
      >
        <CardHeader className="p-0 items-center">
          {/* Icon */}
          <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mb-4">
            <Icon className="w-8 h-8 text-accent" />
          </div>

          {/* Guarantee Badge */}
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-accent/20 text-accent text-sm font-semibold mb-4">
            {card.badge}
          </div>

          <CardTitle className="text-xl lg:text-2xl mb-3">{card.title}</CardTitle>
        </CardHeader>
        <CardDescription className="text-base leading-relaxed">
          {card.description}
        </CardDescription>
      </Card>
    </motion.div>
  )
}

export default RiskReversal
