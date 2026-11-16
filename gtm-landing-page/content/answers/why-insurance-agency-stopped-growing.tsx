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
 * The $1,500 and $30,000 accounts in the small-account drawing are an illustration, said so in the text.
 * Offer numbers come from 00_foundation/offer-v3.md only. The money is shown over 3 months (Max, 2026-11-16):
 * 12 + 15 + 15 = 42 meetings, 1 in 5 close, about 8 accounts, about $25,000 of gross commission a year before producer
 * pay, year two about $21,000 at 84%, against $14,175 month to month or $12,500 prepaid. Never a lifetime total.
 */

export const PAGE: SitePage = {
  path: '/why-insurance-agency-stopped-growing',
  title: 'How to grow an insurance agency when new business is flat',
  description:
    'New business flat? One of three causes, the service trap, nobody owns new business, or too many small accounts. A 10 minute check says which, and the fix.',
  kind: 'answer',
  changeFrequency: 'monthly',
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
    "Honestly, when an owner asks me how to grow the agency, the real question is why new business stopped. It's one of three causes. The service trap, where producers spend the week on renewals instead of selling. Nobody owns new business, so it's referrals plus whoever had a slow week. Or too many small accounts, so the service desk is full. All three look the same from outside, flat new business. One 10 minute check tells you which, I call it the calendar-and-book check.",
  updated: '2026-11-16',
  sections: [
    {
      id: 'three-causes',
      heading: 'New business goes flat for one of three causes, and the owner usually names the wrong one',
      body: (
        <>
          <Idea>Growth is new accounts times what they pay you. When it stalls, one of three things inside the shop broke.</Idea>
          <p>
            Picture a $4M commercial agency. Revenue grew 9% in 2023 and 9% again in 2024, so nobody worried. Then 2025
            came in flat and the owner pulled the new-business report. 11 new commercial accounts all year.
          </p>
          <p>His first thought is the one every owner has. We need another producer.</p>
          <p>
            So I asked him two things. How many sales meetings with a new account did the team hold last month, and
            who got each one. The answer was 3, and 2 of them were his.
          </p>
          <p>A producer problem comes later, if at all. First, one of these three.</p>
          <ol className="list-decimal pl-5 flex flex-col gap-2">
            <li>
              <strong>The service trap.</strong> Your producers can close, they&apos;re just never in the room. The
              week goes to renewals and certificates for accounts they already wrote.
            </li>
            <li>
              <strong>Nobody owns new business.</strong> Ask who owns the sales meeting with a stranger and the room
              goes quiet. New accounts are referrals and whatever you do between fires.
            </li>
            <li>
              <strong>Too many small accounts.</strong> You wrote everything that walked in for ten years, and now a
              few hundred small accounts take most of the service hours.
            </li>
          </ol>
          <p>They overlap, I know. But one of them is holding you, fix that one first.</p>
        </>
      ),
    },
    {
      id: 'rate-did-it',
      heading: 'Rate did your growing for three years, so check that before you blame anyone',
      body: (
        <>
          <Idea>If revenue grew and new accounts didn&apos;t, the carriers grew you. And now they&apos;ve stopped.</Idea>
          <p>
            Reagan Consulting&apos;s survey has the line. Average organic growth for independent agencies peaked at
            11.2% in the second quarter of 2023 and was down to 7.1% by the fourth quarter of 2025, on softening
            P&amp;C rates.
          </p>
          <GrowthRateLine />
          <p>
            So if your top line grew in 2023 and 2024 and your new-account count didn&apos;t, basically rate did it.
            That&apos;s weather, and the weather turned.
          </p>
        </>
      ),
    },
    {
      id: 'the-check',
      heading: 'Run the calendar-and-book check, two reports and about 10 minutes',
      body: (
        <>
          <Idea>Two sheets of paper. Last month&apos;s calendar and the book sorted by commission.</Idea>
          <ol className="list-decimal pl-5 flex flex-col gap-2">
            <li>
              On the calendar, mark every sales meeting last month with a new business above your floor, say $25,000
              in premium or 20 or more enrolled lives. Renewal reviews don&apos;t count.
            </li>
            <li>Next to each mark, write who got it, a producer, a referral, you, or it walked in.</li>
            <li>On the book report, sort every account by commission and look at where the service hours go.</li>
          </ol>
          <CalendarAndBook />
          <p>
            Now read it. Open calendars, 3 sales meetings for the team and 2 of them yours, that&apos;s cause two. Full calendars where every name is an existing client, that&apos;s cause one.
          </p>
          <p>
            And if 20% of accounts bring about 80% of commission while the account managers drown in the other 80%,
            that&apos;s cause three.
          </p>
        </>
      ),
    },
    {
      id: 'service-trap',
      heading: 'Cause one is the service trap, your producers servicing the book instead of selling',
      body: (
        <>
          <Idea>A producer who can close but never gets in the room is a very expensive account manager.</Idea>
          <p>
            The survey everybody still quotes is from 2013, ReSource Pro and Insurance Journal. Most producers said
            they spend 25% to 50% of the week selling and another 25% to 50% servicing accounts. 83% of the same people
            said servicing should take under 25%.
          </p>
          <Quote
            text="it becomes very easy for producers to get sucked into the service trap."
            who="K. Patrick Armstrong, CPCU, ReSource Pro, in Insurance Journal, December 2013"
          />
          <ServiceTrapWeek />
          <p>
            Al Diamond put it plainly for the Big &ldquo;I&rdquo;. Past a hundred or a few hundred clients, a
            producer&apos;s new business drops every year. Some simply haven&apos;t told the owner they&apos;re no longer
            producers.
          </p>
          <p>
            This is your cause when the producers bind fine in front of a qualified owner, but hold two or three
            sales meetings a month and the calendar is full of names you already have.
          </p>
          <p>
            The fix is capacity, more meetings would just pile up. Move service work to an account
            manager, set a selling block and measure it. Diamond re-assigns the lowest 5% of clients off the
            producer&apos;s desk. It costs a salary and a quarter of your attention.
          </p>
        </>
      ),
    },
    {
      id: 'nobody-owns-new-business',
      heading: 'Cause two is nobody owns new business, so it is referrals plus whoever had a slow week',
      body: (
        <>
          <Idea>Real revenue, none of it repeatable on purpose. That&apos;s the tell.</Idea>
          <p>
            Look at where last quarter&apos;s new accounts came from. Randy Schwantz&apos;s line is that producers
            will tell you about a referral they once got that turned into some big dough, but they won&apos;t have a
            process.
          </p>
          <p>Owners say it their own way.</p>
          <Quote
            text="we're only writing say one good size new client a month, so we're not onboarding a ton of new business."
            who="Principal, commercial P&C agency, South Florida, on a call with me"
          />
          <Quote
            text="we struggle with that. If we were good at that, we wouldn't need to pay you to do it."
            who="President, commercial P&C agency, Tennessee, on prospecting"
          />
          <p>
            This is your cause when producers have open calendars and the few sales meetings you hold close well,
            because they&apos;re warm. The problem is the count.
          </p>
          <p>
            The fix is a seat that owns new business. That&apos;s you until you stop, a caller you hire and manage, or
            an outside firm while your producers run the meetings. This is the one cause Maxionlabs is built for, and I
            say so at the end rather than pretend we fix all three.
          </p>
        </>
      ),
    },
    {
      id: 'small-accounts',
      heading: 'Cause three is too many small accounts eating the hours that should go to the next big one',
      body: (
        <>
          <Idea>Looks like cause one from the outside. The difference is what the team is slammed with.</Idea>
          <p>
            Schwantz ran this in a 2017 Insurance Journal column. Print every account and sort it, and about 80% of
            revenue comes from about 20% of accounts. The rest bring little money and most of the workload.
          </p>
          <p>
            Say a $1,500 commission account and a $30,000 one. Both want certificates, a remarket and a call back, on
            the same desk. 16 of the small ones eat the hours the next big account needed. That&apos;s an
            illustration, your book has its own shape.
          </p>
          <SmallAccountTail />
          <p>
            This is your cause when account count grew faster than revenue, commission per account is falling, and the
            account managers are maxed on a book that&apos;s mostly under your own stated minimum.
          </p>
          <p>
            The fix is a minimum account size going forward and a plan for the tail. Move it to a carrier service
            center or a small-business desk, or non-renew the worst of it. Schwantz says one or two more large accounts
            replace the whole small basket.
          </p>
        </>
      ),
    },
    {
      id: 'diagnostic-table',
      heading: 'Read the symptom, find the cause, then price the fix before you buy anything',
      body: (
        <>
          <Idea>Costs here are the rough shape of the spend, so you can compare.</Idea>
          <Table
            caption="Symptom, cause, fix, and what it costs."
            head={['Symptom', 'What it points to', 'The fix', 'What it costs']}
            rows={[
              [
                'Producers close well in the room, but hold two or three sales meetings a month',
                'The service trap',
                'Account manager takes the bottom of the book, a selling block set and measured',
                'A salary plus benefits, and your attention for a quarter',
              ],
              [
                'Last quarter’s new accounts were referrals and inbound, nobody can name who owns new business',
                'Nobody owns new business',
                'A seat that owns sales meetings with new accounts, you, an in-house caller, or an outside firm',
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
          <p>
            Hiring is one row. Even Reagan&apos;s Kevin Stipe, who wants agencies hiring more salespeople, says this.
          </p>
          <Quote
            text="You hire a new salesperson today, you're not going to see significant results for two or three years."
            who="Kevin Stipe, Reagan Consulting, in Insurance Journal, November 2025"
          />
          <p>
            The{' '}
            <a href="/hire-producer-or-book-meetings" className="text-accent hover:underline underline-offset-4">
              producer-or-meetings page
            </a>{' '}
            walks that out with the 12 and 36 month costs. Bought leads above a $25,000 floor, the{' '}
            <a href="/pricing" className="text-accent hover:underline underline-offset-4">
              pricing page
            </a>{' '}
            has that comparison.
          </p>
        </>
      ),
    },
    {
      id: 'where-maxionlabs-fits',
      heading: 'What 3 months of sales meetings turns into, and where Maxionlabs fits, cause two only',
      body: (
        <>
          <Idea>Look at 3 months rather than 1. One month is a sample. Three months is a book that renews.</Idea>
          <p>
            If cause two is yours, here&apos;s the maths, as an illustration. A $25,000 premium account at 12%
            commission is about $3,000 of agency commission a year, gross, before producer pay and servicing.
          </p>
          <p>
            Three months with us is 12 + 15 + 15, so 42 qualified sales meetings, all held live with the owner. Say
            your producers close 1 in 5. That&apos;s about 8 bound accounts, so about $25,000 of gross commission a
            year.
          </p>
          <p>
            You paid $14,175 month to month for those 3 months, or $12,500 prepaid. And it renews. The average agency
            keeps about 84% of its accounts, the Liberty Mutual figure in IA Magazine, so year two on the same book is
            about $21,000 for nothing more.
          </p>
          <MeetingsFunnel />
          <p>
            We&apos;re the seat. We map every business in your territory that fits your floor, reach the owners by
            email, confirm fit and timing, and the sales meeting lands on your producer&apos;s calendar with a brief.
          </p>
          <p>
            $4,725 a month, month to month, cancel any month, no share of your commission. 15 qualified sales meetings a
            month, held live with the owner or the decider, 12 in month one while we ramp. A no-show doesn&apos;t
            count, we replace it.
          </p>
          <p>
            Qualified is written into your agreement. Above your floor, inside your appetite, a need inside 3 months,
            the decider in the room. $315 back for every meeting we miss, a 7-day full refund, and your counties are
            never resold.
          </p>
          <p>
            If your cause is the service trap, honestly we&apos;ll make it worse. 15 meetings land on producers who
            can&apos;t get to their renewals. Fix capacity first.
          </p>
          <p>
            Not sure which is yours? Run the check,{' '}
            <a href="/#book-call" className="underline underline-offset-2">
              book a call
            </a>{' '}
            and bring the two sheets. If it says capacity, I&apos;ll tell you to hire an account manager instead.
          </p>
        </>
      ),
    },
  ],
  faq: [
    {
      q: 'How do I grow an independent insurance agency when new business is flat?',
      a: 'Find the cause first. Mark last month’s sales meetings with new accounts above your floor and who got each one, then sort the book by commission. Open calendars means nobody owns new business, full calendars of existing names means the service trap, a long tail of small accounts means the service desk is the limit. Fix that one first.',
    },
    {
      q: 'What is a good organic growth rate for an independent insurance agency?',
      a: 'The 2026 Best Practices Study update from the Big I and Reagan Consulting put organic growth for top agencies at 6.2% to 10.2% by revenue band, down from 8.7% to 11.3%. Reagan’s quarterly survey had the wider market at 7.1% in late 2025, down from an 11.2% peak in 2023. Most of the drop is rate.',
    },
    {
      q: 'Should I drop small accounts to grow my agency?',
      a: 'Usually move them rather than drop them. About 80% of revenue comes from 20% of accounts, so the tail carries most of the service load for little money. Set a minimum going forward, move the tail to a service center, and non-renew only what loses money.',
    },
    {
      q: 'Should I hire another producer to grow the agency?',
      a: 'Only if your producers are full, holding plenty of qualified sales meetings with proposals running late. If they hold two or three a month, a new producer shares the same empty calendar. About 45.5% of new producers validated in the 2023 Best Practices Study, and Reagan puts results from a new hire two or three years out.',
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
        'Insurance Journal, Randy Schwantz, "Prospecting: The No. 1 Source of New Production" (Aug 2018): producers cite a referral they once got but have no process',
      url: 'https://insurancejournal.com/magazines/mag-ideaexchange/2018/08/20/498120.htm',
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
        'Maxionlabs, published price and terms: $4,725 a month, or $12,500 for 90 days prepaid, 15 qualified sales meetings held live, $315 back per miss, 7-day full refund',
      url: 'https://www.maxionlabs.com/#price',
    },
  ],
}
