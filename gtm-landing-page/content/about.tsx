import type { SitePage } from '@/lib/site-pages'

/**
 * /about. Written in Max's first person so a buyer, Google or an AI engine can check a real person and a real
 * company stand behind the site (E-E-A-T, entity resolution).
 *
 * Facts about Max: OPS brand/voice.md § Identity and 00_foundation (offer-v3.md CURRENT INSURANCE OFFER block,
 * retirement-log.md § DECIDED 2026-09-13 for the vertical date). No country or city in the body by Max's decision:
 * location lives only in the footer's registered-entity line (HomeFooter).
 *
 * Results: QUOTABLE rows only, OPS knowledge_base/maxionlabs-acquisition/proof/funnel-tracker.md, read 2026-11-16:
 *   - "Construction software selling to contractors" (anonymized)
 *   - "EU tender procurement software" (anonymized, held count only, no rate derived)
 *   - "Horizontal AI product, early stage, vertical validation" (named: Mars Xiang, Slipstream Engineering, cleared 2026-10-30)
 * Insurance rows are PENDING MAX and are not quoted.
 *
 * Voice pass 2026-11-16: prose re-said in Max's register (brand/voice-core.md). Facts, results rows, links and
 * JSON-LD unchanged.
 */

export const LINKEDIN_URL = 'https://www.linkedin.com/in/maxpidvalnyi'
export const EMAIL = 'maksym@maxionlabs.com'
export const SITE_URL = 'https://www.maxionlabs.com'

export const PAGE: SitePage = {
  path: '/about',
  title: 'About Max Pidvalnyi and Maxionlabs',
  description:
    'Who runs Maxionlabs, what we do for commercial P&C and benefits agencies, what we refuse to do, and how to check us before you book a call.',
  kind: 'about',
  changeFrequency: 'monthly',
}

export const UPDATED = '2026-11-16'

export const EYEBROW = 'About'
export const H1 = "I'm Max Pidvalnyi. Maxionlabs is my company, and I'm the one you talk to."
export const LEDE =
  'Check who is behind this site before you book anything. My LinkedIn and email are below, the registered company is in the footer.'

export type AboutSection = { id: string; heading: string; paragraphs: React.ReactNode[] }

/** Three results, all from before insurance. Row labels are the funnel-tracker "Case" column. */
export const RESULTS: { case: string; result: string; note: string }[] = [
  {
    case: 'Construction software selling to contractors',
    result: '35 sales-qualified demos, 6 annual contracts signed at $7K to $20K a year each.',
    note: 'Client name confidential.',
  },
  {
    case: 'EU tender procurement software',
    result: '19 qualified meetings held in one month.',
    note: 'Client name confidential.',
  },
  {
    case: 'Slipstream Engineering, an early-stage AI product (Mars Xiang)',
    result: '13 demos booked in 24 days, 7 of them guaranteed. 5 held, 4 moved to a next step.',
    note: 'Named with permission.',
  },
]

export const SECTIONS: AboutSection[] = [
  {
    id: 'what-i-do',
    heading: 'What I do, and for whom',
    paragraphs: [
      <>
        I run a cold email agency. Since September 2026 everything new I take on points at one buyer, independent agencies writing
        commercial P&amp;C or employee benefits. Before that it was software and services companies, which is where the
        results below come from.
      </>,
      <>
        What you buy from me is a qualified sales meeting. An owner in your territory and carrier appetite, above the
        floor in your agreement, with a reason to talk now or inside 3 months, live with your producer. 12 in month one
        while we ramp, 15 a month after, $4,725 a month, month to month. Every one short is $315 off next month, and the
        first 7 days are a full refund.
      </>,
    ],
  },
  {
    id: 'how-it-works',
    heading: 'How it works',
    paragraphs: [
      <>
        We map every business in your counties that fits your appetite, write the emails, and send them from domains we
        own, never one with your agency&apos;s name in it. You approve the copy. When an owner replies yes they get a
        call from us first, we check the floor and the appetite, then it goes on your producer&apos;s calendar with a
        short brief, who they are, what they said, when the renewal is.
      </>,
      <>
        A no-show gets replaced. Your counties are locked to you, so an owner on your calendar is never offered to
        another agency.
      </>,
    ],
  },
  {
    id: 'what-we-refuse',
    heading: 'What I refuse to do',
    paragraphs: [
      <>
        I don&apos;t resell leads. Everyone on your calendar replied to an email about your agency and said yes to you.
      </>,
      <>
        I don&apos;t run telemarketing. First contact is email, and the only call is the one after the owner has
        replied.
      </>,
      <>
        I don&apos;t put small accounts on your calendar. Under the floor in your agreement it doesn&apos;t count towards
        the 15 and it doesn&apos;t go on, even when the owner is keen. I could hit the number with accounts that
        aren&apos;t worth your service time, but that&apos;s your producer&apos;s afternoon gone, so the floor is hard.
      </>,
      <>
        If I don&apos;t think your territory can carry 15 a month at your floor, I&apos;ll say so on the call. Either a
        smaller count of bigger accounts, or we don&apos;t sign.
      </>,
    ],
  },
  {
    id: 'results',
    heading: 'Results I can show',
    paragraphs: [
      <>
        Three, all from before insurance, so read them as proof the machine gets real decision makers into real
        meetings. Our insurance clients are live now and I&apos;m not publishing their numbers until they clear them,
        ask me on the call and I&apos;ll show you what I have.
      </>,
    ],
  },
  {
    id: 'how-to-reach-us',
    heading: 'How to reach us',
    paragraphs: [
      <>
        Email me at <a href={`mailto:${EMAIL}`} className="text-accent hover:underline underline-offset-4">{EMAIL}</a>,
        or check me first on{' '}
        <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline underline-offset-4">
          LinkedIn
        </a>
        . The fastest route is a 20 minute call, book it on the homepage. The registered company and address are in the
        footer of every page, and payments go through Stripe.
      </>,
    ],
  },
]

/** Organization plus Person. No Organization sameAs: the live site links no LinkedIn company page (checked 2026-11-16). */
export const JSON_LD = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
      name: 'Maxionlabs',
      url: SITE_URL,
      email: EMAIL,
      description: 'Qualified sales meetings for independent commercial P&C and employee benefits agencies.',
      founder: { '@id': `${SITE_URL}/about#max`, '@type': 'Person', name: 'Max Pidvalnyi' },
    },
    {
      '@type': 'Person',
      '@id': `${SITE_URL}/about#max`,
      name: 'Max Pidvalnyi',
      jobTitle: 'Founder',
      url: `${SITE_URL}/about`,
      email: EMAIL,
      worksFor: { '@id': `${SITE_URL}/#organization`, '@type': 'Organization', name: 'Maxionlabs' },
      sameAs: [LINKEDIN_URL],
    },
  ],
}
