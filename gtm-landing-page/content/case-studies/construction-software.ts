import type { CaseStudy } from './types'

/**
 * Registry row "Construction software selling to contractors", anonymized only, client name confidential by contract.
 * Figures: 35 sales-qualified demos (Max chose to quote 35 on 2026-10-21, ledger rows 1-35; 32 is the billed floor),
 * 6 annual contracts (Closed Won, 2026-10-07 count), $7K to $20K a year each (Max's statement 2026-09-30). Verified
 * 2026-10-21; the owning ledger (`sql_ledger.py` from the client's Salesforce report) was not re-run for this page.
 * "Held" is quotable (a billed SQL is a held demo, Max 2026-10-12). The customer quote is the registry row
 * "Construction-software customer: list quality message", quotable as a historical customer assessment only.
 * Story: knowledge_base/clients/workyard/account.md § Company and product, § Operating targets (Max's X post of
 * 2026-10-12 on what drove the result); attribution.md § EVERY SQL, EVER for trades and dates.
 */
export const CASE: CaseStudy = {
  slug: 'construction-software',
  client: { label: 'a construction software company', naming: 'anonymized' },
  industry: 'Construction software sold to contractors',
  trackerRow: 'Construction software selling to contractors',
  title: 'Construction software: 35 qualified demos, 6 contracts',
  description:
    'How an outsourced outbound agency set 35 sales-qualified demos with contractors for a construction software company, and 6 annual contracts of $7K to $20K.',
  h1: '35 sales-qualified demos and 6 annual contracts for a construction software company',
  answer:
    "35 sales-qualified demos held and 6 annual contracts signed, at $7,000 to $20,000 a year each, for a construction software company selling to contractors, between March and October 2026. A demo only counted once the client's own sales team marked it qualified in their CRM. The client's name is confidential under our agreement.",
  timeframe: 'March to October 2026',
  situation: [
    'The client sells software to contractors with crews in the field. Job costing while the job is running, GPS time capture, the back-office sync. The buyer is the owner, the project manager or the bookkeeper at an electrical, HVAC, roofing, plumbing, concrete or landscaping contractor. The same businesses an agency writes general liability and workers comp for.',
    "They had a sales team who could run a demo and close. They did not have enough contractors asking for one. Their reps were good at dialing someone who had already replied and much less keen on cold calling, so the question was how to get more owners to raise a hand.",
  ],
  whatWeDid: [
    "We built the list from the ground up. Every contractor in the target trades, pulled from Google Maps, qualified, then enriched to the owner, the project manager and the bookkeeper. Three personas, three fundamentally different messages, because the owner cares about margin on the job and the bookkeeper cares about payroll on Friday.",
    'Volume went from about 2,000 emails a day to about 5,000, and we tested five or more new email variations every week. Every send went from domains we own, never from the client\'s brand, so their main domain stayed clean.',
    "A positive reply landed in a shared Slack channel and in the client's CRM within minutes. Their reps called it, set the demo, and marked it qualified or not. We only counted what they counted.",
  ],
  results: [
    {
      value: '35',
      label: 'sales-qualified demos held',
      caveat:
        'Registry row "Construction software selling to contractors", MEASURED, verified 2026-10-21 (sql_ledger.py rows 1-35, all SQL-stamped). Max chose to quote 35 although rows 31-33 dropped from the client report; 32 is the billed floor. A billed SQL is a held demo (Max 2026-10-12). Anonymized only.',
    },
    {
      value: '6',
      label: 'annual contracts signed',
      caveat: 'Same row. Closed Won, the 2026-10-07 count, not re-measured on 2026-10-12 or 2026-10-21.',
    },
    {
      value: '$7K to $20K',
      label: 'a year, each contract',
      caveat: 'Same row. RECORDED, Max\'s statement 2026-09-30, not measured against the contracts.',
    },
  ],
  resultsNote:
    'Six signed contracts from 35 held demos is their sales team closing, not ours. We put the demo on the calendar and they ran it.',
  testimonial: {
    quote: 'Our list curation is strong, so all high value customers',
    name: 'The client',
    role: 'Construction software company, name confidential',
    source: 'written',
    said: 'Shared Slack channel, August 2026',
    // The masked Slack receipt for this row lives on the homepage under a file name that carries the client's name, so it
    // stays off this anonymized page until it is re-hosted under a neutral path.
  },
  insuranceTakeaway:
    'The contractors on these demos are the owners a commercial P&C agency wants in the room. Same trades, same size band, same person signing. Reaching them by email and getting them to say yes to a conversation is the exact mechanic, and the hard part was never the pitch. It was the list, the persona split and the speed from reply to call.',
  faq: [
    {
      q: 'What counted as a sales-qualified demo?',
      a: "A demo the client's own sales team marked qualified in their CRM after holding it. We did not grade our own work. If their rep said it was not a fit, it did not count.",
    },
    {
      q: 'Why is the client not named?',
      a: 'Our agreement keeps their name confidential. The numbers come from their CRM report, reconciled against our sends and replies, and we can walk through the method on a call.',
    },
    {
      q: 'Did you close the contracts?',
      a: 'No. We set the demos. Their sales team ran them and signed the six contracts.',
    },
  ],
  sources: [
    { label: 'Maxionlabs pricing and terms for commercial insurance agencies', url: 'https://www.maxionlabs.com/pricing' },
    { label: 'What a qualified commercial insurance sales meeting is, on this site', url: 'https://www.maxionlabs.com/commercial-insurance-appointment-setting' },
  ],
  forbidden: ['\\b31 demos', '\\b23 sales-qualified', '\\b5 customers'],
  published: '2026-11-19',
  updated: '2026-11-19',
  verified: '2026-10-21',
}
