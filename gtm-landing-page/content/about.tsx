import type { SitePage } from '@/lib/site-pages'

/**
 * /about. Written in Max's first person so a buyer, Google or an AI engine can check a real person and a real
 * company stand behind the site (E-E-A-T, entity resolution). The lede is the answer paragraph: what Maxionlabs is,
 * who runs it, who it is for, what it costs, dated.
 *
 * Facts about Max: OPS brand/voice.md § Identity and 00_foundation (offer-v3.md CURRENT INSURANCE OFFER block,
 * retirement-log.md § DECIDED 2026-09-13 for the vertical date). No country or city in the body by Max's decision:
 * location lives only in the footer's registered-entity line (HomeFooter).
 *
 * Results: QUOTABLE rows only, OPS knowledge_base/maxionlabs-acquisition/proof/funnel-tracker.md, audited 2026-11-16:
 *   - "All clients, aggregate (Mar-Nov 2026)": 358 sales meetings, verb "set" (the row's unit is a meeting on the
 *     client's calendar; "booked" is banned by the owner-language guard)
 *   - "Construction software selling to contractors" (anonymized)
 *   - "EU tender procurement software" (anonymized, held count only, no rate derived)
 *   - "Horizontal AI product, early stage, vertical validation" (named: Mars Xiang, Slipstream Engineering, cleared
 *     2026-10-30); "set" for the row's "booked", "held" only where the row says held
 * Insurance rows are PENDING MAX and are not quoted. The $1.54M pipeline row is not quoted (needs its method line).
 *
 * Every number in the body is on the ALLOWED_NUMBERS list in test/about.test.tsx; adding one means adding its row.
 */

export const LINKEDIN_URL = 'https://www.linkedin.com/in/maxpidvalnyi'
export const EMAIL = 'maksym@maxionlabs.com'
export const SITE_URL = 'https://www.maxionlabs.com'

export const PAGE: SitePage = {
  path: '/about',
  title: 'About Max Pidvalnyi and Maxionlabs',
  description:
    'Who runs Maxionlabs, what we do for commercial P&C and benefits agencies, what it costs, what we refuse to do, and how to check us before you book a call.',
  kind: 'about',
  changeFrequency: 'monthly',
}

/** ISO for JSON-LD dateModified; the body shows the month only. */
export const UPDATED = '2026-11-16'
export const UPDATED_LABEL = 'November 2026'

export const EYEBROW = 'About'
export const H1 = "I'm Max Pidvalnyi. Maxionlabs is my company, and I'm the one you talk to."

/** The answer paragraph. What, who, for whom, what it costs, when it was last checked. */
export const LEDE =
  'Maxionlabs is an outsourced outbound agency that sets up qualified live sales meetings with business owners for independent commercial P&C and employee benefits agencies. Max Pidvalnyi founded it and runs it. It is for agency owners with a producer who can take 15 meetings a month. Investment is $4,725 a month, month to month, cancel any month, 12 qualified live sales meetings in month one and 15 a month after. Updated ' +
  UPDATED_LABEL +
  '.'

export type AboutSection = { id: string; heading: string; paragraphs: React.ReactNode[] }

/** Three cases, all from before insurance. Row labels are the funnel-tracker "Case" column. */
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
    result: '13 demos set in 24 days, 7 of them guaranteed. 5 held, 4 moved to a next step.',
    note: 'Named with permission.',
  },
]

export const SECTIONS: AboutSection[] = [
  {
    id: 'what-i-do',
    heading: 'What I do, and for whom',
    paragraphs: [
      <>
        I run an outsourced outbound agency. Since September 2026 every new client is an independent agency writing commercial
        P&amp;C or employee benefits. Before that it was software and services companies, which is where the cases
        below come from.
      </>,
      <>
        $1.54M in pipeline value directly attributed to us based on the sales meetings we set for our clients in
        2026 alone. That&apos;s meetings times each client&apos;s deal size, pipeline, not revenue.
      </>,
      <>
        What you buy is a qualified live sales meeting. An owner in your territory and carrier appetite, above the
        floor in your agreement, with a reason to talk now or inside 3 months, on a call with your producer. 12 in
        month one while we ramp, 15 a month after. $4,725 a month, month to month, cancel any month. Every one short is
        $315 off next month.
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
        358 sales meetings set for our clients since March 2026, in industries including contractors, healthcare
        practices, law and accounting firms, manufacturers and distributors, schools and nonprofits. Three cases in
        detail below, all from before insurance, so read them as proof the machine gets real decision makers into real
        meetings. Our insurance clients are live now and their numbers stay private until they clear them. Ask me on
        the call and I&apos;ll show you what I have.
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

const ORG_ID = `${SITE_URL}/#org`
const PERSON_ID = `${SITE_URL}/about#max`

/** What we are known for. Used by both nodes so an engine resolving either lands on the same topics. */
export const KNOWS_ABOUT = [
  'Outsourced outbound sales',
  'Qualified sales meetings for commercial insurance agencies',
  'Commercial P&C insurance agency new business',
  'Employee benefits agency new business',
  'Email deliverability',
]

/**
 * Organization plus Person plus AboutPage. The Organization @id matches app/layout.tsx (`/#org`) so the two nodes
 * merge into one entity. sameAs holds only URLs the site already links: Max's LinkedIn (HomeFooter, this page).
 * No Organization sameAs: the site links no company LinkedIn page or X account (checked 2026-11-16).
 */
export const JSON_LD = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': ORG_ID,
      name: 'Maxionlabs',
      url: SITE_URL,
      email: EMAIL,
      description:
        'Outsourced outbound agency. Qualified live sales meetings with business owners for independent commercial P&C and employee benefits agencies. $4,725 a month, month to month, 15 qualified meetings a month.',
      founder: { '@id': PERSON_ID, '@type': 'Person', name: 'Max Pidvalnyi' },
      knowsAbout: KNOWS_ABOUT,
    },
    {
      '@type': 'Person',
      '@id': PERSON_ID,
      name: 'Max Pidvalnyi',
      jobTitle: 'Founder',
      url: `${SITE_URL}/about`,
      email: EMAIL,
      worksFor: { '@id': ORG_ID, '@type': 'Organization', name: 'Maxionlabs' },
      sameAs: [LINKEDIN_URL],
      knowsAbout: KNOWS_ABOUT,
    },
    {
      '@type': 'AboutPage',
      '@id': `${SITE_URL}/about#page`,
      url: `${SITE_URL}/about`,
      name: PAGE.title,
      description: PAGE.description,
      inLanguage: 'en',
      dateModified: UPDATED,
      about: { '@id': ORG_ID },
      mainEntity: { '@id': PERSON_ID },
    },
  ],
}
