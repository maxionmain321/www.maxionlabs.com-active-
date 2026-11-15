import type { SitePage } from '@/lib/site-pages'
import type { AnswerPageProps } from '@/components/answer/AnswerPage'
import { LINE, MUTED, INK, SERIF } from '@/components/home/InsuranceHome'

/**
 * Answer page for the owner question "why did my independent commercial agency stop writing new business?"
 * (search demand row 7, MAX-738). Three causes with a diagnostic table. Maxionlabs fits only the no-outbound cause
 * and the page says so. Every external number is in `sources`; offer numbers come from 00_foundation/offer-v3.md.
 *
 * Research numbers used and where each was opened on 2026-11-15:
 *  - 10.7% organic growth, driven by personal P&C and group benefits, commercial P&C slowed in every revenue
 *    category except $1.25M-$2.5M: IA Magazine, 2025 Best Practices Study release, Aug 2025 (source 1)
 *  - 6.2% to 10.2% range, down from 8.7% to 11.3%, six of seven bands slower, commercial slowed in all bands but
 *    one: IA Magazine, 2026 Best Practices Study update, Aug 2026 (source 2)
 *  - 11.2% Q2 2023 peak to 7.1% Q4 2025, Harrison Brooks quote: Insurance Journal, May 2026 (source 3)
 *  - 25-50% selling / 25-50% servicing, 83% vs about 30%, Armstrong quote: Insurance Journal, Dec 2013,
 *    ReSource Pro survey (source 4)
 *  - a hundred or a few hundred clients, lowest 5% of clients moved: Al Diamond, Big I Virtual University (source 5)
 *  - 80% of revenue from 20% of accounts: Randy Schwantz, Insurance Journal, Sep 2017 (source 6)
 *  - "a referral they once got", no process: Randy Schwantz, Insurance Journal, Aug 2018 (source 7)
 *  - Kevin Stipe, two or three years, hire more salespeople: Insurance Journal, Nov 2025 (source 8)
 *  - 45.5% producer success rate, 2023 Best Practices Study ("roughly even odds" in the table): IA Magazine, Feb 2024 (source 9)
 *  - $62,280 median wage, insurance sales agents, May 2025: BLS OOH (source 10)
 * Not used: the 71.6% "prospect under 10 hours a week" figure in the ops research file is not on the page it was
 * attributed to; the Rainmaker Advisory 64.3% pipeline figure (Digital Insurance, 2011) was cut for length.
 */

export const PAGE: SitePage = {
  path: '/why-insurance-agency-stopped-growing',
  title: 'Why your insurance agency stopped growing: 3 causes',
  description:
    'Why an independent commercial agency stops writing new business: producer capacity, no outbound, or book mix. How to tell which you have, what each fix costs.',
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
  eyebrow: 'For owners of independent commercial P&C and benefits agencies with two or more producers. Not for solo agents or personal lines shops.',
  h1: 'Why did your independent insurance agency stop growing, and which of the three causes is yours?',
  lede:
    'Short answer: an independent commercial agency stops writing new business for one of three causes. Producer capacity, where the people you pay to sell spend their week servicing the book. No outbound, where new business is referrals and nobody owns prospecting. Or book mix, where a few hundred small accounts eat the service hours. All three look the same from outside, flat new business, and the fix for one makes another worse. Below: how to tell which one you have, what each fix costs, and the Big I and Reagan Consulting benchmarks so you can see whether you are flat or just losing rate. If you are a solo agent or sell personal lines, the diagnosis will not fit you.',
  updated: '2026-11-15',
  sections: [
    {
      id: 'three-causes',
      heading: 'An agency stops writing new business for one of three causes, and the owner usually names the wrong one',
      body: (
        <>
          <p>
            When I ask an owner why new business went flat, I almost always get the market. But rate was never new
            business, it was premium growth on accounts you already had. So strip it out and ask a plainer question: how
            many first meetings with new commercial accounts did your agency hold last month, and who booked them? The
            answer puts you in one of three places.
          </p>
          <ol className="list-decimal pl-5 flex flex-col gap-2">
            <li>
              <strong>Producer capacity.</strong> The producers hold few first meetings because their week is
              renewals, certificates and remarkets. They can close. They are not in the room.
            </li>
            <li>
              <strong>No outbound.</strong> Nobody owns prospecting. New business is referrals, the odd inbound and
              whatever the owner does between fires.
            </li>
            <li>
              <strong>Book mix.</strong> The agency wrote everything that walked in, so hundreds of small accounts now
              take most of the service hours.
            </li>
          </ol>
          <p>
            They overlap, honestly. But one is the binding one, and you fix that one first. Hire a producer into a
            no-outbound agency and you get another empty calendar. Buy outbound into a capacity problem and the meetings
            sit unworked.
          </p>
        </>
      ),
    },
    {
      id: 'benchmarks',
      heading: 'The benchmarks say rate carried growth for three years, and commercial lines is where it slowed first',
      body: (
        <>
          <p>
            From the Big &ldquo;I&rdquo; and Reagan Consulting Best Practices Study. In the 2025 study, organic growth
            hit a record 10.7%, driven by personal P&amp;C and group benefits, while commercial P&amp;C revenue growth
            slowed in every revenue category except $1.25 million to $2.5 million. The 2026 update put organic growth at
            6.2% to 10.2% across the seven revenue bands, down from 8.7% to 11.3%, with commercial lines slowing in all
            bands but one. The reason given both years is a softening P&amp;C rate environment.
          </p>
          <p>
            Reagan&apos;s quarterly survey covers a longer window. Insurance Journal reported in May 2026 that organic
            growth for independent agencies and brokers peaked at 11.2% in the second quarter of 2023 and was down to
            7.1% by the fourth quarter of 2025. Reagan partner Harrison Brooks, on an InsurBanc webinar:
          </p>
          <Quote
            text="What this signals to me, in a softening P&C environment, I would bet that organic growth is going to continue to go down."
            who="Harrison Brooks, partner, Reagan Consulting, in Insurance Journal, May 2026"
          />
          <p>So if revenue grew 9% in 2023 and 2024 with few new accounts, the rate did it, and now it is gone.</p>
        </>
      ),
    },
    {
      id: 'producer-capacity',
      heading: 'Cause one: your producers are servicing the book instead of prospecting, and the numbers on that are old and ugly',
      body: (
        <>
          <p>
            The survey everybody still cites is from 2013, ReSource Pro and Insurance Journal&apos;s operations survey.
            Most producers said they spend 25% to 50% of their time selling and 25% to 50% servicing accounts. 83% of
            respondents said producers should spend under a quarter of their time on service. Only about 30% did.
          </p>
          <Quote
            text="it becomes very easy for producers to get sucked into the service trap."
            who="K. Patrick Armstrong, CPCU, ReSource Pro, in Insurance Journal, December 2013"
          />
          <p>
            Al Diamond of Agency Consulting Group put the mechanism plainly in a Big I Virtual University piece: once a
            producer reaches a hundred or a few hundred clients, their new business production diminishes each year.
            Some hit the income they wanted and have, in his words, simply not told the owner they are no longer
            producers.
          </p>
          <p>
            <strong>How to tell this is your cause:</strong> the producers can close. Put them in front of a qualified
            owner and they bind. They just hold two or three first meetings a month, and the calendar is full of
            existing client names.
          </p>
          <p>
            <strong>The fix is capacity, not more meetings.</strong> Move service work to an account manager, set a
            prospecting block and measure it. Diamond&apos;s version is to move the lowest 5% of clients by revenue off
            the producer&apos;s desk. It costs a salary and a quarter of your own attention to make it stick.
          </p>
        </>
      ),
    },
    {
      id: 'no-outbound',
      heading: 'Cause two: nobody owns prospecting, so new business is referrals plus whoever had a slow week',
      body: (
        <>
          <p>
            Ask who owns the first meeting with a stranger, and the room goes quiet. The tell is where last
            quarter&apos;s new accounts came from. Referrals, a carrier rep, a client&apos;s brother in law, two off the
            website. All real revenue, none of it repeatable on purpose. Randy Schwantz&apos;s line on producers in
            Insurance Journal: they will tell you about a referral they once got that turned into some big dough, but
            they will not have a process.
          </p>
          <p>The president of a commercial P&amp;C agency in Tennessee, to me, on prospecting:</p>
          <Quote
            text="we struggle with that. If we were good at that, we wouldn't need to pay you to do it."
            who="President, commercial P&C agency, Tennessee"
          />
          <p>
            <strong>How to tell this is your cause:</strong> your producers have open calendar, service is under
            control, and the few first meetings you do hold close well, often half or better, because they are warm. The
            problem is the count. Three a month across the team, most traced back to you.
          </p>
          <p>
            <strong>The fix is a seat that owns outbound.</strong> The owner does it, which works until the owner
            stops. You hire a caller. Or you pay an outside firm to book first meetings and your producers close. This
            is the one cause Maxionlabs is built for, and I say so at the end rather than pretend we fix all three.
          </p>
        </>
      ),
    },
    {
      id: 'book-mix',
      heading: 'Cause three: too many small accounts eat the service hours that should go to new accounts',
      body: (
        <>
          <p>
            Looks like cause one from the outside. The difference is what the team is slammed with. Pull every account
            by commission and sort it. Schwantz ran this exercise in a 2017 Insurance Journal column: about 80% of
            revenue comes from about 20% of accounts, so the other 80% of accounts bring 20% of the revenue and, he
            argues, most of the workload. A $1,500 commission BOP gets the same certificate requests as a $30,000
            account. Most producers, he says, could write one or two more large accounts and replace the whole basket of
            small ones.
          </p>
          <p>
            <strong>How to tell this is your cause:</strong> account count grew faster than revenue over three years,
            commission per account is falling, and the account managers are at capacity on a book that is mostly under
            your own stated minimum.
          </p>
          <p>
            <strong>The fix is a minimum account size</strong> going forward, and a plan for the existing tail. Move it
            to a carrier service center or a small-business desk, or non-renew the worst of it. It costs a slice of
            commission on moved accounts and some uncomfortable conversations. Then the capacity comes back and you find
            out whether you were in cause two all along.
          </p>
        </>
      ),
    },
    {
      id: 'diagnostic-table',
      heading: 'Read the symptom, find the cause, then price the fix before you buy anything',
      body: (
        <>
          <p>Costs are the shape of the spend, not quotes.</p>
          <Table
            caption="Diagnostic: symptom, cause, fix, cost."
            head={['Symptom', 'What it points to', 'The fix', 'What it costs']}
            rows={[
              [
                'Producers close well once in the room, but hold two or three first meetings a month',
                'Producer capacity',
                'Account manager takes the bottom of the book, prospecting block set and measured',
                'A salary plus benefits, and your attention for a quarter',
              ],
              [
                'Last quarter’s new accounts were referrals and inbound, nobody can name who owns prospecting',
                'No outbound',
                'A seat that owns first meetings: the owner, an in-house caller, or an outside firm',
                'Owner hours, a caller’s pay plus data, or a monthly fee. Maxionlabs is $4,725 a month for 15 qualified first meetings',
              ],
              [
                'Account count grew faster than revenue, commission per account falling, service team maxed',
                'Book mix',
                'Minimum account size going forward, move or non-renew the tail',
                'A slice of commission on moved accounts, some lost revenue, some hard conversations',
              ],
              [
                'Revenue grew in 2023 and 2024 with few new accounts, flat since',
                'Rate carried you, with one of the three underneath',
                'Count last month’s first meetings and who booked them, then go to that cause',
                'An afternoon with the calendar and the book report',
              ],
              [
                'Plenty of qualified first meetings, proposals weeks late',
                'Not enough closers, the one place a hire is right',
                'Hire a producer, or an account manager first if service is slipping',
                'A draw near the BLS median for insurance sales agents, $62,280 in May 2025, before benefits, at roughly even odds of validating',
              ],
            ]}
          />
          <p>
            The table only puts hiring on the last row. The{' '}
            <a href="/hire-producer-or-book-meetings" className="text-accent hover:underline underline-offset-4">
              producer-or-meetings page
            </a>{' '}
            walks that decision out with the 12 and 36 month costs.
          </p>
        </>
      ),
    },
    {
      id: 'alternatives',
      heading: 'The fixes other people will sell you, and when each one is right',
      body: (
        <>
          <p>
            Most of what ranks for this question is written by agency networks, and they are selling membership.
          </p>
          <p>
            <strong>An agency network or alliance.</strong> Carrier access, better contingencies, peers. Right when the
            real cause is carrier appetite. It does not put a first meeting on anyone&apos;s calendar.
          </p>
          <p>
            <strong>Hiring a producer.</strong> Right when you lack closers. Reagan&apos;s Kevin Stipe told Insurance
            Journal last November that firms need to hire more salespeople than they are hiring now, and in the same
            piece:
          </p>
          <Quote
            text="You hire a new salesperson today, you're not going to see significant results for two or three years."
            who="Kevin Stipe, Reagan Consulting, in Insurance Journal, November 2025"
          />
          <p>
            <strong>An account manager or service center.</strong> Right for cause one and cause three. The cheapest fix
            per hour recovered, and the one owners put off longest because it feels like overhead.
          </p>
          <p>
            <strong>Bought leads.</strong> Almost never right above a $25,000 premium floor, because the lead is a form
            fill from someone shopping price. The{' '}
            <a href="/pricing" className="text-accent hover:underline underline-offset-4">
              pricing page
            </a>{' '}
            has that comparison.
          </p>
          <p>
            <strong>An in-house caller, or an outside firm that books first meetings.</strong> Right for cause two
            only, with producers who have calendar to take them. The caller works when the owner has the list and the
            qualification rule written down and wants to manage the seat. Both are wrong for cause one, where the
            meetings sit, and for cause three until the tail is dealt with.
          </p>
        </>
      ),
    },
    {
      id: 'where-maxionlabs-fits',
      heading: 'Where Maxionlabs fits: only the no-outbound cause, and only if your producers have room for the meetings',
      body: (
        <>
          <p>
            If your agency has no outbound seat, we are that seat. We map every business in your territory that fits
            your appetite and premium floor, reach the owners by email, confirm fit and timing with the ones who reply,
            and book the first meeting onto your producer&apos;s calendar with a brief. Your producers close.
          </p>
          <p>
            The terms: $4,725 a month, month to month, cancel any month. 15 qualified first meetings a month, 12 in
            month one. Qualified is written into your agreement: above your premium or group-size floor, inside your
            appetite, a need now or within three months, and the decider in the room. $315 back for every meeting we
            come in short, and a 7-day full refund for any reason. Your counties are yours, never resold.
          </p>
          <p>
            If your cause is producer capacity, we will make it worse, honestly. Fifteen meetings land on producers who
            cannot get to their renewals, and they go unworked. Fix the capacity first, then come back. On the call I
            ask for last month&apos;s first-meeting count and who booked each one, and if the answer says capacity, I
            will tell you to hire an account manager instead of paying us.
          </p>
          <p>
            For: independent commercial P&amp;C or benefits agencies, roughly $2M to $15M, two or more producers besides
            the owner. Not for: solo agents, personal lines shops, captives, and anyone whose producers are already full.
          </p>
        </>
      ),
    },
  ],
  faq: [
    {
      q: 'Why is my insurance agency not growing?',
      a: 'For an independent commercial agency it is almost always one of three causes: producers servicing the book instead of prospecting, nobody owning outbound so new business is referrals only, or small accounts eating the service hours. Count last month’s first meetings with new accounts and who booked them. That tells you which.',
    },
    {
      q: 'What is a good organic growth rate for an independent insurance agency?',
      a: 'The 2026 Best Practices Study update from the Big I and Reagan Consulting put organic growth for top agencies at 6.2% to 10.2% by revenue band, down from 8.7% to 11.3% a year earlier. Reagan’s quarterly survey had the broader market at 7.1% in the fourth quarter of 2025, down from an 11.2% peak in 2023.',
    },
    {
      q: 'How do I grow commercial lines at an independent agency?',
      a: 'Set a premium or group-size floor and hold to it, give one seat ownership of first meetings with businesses above that floor, and take service work off the producers who are supposed to close. Commercial growth is first meetings times close rate times account size, and most agencies are short on the first.',
    },
    {
      q: 'Should I drop small accounts to grow my agency?',
      a: 'Usually move them rather than drop them. About 80% of revenue comes from 20% of accounts, so the small tail carries most of the service load for little money. Set a minimum going forward, move the tail to a service center or small-business desk, and non-renew only what loses money outright.',
    },
  ],
  sources: [
    {
      label:
        'IA Magazine, "Big I and Reagan Consulting Release 2025 Best Practices Study" (Aug 2025): 10.7% organic growth driven by personal P&C and group benefits; commercial P&C revenue growth slowed in all revenue categories except $1.25M to $2.5M',
      url: 'https://www.iamagazine.com/?p=29889',
    },
    {
      label:
        'IA Magazine, "Big I and Reagan Consulting Release 2026 Best Practices Study Update" (Aug 2026): organic growth 6.2% to 10.2%, down from 8.7% to 11.3%; slower in six of seven revenue bands; commercial lines slowed in all bands but one',
      url: 'https://www.iamagazine.com/?p=34147',
    },
    {
      label:
        'Insurance Journal, "As Organic Growth Rate Slows, Consultant Urges Agents and Brokers to Embrace Tech" (May 2026): Reagan Consulting survey, 11.2% in Q2 2023 to 7.1% in Q4 2025; Harrison Brooks quote',
      url: 'https://www.insurancejournal.com/magazines/mag-features/2026/05/18/869973.htm',
    },
    {
      label:
        'Insurance Journal, "The Agency Producer Activity Gap and How to Close It: Survey" (Dec 2013): ReSource Pro survey, 25-50% selling and 25-50% servicing, 83% vs about 30%; K. Patrick Armstrong quote',
      url: 'https://insurancejournal.com/news/national/2013/12/11/313983.htm',
    },
    {
      label:
        'Big I Virtual University, Al Diamond, Agency Consulting Group, "What Do You Do When a Producer Doesn\'t Have Time to Produce?": production diminishes after a hundred or a few hundred clients; move the lowest 5% of clients by revenue',
      url: 'https://independentagent.com/vu/Agency-Management/Sales/Diamond/diamondproductiondecline.aspx',
    },
    {
      label:
        'Insurance Journal, Randy Schwantz, "5 Things You Can Do to Double New Business in Your Agency" (Sep 2017): about 80% of revenue from 20% of accounts; replace the small basket with one or two large accounts',
      url: 'https://www.insurancejournal.com/magazines/mag-features/2017/09/18/464178.htm',
    },
    {
      label:
        'Insurance Journal, Randy Schwantz, "Prospecting: The No. 1 Source of New Production" (Aug 2018): producers cite a referral they once got but have no process',
      url: 'https://insurancejournal.com/magazines/mag-ideaexchange/2018/08/20/498120.htm',
    },
    {
      label:
        'Insurance Journal, "How to Grow an Agency in 2026" (Nov 2025): Kevin Stipe, Reagan Consulting, on hiring more salespeople and two or three years to results',
      url: 'https://www.insurancejournal.com/magazines/mag-features/2025/11/17/847461.htm',
    },
    {
      label:
        'IA Magazine, "Road to Riches: Providing a Path to Producer Validation" (Feb 2024): producer success rate averaged 45.5% among Best Practices agencies, 2023 Best Practices Study (the "roughly even odds" in the table)',
      url: 'https://www.iamagazine.com/?p=944',
    },
    {
      label: 'U.S. Bureau of Labor Statistics, Occupational Outlook Handbook, Insurance Sales Agents: median annual wage $62,280, May 2025',
      url: 'https://www.bls.gov/ooh/sales/insurance-sales-agents.htm',
    },
    {
      label: 'Maxionlabs, published price and terms: $4,725 a month, 15 qualified first meetings, $315 back per miss, 7-day full refund',
      url: 'https://www.maxionlabs.com/#price',
    },
  ],
}
