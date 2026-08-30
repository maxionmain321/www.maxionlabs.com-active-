import type { Metadata, Viewport } from 'next'
import { GeistSans } from 'geist/font/sans'
import './globals.css'

export const metadata: Metadata = {
  title: 'Maxionlabs | Performance-Based Outbound for B2B',
  description: 'Performance based outbound for commercial trades, insurance and lending. You pay per qualified meeting held.',
  keywords: ['outbound', 'sales meetings', 'B2B', 'demand generation', 'performance-based', 'pay per meeting'],
  authors: [{ name: 'Maxionlabs' }],
  openGraph: {
    title: 'Maxionlabs | Performance-Based Outbound for B2B',
    description: 'Performance based outbound for commercial trades, insurance and lending. You pay per qualified meeting held.',
    type: 'website',
    siteName: 'Maxionlabs',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Maxionlabs | Performance-Based Outbound for B2B',
    description: 'Performance based outbound for commercial trades, insurance and lending. You pay per qualified meeting held.',
  },
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
