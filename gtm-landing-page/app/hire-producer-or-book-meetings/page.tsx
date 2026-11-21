import type { Metadata } from 'next'
import { mdAlternate } from '@/lib/markdown/paths'
import { AnswerPage } from '@/components/answer/AnswerPage'
import { CONTENT, PAGE } from '@/content/answers/hire-producer-or-book-meetings'

const CANONICAL = `https://www.maxionlabs.com${PAGE.path}`

export const metadata: Metadata = {
  title: PAGE.title,
  description: PAGE.description,
  alternates: { canonical: CANONICAL, ...mdAlternate(PAGE.path) },
  keywords: [
    'hire another insurance producer',
    'insurance producer pay',
    'insurance producer pay structure',
    'insurance producer compensation',
    'insurance producer validation',
    'how do insurance producers get paid',
    'commercial insurance producer salary',
    'appointment setter vs producer insurance agency',
  ],
  openGraph: { title: PAGE.title, description: PAGE.description, type: 'article', siteName: 'Maxionlabs', url: CANONICAL },
  twitter: { card: 'summary_large_image', title: PAGE.title, description: PAGE.description },
}

export default function Page() {
  return <AnswerPage {...CONTENT} path="/hire-producer-or-book-meetings" />
}
