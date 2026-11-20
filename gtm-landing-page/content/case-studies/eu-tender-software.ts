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
    "19 qualified meetings held in one month for an EU tender procurement software company, 74 or more engaged leads from 65,622 emails to 33,569 people, June to September 2026. A meeting counted once held.",
  glance: [
    { label: 'Client', value: 'An EU tender procurement software company, business type only' },
    { label: 'Industry', value: 'Tender procurement software, EU and UK' },
    { label: "Who we reached", value: "Companies that had just won a public tender in the EU or UK" },
    { label: "What we sent", value: "Cold email leading with three open tenders matched to past wins" },
    { label: "The unit we counted", value: "A qualified meeting held with the CEO, invoiced after it happened" },
    { label: 'Engagement', value: 'May to October 2026, meetings held July to September 2026, ended by the client' },
    { label: "Deal structure", value: "A fee per qualified meeting held, after a signup-based deal was restructured" },
    { label: "Who counted", value: "Held meetings as invoiced, confirmed by Max on 9 October 2026" },
  ],
  takeaways: [
    "19 qualified meetings held in one month, invoiced only after they happened.",
    "74 or more engaged leads from 65,622 emails to 33,569 people, June to September 2026.",
    "The list came from public tender award notices, every name a proven bidder.",
  ],
  timeframe: 'May to October 2026, meetings held July to September 2026',
  situation: [
    "A tender matching platform at about 149 euros a month, with the CEO walking every new account through it.",
    "Organic signups that rarely paid. The CEO wanted live conversations with companies already winning tenders.",
  ],
  whatWeDid: [
    "The list came from public tender award notices. The email led with three open tenders matched to what they had already won.",
    "Replies got a slot in the first message. Once a time was on the calendar we handed the lead to the CEO with a summary.",
  ],
  results: [
    {
      value: '19',
      label: 'qualified meetings held in one month',
      how: "Set a time through our link, showed up, took the walkthrough with the CEO, invoiced as held.",
      caveat:
        'Registry row "EU tender procurement software", RECORDED, Max-confirmed 2026-10-09 after inspecting his published post. Held = billable qualified meeting per the client terms. The exact calendar month is not specified; never name it or derive a rate. Anonymized, business type only.',
    },
    {
      value: '74+',
      label: 'engaged leads',
      how: "Positive and engaged replies as recorded. Not deduplicated, so never a rate.",
      caveat:
        'Same row, Max-confirmed historical claim 2026-10-09. Deduplication not specified, so never "unique" and never a rate. Never the dashboard Interested tile (94), which counts per-step events.',
    },
    {
      value: '65,622',
      label: 'emails to 33,569 people',
      how: "The sending platform's dashboard, 1 June to 27 September 2026, a different window from the held count.",
      caveat: 'Same row. Platform dashboard, 1 June to 27 September 2026, a separate window from the one-month held count. Do not divide one by the other.',
    },
  ],
  resultsNote:
    "Meetings are not customers. We do not have the number that became paying accounts.",
  sampleEmail: {
    // Campaign 226 (W2 Lapsed1Win WonWalkthrough, 14 Jul 2026), step 1, as sent on 17 July 2026. The "won before, not
    // since" angle with three matched open tenders as the hook. Company was a merge field; the sender persona signed
    // with the client's domain, shown in brackets because the page is anonymized.
    subject: "tenders you didn't see",
    body: `Hi,

You guys at {{company}} won a public tender a while back, and I don't see one since. Usually that's not capability. Watching the portals is a full-time job on its own, reading every doc, checking the criteria, so the ones you'd likely win close before you see them.

I lined up 3 live right now that fit what you publicly say you do.

Want to check them out? 10 mins, I'll show why each fits and which closes soonest. The 3 are yours to keep either way.

{{sender_first_name}}
[the client]`,
    why: 'Sent in July 2026 to companies whose last public tender win was a while back. The reply that worked was a one-liner, send them over, and the three tenders went out with the walkthrough proposed in the same thread.',
    source: 'Postgres replies, client tendify, campaign_id 226, tier positive_hot, replied 2026-07-17, outbound_subject and outbound_body_rendered as sent; company restored as a merge field.',
  },
  testimonial: {
    quote: 'Max knows his stuff, from technical setup, to right strategies to apply and as well how to craft content. I would and will work with him on future projects.',
    name: 'Ivan Ivankovic',
    role: 'CEO, EU tender procurement software',
    source: 'written',
    said: 'Written testimonial, 5 October 2026',
  },
  evidence: [
    {
      // The registry row's named dashboard, already public on the homepage as /images/client-tendify-27.09.2026.png.
      // Re-hosted under a neutral name (Max, 2026-11-19). The Interested tile in the image counts per-step events and
      // is never quoted, so neither the alt nor the caption carries it (see `forbidden`).
      src: '/images/results/tender-software-sending-dashboard.png',
      alt: 'Our sending platform\'s workspace dashboard for this client, 1 June to 27 September 2026, showing 65,622 emails sent to 33,569 people, with the daily send chart underneath.',
      caption: "Our sending platform's dashboard, 1 June to 27 September 2026. The interested tile counts per-step events, so it is not quoted. A send record, not a meeting count.",
    },
  ],
  insuranceTakeaway:
    "The list came from a public record of who just did the thing. For an agency that is permits, new entity filings, benefit plan filings, licence renewals.",
  faq: [
    {
      q: "What made a meeting qualified?",
      a: "From the list, set a time through our link, showed up, took the walkthrough with the CEO. All four, or it did not count.",
    },
    {
      q: "Why is the company not named?",
      a: "Anonymized by business type. The CEO put his name to the testimonial above.",
    },
    {
      q: "Did the meetings turn into customers?",
      a: "We do not know the number and will not guess it. We were paid per meeting held.",
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
