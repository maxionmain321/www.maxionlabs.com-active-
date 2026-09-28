import type { Metadata } from 'next'
import { LandingPage } from '@/components/sections/LandingPage'
import type { HeroCopy } from '@/components/sections/Hero'

const TITLE = 'Maxionlabs | Commercial Insurance'
const DESCRIPTION =
  'Business owners asking you for a quote before their renewal. Outside your appetite? We replace it free.'

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  openGraph: { title: TITLE, description: DESCRIPTION, type: 'website', siteName: 'Maxionlabs' },
  twitter: { card: 'summary_large_image', title: TITLE, description: DESCRIPTION },
}

const INSURANCE_HERO: HeroCopy = {
  eyebrow: 'Commercial insurance principals & sales leaders',
  headline: "We'll get you business owners asking you for a quote before their renewal.",
  guarantee: 'Outside your appetite? We replace it free.',
  sub: 'No shared leads. Less than an hour a week of your time with us.',
  cta: 'Book your intro growth call',
}

export default function InsurancePage() {
  return <LandingPage hero={INSURANCE_HERO} />
}
