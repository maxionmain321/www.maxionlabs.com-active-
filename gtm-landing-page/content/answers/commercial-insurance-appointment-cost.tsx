import type { SitePage } from '@/lib/site-pages'
import type { AnswerPageProps } from '@/components/answer/AnswerPage'
import { SERIF, INK, MUTED, LINE } from '@/components/home/InsuranceHome'

/**
 * Answer page: what a qualified first meeting with a commercial account is worth, and what it is reasonable to pay.
 *
 * Search cluster (OPS seo-icp-search-demand-2026-11-15.md, row 4): "how much does an insurance appointment setter
 * cost", "how much do insurance leads cost", "how much should I pay an appointment setter", "what is a qualified
 * commercial insurance appointment worth". Nobody answers the commercial version; the AI answer quotes personal-lines
 * per-appointment prices.
 *
 * Every external number is in SOURCES below. Our own terms come from the live homepage, which reads offer-v3.md.
 * The premium math is an illustration and says so on the page. Close rates are stated as assumptions, never results.
 */

export const PAGE: SitePage = {
  path: '/commercial-insurance-appointment-cost',
  title: 'What a qualified commercial insurance appointment is worth',
  description:
    'The math behind one first meeting with a $25K or $50K premium account, cost per bound account by source, and what makes a meeting qualified.',
  kind: 'answer',
  changeFrequency: 'monthly',
}

const SRC = {
  ij2018: 'https://www.insurancejournal.com/magazines/mag-ideaexchange/2018/12/17/511777.htm',
  phonexa: 'https://phonexa.com/blog/insurances-leads-cost/',
  salesbread: 'https://salesbread.com/appointment-setting-services-cost/',
  abstrakt: 'https://www.abstraktmg.com/outbound-pricing-packages/',
  agentero: 'https://agentero.com/blog/insurance-agent-commission-structure-explained',
  sonant: 'https://www.sonant.ai/blog/insurance-agent-commission-rates-by-line',
  liberty: 'https://www.iamagazine.com/?p=33852',
  validation: 'https://www.iamagazine.com/?p=5777',
  stipe: 'https://www.insurancejournal.com/magazines/mag-features/2025/11/17/847461.htm',
  price: 'https://www.maxionlabs.com/#price',
}

const TH = `text-left font-semibold ${INK} px-3 py-2 border-b-2 ${LINE} align-bottom`
const TD = `px-3 py-2 border-b ${LINE} align-top ${MUTED}`
const TD_INK = `px-3 py-2 border-b ${LINE} align-top ${INK}`

function Table({ caption, head, rows }: { caption: string; head: string[]; rows: (string | React.ReactNode)[][] }) {
  return (
    <div className={`rounded-card border ${LINE} bg-white overflow-x-auto`}>
      <table className="w-full text-sm border-collapse min-w-[560px]">
        <caption className={`text-left text-xs ${MUTED} px-3 pt-3 pb-2`}>{caption}</caption>
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
          {rows.map((r, i) => (
            <tr key={i}>
              {r.map((c, j) => (
                <td key={j} className={j === 0 ? TD_INK : TD}>
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

function Quote({ text, who, href }: { text: string; who: string; href?: string }) {
  return (
    <figure className="border-l-2 border-accent/60 pl-4 my-2">
      <blockquote className={`${SERIF} text-lg ${INK} leading-snug`}>&ldquo;{text}&rdquo;</blockquote>
      <figcaption className={`mt-2 text-xs ${MUTED}`}>
        {href ? (
          <a href={href} target="_blank" rel="noopener noreferrer" className="hover:underline underline-offset-4">
            {who}
          </a>
        ) : (
          who
        )}
      </figcaption>
    </figure>
  )
}

/**
 * Illustration, not a result. Commission at 12% is the rate owners quote on our calls and sits inside the
 * published 10% to 20% range for commercial P&C (Agentero, Sonant). Retention at 84% is the average agency
 * figure in Liberty Mutual's 2026 study (IA Magazine). Three years at 84% keeps 1 + 0.84 + 0.71 = 2.55 years of
 * commission. Close rate 1 in 5 is an assumption on the low side of what owners tell us; the 2018 Insurance
 * Journal column assumed 1 in 2.
 */
const WORTH_ROWS = [
  ['Annual premium', '$25,000', '$50,000'],
  ['Commission at 12%, year one', '$3,000', '$6,000'],
  ['Commission over 3 years, 84% retention', 'about $7,600', 'about $15,300'],
  ['One qualified first meeting, 1 in 5 close, year one', '$600', '$1,200'],
  ['One qualified first meeting, 1 in 5 close, 3 years', 'about $1,500', 'about $3,000'],
  ['Same meeting if your producers close 1 in 3, 3 years', 'about $2,500', 'about $5,100'],
]

/**
 * Cost per bound account, per source. Sticker prices are the vendors' own (Phonexa, Salesbread, Abstrakt, the
 * homepage). The conversion rates are assumptions, written in the row, so an owner can swap in his own.
 */
const CPBA_ROWS: (string | React.ReactNode)[][] = [
  [
    'Shared web-form leads',
    '$12 to $30 a lead',
    'A form fill, sold to several agents at once.',
    '1 in 40 binds',
    '$480 to $1,200',
    'Whatever was typed into the form. Usually small.',
  ],
  [
    'Exclusive calls and live transfers',
    '$40 to $120 a call',
    'Someone shopping a quote today, inside their renewal window.',
    '1 in 10 binds',
    '$400 to $1,200',
    'Small to mid. One of several quotes.',
  ],
  [
    'Per-appointment vendor',
    '$75 to a few hundred dollars a set appointment',
    'A calendar slot. Set, not held. Qualified is whatever the contract says.',
    '3 in 4 show, 1 in 5 of those bind',
    'about $2,000 at $300 a slot',
    'Whatever the dialer could book. No premium floor unless you write one in.',
  ],
  [
    'Monthly outbound program, generic B2B',
    'from $5,000 a month',
    'A seat on a dialing floor. Count agreed per contract, their page example is 60 a year.',
    '5 a month, 1 in 5 bind',
    'about $5,000',
    'Depends on the list they build.',
  ],
  [
    'Monthly first-meeting service, commercial only (us)',
    '$4,725 a month, 15 qualified live calls',
    'An owner above your premium floor, renewal inside 3 months, decider present. No-shows replaced.',
    '1 in 5 bind',
    '$1,575',
    '$25,000 premium or 20 enrolled lives and up, the floor in the definition.',
  ],
  [
    'Another producer',
    'Draw plus split, about 3 years',
    'A person who should prospect and close. 57% validate.',
    'Not a per-meeting number',
    'Depends on validation',
    'Whatever they can hunt. Most start small.',
  ],
]

export const CONTENT: AnswerPageProps = {
  eyebrow: 'Guide for owners of commercial P&C and benefits agencies',
  h1: 'What is a qualified commercial insurance appointment worth, and what should it cost?',
  lede:
    'One qualified first meeting with a $25,000 premium account is worth about $600 to your agency in first-year commission, and about $1,500 over three years, if your producers close 1 in 5. At $50,000 premium, double it. So a fair price for that meeting sits in the low hundreds, well above the tens of dollars personal-lines appointment vendors charge and well under what a failed producer hire costs. Every assumption is written out below so you can put your own numbers in. If you sell personal lines, or you are the only producer in the shop, this page is not written for you.',
  updated: '2026-11-15',
  sections: [
    {
      id: 'worth',
      heading: 'A first meeting is worth the commission it leads to, times the odds it closes.',
      body: (
        <>
          <p>
            Owners already run this math on their producers, so appointments, times close rate, times account size. I
            just apply it to one meeting. Commission at 12% is what owners quote us on calls, inside the 10% to 20% range
            published for commercial P&amp;C. Retention at 84% is the average agency figure in Liberty Mutual&apos;s
            2026 study. The close rate is the one number only you know, so I show it two ways.
          </p>
          <Table
            caption="Illustration, not a result. Your own commission, retention and close rate go in the same slots."
            head={['', '$25K premium account', '$50K premium account']}
            rows={WORTH_ROWS}
          />
          <p>
            If your producers close 1 in 3, which is what owners who get in the room off-cycle tell us, the same meeting
            is worth $2,500 to $5,100 over three years.
          </p>
          <p>
            Two caveats though. Commission is not profit, the producer&apos;s split and servicing come out of it. And
            the renewal years are not cash in the month you hold the meeting. Year one is basically the test, and years
            two and three are where the margin shows up.
          </p>
        </>
      ),
    },
    {
      id: 'personal-lines',
      heading: 'Prices built for personal lines do not transfer to a $25,000 commercial account.',
      body: (
        <>
          <p>
            Ask a search engine&apos;s AI what an insurance appointment setter costs and the answer comes back in tens
            of dollars per appointment. Those prices come from final expense, Medicare and personal auto, where the unit
            is a phone call with a consumer and the policy pays a few hundred dollars in commission. Phonexa&apos;s 2026
            price list puts a shared workers comp web lead at $12 to $30 and a commercial live transfer at $30 to $120.
            That is a contact, not a meeting with a decision maker.
          </p>
          <p>
            Three reasons. One, the account. $25,000 in premium pays around $3,000 a year in commission, a personal
            auto policy pays a fraction of that. Two, the unit. A form fill or a transfer is someone shopping a quote
            inside their renewal window with several agents on it, where a first meeting booked months before renewal is
            a conversation nobody else is in. Three, the person. A form fill is whoever typed, a qualified commercial
            meeting is the owner or whoever signs.
          </p>
          <p>
            A 2018 Insurance Journal column by Randy Schwantz priced a
            set new-business appointment at five hundred dollars, assumed a 50% close, and got a cost per sale of
            $1,000 against $2,000 of first-year producer commission.
          </p>
          <Quote
            text="If you had an appointment setter, it could easily be three-to-four per month or 35-to-50 annually."
            who="Randy Schwantz, Insurance Journal, 17 December 2018"
            href={SRC.ij2018}
          />
          <p>
            So that is one commercial data point, already in the hundreds. The gap to the personal-lines number is
            basically a meeting versus a contact.
          </p>
        </>
      ),
    },
    {
      id: 'cost-per-bound-account',
      heading: 'Judge every source on cost per bound account, not on the sticker price.',
      body: (
        <>
          <p>
            A $20 lead and a $315 meeting cannot be compared on price. They can be compared on what one bound account
            costs by the time you have one, and on the size of account each source tends to bring. Sticker prices are
            the vendors&apos; own, the conversion rates are my assumptions, written in the row so you can put yours in.
          </p>
          <Table
            caption="Illustration. Prices from the sources at the end, read 15 November 2026. Conversion rates are assumptions, not measured results."
            head={['Source', 'Sticker price', 'What you actually buy', 'Assumed conversion', 'Cost per bound account', 'Typical account']}
            rows={CPBA_ROWS}
          />
          <p>
            Read across, not down. Shared leads look cheapest per bound account, and for a producer writing $2,000
            policies they can be. For an owner who only wants $25,000 and up, the typical-account column is the one
            that matters, because the cheap sources mostly bring accounts under your floor and your service team pays
            for them for years.
          </p>
        </>
      ),
    },
    {
      id: 'qualified',
      heading: 'A meeting only counts as qualified if it passes four checks before it is booked.',
      body: (
        <>
          <p>
            Every owner asks this before price. What do you actually call qualified? Fair, since the math above assumes
            an account you would actually write. These are the four checks we agree in writing, and I would
            want them in writing from anyone you buy meetings from.
          </p>
          <ol className="list-decimal pl-5 flex flex-col gap-2">
            <li>
              The account is above the premium or group-size line you set, $25,000 in premium or 20 enrolled lives for
              most owners. Below it, the meeting costs your producer the same hour and pays a fraction.
            </li>
            <li>
              There is a need now or inside the next three months. A business that renewed last week is a coffee, not
              an appointment.
            </li>
            <li>
              It sits in your territory, in a line your carriers write, in a class they will actually quote. A trucking
              fleet is worthless to an agency with no trucking market.
            </li>
            <li>
              The owner, or whoever signs, is in the meeting and knew what it was about when they agreed to it.
            </li>
          </ol>
          <p>
            Miss one and it is not qualified, whatever the invoice says. Premium, renewal timing, class and title can
            all be confirmed before the meeting. Whether it binds cannot, which is why a serious vendor guarantees the
            meeting and not the sale.
          </p>
          <Quote
            text="Yes. I am concerned I am overpaying on workers comp."
            who="Painting contractor, Knoxville, Tennessee, replying to an email sent for a commercial agency, November 2026"
          />
          <p>
            That reply already has the pieces of a qualified meeting in it, a named owner, a line the agency writes, and
            a reason to talk now.
          </p>
        </>
      ),
    },
    {
      id: 'producer',
      heading: 'The real alternative is hiring another producer, and that has a price too.',
      body: (
        <>
          <p>
            Most owners weighing a price per meeting are really deciding whether to pay someone to fill the calendars
            of the producers they have, or hire one more producer and hope that one prospects. So the honest comparison
            is against the hire.
          </p>
          <Quote
            text="57% of producers validate, according to the 2020 Best Practices Study from the Big “I” and Reagan Consulting."
            who="Susan Toussaint, Independent Agent magazine, 29 June 2021"
            href={SRC.validation}
          />
          <Quote
            text="You hire a new salesperson today, you're not going to see significant results for two or three years."
            who="Kevin Stipe, Reagan Consulting, in Insurance Journal, 17 November 2025"
            href={SRC.stipe}
          />
          <p>
            So the hire is a three-year draw with a little better than a coin flip on validation, and the owner funds
            the gap. I am not arguing against hiring. The real question is whether you pay for the top of the funnel
            separately from the person who closes.
          </p>
          <p>
            There is a quick way to tell which you need. Count the first meetings your producers held last month with
            accounts above your floor, and who booked them. If it was a handful and the owner booked them, you do not
            have a closing problem, you have an empty calendar, and another producer just adds another empty calendar.
            If your producers are genuinely out of hours, then hire.
          </p>
        </>
      ),
    },
    {
      id: 'reasonable-price',
      heading: 'Price meetings against the first-year commission a month of them brings in.',
      body: (
        <>
          <p>
            Put a month of meetings next to the first-year commission on the accounts they close. If year one covers
            the spend with room left, the renewal years are yours. If it only just covers it, you are betting on
            retention. If not, the meetings cost too much or the accounts are small. Where your line sits depends on
            your close rate, retention and how long you can wait for cash.
          </p>
          <p>
            Worked at $315 a meeting, which is 15 meetings at $4,725 a month. Fifteen meetings, 1 in 5 close, three
            accounts. At $25,000 premium and 12% that is $9,000 of first-year commission against $4,725, about 1.9
            times. At $30,000 average premium, $10,800, about 2.3 times. At $50,000, $18,000, about
            3.8 times. The price did not change between those lines, the account size did, and that is why the premium
            floor is the first thing to agree before anyone talks about price.
          </p>
          <p>
            There are three things that should pull the price down, whoever you are talking to. You are being charged
            for set appointments rather than held ones. Qualified is not defined in writing with your premium floor in
            it. Or there is no credit or refund when the count comes in short. Each one moves risk from the vendor onto
            you, and the price should move with it.
          </p>
        </>
      ),
    },
    {
      id: 'maxionlabs',
      heading: 'Where Maxionlabs fits, and when you should not buy from us.',
      body: (
        <>
          <p>
            We sell one thing to independent commercial P&amp;C and benefits agencies, 15 qualified first meetings a
            month, held live with your producer, with a brief before each one. $4,725 a
            month, month to month, cancel anytime, no share of your commission. Twelve in month one while we ramp. Every
            meeting we come in short is $315 off your next invoice, written into the agreement. A 7-day full refund
            after payment, any reason. Qualified is the four checks above, in your signed agreement. Your counties are
            locked to you and never resold.
          </p>
          <p>
            The way it works, we map every business in your territory and lines from public records, email the owners
            about what just changed in their business, and check every yes against your appetite and floor before it
            goes on the calendar. No telemarketers, no resold lists.
          </p>
          <p>
            There are cases where we are the wrong buy. If you are the only producer and take every meeting yourself,
            15 a month will bury you. If you write mostly personal lines, the per-account math does not hold under a
            few thousand in premium. If your floor is below $25,000 and you want volume, the shared and transfer sources
            above are cheaper for that. For everyone else the call is 20 minutes, and the first thing I do is count the
            owners in your territory showing a trigger right now, which you keep either way.
          </p>
        </>
      ),
    },
  ],
  faq: [
    {
      q: 'How much does an insurance appointment setter cost?',
      a: 'Personal-lines and final-expense vendors charge tens of dollars per appointment or transfer. A set B2B appointment runs from about $75 to a few hundred dollars. A monthly outbound program starts around $5,000 a month. Our commercial first-meeting service is $4,725 a month for 15 qualified live calls, about $315 each.',
    },
    {
      q: 'How much do commercial insurance leads cost?',
      a: 'Published 2026 price lists put a shared workers comp web lead at $12 to $30, a commercial pay-per-call at $40 to $100 and a live transfer at $30 to $120. The price per lead matters less than the cost per bound account and the size of account the source brings, which for web leads is usually small.',
    },
    {
      q: 'What is a qualified commercial insurance appointment?',
      a: 'A first meeting that passes four checks before it is booked. The account is above your premium or group-size floor, there is a need now or within three months, it sits inside your territory and carrier appetite, and the owner or whoever signs is in the meeting and knew what it was about. Miss one and it is not qualified.',
    },
    {
      q: 'How much should I pay an appointment setter?',
      a: 'Work it back from commission. At $25,000 premium, 12% commission and a 1 in 5 close, one qualified first meeting brings in about $600 of first-year commission, so anything well under that leaves the renewal years as profit. Pay less for set rather than held appointments, no written definition of qualified, and no credit when the count comes in short.',
    },
    {
      q: 'Is it cheaper to hire a producer or pay for first meetings?',
      a: 'They solve different problems. A producer is a draw plus split for about three years, and 57% validate according to the 2020 Best Practices Study. Paying for first meetings fills the calendars of producers you already have. If the owner booked last month\'s handful of first meetings himself, the gap is meetings, not closers.',
    },
  ],
  sources: [
    {
      label: 'Randy Schwantz, "Should You Hire an Appointment Setter?", Insurance Journal, 17 December 2018 (price per set appointment, 50% close, 3 to 4 appointments a month)',
      url: SRC.ij2018,
    },
    {
      label: 'Phonexa, "Insurance Leads Cost", 31 March 2026 (shared workers comp web lead $12 to $30, commercial pay-per-call $40 to $100, live transfer $30 to $120)',
      url: SRC.phonexa,
    },
    {
      label: 'Salesbread, "Appointment Setting Services Cost", 23 September 2025 (per-appointment range from $75, retainers $2,000 to $5,000 a month)',
      url: SRC.salesbread,
    },
    {
      label: 'Abstrakt Marketing Group, outbound pricing packages, read 15 November 2026 (Outbound BDR from $5,000 a month, 60-appointment example)',
      url: SRC.abstrakt,
    },
    {
      label: 'Agentero, "Insurance Agent Commission Structure Explained", 2026 (general liability, commercial property and BOP 10% to 20%, workers comp 5% to 10%)',
      url: SRC.agentero,
    },
    {
      label: 'Sonant, "Insurance agent commission rates by line of business", July 2026 (commercial P&C 10% to 20% new, 10% to 15% renewal)',
      url: SRC.sonant,
    },
    {
      label: 'Independent Agent magazine, "Retention Success Happens Beyond Renewal, Says Liberty Mutual Study", 15 July 2026 (average agency retention around 84%)',
      url: SRC.liberty,
    },
    {
      label: 'Susan Toussaint, "3 Reasons Producer Validation Rates Are So Low", Independent Agent magazine, 29 June 2021 (57% validate, three-year schedule, 2020 Best Practices Study)',
      url: SRC.validation,
    },
    {
      label: 'Andrea Wells, "How to Grow an Agency in 2026", Insurance Journal, 17 November 2025 (Kevin Stipe on two to three years to results from a new hire)',
      url: SRC.stipe,
    },
    {
      label: 'Maxionlabs, published terms: $4,725 a month, 15 qualified meetings, $315 credit per miss, 7-day refund',
      url: SRC.price,
    },
  ],
}
