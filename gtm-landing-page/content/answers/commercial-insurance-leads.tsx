import type { SitePage } from "@/lib/site-pages";
import type { AnswerPageProps } from "@/components/answer/AnswerPage";
import { ComparisonTable } from "@/components/answer/AnswerPage";
import { SERIF, INK, MUTED } from "@/components/home/InsuranceHome";
import {
  LeadsNameOrConversation,
  LeadsCostPerBound,
  LeadsSharedRace,
  LeadsListOnShelf,
  MeetingsFunnel,
} from "@/components/drawings";

/**
 * Answer page for the biggest search cluster in OPS seo-icp-search-demand-2026-11-15.md (row 5, folded with row 6):
 * "commercial insurance leads", "commercial insurance leads for agents", "commercial insurance lead generation",
 * "commercial insurance lead sources". Google autocomplete (suggestqueries, hl=en gl=us, re-run 2026-11-16) returns
 * 10 strings for "commercial insurance leads", including "for agents", "for sale", "lead generation companies" and
 * "lead sources"; "are commercial insurance leads worth it" returns 0. The cluster is mostly producers buying leads,
 * so the first screen filters: a producer with a phone in hand, buy some; an owner with 2+ producers and nobody
 * prospecting, mostly no. Side is MIXED in content/search-targets.ts.
 *
 * v2, 2026-11-16 (MAX-738): rewritten in the plain-book format Max approved on /hire-producer-or-book-meetings.
 *  One owner problem (a lead is a name that still needs the dial), one named framework in owner words (the
 *  who-works-it test), one owner story with stakes (the Pennsylvania president), captioned drawings with every drawn
 *  number repeated in the text, every paragraph drafted as Max saying it on a call then stripped (brand/voice.md
 *  TALK TEST, _system/harness/grokbot/VOICE.md, voice_examples.py samples). v1 is in content/answers/_archive/.
 *  Prose pass 2026-11-16 against brand/voice-core.md (verdict first, "like" into the case, concede then hold, flat
 *  last lines, contractions); facts, numbers, quotes and structure unchanged.
 *  Brevity pass 2026-11-16 (Max: "too much water"): reader copy cut from 2,193 to about 1,440 words. Dropped the
 *  referrals section (the table row and FAQ carry it), the New York VP quote, Idea lines that restated a heading,
 *  and prose that repeated a caption. Every number, quote and source kept is unchanged.
 *  SEO pass 2026-11-16: the same page also targets "commercial insurance lead generation" (210/mo) and "insurance
 *  lead generation agency" (260/mo), both Serpstat g_us via treg, same top-10 intent as the target query (measured
 *  2026-11-16), so no second page. Title, description, the table h2 and one FAQ carry the phrases; h1 unchanged.
 *
 * External numbers, each opened live on 2026-11-16 (curl, HTTP 200, string found on the page):
 *  - Phonexa, "Insurance Leads Cost" (datePublished 2026-03-31): web form commercial insurance, seasonal, $5 to $30;
 *    web form workers comp, shared, $12 to $30; pay-per-call commercial $40 to $100; live transfer commercial
 *    $30 to $120 (source 1)
 *  - ActiveProspect, "Insurance leads cost" (datePublished 2026-09-28): shared web leads $10 to $45; exclusive web leads
 *    $45 to $120; live transfer $80 to $200+; aged $0.50 to $15; "$200 or more for certain exclusive commercial
 *    insurance opportunities" (source 2)
 *  - EverQuote Pro: each lead delivered in real time "to a maximum of three agents" (source 3)
 *  - Insurance Journal, Randy Schwantz (Dec 2018): "the cost of a sale becomes $1,000 each" at a 50% close; the people
 *    who respond to cheap telemarketing "would entertain a quote from anyone" (source 4; v1 misquoted this as
 *    "willing to get a quote from anyone", fixed)
 * Owner quotes are anonymized owners and executives from our own discovery calls (OPS buyer-voice-2026-10-24.md,
 * research-2026-11-14/frame-calls.md and the lead files). Offer numbers from 00_foundation/offer-v3.md only: $4,725 a
 * month, 15 qualified sales meetings held live, 12 in month one, $315 credit per miss, $25,000 premium
 * or 20 lives as a floor. Money shown over 3 months (12 + 15 + 15 = 42), gross before producer pay, year one, no
 * lifetime total. The producer-cost comparison lives on /hire-producer-or-book-meetings and is linked, not repeated.
 */

export const PAGE: SitePage = {
  path: "/commercial-insurance-leads",
  title: "Commercial insurance leads and lead generation, compared",
  description:
    "Shared, exclusive, aged, live transfers, referrals and a lead generation agency, judged on who works the lead and cost per bound account. Every price sourced.",
  kind: "answer",
  changeFrequency: "monthly",
  targetQuery: "commercial insurance leads",
};

const SRC = {
  phonexa: "https://phonexa.com/blog/insurances-leads-cost/",
  activeprospect: "https://activeprospect.com/blog/insurance-leads-cost/",
  everquote: "https://go.everquote.com/pro",
  ij2018:
    "https://www.insurancejournal.com/magazines/mag-ideaexchange/2018/12/17/511777.htm",
  price: "https://www.maxionlabs.com/#price",
};

function Quote({ text, who }: { text: string; who: string }) {
  return (
    <blockquote className="border-l-2 border-accent/60 pl-4 my-2">
      <p className={`${SERIF} text-lg ${INK} leading-snug`}>
        &ldquo;{text}&rdquo;
      </p>
      <footer className={`mt-1.5 text-sm ${MUTED}`}>{who}</footer>
    </blockquote>
  );
}

/** The one-sentence idea that opens each section, set a little bigger so it reads as the point. */
function Idea({ children }: { children: React.ReactNode }) {
  return (
    <p className={`${SERIF} text-xl md:text-2xl ${INK} leading-snug`}>
      {children}
    </p>
  );
}

const A = "text-accent hover:underline underline-offset-4";

export const CONTENT: AnswerPageProps = {
  path: PAGE.path,
  eyebrow:
    "For owners of commercial P&C and benefits agencies with 2 or more producers. Not for solo agents or personal lines shops.",
  h1: "Are commercial insurance leads worth it? Depends who is going to work them",
  lede: "If you're a producer who can call a lead within minutes of it landing, some are, judged on cost per bound account and never on price per lead. If you're an owner with 2 or more producers and nobody prospecting, mostly no. A lead is a name that still needs the call. The who-works-it test, who, by name, works this lead in the first 5 minutes? Six ways below, every price sourced.",
  updated: "2026-11-16",
  sections: [
    {
      id: "who-works-it",
      heading: "A lead is a name somebody in your shop still has to call",
      body: (
        <>
          <p>
            A shared commercial lead lands on a Tuesday, like a landscaper with
            6 trucks asking for a quote. Who in your shop calls him in the next
            5 minutes? In most agencies I talk to at $2M to $15M, nobody.
          </p>
          <Quote
            text="We have a system that we could identify who we want to write business with, but we don't have anybody to make the phone calls and make the appointments for us."
            who="President, commercial P&C agency, Pennsylvania"
          />
          <LeadsNameOrConversation />
        </>
      ),
    },
    {
      id: "cost-per-bound-account",
      heading:
        "Judge a lead on cost per bound account, never on price per lead",
      body: (
        <>
          <Idea>
            Price per lead is the number vendors print because it looks small.
          </Idea>
          <p>
            A $20 shared web lead binding 1 in 40 is $800 per bound account, on
            a $4,000 BOP about $480 in year one at 12%. A $315 qualified sales
            meeting binding 1 in 5 is $1,575 per bound account, above a $25,000
            premium floor about $3,000 a year at 12%, gross, and it renews.
          </p>
          <LeadsCostPerBound />
          <p>
            About double per bound account, about 6 times the account. And who
            decided this was a prospect, a form at 11pm, a vendor&apos;s
            filter, or a person who asked about premium and renewal first?
          </p>
        </>
      ),
    },
    {
      id: "the-table",
      heading: "Commercial insurance lead generation, six ways side by side",
      body: (
        <>
          <Idea>
            Read the &ldquo;who qualifies it&rdquo; column first, it predicts
            the rest.
          </Idea>
          <p>
            Sources at the end. Hiring a producer is on the{" "}
            <a href="/hire-producer-or-book-meetings" className={A}>
              producer-or-meetings page
            </a>
            .
          </p>
          <ComparisonTable
            caption="Six sources of new commercial business, prices as published in the sources."
            columns={[
              "Exclusivity",
              "Contact rate",
              "Who qualifies it",
              "Typical price (sourced)",
              "What you own after",
            ]}
            rows={[
              {
                label: "Shared web leads",
                cells: [
                  "Up to 3 agents at once (EverQuote).",
                  "Minutes, or it’s gone.",
                  "The buyer, by filling in a form.",
                  "$10 to $45 (ActiveProspect). Workers comp form $12 to $30 (Phonexa).",
                  "The name. The other agents have it too.",
                ],
              },
              {
                label: "Exclusive leads",
                cells: [
                  "Yours from that vendor. The buyer can still fill in 3 forms.",
                  "Better. Still a form waiting for a callback.",
                  "The buyer, plus the vendor’s filters.",
                  "$45 to $120, up to $200 or more in commercial (ActiveProspect).",
                  "The name and your notes.",
                ],
              },
              {
                label: "Aged leads and X-date lists",
                cells: [
                  "Nobody’s. Every agent who pays gets the file.",
                  "Low. Old numbers, changed contacts.",
                  "Nobody. It’s data.",
                  "$0.50 to $15 a name, aged (ActiveProspect).",
                  "The file.",
                ],
              },
              {
                label: "Live transfers and pay-per-call",
                cells: [
                  "The call is yours. The buyer may be on his third that day.",
                  "Near 100%. You pay per accepted transfer.",
                  "The vendor’s callers, to a script and a count.",
                  "$30 to $120 live transfer, $40 to $100 pay-per-call (Phonexa).",
                  "One conversation, often a quote request.",
                ],
              },
              {
                label: "Referrals",
                cells: [
                  "Yours alone.",
                  "Near 100%. They were expecting you.",
                  "The referrer, who knows both of you.",
                  "No cash. Lunches and favours.",
                  "The account. You can’t order more.",
                ],
              },
              {
                label: "Qualified sales meetings (Maxionlabs)",
                cells: [
                  "Yours. Never resold to another agency.",
                  "Held live with the owner. A no-show is replaced.",
                  "A person, against a written definition. Floor, appetite, timing, decider.",
                  "$4,725 a month for 15 meetings, about $315 each.",
                  "The meeting, the brief, the account, the map of your territory.",
                ],
              },
            ]}
          />
        </>
      ),
    },
    {
      id: "shared-and-exclusive",
      heading: "Shared and exclusive web leads suit a producer with a phone",
      body: (
        <>
          <Idea>
            Somebody typed the words at 11pm and the form is in your inbox 90
            seconds later.
          </Idea>
          <p>
            Intent you didn&apos;t create, at a price a producer can put on a
            card. EverQuote publishes the rule, a maximum of 3 agents per lead.
          </p>
          <Quote
            text="if you call somebody and they say, yeah, I got five people shopping this, you can be number six."
            who="President, commercial P&C agency, Pennsylvania, on the leads he bought"
          />
          <LeadsSharedRace />
          <p>
            Exclusive fixes the vendor side at 2 to 4 times the price, $45 to
            $120 against $10 to $45 on ActiveProspect&apos;s list, and the buyer
            can still fill in 3 forms in one evening.
          </p>
        </>
      ),
    },
    {
      id: "aged-and-lists",
      heading:
        "Aged leads and X-date lists are the cheapest names you can buy",
      body: (
        <>
          <p>
            Aged leads are web leads that didn&apos;t sell fresh, resold at
            $0.50 to $15 a name. X-date lists are the renewal dates for every
            business in a county, and most owners already pull one. Cost per
            name is pennies, cost per bound account is almost all wages.
          </p>
          <LeadsListOnShelf />
          <p>
            With a caller on payroll a list is the cheapest fuel there is,
            without one it&apos;s the dearest thing on this page. We don&apos;t
            sell lists and we don&apos;t dial X-date files.
          </p>
        </>
      ),
    },
    {
      id: "transfers-and-appointments",
      heading:
        "Live transfers and per-appointment vendors sell you a conversation",
      body: (
        <>
          <p>
            A call centre dials a list, gets a business owner to say sure, put
            me through, and hands you the line, $30 to $120 a commercial live
            transfer on Phonexa. It fixes the dialing, and the fastest way to a
            caller&apos;s count is a quote request from anyone who&apos;ll take
            one.
          </p>
          <p>
            Randy Schwantz said it in Insurance Journal in 2018, hourly callers,
            yeses from people who &ldquo;would entertain a quote from
            anyone&rdquo;, and even at a 50% close a sale cost about $1,000.
          </p>
          <Quote
            text="They would charge us $50 for a confirmed appointment... the appointment basically wasn't legit... the prospect's contact just wanted to get them off the phone."
            who="Executive VP, six-producer commercial P&C agency, Arizona"
          />
          <p>
            The unit was wrong. Put in writing that the meeting is with a
            business above your floor, in its renewal window, with the person
            who signs, or the count gets met with whoever picked up.
          </p>
        </>
      ),
    },
    {
      id: "where-maxionlabs-fits",
      heading: "Where Maxionlabs fits, and who this page is right for",
      body: (
        <>
          <p>
            We map every business in your territory above your floor, usually
            $25,000 in premium or 20 enrolled lives, reach the owners by email,
            confirm fit and timing, and the sales meeting goes on your
            producer&apos;s calendar with a brief.
          </p>
          <p>
            $4,725 a month, month to month, cancel any month, no share of your
            commission. 15 qualified sales meetings a month, held live, 12 in
            month one while we ramp. A no-show doesn&apos;t count, we replace it.
            $315 back for every meeting we miss, your
            counties locked, full terms on the{" "}
            <a href="/pricing" className={A}>
              pricing page
            </a>
            .
          </p>
          <p>
            Over 3 months that&apos;s 42 qualified sales meetings, close 1 in 5
            for about 8 bound accounts, about $25,000 of gross commission a year
            before producer pay, against $14,175 month to month or $12,500
            prepaid. An illustration, your book will differ.
          </p>
          <MeetingsFunnel />
          <p>
            Producers already full is a hire, I&apos;ll say so. Not sure which
            you are? Run the who-works-it test on last month&apos;s leads,{" "}
            <a href="/#book-call" className="underline underline-offset-2">
              book a call
            </a>{" "}
            and bring the answer.
          </p>
        </>
      ),
    },
  ],
  faq: [
    {
      q: "Are commercial insurance leads worth it?",
      a: "For a producer who can call them within minutes, some are, judged on cost per bound account. For an owner whose producers aren't prospecting, mostly not, a lead is a name that still needs the call.",
    },
    {
      q: "How much do commercial insurance leads cost?",
      a: "Phonexa’s 2026 list puts a shared workers comp web lead at $12 to $30 and a commercial live transfer at $30 to $120. ActiveProspect lists shared at $10 to $45, exclusive at $45 to $120 and aged at $0.50 to $15. Nobody publishes cost per bound commercial account.",
    },
    {
      q: "What is the difference between shared and exclusive insurance leads?",
      a: "A shared lead goes to up to 3 agents at once in EverQuote’s case, so you’re racing to the phone. An exclusive lead is sold to you alone by that vendor, at 2 to 4 times the price, and the buyer can still fill in 3 forms.",
    },
    {
      q: "How do I get commercial insurance leads for my agency?",
      a: "Shared web leads, exclusive leads, aged or X-date lists, live transfers, referrals, and qualified sales meetings. Pick by who’s going to make the call.",
    },
    {
      q: "What does a commercial insurance lead generation agency actually do?",
      a: "One of three things. Sells you a list, sells you a lead or a live transfer, or holds a sales meeting for you. That’s the whole difference in what you pay for, a name, one conversation, or an owner who already said yes.",
    },
  ],
  sources: [
    {
      label:
        'Phonexa, "Insurance Leads Cost: Complete Pricing Breakdown", 31 March 2026: web form workers comp shared $12 to $30, web form commercial insurance seasonal $5 to $30, pay-per-call commercial insurance $40 to $100, live transfer commercial insurance $30 to $120',
      url: SRC.phonexa,
    },
    {
      label:
        'ActiveProspect, "Insurance leads cost", 28 September 2026: shared web leads $10 to $45, exclusive web leads $45 to $120, live transfer leads $80 to $200+, aged leads $0.50 to $15, "$200 or more for certain exclusive commercial insurance opportunities"',
      url: SRC.activeprospect,
    },
    {
      label:
        'EverQuote Pro: each lead delivered in real time "to a maximum of three agents"',
      url: SRC.everquote,
    },
    {
      label:
        'Insurance Journal, Randy Schwantz, "Should You Hire an Appointment Setter?", 17 December 2018: "the cost of a sale becomes $1,000 each" at a 50% close; low-cost telemarketing firms hire hourly callers and the only people who respond "would entertain a quote from anyone"',
      url: SRC.ij2018,
    },
    {
      label:
        "Maxionlabs, published price and terms: $4,725 a month, or $12,500 for 90 days prepaid, 15 qualified sales meetings held live, $315 back per miss",
      url: SRC.price,
    },
  ],
};
