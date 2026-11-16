import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import PricingPage, { metadata } from '@/app/pricing/page'
import { PRICING_PAGE } from '@/content/answers/pricing'
import { allPages } from '@/lib/site-pages'
import { assertCleanCopy } from './helpers/copy-guards'

/**
 * /pricing, v2 (MAX-738, 2026-11-16): the brand pricing page in the plain-book format of /hire-producer-or-book-meetings.
 * No targetQuery: every insurance-specific pricing query returned 0 autocomplete strings on 2026-11-16, so the page
 * stays a brand page in STATIC_PAGES and the demand gate does not apply to it.
 */

function renderPricing() {
  const { container } = render(<PricingPage />)
  const main = container.querySelector('main')
  const article = container.querySelector('article')
  return {
    container,
    main,
    article,
    text: container.textContent ?? '',
    mainText: main?.textContent ?? '',
    articleText: article?.textContent ?? '',
    markup: container.innerHTML,
  }
}

const words = (s: string) => s.split(/\s+/).filter(Boolean)

/** A number as it appears in copy: $4,725, 57%, 15, $62,280. */
const NUMBER = /\$?\d[\d,]*(?:\.\d+)?%?/g

/** Reader copy: h1, lede, sections with captions, FAQ; minus SVG internals and the sources list. */
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

describe('/pricing, what it costs and how it compares (plain-book format)', () => {
  it('has exactly one h1 about cost', () => {
    const { container } = renderPricing()
    const h1s = container.querySelectorAll('h1')
    expect(h1s).toHaveLength(1)
    expect(h1s[0].textContent).toMatch(/cost/i)
  })

  it('answers the price within the first 200 words after the h1', () => {
    const { article } = renderPricing()
    const h1 = article?.querySelector('h1')
    expect(h1).not.toBeNull()
    let text = ''
    let node: Element | null = h1 as Element
    while (node && node.tagName !== 'NAV') {
      text += ' ' + (node.textContent ?? '')
      node = node.nextElementSibling
    }
    const first200 = words(text).slice(0, 200).join(' ')
    expect(first200).toContain('$4,725')
    expect(first200).toMatch(/15 qualified live sales meetings a month/)
    expect(first200).toMatch(/12 in month one/)
  })

  it('tells a solo agent or personal-lines shop on the first screen that this is not for them', () => {
    const { article } = renderPricing()
    const lede = article?.querySelector('h1 + p')?.textContent ?? ''
    const eyebrow = article?.querySelector('h1')?.previousElementSibling?.textContent ?? ''
    expect(eyebrow + ' ' + lede).toMatch(/solo/i)
    expect(eyebrow + ' ' + lede).toMatch(/personal lines/i)
  })

  it('server-renders the comparison table with producer, bought leads, in-house setter (SDR) and Maxionlabs', () => {
    const { main } = renderPricing()
    const table = main?.querySelector('table[data-testid="comparison-table"]')
    expect(table).not.toBeNull()
    const t = table?.textContent ?? ''
    expect(t).toContain('Maxionlabs')
    expect(t).toMatch(/producer/i)
    expect(t).toMatch(/leads/i)
    expect(t).toMatch(/SDR/)
    expect(t).toMatch(/monthly cost/i)
    expect(t).toMatch(/sales meeting/i)
    expect(t).toMatch(/prospecting/i)
    expect(t).toMatch(/if it fails/i)
    expect(t).toMatch(/own/i)
    // The sourced numbers the table carried in v1 stay.
    expect(t).toContain('$5,190')
    expect(t).toContain('$1,000')
    expect(t).toContain('$4,725')
    expect(t).toContain('$12,500')
    expect(t).toContain('$315')
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
    for (const h of heads) expect(words(h.textContent ?? '').length).toBeGreaterThanOrEqual(5)
  })

  it('cites at least three https sources, one per sourced number, and at least two attributed owner quotes', () => {
    const { container } = renderPricing()
    const links = [...container.querySelectorAll('[data-testid="source-item"] a')]
    expect(links.length).toBeGreaterThanOrEqual(3)
    for (const a of links) expect(a.getAttribute('href')).toMatch(/^https:\/\//)
    expect(PRICING_PAGE.sources.length).toBe(links.length)
    const hrefs = links.map((a) => a.getAttribute('href') ?? '')
    for (const host of ['bls.gov', 'iamagazine.com', 'insurancejournal.com', 'everquote.com', 'payscale.com', 'builtin.com']) {
      expect(hrefs.some((h) => h.includes(host)), host).toBe(true)
    }
    expect(container.querySelectorAll('blockquote').length).toBeGreaterThanOrEqual(2)
  })

  it('stays inside the plain-book length band, 1,500 to 2,200 words of reader copy', () => {
    const { article } = renderPricing()
    const n = words(readerCopy(article!)).length
    expect(n).toBeGreaterThanOrEqual(1500)
    expect(n).toBeLessThanOrEqual(2200)
  })

  it('keeps every sourced number from v1', () => {
    const { articleText } = renderPricing()
    for (const n of ['$62,280', '57%', '43 in 100', 'two or three years', '$1,000', 'maximum of three', '$52,866', '$57,921', '$83,110', '$186,840']) {
      expect(articleText, n).toContain(n)
    }
  })

  it('sells 15 qualified LIVE sales meetings, the $25K / 20 lives floor with the $75K and $100K examples, no-show replaced, never booked or first meeting', () => {
    const { container, articleText } = renderPricing()
    expect(articleText).toMatch(/15 qualified live sales meetings a month/)
    expect(articleText).toMatch(/12 in month one/)
    expect(articleText).toMatch(/\$25,000/)
    expect(articleText).toMatch(/20 (or more )?enrolled lives/)
    expect(articleText).toMatch(/floor/)
    expect(articleText).toMatch(/\$75,000 or \$100,000 account counts as one meeting/)
    expect(articleText).toMatch(/no-show/i)
    expect(articleText).toContain('$315')
    expect(articleText).toMatch(/7-day/)
    const article = container.querySelector('article')!.cloneNode(true) as HTMLElement
    article.querySelector('#sources')?.remove()
    expect(article.textContent ?? '').not.toMatch(/\bbooked\b/i)
    expect(article.textContent ?? '').not.toMatch(/first meetings?/i)
    expect(article.textContent ?? '').not.toMatch(/\$500\b/)
  })

  it('shows the money over 3 months as an illustration: 42 meetings, about 8 accounts, year one and year two, gross, no lifetime total', () => {
    const { articleText } = renderPricing()
    expect(articleText).toMatch(/42 qualified sales meetings/)
    expect(articleText).toMatch(/about 8 bound accounts/)
    expect(articleText).toMatch(/\$14,175/)
    expect(articleText).toMatch(/\$12,500/)
    expect(articleText).toMatch(/about \$25,000 of (gross )?commission/)
    expect(articleText).toMatch(/84%/)
    expect(articleText).toMatch(/\$21,000/)
    expect(articleText).toMatch(/before producer pay/i)
    expect(articleText).toMatch(/illustration/i)
    expect(articleText).not.toMatch(/lifetime/i)
    expect(articleText).not.toMatch(/three years at the same premium/i)
  })

  it('names the framework, the three-month book test, in the money section', () => {
    const { articleText } = renderPricing()
    expect(articleText).toMatch(/three-month book test/i)
  })

  it('draws 3 to 5 inline SVGs, each with a <title> and <desc>, inside a <figure> with a visible caption', () => {
    const { article } = renderPricing()
    const svgs = [...article!.querySelectorAll('svg')]
    expect(svgs.length).toBeGreaterThanOrEqual(3)
    expect(svgs.length).toBeLessThanOrEqual(5)
    for (const svg of svgs) {
      expect(svg.querySelector('title')?.textContent?.trim().length ?? 0).toBeGreaterThan(5)
      expect(svg.querySelector('desc')?.textContent?.trim().length ?? 0).toBeGreaterThan(20)
      expect(svg.getAttribute('role')).toBe('img')
      const figure = svg.closest('figure')
      expect(figure).not.toBeNull()
      expect(words(figure!.querySelector('figcaption')?.textContent?.trim() ?? '').length).toBeGreaterThanOrEqual(8)
    }
  })

  it('every number drawn inside an SVG also appears in the page text', () => {
    const { article } = renderPricing()
    const prose = readerCopy(article!)
    const drawn = new Set<string>()
    for (const t of article!.querySelectorAll('svg text')) {
      for (const m of (t.textContent ?? '').match(NUMBER) ?? []) drawn.add(m)
    }
    expect(drawn.size).toBeGreaterThan(5)
    expect([...drawn].filter((n) => !prose.includes(n))).toEqual([])
  })

  it('keeps every paragraph in the sections to four sentences or fewer', () => {
    const { article } = renderPricing()
    const long: string[] = []
    for (const s of article!.querySelectorAll('section')) {
      if (s.id === 'sources' || s.id === 'faq') continue
      for (const p of s.querySelectorAll('p')) {
        const text = p.textContent ?? ''
        const sentences = text.split(/[.?!]["”]?\s+(?=[A-Z$0-9“"])/).filter((x) => x.trim().length > 0)
        if (sentences.length > 4) long.push(text.slice(0, 60))
      }
    }
    expect(long).toEqual([])
  })

  it('passes the copy guard, links to the booking section and the ROI calculator', () => {
    const { container, text, markup } = renderPricing()
    expect(() => assertCleanCopy(text, markup)).not.toThrow()
    expect(container.querySelector('a[href="/#book-call"]')).not.toBeNull()
    expect(container.querySelector('article a[href="/roi"]')).not.toBeNull()
  })

  it('is registered as an answer page and carries SEO metadata within limits', () => {
    const page = allPages().find((p) => p.path === '/pricing')
    expect(page?.kind).toBe('answer')
    expect(String(metadata.title).length).toBeLessThan(60)
    expect(String(metadata.description).length).toBeLessThan(160)
    expect(metadata.alternates?.canonical).toBe('https://www.maxionlabs.com/pricing')
  })
})
