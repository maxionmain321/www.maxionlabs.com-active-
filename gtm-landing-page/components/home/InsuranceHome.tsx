import { BookCall } from './BookCall'
import { HomeFooter } from './HomeFooter'

/**
 * Homepage v3: the short insurance page with the proof put back, and more of it.
 *
 * Two jobs. A cold visitor should see who this is for, get curious and book with the least friction.
 * A prospect already in the funnel should find the terms, the method and the proof they heard on the
 * call, laid out so Maxionlabs reads as the lowest-risk choice. The call does the selling.
 *
 * Server-rendered, one H1, every number traces to a repo file:
 *   00_foundation/offer-v3.md (CURRENT INSURANCE OFFER block): price, counts, credit, refund, prepay, included list
 *   knowledge_base/maxionlabs-acquisition/proof/funnel-tracker.md: only QUOTABLE rows, with their stated context;
 *     the four hero magnitude tiles are row-by-row sums of those rows (arithmetic beside each tile below)
 *   knowledge_base/maxionlabs-acquisition/proof/testimonials/manifest.md: who may be named, pictured, quoted
 *   knowledge_base/maxionlabs-acquisition/proof/case-studies/slipstream_2026-10-30.md: Mars Xiang, verbatim
 *   knowledge_base/maxionlabs-acquisition/pre-call-flow/insurance-sequence/03-proof.html: the on-camera quotes,
 *     Ivan's written line, and the captions of the two masked insurance receipts
 *   knowledge_base/clients/leads/jared-gabbel-strongtower-offer/public/index.html: owner replies, the brief
 *   industry-voice-2026-11-14.md 6e/6f: publish the price, peer proof over numbers, never "leads" in our voice
 *
 * Sections: hero (terms and risk reversal beside the CTA, owner replies, two faces, four magnitude tiles),
 * what we're not, results (insurance receipts, on camera, written, screenshots, replies), method, fit, price, book.
 * The booking section copies the shape of the live www.maxionlabs.com FinalCTA (components/sections/FinalCTA.tsx
 * on origin/main): centred heading, Max byline, five numbered steps, the cal.com embed, the email line.
 */

const CONTAINER = 'max-w-container mx-auto px-6 lg:px-12'
const SERIF = "font-['Iowan_Old_Style','Palatino_Linotype',Palatino,'Book_Antiqua',Georgia,serif]"
/* Form-paper palette: cool grey paper, slate ink, the site's indigo accent, and an X-date amber for renewal marks. */
const INK = 'text-[#131A26]'
const MUTED = 'text-[#5B6472]'
const LINE = 'border-[#D8DEE6]'
const PAPER = 'bg-[#F5F7FA]'
const XDATE = 'text-[#B7410E]'

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

/** Policy-style item label, the way a dec page numbers its items. */
function SectionLabel({ n, children }: { n: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <span className="inline-flex items-center rounded-sm border border-accent/40 px-2 py-0.5 font-mono text-[11px] font-semibold tracking-[0.18em] text-accent">
        ITEM {n}
      </span>
      <Mono className="!text-accent">{children}</Mono>
    </div>
  )
}

/** A verbatim buyer line, anonymized to role, line and state. Never a client endorsement. */
function Quote({ text, who, className = '' }: { text: string; who: string; className?: string }) {
  return (
    <figure data-testid="buyer-quote" className={`border-l-2 border-accent/60 pl-4 ${className}`}>
      <blockquote className={`${SERIF} text-lg ${INK} leading-snug`}>&ldquo;{text}&rdquo;</blockquote>
      <figcaption className={`mt-2 text-xs ${MUTED}`}>{who}</figcaption>
    </figure>
  )
}

/** X-date timeline: the renewal month is the X, the shaded 90 days before it is the window we book inside. */
const MONTHS = ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D']
function RenewalStrip() {
  return (
    <div className={`rounded-card border ${LINE} bg-white px-4 py-3`}>
      <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1">
        <Mono>X-date timeline</Mono>
        <Mono className={`!${XDATE}`}>A need now or within 3 months</Mono>
      </div>
      <ol className="mt-3 grid grid-cols-12 gap-1" aria-hidden="true">
        {MONTHS.map((m, i) => {
          const renewal = i === 6
          const inWindow = i >= 3 && i <= 5
          return (
            <li
              key={i}
              className={`h-7 rounded-sm flex items-center justify-center font-mono text-[10px] ${
                renewal ? 'bg-[#B7410E] text-white font-semibold' : inWindow ? 'bg-accent/15 text-accent' : `bg-[#E6EBF1] ${MUTED}`
              }`}
            >
              {renewal ? 'X' : m}
            </li>
          )
        })}
      </ol>
      <p className={`mt-2 text-xs ${MUTED} leading-relaxed`}>
        The X is the renewal date. We book inside the shaded 90 days before it, and the date goes into your renewal
        calendar.
      </p>
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

function Redacted({ w = 'w-24' }: { w?: string }) {
  return (
    <span aria-label="redacted" className={`inline-block ${w} h-3.5 rounded-sm bg-[#131A26]/80 align-middle mx-0.5`} />
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

function PlayIcon() {
  return (
    <span className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
      <span className="w-9 h-9 rounded-full bg-white/95 shadow flex items-center justify-center">
        <span className="ml-0.5 w-0 h-0 border-y-[6px] border-y-transparent border-l-[10px] border-l-accent" />
      </span>
    </span>
  )
}

/** Initial-letter avatar for anyone we may quote but not picture (Conor by his own request, anonymized roles). */
function InitialAvatar({ letter, size = 'w-16 h-16 text-xl' }: { letter: string; size?: string }) {
  return (
    <span
      data-testid="initial-avatar"
      className={`${size} rounded-full bg-[#E6EBF1] ${SERIF} ${INK} flex items-center justify-center flex-shrink-0`}
      aria-hidden="true"
    >
      {letter}
    </span>
  )
}

/** A masked screenshot in a thin frame, the way a dec page carries an attached exhibit. */
function Shot({ src, alt, className = '' }: { src: string; alt: string; className?: string }) {
  return (
    <div className={`rounded-card border ${LINE} bg-white overflow-hidden shadow-sm ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} className="w-full h-auto" loading="lazy" />
    </div>
  )
}

/* ---------------------------------------------------------------- header */

const NAV = [
  ['#results', 'Results'],
  ['#method', 'Unique Methodology'],
  ['#fit', "Who it's for"],
  ['#price', 'Pricing'],
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
            <a key={href} href={href} data-testid="nav-link" className="hover:text-[#131A26]">
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

/**
 * Buyer voice, industry-voice-2026-11-14.md: the leak is an owned X-date list with nobody to call it
 * (DeMarco, Unruh, Stiltner, section 2); "if you just get us in the room, that's where we're good" (Stiltner, 3);
 * bought leads are shopped to five agencies (DeMarco, 2); owners qualify in premium, $25K+ (Pearsall, 5).
 */
export const HERO_H1 = 'Get in the room with accounts $25,000+ in premium or 20+ enrolled lives.'
export const HERO_SUB =
  'Without telemarketers, resold leads, small accounts that are not worth your service time, or betting on a producer who may never validate.'

/**
 * Illustrative premium math, in the owner's own dashboard (meetings x close x account size, industry-voice 6a).
 * 15 = offer-v3 monthly count. 2 closes and $30K are an example, labelled as one, not a result or a promise.
 */
const PREMIUM_MATH: [string, string, string][] = [
  ['First meetings a month', '15', 'Owners in your appetite, renewal coming up'],
  ['Your producers close', '2', 'Under the 20% a newer producer closes; renewal dates set the pace'],
  ['Average account', '$30K', 'Premium, above a $25K floor'],
  ['New premium a month', '$60K', 'About $7,200 a month in commission at 12%'],
]

/** Real replies, anonymized, from the November 2026 owner-reply table (Strong Tower template, option 1). */
const HERO_REPLIES = [
  ['Painting contractor, Knoxville, TN', 'Yes. I am concerned I am overpaying on workers comp.'],
  ['Home care agency, Galax, VA', "I'd love to schedule a call. Next week."],
  ['Behavioral health practice, New York, NY', 'I can do 11am Tuesday, a week from today.'],
  ['Accounting firm, Hackensack, NJ', "Sure, let's discuss small business plan."],
]

/**
 * Named, cleared videos, ordered by outcome strength: closed-won revenue, paying customers, businesses signed,
 * seats sold. Ids and titles from components/sections/VideoTestimonials.tsx; clearance and the quoted metric in
 * funnel-tracker.md QUOTABLE rows; the on-camera lines as the pre-call proof email (03-proof.html) carries them,
 * Rebecca's from testimonials/manifest.md. Conor appears with no surname and no photo, by his own request.
 */
const ON_CAMERA = [
  {
    name: 'Anisa Ahmed',
    title: 'Growth & Revenue Strategy, executive career services',
    metric: '$73,300 in client revenue, 24 paid closes',
    said: "It's a guaranteed return with you always.",
    context: 'Outbound to people already in their ecosystem, so warmer than cold. 8.6x what they paid us.',
    youtubeId: '-4Dox4xc49o',
    avatar: '/images/proof/insurance-proof-avatar-anisa.jpg',
  },
  {
    name: 'Kidous Mahteme',
    title: 'Co-founder, cold email infrastructure software',
    metric: '70+ paying customers directly attributed',
    said: "Max just did things better than I did. He's very timely and very honest.",
    context: '858 engaged replies over the engagement, Oct 2025 to Aug 2026.',
    youtubeId: 'qslrNyCbT-k',
    avatar: '/images/proof/insurance-proof-avatar-kidous.jpg',
  },
  {
    name: 'Conor',
    title: 'Founder, online reputation services',
    metric: '50+ local businesses signed',
    said: 'Closed 3 clients in a couple of days plus went back for more on one we closed last week. Great job max.',
    context: 'Surname and photo withheld at his request. His Slack message is below.',
    youtubeId: 'yMmsy7V3HoU',
    avatar: null,
  },
  {
    name: 'Rebecca Ditchey',
    title: 'Senior Program Manager, executive education',
    metric: '4 seats sold from 13 sales calls held',
    said: 'I saw a return on the investment that we made in you pretty quickly.',
    context: 'A high-ticket certificate program, sold to senior executives by cold email.',
    youtubeId: 'laYwFMVGZhw',
    avatar: 'https://img.youtube.com/vi/laYwFMVGZhw/hqdefault.jpg',
  },
]

function Hero() {
  return (
    <section data-testid="hero-section" className={`${CONTAINER} pt-14 pb-14 lg:pt-24 lg:pb-20`}>
      <div className="grid lg:grid-cols-[1.2fr_1fr] gap-12 lg:gap-16 items-start">
        <div className="min-w-0">
          <Mono className="!text-accent">The outbound seat for commercial P&amp;C and benefits agencies</Mono>
          <h1
            className={`${SERIF} mt-5 text-[40px] md:text-[54px] lg:text-[62px] font-medium ${INK} leading-[1.02] tracking-[-0.015em] max-w-3xl`}
          >
            Get in the room with accounts <Underline>$25,000+</Underline> in premium or 20+ enrolled lives.
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
          <p className={`mt-4 text-sm ${MUTED} max-w-xl leading-relaxed`}>
            Month to month. 7-day refund. Your territory, nobody else&apos;s.
          </p>
        </div>

        <div className="flex flex-col gap-4 min-w-0 lg:pt-2">
          <div className={`rounded-card border ${LINE} bg-white shadow-[0_1px_0_rgba(21,19,15,0.04)] overflow-hidden`}>
            <div className={`px-5 py-3 border-b ${LINE} flex items-center justify-between`}>
              <Mono>Owners replying to our insurance clients</Mono>
              <Mono>Nov 2026</Mono>
            </div>
            <ul className="px-5 py-4 flex flex-col gap-3.5">
              {HERO_REPLIES.map(([who, said]) => (
                <li key={who} className="flex gap-3 items-start">
                  <span
                    className="mt-1 flex-shrink-0 w-7 h-7 rounded-full bg-[#E6EBF1] text-[10px] font-mono text-[#5B6472] flex items-center justify-center"
                    aria-hidden="true"
                  >
                    {who.slice(0, 1)}
                  </span>
                  <span className="flex flex-col gap-0.5">
                    <span className={`text-xs ${MUTED}`}>{who}</span>
                    <span className={`text-[15px] ${INK} leading-snug`}>&ldquo;{said}&rdquo;</span>
                  </span>
                </li>
              ))}
            </ul>
            <p className={`px-5 pb-4 text-xs ${MUTED} leading-relaxed`}>
              Real replies for a benefits agency in New Jersey and a P&amp;C agency in Tennessee, names removed.
            </p>
          </div>

          {/* The owner's dashboard: meetings x close x account size. Illustrative, and labelled so. */}
          <div data-testid="premium-math" className={`rounded-card border ${LINE} bg-white overflow-hidden`}>
            <div className={`px-5 py-3 border-b ${LINE} flex items-center justify-between`}>
              <Mono>The premium math</Mono>
              <Mono>Example</Mono>
            </div>
            <dl className="px-5 py-2">
              {PREMIUM_MATH.map(([label, value, note]) => (
                <div key={label} className={`py-2.5 flex items-baseline justify-between gap-4 border-b border-dotted ${LINE}`}>
                  <dt className="min-w-0">
                    <span className={`text-sm ${INK}`}>{label}</span>
                    {note ? <span className={`block text-xs ${MUTED}`}>{note}</span> : null}
                  </dt>
                  <dd className={`${SERIF} text-2xl ${INK} whitespace-nowrap`}>{value}</dd>
                </div>
              ))}
              <div className="py-3 flex items-baseline justify-between gap-4">
                <dt className={`text-sm font-semibold ${INK}`}>New premium by month six</dt>
                <dd className={`${SERIF} text-4xl ${XDATE} whitespace-nowrap`}>$360K</dd>
              </div>
            </dl>
            <p className={`px-5 pb-4 text-xs ${MUTED} leading-relaxed`}>
              An example, not a promise. Your floor and your close rate change it; Max runs your numbers on the call.
            </p>
          </div>
        </div>
      </div>

    </section>
  )
}

/* ---------------------------------------------------------- what we're not */

const NOT_US = [
  ['Not a list of names to dial', 'An owner who said yes, on your calendar.'],
  ['Not a $50 appointment vendor', 'Every yes gets our call and an appetite check first.'],
  ["Never domains with your agency's name", 'We send from domains we own, with copy you approve.'],
]

function WhatWeAreNot() {
  return (
    <section data-testid="what-we-are-not" className={`border-y ${LINE} bg-white`}>
      <div className={`${CONTAINER} py-8`}>
        <div className="flex flex-col lg:flex-row lg:items-start gap-5 lg:gap-10">
          <Mono className="lg:pt-1 lg:w-28 flex-shrink-0">What we&apos;re not</Mono>
          <ul className="grid sm:grid-cols-3 gap-x-6 gap-y-4 flex-1">
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
 * Insurance receipts, both masked, both carried by the pre-call proof email (03-proof.html) with these captions.
 * A benefits agency in New Jersey and a P&C agency in Tennessee, names private; owner replies stay anonymized.
 */
const INSURANCE_RECEIPTS = [
  {
    src: '/images/proof/insurance-owner-yes.png',
    alt: 'Masked email, Nov 3, 2026. A business owner replies to our email for the benefits agency: Yes I need a better plan. Below it, our quoted email about pricing their exact plan across every insurer.',
    head: '“Yes I need a better plan”',
    who: 'Business owner replying to our email for the benefits agency, Nov 3, 2026',
  },
  {
    src: '/images/proof/insurance-held-call-recap.png',
    alt: 'Masked email to Max, Nov 5, 2026, from the P&C agency’s Vice President, CIC: I spoke with him this morning. He said that he would be interested moving forward with a Workers Comp quote. I will follow up with him next week.',
    head: '“He said that he would be interested moving forward with a Workers Comp quote.”',
    who: 'The P&C agency’s VP, after a meeting we booked, Nov 5, 2026',
  },
]

/**
 * Written, named, cleared. Mars: case-studies/slipstream_2026-10-30.md § In their words, verbatim, named by Max
 * 2026-10-30. Ivan: written testimonial cleared by Max 2026-10-06 (funnel-tracker.md, EU tender row), line as the
 * pre-call proof email carries it; the company stays a business type because that row is anonymized.
 */
const WRITTEN = [
  {
    name: 'Mars Xiang',
    title: 'Co-founder, Slipstream Engineering, AI software for SMBs',
    avatar: '/images/proof/insurance-proof-avatar-mars.jpg',
    said: "Max is really easy to work with, he proactively thinks about your needs and campaign, he's responsive, he's competent.",
    metrics: [
      ['13', 'demos booked in 24 days, 7 guaranteed'],
      ['4', 'sales-qualified opportunities from 5 held'],
    ],
    note: 'Written answer, Oct 30, 2026. Cold email to hotels and agencies to find which market buys. 54 interested replies from 19,467 emails.',
  },
  {
    name: 'Ivan Ivankovic',
    title: 'CEO, EU tender procurement software',
    avatar: '/images/proof/insurance-proof-avatar-ivan.jpg',
    said: 'Max knows his stuff, from technical setup, to right strategies to apply and as well how to craft content. I would and will work with him on future projects.',
    metrics: [
      ['19', 'qualified meetings held in one month'],
      ['74+', 'interested replies'],
    ],
    note: 'Written answer, Oct 5, 2026. Cold email to companies bidding on public tenders: 65,622 emails to 33,569 people. A meeting only counted once it was held.',
  },
]

/**
 * Screenshots from clients’ own Slack, WhatsApp and portals. Every one is a QUOTABLE row in funnel-tracker.md
 * (“Construction-software customer: list quality message”, “reply and held-meeting receipt”, “lead-quality
 * reaction”, “Executive career services: first member-funnel close message”, “sold-status dashboard”, “Online
 * reputation services: original close message”), shown as the exact masked asset that row names, with its context.
 */
const RECEIPTS = [
  {
    src: '/images/proof/workyard-sqo-held.jpg',
    alt: 'Masked Slack thread, July 2026. A prospect replies: You have got my attention. Are you available for a demo? I can be open as early as this afternoon. The client’s sales team answers the next day: SQO. Meeting was held today.',
    head: '35 qualified demos held, 6 annual contracts signed',
    body: 'Software sold to contractors, the owners you write GL and workers comp for. $7K to $20K a year each. A demo only counted once their sales team marked it qualified. Name private by contract.',
    who: 'Their sales team, in our shared Slack, July 2026',
    span: 'lg:row-span-2',
  },
  {
    src: '/images/proof/workyard-cac-math.jpg',
    alt: 'Masked Slack, August 2026. The construction-software founder does his own numbers on the replies, says I think we can scale, and ends: Our list curation is strong, so all high value customers.',
    head: '“Our list curation is strong, so all high value customers”',
    body: 'The same client, doing his own math on the replies and deciding to scale.',
    who: 'Founder, construction software, August 2026',
  },
  {
    src: '/images/proof/bluesteps-first-deal.jpg',
    alt: 'WhatsApp, September 2026. The client: Our guy closed his first deal. Max: 9 days since we launched and 9 meetings held. The client: INCREDIBLE, 3k, your highest paying tier.',
    head: 'First member-campaign close, $3,000',
    body: 'Executive career services. A campaign to people already in their membership; the client reports the deal.',
    who: 'WhatsApp, September 2026',
  },
  {
    src: '/images/proof/reviewfix-3-clients.jpg',
    alt: 'Masked Slack, August 2026. The client: Mate it has been a huge start to the week. Closed 3 clients in a couple of days plus went back for more on one we closed last week. Circa 20 individual reviews to be removed so far this week. Great job max.',
    head: '“Closed 3 clients in a couple of days”',
    body: 'Online reputation services. Three businesses signed in one week, about twenty reviews queued for removal.',
    who: 'Conor, founder, Slack, Aug 2, 2026',
  },
  {
    src: '/images/proof/bluesteps-sold-rows.jpg',
    alt: 'Masked rows from the client’s customer portal, mid 2026, each marked Active and Sold, buyer details blurred.',
    head: 'Rows marked Sold in the client’s own portal',
    body: 'Executive career services. Historical rows from the client’s portal, buyers blurred.',
    who: 'Client portal, 2026',
  },
]

/** The two agency rows, anonymized in funnel-tracker.md, replies only, never meetings or customers. */
const REPLY_ROWS = [
  ['51', 'engaged replies in 45 days', 'Marketing agency serving auto-repair shops'],
  ['138', 'engaged replies in one month', 'Outbound agency serving real estate brokers'],
]

function OnCameraCard({ t, compact = false }: { t: (typeof ON_CAMERA)[number]; compact?: boolean }) {
  return (
    <li data-testid="on-camera" className="h-full">
      <div data-testid="proof-card" className={`rounded-card border ${LINE} bg-white p-5 h-full flex flex-col gap-4`}>
        <div className="flex items-center gap-4">
          {t.avatar ? (
            <span className="relative flex-shrink-0 w-16 h-16 rounded-full overflow-hidden bg-[#E6EBF1]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={t.avatar} alt="" className="w-full h-full object-cover" loading="lazy" />
            </span>
          ) : (
            <InitialAvatar letter={t.name.slice(0, 1)} />
          )}
          <span className="flex flex-col min-w-0">
            <span className={`text-sm font-semibold ${INK}`}>{t.name}</span>
            <span className={`text-[12px] ${MUTED} leading-snug`}>{t.title}</span>
          </span>
        </div>
        <p className={`${SERIF} text-xl ${INK} leading-tight`}>{t.metric}</p>
        <blockquote className={`text-sm ${INK} leading-relaxed border-l-2 border-accent/60 pl-3`}>
          &ldquo;{t.said}&rdquo;
        </blockquote>
        {!compact && <p className={`text-xs ${MUTED} leading-relaxed`}>{t.context}</p>}
        <a
          href={`https://www.youtube.com/watch?v=${t.youtubeId}`}
          target="_blank"
          rel="noopener noreferrer"
          className={`mt-auto inline-flex items-center gap-2 text-xs font-semibold text-accent hover:underline underline-offset-4`}
        >
          <span className="relative w-6 h-6 rounded-full bg-accent/10 inline-block">
            <PlayIcon />
          </span>
          Watch the video testimonial
        </a>
      </div>
    </li>
  )
}

function Results() {
  return (
    <section id="results" className={`${CONTAINER} py-16 lg:py-24 scroll-mt-20`}>
      <div className="grid lg:grid-cols-[1fr_1.1fr] gap-10 lg:gap-16 items-start">
        <div>
          <SectionLabel n="01">Production report</SectionLabel>
          <H2>Different markets. Same machine. Deals signed, meetings held, owners saying yes.</H2>
          <Lede>
            Names and faces where the client cleared them, role and industry where they did not. Every number is
            counted from the client&apos;s own records, on a date we can name. Ask Max where any of them comes from.
          </Lede>
        </div>
        <Quote
          className="lg:mt-12"
          text="the fact that they're warm and open to having a conversation, I'm telling you, if you just get us in the room, you know, that's where we're good."
          who="President, commercial P&C agency, Tennessee, on what he needs from us"
        />
      </div>

      {/* Insurance, live now: two masked receipts from the two agencies running since late October 2026. */}
      <div className="mt-12">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <Mono className="!text-accent">Insurance · live now</Mono>
            <H3 className="mt-2">Two agencies since late October 2026. First meetings being held.</H3>
          </div>
          <p className={`text-sm ${MUTED} max-w-md`}>
            A group benefits agency in New Jersey and a commercial P&amp;C agency in Tennessee, names private. We
            publish their numbers when they are real.
          </p>
        </div>
        <ul className="mt-6 grid md:grid-cols-2 gap-4">
          {INSURANCE_RECEIPTS.map((r) => (
            <li key={r.src} data-testid="proof-card" className={`rounded-card border ${LINE} bg-white p-4 flex flex-col gap-3`}>
              <Shot src={r.src} alt={r.alt} />
              <p className={`${SERIF} text-lg ${INK} leading-snug`}>{r.head}</p>
              <p className={`text-xs ${MUTED}`}>{r.who}</p>
            </li>
          ))}
        </ul>
      </div>

      {/* On camera: four cleared clients, strongest outcome first. */}
      <div className="mt-14">
        <Mono className="!text-accent">On camera</Mono>
        <H3 className="mt-2">Clients in their own voice, on YouTube.</H3>
        <ul className="mt-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {ON_CAMERA.map((t) => (
            <OnCameraCard key={t.youtubeId} t={t} />
          ))}
        </ul>
      </div>

      {/* Written, named. */}
      <div className="mt-14">
        <Mono className="!text-accent">In writing</Mono>
        <H3 className="mt-2">Two more, with their names on it.</H3>
        <ul className="mt-6 grid md:grid-cols-2 gap-4">
          {WRITTEN.map((w) => (
            <li key={w.name} data-testid="proof-card" className={`rounded-card border ${LINE} bg-white p-5 lg:p-6 flex flex-col gap-4`}>
              <div className="flex items-center gap-4">
                <span className="flex-shrink-0 w-16 h-16 rounded-full overflow-hidden bg-[#E6EBF1]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={w.avatar} alt="" className="w-full h-full object-cover" loading="lazy" />
                </span>
                <span className="flex flex-col min-w-0">
                  <span className={`text-sm font-semibold ${INK}`}>{w.name}</span>
                  <span className={`text-[12px] ${MUTED} leading-snug`}>{w.title}</span>
                </span>
              </div>
              <blockquote className={`${SERIF} text-lg ${INK} leading-snug border-l-2 border-accent/60 pl-4`}>
                &ldquo;{w.said}&rdquo;
              </blockquote>
              <div className={`grid grid-cols-2 gap-4 border-t ${LINE} pt-4`}>
                {w.metrics.map(([big, what]) => (
                  <div key={what}>
                    <p className={`${SERIF} text-3xl ${INK} leading-none`}>{big}</p>
                    <p className={`mt-1.5 text-xs ${MUTED} leading-snug`}>{what}</p>
                  </div>
                ))}
              </div>
              <p className={`text-xs ${MUTED} leading-relaxed`}>{w.note}</p>
            </li>
          ))}
        </ul>
      </div>

      {/* Receipts: the clients' own Slack, WhatsApp and portals, masked. */}
      <div className="mt-14">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <Mono className="!text-accent">Receipts</Mono>
            <H3 className="mt-2">From the clients&apos; own Slack, WhatsApp and portals.</H3>
          </div>
          <p className={`text-sm ${MUTED} max-w-md`}>
            Buyer details masked, client names private where the contract says so. Each one is the original message.
          </p>
        </div>
        <ul className="mt-6 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {RECEIPTS.map((r) => (
            <li
              key={r.src}
              data-testid="proof-card"
              className={`rounded-card border ${LINE} bg-white p-4 flex flex-col gap-3 ${r.span ?? ''}`}
            >
              <Shot src={r.src} alt={r.alt} />
              <p className={`${SERIF} text-lg ${INK} leading-snug`}>{r.head}</p>
              <p className={`text-xs ${MUTED} leading-relaxed`}>{r.body}</p>
              <p className={`mt-auto text-[11px] ${MUTED}`}>{r.who}</p>
            </li>
          ))}
        </ul>
      </div>

      {/* Replies only: the two anonymized agency rows, never dressed up as meetings or customers. */}
      <ul className={`mt-8 grid sm:grid-cols-2 gap-4`}>
        {REPLY_ROWS.map(([big, what, who]) => (
          <li key={who} data-testid="proof-card" className={`rounded-card border ${LINE} bg-[#F1F4F8] px-5 py-4 flex items-baseline gap-4`}>
            <span className={`${SERIF} text-3xl ${INK} leading-none flex-shrink-0`}>{big}</span>
            <span className="min-w-0">
              <span className={`block text-sm ${INK}`}>{what}</span>
              <span className={`block text-xs ${MUTED}`}>{who}</span>
            </span>
          </li>
        ))}
      </ul>
    </section>
  )
}

/* ----------------------------------------------------------------- method */

const STEPS = [
  [
    'A public record changes',
    'A new operating authority, a contractor licence, a Form 5500 plan year, an OSHA citation. We email the owner about it, from domains we own, with copy you approve.',
  ],
  [
    'Every yes gets our call',
    'We confirm they want the meeting, take the renewal date, and check line, premium, county and who signs against what you write.',
  ],
  [
    'It books, with a brief',
    "Only a match reaches your producer's calendar, brief in the inbox first. No-shows are replaced.",
  ],
]

/** The four-part qualified test, offer-v3.md. Agreed in writing before anything sends. */
const QUALIFIED = [
  ['Premium', 'Above the floor you set'],
  ['Renewal', 'A need now or within 3 months'],
  ['Appetite', 'Your territory and your carriers, by line'],
  ['Decider', 'The owner, or whoever decides, is in the meeting'],
]

/** The real November 2026 brief from option 1, names and contact details blacked out. */
const BRIEF_FIELDS: [string, React.ReactNode][] = [
  [
    'When',
    <>
      Tue 10 Nov, 11am ET, 15 min on Teams with <Redacted w="w-24" />
    </>,
  ],
  [
    'Who',
    <>
      Founder and executive director. Cell and office line: <Redacted w="w-28" />
    </>,
  ],
  ['Business', 'Mental health group practice, New York, about 30 licensed clinicians'],
  [
    'Why they said yes',
    <>
      First question was &ldquo;who pays you?&rdquo; After we offered 15 minutes to see if there is anything to gain on
      their current plan: &ldquo;I can do 11am Tuesday, a week from today.&rdquo;
    </>,
  ],
  ['Watch for', 'Cover early how the agency gets paid'],
]

function Method() {
  return (
    <section id="method" className={`border-y ${LINE} bg-white scroll-mt-20`}>
      <div className={`${CONTAINER} py-16 lg:py-24`}>
        <SectionLabel n="02">The method</SectionLabel>
        <H2>
          The owner answers an email that names <br className="hidden md:block" />
          what just changed in his business.
        </H2>
        <ol className="mt-10 grid md:grid-cols-3 gap-6 lg:gap-8">
          {STEPS.map(([head, body], i) => (
            <li key={head} data-testid="method-step" className={`border-t-2 border-accent/60 pt-5`}>
              <span className="font-mono text-[11px] text-accent tracking-[0.18em]">0{i + 1}</span>
              <H3 className="mt-2 !text-2xl">{head}</H3>
              <p className={`mt-3 text-sm ${MUTED} leading-relaxed`}>{body}</p>
            </li>
          ))}
        </ol>

        <div className="mt-16 grid lg:grid-cols-[1fr_1.2fr] gap-10 lg:gap-12 items-start">
          <div>
            <Mono className="!text-accent">Qualified means all four</Mono>
            <H3 className="mt-3">Agreed in writing before we send. Miss one and it is a $315 credit.</H3>
            <ul className="mt-5 flex flex-col">
              {QUALIFIED.map(([head, body]) => (
                <li key={head} data-testid="qualified-item" className={`flex gap-4 py-3 border-t ${LINE} items-baseline`}>
                  <span className={`font-semibold ${INK} w-24 flex-shrink-0`}>{head}</span>
                  <span className={`text-sm ${MUTED}`}>{body}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6">
              <RenewalStrip />
            </div>
          </div>

          <div>
            <Mono className="!text-accent">What lands before every meeting</Mono>
            <p className={`mt-3 text-sm ${MUTED} leading-relaxed`}>
              A real brief, names blacked out, sent to a benefits agency in November 2026.
            </p>
            {/* Laid out like a declarations page: numbered items, a form header, nothing inferred. */}
            <div data-testid="meeting-brief" className={`mt-4 rounded-card border ${LINE} bg-white text-sm overflow-hidden`}>
              <div className={`bg-[#F1F4F8] px-5 py-3 border-b ${LINE} flex flex-wrap items-center justify-between gap-2`}>
                <Mono>Meeting brief · declarations</Mono>
                <Mono>
                  Brief no. <Redacted w="w-10" />
                </Mono>
              </div>
              <div className={`px-5 py-3 ${MUTED} border-b border-dashed ${LINE} leading-relaxed`}>
                <b className={INK}>From:</b> Maxionlabs &nbsp; <b className={INK}>To:</b> <Redacted w="w-28" />
              </div>
              <dl className="px-5 py-4 grid grid-cols-[112px_1fr] gap-x-4 gap-y-3">
                {BRIEF_FIELDS.map(([label, value], i) => (
                  <div key={label} className="contents">
                    <dt className={`${MUTED} flex gap-2 items-baseline`}>
                      <span className="font-mono text-[10px] text-accent">{String(i + 1).padStart(2, '0')}</span>
                      <span>{label}</span>
                    </dt>
                    <dd className={`${INK} border-b border-dotted ${LINE} pb-2`}>{value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ---------------------------------------------------------- honest filter */

const WORKS_IF = [
  ['Independent commercial P&C or benefits', 'Roughly $2M to $15M in revenue.'],
  ['At least 2 producers besides the owner', 'Someone other than you takes the meetings.'],
  ['You can name your premium floor', '$25K, $50K, whatever it is.'],
  ['A producer takes a 15 minute first call online', 'Teams or Zoom.'],
]

const DOESNT_IF = [
  ['Solo agents', 'You would take every meeting yourself.'],
  ['In-person-only shops', 'First calls happen online.'],
  ['Personal-lines-first agencies', 'The records we watch are commercial.'],
  ['Captives', 'These owners need a broker who can shop them.'],
]

function HonestFilter() {
  return (
    <section id="fit" className={`${CONTAINER} py-16 lg:py-24 scroll-mt-20`}>
      <div className="grid lg:grid-cols-[1fr_1.1fr] gap-10 lg:gap-16 items-start">
        <div>
          <SectionLabel n="03">Who it&apos;s for</SectionLabel>
          <H2>
            Some agencies fit our appetite. <span className="text-accent">Honestly, some don&apos;t.</span>
          </H2>
        </div>
        <Quote
          className="lg:mt-12"
          text="we struggle with that. If we were good at that, we wouldn't need to pay you to do it."
          who="President, commercial P&C agency, Tennessee, on prospecting"
        />
      </div>
      <div className="mt-10 grid md:grid-cols-2 gap-5">
        <div data-testid="for-section" className={`rounded-card border ${LINE} bg-white p-6 lg:p-8`}>
          <Mono className="!text-accent">In appetite</Mono>
          <ul className="mt-4 flex flex-col">
            {WORKS_IF.map(([head, body]) => (
              <li key={head} className={`flex gap-3 py-3.5 border-t ${LINE}`}>
                <span className="text-accent flex-shrink-0 mt-0.5" aria-hidden="true">
                  &rarr;
                </span>
                <span>
                  <span className={`font-semibold ${INK}`}>{head}</span>
                  <span className={`block mt-0.5 text-sm ${MUTED}`}>{body}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div data-testid="not-for-section" className={`rounded-card border ${LINE} bg-[#F1F4F8] p-6 lg:p-8`}>
          <Mono>Out of appetite</Mono>
          <ul className="mt-4 flex flex-col">
            {DOESNT_IF.map(([head, body]) => (
              <li key={head} className={`flex gap-3 py-3.5 border-t ${LINE}`}>
                <span className={`${MUTED} flex-shrink-0 mt-0.5`} aria-hidden="true">
                  &#10005;
                </span>
                <span>
                  <span className={`font-semibold ${INK}`}>{head}</span>
                  <span className={`block mt-0.5 text-sm ${MUTED}`}>{body}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ price */

const INCLUDED = [
  'Your market mapped from public records, by line and state, with the CSV files',
  'The campaigns: copy you approve, sent from domains we own',
  'The caller who checks every yes against your appetite',
  'A brief in the inbox before every meeting',
  'A renewal calendar built from the dates we capture and confirm',
]

const GUARANTEE = [
  ['$315 back per miss', 'For every qualified meeting short of the count, against your next invoice. Cash if you cancel.'],
  ['7-day full refund', 'Any reason, in the first 7 days after you pay, all of it back.'],
  ['No-shows are replaced', 'A meeting that does not happen does not count. We book another.'],
  ['Territory lock, never resold', 'Your counties are yours while you are a client.'],
]

function Price() {
  return (
    <section id="price" className={`border-y ${LINE} bg-white scroll-mt-20`}>
      <div className={`${CONTAINER} py-16 lg:py-24`}>
        <SectionLabel n="04">What it costs</SectionLabel>
        <H2>One price, published. No share of your commission.</H2>

        <div className="mt-10 grid lg:grid-cols-[1.2fr_1fr] gap-5 items-start">
          <div className={`rounded-card border-2 border-accent bg-white p-7 lg:p-9`}>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <Mono className="!text-accent">15 qualified meetings a month</Mono>
                <p className={`mt-3 ${SERIF} text-[56px] lg:text-[64px] ${INK} leading-none`}>
                  $4,725<span className={`text-xl ${MUTED} ${SERIF}`}> / month</span>
                </p>
                <p className={`mt-3 text-sm ${MUTED}`}>
                  Month to month, cancel anytime. 12 meetings in month one, then 15 a month. Paid through Stripe.
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

          <div className={`rounded-card border ${LINE} bg-[#F1F4F8] p-7`}>
            <Mono>The guarantee, in writing</Mono>
            <ul className="mt-3 flex flex-col">
              {GUARANTEE.map(([head, body]) => (
                <li key={head} className={`py-3.5 border-t ${LINE}`}>
                  <p className={`font-semibold ${INK}`}>{head}</p>
                  <p className={`mt-1 text-sm ${MUTED} leading-relaxed`}>{body}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

/* -------------------------------------------------------------- final cta */

/**
 * The booking section in the shape of the live www.maxionlabs.com FinalCTA (components/sections/FinalCTA.tsx on
 * origin/main): one centred column, the heading, Max's byline, "Exactly what happens on the call" in five numbered
 * first-person steps, the cal.com embed at max-w-4xl, the email fallback. Palette is v3's. The steps say what
 * this call is: the fit, the market count they keep, the terms, the proof, the questions.
 */
const CALL_STEPS = [
  "I'll ask about your lines, your territory and your premium floor, so we both know if it's a fit.",
  "If it is, I'll pull your state and your lines from the public records and show you the count of owners showing a trigger right now. You keep that count whether or not you buy.",
  "I'll walk you through the terms: $4,725 a month, 15 qualified meetings, $315 back per miss, the 7-day full refund.",
  "I'll show you the results above in more detail, where each number comes from, and what we learned there that applies to your agency.",
  "I'll answer every question so you have enough to decide. If it fits, the one-page agreement follows within 10 minutes.",
]

function FinalCall() {
  return (
    <section id="book-call" data-testid="final-cta-section" className={`${PAPER} border-t ${LINE} scroll-mt-20`}>
      <div className={`${CONTAINER} py-20 lg:py-28`}>
        <div className="flex flex-col items-center gap-10 lg:gap-14 text-center">
          <div>
            <Mono className="!text-accent">Next step</Mono>
            <H2 className="mt-4 max-w-4xl">Book a 20 minute call.</H2>
          </div>

          <div className="flex flex-col gap-6 w-full max-w-2xl text-left">
            <div className="flex items-center gap-3">
              <span
                className="flex-shrink-0 w-11 h-11 rounded-full bg-accent text-white text-base font-semibold flex items-center justify-center"
                aria-hidden="true"
              >
                M
              </span>
              <span className={`text-base ${MUTED} leading-snug`}>
                <span className={`${INK} font-semibold`}>You&apos;ll book a call with me, Max</span>, I&apos;m the
                founder. Not a sales guy.
              </span>
            </div>
            <p className={`text-base font-semibold ${INK}`}>Exactly what happens on the call:</p>
            <ol className="flex flex-col gap-4">
              {CALL_STEPS.map((s, i) => (
                <li key={s} data-testid="call-step" className="flex gap-4 items-start">
                  <span className="flex-shrink-0 w-7 h-7 rounded-full border border-accent/50 bg-accent/[0.08] text-accent text-xs font-mono flex items-center justify-center mt-0.5">
                    {i + 1}
                  </span>
                  <span className={`text-base md:text-lg ${MUTED} leading-relaxed`}>{s}</span>
                </li>
              ))}
            </ol>
          </div>

          <div className={`w-full max-w-4xl rounded-card border ${LINE} bg-white p-2`}>
            <BookCall />
          </div>

          <p className={`text-sm ${MUTED}`}>
            Prefer email?{' '}
            <a href="mailto:maksym@maxionlabs.com" className="text-accent hover:underline">
              Reach out at maksym@maxionlabs.com
            </a>
          </p>
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
        <Method />
        <HonestFilter />
        <Price />
        <FinalCall />
      </main>
      <HomeFooter />
    </>
  )
}

export default InsuranceHome
