import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import Page, { metadata } from '@/app/commercial-insurance-appointment-setting/page'
import { PAGE, CONTENT } from '@/content/answers/commercial-insurance-appointment-setting'
import { assertCleanCopy } from './helpers/copy-guards'

const ROUTE = '/commercial-insurance-appointment-setting'

function renderPage() {
  const { container } = render(<Page />)
  const article = container.querySelector('article')!
  return { container, article, text: container.textContent ?? '', articleText: article.textContent ?? '', markup: container.innerHTML }
}

const words = (s: string) => s.split(/\s+/).filter(Boolean)

/** A number as it appears in copy: $4,725, 57%, 15, $25,000. */
const NUMBER = /\$?\d[\d,]*(?:\.\d+)?%?/g

/** The copy a reader reads: h1, lede, sections with captions, FAQ. No SVG internals, no sources, no contents nav. */
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

/** Everything from the h1 down to the table of contents, in reading order. */
function firstScreen(article: Element): string {
  let text = ''
  let node: Element | null = article.querySelector('h1')
  while (node && node.tagName !== 'NAV') {
    text += ' ' + (node.textContent ?? '')
    node = node.nextElementSibling
  }
  return text
}

describe('/commercial-insurance-appointment-setting (plain-book format, v2)', () => {
  it('registers the route and the metadata fits the SERP', () => {
    expect(PAGE.path).toBe(ROUTE)
    expect(PAGE.kind).toBe('answer')
    expect(PAGE.changeFrequency).toBe('monthly')
    expect(PAGE.targetQuery).toBe('commercial insurance appointment setting')
    expect(String(metadata.title).length).toBeLessThan(60)
    expect(String(metadata.description).length).toBeLessThan(160)
    expect(metadata.alternates?.canonical).toBe(`https://www.maxionlabs.com${ROUTE}`)
  })

  it('has one h1 in the words the owner typed, commercial insurance appointment setting', () => {
    const { container } = renderPage()
    const h1s = container.querySelectorAll('h1')
    expect(h1s).toHaveLength(1)
    expect(h1s[0].textContent ?? '').toMatch(/commercial insurance appointment setting/i)
  })

  it('carries the searched phrase "insurance appointment setters" as an h2 and answers it in the FAQ (Serpstat g_us 50/mo, 2026-11-16)', () => {
    const { container } = renderPage()
    const h2s = [...container.querySelectorAll('article h2')].map((h) => h.textContent ?? '')
    expect(h2s.some((h) => /insurance appointment setters/i.test(h))).toBe(true)
    expect(CONTENT.faq.some((f) => /insurance appointment setter/i.test(f.q))).toBe(true)
  })

  it('answers in the first 200 words: the four jobs, what it costs, qualified sales meetings, and who it is not for', () => {
    const { article, container } = renderPage()
    const first200 = words(firstScreen(article)).slice(0, 200).join(' ')
    expect(first200).toMatch(/four jobs/i)
    expect(first200).not.toContain('$4,725')
    expect(first200).toContain('plans sized to your agency')
    expect(first200.toLowerCase()).toContain('qualified sales meeting')
    expect(first200.toLowerCase()).toContain('solo')
    expect(first200.toLowerCase()).toContain('personal lines')
    expect(container.querySelector('a[href="/pricing"]')).not.toBeNull()
    expect(container.querySelector('a[href="/#book-call"]')).not.toBeNull()
  })

  it('carries a server-rendered comparison table, 4-7 FAQ items, 3+ https sources and 2+ owner quotes', () => {
    const { container } = renderPage()
    expect(container.querySelectorAll('table').length).toBeGreaterThanOrEqual(1)
    const faq = container.querySelectorAll('[data-testid="faq-item"]').length
    expect(faq).toBeGreaterThanOrEqual(4)
    expect(faq).toBeLessThanOrEqual(7)
    const sources = [...container.querySelectorAll('[data-testid="source-item"] a')].map((a) => a.getAttribute('href') ?? '')
    expect(sources.filter((h) => h.startsWith('https://')).length).toBeGreaterThanOrEqual(3)
    expect(CONTENT.sources.length).toBe(sources.length)
    expect(container.querySelectorAll('blockquote').length).toBeGreaterThanOrEqual(2)
    expect(CONTENT.sections.length).toBeGreaterThanOrEqual(6)
    expect(CONTENT.sections.length).toBeLessThanOrEqual(8)
  })

  it('stays inside the plain-book length band, 900 to 1,500 words of reader copy, and passes the copy guards', () => {
    const { article, text, markup } = renderPage()
    const n = words(readerCopy(article)).length
    expect(n).toBeGreaterThanOrEqual(900)
    expect(n).toBeLessThanOrEqual(1500)
    expect(() => assertCleanCopy(text, markup)).not.toThrow()
  })

  it('never sells leads or appointment setting in our own voice, never implies cold calling or X-date lists', () => {
    const { articleText } = renderPage()
    const low = articleText.toLowerCase()
    for (const phrase of ['we sell leads', 'our leads', 'our appointment setting', 'we cold call', 'our callers dial', 'x-dates we work', 'we work x-dates']) {
      expect(low).not.toContain(phrase)
    }
    expect(articleText).not.toMatch(/we (sell|deliver|book|provide) (you )?leads/i)
  })

  it('states the offer only as offer-v3 publishes it: 15 qualified sales meetings held live, 12 in month one, $315 back, no-show replaced', () => {
    const { article, articleText } = renderPage()
    expect(articleText).toContain('$4,725')
    expect(articleText).toContain('$315')
    expect(articleText).not.toMatch(/7-day/)
    expect(articleText).toMatch(/15 qualified sales meetings a month/)
    expect(articleText).toMatch(/12 in month one/)
    expect(articleText).toMatch(/no-show/i)
    expect(articleText).toMatch(/held live/i)
    expect(articleText).not.toMatch(/first meetings?/i)
    expect(articleText).not.toMatch(/\bbooked\b/i)
    expect(readerCopy(article)).not.toMatch(/\bSDR\b/)
  })

  it('shows the money over 3 months as an illustration: 42 meetings, about 8 accounts, $14,175 paid, gross before producer pay, 84% renewal, no lifetime total', () => {
    const { articleText } = renderPage()
    expect(articleText).toMatch(/42 qualified sales meetings/)
    expect(articleText).toMatch(/about 8 bound accounts/)
    expect(articleText).toMatch(/\$14,175/)
    expect(articleText).not.toMatch(/\$12,500/)
    expect(articleText).toMatch(/about \$25,000 of gross commission/)
    expect(articleText).toMatch(/84%/)
    expect(articleText).toMatch(/\$21,000/)
    expect(articleText).toMatch(/before producer pay/i)
    expect(articleText).toMatch(/illustration/i)
    expect(articleText).not.toMatch(/lifetime/i)
  })

  it('draws 3 to 5 inline SVGs, each with <title>, <desc>, role img and a visible caption of 8+ words', () => {
    const { article } = renderPage()
    const svgs = [...article.querySelectorAll('svg')]
    expect(svgs.length).toBeGreaterThanOrEqual(3)
    expect(svgs.length).toBeLessThanOrEqual(5)
    for (const svg of svgs) {
      expect(svg.querySelector('title')?.textContent?.trim().length ?? 0).toBeGreaterThan(5)
      expect(svg.querySelector('desc')?.textContent?.trim().length ?? 0).toBeGreaterThan(20)
      expect(svg.getAttribute('role')).toBe('img')
      const figure = svg.closest('figure')
      expect(figure).not.toBeNull()
      expect(words(figure!.querySelector('figcaption')?.textContent ?? '').length).toBeGreaterThanOrEqual(8)
    }
  })

  it('every number drawn inside an SVG also appears in the reader copy', () => {
    const { article } = renderPage()
    const prose = readerCopy(article)
    const drawn = new Set<string>()
    for (const t of article.querySelectorAll('svg text')) {
      for (const m of (t.textContent ?? '').match(NUMBER) ?? []) drawn.add(m)
    }
    expect(drawn.size).toBeGreaterThan(4)
    expect([...drawn].filter((n) => !prose.includes(n))).toEqual([])
  })

  it('keeps every paragraph in the sections to four sentences or fewer', () => {
    const { article } = renderPage()
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
