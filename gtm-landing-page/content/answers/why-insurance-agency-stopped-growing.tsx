import type { SitePage } from '@/lib/site-pages'
import type { AnswerPageProps } from '@/components/answer/AnswerPage'
import { LINE, MUTED, INK, SERIF } from '@/components/home/InsuranceHome'
import { GrowthRateLine, CalendarAndBook, ServiceTrapWeek, SmallAccountTail, MeetingsFunnel } from '@/components/drawings'

/**
 * Answer page for the owner search "how to grow an insurance agency" (search demand row 7, MAX-738), answered as the
 * owner problem behind it: new business went flat and the owner does not know which of three causes is theirs.
 *
 * v2, 2026-11-16: rewritten in the format Max approved on the /hire-producer-or-book-meetings pilot ("voice + images
 * was great"). One problem, a named check (the calendar-and-book check), a short owner story, 5 captioned drawings,
 * every paragraph drafted as Max saying it to an owner on a call, then the filler stripped (brand/voice.md TALK TEST,
 * _system/harness/grokbot/VOICE.md). v1 is in content/answers/_archive/ for comparison. Prose pass 2026-11-16 against
 * brand/voice-core.md (verdict first, concede then hold, flat last lines, contractions); facts and structure unchanged.
 *
 * Demand (Google autocomplete, suggestqueries hl=en gl=us, re-run live 2026-11-16): "how to grow an insurance agency"
 * returns itself plus "how to grow an independent insurance agency" and "best way to grow an insurance agency";
 * "insurance agency growth" returns itself plus "growth strategies" and "growth calculator". So the h1 carries
 * "how to grow an insurance agency" in the owner's words and the page answers the problem underneath it.
 * "why is my insurance agency not growing" returns 0, so the old h1 is gone.
 *
 * Research numbers used, every one opened live on 2026-11-16 (the passage was read, not just the URL):
 *  - 6.2% to 10.2%, down from 8.7% to 11.3%, slower in six of seven bands, commercial lines slowed in all bands but
 *    one: IA Magazine, 2026 Best Practices Study update, Aug 2026 (source 1)
 *  - 11.2% Q2 2023 to 7.1% Q4 2025: Insurance Journal, May 2026 (source 2)
 *  - 25 to 50% selling and 25 to 50% servicing, 83% say servicing should be under 25%, Armstrong quote: Insurance
 *    Journal, Dec 2013, ReSource Pro survey (source 3)
 *  - a hundred or a few hundred clients, lowest 5% of clients re-assigned: Al Diamond, Big I Virtual University (source 4)
 *  - about 80% of revenue from 20% of accounts, one or two more large accounts replace the small basket:
 *    Randy Schwantz, Insurance Journal, Sep 2017 (source 5)
 *  - "a referral they once got", no process: Randy Schwantz, Insurance Journal, Aug 2018 (source 6)
 *  - Kevin Stipe, two or three years, firms need to hire more salespeople: Insurance Journal, Nov 2025 (source 7)
 *  - 45.5% producer success rate, 2023 Best Practices Study: IA Magazine, Feb 2024 (source 8)
 *  - $62,280 median wage, insurance sales agents, May 2025: BLS OOH (source 9)
 *  - 84% average agency retention, Liberty Mutual study: IA Magazine, Jul 2026 (source 10)
 * Opened but cut for length: the 2025 study's 10.7% record (IA Magazine, Aug 2025).
 * The $1,500 and $30,000 accounts in the small-account drawing are an illustration, carried by the drawing's caption.
 * Brevity pass 2026-11-16 (Max: "too much water"): reader copy cut from 2,178 to about 1,440 words. Dropped the
 *  Idea lines that restated a heading, the South Florida quote, the Schwantz referral line (source 6 stays listed),
 *  and prose that repeated a caption. Every number, quote and source kept is unchanged.
 * Fold 2026-11-17 (MAX-738): "insurance agency growth strategies" (Serpstat g_us 50/mo) gets its own h2 plus an FAQ.
 *  SERP read live (anyapi, gl=us, 8 results): all marketing-tips listicles for agents, none about producer capacity
 *  or the renewal date. r/InsuranceAgent (2 threads read) and the 19-call buyer-voice bank agree on service load,
 *  bigger accounts and the renewal date, so the section says that. The Florida owner quote is from buyer-voice
 *  2026-10-24 (Gilbert 10-02, 16:31). No new research numbers; the ones used were already on the page.
 * Offer numbers come from 00_foundation/offer-v3.md only. The money is shown over 3 months (Max, 2026-11-16):
 * 12 + 15 + 15 = 42 meetings, 1 in 5 close, about 8 accounts, about $25,000 of gross commission a year before producer
 * pay, year two about $21,000 at 84%, against $14,175 month to month. Never a lifetime total.
 */

/** First commit of this file (git log --diff-filter=A) and the last content change. Article datePublished / dateModified, sitemap lastmod. */
export const PUBLISHED = '2026-11-15'
export const UPDATED = '2026-11-16'

export const PAGE: SitePage = {
  path: '/why-insurance-agency-stopped-growing',
  title: 'How to grow an insurance agency when new business is flat',
  description:
    'New business flat? One of three causes, the service trap, nobody owns new business, or too many small accounts. A 10 minute check says which, and the fix.',
  kind: 'answer',
  changeFrequency: 'monthly',
  updated: UPDATED,
  targetQuery: 'how to grow an insurance agency',
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
  h1: 'How to grow an insurance agency when new business went flat, and which of the 3 causes is yours',
  lede:
    "When an owner asks how to grow the agency, the real question is why new business stopped. One of three causes. The service trap, producers spend the week on renewals. Nobody owns new business, so it's referrals plus whoever had a slow week. Too many small accounts, so the service desk is full. One 10 minute check tells you which, the calendar-and-book check.",
  published: PUBLISHED,
  updated: UPDATED,
  sections: [
    {
      id: 'three-causes',
      heading: 'New business goes flat for one of three causes',
      body: (
        <>
          <p>
            A $4M commercial agency, revenue up 9% in 2023 and 9% in 2024, then 2025 flat and 11 new commercial
            accounts all year, and the owner wanted another producer. I asked how many sales meetings with a new
            account the team held last month and who got each one. 3, and 2 were his.
          </p>
          <ol className="list-decimal pl-5 flex flex-col gap-2">
            <li>
              <strong>The service trap.</strong>
            </li>
            <li>
              <strong>Nobody owns new business.</strong>
            </li>
            <li>
              <strong>Too many small accounts.</strong>
            </li>
          </ol>
        </>
      ),
    },
    {
      id: 'rate-did-it',
      heading: 'Rate did your growing for three years',
      body: (
        <>
          <p>
            Reagan Consulting&apos;s survey has organic growth at 11.2% in Q2 2023 and 7.1% by Q4 2025. Top line up,
            new-account count flat, rate did it, and the weather turned.
          </p>
          <GrowthRateLine />
        </>
      ),
    },
    {
      id: 'the-check',
      heading: 'Run the calendar-and-book check, about 10 minutes',
      body: (
        <>
          <ol className="list-decimal pl-5 flex flex-col gap-2">
            <li>
              Mark every sales meeting on last month&apos;s calendar with a new business above your floor, say $25,000
              in premium or 20 or more enrolled lives. Renewal reviews don&apos;t count.
            </li>
            <li>Next to each, who got it, a producer, a referral, you, or it walked in.</li>
            <li>Sort the book by commission and look at where the service hours go.</li>
          </ol>
          <CalendarAndBook />
          <p>
            Open calendars is cause two. Full calendars of names you already have is cause one. 20% of accounts
            bringing about 80% of commission while account managers drown in the rest is cause three.
          </p>
        </>
      ),
    },
    {
      id: 'service-trap',
      heading: 'Cause one is the service trap',
      body: (
        <>
          <Idea>A producer who can close but never gets in the room is a very expensive account manager.</Idea>
          <Quote
            text="it becomes very easy for producers to get sucked into the service trap."
            who="K. Patrick Armstrong, CPCU, ReSource Pro, in Insurance Journal, December 2013"
          />
          <ServiceTrapWeek />
          <p>
            Yours when producers bind fine but hold two or three sales meetings a month, the calendar full of names
            you already have. The fix is capacity, an account manager takes the service work and Al Diamond
            re-assigns the lowest 5% of clients.
          </p>
        </>
      ),
    },
    {
      id: 'nobody-owns-new-business',
      heading: 'Cause two is nobody owns new business',
      body: (
        <>
          <Idea>Real revenue, none of it repeatable on purpose.</Idea>
          <Quote
            text="we struggle with that. If we were good at that, we wouldn't need to pay you to do it."
            who="President, commercial P&C agency, Tennessee, on prospecting"
          />
          <p>
            Yours when producers have open calendars and the few sales meetings you hold close well, they&apos;re
            warm. The fix is a seat that owns new business, you, a caller you hire, or an outside firm.
            The one cause Maxionlabs is built for.
          </p>
        </>
      ),
    },
    {
      id: 'small-accounts',
      heading: 'Cause three is too many small accounts',
      body: (
        <>
          <SmallAccountTail />
          <p>
            Yours when account count grew faster than revenue and commission per account is falling. Set a minimum
            going forward, move the tail to a carrier service center, non-renew the worst of it. Randy Schwantz, Insurance Journal 2017, says one or two more large accounts replace the small basket.
          </p>
        </>
      ),
    },
    {
      id: 'diagnostic-table',
      heading: 'Read the symptom, find the cause, price the fix',
      body: (
        <>
          <Table
            caption="Symptom, cause, fix, and what it costs."
            head={['Symptom', 'What it points to', 'The fix', 'What it costs']}
            rows={[
              [
                'Producers close in the room but hold two or three sales meetings a month',
                'The service trap',
                'Account manager takes the bottom of the book, a selling block set and measured',
                'A salary plus benefits, and your attention for a quarter',
              ],
              [
                'Last quarter’s new accounts were referrals and inbound, nobody owns new business',
                'Nobody owns new business',
                'A seat that owns new business, you, an in-house caller, or an outside firm',
                'Your hours, a caller’s pay plus data, or a monthly fee. Maxionlabs is $4,725 a month for 15 qualified sales meetings',
              ],
              [
                'Account count grew faster than revenue, commission per account falling, service team maxed',
                'Too many small accounts',
                'Minimum account size going forward, move or non-renew the tail',
                'A slice of commission on moved accounts, some hard conversations',
              ],
              [
                'Plenty of qualified sales meetings, proposals weeks late',
                'Not enough producers, the one place a hire is right',
                'Hire a producer, or an account manager first if service is slipping',
                'A draw near the BLS median, $62,280 in May 2025, before benefits. About 45.5% of new producers validate',
              ],
            ]}
          />
          <p>Hiring is one row. Even Reagan&apos;s Kevin Stipe says so.</p>
          <Quote
            text="You hire a new salesperson today, you're not going to see significant results for two or three years."
            who="Kevin Stipe, Reagan Consulting, in Insurance Journal, November 2025"
          />
          <p>
            The{' '}
            <a href="/hire-producer-or-book-meetings" className="text-accent hover:underline underline-offset-4">
              producer-or-meetings page
            </a>{' '}
            has the 12 and 36 month costs,{' '}
            <a href="/pricing" className="text-accent hover:underline underline-offset-4">
              the pricing page
            </a>{' '}
            has bought leads against a $25,000 floor, and{' '}
            <a href="/commercial-insurance-leads" className="text-accent hover:underline underline-offset-4">
              commercial insurance lead generation
            </a>{' '}
            has the six ways side by side.
          </p>
        </>
      ),
    },
    {
      id: 'growth-strategies',
      heading: 'Insurance agency growth strategies that move a commercial book',
      body: (
        <>
          <p>
            Every list of insurance agency growth strategies says post more, redo the website, ask for referrals, buy a
            CRM.
          </p>
          <Quote
            text="I want to do things on purpose, not just when they come in and referred in."
            who="Owner, independent agency, Florida"
          />
          <p>
            The ones that work are boring. Set a floor and write above it, and work the renewal date, a January group
            decides in the fall. Give new business one owner and a weekly block, take service off that desk. Then
            feed that seat sales meetings at a pace it can run, ask your producer how many he can take a month.
          </p>
          <p>The website can wait.</p>
        </>
      ),
    },
    {
      id: 'where-maxionlabs-fits',
      heading: 'What 3 months of sales meetings turns into, cause two only',
      body: (
        <>
          <p>
            An illustration. 12 + 15 + 15 is 42 qualified sales meetings, close 1 in 5, about 8 bound accounts, about
            $25,000 of gross commission a year before producer pay, against $14,175 month to month. Agencies keep about 84% of accounts, Liberty Mutual&apos;s figure, so year two on the same book is about $21,000.
          </p>
          <MeetingsFunnel />
          <p>
            We reach every owner in your territory above your floor by email, confirm fit and timing, and the sales
            meeting lands on your producer&apos;s calendar with a brief.
            Qualified means inside your appetite, a need inside 3 months, the decider in the room.
          </p>
          <p>
            $4,725 a month, cancel any month, no share of your commission. 15 qualified sales meetings a
            month, held live, 12 in month one. A no-show doesn&apos;t count, we replace it. $315 back for
            every meeting we miss, your counties never resold.
          </p>
          <p>
            If your cause is the service trap we&apos;ll make it worse, 15 meetings on producers who can&apos;t get to
            their renewals. Run the check,{' '}
            <a href="/#book-call" className="underline underline-offset-2">
              book a call
            </a>{' '}
            and bring the two sheets.
          </p>
        </>
      ),
    },
  ],
  faq: [
    {
      q: 'How do I grow an independent insurance agency when new business is flat?',
      a: 'Mark last month’s sales meetings with new accounts above your floor and who got each one, then sort the book by commission. Open calendars means nobody owns new business, full calendars of existing names means the service trap, a long tail of small accounts means the service desk is full.',
    },
    {
      q: 'What is a good organic growth rate for an independent insurance agency?',
      a: 'The 2026 Best Practices Study update, Big I and Reagan Consulting, has top agencies at 6.2% to 10.2% by revenue band, down from 8.7% to 11.3%. Most of the drop is rate.',
    },
    {
      q: 'Should I drop small accounts to grow my agency?',
      a: 'Move them rather than drop them. About 80% of revenue comes from 20% of accounts, so the tail carries most of the service load for little money. Set a minimum, move the tail to a service center, non-renew only what loses money.',
    },
    {
      q: 'What insurance agency growth strategies work for a commercial agency?',
      a: 'Set a premium floor and write above it, work the renewal date, give new business one owner with a weekly block, and keep service off that desk. The owners I talk to credit new accounts to cold calling, a referral partner or a renewal date they knew about.',
    },
    {
      q: 'Should I hire another producer to grow the agency?',
      a: 'Only if your producers are full, plenty of qualified sales meetings and proposals running late. About 45.5% of new producers validate, and Reagan puts results from a hire two or three years out.',
    },
  ],
  sources: [
    {
      label:
        'IA Magazine, "Big I and Reagan Consulting Release 2026 Best Practices Study Update" (Aug 2026): organic growth 6.2% to 10.2%, down from 8.7% to 11.3%; slower in six of seven revenue bands; commercial lines slowed in all bands but one',
      url: 'https://www.iamagazine.com/?p=34147',
    },
    {
      label:
        'Insurance Journal, "As Organic Growth Rate Slows, Consultant Urges Agents and Brokers to Embrace Tech" (May 2026): Reagan Consulting survey, 11.2% in Q2 2023 to 7.1% in Q4 2025',
      url: 'https://www.insurancejournal.com/magazines/mag-features/2026/05/18/869973.htm',
    },
    {
      label:
        'Insurance Journal, "The Agency Producer Activity Gap and How to Close It: Survey" (Dec 2013): ReSource Pro survey, 25 to 50% selling and 25 to 50% servicing, 83% say under 25% servicing; K. Patrick Armstrong quote',
      url: 'https://insurancejournal.com/news/national/2013/12/11/313983.htm',
    },
    {
      label:
        'Big I Virtual University, Al Diamond, Agency Consulting Group, "What Do You Do When a Producer Doesn\'t Have Time to Produce?": production diminishes after a hundred or a few hundred clients; re-assign the lowest 5% of clients by revenue',
      url: 'https://independentagent.com/vu/Agency-Management/Sales/Diamond/diamondproductiondecline.aspx',
    },
    {
      label:
        'Insurance Journal, Randy Schwantz, "5 Things You Can Do to Double New Business in Your Agency" (Sep 2017): about 80% of revenue from 20% of accounts; one or two more large accounts replace the small basket',
      url: 'https://www.insurancejournal.com/magazines/mag-features/2017/09/18/464178.htm',
    },
    {
      label:
        'Insurance Journal, "How to Grow an Agency in 2026" (Nov 2025): Kevin Stipe, Reagan Consulting, firms need to hire more salespeople, two or three years to significant results',
      url: 'https://www.insurancejournal.com/magazines/mag-features/2025/11/17/847461.htm',
    },
    {
      label:
        'IA Magazine, "Road to Riches: Providing a Path to Producer Validation" (Feb 2024): producer success rate averaged 45.5% among Best Practices agencies, 2023 Best Practices Study',
      url: 'https://www.iamagazine.com/?p=944',
    },
    {
      label: 'U.S. Bureau of Labor Statistics, Occupational Outlook Handbook, Insurance Sales Agents: median annual wage $62,280, May 2025',
      url: 'https://www.bls.gov/ooh/sales/insurance-sales-agents.htm',
    },
    {
      label:
        'Independent Agent magazine, "Retention Success Happens Beyond Renewal, Says Liberty Mutual Study" (Jul 2026): average agency retention around 84%',
      url: 'https://www.iamagazine.com/?p=33852',
    },
    {
      label:
        'r/InsuranceAgent, "Is this considered a solid 2nd year of business? Tips to grow?" (2026): owners on what breaks next at a $2.3M book, service load before lead flow, producers on new business only, service desk on renewals',
      url: 'https://www.reddit.com/r/InsuranceAgent/comments/1we3tat/is_this_considered_a_solid_2nd_year_of_business/',
    },
    {
      label:
        'Maxionlabs, published price and terms: $4,725 a month, 15 qualified sales meetings held live, $315 back per miss',
      url: 'https://www.maxionlabs.com/#price',
    },
  ],
}
