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
      className="bg-background py-24 lg:py-32 scroll-mt-20"
    >
      <div className="max-w-5xl mx-auto px-6 lg:px-12">
        <motion.div
          className="flex flex-col items-center gap-10"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOptions}
        >
          <motion.p
            className="text-2xl md:text-3xl font-bold text-text-primary text-center"
            variants={fadeInUp}
          >
            8 qualified meetings in 90 days or we return every dollar.
          </motion.p>

          <motion.div className="w-full" variants={fadeInUp}>
            <Cal
              namespace="gtm-discovery-call"
              calLink="maksym-pidvalnyi/gtm-discovery-call"
              style={{ width: '100%', height: '100%', overflow: 'scroll' }}
              config={{ layout: 'month_view', useSlotsViewOnSmallScreen: 'true' }}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
