'use client'

import { motion } from 'framer-motion'
import { useEffect } from 'react'
import Cal, { getCalApi } from '@calcom/embed-react'
import { fadeInUp, staggerContainer, viewportOptions } from '@/lib/animations'

/**
 * V2 Final CTA Section Component
 *
 * id="v2-book", guarantee echo above button, Cal embed, email fallback
 *
 * Principle 8.4 (Iles): Repeat the highest-converting headline as CTA PS
 */
export function V2CTA() {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi({ namespace: 'intro-growth-call' })
      cal('ui', { hideEventTypeDetails: false, layout: 'month_view' })
    })()
  }, [])

  return (
    <section
      id="v2-book"
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
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-text-primary text-center"
            variants={fadeInUp}
          >
            Book your qualification call.
          </motion.h2>

          <motion.p
            className="text-text-secondary text-center"
            variants={fadeInUp}
          >
            8 qualified meetings in 90 days or full money back.
          </motion.p>

          <motion.div className="w-full" variants={fadeInUp}>
            <Cal
              namespace="intro-growth-call"
              calLink="maksym-pidvalnyi/intro-growth-call"
              style={{ width: '100%', height: '100%', overflow: 'scroll' }}
              config={{ layout: 'month_view', useSlotsViewOnSmallScreen: 'true' }}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
