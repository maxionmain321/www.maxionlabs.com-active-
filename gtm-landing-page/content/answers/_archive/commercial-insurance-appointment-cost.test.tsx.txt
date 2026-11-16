import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import Page, { metadata } from '@/app/commercial-insurance-appointment-cost/page'
import { PAGE, CONTENT } from '@/content/answers/commercial-insurance-appointment-cost'
import { assertCleanCopy } from './helpers/copy-guards'

const ROUTE = '/commercial-insurance-appointment-cost'

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

/** A number as it appears in copy: $4,725, 84%, 15, $60,000. */
const NUMBER = /\$?\d[\d,]*(?:\.\d+)?%?/g

/**
 * The copy a reader actually reads: h1, lede, the sections (with figure captions) and the FAQ, minus the SVG internals
 * (<title>, <desc> and the drawn labels are for crawlers and screen readers, not prose) and minus the sources list.
 */
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

describe('answer page: how much does an insurance appointment setter cost (plain-book format)', () => {
  it('registers the route, targets the measured query, and keeps the metadata inside the limits', () => {
    expect(PAGE.path).toBe(ROUTE)
    expect(PAGE.kind).toBe('answer')
    expect(PAGE.changeFrequency).toBe('monthly')
    expect(PAGE.targetQuery).toBe('how much does an appointment setter cost')
    expect(PAGE.title.length).toBeLessThan(60)
    expect(PAGE.description.length).toBeLessThan(160)
    expect(CONTENT.updated).toBe('2026-11-16')
    expect((metadata.title as string).length).toBeLessThan(60)
    expect((metadata.description as string).length).toBeLessThan(160)
    expect(metadata.alternates?.canonical).toBe(`https://www.maxionlabs.com${ROUTE}`)
  })

  it('has exactly one h1 that asks the question in the words a buyer types, how much does an appointment setter cost', () => {
    const { container } = renderPage()
    const h1s = container.querySelectorAll('h1')
    expect(h1s).toHaveLength(1)
    expect(h1s[0].textContent ?? '').toMatch(/how much does an insurance appointment setter cost/i)
  })

  it('answers in the first 200 words after the h1 with the price shapes and the named bound-account math', () => {
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
    expect(first200).toMatch(/an hour/i)
    expect(first200).toMatch(/a month/i)
    expect(first200).toMatch(/bound-account math/i)
    expect(first200).toMatch(/\$\d/)
  })

  it('tells a solo agent or personal-lines producer on the first screen that this is not for them', () => {
    const { container } = renderPage()
    const article = container.querySelector('article')
    const lede = article?.querySelector('h1 + p')?.textContent ?? ''
    const eyebrow = article?.querySelector('h1')?.previousElementSibling?.textContent ?? ''
    expect(eyebrow + ' ' + lede).toMatch(/solo/i)
    expect(eyebrow + ' ' + lede).toMatch(/personal lines/i)
  })

  it('renders a comparison table server-side with a cost per bound account column', () => {
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
    for (const h of sectionHeadings) expect(words(h).length).toBeGreaterThanOrEqual(6)
    const faq = container.querySelectorAll('[data-testid="faq-item"]')
    expect(faq.length).toBeGreaterThanOrEqual(4)
    expect(faq.length).toBeLessThanOrEqual(7)
  })

  it('cites at least three https sources and at least two attributed quotes, and links the booking section', () => {
    const { container } = renderPage()
    const sources = [...container.querySelectorAll('[data-testid="source-item"] a')].map((a) => a.getAttribute('href') ?? '')
    expect(sources.filter((h) => h.startsWith('https://')).length).toBeGreaterThanOrEqual(3)
    expect(CONTENT.sources.length).toBe(sources.length)
    expect(container.querySelectorAll('blockquote').length).toBeGreaterThanOrEqual(2)
    expect(container.querySelector('a[href="/#book-call"]')).not.toBeNull()
  })

  it('passes the shared copy guards and never sells leads, cold calls or appointment setting in our own voice', () => {
    const { text, markup, articleText } = renderPage()
    expect(() => assertCleanCopy(text, markup)).not.toThrow()
    expect(articleText).not.toMatch(/x-date/i)
    expect(articleText).not.toMatch(/we (cold )?call/i)
    expect(articleText).not.toMatch(/we (sell|deliver|book|provide) (you )?leads/i)
    expect(articleText).not.toMatch(/our appointment setting/i)
  })

  it('stays inside the length band for the plain-book format, 1,500 to 2,200 words of reader copy', () => {
    const { container } = renderPage()
    const n = words(readerCopy(container.querySelector('article')!)).length
    expect(n).toBeGreaterThanOrEqual(1500)
    expect(n).toBeLessThanOrEqual(2200)
  })

  it('states the offer numbers only as offer-v3 publishes them and never says first meeting or booked', () => {
    const { articleText } = renderPage()
    expect(articleText).toContain('$4,725')
    expect(articleText).toContain('$315')
    expect(articleText).toMatch(/7-day/)
    expect(articleText).toMatch(/15 qualified sales meetings a month/)
    expect(articleText).toMatch(/12 in month one/)
    expect(articleText).toMatch(/no-show/i)
    expect(articleText).not.toMatch(/first meetings?/i)
    expect(articleText).not.toMatch(/\bbooked\b/i)
  })

  it('shows the money over 3 months as an illustration: 42 meetings, about 8 accounts, $12,500 to $14,175 paid, gross before producer pay, no lifetime total', () => {
    const { articleText } = renderPage()
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
  })

  it('draws three to five inline SVGs, each with a <title> and <desc>, inside a <figure> with a visible <figcaption>', () => {
    const { container } = renderPage()
    const article = container.querySelector('article')!
    const svgs = [...article.querySelectorAll('svg')]
    expect(svgs.length).toBeGreaterThanOrEqual(3)
    expect(svgs.length).toBeLessThanOrEqual(5)
    for (const svg of svgs) {
      expect(svg.querySelector('title')?.textContent?.trim().length ?? 0).toBeGreaterThan(5)
      expect(svg.querySelector('desc')?.textContent?.trim().length ?? 0).toBeGreaterThan(20)
      expect(svg.getAttribute('role')).toBe('img')
      const figure = svg.closest('figure')
      expect(figure).not.toBeNull()
      const caption = figure!.querySelector('figcaption')?.textContent?.trim() ?? ''
      expect(words(caption).length).toBeGreaterThanOrEqual(8)
    }
  })

  it('every number drawn inside an SVG also appears in the page text, because AI crawlers do not read images', () => {
    const { container } = renderPage()
    const article = container.querySelector('article')!
    const prose = readerCopy(article)
    const drawn = new Set<string>()
    for (const t of article.querySelectorAll('svg text')) {
      for (const m of (t.textContent ?? '').match(NUMBER) ?? []) drawn.add(m)
    }
    expect(drawn.size).toBeGreaterThan(5)
    const missing = [...drawn].filter((n) => !prose.includes(n))
    expect(missing).toEqual([])
  })

  it('keeps every paragraph in the sections to four sentences or fewer', () => {
    const { container } = renderPage()
    const article = container.querySelector('article')!
    const long: string[] = []
    for (const s of article.querySelectorAll('section')) {
      if (s.id === 'sources' || s.id === 'faq') continue
      for (const p of s.querySelectorAll('p')) {
        const text = p.textContent ?? ''
        const sentences = text.split(/[.?!]["”]?\s+(?=[A-Z$0-9“"])/).filter((x) => x.trim().length > 0)
        if (sentences.length > 4) long.push(text.slice(0, 60))
      }
    }
    expect(long).toEqual([])
  })
})
