import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import Page, { metadata } from '@/app/commercial-insurance-appointment-cost/page'
import { PAGE, CONTENT } from '@/content/answers/commercial-insurance-appointment-cost'
import { assertCleanCopy } from './helpers/copy-guards'

const ROUTE = '/commercial-insurance-appointment-cost'
const words = (s: string) => s.split(/\s+/).filter(Boolean).length

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

describe('/commercial-insurance-appointment-cost', () => {
  it('registers the route and the page metadata', () => {
    expect(PAGE.path).toBe(ROUTE)
    expect(PAGE.kind).toBe('answer')
    expect(PAGE.changeFrequency).toBe('monthly')
    expect(CONTENT.updated).toBe('2026-11-15')
    expect((metadata.title as string).length).toBeLessThan(60)
    expect((metadata.description as string).length).toBeLessThan(160)
    expect(metadata.alternates?.canonical).toBe(`https://www.maxionlabs.com${ROUTE}`)
  })

  it('has one h1 that asks what a qualified commercial appointment is worth', () => {
    const { container } = renderPage()
    const h1s = container.querySelectorAll('h1')
    expect(h1s).toHaveLength(1)
    expect(h1s[0].textContent?.toLowerCase()).toContain('worth')
    expect(h1s[0].textContent?.toLowerCase()).toContain('commercial')
  })

  it('answers in the first 200 words: the worth is commission times the chance it closes, in dollars', () => {
    const { articleText } = renderPage()
    const first200 = articleText.split(/\s+/).filter(Boolean).slice(0, 200).join(' ').toLowerCase()
    expect(first200).toContain('commission')
    expect(first200).toContain('close')
    expect(first200).toMatch(/\$\d/)
    // Who it is not for, on the first screen.
    expect(first200).toMatch(/personal lines|solo/)
  })

  it('server-renders at least one comparison table with a cost per bound account column', () => {
    const { container } = renderPage()
    const tables = container.querySelectorAll('table')
    expect(tables.length).toBeGreaterThanOrEqual(1)
    const headers = [...container.querySelectorAll('table th')].map((th) => th.textContent?.toLowerCase() ?? '')
    expect(headers.some((h) => h.includes('bound account'))).toBe(true)
  })

  it('has 7 or 8 full-sentence section headings and 4 to 7 FAQ items', () => {
    const { container } = renderPage()
    const h2s = [...container.querySelectorAll('section h2')].map((h) => h.textContent ?? '')
    const sectionHeadings = h2s.filter((h) => h !== 'Questions owners ask')
    expect(sectionHeadings.length).toBeGreaterThanOrEqual(7)
    expect(sectionHeadings.length).toBeLessThanOrEqual(8)
    for (const h of sectionHeadings) expect(words(h)).toBeGreaterThanOrEqual(6)
    const faq = container.querySelectorAll('[data-testid="faq-item"]')
    expect(faq.length).toBeGreaterThanOrEqual(4)
    expect(faq.length).toBeLessThanOrEqual(7)
  })

  it('cites at least 3 https sources and at least 2 attributed quotes', () => {
    const { container } = renderPage()
    const sources = [...container.querySelectorAll('[data-testid="source-item"] a')].map((a) => a.getAttribute('href') ?? '')
    expect(sources.length).toBeGreaterThanOrEqual(3)
    for (const s of sources) expect(s.startsWith('https://')).toBe(true)
    expect(container.querySelectorAll('blockquote').length).toBeGreaterThanOrEqual(2)
  })

  it('runs 1,800 to 2,200 words of body (lede, sections, FAQ), links the booking section and passes the copy guard', () => {
    const { container, text, markup } = renderPage()
    const article = container.querySelector('article')!
    const lede = article.querySelector('h1')?.nextElementSibling?.textContent ?? ''
    const body = [...article.querySelectorAll('section')]
      .filter((s) => s.id !== 'sources')
      .map((s) => s.textContent ?? '')
      .join(' ')
    const n = words(`${lede} ${body}`)
    expect(n).toBeGreaterThanOrEqual(1800)
    expect(n).toBeLessThanOrEqual(2200)
    expect(container.querySelector('a[href="/#book-call"]')).not.toBeNull()
    assertCleanCopy(text, markup)
    // Our own voice never sells leads, appointment setting or cold calls.
    expect(text).not.toMatch(/we (cold )?call/i)
    expect(text).not.toMatch(/X-date/i)
  })
})
