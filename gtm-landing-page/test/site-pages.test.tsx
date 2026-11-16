import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import sitemap from '@/app/sitemap'
import robots from '@/app/robots'
import { allPages, STATIC_PAGES, ANSWER_PAGES } from '@/lib/site-pages'
import { marketPages } from '@/lib/markets'
import { AnswerPage } from '@/components/answer/AnswerPage'
import { assertCleanCopy, CLIENT_NAMES_BLOCKED, CLIENT_NAMES_ALLOWED, EM_DASH, EN_DASH } from './helpers/copy-guards'
import PricingPage from '@/app/pricing/page'
import AboutPage from '@/app/about/page'
import AppointmentSettingPage from '@/app/commercial-insurance-appointment-setting/page'
import AppointmentCostPage from '@/app/commercial-insurance-appointment-cost/page'
import LeadsPage from '@/app/commercial-insurance-leads/page'
import StoppedGrowingPage from '@/app/why-insurance-agency-stopped-growing/page'

const BASE = 'https://www.maxionlabs.com'

const fixture = {
  eyebrow: 'Guide',
  h1: 'What is a qualified commercial insurance meeting worth?',
  lede: 'A qualified first meeting is worth the commission on the accounts it closes.',
  sections: [
    { id: 'one', heading: 'First section', body: <p>Body one.</p> },
    { id: 'two', heading: 'Second section', body: <p>Body two.</p> },
  ],
  faq: [
    { q: 'Question one?', a: 'Answer one.' },
    { q: 'Question two?', a: 'Answer two.' },
    { q: 'Question three?', a: 'Answer three.' },
  ],
  sources: [{ label: 'Source A', url: 'https://example.com/a' }],
  updated: '2026-11-15',
}

describe('page registry', () => {
  it('lists the static pages plus every answer page, paths unique, and the market stub is empty', () => {
    expect(STATIC_PAGES.map((p) => p.path)).toEqual(expect.arrayContaining(['/', '/roi']))
    expect(marketPages()).toEqual([])
    expect(allPages().length).toBe(STATIC_PAGES.length + ANSWER_PAGES.length + 1) // + /about
    expect(allPages().map((p) => p.path)).toContain('/about')
    const paths = allPages().map((p) => p.path)
    expect(new Set(paths).size).toBe(paths.length)
  })

  it('accepts the about kind and every page has a title, a description and a path', () => {
    const kinds: string[] = ['home', 'answer', 'market', 'tool', 'about']
    for (const p of allPages()) {
      expect(kinds).toContain(p.kind)
      expect(p.path.startsWith('/')).toBe(true)
      expect(p.title.length).toBeGreaterThan(0)
      expect(p.description.length).toBeGreaterThan(0)
    }
  })

  it('feeds the sitemap exactly', () => {
    expect(sitemap().map((s) => s.url)).toEqual(allPages().map((p) => BASE + p.path))
  })

  it('keeps every sitemap path out of the robots disallow list', () => {
    const rules = robots().rules
    const rule = Array.isArray(rules) ? rules[0] : rules
    const disallow = ([] as string[]).concat((rule as { disallow?: string | string[] }).disallow ?? [])
    for (const p of allPages()) {
      for (const d of disallow) expect(p.path.startsWith(d)).toBe(false)
    }
  })
})

describe('AnswerPage', () => {
  it('renders one h1, the FAQ, sources, the booking CTA and parseable JSON-LD', () => {
    const { container } = render(<AnswerPage {...fixture} />)
    expect(container.querySelectorAll('h1')).toHaveLength(1)
    expect(container.querySelector('h1')?.textContent).toBe(fixture.h1)
    expect(container.querySelectorAll('[data-testid="faq-item"]')).toHaveLength(fixture.faq.length)
    expect(container.querySelectorAll('[data-testid="source-item"]')).toHaveLength(1)
    expect(container.querySelector('a[href="/#book-call"]')).not.toBeNull()
    expect(container.querySelectorAll('nav[aria-label="Contents"] a')).toHaveLength(fixture.sections.length)
    const ld = container.querySelector('script[type="application/ld+json"]')
    const data = JSON.parse(ld?.textContent ?? '{}')
    const graph = data['@graph'] as { '@type': string; dateModified?: string; mainEntity?: unknown[] }[]
    const types = graph.map((g) => g['@type'])
    expect(types).toEqual(expect.arrayContaining(['FAQPage', 'Article']))
    expect(graph.find((g) => g['@type'] === 'Article')?.dateModified).toBe('2026-11-15')
    expect(graph.find((g) => g['@type'] === 'FAQPage')?.mainEntity).toHaveLength(3)
  })

  it('reuses the homepage header and footer and passes the copy guard', () => {
    const { container } = render(<AnswerPage {...fixture} />)
    expect(container.querySelector('header')).not.toBeNull()
    expect(container.querySelector('[data-testid="home-footer"]')).not.toBeNull()
    expect(() => assertCleanCopy(container.textContent ?? '', container.innerHTML)).not.toThrow()
  })
})

/**
 * "Label: explanation" sentence openers are an AI tell (Max, 2026-11-16, on /pricing). A paragraph, list item or FAQ
 * answer may not start with a 1 to 4 word label followed by a colon. Table cells, the sources list and the table of
 * contents are excluded: column headers and citations may keep labels.
 */
const LABEL_OPENER = /^\s*[A-Z][\w' ]{0,30}:\s/

describe('de-AI copy guard: no "Label: explanation" openers in prose', () => {
  const pages: [string, () => React.ReactElement][] = [
    ['/pricing', () => <PricingPage />],
    ['/about', () => <AboutPage />],
    ['/commercial-insurance-appointment-setting', () => <AppointmentSettingPage />],
    ['/commercial-insurance-appointment-cost', () => <AppointmentCostPage />],
    ['/commercial-insurance-leads', () => <LeadsPage />],
    ['/why-insurance-agency-stopped-growing', () => <StoppedGrowingPage />],
  ]

  it('the regex catches the shapes Max flagged and lets plain sentences through', () => {
    for (const bad of ['Cost: Payscale puts it at', 'Where we fit: not instead of', 'Short answer: it depends', 'The terms: $4,725']) {
      expect(bad).toMatch(LABEL_OPENER)
    }
    for (const ok of ['The price is one number.', 'At $25,000 in premium the math works.', 'U.S. Bureau of Labor Statistics, Occupational Outlook Handbook: median']) {
      expect(ok).not.toMatch(LABEL_OPENER)
    }
  })

  it.each(pages)('%s has no paragraph, list item or FAQ answer that opens with a label and a colon', (_path, make) => {
    const { container } = render(make())
    const article = container.querySelector('article')!
    const nodes = [...article.querySelectorAll('p, li, [data-testid="faq-item"] dd')].filter(
      (n) => !n.closest('#sources') && !n.closest('nav[aria-label="Contents"]') && !n.closest('table'),
    )
    expect(nodes.length).toBeGreaterThan(10)
    const offenders = nodes.map((n) => (n.textContent ?? '').trim()).filter((t) => LABEL_OPENER.test(t))
    expect(offenders).toEqual([])
  })
})

describe('assertCleanCopy', () => {
  it('throws on a client name, a dash and a retired term', () => {
    expect(() => assertCleanCopy('We worked with Cosmo', '')).toThrow()
    expect(() => assertCleanCopy('', '<p>Heritage</p>')).toThrow()
    expect(() => assertCleanCopy(`a${EM_DASH}b`, '')).toThrow()
    expect(() => assertCleanCopy('', `a${EN_DASH}b`)).toThrow()
    expect(() => assertCleanCopy('Try pay per meeting', '')).toThrow()
    expect(() => assertCleanCopy('Plain clean copy, Mars Xiang said so.', '<p>ok</p>')).not.toThrow()
  })

  it('blocks the ReviewFix founder surname and keeps the allow-list disjoint from the block list', () => {
    expect(CLIENT_NAMES_BLOCKED).toEqual(expect.arrayContaining(['Cosmo', 'Heritage', 'Pearsall', 'Stiltner', 'Herschlag', 'Gabbel', 'Strong Tower', 'Tregeagle']))
    for (const n of CLIENT_NAMES_ALLOWED) expect(CLIENT_NAMES_BLOCKED.some((b) => n.includes(b))).toBe(false)
  })

  it('links every answer page from the shared footer, and nothing else under Guides', async () => {
    const { GUIDE_LINKS } = await import('@/lib/guide-links')
    const { HomeFooter } = await import('@/components/home/HomeFooter')
    const answerPaths = allPages().filter((p) => p.kind === 'answer').map((p) => p.path).sort()
    expect(GUIDE_LINKS.map((g) => g.path).sort()).toEqual(answerPaths)
    const { container } = render(<HomeFooter />)
    const hrefs = [...container.querySelectorAll('[data-testid="footer-guides"] a')].map((a) => a.getAttribute('href'))
    expect(hrefs.sort()).toEqual(answerPaths)
  })
})
