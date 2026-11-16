import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // /roi serves the static meeting-economics calculator from public/roi.html.
  // Static file, no React, so it is deliberately outside the app router.
  async rewrites() {
    return [{ source: '/roi', destination: '/roi.html' }]
  },
  // Cold emails link to /insurance. The homepage IS the insurance offer now, so send them there (308).
  async redirects() {
    return [
      { source: '/insurance', destination: '/', permanent: true },
      // /commercial-insurance-appointment-cost folded into /pricing (Max, 2026-11-16, MAX-738): its query had no volume and the
      // nearby phrases pull producers. The content is in content/answers/_archive/.
      { source: '/commercial-insurance-appointment-cost', destination: '/pricing', permanent: true },
    ]
  },
}

export default nextConfig
