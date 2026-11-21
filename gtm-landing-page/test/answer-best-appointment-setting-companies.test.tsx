import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import Page, { metadata } from '@/app/best-appointment-setting-companies-commercial-insurance/page'
import { PAGE, CONTENT, PROVIDERS, COLUMNS, ANSWER_LINE } from '@/content/answers/best-appointment-setting-companies'
import { assertCleanCopy, assertOwnerLanguage } from './helpers/copy-guards'

const ROUTE = '/best-appointment-setting-companies-commercial-insurance'

/** The copy a reader reads: the article minus SVG internals and the sources list. */
function readerCopy(container: HTMLElement): string {
  const article = container.querySelector('article')!.cloneNode(true) as HTMLElement
  article.querySelectorAll('svg').forEach((s) => s.remove())
  article.querySelector('#sources')?.remove()
  return article.textContent ?? ''
}

describe('/best-appointment-setting-companies-commercial-insurance (comparison page, MAX-738)', () => {
  it('registers the route and the metadata fits the SERP', () => {
    expect(PAGE.path).toBe(ROUTE)
    expect(PAGE.kind).toBe('answer')
    expect(String(metadata.title).length).toBeLessThanOrEqual(60)
    expect(String(metadata.description).length).toBeLessThan(160)
    expect(metadata.alternates?.canonical).toBe(`https://www.maxionlabs.com${ROUTE}`)
  })

  it('renders the answer line first, naming the pick by buyer type, then the offer-v3 sentence', () => {
    const { container } = render(<Page />)
    expect(container.querySelectorAll('h1')).toHaveLength(1)
    const lede = container.querySelector('article h1')!.nextElementSibling!.textContent ?? ''
    expect(lede.startsWith(ANSWER_LINE)).toBe(true)
    for (const pick of ['Maxionlabs', 'Abstrakt', 'CFE Marketing', 'InsureLeads', 'EverQuote', 'personal lines']) {
      expect(ANSWER_LINE).toContain(pick)
    }
    expect(lede).toContain('As of November 2026, Maxionlabs charges 4,725 USD a month, month to month, for 15 qualified appointments.')
  })

  it('has a comparison table with every provider as a row and every checkable column', () => {
    const { container } = render(<Page />)
    const table = container.querySelector('[data-testid="comparison-table"]')!
    const heads = [...table.querySelectorAll('thead th')].map((th) => th.textContent?.trim())
    for (const c of COLUMNS) expect(heads).toContain(c)
    const rows = [...table.querySelectorAll('tbody th[scope="row"]')].map((th) => th.textContent?.trim())
    expect(rows).toEqual(PROVIDERS.map((p) => p.name))
    expect(PROVIDERS.length).toBeGreaterThanOrEqual(5)
    expect(PROVIDERS.length).toBeLessThanOrEqual(7)
    for (const name of ['Maxionlabs', 'Abstrakt Marketing Group', 'CFE Marketing', 'InsureLeads (getinsureleads.com)']) {
      expect(rows).toContain(name)
    }
    // Missing facts are stated as missing, never guessed.
    expect(table.textContent).toMatch(/Not published/)
  })

  it('states the Maxionlabs row from offer-v3 only and links the meeting definition on /pricing', () => {
    const { container } = render(<Page />)
    const row = [...container.querySelectorAll('[data-testid="comparison-table"] tbody tr')].find(
      (tr) => tr.querySelector('th')?.textContent?.trim() === 'Maxionlabs',
    )!
    const text = row.textContent ?? ''
    expect(text).toContain('$4,725 a month for 15 qualified appointments')
    expect(text).toContain('Month to month')
    expect(text).toMatch(/no-show does not count and is replaced/i)
    expect(text).toContain('$315 credit per missed appointment')
    expect(text).toContain('Outsourced outbound agency')
    expect(row.querySelector('a[href="/pricing#qualified"]')).not.toBeNull()
  })

  it('lists a dated source for every competitor, nofollow, plus our own /pricing', () => {
    const { container } = render(<Page />)
    const items = [...container.querySelectorAll('[data-testid="source-item"] a')]
    expect(items.length).toBeGreaterThanOrEqual(PROVIDERS.length)
    for (const a of items) expect(a.textContent).toMatch(/read 2026-11-21/)
    const hosts = items.map((a) => new URL(a.getAttribute('href')!).hostname)
    for (const h of ['www.abstraktmg.com', 'cfemarketingservices.com', 'www.leadsurex.com', 'www.getinsureleads.com', 'go.everquote.com', 'www.maxionlabs.com']) {
      expect(hosts).toContain(h)
    }
    for (const a of items) {
      if (!a.getAttribute('href')!.includes('maxionlabs.com')) expect(a.getAttribute('rel')).toContain('nofollow')
    }
  })

  it('discloses that Maxionlabs wrote the page, says where others fit better, and does not rank', () => {
    const { container } = render(<Page />)
    expect(container.querySelector('[data-testid="disclosure"]')?.textContent).toMatch(/Maxionlabs wrote this page/)
    const text = readerCopy(container)
    expect(text).toMatch(/Where another provider fits better/)
    expect(text).not.toMatch(/#1\b|\btop \d+\b|\branked?\b(?! *by)/i)
  })

  it('carries 3 to 4 FAQ items, one drawing with title and desc, and the booking CTA', () => {
    const { container } = render(<Page />)
    const faq = container.querySelectorAll('[data-testid="faq-item"]').length
    expect(faq).toBeGreaterThanOrEqual(3)
    expect(faq).toBeLessThanOrEqual(4)
    expect(CONTENT.faq.map((f) => f.q)).toContain('How much does insurance appointment setting cost?')
    expect(CONTENT.faq.map((f) => f.q)).toContain('What counts as a qualified appointment?')
    const svgs = container.querySelectorAll('article svg')
    expect(svgs).toHaveLength(1)
    expect(svgs[0].querySelector('title')?.textContent).toBeTruthy()
    expect(svgs[0].querySelector('desc')?.textContent?.length ?? 0).toBeGreaterThan(20)
    expect(container.querySelector('a[href="/#book-call"]')).not.toBeNull()
  })

  it('keeps forbidden words out: dashes, semicolons, closer, first meeting, sales appointment, booked, $500', () => {
    const { container } = render(<Page />)
    expect(() => assertCleanCopy(container.textContent ?? '', container.innerHTML)).not.toThrow()
    const article = container.querySelector('article')!
    expect(() => assertOwnerLanguage(article.textContent ?? '')).not.toThrow()
    const text = readerCopy(container)
    expect(text).not.toContain(';')
    expect(text).not.toMatch(/\bclosers?\b/i)
    expect(text).not.toMatch(/\bfirst meetings?\b/i)
    expect(text).not.toMatch(/\bsales appointments?\b/i)
    expect(text).not.toMatch(/\bbooked\b/i)
    expect(container.textContent).not.toContain('$500')
    expect(String(metadata.description)).not.toMatch(/first[- ]meeting|booked/i)
  })
})
