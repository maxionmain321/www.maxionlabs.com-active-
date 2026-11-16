import type { SitePage } from '@/lib/site-pages'
import type { AnswerPageProps } from '@/components/answer/AnswerPage'
import { LINE, MUTED, INK, SERIF } from '@/components/home/InsuranceHome'
import { SetterPriceLadder, BoundAccountMath, SetVsHeld, ThreeMonthsPaidVsBook } from '@/components/drawings'

/**
 * Answer page for "how much does an appointment setter cost", answered for the owner of a commercial P&C or benefits
 * agency (MAX-738).
 *
 * v2, 2026-11-16. Retargeted and rewritten in the plain-book format Max approved on /hire-producer-or-book-meetings.
 *  Demand (Google autocomplete, suggestqueries client=firefox hl=en gl=us, 2026-11-16): "how much does an appointment
 *  setter cost" returns itself plus "how much does appointment setting cost" and "how much do appointment setters
 *  cost". Every insurance-specific shape returned nothing: "how much does an insurance appointment setter cost",
 *  "insurance appointment setting cost", "cost per appointment insurance", "pay per appointment insurance", "insurance
 *  appointment setting services cost", and the v1 query "what is a qualified commercial insurance appointment worth".
 *  "how much do insurance leads cost" has evidence but is personal-lines heavy and sits next to /commercial-insurance-leads.
 *  So the h1 and title carry the measured query with "insurance" added, and the page answers it for owners.
 *  v1 is in content/answers/_archive/ for comparison.
 *
 * Every external number was opened live on 2026-11-16 and sits in SOURCES:
 *  - Salesbread, appointment setting services cost (2026): hourly $16.12 (PayScale), per appointment $75 to a few
 *    hundred dollars per scheduled meeting, subscription $2,000 to $4,500 a month, retainer $2,000 to $5,000
 *  - Abstrakt, outbound pricing: Outbound BDR starting at $5,000 a month; "ten meetings a month" as their example
 *  - Phonexa, insurance leads cost (2026): shared workers comp web form $12 to $30, commercial pay-per-call $40 to $100
 *  - Insurance Journal, Schwantz (Dec 2018): five hundred dollars per set appointment, 50% close, $1,000 per sale
 *  - Sonant: commercial P&C commission 10% to 20% new, 10% to 15% renewal; Agentero: P&C 8% to 20%
 *  - IA Magazine (Jul 2026), Liberty Mutual study: average agency retention around 84%
 *  - 11 of 19 owners burned by a lead or appointment vendor: our own October 2026 calls (OPS buyer-voice-2026-10-24)
 * Offer numbers from 00_foundation/offer-v3.md only. Money over 3 months (Max, 2026-11-16): 12 + 15 + 15 = 42 meetings,
 * 1 in 5 close, about 8 accounts, about $25,000 gross commission a year before producer pay, year two about $21,000
 * at 84%, against $14,175 month to month or $12,500 prepaid. Never a lifetime total. "$500" is a banned string on
 * the site (a retired price), so the Schwantz figure is written out in words.
 */

export const PAGE: SitePage = {
  path: '/commercial-insurance-appointment-cost',
  title: 'How much does an insurance appointment setter cost?',
  description:
    'Hourly, per appointment, monthly and outsourced setter prices, and the bound-account math that tells a commercial agency owner what one sales meeting is worth.',
  kind: 'answer',
  changeFrequency: 'monthly',
  targetQuery: 'how much does an appointment setter cost',
}

const SRC = {
  salesbread: 'https://salesbread.com/appointment-setting-services-cost/',
  abstrakt: 'https://www.abstraktmg.com/outbound-pricing-packages/',
  phonexa: 'https://phonexa.com/blog/insurances-leads-cost/',
  ij2018: 'https://www.insurancejournal.com/magazines/mag-ideaexchange/2018/12/17/511777.htm',
  sonant: 'https://www.sonant.ai/blog/insurance-agent-commission-rates-by-line',
  agentero: 'https://agentero.com/blog/insurance-agent-commission-structure-explained',
  liberty: 'https://www.iamagazine.com/?p=33852',
  price: 'https://www.maxionlabs.com/#price',
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
  h1: 'How much does an insurance appointment setter cost, and what is one sales meeting actually worth to you?',
  lede:
    "Honestly, it depends what you're buying. A caller is about $16 an hour, a set appointment runs $75 to a few hundred dollars, a retainer is $2,000 to $5,000 a month, and the big outbound shops start at $5,000 a month. We charge $4,725 a month for 15 qualified sales meetings held live with the owner, so about $315 each. None of those numbers means anything on its own though. The one that does is what I call the bound-account math. Take any price, work out how many of those meetings your producers need to bind one account, and put that next to what the account pays you.",
  updated: '2026-11-16',
  sections: [
    {
      id: 'price-list',
      heading: 'The price lists you find online are for a different product than the one you need',
      body: (
        <>
          <Idea>Every setter price out there is a price per slot. You don&apos;t buy slots, you buy accounts.</Idea>
          <p>
            Search it and you get four shapes. Salesbread&apos;s 2026 guide puts an hourly setter at $16.12 an hour, a set
            appointment at $75 to a few hundred dollars, a subscription at $2,000 to $4,500 a month and a retainer at
            $2,000 to $5,000. Abstrakt&apos;s outbound program starts at $5,000 a month.
          </p>
          <p>
            Then there&apos;s the lead side. Phonexa&apos;s 2026 list has a shared workers comp web lead at $12 to $30
            and a commercial pay-per-call at $40 to $100. All of it is in the sources at the end.
          </p>
          <p>
            So the numbers are real. What none of them tell you is what you get for the money, a scheduled meeting with
            who exactly, above what premium, and did the person show up.
          </p>
          <SetterPriceLadder />
          <p>That&apos;s the problem with the question. Every answer is priced on the slot, and your agency makes money on the account.</p>
        </>
      ),
    },
    {
      id: 'bound-account-math',
      heading: 'Run the bound-account math before you compare a single price',
      body: (
        <>
          <Idea>Price the account you bind, not the appointment you pay for.</Idea>
          <p>
            You already know the three numbers. How many qualified sales meetings your producers need to bind one
            account, say 1 in 5. What a typical account pays, so $25,000 in premium at 12% is about $3,000 a year, and
            commercial P&amp;C commission runs 10% to 20% on new business. And what one meeting costs you.
          </p>
          <p>
            Now multiply, because one bound account costs you 5 meetings, whatever those meetings cost. At $315 a
            meeting that&apos;s $1,575 for an account paying about $3,000 a year, and it renews. At $300 a set slot
            where 3 in 4 show up you need about 7 slots, so about $2,000. At $20 a shared lead with 1 in 40 binding,
            $800, and the account is usually small.
          </p>
          <BoundAccountMath />
          <p>Owners ask me this on nearly every call.</p>
          <Quote
            text="do we pay you per appointment or do we pay you if we make a sale? How do we pay you?"
            who="Vice president, specialty commercial broker, on a call with us, October 2026"
          />
          <p>
            My answer is the math above. You pay to get your producer in the room with a qualified owner, and the
            account pays you back over years. If that doesn&apos;t work on your close rate and your typical account,
            don&apos;t buy meetings from anyone, including us.
          </p>
        </>
      ),
    },
    {
      id: 'owner-story',
      heading: 'What the owners who paid per set appointment got for it, in their own words',
      body: (
        <>
          <Idea>Nobody gets burned on the price. They get burned on what the price bought.</Idea>
          <p>
            A principal of a commercial agency in the Carolinas told me about the telemarketers he&apos;d paid over the
            years. The slots got filled.
          </p>
          <Quote
            text="We've worked with several telemarketers over the years. I found the quality of those leads were less valuable."
            who="Principal, commercial P&C agency, the Carolinas, on a call with us, October 2026"
          />
          <p>
            His word for it a minute later was &ldquo;almost trickery.&rdquo; And he&apos;s not the outlier. Of the 19
            agency owners we spoke to in October, 11 had been burned by a lead or appointment vendor before us.
          </p>
          <p>
            Picture it. The invoice says 10 appointments. Your producer drives out and the owner isn&apos;t there, or
            it&apos;s a two-truck operation under your floor. He stops trusting the calendar, and you quietly stop paying.
          </p>
          <p>
            Randy Schwantz ran the math in Insurance Journal in 2018, five hundred dollars a set appointment, a 50%
            close, so $1,000 a sale against $2,000 of first-year producer commission. The math worked. What he
            couldn&apos;t put in the column was whether the appointment was any good.
          </p>
          <p>So the price was never the problem. Nobody had written down what the price was buying.</p>
        </>
      ),
    },
    {
      id: 'set-vs-held',
      heading: 'Four things in the contract move the real price more than the number on the invoice',
      body: (
        <>
          <Idea>Set is not held. Held is not qualified. Qualified is whatever the paper says it is.</Idea>
          <ol className="list-decimal pl-5 flex flex-col gap-2">
            <li>
              <strong>Set or held.</strong> A set appointment is a calendar slot. A held one is your producer in the room
              with the owner. If a no-show still counts, you&apos;re paying for slots.
            </li>
            <li>
              <strong>Your floor, in writing.</strong> $25,000 in premium or 20 enrolled lives, or whatever yours is.
              Below it the meeting costs your producer the same hour and pays a fraction.
            </li>
            <li>
              <strong>Who is in the room and why now.</strong> The owner or whoever signs, with a need now or inside 3
              months. A business that renewed last week is a coffee.
            </li>
            <li>
              <strong>What happens when the count comes in short.</strong> A credit, written in. No credit means the risk
              is all yours and the price should be lower for it.
            </li>
          </ol>
          <p>
            Say you buy 10 set appointments at $300 each, so $3,000 on the invoice. 7 show. Of those, 4 are above your
            $25,000 floor and 3 are under it.
          </p>
          <p>You paid $3,000 for 4 meetings worth your producer&apos;s hour. That&apos;s $750 each, not $300.</p>
          <SetVsHeld />
          <p>
            Flip it. If every meeting is held, above your floor, with the decider in the room, and a miss comes off the
            next invoice, then $315 is $315. Those four things are the difference, not the rate card.
          </p>
        </>
      ),
    },
    {
      id: 'three-months',
      heading: 'What 3 months of qualified sales meetings turns into, against what you pay for them',
      body: (
        <>
          <Idea>Look at 3 months, not 1. One month is a sample. Three months is a book that renews.</Idea>
          <p>
            Your numbers will differ, so run yours. This is an illustration, not a quote, and all of it is gross
            commission before producer pay and servicing.
          </p>
          <p>
            Three months with us is 12 + 15 + 15, so 42 qualified sales meetings, held live with the owner. Say your
            producers close 1 in 5. That&apos;s about 8 bound accounts at about $3,000 each, so about $25,000 of gross
            commission a year.
          </p>
          <p>
            You paid $14,175 for those 3 months, or $12,500 if you prepay the quarter. So year one on that book is a
            bit under double what you paid, before a single renewal.
          </p>
          <p>
            And it renews. The average agency keeps about 84% of its accounts, the Liberty Mutual figure in IA Magazine,
            so year two on the same book is about $21,000 and you paid nothing more for it.
          </p>
          <ThreeMonthsPaidVsBook />
          <p>
            The floor is only a floor. A $75,000 or $100,000 account counts as one meeting, same as a $25,000 one, and
            we take no share of the commission.
          </p>
        </>
      ),
    },
    {
      id: 'compare',
      heading: 'Every way to buy new business, compared on cost per bound account',
      body: (
        <>
          <Idea>Read the table across, not down. The last column is the one that decides it.</Idea>
          <p>Sticker prices are the vendors&apos; own. Conversion rates are my assumptions, written in the row, so put yours in.</p>
          <Table
            caption="Illustration. Prices read 16 November 2026. Conversion rates are assumptions, not measured results."
            head={['Source', 'Sticker price', 'What you actually buy', 'Assumed conversion', 'Cost per bound account', 'Typical account']}
            rows={[
              ['Shared web leads', '$12 to $30 a lead', 'A form fill, sold to several agents at once', '1 in 40 binds', '$480 to $1,200', 'Usually small'],
              ['Pay-per-call', '$40 to $100 a call', 'Someone shopping a quote today', '1 in 10 binds', '$400 to $1,000', 'Small to mid, one of several quotes'],
              ['Hourly caller or VA', 'About $16 an hour, plus dialer, data and your hours', 'A person dialing your list', 'Depends on you', 'Depends on you', 'Whatever your list holds'],
              ['Per-appointment vendor', '$75 to a few hundred a set slot', 'A calendar slot, set, not held', '3 in 4 show, 1 in 5 bind', 'About $2,000 at $300 a slot', 'No floor unless you write one in'],
              ['Monthly outbound program', 'From $5,000 a month', 'A seat on a dialing floor, their example is ten meetings a month', '10 a month, 1 in 5 bind', 'About $2,500', 'Depends on the list they build'],
              ['Maxionlabs', '$4,725 a month, 15 qualified sales meetings', 'An owner above your floor, decider in the room, no-shows replaced', '1 in 5 bind', '$1,575', '$25,000 in premium or 20 lives and up'],
            ]}
          />
          <p>
            Shared leads look cheapest per bound account, and for a producer writing $2,000 policies they are. For an
            owner who only wants $25,000 and up, the last column decides it. The cheap rows bring accounts under your
            floor, and your service team carries them for years.
          </p>
        </>
      ),
    },
    {
      id: 'when-not',
      heading: 'When you should not pay anyone for appointments, and that includes us',
      body: (
        <>
          <Idea>Some agencies shouldn&apos;t buy meetings at all. Here&apos;s how to tell.</Idea>
          <ol className="list-decimal pl-5 flex flex-col gap-2">
            <li>
              <strong>You&apos;re the only producer</strong> and take every meeting yourself. 15 a month will bury you.
            </li>
            <li>
              <strong>You write mostly personal lines.</strong> The per-account math doesn&apos;t hold under a few
              thousand in premium. Shared leads are built for that.
            </li>
            <li>
              <strong>Your floor is under $25,000 and you want volume.</strong> Same answer, the lead rows win on price
              for small accounts.
            </li>
            <li>
              <strong>Your producers are already full.</strong> Then you&apos;re short of producers, not meetings.
              Hire, and I wrote up{' '}
              <a href="/hire-producer-or-book-meetings" className="underline underline-offset-2">
                how to tell which one you are
              </a>
              .
            </li>
          </ol>
          <p>One owner put it better than me.</p>
          <Quote text="It's about the salary of a sales rep." who="COO, employee benefits agency, east coast, on our first call, October 2026" />
          <p>
            She&apos;s right. A rep you don&apos;t hire, train or manage, with a refund a rep never comes with. Rather
            have the rep? Hire the rep.
          </p>
        </>
      ),
    },
    {
      id: 'where-maxionlabs-fits',
      heading: 'Where Maxionlabs fits, and what the $4,725 a month actually buys you',
      body: (
        <>
          <Idea>Your producers run the meeting and close it. We get them in the room with the right owner.</Idea>
          <p>
            We map every business in your territory that fits your appetite and your floor, reach the owners by email,
            and confirm fit and timing with the ones who reply. Then the sales meeting goes on your producer&apos;s
            calendar with a brief.
          </p>
          <p>
            The terms are short. $4,725 a month, month to month, cancel any month, no share of your commission. 15
            qualified sales meetings a month, held live with the owner or the decider, 12 in month one while we ramp. A
            no-show doesn&apos;t count toward the 15, we replace it.
          </p>
          <p>
            Qualified is written into your agreement, so the four things above are the contract. $315 back for every
            meeting we miss, a 7-day full refund for any reason, and your counties are never resold to another agency.
          </p>
          <p>
            Want to run the bound-account math on your numbers?{' '}
            <a href="/#book-call" className="underline underline-offset-2">
              Book a call
            </a>{' '}
            and bring your close rate and your typical account. If it comes out as shared leads or a hire, I&apos;ll say
            so on the call.
          </p>
        </>
      ),
    },
  ],
  faq: [
    {
      q: 'How much does an appointment setter cost per hour?',
      a: 'About $16 an hour in the US, the PayScale figure Salesbread quotes for 2026. That is the caller only. Add a dialer, data, a script and your own hours, because somebody manages them and it is usually the owner.',
    },
    {
      q: 'How much does appointment setting cost per month?',
      a: 'Retainers run $2,000 to $5,000 a month and the larger outbound programs start at $5,000 a month, count agreed per contract. We charge $4,725 a month for 15 qualified sales meetings held live with the owner, about $315 each, and $315 back for every one we miss.',
    },
    {
      q: 'How much should I pay per appointment?',
      a: 'Work it back from the account. At $25,000 in premium, 12% commission and a 1 in 5 close, one qualified sales meeting is worth about $600 of first-year commission, and the account renews. Pay less when it is set rather than held, when qualified is not written down with your floor in it, and when a short month carries no credit.',
    },
    {
      q: 'What makes a commercial insurance appointment qualified?',
      a: 'Four checks before it goes on the calendar. The account is above your premium or group-size floor, there is a need now or inside 3 months, it sits inside your territory and carrier appetite, and the owner or whoever signs is in the meeting and knew what it was about. Miss one and it is not qualified.',
    },
    {
      q: 'Is it cheaper to buy insurance leads than to pay for sales meetings?',
      a: 'Per bound account, shared leads come out cheaper on paper, $480 to $1,200 against about $1,575 for a qualified sales meeting at a 1 in 5 close. The difference is the account. Shared leads mostly bring small accounts several agents are quoting. If your floor is under $25,000, buy the leads.',
    },
  ],
  sources: [
    {
      label:
        'Salesbread, "Appointment Setting Services Cost + Which Model is Best (2026)": hourly $16.12 (PayScale), $75 to a few hundred dollars per scheduled meeting, subscription $2,000 to $4,500 a month, retainer $2,000 to $5,000',
      url: SRC.salesbread,
    },
    {
      label: 'Abstrakt Marketing Group, outsourced BDR pricing, read 16 November 2026: Outbound BDR starting at $5,000 a month, ten meetings a month as their example',
      url: SRC.abstrakt,
    },
    {
      label: 'Phonexa, "Your Guide to Insurance Leads Cost in 2026": shared workers comp web lead $12 to $30, commercial pay-per-call $40 to $100',
      url: SRC.phonexa,
    },
    {
      label:
        'Insurance Journal, Randy Schwantz, "Should You Hire an Appointment Setter?" (Dec 2018): five hundred dollars per set appointment, 50% close, $1,000 per sale against $2,000 of first-year producer commission',
      url: SRC.ij2018,
    },
    {
      label: 'Sonant, "Insurance agent commission rates by line of business": commercial P&C 10% to 20% on new business, 10% to 15% on renewal',
      url: SRC.sonant,
    },
    {
      label: 'Agentero, "Insurance Agent Commission Structure Explained": P&C commissions run 8% to 20% of premium',
      url: SRC.agentero,
    },
    {
      label: 'Independent Agent magazine, "Retention Success Happens Beyond Renewal, Says Liberty Mutual Study" (Jul 2026): average agency retention around 84%',
      url: SRC.liberty,
    },
    {
      label:
        'Maxionlabs, published price and terms: $4,725 a month, or $12,500 for 90 days prepaid, 15 qualified sales meetings held live, $315 back per miss, 7-day full refund',
      url: SRC.price,
    },
  ],
}
