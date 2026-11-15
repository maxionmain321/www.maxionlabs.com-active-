import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import Page from '@/app/why-insurance-agency-stopped-growing/page'
import { PAGE, CONTENT } from '@/content/answers/why-insurance-agency-stopped-growing'
import { assertCleanCopy } from './helpers/copy-guards'

const ROUTE = '/why-insurance-agency-stopped-growing'

function renderPage() {
  const { container } = render(<Page />)
  const article = container.querySelector('article')
  return {
    container,
    text: container.textContent ?? '',
    articleText: article?.textContent ?? '',
    markup: container.innerHTML,
  }
}

const words = (s: string) => s.split(/\s+/).filter(Boolean)

describe('answer page: why your independent commercial agency stopped growing', () => {
  it('registers the route with the answer kind and a monthly change frequency', () => {
    expect(PAGE.path).toBe(ROUTE)
    expect(PAGE.kind).toBe('answer')
    expect(PAGE.changeFrequency).toBe('monthly')
    expect(PAGE.title.length).toBeGreaterThan(10)
    expect(PAGE.title.length).toBeLessThan(60)
    expect(PAGE.description.length).toBeLessThan(160)
  })

  it('has exactly one h1 that asks why the agency stopped growing', () => {
    const { container } = renderPage()
    const h1s = container.querySelectorAll('h1')
    expect(h1s).toHaveLength(1)
    expect(h1s[0].textContent ?? '').toMatch(/stop/i)
    expect(h1s[0].textContent ?? '').toMatch(/grow/i)
  })

  it('names the three causes inside the first 200 words after the h1', () => {
    const { container } = renderPage()
    const article = container.querySelector('article')
    const h1 = article?.querySelector('h1')
    expect(h1).not.toBeNull()
    let text = ''
    let node: Element | null = h1 as Element
    while (node && !(node.tagName === 'NAV')) {
      text += ' ' + (node.textContent ?? '')
      node = node.nextElementSibling
    }
    const first200 = words(text).slice(0, 200).join(' ')
    expect(first200).toMatch(/three causes/i)
    expect(first200).toMatch(/producer capacity/i)
    expect(first200).toMatch(/no outbound/i)
    expect(first200).toMatch(/book mix/i)
  })

  it('renders a diagnostic table server-side with symptom, cause, fix and cost columns', () => {
    const { container } = renderPage()
    const tables = container.querySelectorAll('table')
    expect(tables.length).toBeGreaterThanOrEqual(1)
    const t = [...tables].map((x) => x.textContent ?? '').join(' ')
    expect(t).toMatch(/symptom/i)
    expect(t).toMatch(/points to/i)
    expect(t).toMatch(/fix/i)
    expect(t).toMatch(/costs/i)
  })

  it('carries between 4 and 7 FAQ items', () => {
    const { container } = renderPage()
    const n = container.querySelectorAll('[data-testid="faq-item"]').length
    expect(n).toBeGreaterThanOrEqual(4)
    expect(n).toBeLessThanOrEqual(7)
  })

  it('cites at least three https sources and at least two attributed quotes', () => {
    const { container } = renderPage()
    const sources = [...container.querySelectorAll('[data-testid="source-item"] a')].map((a) => a.getAttribute('href') ?? '')
    expect(sources.filter((h) => h.startsWith('https://')).length).toBeGreaterThanOrEqual(3)
    expect(CONTENT.sources.length).toBe(sources.length)
    expect(container.querySelectorAll('blockquote').length).toBeGreaterThanOrEqual(2)
  })

  it('links to the booking section on the homepage and to the sibling pricing and producer pages', () => {
    const { container } = renderPage()
    expect(container.querySelector('a[href="/#book-call"]')).not.toBeNull()
    expect(container.querySelector('article a[href="/pricing"]')).not.toBeNull()
    expect(container.querySelector('article a[href="/hire-producer-or-book-meetings"]')).not.toBeNull()
  })

  it('passes the shared copy guards: no client names, retired terms or dashes', () => {
    const { text, markup } = renderPage()
    expect(() => assertCleanCopy(text, markup)).not.toThrow()
  })

  it('never implies cold calling or working X-dates, and never sells leads or appointment setting in our own voice', () => {
    const { articleText } = renderPage()
    expect(articleText).not.toMatch(/x-date/i)
    expect(articleText).not.toMatch(/we (cold )?call/i)
    expect(articleText).not.toMatch(/we (sell|deliver|book|provide) (you )?leads/i)
    expect(articleText).not.toMatch(/our appointment setting/i)
  })

  it('uses no semicolons in the prose (the sources list is citation text and is excluded)', () => {
    const { container } = renderPage()
    const article = container.querySelector('article')!
    const prose = [
      article.querySelector('h1')?.textContent,
      article.querySelector('h1 + p')?.textContent,
      ...[...article.querySelectorAll('section')].filter((s) => s.id !== 'sources').map((s) => s.textContent),
    ].join(' ')
    expect(prose).not.toMatch(/;/)
  })

  it('tells a solo agent or personal-lines producer on the first screen that this is not for them', () => {
    const { container } = renderPage()
    const article = container.querySelector('article')
    const lede = article?.querySelector('h1 + p')?.textContent ?? ''
    const eyebrow = article?.querySelector('h1')?.previousElementSibling?.textContent ?? ''
    expect(eyebrow + ' ' + lede).toMatch(/solo/i)
    expect(eyebrow + ' ' + lede).toMatch(/personal lines/i)
  })

  it('stays inside the Daydream length band, 1,800 to 2,200 words of article copy', () => {
    const { container } = renderPage()
    const article = container.querySelector('article')!
    const parts = [
      article.querySelector('h1')?.textContent,
      article.querySelector('h1 + p')?.textContent,
      ...[...article.querySelectorAll('section')].filter((s) => s.id !== 'sources').map((s) => s.textContent),
    ]
    const n = words(parts.join(' ')).length
    expect(n).toBeGreaterThanOrEqual(1800)
    expect(n).toBeLessThanOrEqual(2200)
  })

  it('states the offer numbers only as offer-v3 publishes them', () => {
    const { articleText } = renderPage()
    expect(articleText).toContain('$4,725')
    expect(articleText).toContain('$315')
    expect(articleText).toMatch(/7-day/)
    expect(articleText).not.toMatch(/\$500\b/)
  })
})
