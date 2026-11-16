import type { SitePage } from '@/lib/site-pages'
import type { AnswerPageProps } from '@/components/answer/AnswerPage'
import { INK, LINE, MUTED, SERIF } from '@/components/home/InsuranceHome'

/**
 * Answer page for the "insurance appointment setting services" cluster (search-demand row 1, MAX-738).
 *
 * Every number traces to a file or a source in `sources` below:
 *   offer-v3.md CURRENT INSURANCE OFFER: 4,725/mo, 15 a month (12 in month one), 315 per miss, 7-day refund,
 *     12,500 for 90 days, no commission share, territory lock, brief, qualified = premium + renewal + appetite + decider
 *   InsuranceHome.tsx: the approved method wording (STEPS, NOT_US, QUALIFIED), the fit lists, the two anonymized
 *     owner quotes, one owner reply, the premium-math example (15 x 2 x $30K, labelled an example)
 *   industry-voice-2026-11-14.md 6e/6f: owners distrust telemarketing vendors, publish the price, never "leads" for us
 *   External: IA Magazine 2021 (57% validate, three years), Insurance Journal 2018 column (the per-appointment maths),
 *     Payscale 2026 SDR base, MediaAlpha agent FAQ (shared lead to no more than four buyers), the three public-record
 *     sources we pull from.
 * "Appointment setting" and "leads" appear only as the search phrase or as the name of an alternative, never as what we sell.
 */

export const PAGE: SitePage = {
  path: '/commercial-insurance-appointment-setting',
  title: 'Commercial insurance appointment setting: what you get, who it fits, what it costs',
  description:
    'What an outsourced first-meeting service does for a commercial P&C or benefits agency, how it compares with vendors and an in-house SDR, and what it costs.',
  kind: 'answer',
  changeFrequency: 'monthly',
  targetQuery: 'commercial insurance appointment setting',
}

/* ------------------------------------------------------------- helpers */

function P({ children }: { children: React.ReactNode }) {
  return <p>{children}</p>
}

function A({ href, children }: { href: string; children: React.ReactNode }) {
  const external = href.startsWith('http')
  return (
    <a
      href={href}
      className="text-accent hover:underline underline-offset-4"
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      {children}
    </a>
  )
}

/** An anonymized buyer line or an attributed external quote. Same shape as the homepage Quote. */
function Quote({ text, who }: { text: string; who: React.ReactNode }) {
  return (
    <figure data-testid="buyer-quote" className="border-l-2 border-accent/60 pl-4 my-2">
      <blockquote className={`${SERIF} text-lg ${INK} leading-snug`}>&ldquo;{text}&rdquo;</blockquote>
      <figcaption className={`mt-2 text-xs ${MUTED}`}>{who}</figcaption>
    </figure>
  )
}

/** Server-rendered comparison table. Plain HTML so AI crawlers that run no JavaScript still read it. */
function Table({ caption, head, rows }: { caption: string; head: string[]; rows: string[][] }) {
  return (
    <div className={`my-2 rounded-card border ${LINE} bg-white overflow-x-auto`}>
      <table className="w-full text-sm text-left border-collapse">
        <caption className={`text-left px-4 pt-3 pb-2 text-xs ${MUTED}`}>{caption}</caption>
        <thead>
          <tr className={`border-b ${LINE}`}>
            {head.map((h, i) => (
              <th key={i} scope="col" className={`px-4 py-2 font-semibold ${INK} align-top`}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r[0]} className={`border-b border-dotted ${LINE} last:border-0`}>
              {r.map((c, i) =>
                i === 0 ? (
                  <th key={i} scope="row" className={`px-4 py-2.5 font-semibold ${INK} align-top`}>
                    {c}
                  </th>
                ) : (
                  <td key={i} className={`px-4 py-2.5 ${MUTED} align-top leading-snug`}>
                    {c}
                  </td>
                ),
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

/* ------------------------------------------------------------- content */

const COMPARISON_HEAD = ['', 'Telemarketing appointment vendor', 'Lead vendor', 'In-house SDR', 'Maxionlabs']

/** The four rows the brief asked for, plus what you pay. Alternatives described as they describe themselves. */
const COMPARISON_ROWS: string[][] = [
  [
    'How prospects are found',
    'A bought X-date or bureau list, dialled top to bottom',
    'Web forms the owner filled in while shopping',
    'Whatever list you hand them, plus the phone',
    'A public record that just changed for that business',
  ],
  [
    'Who makes contact',
    'Hourly callers, often offshore, your agency name on the script',
    'Nobody. You get a name and a number',
    'Your employee, from your domain',
    'Email from domains we own, then our call to every owner who said yes',
  ],
  [
    'How qualified is defined',
    'Usually "agreed to a meeting"',
    'The form fields. Nobody has spoken to them',
    'Whatever you train, and it drifts',
    'Four signed tests: premium floor, renewal within 3 months, appetite, decider present',
  ],
  [
    'Who owns the meeting',
    'The vendor books it, no-shows are your problem',
    'You do, from the first dial',
    'You do, plus the ramp and the management',
    'Your producer’s calendar, brief first, no-shows replaced',
  ],
  [
    'What you pay',
    'Per appointment or per hour, with a minimum',
    'Per lead, shared unless you pay for exclusive',
    'Salary and tools. 2026 SDR base about $52,900 before commission',
    '$4,725 a month for 15 qualified sales meetings, $315 back per miss',
  ],
]

const SCENARIO_HEAD = ['If this is you', 'The honest pick']

const SCENARIO_ROWS: string[][] = [
  ['Solo agent, personal lines, volume at a low price per head', 'A personal-lines appointment or lead vendor. Not us'],
  ['You already run a dialling team and need more names', 'Buy the list. You have the engine, you need fuel'],
  ['You want someone on payroll you can walk over to', 'Hire the SDR, budget six months of ramp'],
  ['Independent commercial P&C or benefits, 2+ producers, nobody owns outbound', 'An outsourced first-meeting seat. This page is for you'],
  ['Your producers cannot take more sales meetings', 'Nothing here. Fix capacity first, or raise your floor'],
]

export const CONTENT: AnswerPageProps = {
  eyebrow: 'Guide for agency owners',
  h1: 'Commercial insurance appointment setting: what you actually get, who it fits, and what it costs',
  lede:
    'An outsourced first-meeting service finds business owners in your appetite, gets them to say yes to a conversation, confirms that yes on a call, and puts the meeting on a producer’s calendar with a brief. It’s for independent commercial P&C and benefits agencies, roughly $2M to $15M in revenue, with at least two producers besides the owner. Ours costs $4,725 a month for 15 qualified sales meetings, month to month, $315 back for every meeting we miss. If you’re a solo agent or a personal lines shop, honestly, this isn’t for you, and most of what ranks for this search was built for you instead.',
  updated: '2026-11-15',
  sections: [
    {
      id: 'who-this-is-for',
      heading: 'Most of what ranks for insurance appointment setting is built for solo agents, so check who you are first.',
      body: (
        <>
          <P>
            Type &ldquo;insurance appointment setting services&rdquo; into Google and the pages you get are selling to a life
            agent or a personal lines producer who wants 20 appointments a week at a low price per head. That&apos;s a real
            market, it&apos;s just not the one an owner with four producers is standing in. A commercial account is worth a
            different kind of money, and &ldquo;qualified&rdquo; has to mean something closer to what your underwriters mean.
          </P>
          <P>
            This page is for you if you run an independent commercial P&amp;C or benefits agency, roughly
            $2M to $15M in revenue, with at least two producers besides yourself, and you can name your premium floor out
            loud. It&apos;s not for solo agents, personal-lines-first agencies, captives, or in-person-only shops. The
            records we watch are commercial, the first call happens online, and a captive owner needs a broker who can
            shop him.
          </P>
        </>
      ),
    },
    {
      id: 'what-the-service-does',
      heading: 'An outsourced first-meeting service does four jobs, and the fourth is the one most vendors skip.',
      body: (
        <>
          <P>
            Every version of this does the same four things. Find businesses that fit
            your appetite and have a reason to talk right now. Get the owner to say yes to a conversation. Check that yes
            against your rules before it costs a producer an hour. Then hand the meeting over with a time, who&apos;s on
            the other side, and why they said yes.
          </P>
          <P>
            The fourth job is where most of the category falls down. A dialler paid per appointment gets paid when the
            invite goes out, so the invite goes out. Whether the owner knew what the meeting was about, whether his
            renewal is in three months or eleven, whether your carriers would even write him, all of that lands on your
            producer on Tuesday morning. One agency president, on a call with me:
          </P>
          <Quote
            text="the fact that they're warm and open to having a conversation, I'm telling you, if you just get us in the room, you know, that's where we're good."
            who="President, commercial P&C agency, Tennessee, on what he needs from an outside seat"
          />
        </>
      ),
    },
    {
      id: 'the-alternatives',
      heading: 'Telemarketing vendors, lead vendors and an in-house SDR each solve a different problem.',
      body: (
        <>
          <P>
            Telemarketing appointment vendors take a list, usually an X-date or bureau list, put hourly callers on it
            and book whoever agrees to a meeting. Priced per appointment or per hour. To be fair, if you have a producer
            who&apos;ll take anything, they move volume fast. The problems are the ones owners tell me about unprompted.
            Offshore callers, your agency name on a script you didn&apos;t write, and &ldquo;qualified&rdquo; meaning
            &ldquo;said yes to a call&rdquo;. A 2018 Insurance Journal column ran the
            maths with a five hundred dollar appointment fee:
          </P>
          <Quote
            text="If you can close 50 percent of the time, the cost of a sale becomes $1,000 each."
            who={
              <>
                Randy Schwantz,{' '}
                <A href="https://www.insurancejournal.com/magazines/mag-ideaexchange/2018/12/17/511777.htm">
                  Insurance Journal, December 2018
                </A>
              </>
            }
          />
          <P>Fine on a $25K account, a disaster on a $3K one, and the vendor can&apos;t tell the two apart.</P>
          <P>
            Lead vendors sell you a name and a number from a web form, priced per lead. Shared leads go to several
            agencies at once. MediaAlpha, one of the larger ones, says each shared lead goes to no more than four buyers.
            To be fair it&apos;s cheap and instant and there&apos;s no contract. The problem for a commercial agency is
            that form fillers are mostly personal lines, and the commercial ones are shopping a renewal three other
            agencies are quoting. You&apos;ve bought a list, not a seat.
          </P>
          <P>
            An in-house SDR is the cleanest version in principle. Your employee, your domain, your rules. The honest
            cost is salary (Payscale has the 2026 US base near $52,900 before commission), plus data and email
            infrastructure, plus three to six months of ramp that you manage.
          </P>
          <Table caption="Four ways to buy sales meetings, compared on how the work gets done." head={COMPARISON_HEAD} rows={COMPARISON_ROWS} />
        </>
      ),
    },
    {
      id: 'what-qualified-means',
      heading: 'Qualified has to be defined before anything sends, or the invoice turns into an argument.',
      body: (
        <>
          <P>
            Every owner who&apos;s been burned by a setter tells the same story. The meetings happened, the invoice came,
            and half of them should never have been booked. The fight is almost never about whether the vendor worked,
            it&apos;s about what counted. So the definition gets signed before the first email goes out. Ours has four
            parts, and a meeting passes all four or it doesn&apos;t count against the 15.
          </P>
          <ul className="list-disc pl-5 flex flex-col gap-1.5">
            <li>The premium is above the floor you set. $25K, $50K, your call.</li>
            <li>
              There&apos;s a need now or within 3 months. We take the renewal date on the call and it goes into your
              renewal calendar.
            </li>
            <li>The business is in your territory and your carriers write the line.</li>
            <li>The owner, or whoever actually decides, is in the meeting.</li>
          </ul>
          <P>
            Fail any one and we owe you another meeting. End the month short of 15 and it&apos;s $315 off the next invoice
            per missing meeting, or cash back if you cancel.
          </P>
        </>
      ),
    },
    {
      id: 'how-maxionlabs-does-it',
      heading: 'We fit where the owner answers an email that names what just changed in his business.',
      body: (
        <>
          <P>
            We don&apos;t buy X-date lists and we don&apos;t cold call. We start from public records, because a record
            changing is a checkable sign a business is about to need a broker.
          </P>
          <P>
            So a public record changes. A new operating authority in the DOT census, a contractor licence, a Form 5500
            plan year, an OSHA citation. We email the owner about it, from domains we own, with copy you approve, never
            from a domain with your agency&apos;s name on it. The email names the record and asks a plain question,
            which is why a painting contractor in Knoxville replied: &ldquo;Yes. I am concerned I am overpaying on
            workers comp.&rdquo;
          </P>
          <P>
            Then every yes gets a call from us. We confirm they want the meeting, take the renewal date, and check line,
            premium, county and who signs against what you wrote. This is the step per-appointment vendors skip, and
            it&apos;s why the number we promise is 15 and not 40.
          </P>
          <P>
            Only a match reaches your producer&apos;s calendar, and the brief lands in the inbox first, so when, who,
            what the business is, why they said yes, what to watch for. No-shows are replaced.
          </P>
          <P>
            It runs in your counties only. We don&apos;t work with another agency in them while you&apos;re a client, and a
            meeting we book for you is never resold. That&apos;s inside the $4,725.
          </P>
        </>
      ),
    },
    {
      id: 'outsourced-sdr-for-insurance',
      heading: 'An outsourced SDR for an insurance agency is a producer’s prospecting seat without the three-year bet.',
      body: (
        <>
          <P>
            Some owners search for this as &ldquo;outsourced SDR for insurance&rdquo;, and I think that&apos;s the better
            name. You&apos;re buying the top of a producer&apos;s funnel without hiring the next producer to fill it. The
            usual way an agency adds outbound is to hire a producer and hope he prospects, and the industry&apos;s own
            numbers on how that goes aren&apos;t great.
          </P>
          <Quote
            text="Across agencies of all sizes, 57% of producers validate, according to the 2020 Best Practices Study"
            who={
              <>
                Independent Agent magazine,{' '}
                <A href="https://www.iamagazine.com/2021/06/29/3-reasons-producer-validation-rates-are-so-low/">
                  3 Reasons Producer Validation Rates Are So Low, June 2021
                </A>
                , citing the Big &ldquo;I&rdquo; and Reagan Consulting
              </>
            }
          />
          <P>
            The same article puts the typical validation schedule at three years. None of that argues against hiring
            producers. It argues against expecting the one you already have to do the prospecting he isn&apos;t doing.
          </P>
          <Quote
            text="we struggle with that. If we were good at that, we wouldn't need to pay you to do it."
            who="President, commercial P&C agency, Tennessee, on prospecting"
          />
          <P>
            So the comparison isn&apos;t really us versus a telemarketer, it&apos;s more us versus the draw you&apos;d
            pay a new producer while he learns to prospect. A month-to-month seat with a written miss credit is the
            lower-risk way to find out whether outbound works in your territory.
          </P>
        </>
      ),
    },
    {
      id: 'what-it-costs',
      heading: 'It costs $4,725 a month, and the maths only works above a premium floor.',
      body: (
        <>
          <P>
            The price is published because owners buy faster when it is, and because I&apos;d rather lose the call than
            dance around a number. $4,725 a month, month to month, cancel anytime. No share of your commission or premium.
            Or $12,500 for 90 days, which saves 12%. Month one is 12 qualified meetings while the domains ramp, 15 a month
            from month two. $315 back for every meeting under the number, and a 7-day full refund after payment, any
            reason. Full terms on the <A href="/pricing">pricing page</A>.
          </P>
          <P>
            The premium floor matters more than the price. Take 15 sales meetings a month. Say your producers close two,
            under the 20% a newer producer closes, and the average account is $30K in premium. That&apos;s $60K in new
            premium a month, about $7,200 a month in commission at 12%, against a $4,725 fee. Run the same 15 meetings on
            $5K accounts and it doesn&apos;t work, which is why we won&apos;t book them. Example numbers, not a promise. I
            run yours on the call.
          </P>
        </>
      ),
    },
    {
      id: 'when-the-alternative-wins',
      heading: 'Sometimes the alternative is the right pick, and it’s cheaper to say so now.',
      body: (
        <>
          <P>
            We say no to agencies that don&apos;t fit, and the table is the short version of why.
          </P>
          <Table caption="Five situations owners describe, and which option actually fits each." head={SCENARIO_HEAD} rows={SCENARIO_ROWS} />
          <P>
            If the fourth row is you, the next step is a 20-minute call with me, not a sales rep. I&apos;ll ask about your
            lines, territory and premium floor, pull your state from the public records, and show you how many owners are
            showing a trigger right now. You keep that count either way.
          </P>
        </>
      ),
    },
  ],
  faq: [
    {
      q: 'How much does insurance appointment setting cost?',
      a: 'Personal-lines appointment vendors price per appointment, often in the tens of dollars. For a commercial agency the unit is different. Maxionlabs charges $4,725 a month for 15 qualified sales meetings above your premium floor, month to month, $315 back per missed meeting, 7-day full refund. A 90-day prepay is $12,500.',
    },
    {
      q: 'What does an appointment setter do for an insurance agency?',
      a: 'Four jobs. It finds businesses in your appetite with a reason to talk now, gets the owner to agree to a conversation, checks that yes against your rules, and hands the meeting to a producer with a brief.',
    },
    {
      q: 'Is appointment setting worth it for insurance agents?',
      a: 'For a solo agent or personal lines producer, a low-cost per-appointment vendor can pay on volume. For a commercial agency with producers, judge it on cost per bound account: 15 meetings a month at a $25K floor with two closes is about $7,200 a month in commission at 12%, against a $4,725 fee, as an example.',
    },
    {
      q: 'What is a qualified commercial insurance appointment?',
      a: 'In our agreement, a meeting that passes four tests: premium above your floor, a renewal need now or within 3 months, inside your territory and carrier appetite by line, and the decider in the room. Fail any one and it does not count and is replaced.',
    },
    {
      q: 'Do you cold call business owners?',
      a: 'No. We email the owner about a public record that just changed for his business, from domains we own, with copy you approve. We only call people who replied yes, to confirm the meeting, take the renewal date and check fit.',
    },
    {
      q: 'Do you buy X-date lists or resell the meetings?',
      a: 'Neither. We start from public records, not bought X-date or bureau lists, and take the renewal date on the confirmation call. Your counties are locked to you, and a meeting set for you is never offered to another agency.',
    },
  ],
  sources: [
    {
      label: 'Independent Agent magazine, "3 Reasons Producer Validation Rates Are So Low" (June 29, 2021): 57% of producers validate per the 2020 Big "I" and Reagan Consulting Best Practices Study, typical validation schedule three years',
      url: 'https://www.iamagazine.com/2021/06/29/3-reasons-producer-validation-rates-are-so-low/',
    },
    {
      label: 'Insurance Journal, Randy Schwantz, "Should You Hire an Appointment Setter?" (December 17, 2018): the per-appointment fee and 50% close maths',
      url: 'https://www.insurancejournal.com/magazines/mag-ideaexchange/2018/12/17/511777.htm',
    },
    {
      label: 'Payscale, Sales Development Representative (SDR) salary, United States: average base $52,866 in 2026 (read November 15, 2026)',
      url: 'https://www.payscale.com/research/US/Job=Sales_Development_Representative_(SDR)/Salary',
    },
    {
      label: 'MediaAlpha for Agents, FAQ: "Each shared lead is sold to no more than four buyers" (read November 15, 2026)',
      url: 'https://mediaalpha.com/agents',
    },
    {
      label: 'U.S. Department of Transportation, FMCSA Company Census File (new operating authorities)',
      url: 'https://data.transportation.gov/Trucking-and-Motorcoaches/Company-Census-File/az4n-8mr2',
    },
    {
      label: 'U.S. Department of Labor, EFAST Form 5500 search (plan years)',
      url: 'https://www.efast.dol.gov/5500Search/',
    },
    {
      label: 'OSHA enforcement and injury data (citations)',
      url: 'https://www.osha.gov/data',
    },
  ],
}
