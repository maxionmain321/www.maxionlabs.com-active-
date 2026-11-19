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
import fs from 'node:fs'
import path from 'node:path'
import { CASE_STUDIES, RESULTS_HUB } from '@/content/case-studies'
import type { CaseStudy } from '@/content/case-studies/types'
import { CaseStudyPage } from '@/components/results/CaseStudyPage'
import ResultsHubPage, { metadata as resultsMetadata } from '@/app/results/page'
import { generateMetadata, generateStaticParams } from '@/app/results/[slug]/page'
import { HomeFooter } from '@/components/home/HomeFooter'
import { assertCleanCopy, assertOwnerLanguage, LABEL_OPENER } from './helpers/copy-guards'

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

/**
 * 7 and 8, 2026-11-19 (MAX-738): the results hub and the case-study template. One typed data file per case in
 * content/case-studies/, one dynamic route that renders any of them. These blocks iterate over CASE_STUDIES, so a
 * new case file is covered the moment it is listed in content/case-studies/index.ts.
 */
describe('7. case-study pages, every case in content/case-studies', () => {
  const RESULTS_BASE = 'https://www.maxionlabs.com/results'
  /** Clients whose row in the proof registry is anonymized. Their names never reach a rendered page. */
  const ANONYMIZED_NEVER = ['Workyard', 'Tendify', 'ReviewFix', 'Review Fix']

  function renderCase(c: CaseStudy) {
    const { container } = render(<CaseStudyPage study={c} />)
    const article = container.querySelector('article')!
    return { container, article, text: article.textContent ?? '', markup: container.innerHTML }
  }

  function graph(container: HTMLElement) {
    const scripts = [...container.querySelectorAll('script[type="application/ld+json"]')]
    return scripts.flatMap((s) => (JSON.parse(s.textContent ?? '{}')['@graph'] ?? []) as Record<string, unknown>[])
  }

  it('lists at least six cases with unique slugs, titles and descriptions, and static params cover them all', async () => {
    expect(CASE_STUDIES.length).toBeGreaterThanOrEqual(6)
    for (const key of ['slug', 'title', 'description'] as const) {
      expect(new Set(CASE_STUDIES.map((c) => c[key])).size, key).toBe(CASE_STUDIES.length)
    }
    const params = await generateStaticParams()
    expect(params.map((p) => p.slug).sort()).toEqual(CASE_STUDIES.map((c) => c.slug).sort())
  })

  it.each(CASE_STUDIES.map((c) => [c.slug, c] as const))('%s metadata: unique title under 60, description under 160, canonical under /results', async (_slug, c) => {
    const md = await generateMetadata({ params: Promise.resolve({ slug: c.slug }) })
    expect(String(md.title)).toBe(c.title)
    expect(c.title.length).toBeLessThanOrEqual(60)
    expect(c.description.length).toBeLessThanOrEqual(160)
    expect(md.alternates?.canonical).toBe(`${RESULTS_BASE}/${c.slug}`)
    expect((md.openGraph as { url?: string } | undefined)?.url).toBe(`${RESULTS_BASE}/${c.slug}`)
  })

  it.each(CASE_STUDIES.map((c) => [c.slug, c] as const))('%s JSON-LD: Article published 2026-11-19 by the /about author, breadcrumbs through /results, the result numbers as an ItemList', (_slug, c) => {
    const { container } = renderCase(c)
    const g = graph(container)
    const article = g.find((n) => n['@type'] === 'Article') as { datePublished?: string; dateModified?: string; author?: { url?: string; sameAs?: string[]; name?: string }; about?: { name?: string } }
    expect(article).toBeDefined()
    expect(article.datePublished).toBe('2026-11-19')
    expect(c.published).toBe('2026-11-19')
    expect(article.dateModified).toBe(c.updated)
    expect(article.datePublished! <= article.dateModified!).toBe(true)
    expect(article.author?.name).toBe('Max Pidvalnyi')
    expect(article.author?.url).toBe('https://www.maxionlabs.com/about')
    expect(article.author?.sameAs).toEqual([LINKEDIN_URL])
    const crumbs = g.find((n) => n['@type'] === 'BreadcrumbList') as { itemListElement: { name: string; item: string }[] }
    expect(crumbs.itemListElement.map((i) => i.item)).toEqual(['https://www.maxionlabs.com/', RESULTS_BASE, `${RESULTS_BASE}/${c.slug}`])
    const results = g.find((n) => n['@type'] === 'ItemList') as { itemListElement: { name: string }[] }
    expect(results.itemListElement).toHaveLength(c.results.length)
    for (const r of c.results) expect(results.itemListElement.map((i) => i.name)).toContain(`${r.value} ${r.label}`)
  })

  it.each(CASE_STUDIES.map((c) => [c.slug, c] as const))('%s opens with the answer, then situation, what we did, results, and the insurance takeaway linking appointment setting and pricing', (_slug, c) => {
    const { container, article } = renderCase(c)
    expect(container.querySelectorAll('h1')).toHaveLength(1)
    const lede = container.querySelector('article h1 + p')?.textContent ?? ''
    expect(lede).toBe(c.answer)
    expect(c.answer, 'the answer sentence carries the headline result').toContain(c.results[0].value)
    const ids = [...article.querySelectorAll('section[id]')].map((s) => s.id)
    for (const id of ['situation', 'what-we-did', 'results', 'for-insurance-agencies']) expect(ids, id).toContain(id)
    expect(ids.indexOf('situation')).toBeLessThan(ids.indexOf('what-we-did'))
    expect(ids.indexOf('what-we-did')).toBeLessThan(ids.indexOf('results'))
    expect(ids.indexOf('results')).toBeLessThan(ids.indexOf('for-insurance-agencies'))
    expect(article.querySelectorAll('[data-testid="case-result"]')).toHaveLength(c.results.length)
    const takeaway = article.querySelector('#for-insurance-agencies')!
    const hrefs = [...takeaway.querySelectorAll('a[href]')].map((a) => a.getAttribute('href'))
    expect(hrefs).toContain('/commercial-insurance-appointment-setting')
    expect(hrefs).toContain('/pricing')
    expect([...article.querySelectorAll('a[href]')].map((a) => a.getAttribute('href'))).toContain('/results')
    for (const a of takeaway.querySelectorAll('a[href]')) {
      expect((a.textContent ?? '').trim().split(/\s+/).length, a.getAttribute('href')!).toBeGreaterThanOrEqual(2)
    }
    expect((article.textContent ?? '').toLowerCase()).toContain('outsourced outbound agency')
  })

  it.each(CASE_STUDIES.map((c) => [c.slug, c] as const))('%s copy: no dashes, retired terms, blocked names, label openers, semicolons or our own unit words', (_slug, c) => {
    const { container, article, text, markup } = renderCase(c)
    expect(() => assertCleanCopy(container.textContent ?? '', markup)).not.toThrow()
    expect(() => assertOwnerLanguage(text)).not.toThrow()
    const nodes = [...article.querySelectorAll('p, li, dd')].filter((n) => !n.closest('#sources') && !n.closest('nav[aria-label="Contents"]'))
    expect(nodes.map((n) => (n.textContent ?? '').trim()).filter((t) => LABEL_OPENER.test(t))).toEqual([])
    const reader = article.cloneNode(true) as HTMLElement
    reader.querySelector('#sources')?.remove()
    expect(reader.textContent ?? '').not.toMatch(/;/)
    // Every tracker caveat the case carries is enforced on the rendered page, head to foot.
    for (const phrase of c.forbidden) expect(markup, `"${phrase}" is forbidden by the ${c.trackerRow} row`).not.toMatch(new RegExp(phrase, 'i'))
    // Case-insensitive on purpose: an image path like /images/proof/<client>-x.jpg names the client as surely as prose does.
    if (c.client.naming === 'anonymized') for (const n of ANONYMIZED_NEVER) expect(markup, `anonymized page names ${n}`).not.toMatch(new RegExp(n, 'i'))
    for (const r of c.results) expect(r.caveat.length, `${r.value} ${r.label} needs its tracker caveat`).toBeGreaterThan(20)
  })

  it('ships a README beside the data files that says how to add a case', () => {
    const readme = fs.readFileSync(path.join(process.cwd(), 'content/case-studies/README.md'), 'utf8')
    expect(readme).toMatch(/QUOTABLE/)
    expect(readme).toMatch(/funnel-tracker/)
    expect(readme).toMatch(/vitest/)
  })
})

describe('8. the /results hub', () => {
  it('registers /results and every case in the page registry and the sitemap with lastmod from the data', () => {
    const paths = allPages().map((p) => p.path)
    expect(paths).toContain('/results')
    for (const c of CASE_STUDIES) expect(paths).toContain(`/results/${c.slug}`)
    const byUrl = new Map(sitemap().map((e) => [e.url, String(e.lastModified)]))
    expect(byUrl.get('https://www.maxionlabs.com/results')).toBe(RESULTS_HUB.updated)
    for (const c of CASE_STUDIES) expect(byUrl.get(`https://www.maxionlabs.com/results/${c.slug}`)).toBe(c.updated)
  })

  it('has its own title, description and canonical', () => {
    expect(String(resultsMetadata.title)).toBe(RESULTS_HUB.title)
    expect(RESULTS_HUB.title.length).toBeLessThanOrEqual(60)
    expect(RESULTS_HUB.description.length).toBeLessThanOrEqual(160)
    expect(resultsMetadata.alternates?.canonical).toBe('https://www.maxionlabs.com/results')
  })

  it('shows the two aggregate rows with the pipeline method line, and links every case', () => {
    const { container } = render(<ResultsHubPage />)
    const main = container.querySelector('main')!
    const text = main.textContent ?? ''
    expect(container.querySelectorAll('h1')).toHaveLength(1)
    expect(text).toMatch(/358 sales meetings/)
    expect(text).toMatch(/since March 2026/)
    expect(text).toMatch(/\$1\.54M/)
    expect(text).toMatch(/meetings times each client/)
    expect(text).toMatch(/pipeline, not revenue/i)
    expect(text).not.toMatch(/cold email/i)
    const hrefs = [...main.querySelectorAll('a[href^="/results/"]')].map((a) => a.getAttribute('href'))
    for (const c of CASE_STUDIES) expect(hrefs).toContain(`/results/${c.slug}`)
    for (const c of CASE_STUDIES) expect(text).toContain(c.results[0].value)
    expect(() => assertCleanCopy(container.textContent ?? '', container.innerHTML)).not.toThrow()
    expect(() => assertOwnerLanguage(main.textContent ?? '')).not.toThrow()
    const nodes = [...main.querySelectorAll('p, li, dd')]
    expect(nodes.map((n) => (n.textContent ?? '').trim()).filter((t) => LABEL_OPENER.test(t))).toEqual([])
    expect(text).not.toMatch(/;/)
  })

  it('carries CollectionPage, ItemList and BreadcrumbList JSON-LD', () => {
    const { container } = render(<ResultsHubPage />)
    const scripts = [...container.querySelectorAll('script[type="application/ld+json"]')]
    const g = scripts.flatMap((s) => (JSON.parse(s.textContent ?? '{}')['@graph'] ?? []) as Record<string, unknown>[])
    const types = g.map((n) => n['@type'])
    expect(types).toEqual(expect.arrayContaining(['CollectionPage', 'ItemList', 'BreadcrumbList']))
    const list = g.find((n) => n['@type'] === 'ItemList') as { itemListElement: { url: string }[] }
    expect(list.itemListElement.map((i) => i.url).sort()).toEqual(CASE_STUDIES.map((c) => `https://www.maxionlabs.com/results/${c.slug}`).sort())
    const page = g.find((n) => n['@type'] === 'CollectionPage') as { dateModified?: string }
    expect(page.dateModified).toBe(RESULTS_HUB.updated)
  })

  it('is linked from the shared footer like /about', () => {
    const { container } = render(<HomeFooter />)
    expect(container.querySelector('a[href="/results"]')).not.toBeNull()
  })
})
