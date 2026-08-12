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
 * change on maksym-pidvalnyi/gtm-discovery-call.
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
              Apply for a pilot. Two commercial walkthroughs, on us.
            </motion.h2>

            {/* What the call is + what happens after */}
            <motion.div
              className="flex flex-col gap-8 w-full max-w-2xl text-left"
              variants={fadeInUp}
            >
              <p className="text-lg md:text-xl text-text-secondary leading-relaxed">
                Twenty minutes, and it is not a pitch. We ask which properties pay best for you,
                which of your services they take once you are in, and how far you will travel.
                You ask us anything.
              </p>

              <ol className="flex flex-col gap-4">
                <Step n="1">
                  We agree the property types and the radius, and which accounts to leave alone.
                </Step>
                <Step n="2">
                  We build the list for your area, find who signs at each property, and go at them
                  in your name.
                </Step>
                <Step n="3">
                  Two walkthroughs land on your calendar. You show up and quote. Then you decide
                  whether we carry on.
                </Step>
              </ol>

              <p className="text-base md:text-lg text-text-secondary leading-relaxed">
                <span className="text-text-primary font-medium">
                  We carry the cost of those two, so we only run a handful at a time.
                </span>{' '}
                Not every application becomes a pilot. If yours is not one, we will say so on the
                call rather than take your time.
              </p>
            </motion.div>

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
