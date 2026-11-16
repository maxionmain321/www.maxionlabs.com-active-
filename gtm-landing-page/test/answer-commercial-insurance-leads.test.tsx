import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import Page from '@/app/commercial-insurance-leads/page'
import { PAGE, CONTENT } from '@/content/answers/commercial-insurance-leads'
import { assertCleanCopy } from './helpers/copy-guards'

const ROUTE = '/commercial-insurance-leads'

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

describe('answer page: are commercial insurance leads worth buying, judged on cost per bound account', () => {
  it('registers the route with the answer kind and a monthly change frequency', () => {
    expect(PAGE.path).toBe(ROUTE)
    expect(PAGE.kind).toBe('answer')
    expect(PAGE.changeFrequency).toBe('monthly')
    expect(PAGE.title.length).toBeGreaterThan(10)
    expect(PAGE.title.length).toBeLessThan(60)
    expect(PAGE.description.length).toBeLessThan(160)
  })

  it('has exactly one h1 that asks whether commercial insurance leads are worth it', () => {
    const { container } = renderPage()
    const h1s = container.querySelectorAll('h1')
    expect(h1s).toHaveLength(1)
    expect(h1s[0].textContent ?? '').toMatch(/commercial insurance leads/i)
    expect(h1s[0].textContent ?? '').toMatch(/worth/i)
  })

  it('answers on cost per bound account inside the first 200 words after the h1', () => {
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
    expect(first200).toMatch(/cost per bound account/i)
    // The verdict, both halves: who should buy leads and who should not.
    expect(first200).toMatch(/producer/i)
    expect(first200).toMatch(/owner/i)
  })

  it('renders at least one comparison table server-side with the six options and the brief’s columns', () => {
    const { container } = renderPage()
    const tables = container.querySelectorAll('table')
    expect(tables.length).toBeGreaterThanOrEqual(1)
    const t = [...tables].map((x) => x.textContent ?? '').join(' ')
    for (const col of ['Exclusivity', 'Contact rate', 'Who qualifies', 'Typical price', 'What you own']) {
      expect(t).toMatch(new RegExp(col, 'i'))
    }
    for (const opt of ['Shared', 'Exclusive', 'Aged', 'Live transfer', 'Referral', 'Qualified sales meeting']) {
      expect(t).toMatch(new RegExp(opt, 'i'))
    }
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

  it('links to the booking section, the producer-or-meetings page and the pricing page', () => {
    const { container } = renderPage()
    expect(container.querySelector('a[href="/#book-call"]')).not.toBeNull()
    expect(container.querySelector('article a[href="/hire-producer-or-book-meetings"]')).not.toBeNull()
    expect(container.querySelector('article a[href="/pricing"]')).not.toBeNull()
  })

  it('passes the shared copy guards: no client names, retired terms or dashes', () => {
    const { text, markup } = renderPage()
    expect(() => assertCleanCopy(text, markup)).not.toThrow()
  })

  it('never implies cold calling or working X-dates, and never sells leads or appointment setting in our own voice', () => {
    const { articleText } = renderPage()
    expect(articleText).not.toMatch(/we (cold )?call (the|your|them|owners)/i)
    expect(articleText).not.toMatch(/we work (the |your )?x-dates/i)
    expect(articleText).not.toMatch(/we (sell|deliver|book|provide|send) (you )?leads/i)
    expect(articleText).not.toMatch(/our (leads|appointment setting)/i)
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

  it('has 7 or 8 section headings, each a full sentence', () => {
    expect(CONTENT.sections.length).toBeGreaterThanOrEqual(7)
    expect(CONTENT.sections.length).toBeLessThanOrEqual(8)
    for (const s of CONTENT.sections) expect(words(s.heading).length).toBeGreaterThanOrEqual(6)
  })

  it('states the offer numbers only as offer-v3 publishes them', () => {
    const { articleText } = renderPage()
    expect(articleText).toContain('$4,725')
    expect(articleText).toContain('$315')
    expect(articleText).toMatch(/7-day/)
    expect(articleText).not.toMatch(/\$500\b/)
  })
})
