import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import Page from '@/app/about/page'
import { PAGE } from '@/content/about'
import { assertCleanCopy } from './helpers/copy-guards'

const ROUTE = '/about'
const LINKEDIN = 'https://www.linkedin.com/in/maxpidvalnyi'

function renderPage() {
  const { container } = render(<Page />)
  const main = container.querySelector('main')
  return {
    container,
    text: container.textContent ?? '',
    mainText: main?.textContent ?? '',
    markup: container.innerHTML,
  }
}

const words = (s: string) => s.split(/\s+/).filter(Boolean)

describe('about page: a real, checkable person and company behind the site', () => {
  it('registers the route with the about kind and a monthly change frequency', () => {
    expect(PAGE.path).toBe(ROUTE)
    expect(PAGE.kind).toBe('about')
    expect(PAGE.changeFrequency).toBe('monthly')
    expect(PAGE.title.length).toBeGreaterThan(10)
    expect(PAGE.title.length).toBeLessThan(60)
    expect(PAGE.description.length).toBeLessThan(160)
  })

  it('has exactly one h1', () => {
    const { container } = renderPage()
    expect(container.querySelectorAll('h1')).toHaveLength(1)
  })

  it('names Max Pidvalnyi in the body and links his LinkedIn profile from the body', () => {
    const { container, mainText } = renderPage()
    expect(mainText).toContain('Max Pidvalnyi')
    expect(container.querySelector(`main a[href="${LINKEDIN}"]`)).not.toBeNull()
  })

  it('renders JSON-LD with an Organization and a Person whose sameAs is the LinkedIn URL', () => {
    const { container } = renderPage()
    const scripts = [...container.querySelectorAll('script[type="application/ld+json"]')]
    expect(scripts.length).toBeGreaterThanOrEqual(1)
    const graphs = scripts.map((s) => JSON.parse(s.textContent ?? '{}'))
    const nodes = graphs.flatMap((g) => (g['@graph'] as Record<string, unknown>[]) ?? [g])
    const org = nodes.find((n) => n['@type'] === 'Organization')
    const person = nodes.find((n) => n['@type'] === 'Person')
    expect(org).toBeDefined()
    expect(person).toBeDefined()
    expect(org!.name).toBe('Maxionlabs')
    expect(org!.url).toBe('https://www.maxionlabs.com')
    expect(org!.email).toBe('maksym@maxionlabs.com')
    expect((org!.founder as Record<string, unknown>)['@type']).toBe('Person')
    expect(person!.name).toBe('Max Pidvalnyi')
    expect(person!.jobTitle).toBe('Founder')
    expect(person!.sameAs).toContain(LINKEDIN)
    expect((person!.worksFor as Record<string, unknown>).name).toBe('Maxionlabs')
  })

  it('passes the shared copy guards: no client names, retired terms or dashes', () => {
    const { text, markup } = renderPage()
    expect(() => assertCleanCopy(text, markup)).not.toThrow()
  })

  it('keeps every location word out of the body; the footer legal line is the only place for it', () => {
    const { mainText, text } = renderPage()
    for (const w of ['Ukraine', 'Kiev', 'Kyiv', 'Alicante', 'Spain']) {
      expect(mainText).not.toContain(w)
    }
    // The footer still carries the registered-entity line, byte for byte as HomeFooter renders it.
    expect(text).toContain('Registered in Ukraine, Vinytska 15, Kiev, 08130. Payments processed through Stripe.')
  })

  it('offers both ways to reach us: the booking section and the email', () => {
    const { container } = renderPage()
    expect(container.querySelector('a[href="/#book-call"]')).not.toBeNull()
    expect(container.querySelector('main a[href="mailto:maksym@maxionlabs.com"]')).not.toBeNull()
  })

  it('stays short and human: 400 to 800 words in the body', () => {
    const { mainText } = renderPage()
    const n = words(mainText).length
    expect(n).toBeGreaterThanOrEqual(400)
    expect(n).toBeLessThanOrEqual(800)
  })

  it('never implies cold calling or working X-dates, and never sells leads or appointment setting in our own voice', () => {
    const { mainText } = renderPage()
    expect(mainText).not.toMatch(/we (cold )?call (the|your|them|owners)/i)
    expect(mainText).not.toMatch(/x-date/i)
    expect(mainText).not.toMatch(/we (sell|deliver|book|provide|send) (you )?leads/i)
    expect(mainText).not.toMatch(/our (leads|appointment setting)/i)
    expect(mainText).not.toMatch(/appointment setting/i)
    expect(mainText).not.toContain(';')
  })
})
