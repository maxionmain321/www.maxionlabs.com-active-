import { describe, it, expect } from 'vitest'
import { PRICE_FLEX_LINE } from '@/lib/pricing-copy'
import { render } from '@testing-library/react'
import Page from '@/app/about/page'
import { PAGE, UPDATED, UPDATED_LABEL, RESULTS, KNOWS_ABOUT } from '@/content/about'
import { assertCleanCopy, assertOwnerLanguage, LABEL_OPENER } from './helpers/copy-guards'

const ROUTE = '/about'
const LINKEDIN = 'https://www.linkedin.com/in/maxpidvalnyi'
const ORG_ID = 'https://www.maxionlabs.com/#org'
const PERSON_ID = 'https://www.maxionlabs.com/about#max'

/**
 * Every number allowed in the body, each with its source. A number not on this list fails the page, so a new
 * figure needs its QUOTABLE row in OPS funnel-tracker.md (or its offer-v3.md line) before it can ship.
 */
const ALLOWED_NUMBERS: Record<string, string> = {
  // offer-v3.md CURRENT INSURANCE OFFER
  '4,725': 'price per month',
  '15': 'qualified meetings a month from month two',
  '12': 'month one',
  '315': 'credit per meeting short',
  '7': 'Slipstream guaranteed count',
  '3': 'months, renewal window in the qualified definition',
  '20': 'minute call; also $20K contract ceiling',
  '2026': 'dates; also founding month (Verify us block, February 2026)',
  '2': 'the G2 review site name in the Verify us profile row',
  // funnel-tracker.md QUOTABLE rows
  '358': 'All clients, aggregate (Mar-Nov 2026)',
  '1': 'All clients, pipeline value $1.54M (2026), funnel-tracker QUOTABLE 2026-11-16',
  '54': 'All clients, pipeline value $1.54M (2026), funnel-tracker QUOTABLE 2026-11-16',
  '37': 'Construction software: sales-qualified demos',
  '6': 'Construction software: annual contracts',
  '7K': 'Construction software: contract floor',
  '20K': 'Construction software: contract ceiling',
  '19': 'EU tender: qualified meetings held in one month',
  '13': 'Slipstream: demos set in 24 days',
  '24': 'Slipstream: days',
  '5': 'Slipstream: held',
  '4': 'Slipstream: moved to a next step',
}

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

function jsonLdNodes(container: Element) {
  const scripts = [...container.querySelectorAll('script[type="application/ld+json"]')]
  const graphs = scripts.map((s) => JSON.parse(s.textContent ?? '{}'))
  return graphs.flatMap((g) => (g['@graph'] as Record<string, unknown>[]) ?? [g])
}

describe('about page: a real, checkable person and company behind the site', () => {
  it('shows the Verify us facts: founder, founded February 2026, based in Madrid, Spain, and all four profiles', async () => {
    const { container } = renderPage()
    const verify = container.querySelector('main [data-testid="about-verify"]')!
    expect(verify).not.toBeNull()
    const t = verify.textContent ?? ''
    expect(t).toContain('Maksym (Max) Pidvalnyi')
    expect(t).toContain('February 2026')
    expect(t).toContain('Madrid, Spain')
    expect(t).not.toContain('Registered in Ukraine')
    for (const host of ['clutch.co/profile/maxionlabs', 'g2.com/products/maxionlabs', 'crunchbase.com/organization/maxionlabs', 'sortlist.com/agency/maxionlabs']) {
      expect(verify.querySelector(`a[href*="${host}"]`), host).not.toBeNull()
    }
    expect(verify.querySelector('a[href="/reviews"]')).not.toBeNull()
    expect(container.querySelector('main')?.textContent).toContain('Maxionlabs has no connection to Maxion Research')
  })

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

  it('opens with the answer paragraph: what, who runs it, who it is for, what it costs, dated', () => {
    const { container } = renderPage()
    const answer = container.querySelector('main [data-testid="about-answer"]')?.textContent ?? ''
    // It is the first paragraph a reader meets after the h1 (the eyebrow above the h1 is the only earlier <p>).
    const h1 = container.querySelector('main h1')!
    const firstP = h1.nextElementSibling
    expect(firstP?.tagName).toBe('P')
    expect(firstP?.textContent).toBe(answer)
    expect(answer).toMatch(/^Maxionlabs is an outsourced outbound agency/)
    expect(answer).toContain('Max Pidvalnyi founded it and runs it')
    expect(answer).toContain('commercial P&C and employee benefits agencies')
    // MAX-738: no fixed package outside /pricing, the flexible line instead.
    expect(answer).toContain(PRICE_FLEX_LINE)
    expect(answer).not.toContain('4,725')
    expect(answer).toContain(`Updated ${UPDATED_LABEL}`)
    expect(UPDATED_LABEL).toBe('November 2026')
    expect(UPDATED.startsWith('2026-11')).toBe(true)
  })

  it('names Max Pidvalnyi in the body and links his LinkedIn profile from the body', () => {
    const { container, mainText } = renderPage()
    expect(mainText).toContain('Max Pidvalnyi')
    expect(container.querySelector(`main a[href="${LINKEDIN}"]`)).not.toBeNull()
  })

  it('renders JSON-LD: Organization, its founder Person, and a dated AboutPage, all cross-linked by @id', () => {
    const { container } = renderPage()
    const nodes = jsonLdNodes(container)
    const org = nodes.find((n) => n['@type'] === 'Organization')
    const person = nodes.find((n) => n['@type'] === 'Person')
    const page = nodes.find((n) => n['@type'] === 'AboutPage')
    expect(org).toBeDefined()
    expect(person).toBeDefined()
    expect(page).toBeDefined()

    // Organization: the same @id as the root layout's node so the two merge into one entity.
    expect(org!['@id']).toBe(ORG_ID)
    expect(org!.name).toBe('Maxionlabs')
    expect(org!.url).toBe('https://www.maxionlabs.com')
    expect(org!.email).toBe('maksym@maxionlabs.com')
    expect(String(org!.description)).toMatch(/commercial P&C and employee benefits agencies/)
    const founder = org!.founder as Record<string, unknown>
    expect(founder['@type']).toBe('Person')
    expect(founder['@id']).toBe(PERSON_ID)
    expect(founder.name).toBe('Max Pidvalnyi')
    expect(org!.knowsAbout).toEqual(KNOWS_ABOUT)
    expect(org!.sameAs).toEqual([
      'https://clutch.co/profile/maxionlabs',
      'https://www.g2.com/products/maxionlabs/reviews',
      'https://www.crunchbase.com/organization/maxionlabs',
      'https://www.sortlist.com/agency/maxionlabs',
    ])
    expect(org!.foundingDate).toBe('2026-02')
    expect(org!.address).toEqual({ '@type': 'PostalAddress', addressLocality: 'Madrid', addressCountry: 'ES' })

    // Person: exact founder spelling, LinkedIn only in sameAs (the one profile the site links).
    expect(person!['@id']).toBe(PERSON_ID)
    expect(person!.name).toBe('Max Pidvalnyi')
    expect(person!.jobTitle).toBe('Founder')
    expect(person!.url).toBe('https://www.maxionlabs.com/about')
    expect(person!.sameAs).toEqual([LINKEDIN])
    expect((person!.worksFor as Record<string, unknown>)['@id']).toBe(ORG_ID)
    expect((person!.worksFor as Record<string, unknown>).name).toBe('Maxionlabs')
    expect(person!.knowsAbout).toEqual(KNOWS_ABOUT)
    expect(KNOWS_ABOUT.length).toBeGreaterThanOrEqual(3)

    // AboutPage: dated, about the org, the person as main entity.
    expect(page!.url).toBe('https://www.maxionlabs.com/about')
    expect(page!.dateModified).toBe(UPDATED)
    expect((page!.about as Record<string, unknown>)['@id']).toBe(ORG_ID)
    expect((page!.mainEntity as Record<string, unknown>)['@id']).toBe(PERSON_ID)

    // The only location in the structured data is the Organization address, Madrid ES (Max, 2026-11-21).
    const blob = JSON.stringify(nodes)
    for (const w of ['Ukraine', 'Kiev', 'Kyiv', 'Alicante', 'Spain']) expect(blob).not.toContain(w)
    expect(JSON.stringify(nodes.filter((n) => n !== org))).not.toContain('Madrid')
  })

  it('passes the shared copy guards: no client names, retired terms or dashes', () => {
    const { text, markup } = renderPage()
    expect(() => assertCleanCopy(text, markup)).not.toThrow()
  })

  it('uses owner words on the whole page and opens no paragraph with a label and a colon', () => {
    const { container, text } = renderPage()
    expect(() => assertOwnerLanguage(text)).not.toThrow()
    const nodes = [...container.querySelectorAll('main p, main li')]
    const offenders = nodes.map((n) => (n.textContent ?? '').trim()).filter((t) => LABEL_OPENER.test(t))
    expect(offenders).toEqual([])
  })

  it('has no colon setups, no "not X, it\'s Y" pairs and no semicolons in the body', () => {
    const { mainText } = renderPage()
    // The canonical plan line (lib/pricing-copy.ts) is the one allowed colon.
    expect(mainText.split(PRICE_FLEX_LINE).join('')).not.toContain(':')
    expect(mainText).not.toContain(';')
    expect(mainText).not.toMatch(/\bnot\b[^.]{1,60},\s*(it|that|this)(’|')s\b/i)
  })

  it('shows only numbers that trace to a QUOTABLE funnel-tracker row or the current offer', () => {
    const { mainText } = renderPage()
    const found = [...mainText.matchAll(/\$?\d(?:[\d,]*\d)?K?/g)].map((m) => m[0].replace(/^\$/, ''))
    const unknown = [...new Set(found)].filter((n) => !(n in ALLOWED_NUMBERS))
    expect(unknown, `numbers on /about with no source row: ${unknown.join(', ')}`).toEqual([])
  })

  it('states each result with the row wording: held only where the row says held, set where it says booked', () => {
    const byCase = Object.fromEntries(RESULTS.map((r) => [r.case, r.result]))
    expect(byCase['Construction software selling to contractors']).toBe(
      '37 sales-qualified demos, 6 annual contracts signed at $7K to $20K a year each.',
    )
    expect(byCase['EU tender procurement software']).toBe('19 qualified meetings held in one month.')
    expect(byCase['Slipstream Engineering, an early-stage AI product (Mars Xiang)']).toBe(
      '13 demos set in 24 days, 7 of them guaranteed. 5 held, 4 moved to a next step.',
    )
    expect(RESULTS).toHaveLength(3)
    for (const r of RESULTS) expect(r.result).not.toMatch(/\bbooked\b/i)
    const { mainText } = renderPage()
    expect(mainText).toContain('358 sales meetings set for our clients since March 2026')
    expect(mainText).not.toMatch(/\bbooked\b/i)
    expect(mainText).toContain('$1.54M in pipeline value')
    expect(mainText).toContain('Maxionlabs has no connection to Maxion Research')
    expect(mainText).toMatch(/pipeline, not revenue/)
  })

  it('keeps every location word out of the body except "Madrid, Spain" in Verify us; the footer legal line is the only other place', () => {
    const { container, mainText, text } = renderPage()
    for (const w of ['Ukraine', 'Kiev', 'Kyiv', 'Alicante']) {
      expect(mainText).not.toContain(w)
    }
    const main = container.querySelector('main')!.cloneNode(true) as Element
    const verify = main.querySelector('[data-testid="about-verify"]')!
    expect(verify.textContent).toContain('Madrid, Spain')
    verify.remove()
    for (const w of ['Spain', 'Madrid']) {
      expect(main.textContent ?? '').not.toContain(w)
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
  })
})
