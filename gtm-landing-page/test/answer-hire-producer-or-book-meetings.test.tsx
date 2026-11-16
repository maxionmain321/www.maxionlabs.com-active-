import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import Page from '@/app/hire-producer-or-book-meetings/page'
import { PAGE, CONTENT } from '@/content/answers/hire-producer-or-book-meetings'
import { assertCleanCopy } from './helpers/copy-guards'

const ROUTE = '/hire-producer-or-book-meetings'

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

/** A number as it appears in copy: $4,725, 45.5%, 15, $60,000. */
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

describe('answer page: hire another producer, or get first meetings for the producers you have (plain-book format)', () => {
  it('registers the route with the answer kind and a monthly change frequency', () => {
    expect(PAGE.path).toBe(ROUTE)
    expect(PAGE.kind).toBe('answer')
    expect(PAGE.changeFrequency).toBe('monthly')
    expect(PAGE.title.length).toBeGreaterThan(10)
    expect(PAGE.description.length).toBeLessThan(160)
  })

  it('has exactly one h1 that asks the producer-or-meetings question', () => {
    const { container } = renderPage()
    const h1s = container.querySelectorAll('h1')
    expect(h1s).toHaveLength(1)
    expect(h1s[0].textContent ?? '').toMatch(/producer/i)
    expect(h1s[0].textContent ?? '').toMatch(/meetings/i)
  })

  it('answers with the deciding test, lack meetings or lack closers, inside the first 200 words after the h1', () => {
    const { container } = renderPage()
    const article = container.querySelector('article')
    const h1 = article?.querySelector('h1')
    expect(h1).not.toBeNull()
    // Everything the reader meets from the h1 down, in document order, before the table of contents.
    let text = ''
    let node: Element | null = h1 as Element
    while (node && !(node.tagName === 'NAV')) {
      text += ' ' + (node.textContent ?? '')
      node = node.nextElementSibling
    }
    const first200 = words(text).slice(0, 200).join(' ')
    expect(first200).toMatch(/lack meetings or lack closers/i)
  })

  it('renders at least one comparison table server-side, with the 12 and 36 month columns', () => {
    const { container } = renderPage()
    const tables = container.querySelectorAll('table')
    expect(tables.length).toBeGreaterThanOrEqual(1)
    const t = [...tables].map((x) => x.textContent ?? '').join(' ')
    expect(t).toMatch(/12 months/i)
    expect(t).toMatch(/36 months/i)
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

  it('links to the booking section on the homepage', () => {
    const { container } = renderPage()
    expect(container.querySelector('a[href="/#book-call"]')).not.toBeNull()
  })

  it('passes the shared copy guards: no client names, retired terms or dashes', () => {
    const { text, markup } = renderPage()
    expect(() => assertCleanCopy(text, markup)).not.toThrow()
  })

  it('never implies cold calling or working X-dates, and never sells leads or appointment setting in our own voice', () => {
    const { articleText } = renderPage()
    expect(articleText).not.toMatch(/x-date/i)
    expect(articleText).not.toMatch(/we (cold )?call/i)
    // "leads" and "appointment setting" may appear only as what others sell or search for, never as what we sell.
    expect(articleText).not.toMatch(/we (sell|deliver|book|provide) (you )?leads/i)
    expect(articleText).not.toMatch(/our appointment setting/i)
  })

  it('tells a solo agent or personal-lines producer on the first screen that this is not for them', () => {
    const { container } = renderPage()
    const article = container.querySelector('article')
    const lede = article?.querySelector('h1 + p')?.textContent ?? ''
    const eyebrow = article?.querySelector('h1')?.previousElementSibling?.textContent ?? ''
    expect(eyebrow + ' ' + lede).toMatch(/solo/i)
    expect(eyebrow + ' ' + lede).toMatch(/personal lines/i)
  })

  it('stays inside the length band for the plain-book format, 1,500 to 2,200 words of reader copy', () => {
    const { container } = renderPage()
    const n = words(readerCopy(container.querySelector('article')!)).length
    expect(n).toBeGreaterThanOrEqual(1500)
    expect(n).toBeLessThanOrEqual(2200)
  })

  it('states the offer numbers only as offer-v3 publishes them, and never calls the meetings booked', () => {
    const { articleText } = renderPage()
    expect(articleText).toContain('$4,725')
    expect(articleText).toContain('$315')
    expect(articleText).toMatch(/7-day/)
    expect(articleText).toMatch(/15 qualified first meetings a month/)
    expect(articleText).toMatch(/12 in month one/)
    expect(articleText).toMatch(/\$75,000 or \$100,000 account counts as one meeting/)
    expect(articleText).not.toMatch(/\$500\b/)
    expect(articleText).not.toMatch(/meetings? booked/i)
  })

  // The plain-book format: drawings a crawler can read, and short paragraphs.

  it('draws at least four inline SVGs, each with a <title> and <desc>, each inside a <figure> with a visible <figcaption>', () => {
    const { container } = renderPage()
    const article = container.querySelector('article')!
    const svgs = [...article.querySelectorAll('svg')]
    expect(svgs.length).toBeGreaterThanOrEqual(4)
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
