import { describe, it, expect, vi } from 'vitest'
import { render } from '@testing-library/react'
import Home from '@/app/page'
import { HERO_SUB } from '@/components/home/InsuranceHome'

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

  it('is short: the main copy stays under 1,700 words, proof captions included', () => {
    // v2 sat under 900 with four on-camera cards. v3 adds the magnitude row, two insurance receipts, two written
    // testimonials and six screenshot cards; the sections around them keep v2's length.
    const { mainText } = renderHome()
    expect(words(mainText)).toBeLessThan(1700)
  })

  it('has exactly one h1, framed in premium and renewal, the owner\'s own dashboard', () => {
    const { container } = renderHome()
    const h1s = container.querySelectorAll('h1')
    expect(h1s).toHaveLength(1)
    expect(h1s[0].textContent ?? '').toMatch(/in the room/i)
    expect(h1s[0].textContent ?? '').toContain('$25,000+')
    expect(h1s[0].textContent ?? '').toMatch(/20\+ enrolled lives/)
  })

  it('keeps price and terms out of the hero and shows the premium math, labelled as an example', () => {
    const { container } = renderHome()
    const hero = container.querySelector('[data-testid="hero-section"]')
    const t = hero?.textContent ?? ''
    expect(t).not.toContain('4,725')
    expect(t).not.toContain('315')
    const math = hero?.querySelector('[data-testid="premium-math"]')?.textContent ?? ''
    expect(math).toContain('$360K')
    expect(math).toMatch(/example/i)
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

  it('never uses the burn words in our own voice; the hero subhead names them only as what we replace', () => {
    const { mainText } = renderHome()
    expect(mainText).toContain(HERO_SUB)
    expect(HERO_SUB).toMatch(/^Without /)
    const ownVoice = mainText.replace(HERO_SUB, '')
    expect(ownVoice).not.toMatch(/\bleads?\b/i)
    expect(ownVoice).not.toMatch(/appointment setting/i)
    expect(ownVoice).not.toMatch(/telemarket/i)
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

/**
 * v3: the proof build. Hero magnitude row (four dark tiles, each a row-by-row sum of QUOTABLE rows in
 * funnel-tracker.md), the "See the results" link, a results section of many specific proof cards, and the
 * booking section in the shape of the live www.maxionlabs.com FinalCTA.
 */
describe('Homepage v3, proof', () => {
  it('carries no cross-industry magnitude row under the hero until insurance numbers can fill it', () => {
    const { container } = renderHome()
    expect(container.querySelector('[data-testid="magnitude-row"]')).toBeNull()
  })

  it('has a "See the results" link in the hero pointing at #results', () => {
    const { container } = renderHome()
    const hero = container.querySelector('[data-testid="hero-section"]')
    const link = [...(hero?.querySelectorAll('a[href="#results"]') ?? [])].find((a) =>
      /see the results/i.test(a.textContent ?? ''),
    )
    expect(link).toBeTruthy()
  })

  it('shows Conor with an initial avatar, never a surname or a YouTube thumbnail', () => {
    const { container, text, markup } = renderHome()
    expect(text).toContain('Conor')
    expect(text).not.toMatch(/Conor [A-Z][a-z]+/)
    expect(text).not.toMatch(/Tregeagle|Connal/)
    expect(markup).not.toContain('img.youtube.com/vi/yMmsy7V3HoU')
    const conorCard = [...container.querySelectorAll('[data-testid="on-camera"]')].find((c) =>
      /Conor/.test(c.textContent ?? ''),
    )
    expect(conorCard).toBeTruthy()
    expect(conorCard?.querySelector('img')).toBeNull()
    expect(conorCard?.querySelector('[data-testid="initial-avatar"]')?.textContent).toBe('C')
  })

  it('carries at least eight specific proof cards in the results section, with screenshots', () => {
    const { container } = renderHome()
    const results = container.querySelector('#results')
    expect(results).not.toBeNull()
    const cards = results?.querySelectorAll('[data-testid="proof-card"]') ?? []
    expect(cards.length).toBeGreaterThanOrEqual(8)
    // Screenshots are the proof images that are not avatars; each carries alt text, so the claim reads without it.
    const shots = [...(results?.querySelectorAll('img[src^="/images/proof/"]') ?? [])].filter(
      (img) => !(img.getAttribute('src') ?? '').includes('avatar'),
    )
    expect(shots.length).toBeGreaterThanOrEqual(5)
    for (const img of shots) expect((img.getAttribute('alt') ?? '').length).toBeGreaterThan(10)
  })

  it('never shows an uncleared name or an insurance client on a proof surface', () => {
    const { container, markup } = renderHome()
    const results = container.querySelector('#results')
    const t = results?.textContent ?? ''
    for (const banned of ['Workyard', 'Tendify', 'BlueSteps', 'ReviewFix', 'Inframail', 'Soldevilla', 'Dewani', 'Badal', 'Vizion']) {
      expect(t).not.toContain(banned)
    }
    // Uncleared images stay off the page.
    for (const img of ['soldevilla-needham-yes', 'client-referral', 'day2-first-meeting', 'vp-yes-660-emails']) {
      expect(markup).not.toContain(img)
    }
  })

  it('on-camera cards carry no grey context line under the quote', () => {
    const { container } = renderHome()
    const cards = [...container.querySelectorAll('[data-testid="on-camera"]')]
    expect(cards).toHaveLength(4)
    for (const c of cards) {
      expect(c.querySelector('[data-testid="on-camera-context"]')).toBeNull()
      const t = c.textContent ?? ''
      expect(t).not.toMatch(/already in their ecosystem|engaged replies|withheld at his request|certificate program/i)
    }
  })

  it('leads the written cards with the owner metrics: Mars shows 4 of 5 held demos, Ivan shows 19 held, no reply or email counts', () => {
    const { container } = renderHome()
    const written = [...container.querySelectorAll('[data-testid="written-card"]')]
    expect(written).toHaveLength(2)
    const mars = written.find((c) => /Mars Xiang/.test(c.textContent ?? ''))
    const ivan = written.find((c) => /Ivan Ivankovic/.test(c.textContent ?? ''))
    expect(mars?.textContent ?? '').toContain('4 of 5')
    expect(mars?.textContent ?? '').toContain('13')
    expect(mars?.textContent ?? '').not.toMatch(/interested|19,467|emails/i)
    expect(ivan?.textContent ?? '').toContain('19')
    expect(ivan?.textContent ?? '').not.toMatch(/74\+|interested|65,622|emails/i)
    for (const c of written) expect(c.querySelector('[data-testid="written-note"]')).toBeNull()
  })

  it('drops the Receipts header and the CAC-math card, and carries at least two insurance email receipts first', () => {
    const { container, markup } = renderHome()
    const results = container.querySelector('#results')
    const t = results?.textContent ?? ''
    expect(t).not.toContain('Receipts')
    expect(t).not.toMatch(/own Slack, WhatsApp and portals/)
    expect(markup).not.toContain('workyard-cac-math')
    const emails = [...(results?.querySelectorAll('img[src^="/images/proof/insurance-email-"]') ?? [])]
    expect(emails.length).toBeGreaterThanOrEqual(2)
    // Insurance receipts come before any other screenshot.
    const shots = [...(results?.querySelectorAll('img[src^="/images/proof/"]') ?? [])]
      .map((img) => img.getAttribute('src') ?? '')
      .filter((s) => !s.includes('avatar'))
    const firstOther = shots.findIndex((s) => !s.includes('/insurance-'))
    const lastInsurance = shots.map((s) => s.includes('/insurance-')).lastIndexOf(true)
    expect(firstOther === -1 || lastInsurance < firstOther).toBe(true)
  })

  it('carries at least nine masked win screenshots in the receipts grid, none of them an uncleared asset', () => {
    const { container, markup } = renderHome()
    const grid = container.querySelector('[data-testid="receipts-grid"]')
    expect(grid).not.toBeNull()
    const cards = [...(grid?.querySelectorAll('[data-testid="proof-card"]') ?? [])]
    expect(cards.length).toBeGreaterThanOrEqual(9)
    for (const c of cards) {
      const img = c.querySelector('img[src^="/images/proof/"]')
      expect(img).not.toBeNull()
      expect((img?.getAttribute('alt') ?? '').length).toBeGreaterThan(10)
      // Image, then a short head quote, then a who line.
      expect((c.textContent ?? '').length).toBeGreaterThan(20)
    }
    for (const banned of [
      'workyard_2026-08-07_slack-masked-3',
      'client-referral',
      'day2-first-meeting',
      'soldevilla-needham-yes',
      'vp-yes-660-emails',
      'workyard-cac-math',
      'insurance-held-call-recap',
      'insurance-email-quote-all-benefits',
    ]) {
      expect(markup).not.toContain(banned)
    }
    // Client names and the de-named founder's surname never reach the grid, in text or alt.
    const t = (grid?.textContent ?? '') + cards.map((c) => c.querySelector('img')?.getAttribute('alt') ?? '').join(' ')
    for (const banned of ['Workyard', 'AESC', 'BlueSteps', 'ReviewFix', 'Tregeagle', 'Connal', 'Rashmi', 'Nic ', 'Christina']) {
      expect(t).not.toContain(banned)
    }
  })

  it('books in the shape of the live homepage: centred heading, Max byline, five steps, the embed, the email line', () => {
    const { container } = renderHome()
    const book = container.querySelector('#book-call')
    expect(book).not.toBeNull()
    expect(book?.querySelector('h2')?.textContent ?? '').toMatch(/book a 20 minute call/i)
    expect(book?.textContent ?? '').toMatch(/exactly what happens on the call/i)
    expect(book?.querySelectorAll('[data-testid="call-step"]')).toHaveLength(5)
    expect(book?.textContent ?? '').toMatch(/you'll book a call with me, max/i)
    expect(book?.querySelector('[data-testid="cal-embed"]')).not.toBeNull()
    expect(book?.querySelector('a[href="mailto:maksym@maxionlabs.com"]')).not.toBeNull()
  })
})
