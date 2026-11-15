import type { Metadata } from 'next'
import { AnswerPage } from '@/components/answer/AnswerPage'
import { CONTENT, PAGE } from '@/content/answers/commercial-insurance-leads'

const CANONICAL = `https://www.maxionlabs.com${PAGE.path}`

export const metadata: Metadata = {
  title: PAGE.title,
  description: PAGE.description,
  alternates: { canonical: CANONICAL },
  keywords: [
    'commercial insurance leads',
    'commercial insurance leads for agents',
    'commercial insurance lead generation',
    'are commercial insurance leads worth it',
    'workers comp leads',
    'exclusive commercial insurance leads',
  ],
  openGraph: { title: PAGE.title, description: PAGE.description, type: 'article', siteName: 'Maxionlabs', url: CANONICAL },
  twitter: { card: 'summary_large_image', title: PAGE.title, description: PAGE.description },
}

export default function Page() {
  return <AnswerPage {...CONTENT} />
}
