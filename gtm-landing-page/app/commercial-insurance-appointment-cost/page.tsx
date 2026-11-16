import type { Metadata } from 'next'
import { AnswerPage } from '@/components/answer/AnswerPage'
import { CONTENT, PAGE } from '@/content/answers/commercial-insurance-appointment-cost'

const TITLE = 'How Much Does an Insurance Appointment Setter Cost?'
const DESCRIPTION =
  'Hourly, per appointment, monthly and outsourced setter prices, and the bound-account math that tells an agency owner what one sales meeting is worth.'

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `https://www.maxionlabs.com${PAGE.path}` },
  keywords: [
    'how much does an appointment setter cost',
    'how much does appointment setting cost',
    'how much do appointment setters cost',
    'insurance appointment setter cost',
    'qualified commercial insurance appointment',
  ],
  openGraph: { title: TITLE, description: DESCRIPTION, type: 'article', siteName: 'Maxionlabs' },
  twitter: { card: 'summary_large_image', title: TITLE, description: DESCRIPTION },
}

export default function CommercialInsuranceAppointmentCostPage() {
  return <AnswerPage {...CONTENT} />
}
