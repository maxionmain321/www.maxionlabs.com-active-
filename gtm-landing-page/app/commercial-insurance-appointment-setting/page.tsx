import type { Metadata } from 'next'
import { AnswerPage } from '@/components/answer/AnswerPage'
import { CONTENT, PAGE } from '@/content/answers/commercial-insurance-appointment-setting'

const TITLE = 'Commercial Insurance Appointment Setting: Cost and Fit'
const DESCRIPTION =
  'Insurance appointment setting services, judged by an agency owner. The four jobs, what counts as a meeting, vendors vs an in-house caller, and the price.'

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `https://www.maxionlabs.com${PAGE.path}` },
  keywords: [
    'insurance appointment setting services',
    'commercial insurance appointment setting',
    'appointment setting for insurance agencies',
    'insurance agency appointment setting',
  ],
  openGraph: { title: TITLE, description: DESCRIPTION, type: 'article', siteName: 'Maxionlabs' },
  twitter: { card: 'summary_large_image', title: TITLE, description: DESCRIPTION },
}

export default function CommercialInsuranceAppointmentSettingPage() {
  return <AnswerPage {...CONTENT} />
}
