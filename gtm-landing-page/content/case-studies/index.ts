import type { SitePage } from '@/lib/site-pages'
import type { CaseStudy } from './types'
import { CASE as executiveCareerServices } from './executive-career-services'
import { CASE as constructionSoftware } from './construction-software'
import { CASE as onlineReputationServices } from './online-reputation-services'
import { CASE as euTenderSoftware } from './eu-tender-software'
import { CASE as slipstreamEngineering } from './slipstream-engineering'
import { CASE as inframail } from './inframail'

export type { CaseStudy, CaseResult, CaseTestimonial, CaseEvidence, CaseSampleEmail } from './types'

/**
 * Every published case, in the order the /results hub shows them: biggest, most recent proof first. Adding a case means
 * one new file in this folder and one line here; the route, the hub, the sitemap and the tests pick it up from this list.
 * README.md in this folder has the steps and the proof rules.
 */
export const CASE_STUDIES: CaseStudy[] = [
  executiveCareerServices,
  constructionSoftware,
  onlineReputationServices,
  euTenderSoftware,
  slipstreamEngineering,
  inframail,
]

export function findCase(slug: string): CaseStudy | undefined {
  return CASE_STUDIES.find((c) => c.slug === slug)
}

export const RESULTS_PATH = '/results'

/** The latest content change across the hub copy and every case, so the hub's dateModified and lastmod move with them. */
const HUB_COPY_UPDATED = '2026-11-19'
export const RESULTS_UPDATED = [HUB_COPY_UPDATED, ...CASE_STUDIES.map((c) => c.updated)].sort().at(-1)!

/**
 * The two aggregate rows on the hub, registry rows "All clients, aggregate (Mar-Nov 2026)" and "All clients, pipeline
 * value (2026)", both verified 2026-11-16, wording approved by Max 2026-11-16 (MAX-740). The meetings row counts a
 * meeting on the client's calendar; "set" is the page's word for the row's "booked" (owner-language guard, as on
 * /about). The pipeline figure always travels with its method line and is never called revenue.
 */
export const AGGREGATE = {
  meetings: {
    value: '358',
    label: 'sales meetings set for our clients since March 2026',
    detail:
      'In industries including contractors, healthcare practices, law and accounting firms, manufacturers and distributors, schools and nonprofits. A meeting counts when it is on the client\'s calendar.',
    verified: '2026-11-16',
  },
  pipeline: {
    value: '$1.54M',
    label: 'in pipeline value directly attributed to us in 2026',
    detail:
      "Based on the sales meetings we set for our clients in 2026 alone. That's meetings times each client's deal size, pipeline, not revenue.",
    verified: '2026-11-16',
  },
}

export const RESULTS_HUB: SitePage = {
  path: RESULTS_PATH,
  title: 'Results: sales meetings and revenue we drove for clients',
  description:
    'Case studies from an outsourced outbound agency. 358 sales meetings set since March 2026, $1.54M in attributed pipeline, six cases with the counts behind them.',
  kind: 'results',
  changeFrequency: 'monthly',
  updated: RESULTS_UPDATED,
}

/** One registry row per case page, for the sitemap. Title and description are the page's own. */
export function caseStudyPages(): SitePage[] {
  return CASE_STUDIES.map((c) => ({
    path: `${RESULTS_PATH}/${c.slug}`,
    title: c.title,
    description: c.description,
    kind: 'results',
    changeFrequency: 'monthly',
    updated: c.updated,
  }))
}
