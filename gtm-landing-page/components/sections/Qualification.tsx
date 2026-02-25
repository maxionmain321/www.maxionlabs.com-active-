'use client'

import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { fadeInUp, staggerContainer, staggerItem, viewportOptions } from '@/lib/animations'

/**
 * Qualification Section Component
 *
 * Centered content with 4 qualification criteria bullets and CTA.
 * Pre-qualifies prospects before they book a call.
 */
export function Qualification() {
  return (
    <section
      data-testid="qualification-section"
      className="max-w-container mx-auto px-6 lg:px-12 py-24 lg:py-36"
    >
      <motion.div
        className="max-w-3xl mx-auto flex flex-col items-center gap-8 text-center"
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
          This Works <span className="text-gradient">Best</span> If You...
        </motion.h2>

        {/* Qualification Bullets */}
        <motion.div
          className="flex flex-col gap-4 w-full text-left"
          variants={staggerItem}
        >
          <QualificationItem>
            Are doing <span className="font-bold text-accent-primary">$500K+ ARR or funded</span> <span className="text-sm text-text-secondary/60">(you need budget to invest in growth)</span>
          </QualificationItem>
          <QualificationItem>
            Can handle <span className="font-bold text-accent-primary">15+ B2B sales calls</span> per month <span className="text-sm text-text-secondary/60">(we fill pipelines, not trickle leads)</span>
          </QualificationItem>
          <QualificationItem>
            Sell B2B with <span className="font-bold text-accent-primary">identifiable decision-makers</span> <span className="text-sm text-text-secondary/60">(we need to know who to reach)</span>
          </QualificationItem>
          <QualificationItem>
            Have an LTV of <span className="font-bold text-accent-primary">$3,000+</span> <span className="text-sm text-text-secondary/60">(so the economics make sense)</span>
          </QualificationItem>
        </motion.div>

        {/* Below Bullets Text */}
        <motion.p
          className="text-base md:text-lg text-text-secondary"
          variants={fadeInUp}
        >
          Not sure if you qualify? Book a call and we&apos;ll run the numbers together.
        </motion.p>

        {/* CTA Button */}
        <motion.div variants={fadeInUp}>
          <Button
            variant="shimmer"
            size="xl"
            className="font-semibold"
            onClick={() => {
              document.getElementById('book-call')?.scrollIntoView({ behavior: 'smooth' })
            }}
          >
            See If You Qualify
          </Button>
        </motion.div>
      </motion.div>
    </section>
  )
}

/**
 * Qualification Item Component
 *
 * Individual qualification bullet with bigger checkmark icon and green numbers.
 */
interface QualificationItemProps {
  children: React.ReactNode
}

function QualificationItem({ children }: QualificationItemProps) {
  return (
    <motion.div
      variants={fadeInUp}
      className="flex items-start gap-3 py-2"
    >
      <Check className="w-5 h-5 text-[#00d9ff] flex-shrink-0 mt-1" strokeWidth={3} />
      <p className="text-base md:text-lg text-text-primary leading-relaxed">{children}</p>
    </motion.div>
  )
}

export default Qualification
