import type { SitePage } from '@/lib/site-pages'
import type { AnswerPageProps } from '@/components/answer/AnswerPage'
import { LINE, MUTED, INK, SERIF } from '@/components/home/InsuranceHome'
import { TwoBuckets, CalendarTest, ProducerTimeline, StackedCost, CostBars, MeetingsFunnel } from '@/components/drawings'

/**
 * Answer page for the owner question "should I hire another insurance producer, or do my producers just need more
 * sales meetings?" (search demand row 2, MAX-738).
 *
 * v3, 2026-11-16: same drawings, same sourced numbers, two changes from Max's review of v2.
 *  1. The headline uses the words an owner types. Google autocomplete (suggestqueries, hl=en gl=us, 2026-11-16)
 *     returns nothing for any "should I hire another producer" shape with insurance in it. What it does return is
 *     "insurance producer pay", "insurance producer pay structure", "insurance producer compensation",
 *     "insurance producer validation", "hiring insurance agents", "how do insurance producers get paid" and
 *     "commercial insurance producer salary". So the h1 keeps "hire another insurance producer" as the plain owner
 *     question and the description carries pay and validation, the two words with live autocomplete.
 *  2. Voice. Every paragraph is drafted as Max saying it to an owner on a call, then the filler stripped
 *     (brand/voice.md TALK TEST, _system/harness/grokbot/VOICE.md, brand/voice-references.md).
 *  Wording (Max, 2026-11-16): what we sell is qualified sales meetings, held live with the owner. Never "first
 *  meetings", never "booked". A no-show does not count and is replaced.
 *  v1 and v2 are in content/answers/_archive/ for comparison.
 *
 * v4, 2026-11-16: retargeted onto the searched query "insurance producer compensation" (Max: "voice + images was
 *  great", so the body, drawings and sources are v3 byte for byte). Only the title, description, targetQuery, h1 and the
 *  first two sentences of the lede changed, so the searched phrase leads. Live check 2026-11-16, suggestqueries hl=en
 *  gl=us: "insurance producer compensation" and "insurance producer compensation models" returned; Serpstat g_us
 *  volume 10/mo (treg, 2026-11-16). "should i hire another insurance producer" stays in the registry as a 0-demand
 *  record with no page. v3 is in content/answers/_archive/.
 *
 * v5, 2026-11-16: prose re-voiced against brand/voice-core.md (verdict, reason, "like" example, first person, flat
 *  closers). Facts, numbers, drawings, structure, h1, FAQ questions and sources unchanged.
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
 *  - 84% average agency retention, Liberty Mutual study: IA Magazine, Jul 2026 (source 9, already cited on the
 *    appointment-cost page)
 * The money is shown over 3 months (Max, 2026-11-16): 12 + 15 + 15 = 42 meetings, 1 in 5 close, about 8 accounts, about
 * $25,000 of gross commission a year before producer pay, year two about $21,000 at 84%, against $14,175 month to month
 * or $12,500 prepaid (retirement-log 2026-10-22, live price card). Year one and year two only, never a lifetime total.
 * Offer numbers come from 00_foundation/offer-v3.md only. The 52% figure in the ops research file could not be traced
 * to a live page, so it is not used here.
 */

export const PAGE: SitePage = {
  path: '/hire-producer-or-book-meetings',
  title: 'Insurance producer compensation, and whether to hire another producer at all',
  description:
    'Insurance producer compensation over 3, 12 and 36 months, validation odds, and the one test that says hire another producer or get yours more sales meetings.',
  kind: 'answer',
  changeFrequency: 'monthly',
  targetQuery: 'insurance producer compensation',
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

/** The one-sentence idea that opens each section, set a little bigger so it reads as the point. */
function Idea({ children }: { children: React.ReactNode }) {
  return <p className={`${SERIF} text-xl md:text-2xl ${INK} leading-snug`}>{children}</p>
}

export const CONTENT: AnswerPageProps = {
  eyebrow: 'For owners of commercial P&C and benefits agencies with 2 or more producers. Not for solo agents or personal lines shops.',
  h1: 'Insurance producer compensation is wasted on an empty calendar. Hire another insurance producer, or get yours more sales meetings?',
  lede:
    "Honestly, most owners who ask me about insurance producer compensation don't need another producer. They need more sales meetings for the producers they already pay. One test tells you which you are, the meetings-or-producers test. Count the sales meetings your producers held last month with accounts above your floor, then write down who got each one. If the number is small and most came from you or a referral, you're short of meetings, and a new producer just shares the same empty calendar. If your producers hold plenty and can't get to them all, you're short of producers, so hire.",
  updated: '2026-11-16',
  sections: [
    {
      id: 'one-question',
      heading: 'Most owners are short of meetings, and the first guess is usually another producer',
      body: (
        <>
          <Idea>A producer is there to close. A producer with nobody to close is the most expensive seat you have.</Idea>
          <p>
            Picture a Monday. You run a $6M agency, you open the calendar, two producers, and between them one sales
            meeting this week, and you set that one up yourself at a Rotary lunch.
          </p>
          <p>Your first thought is the one every owner has, we need another producer.</p>
          <p>
            So do the maths with me. One sales meeting a week is like 4 a month for the whole team, and a third producer
            changes nothing about where those meetings come from. Now you&apos;ve got 3 people sharing 4.
          </p>
          <p>
            Most agencies I talk to at $2M to $15M are in this spot. The producers close fine once they&apos;re in
            the room, nobody owns the hour of work that gets them into the room.
          </p>
          <Quote
            text="the fact that they're warm and open to having a conversation, I'm telling you, if you just get us in the room, you know, that's where we're good."
            who="President, commercial P&C agency, Tennessee, on what he needs from us"
          />
          <TwoBuckets />
        </>
      ),
    },
    {
      id: 'the-test',
      heading: 'Run the meetings-or-producers test on last month’s calendar, it takes 10 minutes',
      body: (
        <>
          <Idea>Two numbers per producer, pulled off the calendar.</Idea>
          <ol className="list-decimal pl-5 flex flex-col gap-2">
            <li>
              How many sales meetings did each producer hold last month with a business above your floor? Say $25,000
              in premium, or 20 or more enrolled lives. Renewal reviews and service calls don&apos;t count.
            </li>
            <li>Who got each one? The producer, a referral partner, you, or it came in on its own.</li>
          </ol>
          <p>
            Say you find 5 sales meetings across 3 producers, and 4 of the 5 trace back to you or a referral partner.
            You&apos;re short of meetings. Your producers are fine, they&apos;re just starved.
          </p>
          <p>
            Now say each producer held 8 or 10 good meetings and couldn&apos;t get to them all. That&apos;s short of
            producers, and that&apos;s where another producer pays you back.
          </p>
          <CalendarTest />
        </>
      ),
    },
    {
      id: 'validation-odds',
      heading: 'About half of new producers never validate, and you wait about 3 years to find out',
      body: (
        <>
          <Idea>A new producer is a coin flip that takes 3 years to land.</Idea>
          <p>
            The 2023 Best Practices Study from the Big &ldquo;I&rdquo; and Reagan Consulting put producer success at
            45.5%. The 2020 study said 57%, and a 2017 Reagan report had 56% of new hires making it over 5 years.
          </p>
          <p>
            And the clock is long. People who train producers say about 3 years, experienced hires too. One agency
            leader told IA Magazine this.
          </p>
          <Quote text="They have three years to succeed but not three years to fail." who="Steve Goble, The Mahoney Group, in IA Magazine, February 2024" />
          <p>
            You do know sooner. Reagan&apos;s Brian McNeely, same article, &ldquo;most firms know within six
            months to a year whether or not a producer&apos;s going to make it.&rdquo; So the real bet is 6 to 12 months
            of draw, benefits, a desk and your time before you know anything, then 2 more years of ramp if the answer is
            yes.
          </p>
          <ProducerTimeline />
          <p>
            None of this says don&apos;t hire. It says a producer is a 3-year bet at about even odds, and if you&apos;re
            short of meetings you can test that in 30 days for a lot less money.
          </p>
        </>
      ),
    },
    {
      id: 'cost-table',
      heading: 'What each option costs over 3, 12 and 36 months, and what you keep if it fails',
      body: (
        <>
          <Idea>Over one year the cash is close. The difference is what the year buys you.</Idea>
          <p>
            For the producer column I used a $60,000 draw. That&apos;s near the BLS median for insurance sales agents, $62,280 in May 2025, and inside the &ldquo;$50-60-70,000 a
            year just to keep his bills paid&rdquo; one owner gave IA Magazine for an experienced hire.
          </p>
          <p>The Maxionlabs column is our published price, nothing hidden.</p>
          <StackedCost />
          <Table
            caption="Three ways to add new business. Producer and setter figures are illustrations from the sources at the end."
            head={['', 'Hire another producer', 'In-house setter or VA', 'Maxionlabs']}
            rows={[
              [
                'Cash over 3 months',
                'About $15,000 of draw, a quarter of the $60,000, before the extras',
                'A quarter of pay and tools, plus your hours on the list and the script',
                '$14,175 month to month, or $12,500 if you prepay the quarter',
              ],
              [
                'Cash over 12 months',
                'About $60,000 in draw, before tax, benefits, licensing and a mentor’s hours',
                'Salary or hourly pay, plus a dialer, data and your management time',
                '$56,700 at $4,725 a month',
              ],
              [
                'Cash over 36 months',
                'Up to about $180,000 if the draw holds, less once commission replaces it',
                'Three years of pay and tools, plus a rehire each time the seat empties',
                '$170,100 month to month, cancel any month',
              ],
              [
                'Time to the first qualified sales meeting',
                'Weeks to months: licensing, onboarding, a list, then dials',
                'A few weeks, if you write the list and the script',
                'Inside the first 30 days. 12 qualified sales meetings in month one, 15 a month after that, all held live with the owner',
              ],
              [
                'Risk if it fails',
                'About even odds they never validate. 6 to 12 months of pay before you know, 3 years before they carry themselves',
                'Unqualified appointments that burn your producers’ time, and a seat that empties when the person leaves',
                '$315 back per missed meeting, 7-day full refund, month to month. Worst case is one month’s fee minus the credits',
              ],
            ]}
          />
          <CostBars />
          <p>So one column buys a coin flip on a person who still needs meetings.</p>
        </>
      ),
    },
    {
      id: 'when-to-hire',
      heading: 'Hiring another producer is the right call in these four situations',
      body: (
        <>
          <Idea>Some agencies should hire. More meetings would honestly make things worse for them.</Idea>
          <ol className="list-decimal pl-5 flex flex-col gap-2">
            <li>
              <strong>Your producers are full.</strong> They hold good sales meetings every week and the only limit is
              hours in the day. IdealTraits says it plainly, hire a producer when you need new revenue
              and your service side can absorb more clients.
            </li>
            <li>
              <strong>You&apos;re opening a new line, office or market</strong> and nobody on the team can run those
              meetings. Like benefits into a P&amp;C shop, or a second city. A setter can&apos;t close a line your agency
              doesn&apos;t know yet.
            </li>
            <li>
              <strong>You&apos;re the only producer</strong> and you want out of production. More meetings for you is just
              more of the problem, you need a second person who can win in the room first.
            </li>
            <li>
              <strong>You have what a producer needs to validate.</strong> A mentor with time, cash to carry the draw
              for a year or two, and an answer for where their meetings come from.
            </li>
          </ol>
        </>
      ),
    },
    {
      id: 'in-house-setter',
      heading: 'An in-house setter or VA is cheaper on paper, and it lives or dies on who manages it',
      body: (
        <>
          <Idea>The middle option. Lots of owners try it.</Idea>
          <p>
            You hire a caller or a VA, hand them a list, and they set meetings. Randy Schwantz did the maths on this in
            Insurance Journal back in 2018.
          </p>
          <p>
            At a 50% close rate a sale costs you about $1,000. A producer who found 5 to 10 appointments a year on his
            own could be taking 3 to 4 a month. So the maths works.
          </p>
          <p>
            What it leaves out is the managing. Somebody builds the list, listens to the calls, fixes the script, and
            hires again when the person leaves, and that somebody is usually you.
          </p>
          <p>Owners tell me the same thing.</p>
          <Quote
            text="we struggle with that. If we were good at that, we wouldn't need to pay you to do it."
            who="President, commercial P&C agency, Tennessee, on prospecting"
          />
          <p>
            So an in-house setter is right if you want to run a sales desk and you already have the list. If
            it&apos;s one more thing on your desk, skip it.
          </p>
        </>
      ),
    },
    {
      id: 'worked-example',
      heading: 'What 3 months of sales meetings turns into, against what you pay for them',
      body: (
        <>
          <Idea>Look at 3 months. One month is a sample, three months is a book that renews.</Idea>
          <p>
            Your numbers will differ, so run yours. A commercial account at $25,000 in premium with a 12% commission is
            about $3,000 of agency commission a year. All of this is gross commission, before producer pay and
            servicing, and it&apos;s only an illustration.
          </p>
          <p>
            Three months with us is 12 + 15 + 15, so 42 qualified sales meetings, all held live with the owner. Say your
            producers close 1 in 5. That&apos;s about 8 bound accounts, and at $3,000 each that&apos;s about $25,000 of
            gross commission a year.
          </p>
          <p>
            What you paid for those 3 months is $14,175 month to month, or $12,500 if you prepay the quarter. So the
            first year of commission on that book is roughly double what you paid, before a single renewal.
          </p>
          <p>
            And it renews. The average agency keeps about 84% of its accounts, that&apos;s the Liberty Mutual figure in
            IA Magazine. So year two on the same book is about $21,000, and you paid nothing more for it.
          </p>
          <MeetingsFunnel />
          <p>
            The floor is only a floor. A $75,000 or $100,000 account counts as one meeting, same as a $25,000 one, no
            extra charge. We don&apos;t take a share of the commission either.
          </p>
          <p>The same 3 months of a producer&apos;s draw, about $15,000, buys licensing, onboarding and a list.</p>
        </>
      ),
    },
    {
      id: 'where-maxionlabs-fits',
      heading: 'Where Maxionlabs fits, qualified sales meetings for the producers you already pay for',
      body: (
        <>
          <Idea>We&apos;re the third column. Your producers run the meeting and close it, we never take the meeting.</Idea>
          <p>
            We map every business in your territory that fits your appetite and your floor, reach the owners by email,
            and confirm fit and timing with the ones who reply. Then the sales meeting goes on your producer&apos;s
            calendar.
          </p>
          <p>
            The terms are short. $4,725 a month, month to month, cancel any month, no share of your commission. 15
            qualified sales meetings a month, held live with the owner or the decider, 12 in month one while we ramp. A
            no-show doesn&apos;t count toward the 15, we replace it.
          </p>
          <p>
            Qualified is written into your agreement. Above your premium or group-size floor, inside your appetite, a
            need now or inside 3 months, and the decider in the room. $315 back for every meeting we miss, and a 7-day
            full refund for any reason. Territory lock too, your counties, never resold to another agency.
          </p>
          <p>If your producers are already full, hire, and come back when the new calendar has room.</p>
          <p>
            Not sure which camp you&apos;re in? Run the meetings-or-producers test,{' '}
            <a href="/#book-call" className="underline underline-offset-2">
              book a call
            </a>{' '}
            and bring the two numbers. If you&apos;re short of producers I&apos;ll tell you so on the call.
          </p>
        </>
      ),
    },
  ],
  faq: [
    {
      q: 'How much does it cost to hire a commercial insurance producer?',
      a: 'Plan on a draw or base near the BLS median for insurance sales agents, $62,280 in May 2025. One agency owner put an experienced hire at $50,000 to $70,000 a year just to cover their bills, before payroll tax, benefits and licensing. Over three years that is about $180,000 of draw before commission replaces it.',
    },
    {
      q: 'How long does it take a new insurance producer to validate?',
      a: 'About three years, new and experienced hires alike, and some agencies plan for five. Most firms know within six months to a year whether the producer will make it, that is Reagan Consulting.',
    },
    {
      q: 'What percentage of insurance producers validate?',
      a: 'About half. The 2023 Best Practices Study from the Big I and Reagan Consulting found a 45.5% producer success rate. The 2020 study put it at 57%, and a 2017 Reagan report had 56% of new hires making it over five years.',
    },
    {
      q: 'Should I hire a producer or an account manager first?',
      a: 'If your producers are full and service keeps up, hire the producer. If clients are waiting on certificates and renewals, hire the account manager first, because a new producer brings in accounts your team cannot serve yet. If producers are not full and service is fine, neither hire fixes it, you are short of sales meetings.',
    },
    {
      q: 'How should I pay a first producer, salary or commission?',
      a: 'Most agencies start a new producer on a salary or a 100% draw, then shift to commission as the book grows, usually from year two or three. A 2012 benchmark of 451 commercial producers found salary plus commission, straight commission and a draw against commission all in use.',
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
      label:
        'Independent Agent magazine, "Retention Success Happens Beyond Renewal, Says Liberty Mutual Study" (Jul 2026): average agency retention around 84%',
      url: 'https://www.iamagazine.com/?p=33852',
    },
    {
      label:
        'Maxionlabs, published price and terms: $4,725 a month, or $12,500 for 90 days prepaid, 15 qualified sales meetings held live, $315 back per miss, 7-day full refund',
      url: 'https://www.maxionlabs.com/#price',
    },
  ],
}
