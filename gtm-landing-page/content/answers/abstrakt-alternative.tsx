import type { SitePage } from '@/lib/site-pages'
import type { AnswerPageProps } from '@/components/answer/AnswerPage'
import { INK, LINE, MUTED, SERIF } from '@/components/home/InsuranceHome'
import { AbstraktTwoRoutes, AbstraktTwoClocks, AbstraktPriceStack } from '@/components/drawings'

/**
 * Comparison page for the "abstrakt marketing group reviews" cluster (search-demand row 9, MAX-738).
 *
 * v2, 2026-11-16: same rules as v1 (content/answers/_archive/abstrakt-alternative.v1.tsx), rewritten in the voice and
 * plain-book format of the pilot /hire-producer-or-book-meetings: one owner problem, a named framework (the four-question
 * vendor test), an owner story with stakes, three captioned drawings, every paragraph as Max would say it to an owner on
 * a call with the filler stripped (brand/voice.md TALK TEST, _system/harness/grokbot/VOICE.md, voice_examples.py).
 *
 * Rules of the page, kept from v1:
 *  - Every Abstrakt fact was read on 2026-11-16 from the page linked next to it (curl, this session). Where a fact is not
 *    on a public page the page says "not published". Abstrakt's own words appear only inside quotes.
 *  - Every link whose host is abstraktmg.com carries rel="nofollow noopener noreferrer". The abstraktmg.com pages are
 *    listed in the last section, not in `sources`, because the shared sources list renders rel="noopener noreferrer".
 *  - Abstrakt's strengths stated fairly, a "choose Abstrakt if" column, no ranking, no "best", no adjectives about them.
 *  - Ratings quoted as the review site printed them on 2026-11-16 (Clutch, BBB and Trustpilot block curl; the dumps
 *    read at 00:19 that day are the source). "insurance" appears 0 times on all three profiles.
 *
 *   abstraktmg.com/                                   "The business growth company", "We book sales appointments for
 *                                                    commercial trades and B2B companies", 2,000 clients, 500+ team
 *   abstraktmg.com/outbound-pricing-packages/        Outbound BDR "Starting at $5,000 per month", bundle $6,500, number
 *                                                    agreed in writing, miss by year end = work free, 10 trades + 35
 *                                                    industries, 125 dials per appointment (78 to 169 by industry), 8 calls
 *                                                    to reach a decision-maker, 46% from nurture, 25-point scorecard, 6 to
 *                                                    12 months, partner success manager, Salesforce/ZoomInfo/Gong, figures
 *                                                    "as of October 2026"
 *   abstraktmg.com/b2b-appointment-setting/          Inbound SDR +$1,000 on a 1-year agreement or $1,500 month to month
 *   abstraktmg.com/industries/commercial-insurance-lead-generation/   "We don't sell leads. We deliver qualified buyers.",
 *                                                    the qualified definition, x-date line, $79K / $2.0M / 34 deals (2 yrs)
 *   abstraktmg.com/appointment-setting-for-insurance-agencies/        life, health, P&C and commercial on one page
 *
 * Our side: 00_foundation/offer-v3.md CURRENT INSURANCE OFFER only. 15 qualified sales meetings a month held live, 12 in
 * month one, $4,725 month to month, $315 per miss, $12,500 for 90 days prepaid (the pilot page's live price
 * card), territory lock, never resold. $25,000 in premium or 20 lives is a floor. Money over 3 months, gross before
 * producer pay, no lifetime total. "Leads" and "appointment setting" appear only as the search phrase or as Abstrakt's words.
 *
 * Voice pass 2026-11-16: prose re-said in Max's register (brand/voice-core.md), colon setups removed, concessions to
 * Abstrakt kept fair. Every Abstrakt fact, date, quote and nofollow link unchanged.
 */

export const PAGE: SitePage = {
  path: '/abstrakt-alternative',
  title: 'Abstrakt Marketing Group reviews and an alternative built only for commercial insurance agencies',
  description:
    'What Abstrakt Marketing Group is, who it fits, what its pages say about price, terms and guarantee, and the four-question vendor test to run on them and on us.',
  kind: 'answer',
  changeFrequency: 'monthly',
  targetQuery: 'abstrakt marketing group reviews',
}

/* ------------------------------------------------------------- helpers */

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

/** An anonymized owner line or an attributed external quote. Same shape as the pilot page. */
function Quote({ text, who }: { text: string; who: React.ReactNode }) {
  return (
    <figure data-testid="buyer-quote" className="border-l-2 border-accent/60 pl-4 my-2">
      <blockquote className={`${SERIF} text-lg ${INK} leading-snug`}>&ldquo;{text}&rdquo;</blockquote>
      <figcaption className={`mt-1.5 text-sm ${MUTED}`}>{who}</figcaption>
    </figure>
  )
}

/** The one-sentence idea that opens each section, set a little bigger so it reads as the point. */
function Idea({ children }: { children: React.ReactNode }) {
  return <p className={`${SERIF} text-xl md:text-2xl ${INK} leading-snug`}>{children}</p>
}

/** Server-rendered table. Plain HTML so AI crawlers that run no JavaScript still read every cell. */
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

const READ = 'read 2026-11-16'

/* ------------------------------------------------------------- tables */

const COMPARISON_HEAD = ['', 'Abstrakt Marketing Group', 'Maxionlabs']

/** Abstrakt cells: its pricing, b2b and insurance pages, read 2026-11-16 (the date is in the caption). */
const COMPARISON_ROWS: React.ReactNode[][] = [
  [
    'Who they serve',
    <>
      10 trades plus 35 B2B industries (<A href={AB.pricing}>pricing page</A>), and a commercial insurance page
    </>,
    'Independent commercial P&C and benefits agencies only',
  ],
  [
    'How the owner is reached',
    'U.S. callers in St. Louis, every working day, in your name',
    'Email from domains we own, off a public record, then a call to every yes',
  ],
  [
    'Price published',
    <>Yes. Outbound BDR &ldquo;starting at $5,000 per month&rdquo;; bundle from $6,500</>,
    'Yes. $4,725 a month, month to month, 15 qualified sales meetings (12 in month one); $12,500 for 90 days prepaid',
  ],
  ['When the count is checked', <>At year end; &ldquo;outbound results build over 6 to 12 months&rdquo;</>, 'Every month'],
  [
    'What happens on a miss',
    <>&ldquo;We work for free until we hit it.&rdquo; A refund is not published</>,
    '$315 off the next invoice per meeting short. No-shows replaced',
  ],
  ['Exclusivity', <>&ldquo;One client per trade per territory&rdquo;</>, 'Your counties locked to you, never resold'],
]

const CHOOSE_HEAD = ['Choose Abstrakt if', 'Choose Maxionlabs if']

const CHOOSE_ROWS: React.ReactNode[][] = [
  ['You sell more than insurance', 'You run an independent commercial P&C or benefits agency'],
  ['You want a phone team dialling daily in your name', 'You don’t want cold calls under your agency name'],
  ['You want one vendor for outbound, website, SEO and collateral', 'You want one thing done, qualified sales meetings'],
  ['A year-long measuring window suits you', 'You want the count checked monthly, cash back per miss'],
  ['Your accounts are small and volume is the game', 'Your floor is $25,000 in premium or 20 lives'],
]

/* ------------------------------------------------------------- content */

export const CONTENT: AnswerPageProps = {
  eyebrow: 'For owners of commercial P&C and benefits agencies with 2 or more producers. Not for solo agents or personal lines shops.',
  h1: 'Abstrakt Marketing Group reviews, and what you’re actually buying, from them or from us',
  lede:
    'Abstrakt Marketing Group is a 500-person phone team in St. Louis. They "book sales appointments for commercial trades and B2B companies", 45 industries, insurance one of them. Outbound BDR starts at $5,000 a month, checked at year end. Maxionlabs works only with commercial P&C and benefits agencies, emails owners off a public record, and sells 15 qualified sales meetings a month for $4,725, checked monthly, $315 back per miss. One four-question vendor test, run on both of us. If you sell several things or want a phone team in your name, Abstrakt fits better. If you’re a solo agent or a personal lines shop, neither of us is built for you.',
  updated: '2026-11-16',
  path: '/abstrakt-alternative',
  sections: [
    {
      id: 'what-abstrakt-is',
      heading: 'Abstrakt is a 500-person phone team in St. Louis, insurance one of 45 industries',
      body: (
        <>
          <p>
            The homepage says &ldquo;The business growth company&rdquo; (<A href={AB.home}>abstraktmg.com</A>), the{' '}
            <A href={AB.pricing}>pricing page</A> &ldquo;100,000+ meetings booked a year&rdquo; and &ldquo;500+ U.S.-based
            team members&rdquo;.
          </p>
          <p>
            Reps in St. Louis call every working day, 125 dials per appointment and 8 calls to reach a decision-maker. Every meeting is graded on a 25-point scorecard.
          </p>
          <p>
            Insurance is on neither pricing-page list, 10 trades and 35 industries, but a{' '}
            <A href={AB.insurance}>commercial insurance page</A> ({READ}) opens &ldquo;We don&apos;t sell leads. We
            deliver qualified buyers.&rdquo;
          </p>
          <p>It shows $79K average deal, $2.0M largest, 34 deals in 2 years.</p>
        </>
      ),
    },
    {
      id: 'the-vendor-test',
      heading: 'The four-question vendor test, run it on us too',
      body: (
        <>
          <Idea>Most owners I talk to have paid for appointments before and got burned on a question they never asked.</Idea>
          <Quote
            text="they would schedule a phone appointment for me, not a live appointment."
            who="Agency owner, on our first call. $1,200 a month, 12 phone appointments, none closed in six months, he stopped paying"
          />
          <p>Four questions, in writing, from any vendor, me included.</p>
          <ol className="list-decimal pl-5 flex flex-col gap-2">
            <li>Who do they serve, and how do they reach the owner? One industry or 45, phone or email.</li>
            <li>What counts as qualified, and who&apos;s in the room, the owner or a gatekeeper?</li>
            <li>When is the count checked, and can you leave after one month?</li>
            <li>What comes back if they miss in month two? Cash, free work, or a conversation.</li>
          </ol>
        </>
      ),
    },
    {
      id: 'who-and-how',
      heading: 'Questions 1 and 2. Abstrakt serves 45 industries by phone, we serve one by email',
      body: (
        <>
          <p>
            If you own several businesses, one vendor across 45 industries is worth real money. We only know commercial
            P&amp;C and benefits, $2M to $15M agencies.
          </p>
          <p>They&apos;ve dialled in your agency&apos;s name for 17 years. We don&apos;t dial at all.</p>
          <p>
            We watch public records in your territory, a new operating authority, a Form 5500 plan year, an OSHA
            citation, and email the owner from a domain we own. Every yes gets a call from us, then a brief for your
            producer (
            <A href="/commercial-insurance-appointment-setting">the service page</A>).
          </p>
          <AbstraktTwoRoutes />
          <p>
            On qualified, their <A href={AB.insurance}>insurance page</A> ({READ}) and ours agree, the decider in the
            room, your appetite, a renewal date, a reason to review. Get it in writing from whoever you hire, every miss
            is measured against it.
          </p>
        </>
      ),
    },
    {
      id: 'when-and-what-if',
      heading: 'Questions 3 and 4. Abstrakt checks the count at year end, we check every month',
      body: (
        <>
          <Idea>The two owners skip, and they decide whether you can get out.</Idea>
          <AbstraktTwoClocks />
          <p>
            In dollars. Month one with us is $4,725. Every meeting short of 15 (12 in month one) is $315 back, the credit
            guarantee, and the credit we owe is cash when you cancel, any month.
          </p>
          <p>
            Theirs is agreed in writing before launch and checked at year end (<A href={AB.pricing}>pricing page</A>),
            free work until they hit it, a refund not published. Neither is hidden, they just put the risk in different
            months.
          </p>
        </>
      ),
    },
    {
      id: 'price',
      heading: 'Abstrakt starts at $5,000 a month, we’re $4,725, the difference is underneath',
      body: (
        <>
          <p>
            Abstrakt&apos;s $5,000 buys a BDR team, a partner success manager, weekly floor coaching, the results portal
            and the tools (<A href={AB.pricing}>pricing page</A>, {READ}). The insurance number and contract length are
            not published, so ask.
          </p>
          <p>
            Our $4,725 adds the CSV of every business in your territory above your floor, and your counties locked, never
            resold. No setup fee, no share of commission, $12,500 for 90 days prepaid. The three-month math, 42
            meetings, 1 in 5, about 8 accounts, is on <A href="/pricing">the pricing page</A>, and{' '}
            <A href="/roi">the ROI calculator</A> runs it on your numbers.
          </p>
          <AbstraktPriceStack />
          <p>
            $25,000 in premium or 20 lives is a floor, a $75,000 account counts as one meeting, same price.
          </p>
        </>
      ),
    },
    {
      id: 'side-by-side',
      heading: 'Side by side, the six things owners ask first',
      body: (
        <>
          <Table
            caption="Abstrakt column from its public pages, read 2026-11-16."
            head={COMPARISON_HEAD}
            rows={COMPARISON_ROWS}
          />
        </>
      ),
    },
    {
      id: 'public-reviews',
      heading: 'The public reviews are real, none from an insurance agency we could open',
      body: (
        <>
          <p>
            On <A href={AB.clutch}>Clutch</A> it&apos;s 4.6 from 45 reviews. On <A href={AB.bbb}>BBB</A>, A+, accredited since 2015, 17 years in
            business. On <A href={AB.trustpilot}>Trustpilot</A>, TrustScore 4 from 54 reviews. All read 2026-11-16.
          </p>
          <Quote
            text="Abstrakt has been a great partner for us. Getting started took a little time, but once things got into a rhythm, it really clicked."
            who={
              <>
                Five-star review on <A href={AB.trustpilot}>Trustpilot</A>, {READ}
              </>
            }
          />
          <p>
            No insurance agency on any of the three profiles as of 2026-11-16. Ask Abstrakt for an agency reference, and ask us the same, ours are young.
          </p>
        </>
      ),
    },
    {
      id: 'choose',
      heading: 'Choose Abstrakt for breadth and the phone, Maxionlabs for insurance only, checked monthly',
      body: (
        <>
          <Table caption="Which one fits. Not a ranking." head={CHOOSE_HEAD} rows={CHOOSE_ROWS} />
          <p>
            If the right column is you, book 20 minutes{' '}
            <a href="/#book-call" className="underline underline-offset-2">
              with me
            </a>{' '}
            and I&apos;ll show you how many owners in your counties show a trigger today.
          </p>
          <p>If the left column is you, run the four questions on Abstrakt.</p>
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
          <p className="text-xs">
            From Abstrakt&apos;s public pages and the review profiles above, read 2026-11-16. Corrections to
            maksym@maxionlabs.com.
          </p>
        </>
      ),
    },
  ],
  faq: [
    {
      q: 'What does Abstrakt Marketing Group do?',
      a: 'A St. Louis sales development company, U.S. reps calling every working day to book “sales appointments for commercial trades and B2B companies” across 45 industries (abstraktmg.com, read 2026-11-16).',
    },
    {
      q: 'How much does Abstrakt Marketing Group cost?',
      a: 'Outbound BDR starts at $5,000 per month, the bundle with Inbound SDR and Brand Boost at $6,500 (pricing page, read 2026-11-16). The number for your industry is in your agreement, not published.',
    },
    {
      q: 'What does Abstrakt’s guarantee say?',
      a: 'Agreed in writing before launch, and “if we miss the number by the end of the year, we work for free until we hit it.” A refund is not published. Read 2026-11-16.',
    },
    {
      q: 'Is Abstrakt Marketing Group a good fit for an insurance agency?',
      a: 'It has a commercial insurance page with a sensible qualified definition. Phone-first across several businesses, it fits. Insurance only, checked every month, that’s us.',
    },
    {
      q: 'What do I risk in month one and month two with each?',
      a: 'Ours is $4,725 a month, month to month. $315 back per meeting short of 15 (12 in month one), unused credit in cash when you cancel, any month. Abstrakt’s is checked at year end, free work until they hit it, a refund not published (read 2026-11-16).',
    },
    {
      q: 'Are there Abstrakt Marketing Group reviews on Reddit?',
      a: 'We found none we could open and stand behind. The profiles we did open on 2026-11-16 are Clutch, BBB and Trustpilot, linked above.',
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
    {
      label:
        'Maxionlabs, published price and terms: $4,725 a month, or $12,500 for 90 days prepaid, 15 qualified sales meetings held live, $315 back per miss',
      url: 'https://www.maxionlabs.com/#price',
    },
  ],
}
