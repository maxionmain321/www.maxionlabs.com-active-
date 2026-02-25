'use client'

import { motion } from 'framer-motion'
import { useEffect } from 'react'
import Cal, { getCalApi } from '@calcom/embed-react'
import { Footer } from './Footer'
import { fadeInUp, staggerContainer, staggerItem, viewportOptions } from '@/lib/animations'

/**
 * Final CTA Section Component
 *
 * Dark background section with Cal.com inline embed and footer.
 * Includes headline, subhead with no-pressure messaging, and email fallback.
 */
export function FinalCTA() {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi({ namespace: 'gtm-discovery-call' })
      cal('ui', { hideEventTypeDetails: false, layout: 'month_view' })
    })()
  }, [])

  return (
    <>
      <section
        id="book-call"
        data-testid="final-cta-section"
        className="bg-zinc-950 border-t border-border scroll-mt-20"
      >
        <div className="max-w-container mx-auto px-6 lg:px-12 py-24 lg:py-36">
          <motion.div
            className="flex flex-col items-center gap-8 text-center"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOptions}
          >
            {/* Headline */}
            <motion.h2
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary leading-tight max-w-4xl"
              variants={fadeInUp}
            >
              Ready to Fill Your Pipeline With{' '}
              <span className="text-gradient">Qualified Meetings</span>?
            </motion.h2>

            {/* Subhead */}
            <motion.p
              className="text-lg md:text-xl text-text-secondary max-w-2xl leading-relaxed"
              variants={fadeInUp}
            >
              We review your offer, ICP, and economics.{' '}
              <span className="text-text-primary font-medium">
                No pressure. If we&apos;re not a fit, we&apos;ll tell you.
              </span>
            </motion.p>

            {/* Cal.com Embed */}
            <motion.div
              variants={staggerItem}
              className="w-full max-w-4xl"
              style={{ minHeight: '630px' }}
            >
              <Cal
                namespace="gtm-discovery-call"
                calLink="maksym-pidvalnyi/gtm-discovery-call"
                style={{ width: '100%', height: '100%', overflow: 'scroll' }}
                config={{ layout: 'month_view', useSlotsViewOnSmallScreen: 'true' }}
              />
            </motion.div>

            {/* Email Fallback */}
            <motion.p
              variants={fadeInUp}
              className="text-sm text-text-secondary/70"
            >
              Prefer email?{' '}
              <a
                href="mailto:maksym@maxionlabs.com"
                className="text-accent-primary hover:underline"
              >
                Reach out at maksym@maxionlabs.com
              </a>
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </>
  )
}

export default FinalCTA
