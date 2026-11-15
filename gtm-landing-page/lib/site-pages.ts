import { marketPages } from './markets'

export type SitePage = {
  path: string
  title: string
  description: string
  kind: 'home' | 'answer' | 'market' | 'tool' | 'about'
  changeFrequency: 'weekly' | 'monthly'
}

/** Every public route lives here. The sitemap, llms.txt and the footer links read this list, so nothing is orphaned. */
export const STATIC_PAGES: SitePage[] = [
  {
    path: '/',
    title: 'Maxionlabs: first meetings for commercial insurance agencies',
    description: 'Qualified first meetings with commercial P&C and benefits owners, booked on your producers\' calendars.',
    kind: 'home',
    changeFrequency: 'weekly',
  },
  {
    path: '/roi',
    title: 'ROI calculator',
    description: 'Work out what a qualified first meeting is worth to your agency.',
    kind: 'tool',
    changeFrequency: 'monthly',
  },
  {
    path: '/pricing',
    title: 'Maxionlabs pricing: $4,725 a month, how it compares',
    description:
      'What Maxionlabs costs, what qualified means, the guarantee and refund terms, and how it compares to hiring a producer, buying leads or an in-house SDR.',
    kind: 'answer',
    changeFrequency: 'monthly',
  },
]

export function allPages(): SitePage[] {
  return [...STATIC_PAGES, ...marketPages()]
}
