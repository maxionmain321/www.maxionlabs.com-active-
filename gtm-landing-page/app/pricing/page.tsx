import type { Metadata } from 'next'
import { mdAlternate } from '@/lib/markdown/paths'
import { AnswerPage } from '@/components/answer/AnswerPage'
import { PRICING_PAGE } from '@/content/answers/pricing'

const TITLE = 'Maxionlabs pricing: $4,725 a month, how it compares'
const DESCRIPTION =
  'Standard plan $4,725 a month for 15 qualified live sales meetings, $315 back per miss, smaller and custom plans. Compared with a producer, leads or a setter.'

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: 'https://www.maxionlabs.com/pricing', ...mdAlternate('/pricing') },
  keywords: [
    'Maxionlabs pricing',
    'Maxionlabs cost',
    'commercial insurance appointment setting cost',
    'cost to hire an insurance producer',
    'commercial insurance leads cost',
  ],
  openGraph: { title: TITLE, description: DESCRIPTION, type: 'article', siteName: 'Maxionlabs', url: 'https://www.maxionlabs.com/pricing' },
  twitter: { card: 'summary_large_image', title: TITLE, description: DESCRIPTION },
}

export default function PricingPage() {
  return <AnswerPage {...PRICING_PAGE} />
}
