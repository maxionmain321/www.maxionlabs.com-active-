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
    return [{ source: '/insurance', destination: '/', permanent: true }]
  },
}

export default nextConfig
