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
    "Investment starts from $4,725 a month. It's month to month, cancel any month, and you get 15 qualified live sales meetings a month between your producers and decision makers of commercial accounts above your floor. 12 in month one because of ramp up. A no-show doesn't count, we replace it. Every meeting we come in short is $315 back, that's the credit guarantee. Whenever you cancel, we give you the credit we owe you back in cash. First 7 days are a full refund, no questions asked, that's the game plan alignment guarantee. The harder question is what that's worth next to a producer, bought leads or a setter in house, and that's most of this page.",
  updated: '2026-11-16',
  sections: [
    {
      id: 'cost',
      heading: 'Maxionlabs costs $4,725 a month, leave any month',
      body: (
        <>
          <Idea>One number, nothing behind it.</Idea>
          <p>
            $4,725 a month, paid upfront, auto-renews. No setup fee, no cut of your commission or premium, nothing per
            meeting on top. Prepay the quarter and it&apos;s $12,500 for 90 days, about 12% off.
          </p>
          <PricingOneNumber />
          <p>
            Your producer runs the meeting and closes it. Your side is like an hour a week on copy and targeting.
          </p>
        </>
      ),
    },
    {
      id: 'qualified',
      heading: 'Qualified is four things in writing, and every miss is $315 back',
      body: (
        <>
          <Idea>Set isn&apos;t held, held isn&apos;t qualified, so I write qualified down.</Idea>
          <p>Four conditions in your agreement, and a meeting clears all four or it doesn&apos;t count.</p>
          <ol className="list-decimal pl-5 flex flex-col gap-2">
            <li>
              <strong>Above your floor.</strong> $25,000 in premium, or 20 or more enrolled lives for a benefits shop.
            </li>
            <li>
              <strong>A need now or inside 3 months,</strong> from the renewal date the owner gives us.
            </li>
            <li>
              <strong>Your counties, your carriers.</strong>
            </li>
            <li>
              <strong>The owner in the room,</strong> or whoever signs.
            </li>
          </ol>
          <p>Every yes gets a call from us first, and we check it against what you wrote.</p>
          <PricingFourChecks />
          <SetVsHeld />
          <p>$315 is $4,725 divided by 15.</p>
          <PricingFloorNotTarget />
        </>
      ),
    },
    {
      id: 'math',
      heading: 'Run the three-month book test before you judge the fee',
      body: (
        <>
          <Idea>Judge the fee on the book 3 months leaves behind.</Idea>
          <p>
            Three months is 12 + 15 + 15, 42 qualified sales meetings. Close 1 in 5, about 8 bound accounts, at $25,000
            premium and 12% commission about $25,000 of gross commission a year before producer pay, against $14,175
            month to month or $12,500 prepaid. An illustration, I&apos;m not quoting a result.
          </p>
          <p>
            It renews. The average agency keeps about 84% of its accounts (Liberty Mutual, IA Magazine), so year two on
            the same book is about $21,000 for nothing more.
          </p>
          <MeetingsFunnel />
          <p>And 1 in 5 is the low end, it can easily be more.</p>
          <p>
            Better close rate. Owners on my calls tell me they close 50% and up once the decision maker is actually in the
            room. At 1 in 2 the same 42 meetings are about 21 accounts, like $63,000 a year.
          </p>
          <p>Bigger accounts. A $75,000 account is 3x the commission and still counts as one meeting.</p>
          <p>More meetings. If we land more than 15 in a month, you don&apos;t pay more for them.</p>
          <Quote text="better producers are closing 75%, newer, younger producers 20%." who="Owner, commercial P&C agency, Tennessee" />
          <p>
            Put your own premium, commission and close rate into the{' '}
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
      heading: 'A producer costs more, takes years, and 4 in 10 never validate',
      body: (
        <>
          <Idea>Nothing we do replaces a validated producer.</Idea>
          <p>
            The BLS puts the median wage for insurance sales agents at $62,280 a year as of May 2025, about $5,190 a
            month before benefits and a draw.
          </p>
          <Quote
            text="You hire a new salesperson today, you're not going to see significant results for two or three years."
            who="Kevin Stipe, Reagan Consulting, Insurance Journal, November 2025"
          />
          <p>
            IA Magazine puts validation at three years and the odds at 57%, so 43 in 100 don&apos;t, and a failed
            producer runs &ldquo;in the hundreds of thousands of dollars&rdquo;. At the median wage that&apos;s $186,840
            before you know which kind you hired.
          </p>
          <p>
            If your producers are already full, hire. The{' '}
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
          <p>
            The honest vendors say how many agents get the same name, like EverQuote says its verified-partner leads go
            &ldquo;to a maximum of three agents&rdquo;. Exclusive only means the vendor didn&apos;t resell it.
          </p>
          <Quote text="yeah, I got five people shopping this, you can be number six." who="Agency president, Pennsylvania" />
          <p>
            Cost per bound account is the number you want from{' '}
            <a href="/commercial-insurance-leads" className="underline underline-offset-2">
              commercial insurance lead generation
            </a>{' '}
            and nobody publishes it. Closest is Randy Schwantz, Insurance
            Journal 2018, close half the set appointments and &ldquo;the cost of a sale becomes $1,000 each&rdquo;.
          </p>
          <p>
            We don&apos;t sell names. The owner said yes, we called him, he&apos;s on your producer&apos;s calendar, nobody
            else gets him.
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
            Payscale puts the average SDR at $52,866 in 2026, Built In at $57,921 base and $83,110 total. Add data, a
            dialer, domains, a CRM seat and your hours managing them, call it $7,000 to $8,000 a month, my estimate, and
            it runs whether 15 meetings land or 3.
          </p>
          <p>
            We&apos;re that seat without the hire, with the shortfall on us. If your setter already hits 15 qualified a
            month, keep them.
          </p>
        </>
      ),
    },
    {
      id: 'compare',
      heading: 'Side by side, who carries the risk and what you keep',
      body: (
        <>
          <ComparisonTable
            caption="Four ways to get sales meetings. Producer, leads and setter figures are from the sources at the end."
            columns={['Hiring a producer', 'Buying shared or exclusive leads', 'An in-house setter (SDR)', 'Maxionlabs']}
            rows={[
              {
                label: 'Monthly cost',
                cells: [
                  '$5,190 at the median salary, before draw and benefits (BLS, May 2025).',
                  'Per lead. $1,000 of setting cost per sale at a 50% close (Insurance Journal, 2018).',
                  '$4,400 to $4,800 base, about $6,900 with commission (Payscale, Built In, 2026), plus tools.',
                  '$4,725, month to month. $12,500 for 90 days prepaid.',
                ],
              },
              {
                label: 'Time to the first qualified sales meeting',
                cells: [
                  'Two or three years to significant results (Reagan Consulting).',
                  'Days to a list, then your dial time.',
                  'Two to four months to hire and ramp (our estimate).',
                  '12 in the first 30 days from the first email.',
                ],
              },
              {
                label: 'Who does the prospecting',
                cells: ['The producer, between quotes and service work.', 'You or your producers, calling a list.', 'The setter, managed by you.', 'We do, through to the brief.'],
              },
              {
                label: 'Risk if it fails',
                cells: [
                  'The salary and the draw. 43 in 100 never validate (IA Magazine).',
                  'Paid per lead whether anyone picked up.',
                  'Salary runs regardless. The process leaves with the person.',
                  '$315 back per missed meeting, 7-day full refund, cancel any month.',
                ],
              },
              {
                label: 'What you own at the end',
                cells: [
                  'The accounts they wrote.',
                  'A list other agencies also bought.',
                  'The list and the process, if documented.',
                  'The market as CSV, every brief, the accounts closed.',
                ],
              },
            ]}
          />
        </>
      ),
    },
    {
      id: 'not-for',
      heading: 'Not for solo agents, personal lines shops, or price shoppers',
      body: (
        <>
          <Idea>About half the owners I&apos;ve talked to since October were never our buyer.</Idea>
          <ul className="list-disc pl-5 flex flex-col gap-1.5">
            <li>If you&apos;re a solo agent, 15 live meetings a month on top of your service book is a second job.</li>
            <li>If you&apos;re personal lines led or captive, the commission per account won&apos;t pay the fee back.</li>
            <li>If nobody besides you can take a sales meeting, the credits make us cheaper, they don&apos;t make us useful.</li>
            <li>If you want free samples or pay on close, the credits and the refund are the risk we carry.</li>
            <li>If you&apos;re shopping on price, the $4,725 doesn&apos;t move.</li>
          </ul>
          <p>
            Everyone else, 20 minutes with me,{' '}
            <a href="/#book-call" className="underline underline-offset-2">
              book it here
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
      a: '$4,725 a month, month to month, for 15 qualified live sales meetings, 12 in month one, or $12,500 for 90 days prepaid. No setup fee, no commission share.',
    },
    {
      q: 'Is $25,000 in premium the size of account you go after?',
      a: "No, it's the floor. A $75,000 or $100,000 account counts as one meeting, same price, nothing extra.",
    },
    {
      q: 'How much does it cost to hire an insurance producer?',
      a: '$62,280 median wage in May 2025 (Bureau of Labor Statistics), before benefits and the draw. Validation takes three years and 57% get there (IA Magazine).',
    },
    {
      q: 'What happens if you deliver fewer than 15 meetings?',
      a: 'Each meeting short of 15 (12 in month one) is a $315 credit on the next invoice. A no-show is replaced, a meeting that fails the four conditions does not count. 7-day full refund.',
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
