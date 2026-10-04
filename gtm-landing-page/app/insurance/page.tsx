import type { Metadata } from 'next'
import InsuranceDraft from './InsuranceDraft'

const TITLE = 'Maxionlabs | Commercial Insurance'
const DESCRIPTION = 'Qualified appointments for commercial insurance agencies. From $3,400/month. Month one: 8 appointments; month two onward: 10. No-shows replaced.'

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  openGraph: { title: TITLE, description: DESCRIPTION, type: 'website', siteName: 'Maxionlabs' },
  twitter: { card: 'summary_large_image', title: TITLE, description: DESCRIPTION },
}

export default function InsurancePage() {
  return <InsuranceDraft />
}
