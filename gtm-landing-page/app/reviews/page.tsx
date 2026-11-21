import type { Metadata } from 'next'
import { mdAlternate } from '@/lib/markdown/paths'
import { AnswerPage } from '@/components/answer/AnswerPage'
import { CONTENT, PAGE } from '@/content/reviews'

export const metadata: Metadata = {
  title: PAGE.title,
  description: PAGE.description,
  alternates: { canonical: `https://www.maxionlabs.com${PAGE.path}`, ...mdAlternate(PAGE.path) },
  openGraph: { title: PAGE.title, description: PAGE.description, type: 'website', siteName: 'Maxionlabs', url: `https://www.maxionlabs.com${PAGE.path}` },
  twitter: { card: 'summary', title: PAGE.title, description: PAGE.description },
}

export default function ReviewsPage() {
  return <AnswerPage {...CONTENT} />
}
