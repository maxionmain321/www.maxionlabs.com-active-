'use client'

import { motion } from 'framer-motion'
import { fadeInUp, staggerContainer, staggerItem, viewportOptions } from '@/lib/animations'

/**
 * V1 Mechanism Section Component
 *
 * How we validate offer frames before scaling.
 * Three steps: lock ICP, test offer frames, scale what works.
 *
 * Principle 2.1 (Gordon): 3S formula - specific problem, specific person, specific mechanism
 * Principle X.1 (Iles): One claim per section, completeness is the AI tell
 */
export function V1Mechanism() {
  const steps = [
    {
      number: '1',
      title: 'Lock your ICP',
      description: 'We identify who actually buys from you. Not guesses. Real buyer patterns.',
    },
    {
      number: '2',
      title: 'Test offer frames',
      description: 'We run four parallel offer angles. Which one gets replies? We measure.',
    },
    {
      number: '3',
      title: 'Scale what works',
      description: 'One validated offer. Full volume. Reps close qualified leads only.',
    },
  ]

  return (
    <section className="bg-background py-20 lg:py-32 border-b border-border">
      <div className="max-w-container mx-auto px-6 lg:px-12">
        <motion.div
          className="flex flex-col gap-12 lg:gap-16"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOptions}
        >
          {/* Section headline */}
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-text-primary text-center max-w-3xl mx-auto"
            variants={fadeInUp}
          >
            We validate before we scale.
          </motion.h2>

          {/* Three-column steps */}
          <motion.div
            className="grid md:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOptions}
          >
            {steps.map((step, idx) => (
              <motion.div
                key={idx}
                className="flex flex-col gap-4"
                variants={staggerItem}
              >
                <div className="text-accent text-4xl font-bold">{step.number}</div>
                <h3 className="text-xl font-semibold text-text-primary">{step.title}</h3>
                <p className="text-text-secondary leading-relaxed">{step.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
