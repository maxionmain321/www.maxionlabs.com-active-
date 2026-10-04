import type { Metadata } from 'next'
import InsuranceDraft from './InsuranceDraft'

const TITLE = 'Maxionlabs | Commercial Insurance'
const DESCRIPTION = 'Qualified appointments for commercial insurance agencies. $4,725/month. Month one: 12 appointments; month two onward: 15. No-shows replaced.'

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  openGraph: { title: TITLE, description: DESCRIPTION, type: 'website', siteName: 'Maxionlabs' },
  twitter: { card: 'summary_large_image', title: TITLE, description: DESCRIPTION },
}

export default function InsurancePage() {
  return <InsuranceDraft />
}
