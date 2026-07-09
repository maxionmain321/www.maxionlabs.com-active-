'use client'

import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { fadeInUp, staggerContainer, staggerItem, viewportOptions } from '@/lib/animations'
import { Button } from '@/components/ui/button'

/**
 * HOW TO ADD A NEW CLIENT WIN ROW:
 *
 * Each entry below renders as a full-width row:
 *   [ video OR bigStats ]   [ dashboard screenshot ]
 *               [ Case Study: <title> ]
 *               [ name · role · dateRange ]
 *               [ → outcome bullets ]
 *
 * Two left-column variants:
 *  (A) Video testimonial — populate `youtubeId` (16:9 regular video, not a Short).
 *  (B) No video — populate `bigStats` (2-3 big numbers shown in place of video).
 *
 * Screenshots:
 *  Drop the image in `public/images/` (e.g. `client-bluesteps-replies.png`)
 *  and reference as `/images/client-bluesteps-replies.png`. 16:9 crop preferred.
 *
 * Schema:
 *  {
 *    youtubeId?: 'abc123XYZ' | null,           // video variant
 *    bigStats?: [{ value: '214', label: 'positive replies' }, ...], // no-video variant
 *    screenshotSrc: '/images/client-foo.png',
 *    screenshotAlt: 'Foo dashboard',
 *    caseStudyTitle: 'Inframail' | 'B2B SaaS founder · 500+ employees',
 *    name: 'First Last' | 'Anonymized label',
 *    role: 'Role @ Company' | 'Segment descriptor',
 *    companyUrl?: 'https://example.com',       // omit when anonymized
 *    dateRange: 'MMM YYYY - MMM YYYY (active)',
 *    outcomes: ['X emails sent', 'Y engaged leads', 'Z signups'],
 *    note?: 'Optional footnote',
 *  }
 */
type ClientWin = {
  youtubeId?: string | null
  bigStats?: { value: string; label: string }[]
  narrative?: {
    struggled: ReactNode
    wanted: ReactNode
    helped: ReactNode
  }
  screenshotSrc?: string
  screenshotAlt?: string
  /** Two-proof layout: narrative + N screenshots in one 3-col row (used by BlueSteps). cropLeftPct trims platform sidebar. */
  screenshots?: { src: string; alt: string; caption?: string; cropLeftPct?: number }[]
  caseStudyTitle: string
  name: string
  role: string
  companyUrl?: string
  dateRange: string
  segment?: string
  outcomes: string[]
  note?: string
}

const clientWins: ClientWin[] = [
  {
    youtubeId: 'qslrNyCbT-k',
    screenshotSrc: '/images/client-inframail-15.05.2026.png',
    screenshotAlt: 'Inframail dashboard metrics',
    caseStudyTitle: 'Inframail',
    name: 'Kidous Mahteme',
    role: 'Co-founder @ Inframail',
    companyUrl: 'https://inframail.com',
    dateRange: 'Oct 2025 - Jul 2026 (active)',
    segment: 'Cold Email Infrastructure SaaS',
    outcomes: [
      '673K emails sent',
      '909 positive engaged leads',
      '80+ directly attributed customers',
    ],
  },
  {
    narrative: {
      struggled: 'Sitting on 100K+ opt-ins from 10+ years of running BlueSteps + AESC, but a newly launched $5K executive board-coaching product had never been marketed to them before.',
      wanted: 'Activate that dormant list and turn a fraction of it into paying board-coaching customers profitably, without buying new lists.',
      helped: 'Aggregated product positioning + customer stories, ran 10 simultaneous campaign variants against the same audience, doubled down on the winner based on actual data.',
    },
    screenshots: [
      {
        src: '/images/client-bluesteps-26.05.2026-instantly.jpg',
        alt: 'BlueSteps Instantly dashboard metrics',
        caption: 'Instantly era · 27.4K sent · 219 positives · ~35 days',
      },
      {
        src: '/images/client-bluesteps-09.07.2026-bison.png',
        alt: 'BlueSteps EmailBison dashboard metrics',
        caption: 'EmailBison era · 16.5K sent · 436 positives · last 35 days',
        cropLeftPct: 9,
      },
    ],
    caseStudyTitle: 'BlueSteps',
    name: 'BlueSteps',
    role: 'AESC · Executive board coaching',
    companyUrl: 'https://www.bluesteps.com',
    dateRange: 'Apr 2026 - Jul 2026 (active)',
    segment: 'High-Ticket Executive Coaching',
    outcomes: [
      '655 positive replies from senior executives',
      '148 registered for the board-coaching program',
      '90+ qualified consultations booked with their coaches',
      '20 coaching offers out, $16,100+ cash collected in packages',
      'In ~2.5 months',
    ],
    note: 'Funnel tracked end-to-end in our attribution database.',
  },
  {
    narrative: {
      struggled: 'A vertical SaaS in the $5-10M ARR range, selling to SMB contractors, wanted cold email as a net-new pipeline channel next to the ones already working, with every outcome tracked in their own CRM.',
      wanted: 'Closed-won customers and sales-qualified meetings attributed to cold outbound inside their CRM, not vanity reply counts.',
      helped: (
        <>
          Tested dozens of campaign angles against their SMB market, found the opener format that was{' '}
          <span className="underline decoration-[#00d9ff] decoration-2 underline-offset-4">
            4-8x more efficient
          </span>{' '}
          than the rest, and poured the volume into it. Their sales team shows up to ~95% of the calls our outbound books.
        </>
      ),
    },
    caseStudyTitle: 'Vertical SaaS for contractors',
    name: 'Vertical SaaS company (anonymized)',
    role: '$5-10M ARR · sells to SMB contractors · US',
    dateRange: 'Mar 2026 - Jul 2026 (active)',
    segment: 'Vertical B2B SaaS · transactional deal size · single decision-maker sale',
    outcomes: [
      '76,000+ cold emails in 4 months',
      '2 closed-won customers (~$17-18K ARR)',
      '14 SQLs total',
      'On pace for ~25 sales-qualified meetings this month',
    ],
  },
  {
    narrative: {
      struggled: 'Had a new offer they were confident would crush, never really marketed it before at scale. Needed to validate it against real prospects.',
      wanted: "Prove the offer worked on a small sample before pouring budget + time into scaling, and avoid burning their whole prospect pool on an untested message. Plus someone they knew wouldn't land in spam and teach them how to do it also.",
      helped: (
        <>
          Scraped a fresh list of 20K qualified real estate brokers + agents, launched 3 copy variants against a small validation list, then scaled the winner with a{' '}
          <span className="underline decoration-[#00d9ff] decoration-2 underline-offset-4">
            killer offer + killer social proof
          </span>{' '}
          combo: 138 positive engaged leads in one month from the winning campaign.
        </>
      ),
    },
    screenshotSrc: '/images/client-leadclova-15.05.2026.png',
    screenshotAlt: 'Lead-gen agency dashboard metrics',
    caseStudyTitle: 'Lead-gen agency',
    name: 'Lead-gen agency (anonymized)',
    role: 'Real estate brokers + agents',
    dateRange: 'Nov 2025 - Dec 2025',
    segment: 'Lead Generation Agency · Real Estate',
    outcomes: [
      '12,892 emails sent',
      '138 positive engaged leads',
      '46% positive reply rate',
      'In ~1 month',
    ],
  },
  {
    narrative: {
      struggled: 'Always had trouble getting leads at the volume they wanted. Had a new cheap front-end offer designed to pull buyers into their universe, but no way to scale it.',
      wanted: 'Validate the offer on a small slice of their pipeline, then scale it across the full auto repair shop market — and learn how to run the channel in-house long-term.',
      helped: (
        <>
          Scraped owners + managing directors + decision-makers at auto repair shops, ran 5 small campaigns to validate the angle, then poured the full volume into the winner. Email{' '}
          <span className="underline decoration-[#00d9ff] decoration-2 underline-offset-4">
            stated the offer + price up-front
          </span>{' '}
          so every positive reply was pre-qualified — majority of engaged leads bought the front-end offer.
        </>
      ),
    },
    screenshotSrc: '/images/client-americasbestshops-15.05.2026.png',
    screenshotAlt: 'AI marketing agency dashboard metrics',
    caseStudyTitle: 'AI marketing agency',
    name: 'AI marketing agency (anonymized)',
    role: 'Auto repair shops · US',
    dateRange: 'Nov 2025 - Jan 2026',
    segment: 'AI-forward Marketing Agency for Auto Repair Shops',
    outcomes: [
      '51 engaged leads',
      'Cold email machine installed so they can run it in-house',
      'In 45 days',
    ],
  },
  {
    youtubeId: 'yMmsy7V3HoU',
    screenshots: [
      {
        src: '/images/client-reviewfix-15.05.2026-instantly.jpg',
        alt: 'ReviewFix Instantly dashboard metrics',
        caption: 'Instantly era · 2.5K sent · 25 positives · 45 days',
      },
      {
        src: '/images/client-reviewfix-09.07.2026-bison.png',
        alt: 'ReviewFix EmailBison dashboard metrics',
        caption: 'EmailBison era · 1.5K sent · 15 positives · ~2 weeks',
        cropLeftPct: 9,
      },
    ],
    caseStudyTitle: 'ReviewFix',
    name: 'Conor',
    role: 'Founder @ ReviewFix',
    dateRange: 'Mar 2026 - Jul 2026 (active)',
    segment: 'Reputation Management Agency',
    outcomes: [
      '4K emails sent, full offer with price up front so every reply is pre-qualified',
      '40 positive replies total',
      '≈30 went ahead with the service',
      'In 2 months',
    ],
    note: 'Removals run on performance terms, so their customer only pays when a review comes down.',
  },
  {
    narrative: {
      struggled: 'Self-serve SaaS with no booked-calls motion. Sales cycle runs on free-trial signups, so classic "book a meeting" cold email did not fit.',
      wanted: 'Prove cold email could drive qualified trial signups across the EU, at a cost that works for self-serve.',
      helped: (
        <>
          Built a signup-first motion: instead of asking for a call, each email gave the company a reason to{' '}
          <span className="underline decoration-[#00d9ff] decoration-2 underline-offset-4">
            go see the product for themselves
          </span>
          . First positive reply landed 34 minutes after launch.
        </>
      ),
    },
    caseStudyTitle: 'EU Tender Matching SaaS',
    name: 'EU Tender Matching SaaS (anonymized)',
    role: 'Sells to SMBs that bid on public tenders · EU',
    dateRange: 'May 2026 - Jul 2026 (active)',
    segment: 'B2B SaaS · Self-serve / free-trial motion',
    outcomes: [
      '20,865 contacts reached',
      '1,135 companies visited the product preview',
      '85 free-trial signups, 49 exact ICP',
      'First positive reply 34 minutes after launch',
    ],
  },
]

export function VideoTestimonials() {
  return (
    <section
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
        <motion.div
          className="flex flex-col w-full max-w-6xl"
          variants={staggerItem}
        >
          {clientWins.map((t, i) => (
            <div key={i} className="flex flex-col">
              <div className="w-full h-px bg-border/60 my-16 lg:my-20" />
              <ClientWinRow t={t} />
              {i % 2 === 1 && i < clientWins.length - 1 && <InlineCTA />}
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  )
}

function ClientWinRow({ t }: { t: ClientWin }) {
  return (
    <motion.div variants={fadeInUp} className="flex flex-col gap-10">
      <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-text-primary text-center">
        Case Study: {t.caseStudyTitle}
      </h3>

      <div className="flex flex-col gap-6 w-full">
        <div className="flex flex-col gap-0.5">
          <p className="text-sm font-semibold text-text-primary">{t.name}</p>
          {t.companyUrl ? (
            <a
              href={t.companyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-text-secondary/80 hover:text-accent-primary underline-offset-4 hover:underline w-fit"
            >
              {t.role}
            </a>
          ) : (
            <p className="text-xs text-text-secondary/80">{t.role}</p>
          )}
        </div>

        {t.screenshots && t.screenshots.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-6 lg:gap-10 w-full items-start">
            <LeftCell t={t} compact />
            <div className="flex flex-col gap-5">
              {t.screenshots.map((s, i) => (
                <div key={i} className="flex flex-col gap-2">
                  <a
                    href={s.src}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full rounded-card overflow-hidden border border-border hover:border-[#00d9ff]/50 transition-colors"
                  >
                    <img
                      src={s.src}
                      alt={s.alt}
                      className="h-auto"
                      style={
                        s.cropLeftPct
                          ? { width: `${100 + s.cropLeftPct}%`, marginLeft: `-${s.cropLeftPct}%`, maxWidth: 'none' }
                          : { width: '100%' }
                      }
                    />
                  </a>
                  {s.caption && (
                    <p className="text-[11px] text-text-secondary/60 font-mono text-center">
                      {s.caption} · click to enlarge
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6 lg:gap-10 w-full">
            <LeftCell t={t} />
            <RightCell t={t} />
          </div>
        )}
      </div>

      <div className="flex flex-col items-center gap-3 text-center max-w-3xl mx-auto">
        <p className="text-xs text-text-secondary/60 uppercase tracking-wide">{t.dateRange}</p>
        {t.segment && (
          <p className="text-sm text-text-secondary/80">{t.segment}</p>
        )}

        <ul className="flex flex-col gap-2 pt-4">
          {t.outcomes.map((o, i) => (
            <li key={i} className="flex items-start gap-2 text-sm md:text-base text-text-primary/90 text-left">
              <span className="text-[#00d9ff] mt-1">→</span>
              <span>{o}</span>
            </li>
          ))}
        </ul>

        {t.note && (
          <p className="text-xs text-text-secondary/60 italic pt-3 mt-1">{t.note}</p>
        )}
      </div>
    </motion.div>
  )
}

function LeftCell({ t, compact = false }: { t: ClientWin; compact?: boolean }) {
  if (t.youtubeId) {
    return (
      <div className="relative aspect-video w-full rounded-card overflow-hidden border border-border">
        <iframe
          src={`https://www.youtube.com/embed/${t.youtubeId}?rel=0`}
          title={`${t.name} testimonial`}
          allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 w-full h-full"
        />
      </div>
    )
  }

  if (t.narrative) {
    return (
      <div className={`relative w-full rounded-card overflow-hidden border border-border/60 bg-gradient-to-br from-background/60 via-background/30 to-background/10 flex flex-col justify-center gap-4 ${compact ? 'p-5 lg:p-6' : 'aspect-video p-6 lg:p-8'}`}>
        <NarrativeBlock label="Struggling with" text={t.narrative.struggled} />
        <NarrativeBlock label="Wanted to achieve" text={t.narrative.wanted} />
        <NarrativeBlock label="What we did" text={t.narrative.helped} />
      </div>
    )
  }

  if (t.bigStats && t.bigStats.length > 0) {
    return (
      <div className="relative aspect-video w-full rounded-card overflow-hidden border border-border/60 bg-gradient-to-br from-background/60 via-background/30 to-background/10 flex items-center justify-center p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
          {t.bigStats.map((s, i) => (
            <div key={i} className="flex flex-col items-center text-center gap-1">
              <span className="text-4xl md:text-5xl lg:text-6xl font-bold tabular-nums leading-none bg-gradient-to-b from-white to-white/70 bg-clip-text text-transparent">
                {s.value}
              </span>
              <span className="text-[11px] md:text-xs text-text-secondary/80 mt-2">
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="relative aspect-video w-full rounded-card overflow-hidden border border-border flex items-center justify-center text-sm text-text-secondary/60">
      content coming soon
    </div>
  )
}

function InlineCTA() {
  return (
    <div className="flex flex-col items-center pt-20 lg:pt-24">
      <Button
        variant="shimmer"
        size="xl"
        className="font-semibold text-lg md:text-xl px-10 py-6"
        onClick={() => {
          document.getElementById('book-call')?.scrollIntoView({ behavior: 'smooth' })
        }}
      >
        Book Profitable Outbound Workshop &rarr;
      </Button>
    </div>
  )
}

function NarrativeBlock({ label, text }: { label: string; text: ReactNode }) {
  return (
    <div className="flex flex-col gap-1">
      <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-text-secondary/60">
        {label}
      </p>
      <p className="text-sm md:text-[15px] text-text-primary/90 leading-snug">{text}</p>
    </div>
  )
}

function RightCell({ t }: { t: ClientWin }) {
  if (t.screenshotSrc) {
    return (
      <div className="relative aspect-video w-full rounded-card overflow-hidden border border-border">
        <img
          src={t.screenshotSrc}
          alt={t.screenshotAlt ?? `${t.name} dashboard`}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>
    )
  }

  return (
    <div className="relative aspect-video w-full rounded-card overflow-hidden border border-border/60 bg-background/20 flex items-center justify-center text-sm text-text-secondary/60">
      dashboard screenshot coming soon
    </div>
  )
}

export default VideoTestimonials
