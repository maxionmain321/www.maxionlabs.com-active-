import type { CaseStudy } from './types'

/**
 * Registry row "Executive career services", named/public (BlueSteps, Anisa Ahmed cleared 2026-08-28).
 * Figures re-pulled 2026-11-19 from the named source, `bluesteps_case_study_metrics.py` (reads `bluesteps_payments`):
 * 25 paid closes, $73,800 client revenue, $8,560 commission earned, 73,800 / 8,560 = 8.6x. The registry row still reads
 * the 2026-11-11 pull (24 / $73,300 / 8.6x); the row needs its in-place update to this pull.
 * Source of the leads (Max, 2026-11-12): outbound email to people already in the client's ecosystem, paid-ad lead-magnet
 * signups and members. NOT fully cold, so this page never says "cold email" (see `forbidden`).
 * Story: knowledge_base/clients/bluesteps/account.md § Company and § The deal; attribution.md § Payment ledger.
 */
export const CASE: CaseStudy = {
  slug: 'executive-career-services',
  client: { label: 'BlueSteps', naming: 'named', name: 'BlueSteps' },
  industry: 'Executive career services',
  trackerRow: 'Executive career services',
  title: 'BlueSteps: $73,800 in client revenue from outbound email',
  description:
    'How an outsourced outbound agency drove 25 paid coaching closes and $73,800 in revenue for BlueSteps, an executive career services company, at 8.6x the fee.',
  h1: '$73,800 in client revenue and 25 paid closes for an executive career services company',
  answer:
    '$73,800 in client revenue and 25 paid coaching closes for BlueSteps, an executive career services company, between April and November 2026, at 8.6x what they paid us. The leads were people already in their world, members and people who had downloaded a guide from their ads. We emailed them, got the yes, and put them on a call with a coach. The coaches sold. We earned a commission on each close and nothing else.',
  timeframe: 'April to November 2026',
  situation: [
    'BlueSteps is an executive career management platform. Senior executives join as members, and the company sells coaching and board candidacy packages on top, from about $600 for a resume review up to $5,000 for the board package.',
    "They had the audience. Thousands of members and thousands more who had signed up for a free guide from paid ads. What they didn't have was anyone turning that list into calls with the coaches. The coaches close well once someone is on the phone with them, so the gap was the phone call, not the sales skill.",
    'The deal was commission only. No retainer, no setup fee. We got paid a percentage of each package sold, so if the calls did not turn into closes we earned nothing.',
  ],
  whatWeDid: [
    "We wrote and sent outbound email to the people already in their ecosystem. Members got one offer, a complimentary consultation with a coach. People who had downloaded a guide got another, framed around the board or career move they'd shown interest in.",
    'Every reply was read and answered. A yes got the price frame and a link to register and book with a coach. A question about price got a straight answer. A not-now went into a nurture sequence that kept the door open without nagging.',
    "Once the consultation was on the calendar, the coach ran the call and the sale. We tracked each person from our email to the client's portal, so every close on the invoice traces back to a reply we got, with the dates in order.",
  ],
  results: [
    {
      value: '$73,800',
      label: 'in client revenue driven',
      caveat:
        'Registry row "Executive career services", MEASURED from bluesteps_payments via bluesteps_case_study_metrics.py, re-pulled 2026-11-19 (row text still reads $73,300 from the 2026-11-11 pull). Gross client receipts attributed to the outbound program. Never "from cold email".',
    },
    {
      value: '25',
      label: 'paid closes',
      caveat:
        'Same row and pull, 2026-11-19 (row text reads 24 from 2026-11-11). Paid closes in bluesteps_payments including the member-funnel closes reported by the client. Not unique-customer count.',
    },
    {
      value: '8.6x',
      label: 'return on what they paid us',
      caveat:
        'Same row. Revenue divided by commission earned ($73,800 / $8,560, 2026-11-19 pull). Commission is the only fee on this deal.',
    },
  ],
  resultsNote:
    'The leads were people already in the client\'s ecosystem, members and lead-magnet signups from their paid ads. This was not outreach to strangers, and the return is revenue the client collected divided by the commission they paid us.',
  testimonial: {
    quote: "It's a guaranteed return with you always.",
    name: 'Anisa Ahmed',
    role: 'Growth and Revenue Strategy, BlueSteps',
    source: 'video',
    said: 'Recorded interview, 28 August 2026',
    url: 'https://www.youtube.com/watch?v=-4Dox4xc49o',
    screenshot: {
      src: '/images/proof/bluesteps-first-deal.jpg',
      alt: 'WhatsApp, September 2026. The client: Our guy closed his first deal. Max: 9 days since we launched and 9 meetings held. The client: INCREDIBLE, 3k, your highest paying tier.',
    },
  },
  insuranceTakeaway:
    "An agency owner usually has this same shape of asset sitting still. An X-date list, a book of past quotes, a CRM full of owners who said call me at renewal. Nobody is emailing them and nobody is getting them on a call with a producer. That is the job we did here, and the coaches closed what we put in front of them the same way your producers would.",
  faq: [
    {
      q: 'Were these people strangers to the client?',
      a: "No. The people we emailed were already members or had downloaded a guide from the client's paid ads. We turned a warm list into calls with the coaches.",
    },
    {
      q: 'How was the 8.6x return calculated?',
      a: 'Revenue the client collected from the closes we drove, $73,800, divided by the commission they paid us, $8,560. The deal was commission only, so the commission is their whole cost of the channel.',
    },
    {
      q: 'Who closed the sales?',
      a: "The client's coaches, on the calls we set up. We got the yes by email and put the person on the calendar. The selling was theirs.",
    },
  ],
  sources: [
    { label: 'Anisa Ahmed, BlueSteps, recorded interview on YouTube, 28 August 2026', url: 'https://www.youtube.com/watch?v=-4Dox4xc49o' },
    { label: 'BlueSteps, the client', url: 'https://www.bluesteps.com' },
    { label: 'Maxionlabs pricing and terms for commercial insurance agencies', url: 'https://www.maxionlabs.com/pricing' },
  ],
  forbidden: ['cold email', 'cold-email', 'from cold', 'cold outreach', '\\$73,300', '\\b24 paid', '8\\.7x', '\\$46,700'],
  published: '2026-11-19',
  updated: '2026-11-19',
  verified: '2026-11-19',
}
