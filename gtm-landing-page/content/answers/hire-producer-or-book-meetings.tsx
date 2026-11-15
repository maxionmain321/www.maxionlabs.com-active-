import type { SitePage } from '@/lib/site-pages'
import type { AnswerPageProps } from '@/components/answer/AnswerPage'
import { LINE, MUTED, INK, SERIF } from '@/components/home/InsuranceHome'

/**
 * Answer page for the owner question "hire another producer, or get first meetings booked for the producers I
 * already have?" (search demand row 2, MAX-738). The alternative (hiring) is described fairly first, Maxionlabs
 * second. Every external number is in `sources`; offer numbers come from 00_foundation/offer-v3.md only.
 *
 * Research numbers used and where each was verified on 2026-11-15:
 *  - 45.5% producer success rate, 2023 Best Practices Study (Big I + Reagan): IA Magazine, Feb 2024 (source 1)
 *  - 57% validate, 2020 Best Practices Study (Big I + Reagan): ReSource Pro, Oct 2021 (source 2)
 *  - 56% of new producer hires successful over five years (Reagan): Insurance Journal, Jul 2017 (source 3)
 *  - draw, "$50-60-70,000 a year just to keep his bills paid", three to five years: IA Magazine, Apr 2019 (source 4)
 *  - $62,280 median wage, insurance sales agents, May 2025: BLS OOH (source 5)
 *  - setter maths, 50% close, $1,000 per sale, 3-4 a month vs 5-10 a year: Insurance Journal, Dec 2018 (source 6)
 *  - "hire a producer when you need new revenue and your service side can absorb more clients": IdealTraits (source 7)
 *  - pay structures in use, 2012 benchmark of 451 commercial producers: Insurance Business, Jan 2015 (source 8)
 * The 52% figure in the ops research file could not be traced to a live page, so it is not used here.
 */

export const PAGE: SitePage = {
  path: '/hire-producer-or-book-meetings',
  title: 'Hire another producer, or book meetings for the ones you have?',
  description:
    'The deciding test for agency owners: do you lack meetings or lack closers? Producer cost over 12 and 36 months, validation odds, and when hiring is right.',
  kind: 'answer',
  changeFrequency: 'monthly',
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
            <tr key={r[0]}>
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

function Quote({ text, who }: { text: string; who: string }) {
  return (
    <blockquote className="border-l-2 border-accent/60 pl-4 my-2">
      <p className={`${SERIF} text-lg ${INK} leading-snug`}>&ldquo;{text}&rdquo;</p>
      <footer className={`mt-1.5 text-sm ${MUTED}`}>{who}</footer>
    </blockquote>
  )
}

export const CONTENT: AnswerPageProps = {
  eyebrow: 'For owners of commercial P&C and benefits agencies with two or more producers. Not for solo agents.',
  h1: 'Should you hire another producer, or get first meetings booked for the producers you already have?',
  lede:
    'Short answer: it comes down to one test. Do you lack meetings or lack closers? If your producers hold few first meetings with accounts above your premium floor, you lack meetings, and another producer just adds another empty calendar. If qualified first meetings sit unworked and quotes go out late, you lack closers, and a hire is right. The test takes ten minutes. Written for the owner of an independent agency, two or more producers, mostly commercial. If you are a solo agent or sell personal lines, the maths here will not fit you.',
  updated: '2026-11-15',
  sections: [
    {
      id: 'one-question',
      heading: 'The real question is whether you lack meetings or lack closers, and most owners answer it wrong',
      body: (
        <>
          <p>
            When new business stalls, the default move is to hire. But a producer is
            a closer, and a closer with nobody to close is the most expensive seat in the building. So before you post
            the job, work out which input is actually missing.
          </p>
          <p>
            <strong>You lack meetings</strong> when the producers you already pay sit on service work and renewals,
            the first meetings they do hold were booked by you, and the pipeline is a list somebody pulled months ago
            that nobody works. Another producer joins the same empty calendar.
          </p>
          <p>
            <strong>You lack closers</strong> when qualified first meetings get pushed out two or three weeks because
            nobody can take them, quotes go out late, and your account managers are behind on certificates. Meetings
            are not the constraint there, hands are. Hire.
          </p>
          <p>
            Honestly, most agencies I talk to at $2M to $15M are in the first camp. The producers close fine once they
            are in the room, nobody owns the hour that gets them there.
          </p>
          <Quote
            text="the fact that they're warm and open to having a conversation, I'm telling you, if you just get us in the room, you know, that's where we're good."
            who="President, commercial P&C agency, Tennessee, on what he needs from us"
          />
        </>
      ),
    },
    {
      id: 'the-test',
      heading: 'Count last month’s first meetings with $25K+ accounts, and who booked them',
      body: (
        <>
          <p>Two numbers, one per producer. Pull them from the calendar, not from memory.</p>
          <ol className="list-decimal pl-5 flex flex-col gap-2">
            <li>
              How many first meetings did each producer hold last month with a business above your premium floor, say
              $25,000 in premium or 20 or more enrolled lives? Not renewal reviews or service calls.
            </li>
            <li>Who booked each one? The producer, a referral partner, you, or nobody because it came inbound.</li>
          </ol>
          <p>
            A handful across the whole team, most of them traced back to you or to referrals: you have a meetings
            problem. Your closers are fine, they are starved.
          </p>
          <p>
            Eight or ten qualified first meetings per producer and they still could not get to all of them, or the
            proposals they owe are weeks late: you have a capacity problem. That is the agency where another producer,
            or an account manager first, pays back.
          </p>
        </>
      ),
    },
    {
      id: 'validation-odds',
      heading: 'Roughly half of new producers never validate, and it takes about three years to find out',
      body: (
        <>
          <p>
            In the 2023 Best Practices Study from the Big
            &ldquo;I&rdquo; and Reagan Consulting, the producer success rate among Best Practices agencies averaged
            45.5% across all revenue categories. The 2020 study put validation at 57% across agencies of all sizes. A
            2017 Reagan report had 56% of new producer hires succeeding over the prior five years. Pick any of the
            three, you are flipping a coin on a hire you fund for years.
          </p>
          <p>
            And the clock is long. The people who train producers for a living put validation at about three years,
            and experienced hires still take around three. One agency leader in IA Magazine framed the deal he gives
            new producers like this:
          </p>
          <Quote text="They have three years to succeed but not three years to fail." who="Steve Goble, The Mahoney Group, in IA Magazine, February 2024" />
          <p>
            The useful part is you usually know earlier. Reagan Consulting&apos;s Brian McNeely, same piece:
            &ldquo;most firms know within six months to a year whether or not a producer&apos;s going to make
            it.&rdquo; So the real bet is six to twelve months of draw, benefits, a desk and your own time before the
            verdict, then two more years of ramp if the verdict is good.
          </p>
          <p>
            None of this says do not hire. It says a producer is a three-year, roughly even-odds bet. If what you are
            short of is meetings, you can test that in thirty days for a fraction of the cost.
          </p>
        </>
      ),
    },
    {
      id: 'cost-table',
      heading: 'What each option costs over 12 and 36 months, what happens if it fails, and what you keep',
      body: (
        <>
          <p>
            Illustration, not a quote. The producer column assumes a $60,000 draw, near the BLS median for insurance
            sales agents, $62,280 in May 2025, and inside the &ldquo;$50-60-70,000 a year just to keep his bills
            paid&rdquo; an agency owner gave IA Magazine for an experienced hire. It leaves out payroll tax, benefits,
            licensing, E&amp;O and the mentor&apos;s time, so the real figure runs higher. The Maxionlabs column is our
            published price.
          </p>
          <Table
            caption="Three ways to add new business. Producer and setter figures are illustrations built from the sources at the end."
            head={['', 'Hire another producer', 'In-house setter or VA', 'Maxionlabs']}
            rows={[
              [
                'Cash over 12 months',
                'About $60,000 in draw, before payroll tax, benefits, licensing and a mentor’s hours',
                'Salary or hourly pay plus a dialer, data and your management time',
                '$56,700 at $4,725 a month, or $50,000 on the 90-day prepay',
              ],
              [
                'Cash over 36 months',
                'Up to about $180,000 if the draw holds, less as commission replaces it in year two or three',
                'Three years of pay and tooling, plus a rehire each time the seat turns over',
                '$170,100 month to month, cancel any month',
              ],
              [
                'Time to first qualified meeting',
                'Weeks to months: licensing, onboarding, a list, then dials',
                'A few weeks once hired, if you write the list, the script and the qualification rule',
                'Inside the first 30 days. 12 qualified first meetings in month one, 15 a month after',
              ],
              [
                'Risk if it fails',
                'Roughly even odds they never validate. Six to twelve months of pay before you know, three years before they carry themselves',
                'Unqualified appointments that burn your producers’ time, and a seat that empties when the person leaves',
                '$315 back for every meeting we miss, a 7-day full refund for any reason, month to month. Worst case is one month’s fee minus the credits',
              ],
              [
                'What you keep',
                'If they validate: a book, renewals, a closer. If they leave, some of that book may go with them',
                'The list and the script, if you wrote them down',
                'The accounts your producers bound, the market map of every business in your appetite as files, and the renewal dates we confirmed along the way',
              ],
            ]}
          />
          <p>
            The twelve-month cash is close between the first and third columns, that is the honest read. The difference
            is what the year buys: a coin flip on a person who still needs meetings, or the meetings themselves.
          </p>
        </>
      ),
    },
    {
      id: 'when-to-hire',
      heading: 'Hiring another producer is the right call in these four situations',
      body: (
        <>
          <p>
            There are agencies where a producer is exactly right, and more meetings would make things worse.
          </p>
          <ol className="list-decimal pl-5 flex flex-col gap-2">
            <li>
              <strong>Your producers are full.</strong> They hold qualified first meetings every week, proposals go out
              on time, and the limit is hours in the day. IdealTraits puts it plainly: hire a producer when you need
              new revenue and your service side can absorb more clients. If service is already slipping, hire the
              account manager first.
            </li>
            <li>
              <strong>You are opening a new line, office or market</strong> and nobody on the team can run those
              meetings. Benefits into a P&amp;C shop, a trucking desk, a second city. A setter cannot close a line your
              agency does not know yet.
            </li>
            <li>
              <strong>The owner is the only closer</strong> and wants out of production. More meetings for you is more
              of the problem. You need a second person who can win in the room, then meetings for them.
            </li>
            <li>
              <strong>You have what a producer needs to validate:</strong> a mentor with time, cash to carry the draw
              for a year or two, and a plan for where their first meetings come from. The agencies beating the 45%
              number treat validation as a programme, not a hire.
            </li>
          </ol>
          <p>
            In the fourth case the hire and the meetings are not either-or. A new producer who walks into ten first
            meetings a month validates faster than one told to go build a list.
          </p>
        </>
      ),
    },
    {
      id: 'in-house-setter',
      heading: 'An in-house setter or VA is cheaper on paper and lives or dies on who manages it',
      body: (
        <>
          <p>
            The middle option, and a lot of owners try it. You hire a caller or a VA, hand them a list, they book.
            Randy Schwantz did the arithmetic in Insurance Journal in 2018: at a 50% close rate the cost of a sale
            comes to about $1,000, and a producer who was self-sourcing five to ten appointments a year could be taking
            three to four a month. The arithmetic works.
          </p>
          <p>
            What it leaves out is the management. Somebody has to build the list, define what qualifies, listen to
            calls, fix the script, and replace the person when they leave. That somebody is usually the owner, the one
            person whose hours were supposed to come back. The same column warns that low-cost telemarketing firms
            often produce unqualified appointments, and owners who tried one tell me the same thing in their own words.
          </p>
          <Quote
            text="we struggle with that. If we were good at that, we wouldn't need to pay you to do it."
            who="President, commercial P&C agency, Tennessee, on prospecting"
          />
          <p>
            So an in-house setter is right when the owner wants to run a sales-development function and has the list
            already. It is wrong when it is one more thing on the owner&apos;s desk.
          </p>
        </>
      ),
    },
    {
      id: 'worked-example',
      heading: 'A $25,000-premium account at 12% commission pays for a lot of first meetings',
      body: (
        <>
          <p>
            Illustration only, your numbers will differ. A commercial account at $25,000 in premium with a 12%
            commission is $3,000 of agency commission in year one, and roughly the same each year it renews, before
            producer pay and servicing.
          </p>
          <p>
            Say your producers close one in five qualified first meetings. Fifteen meetings a month is three bound
            accounts, about $9,000 of first-year commission against a $4,725 fee, with renewals stacking after that.
            One in four is nearly $11,000. One in ten and the month roughly breaks even on first-year commission and
            pays on renewal.
          </p>
          <p>
            The same $60,000 on a producer buys a person who might bring in a handful of accounts in year one, and
            might not. Neither path is free. One of them you can measure in thirty days.
          </p>
        </>
      ),
    },
    {
      id: 'where-maxionlabs-fits',
      heading: 'Where Maxionlabs fits: first meetings on the calendars of the closers you already pay for',
      body: (
        <>
          <p>
            We are the third column. We map every business in your territory that fits your appetite and premium
            floor, reach the owners by email, confirm fit and timing with the ones who reply, and book the first
            meeting straight onto your producer&apos;s calendar with a brief before each one. Your producers run the
            meeting and close. We never take the meeting.
          </p>
          <p>
            The terms: $4,725 a month, month to month, cancel anytime, no share of your commission. 15 qualified first
            meetings a month, 12 in month one while we ramp. Qualified is defined in your signed agreement: above your
            premium or group-size floor, inside your appetite, a need now or within three months, and the decider in
            the meeting. $315 back for every meeting we miss, a 7-day full refund for any reason. Territory lock, your
            counties, never resold to another agency.
          </p>
          <p>
            For: independent commercial P&amp;C or benefits agencies, roughly $2M to $15M, at least two producers
            besides the owner. Not for: solo agents, personal-lines-first shops, captives, and any agency whose
            producers are already full. If that last one is you, hire, and come back when the new producer&apos;s
            calendar has room.
          </p>
          <p>
            Not sure which camp you are in? Run the two-number test, book a call, bring the numbers. If you lack
            closers I will say so.
          </p>
        </>
      ),
    },
  ],
  faq: [
    {
      q: 'How much does it cost to hire a commercial insurance producer?',
      a: 'Plan on a draw or base near the BLS median for insurance sales agents, $62,280 in May 2025, and more for an experienced hire, which one agency owner put at $50,000 to $70,000 a year just to cover their bills, before payroll tax, benefits and licensing. Over three years that is roughly $180,000 of draw before commission replaces it.',
    },
    {
      q: 'How long does it take a new insurance producer to validate?',
      a: 'About three years, for new and experienced hires alike, and some agencies plan for up to five. Most know within six months to a year whether the producer will make it, according to Reagan Consulting.',
    },
    {
      q: 'What percentage of insurance producers validate?',
      a: 'Roughly half. The 2023 Best Practices Study from the Big I and Reagan Consulting found a 45.5% producer success rate. The 2020 study put it at 57%, and a 2017 Reagan report had 56% of new hires succeeding over five years.',
    },
    {
      q: 'Should I hire a producer or an account manager first?',
      a: 'If your producers are full and service keeps up, hire the producer. If clients wait on certificates and renewals, hire the account manager first, because a new producer brings in accounts your team cannot yet serve. If producers are not full and service is fine, neither hire fixes it. You lack meetings.',
    },
    {
      q: 'How should I pay a first producer, salary or commission?',
      a: 'Most agencies start a new producer on a salary or a 100% draw, then shift to commission as the book grows, usually from year two or three. A 2012 benchmark of 451 commercial producers found salary plus commission, straight commission and a draw against commission all in common use. Either way the owner funds the gap until validation.',
    },
  ],
  sources: [
    {
      label:
        'IA Magazine, "Road to Riches: Providing a Path to Producer Validation" (Feb 2024): 45.5% producer success rate in the 2023 Big I and Reagan Consulting Best Practices Study; three years to validate; Steve Goble and Brian McNeely quotes',
      url: 'https://www.iamagazine.com/?p=944',
    },
    {
      label:
        'ReSource Pro, "5 Strategies to Improve Producer Validation and Performance" (Oct 2021): 57% of producers validate, 2020 Big I and Reagan Consulting Best Practices Study',
      url: 'https://www.resourcepro.com/?p=12928',
    },
    {
      label:
        'Insurance Journal, "4 Ways to Help New Producers Beat the Odds" (Jul 2017): 56% of new producer hires successful over five years, Reagan Consulting',
      url: 'https://www.insurancejournal.com/magazines/ideaexchange/2017/07/24/458097.htm',
    },
    {
      label:
        'IA Magazine, "The Long Game: Compensating New Commercial Producers" (Apr 2019): 100% draw decreasing in year two or three; $50,000 to $70,000 a year for an experienced hire; three to five years to validate',
      url: 'https://www.iamagazine.com/?p=4176',
    },
    {
      label: 'U.S. Bureau of Labor Statistics, Occupational Outlook Handbook, Insurance Sales Agents: median annual wage $62,280, May 2025',
      url: 'https://www.bls.gov/ooh/sales/insurance-sales-agents.htm',
    },
    {
      label:
        'Insurance Journal, Randy Schwantz, "Should You Hire an Appointment Setter?" (Dec 2018): 50% close rate, about $1,000 per sale, three to four appointments a month versus five to ten a year self-sourced',
      url: 'https://www.insurancejournal.com/magazines/mag-ideaexchange/2018/12/17/511777.htm',
    },
    {
      label:
        'IdealTraits, "Producers vs CSRs: Which to Hire First" (Aug 2025): hire a producer when you need new revenue and your service side can absorb more clients; CSR first if both are true',
      url: 'https://idealtraits.com/blog/producers-vs-csrs-hiring-the-right-role-at-the-right-time/',
    },
    {
      label:
        'Insurance Business, "How commercial lines agents get paid" (Jan 2015): 2012 Commercial Lines Producer Benchmark Analysis, 451 producers, pay structures in use',
      url: 'https://www.insurancebusinessmag.com/us/news/breaking-news/how-commercial-lines-agents-get-paid-and-common-traits-of-top-producers-17463.aspx',
    },
    {
      label: 'Maxionlabs, published price and terms: $4,725 a month, 15 qualified first meetings, $315 back per miss, 7-day full refund',
      url: 'https://www.maxionlabs.com/#price',
    },
  ],
}
