import type { ReactNode } from 'react'
import { HomeHeader, CONTAINER, SERIF, INK, MUTED, LINE, PAPER, CTA, Mono, H2 } from '@/components/home/InsuranceHome'
import { HomeFooter } from '@/components/home/HomeFooter'
import { LINKEDIN_URL, SITE_URL } from '@/content/about'
import { AGGREGATE, CASE_STUDIES, RESULTS_HUB, RESULTS_PATH, RESULTS_UPDATED } from '@/content/case-studies'
import type { CaseStudy } from '@/content/case-studies'
import { publicImageSize } from '@/lib/image-size'
import { DOTS, TILE } from '@/components/results/CaseDiagrams'

const HUB_URL = `${SITE_URL}${RESULTS_PATH}`
const TINT = 'bg-[#F1F4F8]'

/**
 * /results. The two aggregate rows from the proof registry, the list-to-counted-meeting flow, then one card per case
 * with its receipt or its client's words. Same frame as /about and the guides (header, paper, footer), server-rendered
 * so every number is in the first HTML. JSON-LD: CollectionPage with an ItemList of the case pages and a
 * BreadcrumbList, authored by the same Person as the guides.
 */
export const RESULTS_JSON_LD = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'CollectionPage',
      '@id': `${HUB_URL}#page`,
      url: HUB_URL,
      name: RESULTS_HUB.title,
      description: RESULTS_HUB.description,
      inLanguage: 'en',
      dateModified: RESULTS_UPDATED,
      author: { '@type': 'Person', '@id': `${SITE_URL}/about#max`, name: 'Max Pidvalnyi', url: `${SITE_URL}/about`, sameAs: [LINKEDIN_URL] },
      publisher: { '@type': 'Organization', '@id': `${SITE_URL}/#org`, name: 'Maxionlabs', url: SITE_URL },
      mainEntity: { '@id': `${HUB_URL}#cases` },
    },
    {
      '@type': 'ItemList',
      '@id': `${HUB_URL}#cases`,
      name: 'Maxionlabs case studies',
      itemListElement: CASE_STUDIES.map((c, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: c.title,
        url: `${HUB_URL}/${c.slug}`,
      })),
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Maxionlabs', item: `${SITE_URL}/` },
        { '@type': 'ListItem', position: 2, name: 'Results', item: HUB_URL },
      ],
    },
  ],
}

/* ---------------------------------------------------------------- icons */

/** Decorative line icon in the site's hand-drawn stroke. Hidden from readers, the text next to it carries the meaning. */
function Icon({ d, className = 'w-5 h-5' }: { d: string; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d={d} />
    </svg>
  )
}

const ICON = {
  calendar: 'M4 6h16v15H4zM4 11h16M9 3v5M15 3v5',
  bars: 'M2 21h20M5 21V12M11 21V5M17 21v-9',
  list: 'M9 6h12M9 12h12M9 18h12M4 6h.01M4 12h.01M4 18h.01',
  email: 'M3 6h18v13H3zM3 8l9 6 9-6',
  reply: 'M9 16l-5-5 5-5M4 11h9a7 7 0 0 1 7 7v2',
  held: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM8 12l3 3 5-6',
  qualified: 'M12 3l7 3v5c0 4.5-3 8.3-7 10-4-1.7-7-5.5-7-10V6l7-3zM8.5 12l2.5 2.5 4.5-5',
  customer: 'M20 12l-8 8-9-9V4h7l10 8zM7.5 7.5h.01',
  phone: 'M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2',
  arrow: 'M4 12h16M14 6l6 6-6 6',
}

/* ------------------------------------------------------------- aggregate */

function AggregateTile({ a, eyebrow, icon, children }: { a: typeof AGGREGATE.meetings; eyebrow: string; icon: string; children?: ReactNode }) {
  return (
    <div data-testid="aggregate-row" className={`rounded-card border ${LINE} ${TILE} shadow-sm p-6 lg:p-8 flex flex-col gap-3`}>
      <div className="flex items-center justify-between gap-4">
        <Mono className="!text-accent">{eyebrow}</Mono>
        <span className={`inline-flex items-center justify-center w-9 h-9 rounded-full border border-accent/40 bg-white text-accent`}>
          <Icon d={icon} />
        </span>
      </div>
      <dt className={`${SERIF} text-[52px] md:text-[64px] font-medium ${INK} leading-none tracking-[-0.02em]`}>{a.value}</dt>
      <dd className={`text-lg ${INK} leading-snug`}>{a.label}</dd>
      <dd className={`text-sm ${MUTED} leading-relaxed`}>{a.detail}</dd>
      {children}
      <dd className={`mt-auto pt-3 border-t ${LINE} text-xs ${MUTED}`}>Counted on {a.verified}</dd>
    </div>
  )
}

/** The pipeline method as a formula, so the reader sees how the figure is built before they read the sentence. */
function PipelineFormula() {
  const chip = (text: string, accent = false) => (
    <span
      className={`rounded-small border ${LINE} ${accent ? 'bg-accent/[0.08] text-accent' : `${TINT} ${INK}`} px-2.5 py-1 font-mono text-[10px] md:text-[11px] font-medium tracking-[0.14em] uppercase`}
    >
      {text}
    </span>
  )
  return (
    <div data-testid="pipeline-formula" className="mt-1 flex flex-wrap items-center gap-2">
      {chip('sales meetings set')}
      <span className={`${SERIF} text-lg ${MUTED}`} aria-hidden="true">
        &times;
      </span>
      <span className="sr-only">times</span>
      {chip("each client's deal size")}
      <span className={`${SERIF} text-lg ${MUTED}`} aria-hidden="true">
        =
      </span>
      <span className="sr-only">equals</span>
      {chip('pipeline, not revenue', true)}
    </div>
  )
}

/* ------------------------------------------------------------------ flow */

type FlowStep = { n: string; head: string; body: string; icon: string }

/** What we do, from the "What we did" sections of the cases. No figures, no claim a case does not make. */
const WE_DO: FlowStep[] = [
  {
    n: '01',
    head: 'The list',
    icon: ICON.list,
    body: "Public records, Google Maps or the client's own lists, enriched to the decision maker.",
  },
  {
    n: '02',
    head: 'The email',
    icon: ICON.email,
    body: 'Short and plain, from domains we own.',
  },
  {
    n: '03',
    head: 'The reply',
    icon: ICON.reply,
    body: 'Every reply read and answered.',
  },
  {
    n: '04',
    head: 'Appointment setting',
    icon: ICON.phone,
    body: "A positive reply worked into a time on the client's calendar, by email and phone.",
  },
]

/** The four units we report, in the words of the case pages. The client counts every one of them, not us. */
const CLIENT_COUNTS: FlowStep[] = [
  { n: '05', head: 'Set', icon: ICON.calendar, body: "On the client's calendar." },
  { n: '06', head: 'Held', icon: ICON.held, body: 'It happened, with a recording or written confirmation.' },
  { n: '07', head: 'Qualified', icon: ICON.qualified, body: "The client's own team marked it qualified." },
  { n: '08', head: 'Customer', icon: ICON.customer, body: 'A paid account traced to one of our threads.' },
]

/**
 * One group of steps on a track: a thin dashed grey line through the icons for the work, a solid accent line for the
 * counted units. Horizontal on wide screens, vertical on phones, no track in the two-column middle.
 */
function FlowSteps({ steps, accent, cols }: { steps: FlowStep[]; accent: boolean; cols: string }) {
  const track = accent ? 'border-accent' : 'border-dashed border-[#9AA3B1]'
  return (
    <div className="relative mt-4">
      <div aria-hidden="true" className={`hidden lg:block absolute left-5 right-5 top-[18px] border-t ${track}`} />
      <div aria-hidden="true" className={`sm:hidden absolute left-[18px] top-5 bottom-5 border-l ${track}`} />
      <ol className={`grid ${cols} gap-4`}>
        {steps.map((s) => (
          <li key={s.n} data-testid="flow-step" data-group={accent ? 'client-counts' : 'we-do'} className="flex flex-col gap-2">
            <div className="flex items-center gap-3">
              <span
                className={`relative inline-flex items-center justify-center w-9 h-9 rounded-full border ${accent ? 'border-accent/60' : LINE} ${TILE} ${accent ? 'text-accent' : MUTED}`}
              >
                <Icon d={s.icon} />
              </span>
              <span className={`relative bg-white px-1 font-mono text-[11px] tracking-[0.18em] ${accent ? 'text-accent' : MUTED}`}>{s.n}</span>
            </div>
            <span className={`${SERIF} text-[22px] font-medium ${INK} leading-tight pl-12 sm:pl-0`}>{s.head}</span>
            <span className={`text-sm ${MUTED} leading-relaxed pl-12 sm:pl-0`}>{s.body}</span>
          </li>
        ))}
      </ol>
    </div>
  )
}

/* ----------------------------------------------------------------- cards */

type Receipt = { src: string; alt: string; fit: 'cover' | 'contain' }

/**
 * The receipt shown on a case card: the case's own evidence image (or the testimonial screenshot) whose shape is
 * closest to the 3:2 thumbnail box. A very wide image (a one-line Slack message) is shown whole on a tinted panel
 * instead of being cropped into a blur. Alt text is the data file's own, so nothing the row forbids is added here.
 */
function pickReceipt(c: CaseStudy): Receipt | null {
  const candidates = [...(c.evidence ?? []), ...(c.testimonial?.screenshot ? [c.testimonial.screenshot] : [])]
  if (!candidates.length) return null
  const target = 1.5
  let best: { src: string; alt: string; ratio: number } | null = null
  for (const img of candidates) {
    const size = publicImageSize(img.src)
    const ratio = size ? size.width / size.height : target
    if (!best || Math.abs(Math.log(ratio / target)) < Math.abs(Math.log(best.ratio / target))) best = { src: img.src, alt: img.alt, ratio }
  }
  return best ? { src: best.src, alt: best.alt, fit: best.ratio > 2.4 ? 'contain' : 'cover' } : null
}

function CardMedia({ c }: { c: CaseStudy }) {
  const receipt = pickReceipt(c)
  if (receipt) {
    return (
      <div className={`${TINT} border-b ${LINE}`}>
        <div className="h-44 sm:h-48 overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={receipt.src}
            alt={receipt.alt}
            loading="lazy"
            className={`w-full h-full ${receipt.fit === 'cover' ? 'object-cover object-top' : 'object-contain p-4'}`}
          />
        </div>
        <p className={`border-t ${LINE} bg-white px-4 py-1.5 font-mono text-[10px] font-medium tracking-[0.14em] uppercase ${MUTED}`}>
          Receipt
        </p>
      </div>
    )
  }
  if (c.testimonial) {
    return (
      <div className={`min-h-44 sm:min-h-48 ${TINT} border-b ${LINE} p-6 flex flex-col justify-between gap-4`}>
        <blockquote className={`${SERIF} text-[17px] ${INK} leading-snug`}>&ldquo;{c.testimonial.quote}&rdquo;</blockquote>
        <p className={`font-mono text-[10px] tracking-[0.14em] uppercase ${MUTED}`}>
          {c.testimonial.name}, {c.testimonial.role}
        </p>
      </div>
    )
  }
  return null
}

function CaseCard({ c }: { c: CaseStudy }) {
  const named = c.client.naming === 'named' && c.client.name
  const more = c.results.slice(1, 3)
  return (
    <li data-testid="case-card" className={`rounded-card border ${LINE} bg-white overflow-hidden flex flex-col`}>
      <CardMedia c={c} />
      <div className="p-6 flex flex-col gap-3 flex-1">
        <div className="flex flex-wrap items-start justify-between gap-x-3 gap-y-2">
          <Mono className="max-w-[70%]">{c.industry}</Mono>
          <span
            data-testid="naming-pill"
            className={`rounded-full border ${LINE} ${named ? 'bg-accent/[0.08] text-accent' : `${TINT} ${MUTED}`} px-2.5 py-0.5 font-mono text-[10px] font-medium tracking-[0.14em] uppercase whitespace-nowrap`}
          >
            {named ? 'Named client' : 'Business type only'}
          </span>
        </div>
        <div>
          <p className={`${SERIF} text-[40px] md:text-[44px] font-medium ${INK} leading-none tracking-[-0.02em]`}>{c.results[0].value}</p>
          <p className={`mt-2 text-base ${INK} leading-snug`}>{c.results[0].label}</p>
        </div>
        {more.length > 0 && (
          <dl className={`grid grid-cols-2 gap-x-4 border-t ${LINE} pt-3`}>
            {more.map((r) => (
              <div key={r.value + r.label} data-testid="case-result-chip" className="flex flex-col gap-0.5">
                <dt className={`${SERIF} text-[22px] font-medium ${INK} leading-none`}>{r.value}</dt>
                <dd className={`text-xs ${MUTED} leading-snug`}>{r.label}</dd>
              </div>
            ))}
          </dl>
        )}
        {named && <p className={`text-xs ${MUTED} leading-relaxed`}>{c.client.name}</p>}
        <a href={`${RESULTS_PATH}/${c.slug}`} className="mt-auto self-start inline-flex items-center gap-1 font-semibold text-accent hover:underline underline-offset-4">
          Read the case <span aria-hidden="true">&rarr;</span>
        </a>
      </div>
    </li>
  )
}

/* ------------------------------------------------------------------ page */

const SECTION_H2 = '!text-[28px] md:!text-[34px] lg:!text-[34px]'

export function ResultsHub() {
  return (
    <>
      <HomeHeader prefix="/" />
      <main className={`min-h-screen overflow-x-clip ${PAPER} ${INK}`}>
        <article className={`${CONTAINER} py-14 lg:py-20`}>
          <div className="max-w-3xl">
            <Mono className="!text-accent">Results</Mono>
            <h1 className={`${SERIF} mt-5 text-[36px] md:text-[48px] font-medium ${INK} leading-[1.05] tracking-[-0.015em]`}>
              What we have delivered, counted from the clients&apos; own records
            </h1>
            <p data-testid="results-answer" className={`mt-6 text-lg md:text-xl ${MUTED} leading-relaxed`}>
              Maxionlabs is an outsourced outbound agency. {AGGREGATE.meetings.value} {AGGREGATE.meetings.label},{' '}
              {AGGREGATE.pipeline.value} {AGGREGATE.pipeline.label}. Six cases below, each counted from the client&apos;s own
              records.
            </p>
            <p className={`mt-4 text-xs ${MUTED}`}>Updated {RESULTS_UPDATED}</p>
          </div>

          <section id="in-total" className="mt-12 scroll-mt-20">
            <H2 className={SECTION_H2}>In total, across every client</H2>
            <dl className="mt-6 grid md:grid-cols-2 gap-5">
              <AggregateTile a={AGGREGATE.meetings} eyebrow="Meetings" icon={ICON.calendar} />
              <AggregateTile a={AGGREGATE.pipeline} eyebrow="Pipeline" icon={ICON.bars}>
                <PipelineFormula />
              </AggregateTile>
            </dl>
          </section>

          <section id="how-it-works" className="mt-14 scroll-mt-20">
            <H2 className={SECTION_H2}>From a list to a counted meeting</H2>
            <p className={`mt-4 max-w-3xl text-base ${INK} leading-relaxed`}>
              How it runs for a client today. We do the first four steps. The client counts the last four.
            </p>
            <div className={`mt-8 rounded-card border ${LINE} bg-white p-6 lg:p-8 lg:flex lg:gap-6 lg:items-stretch`} style={DOTS}>
              <div className="lg:w-1/2">
                <Mono>What we do</Mono>
                <FlowSteps steps={WE_DO} accent={false} cols="sm:grid-cols-2 lg:grid-cols-4" />
              </div>
              <div className="hidden lg:flex items-start pt-[7px] text-accent" aria-hidden="true">
                <Icon d={ICON.arrow} className="w-6 h-6" />
              </div>
              <div className={`mt-10 lg:mt-0 lg:w-1/2 border-t lg:border-t-0 ${LINE} pt-8 lg:pt-0`}>
                <Mono className="!text-accent">What the client counts</Mono>
                <FlowSteps steps={CLIENT_COUNTS} accent cols="sm:grid-cols-2 lg:grid-cols-4" />
              </div>
            </div>
          </section>

          <section id="cases" className="mt-14 scroll-mt-20">
            <H2 className={SECTION_H2}>Six cases, one page each</H2>
            <p className={`mt-4 max-w-3xl text-base ${INK} leading-relaxed`}>
              Named where the client cleared it, business type where not. Biggest proof first. All six predate our move to
              commercial insurance.
            </p>
            <ul className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {CASE_STUDIES.map((c) => (
                <CaseCard key={c.slug} c={c} />
              ))}
            </ul>
          </section>

          <div className="max-w-3xl">
            <section id="how-we-count" className="mt-14 scroll-mt-20">
              <H2 className={SECTION_H2}>How we count</H2>
              <div className={`mt-4 flex flex-col gap-4 text-base ${INK} leading-relaxed`}>
                <p>
                  A meeting is not a customer, and pipeline is never called revenue. Definitions on the{' '}
                  <a href="/commercial-insurance-appointment-setting" className="text-accent hover:underline underline-offset-4">
                    appointment setting page
                  </a>
                  , price on the{' '}
                  <a href="/pricing" className="text-accent hover:underline underline-offset-4">
                    pricing page
                  </a>
                  .
                </p>
              </div>
            </section>

            <div className={`mt-14 rounded-card border-2 border-accent bg-white p-6 lg:p-8`}>
              <p className={`${SERIF} text-2xl ${INK} leading-snug`}>Ask Max where any of these numbers comes from.</p>
              <a href="/#book-call" className={`${CTA} mt-5`}>
                Book a 20 minute call with Max
              </a>
            </div>
          </div>
        </article>
      </main>
      <HomeFooter />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(RESULTS_JSON_LD) }} />
    </>
  )
}
