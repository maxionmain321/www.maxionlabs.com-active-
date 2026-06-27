'use client'

import { motion } from 'framer-motion'
import { useEffect } from 'react'
import Cal, { getCalApi } from '@calcom/embed-react'
import { fadeInUp, staggerContainer, viewportOptions } from '@/lib/animations'

/**
 * V3 CTA Section Component
 *
 * id="v3-book", guarantee repeated one line above Cal embed
 * Minimal frame, high whitespace
 *
 * Principle 8.4 (Iles): Repeat headline as CTA PS
 */
export function V3CTABlock() {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi({ namespace: 'gtm-discovery-call' })
      cal('ui', { hideEventTypeDetails: false, layout: 'month_view' })
    })()
  }, [])

  return (
    <section
      id="v3-book"
      className="bg-background py-20 lg:py-32 border-b border-border scroll-mt-20"
    >
      <div className="max-w-container mx-auto px-6 lg:px-12">
        <motion.div
          className="flex flex-col items-center gap-12"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOptions}
        >
          {/* Guarantee repeat */}
          <motion.p
            className="text-text-secondary text-lg text-center max-w-xl"
            variants={fadeInUp}
          >
            You get 8 qualified meetings in 90 days or your money back.
          </motion.p>

          {/* Cal embed */}
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
            className="text-text-secondary text-sm"
            variants={fadeInUp}
          >
            maksym@maxionlabs.com
          </motion.p>
        </motion.div>
      </div>
    </section>
  )
}
