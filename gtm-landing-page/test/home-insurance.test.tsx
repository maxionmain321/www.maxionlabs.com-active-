import { describe, it, expect, vi } from 'vitest'
import { render } from '@testing-library/react'
import Home from '@/app/page'

// The cal.com embed is a client-only widget. Mock it so the server-rendered copy is what we test.
vi.mock('@calcom/embed-react', () => ({
  default: () => <div data-testid="cal-embed" />,
  getCalApi: vi.fn().mockResolvedValue(vi.fn()),
}))

function renderHome() {
  const { container } = render(<Home />)
  const main = container.querySelector('main')
  return {
    text: container.textContent ?? '',
    mainText: main?.textContent ?? '',
    markup: container.innerHTML,
    container,
  }
}

const words = (s: string) => s.split(/\s+/).filter(Boolean).length

describe('Homepage v2, the short insurance page', () => {
  it('publishes the current insurance offer numbers', () => {
    const { text } = renderHome()
    expect(text).toContain('4,725')
    expect(text).toContain('315')
    expect(text).toContain('7-day')
    expect(text).toContain('Territory lock')
    expect(text).toContain('12,500')
  })

  it('is short: the main copy stays under 900 words', () => {
    const { mainText } = renderHome()
    expect(words(mainText)).toBeLessThan(900)
  })

  it('has exactly one h1, and it names the outbound seat and first meetings', () => {
    const { container } = renderHome()
    const h1s = container.querySelectorAll('h1')
    expect(h1s).toHaveLength(1)
    expect(h1s[0].textContent ?? '').toMatch(/outbound seat/i)
    expect(h1s[0].textContent ?? '').toMatch(/first meetings/i)
  })

  it('puts the risk reversal in the hero, next to the main CTA', () => {
    const { container } = renderHome()
    const hero = container.querySelector('[data-testid="hero-section"]')
    expect(hero).not.toBeNull()
    const t = hero?.textContent ?? ''
    expect(t).toContain('7-day')
    expect(t).toContain('315')
    expect(t).toMatch(/month to month/i)
    expect(t).toMatch(/territory lock/i)
    expect(hero?.querySelector('a[href="#book-call"]')).not.toBeNull()
  })

  it('repeats the risk reversal beside the booking embed, including the market count they keep', () => {
    const { container } = renderHome()
    const book = container.querySelector('#book-call')
    expect(book).not.toBeNull()
    const t = book?.textContent ?? ''
    expect(t).toMatch(/whether or not you buy/i)
    expect(t).toContain('7-day')
    expect(book?.querySelector('[data-testid="cal-embed"]')).not.toBeNull()
  })

  it('volunteers no risk signals in the body', () => {
    const { mainText } = renderHome()
    for (const banned of [
      'Ukraine',
      'registered in',
      'newest market',
      'not yet',
      'pay on close',
      'pay-on-close',
      'free first',
      'too early',
    ]) {
      expect(mainText.toLowerCase()).not.toContain(banned.toLowerCase())
    }
  })

  it('never uses the burn words in our own voice', () => {
    const { mainText } = renderHome()
    expect(mainText).not.toMatch(/\bleads?\b/i)
    expect(mainText).not.toMatch(/appointment setting/i)
    expect(mainText).not.toMatch(/telemarket/i)
  })

  it('carries none of the retired offer terms, the old pitch, or an em dash', () => {
    const { text, markup } = renderHome()
    for (const banned of ['Step-down', 'win-back', 'Cross-sell', '$500', 'pay per meeting', 'trades, insurance and lending']) {
      expect(text.toLowerCase()).not.toContain(banned.toLowerCase())
    }
    expect(markup).not.toContain(String.fromCharCode(0x2014))
  })

  it('has the four-link nav and its anchors; no FAQ', () => {
    const { container } = renderHome()
    const links = [...container.querySelectorAll('[data-testid="nav-link"]')].map((a) => a.textContent)
    expect(links).toEqual(['Results', 'Unique Methodology', "Who it's for", 'Pricing'])
    for (const href of ['#results', '#method', '#fit', '#price']) {
      expect(container.querySelector(href)).not.toBeNull()
    }
    expect(container.querySelector('#faq')).toBeNull()
    expect(container.querySelectorAll('[data-testid="faq-item"]')).toHaveLength(0)
  })

  it('says plainly what we are not, without the word leads', () => {
    const { container } = renderHome()
    const notUs = container.querySelector('[data-testid="what-we-are-not"]')
    expect(notUs).not.toBeNull()
    const t = notUs?.textContent ?? ''
    expect(t).toMatch(/names to dial/i)
    expect(t).toMatch(/domains with your agency/i)
    expect(t).not.toMatch(/\blead/i)
  })

  it('shows peer proof: four clients on camera, strongest outcome first, Conor with no surname', () => {
    const { container, text } = renderHome()
    const cards = container.querySelectorAll('[data-testid="on-camera"]')
    expect(cards).toHaveLength(4)
    expect(cards[0].textContent ?? '').toContain('$73,300')
    expect(text).toContain('Conor')
    expect(text).not.toMatch(/Conor [A-Z][a-z]+/)
    // No case strip and no proof tiles: the on-camera row is the whole results section.
    expect(container.querySelectorAll('[data-testid="case-card"]')).toHaveLength(0)
    expect(container.querySelectorAll('[data-testid="proof-tile"]')).toHaveLength(0)
  })

  it('tells the method in three steps, with the qualified test and a redacted real brief', () => {
    const { container, text } = renderHome()
    expect(container.querySelectorAll('[data-testid="method-step"]')).toHaveLength(3)
    expect(container.querySelectorAll('[data-testid="qualified-item"]')).toHaveLength(4)
    const brief = container.querySelector('[data-testid="meeting-brief"]')
    expect(brief?.textContent ?? '').toMatch(/why they said yes/i)
    expect(brief?.querySelectorAll('[aria-label="redacted"]').length).toBeGreaterThan(0)
    expect(text).toMatch(/X-date timeline/)
    // The invented two-email illustration and the trigger table are gone.
    expect(container.querySelector('[data-testid="signal-email"]')).toBeNull()
    expect(container.querySelector('[data-testid="bought-list-email"]')).toBeNull()
    expect(text).not.toMatch(/Ridgeline/)
  })

  it('keeps the honest filter short and confident, solo agents first in the out column', () => {
    const { container, text } = renderHome()
    const forUs = container.querySelector('[data-testid="for-section"]')
    const notFor = container.querySelector('[data-testid="not-for-section"]')
    expect(forUs?.textContent ?? '').toMatch(/producers/i)
    expect(notFor?.textContent ?? '').toMatch(/^.*solo agents/i)
    expect(text).toMatch(/Honestly, some don't/)
    expect(words(notFor?.textContent ?? '')).toBeLessThan(60)
  })

  it('carries real buyer quotes, anonymized to role, line and state', () => {
    const { container, text } = renderHome()
    const quotes = container.querySelectorAll('[data-testid="buyer-quote"]')
    expect(quotes.length).toBeGreaterThanOrEqual(2)
    expect(text).toContain('if you just get us in the room')
    expect(text).toContain("If we were good at that, we wouldn't need to pay you to do it")
    for (const banned of ['Cosmo', 'Heritage', 'Pearsall', 'Stiltner', 'Herschlag', 'Gabbel', 'Strong Tower', 'Anisa Ahmed Cosmo']) {
      expect(text).not.toContain(banned)
    }
  })
})
