import type { Metadata } from 'next'
import HvacDraft from './HvacDraft'

const TITLE = 'Maxionlabs | Commercial HVAC'
const DESCRIPTION = 'Qualified commercial walkthroughs for HVAC contractors. You pick the buildings, approve every word, and hold your metro.'

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  robots: { index: false, follow: false },
  openGraph: { title: TITLE, description: DESCRIPTION, type: 'website', siteName: 'Maxionlabs' },
  twitter: { card: 'summary_large_image', title: TITLE, description: DESCRIPTION },
}

export default function HvacPage() {
  return <HvacDraft />
}
