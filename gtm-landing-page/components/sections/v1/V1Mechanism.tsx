'use client'

import { motion } from 'framer-motion'
import { staggerContainer, staggerItem, viewportOptions } from '@/lib/animations'

const steps = [
  {
    num: '01',
    title: 'We validate first.',
    body: 'Four offer angles tested across your ICP before a single sequence scales.',
  },
  {
    num: '02',
    title: 'We write and send.',
    body: 'Personalized sequences. We handle deliverability, list-building, and replies.',
  },
  {
    num: '03',
    title: 'You take the meetings.',
    body: 'Qualified leads land on your calendar. You close.',
  },
]

export function V1Mechanism() {
  return (
    <section className="bg-background py-24 lg:py-32">
      <div className="max-w-5xl mx-auto px-6 lg:px-12">
        <motion.div
          className="flex flex-col gap-16"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOptions}
        >
          <motion.h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary leading-tight"
            variants={staggerItem}
          >
            How it works.
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
            {steps.map((step) => (
              <motion.div key={step.num} className="flex flex-col gap-4" variants={staggerItem}>
                <span className="text-accent font-mono text-xs uppercase tracking-widest">{step.num}</span>
                <h3 className="text-xl font-semibold text-text-primary">{step.title}</h3>
                <p className="text-text-secondary text-base leading-relaxed">{step.body}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
