import type { CaseStudy } from './types'

/**
 * Registry row "Cold-email infrastructure software", named/public (Inframail, Kidous Mahteme on camera, public on the
 * homepage). 70+ paying customers directly attributed (confirmed by Max 2026-10-01 over the attribution file's 60 from
 * the 2026-04-16 snapshot) and 858 engaged leads, RECORDED, 2026-09-22 live-page check. Former client (ended August
 * 2026), historical row, so no refresh applies. The engagement start date is recorded two different ways in our files
 * (October 2024 in the case-study asset, October 2025 on the earlier public page), so this page gives no start date.
 * Story: knowledge_base/clients/_churned/inframail/account.md § Company and § The deal; social-proof/case-study.md § Max's
 * Scope of Work (list building from followers of adjacent tools) and § Offer (self-serve signup, no meeting).
 */
export const CASE: CaseStudy = {
  slug: 'inframail',
  client: { label: 'Inframail', naming: 'named', name: 'Inframail' },
  industry: 'Email infrastructure software',
  trackerRow: 'Cold-email infrastructure software',
  title: 'Inframail: 70+ paying customers from outbound email',
  description:
    'How an outsourced outbound agency brought Inframail, an email infrastructure company, 70+ paying customers and 858 engaged leads, closed in the inbox.',
  h1: '70+ paying customers directly attributed for Inframail, a cold email infrastructure company',
  answer:
    '70+ paying customers directly attributed to our outbound email, and 858 engaged leads, for Inframail, a company that sells sending infrastructure to outbound teams. The product is self-serve, so the customer signed up from the email thread without a sales call. The engagement ran until August 2026 and the founder is on camera about it below.',
  timeframe: 'Engagement ended August 2026',
  situation: [
    'Inframail sells the plumbing for outbound email. Domains, inboxes, dedicated sending IPs, the authentication records, all set up and managed for teams that send at volume. The buyer is an agency owner or a founder who already runs outbound and is paying someone else per inbox.',
    'The founder wanted a channel that produced paying accounts, not a calendar of sales calls. The product is bought online with a card, so the job was to get the right person to the signup page already convinced, not to set a meeting.',
  ],
  whatWeDid: [
    'The list was the work. We built it from people visibly in the market, followers of the sending tools and sequencers Inframail plugs into, and followers of the competitors. Most of them already paid for inboxes somewhere.',
    "The offer was concrete and self-serve. Sign up for the monthly plan and get a block of domains free, worth a few hundred dollars bought separately. The email did the cost math for them, their current spend per inbox against a flat rate, and linked to the signup.",
    "Replies were answered from the inbox with the next step in the message, and a signup that followed a reply was attributed through the email thread. Attribution was reconciled against the client's own customer export, so a customer counted only when the signup matched a thread.",
  ],
  results: [
    {
      value: '70+',
      label: 'paying customers directly attributed',
      caveat:
        'Registry row "Cold-email infrastructure software", RECORDED, 2026-09-22 live-page check; 70+ confirmed by Max 2026-10-01 over the attribution file\'s 60 (2026-04-16 snapshot). Paid accounts attributed through email threads. Named/public, Kidous video live.',
    },
    {
      value: '858',
      label: 'engaged leads',
      caveat: 'Same row. Positive or engaged replies, RECORDED from the public page 2026-09-22. Not customers.',
    },
  ],
  resultsNote:
    'The product is bought online, so there were no sales meetings here. A customer is a paid account the founder traced back to one of our email threads.',
  testimonial: {
    quote: "Max just did things better than I did. He's very timely and very honest.",
    name: 'Kidous Mahteme',
    role: 'Co-founder, Inframail',
    source: 'video',
    said: 'Video testimonial on YouTube',
    url: 'https://www.youtube.com/watch?v=qslrNyCbT-k',
  },
  insuranceTakeaway:
    "An agency does not sell with a card on a website, so the mechanic that transfers is the cost math in the email. Inframail's buyer was already paying per inbox and the email showed them the number. A commercial account is already paying a premium, and an email that says what a market check on that premium is worth, in dollars, gets the reply that leads to the meeting.",
  faq: [
    {
      q: 'How were the 70+ customers attributed?',
      a: "Through the email threads. A paid account whose email, or a colleague at the same company, had replied to one of our campaigns before signing up, reconciled against the client's own customer export.",
    },
    {
      q: 'Were there sales calls?',
      a: 'No. Inframail is self-serve. The email made the case and linked to the signup, and the customer paid online.',
    },
    {
      q: 'Is this engagement still running?',
      a: 'No. It ended in August 2026 when the founder paused outbound to focus on ads and fulfilment. The video testimonial and the numbers are from the engagement.',
    },
  ],
  sources: [
    { label: 'Kidous Mahteme, co-founder of Inframail, video testimonial on YouTube', url: 'https://www.youtube.com/watch?v=qslrNyCbT-k' },
    { label: 'Inframail, the client', url: 'https://www.inframail.io' },
    { label: 'Maxionlabs pricing and terms for commercial insurance agencies', url: 'https://www.maxionlabs.com/pricing' },
  ],
  forbidden: ['\\b60 paying', '\\b80\\+', '909 ', '673K', '464,000', '\\b50 clients', '550K', '\\b100\\+ paid'],
  published: '2026-11-19',
  updated: '2026-11-19',
  verified: '2026-09-22',
}
