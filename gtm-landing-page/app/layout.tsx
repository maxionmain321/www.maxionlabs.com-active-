import type { Metadata, Viewport } from 'next'
import { GeistSans } from 'geist/font/sans'
import './globals.css'
import { FOUNDING_DATE, ORG_ADDRESS, PROFILE_URLS } from '@/content/profiles'
import { PostHogInit } from '@/components/analytics/PostHogInit'

export const metadata: Metadata = {
  metadataBase: new URL('https://www.maxionlabs.com'),
  title: 'Qualified sales meetings for commercial insurance agencies',
  description: 'Qualified sales meetings, held live, with business owners for independent commercial insurance agencies. Qualified on premium, renewal date and line. Plans sized to your agency.',
  authors: [{ name: 'Maxionlabs' }],
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Qualified sales meetings for commercial insurance agencies',
    description: 'Qualified sales meetings, held live, with business owners for independent commercial insurance agencies. Qualified on premium, renewal date and line. Plans sized to your agency.',
    type: 'website',
    siteName: 'Maxionlabs',
    url: 'https://www.maxionlabs.com',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Qualified sales meetings for commercial insurance agencies',
    description: 'Qualified sales meetings, held live, with business owners for independent commercial insurance agencies. Qualified on premium, renewal date and line. Plans sized to your agency.',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': 'https://www.maxionlabs.com/#org',
      name: 'Maxionlabs',
      url: 'https://www.maxionlabs.com',
      email: 'maksym@maxionlabs.com',
      foundingDate: FOUNDING_DATE,
      address: ORG_ADDRESS,
      sameAs: ['https://landscaping.maxionlabs.com', ...PROFILE_URLS],
    },
    {
      '@type': 'Service',
      '@id': 'https://www.maxionlabs.com/#service',
      name: 'Qualified sales meetings for commercial insurance agencies',
      serviceType: 'Outbound prospecting and appointment setting for commercial insurance agencies',
      provider: { '@id': 'https://www.maxionlabs.com/#org' },
      areaServed: { '@type': 'Country', name: 'United States' },
      audience: { '@type': 'BusinessAudience', audienceType: 'Independent commercial P&C and employee benefits agencies' },
      description: 'Qualified sales meetings, held live, with business owners for independent commercial insurance agencies. Qualified on premium, renewal date and line. Plans sized to your agency.',
      offers: {
        '@type': 'Offer',
        url: 'https://www.maxionlabs.com/pricing',
        description: 'Plans are sized to your agency: the standard is 15 qualified appointments a month, with smaller starting plans and plans built around fewer, larger accounts.',
      },
    },
  ],
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#FFFFFF',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${GeistSans.variable} font-sans bg-background text-foreground min-h-screen antialiased`}
      >
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        {/* Skip to main content link for accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:top-4 focus:left-4 focus:px-4 focus:py-2 focus:bg-accent focus:text-white focus:rounded-button"
        >
          Skip to main content
        </a>
        <div id="main-content">
          {children}
        </div>
        <PostHogInit />
      </body>
    </html>
  )
}
