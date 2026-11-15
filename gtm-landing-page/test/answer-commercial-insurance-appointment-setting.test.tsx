import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import Page, { metadata } from '@/app/commercial-insurance-appointment-setting/page'
import { PAGE, CONTENT } from '@/content/answers/commercial-insurance-appointment-setting'
import { assertCleanCopy } from './helpers/copy-guards'

const ROUTE = '/commercial-insurance-appointment-setting'

/** Visible words of the article, minus the contents nav and the sources list (those are navigation, not copy). */
function articleWords(container: HTMLElement): string[] {
  const article = container.querySelector('article')!.cloneNode(true) as HTMLElement
  article.querySelector('nav[aria-label="Contents"]')?.remove()
  article.querySelector('#sources')?.remove()
  return (article.textContent ?? '').split(/\s+/).filter(Boolean)
}

describe('/commercial-insurance-appointment-setting', () => {
  it('registers the route and the metadata fits the SERP', () => {
    expect(PAGE.path).toBe(ROUTE)
    expect(PAGE.kind).toBe('answer')
    expect(PAGE.changeFrequency).toBe('monthly')
    expect(String(metadata.title).length).toBeLessThan(60)
    expect(String(metadata.description).length).toBeLessThan(160)
    expect(metadata.alternates?.canonical).toBe(`https://www.maxionlabs.com${ROUTE}`)
  })

  it('answers the question in the first 200 words: what, who for, what it costs, and who it is not for', () => {
    const { container } = render(<Page />)
    expect(container.querySelectorAll('h1')).toHaveLength(1)
    const first200 = articleWords(container).slice(0, 200).join(' ')
    expect(first200).toContain('$4,725')
    expect(first200.toLowerCase()).toContain('first meeting')
    expect(first200.toLowerCase()).toContain('solo')
    expect(first200.toLowerCase()).toContain('personal lines')
    expect(container.querySelector('a[href="/pricing"]')).not.toBeNull()
  })

  it('carries a server-rendered comparison table, 4-7 FAQ items, 3+ https sources and the booking CTA', () => {
    const { container } = render(<Page />)
    expect(container.querySelectorAll('table').length).toBeGreaterThanOrEqual(1)
    const faq = container.querySelectorAll('[data-testid="faq-item"]').length
    expect(faq).toBeGreaterThanOrEqual(4)
    expect(faq).toBeLessThanOrEqual(7)
    const sources = Array.from(container.querySelectorAll('[data-testid="source-item"] a')).map((a) => a.getAttribute('href') ?? '')
    expect(sources.filter((h) => h.startsWith('https://')).length).toBeGreaterThanOrEqual(3)
    expect(container.querySelector('a[href="/#book-call"]')).not.toBeNull()
    expect(CONTENT.sections.length).toBeGreaterThanOrEqual(7)
    expect(CONTENT.sections.length).toBeLessThanOrEqual(8)
  })

  it('runs 1,800 to 2,200 words and passes the copy guard', () => {
    const { container } = render(<Page />)
    const n = articleWords(container).length
    expect(n).toBeGreaterThanOrEqual(1800)
    expect(n).toBeLessThanOrEqual(2200)
    expect(() => assertCleanCopy(container.textContent ?? '', container.innerHTML)).not.toThrow()
  })

  it('never calls what we sell leads or appointment setting in our own voice, and never implies cold calling', () => {
    const { container } = render(<Page />)
    const text = (container.textContent ?? '').toLowerCase()
    for (const phrase of ['we sell leads', 'our leads', 'our appointment setting', 'we cold call', 'our callers dial', 'x-dates we work', 'we work x-dates']) {
      expect(text).not.toContain(phrase)
    }
  })
})
