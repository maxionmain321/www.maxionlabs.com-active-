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
 * v6, 2026-11-16: cut by about a third (Max: "too much water"). Setup sentences, restatements, reasoning-for-the-reader
 *  and prose that repeated a drawing's caption removed, paragraphs making one point merged, headings, table cells and
 *  FAQ answers shortened. Every number, quote, drawing, section, h1, FAQ question and source kept. The reader-copy
 *  count the test measures includes the captions, the table, the FAQ and the quotes, about 800 words that are not
 *  prose, so the prose itself is roughly halved.
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
 *
 * v7, 2026-11-17 (MAX-738): folded the searched phrase "insurance producer agreement" (Serpstat g_us 40/mo, 2026-11-16)
 *  in as a section plus one FAQ. SERP read 2026-11-17 (treg anyapi.google.serp.organic, gl=us): 8 of 8 results are a
 *  state statute (Illinois Producer Controlled Insurer Act), a Missouri DOI PDF, carrier licensing and compensation forms,
 *  a title-underwriter bulletin, a SharePoint PDF, "what is a producer license", "how to start an agency" and "producer
 *  vs agent". Legal and carrier-form intent, no owner-side result, so the section is angled at the owner's agreement with
 *  a producer he hires and says what the search returns. No new numbers; the draw and pay-structure facts are the ones
 *  already cited (sources 4 and 8). To stay inside the 1,500-word band the McNeely paragraph (its claim stays in FAQ 2),
 *  two quote attributions, two table cells and a few restatements were trimmed. Every number, source and drawing kept.
 */

export const PAGE: SitePage = {
  path: '/hire-producer-or-book-meetings',
  title: 'Insurance producer compensation, and when not to hire',
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
    "Most owners asking about insurance producer compensation don't need another producer, they need more sales meetings for the producers they already pay. The meetings-or-producers test says which. Count last month's sales meetings above your floor and who got each one. Few, mostly from you or a referral, short of meetings, a new producer shares the same empty calendar. Plenty and they can't get to them all, short of producers, hire.",
  updated: '2026-11-16',
  sections: [
    {
      id: 'one-question',
      heading: 'Most owners are short of meetings, and guess another producer',
      body: (
        <>
          <Idea>A producer with nobody to close is the most expensive seat you have.</Idea>
          <p>
            $6M agency, two producers, one sales meeting this week between them, and you set it up yourself at a Rotary
            lunch. One meeting a week is 4 a month for the team, a third producer
            changes nothing about where those come from, now 3 share 4. The producers close fine in the room,
            nobody owns the hour that gets them there.
          </p>
          <Quote
            text="the fact that they're warm and open to having a conversation, I'm telling you, if you just get us in the room, you know, that's where we're good."
            who="President, commercial P&C agency, Tennessee"
          />
          <TwoBuckets />
        </>
      ),
    },
    {
      id: 'the-test',
      heading: 'The meetings-or-producers test, 10 minutes on last month’s calendar',
      body: (
        <>
          <Idea>Two numbers per producer, off the calendar.</Idea>
          <ol className="list-decimal pl-5 flex flex-col gap-2">
            <li>
              Sales meetings held last month above your floor, $25,000 in premium or 20 enrolled lives, renewal
              reviews and service calls don&apos;t count.
            </li>
            <li>Who got each one, the producer, a referral partner, you, or it walked in.</li>
          </ol>
          <CalendarTest />
        </>
      ),
    },
    {
      id: 'validation-odds',
      heading: 'About half of new producers never validate, and you wait 3 years to find out',
      body: (
        <>
          <Idea>A new producer is a coin flip that takes 3 years to land.</Idea>
          <p>
            The 2023 Best Practices Study from the Big &ldquo;I&rdquo; and Reagan Consulting put producer success at
            45.5%, the 2020 study 57%, a 2017 Reagan report 56% over 5 years.
          </p>
          <Quote text="They have three years to succeed but not three years to fail." who="Steve Goble, The Mahoney Group, in IA Magazine, February 2024" />
          <ProducerTimeline />
          <p>Short of meetings, you can test that in 30 days for a lot less.</p>
        </>
      ),
    },
    {
      id: 'cost-table',
      heading: 'What each option costs over 3, 12 and 36 months',
      body: (
        <>
          <Idea>Over one year the cash is close, the difference is what the year buys.</Idea>
          <p>
            The producer column is a $60,000 draw, near the BLS median for insurance sales agents, $62,280 in May 2025.
          </p>
          <StackedCost />
          <Table
            caption="Three ways to add new business, producer and setter figures are illustrations."
            head={['', 'Hire another producer', 'In-house setter or VA', 'Maxionlabs']}
            rows={[
              [
                'Cash over 3 months',
                'About $15,000 of draw, before the extras',
                'A quarter of pay and tools, plus your hours',
                '$14,175 month to month, or $12,500 prepaid',
              ],
              [
                'Cash over 12 months',
                'About $60,000 in draw, before tax and benefits',
                'Pay, a dialer, data and your time',
                '$56,700 at $4,725 a month',
              ],
              [
                'Cash over 36 months',
                'Up to about $180,000 if the draw holds',
                'Three years of pay and tools, plus rehires',
                '$170,100 month to month, cancel any month',
              ],
              [
                'Time to the first qualified sales meeting',
                'Weeks to months, licensing, onboarding, dials',
                'A few weeks, if you write the list',
                'Inside 30 days, 12 in month one, 15 a month after',
              ],
              [
                'Risk if it fails',
                'About even odds they never validate',
                'Unqualified appointments, and a seat that empties',
                '$315 back per missed meeting, month to month',
              ],
            ]}
          />
          <CostBars />
          <p>One column buys a coin flip on a person who still needs meetings.</p>
        </>
      ),
    },
    {
      id: 'when-to-hire',
      heading: 'When hiring another producer is the right call',
      body: (
        <>
          <Idea>Some agencies should hire.</Idea>
          <ol className="list-decimal pl-5 flex flex-col gap-2">
            <li>
              <strong>Your producers are full.</strong> Good sales meetings every week, the only limit is hours.
              IdealTraits says the same, hire when you need new revenue and service can absorb more clients.
            </li>
            <li>
              <strong>You&apos;re opening a new line, office or market,</strong> like benefits into a P&amp;C shop, and
              nobody on the team can run those meetings.
            </li>
            <li>
              <strong>You&apos;re the only producer</strong> and you want out of production.
            </li>
            <li>
              <strong>You have what a producer needs to validate,</strong> a mentor with time, cash to carry the draw a
              year or two, and an answer for where their meetings come from.
            </li>
          </ol>
        </>
      ),
    },
    {
      id: 'insurance-producer-agreement',
      heading: 'An insurance producer agreement sets the pay and skips where the meetings come from',
      body: (
        <>
          <Idea>What ranks for this is carrier forms and state statutes. Yours is the deal with the producer you hire.</Idea>
          <ol className="list-decimal pl-5 flex flex-col gap-2">
            <li>The draw, and when it steps down, IA Magazine&apos;s owners run 100% into year two or three.</li>
            <li>The split on new business against renewals.</li>
            <li>Who owns the book if he leaves.</li>
            <li>The validation date, and what happens on it.</li>
          </ol>
          <p>
            Almost none say who sets his meetings and how many a month. Put that line in, or it&apos;s a pay plan for
            an empty calendar. The paper is your lawyer&apos;s job, the five lines are yours.
          </p>
        </>
      ),
    },
    {
      id: 'in-house-setter',
      heading: 'An in-house setter or VA lives or dies on who manages it',
      body: (
        <>
          <p>
            Randy Schwantz&apos;s maths in Insurance Journal, 2018, at a 50% close rate a sale costs about $1,000, and a
            producer finding 5 to 10 appointments a year could be taking 3 to 4 a month.
          </p>
          <p>
            What it leaves out is the managing, the list, the call reviews, the script, the rehire, that&apos;s usually
            you.
          </p>
          <Quote
            text="we struggle with that. If we were good at that, we wouldn't need to pay you to do it."
            who="President, commercial P&C agency, Tennessee"
          />
          <p>
            Right if you want to run a sales desk and have the list, the bought kind is on the{' '}
            <a href="/commercial-insurance-leads" className="underline underline-offset-2">
              commercial insurance lead generation
            </a>{' '}
            page. Otherwise skip it.
          </p>
        </>
      ),
    },
    {
      id: 'worked-example',
      heading: 'What 3 months of sales meetings turns into',
      body: (
        <>
          <Idea>One month is a sample, three months is a book that renews.</Idea>
          <p>
            A $25,000 account at 12% commission is about $3,000 of agency commission a year, gross, before producer pay
            and servicing, only an illustration. 12 + 15 + 15 is 42 qualified sales meetings, close 1 in 5, about 8
            bound accounts, about $25,000 of gross commission a year against $14,175 month to month or $12,500 prepaid. At 84% retention, the Liberty Mutual figure in IA Magazine, year
            two is about $21,000 for nothing more.
          </p>
          <MeetingsFunnel />
          <p>
            The floor is only a floor, a $75,000 or $100,000 account counts as one meeting, no extra charge.
          </p>
        </>
      ),
    },
    {
      id: 'where-maxionlabs-fits',
      heading: 'Where Maxionlabs fits, qualified sales meetings for your producers',
      body: (
        <>
          <Idea>We&apos;re the third column, your producers run the meeting and close it.</Idea>
          <p>
            We email the owners in your territory above your floor, confirm fit and timing with the ones who reply, and
            the meeting goes on your producer&apos;s calendar. $4,725 a month, month to month, no share of your
            commission. 15 qualified sales meetings a month, held live with the owner or the decider, 12
            in month one while we ramp, a no-show doesn&apos;t count, we replace it. $315 back per meeting we miss,
            your counties locked and never resold.
          </p>
          <p>
            Qualified means above your floor, inside your appetite, a need inside 3 months, the decider in the room.
          </p>
          <p>
            Run the test,{' '}
            <a href="/#book-call" className="underline underline-offset-2">
              book a call
            </a>{' '}
            with the two numbers, if you&apos;re short of producers I&apos;ll tell you on the call.
          </p>
        </>
      ),
    },
  ],
  faq: [
    {
      q: 'How much does it cost to hire a commercial insurance producer?',
      a: 'Near the BLS median for insurance sales agents, $62,280 in May 2025, or $50,000 to $70,000 a year for an experienced hire, before payroll tax and benefits. About $180,000 of draw over three years.',
    },
    {
      q: 'How long does it take a new insurance producer to validate?',
      a: 'About three years, some plan for five. Most firms know within six months to a year, says Reagan Consulting.',
    },
    {
      q: 'What percentage of insurance producers validate?',
      a: 'About half. The 2023 Big I and Reagan Consulting Best Practices Study found 45.5%, earlier studies 56% and 57%.',
    },
    {
      q: 'Should I hire a producer or an account manager first?',
      a: 'Producers full, service keeping up, the producer. Clients waiting on certificates and renewals, the account manager. Producers not full, service fine, neither, you are short of sales meetings.',
    },
    {
      q: 'How should I pay a first producer, salary or commission?',
      a: 'A salary or a 100% draw, then commission as the book grows, usually from year two or three. A 2012 benchmark of 451 commercial producers found salary plus commission, straight commission and draw all in use.',
    },
    {
      q: 'What should an insurance producer agreement cover?',
      a: 'The draw and when it steps down, the split on new business and renewals, who owns the book if he leaves, the validation date, and who sets his meetings. A lawyer in your state writes the paper.',
    },
  ],
  sources: [
    {
      label:
        'IA Magazine, "Road to Riches: Providing a Path to Producer Validation" (Feb 2024): 45.5% producer success rate in the 2023 Big I and Reagan Consulting Best Practices Study; three years to validate; Steve Goble quote; Brian McNeely on six months to a year',
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
        'Maxionlabs, published price and terms: $4,725 a month, or $12,500 for 90 days prepaid, 15 qualified sales meetings held live, $315 back per miss',
      url: 'https://www.maxionlabs.com/#price',
    },
  ],
}
