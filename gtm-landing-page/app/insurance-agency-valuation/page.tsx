import type { Metadata } from 'next'
import { mdAlternate } from '@/lib/markdown/paths'
import { AnswerPage } from '@/components/answer/AnswerPage'
import { CONTENT, PAGE } from '@/content/answers/insurance-agency-valuation'

const CANONICAL = `https://www.maxionlabs.com${PAGE.path}`

export const metadata: Metadata = {
  title: PAGE.title,
  description: PAGE.description,
  alternates: { canonical: CANONICAL, ...mdAlternate(PAGE.path) },
  keywords: [
    'insurance agency valuation',
    'insurance agency valuation multiples',
    'insurance agency perpetuation plan',
    'commercial insurance agency valuation',
    'what is my insurance agency worth',
  ],
  openGraph: { title: PAGE.title, description: PAGE.description, type: 'article', siteName: 'Maxionlabs', url: CANONICAL },
  twitter: { card: 'summary_large_image', title: PAGE.title, description: PAGE.description },
}

export default function Page() {
  return <AnswerPage {...CONTENT} path={PAGE.path} />
}
