import type { Metadata, Viewport } from 'next'
import { GeistSans } from 'geist/font/sans'
import './globals.css'

export const metadata: Metadata = {
  title: 'GTM Systems | War Machine Outbound Infrastructure',
  description: 'Book 10+ qualified sales calls in 30 days or your money back. Premium outbound infrastructure for SaaS and agencies.',
  keywords: ['GTM', 'outbound', 'sales', 'SaaS', 'lead generation', 'B2B'],
  authors: [{ name: 'GTM Systems' }],
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#000000',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${GeistSans.variable} font-sans bg-background text-foreground min-h-screen`}
      >
        {children}
      </body>
    </html>
  )
}
