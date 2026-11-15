import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import sitemap from '@/app/sitemap'
import robots from '@/app/robots'
import { allPages, STATIC_PAGES } from '@/lib/site-pages'
import { marketPages } from '@/lib/markets'
import { AnswerPage } from '@/components/answer/AnswerPage'
import { assertCleanCopy, CLIENT_NAMES_BLOCKED, CLIENT_NAMES_ALLOWED, EM_DASH, EN_DASH } from './helpers/copy-guards'

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
  it('lists the homepage and /roi now, and the market stub is empty', () => {
    expect(STATIC_PAGES.map((p) => p.path)).toEqual(expect.arrayContaining(['/', '/roi']))
    expect(marketPages()).toEqual([])
    expect(allPages().length).toBe(STATIC_PAGES.length)
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
    const rule = Array.isArray(robots().rules) ? robots().rules[0] : robots().rules
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
})
