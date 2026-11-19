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
    '13 demos set in 24 days for Slipstream Engineering, an early-stage AI product for small businesses, against 7 guaranteed. 5 were held, 4 of those moved to a next step as sales-qualified opportunities, from 54 interested leads and 19,467 emails between 5 and 29 October 2026. The founders did not know which market would buy. We tested three verticals at once so they could find out from calls instead of ad spend.',
  glance: [
    { label: 'Client', value: 'Slipstream Engineering, named with the founders\' permission' },
    { label: 'Industry', value: 'Early-stage AI software for small businesses' },
    { label: 'Who we reached', value: 'Independent hotels, paid-media agencies, and PR and branding agencies' },
    { label: 'What we sent', value: 'Cold email, three verticals in parallel, each leading with a free first run of the product' },
    { label: 'The unit we counted', value: 'A demo on the founder\'s calendar, then whether it was held, then whether it moved to a next step' },
    { label: 'Engagement', value: '5 to 29 October 2026, ended by the client when the company wound down' },
    { label: 'Deal structure', value: 'Monthly retainer, 7 qualified demos a month guaranteed, pro-rata refund for every one short' },
    { label: 'Who counted', value: 'Us, across the calendar, the call recordings and the shared Slack channel, re-checked 30 October 2026' },
  ],
  takeaways: [
    '13 demos set in 24 days against 7 guaranteed, so no refund was owed.',
    '5 demos held and 4 of them moved to a next step as sales-qualified opportunities.',
    '54 interested leads from 19,467 emails across three test verticals, and the paid-media agency cell produced the most.',
  ],
  timeframe: '5 to 29 October 2026',
  situation: [
    'Two founding engineers with an AI product that could sit in Slack, Teams or email and do recurring work for a small business. A few customers, under $300K in revenue, and a product broad enough to sell to almost anyone, which is the problem.',
    "They had run Google Ads and had just moved to Meta. The spend bought self-serve signups and very little learning. What they wanted was live discovery calls with real buyers in a few candidate verticals, so they could hear the objections and pick a market.",
    'The deal was a monthly retainer with 7 qualified demos a month guaranteed, and a pro-rata refund for every one short.',
  ],
  whatWeDid: [
    'Instead of guessing a vertical we tested three in parallel. Independent hotels, paid-media agencies, and PR and branding agencies. Each cell sold one concrete recurring output the product could produce, with the first run free as proof.',
    'For hotels, a free pull of competitor room rates for their comp set. For paid-media agencies, a free list of brands that had just started advertising, which is a new-client list for them. For PR agencies, a free list of companies with a fresh PR job post or a recent funding round, with the decision maker\'s email.',
    "Positive replies were worked to a booking by email and by phone, demos landed on the founder's calendar with a notetaker, and he reported each outcome in a shared Slack channel. By the end the paid-media agency cell had produced the most interested replies, so the founders had their answer from real calls.",
  ],
  results: [
    {
      value: '13',
      label: 'demos set in 24 days, 7 guaranteed',
      how: 'Unique people with a demo on the client\'s calendar between 5 and 29 October 2026.',
      caveat:
        'Registry row "Horizontal AI product, early stage, vertical validation", MEASURED 2026-10-30. Booked = unique people with a demo on the client calendar 2026-10-05 to 10-29, one email-agreed slot counted as INFERRED. "Set" on the page for the row\'s "booked" (owner-language guard). Named, cleared 2026-10-30.',
    },
    {
      value: '5',
      label: 'demos held',
      how: 'A demo with a call recording, or the founder\'s confirmation in Slack that it happened.',
      caveat: 'Same row. Held = Fireflies recording or client confirmation. 3 no-shows, 2 cancelled, 3 scheduled after the wind-down.',
    },
    {
      value: '4',
      label: 'sales-qualified opportunities',
      how: 'A held demo where the buyer agreed a concrete next step with the founder.',
      caveat: 'Same row. A held demo that moved to a next step. Never "trials" (Max 2026-10-30, free trials are not a value signal).',
    },
    {
      value: '54',
      label: 'interested leads from 19,467 emails',
      how: 'People whose reply was classed interested, counted once each, next to the sending platform\'s count for October 2026.',
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
    'The engagement ended on 29 October 2026 when the founders wound the company down to move into research. The 4 opportunities had not reached a paid decision by then, so there is no revenue figure and we do not estimate one.',
  testimonial: {
    quote: "max is really easy to work with, he proactively thinks about your needs and campaign, he's responsive, he's competent",
    name: 'Mars Xiang',
    role: 'Co-founder, Slipstream Engineering',
    source: 'written',
    said: 'Slack, 30 October 2026, answering what it was like to work with us',
  },
  insuranceTakeaway:
    "An agency owner rarely has the vertical question, you know who you write. What transfers is the free first run. Every cell here led with something the buyer could use whether or not they bought, and the reply rate followed. For an agency that is a market check on their current premium, or a coverage gap you can see from the outside, offered before anyone asks for a meeting.",
  faq: [
    {
      q: 'Why only 5 of the 13 demos held?',
      a: 'Three people did not show, two cancelled, and three were scheduled for dates after the founders had already decided to wind the company down. We count held separately from set for exactly this reason.',
    },
    {
      q: 'What is a sales-qualified opportunity here?',
      a: 'A held demo where the buyer agreed to a concrete next step with the founder. Four of the five held demos did. We do not count signups as a result.',
    },
    {
      q: 'Was the 7-demo guarantee met?',
      a: 'Yes, 13 set in the first sending month against 7 guaranteed, so no refund was owed.',
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
