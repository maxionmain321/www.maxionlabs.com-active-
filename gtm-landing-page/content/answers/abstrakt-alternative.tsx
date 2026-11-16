import type { SitePage } from '@/lib/site-pages'
import type { AnswerPageProps } from '@/components/answer/AnswerPage'
import { INK, LINE, MUTED, SERIF } from '@/components/home/InsuranceHome'

/**
 * Comparison page for the "abstrakt marketing group reviews / abstrakt alternative" cluster (search-demand row 9, MAX-738).
 *
 * Every Abstrakt fact on this page was read on 2026-11-16 from the page linked next to it, and nothing about Abstrakt is
 * stated that we could not open. Where a fact is not on a public page it says "not published". Every link whose host is
 * abstraktmg.com carries rel="nofollow noopener". Ratings are quoted as the review site prints them, dated, never invented.
 *
 *   abstraktmg.com/                                   H1, "commercial trades and B2B companies", rating badges, one client per trade per territory
 *   abstraktmg.com/outbound-pricing-packages/        $5,000/mo start, $6,500 bundle, work-free guarantee measured at year end,
 *                                                    territory exclusivity, 10 trades + 35 industries, 125 dials per appointment,
 *                                                    46% from nurture, 25-point scorecard, 500+ US team, 100,000+ meetings a year
 *   abstraktmg.com/b2b-appointment-setting/          Inbound SDR $1,000 on a 1-year agreement or $1,500 month to month, results build 6 to 12 months
 *   abstraktmg.com/industries/commercial-insurance-lead-generation/   insurance H1, "We don't sell leads", qualified definition,
 *                                                    $79K / $2.0M / 34 deals in 2 yrs, client videos from HVAC, roofing, IT, cleaning
 *   abstraktmg.com/appointment-setting-for-insurance-agencies/        life, health, P&C and commercial on one page
 *   clutch.co, bbb.org, trustpilot.com                 ratings and counts as printed on 2026-11-16
 *
 * Our side: offer-v3.md CURRENT INSURANCE OFFER (4,725 / 12 then 15 / 315 / 7-day refund / month to month / territory lock /
 * never resold / four-part qualified), InsuranceHome.tsx approved wording, industry-voice-2026-11-14.md 6e/6f.
 * "Leads" and "appointment setting" appear only as the search phrase or as Abstrakt's own words, never as what we sell.
 *
 * The five abstraktmg.com pages are listed inside the last section, not in `sources`, because the shared sources list
 * renders rel="noopener noreferrer" and every link to Abstrakt on this page must be nofollow.
 */

export const PAGE: SitePage = {
  path: '/abstrakt-alternative',
  title: 'Abstrakt Marketing Group reviews and an alternative built only for commercial insurance agencies',
  description:
    'What Abstrakt Marketing Group is, who it fits, what its public pages say about price, terms and guarantee, and how an insurance-only first-meeting service compares.',
  kind: 'answer',
  changeFrequency: 'monthly',
}

/* ------------------------------------------------------------- helpers */

function P({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <p className={className}>{children}</p>
}

/** Internal links plain; external links open in a new tab; every link whose host is abstraktmg.com is nofollow. */
function A({ href, children }: { href: string; children: React.ReactNode }) {
  const external = href.startsWith('http')
  const abstrakt = external && new URL(href).hostname.endsWith('abstraktmg.com')
  return (
    <a
      href={href}
      className="text-accent hover:underline underline-offset-4"
      {...(external ? { target: '_blank', rel: abstrakt ? 'nofollow noopener noreferrer' : 'noopener noreferrer' } : {})}
    >
      {children}
    </a>
  )
}

/** An anonymized buyer line or an attributed external quote. Same shape as the homepage Quote. */
function Quote({ text, who }: { text: string; who: React.ReactNode }) {
  return (
    <figure data-testid="buyer-quote" className="border-l-2 border-accent/60 pl-4 my-2">
      <blockquote className={`${SERIF} text-lg ${INK} leading-snug`}>&ldquo;{text}&rdquo;</blockquote>
      <figcaption className={`mt-2 text-xs ${MUTED}`}>{who}</figcaption>
    </figure>
  )
}

/** Server-rendered comparison table. Plain HTML so AI crawlers that run no JavaScript still read every cell. */
function Table({ caption, head, rows }: { caption: string; head: string[]; rows: React.ReactNode[][] }) {
  return (
    <div className={`my-2 rounded-card border ${LINE} bg-white overflow-x-auto`}>
      <table className="w-full text-sm text-left border-collapse">
        <caption className={`text-left px-4 pt-3 pb-2 text-xs ${MUTED}`}>{caption}</caption>
        <thead>
          <tr className={`border-b ${LINE}`}>
            {head.map((h, i) => (
              <th key={i} scope="col" className={`px-4 py-2 font-semibold ${INK} align-top`}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, ri) => (
            <tr key={ri} className={`border-b border-dotted ${LINE} last:border-0`}>
              {r.map((c, i) =>
                i === 0 ? (
                  <th key={i} scope="row" className={`px-4 py-2.5 font-semibold ${INK} align-top`}>
                    {c}
                  </th>
                ) : (
                  <td key={i} className={`px-4 py-2.5 ${MUTED} align-top leading-snug`}>
                    {c}
                  </td>
                ),
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

/* ------------------------------------------------------------- Abstrakt source links, read 2026-11-16 */

const AB = {
  home: 'https://www.abstraktmg.com/',
  pricing: 'https://www.abstraktmg.com/outbound-pricing-packages/',
  b2b: 'https://www.abstraktmg.com/b2b-appointment-setting/',
  insurance: 'https://www.abstraktmg.com/industries/commercial-insurance-lead-generation/',
  agencies: 'https://www.abstraktmg.com/appointment-setting-for-insurance-agencies/',
  clutch: 'https://clutch.co/profile/abstrakt-marketing-group',
  bbb: 'https://www.bbb.org/us/mo/saint-louis/profile/advertising-agencies/abstrakt-marketing-group-llc-0734-310362736',
  trustpilot: 'https://www.trustpilot.com/review/www.abstraktmg.com',
}

const CHECKED = 'last checked 2026-11-16'

/* ------------------------------------------------------------- content */

const COMPARISON_HEAD = ['', 'Abstrakt Marketing Group', 'Maxionlabs']

/** Abstrakt cells: its pricing and insurance pages, last checked 2026-11-16 (the date is in the table caption). */
const COMPARISON_ROWS: React.ReactNode[][] = [
  [
    'Industries served',
    <>
      10 commercial trades plus 35 national B2B industries (<A href={AB.pricing}>pricing page</A>); a commercial insurance page exists; the
      agency page covers life, health, P&amp;C and commercial
    </>,
    'Independent commercial P&C and employee benefits agencies. Nothing else',
  ],
  [
    'How prospects are found',
    <>
      A target list built from company and decision-maker criteria; the <A href={AB.insurance}>insurance page</A> calls the x-date
      &ldquo;the most useful single fact on the account&rdquo;
    </>,
    'A public record that just changed for that business. No bought X-date or bureau lists',
  ],
  [
    'Who makes contact',
    'U.S.-based BDRs in St. Louis, calling every working day on recorded lines, plus email, direct mail and LinkedIn',
    'Email from domains we own, copy you approve. We call only owners who replied yes',
  ],
  [
    'How qualified is defined',
    <>
      &ldquo;The person who chooses the broker, at a business in your appetite, with a known renewal date far enough out to market the
      account and a stated reason to review&rdquo;; graded on a 25-point scorecard
    </>,
    'Four tests signed first: premium above your floor, renewal within 3 months, your appetite by line, decider in the meeting',
  ],
  [
    'Pricing publicly stated',
    <>Yes. Outbound BDR &ldquo;starting at $5,000 per month&rdquo;; bundle from $6,500</>,
    'Yes. $4,725 a month for 15 qualified first meetings (12 in month one); $12,500 for 90 days prepaid',
  ],
  [
    'Contract terms publicly stated',
    'Partly. Guarantee measured at year end; Inbound add-on on a one-year agreement or month to month; Outbound BDR term not published',
    'Month to month, paid upfront, cancel any month. No setup fee, no share of commission',
  ],
  [
    'Guarantee',
    <>&ldquo;If we miss the number by the end of the year, we work for free until we hit it.&rdquo; Refund not published</>,
    '$315 off the next invoice per meeting short of 15, every month. 7-day full refund. No-shows replaced',
  ],
  ['Exclusivity', <>&ldquo;One client per trade per territory&rdquo;</>, 'Your counties locked to you; your meetings never offered to another agency'],
]

const CHOOSE_HEAD = ['Choose Abstrakt if', 'Choose Maxionlabs if']

const CHOOSE_ROWS: React.ReactNode[][] = [
  ['You sell more than insurance, or own a trades business as well', 'You run an independent commercial P&C or benefits agency and nothing else'],
  ['You want a phone team dialling every working day in your name', 'You do not want cold calls going out under your agency name'],
  ['You want one vendor for outbound, website, SEO and collateral', 'You want one thing done, first meetings, and you already have a website'],
  ['A year-long measuring window suits how you plan', 'You want the count checked monthly, with cash back on each miss'],
  ['Your accounts are small and volume is the game', 'Your floor is $25,000 in premium or 20 enrolled lives, and the meeting has to clear it'],
]

export const CONTENT: AnswerPageProps = {
  eyebrow: 'Comparison for agency owners',
  h1: 'Abstrakt Marketing Group reviews, and when a commercial insurance agency wants something built only for insurance',
  lede:
    'Abstrakt Marketing Group is a St. Louis outsourced sales development company that books meetings by phone for commercial trades and B2B companies across 45 listed industries, one of them commercial insurance. Outbound BDR starts at $5,000 a month, and if they miss the agreed number by the end of the year they work for free until they hit it. A fair pick if you sell several things or want a phone team in your name. Maxionlabs does one thing: first meetings with owners above your premium floor, for independent commercial P&C and benefits agencies only, $4,725 a month, month to month, $315 back per missed meeting. If you are a solo agent or a personal lines shop, neither of us is built for you.',
  updated: '2026-11-16',
  path: '/abstrakt-alternative',
  sections: [
    {
      id: 'what-abstrakt-is',
      heading: 'Abstrakt Marketing Group is a 500-person outsourced BDR company that books meetings by phone across 45 industries.',
      body: (
        <>
          <P>
            Their own pages first, because that is what you can check. The homepage headline is &ldquo;The business growth
            company&rdquo; and under it: &ldquo;We book sales appointments for commercial trades and B2B companies&rdquo; (
            <A href={AB.home}>abstraktmg.com</A>, {CHECKED}). The <A href={AB.pricing}>pricing page</A> gives the scale: &ldquo;100,000+
            meetings booked a year&rdquo;, &ldquo;500+ U.S.-based team members&rdquo;, &ldquo;17+ years on the phones&rdquo;, as of October
            2026.
          </P>
          <P>
            The method is phone first. Reps call from St. Louis every working day on recorded lines, backed by short emails, direct
            mail and LinkedIn. Their own arithmetic: 125 dials per appointment, eight calls on average to reach a decision-maker, 46%
            of appointments from nurture. Every booked meeting is graded on a 25-point scorecard by someone who did not make the call.
          </P>
          <P>
            Insurance is one vertical among many. The pricing page lists 10 trades and 35 national industries, insurance in neither,
            but a <A href={AB.insurance}>commercial insurance page</A> exists and opens with:
          </P>
          <Quote
            text="We don't sell leads. We deliver qualified buyers."
            who={
              <>
                Abstrakt Marketing Group, <A href={AB.insurance}>commercial insurance page</A>, read 2026-11-16
              </>
            }
          />
          <P>
            That page defines a qualified insurance appointment properly, talks about x-dates and appetite in the right words, and
            quotes aggregate numbers: $79K average deal, $2.0M largest deal, 34 deals closed in two years. The client videos on it are
            from HVAC, roofing, IT and cleaning companies; I could not find a named insurance agency case study there as of 2026-11-16.
          </P>
        </>
      ),
    },
    {
      id: 'who-abstrakt-fits',
      heading: 'Abstrakt is the better pick when you sell several things, want the phone worked daily in your name, or want one vendor for everything.',
      body: (
        <>
          <P>
            If the agency is one of several businesses you own, a benefits shop next to a payroll company, say, a vendor running 45
            industries on one process is a real advantage. We only know insurance.
          </P>
          <P>
            If you want the phones worked every working day by US callers introducing themselves as your agency, Abstrakt has done
            that for 17 years. We do not cold call and never send under your agency name, so if daily dials in your name is what you
            are buying, we are the wrong shop.
          </P>
          <P>
            If you want the website, local SEO and sales collateral from the same company, their bundle does it from $6,500 a month (
            <A href={AB.pricing}>pricing page</A>, {CHECKED}); the Inbound SDR piece is $1,000 a month on a one-year agreement or $1,500
            month to month (<A href={AB.b2b}>appointment setting page</A>, {CHECKED}). And if your accounts are small and volume is the
            game, their model fits better. We refuse anything under your premium floor, so fewer meetings on purpose.
          </P>
        </>
      ),
    },
    {
      id: 'what-we-are',
      heading: 'Maxionlabs books first meetings only for commercial P&C and benefits agencies, starting from a public record, by email first.',
      body: (
        <>
          <P>
            Now us, in the same plain terms. We work with independent commercial P&amp;C and employee benefits agencies, roughly $2M
            to $15M in revenue, at least two producers besides the owner. The full service is
            on <A href="/commercial-insurance-appointment-setting">the service page</A>, the terms in detail on <A href="/pricing">the pricing page</A>.
          </P>
          <P>
            We start from a public record that just changed for a business in your territory: a new operating authority, a
            contractor licence, a Form 5500 plan year, an OSHA citation. We email the owner about it, from domains we own, with copy
            you approved. Every yes gets a call from us, not to sell, to confirm the meeting, take the renewal date and check
            premium, line, county and who signs against your rules. Only a match reaches your producer&apos;s calendar, brief first.
          </P>
          <P>
            You pay $4,725 a month, month to month, for 15 qualified first meetings (12 in month one). Each one short is $315 off the
            next invoice, the first 7 days refundable in full. Your counties are locked to you, your meetings never offered to anyone
            else. One agency president put what he needs from us better than I can:
          </P>
          <Quote text="If you just get us in the room, that's where we're good." who="President, commercial P&C agency, Tennessee, on our first call" />
        </>
      ),
    },
    {
      id: 'side-by-side',
      heading: 'Side by side, the differences are industry focus, the channel, the contract clock and how a miss is settled.',
      body: (
        <>
          <P>
            Every Abstrakt cell is quoted or paraphrased from the page linked in it, read on 2026-11-16. Where their pages do not state
            something, the cell says so.
          </P>
          <Table
            caption="Abstrakt Marketing Group and Maxionlabs on the eight things an owner asks about first. Abstrakt column: its public pages, last checked 2026-11-16."
            head={COMPARISON_HEAD}
            rows={COMPARISON_ROWS}
          />
        </>
      ),
    },
    {
      id: 'qualified-and-the-window',
      heading: 'Both companies define qualified in writing, and the definitions are close, so the thing to read is the measuring window.',
      body: (
        <>
          <P>
            I expected the definitions to be far apart. They are not. Theirs: the person who chooses the broker, in your appetite, a
            known renewal date with runway, a stated reason to review. Ours: premium above your floor, renewal within 3 months, your
            appetite by line, decider in the meeting. Basically the same four ideas. Theirs is graded by their reviewer; ours is a
            four-line test you sign before the first email, and a meeting that fails a line is replaced.
          </P>
          <P>
            So the difference is when you find out. Abstrakt&apos;s pricing page: &ldquo;if we miss the number by the end of the year, we
            work for free until we hit it&rdquo; ({CHECKED}), and its appointment setting page adds that &ldquo;outbound results build over
            6 to 12 months&rdquo;. A reasonable way to run a phone programme. It also means the count may first be formally settled
            twelve months in.
          </P>
          <P>
            We settle every month. 15 is the number, each miss is $315 back, and if month two is bad you leave in month three. A yearly
            window gives the vendor room to nurture, which Abstrakt says produces 46% of its appointments. A monthly window gives the
            owner an exit.
          </P>
        </>
      ),
    },
    {
      id: 'price-and-terms',
      heading: 'Abstrakt starts at $5,000 a month measured over a year; Maxionlabs is $4,725 a month measured every month.',
      body: (
        <>
          <P>
            The monthly prices are close, $5,000 against $4,725, so the headline should not decide this. Abstrakt&apos;s $5,000 buys a
            flat programme with a BDR team, a partner success manager, weekly coaching, a results portal, and an appointment number &ldquo;based on your industry&rdquo; in your agreement (<A href={AB.pricing}>pricing page</A>
            , {CHECKED}). The insurance number is not published, so I will not guess it.
          </P>
          <P>
            Our $4,725 buys 15 qualified first meetings a month, the map of every business in your territory and lines that clears your
            floor as CSV files you keep, a renewal calendar built from the dates owners give us, and territory lock. No setup fee, no
            share of commission. A quarter at once is $12,500 for 90 days.
          </P>
          <P>
            On terms, Abstrakt publishes the guarantee mechanism and a one-year price for its Inbound add-on, but I could not find the
            Outbound BDR contract length as a number, so that line is &ldquo;not published&rdquo;; ask on the strategy call and get it in
            writing. Ours is month to month, refund and credit written in before anything sends.
          </P>
        </>
      ),
    },
    {
      id: 'public-reviews',
      heading: 'The public reviews are real and mostly about account managers, and none we could open came from an insurance agency.',
      body: (
        <>
          <P>
            If you searched &ldquo;abstrakt marketing group reviews&rdquo; or &ldquo;abstrakt marketing reviews reddit&rdquo;, this is
            what you can verify yourself. Clutch: 4.6 from 45 reviews, $1,000 minimum project, $100 to $149 an hour (
            <A href={AB.clutch}>Clutch</A>). BBB: A+, accredited since 2015, 17 years in business (<A href={AB.bbb}>BBB</A>). Trustpilot:
            TrustScore 4 from 54 reviews (<A href={AB.trustpilot}>Trustpilot</A>). All read 2026-11-16. We did not open a Reddit thread we
            could stand behind, so none is quoted.
          </P>
          <P>The praise is mostly about the people running the account:</P>
          <Quote
            text="Abstrakt has been a great partner for us. Getting started took a little time, but once things got into a rhythm, it really clicked."
            who={
              <>
                Five-star review on <A href={AB.trustpilot}>Trustpilot</A>, read 2026-11-16
              </>
            }
          />
          <P>
            On the Clutch industry filter the reviews sit under business services, IT, cleaners, manufacturing, financial services,
            roofing, electric, contracting, HVAC, construction and telecoms; insurance is not a listed industry there as of 2026-11-16.
            It matches what their site says they are. It does mean that to hear from an agency owner who used them you
            will have to ask Abstrakt for a reference, and you should. Ask us the same. Our insurance results are young and we say so
            on the homepage, where the real owner replies sit with names removed.
          </P>
        </>
      ),
    },
    {
      id: 'choose',
      heading: 'Choose Abstrakt if you want breadth and the phone; choose Maxionlabs if you want insurance only, by email, checked monthly.',
      body: (
        <>
          <Table caption="Which one fits, by the situation you are in. Not a ranking." head={CHOOSE_HEAD} rows={CHOOSE_ROWS} />
          <P>
            If the right-hand column is you, the next step is a 20-minute call with me, not a sales rep. I will ask about your lines,
            territory and premium floor, pull your state from the public records, and show you how many owners are showing a trigger
            right now.
          </P>
          <P className={`text-sm ${MUTED}`}>Abstrakt pages this comparison reads, all opened 2026-11-16:</P>
          <ul className={`list-disc pl-5 flex flex-col gap-1 text-sm ${MUTED}`} data-testid="abstrakt-pages">
            <li>
              <A href={AB.home}>Homepage</A>
            </li>
            <li>
              <A href={AB.pricing}>Outsourced BDR pricing</A>
            </li>
            <li>
              <A href={AB.b2b}>B2B appointment setting</A>
            </li>
            <li>
              <A href={AB.insurance}>Commercial insurance lead generation</A>
            </li>
            <li>
              <A href={AB.agencies}>Appointment setting for insurance agencies</A>
            </li>
          </ul>
          <P className="text-xs">
            Comparison based on Abstrakt Marketing Group&apos;s public pages and the review profiles linked above, as read on 2026-11-16.
            Corrections welcome at maksym@maxionlabs.com.
          </P>
        </>
      ),
    },
  ],
  faq: [
    {
      q: 'What does Abstrakt Marketing Group do?',
      a: 'A St. Louis outsourced sales development company. U.S.-based reps call decision-makers every working day, backed by email, direct mail and LinkedIn, and book sales appointments for commercial trades and B2B companies across 45 listed industries. Source: abstraktmg.com, read 2026-11-16.',
    },
    {
      q: 'How much does Abstrakt Marketing Group cost?',
      a: 'Its pricing page says Outbound BDR starts at $5,000 per month; the bundle with Inbound SDR and Brand Boost starts at $6,500. The appointment number for your industry goes in your agreement and is not published. Read 2026-11-16.',
    },
    {
      q: 'Is Abstrakt Marketing Group a good fit for an insurance agency?',
      a: 'It has a commercial insurance page with a sensible qualified definition and aggregate insurance results. The client videos and Clutch reviews we could open on 2026-11-16 were from trades and B2B companies. If you want a phone-first team across several businesses, it fits; if you want a service built only for commercial P&C and benefits, that is us.',
    },
    {
      q: 'Are there Abstrakt Marketing Group reviews on Reddit?',
      a: 'The query autocompletes in Google, but we did not find a Reddit thread we could open and stand behind, so none is quoted. The pages we did open on 2026-11-16 are Clutch (4.6 from 45 reviews), BBB (A+, accredited since 2015) and Trustpilot (TrustScore 4 from 54 reviews).',
    },
  ],
  /** Third-party and public-record sources. The abstraktmg.com pages are listed in the last section with nofollow (see file comment). */
  sources: [
    {
      label: 'Clutch, Abstrakt Marketing Group profile: 4.6 from 45 reviews, $1,000+ minimum project, $100 to $149 per hour, 250 to 999 employees, founded 2009, industry filter (read 2026-11-16)',
      url: AB.clutch,
    },
    {
      label: 'Better Business Bureau, Abstrakt Marketing Group LLC: A+ rating, accredited since 7/2/2015, 17 years in business (read 2026-11-16)',
      url: AB.bbb,
    },
    {
      label: 'Trustpilot, Abstrakt Marketing Group: TrustScore 4, 54 reviews, quoted five-star review (read 2026-11-16)',
      url: AB.trustpilot,
    },
    {
      label: 'U.S. Department of Transportation, FMCSA Company Census File (new operating authorities)',
      url: 'https://data.transportation.gov/Trucking-and-Motorcoaches/Company-Census-File/az4n-8mr2',
    },
    {
      label: 'U.S. Department of Labor, EFAST Form 5500 search (plan years)',
      url: 'https://www.efast.dol.gov/5500Search/',
    },
  ],
}
