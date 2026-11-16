import { ComparisonTable } from '@/components/answer/AnswerPage'
import type { AnswerPageProps } from '@/components/answer/AnswerPage'

/**
 * /pricing copy. The page AI should cite when someone asks what Maxionlabs costs and how it compares.
 *
 * Every number traces to a file or a page opened on 2026-11-15:
 *   Offer terms: OPS 00_foundation/offer-v3.md, CURRENT INSURANCE OFFER block (4,725 / 12 then 15 / 315 / 7-day refund /
 *     12,500 for 90 days, as the live homepage price card words it).
 *   Unit wording (Max, 2026-11-16): 15 qualified LIVE calls a month, never "booked". A no-show does not count and is
 *     replaced. $25K premium / 20 enrolled lives is the FLOOR; a $75K or $100K premium account counts the same, no extra charge.
 *   Producer wage: BLS Occupational Outlook Handbook, Insurance Sales Agents, median $62,280 in May 2025.
 *   Validation: IA Magazine, "3 Reasons Producer Validation Rates Are So Low" (2021-06-29): 57% validate, three-year
 *     schedule, a failed hire "in the hundreds of thousands of dollars".
 *   Time to results: Kevin Stipe, Reagan Consulting, Insurance Journal 2025-11-17.
 *   Set-appointment economics: Randy Schwantz, Insurance Journal 2018-12-17.
 *   Shared leads: EverQuote Pro, "to a maximum of three agents".
 *   SDR pay: Payscale (2026) and Built In (2026).
 *   Buyer and owner lines: industry-voice-2026-11-14.md and the homepage owner-reply table, anonymized to role and state.
 * No client or prospect is named. Nothing here is a result claim; the only results we quote live on the homepage.
 */

const P = ({ children }: { children: React.ReactNode }) => <p>{children}</p>

export const PRICING_PAGE: AnswerPageProps = {
  eyebrow: 'Pricing',
  path: '/pricing',
  h1: 'What Maxionlabs costs, and how that compares to hiring a producer or buying leads',
  lede:
    'Maxionlabs costs $4,725 a month, month to month, for 15 qualified live calls a month between your producers and owners of commercial accounts in your appetite, 12 in month one. A no-show doesn’t count, we replace it. Every call we come in short is $315 off your next invoice, and the first 7 days are refundable in full. A producer runs you a median $62,280 a year in salary before the draw and benefits, and about 43 in 100 never validate. Bought leads cost less per name and go to up to three agents at once.',
  updated: '2026-11-16',
  sections: [
    {
      id: 'cost',
      heading: 'Maxionlabs costs $4,725 a month for 15 qualified live calls, and you can leave any month.',
      body: (
        <>
          <P>
            The price is one number. $4,725 a month, paid upfront, auto-renewing, and you cancel whenever you want.
            There&rsquo;s no setup fee, no share of your commission or premium, and no per-call invoice on top. Pay a
            quarter at once and it&rsquo;s $12,500 for 90 days, about 12% off.
          </P>
          <P>
            For that you get 15 qualified live calls a month with owners of businesses in your appetite. Live means the
            owner actually shows up and talks to your producer. A no-show doesn&rsquo;t count towards the 15, we replace
            it. Month one is 12, because the 30 days count from the first email. Before each call your producer gets a
            brief, so the business, who is in the room, the renewal date the owner gave us, and why they said yes.
          </P>
          <P>
            You also get the map of every business in your territory and lines that clears your floor, as CSV files you
            keep, a renewal calendar that builds as owners give us their dates, and your counties locked, so we
            don&rsquo;t work for another agency in them. A call we set up for you is never resold.
          </P>
          <P>
            We don&rsquo;t sell for you. We get your producer in the room and your producer closes. Your side is about
            an hour a week, approving copy and targeting.
          </P>
        </>
      ),
    },
    {
      id: 'qualified',
      heading: 'Qualified means four things in writing, and every miss costs us $315.',
      body: (
        <>
          <P>
            &ldquo;Qualified&rdquo; is where most vendor relationships in this industry fall apart, so we write it down.
            Your agreement lists four conditions and a call has to clear all four to count.
          </P>
          <ul className="list-disc pl-5 flex flex-col gap-1.5">
            <li>
              The account is above the premium floor you set, $25,000 in premium for most P&amp;C agencies, 20 or more
              enrolled lives for a benefits shop. That&rsquo;s a floor, not a target. An owner at $75,000 or $100,000 in
              premium is one call, same price, nothing extra.
            </li>
            <li>There&rsquo;s a need now or inside 3 months, from the renewal date the owner gives us on the phone.</li>
            <li>The business is in your counties and your carriers write that line.</li>
            <li>The owner, or whoever actually decides, is on the call.</li>
          </ul>
          <P>
            Every owner who replies yes gets a call from us before anything touches a calendar. We confirm they want the
            meeting, take the renewal date, and check line, premium and county against what you wrote. The wrong size,
            or outside your carriers&rsquo; appetite, doesn&rsquo;t go through, however keen the reply.
          </P>
          <P>
            The guarantee is 15 a month, 12 in month one. Each call short is a $315 credit on your next invoice, which is
            just $4,725 divided by 15. If you cancel with credit left over we refund it in cash. And if you&rsquo;re not
            happy for any reason in the first 7 days after payment, full refund, no questions.
          </P>
        </>
      ),
    },
    {
      id: 'producer',
      heading: 'A producer costs more per month, takes two or three years to pay back, and about 4 in 10 never do.',
      body: (
        <>
          <P>
            Hiring a producer is the default move, and for good reason. A validated producer prospects, sells and keeps
            the account, and the book is yours. Nothing we do replaces that. The question is what it costs to get one
            there.
          </P>
          <P>
            Start with salary. The Bureau of Labor Statistics puts the median wage for insurance sales agents at $62,280
            a year as of May 2025, so about $5,190 a month before benefits, payroll tax, licences, E&amp;O and a draw
            while they learn.
          </P>
          <P>
            Then you wait. Kevin Stipe, CEO of Reagan Consulting, in Insurance Journal, November 2025: &ldquo;You hire a
            new salesperson today, you&rsquo;re not going to see significant results for two or three years.&rdquo; IA
            Magazine (Best Practices study) puts the typical validation schedule at three years and the odds at 57% of
            producers validating. So about 43 in 100 don&rsquo;t, and it puts a failed producer &ldquo;in the hundreds of
            thousands of dollars&rdquo;. At the median wage alone, three years is $186,840 before you know which kind you
            hired.
          </P>
          <P>
            So we don&rsquo;t replace the producer, we sit at the top of their funnel. A new producer who gets 15 live
            calls a month from day one spends year one learning to close instead of learning to dial.
          </P>
        </>
      ),
    },
    {
      id: 'leads',
      heading: 'Bought leads are cheap per name and expensive per bound account.',
      body: (
        <>
          <P>
            Lead vendors fill a real gap, a list arrives the day you want it. The big marketplaces price per lead, and
            the honest ones tell you how many agents get the same one. EverQuote, for example, says its verified-partner
            leads go &ldquo;to a maximum of three agents&rdquo;. Exclusive costs more, and exclusive is a promise about
            the vendor, not about the owner, who may have filled in three forms that week.
          </P>
          <P>
            Owners tell me about this unprompted. An agency president in Pennsylvania, on the commercial leads he
            bought: &ldquo;yeah, I got five people shopping this, you can be number six.&rdquo; A principal in the
            Carolinas, on the telemarketers he had paid over the years: &ldquo;the quality of those leads were less
            valuable... I call it almost trickery.&rdquo;
          </P>
          <P>
            The number you actually want is cost per bound account, and nobody publishes it. The closest public figure is
            Randy Schwantz&rsquo;s 2018 Insurance Journal column on appointment setters, where if you close half the set
            appointments, &ldquo;the cost of a sale becomes $1,000 each&rdquo; in setting cost.
          </P>
          <P>
            We don&rsquo;t sell names, that&rsquo;s the difference. The owner has said yes to a conversation about a
            change in his business, been called by us, and been checked against your floor and appetite. He&rsquo;s on
            your producer&rsquo;s calendar, not in your spreadsheet, and nobody else gets him.
          </P>
        </>
      ),
    },
    {
      id: 'sdr',
      heading: 'An in-house SDR works if you can hire, manage and feed one.',
      body: (
        <>
          <P>
            The in-house version is one person on the phone and email all day, setting calls up for the producers. Done
            well it&rsquo;s the cheapest meeting there is, because the salary is fixed and the volume isn&rsquo;t.
          </P>
          <P>
            On cost, Payscale puts the average SDR base at $52,866 in 2026, Built In at $57,921 base and $83,110 total
            pay with commission. Then add data, a dialer, sending domains, a CRM seat and your own hours managing someone
            paid to hear no all day. Call it $7,000 to $8,000 a month all in, my estimate, not a published one. On time,
            a couple of months to hire and a month or two to ramp, if the first one sticks. And the salary runs whether
            15 calls land or 3.
          </P>
          <P>
            We&rsquo;re basically that SDR seat without the hire. Same job, sized to 15 qualified live calls a month,
            paid monthly, with the shortfall on us. If you already have an SDR who hits 15 qualified a month, you
            don&rsquo;t need us. Keep them.
          </P>
        </>
      ),
    },
    {
      id: 'compare',
      heading: 'Side by side, the differences are who carries the risk and what you keep at the end.',
      body: (
        <>
          <ComparisonTable
            caption="Four ways to get first meetings for a commercial insurance agency, compared."
            columns={['Hiring a producer', 'Buying shared or exclusive leads', 'An in-house SDR', 'Maxionlabs']}
            rows={[
              {
                label: 'Monthly cost',
                cells: [
                  'About $5,190 at the median salary, before draw, benefits and tools (BLS, May 2025).',
                  'Per lead. In the trade-press example a set appointment costs $1,000 per sale at a 50% close (Insurance Journal, 2018).',
                  '$4,400 to $4,800 base, about $6,900 with commission (Payscale, Built In, 2026), plus data and tools.',
                  '$4,725, month to month. Nothing else. $12,500 for 90 days prepaid.',
                ],
              },
              {
                label: 'Time to first meeting',
                cells: [
                  'Whatever they book themselves. Two or three years to significant results (Reagan Consulting).',
                  'Days to a list, then your dial time.',
                  'Two to four months to hire and ramp (our estimate).',
                  'Inside month one. 12 live calls guaranteed in the first 30 days from the first email.',
                ],
              },
              {
                label: 'Who does the prospecting',
                cells: [
                  'The producer, between quotes and service work.',
                  'You or your producers, calling a list.',
                  'The SDR, managed by you.',
                  'We do. Public records, email from our own domains, the check call, the calendar slot, the brief.',
                ],
              },
              {
                label: 'Risk if it fails',
                cells: [
                  'You carry the salary and the draw. 43 in 100 never validate (IA Magazine).',
                  'You paid per lead whether or not anyone picked up.',
                  'Salary runs regardless. The process leaves with the person.',
                  '$315 back per missed call, 7-day full refund, cancel any month.',
                ],
              },
              {
                label: 'What you own at the end',
                cells: [
                  'The accounts they wrote, as long as they stay.',
                  'A list other agencies also bought.',
                  'The list and the process, if you documented them.',
                  'The mapped market as CSV, the renewal calendar, every brief, and the accounts your producers closed.',
                ],
              },
            ]}
          />
        </>
      ),
    },
    {
      id: 'math',
      heading: 'At $25,000 in premium the math works on two closes a month, and here is the whole calculation.',
      body: (
        <>
          <P>
            This is an illustration, not a result. Say a $25,000-premium account at 12% commission, so $3,000 of
            first-year commission per account, and 15 live calls in the month. Close rates are what the owner of a
            Tennessee P&amp;C agency told us: &ldquo;better producers are closing 75%, newer, younger producers
            20%.&rdquo;
          </P>
          <P>
            Lowest case first. Close 1 of 15 and you book $3,000
            against $4,725, so you&rsquo;re $1,725 down that month. Close 2 and it&rsquo;s $6,000 against $4,725, $1,275
            up. Close 3, the 20% a newer producer runs, and it&rsquo;s $9,000, so $4,275 up.
          </P>
          <P>
            What the monthly view misses is that our fee is one month and the commission renews. An account that stays
            three years at the same premium is about $9,000 gross, so even the one-close month pays back over the
            policy&rsquo;s life. Your retention decides that, not us.
          </P>
          <P>
            If we fall short, the fee falls with it. Deliver 10 instead of 15 and that&rsquo;s 5 credits of $315, so you
            paid $3,150 for 10 qualified calls.
          </P>
          <P>
            Where it stops working is small accounts. At $10,000 in premium a close is $1,200 of commission, three closes
            are $3,600, and the fee is still $4,725. That&rsquo;s why we hold the $25,000 floor. Run your own numbers in
            the{' '}
            <a href="/roi" className="text-accent hover:underline underline-offset-4">
              ROI calculator
            </a>
            .
          </P>
        </>
      ),
    },
    {
      id: 'not-for',
      heading: 'This is not for solo agents, personal-lines shops, or anyone buying on price.',
      body: (
        <>
          <P>About half the owners we&rsquo;ve talked to since October were never our buyer.</P>
          <ul className="list-disc pl-5 flex flex-col gap-1.5">
            <li>If you&rsquo;re a solo agent, 15 live calls a month on top of your service book is a second job.</li>
            <li>
              If you&rsquo;re personal-lines-led or captive, the commission per account is too small to pay the fee back,
              and the appetite isn&rsquo;t yours to set.
            </li>
            <li>If nobody besides you can take a first meeting, the credits make us cheaper, not useful.</li>
            <li>
              If you&rsquo;re a benefits agency in open enrollment, October to December is the wrong time to add 15 calls
              a month. Come back in January.
            </li>
            <li>
              If you want free sample meetings or pay-on-close, we carry the shortfall with credits and the refund, we
              don&rsquo;t work for free first.
            </li>
            <li>
              If you&rsquo;re shopping on price, the $4,725 doesn&rsquo;t move. When a territory can&rsquo;t fill 15, we
              change the count, not the price.
            </li>
          </ul>
          <P>
            Who it does fit is an independent commercial P&amp;C or benefits agency with two or more producers besides
            the owner, accounts at $25,000 in premium or 20 enrolled lives and up, and nobody owning the Monday morning
            prospecting. You pay a registered company through Stripe, and the call is 20 minutes with me, not a sales
            team.
          </P>
        </>
      ),
    },
  ],
  faq: [
    {
      q: 'How much does Maxionlabs cost per month?',
      a: '$4,725 a month, month to month, for 15 qualified live calls (12 in month one). Or $12,500 for 90 days, about 12% off. No setup fee, no commission share.',
    },
    {
      q: 'What does that work out to per qualified call?',
      a: '$315 a call at 15 a month, which is also the credit you get for every call we miss. In month one, at 12 calls, it’s about $394 each.',
    },
    {
      q: 'Is $25,000 in premium the size of account you go after?',
      a: 'No, it’s the floor. $25,000 in premium or 20 enrolled lives is the smallest account that counts. An owner at $75,000 or $100,000 in premium counts as one call, same price, no extra charge.',
    },
    {
      q: 'How much does it cost to hire an insurance producer?',
      a: 'The median wage for insurance sales agents was $62,280 in May 2025 (Bureau of Labor Statistics), before benefits and the draw. The typical validation schedule is three years and 57% of producers validate (IA Magazine, Best Practices study).',
    },
    {
      q: 'How much do commercial insurance leads cost?',
      a: 'Per lead, and a shared lead goes to several agents at once, up to three in EverQuote’s case. Nobody publishes a cost per bound commercial account. The closest public example (Insurance Journal, 2018) works out to $1,000 of setting fees per sale at a 50% close.',
    },
    {
      q: 'Is there a contract or a minimum term?',
      a: 'No. Month to month, cancel at the end of any month. 7-day full refund for any reason after payment, and unused credit is refunded when you cancel.',
    },
    {
      q: 'What happens if you deliver fewer than 15 calls?',
      a: 'Each call short of 15 (12 in month one) is a $315 credit on your next invoice. A no-show doesn’t count and gets replaced. A call that fails any of the four written conditions doesn’t count either.',
    },
  ],
  sources: [
    {
      label: 'U.S. Bureau of Labor Statistics, Occupational Outlook Handbook, Insurance Sales Agents: median annual wage $62,280 (May 2025)',
      url: 'https://www.bls.gov/ooh/sales/insurance-sales-agents.htm',
    },
    {
      label: 'IA Magazine, "3 Reasons Producer Validation Rates Are So Low" (June 2021): 57% validate, three-year schedule, failed hire in the hundreds of thousands',
      url: 'https://www.iamagazine.com/?p=5777',
    },
    {
      label: 'Insurance Journal, "How to Grow an Agency in 2026" (November 17, 2025): Kevin Stipe, Reagan Consulting, on two or three years to results',
      url: 'https://www.insurancejournal.com/magazines/mag-features/2025/11/17/847461.htm',
    },
    {
      label: 'Insurance Journal, Randy Schwantz, "Should You Hire an Appointment Setter?" (December 17, 2018): $1,000 per sale at a 50% close, three to four appointments a month',
      url: 'https://www.insurancejournal.com/magazines/mag-ideaexchange/2018/12/17/511777.htm',
    },
    {
      label: 'EverQuote Pro: leads delivered to a maximum of three agents',
      url: 'https://go.everquote.com/pro',
    },
    {
      label: 'Payscale, Sales Development Representative salary (2026): average base $52,866',
      url: 'https://www.payscale.com/research/US/Job=Sales_Development_Representative_(SDR)/Salary',
    },
    {
      label: 'Built In, Sales Development Representative salary (2026): $57,921 base, $83,110 total compensation',
      url: 'https://builtin.com/salaries/us/sales-development-representative',
    },
    {
      label: 'Maxionlabs ROI calculator: run the illustration above with your own premium, commission and close rate',
      url: 'https://www.maxionlabs.com/roi',
    },
  ],
}
