import type { SitePage } from '@/lib/site-pages'
import { ComparisonTable, type AnswerPageProps } from '@/components/answer/AnswerPage'
import { WhatEachPutsInWriting } from '@/components/drawings'

/**
 * Comparison page for "best appointment setting company for commercial insurance agencies" (MAX-738, Max approved
 * 2026-11-21). Why it exists: on 2026-11-21 ChatGPT answered this buyer question from vendor-written best-of lists
 * (OPS _system/data/ai-visibility/runs.csv) and cited Maxionlabs 0 times in 20 questions.
 *
 * Who is on it: the providers the 2026-11-21 runs named (Abstrakt, CFE Marketing, getinsureleads, EverQuote) plus
 * LeadSureX, the commercial-only vendor whose domain those runs cited 4 times. Callbox, SalesRoads and Belkins were not
 * named in any 2026-11-21 run. callingagency.com was cited but blocks curl behind a Cloudflare challenge, so it is left
 * off rather than filled from memory.
 *
 * Rules of the page:
 *  - Every competitor cell was read on 2026-11-21 from the page in SOURCES (curl, this session). A fact not on their
 *    public pages is "Not published", never a guess.
 *  - Maxionlabs cells come from OPS 00_foundation/offer-v3.md only, and the meeting definition is the live /pricing#qualified.
 *  - No ranking. A "where another one fits better" table. A disclosure that Maxionlabs wrote the page.
 *  - Least text possible: the comparison table and one drawing carry the page.
 *  - Competitor links are nofollow.
 */

export const PUBLISHED = '2026-11-21'
export const UPDATED = '2026-11-21'
const READ = '2026-11-21'

export const PAGE: SitePage = {
  path: '/best-appointment-setting-companies-commercial-insurance',
  title: 'Best appointment setting companies for commercial insurance agencies (2026)',
  description:
    'Six appointment setting providers for insurance agencies compared on price, meeting definition, no-show policy, guarantee and contract, each checked on their own site.',
  kind: 'answer',
  changeFrequency: 'monthly',
  updated: UPDATED,
  targetQuery: 'best appointment setting company for commercial insurance agencies',
}

/* ------------------------------------------------------------- sources, read 2026-11-21 */

const SRC = {
  mxPricing: 'https://www.maxionlabs.com/pricing',
  abPricing: 'https://www.abstraktmg.com/outbound-bdr/',
  abInsurance: 'https://www.abstraktmg.com/industries/commercial-insurance-lead-generation/',
  cfeHome: 'https://cfemarketingservices.com/',
  cfeInsurance: 'https://cfemarketingservices.com/leads/commercial-insurance',
  cfePricing: 'https://cfemarketingservices.com/outsourced-sdr-pricing',
  lsxHome: 'https://www.leadsurex.com/',
  lsxAgencies: 'https://www.leadsurex.com/for-agencies',
  lsxAgents: 'https://www.leadsurex.com/for-agents',
  lsxTerms: 'https://www.leadsurex.com/terms',
  gilAppointments: 'https://www.getinsureleads.com/insurance-appointment-setting',
  gilFaq: 'https://www.getinsureleads.com/faqs',
  gilPricing: 'https://www.getinsureleads.com/pricing',
  gilReplacement: 'https://www.getinsureleads.com/lead-replacement-policy',
  eqAgents: 'https://go.everquote.com/pro',
}

/* ------------------------------------------------------------- the comparison, one row per provider */

/** yes = published in full, partly = published with a gap the cell names, no = not published or not offered. */
export type Check = 'yes' | 'partly' | 'no'

export type Provider = {
  name: string
  /** What they sell, in a few words, under the name. */
  what: string
  focus: string
  price: string
  definition: React.ReactNode
  noShow: string
  guarantee: string
  contract: string
  /** Drawn in WhatEachPutsInWriting: commercial focus, price, meeting definition, no-show policy. */
  checks: [Check, Check, Check, Check]
}

export const PROVIDERS: Provider[] = [
  {
    name: 'Maxionlabs',
    what: 'Outsourced outbound agency, email',
    focus: 'Yes. Commercial P&C and benefits agencies only',
    price: '$4,725 a month for 15 qualified appointments, 12 in month one',
    definition: (
      <>
        Yes, four checks in writing on <a href="/pricing#qualified" className="text-accent hover:underline underline-offset-4">our pricing page</a>
      </>
    ),
    noShow: 'Yes. A no-show does not count and is replaced',
    guarantee: '$315 credit per missed appointment, unused credit paid back in cash when you cancel',
    contract: 'Month to month',
    checks: ['yes', 'yes', 'yes', 'yes'],
  },
  {
    name: 'Abstrakt Marketing Group',
    what: 'Phone BDR team, plus website and content',
    focus: 'Partly. One commercial insurance page among trades and B2B industries',
    price: 'From $5,000 a month (Outbound BDR), $6,500 bundled with inbound and content',
    definition: 'Yes, on its commercial insurance page',
    noShow: 'Not published',
    guarantee: 'Appointment number agreed in writing. Missed by year end, they work free until they hit it',
    contract: 'Not published for Outbound BDR. A one-year agreement is named for the inbound add-on',
    checks: ['partly', 'yes', 'yes', 'no'],
  },
  {
    name: 'CFE Marketing',
    what: 'Phone and email SDR team',
    focus: 'Partly. A commercial insurance page, priority audiences are tech, manufacturing, SaaS and solar',
    price: 'Not published, custom per project',
    definition: 'Yes. BANT, plus premium size, lines, renewal timing and decision authority',
    noShow: 'Yes. No-shows rebooked at no extra cost',
    guarantee: 'None published',
    contract: 'One month pilot, then month to month, 30 days notice',
    checks: ['partly', 'no', 'yes', 'yes'],
  },
  {
    name: 'LeadSureX',
    what: 'Phone setting team, or single appointments',
    focus: 'Yes. Commercial lines only',
    price: 'Not published, priced per appointment on premium, headcount and complexity',
    definition: 'Yes. Decision maker or influencer confirmed, renewal window verified',
    noShow: 'Yes. Under 7 of the first 10 show, 5 more free',
    guarantee: 'The show-rate offer above. Its terms page guarantees no appointment count',
    contract: 'Not published, set in a written engagement',
    checks: ['yes', 'no', 'yes', 'yes'],
  },
  {
    name: 'InsureLeads (getinsureleads.com)',
    what: 'Leads, live transfers, preset appointments',
    focus: 'No. Final expense, Medicare, health, life, auto, home and annuity, plus commercial truck',
    price: 'Setter seat from $2,500 a month. Preset appointments $150 to $575 by line',
    definition: 'Partly. "Kept" means the prospect attends or completes a phone consultation',
    noShow: 'Yes. Confirmed presets get one free rebooking, kept presets billed only when held',
    guarantee: 'Invalid leads replaced. No appointment count on a setter seat',
    contract: 'Month to month',
    checks: ['no', 'yes', 'partly', 'yes'],
  },
  {
    name: 'EverQuote',
    what: 'Consumer shopper leads and calls',
    focus: 'No. Consumer insurance shoppers, each lead to up to three agents',
    price: 'Not published',
    definition: 'No. Sells leads and calls, not meetings',
    noShow: 'Not published',
    guarantee: 'None published',
    contract: 'Not published',
    checks: ['no', 'no', 'no', 'no'],
  },
]

export const COLUMNS = [
  'Commercial insurance focus',
  'Published price',
  'Written meeting definition',
  'No-show policy',
  'Guarantee',
  'Contract',
]

const COMPARISON_ROWS = PROVIDERS.map((p) => ({
  label: p.name,
  cells: [
    <>
      {p.focus}
      <span className="block mt-1 text-xs">{p.what}</span>
    </>,
    p.price,
    p.definition,
    p.noShow,
    p.guarantee,
    p.contract,
  ],
}))

/* ------------------------------------------------------------- who fits better */

const FIT_ROWS = [
  { label: 'You want a phone team in your name, plus website and SEO, from one vendor', cells: ['Abstrakt Marketing Group'] },
  { label: 'You have several producers and want phone volume, month to month', cells: ['CFE Marketing'] },
  { label: 'You want to buy commercial appointments one at a time', cells: ['LeadSureX'] },
  { label: 'You write final expense, Medicare, health or life', cells: ['InsureLeads'] },
  { label: 'You write personal lines and want shopper leads in your ZIP codes', cells: ['EverQuote'] },
  {
    label: 'You write commercial P&C or benefits and want a fixed monthly count with cash back on a miss',
    cells: ['Maxionlabs'],
  },
]

/* ------------------------------------------------------------- content */

export const ANSWER_LINE =
  'If you write commercial lines and want qualified appointments with a public price and a written meeting definition, pick Maxionlabs, if you want a phone team plus inbound marketing from one vendor, Abstrakt, if you want phone volume month to month with no-shows rebooked, CFE Marketing, and if you write personal lines, life or health, InsureLeads or EverQuote.'

export const CONTENT: AnswerPageProps = {
  eyebrow: 'Appointment setting for commercial insurance agencies, compared by Maxionlabs',
  h1: 'Best appointment setting companies for commercial insurance agencies (2026)',
  lede: `${ANSWER_LINE} As of November 2026, Maxionlabs charges 4,725 USD a month, month to month, for 15 qualified appointments.`,
  published: PUBLISHED,
  updated: UPDATED,
  path: PAGE.path,
  toc: false,
  sections: [
    {
      id: 'compare',
      heading: 'Six providers, six things you can check',
      body: (
        <ComparisonTable
          wide
          caption={`Each competitor cell from their own website, read ${READ}. "Not published" means we could not find it on their public pages, so ask them.`}
          columns={COLUMNS}
          rows={COMPARISON_ROWS}
        />
      ),
    },
    {
      id: 'in-writing',
      heading: 'What each one puts in writing',
      body: <WhatEachPutsInWriting providers={PROVIDERS.map((p) => ({ name: p.name, checks: p.checks }))} />,
    },
    {
      id: 'fit',
      heading: 'Where another provider fits better',
      body: (
        <>
          <ComparisonTable caption="Pick by buyer, not a ranking." columns={['Look at']} rows={FIT_ROWS} />
          <p>
            New to this? Start with{' '}
            <a href="/commercial-insurance-appointment-setting" className="text-accent hover:underline underline-offset-4">
              how commercial insurance appointment setting works
            </a>{' '}
            and{' '}
            <a href="/commercial-insurance-leads" className="text-accent hover:underline underline-offset-4">
              why bought commercial leads disappoint
            </a>
            .
          </p>
        </>
      ),
    },
    {
      id: 'how-we-scored',
      heading: 'How we scored this',
      body: (
        <>
          <p data-testid="disclosure">
            Maxionlabs wrote this page and is one of the six. Every competitor cell comes from that competitor&apos;s own
            site, read {READ}, linked below. Ours comes from{' '}
            <a href="/pricing" className="text-accent hover:underline underline-offset-4">
              the Maxionlabs pricing page
            </a>
            . No scores, no ranking. The longer read on one rival is{' '}
            <a href="/abstrakt-alternative" className="text-accent hover:underline underline-offset-4">
              Maxionlabs and Abstrakt compared
            </a>
            .
          </p>
          <p className="text-xs">Something changed on your site? Corrections to maksym@maxionlabs.com.</p>
        </>
      ),
    },
  ],
  faq: [
    {
      q: 'How much does insurance appointment setting cost?',
      a: 'Three of the six publish a price as of 2026-11-21. Maxionlabs is $4,725 a month for 15 qualified appointments. Abstrakt starts at $5,000 a month. InsureLeads sells preset appointments at $150 to $575 and setter seats from $2,500 a month. CFE Marketing, LeadSureX and EverQuote quote on a call.',
    },
    {
      q: 'What counts as a qualified appointment?',
      a: 'At Maxionlabs, four things in writing. Your counties and carriers, above your floor of $25,000 in premium or 20 lives, a need inside 3 months, and the owner in the room. Abstrakt, CFE Marketing and LeadSureX publish similar tests. Get yours in writing before you sign.',
    },
    {
      q: 'What happens if an appointment is a no-show?',
      a: 'At Maxionlabs a no-show does not count and is replaced, and every appointment short of 15 is $315 back. CFE Marketing rebooks no-shows. LeadSureX adds 5 free if fewer than 7 of your first 10 show. Abstrakt and EverQuote do not publish a no-show policy.',
    },
    {
      q: 'Do I have to sign a long contract?',
      a: 'Maxionlabs, InsureLeads and CFE Marketing run month to month, CFE after a one month pilot with 30 days notice. Abstrakt, LeadSureX and EverQuote do not publish their term, so ask before you sign.',
    },
  ],
  sources: [
    { label: `Maxionlabs pricing: price, the four checks, no-show and credit terms (read ${READ})`, url: SRC.mxPricing },
    { label: `Abstrakt Marketing Group, Outbound BDR pricing (read ${READ})`, url: SRC.abPricing, nofollow: true },
    { label: `Abstrakt Marketing Group, commercial insurance page and qualified definition (read ${READ})`, url: SRC.abInsurance, nofollow: true },
    { label: `CFE Marketing Services, homepage: no-shows rebooked, month to month (read ${READ})`, url: SRC.cfeHome, nofollow: true },
    { label: `CFE Marketing Services, commercial insurance page (read ${READ})`, url: SRC.cfeInsurance, nofollow: true },
    { label: `CFE Marketing Services, pricing: custom per project, 30 days notice (read ${READ})`, url: SRC.cfePricing, nofollow: true },
    { label: `LeadSureX, homepage: commercial lines only (read ${READ})`, url: SRC.lsxHome, nofollow: true },
    { label: `LeadSureX, for agencies: 70% show-rate guarantee (read ${READ})`, url: SRC.lsxAgencies, nofollow: true },
    { label: `LeadSureX, for agents: per-appointment pricing and qualification (read ${READ})`, url: SRC.lsxAgents, nofollow: true },
    { label: `LeadSureX, terms: no guarantee of appointment counts (read ${READ})`, url: SRC.lsxTerms, nofollow: true },
    { label: `InsureLeads, insurance appointment setting: seat and preset prices, no-show terms (read ${READ})`, url: SRC.gilAppointments, nofollow: true },
    { label: `InsureLeads, pricing: preset appointments by line, confirmed and kept defined (read ${READ})`, url: SRC.gilPricing, nofollow: true },
    { label: `InsureLeads, FAQs: verticals, minimums, month to month (read ${READ})`, url: SRC.gilFaq, nofollow: true },
    { label: `InsureLeads, lead replacement policy (read ${READ})`, url: SRC.gilReplacement, nofollow: true },
    { label: `EverQuote for Agents: lead sources, up to three agents per lead (read ${READ})`, url: SRC.eqAgents, nofollow: true },
  ],
}
