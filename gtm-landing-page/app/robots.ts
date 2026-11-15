import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: '*', allow: '/', disallow: ['/api/', '/built/', '/v1', '/v2', '/v3', '/hvac', '/local-leads', '/_archive-results'] }],
    sitemap: 'https://www.maxionlabs.com/sitemap.xml',
  }
}
