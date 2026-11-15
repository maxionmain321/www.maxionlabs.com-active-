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

function Redacted({ w = 'w-24' }: { w?: string }) {
  return (
    <span
      aria-label="redacted"
      className={`inline-block ${w} h-3.5 rounded-sm bg-text-primary/80 align-middle mx-0.5`}
    />
  )
}

const CTA = 'inline-flex items-center justify-center rounded-button bg-accent text-white font-semibold px-6 py-3 text-base hover:bg-accent/90 transition-colors'
const CTA_GHOST = 'inline-flex items-center justify-center rounded-button border border-border bg-white text-text-primary font-semibold px-6 py-3 text-base hover:bg-secondary transition-colors'

/* ---------------------------------------------------------------- header */

function HomeHeader() {
  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b border-border">
      <nav className={`${CONTAINER} py-4 flex items-center justify-between gap-6`}>
        <a href="/" className="text-xl font-bold text-text-primary">
          Maxionlabs
        </a>
        <div className="hidden md:flex items-center gap-7 text-sm font-medium text-text-secondary">
          <a href="#how-it-works" className="hover:text-text-primary">How it works</a>
          <a href="#qualified" className="hover:text-text-primary">What qualified means</a>
          <a href="#proof" className="hover:text-text-primary">Proof</a>
          <a href="#price" className="hover:text-text-primary">Price</a>
          <a href="#faq" className="hover:text-text-primary">FAQ</a>
        </div>
        <a href="#book-call" className={`${CTA} px-4 py-2 text-sm`}>
          Book a call
        </a>
      </nav>
    </header>
  )
}

/* ------------------------------------------------------------------ hero */

export const HERO_H1 = 'First meetings with owners of the businesses you already write, timed to their renewal.'
export const HERO_SUB =
  "The outbound seat your agency never filled. We find owners whose public records just changed, email them, call every yes and book the ones inside your appetite. Qualified on premium, renewal date and line. Your producers take it from there."

function Hero() {
  return (
    <section data-testid="hero-section" className={`${CONTAINER} pt-16 pb-14 lg:pt-24 lg:pb-20`}>
      <div className="grid lg:grid-cols-[1.4fr_1fr] gap-10 lg:gap-16 items-center">
        <div>
          <Eyebrow>For independent commercial insurance agencies</Eyebrow>
          <h1 className="text-4xl md:text-5xl lg:text-[56px] font-bold text-text-primary leading-[1.08] tracking-tight max-w-3xl">
            {HERO_H1}
          </h1>
          <p className="mt-6 text-lg md:text-xl text-text-secondary leading-relaxed max-w-2xl">{HERO_SUB}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#book-call" className={CTA}>
              Book a 20 minute call
            </a>
            <a href="#price" className={CTA_GHOST}>
              See the price
            </a>
          </div>
        </div>
        <div className="rounded-card border border-border bg-secondary p-7 flex flex-col gap-5">
          <p className="text-xs font-semibold tracking-[0.16em] uppercase text-text-secondary">What you get</p>
          <div className="flex flex-col gap-4">
            <div>
              <p className="text-3xl font-bold text-text-primary">15 a month</p>
              <p className="text-sm text-text-secondary">Qualified appointments. 12 in month one while we ramp up.</p>
            </div>
            <div>
              <p className="text-xl font-semibold text-text-primary">Owners who said yes</p>
              <p className="text-sm text-text-secondary">Each one agreed to talk to you, then got a call from us to check.</p>
            </div>
            <div>
              <p className="text-xl font-semibold text-text-primary">Only yours</p>
              <p className="text-sm text-text-secondary">Never resold. Your counties are locked.</p>
            </div>
            <div>
              <p className="text-xl font-semibold text-text-primary">$4,725 a month, in writing</p>
              <p className="text-sm text-text-secondary">Month to month. Credit for every miss. 7-day full refund.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------- you've tried this before */

const FAILED = [
  {
    head: 'The $50 appointment vendor',
    what: 'Cheap per appointment, so nobody could do it right.',
    why: "$50 isn't enough to pay for good people, good data or good software. So the \"appointment\" was someone saying yes to end the call. Your producer drove out and the owner barely remembered agreeing.",
  },
  {
    head: 'The shared X-date list',
    what: 'You got the renewal date. So did every other agency that bought the list.',
    why: "The owner's phone was already ringing before you dialled. The list seller got paid the same whether you wrote the account or not.",
  },
  {
    head: 'The overseas caller paid for activity',
    what: 'Paid per dial or per hour, not per meeting that holds.',
    why: "Activity went up. Your calendar didn't. When the caller gets paid before the meeting has to be any good, the meeting isn't good.",
  },
]

function TriedBefore() {
  return (
    <section className="bg-secondary border-y border-border">
      <div className={`${CONTAINER} py-16 lg:py-20`}>
        <Eyebrow>You&apos;ve tried this before</Eyebrow>
        <H2>Most agencies we talk to have paid for this twice already</H2>
        <p className="mt-4 text-lg text-text-secondary max-w-2xl">
          The pattern is the same each time. The vendor got paid before the meeting had to be any good.
        </p>
        <div className="mt-10 grid md:grid-cols-3 gap-5">
          {FAILED.map((f) => (
            <Card key={f.head}>
              <h3 className="text-lg font-semibold text-text-primary">{f.head}</h3>
              <p className="mt-3 text-base text-text-primary">{f.what}</p>
              <p className="mt-3 text-sm text-text-secondary leading-relaxed">{f.why}</p>
            </Card>
          ))}
        </div>
        <Note>
          We flip the incentive. We guarantee the count and credit every miss, so a bad appointment costs us, not you.
          No vendor named above, and no criticism of anyone&apos;s effort.
        </Note>
      </div>
    </section>
  )
}

/* ---------------------------------------------------------- how it works */

const BASICS = [
  ['Volume', 'Enough owners reached every month to fill your calendar, not a trickle.'],
  ['Targeting', 'Only businesses in the lines you write, found when their records just changed.'],
  ['Offer', 'A reason to talk that matters to the owner, tested until it gets replies.'],
  ['Appointment setting', 'Our caller checks every yes and books it on your calendar.'],
]

const TRIGGERS = [
  ['Contractors', 'State contractor licence boards', 'New licence, or one coming up for renewal', 'GL, WC, contractor equipment'],
  ['Trucking and delivery', 'FMCSA carrier census', 'New authority, fleet size, cargo type', 'Business auto, cargo, WC'],
  ['Manufacturers', 'OSHA inspection and citation data, plus Form 5500', 'A new citation means safety and WC pressure. 5500 gives the plan-year start', 'WC, GL, property, benefits'],
  ['Any employer with a group plan', 'Form 5500 filings', 'Plan-year start, participant count, current carrier', 'Group health, benefits'],
  ['Restaurants and bars', 'State liquor licence filings, county health permits', 'New or transferred licence, new location opening', 'BOP, liquor liability, WC'],
  ['Growing employers', 'Job postings, county building permits', 'Headcount growth or a new site', 'WC, property, EPLI'],
]

const CHECK_FLOW = [
  ['Owner says yes', 'A reply to our email asking for the meeting.'],
  ['We call them', 'A real conversation, not a form. We confirm they want the meeting.'],
  ['Check your appetite', 'Line, premium, headcount, county and who signs, against what you told us you write.'],
  ['Then it books', 'Only a match goes on your calendar. Anything else never reaches your producer.'],
]

function HowItWorks() {
  return (
    <section id="how-it-works" className={`${CONTAINER} py-16 lg:py-24 scroll-mt-20`}>
      <Eyebrow>How it works</Eyebrow>
      <H2>Public records tell us who just changed. We email them, call every yes, then book.</H2>

      <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {BASICS.map(([head, body], i) => (
          <Card key={head}>
            <span className="text-xs font-mono text-accent">{i + 1}</span>
            <h3 className="mt-2 text-lg font-semibold text-text-primary">{head}</h3>
            <p className="mt-2 text-sm text-text-secondary leading-relaxed">{body}</p>
          </Card>
        ))}
      </div>
      <Note>
        Every outreach that works gets these four right. Miss one and the whole thing stalls.
      </Note>

      <div className="mt-16">
        <h3 className="text-2xl font-bold text-text-primary tracking-tight">How we find who needs coverage now</h3>
        <p className="mt-3 text-text-secondary max-w-2xl">
          Each source below is free and public. We pull your state and your lines, and count your territory in week
          one, before any email goes out.
        </p>
        <div className="mt-6 overflow-x-auto rounded-card border border-border" role="region" aria-label="Public trigger sources" tabIndex={0}>
          <table className="w-full min-w-[720px] text-sm text-left">
            <thead className="bg-secondary text-text-secondary">
              <tr>
                <th className="px-4 py-3 font-semibold">Industry</th>
                <th className="px-4 py-3 font-semibold">Public trigger source</th>
                <th className="px-4 py-3 font-semibold">What it tells us</th>
                <th className="px-4 py-3 font-semibold">Your line</th>
              </tr>
            </thead>
            <tbody>
              {TRIGGERS.map(([industry, source, tells, line]) => (
                <tr key={industry} className="border-t border-border align-top">
                  <th scope="row" className="px-4 py-3 font-semibold text-text-primary">{industry}</th>
                  <td className="px-4 py-3 text-text-primary">{source}</td>
                  <td className="px-4 py-3 text-text-secondary">{tells}</td>
                  <td className="px-4 py-3 text-text-secondary">{line}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Note>
          Freshness runs from daily (FMCSA) to yearly (Form 5500). Registration is not the same as buying coverage,
          which is why every yes still gets a call.
        </Note>
      </div>

      <div className="mt-16">
        <h3 className="text-2xl font-bold text-text-primary tracking-tight">What we send</h3>
        <p className="mt-3 text-text-secondary max-w-2xl">
          Plain emails, no links, one question. Sent from our own domains, offering a meeting with your agency. You
          approve every email before it goes, and nothing goes out in a name you haven&apos;t signed off.
        </p>
      </div>

      <div className="mt-16">
        <h3 className="text-2xl font-bold text-text-primary tracking-tight">
          No appointment reaches your calendar until we&apos;ve called and checked it
        </h3>
        <ol className="mt-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {CHECK_FLOW.map(([head, body], i) => (
            <li key={head} className="rounded-card bg-secondary px-6 py-6 ring-1 ring-inset ring-border/70">
              <span className="flex w-7 h-7 rounded-full bg-accent text-white text-xs items-center justify-center font-semibold">
                {i + 1}
              </span>
              <h4 className="mt-3 text-lg font-semibold text-text-primary">{head}</h4>
              <p className="mt-2 text-sm text-text-secondary leading-relaxed">{body}</p>
            </li>
          ))}
        </ol>
      </div>

      <div className="mt-16 grid lg:grid-cols-[1fr_1.2fr] gap-8 items-start">
        <div>
          <h3 className="text-2xl font-bold text-text-primary tracking-tight">
            This is what lands in your inbox before every meeting
          </h3>
          <p className="mt-3 text-text-secondary">
            Business and contact details, who&apos;s on the call, why they said yes in their own words, and what to
            watch for. Current carrier when we know it. Nothing inferred and dressed up as fact.
          </p>
          <p className="mt-3 text-sm text-text-secondary">
            Below is a real brief we sent a group benefits agency in November 2026, with names and contact details
            blacked out. Yours carries your line, your appetite and the owner&apos;s own words.
          </p>
        </div>
        <div className="rounded-card border border-border bg-white text-sm overflow-hidden">
          <div className="bg-secondary px-5 py-3 text-text-secondary border-b border-border leading-relaxed">
            <b className="text-text-primary">From:</b> Maxionlabs &nbsp; <b className="text-text-primary">To:</b> <Redacted w="w-28" />
            <br />
            <b className="text-text-primary">Subject:</b> New call booked, brief for your producer
            <br />
            <b className="text-text-primary">Sent:</b> Tue 3 Nov, a week before the call
          </div>
          <dl className="px-5 py-4 grid grid-cols-[96px_1fr] gap-x-4 gap-y-3">
            <dt className="text-text-secondary">When</dt>
            <dd className="text-text-primary">Tue 10 Nov, 11am ET, 15 min on Teams with <Redacted w="w-24" /></dd>
            <dt className="text-text-secondary">Who</dt>
            <dd className="text-text-primary">Founder and executive director. Cell (prefers texts) and office line included: <Redacted w="w-28" /></dd>
            <dt className="text-text-secondary">Also on</dt>
            <dd className="text-text-primary">The office manager, who runs their insurance operations</dd>
            <dt className="text-text-secondary">Business</dt>
            <dd className="text-text-primary">Mental health group practice, New York, one location, founded <Redacted w="w-12" />. Therapy, psych testing, a children&apos;s center, a psychiatrist on staff</dd>
            <dt className="text-text-secondary">Size</dt>
            <dd className="text-text-primary">About 30 licensed clinicians, 25 trainees, 5 admin. LinkedIn says 11 to 50</dd>
            <dt className="text-text-secondary">Why they said yes</dt>
            <dd className="text-text-primary">First question was &ldquo;who pays you?&rdquo; After we offered 15 minutes to see if there is anything to gain on their current plan: &ldquo;I can do 11am Tuesday, a week from today.&rdquo;</dd>
            <dt className="text-text-secondary">Watch for</dt>
            <dd className="text-text-primary">Cover early how the agency gets paid</dd>
            <dt className="text-text-secondary">Broker change</dt>
            <dd className="text-text-primary">Possible, not assumed</dd>
          </dl>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------- qualified */

const QUALIFIED = [
  ['Premium', 'Above the premium or group-size floor you set. Not headcount, premium.'],
  ['Renewal window', 'A need now or within 3 months. We ask for the renewal date and confirm what we can.'],
  ['Appetite', 'In your territory and inside your carrier appetite, by line.'],
  ['Decider present', 'The owner, or whoever decides on the insurance, is in the meeting.'],
]

function Qualified() {
  return (
    <section id="qualified" className="bg-secondary border-y border-border scroll-mt-20">
      <div className={`${CONTAINER} py-16 lg:py-20`}>
        <Eyebrow>The part everyone argues about</Eyebrow>
        <H2>What &ldquo;qualified&rdquo; means, agreed in writing before we send anything</H2>
        <p className="mt-4 text-lg text-text-secondary max-w-2xl">
          All four have to be true. Miss one and it isn&apos;t an appointment, it&apos;s a credit.
        </p>
        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {QUALIFIED.map(([head, body]) => (
            <Card key={head}>
              <span className="flex w-7 h-7 rounded-full bg-accent text-white text-xs items-center justify-center" aria-hidden="true">
                &#10003;
              </span>
              <h3 className="mt-3 text-lg font-semibold text-text-primary">{head}</h3>
              <p className="mt-2 text-sm text-text-secondary leading-relaxed">{body}</p>
            </Card>
          ))}
        </div>
        <Note>
          We don&apos;t guarantee a quote, a bound policy or a sale. We guarantee the owner is real, fits what you
          write, has a reason to talk now, and shows up. No-shows are replaced.
        </Note>
      </div>
    </section>
  )
}

/* ----------------------------------------------------------- for / not for */

const FOR = [
  'Independent commercial P&C or benefits agencies, roughly $2M to $15M in revenue.',
  'The owner, principal or president is the one buying.',
  'At least 2 producers besides the owner, so someone other than you takes the meetings.',
  'A renewal season coming and nobody owning prospecting.',
]

const NOT_FOR = [
  ['Solo agents', "You'd be taking 15 meetings a month on top of everything else. The math doesn't work for you, and we'd book meetings you resent."],
  ['In-person-only shops', 'Owners say yes by email and take a first call on Teams or Zoom. If every first meeting has to be face to face, the volume breaks.'],
  ['Personal-lines-led agencies', 'The triggers are commercial records. Homes and autos are not in them.'],
  ['Captives', 'The owners we find need a broker who can shop them. One carrier\'s appetite is too narrow for what the records turn up.'],
]

function Fit() {
  return (
    <section className={`${CONTAINER} py-16 lg:py-24`}>
      <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
        <div data-testid="for-section">
          <Eyebrow>Who it&apos;s for</Eyebrow>
          <H2>Agencies with producers and no outbound seat</H2>
          <ul className="mt-8 flex flex-col gap-4">
            {FOR.map((f) => (
              <li key={f} className="flex gap-3 items-start">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent text-white text-xs flex items-center justify-center mt-0.5" aria-hidden="true">
                  &#10003;
                </span>
                <span className="text-base md:text-lg text-text-primary leading-snug">{f}</span>
              </li>
            ))}
          </ul>
        </div>
        <div data-testid="not-for-section">
          <Eyebrow>And who it&apos;s not for</Eyebrow>
          <H2>We&apos;d rather tell you now</H2>
          <ul className="mt-8 flex flex-col gap-5">
            {NOT_FOR.map(([head, sub]) => (
              <li key={head} className="flex gap-3 items-start">
                <span className="flex-shrink-0 w-6 h-6 rounded-full border border-border bg-secondary text-text-secondary text-sm flex items-center justify-center mt-0.5" aria-hidden="true">
                  &times;
                </span>
                <span className="flex flex-col gap-1">
                  <span className="text-base md:text-lg font-semibold text-text-primary leading-snug">{head}</span>
                  <span className="text-sm text-text-secondary leading-relaxed">{sub}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ proof */

const PROOF = [
  ['35', 'sales-qualified demos and 6 annual contracts ($7K to $20K a year) for construction software sold to contractors'],
  ['50+', 'local businesses signed for an online reputation services company'],
  ['$73,300', 'client revenue from 24 paid closes for an executive career services firm, an 8.6x return'],
  ['51', 'engaged leads in 45 days for a marketing agency serving auto-repair shops'],
  ['19', 'qualified meetings held in one month for an EU procurement software company'],
]

const YES_ROWS = [
  ['Behavioral health practice', 'n/a', 'New York, NY', 'Executive director and founder', 'Group health', '"I can do 11am Tuesday, a week from today."'],
  ['Home care agency', 'n/a', 'Dayton, OH', 'Owner', 'Group health', '"Yes I need a better plan."'],
  ['Wealth advisory firm', '20-99', 'Boca Raton, FL', 'President', 'Group health for people without a group plan', '"Send me details of what you can offer."'],
  ['Financial advisory firm', '20-99', 'Garden City, NY', 'Co-founder', 'Group health', '"Sure, send me over an invite."'],
  ['Finance company', '20-99', 'Aventura, FL', 'Chief executive officer', 'Group health', '"Please forward some additional information."'],
  ['Custom home builder', '20-99', 'Asheville, NC', 'Not stated', 'Contractor insurance review', '"Yes." Then gave a phone number to call'],
  ['Painting contractor', '5-19', 'Knoxville, TN', 'Not stated', 'Workers comp', '"Yes. I am concerned I am overpaying on workers comp."'],
  ['Residential builder', 'n/a', 'Bluefield', 'Not stated', 'Contractor insurance review', '"Yes."'],
  ['HVAC contractor', '5-19', 'Knoxville, TN', 'Not stated', 'Commercial insurance quote', '"Sure, send a quote."'],
  ['Accounting firm', '20-99', 'Hackensack, NJ', 'Partner or principal (CPA)', 'Small business group plan; last person rolls off in February', '"Sure, let\'s discuss small business plan."'],
  ['Financial advisory firm', '20-99', 'Rockville, MD', 'Not stated', 'Group health', '"Call me any day next week after 4."'],
  ['Painting contractor', '5-19', 'Knoxville, TN', 'Not stated', 'Workers comp', '"That might be helpful. How would that work?"'],
  ['Home care agency', '100-249', 'Galax, VA', 'Not stated', 'Workers comp; open claim, renewal early February', '"I\'d love to schedule a call. Next week."'],
  ['Digital marketing agency', '51-200', 'Toms River, NJ', 'Chief executive officer', 'Group health', '"Please send me some information. I am interested in looking."'],
  ['Self storage operator', '1-10', 'Sevierville, TN', 'Not stated', 'Commercial insurance', '"Please send information."'],
]

function Proof() {
  return (
    <section id="proof" className="bg-secondary border-y border-border scroll-mt-20">
      <div className={`${CONTAINER} py-16 lg:py-24`}>
        <Eyebrow>Proof</Eyebrow>
        <H2>We&apos;ve done this for other industries</H2>
        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {PROOF.map(([big, body]) => (
            <Card key={big + body.slice(0, 12)}>
              <p className="text-3xl font-bold text-text-primary tracking-tight">{big}</p>
              <p className="mt-2 text-sm text-text-secondary leading-relaxed">{body}</p>
            </Card>
          ))}
        </div>
        <Note>
          These are not insurance results yet. Insurance is our newest market: two agencies live since late October
          2026 (a group benefits agency in New Jersey and a commercial P&amp;C agency in Tennessee, names private),
          first meetings being held, too early for bound premium. We won&apos;t quote their numbers until they&apos;re
          real. Same process: map the market, email the owners, qualify, book. Other client results are anonymous at
          the client&apos;s request.
        </Note>

        <div className="mt-16">
          <h3 className="text-2xl font-bold text-text-primary tracking-tight">
            Business owners who said yes for our insurance clients
          </h3>
          <p className="mt-3 text-text-secondary max-w-2xl">
            November 2026: 15 owners said yes. Replies to cold email for a group benefits agency in New Jersey and a
            commercial P&amp;C agency in Tennessee.
          </p>
          <div className="mt-6 overflow-x-auto rounded-card border border-border bg-white" role="region" aria-label="Owner replies, scrolls sideways" tabIndex={0}>
            <table className="w-full min-w-[900px] text-sm text-left">
              <thead className="bg-secondary text-text-secondary">
                <tr>
                  {['Industry', 'Size', 'Location', 'Who replied (title)', 'What they need', 'What they said'].map((h) => (
                    <th key={h} className="px-4 py-3 font-semibold">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {YES_ROWS.map((row, i) => (
                  <tr key={i} className="border-t border-border align-top">
                    {row.map((cell, j) => (
                      <td key={j} className={`px-4 py-3 ${j === 0 ? 'font-semibold text-text-primary' : 'text-text-secondary'}`}>
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Note>
            Real replies, anonymized. Names, businesses, emails and phones removed. &ldquo;Not stated&rdquo; means the
            reply did not say. Size is employee count and &ldquo;n/a&rdquo; means we could not confirm it. A yes is
            not a booked appointment; each one still gets the call and the appetite check above.
          </Note>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ price */

const GUARANTEE = [
  ['15 or $315 back', '15 qualified appointments a month, guaranteed from month 2. $315 credit for each appointment short of your guarantee, against your next invoice. Unused credit is refunded in cash if you cancel.'],
  ['12 in month 1', 'Guaranteed in month one, counted over 30 days from the first email, while the campaigns ramp up.'],
  ['7-day full refund', "Not happy for any reason in the first 7 days after you pay, you get it all back, no questions. Nothing is held back in those 7 days."],
  ['Territory lock, included', "We don't book for another agency in your counties, and your appointments are never resold. No extra charge."],
]

function Price() {
  return (
    <section id="price" className={`${CONTAINER} py-16 lg:py-24 scroll-mt-20`}>
      <Eyebrow>The price</Eyebrow>
      <H2>$4,725 a month, or less if you prepay</H2>
      <div className="mt-10 grid md:grid-cols-2 gap-5 max-w-4xl">
        <div className="rounded-card border-2 border-accent bg-white px-7 py-7">
          <p className="text-sm font-semibold text-accent">15 appointments a month</p>
          <p className="mt-2 text-5xl font-bold text-text-primary tracking-tight">
            $4,725<span className="text-xl font-medium text-text-secondary"> / month</span>
          </p>
          <p className="mt-4 text-text-secondary leading-relaxed">
            Month to month, auto-renewing, cancel anytime. Month 1 is 12 appointments, then 15 a month. No share of
            commission or premium.
          </p>
        </div>
        <div className="rounded-card border border-border bg-secondary px-7 py-7">
          <p className="text-sm font-semibold text-text-secondary">Prepay option</p>
          <p className="mt-2 text-5xl font-bold text-text-primary tracking-tight">$12,500</p>
          <p className="mt-4 text-text-secondary leading-relaxed">
            3 months, paid upfront. You save $1,675 against paying monthly.
          </p>
        </div>
      </div>
      <Note>Paid monthly upfront, and we start as soon as it&apos;s paid. Payments go through Stripe.</Note>

      <div className="mt-14">
        <h3 className="text-2xl font-bold text-text-primary tracking-tight">
          The guarantee: miss one and you get $315 credit, paid back in cash if you cancel
        </h3>
        <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {GUARANTEE.map(([head, body]) => (
            <Card key={head} className="border-accent/40">
              <h4 className="text-lg font-semibold text-text-primary">{head}</h4>
              <p className="mt-2 text-sm text-text-secondary leading-relaxed">{body}</p>
            </Card>
          ))}
        </div>
        <Note>
          No-shows are replaced. Included in the price: mapping your total addressable market, the CSV files of that
          market, the campaigns, the caller, the brief before every meeting, and a renewal calendar that builds from
          the dates we capture and confirm. You never buy email volume.
        </Note>
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

function WhoAndFaq() {
  return (
    <section id="faq" className="bg-secondary border-y border-border scroll-mt-20">
      <div className={`${CONTAINER} py-16 lg:py-24`}>
        <div className="grid lg:grid-cols-[1fr_1.6fr] gap-10 lg:gap-16">
          <div>
            <Eyebrow>Who we are</Eyebrow>
            <H2>Maxionlabs</H2>
            <p className="mt-4 text-text-secondary leading-relaxed">
              Run by Max Pidvalnyi. We build the outbound seat for independent commercial agencies: the market map,
              the emails, the caller who checks every yes, the brief before every meeting.
            </p>
            <p className="mt-4 text-text-secondary leading-relaxed">
              Payments through Stripe. Registered in Ukraine, Vinytska 15, Kiev, 08130. Email{' '}
              <a href="mailto:maksym@maxionlabs.com" className="text-accent hover:underline">
                maksym@maxionlabs.com
              </a>
              .
            </p>
          </div>
          <div>
            <Eyebrow>Questions buyers asked</Eyebrow>
            <dl className="flex flex-col divide-y divide-border rounded-card border border-border bg-white">
              {FAQ.map(([q, a]) => (
                <div key={q} className="px-6 py-5">
                  <dt className="text-lg font-semibold text-text-primary">{q}</dt>
                  <dd className="mt-2 text-base text-text-secondary leading-relaxed">{a}</dd>
                </div>
              ))}
            </dl>
          </div>
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
    <section id="book-call" className={`${CONTAINER} py-20 lg:py-28 scroll-mt-20`}>
      <div className="grid lg:grid-cols-[1fr_1.4fr] gap-10 lg:gap-16 items-start">
        <div>
          <Eyebrow>Next step</Eyebrow>
          <H2>Book a 20 minute call</H2>
          <div className="mt-6 flex items-center gap-3">
            <span className="flex-shrink-0 w-11 h-11 rounded-full bg-accent text-white text-base font-semibold flex items-center justify-center" aria-hidden="true">
              M
            </span>
            <span className="text-base text-text-secondary leading-snug">
              <span className="text-text-primary font-semibold">You&apos;ll book with me, Max</span>, the founder.
              Not a sales guy.
            </span>
          </div>
          <p className="mt-6 text-base font-semibold text-text-primary">What happens on the call:</p>
          <ol className="mt-3 flex flex-col gap-3">
            {CALL_STEPS.map((s, i) => (
              <li key={s} className="flex gap-3 items-start">
                <span className="flex-shrink-0 w-7 h-7 rounded-full border border-accent/50 bg-accent/[0.08] text-accent text-xs font-mono flex items-center justify-center mt-0.5">
                  {i + 1}
                </span>
                <span className="text-base text-text-secondary leading-relaxed">{s}</span>
              </li>
            ))}
          </ol>
          <p className="mt-8 text-sm text-text-secondary">
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

/* ------------------------------------------------------------------- page */

export function InsuranceHome() {
  return (
    <>
      <HomeHeader />
      <main className="min-h-screen bg-white text-text-primary">
        <Hero />
        <TriedBefore />
        <HowItWorks />
        <Qualified />
        <Fit />
        <Proof />
        <Price />
        <WhoAndFaq />
        <FinalCall />
      </main>
      <HomeFooter />
    </>
  )
}

export default InsuranceHome
