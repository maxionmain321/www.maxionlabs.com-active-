import type { SitePage } from '@/lib/site-pages'
import type { AnswerPageProps } from '@/components/answer/AnswerPage'
import { INK, LINE, MUTED, SERIF } from '@/components/home/InsuranceHome'
import { MeetingsFunnel } from '@/components/drawings'
import { AppointmentSettingFourJobs } from '@/components/drawings/AppointmentSettingFourJobs'
import { AppointmentSettingWhatCounts } from '@/components/drawings/AppointmentSettingWhatCounts'
import { AppointmentSettingRecordToCalendar } from '@/components/drawings/AppointmentSettingRecordToCalendar'

/**
 * Answer page for "commercial insurance appointment setting" / "insurance appointment setting services"
 * (search-demand row 1, MAX-738).
 *
 * v2, 2026-11-16: rewritten in the pilot's voice and format (/hire-producer-or-book-meetings v3, Max: "voice + images
 * was great"). One owner problem: I have been burned by setters and telemarketers, what do I actually get and how do I
 * know the meetings are real. Named framework: the four jobs. Owner story: a principal in the Carolinas who built the
 * book cold calling and tried several telemarketers. Four captioned drawings, three new plus the pilot's 3-month funnel.
 * Every paragraph drafted as Max saying it to an owner on a call, then the filler stripped (brand/voice.md TALK TEST).
 * v1 is in content/answers/_archive/ for comparison.
 *
 * v3, 2026-11-16: prose re-voiced against brand/voice-core.md (verdict, reason, "like" example, first person, flat
 * closers). Facts, numbers, drawings, structure, h1, FAQ questions and sources unchanged.
 *
 * v4, 2026-11-16: cut by about a third (Max: "too much water"). Setup sentences, restatements and reasoning-for-the-
 * reader removed, paragraphs making one point merged, headings, table cells and FAQ answers shortened. The "who this
 * is for" section was dropped: the eyebrow, the lede's last sentence and the fit table's fourth row already say it.
 * Every number, quote, drawing, h1, FAQ question and source kept.
 *
 * Demand (MEASURED 2026-11-16, suggestqueries hl=en gl=us): "commercial insurance appointment setting" returns itself;
 * "insurance appointment setting services" returns itself. Both are in content/search-targets.ts.
 *
 * Numbers, each opened live 2026-11-16:
 *  - "If you can close 50 percent of the time, the cost of a sale becomes $1,000 each." Insurance Journal, Dec 2018 (source 1)
 *  - 57% of producers validate, three-year validation schedule: IA Magazine, Jun 2021 (source 2)
 *  - $52,866 average base for a sales development rep, 2026: Payscale (source 3)
 *  - "Each shared lead is sold to no more than four buyers": MediaAlpha for Agents FAQ (source 4)
 *  - average agency retention around 84%: IA Magazine, Liberty Mutual study (source 5)
 *  - offer facts from 00_foundation/offer-v3.md only: $4,725 a month, 12 then 15 qualified sales meetings held live,
 *    $315 back per miss, no commission share, territory lock included, $12,500 for 3 months prepaid.
 *  Money over 3 months (offer-v3 rule): 12 + 15 + 15 = 42 meetings, 1 in 5 close, about 8 accounts, about $25,000 of
 *  gross commission a year before producer pay, year two about $21,000 at 84%. No lifetime totals.
 *  The $500 appointment fee in the Schwantz column is a retired term on this site, so the page says "a few hundred
 *  dollars" and quotes the $1,000 line only.
 * "Appointment setting" and "leads" appear only as the search phrase or the name of an alternative, never as what we sell.
 */

export const PAGE: SitePage = {
  path: '/commercial-insurance-appointment-setting',
  title: 'Commercial insurance appointment setting: what you get, and what to check first',
  description:
    'Insurance appointment setting services, judged by an agency owner. The four jobs, what counts as a meeting, vendors vs an in-house caller, and the price.',
  kind: 'answer',
  changeFrequency: 'monthly',
  targetQuery: 'commercial insurance appointment setting',
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
  h1: 'Commercial insurance appointment setting: what you actually get, and what to check before you pay for it',
  lede:
    "Every owner who asks me about this has been burned already, a telemarketer, a lead company, somebody's cousin dialling from home. Any appointment service does four jobs, find the businesses, get the owner to say yes, check that yes against your rules, hand the meeting to your producer. Most vendors get paid at job two and skip job three. Ours is $4,725 a month for 15 qualified sales meetings, held live, $315 back per miss. Solo agent or personal lines shop, most of what ranks for this search was built for you and this page wasn't.",
  updated: '2026-11-16',
  sections: [
    {
      id: 'four-jobs',
      heading: 'Four jobs, and the third is where owners get burned',
      body: (
        <>
          <Idea>Ask who does job 3.</Idea>
          <p>
            A principal in the Carolinas built the book cold calling, like 90% of his new business still comes off the
            phone, one good account a month at a $25,000 floor. He tried several telemarketers, every time the
            appointments showed up and the quality didn&apos;t.
          </p>
          <Quote
            text="I call it almost trickery. He said, hey, we're going to be in the area, we're going to stop by your office on this day around this time. And it's like, dude, how do you even know I'm going to be in town?"
            who="Principal, commercial P&C agency, the Carolinas, on how a vendor got a business owner to say yes"
          />
          <p>
            Jobs 1 and 2 done, nobody did job 3, nobody checked whether the owner knew what the meeting was for or
            whether the renewal was in 3 months or 11. The vendor gets paid when the invite goes out, so why would he.
          </p>
          <AppointmentSettingFourJobs />
        </>
      ),
    },
    {
      id: 'what-counts',
      heading: 'Write down what counts before anything sends',
      body: (
        <>
          <Idea>Every fight between an owner and a setter was about what counted.</Idea>
          <p>
            One owner in Pennsylvania paid a caller working from her house $300 a qualified lead. His rule, in his
            words, &ldquo;if I got out there and he says, yeah, I got six other guys looking at this, I didn&apos;t pay
            her.&rdquo;
          </p>
          <p>
            The floor is yours, $25,000, $50,000, a group size for benefits, and we take the renewal date on the call.
          </p>
          <AppointmentSettingWhatCounts />
          <p>
            A no-show doesn&apos;t count either. Short of 15 at month end, $315 off the next invoice per missing
            meeting, or cash back if you cancel. A $75,000 account counts as one meeting, no extra charge.
          </p>
        </>
      ),
    },
    {
      id: 'the-alternatives',
      heading: 'Telemarketing vendors, lead vendors and a caller on your payroll',
      body: (
        <>
          <Idea>None of these is wrong. Each fits a different agency.</Idea>
          <p>
            Telemarketing vendors put hourly callers on a bought list and set up whoever agrees. Randy Schwantz did the
            maths in Insurance Journal in 2018, a setter paid a few hundred dollars an appointment.
          </p>
          <Quote text="If you can close 50 percent of the time, the cost of a sale becomes $1,000 each." who="Randy Schwantz, Insurance Journal, December 2018" />
          <p>Fine on a $25,000 account. A disaster on a $3,000 one, and the vendor can&apos;t tell the two apart.</p>
          <p>
            Lead vendors sell a name and a number from a web form, MediaAlpha says each shared lead goes to no more than
            four buyers, so the commercial ones are shopping a renewal three other agencies are already quoting.
          </p>
          <p>
            A caller on your payroll is the cleanest in principle. Payscale puts the average base at $52,866 in 2026,
            plus data and email infrastructure, plus 3 to 6 months of ramp.
          </p>
          <Table
            caption="Four ways to get your producers in the room."
            head={['', 'Telemarketing vendor', 'Lead vendor', 'Caller on your payroll', 'Maxionlabs']}
            rows={[
              [
                'How the business is found',
                'A bought X-date or bureau list, dialled top to bottom',
                'Web forms filled in while shopping',
                'Whatever list you hand them',
                'A public record that just changed',
              ],
              [
                'Who makes contact',
                'Hourly callers, often offshore, your name on the script',
                'Nobody, you get a name and a number',
                'Your employee, from your domain',
                'Email from domains we own, then our call to every yes',
              ],
              [
                'Who does job 3',
                'Usually nobody, qualified means agreed',
                'Nobody',
                'Whatever you train, and it drifts',
                'Us, on the call, against the four tests you signed',
              ],
              [
                'What you pay',
                'Per appointment or per hour, with a minimum',
                'Per lead, shared unless you pay for exclusive',
                'About $52,866 base, plus tools and your time',
                '$4,725 a month for 15 qualified sales meetings, $315 back per miss',
              ],
            ]}
          />
        </>
      ),
    },
    {
      id: 'how-we-do-it',
      heading: 'We start from a public record that just changed',
      body: (
        <>
          <Idea>A record changing is a checkable sign a business is about to need a broker.</Idea>
          <p>
            We don&apos;t buy X-date lists and we don&apos;t cold call. A new operating authority in the DOT census, a
            contractor licence, a Form 5500 plan year, an OSHA citation, something changed, and we email the owner about
            it from domains we own, with copy you approve, never from a domain with your name on it.
          </p>
          <p>
            A painting contractor in Knoxville replied &ldquo;Yes. I am concerned I am overpaying on workers
            comp.&rdquo; Every yes gets a call from us, line, premium, county and who signs checked against what you
            wrote. That&apos;s job 3, and why we promise 15 and not 40.
          </p>
          <AppointmentSettingRecordToCalendar />
          <p>
            Your producer runs the meeting and closes it, we never take it. Your counties only, no other agency in them
            while you&apos;re a client, a meeting we set for you is never resold, all inside the $4,725.
          </p>
        </>
      ),
    },
    {
      id: 'what-it-costs',
      heading: 'It costs $4,725 a month, and only works above a premium floor',
      body: (
        <>
          <Idea>I&apos;d rather lose the call than dance around a number.</Idea>
          <p>
            $4,725 a month, month to month, cancel any month, no share of your commission or premium, or $12,500 if you
            prepay 3 months. 15 qualified sales meetings a month, 12 in month one while the domains ramp, held live with
            the owner or the decider. $315 back for every meeting under the number,
            full terms on the{' '}
            <a href="/pricing" className="underline underline-offset-2">
              pricing page
            </a>
            .
          </p>
          <p>
            Over 3 months, because one month is a sample and three is a book that renews, only an illustration. A
            $25,000 account at 12% commission is about $3,000 of agency commission a year, so 42 qualified sales
            meetings at 1 in 5 is about 8 bound accounts, about $25,000 of gross commission a year before producer pay
            and servicing, against $12,500 prepaid or $14,175 month to month. At 84% retention, the Liberty Mutual
            figure in IA Magazine, year two is about $21,000 for nothing more.
          </p>
          <MeetingsFunnel />
        </>
      ),
    },
    {
      id: 'when-the-alternative-wins',
      heading: 'When the alternative is the right pick',
      body: (
        <>
          <Idea>We say no to agencies that don&apos;t fit.</Idea>
          <Table
            caption="Five situations, and which option fits."
            head={['If this is you', 'The honest pick']}
            rows={[
              ['Solo agent, personal lines, volume at a low price', 'A personal-lines appointment or lead vendor, not us'],
              ['You run a dialling team and need more names', 'Buy the list, you have the engine'],
              ['You want someone on payroll you can walk over to', 'Hire the caller, budget 3 to 6 months of ramp'],
              ['Independent commercial P&C or benefits, 2 or more producers, nobody owns new business', 'This page is for you'],
              ['Your producers cannot take more sales meetings', 'Hire, or raise your floor, and come back when the calendar has room'],
            ]}
          />
          <p>
            Fourth row, the next step is a 20-minute call with me, no sales rep. I&apos;ll ask your lines, counties and
            floor and show you how many owners in your state are showing a trigger right now.
          </p>
          <p>
            <a href="/#book-call" className="underline underline-offset-2">
              Book a call
            </a>{' '}
            and ask me who does job 3. Ask every vendor the same.
          </p>
        </>
      ),
    },
  ],
  faq: [
    {
      q: 'How much does insurance appointment setting cost?',
      a: 'Personal-lines vendors price per appointment, often in the tens of dollars. Maxionlabs is $4,725 a month for 15 qualified sales meetings above your floor, held live, $315 back per miss, or $12,500 for 3 months prepaid.',
    },
    {
      q: 'What does an appointment setter do for an insurance agency?',
      a: 'Four jobs. Find businesses in your appetite with a reason to talk now, get the owner to agree, check that yes against your rules, hand the meeting to a producer with a brief. Most vendors stop after job two.',
    },
    {
      q: 'What is a qualified commercial insurance appointment?',
      a: 'A meeting that passes four tests, premium above your floor, a need now or inside 3 months, inside your counties and carrier appetite, the decider in the room. Fail any one and it is replaced, same for a no-show.',
    },
    {
      q: 'Do you cold call business owners or buy X-date lists?',
      a: 'Neither. We email the owner about a public record that just changed for his business, from domains we own, and only call people who replied yes. Your counties are locked to you and a meeting set for you is never offered to another agency.',
    },
  ],
  sources: [
    {
      label: 'Insurance Journal, Randy Schwantz, "Should You Hire an Appointment Setter?" (December 17, 2018): "If you can close 50 percent of the time, the cost of a sale becomes $1,000 each"',
      url: 'https://www.insurancejournal.com/magazines/mag-ideaexchange/2018/12/17/511777.htm',
    },
    {
      label: 'Independent Agent magazine, "3 Reasons Producer Validation Rates Are So Low" (June 29, 2021): 57% of producers validate per the 2020 Big "I" and Reagan Consulting Best Practices Study; the typical validation schedule is three years',
      url: 'https://www.iamagazine.com/2021/06/29/3-reasons-producer-validation-rates-are-so-low/',
    },
    {
      label: 'Payscale, Sales Development Representative (SDR) salary, United States: average base $52,866 in 2026 (read November 16, 2026)',
      url: 'https://www.payscale.com/research/US/Job=Sales_Development_Representative_(SDR)/Salary',
    },
    {
      label: 'MediaAlpha for Agents, FAQ: "Each shared lead is sold to no more than four buyers" (read November 16, 2026)',
      url: 'https://mediaalpha.com/agents',
    },
    {
      label: 'Independent Agent magazine, "Retention Success Happens Beyond Renewal, Says Liberty Mutual Study": average agency retention rate around 84%',
      url: 'https://www.iamagazine.com/?p=33852',
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
    {
      label: 'Maxionlabs, published price and terms: $4,725 a month, or $12,500 for 3 months prepaid, 15 qualified sales meetings held live, $315 back per miss',
      url: 'https://www.maxionlabs.com/#price',
    },
  ],
}
