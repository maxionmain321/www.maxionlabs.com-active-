import type { MetadataRoute } from 'next'

const DISALLOW = ['/api/', '/built/', '/v1', '/v2', '/v3', '/hvac', '/local-leads', '/_archive-results']

/** Named so the intent is explicit, not only implied by the wildcard (MAX-738). Search, assistants and training crawlers all allowed. */
const AI_CRAWLERS = [
  'GPTBot',
  'OAI-SearchBot',
  'ChatGPT-User',
  'ClaudeBot',
  'Claude-User',
  'Claude-SearchBot',
  'PerplexityBot',
  'Perplexity-User',
  'Google-Extended',
  'Applebot-Extended',
  'Bingbot',
  'CCBot',
]

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/', disallow: DISALLOW },
      ...AI_CRAWLERS.map((userAgent) => ({ userAgent, allow: '/', disallow: DISALLOW })),
    ],
    sitemap: 'https://www.maxionlabs.com/sitemap.xml',
  }
}
