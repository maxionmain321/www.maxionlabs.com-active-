import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import Page, { metadata } from '@/app/abstrakt-alternative/page'
import { PAGE, CONTENT } from '@/content/answers/abstrakt-alternative'
import { assertCleanCopy } from './helpers/copy-guards'

const ROUTE = '/abstrakt-alternative'

const words = (s: string) => s.split(/\s+/).filter(Boolean)

/** A number as it appears in copy: $4,725, 46%, 15, $5,000. */
const NUMBER = /\$?\d[\d,]*(?:\.\d+)?%?/g

/**
 * The copy a reader actually reads: h1, lede, the sections (with figure captions and tables) and the FAQ, minus the SVG
 * internals (<title>, <desc> and the drawn labels are for crawlers and screen readers, not prose), minus the contents
 * nav and the sources list.
 */
function readerCopy(container: HTMLElement): string {
  const article = container.querySelector('article')!.cloneNode(true) as HTMLElement
  article.querySelectorAll('svg').forEach((s) => s.remove())
  article.querySelector('nav[aria-label="Contents"]')?.remove()
  article.querySelector('#sources')?.remove()
  return article.textContent ?? ''
}

/** Everything the reader meets from the eyebrow down to the contents nav, in document order. */
function firstScreen(container: HTMLElement): string {
  const h1 = container.querySelector('article h1')!
  let text = h1.previousElementSibling?.textContent ?? ''
  let node: Element | null = h1
  while (node && node.tagName !== 'NAV') {
    text += ' ' + (node.textContent ?? '')
    node = node.nextElementSibling
  }
  return text
}

describe('/abstrakt-alternative (plain-book format, v2)', () => {
  it('registers the route and the metadata fits the SERP', () => {
    expect(PAGE.path).toBe(ROUTE)
    expect(PAGE.kind).toBe('answer')
    expect(PAGE.changeFrequency).toBe('monthly')
    expect(PAGE.targetQuery).toBe('abstrakt marketing group reviews')
    expect(String(metadata.title).length).toBeLessThan(60)
    expect(String(metadata.description).length).toBeLessThan(160)
    expect(metadata.alternates?.canonical).toBe(`https://www.maxionlabs.com${ROUTE}`)
    for (const s of [PAGE.description, String(metadata.description)]) expect(s).not.toMatch(/first[- ]meeting/i)
  })

  it('answers in the first 200 words: what Abstrakt is, its price, our price, who each fits, and who neither fits', () => {
    const { container } = render(<Page />)
    expect(container.querySelectorAll('h1')).toHaveLength(1)
    const first200 = words(firstScreen(container)).slice(0, 200).join(' ')
    expect(first200).toContain('Abstrakt Marketing Group')
    expect(first200).toContain('$5,000')
    expect(first200).not.toContain('$4,725')
    expect(first200).toContain('plans sized to your agency')
    expect(first200.toLowerCase()).toContain('commercial p&c')
    expect(first200.toLowerCase()).toContain('solo')
    expect(first200).toMatch(/vendor test/i)
    expect(container.querySelector('a[href="/pricing"]')).not.toBeNull()
    expect(container.querySelector('a[href="/commercial-insurance-appointment-setting"]')).not.toBeNull()
  })

  it('carries a server-rendered comparison table, 4-7 FAQ items, 3+ https sources, 7-8 sections, 2+ quotes and the booking CTA', () => {
    const { container } = render(<Page />)
    expect(container.querySelectorAll('table').length).toBeGreaterThanOrEqual(2)
    const faq = container.querySelectorAll('[data-testid="faq-item"]').length
    expect(faq).toBeGreaterThanOrEqual(4)
    expect(faq).toBeLessThanOrEqual(7)
    const sources = Array.from(container.querySelectorAll('[data-testid="source-item"] a')).map((a) => a.getAttribute('href') ?? '')
    expect(sources.filter((h) => h.startsWith('https://')).length).toBeGreaterThanOrEqual(3)
    expect(container.querySelector('a[href="/#book-call"]')).not.toBeNull()
    expect(CONTENT.sections.length).toBeGreaterThanOrEqual(7)
    expect(CONTENT.sections.length).toBeLessThanOrEqual(8)
    expect(container.querySelectorAll('blockquote').length).toBeGreaterThanOrEqual(2)
  })

  it('runs 900 to 1,500 words of reader copy and passes the copy guard', () => {
    const { container } = render(<Page />)
    const n = words(readerCopy(container)).length
    expect(n).toBeGreaterThanOrEqual(900)
    expect(n).toBeLessThanOrEqual(1500)
    expect(() => assertCleanCopy(container.textContent ?? '', container.innerHTML)).not.toThrow()
  })

  it('every link to abstraktmg.com is nofollow noopener, every Abstrakt claim is dated 2026-11-16, and nothing is ranked', () => {
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
    expect(text.toLowerCase()).not.toMatch(/\bbest\b/)
    for (const word of ['clunky', 'outdated', 'scam', 'fraud', 'cheap', 'pricey', 'slow', 'aggressive']) {
      expect(text.toLowerCase().replace(/“[^”]*”|"[^"]*"/g, '')).not.toMatch(new RegExp(`\\b${word}\\b`))
    }
  })

  it('has a "choose Abstrakt if" column and states what Abstrakt publishes that we do not', () => {
    const { container } = render(<Page />)
    const text = container.textContent ?? ''
    expect(text).toMatch(/choose abstrakt if/i)
    expect(text).toMatch(/choose maxionlabs if/i)
    expect(text).toMatch(/not published/i)
  })

  it('never calls what we sell leads or appointment setting in our own voice, and never implies cold calling or X-date lists', () => {
    const { container } = render(<Page />)
    const text = (container.textContent ?? '').toLowerCase()
    for (const phrase of ['we sell leads', 'our leads', 'our appointment setting', 'we cold call', 'our callers dial', 'we work x-dates', 'x-dates we work', 'our x-date']) {
      expect(text).not.toContain(phrase)
    }
  })

  it('states the offer numbers only as offer-v3 publishes them, and the floor as a floor', () => {
    const { container } = render(<Page />)
    const text = readerCopy(container)
    expect(text).not.toContain('$4,725')
    expect(text).not.toMatch(/7-day/)
    expect(text).toMatch(/plans? sized to your agency|Plans are sized to your agency/i)
    expect(text).toMatch(/month to month/)
    expect(text).toMatch(/no-show/i)
    expect(text).toMatch(/\$25,000 in premium or 20 (enrolled )?lives is (a|the) floor/i)
    // "booked" may appear only inside a quotation of Abstrakt's own words, never as our unit.
    expect(text.replace(/“[^”]*”|"[^"]*"/g, ' ')).not.toMatch(/\bbooked\b/i)
    expect(text).not.toMatch(/lifetime/i)
  })

  it('plants the risk, ROI and vendor-question seeds (Max, 2026-11-16), our side from offer-v3 and /pricing only', () => {
    const { container } = render(<Page />)
    const text = readerCopy(container)
    expect(text).not.toMatch(/game plan alignment guarantee|7-day/)
    expect(text).toMatch(/credit guarantee/)
    expect(text).toMatch(/cash when you cancel/)
    expect(text).toMatch(/month one and month two/i)
    expect(text).toMatch(/What counts as qualified/)
    expect(text).toMatch(/the owner or a gatekeeper/)
    expect(text).toMatch(/leave after one month/)
    expect(text).toMatch(/miss in month two/)
    expect(text).toMatch(/42\s+meetings, 1 in 5, about 8 accounts/)
    expect(container.querySelector('a[href="/roi"]')).not.toBeNull()
    // The $25,000-a-year figure stays on /pricing; here it is a pointer, not a repeat.
    expect(text).not.toContain('$14,175')
  })

  // The plain-book format: drawings a crawler can read, and short paragraphs.

  it('draws 2 to 4 inline SVGs, each with a <title> and <desc>, each inside a <figure> with a visible <figcaption>', () => {
    const { container } = render(<Page />)
    const article = container.querySelector('article')!
    const svgs = [...article.querySelectorAll('svg')]
    expect(svgs.length).toBeGreaterThanOrEqual(2)
    expect(svgs.length).toBeLessThanOrEqual(4)
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
    const { container } = render(<Page />)
    const article = container.querySelector('article')!
    const prose = readerCopy(container)
    const drawn = new Set<string>()
    for (const t of article.querySelectorAll('svg text')) {
      for (const m of (t.textContent ?? '').match(NUMBER) ?? []) drawn.add(m)
    }
    expect(drawn.size).toBeGreaterThan(4)
    const missing = [...drawn].filter((n) => !prose.includes(n))
    expect(missing).toEqual([])
  })

  it('keeps every paragraph in the sections to four sentences or fewer', () => {
    const { container } = render(<Page />)
    const article = container.querySelector('article')!
    const long: string[] = []
    for (const s of article.querySelectorAll('section')) {
      if (s.id === 'sources' || s.id === 'faq') continue
      for (const p of s.querySelectorAll('p')) {
        // "St. Louis" and "U.S. callers" are abbreviations, not sentence ends.
        const text = (p.textContent ?? '').replace(/\bSt\. /g, 'St ').replace(/\bU\.S\. /g, 'US ')
        const sentences = text.split(/[.?!]["”]?\s+(?=[A-Z$0-9“"])/).filter((x) => x.trim().length > 0)
        if (sentences.length > 4) long.push(text.slice(0, 60))
      }
    }
    expect(long).toEqual([])
  })
})
