import { renderToStaticMarkup } from 'react-dom/server'
import type { ReactElement } from 'react'
import { htmlToMarkdown } from './html-to-md'
import { CASE_STUDIES, RESULTS_PATH } from '@/content/case-studies'
import { CaseStudyPage } from '@/components/results/CaseStudyPage'
import { InsuranceHome } from '@/components/home/InsuranceHome'
import { ResultsHub } from '@/components/results/ResultsHub'
import PricingPage from '@/app/pricing/page'
import AboutPage from '@/app/about/page'
import ReviewsPage from '@/app/reviews/page'
import AbstraktPage from '@/app/abstrakt-alternative/page'
import BestPage from '@/app/best-appointment-setting-companies-commercial-insurance/page'
import AppointmentSettingPage from '@/app/commercial-insurance-appointment-setting/page'
import LeadsPage from '@/app/commercial-insurance-leads/page'
import HireProducerPage from '@/app/hire-producer-or-book-meetings/page'
import ValuationPage from '@/app/insurance-agency-valuation/page'
import StoppedGrowingPage from '@/app/why-insurance-agency-stopped-growing/page'

/**
 * Path to the element the live page renders: the same components and content objects, so the Markdown copy cannot
 * drift from the page. Results cases render the same CaseStudyPage the [slug] route renders.
 */
const ELEMENTS: Record<string, () => ReactElement> = {
  '/': () => <InsuranceHome />,
  '/pricing': () => <PricingPage />,
  '/about': () => <AboutPage />,
  '/reviews': () => <ReviewsPage />,
  [RESULTS_PATH]: () => <ResultsHub />,
  '/abstrakt-alternative': () => <AbstraktPage />,
  '/best-appointment-setting-companies-commercial-insurance': () => <BestPage />,
  '/commercial-insurance-appointment-setting': () => <AppointmentSettingPage />,
  '/commercial-insurance-leads': () => <LeadsPage />,
  '/hire-producer-or-book-meetings': () => <HireProducerPage />,
  '/why-insurance-agency-stopped-growing': () => <StoppedGrowingPage />,
  '/insurance-agency-valuation': () => <ValuationPage />,
  ...Object.fromEntries(CASE_STUDIES.map((c) => [`${RESULTS_PATH}/${c.slug}`, () => <CaseStudyPage study={c} />])),
}

export function markdownFor(path: string): string | undefined {
  const el = ELEMENTS[path]
  return el ? htmlToMarkdown(renderToStaticMarkup(el())) : undefined
}
