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
    "$73,800 in client revenue and 25 paid coaching closes for BlueSteps, April to November 2026, at 8.6x what they paid us. A warm list worked by email, closed by their coaches.",
  glance: [
    { label: "Client", value: "BlueSteps, named with permission" },
    { label: 'Industry', value: 'Executive career services' },
    { label: "Who we reached", value: "Members and guide downloads from the client's paid ads" },
    { label: "What we sent", value: "Email offering a complimentary consultation with a coach" },
    { label: "The unit we counted", value: "A paid coaching package traced from a reply to the invoice" },
    { label: 'Engagement', value: 'April to November 2026' },
    { label: "Deal structure", value: "Commission only, no retainer, no setup fee" },
    { label: "Who counted", value: "Us, from the client's payment records, 19 November 2026" },
  ],
  takeaways: [
    "$73,800 in client revenue from 25 paid closes, April to November 2026.",
    "8.6x return on the $8,560 commission that was our whole fee.",
    "A warm list, members and guide downloads, worked by email.",
  ],
  timeframe: 'April to November 2026',
  situation: [
    "BlueSteps sells coaching and board packages to executive members, from about $600 to $5,000.",
    "Thousands of members and guide downloads, and nobody turning them into calls with the coaches.",
  ],
  whatWeDid: [
    "Email to people already in their world. Members got a complimentary consultation, guide downloads got an offer around the move they had shown interest in.",
    "A yes got the price frame and a link to book a coach. We traced every close from our email to their invoice.",
  ],
  results: [
    {
      value: '$73,800',
      label: 'in client revenue driven',
      how: "Receipts the client collected on packages traced to a reply to our email.",
      caveat:
        'Registry row "Executive career services", MEASURED from bluesteps_payments via bluesteps_case_study_metrics.py, re-pulled 2026-11-19 (row text still reads $73,300 from the 2026-11-11 pull). Gross client receipts attributed to the outbound program. Never "from cold email".',
    },
    {
      value: '25',
      label: 'paid closes',
      how: "Paid closes in the client's payment records, member-funnel closes included.",
      caveat:
        'Same row and pull, 2026-11-19 (row text reads 24 from 2026-11-11). Paid closes in bluesteps_payments including the member-funnel closes reported by the client. Not unique-customer count.',
    },
    {
      value: '8.6x',
      label: 'return on what they paid us',
      how: "$73,800 collected divided by our $8,560 commission, the only fee.",
      caveat:
        'Same row. Revenue divided by commission earned ($73,800 / $8,560, 2026-11-19 pull). Commission is the only fee on this deal.',
    },
    {
      value: '92,838',
      label: 'emails sent, 3 June to 19 November 2026',
      how: "Our sending platform, 3 June to 19 November 2026, to 84,765 people. April and May ran elsewhere and are not counted.",
      caveat:
        'MEASURED 2026-11-19, bison workspaces-v1.1 stats --start-date 2026-06-03 --end-date 2026-11-19 on the Bluesteps workspace (emails_sent 92838, total_leads_contacted 84765). Cross-checked against bluesteps_emailbison_stats latest-per-campaign sum 92,807 the same day. Not yet on the registry row.',
    },
  ],
  sampleEmail: {
    // Campaign 280 (Members ECS Cross-sell Test200, 21 Aug 2026), step 1, as sent on 25 August 2026. The member
    // campaign behind the first-deal receipt above (held 1 September, sold 3 September 2026). Sender persona was a
    // merge field. 8 payments / $24,000 from this campaign, MEASURED bluesteps_payments 2026-11-12 (registry row).
    // The parent network and the profile platform named in the email are shown as {Partner A} and {Platform A}.
    subject: 'making your membership count',
    body: `Hi {{first_name}},

It's {{sender_first_name}}, from BlueSteps Career Services. You joined BlueSteps in seriousness about your next C-suite or board role, which is why I'm reaching out.

You already have access to the {Partner A} network, listings most people never see, and countless helpful resources. The same for all BlueSteps members, which begs the question, how do you know what YOU should focus on now?

Members who utilize our personalized help (like a resume and {Platform A} profile built for how recruiters search now, a board bio, or a clear plan for reaching the right recruiters) land roles up to 30% faster compared to members who try to do it all themselves. On a timeline that can stretch up to a year, that's almost a 4 month difference.

To see whether we can help you, we offer a complimentary assessment with an expert, that just takes 30 mins. He reviews your unique situation and tells you if there is a strong option for you.

Would you be interested in grabbing a slot some time between now and next month?

{{sender_first_name}}
BlueSteps Career Services

PS. Can't guarantee a role, but this personalized 1:1 paid add-on help from our Fortune-500 coaches tends to make the search a lot easier.`,
    why: 'The member campaign from 25 August 2026. It went to people already paying for membership, so it could name what they had and offer the assessment as the next step. The first paid close from it is the WhatsApp receipt above, nine days after launch.',
    source: 'Postgres replies, client bluesteps, campaign_id 280, tier positive_hot, replied 2026-08-25, outbound_subject and outbound_body_rendered as sent; sender persona restored as a merge field.',
  },
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
  evidence: [
    {
      // Registry row "Executive career services: sold-status dashboard", QUOTABLE as historical portal evidence only.
      src: '/images/proof/bluesteps-sold-rows.jpg',
      alt: 'Masked rows from the client\'s customer portal with the status column reading Sold',
      caption: "Client portal, mid 2026, identities masked. Statuses as recorded, not a customer count.",
    },
  ],
  insuranceTakeaway:
    "Most agencies have the same asset sitting still, an X-date list, past quotes, a CRM of owners who said call me at renewal. Nobody emails them. That was the job here.",
  faq: [
    {
      q: "Were these people strangers to the client?",
      a: "No. Members and guide downloads from the client's ads. A warm list worked by email.",
    },
    {
      q: "How was the 8.6x return calculated?",
      a: "$73,800 collected divided by the $8,560 commission, the client's whole cost of the channel.",
    },
    {
      q: "Who closed the sales?",
      a: "The client's coaches. We got the yes and the calendar slot.",
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
