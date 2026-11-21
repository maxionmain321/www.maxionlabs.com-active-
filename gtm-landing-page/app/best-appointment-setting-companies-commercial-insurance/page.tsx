import type { Metadata } from 'next'
import { AnswerPage } from '@/components/answer/AnswerPage'
import { CONTENT, PAGE } from '@/content/answers/best-appointment-setting-companies'

const TITLE = 'Best Appointment Setting Companies for Insurance Agencies'
const DESCRIPTION =
  'Six providers compared for commercial insurance agencies on price, meeting definition, no-show policy, guarantee and contract, each read from their own site.'

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `https://www.maxionlabs.com${PAGE.path}` },
  keywords: [
    'best appointment setting company for commercial insurance agencies',
    'appointment setting services for insurance agencies',
    'commercial insurance appointment setting companies',
    'insurance appointment setting cost',
  ],
  openGraph: { title: TITLE, description: DESCRIPTION, type: 'article', siteName: 'Maxionlabs' },
  twitter: { card: 'summary_large_image', title: TITLE, description: DESCRIPTION },
}

export default function BestAppointmentSettingCompaniesPage() {
  return <AnswerPage {...CONTENT} />
}
