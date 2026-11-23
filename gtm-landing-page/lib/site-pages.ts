import { marketPages } from './markets'
import { PAGE as appointmentSetting } from '@/content/answers/commercial-insurance-appointment-setting'
import { PAGE as hireProducer } from '@/content/answers/hire-producer-or-book-meetings'
import { PAGE as leads } from '@/content/answers/commercial-insurance-leads'
import { PAGE as about } from '@/content/about'
import { PAGE as reviews } from '@/content/reviews'
import { PAGE as abstrakt } from '@/content/answers/abstrakt-alternative'
import { PAGE as stoppedGrowing } from '@/content/answers/why-insurance-agency-stopped-growing'
import { PAGE as valuation } from '@/content/answers/insurance-agency-valuation'
import { PAGE as bestCompanies } from '@/content/answers/best-appointment-setting-companies'
import { PRICING_PAGE } from '@/content/answers/pricing'
import { RESULTS_HUB, caseStudyPages } from '@/content/case-studies'

export type SitePage = {
  path: string
  title: string
  description: string
  /** `results` is the /results hub and every /results/<slug> case study (content/case-studies/). */
  kind: 'home' | 'answer' | 'market' | 'tool' | 'about' | 'results'
  changeFrequency: 'weekly' | 'monthly'
  /** ISO date the page content last changed (the Article dateModified). Sitemap lastmod; pages without one take the build date. */
  updated?: string
  /** Answer pages only: the query this page is built for. Must be a content/search-targets.ts entry (test/seo-gates). */
  targetQuery?: string
}

/** Every public route lives here. The sitemap, llms.txt and the footer links read this list, so nothing is orphaned. */
export const STATIC_PAGES: SitePage[] = [
  {
    path: '/',
    title: 'Qualified sales meetings for commercial insurance agencies',
    description: 'Qualified sales meetings with commercial P&C and benefits owners, held live with your producers.',
    kind: 'home',
    changeFrequency: 'weekly',
  },
  {
    path: '/roi',
    title: 'ROI calculator',
    description: 'Work out what a qualified sales meeting is worth to your agency.',
    kind: 'tool',
    changeFrequency: 'monthly',
  },
  {
    path: '/pricing',
    title: 'Maxionlabs pricing: $4,725 a month, how it compares',
    description:
      'What Maxionlabs costs, what qualified means, the credit guarantee, and how it compares to hiring a producer, buying leads or an in-house SDR.',
    kind: 'answer',
    changeFrequency: 'monthly',
    updated: PRICING_PAGE.updated,
  },
]

/** Answer pages own their metadata in content/answers/<route>.tsx; listed here in priority order. */
export const ANSWER_PAGES: SitePage[] = [appointmentSetting, hireProducer, leads, stoppedGrowing, abstrakt, bestCompanies, valuation]

/** The /results hub first, then one row per case study, from the same data the pages render. */
export const RESULTS_PAGES: SitePage[] = [RESULTS_HUB, ...caseStudyPages()]

export function allPages(): SitePage[] {
  return [...STATIC_PAGES, ...ANSWER_PAGES, about, reviews, ...RESULTS_PAGES, ...marketPages()]
}
