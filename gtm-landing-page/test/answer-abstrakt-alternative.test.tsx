import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import Page, { metadata } from '@/app/abstrakt-alternative/page'
import { PAGE, CONTENT } from '@/content/answers/abstrakt-alternative'
import { assertCleanCopy } from './helpers/copy-guards'

const ROUTE = '/abstrakt-alternative'

/** Visible words of the article, minus the contents nav and the sources list (those are navigation, not copy). */
function articleWords(container: HTMLElement): string[] {
  const article = container.querySelector('article')!.cloneNode(true) as HTMLElement
  article.querySelector('nav[aria-label="Contents"]')?.remove()
  article.querySelector('#sources')?.remove()
  return (article.textContent ?? '').split(/\s+/).filter(Boolean)
}

describe('/abstrakt-alternative', () => {
  it('registers the route and the metadata fits the SERP', () => {
    expect(PAGE.path).toBe(ROUTE)
    expect(PAGE.kind).toBe('answer')
    expect(PAGE.changeFrequency).toBe('monthly')
    expect(String(metadata.title).length).toBeLessThan(60)
    expect(String(metadata.description).length).toBeLessThan(160)
    expect(metadata.alternates?.canonical).toBe(`https://www.maxionlabs.com${ROUTE}`)
  })

  it('answers in the first 200 words: what Abstrakt is, who it fits, and when an insurance-only service fits instead', () => {
    const { container } = render(<Page />)
    expect(container.querySelectorAll('h1')).toHaveLength(1)
    const first200 = articleWords(container).slice(0, 200).join(' ')
    expect(first200).toContain('Abstrakt Marketing Group')
    expect(first200).toContain('$5,000')
    expect(first200).toContain('$4,725')
    expect(first200.toLowerCase()).toContain('commercial p&c')
    expect(first200.toLowerCase()).toContain('solo')
    expect(container.querySelector('a[href="/pricing"]')).not.toBeNull()
    expect(container.querySelector('a[href="/commercial-insurance-appointment-setting"]')).not.toBeNull()
  })

  it('carries a server-rendered comparison table, 4-7 FAQ items, 3+ https sources, 7-8 sections and the booking CTA', () => {
    const { container } = render(<Page />)
    expect(container.querySelectorAll('table').length).toBeGreaterThanOrEqual(1)
    const faq = container.querySelectorAll('[data-testid="faq-item"]').length
    expect(faq).toBeGreaterThanOrEqual(4)
    expect(faq).toBeLessThanOrEqual(7)
    const sources = Array.from(container.querySelectorAll('[data-testid="source-item"] a')).map((a) => a.getAttribute('href') ?? '')
    expect(sources.filter((h) => h.startsWith('https://')).length).toBeGreaterThanOrEqual(3)
    expect(container.querySelector('a[href="/#book-call"]')).not.toBeNull()
    expect(CONTENT.sections.length).toBeGreaterThanOrEqual(7)
    expect(CONTENT.sections.length).toBeLessThanOrEqual(8)
    expect(container.querySelectorAll('[data-testid="buyer-quote"]').length).toBeGreaterThanOrEqual(2)
  })

  it('runs 1,800 to 2,200 words and passes the copy guard', () => {
    const { container } = render(<Page />)
    const n = articleWords(container).length
    expect(n).toBeGreaterThanOrEqual(1800)
    expect(n).toBeLessThanOrEqual(2200)
    expect(() => assertCleanCopy(container.textContent ?? '', container.innerHTML)).not.toThrow()
  })

  it('every link to abstraktmg.com is nofollow, the page is dated 2026-11-16, and nothing is ranked', () => {
    const { container } = render(<Page />)
    // Links TO Abstrakt (host abstraktmg.com). The Trustpilot review URL carries the domain in its path and is not one.
    const abstraktLinks = Array.from(container.querySelectorAll('a')).filter((a) => {
      const href = a.getAttribute('href') ?? ''
      return href.startsWith('http') && new URL(href).hostname.endsWith('abstraktmg.com')
    })
    expect(abstraktLinks.length).toBeGreaterThanOrEqual(5)
    for (const a of abstraktLinks) {
      expect(a.getAttribute('rel') ?? '').toContain('nofollow')
      expect(a.getAttribute('rel') ?? '').toContain('noopener')
    }
    const text = container.textContent ?? ''
    expect(text).toContain('2026-11-16')
    expect(text).toContain('maksym@maxionlabs.com')
    expect(text).not.toMatch(/#1\b/)
    expect(text.toLowerCase()).not.toMatch(/\btop \d+\b/)
    expect(text.toLowerCase()).not.toMatch(/\bbest (abstrakt|appointment|alternative|insurance|lead)/)
    for (const word of ['clunky', 'outdated', 'scam', 'fraud']) {
      expect(text.toLowerCase()).not.toContain(word)
    }
  })

  it('never calls what we sell leads or appointment setting in our own voice, and never implies cold calling or X-date lists', () => {
    const { container } = render(<Page />)
    const text = (container.textContent ?? '').toLowerCase()
    for (const phrase of ['we sell leads', 'our leads', 'our appointment setting', 'we cold call', 'our callers dial', 'we work x-dates', 'x-dates we work', 'our x-date']) {
      expect(text).not.toContain(phrase)
    }
  })
})
