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
    '50+ local businesses signed up for review removal with an online reputation services company, from outbound email we ran from March 2026 onwards. Dentists, skin clinics, law firms, physios and accountants in Australia, New Zealand and the US. Each one had a recent one-star Google review, and the first email named the review, the service and the price. A yes in the inbox was a signed customer.',
  timeframe: 'March to October 2026',
  situation: [
    'The client removes unfair Google reviews for local businesses and charges per review taken down. There is no sales team and no time for sales calls. The business only works if a customer can say yes by email.',
    "The buyer is a practice owner who has just been hit with a one-star review from someone who was never a patient, or who left after a refund. They are angry about it this week and they will have forgotten by next month. Timing is everything, so the list had to be built from what happened recently, not from a static database.",
  ],
  whatWeDid: [
    "We built a pipeline that finds local businesses with a fresh one-star review, pulls the review itself, and finds the owner's email. Only businesses where the review had text we could quote went into the list, because that is what the owner recognises.",
    'The email named the review, said what we do, and put the price in the first message. No call, no demo, no deck. Reply yes and the appeal gets filed. That meant every reply was already qualified on price before anyone spent time on it.',
    "Replies were triaged the same day and a plain yes went straight to the client's team as a signed job. Niches that converted got more volume, niches that did not got cut, and the price in the copy stayed put because the data said taking it out did nothing.",
  ],
  results: [
    {
      value: '50+',
      label: 'local businesses signed on review removal',
      caveat:
        'Registry row "Online reputation services for local businesses", MEASURED (client sheet) plus RECORDED (platform go-aheads), 51 strict on 2026-09-27, 50+ re-confirmed as a floor 2026-10-20. Never 55 or 60. Never the removed or verified review counts, nor any removed-vs-not split (Max, 2026-10-14). Anonymized; founder as "Conor" only.',
    },
  ],
  resultsNote:
    'Signed means the business said yes and the client filed the appeal. We do not publish how many reviews came down or the revenue behind them.',
  testimonial: {
    quote: 'Closed 3 clients in a couple of days plus went back for more on one we closed last week. Great job max',
    name: 'Conor',
    role: 'Founder, online reputation services',
    source: 'written',
    said: 'Slack, 2 August 2026',
    url: 'https://www.youtube.com/watch?v=yMmsy7V3HoU',
    // The masked Slack receipt is on the homepage under a file name that carries the client's name, so it stays off this
    // anonymized page until it is re-hosted under a neutral path.
  },
  insuranceTakeaway:
    "This one is about timing. A business owner who just got hurt will reply to an email about that exact thing this week and not next month. For an agency the equivalent is the renewal window, the new location, the hire that pushed them over a headcount line. Build the list from what just happened and the reply rate takes care of itself.",
  faq: [
    {
      q: 'Who are the 50+ businesses?',
      a: 'Dental practices, skin and cosmetic clinics, law firms, physios and accountants in Australia, New Zealand and the US, each with a recent one-star Google review the owner wanted gone.',
    },
    {
      q: 'Were there sales calls?',
      a: 'No. The price was in the first email and a yes by reply was the sale. There is no sales team, so the whole model depends on closing in the inbox.',
    },
    {
      q: 'Why is the client only named as Conor?',
      a: 'He asked us to use his first name only, and we do. He says the result himself in the video linked below.',
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
