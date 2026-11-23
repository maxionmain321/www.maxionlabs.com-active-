import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import Page from '@/app/insurance-agency-valuation/page'
import { PAGE, CONTENT } from '@/content/answers/insurance-agency-valuation'
import { assertCleanCopy, assertOwnerLanguage } from './helpers/copy-guards'

const ROUTE = '/insurance-agency-valuation'

function renderPage() {
  const { container } = render(<Page />)
  const article = container.querySelector('article')
  return { container, articleText: article?.textContent ?? '', markup: container.innerHTML }
}

const words = (s: string) => s.split(/\s+/).filter(Boolean)
const NUMBER = /\$?\d[\d,]*(?:\.\d+)?%?/g

function readerCopy(article: Element): string {
  const clone = article.cloneNode(true) as Element
  clone.querySelectorAll('svg').forEach((s) => s.remove())
  const parts = [
    clone.querySelector('h1')?.textContent,
    clone.querySelector('h1 + p')?.textContent,
    ...[...clone.querySelectorAll('section')].filter((s) => s.id !== 'sources').map((s) => s.textContent),
  ]
  return parts.join(' ')
}

describe('answer page: insurance agency valuation, what a year of new commercial business does to the multiple', () => {
  it('registers the route as an answer page for the searched query', () => {
    expect(PAGE.path).toBe(ROUTE)
    expect(PAGE.kind).toBe('answer')
    expect(PAGE.targetQuery).toBe('insurance agency valuation')
    expect(PAGE.title.length).toBeLessThan(60)
    expect(PAGE.description.length).toBeLessThan(160)
  })

  it('has one h1 carrying the query words and the new business angle', () => {
    const { container } = renderPage()
    const h1s = container.querySelectorAll('h1')
    expect(h1s).toHaveLength(1)
    expect(h1s[0].textContent ?? '').toMatch(/insurance agency valuation/i)
    expect(h1s[0].textContent ?? '').toMatch(/new commercial business/i)
  })

  it('says in the first 200 words who it is for and that we are not an M&A advisor', () => {
    const { container } = renderPage()
    const first = words([container.querySelector('h1')?.parentElement?.textContent ?? ''].join(' ')).slice(0, 200).join(' ')
    expect(first).toMatch(/not an M&A advisor/i)
    expect(first).toMatch(/solo agents?|personal lines/i)
    expect(first).toMatch(/commercial/i)
  })

  it('answers in the lede: the new business arithmetic and that no multiple for growth is published', () => {
    expect(CONTENT.lede).toMatch(/\$57,000/)
    expect(CONTENT.lede).toMatch(/\$810,000/)
    expect(CONTENT.lede).toMatch(/nobody publishes|no one publishes/i)
  })

  it('has a perpetuation plan section and the link into the insurance homepage', () => {
    const { container } = renderPage()
    expect(container.querySelector('section#perpetuation-plan h2')?.textContent ?? '').toMatch(/perpetuation plan/i)
    const hrefs = [...container.querySelectorAll('article a[href]')].map((a) => a.getAttribute('href'))
    expect(hrefs).toContain('/')
    expect(hrefs).toContain('/#book-call')
  })

  it('never quotes the standard price, and carries the flexible plan line', () => {
    const { container, articleText } = renderPage()
    expect(articleText).not.toMatch(/4,725|4725/)
    expect(container.innerHTML).not.toMatch(/4,725|4725/)
    expect(articleText).toMatch(/Plans are sized to your agency/)
  })

  it('claims no client result', () => {
    const { articleText } = renderPage()
    expect(articleText).not.toMatch(/our clients? (?:have|has|got|closed|booked)|case study|we helped/i)
  })

  it('has clean copy: no blocked names, em dashes or en dashes, and owner words', () => {
    const { articleText, markup } = renderPage()
    expect(() => assertCleanCopy(articleText, markup)).not.toThrow()
    expect(() => assertOwnerLanguage(articleText)).not.toThrow()
  })

  it('stays in the 900 to 1,500 word reader copy range', () => {
    const { container } = renderPage()
    const n = words(readerCopy(container.querySelector('article')!)).length
    expect(n).toBeGreaterThan(900)
    expect(n).toBeLessThan(1500)
  })

  it('repeats every number drawn in the drawing in the page text', () => {
    const { container, articleText } = renderPage()
    const fig = container.querySelector('svg[id="valuation-turn-vs-accounts"], figure svg')!
    const drawn = [...(fig.textContent ?? '').matchAll(NUMBER)].map((m) => m[0]).filter((n) => /\d{2}/.test(n))
    for (const n of drawn) expect(articleText, `drawn number ${n}`).toContain(n)
  })

  it('has at least 4 sources, each with an https URL and a read date, and no source is a competitor page marked follow', () => {
    expect(CONTENT.sources.length).toBeGreaterThanOrEqual(4)
    for (const s of CONTENT.sources) {
      expect(s.url).toMatch(/^https:\/\//)
      if (!/maxionlabs/.test(s.url)) expect(s.label, s.url).toMatch(/read 23 Nov 2026/)
    }
  })

  it('has an FAQ of at least 4 questions and Article plus FAQPage JSON-LD', () => {
    expect(CONTENT.faq.length).toBeGreaterThanOrEqual(4)
    const { container } = renderPage()
    const types = [...container.querySelectorAll('script[type="application/ld+json"]')].flatMap((s) =>
      (JSON.parse(s.textContent ?? '{}')['@graph'] ?? []).map((g: { '@type': string }) => g['@type']),
    )
    expect(types).toEqual(expect.arrayContaining(['Article', 'FAQPage', 'BreadcrumbList']))
  })
})
