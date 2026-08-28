import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // /roi serves the static meeting-economics calculator from public/roi.html.
  // Static file, no React, so it is deliberately outside the app router.
  async rewrites() {
    return [{ source: '/roi', destination: '/roi.html' }]
  },
}

export default nextConfig
