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

describe('answer page: how to grow an insurance agency when new business went flat (plain-book format, v2)', () => {
  it('registers the route with the answer kind, a monthly change frequency and the searched query', () => {
    expect(PAGE.path).toBe(ROUTE)
    expect(PAGE.kind).toBe('answer')
    expect(PAGE.changeFrequency).toBe('monthly')
    expect(PAGE.targetQuery).toBe('how to grow an insurance agency')
    expect(PAGE.title.length).toBeGreaterThan(10)
    expect(PAGE.title.length).toBeLessThan(60)
    expect(PAGE.description.length).toBeLessThan(160)
  })

  it('has exactly one h1 that carries the searched phrase, how to grow an insurance agency', () => {
    const { container } = renderPage()
    const h1s = container.querySelectorAll('h1')
    expect(h1s).toHaveLength(1)
    expect(h1s[0].textContent ?? '').toMatch(/how to grow an insurance agency/i)
    expect(h1s[0].textContent ?? '').toMatch(/new business/i)
  })

  it('carries an h2 with the folded query, insurance agency growth strategies, and an FAQ item that asks it', () => {
    const { container } = renderPage()
    const h2s = [...container.querySelectorAll('article h2')].map((h) => h.textContent ?? '')
    expect(h2s.filter((t) => /insurance agency growth strategies/i.test(t))).toHaveLength(1)
    const faqQs = [...container.querySelectorAll('[data-testid="faq-item"]')].map((f) => f.textContent ?? '')
    expect(faqQs.some((t) => /insurance agency growth strategies/i.test(t))).toBe(true)
    expect(CONTENT.faq.some((f) => /insurance agency growth strategies/i.test(f.q))).toBe(true)
  })

  it('answers with the named check and the three causes, in owner words, inside the first 200 words after the h1', () => {
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
    expect(first200).toMatch(/calendar-and-book check/i)
    expect(first200).toMatch(/service trap/i)
    expect(first200).toMatch(/nobody owns new business/i)
    expect(first200).toMatch(/too many small accounts/i)
  })

  it('renders the diagnostic table server-side with symptom, cause, fix and cost columns', () => {
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
    expect(readerCopy(container.querySelector('article')!)).not.toMatch(/;/)
  })

  it('tells a solo agent or personal-lines producer on the first screen that this is not for them', () => {
    const { container } = renderPage()
    const article = container.querySelector('article')
    const lede = article?.querySelector('h1 + p')?.textContent ?? ''
    const eyebrow = article?.querySelector('h1')?.previousElementSibling?.textContent ?? ''
    expect(eyebrow + ' ' + lede).toMatch(/solo/i)
    expect(eyebrow + ' ' + lede).toMatch(/personal lines/i)
  })

  it('stays inside the length band for the plain-book format, 900 to 1,500 words of reader copy', () => {
    const { container } = renderPage()
    const n = words(readerCopy(container.querySelector('article')!)).length
    expect(n).toBeGreaterThanOrEqual(900)
    expect(n).toBeLessThanOrEqual(1500)
  })

  it('states the offer numbers only as offer-v3 publishes them, sells qualified sales meetings, and never says first meeting or booked', () => {
    const { articleText } = renderPage()
    expect(articleText).not.toContain('$4,725')
    expect(articleText).not.toMatch(/7-day/)
    expect(articleText).toMatch(/plans? sized to your agency|Plans are sized to your agency/i)
    expect(articleText).toMatch(/no-show/i)
    expect(articleText).not.toMatch(/\$500\b/)
    expect(articleText).not.toMatch(/first meetings?/i)
    expect(articleText).not.toMatch(/\bbooked\b/i)
  })

  it('shows the money over 3 months as an illustration: 42 meetings, about 8 accounts, $14,175 paid, gross before producer pay, no lifetime total', () => {
    const { articleText } = renderPage()
    expect(articleText).toMatch(/42 qualified sales meetings/)
    expect(articleText).toMatch(/about 8 bound accounts/)
    expect(articleText).toMatch(/\$14,175/)
    expect(articleText).not.toMatch(/\$12,500/)
    expect(articleText).toMatch(/about \$25,000 of (gross )?commission/)
    expect(articleText).toMatch(/84%/)
    expect(articleText).toMatch(/\$21,000/)
    expect(articleText).toMatch(/before producer pay/i)
    expect(articleText).toMatch(/illustration/i)
    expect(articleText).not.toMatch(/lifetime/i)
  })

  // The plain-book format: drawings a crawler can read, and short paragraphs.

  it('draws between 3 and 5 inline SVGs, each with a <title> and <desc>, each inside a <figure> with a visible <figcaption>', () => {
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
