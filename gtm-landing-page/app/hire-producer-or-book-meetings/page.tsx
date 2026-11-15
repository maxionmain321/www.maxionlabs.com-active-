import type { Metadata } from 'next'
import { AnswerPage } from '@/components/answer/AnswerPage'
import { CONTENT, PAGE } from '@/content/answers/hire-producer-or-book-meetings'

const CANONICAL = `https://www.maxionlabs.com${PAGE.path}`

export const metadata: Metadata = {
  title: PAGE.title,
  description: PAGE.description,
  alternates: { canonical: CANONICAL },
  keywords: [
    'hire a commercial insurance producer',
    'insurance producer compensation',
    'producer validation',
    'appointment setter vs producer insurance agency',
    'when to hire first producer insurance agency',
  ],
  openGraph: { title: PAGE.title, description: PAGE.description, type: 'article', siteName: 'Maxionlabs', url: CANONICAL },
  twitter: { card: 'summary_large_image', title: PAGE.title, description: PAGE.description },
}

export default function Page() {
  return <AnswerPage {...CONTENT} />
}
