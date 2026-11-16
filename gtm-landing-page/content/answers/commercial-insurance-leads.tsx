import type { SitePage } from '@/lib/site-pages'
import type { AnswerPageProps } from '@/components/answer/AnswerPage'
import { ComparisonTable } from '@/components/answer/AnswerPage'
import { SERIF, INK, MUTED } from '@/components/home/InsuranceHome'

/**
 * Answer page for the biggest search cluster in OPS seo-icp-search-demand-2026-11-15.md (row 5, folded with row 6):
 * "commercial insurance leads", "commercial insurance leads for agents", "commercial insurance lead generation",
 * "are commercial insurance leads worth it", "workers comp leads". Mostly producers searching, so the first screen
 * says who should buy leads (a producer filling his own pipeline) and who this page's alternative is for (an owner
 * with two or more producers and nobody prospecting). Alternatives are described fairly first, us last.
 *
 * External numbers and where each was verified live on 2026-11-15:
 *  - Phonexa, "Insurance Leads Cost" (31 Mar 2026): shared workers comp web form $12 to $30; commercial web form
 *    (seasonal) $5 to $30; commercial pay-per-call $40 to $100; commercial live transfer $30 to $120 (source 1)
 *  - ActiveProspect, "Insurance leads cost" (28 Sep 2026): shared $10 to $45; exclusive $45 to $120; live transfer
 *    $80 to $200+; aged $0.50 to $15; "$200 or more for certain exclusive commercial insurance opportunities" (source 2)
 *  - EverQuote Pro: each lead delivered "to a maximum of three agents" (source 3)
 *  - Insurance Journal, Randy Schwantz (Dec 2018): "the cost of a sale becomes $1,000 each" at a 50% close; cheap
 *    telemarketing firms hire hourly callers with a basic script, responders "willing to get a quote from anyone" (source 4)
 * Buyer quotes are anonymized owners and executives from our own discovery calls (OPS industry-voice-2026-11-14.md
 * and the lead files). Offer numbers come from 00_foundation/offer-v3.md via the live homepage only.
 * The producer-cost comparison lives on /hire-producer-or-book-meetings and is linked, not repeated.
 */

export const PAGE: SitePage = {
  path: '/commercial-insurance-leads',
  title: 'Are commercial insurance leads worth buying? Six options',
  description:
    'Shared, exclusive, aged, live transfers, referrals and booked first meetings compared on cost per bound account, with sourced prices and who each suits.',
  kind: 'answer',
  changeFrequency: 'monthly',
}

const SRC = {
  phonexa: 'https://phonexa.com/blog/insurances-leads-cost/',
  activeprospect: 'https://activeprospect.com/blog/insurance-leads-cost/',
  everquote: 'https://go.everquote.com/pro',
  ij2018: 'https://www.insurancejournal.com/magazines/mag-ideaexchange/2018/12/17/511777.htm',
  price: 'https://www.maxionlabs.com/#price',
}

function Quote({ text, who }: { text: string; who: string }) {
  return (
    <blockquote className="border-l-2 border-accent/60 pl-4 my-2">
      <p className={`${SERIF} text-lg ${INK} leading-snug`}>&ldquo;{text}&rdquo;</p>
      <footer className={`mt-1.5 text-sm ${MUTED}`}>{who}</footer>
    </blockquote>
  )
}

const A = 'text-accent hover:underline underline-offset-4'

export const CONTENT: AnswerPageProps = {
  path: PAGE.path,
  eyebrow: 'For owners of commercial P&C and benefits agencies with two or more producers. Not for solo agents or personal lines.',
  h1: 'Are commercial insurance leads worth it? Six ways to buy new business, judged on cost per bound account',
  lede:
    'Honestly, it depends on who is holding the phone. If you are a producer filling your own pipeline and you have the hours to call a lead within minutes of it landing, some bought leads are worth it, as long as you judge them on cost per bound account and the size of account they bring, never on price per lead. If you are an agency owner with two or more producers and nobody actually prospecting, mostly no. A lead is a name that still needs the dial, and the dial is what your shop is short of. Six options below, side by side, every price sourced. If you are a solo agent or sell personal lines, these numbers will not fit you.',
  updated: '2026-11-15',
  sections: [
    {
      id: 'name-not-call',
      heading: 'A lead is a name that still needs a phone call, and most agencies are short of the call, not the name',
      body: (
        <>
          <p>
            Shared, exclusive and aged leads and X-date files are basically names with some intent attached. With live
            transfers, referrals and booked first meetings somebody already arranged the conversation.
          </p>
          <p>
            That split matters more than the price. A name is worth what somebody does with it in the next few minutes,
            and in most agencies I talk to at $2M to $15M the producers are on renewals and service, the owner ends up
            dialing, and last quarter&apos;s list sits in a spreadsheet nobody opened. If nobody in the building is
            prospecting, more names just make the spreadsheet longer.
          </p>
          <p>
            So buy leads when you personally have the hours to work them and you want small to mid accounts, fast.
            That is a producer, or an owner who still produces. Don&apos;t buy leads when the real problem is that
            nobody is calling. That owner needs the conversation, not the name.
          </p>
        </>
      ),
    },
    {
      id: 'cost-per-bound-account',
      heading: 'Judge every source on cost per bound account and the size of the account, never on price per lead',
      body: (
        <>
          <p>
            Price per lead is the number vendors publish because it&apos;s the one that looks small. The number that
            pays your payroll is what you spent to bind one account, and what that account pays back.
          </p>
          <p>
            Spend on the source, divided by the accounts it bound, is cost per bound account. Put first-year commission
            next to it. A $25,000 premium account at 12% commission pays $3,000 in year one and roughly that again each
            renewal. A $4,000 BOP from a web form pays about $480. Illustration, not a quote.
          </p>
          <p>
            So a shared lead at $20 that binds one in forty costs $800 per bound account. Cheap, except the account it
            bound is the $480 one. A first meeting at $315 that binds one in five costs $1,575 per bound account, against $3,000 of commission on
            the floor we work to. Dearer per bound account, and still the better trade, because the account is six times
            the size.
          </p>
          <p>
            The sticker also hides who decided this was a prospect. A form the buyer filled in at 11pm, a filter the
            vendor set, or a person who asked about premium and renewal first?
          </p>
        </>
      ),
    },
    {
      id: 'the-table',
      heading: 'Six ways to buy new business, compared on exclusivity, contact rate, who qualifies, price and what you keep',
      body: (
        <>
          <p>
            Prices are the vendors&apos; own published 2026 ranges, sourced at the end. Hiring a producer is left out on
            purpose, it has its own page:{' '}
            <a href="/hire-producer-or-book-meetings" className={A}>
              hire another producer, or book meetings for the ones you have
            </a>
            .
          </p>
          <ComparisonTable
            caption="Six sources of new commercial business. Price ranges are the published figures in the sources list."
            columns={['Exclusivity', 'Contact rate', 'Who qualifies it', 'Typical price (sourced)', 'What you own after']}
            rows={[
              {
                label: 'Shared web leads',
                cells: [
                  'Several agents at once. EverQuote says up to three.',
                  'You are racing the other two. Minutes, or it is gone.',
                  'The buyer, by filling in a form.',
                  '$10 to $45 (ActiveProspect). Shared workers comp form $12 to $30 (Phonexa).',
                  'The name. The other agents have it too.',
                ],
              },
              {
                label: 'Exclusive leads',
                cells: [
                  'Yours from that vendor. The buyer can still fill in three other forms.',
                  'Better. Still a form fill waiting for a callback.',
                  'The buyer, plus the vendor’s filters.',
                  '$45 to $120, $200 or more for some commercial exclusives (ActiveProspect).',
                  'The name and your notes.',
                ],
              },
              {
                label: 'Aged leads and data lists',
                cells: [
                  'Nobody’s. The same X-date file goes to every agent who pays.',
                  'Low. Old numbers, changed contacts.',
                  'Nobody. It is data.',
                  '$0.50 to $15 a name, aged (ActiveProspect). Lists priced by the file.',
                  'The file.',
                ],
              },
              {
                label: 'Live transfers and pay-per-call',
                cells: [
                  'The call is yours. The buyer may be on his third call that day.',
                  'Near 100%. You pay per accepted transfer.',
                  'The vendor’s call centre, to a script and a count.',
                  '$30 to $120 commercial (Phonexa). $80 to $200 or more across lines (ActiveProspect).',
                  'One conversation, often a quote request.',
                ],
              },
              {
                label: 'Referrals',
                cells: [
                  'Yours alone.',
                  'Near 100%. They were expecting you.',
                  'The referrer, who knows both of you.',
                  'No cash. Time, lunches, favours returned.',
                  'The relationship and the account. You cannot order more.',
                ],
              },
              {
                label: 'Booked first meetings (Maxionlabs)',
                cells: [
                  'Yours. The owner said yes to your agency and nobody else gets him.',
                  'On the calendar. No-shows replaced.',
                  'A person, against a written definition: premium floor, appetite, timing, decider present.',
                  '$4,725 a month for 15 meetings, about $315 each, published.',
                  'The meeting, the brief, the bound accounts, the files of every business mapped in your territory.',
                ],
              },
            ]}
          />
        </>
      ),
    },
    {
      id: 'shared-and-exclusive',
      heading: 'Shared and exclusive web leads suit a producer with a phone in hand and small accounts in appetite',
      body: (
        <>
          <p>
            The web lead marketplaces do a real job well. Somebody typed &ldquo;commercial insurance quote&rdquo; at
            11pm, filled in a form, and ninety seconds later it&apos;s in your inbox. Intent you did not have to create,
            at a price a producer can put on a card. EverQuote, to its credit, publishes the sharing rule: each lead
            goes to a maximum of three agents.
          </p>
          <p>
            The catch is in the word shared. Three agents, same form, same minute. The one who calls first usually
            wins. One agency president said it plainly, about the commercial leads he had bought:
          </p>
          <Quote
            text="yeah, I got five people shopping this, you can be number six."
            who="President, commercial P&C agency, Pennsylvania, on what a bought lead told him when he called"
          />
          <p>
            Exclusive fixes the vendor side of that, at two to four times the price. It doesn&apos;t fix the buyer, who
            can fill in three forms in one evening and take the cheapest quote. Web-form accounts are, in commercial,
            mostly small. If your floor is $25,000 in premium, few of those forms will clear it, and
            you will have paid for the ones that didn&apos;t.
          </p>
        </>
      ),
    },
    {
      id: 'aged-and-lists',
      heading: 'Aged leads and data lists are the cheapest names you can buy and the most expensive hours',
      body: (
        <>
          <p>
            Aged leads are web leads that didn&apos;t sell fresh, resold at $0.50 to $15 a name in
            ActiveProspect&apos;s 2026 range. Data lists are the other kind: X-date files, bureau lists, the renewal
            month and carrier for every business in a county. Most owners we talk to already pull one. One told us the
            appointment vendor he had paid was &ldquo;just giving me X dates&rdquo;.
          </p>
          <p>
            Both are honest products if you know you&apos;re buying raw material. Nobody has spoken to anyone. Cost per
            name is pennies and cost per bound account is almost entirely wages, because somebody dials a hundred to
            find the three who will talk, then the one in window.
          </p>
          <p>
            So the question is who is going to work it. With a caller, a list is the cheapest fuel there is. Without one it&apos;s the dearest thing on
            this page, because you paid and it produced nothing. We don&apos;t sell lists and we don&apos;t dial X-date
            files. They&apos;re here because most owners already own one and most never work it.
          </p>
        </>
      ),
    },
    {
      id: 'transfers-and-appointments',
      heading: 'Live transfers and per-appointment vendors sell you a conversation, and owners remember what it was worth',
      body: (
        <>
          <p>
            This is the end of the market that looks most like what we do, so fair is fair. A live transfer is a call
            centre dialing a list, getting a business owner to say &ldquo;sure, put me through&rdquo;, and handing you
            the line. The per-appointment version books a slot on your calendar and charges per slot.
          </p>
          <p>
            It fixes the dialing. What it doesn&apos;t fix is who decided this was a prospect. The caller works to a script and a count, and the fastest way to the count is a quote request from
            anyone who will take one. Randy Schwantz made the point in Insurance Journal in 2018: the cheap telemarketing firms hire
            hourly callers with a basic script, the people who say yes are mostly those willing to get a quote from
            anyone, and even at a 50% close his arithmetic put the setting cost at about $1,000 per sale.
          </p>
          <Quote
            text="They would charge us $50 for a confirmed appointment... the appointment basically wasn't legit... the prospect's contact just wanted to get them off the phone."
            who="Executive VP, six-producer commercial P&C agency, Arizona. He put the real ones at about one in ten."
          />
          <Quote
            text="the quality of those leads were less valuable... I call it almost trickery."
            who="Principal, commercial P&C agency, the Carolinas, on the telemarketers he had paid over the years"
          />
          <p>
            Neither of them is calling the category a scam, they&apos;re saying the unit was wrong. They paid for a
            conversation and needed a conversation with a business above their floor, in its renewal window, with the
            person who signs. Put that definition in writing before anything gets booked, or the count gets met with whoever picked
            up.
          </p>
        </>
      ),
    },
    {
      id: 'referrals',
      heading: 'Referrals close better than anything you can buy, and you cannot order more of them',
      body: (
        <>
          <p>
            Referrals win this table on close rate and it isn&apos;t close. A vice president of business development
            at a commercial agency we spoke to put his hit rate on referred accounts at about 75%. The buyer arrived already trusting you, and price matters less.
          </p>
          <p>
            The problem is supply. Ask for them, build a centre-of-influence programme around CPAs and attorneys, you
            should. You still can&apos;t decide in January to have 15 of them in March. So every agency that grows past
            the owner&apos;s network adds a second channel, and the question is which one. Keep the referrals as the top
            row, then pick the paid source by what it does to your producers&apos; calendars.
          </p>
        </>
      ),
    },
    {
      id: 'where-maxionlabs-fits',
      heading: 'Maxionlabs is the last row, and only right for an owner whose producers are not prospecting',
      body: (
        <>
          <p>
            We&apos;re the last row, and only right for one of the two readers this page started with. We map every business in your territory that fits your appetite and sits above your premium floor, usually
            $25,000 in premium or 20 enrolled lives. We reach the owners by email about a change in their business,
            confirm fit and timing with the ones who reply, and book the first meeting straight onto your
            producer&apos;s calendar with a brief before each one. Your producers run the meeting and close. Qualified is
            written into your agreement first: above your floor, inside your appetite, a need now or within three
            months, the decider in the meeting.
          </p>
          <p>
            The published terms are $4,725 a month, month to month, cancel any month, no share of your commission. 15
            qualified first meetings a month, 12 in month one while we ramp. $315 off your next invoice for every
            meeting we miss. A 7-day full refund for any reason. Your counties locked, never resold. Full comparison on the{' '}
            <a href="/pricing" className={A}>
              pricing page
            </a>
            .
          </p>
          <p>
            It fits an independent commercial P&amp;C or benefits agency, roughly $2M to $15M, two or more producers
            besides the owner, and nobody owning the hour that fills their calendars. It doesn&apos;t fit a solo agent,
            a personal-lines shop, a captive, or an agency whose producers are already full, which is a hire.
            And if you&apos;re a producer looking for leads to work yourself, honestly, the shared and exclusive rows are
            your answer.
          </p>
        </>
      ),
    },
  ],
  faq: [
    {
      q: 'Are commercial insurance leads worth it?',
      a: 'For a producer with the hours to call them within minutes and an appetite for small to mid accounts, some are. Judge them on cost per bound account and the size of account bound, not price per lead. For an owner whose producers are not prospecting, mostly not: a lead is a name that still needs a call.',
    },
    {
      q: 'How much do commercial insurance leads cost?',
      a: 'Published 2026 lists put a shared workers comp web lead at $12 to $30, pay-per-call at $40 to $100 and a commercial live transfer at $30 to $120 (Phonexa). Across lines, ActiveProspect lists shared at $10 to $45, exclusive at $45 to $120, aged at $0.50 to $15 and live transfers at $80 to $200 or more. Nobody publishes cost per bound commercial account.',
    },
    {
      q: 'What is the difference between shared and exclusive insurance leads?',
      a: 'A shared lead is sold to more than one agent at once, up to three in EverQuote’s case, so you are racing to the phone. An exclusive lead is sold to you alone by that vendor, at roughly two to four times the price. Exclusive is a promise about the vendor, not the buyer.',
    },
    {
      q: 'Are aged insurance leads worth buying?',
      a: 'Only if you have a caller to work them. At $0.50 to $15 a name they are the cheapest intent you can buy and have the lowest contact rate, so almost the whole cost per bound account is hours spent dialing. A file nobody works is the most expensive option on the page.',
    },
    {
      q: 'How do I get commercial insurance leads for my agency?',
      a: 'Six routes, shared web leads, exclusive leads, aged or data lists, live transfers, referrals, and booked first meetings. Pick by who is going to make the call. A producer with hours buys names. An owner whose producers have stopped prospecting needs the conversation arranged, with referrals on top.',
    },
  ],
  sources: [
    {
      label:
        'Phonexa, "Insurance Leads Cost: Complete Pricing Breakdown", 31 March 2026: shared workers comp web form $12 to $30, commercial web form (seasonal) $5 to $30, commercial pay-per-call $40 to $100, commercial live transfer $30 to $120',
      url: SRC.phonexa,
    },
    {
      label:
        'ActiveProspect, "Insurance leads cost", 28 September 2026: shared $10 to $45, exclusive $45 to $120, live transfers $80 to $200+, aged $0.50 to $15, "$200 or more for certain exclusive commercial insurance opportunities"',
      url: SRC.activeprospect,
    },
    {
      label: 'EverQuote Pro, FAQ: each lead delivered in real time "to a maximum of three agents"',
      url: SRC.everquote,
    },
    {
      label:
        'Insurance Journal, Randy Schwantz, "Should You Hire an Appointment Setter?", 17 December 2018: "the cost of a sale becomes $1,000 each" at a 50% close. Low-cost telemarketing firms hire hourly callers with a basic script and their responders are "willing to get a quote from anyone"',
      url: SRC.ij2018,
    },
    {
      label: 'Maxionlabs, published terms: $4,725 a month, 15 qualified first meetings, $315 credit per miss, 7-day full refund',
      url: SRC.price,
    },
  ],
}
