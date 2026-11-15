import type { MetadataRoute } from 'next'
import { allPages } from '@/lib/site-pages'

const BASE = 'https://www.maxionlabs.com'

export default function sitemap(): MetadataRoute.Sitemap {
  return allPages().map((p) => ({
    url: `${BASE}${p.path}`,
    changeFrequency: p.changeFrequency,
    priority: p.kind === 'home' ? 1 : p.kind === 'answer' ? 0.8 : 0.6,
  }))
}
