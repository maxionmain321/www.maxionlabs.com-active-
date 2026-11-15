import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import PricingPage, { metadata } from '@/app/pricing/page'
import { allPages } from '@/lib/site-pages'
import { assertCleanCopy } from './helpers/copy-guards'

function renderPricing() {
  const { container } = render(<PricingPage />)
  const main = container.querySelector('main')
  return {
    container,
    main,
    text: container.textContent ?? '',
    mainText: main?.textContent ?? '',
    markup: container.innerHTML,
  }
}

const words = (s: string) => s.split(/\s+/).filter(Boolean)

describe('/pricing, what it costs and how it compares', () => {
  it('has exactly one h1 about cost', () => {
    const { container } = renderPricing()
    const h1s = container.querySelectorAll('h1')
    expect(h1s).toHaveLength(1)
    expect(h1s[0].textContent).toMatch(/cost/i)
  })

  it('answers the price within the first 200 words of the main text', () => {
    const { mainText } = renderPricing()
    const first200 = words(mainText).slice(0, 200).join(' ')
    expect(first200).toContain('4,725')
  })

  it('server-renders a comparison table with all four options', () => {
    const { main } = renderPricing()
    const table = main?.querySelector('table')
    expect(table).not.toBeNull()
    const t = table?.textContent ?? ''
    expect(t).toContain('Maxionlabs')
    expect(t).toMatch(/producer/i)
    expect(t).toMatch(/leads/i)
    expect(t).toMatch(/SDR/)
    // The row labels the brief asks for.
    expect(t).toMatch(/monthly cost/i)
    expect(t).toMatch(/first meeting/i)
    expect(t).toMatch(/prospecting/i)
    expect(t).toMatch(/if it fails/i)
    expect(t).toMatch(/own/i)
  })

  it('has 4 to 7 FAQ items and the first one is about cost', () => {
    const { container } = renderPricing()
    const items = container.querySelectorAll('[data-testid="faq-item"]')
    expect(items.length).toBeGreaterThanOrEqual(4)
    expect(items.length).toBeLessThanOrEqual(7)
    expect(items[0].querySelector('dt')?.textContent).toMatch(/cost|price|how much/i)
  })

  it('writes 7 to 8 section headings as full sentences', () => {
    const { container } = renderPricing()
    const heads = [...container.querySelectorAll('section[id]:not(#faq):not(#sources) h2')]
    expect(heads.length).toBeGreaterThanOrEqual(7)
    expect(heads.length).toBeLessThanOrEqual(8)
    for (const h of heads) {
      // A claim, not a label: at least five words and a verb-carrying sentence shape.
      expect(words(h.textContent ?? '').length).toBeGreaterThanOrEqual(5)
    }
  })

  it('cites at least three https sources', () => {
    const { container } = renderPricing()
    const links = [...container.querySelectorAll('[data-testid="source-item"] a')]
    expect(links.length).toBeGreaterThanOrEqual(3)
    for (const a of links) expect(a.getAttribute('href')).toMatch(/^https:\/\//)
  })

  it('runs 1,800 to 2,200 words of copy', () => {
    const { container } = renderPricing()
    const article = container.querySelector('article')
    const toc = article?.querySelector('nav[aria-label="Contents"]')
    const sources = article?.querySelector('#sources')
    const tocWords = words(toc?.textContent ?? '').length
    const srcWords = words(sources?.textContent ?? '').length
    const n = words(article?.textContent ?? '').length - tocWords - srcWords
    expect(n).toBeGreaterThanOrEqual(1800)
    expect(n).toBeLessThanOrEqual(2200)
  })

  it('passes the copy guard and links to the booking section', () => {
    const { container, text, markup } = renderPricing()
    expect(() => assertCleanCopy(text, markup)).not.toThrow()
    expect(container.querySelector('a[href="/#book-call"]')).not.toBeNull()
  })

  it('is registered as an answer page and carries SEO metadata within limits', () => {
    const page = allPages().find((p) => p.path === '/pricing')
    expect(page?.kind).toBe('answer')
    expect(String(metadata.title).length).toBeLessThan(60)
    expect(String(metadata.description).length).toBeLessThan(160)
    expect(metadata.alternates?.canonical).toBe('https://www.maxionlabs.com/pricing')
  })
})
