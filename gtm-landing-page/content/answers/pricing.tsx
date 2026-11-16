import { ComparisonTable } from '@/components/answer/AnswerPage'
import type { AnswerPageProps } from '@/components/answer/AnswerPage'
import { MUTED, INK, SERIF } from '@/components/home/InsuranceHome'
import { PricingOneNumber, PricingFourChecks, PricingFloorNotTarget, SetVsHeld, MeetingsFunnel } from '@/components/drawings'

/**
 * /pricing, v2 (MAX-738, 2026-11-16). The brand pricing page, rewritten in the plain-book format Max approved on
 * /hire-producer-or-book-meetings ("voice + images was great"): one problem, a named framework, an owner story,
 * captioned drawings, every paragraph said out loud first.
 *
 * Demand gate: no targetQuery, on purpose. Google autocomplete (suggestqueries client=firefox hl=en gl=us, 2026-11-16)
 * returned 0 strings for "appointment setting pricing insurance", "insurance appointment setting cost", "commercial
 * insurance appointment setting cost", "insurance lead generation cost", "maxionlabs pricing" and "maxionlabs". The
 * strings it did return ("how much does appointment setting cost", "appointment setting services cost", "appointment
 * setter cost", "b2b appointment setting cost") carry no insurance word and pull producers and generic B2B buyers, so
 * this stays a brand page in STATIC_PAGES and the demand gate does not apply. Max, 2026-11-16: /commercial-insurance-
 * appointment-cost folds into this page; its "set is not held, held is not qualified" section and SetVsHeld drawing
 * live here now.
 *
 * Wording (Max, 2026-11-16): 15 qualified LIVE sales meetings a month, 12 in month one, never "booked". A no-show does
 * not count and is replaced. $25K premium or 20 enrolled lives is the FLOOR; a $75K or $100K account counts the same,
 * no extra charge. Money over 3 months only: 12 + 15 + 15 = 42 meetings, 1 in 5 close, about 8 accounts, about $25,000
 * of gross commission a year before producer pay, year two about $21,000 at 84%, against $14,175 month to month or
 * $12,500 prepaid. Year one and year two, never a lifetime total.
 *
 * Every external number opened live on 2026-11-16, URL in SOURCES:
 *  - BLS, insurance sales agents, median annual wage $62,280 (May 2025). The OOH page refuses curl, so the figure was
 *    checked through the BLS API, series OEUN000000000000041302113, year 2025, value 62280.
 *  - IA Magazine, "3 Reasons Producer Validation Rates Are So Low" (Jun 2021): 57% validate, three-year schedule,
 *    a failed producer "in the hundreds of thousands of dollars".
 *  - Insurance Journal (Nov 2025), Kevin Stipe, Reagan Consulting: "two or three years" to significant results.
 *  - Insurance Journal (Dec 2018), Randy Schwantz: 50% close, "the cost of a sale becomes $1,000 each", three-to-four
 *    appointments a month with a setter against five or ten a year alone.
 *  - EverQuote Pro: leads sold "to a maximum of three agents".
 *  - Payscale (2026): SDR average $52,866. Built In (2026): $57,921 base, $83,110 total.
 *  - IA Magazine (Jul 2026), Liberty Mutual study: average agency retention around 84%.
 *  Offer terms from 00_foundation/offer-v3.md only. Owner quotes from industry-voice-2026-11-14.md and the homepage
 *  owner-reply table, role and state only, no names. Nothing here is a result claim.
 *  v1 is in content/answers/_archive/pricing.v1.tsx.
 *
 * Voice pass 2026-11-16 (brand/voice-core.md): verdict, reason, a "like" example, short flat closers. Numbers,
 * sources and terms unchanged.
 */

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

export const PRICING_PAGE: AnswerPageProps = {
  eyebrow: 'Pricing, for owners of commercial P&C and benefits agencies with 2 or more producers. Not for solo agents or personal lines shops.',
  path: '/pricing',
  h1: 'What does Maxionlabs cost, and what do you get for the $4,725 a month?',
  lede:
    "Honestly, the price is the easy part. $4,725 a month, month to month, cancel any month, and you get 15 qualified live sales meetings a month between your producers and owners of commercial accounts above your floor, 12 in month one. A no-show doesn't count, we replace it. Every meeting we come in short is $315 back, and the first 7 days are a full refund. The harder question is what that's worth next to a producer, bought leads or a setter in house, and that's most of this page.",
  updated: '2026-11-16',
  sections: [
    {
      id: 'cost',
      heading: 'Maxionlabs costs $4,725 a month for 15 qualified live sales meetings, and you can leave any month',
      body: (
        <>
          <Idea>One number, nothing behind it.</Idea>
          <p>
            Cost is the first thing most owners ask me on a call, and fair enough, a lot of vendors in this space
            bury it in a setup fee, a per-appointment fee and a term.
          </p>
          <p>
            So here it is. $4,725 a month, paid upfront, auto-renews, cancel any month. No setup fee, no cut of your
            commission or premium, nothing per meeting on top. Prepay the quarter and it&apos;s $12,500 for 90 days, about
            12% off.
          </p>
          <PricingOneNumber />
          <p>
            For that you get 15 qualified live sales meetings a month with owners of businesses in your appetite. Live
            means the owner shows up and talks to your producer, a no-show doesn&apos;t count toward the 15, we replace
            it. Month one is 12, because the 30 days count from the first email.
          </p>
          <p>
            Before each meeting your producer gets a brief, so the business, who&apos;s in the room, the renewal date and
            why they said yes. You keep the map of every business in your counties that clears your floor, as CSV files,
            and your counties are locked.
          </p>
          <p>
            We don&apos;t sell for you. Your producer runs the meeting and closes it, your side is like an hour a week on
            copy and targeting. That&apos;s it.
          </p>
        </>
      ),
    },
    {
      id: 'qualified',
      heading: 'Qualified is four things in writing, and every miss is $315 back to you',
      body: (
        <>
          <Idea>Set isn&apos;t held, held isn&apos;t qualified, and qualified is whatever your agreement says, so I write it down.</Idea>
          <p>
            Qualified is where most vendor deals fall apart, I&apos;ve heard that story on enough calls. Four conditions,
            written into your agreement, and a meeting has to clear all four to count.
          </p>
          <ol className="list-decimal pl-5 flex flex-col gap-2">
            <li>
              <strong>Above your floor.</strong> $25,000 in premium for most P&amp;C agencies, 20 or more enrolled lives
              for a benefits shop.
            </li>
            <li>
              <strong>A need now or inside 3 months,</strong> from the renewal date the owner gives us on the phone.
            </li>
            <li>
              <strong>Your counties, your carriers.</strong> In your territory, and your carriers write that line.
            </li>
            <li>
              <strong>The owner in the room.</strong> The owner, or whoever actually signs.
            </li>
          </ol>
          <p>
            Every owner who replies yes gets a call from us before anything touches a calendar, we take the renewal date
            and check line, premium and county against what you wrote.
          </p>
          <PricingFourChecks />
          <p>
            Why so much paper? Because the cheap version costs more than it looks. Like say you buy 10 set appointments
            at $300 each, $3,000 on the invoice. 7 show, 3 no-show, and of the 7 only 4 are above your $25,000 floor.
          </p>
          <p>So you paid $3,000 for 4 meetings worth your producer&apos;s hour, $750 a meeting, and the invoice said $300.</p>
          <SetVsHeld />
          <p>
            Flip it. Every meeting held, above your floor, decider in the room, and anything short comes off the next
            invoice, then $315 is $315. The credit is $4,725 divided by 15. Leftover credit comes back as cash, and the
            first 7 days after payment are a full refund.
          </p>
          <p>
            And the floor is only a floor. A $75,000 or $100,000 account counts as one meeting, same as a $25,000 one, same
            price, nothing extra. We don&apos;t take a share of the commission, so the big one is all yours.
          </p>
          <PricingFloorNotTarget />
        </>
      ),
    },
    {
      id: 'math',
      heading: 'Run the three-month book test, not the one-month math, before you judge the fee',
      body: (
        <>
          <Idea>Don&apos;t judge the fee on month one, judge it on the book 3 months leaves behind. I call it the three-month book test.</Idea>
          <p>
            $25,000 in premium at a 12% commission is about $3,000 of agency commission a year. All of this is gross,
            before producer pay and servicing, and it&apos;s an illustration, I&apos;m not quoting you a result.
          </p>
          <p>
            Three months with us is 12 + 15 + 15, so 42 qualified sales meetings, all held live with the owner. Say your
            producers close 1 in 5, that&apos;s about 8 bound accounts, and at $3,000 each that&apos;s about $25,000 of
            gross commission a year.
          </p>
          <p>
            What you paid for those 3 months is $14,175 month to month, or $12,500 if you prepaid the quarter. So year one
            on that book is a bit under double what you paid, before a single renewal.
          </p>
          <p>
            And it renews. The average agency keeps about 84% of its accounts, that&apos;s the Liberty Mutual figure in IA
            Magazine. So year two on the same book is about $21,000, and you paid nothing more for it.
          </p>
          <MeetingsFunnel />
          <p>The 1 in 5 came from an owner, I didn&apos;t pick it.</p>
          <Quote text="better producers are closing 75%, newer, younger producers 20%." who="Owner, commercial P&C agency, Tennessee" />
          <p>
            Where it stops working is small accounts. At $10,000 in premium a close is $1,200 of commission, which is why
            we hold the $25,000 floor. Put your own premium, commission and close rate into the{' '}
            <a href="/roi" className="underline underline-offset-2">
              ROI calculator
            </a>
            .
          </p>
        </>
      ),
    },
    {
      id: 'producer',
      heading: 'A producer costs more a month, takes two or three years to pay back, and about 4 in 10 never do',
      body: (
        <>
          <Idea>Nothing we do replaces a validated producer. The question is what it costs to get one there.</Idea>
          <p>
            Start with salary. The Bureau of Labor Statistics puts the median wage for insurance sales agents at $62,280 a
            year as of May 2025, so about $5,190 a month before benefits, payroll tax, licences, E&amp;O and a draw while
            they learn.
          </p>
          <p>Then you wait. Kevin Stipe, CEO of Reagan Consulting, put it plainly in Insurance Journal.</p>
          <Quote
            text="You hire a new salesperson today, you're not going to see significant results for two or three years."
            who="Kevin Stipe, Reagan Consulting, Insurance Journal, November 2025"
          />
          <p>
            IA Magazine, citing the Best Practices study, puts the validation schedule at three years and the odds at 57%
            of producers validating. So about 43 in 100 don&apos;t, and a failed producer runs &ldquo;in the hundreds of
            thousands of dollars&rdquo;. At the median wage alone, three years is $186,840 before you know which kind you
            hired.
          </p>
          <p>
            So we sit at the top of the producer&apos;s funnel. If your producers are already full, hire, honestly. The{' '}
            <a href="/hire-producer-or-book-meetings" className="underline underline-offset-2">
              meetings-or-producers test
            </a>{' '}
            tells you which you are.
          </p>
        </>
      ),
    },
    {
      id: 'leads',
      heading: 'Bought leads are cheap per name and expensive per bound account',
      body: (
        <>
          <Idea>A lead is a name. Somebody still has to turn it into an owner in the room.</Idea>
          <p>
            Lead vendors fill a real gap, the list lands the day you want it. The honest ones tell you how many agents
            get the same name, like EverQuote says its verified-partner leads go &ldquo;to a maximum of three
            agents&rdquo;. And exclusive only means the vendor didn&apos;t resell it, the owner may still have filled in
            three forms that week.
          </p>
          <Quote text="yeah, I got five people shopping this, you can be number six." who="Agency president, Pennsylvania, on the commercial leads he bought" />
          <p>
            The number you actually want is cost per bound account, and nobody publishes it. The closest public figure is
            Randy Schwantz&apos;s 2018 Insurance Journal column on appointment setters. Close half the set appointments and
            &ldquo;the cost of a sale becomes $1,000 each&rdquo; in setting cost.
          </p>
          <p>
            We don&apos;t sell names. The owner said yes, we called him, we checked him against your floor and appetite,
            and he&apos;s on your producer&apos;s calendar. Nobody else gets him.
          </p>
        </>
      ),
    },
    {
      id: 'sdr',
      heading: 'An in-house setter works if you can hire, manage and feed one',
      body: (
        <>
          <Idea>Done well it&apos;s the cheapest meeting there is, because the salary is fixed.</Idea>
          <p>
            One person on the phone and email all day, setting meetings for the producers. Payscale puts the average SDR
            at $52,866 in 2026, Built In at $57,921 base and $83,110 total pay with commission. Then add data, a dialer,
            sending domains, a CRM seat and your hours managing someone paid to hear no all day. Call it $7,000 to $8,000 a
            month all in, my estimate, I haven&apos;t seen it published.
          </p>
          <p>And the salary runs whether 15 meetings land or 3.</p>
          <p>
            We&apos;re basically that seat without the hire, sized to 15 qualified live sales meetings a month, with the
            shortfall on us. If you already have a setter who hits 15 qualified a month, you don&apos;t need us. Keep them.
          </p>
        </>
      ),
    },
    {
      id: 'compare',
      heading: 'Side by side, the differences are who carries the risk and what you keep at the end',
      body: (
        <>
          <ComparisonTable
            caption="Four ways to get sales meetings for a commercial insurance agency, compared. Producer, leads and setter figures are from the sources at the end."
            columns={['Hiring a producer', 'Buying shared or exclusive leads', 'An in-house setter (SDR)', 'Maxionlabs']}
            rows={[
              {
                label: 'Monthly cost',
                cells: [
                  'About $5,190 at the median salary, before draw, benefits and tools (BLS, May 2025).',
                  'Per lead. The trade-press example works out to $1,000 of setting cost per sale at a 50% close (Insurance Journal, 2018).',
                  '$4,400 to $4,800 base, about $6,900 with commission (Payscale, Built In, 2026), plus data and tools.',
                  '$4,725, month to month. Nothing else. $12,500 for 90 days prepaid.',
                ],
              },
              {
                label: 'Time to the first qualified sales meeting',
                cells: [
                  'Whatever they set up themselves. Two or three years to significant results (Reagan Consulting).',
                  'Days to a list, then your dial time.',
                  'Two to four months to hire and ramp (our estimate).',
                  'Inside month one. 12 in the first 30 days from the first email.',
                ],
              },
              {
                label: 'Who does the prospecting',
                cells: ['The producer, between quotes and service work.', 'You or your producers, calling a list.', 'The setter, managed by you.', 'We do, through to the brief.'],
              },
              {
                label: 'Risk if it fails',
                cells: [
                  'You carry the salary and the draw. 43 in 100 never validate (IA Magazine).',
                  'You paid per lead whether anyone picked up or not.',
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
                  'The market as CSV, the renewal calendar, every brief, and the accounts your producers closed.',
                ],
              },
            ]}
          />
        </>
      ),
    },
    {
      id: 'not-for',
      heading: 'This is not for solo agents, personal lines shops, or anyone shopping on price',
      body: (
        <>
          <Idea>About half the owners I&apos;ve talked to since October were never our buyer.</Idea>
          <ul className="list-disc pl-5 flex flex-col gap-1.5">
            <li>If you&apos;re a solo agent, 15 live meetings a month on top of your service book is a second job.</li>
            <li>If you&apos;re personal lines led or captive, the commission per account is too small to pay the fee back.</li>
            <li>If nobody besides you can take a sales meeting, the credits make us cheaper, they don&apos;t make us useful.</li>
            <li>If you want free sample meetings or pay on close, the credits and the refund are the risk we carry, we don&apos;t work for free first.</li>
            <li>If you&apos;re shopping on price, the $4,725 doesn&apos;t move. When a territory can&apos;t fill 15 we change the count and the price stays.</li>
          </ul>
          <p>
            Who it does fit is an independent commercial P&amp;C or benefits agency with two or more producers besides the
            owner, accounts at $25,000 in premium or 20 enrolled lives and up, and nobody owning the prospecting. The call
            is 20 minutes with me.{' '}
            <a href="/#book-call" className="underline underline-offset-2">
              Book it here
            </a>{' '}
            and bring last month&apos;s calendar.
          </p>
        </>
      ),
    },
  ],
  faq: [
    {
      q: 'How much does Maxionlabs cost per month?',
      a: '$4,725 a month, month to month, for 15 qualified live sales meetings a month, 12 in month one. Or $12,500 for 90 days prepaid, about 12% off. No setup fee, no commission share, no contract term.',
    },
    {
      q: 'Is $25,000 in premium the size of account you go after?',
      a: "No, it's the floor. $25,000 in premium or 20 enrolled lives is the smallest account that counts. An owner at $75,000 or $100,000 in premium counts as one meeting, same price, no extra charge.",
    },
    {
      q: 'How much does it cost to hire an insurance producer?',
      a: 'The median wage for insurance sales agents was $62,280 in May 2025 (Bureau of Labor Statistics), before benefits and the draw. The typical validation schedule is three years and 57% of producers validate (IA Magazine, Best Practices study).',
    },
    {
      q: 'What happens if you deliver fewer than 15 meetings?',
      a: 'Each meeting short of 15 (12 in month one) is a $315 credit on your next invoice. A no-show does not count and gets replaced, and a meeting that fails any of the four written conditions does not count either. No contract term, and a 7-day full refund after payment.',
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
      label: 'Payscale, Sales Development Representative salary (2026): average $52,866',
      url: 'https://www.payscale.com/research/US/Job=Sales_Development_Representative_(SDR)/Salary',
    },
    {
      label: 'Built In, Sales Development Representative salary (2026): $57,921 base, $83,110 total compensation',
      url: 'https://builtin.com/salaries/us/sales-development-representative',
    },
    {
      label: 'Independent Agent magazine, "Retention Success Happens Beyond Renewal, Says Liberty Mutual Study" (July 2026): average agency retention around 84%',
      url: 'https://www.iamagazine.com/?p=33852',
    },
    {
      label: 'Maxionlabs ROI calculator: run the illustration above with your own premium, commission and close rate',
      url: 'https://www.maxionlabs.com/roi',
    },
  ],
}
