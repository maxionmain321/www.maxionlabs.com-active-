import type { Metadata } from 'next'
import { mdAlternate } from '@/lib/markdown/paths'
import { InsuranceHome } from '@/components/home/InsuranceHome'

const TITLE = 'Qualified sales meetings for commercial insurance agencies'
const DESCRIPTION =
  'Qualified sales meetings with $25K+ premium accounts, for independent commercial P&C and benefits agencies. Plans sized to your agency, money back for every meeting we miss.'

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
  alternates: mdAlternate('/'),
  openGraph: { title: TITLE, description: DESCRIPTION, type: 'website', siteName: 'Maxionlabs' },
  twitter: { card: 'summary_large_image', title: TITLE, description: DESCRIPTION },
}

export default function Home() {
  return <InsuranceHome />
}
