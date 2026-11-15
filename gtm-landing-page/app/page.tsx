import type { Metadata } from 'next'
import { InsuranceHome } from '@/components/home/InsuranceHome'

const TITLE = 'Maxionlabs | First meetings for commercial insurance agencies'
const DESCRIPTION =
  'Your missing outbound seat. First meetings with owners who are coming up for renewal, qualified on premium, renewal date and line, booked on your producers’ calendars. $4,725 a month, 15 qualified meetings guaranteed, 7-day full refund, territory locked.'

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  // Buyers type the commodity terms; the page reframes once they land (seo-aeo-strategy.md section 3).
  keywords: [
    'commercial insurance leads',
    'appointment setting for insurance agencies',
    'commercial insurance appointment setting',
    'outbound for independent insurance agencies',
    'qualified commercial insurance appointments',
  ],
  openGraph: { title: TITLE, description: DESCRIPTION, type: 'website', siteName: 'Maxionlabs' },
  twitter: { card: 'summary_large_image', title: TITLE, description: DESCRIPTION },
}

export default function Home() {
  return <InsuranceHome />
}
