import type { Metadata } from 'next'
import { AnswerPage } from '@/components/answer/AnswerPage'
import { CONTENT, PAGE } from '@/content/answers/commercial-insurance-appointment-setting'

const TITLE = 'Commercial Insurance Appointment Setting: Cost and Fit'
const DESCRIPTION =
  'What an outsourced first-meeting service does for a commercial P&C or benefits agency, how it compares with vendors and an in-house SDR, and what it costs.'

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `https://www.maxionlabs.com${PAGE.path}` },
  keywords: [
    'insurance appointment setting services',
    'commercial insurance appointment setting',
    'appointment setting for insurance agencies',
    'outsourced SDR insurance',
  ],
  openGraph: { title: TITLE, description: DESCRIPTION, type: 'article', siteName: 'Maxionlabs' },
  twitter: { card: 'summary_large_image', title: TITLE, description: DESCRIPTION },
}

export default function CommercialInsuranceAppointmentSettingPage() {
  return <AnswerPage {...CONTENT} />
}
