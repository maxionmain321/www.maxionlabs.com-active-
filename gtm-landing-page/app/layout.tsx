import type { Metadata, Viewport } from 'next'
import { GeistSans } from 'geist/font/sans'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://www.maxionlabs.com'),
  title: 'Maxionlabs | First meetings for commercial insurance agencies',
  description: 'Booked first meetings with business owners for independent commercial insurance agencies. Qualified on premium, renewal date and line. 15 a month, 4,725 USD, credit for every miss.',
  authors: [{ name: 'Maxionlabs' }],
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Maxionlabs | First meetings for commercial insurance agencies',
    description: 'Booked first meetings with business owners for independent commercial insurance agencies. Qualified on premium, renewal date and line. 15 a month, 4,725 USD, credit for every miss.',
    type: 'website',
    siteName: 'Maxionlabs',
    url: 'https://www.maxionlabs.com',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Maxionlabs | First meetings for commercial insurance agencies',
    description: 'Booked first meetings with business owners for independent commercial insurance agencies. Qualified on premium, renewal date and line. 15 a month, 4,725 USD, credit for every miss.',
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
      sameAs: ['https://landscaping.maxionlabs.com'],
    },
    {
      '@type': 'Service',
      '@id': 'https://www.maxionlabs.com/#service',
      name: 'Qualified first meetings for commercial insurance agencies',
      serviceType: 'Outbound prospecting and appointment setting for commercial insurance agencies',
      provider: { '@id': 'https://www.maxionlabs.com/#org' },
      areaServed: { '@type': 'Country', name: 'United States' },
      audience: { '@type': 'BusinessAudience', audienceType: 'Independent commercial P&C and employee benefits agencies' },
      description: 'Booked first meetings with business owners for independent commercial insurance agencies. Qualified on premium, renewal date and line. 15 a month, 4,725 USD, credit for every miss.',
      offers: {
        '@type': 'Offer',
        price: '4725',
        priceCurrency: 'USD',
        description: 'Monthly, month to month. 12 qualified appointments in month one, 15 a month after. 315 USD credit per appointment short. 7-day full refund. Territory lock included.',
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
      </body>
    </html>
  )
}
