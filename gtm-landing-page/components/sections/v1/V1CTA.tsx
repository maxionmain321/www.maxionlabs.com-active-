'use client'

import { motion } from 'framer-motion'
import { useEffect } from 'react'
import Cal, { getCalApi } from '@calcom/embed-react'
import { fadeInUp, staggerContainer, viewportOptions } from '@/lib/animations'

/**
 * V1 Final CTA Section Component
 *
 * id="v1-book", headline echo, Cal embed, email fallback
 *
 * Principle 8.4 (Iles): Repeat the highest-converting headline as CTA PS
 */
export function V1CTA() {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi({ namespace: 'gtm-discovery-call' })
      cal('ui', { hideEventTypeDetails: false, layout: 'month_view' })
    })()
  }, [])

  return (
    <section
      id="v1-book"
      className="bg-background py-20 lg:py-32 border-b border-border scroll-mt-20"
    >
      <div className="max-w-container mx-auto px-6 lg:px-12">
        <motion.div
          className="flex flex-col items-center gap-8 lg:gap-12"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOptions}
        >
          {/* Headline echo */}
          <motion.h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary text-center max-w-3xl leading-tight"
            variants={fadeInUp}
          >
            Pay once. Get qualified meetings or money back.
          </motion.h2>

          {/* Cal embed container */}
          <motion.div
            className="w-full max-w-2xl bg-secondary rounded-card border border-border overflow-hidden"
            variants={fadeInUp}
          >
            <Cal
              namespace="gtm-discovery-call"
              calLink="maksym-pidvalnyi/gtm-discovery-call"
              style={{ width: '100%', height: '100%', overflow: 'scroll' }}
              config={{ layout: 'month_view', useSlotsViewOnSmallScreen: 'true' }}
            />
          </motion.div>

          {/* Email fallback */}
          <motion.p
            className="text-text-secondary text-center text-sm"
            variants={fadeInUp}
          >
            Or email us at maksym@maxionlabs.com to book a time.
          </motion.p>
        </motion.div>
      </div>
    </section>
  )
}
