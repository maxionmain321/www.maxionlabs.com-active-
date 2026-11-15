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
  return { text: container.textContent ?? '', markup: container.innerHTML, container }
}

describe('Homepage, commercial insurance first', () => {
  it('publishes the current insurance offer numbers', () => {
    const { text } = renderHome()
    expect(text).toContain('4,725')
    expect(text).toContain('315')
    expect(text).toContain('7-day')
    expect(text).toContain('Territory lock')
    expect(text).toContain('12,500')
  })

  it('names who it is not for, starting with solo agents', () => {
    const { container } = renderHome()
    const notFor = container.querySelector('[data-testid="not-for-section"]')
    expect(notFor).not.toBeNull()
    expect(notFor?.textContent ?? '').toMatch(/solo agents/i)
  })

  it('has exactly one h1', () => {
    const { container } = renderHome()
    expect(container.querySelectorAll('h1')).toHaveLength(1)
  })

  it('carries none of the retired offer terms or the old multi-vertical pitch', () => {
    const { text, markup } = renderHome()
    for (const banned of [
      'Step-down',
      'win-back',
      'Cross-sell',
      '$500',
      'pay per meeting',
      'trades, insurance and lending',
    ]) {
      expect(text.toLowerCase()).not.toContain(banned.toLowerCase())
    }
    expect(markup).not.toContain(String.fromCharCode(0x2014))
  })

  it('has a booking anchor the header and cold emails can point at', () => {
    const { container } = renderHome()
    expect(container.querySelector('#book-call')).not.toBeNull()
  })

  it('answers the sending-domain question with a plain no', () => {
    const { text } = renderHome()
    expect(text).toMatch(/domains with your agency/i)
  })

  it('says plainly what we are not', () => {
    const { container } = renderHome()
    const notUs = container.querySelector('[data-testid="what-we-are-not"]')
    expect(notUs?.textContent ?? '').toMatch(/not a lead list/i)
  })

  it('server-renders the illustration email with its footnoted public-record sources', () => {
    const { text, container } = renderHome()
    const example = container.querySelector('[data-testid="signal-email"]')
    expect(example).not.toBeNull()
    const exampleText = example?.textContent ?? ''
    expect(exampleText).toMatch(/illustration/i)
    expect(exampleText).toMatch(/FMCSA/)
    expect(exampleText).toMatch(/days old/i)
    // The bought-list version sits in the DOM too, so the comparison survives without JavaScript.
    expect(container.querySelector('[data-testid="bought-list-email"]')).not.toBeNull()
    expect(text).toMatch(/bought list/i)
  })

  it('renders the honest filter with both columns in the SSR text', () => {
    const { text } = renderHome()
    expect(text).toMatch(/Honestly not for others/)
    expect(text).toMatch(/This works if/i)
    expect(text).toMatch(/It doesn't if/i)
  })

  it('keeps every FAQ answer in the DOM, not behind a client toggle', () => {
    const { container } = renderHome()
    const faq = container.querySelectorAll('[data-testid="faq-item"]')
    expect(faq.length).toBeGreaterThanOrEqual(6)
    expect(faq[0].textContent ?? '').toMatch(/Max/)
  })
})
