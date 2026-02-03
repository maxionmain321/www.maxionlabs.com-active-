'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { staggerItem, viewportOptions } from '@/lib/animations'

export function CTA() {
  return (
    <section
      data-testid="cta-section"
      className="max-w-container mx-auto px-6 lg:px-12 py-16 lg:py-24"
    >
      <motion.div
        className="relative rounded-card border border-border bg-gradient-to-br from-accent/10 via-background to-background p-8 md:p-12 lg:p-16 text-center overflow-hidden"
        initial="hidden"
        whileInView="visible"
        viewport={viewportOptions}
        variants={staggerItem}
      >
        {/* Background Glow Effect */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-accent/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary mb-4">
            Ready to Book More Sales Calls?
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto mb-8">
            Join agencies and SaaS companies who've added $240K+ ARR with our GTM systems.
            30-day money-back guarantee.
          </p>
          <Button
            variant="shimmer"
            size="xl"
            className="font-semibold"
            onClick={() => {
              window.open('https://cal.com/maksym-pidvalnyi/gtm-discovery-call', '_blank')
            }}
          >
            Let's Book You Sales Calls
          </Button>
        </div>
      </motion.div>
    </section>
  )
}

export default CTA
