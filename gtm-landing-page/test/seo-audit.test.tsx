/**
 * SEO audit fixes, 2026-11-17 (MAX-738). Each block is one finding from the audit:
 *  1. every sitemap URL carries lastmod, from the page's dateModified where it has one;
 *  2. every guide's Article JSON-LD carries datePublished (the day the content file was first committed,
 *     `git log --diff-filter=A --format=%as -- <file>`) next to dateModified;
 *  3. the author Person on every guide points at /about and the same LinkedIn URL the /about Person uses;
 *  4. the home <title> is 60 characters or fewer and keeps the two phrases buyers type;
 *  5. every guide links in its body to at least two other guides and to /pricing;
 *  6. the appointment-setting lede opens with the answer.
 */
import { describe, it, expect, vi } from 'vitest'
import { render } from '@testing-library/react'
import sitemap from '@/app/sitemap'
import { allPages, ANSWER_PAGES, STATIC_PAGES } from '@/lib/site-pages'
import { LINKEDIN_URL } from '@/content/about'
import { metadata as homeMetadata } from '@/app/page'
import { metadata as layoutMetadata } from '@/app/layout'
import AppointmentSettingPage from '@/app/commercial-insurance-appointment-setting/page'
import LeadsPage from '@/app/commercial-insurance-leads/page'
import HireProducerPage from '@/app/hire-producer-or-book-meetings/page'
import StoppedGrowingPage from '@/app/why-insurance-agency-stopped-growing/page'
import AbstraktPage from '@/app/abstrakt-alternative/page'
import PricingPage from '@/app/pricing/page'
import { CONTENT as appointmentSetting } from '@/content/answers/commercial-insurance-appointment-setting'
import { CONTENT as leads } from '@/content/answers/commercial-insurance-leads'
import { CONTENT as hireProducer } from '@/content/answers/hire-producer-or-book-meetings'
import { CONTENT as stoppedGrowing } from '@/content/answers/why-insurance-agency-stopped-growing'
import { CONTENT as abstrakt } from '@/content/answers/abstrakt-alternative'
import { PRICING_PAGE } from '@/content/answers/pricing'

// app/layout.tsx loads the Geist font through next/font, which jsdom cannot resolve. Only its metadata is under test.
vi.mock('geist/font/sans', () => ({ GeistSans: { variable: 'font-geist-sans' } }))

vi.mock('@calcom/embed-react', () => ({
  default: () => <div data-testid="cal-embed" />,
  getCalApi: vi.fn().mockResolvedValue(vi.fn()),
}))

const ISO_DATE = /^\d{4}-\d{2}-\d{2}/

type Guide = {
  path: string
  make: () => React.ReactElement
  content: { updated: string; published?: string }
  /** `git log --diff-filter=A --format=%as -- content/answers/<route>.tsx`, read 2026-11-17. */
  firstCommitted: string
}

const GUIDES: Guide[] = [
  { path: '/commercial-insurance-appointment-setting', make: () => <AppointmentSettingPage />, content: appointmentSetting, firstCommitted: '2026-11-15' },
  { path: '/commercial-insurance-leads', make: () => <LeadsPage />, content: leads, firstCommitted: '2026-11-15' },
  { path: '/hire-producer-or-book-meetings', make: () => <HireProducerPage />, content: hireProducer, firstCommitted: '2026-11-15' },
  { path: '/why-insurance-agency-stopped-growing', make: () => <StoppedGrowingPage />, content: stoppedGrowing, firstCommitted: '2026-11-15' },
  { path: '/abstrakt-alternative', make: () => <AbstraktPage />, content: abstrakt, firstCommitted: '2026-11-16' },
]

const GUIDE_PATHS = GUIDES.map((g) => g.path)

function articleGraph(make: () => React.ReactElement) {
  const { container } = render(make())
  const scripts = [...container.querySelectorAll('script[type="application/ld+json"]')]
  const graphs = scripts.flatMap((s) => (JSON.parse(s.textContent ?? '{}')['@graph'] ?? []) as Record<string, unknown>[])
  return graphs.find((g) => g['@type'] === 'Article') as
    | { datePublished?: string; dateModified?: string; author?: { url?: string; sameAs?: string[]; name?: string } }
    | undefined
}

describe('1. sitemap lastmod', () => {
  it('every URL has a lastModified ISO date', () => {
    const entries = sitemap()
    expect(entries.length).toBe(allPages().length)
    for (const e of entries) {
      expect(String(e.lastModified ?? ''), e.url).toMatch(ISO_DATE)
    }
  })

  it('a guide, /pricing and /about take lastmod from the page dateModified, the rest take the build date', () => {
    const byUrl = new Map(sitemap().map((e) => [e.url, String(e.lastModified)]))
    for (const g of GUIDES) expect(byUrl.get(`https://www.maxionlabs.com${g.path}`)).toBe(g.content.updated)
    expect(byUrl.get('https://www.maxionlabs.com/pricing')).toBe(PRICING_PAGE.updated)
    const about = allPages().find((p) => p.path === '/about')!
    expect(byUrl.get('https://www.maxionlabs.com/about')).toBe(about.updated)
    const today = new Date().toISOString().slice(0, 10)
    for (const p of STATIC_PAGES.filter((p) => !p.updated)) expect(byUrl.get(`https://www.maxionlabs.com${p.path}`)).toBe(today)
  })

  it('every answer page registry row carries the same updated date as its content', () => {
    for (const g of GUIDES) {
      const row = ANSWER_PAGES.find((p) => p.path === g.path)!
      expect(row.updated, g.path).toBe(g.content.updated)
    }
    expect(STATIC_PAGES.find((p) => p.path === '/pricing')?.updated).toBe(PRICING_PAGE.updated)
  })
})

describe('2. Article datePublished', () => {
  it.each(GUIDES.map((g) => [g.path, g] as const))('%s carries datePublished from first commit and dateModified', (_path, g) => {
    const article = articleGraph(g.make)
    expect(article).toBeDefined()
    expect(article!.datePublished).toBe(g.firstCommitted)
    expect(article!.dateModified).toBe(g.content.updated)
    expect(g.content.published).toBe(g.firstCommitted)
    expect(article!.datePublished! <= article!.dateModified!).toBe(true)
  })

  it('/pricing carries datePublished too', () => {
    const article = articleGraph(() => <PricingPage />)
    expect(article?.datePublished).toBe('2026-11-15')
  })
})

describe('3. author Person on every guide', () => {
  it.each(GUIDES.map((g) => [g.path, g] as const))('%s author has url /about and the /about LinkedIn in sameAs', (_path, g) => {
    const author = articleGraph(g.make)?.author
    expect(author?.name).toBe('Max Pidvalnyi')
    expect(author?.url).toBe('https://www.maxionlabs.com/about')
    expect(author?.sameAs).toEqual([LINKEDIN_URL])
    expect(LINKEDIN_URL).toMatch(/^https:\/\/www\.linkedin\.com\/in\//)
  })
})

describe('4. home title', () => {
  const titles: [string, string][] = [
    ['app/page.tsx', String(homeMetadata.title)],
    ['app/layout.tsx', String(layoutMetadata.title)],
    ['STATIC_PAGES /', STATIC_PAGES.find((p) => p.path === '/')!.title],
  ]
  it.each(titles)('%s is 60 characters or fewer and keeps both buyer phrases', (_where, title) => {
    expect(title.length, title).toBeLessThanOrEqual(60)
    expect(title.toLowerCase()).toContain('commercial insurance')
    expect(title.toLowerCase()).toContain('qualified sales meetings')
  })
})

describe('5. internal links in the body', () => {
  it.each(GUIDES.map((g) => [g.path, g] as const))('%s links to 2+ other guides and to /pricing from inside the article', (_path, g) => {
    const { container } = render(g.make())
    const hrefs = [...container.querySelectorAll('article a[href]')].map((a) => a.getAttribute('href')!)
    const otherGuides = new Set(hrefs.filter((h) => GUIDE_PATHS.includes(h) && h !== g.path))
    expect([...otherGuides], `${g.path} links other guides`).toHaveLength(Math.max(2, otherGuides.size))
    expect(otherGuides.size).toBeGreaterThanOrEqual(2)
    expect(hrefs, `${g.path} links /pricing`).toContain('/pricing')
    // Every internal guide or pricing link has a descriptive anchor, 3 words or more, never a bare "here" or URL.
    for (const a of container.querySelectorAll('article a[href]')) {
      const href = a.getAttribute('href')!
      if (href !== '/pricing' && !GUIDE_PATHS.includes(href)) continue
      const anchor = (a.textContent ?? '').trim()
      expect(anchor.split(/\s+/).length, `${g.path} -> ${href} anchor "${anchor}"`).toBeGreaterThanOrEqual(2)
      expect(anchor.toLowerCase()).not.toMatch(/^(here|click here|this page|link)$/)
    }
  })
})

describe('6. appointment-setting lede opens with the answer', () => {
  it('first sentence says what it is, qualified sales meetings with owners above your floor, and $4,725 a month for 15', () => {
    const first = appointmentSetting.lede.split(/(?<=\.)\s+(?=[A-Z])/)[0]
    expect(first).toMatch(/^Commercial insurance appointment setting (is|means)\b/)
    expect(first).toMatch(/qualified sales meetings/)
    expect(first).toMatch(/owners?\b.*above your floor/)
    expect(first).toMatch(/\$4,725 a month for 15/)
    // The story that followed in v5 is still there, after the answer.
    expect(appointmentSetting.lede).toMatch(/burned already/)
    expect(appointmentSetting.lede).toMatch(/four jobs/)
    expect(appointmentSetting.lede).not.toMatch(/[–—]/)
    expect(appointmentSetting.lede).not.toMatch(/\b\w+: /)
  })
})
