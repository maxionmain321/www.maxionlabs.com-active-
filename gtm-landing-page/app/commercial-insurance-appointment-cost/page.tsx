import type { Metadata } from 'next'
import { AnswerPage } from '@/components/answer/AnswerPage'
import { CONTENT, PAGE } from '@/content/answers/commercial-insurance-appointment-cost'

const TITLE = 'What a Qualified Commercial Insurance Appointment Is Worth'
const DESCRIPTION =
  'Premium x close rate x commission x retention at $25K and $50K, cost per bound account by source, and the four checks that make a meeting qualified.'

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `https://www.maxionlabs.com${PAGE.path}` },
  keywords: [
    'commercial insurance appointment setting cost',
    'cost per appointment insurance agency',
    'how much does an insurance appointment setter cost',
    'how much do commercial insurance leads cost',
    'qualified commercial insurance appointment',
  ],
  openGraph: { title: TITLE, description: DESCRIPTION, type: 'article', siteName: 'Maxionlabs' },
  twitter: { card: 'summary_large_image', title: TITLE, description: DESCRIPTION },
}

export default function CommercialInsuranceAppointmentCostPage() {
  return <AnswerPage {...CONTENT} />
}
