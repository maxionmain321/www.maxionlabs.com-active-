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
            Sell B2B with deal sizes of <span className="font-bold text-accent-primary">$5,000+</span> <span className="text-sm text-text-secondary/60">(so the unit economics work for both of us)</span>
          </QualificationItem>
          <QualificationItem>
            Have a sales team or founder who can <span className="font-bold text-accent-primary">close deals</span> <span className="text-sm text-text-secondary/60">(we fill the pipeline, you close it)</span>
          </QualificationItem>
          <QualificationItem>
            Have <span className="font-bold text-accent-primary">paying customers</span> already <span className="text-sm text-text-secondary/60">(we scale what works, not test what might)</span>
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
