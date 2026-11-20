import type { CaseStudy } from './types'

/**
 * Registry row "Online reputation services for local businesses", anonymized; the founder is shown publicly as "Conor"
 * only, by his own request (testimonials/manifest.md). QUOTABLE as 50+ businesses signed (51 strict, 2026-09-27 count,
 * 50+ re-confirmed as a floor 2026-10-20). Never 55 or 60. Never the removed or verified counts, nor any removed-vs-not
 * split (Max, 2026-10-14), so this page says nothing about how many reviews came down (see `forbidden`).
 * The owning sheet was not re-read for this page; 50+ stands as the floor the row records.
 * Quote: manifest.md cleared, anonymised use, Slack 2026-08-02. Video: youtube yMmsy7V3HoU, public on the homepage.
 * Story: knowledge_base/clients/reviewfix/account.md § Company and § The deal; attribution.md § The funnel.
 */
export const CASE: CaseStudy = {
  slug: 'online-reputation-services',
  client: { label: 'an online reputation services company', naming: 'anonymized' },
  industry: 'Online reputation services for local businesses',
  trackerRow: 'Online reputation services for local businesses',
  title: 'Reputation services: 50+ local businesses signed by email',
  description:
    'How an outsourced outbound agency signed 50+ dentists, clinics and law firms for a Google review removal service, with the offer and price in the first email.',
  h1: '50+ local businesses signed for an online reputation services company',
  answer:
    "50+ local businesses signed for review removal with an online reputation services company since March 2026. The first email named their fresh one-star review and the price, and a yes by reply was the sale.",
  glance: [
    { label: "Client", value: "An online reputation services company, founder shown as Conor" },
    { label: 'Industry', value: 'Online reputation services for local businesses' },
    { label: "Who we reached", value: "Owners of dental practices, clinics, law firms, physios and accountants in Australia, New Zealand and the US, each with a fresh one-star review" },
    { label: "What we sent", value: "Cold email naming the review, the service and the price" },
    { label: "The unit we counted", value: "A business that said yes by reply and had its appeal filed" },
    { label: 'Engagement', value: 'March to October 2026' },
    { label: "Who counted", value: "The client's sheet of signed businesses plus platform go-aheads, deduplicated" },
  ],
  takeaways: [
    "50+ local businesses signed since March 2026, a floor from the client's own sheet.",
    "No sales calls. Price in the first email, a yes by reply was the sale.",
    "23,363 emails to 13,408 people, June to October 2026.",
  ],
  timeframe: 'March to October 2026',
  situation: [
    "The client removes unfair Google reviews and charges per review. No sales team, so a customer has to say yes by email.",
    "The buyer is a practice owner angry about a one-star review this week, and over it by next month.",
  ],
  whatWeDid: [
    "A pipeline that finds businesses with a fresh one-star review, pulls the review and finds the owner's email.",
    "The email named the review and the price. Reply yes and the appeal gets filed. Niches that converted got more volume.",
  ],
  results: [
    {
      value: '50+',
      label: 'local businesses signed on review removal',
      how: "Businesses on the client's sheet of signed jobs plus go-aheads in our sending platform, deduplicated. A floor.",
      caveat:
        'Registry row "Online reputation services for local businesses", MEASURED (client sheet) plus RECORDED (platform go-aheads), 51 strict on 2026-09-27, 50+ re-confirmed as a floor 2026-10-20. Never 55 or 60. Never the removed or verified review counts, nor any removed-vs-not split (Max, 2026-10-14). Anonymized; founder as "Conor" only.',
    },
    {
      value: '23,363',
      label: 'emails sent, June to October 2026',
      how: "Our current sending platform, 1 June to 31 October 2026, to 13,408 people. The earlier platform's totals were not kept.",
      caveat:
        'MEASURED 2026-11-19, bison workspaces-v1.1 stats --start-date 2026-06-01 --end-date 2026-10-31 on the ReviewFix workspace (emails_sent 23363, total_leads_contacted 13408; identical from 2026-06-22, the first send). The row forbids the string "22 " (the verified count), so the page never writes the 22 June start date. The Instantly era (March to June 2026) has one 1,430-send snapshot in campaign_snapshots and the backup was deleted, so it is not counted. Not yet on the registry row.',
    },
  ],
  resultsNote:
    "We do not publish how many reviews came down or the revenue behind them.",
  sampleEmail: {
    // Campaign 160 (LegalUS 1star), step 1, as sent from 9 July 2026. The first-email offer with the pay-on-success
    // condition in it. Reviewer name, review excerpt and city were per-row merge fields; the sender signed with the
    // founder's first name, shown as a placeholder because he is de-named on this site.
    subject: 'that 1-star google review',
    body: `Hey there,

Saw 1-star review {{reviewer_name}} left recently, is this accurate or people should ignore it?

"{{review_excerpt}}"

Asking because we remove unfair Google reviews for {{city}} businesses. You only pay if it's successfully taken down.

Should I check if this one qualifies? Will get back to you same day you reply

{{sender_first_name}}
[the client]`,
    why: 'Sent to US law firms from July 2026. Most of the replies were a plain yes, please check, because the owner recognised their own review and the pay-on-success condition was already in the first email.',
    source: 'Postgres replies, client reviewfix, campaign_id 160, tier positive_hot, step 1, outbound_subject and outbound_body_rendered as sent; merge fields restored from the campaign record.',
  },
  testimonial: {
    quote: 'Closed 3 clients in a couple of days plus went back for more on one we closed last week. Great job max',
    name: 'Conor',
    role: 'Founder, online reputation services',
    source: 'written',
    said: 'Slack, 2 August 2026',
    url: 'https://www.youtube.com/watch?v=yMmsy7V3HoU',
  },
  evidence: [
    {
      // Registry row "Online reputation services: original close message", QUOTABLE as a historical client-reported
      // close message, exact anonymized image only. Re-hosted from /images/proof/reviewfix-3-clients.jpg under a
      // neutral name (Max, 2026-11-19). The platform dashboard was NOT used: its sidebar shows the client's name.
      src: '/images/results/reputation-services-three-signed.jpg',
      alt: 'Masked Slack message, 2 August 2026, name and avatar boxed out. The founder: Mate it has been a huge start to the week. Closed 3 clients in a couple of days plus went back for more on one we closed last week. Circa 20 individual reviews so far this week. Great job max.',
      caption: "Shared Slack, 2 August 2026, name and avatar masked. One client-reported week, not the cumulative count.",
    },
  ],
  insuranceTakeaway:
    "Timing did the work. For an agency that is the renewal window, the new location, the hire that crossed a headcount line. Build the list from what just happened.",
  faq: [
    {
      q: "Who are the 50+ businesses?",
      a: "Dental practices, clinics, law firms, physios and accountants in Australia, New Zealand and the US, each with a fresh one-star review.",
    },
    {
      q: "Were there sales calls?",
      a: "No. Price in the first email, a yes by reply was the sale.",
    },
    {
      q: "Why is the client only named as Conor?",
      a: "He asked for first name only. He says the result himself in the video below.",
    },
  ],
  sources: [
    { label: 'Conor, founder, video testimonial on YouTube', url: 'https://www.youtube.com/watch?v=yMmsy7V3HoU' },
    { label: 'Maxionlabs pricing and terms for commercial insurance agencies', url: 'https://www.maxionlabs.com/pricing' },
  ],
  forbidden: ['\\bremoved\\b', 'verified', '\\b55\\b', '\\b60 businesses', '\\b20 businesses', '\\b22 ', '\\b31 reviews'],
  published: '2026-11-19',
  updated: '2026-11-19',
  verified: '2026-10-20',
}
