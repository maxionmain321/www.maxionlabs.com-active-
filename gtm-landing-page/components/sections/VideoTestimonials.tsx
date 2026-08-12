'use client'

import { motion } from 'framer-motion'
import { fadeInUp, staggerContainer, staggerItem } from '@/lib/animations'
import { Button } from '@/components/ui/button'

/**
 * PROOF SECTION. Every row is the SAME SHAPE. Do not add fields.
 *
 *   CASE STUDY: <business type>        <- never a client name; the type is what tells
 *   [ video OR one screenshot ]           a reader whether the row is relevant to them
 *   cameOut   what came out, in THEIR unit
 *   worth     what one of those is worth to them
 *   funnel    the volume behind it
 *   dates     range + active/ended
 *
 * MEDIA RULE (Max, 2026-08-11): a founder VIDEO outranks a dashboard, always.
 * A dashboard is our screenshot of our numbers; a video is someone else's voice,
 * which is what a skeptical stranger is actually asking for. So: video where it
 * exists, ONE dashboard as fallback, nothing where we have neither. Never both,
 * because the weaker asset dilutes the stronger one on the same row.
 *
 * UNITS ARE DELIBERATELY NOT NORMALISED. An Inframail customer is $129/mo and a
 * Workyard closed-won is $10K/yr. Flattening both into "customers" hides a 77x
 * spread and a sharp reader will smell it. The SHAPE repeats; the units do not.
 *
 * "Not tracked" is a legitimate value for `worth`. Do not substitute a softer
 * metric to fill the slot.
 */
type ClientWin = {
  /** Business TYPE, not the client's name. */
  caseStudyTitle: string
  youtubeId?: string
  screenshotSrc?: string
  screenshotAlt?: string
  /** H1, the outcome. */
  headline: string
  /** H2 and H3. What they mean varies by row: value per unit, volume, or context. */
  sub1: string
  sub2: string
  /** H4 */
  dates: string
  /** H5, optional. Person on record, or "client interview incoming". */
  attribution?: string
  attributionUrl?: string
}

/** Order set by Max 2026-08-11: most relevant and biggest magnitude first. */
const clientWins: ClientWin[] = [
  {
    caseStudyTitle: 'Online reputation, local businesses',
    youtubeId: 'yMmsy7V3HoU',
    headline: '20 businesses signed on review removal',
    sub1: '13 Google reviews successfully removed, and 24 more in the cycle',
    sub2: '$350 to $450 per removal',
    dates: 'Jun to Aug 2026 · active',
    attribution: 'Conor, Founder',
  },
  {
    caseStudyTitle: 'Construction software',
    headline: '5 customers signed on annual contracts',
    sub1: 'Annual value is $7,000 to $20,000',
    sub2: '23 sales-qualified meetings generated so far',
    dates: 'Mar to Aug 2026 · active',
    attribution: 'Client interview incoming',
  },
  {
    caseStudyTitle: 'Cold email infrastructure software',
    youtubeId: 'qslrNyCbT-k',
    headline: '70+ paying customers directly attributed',
    sub1: '$129 a month, 5 months average retention',
    sub2: '858 engaged leads generated total',
    dates: 'Oct 2025 to Aug 2026',
    attribution: 'Kidous Mahteme, co-founder',
    attributionUrl: 'https://inframail.com',
  },
  {
    caseStudyTitle: 'Executive career services',
    screenshotSrc: '/images/client-bluesteps-11.08.2026-bison-120d.png',
    screenshotAlt: 'BlueSteps campaign dashboard, last 120 days: 41,422 sent, 1,211 replies, 1,190 interested',
    headline: '10 customers, $32,300 in revenue',
    sub1: '170+ meetings held, 1,400+ engaged leads, all senior executives',
    sub2: 'Client has no dedicated sales team, so conversions ran below what the pipeline supported',
    dates: 'Apr to Aug 2026 · active',
    attribution: 'Client interview incoming',
  },
  {
    caseStudyTitle: 'Marketing agency, auto repair shops',
    screenshotSrc: '/images/client-americasbestshops-15.05.2026.png',
    screenshotAlt: 'Campaign dashboard, marketing agency for auto repair shops',
    headline: '51 engaged leads in 45 days',
    sub1: 'The goal was to build the machine and teach them to run it in-house',
    sub2: 'Still printing without us',
    dates: 'Nov 2025 to Jan 2026',
  },
  {
    caseStudyTitle: 'Lead generation agency, real estate',
    screenshotSrc: '/images/client-leadclova-15.05.2026.png',
    screenshotAlt: 'Campaign dashboard, lead generation agency',
    headline: '138 engaged leads in one month',
    sub1: 'The goal was to build the machine and teach them to run it in-house',
    sub2: 'Still printing without us',
    dates: 'Nov to Dec 2025',
  },
]

export function VideoTestimonials() {
  return (
    <section
      id="proof"
      data-testid="video-testimonials-section"
      className="max-w-container mx-auto px-6 lg:px-12 pt-16 lg:pt-24 pb-32 lg:pb-48"
    >
      <motion.div
        className="flex flex-col items-center gap-16 lg:gap-20"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.01 }}
      >
        <motion.div className="flex flex-col w-full max-w-5xl" variants={staggerItem}>
          {clientWins.map((t, i) => (
            <div key={t.caseStudyTitle} className="flex flex-col">
              <div className="w-full h-px bg-border/60 my-14 lg:my-16" />
              <ClientWinRow t={t} />
              {i === 2 && <InlineCTA />}
            </div>
          ))}

          <div className="w-full h-px bg-border/60 my-14 lg:my-16" />
          <motion.p
            variants={fadeInUp}
            className="text-base md:text-lg text-text-secondary/80 leading-relaxed text-center"
          >
            Case studies incoming shortly for a commercial landscaping business, a global
            executive association, and a European tender procurement software.
          </motion.p>
        </motion.div>
      </motion.div>
    </section>
  )
}

function ClientWinRow({ t }: { t: ClientWin }) {
  const media = <MediaCell t={t} />

  return (
    <motion.div variants={fadeInUp} className="flex flex-col gap-8">
      <span className="text-[11px] font-mono uppercase tracking-[0.18em] text-text-secondary/70 text-center">
        Case Study: {t.caseStudyTitle}
      </span>

      <div className={media ? 'grid md:grid-cols-2 gap-8 lg:gap-12 items-center' : ''}>
        {media}
        <Facts t={t} />
      </div>
    </motion.div>
  )
}

function MediaCell({ t }: { t: ClientWin }) {
  if (t.youtubeId) {
    return (
      <div className="relative aspect-video w-full rounded-card overflow-hidden border border-border">
        <iframe
          src={`https://www.youtube.com/embed/${t.youtubeId}?rel=0`}
          title={`${t.caseStudyTitle} testimonial`}
          allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 w-full h-full"
        />
      </div>
    )
  }

  if (t.screenshotSrc) {
    return (
      <div className="relative w-full rounded-card overflow-hidden border border-border/60">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={t.screenshotSrc}
          alt={t.screenshotAlt ?? ''}
          className="w-full h-auto block"
          loading="lazy"
        />
      </div>
    )
  }

  return null
}

function Facts({ t }: { t: ClientWin }) {
  return (
    <div className="flex flex-col gap-3">
      <p className="text-2xl md:text-3xl font-bold text-text-primary leading-tight text-balance">
        {t.headline}
      </p>
      <p className="text-base md:text-lg text-text-secondary leading-relaxed">{t.sub1}</p>
      <p className="text-base md:text-lg text-text-secondary leading-relaxed">{t.sub2}</p>
      <p className="text-xs font-mono text-text-secondary/60 pt-1">{t.dates}</p>
      {t.attribution && (
        <p className="text-xs text-text-secondary/70 pt-2">
          {t.attributionUrl ? (
            <a
              href={t.attributionUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-accent-primary underline-offset-4 hover:underline"
            >
              {t.attribution}
            </a>
          ) : (
            t.attribution
          )}
        </p>
      )}
    </div>
  )
}

function InlineCTA() {
  return (
    <div className="flex flex-col items-center pt-20 lg:pt-24">
      <Button
        variant="shimmer"
        size="xl"
        className="font-semibold text-base sm:text-lg md:text-xl px-6 sm:px-10 py-6 max-w-full"
        onClick={() => {
          document.getElementById('book-call')?.scrollIntoView({ behavior: 'smooth' })
        }}
      >
        Apply for a pilot &rarr;
      </Button>
    </div>
  )
}

export default VideoTestimonials
