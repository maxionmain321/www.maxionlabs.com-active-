import type { Metadata } from 'next'
import { mdAlternate } from '@/lib/markdown/paths'
import { ResultsHub } from '@/components/results/ResultsHub'
import { RESULTS_HUB } from '@/content/case-studies'
import { SITE_URL } from '@/content/about'

const CANONICAL = `${SITE_URL}${RESULTS_HUB.path}`

export const metadata: Metadata = {
  title: RESULTS_HUB.title,
  description: RESULTS_HUB.description,
  alternates: { canonical: CANONICAL, ...mdAlternate(RESULTS_HUB.path) },
  openGraph: { title: RESULTS_HUB.title, description: RESULTS_HUB.description, type: 'website', siteName: 'Maxionlabs', url: CANONICAL },
  twitter: { card: 'summary_large_image', title: RESULTS_HUB.title, description: RESULTS_HUB.description },
}

export default function ResultsPage() {
  return <ResultsHub />
}
