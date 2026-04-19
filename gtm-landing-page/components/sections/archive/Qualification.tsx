'use client'

import { motion } from 'framer-motion'
import { Check, X } from 'lucide-react'
import { fadeInUp, staggerContainer, staggerItem, viewportOptions } from '@/lib/animations'

export function Qualification() {
  return (
    <section
      data-testid="qualification-section"
      className="max-w-container mx-auto px-6 lg:px-12 py-24 lg:py-32"
    >
      <motion.div
        className="max-w-4xl mx-auto flex flex-col items-center gap-12 text-center"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOptions}
      >
        <motion.h2
          className="text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary leading-tight"
          variants={fadeInUp}
        >
          Is This For You?
        </motion.h2>

        <motion.div
          className="grid md:grid-cols-2 gap-8 w-full text-left"
          variants={staggerItem}
        >
          <div className="flex flex-col gap-4">
            <h3 className="text-lg font-semibold text-text-primary">A fit if you...</h3>
            <Item positive>Sell B2B with deal sizes of $5,000+</Item>
            <Item positive>Have someone who can close inbound meetings</Item>
            <Item positive>Already have paying customers</Item>
          </div>
          <div className="flex flex-col gap-4">
            <h3 className="text-lg font-semibold text-text-primary">Not a fit if you...</h3>
            <Item>Are pre-revenue or still validating</Item>
            <Item>Sell low-ticket or to consumers</Item>
            <Item>Don&apos;t have bandwidth to take calls</Item>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}

function Item({ children, positive = false }: { children: React.ReactNode; positive?: boolean }) {
  return (
    <motion.div variants={fadeInUp} className="flex items-start gap-3">
      {positive ? (
        <Check className="w-5 h-5 text-[#00d9ff] flex-shrink-0 mt-1" strokeWidth={3} />
      ) : (
        <X className="w-5 h-5 text-text-secondary/60 flex-shrink-0 mt-1" strokeWidth={3} />
      )}
      <p className="text-base md:text-lg text-text-primary leading-relaxed">{children}</p>
    </motion.div>
  )
}

export default Qualification
