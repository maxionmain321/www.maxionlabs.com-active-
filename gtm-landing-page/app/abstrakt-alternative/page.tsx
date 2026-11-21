import type { Metadata } from 'next'
import { mdAlternate } from '@/lib/markdown/paths'
import { AnswerPage } from '@/components/answer/AnswerPage'
import { CONTENT, PAGE } from '@/content/answers/abstrakt-alternative'

const TITLE = 'Abstrakt Marketing Group Reviews and an Alternative'
const DESCRIPTION =
  'What Abstrakt Marketing Group is, who it fits, its published price, terms and guarantee, and how an insurance-only qualified sales meetings service compares.'

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `https://www.maxionlabs.com${PAGE.path}`, ...mdAlternate(PAGE.path) },
  keywords: [
    'abstrakt marketing group reviews',
    'abstrakt alternative',
    'abstrakt alternatives',
    'abstrakt marketing reviews reddit',
    'abstrakt insurance appointment setting',
  ],
  openGraph: { title: TITLE, description: DESCRIPTION, type: 'article', siteName: 'Maxionlabs' },
  twitter: { card: 'summary_large_image', title: TITLE, description: DESCRIPTION },
}

export default function AbstraktAlternativePage() {
  return <AnswerPage {...CONTENT} />
}
