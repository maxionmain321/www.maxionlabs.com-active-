import type { Metadata } from 'next'
import { mdAlternate } from '@/lib/markdown/paths'
import { AnswerPage } from '@/components/answer/AnswerPage'
import { CONTENT, PAGE } from '@/content/answers/why-insurance-agency-stopped-growing'

const CANONICAL = `https://www.maxionlabs.com${PAGE.path}`

export const metadata: Metadata = {
  title: PAGE.title,
  description: PAGE.description,
  alternates: { canonical: CANONICAL, ...mdAlternate(PAGE.path) },
  keywords: [
    'insurance agency growth',
    'how to grow an independent insurance agency',
    'why is my insurance agency not growing',
    'organic growth commercial lines insurance agency',
    'how to grow commercial lines independent insurance agency',
  ],
  openGraph: { title: PAGE.title, description: PAGE.description, type: 'article', siteName: 'Maxionlabs', url: CANONICAL },
  twitter: { card: 'summary_large_image', title: PAGE.title, description: PAGE.description },
}

export default function Page() {
  return <AnswerPage {...CONTENT} path={PAGE.path} />
}
