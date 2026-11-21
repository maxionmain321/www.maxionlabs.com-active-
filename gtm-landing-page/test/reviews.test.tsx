import { describe, it, expect } from 'vitest'
import { PRICE_FLEX_LINE, PRICE_STANDARD_LINE } from '@/lib/pricing-copy'
import { render } from '@testing-library/react'
import Page from '@/app/reviews/page'
import sitemap from '@/app/sitemap'
import { HomeFooter } from '@/components/home/HomeFooter'
import { PAGE, ANSWER, QUOTES, FAQ, PRICE_LINE } from '@/content/reviews'
import { PROFILES } from '@/content/profiles'
import { CASE_STUDIES } from '@/content/case-studies'
import { assertCleanCopy, assertOwnerLanguage, LABEL_OPENER } from './helpers/copy-guards'

const PROFILE_URLS = [
  'https://clutch.co/profile/maxionlabs',
  'https://www.g2.com/products/maxionlabs/reviews',
  'https://www.crunchbase.com/organization/maxionlabs',
  'https://www.sortlist.com/agency/maxionlabs',
]

function renderPage() {
  const { container } = render(<Page />)
  return { container, text: container.textContent ?? '', mainText: container.querySelector('main')?.textContent ?? '', markup: container.innerHTML }
}

function graph(container: Element) {
  return [...container.querySelectorAll('script[type="application/ld+json"]')].flatMap((s) => {
    const g = JSON.parse(s.textContent ?? '{}')
    return (g['@graph'] as Record<string, unknown>[]) ?? [g]
  })
}

describe('/reviews: a direct, checkable answer to "Maxionlabs reviews" and "is Maxionlabs legit"', () => {
  it('registers the route and lands in the sitemap', () => {
    expect(PAGE.path).toBe('/reviews')
    expect(PAGE.title.length).toBeLessThanOrEqual(60)
    expect(PAGE.description.length).toBeLessThanOrEqual(160)
    expect(sitemap().map((s) => s.url)).toContain('https://www.maxionlabs.com/reviews')
  })

  it('opens with the one-sentence answer line right under the single h1', () => {
    const { container } = renderPage()
    expect(container.querySelectorAll('h1')).toHaveLength(1)
    expect(container.querySelector('h1')?.textContent).toBe('Maxionlabs reviews')
    const first = container.querySelector('main h1')!.nextElementSibling
    expect(first?.tagName).toBe('P')
    expect(first?.textContent).toBe(ANSWER)
    expect(ANSWER.split(/(?<=\.)\s+/)).toHaveLength(1)
    for (const site of ['Clutch', 'G2', 'Crunchbase', 'Sortlist']) expect(ANSWER).toContain(site)
  })

  it('links all four third-party profiles', () => {
    const { container } = renderPage()
    for (const u of PROFILE_URLS) expect(container.querySelector(`main a[href="${u}"]`), u).not.toBeNull()
    expect(PROFILES.map((p) => p.url)).toEqual(PROFILE_URLS)
  })

  it('says plainly that the first Clutch reviews are being collected, and shows no rating, stars or review schema', () => {
    const { mainText, markup, container } = renderPage()
    expect(mainText).toContain('The first Clutch reviews are being collected now')
    expect(mainText).not.toMatch(/\d(\.\d)?\s*(out of|\/)\s*5|stars?\b|★/i)
    expect(markup).not.toContain('AggregateRating')
    expect(graph(container).some((n) => n['@type'] === 'Review')).toBe(false)
  })

  it('quotes only the cleared testimonials, verbatim, with the same attribution the case pages show', () => {
    const { container } = renderPage()
    const cards = [...container.querySelectorAll('[data-testid="review-card"]')]
    expect(cards).toHaveLength(QUOTES.length)
    const withQuote = CASE_STUDIES.filter((c) => c.testimonial)
    expect(QUOTES).toHaveLength(withQuote.length + 1)
    for (const c of withQuote) {
      const q = QUOTES.find((x) => x.quote === c.testimonial!.quote)
      expect(q, c.slug).toBeDefined()
      expect(q!.who).toBe(c.testimonial!.name)
      expect(q!.role).toBe(c.testimonial!.role)
      expect(q!.said).toBe(c.testimonial!.said)
    }
    const text = container.textContent ?? ''
    // Cleared by Max 2026-11-21, shown exactly as on the case pages.
    expect(text).toContain('Ivan Ivankovic, CEO, EU tender procurement software')
    expect(text).toContain('Conor, Founder, online reputation services')
    expect(text).not.toMatch(/Conor [A-Z]/)
    // The uncleared construction client stays unnamed.
    expect(text).toContain('The client, Construction software company, name confidential')
    expect(text).toContain('I saw a return on the investment that we made in you pretty quickly.')
  })

  it('the FAQ count of named clients and videos matches the cards', () => {
    const named = QUOTES.filter((q) => q.who !== 'The client')
    expect(named).toHaveLength(6)
    expect(named.filter((q) => q.url)).toHaveLength(4)
    expect(FAQ[0].a).toContain('six clients put their names to the testimonials on this page, four of them on video')
  })

  it('answers the four skeptic questions, with the dated price line, and carries FAQPage JSON-LD', () => {
    const { container } = renderPage()
    expect(FAQ.map((f) => f.q)).toEqual([
      'Is Maxionlabs legit?',
      'Where can I see independent reviews of Maxionlabs?',
      'Who runs Maxionlabs?',
      'How do you get paid?',
    ])
    expect(PRICE_LINE).toBe(`${PRICE_STANDARD_LINE} ${PRICE_FLEX_LINE}`)
    expect(FAQ[3].a).toContain(PRICE_LINE)
    expect(FAQ[0].a).toContain('no connection to Maxion Research')
    const faq = graph(container).find((n) => n['@type'] === 'FAQPage') as { mainEntity: unknown[] }
    expect(faq.mainEntity).toHaveLength(4)
  })

  it('passes the copy guards: no forbidden words, dashes, semicolons or label openers', () => {
    const { text, markup, mainText, container } = renderPage()
    expect(() => assertCleanCopy(text, markup)).not.toThrow()
    expect(() => assertOwnerLanguage(text)).not.toThrow()
    expect(mainText).not.toContain(';')
    for (const w of [/\bclosers?\b(?!\s+(to|look|than)\b)/i, /first meetings?/i, /sales appointments?/i, /\bbooked\b/i, /\$500\b/]) {
      expect(mainText).not.toMatch(w)
    }
    const offenders = [...container.querySelectorAll('article p, article li, [data-testid="faq-item"] dd')]
      .filter((n) => !n.closest('#sources'))
      .map((n) => (n.textContent ?? '').trim())
      .filter((t) => LABEL_OPENER.test(t))
    expect(offenders).toEqual([])
  })

  it('keeps location words out of the body; the footer carries the entity line', () => {
    const { mainText, text } = renderPage()
    for (const w of ['Ukraine', 'Kiev', 'Kyiv', 'Alicante', 'Spain', 'Benidorm']) expect(mainText).not.toContain(w)
    expect(text).toContain('Registered in Ukraine, Vinytska 15, Kiev, 08130. Payments processed through Stripe.')
  })

  it('is linked from the shared footer', () => {
    const { container } = render(<HomeFooter />)
    expect(container.querySelector('a[href="/reviews"]')).not.toBeNull()
  })
})
