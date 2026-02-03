'use client'

import { motion } from 'framer-motion'
import { Map, Wrench } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { staggerContainer, staggerItem, viewportOptions } from '@/lib/animations'

interface ExpansionCard {
  id: string
  icon: React.ElementType
  title: string
  description: string
  highlight?: string
}

const expansionCards: ExpansionCard[] = [
  {
    id: 'tam-mapping',
    icon: Map,
    title: 'TAM Mapping',
    description: 'Comprehensive total addressable market analysis with enriched contact data, firmographics, and intent signals for precision targeting.',
  },
  {
    id: 'bespoke-gtm',
    icon: Wrench,
    title: 'Bespoke GTM Engineering',
    description: 'Custom automation workflows, CRM integrations, and data pipelines built by certified experts.',
    highlight: 'Clay Certified',
  },
]

export function ExpansionServices() {
  return (
    <section
      data-testid="expansion-services-section"
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
          Expansion Services
        </h2>
        <p className="text-lg text-text-secondary max-w-2xl mx-auto">
          Ready to scale beyond outbound? Unlock advanced capabilities for your revenue engine.
        </p>
      </motion.div>

      {/* Expansion Cards Grid */}
      <motion.div
        data-testid="expansion-cards-grid"
        className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-4xl mx-auto"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOptions}
      >
        {expansionCards.map((card) => (
          <ExpansionCardComponent key={card.id} card={card} />
        ))}
      </motion.div>
    </section>
  )
}

interface ExpansionCardProps {
  card: ExpansionCard
}

function ExpansionCardComponent({ card }: ExpansionCardProps) {
  const Icon = card.icon

  return (
    <motion.div variants={staggerItem}>
      <Card
        variant="glow"
        className="group h-full p-6 lg:p-8 relative overflow-hidden"
        data-testid={`expansion-card-${card.id}`}
      >
        {/* Hover Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

        <CardHeader className="p-0 relative z-10">
          {/* Icon */}
          <div className="w-14 h-14 rounded-card bg-accent/10 flex items-center justify-center mb-4">
            <Icon className="w-7 h-7 text-accent" />
          </div>

          <div className="flex items-center gap-3 mb-3">
            <CardTitle className="text-xl lg:text-2xl">{card.title}</CardTitle>
            {card.highlight && (
              <span className="inline-flex items-center px-2 py-0.5 rounded-small bg-accent/20 text-accent text-xs font-semibold">
                {card.highlight}
              </span>
            )}
          </div>
        </CardHeader>
        <CardDescription className="text-base leading-relaxed relative z-10">
          {card.description}
        </CardDescription>
      </Card>
    </motion.div>
  )
}

export default ExpansionServices
