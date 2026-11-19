import type { CaseStudy } from './types'

/**
 * Registry row "EU tender procurement software", anonymized (business type only); the CEO's written testimonial is
 * NAMED and cleared by Max 2026-10-06. The line is the one the homepage and the pre-call proof email carry (the vault
 * text), not retyped from memory. 19 qualified meetings held in one month and 74+ engaged leads are Max-confirmed
 * historical claims (2026-10-09); the exact month and the dedup of the 74+ are not specified, so this page names
 * neither and derives no rate. Sends are the platform dashboard, 1 June to 27 September 2026. The dashboard's Interested
 * tile (94) counts per-step events and is never quoted as leads (see `forbidden`). Historical row, engagement ended
 * 2026-10-05 by the client, so no refresh applies.
 * Story: knowledge_base/clients/_churned/tendify/account.md § Company, attribution.md § The billable unit, POSTMORTEM.md.
 */
export const CASE: CaseStudy = {
  slug: 'eu-tender-software',
  client: { label: 'an EU tender procurement software company', naming: 'anonymized' },
  industry: 'Tender procurement software, EU and UK',
  trackerRow: 'EU tender procurement software',
  title: 'EU tender software: 19 qualified meetings held in a month',
  description:
    'How an outsourced outbound agency held 19 qualified meetings in one month for an EU tender procurement software company by emailing recent tender winners.',
  h1: '19 qualified meetings held in one month for an EU tender procurement software company',
  answer:
    '19 qualified meetings held in one month for an EU tender procurement software company, with 74 or more engaged leads over the engagement, from 65,622 emails to 33,569 people between June and September 2026. The buyers were companies that had recently won a public tender. The CEO ran every meeting himself. A meeting only counted once it was held, and that is what the client paid for.',
  glance: [
    { label: 'Client', value: 'An EU tender procurement software company, business type only' },
    { label: 'Industry', value: 'Tender procurement software, EU and UK' },
    { label: 'Who we reached', value: 'Companies that had recently won a public tender in the EU or the UK' },
    { label: 'What we sent', value: 'Cold email leading with three open tenders matched to what they had already won' },
    { label: 'The unit we counted', value: 'A qualified meeting held with the CEO, invoiced only after it happened' },
    { label: 'Engagement', value: 'May to October 2026, meetings held July to September 2026, ended by the client' },
    { label: 'Deal structure', value: 'A fee per qualified meeting held, after a first signup-based deal was restructured' },
    { label: 'Who counted', value: 'The held meetings as invoiced to the client, confirmed by Max on 9 October 2026' },
  ],
  takeaways: [
    '19 qualified meetings held in one month, each one invoiced only after it happened.',
    '74 or more engaged leads over the engagement, from 65,622 emails to 33,569 people between June and September 2026.',
    'The list came from public tender award notices, so every name on it was a proven bidder.',
  ],
  timeframe: 'May to October 2026, meetings held July to September 2026',
  situation: [
    'The client sells a tender matching platform to companies that bid on public contracts across the EU and UK. About 149 euros a month, self-serve, with the CEO personally walking every new account through the product.',
    'They had signups from organic traffic that rarely turned into paid accounts. What the CEO wanted was conversations with the right buyers, companies already winning tenders, so he could show them the platform live and learn what made them buy.',
    "The first version of the deal paid us on signups that activated. It produced signups and almost no paying customers, and we earned nothing. We restructured it to a fee per qualified meeting held, so both sides were paid on the same thing.",
  ],
  whatWeDid: [
    "We built the list from public tender award notices. A company that had just won a public contract bids on more of them, so every name on the list was a proven bidder, with the award title telling us exactly what they sell.",
    'The email led with that. Three open tenders matched to what they had already won, named, with deadlines, and an offer to walk them through more on a call with the CEO. The matches were the proof that the platform understood their business before anyone asked for their time.',
    'Replies were answered inside the hour where we could, with a slot in the first message. Once a lead had a time on the calendar we handed them to the CEO with a summary and stepped back. He ran the walkthrough, and a held meeting was the unit we invoiced.',
  ],
  results: [
    {
      value: '19',
      label: 'qualified meetings held in one month',
      how: 'A company from the list that set a time through our link, showed up and took the walkthrough with the CEO, and was invoiced as held.',
      caveat:
        'Registry row "EU tender procurement software", RECORDED, Max-confirmed 2026-10-09 after inspecting his published post. Held = billable qualified meeting per the client terms. The exact calendar month is not specified; never name it or derive a rate. Anonymized, business type only.',
    },
    {
      value: '74+',
      label: 'engaged leads',
      how: 'Positive and engaged replies over the engagement, as the client and we recorded them. Not deduplicated, so never a rate.',
      caveat:
        'Same row, Max-confirmed historical claim 2026-10-09. Deduplication not specified, so never "unique" and never a rate. Never the dashboard Interested tile (94), which counts per-step events.',
    },
    {
      value: '65,622',
      label: 'emails to 33,569 people',
      how: 'The sending platform\'s dashboard, 1 June to 27 September 2026, a different window from the one-month held count.',
      caveat: 'Same row. Platform dashboard, 1 June to 27 September 2026, a separate window from the one-month held count. Do not divide one by the other.',
    },
  ],
  resultsNote:
    'Meetings are not customers. The client was paid per meeting held and ran the sale himself, and we do not have the number that became paying accounts.',
  testimonial: {
    quote: 'Max knows his stuff, from technical setup, to right strategies to apply and as well how to craft content. I would and will work with him on future projects.',
    name: 'Ivan Ivankovic',
    role: 'CEO, EU tender procurement software',
    source: 'written',
    said: 'Written testimonial, 5 October 2026',
  },
  insuranceTakeaway:
    "The list here came from a public record of who just did the thing. For an agency the public records are richer than most owners think. Permits, new entity filings, benefit plan filings, licence renewals. An owner who just pulled a building permit or filed a benefits plan for the first time is in a buying window, and an email that names that fact gets read.",
  faq: [
    {
      q: 'What made a meeting qualified?',
      a: 'A company from the target list that we emailed, that booked through our link, showed up and took the walkthrough with the CEO. All four had to be true before it counted or was invoiced.',
    },
    {
      q: 'Why is the company not named?',
      a: 'The engagement is anonymized by business type. The CEO put his name to the written testimonial above, and we quote it exactly as he wrote it.',
    },
    {
      q: 'Did the meetings turn into customers?',
      a: "We don't know the number, and we won't guess it. We were paid per meeting held. The client ran the sales call and the trial, and the engagement ended when they wound the product down.",
    },
  ],
  sources: [
    { label: 'Tenders Electronic Daily, the EU public procurement notices the list was built from', url: 'https://ted.europa.eu' },
    { label: 'Maxionlabs pricing and terms for commercial insurance agencies', url: 'https://www.maxionlabs.com/pricing' },
  ],
  forbidden: ['\\b94\\b', 'unique leads', '\\b85 trial', 'trial signups', 'Tendify'],
  published: '2026-11-19',
  updated: '2026-11-19',
  verified: '2026-10-09',
}
