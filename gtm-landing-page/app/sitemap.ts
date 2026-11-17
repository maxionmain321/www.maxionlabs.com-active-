import type { MetadataRoute } from 'next'
import { allPages } from '@/lib/site-pages'

const BASE = 'https://www.maxionlabs.com'

/** Pages with no dateModified of their own (home, /roi) report the build date, so lastmod is never missing. */
const BUILD_DATE = new Date().toISOString().slice(0, 10)

export default function sitemap(): MetadataRoute.Sitemap {
  return allPages().map((p) => ({
    url: `${BASE}${p.path}`,
    lastModified: p.updated ?? BUILD_DATE,
    changeFrequency: p.changeFrequency,
    priority: p.kind === 'home' ? 1 : p.kind === 'answer' ? 0.8 : 0.6,
  }))
}
