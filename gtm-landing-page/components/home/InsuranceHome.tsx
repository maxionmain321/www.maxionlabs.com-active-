import { BookCall } from './BookCall'
import { HomeFooter } from './HomeFooter'

/**
 * Homepage: the commercial insurance offer.
 *
 * Server-rendered, one H1, every number traces to a repo file:
 *   00_foundation/offer-v3.md (CURRENT INSURANCE OFFER block): price, counts, credit, refund, prepay, included list
 *   knowledge_base/maxionlabs-acquisition/proof/funnel-tracker.md: only QUOTABLE rows, with their stated context
 *   knowledge_base/clients/leads/jared-gabbel-strongtower-offer/public/index.html: trigger table, check flow, brief, owner replies
 *   knowledge_base/maxionlabs-acquisition/seo-aeo-strategy.md: ICP, anti-ICP, positioning, differentiators
 *
 * The page structure (hero with proof column, results strip, "same owner, two emails", how it starts,
 * clients on camera, honest filter, price, fair questions, closing call) models leadhaste.com's section order.
 * The copy, palette and assets are ours. No insurance results are quoted until the registry has a QUOTABLE row.
 * The one example email is an invented illustration and is labelled as such on the page.
 *
 * The FAQ and the two-email comparison use <details> and plain DOM, so all text is in the SSR HTML.
 */

const CONTAINER = 'max-w-container mx-auto px-6 lg:px-12'
const SERIF = "font-['Iowan_Old_Style','Palatino_Linotype',Palatino,'Book_Antiqua',Georgia,serif]"
const INK = 'text-[#15130F]'
const MUTED = 'text-[#625D55]'
const LINE = 'border-[#E4DED3]'
const PAPER = 'bg-[#FBF9F5]'

const CTA =
  'inline-flex items-center justify-center rounded-button bg-accent text-white font-semibold px-6 py-3 text-base hover:bg-accent/90 transition-colors'
const CTA_LINK = 'inline-flex items-center gap-1 font-semibold text-accent hover:underline underline-offset-4'

function Mono({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={`font-mono text-[11px] font-medium tracking-[0.18em] uppercase ${MUTED} ${className}`}>
      {children}
    </p>
  )
}

function SectionLabel({ n, children }: { n: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <span className="font-mono text-[11px] font-semibold tracking-[0.18em] text-accent">{n}</span>
      <span className={`h-px w-8 bg-accent/60`} aria-hidden="true" />
      <Mono className="!text-accent">{children}</Mono>
    </div>
  )
}

function H2({ children, id, className = '' }: { children: React.ReactNode; id?: string; className?: string }) {
  return (
    <h2
      id={id}
      className={`${SERIF} text-[34px] md:text-[44px] lg:text-[52px] font-medium ${INK} leading-[1.05] tracking-[-0.01em] ${className}`}
    >
      {children}
    </h2>
  )
}

function H3({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <h3 className={`${SERIF} text-2xl md:text-[28px] font-medium ${INK} leading-tight ${className}`}>{children}</h3>
}

function Lede({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <p className={`mt-4 text-lg ${MUTED} leading-relaxed max-w-2xl ${className}`}>{children}</p>
}

function Note({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <p className={`mt-6 text-sm ${MUTED} leading-relaxed max-w-3xl ${className}`}>{children}</p>
}

function Card({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <div className={`rounded-card border ${LINE} bg-white px-6 py-6 ${className}`}>{children}</div>
}

function Redacted({ w = 'w-24' }: { w?: string }) {
  return (
    <span aria-label="redacted" className={`inline-block ${w} h-3.5 rounded-sm bg-[#15130F]/80 align-middle mx-0.5`} />
  )
}

function Underline({ children }: { children: React.ReactNode }) {
  return (
    <span className="relative inline-block">
      <span className="relative z-10">{children}</span>
      <span className="absolute left-0 right-0 bottom-[0.08em] h-[0.14em] bg-accent/70 rounded-sm" aria-hidden="true" />
    </span>
  )
}

/* ---------------------------------------------------------------- header */

const NAV = [
  ['#results', 'Results'],
  ['#why-it-books', 'Why it books'],
  ['#how-it-starts', 'How it starts'],
  ['#fit', 'Fit'],
  ['#price', 'Price'],
  ['#faq', 'FAQ'],
]

function HomeHeader() {
  return (
    <header className={`sticky top-0 z-40 ${PAPER}/90 backdrop-blur border-b ${LINE}`}>
      <nav className={`${CONTAINER} py-4 flex items-center justify-between gap-6`}>
        <a href="/" className={`${SERIF} text-[22px] font-semibold ${INK}`}>
          Maxionlabs
        </a>
        <div className={`hidden lg:flex items-center gap-7 text-sm font-medium ${MUTED}`}>
          {NAV.map(([href, label]) => (
            <a key={href} href={href} className="hover:text-[#15130F]">
              {label}
            </a>
          ))}
        </div>
        <a href="#book-call" className={`${CTA} px-4 py-2 text-sm`}>
          Book a call
        </a>
      </nav>
    </header>
  )
}

/* ------------------------------------------------------------------ hero */

export const HERO_H1 = 'Anyone can sell you leads. We book first meetings with owners who are coming up for renewal.'
export const HERO_SUB =
  'Your missing outbound seat, for independent commercial P&C and benefits agencies. We find owners whose public records just changed, email them, call every yes and book the ones inside your appetite. Your producers take it from there.'

const TERMS = [
  ['$4,725 a month', 'Month to month. Sending starts within 72 hours of payment.'],
  ['15 qualified meetings a month', '12 in month one while we ramp. $315 back for every one we miss.'],
  ['7-day full refund', 'Territory locked, never resold. No share of commission.'],
]

/** Real replies, anonymized, from the November 2026 owner-reply table (Strong Tower template, option 1). */
const HERO_REPLIES = [
  ['Painting contractor, Knoxville, TN', 'Yes. I am concerned I am overpaying on workers comp.'],
  ['Home care agency, Galax, VA', "I'd love to schedule a call. Next week."],
  ['Behavioral health practice, New York, NY', 'I can do 11am Tuesday, a week from today.'],
  ['Accounting firm, Hackensack, NJ', "Sure, let's discuss small business plan."],
]

/** funnel-tracker.md QUOTABLE rows: construction software, executive career services, EU tender software. */
const HERO_STATS = [
  ['35', 'sales-qualified demos', 'Construction software, sold to contractors'],
  ['$73,300', 'client revenue, 8.6x return', 'Executive career services'],
  ['19', 'qualified meetings held in a month', 'EU procurement software'],
]

/** Named, cleared videos. Ids and titles from components/sections/VideoTestimonials.tsx; clearance in funnel-tracker.md. */
const ON_CAMERA = [
  {
    name: 'Anisa Ahmed',
    title: 'Growth & Revenue Strategy, executive career services',
    metric: '24 paid closes, $73,300 in client revenue',
    youtubeId: '-4Dox4xc49o',
    avatar: '/images/proof/insurance-proof-avatar-anisa.jpg',
  },
  {
    name: 'Kidous Mahteme',
    title: 'Co-founder, cold email infrastructure software',
    metric: '70+ paying customers directly attributed',
    youtubeId: 'qslrNyCbT-k',
    avatar: '/images/proof/insurance-proof-avatar-kidous.jpg',
  },
  {
    name: 'Rebecca Ditchey',
    title: 'Senior Program Manager, executive education',
    metric: '13 sales calls held, 4 seats sold',
    youtubeId: 'laYwFMVGZhw',
    avatar: 'https://img.youtube.com/vi/laYwFMVGZhw/hqdefault.jpg',
  },
  {
    name: 'Conor',
    title: 'Founder, online reputation services',
    metric: '50+ businesses signed',
    youtubeId: 'yMmsy7V3HoU',
    avatar: 'https://img.youtube.com/vi/yMmsy7V3HoU/hqdefault.jpg',
  },
]

function PlayIcon() {
  return (
    <span
      className="absolute inset-0 flex items-center justify-center"
      aria-hidden="true"
    >
      <span className="w-9 h-9 rounded-full bg-white/95 shadow flex items-center justify-center">
        <span className="ml-0.5 w-0 h-0 border-y-[6px] border-y-transparent border-l-[10px] border-l-accent" />
      </span>
    </span>
  )
}

function Hero() {
  return (
    <section data-testid="hero-section" className={`${CONTAINER} pt-14 pb-14 lg:pt-20 lg:pb-20`}>
      <div className="grid lg:grid-cols-[1.15fr_1fr] gap-12 lg:gap-16 items-start">
        <div className="min-w-0">
          <Mono className="!text-accent">Your missing outbound seat · commercial insurance agencies</Mono>
          <h1
            className={`${SERIF} mt-5 text-[40px] md:text-[54px] lg:text-[60px] font-medium ${INK} leading-[1.02] tracking-[-0.015em] max-w-3xl`}
          >
            Anyone can sell you leads. We book <Underline>first meetings</Underline> with owners who are coming up
            for renewal.
          </h1>
          <p className={`mt-6 text-lg md:text-xl ${MUTED} leading-relaxed max-w-2xl`}>{HERO_SUB}</p>
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
            <a href="#book-call" className={CTA}>
              Book a 20 minute call with Max
            </a>
            <a href="#results" className={CTA_LINK}>
              See the results <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
          <ul className={`mt-10 border-t ${LINE} divide-y divide-[#E4DED3]`}>
            {TERMS.map(([head, body]) => (
              <li key={head} className="py-3.5 flex flex-col sm:flex-row sm:items-baseline gap-x-6 gap-y-0.5">
                <span className={`font-semibold ${INK} sm:w-64 flex-shrink-0`}>{head}</span>
                <span className={`text-sm ${MUTED}`}>{body}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-4 min-w-0">
          <div className={`rounded-card border ${LINE} bg-white shadow-[0_1px_0_rgba(21,19,15,0.04)] overflow-hidden`}>
            <div className={`px-5 py-3 border-b ${LINE} flex items-center justify-between`}>
              <Mono>Owners replying to our insurance clients</Mono>
              <Mono>Nov 2026</Mono>
            </div>
            <ul className="px-5 py-4 flex flex-col gap-3.5">
              {HERO_REPLIES.map(([who, said]) => (
                <li key={who} className="flex gap-3 items-start">
                  <span className="mt-1 flex-shrink-0 w-7 h-7 rounded-full bg-[#EFEAE0] text-[10px] font-mono text-[#625D55] flex items-center justify-center" aria-hidden="true">
                    {who.slice(0, 1)}
                  </span>
                  <span className="flex flex-col gap-0.5">
                    <span className={`text-xs ${MUTED}`}>{who}</span>
                    <span className={`text-[15px] ${INK} leading-snug`}>&ldquo;{said}&rdquo;</span>
                  </span>
                </li>
              ))}
            </ul>
            <p className={`px-5 pb-4 text-xs ${MUTED}`}>
              Real replies to cold email for a group benefits agency in New Jersey and a commercial P&amp;C agency in
              Tennessee. Names and businesses removed. A yes is not a meeting yet; every one still gets our call.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {HERO_STATS.map(([big, what, who]) => (
              <div key={big} className={`rounded-card border ${LINE} bg-white px-4 py-4 min-w-0 flex sm:flex-col items-baseline sm:items-stretch gap-x-4`}>
                <p className={`${SERIF} text-2xl md:text-3xl ${INK} leading-none flex-shrink-0`}>{big}</p>
                <span className="min-w-0">
                  <p className={`sm:mt-1.5 text-xs ${INK} leading-snug`}>{what}</p>
                  <p className={`mt-1 sm:mt-1.5 text-[11px] ${MUTED} leading-snug`}>{who}</p>
                </span>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {ON_CAMERA.slice(0, 2).map((t) => (
              <a
                key={t.youtubeId}
                href={`https://www.youtube.com/watch?v=${t.youtubeId}`}
                target="_blank"
                rel="noopener noreferrer"
                className={`group rounded-card border ${LINE} bg-white p-3 flex items-center gap-3 hover:border-accent/60 transition-colors`}
              >
                <span className="relative flex-shrink-0 w-14 h-14 rounded-full overflow-hidden bg-[#EFEAE0]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={t.avatar} alt="" className="w-full h-full object-cover" loading="lazy" />
                  <PlayIcon />
                </span>
                <span className="flex flex-col min-w-0">
                  <span className={`text-sm font-semibold ${INK}`}>{t.name}</span>
                  <span className={`text-[11px] ${MUTED} leading-snug`}>{t.title}</span>
                  <Mono className="mt-1 !text-accent !tracking-[0.12em]">On camera</Mono>
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ---------------------------------------------------------- what we're not */

const NOT_US = [
  ['Not a lead list', 'You get a meeting with an owner who said yes, not names to dial.'],
  ['Not a $50 appointment vendor', 'Every yes gets a call from us and an appetite check before it books.'],
  ['Never resold', 'Your meetings are yours. Your counties are locked, included.'],
  ['Not a marketing agency', 'No ads, no content, no impression reports. Meetings are the deliverable.'],
  ["Never domains with your agency's name", 'We send from domains we own, with copy you approve.'],
]

function WhatWeAreNot() {
  return (
    <section data-testid="what-we-are-not" className={`border-y ${LINE} bg-white`}>
      <div className={`${CONTAINER} py-8`}>
        <div className="flex flex-col lg:flex-row lg:items-start gap-6 lg:gap-10">
          <Mono className="lg:pt-1 lg:w-28 flex-shrink-0">What we&apos;re not</Mono>
          <ul className="grid sm:grid-cols-2 lg:grid-cols-5 gap-x-6 gap-y-4 flex-1">
            {NOT_US.map(([head, body]) => (
              <li key={head}>
                <p className={`text-sm font-semibold ${INK}`}>
                  <span className="text-accent mr-1.5" aria-hidden="true">
                    &#10005;
                  </span>
                  {head}
                </p>
                <p className={`mt-1 text-xs ${MUTED} leading-relaxed`}>{body}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

/* ---------------------------------------------------------------- results */

/**
 * Every row is a QUOTABLE row in funnel-tracker.md, with its definition kept.
 * Construction software: 35 SQL demos, 6 Closed Won, $7K-20K range (Max's statement).
 * Executive career services: $73,300 / 24 paid closes / 8.6x; NOT fully cold, so the card says so.
 * Online reputation: quote 50+ only; never the removed or verified counts.
 * EU tender software: 19 held in one month; 74+ engaged leads; 65,622 emails to 33,569 people.
 * AI product: 13 booked in 24 days (7 guaranteed); 4 SQO; 54 interested from 19,467 emails.
 * Cold-email infrastructure: 70+ paying customers; 858 engaged leads.
 * Executive education: 13 sales calls booked and held; 4 seats sold.
 */
const CASES = [
  {
    label: '35 demos · construction software',
    who: 'Software sold to contractors',
    metrics: [
      ['35', 'sales-qualified demos held'],
      ['6', 'annual contracts signed'],
      ['$7K to $20K', 'a year, each'],
    ],
    note: 'The buyers were contractors. The same owners you write GL and workers comp for.',
  },
  {
    label: '19 held in a month · EU procurement software',
    who: 'Tender matching software',
    metrics: [
      ['19', 'qualified meetings held in one month'],
      ['74+', 'engaged leads'],
      ['65,622', 'emails to 33,569 people'],
    ],
    note: 'Held means the client confirmed it and paid for it.',
  },
  {
    label: '$73,300 · executive career services',
    who: 'Career services for executives',
    metrics: [
      ['24', 'paid closes'],
      ['$73,300', 'client revenue driven'],
      ['8.6x', 'return on what they paid us'],
    ],
    note: "Outbound email to leads already in the client's ecosystem, so warmer than cold. Anisa says it on camera.",
  },
  {
    label: '13 demos in 24 days · early-stage AI product',
    who: 'Horizontal AI product, validating a vertical',
    metrics: [
      ['13', 'demos booked in 24 days, 7 guaranteed'],
      ['4', 'sales-qualified opportunities'],
      ['54', 'interested leads from 19,467 emails'],
    ],
    note: 'Mars Xiang, Slipstream Engineering, in writing.',
  },
  {
    label: '70+ customers · cold email infrastructure',
    who: 'Cold-email infrastructure software',
    metrics: [
      ['70+', 'paying customers directly attributed'],
      ['858', 'engaged leads'],
    ],
    note: 'Kidous Mahteme, co-founder, on camera.',
  },
  {
    label: '50+ signed · online reputation services',
    who: 'Review removal for local businesses',
    metrics: [
      ['50+', 'local businesses signed'],
      ['3', 'closed in a couple of days, one week in August'],
    ],
    note: 'Conor, founder, on camera.',
  },
  {
    label: '13 calls held · executive education',
    who: 'Certificate programs',
    metrics: [
      ['13', 'sales calls booked and held'],
      ['4', 'seats sold'],
    ],
    note: 'Rebecca Ditchey, Senior Program Manager, on camera.',
  },
]

function CaseStrip() {
  return (
    <div className="mt-10 -mx-6 lg:mx-0 overflow-x-auto pb-2" role="region" aria-label="Case studies, scrolls sideways" tabIndex={0}>
      <ul className="flex gap-4 px-6 lg:px-0 min-w-max lg:min-w-0 lg:grid lg:grid-cols-4 lg:gap-4">
        {CASES.slice(0, 4).map((c) => (
          <li key={c.label} className={`w-[300px] lg:w-auto rounded-card border ${LINE} bg-white p-5 flex flex-col`}>
            <Mono className="!text-accent">{c.label}</Mono>
            <ul className={`mt-4 flex flex-col divide-y divide-[#EFEAE0]`}>
              {c.metrics.map(([big, what]) => (
                <li key={what} className="py-2 flex items-baseline gap-3">
                  <span className={`${SERIF} text-xl ${INK} whitespace-nowrap`}>{big}</span>
                  <span className={`text-xs ${MUTED}`}>{what}</span>
                </li>
              ))}
            </ul>
            <p className={`mt-4 text-xs ${MUTED} leading-relaxed`}>{c.note}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

function Results() {
  const featured = CASES[0]
  return (
    <section id="results" className={`${CONTAINER} py-16 lg:py-24 scroll-mt-20`}>
      <SectionLabel n="01">Results</SectionLabel>
      <H2>
        Seven markets. Same machine. <br className="hidden md:block" />
        Owners said yes, meetings got held, deals got signed.
      </H2>
      <Lede>
        Insurance is our newest market, so the numbers below are from the industries we ran before it. The process is
        the one we run for agencies now: map the market, email the owners, call every yes, book.
      </Lede>

      <CaseStrip />

      <div className={`mt-12 rounded-card border ${LINE} bg-white overflow-hidden grid lg:grid-cols-[1.1fr_1fr]`}>
        <div className="p-7 lg:p-10">
          <Mono className="!text-accent">Featured · {featured.who}</Mono>
          <H3 className="mt-4">35 sales-qualified demos and 6 annual contracts, selling software to contractors</H3>
          <p className={`mt-4 ${MUTED} leading-relaxed`}>
            Contractors, the people you write GL and workers comp for. We built the list, emailed the owner, and the
            client&apos;s sales team took the demo. Each contract is $7K to $20K a year. The client is active and the
            count keeps moving, so ask Max for the current one on the call.
          </p>
          <blockquote className={`mt-6 border-l-2 border-accent pl-4 ${INK} text-lg leading-snug ${SERIF}`}>
            &ldquo;Our list curation is strong, so all high value customers.&rdquo;
          </blockquote>
          <p className={`mt-2 text-xs ${MUTED}`}>The client&apos;s own assessment, from their Slack, August 2026.</p>
          <div className="mt-8 grid grid-cols-3 gap-4">
            {featured.metrics.map(([big, what]) => (
              <div key={what}>
                <p className={`${SERIF} text-3xl ${INK} leading-none`}>{big}</p>
                <p className={`mt-1.5 text-xs ${MUTED} leading-snug`}>{what}</p>
              </div>
            ))}
          </div>
        </div>
        <figure className={`border-t lg:border-t-0 lg:border-l ${LINE} bg-[#F3EFE7] p-6 lg:p-8 flex flex-col justify-center`}>
          <div className={`rounded-card border ${LINE} bg-white overflow-hidden shadow-sm`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/proof/workyard-sqo-held.jpg"
              alt="Masked Slack thread. A prospect replies: You've got my attention. Are you available for a demo? I can be open as early as this afternoon. The client's sales team answers the next day: SQO. Meeting was held today."
              className="w-full h-auto"
              loading="lazy"
            />
          </div>
          <figcaption className={`mt-3 text-xs ${MUTED} leading-relaxed`}>
            From the client&apos;s Slack, July 2026, buyer details masked. The prospect asks for a demo, the client&apos;s
            sales team confirms it was held and qualified.
          </figcaption>
        </figure>
      </div>

      <div className="mt-6 grid md:grid-cols-3 gap-4">
        {CASES.slice(4).map((c) => (
          <Card key={c.label} className="flex flex-col">
            <Mono className="!text-accent">{c.label}</Mono>
            <div className="mt-4 flex flex-col gap-3">
              {c.metrics.map(([big, what]) => (
                <div key={what} className="flex items-baseline gap-3">
                  <span className={`${SERIF} text-2xl ${INK} whitespace-nowrap`}>{big}</span>
                  <span className={`text-xs ${MUTED}`}>{what}</span>
                </div>
              ))}
            </div>
            <p className={`mt-4 text-xs ${MUTED}`}>{c.note}</p>
          </Card>
        ))}
      </div>

      <div className={`mt-8 grid md:grid-cols-2 gap-4`}>
        <figure className={`rounded-card border ${LINE} bg-white p-4`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/proof/reviewfix-3-clients.jpg"
            alt="Masked Slack message from the client: Mate it's been a huge start to the week. Closed 3 clients in a couple of days plus went back for more on one we closed last week. Circa 20 individual reviews to be removed so far this week. Great job Max."
            className="w-full h-auto rounded-sm"
            loading="lazy"
          />
          <figcaption className={`mt-3 text-xs ${MUTED}`}>
            Online reputation services, August 2026. Three clients closed in a couple of days, from the client&apos;s
            Slack. The twenty reviews were work ahead that week, not finished removals.
          </figcaption>
        </figure>
        <div className={`rounded-card border ${LINE} bg-white p-6 flex flex-col justify-center`}>
          <H3>Every number here has a date and a source</H3>
          <p className={`mt-3 text-sm ${MUTED} leading-relaxed`}>
            Each one is counted from the client&apos;s own records or our sending platform, on a date we can name, and
            we keep a registry of which ones we are allowed to quote. Ask on the call and Max walks you through where
            any of them comes from.
          </p>
          <p className={`mt-3 text-sm ${MUTED} leading-relaxed`}>
            Insurance: two agencies live since late October 2026, a group benefits agency in New Jersey and a
            commercial P&amp;C agency in Tennessee, names private. First meetings being held, too early for bound
            premium. We publish their numbers when they are real, not before.
          </p>
        </div>
      </div>
    </section>
  )
}

/* ---------------------------------------------------------- why it books */

/**
 * ILLUSTRATION. "Ridgeline Hauling", "Dan" and every detail in both emails are invented to show the shape.
 * The signal types and sources are the ones in the trigger table below (FMCSA census, job postings).
 */
const SIGNAL_EMAIL = {
  subject: 'Ridgeline Hauling insurance',
  lines: [
    { text: 'Hi Dan, saw Ridgeline Hauling got its operating authority last week', n: 1 },
    { text: "and you're running 6 trucks out of Chattanooga", n: 2 },
    { text: 'with two more drivers coming on', n: 3 },
  ],
  rest: 'If we could get your auto liability and cargo in front of the carriers that actually write for-hire trucking, without you chasing a single quote, would that be useful?',
  sig: ["We're a local commercial insurance agency in {your city}.", '{Producer}, {Your agency}'],
  footnotes: [
    ['1', 'FMCSA carrier census', 'New authority granted', '9 days old'],
    ['2', 'FMCSA carrier census', 'Power units: 6. Base: Chattanooga, TN', '9 days old'],
    ['3', 'Job posting', 'CDL-A driver, two openings', '4 days old'],
  ],
}

const BOUGHT_EMAIL = {
  subject: 'Quick question about your commercial insurance',
  body: [
    "Hi Dan, I'm with {Your agency}. We help trucking companies like Ridgeline Hauling save money on their commercial insurance.",
    'Our records show your policy renews in March. Do you have 15 minutes this week for a quick coverage review?',
  ],
  footnote: 'Purchased X-date list. The same date was sold to every agency that bought the list, and his phone was already ringing.',
}

const SIGNALS = [
  ['Contractors', 'State contractor licence boards', ['New licence issued', 'Licence coming up for renewal']],
  ['Trucking and delivery', 'FMCSA carrier census', ['New operating authority', 'Fleet size', 'Cargo type']],
  ['Manufacturers', 'OSHA and Form 5500', ['New inspection or citation', 'Plan-year start from the 5500']],
  ['Employers with a group plan', 'Form 5500 filings', ['Plan-year start', 'Participant count', 'Current carrier on the filing']],
  ['Restaurants and bars', 'State liquor licence filings, county health permits', ['New or transferred licence', 'New location opening']],
  ['Growing employers', 'Job postings, county building permits', ['Headcount growth', 'A new site']],
  ['Renewal timing', 'Captured and confirmed on our call with the owner', ['Renewal date the owner gives us', 'A need now or within 3 months']],
]

function EmailFrame({
  children,
  subject,
  tag,
  testId,
  tone,
}: {
  children: React.ReactNode
  subject: string
  tag: string
  testId: string
  tone: 'good' | 'bad'
}) {
  return (
    <div
      data-testid={testId}
      className={`rounded-card border ${tone === 'good' ? 'border-accent/50' : LINE} bg-white overflow-hidden flex flex-col`}
    >
      <div className={`px-5 py-3 border-b ${LINE} flex items-center justify-between gap-3`}>
        <Mono className={tone === 'good' ? '!text-accent' : ''}>{tag}</Mono>
        <Mono>Illustration</Mono>
      </div>
      <div className={`px-5 py-4 text-[15px] ${INK} leading-relaxed flex flex-col gap-3 flex-1`}>
        <p className={`text-sm ${MUTED}`}>
          <span className={`font-semibold ${INK}`}>Subject:</span> {subject}
        </p>
        {children}
      </div>
    </div>
  )
}

function WhyItBooks() {
  return (
    <section id="why-it-books" className={`border-y ${LINE} bg-white scroll-mt-20`}>
      <div className={`${CONTAINER} py-16 lg:py-24`}>
        <SectionLabel n="02">Why it books more meetings</SectionLabel>
        <H2>Same owner. Two emails. One gets answered.</H2>
        <Lede>
          Two emails to the same owner in the same month. The one he answers names something that just happened to
          his business, that he knows is on the public record. The other one tells him you bought his name.
        </Lede>

        <div className="mt-10 grid lg:grid-cols-2 gap-5 items-stretch">
          <EmailFrame subject={SIGNAL_EMAIL.subject} tag="From public records" testId="signal-email" tone="good">
            <p>
              {SIGNAL_EMAIL.lines.map((l, i) => (
                <span key={l.n}>
                  <span className="underline decoration-accent/60 decoration-2 underline-offset-[5px]">{l.text}</span>
                  <sup className="ml-0.5 font-mono text-[10px] text-accent">{l.n}</sup>
                  {i < SIGNAL_EMAIL.lines.length - 1 ? ', ' : '.'}
                </span>
              ))}
            </p>
            <p>{SIGNAL_EMAIL.rest}</p>
            <p className={MUTED}>
              {SIGNAL_EMAIL.sig[0]}
              <br />
              {SIGNAL_EMAIL.sig[1]}
            </p>
            <ol className={`mt-auto pt-4 border-t ${LINE} flex flex-col gap-1.5`}>
              {SIGNAL_EMAIL.footnotes.map(([n, source, what, age]) => (
                <li key={n} className="flex gap-2 items-baseline font-mono text-[11px] tracking-[0.04em]">
                  <span className="text-accent">{n}</span>
                  <span className={`uppercase ${INK}`}>{source}</span>
                  <span className={MUTED}>· {what}</span>
                  <span className={`${MUTED} ml-auto whitespace-nowrap uppercase`}>{age}</span>
                </li>
              ))}
            </ol>
          </EmailFrame>

          <EmailFrame subject={BOUGHT_EMAIL.subject} tag="From a bought list" testId="bought-list-email" tone="bad">
            {BOUGHT_EMAIL.body.map((p) => (
              <p key={p} className={MUTED}>
                {p}
              </p>
            ))}
            <p className={MUTED}>
              Best,
              <br />
              {'{Producer}, {Your agency}'}
            </p>
            <p className={`mt-auto pt-4 border-t ${LINE} font-mono text-[11px] tracking-[0.04em] ${MUTED}`}>
              <span className="text-accent mr-2">a</span>
              <span className={`uppercase ${INK}`}>Source</span> · {BOUGHT_EMAIL.footnote}
            </p>
          </EmailFrame>
        </div>
        <Note>
          Both emails are made up to show the shape; Ridgeline Hauling and Dan do not exist. The real ones are plain,
          no links, one question, sent from domains we own, offering a meeting with your agency. You approve every
          word before anything goes out.
        </Note>

        <div className="mt-16">
          <H3>The public records we watch, by the line you write</H3>
          <p className={`mt-3 ${MUTED} max-w-2xl`}>
            Each source is free and public. We pull your state and your lines, and count your territory in week one,
            before any email goes out. Freshness runs from daily (FMCSA) to yearly (Form 5500).
          </p>
          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-8">
            {SIGNALS.map(([industry, source, items]) => (
              <div key={industry as string} className={`border-t ${LINE} pt-4`}>
                <p className={`font-semibold ${INK}`}>{industry}</p>
                <p className={`mt-1 text-xs ${MUTED}`}>{source}</p>
                <ul className="mt-3 flex flex-col gap-1.5">
                  {(items as string[]).map((s) => (
                    <li key={s} className={`text-sm ${INK} flex gap-2 items-start`}>
                      <span className="text-accent mt-[3px] text-[10px]" aria-hidden="true">
                        &#9679;
                      </span>
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <div className={`border-t ${LINE} pt-4 sm:col-span-2 lg:col-span-1`}>
              <p className={`font-semibold ${INK}`}>What a record is not</p>
              <p className={`mt-1 text-xs ${MUTED}`}>Why every yes still gets a call</p>
              <p className={`mt-3 text-sm ${MUTED} leading-relaxed`}>
                Registration is not the same as buying coverage. So a record gets the owner an email, a yes gets him a
                call, and only an owner who fits your appetite gets on your calendar.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ---------------------------------------------------------- how it starts */

const STEPS = [
  {
    head: 'A 20 minute call with Max. Free.',
    body: 'He asks about your lines, your territory and your premium floor, then shows you the count of businesses in your territory showing a trigger right now. If it is not a fit, he says so on the call.',
  },
  {
    head: 'We build it. You approve every word.',
    body: 'One-page agreement, you pay the first month, a 15 minute onboarding form. We map your market from the records above, write the emails, and nothing goes out until you have signed off the copy. Sending starts within 72 hours.',
  },
  {
    head: 'Meetings land on your producers’ calendars.',
    body: 'Every yes gets a call from us and a check against your appetite. Only a match books, with a brief in the inbox before the meeting. 12 in month one, 15 a month from month two.',
  },
]

const CHECK_FLOW = [
  ['Owner says yes', 'A reply to our email asking for the meeting.'],
  ['We call them', 'A real conversation, not a form. We confirm they want the meeting.'],
  ['Check your appetite', 'Line, premium, headcount, county and who signs, against what you told us you write.'],
  ['Then it books', 'Only a match goes on your calendar. Anything else never reaches your producer.'],
]

const QUALIFIED = [
  ['Premium', 'Above the premium or group-size floor you set. Not headcount, premium.'],
  ['Renewal window', 'A need now or within 3 months. We ask for the renewal date and confirm what we can.'],
  ['Appetite', 'In your territory and inside your carrier appetite, by line.'],
  ['Decider present', 'The owner, or whoever decides on the insurance, is in the meeting.'],
]

function HowItStarts() {
  return (
    <section id="how-it-starts" className={`${CONTAINER} py-16 lg:py-24 scroll-mt-20`}>
      <SectionLabel n="03">How it starts</SectionLabel>
      <H2>Three steps. The first one is free.</H2>
      <ol className="mt-10 grid md:grid-cols-3 gap-5">
        {STEPS.map((s, i) => (
          <li key={s.head} className={`rounded-card border ${LINE} bg-white p-6`}>
            <span className={`font-mono text-[11px] tracking-[0.18em] text-accent`}>STEP {i + 1}</span>
            <H3 className="mt-3 !text-xl md:!text-[22px]">{s.head}</H3>
            <p className={`mt-3 text-sm ${MUTED} leading-relaxed`}>{s.body}</p>
          </li>
        ))}
      </ol>

      <div className="mt-16 grid lg:grid-cols-2 gap-10 lg:gap-16">
        <div>
          <H3>No meeting reaches your calendar until we&apos;ve called and checked it</H3>
          <ol className="mt-6 flex flex-col">
            {CHECK_FLOW.map(([head, body], i) => (
              <li key={head} className={`flex gap-4 py-4 border-t ${LINE}`}>
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-accent text-white text-xs font-mono flex items-center justify-center">
                  {i + 1}
                </span>
                <span>
                  <span className={`font-semibold ${INK}`}>{head}</span>
                  <span className={`block mt-1 text-sm ${MUTED} leading-relaxed`}>{body}</span>
                </span>
              </li>
            ))}
          </ol>
        </div>
        <div id="qualified" className="scroll-mt-20">
          <H3>&ldquo;Qualified&rdquo; means all four, agreed in writing before we send</H3>
          <ul className="mt-6 flex flex-col">
            {QUALIFIED.map(([head, body]) => (
              <li key={head} className={`flex gap-4 py-4 border-t ${LINE}`}>
                <span className="flex-shrink-0 w-7 h-7 rounded-full border border-accent text-accent text-xs flex items-center justify-center" aria-hidden="true">
                  &#10003;
                </span>
                <span>
                  <span className={`font-semibold ${INK}`}>{head}</span>
                  <span className={`block mt-1 text-sm ${MUTED} leading-relaxed`}>{body}</span>
                </span>
              </li>
            ))}
          </ul>
          <Note className="!mt-4">
            Miss one and it is a credit, not an appointment. We don&apos;t guarantee a quote, a bound policy or a sale.
            We guarantee the owner is real, fits what you write, has a reason to talk now, and shows up. No-shows are
            replaced.
          </Note>
        </div>
      </div>

      <div className={`mt-16 grid lg:grid-cols-[1fr_1.2fr] gap-8 lg:gap-12 items-start`}>
        <div>
          <Mono className="!text-accent">What lands before every meeting</Mono>
          <H3 className="mt-3">A real brief, with the names blacked out</H3>
          <p className={`mt-3 ${MUTED} leading-relaxed`}>
            Business and contact details, who&apos;s on the call, why they said yes in their own words, and what to
            watch for. Current carrier when we know it. Nothing inferred and dressed up as fact.
          </p>
          <p className={`mt-3 text-sm ${MUTED} leading-relaxed`}>
            This one went to a group benefits agency in November 2026. Yours carries your line, your appetite and the
            owner&apos;s own words.
          </p>
        </div>
        <div className={`rounded-card border ${LINE} bg-white text-sm overflow-hidden`}>
          <div className={`bg-[#F6F3EC] px-5 py-3 ${MUTED} border-b ${LINE} leading-relaxed`}>
            <b className={INK}>From:</b> Maxionlabs &nbsp; <b className={INK}>To:</b> <Redacted w="w-28" />
            <br />
            <b className={INK}>Subject:</b> New call booked, brief for your producer
            <br />
            <b className={INK}>Sent:</b> Tue 3 Nov, a week before the call
          </div>
          <dl className="px-5 py-4 grid grid-cols-[96px_1fr] gap-x-4 gap-y-3">
            <dt className={MUTED}>When</dt>
            <dd className={INK}>
              Tue 10 Nov, 11am ET, 15 min on Teams with <Redacted w="w-24" />
            </dd>
            <dt className={MUTED}>Who</dt>
            <dd className={INK}>
              Founder and executive director. Cell (prefers texts) and office line included: <Redacted w="w-28" />
            </dd>
            <dt className={MUTED}>Also on</dt>
            <dd className={INK}>The office manager, who runs their insurance operations</dd>
            <dt className={MUTED}>Business</dt>
            <dd className={INK}>
              Mental health group practice, New York, one location, founded <Redacted w="w-12" />. Therapy, psych
              testing, a children&apos;s center, a psychiatrist on staff
            </dd>
            <dt className={MUTED}>Size</dt>
            <dd className={INK}>About 30 licensed clinicians, 25 trainees, 5 admin. LinkedIn says 11 to 50</dd>
            <dt className={MUTED}>Why they said yes</dt>
            <dd className={INK}>
              First question was &ldquo;who pays you?&rdquo; After we offered 15 minutes to see if there is anything to
              gain on their current plan: &ldquo;I can do 11am Tuesday, a week from today.&rdquo;
            </dd>
            <dt className={MUTED}>Watch for</dt>
            <dd className={INK}>Cover early how the agency gets paid</dd>
            <dt className={MUTED}>Broker change</dt>
            <dd className={INK}>Possible, not assumed</dd>
          </dl>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------- clients on camera */

function OnCamera() {
  return (
    <section className={`border-y ${LINE} bg-white`}>
      <div className={`${CONTAINER} py-16 lg:py-20`}>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <Mono className="!text-accent">Clients on camera</Mono>
            <H3 className="mt-3">Their voice, not our screenshot</H3>
          </div>
          <p className={`text-sm ${MUTED} max-w-md`}>
            Each one is a client who sat down and said what happened, on YouTube. Names and titles are theirs. The
            numbers next to them are the ones in our registry today.
          </p>
        </div>
        <ul className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {ON_CAMERA.map((t) => (
            <li key={t.youtubeId}>
              <a
                href={`https://www.youtube.com/watch?v=${t.youtubeId}`}
                target="_blank"
                rel="noopener noreferrer"
                className={`group block rounded-card border ${LINE} bg-white p-5 h-full hover:border-accent/60 transition-colors`}
              >
                <span className="relative block w-16 h-16 rounded-full overflow-hidden bg-[#EFEAE0]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={t.avatar} alt="" className="w-full h-full object-cover" loading="lazy" />
                  <PlayIcon />
                </span>
                <p className={`mt-4 ${SERIF} text-xl ${INK} leading-snug`}>{t.metric}</p>
                <p className={`mt-3 text-sm font-semibold ${INK}`}>{t.name}</p>
                <p className={`text-xs ${MUTED} leading-snug`}>{t.title}</p>
                <Mono className="mt-3 !text-accent !tracking-[0.12em] group-hover:underline">Watch on YouTube</Mono>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

/* ---------------------------------------------------------- honest filter */

const WORKS_IF = [
  ['Commercial P&C or benefits is the business', 'Independent agency or brokerage, roughly $2M to $15M in revenue.'],
  ['At least 2 producers besides the owner', 'Someone other than you takes the meetings. That is the trait every buyer so far has had.'],
  ['You can name your premium floor', '$25K, $50K, whatever it is. We qualify on it, not on headcount.'],
  ['Someone owns the calendar', 'A producer takes a 15 minute first call on Teams or Zoom when it lands.'],
  ['A renewal season is coming', 'And nobody at the agency owns prospecting for it.'],
]

const DOESNT_IF = [
  ['Solo agents', "You'd take 15 meetings a month on top of everything else. We'd book meetings you resent."],
  ['In-person-only shops', 'Owners say yes by email and take a first call online. If every first meeting has to be face to face, the volume breaks.'],
  ['Personal-lines-first agencies', 'The triggers are commercial records. Homes and autos are not in them.'],
  ['Captives', "The owners we find need a broker who can shop them. One carrier's appetite is too narrow."],
  ['Free samples or pay on close', 'We guarantee the count and credit every miss. We do not work for free first.'],
]

function HonestFilter() {
  return (
    <section id="fit" className={`${CONTAINER} py-16 lg:py-24 scroll-mt-20`}>
      <SectionLabel n="04">An honest filter</SectionLabel>
      <H2>
        Built for some agencies. <span className="text-accent">Honestly not for others.</span>
      </H2>
      <Lede>
        About 9 of the last 20 agencies we didn&apos;t sign were never our buyer in the first place. We would rather
        you find that out here than twenty minutes in.
      </Lede>
      <div className="mt-10 grid md:grid-cols-2 gap-5">
        <div data-testid="for-section" className={`rounded-card border ${LINE} bg-white p-6 lg:p-8`}>
          <Mono className="!text-accent">This works if</Mono>
          <ul className="mt-5 flex flex-col">
            {WORKS_IF.map(([head, body]) => (
              <li key={head} className={`flex gap-3 py-4 border-t ${LINE}`}>
                <span className="text-accent flex-shrink-0 mt-0.5" aria-hidden="true">
                  &rarr;
                </span>
                <span>
                  <span className={`font-semibold ${INK}`}>{head}</span>
                  <span className={`block mt-1 text-sm ${MUTED} leading-relaxed`}>{body}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div data-testid="not-for-section" className={`rounded-card border ${LINE} bg-[#F6F3EC] p-6 lg:p-8`}>
          <Mono>It doesn&apos;t if</Mono>
          <ul className="mt-5 flex flex-col">
            {DOESNT_IF.map(([head, body]) => (
              <li key={head} className={`flex gap-3 py-4 border-t ${LINE}`}>
                <span className={`${MUTED} flex-shrink-0 mt-0.5`} aria-hidden="true">
                  &#10005;
                </span>
                <span>
                  <span className={`font-semibold ${INK}`}>{head}</span>
                  <span className={`block mt-1 text-sm ${MUTED} leading-relaxed`}>{body}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <Note>If you&apos;re in the second column, Max will say so on the call, and you keep the 20 minutes of market count.</Note>
    </section>
  )
}

/* ------------------------------------------------------------------ price */

const INCLUDED = [
  'Your total addressable market mapped from public records, by line and state',
  'The CSV files of that market',
  'The campaigns: copy you approve, sent from domains we own',
  'The caller who checks every yes against your appetite',
  'A brief in the inbox before every meeting',
  'A renewal calendar that builds from the dates we capture and confirm',
  'Territory lock: we don’t book for another agency in your counties',
]

const GUARANTEE = [
  ['$315 back per miss', 'Credit for every qualified meeting short of the guarantee, against your next invoice. Unused credit is refunded in cash if you cancel.'],
  ['7-day full refund', 'Not happy for any reason in the first 7 days after you pay, you get it all back. Nothing is held back in those 7 days.'],
  ['No-shows are replaced', 'A booked meeting that does not happen does not count. We book another.'],
  ['Never resold', 'Your meetings go to you and nobody else, and your counties are locked while you are a client.'],
]

function Price() {
  return (
    <section id="price" className={`border-y ${LINE} bg-white scroll-mt-20`}>
      <div className={`${CONTAINER} py-16 lg:py-24`}>
        <SectionLabel n="05">What it costs</SectionLabel>
        <H2>One price, published. No share of your commission.</H2>
        <Lede>
          Paid monthly, upfront, through Stripe. We start as soon as it is paid. Cheaper only if you prepay three
          months.
        </Lede>

        <div className="mt-10 grid lg:grid-cols-[1.2fr_1fr] gap-5 items-start">
          <div className={`rounded-card border-2 border-accent bg-white p-7 lg:p-9`}>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <Mono className="!text-accent">15 qualified meetings a month</Mono>
                <p className={`mt-3 ${SERIF} text-[56px] lg:text-[64px] ${INK} leading-none`}>
                  $4,725<span className={`text-xl ${MUTED} ${SERIF}`}> / month</span>
                </p>
                <p className={`mt-3 text-sm ${MUTED}`}>
                  Month to month, auto-renewing, cancel anytime. 12 meetings in month one, counted over 30 days from
                  the first email, then 15 a month.
                </p>
              </div>
              <div className={`rounded-card ${PAPER} border ${LINE} px-4 py-3`}>
                <Mono>Prepay 3 months</Mono>
                <p className={`mt-1 ${SERIF} text-2xl ${INK}`}>$12,500</p>
                <p className={`text-xs ${MUTED}`}>Saves $1,675 against monthly</p>
              </div>
            </div>
            <ul className={`mt-7 border-t ${LINE} pt-5 grid sm:grid-cols-2 gap-x-6 gap-y-2.5`}>
              {INCLUDED.map((item) => (
                <li key={item} className={`flex gap-2.5 text-sm ${INK} leading-snug`}>
                  <span className="text-accent flex-shrink-0" aria-hidden="true">
                    &#10003;
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
              <a href="#book-call" className={CTA}>
                Book a 20 minute call with Max
              </a>
              <span className={`text-sm ${MUTED}`}>One-page agreement within 10 minutes of the call.</span>
            </div>
          </div>

          <div className={`rounded-card border ${LINE} bg-[#F6F3EC] p-7`}>
            <Mono>The guarantee, in writing</Mono>
            <H3 className="mt-3 !text-[22px]">Miss one and you get $315 back. Change your mind in 7 days and you get it all back.</H3>
            <ul className="mt-5 flex flex-col">
              {GUARANTEE.map(([head, body]) => (
                <li key={head} className={`py-4 border-t ${LINE}`}>
                  <p className={`font-semibold ${INK}`}>{head}</p>
                  <p className={`mt-1 text-sm ${MUTED} leading-relaxed`}>{body}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <Note>You never buy email volume. Emails sent are our cost, not yours.</Note>
      </div>
    </section>
  )
}

/* -------------------------------------------------------------------- faq */

const FAQ: [string, string][] = [
  [
    'Is this an offshore thing?',
    "It's a small team run by Max, the founder, and he's on your intro call himself. You approve every email before it goes. Every yes is called by a person and checked against your appetite before it books. The agreement is one page, payment is through Stripe, month to month, with a 7-day full refund. The registered entity is in the footer.",
  ],
  [
    'What counts as qualified?',
    'All four, in writing before we send: inside your territory and carrier appetite, above the premium or group-size floor you set, a need now or within 3 months, and the owner or whoever decides on the insurance is in the meeting. Miss one and it is a credit, not an appointment.',
  ],
  [
    'What if you miss?',
    '$315 credit for every appointment short of the guarantee, against your next invoice. Unused credit is refunded in cash if you cancel. No-shows are replaced. And if you are not happy for any reason in the first 7 days after paying, you get all of it back.',
  ],
  [
    'Do you sell my appointments to others?',
    "No. Your appointments are never resold, and we don't book for another agency in your counties while you're a client. That's included in the price.",
  ],
  [
    "Are you creating domains with my agency's name in them?",
    "No. We send from domains we own and warm up ourselves. Nothing with your agency's name in it, and never your primary domain. The emails offer a meeting with your agency, and you approve every word before anything goes out.",
  ],
  [
    'You have no insurance numbers yet. Why should I go first?',
    "Two agencies are live since late October 2026, a group benefits agency in New Jersey and a commercial P&C agency in Tennessee. First meetings are being held and it is too early for bound premium, so we are not quoting their numbers. What you are buying is the same machine that produced the results above, pointed at your market, with the count guaranteed and every miss credited. If it does not work, it costs us, not you.",
  ],
  [
    'How fast does it start?',
    'You get a one-page agreement within 10 minutes of the call. You pay the first month, fill in a 15-minute onboarding form, and sending starts within 72 hours. Month one counts 30 days from the first email.',
  ],
  [
    'Who takes the meetings?',
    "Your producers. We book onto their calendar and the brief lands before the call. They take the meeting and close it. We don't quote, sell or bind anything.",
  ],
  [
    'What do I have to do?',
    'Confirm your appetite and floors, approve the copy, take the meetings. That is the job.',
  ],
]

function Faq() {
  return (
    <section id="faq" className={`${CONTAINER} py-16 lg:py-24 scroll-mt-20`}>
      <div className="grid lg:grid-cols-[1fr_1.6fr] gap-10 lg:gap-16">
        <div>
          <SectionLabel n="06">Fair questions</SectionLabel>
          <H2>The ones buyers actually asked</H2>
          <p className={`mt-6 ${MUTED} leading-relaxed`}>
            Maxionlabs is run by Max Pidvalnyi. We build the outbound seat for independent commercial agencies: the
            market map, the emails, the caller who checks every yes, the brief before every meeting.
          </p>
          <p className={`mt-4 text-sm ${MUTED} leading-relaxed`}>
            Payments through Stripe. Registered in Ukraine, Vinytska 15, Kiev, 08130. Email{' '}
            <a href="mailto:maksym@maxionlabs.com" className="text-accent hover:underline">
              maksym@maxionlabs.com
            </a>
            .
          </p>
        </div>
        <div className={`rounded-card border ${LINE} bg-white divide-y divide-[#E4DED3]`}>
          {FAQ.map(([q, a], i) => (
            <details key={q} data-testid="faq-item" className="group px-6" open={i === 0}>
              <summary className={`list-none cursor-pointer py-5 flex items-start justify-between gap-4 [&::-webkit-details-marker]:hidden`}>
                <span className={`${SERIF} text-lg md:text-xl ${INK} leading-snug`}>{q}</span>
                <span
                  className="flex-shrink-0 mt-1 w-6 h-6 rounded-full border border-accent/50 text-accent text-base leading-none flex items-center justify-center transition-transform group-open:rotate-45"
                  aria-hidden="true"
                >
                  +
                </span>
              </summary>
              <p className={`pb-6 -mt-1 text-base ${MUTED} leading-relaxed max-w-2xl`}>{a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}

/* -------------------------------------------------------------- final cta */

const CALL_STEPS = [
  "I'll ask about your lines, your territory and your floors, so we both know if it's a fit.",
  "If it is, I'll show you the count of businesses in your territory showing a trigger right now.",
  "I'll walk you through the terms above and answer anything that's not clear.",
  'Bring a partner or producer if they need to see the targeting before you decide.',
]

function FinalCall() {
  return (
    <section id="book-call" className={`border-t ${LINE} bg-white scroll-mt-20`}>
      <div className={`${CONTAINER} py-20 lg:py-28`}>
        <div className="grid lg:grid-cols-[1fr_1.4fr] gap-10 lg:gap-16 items-start">
          <div>
            <Mono className="!text-accent">Next step</Mono>
            <H2 className="mt-4">Renewal season is coming. Nobody at your agency is prospecting for it.</H2>
            <p className={`mt-5 ${MUTED} leading-relaxed`}>
              Twenty minutes with Max. You leave with the count of owners in your territory showing a trigger right
              now, whether or not you buy.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <span className="flex-shrink-0 w-11 h-11 rounded-full bg-accent text-white text-base font-semibold flex items-center justify-center" aria-hidden="true">
                M
              </span>
              <span className={`text-base ${MUTED} leading-snug`}>
                <span className={`${INK} font-semibold`}>You&apos;ll book with me, Max</span>, the founder. Not a
                sales guy.
              </span>
            </div>
            <ol className="mt-6 flex flex-col gap-3">
              {CALL_STEPS.map((s, i) => (
                <li key={s} className="flex gap-3 items-start">
                  <span className="flex-shrink-0 w-7 h-7 rounded-full border border-accent/50 bg-accent/[0.08] text-accent text-xs font-mono flex items-center justify-center mt-0.5">
                    {i + 1}
                  </span>
                  <span className={`text-base ${MUTED} leading-relaxed`}>{s}</span>
                </li>
              ))}
            </ol>
            <p className={`mt-8 text-sm ${MUTED}`}>
              Prefer email?{' '}
              <a href="mailto:maksym@maxionlabs.com" className="text-accent hover:underline">
                maksym@maxionlabs.com
              </a>
            </p>
          </div>
          <div className={`rounded-card border ${LINE} bg-white p-2`}>
            <BookCall />
          </div>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------- page */

export function InsuranceHome() {
  return (
    <>
      <HomeHeader />
      <main className={`min-h-screen overflow-x-clip ${PAPER} ${INK}`}>
        <Hero />
        <WhatWeAreNot />
        <Results />
        <WhyItBooks />
        <HowItStarts />
        <OnCamera />
        <HonestFilter />
        <Price />
        <Faq />
        <FinalCall />
      </main>
      <HomeFooter />
    </>
  )
}

export default InsuranceHome
