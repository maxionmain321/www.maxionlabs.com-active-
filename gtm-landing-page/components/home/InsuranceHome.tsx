import { BookCall } from './BookCall'
import { HomeFooter } from './HomeFooter'

/**
 * Homepage v2: the short insurance page.
 *
 * Two jobs. A cold visitor should see who this is for, get curious and book with the least friction.
 * A prospect already in the funnel should find the terms, the method and the proof they heard on the
 * call, laid out so Maxionlabs reads as the lowest-risk choice. The call does the selling.
 *
 * Server-rendered, one H1, every number traces to a repo file:
 *   00_foundation/offer-v3.md (CURRENT INSURANCE OFFER block): price, counts, credit, refund, prepay, included list
 *   knowledge_base/maxionlabs-acquisition/proof/funnel-tracker.md: only QUOTABLE rows, with their stated context
 *   knowledge_base/clients/leads/jared-gabbel-strongtower-offer/public/index.html: owner replies, the brief
 *   knowledge_base/maxionlabs-acquisition/seo-aeo-strategy.md: ICP, anti-ICP, positioning
 *   industry-voice-2026-11-14.md 6e/6f: publish the price, peer proof over numbers, never "leads" in our voice
 *
 * Sections: hero (terms and risk reversal beside the CTA), what we're not, on camera, method, fit, price, book.
 * No FAQ, no invented illustration email, no trigger table, no case strip.
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

export const HERO_H1 = 'Your missing outbound seat. First meetings with owners who are coming up for renewal.'
export const HERO_SUB =
  "For independent commercial P&C and benefits agencies with producers and nobody prospecting for them. We find owners whose public records just changed, call every yes, and book the fits onto your producers' calendars."

/** The terms and the risk reversal, in the hero, beside the CTA. offer-v3.md CURRENT INSURANCE OFFER. */
const TERMS = [
  ['$4,725 a month, month to month', 'Cancel anytime. Sending starts within 72 hours.'],
  ['15 qualified meetings a month', '12 in month one while we ramp. $315 back for every one we miss.'],
  ['7-day full refund', 'Any reason, all of it back.'],
  ['Territory lock, included', 'Your counties, your meetings, never resold.'],
]

/** Real replies, anonymized, from the November 2026 owner-reply table (Strong Tower template, option 1). */
const HERO_REPLIES = [
  ['Painting contractor, Knoxville, TN', 'Yes. I am concerned I am overpaying on workers comp.'],
  ['Home care agency, Galax, VA', "I'd love to schedule a call. Next week."],
  ['Behavioral health practice, New York, NY', 'I can do 11am Tuesday, a week from today.'],
  ['Accounting firm, Hackensack, NJ', "Sure, let's discuss small business plan."],
]

function Hero() {
  return (
    <section data-testid="hero-section" className={`${CONTAINER} pt-14 pb-14 lg:pt-24 lg:pb-20`}>
      <div className="grid lg:grid-cols-[1.2fr_1fr] gap-12 lg:gap-16 items-start">
        <div className="min-w-0">
          <Mono className="!text-accent">Commercial insurance agencies</Mono>
          <h1
            className={`${SERIF} mt-5 text-[40px] md:text-[54px] lg:text-[62px] font-medium ${INK} leading-[1.02] tracking-[-0.015em] max-w-3xl`}
          >
            Your missing <Underline>outbound seat</Underline>. First meetings with owners who are coming up for
            renewal.
          </h1>
          <p className={`mt-6 text-lg md:text-xl ${MUTED} leading-relaxed max-w-2xl`}>{HERO_SUB}</p>
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
            <a href="#book-call" className={CTA}>
              Book a 20 minute call with Max
            </a>
            <a href="#method" className={CTA_LINK}>
              How it works <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
          <p className={`mt-4 text-sm ${MUTED} max-w-xl leading-relaxed`}>
            Twenty minutes. You leave with the count of owners in your territory showing a trigger right now, whether or
            not you buy.
          </p>
          <ul className={`mt-10 border-t ${LINE} divide-y divide-[#D8DEE6]`}>
            {TERMS.map(([head, body]) => (
              <li key={head} className="py-3.5 flex flex-col sm:flex-row sm:items-baseline gap-x-6 gap-y-0.5">
                <span className={`font-semibold ${INK} sm:w-72 flex-shrink-0`}>{head}</span>
                <span className={`text-sm ${MUTED}`}>{body}</span>
              </li>
            ))}
          </ul>
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
          <RenewalStrip />
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
 * Named, cleared videos, ordered by outcome strength: closed-won revenue, paying customers, businesses signed,
 * seats sold. Ids and titles from components/sections/VideoTestimonials.tsx; clearance and the quoted metric in
 * funnel-tracker.md QUOTABLE rows. Conor appears with no surname. Peer proof, not a pile of numbers (industry-voice 6e).
 */
const ON_CAMERA = [
  {
    name: 'Anisa Ahmed',
    title: 'Growth & Revenue Strategy, executive career services',
    metric: '$73,300 in client revenue, 24 paid closes',
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
    name: 'Conor',
    title: 'Founder, online reputation services',
    metric: '50+ local businesses signed',
    youtubeId: 'yMmsy7V3HoU',
    avatar: 'https://img.youtube.com/vi/yMmsy7V3HoU/hqdefault.jpg',
  },
  {
    name: 'Rebecca Ditchey',
    title: 'Senior Program Manager, executive education',
    metric: '4 seats sold from 13 sales calls held',
    youtubeId: 'laYwFMVGZhw',
    avatar: 'https://img.youtube.com/vi/laYwFMVGZhw/hqdefault.jpg',
  },
]

function Results() {
  return (
    <section id="results" className={`${CONTAINER} py-16 lg:py-24 scroll-mt-20`}>
      <div className="grid lg:grid-cols-[1fr_1.1fr] gap-10 lg:gap-16 items-start">
        <div>
          <SectionLabel n="01">On the record</SectionLabel>
          <H2>Clients in their own voice, on camera.</H2>
          <Lede>
            Different markets, the same machine. Names and titles are theirs; every number is counted from the
            client&apos;s own records.
          </Lede>
        </div>
        <Quote
          className="lg:mt-12"
          text="the fact that they're warm and open to having a conversation, I'm telling you, if you just get us in the room, you know, that's where we're good."
          who="President, commercial P&C agency, Tennessee, on what he needs from us"
        />
      </div>
      <ul className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {ON_CAMERA.map((t) => (
          <li key={t.youtubeId} data-testid="on-camera">
            <a
              href={`https://www.youtube.com/watch?v=${t.youtubeId}`}
              target="_blank"
              rel="noopener noreferrer"
              className={`group rounded-card border ${LINE} bg-white p-5 h-full flex flex-col gap-4 hover:border-accent/60 transition-colors`}
            >
              <span className="relative flex-shrink-0 w-16 h-16 rounded-full overflow-hidden bg-[#E6EBF1]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={t.avatar} alt="" className="w-full h-full object-cover" loading="lazy" />
                <PlayIcon />
              </span>
              <span className="flex flex-col min-w-0 flex-1">
                <span className={`${SERIF} text-xl ${INK} leading-tight`}>{t.metric}</span>
                <span className={`mt-3 text-sm font-semibold ${INK}`}>{t.name}</span>
                <span className={`text-[12px] ${MUTED} leading-snug`}>{t.title}</span>
              </span>
              <Mono className="!text-accent !tracking-[0.12em] mt-auto">On camera</Mono>
            </a>
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

function FinalCall() {
  return (
    <section id="book-call" className={`${PAPER} scroll-mt-20`}>
      <div className={`${CONTAINER} py-20 lg:py-28`}>
        <div className="grid lg:grid-cols-[1fr_1.4fr] gap-10 lg:gap-16 items-start">
          <div>
            <Mono className="!text-accent">Next step</Mono>
            <H2 className="mt-4">Twenty minutes with Max.</H2>
            <p className={`mt-5 text-lg ${MUTED} leading-relaxed`}>
              You leave with the count of owners in your territory showing a trigger right now, whether or not you buy.
              If it fits, the one-page agreement follows within 10 minutes. 7-day full refund.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <span
                className="flex-shrink-0 w-11 h-11 rounded-full bg-accent text-white text-base font-semibold flex items-center justify-center"
                aria-hidden="true"
              >
                M
              </span>
              <span className={`text-base ${MUTED} leading-snug`}>
                <span className={`${INK} font-semibold`}>You&apos;ll book with me, Max</span>, the founder. Not a
                sales guy.
              </span>
            </div>
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
