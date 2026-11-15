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
    expect(text).toMatch(/domains with my agency/i)
  })
})
