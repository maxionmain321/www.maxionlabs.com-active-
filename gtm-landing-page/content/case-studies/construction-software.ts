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
  industry: 'Software sold to contractors',
  trackerRow: 'Construction software selling to contractors',
  title: 'Construction software: 35 qualified demos, 6 contracts',
  description:
    'How an outsourced outbound agency set 35 sales-qualified demos with contractors for a construction software company, and 6 annual contracts of $7K to $20K.',
  h1: '35 sales-qualified demos and 6 annual contracts for a construction software company',
  answer:
    "35 sales-qualified demos held and 6 annual contracts signed, at $7,000 to $20,000 a year each, for a construction software company selling to contractors, between March and October 2026. A demo only counted once the client's own sales team marked it qualified in their CRM. The client's name is confidential under our agreement.",
  glance: [
    { label: 'Client', value: 'A construction software company, name confidential under our agreement' },
    { label: 'Industry', value: 'Software sold to contractors' },
    { label: 'Who we reached', value: 'Owners, project managers and bookkeepers at electrical, HVAC, roofing, plumbing, concrete and landscaping contractors' },
    { label: 'What we sent', value: 'Cold email from domains we own, about 2,000 to 5,000 a day, one message per persona' },
    { label: 'The unit we counted', value: 'A demo the client\'s sales team held and marked qualified in their CRM' },
    { label: 'Engagement', value: 'March to October 2026' },
    { label: 'Deal structure', value: 'Paid per sales-qualified demo the client\'s team confirmed' },
    { label: 'Who counted', value: 'The client\'s sales team in their CRM, reconciled against our sends and replies' },
  ],
  takeaways: [
    '35 sales-qualified demos held between March and October 2026, each one marked qualified by the client\'s own reps.',
    '6 annual contracts signed at $7,000 to $20,000 a year, closed by the client\'s sales team.',
    'Volume went from about 2,000 to about 5,000 emails a day, with five or more new variations tested every week.',
  ],
  timeframe: 'March to October 2026',
  situation: [
    'The client sells software to contractors with crews in the field. Job costing while the job is running, hours captured from the field, the back-office sync. The buyer is the owner, the project manager or the bookkeeper at an electrical, HVAC, roofing, plumbing, concrete or landscaping contractor. The same businesses an agency writes general liability and workers comp for.',
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
      how: 'A demo the client\'s sales team held and then marked qualified in their CRM. We counted only what they counted.',
      caveat:
        'Registry row "Construction software selling to contractors", MEASURED, verified 2026-10-21 (sql_ledger.py rows 1-35, all SQL-stamped). Max chose to quote 35 although rows 31-33 dropped from the client report; 32 is the billed floor. A billed SQL is a held demo (Max 2026-10-12). Anonymized only.',
    },
    {
      value: '6',
      label: 'annual contracts signed',
      how: 'Closed Won in the client\'s CRM, as counted on 7 October 2026.',
      caveat: 'Same row. Closed Won, the 2026-10-07 count, not re-measured on 2026-10-12 or 2026-10-21.',
    },
    {
      value: '$7K to $20K',
      label: 'a year, each contract',
      how: 'The contract range as the client stated it to us, not read from the contracts themselves.',
      caveat: 'Same row. RECORDED, Max\'s statement 2026-09-30, not measured against the contracts.',
    },
    {
      value: '221,081',
      label: 'emails sent, 1 June to 31 October 2026',
      how: 'Emails sent from our sending platform\'s workspace for this client between 1 June and 31 October 2026, to 217,351 people. The earlier platform sent another 26,312 between March and July 2026, counted separately.',
      caveat:
        'MEASURED 2026-11-19, bison workspaces-v1.1 stats --start-date 2026-06-01 --end-date 2026-10-31 on the Workyard workspace (emails_sent 221081, total_leads_contacted 217351). The 26,312 is the sum of the latest campaign_snapshots row per campaign, client_id workyard, platform instantly, snapshots 2026-03-30 to 2026-07-15. Not yet on the registry row; add it there on the next refresh.',
    },
  ],
  resultsNote:
    'Six signed contracts from 35 held demos is their sales team closing, not ours. We put the demo on the calendar and they ran it.',
  sampleEmail: {
    // Campaign 221 (AllTrades JobCost Batch8Clean, 13 Jul 2026), step 1, as sent on 17 July 2026 to a restoration
    // contractor. The same thread is the first receipt under the results: the owner asked for a demo that afternoon
    // and the client's sales team wrote "SQO. Meeting was held today." Trade and crew word were per-row merge fields.
    subject: 'the budget',
    body: `Hey {{first_name}}, do your techs know how they're tracking against the job budget while they're on it, or do they find out once it's already blown?

Generic tools aren't built for {{trade}}, and nearly all can't tag an hour to the right job and cost code on their own. We keep running into contractors your size who couldn't tell which jobs were bleeding until they were already closed.

We built an app for {{trade}} where the techs do nothing, GPS captures the hours automatically, and they come back already rolled up by job and cost code. So you know what each job is costing you while it's still running, not weeks after it's closed.

Want me to walk you through it on one of your jobs?

Best,
{{sender_first_name}}
[the client]

p.s. just GPS capture, no manual entry. not another app your techs have to remember to use`,
    why: 'Sent to a restoration contractor on 17 July 2026. The owner replied the same day asking for a demo that afternoon, and the client\'s sales team marked it held and qualified the next morning. That thread is the first receipt under the results.',
    source: 'Postgres replies, client workyard, campaign_id 221, tier positive_hot, replied 2026-07-17, outbound_subject and outbound_body_rendered as sent; merge fields restored from the campaign record.',
  },
  testimonial: {
    quote: 'Our list curation is strong, so all high value customers',
    name: 'The client',
    role: 'Construction software company, name confidential',
    source: 'written',
    said: 'Shared Slack channel, August 2026',
  },
  evidence: [
    {
      // Registry row "Construction-software campaign: reply and held-meeting receipt", QUOTABLE as a historical
      // original receipt. Re-hosted from /images/proof/workyard-sqo-held.jpg under a neutral name (Max, 2026-11-19).
      src: '/images/results/construction-software-demo-held.jpg',
      alt: 'Masked Slack thread, 17 and 18 July 2026, names and avatars boxed out. A contractor replies to the email above: You have got my attention. Are you available for a demo? I can be open as early as this afternoon. The client\'s sales team answers the next morning: SQO. Meeting was held today.',
      caption: 'Our shared Slack channel with the client, 17 and 18 July 2026, every name, avatar and the prospect\'s company masked. The reply to the email above, and the client\'s sales team confirming the demo was held and qualified. One client-reported held demo, not a sale.',
    },
    {
      // Already public on the homepage under this neutral name; copied to /images/results/ so every receipt on an
      // anonymized page lives in one place. No date in the image; the homepage records it as July 2026.
      src: '/images/results/construction-software-demo-synced-crm.jpg',
      alt: 'Masked Slack message, July 2026, names and avatars boxed out. The client\'s sales team: we are seeing the demo on the calendar and synced to salesforce. Max: awesome.',
      caption: 'The client\'s sales team in our shared Slack channel, July 2026, sender masked, confirming that a demo we set showed up on their calendar and synced into their CRM. A status note from the client, not a count.',
    },
    {
      // Registry row "Construction-software customer: list quality message", QUOTABLE as a historical customer
      // assessment. Re-hosted from /images/proof/workyard-cac-math.jpg under a neutral name (Max, 2026-11-19).
      src: '/images/results/construction-software-list-quality.jpg',
      alt: 'Masked Slack conversation, August 2026, names and avatars boxed out. The client works through rough numbers on demos per emails sent, then writes: I think when they come inbound they are high intent. Our list curation is strong, so all high value customers.',
      caption: 'The client in our shared Slack channel, August 2026, names and avatars masked. The line quoted above, in its original thread. The arithmetic in the image is the client\'s own rough approximation at the time, not a measured conversion rate.',
    },
  ],
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
