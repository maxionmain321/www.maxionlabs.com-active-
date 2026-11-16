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
 * month, 15 qualified sales meetings held live, 12 in month one, $315 credit per miss, 7-day refund, $25,000 premium
 * or 20 lives as a floor. Money shown over 3 months (12 + 15 + 15 = 42), gross before producer pay, year one, no
 * lifetime total. The producer-cost comparison lives on /hire-producer-or-book-meetings and is linked, not repeated.
 */

export const PAGE: SitePage = {
  path: "/commercial-insurance-leads",
  title: "Are commercial insurance leads worth it? Six ways compared",
  description:
    "Shared, exclusive, aged, live transfers, referrals and qualified sales meetings, judged on who works them and cost per bound account. Every price sourced.",
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
  lede: "Depends who's going to pick up the phone. If you're a producer filling your own book and you can call a lead within minutes of it landing, some bought leads are worth it. Judge them on cost per bound account, never on price per lead. If you're an agency owner with 2 or more producers and nobody actually prospecting, mostly no. A lead is a name that still needs the call, and the call is what your shop is short of. I call it the who-works-it test. Who, by name, works this lead in the first 5 minutes? Six ways to buy new business below, every price sourced.",
  updated: "2026-11-16",
  sections: [
    {
      id: "who-works-it",
      heading:
        "A lead is a name somebody still has to call, and most agencies are short of the call",
      body: (
        <>
          <Idea>
            A lead is a name. The call is the part nobody in the building owns.
          </Idea>
          <p>
            Picture the inbox on a Tuesday. A shared commercial lead lands, a
            landscaper with 6 trucks asking for a quote. Who in your shop calls
            him in the next 5 minutes?
          </p>
          <p>
            In most agencies I talk to at $2M to $15M the honest answer is
            nobody. The producers are on renewals, you&apos;re in a carrier
            meeting, and last quarter&apos;s X-date list sits in a spreadsheet
            nobody opened.
          </p>
          <p>A president of a P&amp;C shop in Pennsylvania put it plainly.</p>
          <Quote
            text="We have a system that we could identify who we want to write business with, but we don't have anybody to make the phone calls and make the appointments for us."
            who="President, commercial P&C agency, Pennsylvania"
          />
          <p>
            So here&apos;s the test I run with owners, the who-works-it test.
            Who works this lead in the first 5 minutes, by name? And what size
            account does it bring when it binds?
          </p>
          <p>
            If that&apos;s you, a producer, or a caller you pay, buying names
            can work. If it&apos;s nobody, you&apos;re buying rows for a
            spreadsheet.
          </p>
          <LeadsNameOrConversation />
        </>
      ),
    },
    {
      id: "cost-per-bound-account",
      heading:
        "Judge a lead on cost per bound account and the size of the account, never on price per lead",
      body: (
        <>
          <Idea>
            Price per lead is the number vendors print because it looks small.
          </Idea>
          <p>
            The number that pays your payroll is what you spent to bind 1
            account, and what it pays back. Spend divided by accounts bound is
            cost per bound account. Put first-year commission next to it.
          </p>
          <p>
            Run two with me. A shared web lead at $20 that binds 1 in 40 costs
            $800 per bound account. Cheap. Except a web form in commercial is
            mostly small, say a $4,000 BOP, and at 12% commission that pays
            about $480 in year one.
          </p>
          <p>
            Now a qualified sales meeting at $315 that binds 1 in 5. That&apos;s
            $1,575 per bound account, about double. But the account sits above a
            $25,000 premium floor, so at 12% it pays about $3,000 a year, gross,
            and it renews. Illustration, not a quote, your numbers will differ.
          </p>
          <LeadsCostPerBound />
          <p>
            So dearer per bound account and still the better trade, the account
            is about 6 times the size. One more thing the sticker hides. Who
            decided this was a prospect? A form filled in at 11pm, a
            vendor&apos;s filter, or a person who asked about premium and
            renewal first?
          </p>
        </>
      ),
    },
    {
      id: "the-table",
      heading:
        "Six ways to buy new business, side by side, every price from the vendor’s own page",
      body: (
        <>
          <Idea>
            Read the &ldquo;who qualifies it&rdquo; column first, it predicts
            the rest.
          </Idea>
          <p>
            Prices are the vendors&apos; own published 2026 ranges, sourced at
            the end. Hiring a producer has its own page,{" "}
            <a href="/hire-producer-or-book-meetings" className={A}>
              hire another producer, or get yours more sales meetings
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
                  "Minutes, or it is gone.",
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
                  "Nobody. It is data.",
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
                  "The account. You cannot order more.",
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
      heading:
        "Shared and exclusive web leads suit a producer with a phone in hand and small accounts in appetite",
      body: (
        <>
          <Idea>
            The marketplaces do one real job. Somebody typed the words at 11pm
            and the form is in your inbox 90 seconds later.
          </Idea>
          <p>
            That&apos;s intent you didn&apos;t create, at a price a producer can
            put on a card. EverQuote publishes the rule, each lead goes to a
            maximum of 3 agents.
          </p>
          <p>
            The catch is in the word shared. 3 agents, same form, same minute,
            and the first to dial usually wins. The same Pennsylvania president
            told me what happened when he called the leads he&apos;d bought.
          </p>
          <Quote
            text="if you call somebody and they say, yeah, I got five people shopping this, you can be number six."
            who="President, commercial P&C agency, Pennsylvania, on the leads he bought"
          />
          <LeadsSharedRace />
          <p>
            Exclusive fixes the vendor side, at 2 to 4 times the price, $45 to
            $120 against $10 to $45 on ActiveProspect&apos;s list. It
            doesn&apos;t fix the buyer, who can fill in 3 forms in one evening
            and take the cheapest quote.
          </p>
          <p>
            Web-form accounts in commercial are mostly small. If your floor is
            $25,000 in premium, few clear it, and you paid for the ones that
            didn&apos;t.
          </p>
        </>
      ),
    },
    {
      id: "aged-and-lists",
      heading:
        "Aged leads and X-date lists are the cheapest names you can buy and the most expensive hours",
      body: (
        <>
          <Idea>
            Nobody has spoken to anyone. You&apos;re buying raw material.
          </Idea>
          <p>
            Aged leads are web leads that didn&apos;t sell fresh, resold at
            $0.50 to $15 a name. X-date lists are the renewal dates for every
            business in a county. Most owners I talk to already pull one. One
            told me the vendor he&apos;d paid was &ldquo;just giving me X
            dates&rdquo;.
          </p>
          <p>
            Both are honest products if you know what you&apos;re buying. Cost
            per name is pennies. Cost per bound account is almost all wages,
            because somebody has to dial about 100 to find the 3 who&apos;ll
            talk, then the 1 who&apos;s in window.
          </p>
          <LeadsListOnShelf />
          <p>
            Same question. Who&apos;s going to work it? With a caller on payroll
            a list is the cheapest fuel there is. Without one it&apos;s the
            dearest thing on this page.
          </p>
          <p>
            We don&apos;t sell lists and we don&apos;t dial X-date files.
            They&apos;re here because most owners own one and most never work
            it.
          </p>
        </>
      ),
    },
    {
      id: "transfers-and-appointments",
      heading:
        "Live transfers and per-appointment vendors sell you a conversation, and owners remember what it was worth",
      body: (
        <>
          <Idea>
            This is the end of the market that looks most like us, so fair is
            fair.
          </Idea>
          <p>
            A live transfer is a call centre dialing a list, getting a business
            owner to say sure, put me through, and handing you the line. The
            per-appointment version puts a slot on your calendar and charges per
            slot. Phonexa prices a commercial live transfer at $30 to $120.
          </p>
          <p>
            It fixes the dialing. It doesn&apos;t fix who decided this was a
            prospect. The caller works to a script and a count, and the fastest
            way to the count is a quote request from anyone who&apos;ll take
            one.
          </p>
          <p>
            Randy Schwantz said it in Insurance Journal in 2018. Hourly callers,
            yeses from people who &ldquo;would entertain a quote from
            anyone&rdquo;, and even at a 50% close a sale cost about $1,000.
          </p>
          <Quote
            text="They would charge us $50 for a confirmed appointment... the appointment basically wasn't legit... the prospect's contact just wanted to get them off the phone."
            who="Executive VP, six-producer commercial P&C agency, Arizona"
          />
          <Quote
            text="accepting appointments left and right just to see if they could save 300."
            who="VP of business development, commercial P&C agency, New York, on the owners the cold callers put on his calendar"
          />
          <p>
            Neither is calling it a scam, the unit was wrong. They paid for a
            conversation and needed one with a business above their floor, in
            its renewal window, with the person who signs. Put that in writing
            first, or the count gets met with whoever picked up.
          </p>
        </>
      ),
    },
    {
      id: "referrals",
      heading:
        "Referrals close better than anything you can buy, and you cannot order more of them",
      body: (
        <>
          <Idea>
            Referrals win this table on close rate and it isn&apos;t close.
          </Idea>
          <p>
            The same New York VP takes attorneys, accountants and realtors to
            lunch and puts his hit rate on referred accounts at about 75%. The
            buyer arrives already trusting you.
          </p>
          <p>
            The problem is supply. You still can&apos;t decide in January to
            have 15 of them in March. So every agency that grows past the
            owner&apos;s network adds a second channel. Keep referrals as the
            top row, then pick the paid source by what it does to your
            producers&apos; calendars.
          </p>
        </>
      ),
    },
    {
      id: "where-maxionlabs-fits",
      heading:
        "Where Maxionlabs fits, and the one reader of this page it is right for",
      body: (
        <>
          <Idea>
            We&apos;re the last row, and only right for the owner whose
            producers aren&apos;t prospecting.
          </Idea>
          <p>
            We map every business in your territory that fits your appetite and
            sits above your floor, usually $25,000 in premium or 20 enrolled
            lives. We reach the owners by email, confirm fit and timing with the
            ones who reply, and the sales meeting goes on your producer&apos;s
            calendar with a brief. Your producers run the meeting and close.
          </p>
          <p>
            Qualified is written into your agreement first. Above your floor,
            inside your appetite, a need inside 3 months, the decider in the
            room.
          </p>
          <p>
            $4,725 a month, month to month, cancel any month, no share of your
            commission. 15 qualified sales meetings a month, held live, 12 in
            month one while we ramp. A no-show doesn&apos;t count toward the 15,
            we replace it.
          </p>
          <p>
            $315 back for every meeting we miss, and a 7-day full refund for any
            reason. Your counties locked. Full terms on the{" "}
            <a href="/pricing" className={A}>
              pricing page
            </a>
            .
          </p>
          <p>
            Look at 3 months, not 1. 12 + 15 + 15 is 42 qualified sales
            meetings. Close 1 in 5, so about 8 bound accounts, at about $3,000
            each about $25,000 of gross commission a year, before producer pay
            and servicing, and it renews.
          </p>
          <p>
            You paid $14,175 month to month, or $12,500 prepaid, for those 3
            months. Illustration, not a quote.
          </p>
          <MeetingsFunnel />
          <p>
            If your producers are already full, that&apos;s a hire, not us. If
            you&apos;re a producer looking for leads to work yourself, the
            shared and exclusive rows are your answer.
          </p>
          <p>
            Not sure which reader you are? Run the who-works-it test on last
            month&apos;s leads,{" "}
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
      a: "For a producer with the hours to call them within minutes, some are, judged on cost per bound account and the size of account bound. For an owner whose producers are not prospecting, mostly not, because a lead is a name that still needs a call.",
    },
    {
      q: "How much do commercial insurance leads cost?",
      a: "Phonexa’s 2026 list puts a shared workers comp web lead at $12 to $30 and a commercial live transfer at $30 to $120. ActiveProspect lists shared at $10 to $45, exclusive at $45 to $120 and aged at $0.50 to $15. Nobody publishes cost per bound commercial account.",
    },
    {
      q: "What is the difference between shared and exclusive insurance leads?",
      a: "A shared lead goes to up to 3 agents at once in EverQuote’s case, so you are racing to the phone. An exclusive lead is sold to you alone by that vendor, at 2 to 4 times the price. Exclusive is a promise about the vendor, not the buyer.",
    },
    {
      q: "How do I get commercial insurance leads for my agency?",
      a: "Six routes, shared web leads, exclusive leads, aged or X-date lists, live transfers, referrals, and qualified sales meetings. Pick by who is going to make the call. A producer with hours buys names. An owner whose producers have stopped prospecting needs the conversation set up.",
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
        "Maxionlabs, published price and terms: $4,725 a month, or $12,500 for 90 days prepaid, 15 qualified sales meetings held live, $315 back per miss, 7-day full refund",
      url: SRC.price,
    },
  ],
};
