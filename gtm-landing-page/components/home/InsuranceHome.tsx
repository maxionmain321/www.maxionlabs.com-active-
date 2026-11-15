import { BookCall } from './BookCall'
import { HomeFooter } from './HomeFooter'

/**
 * Homepage: the commercial insurance offer, public version of the Strong Tower page.
 * Server-rendered. Every number comes from 00_foundation/offer-v3.md (CURRENT INSURANCE OFFER),
 * knowledge_base/maxionlabs-acquisition/proof/funnel-tracker.md (QUOTABLE rows) and the
 * Strong Tower template. No insurance results are quoted until the registry has a QUOTABLE row.
 */

const CONTAINER = 'max-w-container mx-auto px-6 lg:px-12'

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-semibold tracking-[0.16em] uppercase text-accent mb-3">{children}</p>
  )
}

function H2({ children, id }: { children: React.ReactNode; id?: string }) {
  return (
    <h2 id={id} className="text-3xl md:text-4xl font-bold text-text-primary leading-tight tracking-tight">
      {children}
    </h2>
  )
}

function Note({ children }: { children: React.ReactNode }) {
  return <p className="mt-6 text-sm text-text-secondary leading-relaxed max-w-3xl">{children}</p>
}

function Card({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-card border border-border bg-white px-6 py-6 ${className}`}>{children}</div>
  )
}

const CTA = 'inline-flex items-center justify-center rounded-button bg-accent text-white font-semibold px-6 py-3 text-base hover:bg-accent/90 transition-colors'

/* ---------------------------------------------------------------- header */

function HomeHeader() {
  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b border-border">
      <nav className={`${CONTAINER} py-4 flex items-center justify-between gap-6`}>
        <a href="/" className="text-xl font-bold text-text-primary">
          Maxionlabs
        </a>
        <a href="#book-call" className={`${CTA} px-4 py-2 text-sm`}>
          Book a call
        </a>
      </nav>
    </header>
  )
}

/* ------------------------------------------------------- promise + for whom */

export const HERO_H1 = "15 qualified meetings a month with business owners, booked on your producers' calendars."
export const HERO_SUB =
  'We find owners of the businesses you already write, timed to their renewal. We check every one against your appetite, then book it. Your producers take the meeting and close.'

function Hero() {
  return (
    <section data-testid="hero-section" className={`${CONTAINER} pt-16 pb-14 lg:pt-24 lg:pb-20`}>
      <Eyebrow>For independent commercial P&amp;C and benefits agencies</Eyebrow>
      <h1 className="text-4xl md:text-5xl lg:text-[56px] font-bold text-text-primary leading-[1.08] tracking-tight max-w-4xl">
        {HERO_H1}
      </h1>
      <p className="mt-6 text-lg md:text-xl text-text-secondary leading-relaxed max-w-2xl">{HERO_SUB}</p>
      <p className="mt-4 text-base text-text-primary font-medium max-w-2xl">
        Built for agencies doing $2M to $15M with at least two producers besides the owner.
      </p>
      <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
        <a href="#book-call" className={CTA}>
          Book a 20 minute call
        </a>
        <p className="text-sm text-text-secondary">
          $4,725 a month. $315 back for every meeting we miss. 7-day full refund.
        </p>
      </div>
    </section>
  )
}

/* ---------------------------------------------------------- what we're not */

const NOT_US = [
  ['Not a lead list', "You don't get names to dial. You get a meeting with an owner who said yes."],
  ['Not a $50 appointment vendor', "Every yes gets a call from us and is checked against your appetite before it books. If it isn't qualified, it doesn't count."],
  ['Not shared', 'Your meetings are never resold, and your counties are locked. Territory lock is included.'],
  ['Not a marketing agency', 'No ads, no content, no impression reports. Meetings on your calendar are the deliverable.'],
  ["Not borrowing your name", "We never create domains with your agency's name in them. We send from our own, with copy you approve."],
]

function WhatWeAreNot() {
  return (
    <section data-testid="what-we-are-not" className="bg-secondary border-y border-border">
      <div className={`${CONTAINER} py-16 lg:py-20`}>
        <H2>What we&apos;re not</H2>
        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {NOT_US.map(([head, body]) => (
            <Card key={head}>
              <h3 className="text-lg font-semibold text-text-primary">{head}</h3>
              <p className="mt-2 text-sm text-text-secondary leading-relaxed">{body}</p>
            </Card>
          ))}
        </div>
        <p data-testid="not-for-section" className="mt-8 text-base text-text-secondary">
          <span className="font-semibold text-text-primary">And we&apos;re not a fit</span> for solo agents,
          in-person-only shops, personal-lines-first agencies or captives.
        </p>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------ believability */

const STEPS = [
  'We map your market from public records: new trucking authorities, contractor licences, OSHA records, Form 5500 plan years.',
  'We email the owners from our own domains, with copy you approve.',
  'Every yes gets a call from us and is checked against your territory, appetite, premium floor and renewal window.',
  "Only a match books, with a brief in your producer's inbox before the meeting.",
]

const OWNER_YES = [
  ['"Yes. I am concerned I am overpaying on workers comp."', 'Painting contractor, Knoxville, TN'],
  ['"I\'d love to schedule a call. Next week."', 'Home care agency, Galax, VA. Renewal early February'],
  ['"Sure, let\'s discuss small business plan."', 'Accounting firm, Hackensack, NJ'],
]

const PROOF = [
  ['35', 'sales-qualified demos and 6 annual contracts for construction software sold to contractors'],
  ['$73,300', 'client revenue from 24 paid closes for an executive career services firm, an 8.6x return'],
  ['19', 'qualified meetings held in one month for an EU procurement software company'],
]

function Believe() {
  return (
    <section className={`${CONTAINER} py-16 lg:py-24`}>
      <H2>How a yes becomes a meeting</H2>
      <ol className="mt-8 grid md:grid-cols-4 gap-5">
        {STEPS.map((s, i) => (
          <li key={s} className="rounded-card border border-border bg-white px-6 py-6">
            <span className="text-sm font-mono text-accent">{i + 1}</span>
            <p className="mt-2 text-base text-text-primary leading-relaxed">{s}</p>
          </li>
        ))}
      </ol>

      <h3 className="mt-16 text-2xl font-bold text-text-primary tracking-tight">
        Owners who said yes for our insurance clients, November 2026
      </h3>
      <div className="mt-6 grid md:grid-cols-3 gap-5">
        {OWNER_YES.map(([quote, who]) => (
          <Card key={who}>
            <p className="text-lg text-text-primary leading-snug">{quote}</p>
            <p className="mt-3 text-sm text-text-secondary">{who}</p>
          </Card>
        ))}
      </div>

      <h3 className="mt-16 text-2xl font-bold text-text-primary tracking-tight">Same process, other industries</h3>
      <div className="mt-6 grid md:grid-cols-3 gap-5">
        {PROOF.map(([big, body]) => (
          <Card key={big}>
            <p className="text-3xl font-bold text-text-primary tracking-tight">{big}</p>
            <p className="mt-2 text-sm text-text-secondary leading-relaxed">{body}</p>
          </Card>
        ))}
      </div>
      <Note>
        Insurance is our newest market: two agencies live since late October 2026. We&apos;ll publish their numbers
        when they&apos;re real. Replies and results are anonymized at our clients&apos; request.
      </Note>
    </section>
  )
}

/* -------------------------------------------------------------------- price */

const TERMS = [
  ['15 a month', 'Qualified meetings, 12 in month one while we ramp up. No-shows replaced.'],
  ['$315 back per miss', 'Credit for every meeting short. Unused credit refunded in cash if you cancel.'],
  ['7-day full refund', 'Not happy for any reason in the first 7 days, you get it all back.'],
  ['Territory lock', 'Included. Month to month, cancel anytime.'],
]

function Price() {
  return (
    <section id="price" className="bg-secondary border-y border-border scroll-mt-20">
      <div className={`${CONTAINER} py-16 lg:py-20`}>
        <H2>$4,725 a month</H2>
        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {TERMS.map(([head, body]) => (
            <Card key={head}>
              <h3 className="text-lg font-semibold text-text-primary">{head}</h3>
              <p className="mt-2 text-sm text-text-secondary leading-relaxed">{body}</p>
            </Card>
          ))}
        </div>
        <Note>Prepay 3 months: $12,500. Paid upfront through Stripe, and we start as soon as it&apos;s paid.</Note>
      </div>
    </section>
  )
}

/* -------------------------------------------------------------------- call */

function FinalCall() {
  return (
    <section id="book-call" className={`${CONTAINER} py-20 lg:py-24 scroll-mt-20`}>
      <div className="grid lg:grid-cols-[1fr_1.4fr] gap-10 lg:gap-16 items-start">
        <div>
          <H2>Book a 20 minute call with Max</H2>
          <p className="mt-4 text-base text-text-secondary leading-relaxed">
            We&apos;ll look at your lines, territory and premium floor, and I&apos;ll show you how many businesses in
            your area are showing a trigger right now.
          </p>
          <p className="mt-6 text-sm text-text-secondary">
            Prefer email?{' '}
            <a href="mailto:maksym@maxionlabs.com" className="text-accent hover:underline">
              maksym@maxionlabs.com
            </a>
          </p>
        </div>
        <div className="rounded-card border border-border bg-white p-2">
          <BookCall />
        </div>
      </div>
    </section>
  )
}

/* -------------------------------------------------------------------- page */

export function InsuranceHome() {
  return (
    <>
      <HomeHeader />
      <main className="min-h-screen bg-white text-text-primary">
        <Hero />
        <WhatWeAreNot />
        <Believe />
        <Price />
        <FinalCall />
      </main>
      <HomeFooter />
    </>
  )
}

export default InsuranceHome
