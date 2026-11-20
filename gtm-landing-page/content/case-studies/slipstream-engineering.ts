import type { CaseStudy } from './types'

/**
 * Registry row "Horizontal AI product, early stage, vertical validation", NAMED (Mars Xiang, Slipstream Engineering,
 * cleared by Max 2026-10-30). MEASURED 2026-10-30 across EmailBison, Postgres, LeadHero, Slack and Fireflies:
 * 13 demos set in 24 days (7 guaranteed), 5 held, 4 sales-qualified opportunities, 54 interested leads from 19,467
 * emails. "Set" is the word for the row's "booked" (the owner-language guard, as on /about). Free trials are not a value
 * signal: a held demo that moved to a next step is an SQO and the page never says "trial" (Max 2026-10-30).
 * Historical row, engagement ended 2026-10-29 by the client (business wound down), so no refresh applies.
 * Quote: proof/case-studies/slipstream_2026-10-30.md § In their words, verbatim, lower case as he wrote it.
 */
export const CASE: CaseStudy = {
  slug: 'slipstream-engineering',
  client: { label: 'Slipstream Engineering', naming: 'named', name: 'Slipstream Engineering' },
  industry: 'Early-stage AI software for small businesses',
  trackerRow: 'Horizontal AI product, early stage, vertical validation',
  title: 'Slipstream Engineering: 13 demos in 24 days, 4 qualified',
  description:
    'How an outsourced outbound agency set 13 demos in 24 days for Slipstream Engineering, an early-stage AI product, and found which vertical buys from real calls.',
  h1: '13 demos in 24 days and 4 sales-qualified opportunities for an early-stage AI product',
  answer:
    "13 demos set in 24 days for Slipstream Engineering against 7 guaranteed, 5 held, 4 sales-qualified, from 54 interested leads and 19,467 emails, 5 to 29 October 2026.",
  glance: [
    { label: "Client", value: "Slipstream Engineering, named with permission" },
    { label: 'Industry', value: 'Early-stage AI software for small businesses' },
    { label: 'Who we reached', value: 'Independent hotels, paid-media agencies, and PR and branding agencies' },
    { label: "What we sent", value: "Cold email, three verticals in parallel, each with a free first run" },
    { label: "The unit we counted", value: "A demo on the founder's calendar, then held, then a next step" },
    { label: "Engagement", value: "5 to 29 October 2026, ended when the company wound down" },
    { label: "Deal structure", value: "Monthly retainer, 7 qualified demos a month guaranteed, pro-rata refund if short" },
    { label: "Who counted", value: "Us, from the calendar, recordings and Slack, 30 October 2026" },
  ],
  takeaways: [
    "13 demos set in 24 days against 7 guaranteed, no refund owed.",
    "5 held, 4 moved to a next step as sales-qualified opportunities.",
    "54 interested leads from 19,467 emails across three verticals. Paid-media agencies produced the most.",
  ],
  timeframe: '5 to 29 October 2026',
  situation: [
    "Two founding engineers, an AI product broad enough to sell to almost anyone, under $300K in revenue.",
    "Ads bought self-serve signups and little learning. They wanted live calls with real buyers in a few verticals.",
  ],
  whatWeDid: [
    "Three verticals in parallel, hotels, paid-media agencies, PR agencies. Each cell led with one free first run of the product.",
    "Positive replies were worked to a time by email and phone, demos landed on the founder's calendar with a notetaker, and he reported each outcome in Slack.",
  ],
  results: [
    {
      value: '13',
      label: 'demos set in 24 days, 7 guaranteed',
      how: "Unique people with a demo on the client's calendar, 5 to 29 October 2026.",
      caveat:
        'Registry row "Horizontal AI product, early stage, vertical validation", MEASURED 2026-10-30. Booked = unique people with a demo on the client calendar 2026-10-05 to 10-29, one email-agreed slot counted as INFERRED. "Set" on the page for the row\'s "booked" (owner-language guard). Named, cleared 2026-10-30.',
    },
    {
      value: '5',
      label: 'demos held',
      how: "A call recording, or the founder's confirmation in Slack.",
      caveat: 'Same row. Held = Fireflies recording or client confirmation. 3 no-shows, 2 cancelled, 3 scheduled after the wind-down.',
    },
    {
      value: '4',
      label: 'sales-qualified opportunities',
      how: "A held demo where the buyer agreed a concrete next step.",
      caveat: 'Same row. A held demo that moved to a next step. Never "trials" (Max 2026-10-30, free trials are not a value signal).',
    },
    {
      value: '54',
      label: 'interested leads from 19,467 emails',
      how: "Replies classed interested, counted once each, beside the platform's October 2026 send count.",
      caveat: 'Same row. Interested = classifier-positive unique people; emails = platform campaign stats 2026-10-01 to 10-30. Not a rate to quote on its own.',
    },
  ],
  sampleEmail: {
    // Campaign 555 (HotelOwnersMgmt CompetitorRatesA, 5 Oct 2026), step 1, as sent on 8 October 2026 to an independent
    // hotel. The first cell, and the one that produced six of the thirteen demos. Hotel name was a merge field.
    subject: 'comp rates',
    body: `Hey {{first_name}}, can I put together what the 5 hotels closest to {{company}} are charging each night from now through New Year's?

On us, just reply with a yes, and tell me which hotel if you run more than one.

If it's useful we can have it refresh every 3 hours with a price suggestion every morning.

{{sender_first_name}}
Scope by Slipstream Engineering`,
    why: 'The hotel cell, from 5 October 2026. Six of the thirteen demos came from hotels. The ask was one word, the first run was free, and the reply that set the demo was a day and a time.',
    source: 'Postgres replies, client slipstream, campaign_id 555, tier positive_hot, replied 2026-10-09, outbound_subject and outbound_body_rendered as sent; hotel name restored as a merge field. No cleared receipt image exists for this client (wins/slipstream_* was never filed).',
  },
  resultsNote:
    "The company wound down on 29 October 2026 before the 4 opportunities reached a paid decision, so there is no revenue figure.",
  testimonial: {
    quote: "max is really easy to work with, he proactively thinks about your needs and campaign, he's responsive, he's competent",
    name: 'Mars Xiang',
    role: 'Co-founder, Slipstream Engineering',
    source: 'written',
    said: 'Slack, 30 October 2026, answering what it was like to work with us',
  },
  insuranceTakeaway:
    "What transfers is the free first run. For an agency that is a market check on their current premium, offered before anyone asks for a meeting.",
  faq: [
    {
      q: "Why only 5 of the 13 demos held?",
      a: "Three no-shows, two cancelled, three scheduled after the founders decided to wind down. Held is counted apart from set for this reason.",
    },
    {
      q: "What is a sales-qualified opportunity here?",
      a: "A held demo where the buyer agreed a concrete next step. Four of five did.",
    },
    {
      q: "Was the 7-demo guarantee met?",
      a: "Yes. 13 set against 7 guaranteed, no refund owed.",
    },
  ],
  sources: [
    { label: 'Maxionlabs pricing and terms for commercial insurance agencies', url: 'https://www.maxionlabs.com/pricing' },
    { label: 'What a qualified commercial insurance sales meeting is, on this site', url: 'https://www.maxionlabs.com/commercial-insurance-appointment-setting' },
  ],
  forbidden: ['\\btrials?\\b', 'pay per meeting', '\\b59 leads', '\\b55 interested'],
  published: '2026-11-19',
  updated: '2026-11-19',
  verified: '2026-10-30',
}
