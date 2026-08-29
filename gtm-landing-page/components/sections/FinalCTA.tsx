'use client'

import { motion } from 'framer-motion'
import { useEffect } from 'react'
import Cal, { getCalApi } from '@calcom/embed-react'
import { Footer } from './Footer'
import { fadeInUp, staggerContainer, staggerItem, viewportOptions } from '@/lib/animations'

/**
 * Final CTA. The application.
 *
 * Carries the three things a booking touch has to (followup-value-equation):
 *   1. what they actually get, restated concretely
 *   2. what the call IS, so it is not a pitch they brace for
 *   3. what happens after, in steps, so it reads as a process not a promise
 *
 * The gate is stated as a MECHANISM ("we carry the cost, so we run a handful at
 * a time"), never as "limited slots". A forty-year operator has heard the latter.
 * Never inflate it: if he asks how many, the answer has to hold up.
 *
 * ⚠️ The intake QUESTIONS are configured in cal.com, not here. This embed only
 * points at the event type. Changing what is asked before booking is a cal.com
 * change on maksym-pidvalnyi/intro-growth-call.
 */
export function FinalCTA() {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi({ namespace: 'intro-growth-call' })
      cal('ui', { hideEventTypeDetails: false, layout: 'month_view' })
    })()
  }, [])

  return (
    <>
      <section
        id="book-call"
        data-testid="final-cta-section"
        className="bg-secondary border-t border-border scroll-mt-20"
      >
        <div className="max-w-container mx-auto px-6 lg:px-12 py-32 lg:py-48">
          <motion.div
            className="flex flex-col items-center gap-12 lg:gap-16 text-center"
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
              Book a 20 minute call.
            </motion.h2>

            {/* Why we are selective + exactly what happens on the call */}
            <motion.div
              className="flex flex-col gap-8 w-full max-w-2xl text-left"
              variants={fadeInUp}
            >
              <p className="text-lg md:text-xl text-text-secondary leading-relaxed">
                We take more risk with a performance based deal structure.{' '}
                <span className="text-text-primary font-medium">
                  That&apos;s exactly why we don&apos;t work with everyone.
                </span>{' '}
                You&apos;ll know if we&apos;re a good fit in the first 10 minutes.
              </p>

              <div className="flex flex-col gap-6">
                {/* Who they are actually meeting. The bullets below are in Max's
                    first person, so this byline is load-bearing, not decoration. */}
                <div className="flex items-center gap-3">
                  <span
                    className="flex-shrink-0 w-11 h-11 rounded-full bg-accent text-white text-base font-semibold flex items-center justify-center"
                    aria-hidden="true"
                  >
                    M
                  </span>
                  <span className="text-base text-text-secondary leading-snug">
                    <span className="text-text-primary font-semibold">
                      You&apos;ll book a call with me, Max
                    </span>
                    , I&apos;m the founder of this performance-based lead generation agency. Not a
                    sales guy.
                  </span>
                </div>

                <p className="text-base font-semibold text-text-primary">
                  Exactly what happens on the call:
                </p>
                <ol className="flex flex-col gap-4">
                  <Step n="1">
                    I&apos;ll ask a couple of questions about your business case so we both can
                    understand if it&apos;s a fit.
                  </Step>
                  <Step n="2">
                    If it makes sense, I&apos;ll walk you through exactly what we&apos;d do in your
                    case.
                  </Step>
                  <Step n="3">
                    I&apos;ll also share how much this growth oriented investment will be, the
                    expected results, and relevant timeframe.
                  </Step>
                  <Step n="4">
                    I&apos;ll also show you relevant case studies of similar past customers, and
                    what we learned there already that we can apply in your case.
                  </Step>
                  <Step n="5">
                    I&apos;ll answer all your questions to make sure you have enough information to
                    make a decision.
                  </Step>
                </ol>
              </div>
            </motion.div>

            {/* Cal.com Embed */}
            <motion.div
              variants={staggerItem}
              className="w-full max-w-4xl"
              style={{ minHeight: '630px' }}
            >
              <Cal
                namespace="intro-growth-call"
                calLink="maksym-pidvalnyi/intro-growth-call"
                style={{ width: '100%', height: '100%', overflow: 'scroll' }}
                config={{ layout: 'month_view', useSlotsViewOnSmallScreen: 'true', theme: 'light' }}
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

function Step({ n, children }: { n: string; children: React.ReactNode }) {
  return (
    <li className="flex gap-4 items-start">
      <span className="flex-shrink-0 w-7 h-7 rounded-full border border-accent/50 bg-accent/[0.08] text-accent text-xs font-mono flex items-center justify-center mt-0.5">
        {n}
      </span>
      <span className="text-base md:text-lg text-text-secondary leading-relaxed">{children}</span>
    </li>
  )
}

export default FinalCTA
