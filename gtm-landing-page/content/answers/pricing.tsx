import { ComparisonTable } from '@/components/answer/AnswerPage'
import type { AnswerPageProps } from '@/components/answer/AnswerPage'

/**
 * /pricing copy. The page AI should cite when someone asks what Maxionlabs costs and how it compares.
 *
 * Every number traces to a file or a page opened on 2026-11-15:
 *   Offer terms: OPS 00_foundation/offer-v3.md, CURRENT INSURANCE OFFER block (4,725 / 12 then 15 / 315 / 7-day refund /
 *     12,500 for 90 days, as the live homepage price card words it).
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
    'Maxionlabs costs $4,725 a month, month to month, for 15 qualified first meetings with commercial accounts booked on your producers’ calendars (12 in month one). Every meeting we miss is $315 off your next invoice, and the first 7 days are refundable in full. A producer runs you a median $62,280 a year in salary before the draw and benefits, and about 43 in 100 never validate. Bought leads cost less per name and go to up to three agents at once.',
  updated: '2026-11-15',
  sections: [
    {
      id: 'cost',
      heading: 'Maxionlabs costs $4,725 a month for 15 qualified first meetings, and you can leave any month.',
      body: (
        <>
          <P>
            The price is one number. $4,725 a month, paid upfront, auto-renewing, cancel whenever you want. No setup fee,
            no share of your commission or premium, no per-meeting invoice on top. Pay a quarter at once and it&rsquo;s
            $12,500 for 90 days, about 12% off.
          </P>
          <P>
            What you get: 15 qualified first meetings a month with owners of businesses in your appetite, on your
            producers&rsquo; calendars. Month one is 12, because the 30 days count from the first email. Before each meeting your producer gets a brief: the business, who is in the room, the renewal
            date the owner gave us, and why they said yes.
          </P>
          <P>
            Also included: the map of every business in your territory and lines that clears your floor, as CSV files
            you keep, a renewal calendar that builds as owners give us their dates, and territory lock, so we don&rsquo;t
            book for another agency in your counties. The meetings we book are never resold.
          </P>
          <P>
            We don&rsquo;t sell for you. We get your producer in the room and your producer closes. The
            owners of a commercial P&amp;C agency in Tennessee put it this way on our first call: &ldquo;If you just get
            us in the room, that&rsquo;s where we&rsquo;re good.&rdquo; Your side is about an hour a week, approving copy
            and targeting.
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
            &ldquo;Qualified&rdquo; is where most vendor relationships in this industry fall apart, so it is written
            down. Your agreement lists four conditions, and a meeting has to clear all four to count:
          </P>
          <ul className="list-disc pl-5 flex flex-col gap-1.5">
            <li>
              <b>Premium.</b> Above the floor you set, $25,000 for most P&amp;C agencies, 20 or more enrolled lives for
              benefits shops.
            </li>
            <li>
              <b>Renewal.</b> A need now or within 3 months, from the date the owner gives us on the phone.
            </li>
            <li>
              <b>Appetite.</b> Your counties and your carriers, by line.
            </li>
            <li>
              <b>Decider.</b> The owner, or whoever decides, is in the meeting.
            </li>
          </ul>
          <P>
            Every owner who replies yes gets a call from us before anything touches a calendar. We
            confirm they want the meeting, take the renewal date, and check line, premium and county against what you
            wrote. A painting contractor in Knoxville, Tennessee replied to one client&rsquo;s email with &ldquo;Yes. I am
            concerned I am overpaying on workers comp.&rdquo; That one booked. The wrong size, or outside your carriers&rsquo;
            appetite, doesn&rsquo;t, however keen the reply.
          </P>
          <P>
            The guarantee: 15 a month, 12 in month one. Each meeting short is a $315 credit on your next invoice, which
            is $4,725 divided by 15. Unused credit is refunded in cash if you cancel.
            No-shows don&rsquo;t count against you, we replace them. The refund: not happy for any reason in the first 7
            days after payment, full refund, no questions.
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
            Hiring a producer is the default move, for a good reason. A validated producer prospects, sells and keeps
            the account, and the book they build is yours. Nothing we do replaces that. The question is what it costs
            to get one there.
          </P>
          <P>
            Salary first. The Bureau of Labor Statistics puts the median wage for insurance sales agents at $62,280 a
            year as of May 2025, about $5,190 a month before benefits, payroll tax, licences, E&amp;O and a draw while
            they learn.
          </P>
          <P>
            Then time. Kevin Stipe, CEO of Reagan Consulting, in Insurance Journal, November 2025: &ldquo;You hire a new
            salesperson today, you&rsquo;re not going to see significant results for two or three years.&rdquo; IA
            Magazine (Best Practices study) puts the typical validation schedule at three years and the odds at 57% of
            producers validating. So about 43 in 100 don&rsquo;t, and it puts a failed producer &ldquo;in the hundreds of
            thousands of dollars&rdquo;. At the median wage alone, three years is $186,840 before you know which kind you
            hired.
          </P>
          <P>
            Where we fit: not instead of the producer, as the top of their funnel. A new producer who gets 15 first
            meetings a month from day one spends year one learning to close instead of learning to dial. One owner with
            six producers told us three of them &ldquo;need help to get to where we call it validation.&rdquo;
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
            Lead vendors fill a real gap: a list arrives the day you want it. The big marketplaces price per lead, and
            the honest ones tell you how many agents get the same one. EverQuote, for example, says
            its verified-partner leads go &ldquo;to a maximum of three agents&rdquo;. Exclusive costs more, and exclusive
            is a promise about the vendor, not about the owner, who may have filled in three forms that week.
          </P>
          <P>
            What owners told us. An agency president in Pennsylvania, on the commercial leads he bought: &ldquo;yeah, I
            got five people shopping this, you can be number six.&rdquo; A principal in the Carolinas, on the
            telemarketers he had paid over the years: &ldquo;the quality of those leads were less valuable... I call it
            almost trickery.&rdquo;
          </P>
          <P>
            The number that matters is cost per bound account, and nobody publishes it. The closest public figure is
            Randy Schwantz&rsquo;s 2018 Insurance Journal column on appointment setters: in his example, if you close
            half the set appointments, &ldquo;the cost of a sale becomes $1,000 each&rdquo; in setting cost.
          </P>
          <P>
            Our difference: we don&rsquo;t sell names. The owner has said yes to a meeting about a change in his
            business, been called, and been checked against your floor and appetite. He is on your calendar, not in your
            spreadsheet, and nobody else gets him.
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
            The in-house version: one person on the phone and email all day, booking for the producers.
            Done well it is the cheapest meeting there is, because the salary is fixed and the volume isn&rsquo;t.
          </P>
          <P>
            Cost: Payscale puts the average SDR base at $52,866 in 2026, Built In at $57,921 base and $83,110 total pay
            with commission. Add data, a dialer, sending domains, a CRM seat and your hours managing someone paid to hear
            no all day. Call it $7,000 to $8,000 a month all in. That last figure is our estimate, not a published one.
            Time: a couple of months to hire and a month or two to ramp, if the first one sticks.
          </P>
          <P>
            Risk: the salary runs whether 15 meetings land or 3, and when the SDR leaves the process leaves with them.
          </P>
          <P>
            Where we fit: we are the SDR seat without the hire. Same job, sized to 15 qualified meetings a month, paid
            monthly, with the shortfall on us. If you already have an SDR who hits 15 qualified a month, you don&rsquo;t
            need us. Keep them.
          </P>
        </>
      ),
    },
    {
      id: 'compare',
      heading: 'Side by side, the differences are who carries the risk and what you keep at the end.',
      body: (
        <>
          <P>Same five questions for each option, external figures sourced below.</P>
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
                  'Inside month one. 12 guaranteed in the first 30 days from the first email.',
                ],
              },
              {
                label: 'Who does the prospecting',
                cells: [
                  'The producer, between quotes and service work.',
                  'You or your producers, calling a list.',
                  'The SDR, managed by you.',
                  'We do. Public records, email from our own domains, the check call, the booking, the brief.',
                ],
              },
              {
                label: 'Risk if it fails',
                cells: [
                  'You carry the salary and the draw. 43 in 100 never validate (IA Magazine).',
                  'You paid per lead whether or not anyone picked up.',
                  'Salary runs regardless. The process leaves with the person.',
                  '$315 back per missed meeting, 7-day full refund, cancel any month.',
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
          <P>
            A validated producer beats us on what you own, a ramped SDR on cost per meeting. We win on time to the first
            meeting and on who eats the shortfall.
          </P>
        </>
      ),
    },
    {
      id: 'math',
      heading: 'At $25,000 in premium the math works on two closes a month, and here is the whole calculation.',
      body: (
        <>
          <P>
            This is an illustration, not a result. Assume a $25,000-premium account at 12% commission, so $3,000 of
            first-year commission per account, and 15 first meetings in the month. Close rates are what the owner of a
            Tennessee P&amp;C agency told us: &ldquo;better producers are closing 75%, newer, younger producers
            20%.&rdquo;
          </P>
          <P>
            Lowest case first, the way I&rsquo;d want it walked if I were paying. Close 1 of 15 and you book
            $3,000 against $4,725, so you are $1,725 down that month. Close 2 and it is $6,000 against $4,725, $1,275 up.
            Close 3, the 20% a newer producer runs, and it is $9,000, $4,275 up.
          </P>
          <P>
            Then the part the monthly view misses: our fee is one month, the commission renews. An account that stays
            three years at the same premium is worth about $9,000 gross, so even the one-close month pays back over the
            policy&rsquo;s life. Your retention decides that, not us.
          </P>
          <P>
            If we fall short, the fee falls with it. Book 10 instead of 15 and that is 5 credits of $315, so you paid
            $3,150 for 10 qualified meetings.
          </P>
          <P>
            Where it stops working: small accounts. At $10,000 in premium a close is $1,200 of commission, three closes
            are $3,600, and the fee is still $4,725. That is why we hold the $25,000 floor. Run your own numbers in the{' '}
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
          <P>
            About half the owners we have talked to since October were never our buyer, so:
          </P>
          <ul className="list-disc pl-5 flex flex-col gap-1.5">
            <li>
              <b>Solo agents.</b> 15 first meetings a month on top of your service book is a second job.
            </li>
            <li>
              <b>Personal-lines-led or captive agencies.</b> The commission per account is too small to pay the fee back,
              and the appetite is not yours to set.
            </li>
            <li>
              <b>Agencies that cannot staff the meetings.</b> If nobody besides you can take a first meeting, the credits
              make us cheaper, not useful.
            </li>
            <li>
              <b>Benefits agencies in open enrollment.</b> October to December is the wrong time to add 15 meetings a
              month. Come back in January.
            </li>
            <li>
              <b>Anyone asking for free sample meetings or pay-on-close.</b> We carry the shortfall with credits and the
              refund, we don&rsquo;t work for free first.
            </li>
            <li>
              <b>Anyone optimising for price.</b> The $4,725 doesn&rsquo;t move. If a territory cannot fill 15, we change
              the count, not the price.
            </li>
          </ul>
          <P>
            Who it is for: an independent commercial P&amp;C or benefits agency with two or more producers besides the
            owner, accounts at $25,000 in premium or 20 enrolled lives and up, and nobody owning the Monday morning
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
      a: '$4,725 a month, month to month, for 15 qualified first meetings (12 in month one). Or $12,500 for 90 days, about 12% off. No setup fee, no commission share.',
    },
    {
      q: 'What does that work out to per qualified meeting?',
      a: '$315 a meeting at 15 a month, which is also the credit you get for every meeting we miss. In month one, at 12 meetings, it is about $394 each.',
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
      a: 'No. It is month to month and cancels at the end of any month. 7-day full refund for any reason after payment, and unused credit is refunded when you cancel.',
    },
    {
      q: 'What happens if you book fewer than 15 meetings?',
      a: 'Each meeting short of 15 (12 in month one) is a $315 credit on your next invoice. No-shows are replaced. A meeting that fails any of the four written conditions does not count as delivered.',
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
