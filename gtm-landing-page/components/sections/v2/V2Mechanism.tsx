'use client'

import { motion } from 'framer-motion'
import { fadeInUp, staggerContainer, staggerItem, viewportOptions } from '@/lib/animations'

/**
 * V2 Mechanism Section Component
 *
 * 3S formula: specific problem, specific person, specific mechanism
 * Why we are different.
 *
 * Principle 2.1 (Gordon): 3S formula throughout
 * Principle 2.2 (Gordon): Mechanism explains why past cold email failed
 */
export function V2Mechanism() {
  const steps = [
    {
      label: 'Specific problem',
      description: 'Identify the exact problem your buyer is solving. Not generic pain. Specific.',
    },
    {
      label: 'Specific person',
      description: 'Target the exact buyer who has that problem. Right title, right company stage.',
    },
    {
      label: 'Specific mechanism',
      description: 'Test four offer angles. Measure replies. Scale the one that works.',
    },
  ]

  return (
    <section className="bg-background py-20 lg:py-32 border-b border-border">
      <div className="max-w-container mx-auto px-6 lg:px-12">
        <motion.div
          className="flex flex-col gap-12"
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
            We test three things before scaling a single email.
          </motion.h2>

          {/* Three-step framework */}
          <motion.div
            className="grid md:grid-cols-3 gap-8 lg:gap-12"
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
                <div className="text-accent text-sm font-semibold uppercase tracking-wide">{step.label}</div>
                <p className="text-text-secondary text-lg leading-relaxed">{step.description}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Why it matters */}
          <motion.div
            className="bg-secondary rounded-card p-8 lg:p-12 border border-border max-w-3xl mx-auto"
            variants={fadeInUp}
          >
            <p className="text-text-primary text-lg leading-relaxed">
              Every cold email setup we see skips at least one of these. They test copy (not offer). They hit the wrong person (not specific problem). They scale before validating (not mechanism). We do all three. Sequentially.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
