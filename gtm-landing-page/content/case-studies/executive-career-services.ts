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
  glance: [
    { label: 'Client', value: 'BlueSteps, named with their permission' },
    { label: 'Industry', value: 'Executive career services' },
    { label: 'Who we reached', value: 'The client\'s members and people who had downloaded a guide from their paid ads' },
    { label: 'What we sent', value: 'Outbound email offering a complimentary consultation with a coach' },
    { label: 'The unit we counted', value: 'A paid coaching package traced from a reply to our email to the client\'s invoice' },
    { label: 'Engagement', value: 'April to November 2026' },
    { label: 'Deal structure', value: 'Commission only on each close, no retainer and no setup fee' },
    { label: 'Who counted', value: 'Us, from the client\'s payment records, re-pulled 19 November 2026' },
  ],
  takeaways: [
    '$73,800 in client revenue from 25 paid coaching closes between April and November 2026.',
    '8.6x return, the revenue the client collected divided by the $8,560 commission that was our whole fee.',
    'The leads were already in the client\'s world, members and guide downloads from their ads, so this is a warm list worked by email, not strangers.',
  ],
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
      how: 'Gross receipts the client collected on packages traced back to a reply to our email, in their payment records.',
      caveat:
        'Registry row "Executive career services", MEASURED from bluesteps_payments via bluesteps_case_study_metrics.py, re-pulled 2026-11-19 (row text still reads $73,300 from the 2026-11-11 pull). Gross client receipts attributed to the outbound program. Never "from cold email".',
    },
    {
      value: '25',
      label: 'paid closes',
      how: 'Paid closes in the client\'s payment records, including the member-funnel closes the client reported to us.',
      caveat:
        'Same row and pull, 2026-11-19 (row text reads 24 from 2026-11-11). Paid closes in bluesteps_payments including the member-funnel closes reported by the client. Not unique-customer count.',
    },
    {
      value: '8.6x',
      label: 'return on what they paid us',
      how: '$73,800 collected divided by the $8,560 commission paid to us, the only fee on this deal.',
      caveat:
        'Same row. Revenue divided by commission earned ($73,800 / $8,560, 2026-11-19 pull). Commission is the only fee on this deal.',
    },
    {
      value: '92,838',
      label: 'emails sent, 3 June to 19 November 2026',
      how: 'Emails sent from our sending platform\'s workspace for this client between 3 June and 19 November 2026, to 84,765 people. April and May 2026 ran on an earlier platform and are not counted here.',
      caveat:
        'MEASURED 2026-11-19, bison workspaces-v1.1 stats --start-date 2026-06-03 --end-date 2026-11-19 on the Bluesteps workspace (emails_sent 92838, total_leads_contacted 84765). Cross-checked against bluesteps_emailbison_stats latest-per-campaign sum 92,807 the same day. Not yet on the registry row.',
    },
  ],
  resultsNote:
    'The leads were people already in the client\'s ecosystem, members and lead-magnet signups from their paid ads. This was not outreach to strangers, and the return is revenue the client collected divided by the commission they paid us.',
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
      caption: 'The client\'s customer portal, mid 2026, status column, buyer identities masked. A record of the statuses as recorded, not a customer count.',
    },
  ],
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
