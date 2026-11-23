import type { SitePage } from '@/lib/site-pages'
import type { AnswerPageProps } from '@/components/answer/AnswerPage'
import { PRICE_FLEX_LINE } from '@/lib/pricing-copy'
import { LINE, MUTED, INK, SERIF } from '@/components/home/InsuranceHome'
import { ValuationTurnVsAccounts } from '@/components/drawings'
import { ValuationCalculator } from '@/components/answer/ValuationCalculator'

/**
 * Answer page for the owner search "insurance agency valuation" (Serpstat 140 a month US, cluster 220, treg
 * 2026-11-23; seo-next-targets-2026-11-16.md, MAX-738). Angle from Max, 2026-11-23: what a year of new commercial
 * business does to your multiple. Awareness traffic from an exit-minded owner, ICP-adjacent. We are not an M&A advisor
 * and the page says so in the eyebrow and the last section. "Insurance agency perpetuation plan" (autocomplete only,
 * no Serpstat row) is folded in as a section, per the 2026-11-16 target doc.
 *
 * Every number was opened live on 2026-11-23, passage read:
 *  - 6x to 9x EBITDA small to midsized generalist agencies, 10x to 13x larger growth-oriented commercial lines agencies
 *    in major metros; growth plus retention likely to earn higher multiples; succession plan and leadership depth
 *    rewarded; thin production teams get lower valuations: IA Magazine, Jeff Smith, 11 Mar 2026 (source 1)
 *  - average EBITDA multiple about 8.5x, external sale revenue multiples 3.0x, EBITDA margin about 27%; about 37% of
 *    principals over 61: IA Valuations, Valuation Views 2026 Q1 (source 2)
 *  - "two times revenue" is an expression of value, a valuation is a calculation of it; two agencies at $1.5M revenue,
 *    25% and 12% margin, the better one ahead on organic growth, key accounts, perpetuation planning and talent: IA
 *    Valuations, The Valuation Rule of Thumb (source 3)
 *  - buyers scrutinizing organic growth rate harder than ever in 2026; headline multiples not always achievable: Agency
 *    Brokerage, The Truth About EBITDA Multiples (source 4)
 *  - only six in 10 firms have a defined plan for transitioning retiring producers' books, three in 10 have chosen a
 *    future CEO or have a leadership development program, MarshBerry as cited by iWins, 10 Nov 2026; start 10 to 15
 *    years before a transition (source 5)
 * The arithmetic is ours and labelled an illustration: $3M revenue x 27% = $810,000 EBITDA; x 8.5 = about $6.9M; one
 * turn = $810,000; 8 accounts and $25,000 of commission a year x 27% = $6,750, x 8.5 = $57,375, about $57,000. The 8
 * accounts and $25,000 are the same illustration as /why-insurance-agency-stopped-growing (offer-v3: 42 meetings, 1 in 5
 * close, assumed). No published figure says how much a year of growth moves the multiple; the page says that.
 * No client result is claimed. No price is quoted; PRICE_FLEX_LINE is the canonical line.
 */

export const PUBLISHED = '2026-11-23'
export const UPDATED = '2026-11-23'

export const PAGE: SitePage = {
  path: '/insurance-agency-valuation',
  title: 'Insurance agency valuation and what new business adds',
  description:
    'What a year of new commercial business does to your insurance agency valuation, with sourced multiples and the arithmetic. Plus the perpetuation plan.',
  kind: 'answer',
  changeFrequency: 'monthly',
  updated: UPDATED,
  targetQuery: 'insurance agency valuation',
}

const TH = `text-left align-top px-3 py-2.5 text-xs uppercase tracking-wide ${MUTED} font-medium border-b ${LINE}`
const TD = `align-top px-3 py-2.5 text-sm ${INK} border-b ${LINE}`

function Table({ caption, head, rows }: { caption: string; head: string[]; rows: string[][] }) {
  return (
    <div className="-mx-2 overflow-x-auto">
      <table className="min-w-full border-collapse">
        <caption className={`text-left text-sm ${MUTED} pb-2 px-3`}>{caption}</caption>
        <thead>
          <tr>
            {head.map((h, i) => (
              <th key={i} scope="col" className={TH}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r[0] + r[1]}>
              {r.map((c, i) => (
                <td key={i} className={`${TD} ${i === 0 ? 'font-semibold' : ''}`}>
                  {c}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function Idea({ children }: { children: React.ReactNode }) {
  return <p className={`${SERIF} text-xl md:text-2xl ${INK} leading-snug`}>{children}</p>
}

const A = 'text-accent hover:underline underline-offset-4'

export const CONTENT: AnswerPageProps = {
  eyebrow:
    'For owners of independent commercial P&C and benefits agencies thinking about a sale or a perpetuation plan. Not a valuation, and we are not an M&A advisor. Not for solo agents or personal lines shops.',
  h1: 'What a year of new commercial business does to your insurance agency valuation',
  lede:
    "Less than most owners hope. Say a $3M commercial agency adds 8 accounts and $25,000 of commission in a year. At today's average margin and multiple that is about $57,000 of value, and one more turn of the multiple is about $810,000. Nobody publishes how much a year of growth moves the multiple, so I'm not going to make that number up.",
  published: PUBLISHED,
  updated: UPDATED,
  sections: [
    {
      id: 'the-multiple',
      heading: 'Your agency is worth earnings times a multiple',
      body: (
        <>
          <p>
            Buyers price an agency on EBITDA, your earnings after a normal salary for you, times a multiple. Owners say
            a multiple of revenue because it is quicker. The multiple is the part everybody argues about, and the
            published ranges disagree because they measure different agencies.
          </p>
          <Table
            caption="Published multiples, read live on 23 November 2026. None of these is your agency."
            head={['Source', 'The multiple', 'Which agencies']}
            rows={[
              ['IA Valuations, March 2026', '6x to 9x EBITDA', 'Small to midsized generalist agencies'],
              [
                'IA Valuations, March 2026',
                '10x to 13x EBITDA',
                'Larger, growth-oriented commercial lines agencies in major metros, with strong leadership',
              ],
              [
                'IA Valuations, Q1 2026',
                'About 8.5x EBITDA, 3.0x revenue on external sales',
                'Average across revenue categories, EBITDA margin about 27%',
              ],
            ]}
          />
          <p>
            A valuation firm prices yours. We don&apos;t.
          </p>
        </>
      ),
    },
    {
      id: 'two-agencies',
      heading: 'Same revenue, very different price',
      body: (
        <>
          <p>
            IA Valuations has an example I like. Two agencies, each $1.5M of revenue, each owner sure the agency is
            worth two times revenue.
          </p>
          <p>
            Smith runs a 25% margin. Jones runs 12%, a lifestyle business, which makes some buyers stop. Smith is also
            ahead on organic growth, key accounts, perpetuation planning and young talent. Same revenue, and a buyer pays
            Smith more. Two times revenue undervalues one and overvalues the other.
          </p>
          <p>
            IA Valuations&apos; point is that a revenue multiple expresses value and a valuation calculates it. Growth is
            one of the things it calculates from.
          </p>
        </>
      ),
    },
    {
      id: 'a-year-of-new-business',
      heading: 'What a year of new commercial business adds',
      body: (
        <>
          <p>
            Take a $3M agency at the 27% average margin. That is $810,000 of EBITDA, and at 8.5x about $6.9M.
          </p>
          <p>
            Now say a year of new business is 8 accounts and $25,000 of commission. At the same margin that is $6,750 of
            earnings and about $57,000 of value. One more turn of the multiple is $810,000.
          </p>
          <ValuationTurnVsAccounts />
          <p>
            So the accounts barely move the number, and the multiple does. I looked for a published figure on how much a
            year of growth moves the multiple and couldn&apos;t find one. Those 8 accounts also cost producer pay and
            service, so their real margin is lower than the average. It&apos;s an illustration.
          </p>
        </>
      ),
    },
    {
      id: 'value-calculator',
      heading: "What a year of new commercial business adds to your agency's value",
      body: (
        <>
          <p>Put your own numbers in. It starts on the example above.</p>
          <ValuationCalculator />
        </>
      ),
    },
    {
      id: 'what-buyers-read',
      heading: 'What buyers read in the growth',
      body: (
        <>
          <p>
            The multiple isn&apos;t only size. IA Magazine, citing IA Valuations, says agencies that pair high retention
            with organic growth in the high single to double digits will likely get higher multiples. Agencies thin on
            production talent get lower valuations and less buyer interest.
          </p>
          <p>
            Agency Brokerage says buyers are scrutinizing organic growth rate harder than ever in 2026, and that a
            headline multiple isn&apos;t always one you can collect. For years rate did the growing for everybody. Now
            buyers want to see new accounts, and the{' '}
            <a href="/why-insurance-agency-stopped-growing" className={A}>
              why an agency stops growing page
            </a>{' '}
            has the three causes when they don&apos;t show up.
          </p>
          <p>
            One year of growth is one year. I&apos;d call it a start, not a re-rating.
          </p>
        </>
      ),
    },
    {
      id: 'perpetuation-plan',
      heading: 'A perpetuation plan needs new business the next owner can see',
      body: (
        <>
          <p>
            A perpetuation plan is who owns the agency after you. A producer, a partner, family or an outside buyer.
            IA Valuations puts about 37% of principals over 61, so this is the common case, not the odd one.
          </p>
          <p>
            Plenty of agencies haven&apos;t done all of it. MarshBerry has six in 10 firms with a defined plan for moving
            a retiring producer&apos;s book, and three in 10 with a future CEO chosen or a program to grow one. It
            recommends starting 10 to 15 years before the transition. IA Magazine says owners who build a succession
            plan and leadership continuity get rewarded with higher multiples.
          </p>
          <Idea>A successor buys a book that renews on its own, plus proof someone besides you can bring in new business.</Idea>
          <p>
            If every new account still comes in through your door, the plan has a hole. New business is the part you can
            start this quarter. The{' '}
            <a href="/hire-producer-or-book-meetings" className={A}>
              producer compensation and hiring page
            </a>{' '}
            covers who should own it.
          </p>
        </>
      ),
    },
    {
      id: 'who-this-is-for',
      heading: 'Who this is for, and what we do',
      body: (
        <>
          <p>
            We are not an M&A advisor, an appraiser or a broker, and this page isn&apos;t a valuation. If you&apos;re
            selling soon, get an advisor first.
          </p>
          <p>
            What we do is cold email to commercial owners in your territory. We confirm fit and timing, and a qualified
            sales meeting lands on your producer&apos;s calendar. {PRICE_FLEX_LINE} It&apos;s for independent commercial
            P&amp;C or benefits agencies with 2 or more producers, and it&apos;s{' '}
            <a href="/commercial-insurance-appointment-setting" className={A}>
              commercial insurance appointment setting
            </a>{' '}
            if you want the detail, or{' '}
            <a href="/pricing" className={A}>
              how it compares on price
            </a>
            .
          </p>
          <p>
            If you want more new business on the book before you sell or hand it over, see{' '}
            <a href="/" className={A}>
              qualified sales meetings for commercial insurance agencies
            </a>{' '}
            or{' '}
            <a href="/#book-call" className="underline underline-offset-2">
              book a call
            </a>
            .
          </p>
        </>
      ),
    },
  ],
  faq: [
    {
      q: 'How much is my insurance agency worth?',
      a: 'IA Valuations has small to midsized generalist agencies at 6x to 9x EBITDA and larger, growth-oriented commercial lines agencies in major metros at 10x to 13x, March 2026. Its average across revenue categories is about 8.5x EBITDA, or 3.0x revenue on external sales. Yours needs a valuation from a firm that does them. We do not.',
    },
    {
      q: 'Does organic growth raise an insurance agency’s multiple?',
      a: 'Buyers say it matters. IA Magazine expects high retention plus high single to double digit organic growth to earn higher multiples, and Agency Brokerage says buyers are scrutinizing organic growth harder than ever in 2026. Neither prices a year of growth in public, so any exact number you are told is a guess.',
    },
    {
      q: 'Is two times revenue a good rule of thumb for an insurance agency?',
      a: 'It is a shorthand. IA Valuations says a revenue multiple expresses value and a valuation calculates it, and shows two agencies at $1.5M of revenue that a buyer would price differently on margin, organic growth, key accounts and perpetuation planning. Its average external sale revenue multiple is 3.0x.',
    },
    {
      q: 'What is an insurance agency perpetuation plan?',
      a: 'The plan for who owns and runs the agency after you, whether that is a producer, a partner, family or an outside buyer. MarshBerry has only six in 10 firms with a defined plan for transitioning retiring producers’ books and three in 10 with a future CEO chosen. It suggests starting 10 to 15 years early.',
    },
    {
      q: 'Do you value agencies or advise on a sale?',
      a: 'No. We are not an M&A advisor or an appraiser. We run cold email that puts qualified sales meetings with new commercial owners on your producers’ calendars.',
    },
  ],
  sources: [
    {
      label:
        'IA Magazine, Jeff Smith, "4 Insurance Agency Valuations Trends to Watch" (11 Mar 2026), read 23 Nov 2026: EBITDA multiples 6x to 9x for small to midsized generalist agencies and 10x to 13x for larger growth-oriented commercial lines agencies in major metros, from IA Valuations; high retention plus organic growth in the high single to double digits likely to earn higher multiples',
      url: 'https://iamagazine.com/2026/03/11/4-insurance-agency-valuations-trends-to-watch',
    },
    {
      label:
        'IA Valuations, "Valuation Views 2026 Q1: Quarterly Marketplace Report," read 23 Nov 2026: average EBITDA multiple about 8.5x, external sale revenue multiples 3.0x, EBITDA margin about 27%, about 37% of agency principals over 61',
      url: 'https://iavaluations.com/valuation-views-2026-q1-quarterly-marketplace-report',
    },
    {
      label:
        'IA Valuations, "The Valuation Rule of Thumb," read 23 Nov 2026: a revenue multiple is an expression of value, a valuation a calculation; two agencies at $1.5M revenue, 25% and 12% EBITDA margin, compared on organic growth, key accounts, perpetuation planning and talent',
      url: 'https://iavaluations.com/the-valuation-rule-of-thumb',
    },
    {
      label:
        'Agency Brokerage, "Agency Valuations, The Truth About EBITDA Multiples," read 23 Nov 2026: buyers scrutinizing organic growth rate harder than ever, headline multiples not always achievable',
      url: 'https://agencybrokerage.com/resources/blog/agency-ebitda-multiples',
    },
    {
      label:
        'iWins, "Building an Agency Perpetuation Plan That Ensures Long-Term Operations" (10 Nov 2026), read 23 Nov 2026: MarshBerry, six in 10 brokerages have a defined plan for transitioning retiring producers’ books, three in 10 have a future CEO chosen or a program to develop one; MarshBerry recommends starting 10 to 15 years before a transition',
      url: 'https://iwins.com/blog/building-an-agency-perpetuation-plan-that-ensures-long-term-operations',
    },
    {
      label: 'Maxionlabs, pricing page: the standard plan, smaller plans and terms',
      url: 'https://www.maxionlabs.com/pricing',
    },
  ],
}
