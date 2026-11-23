import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import Page from '@/app/insurance-agency-valuation/page'

function text() {
  const { container } = render(<Page />)
  const sec = container.querySelector('section#value-calculator')
  return { sec, t: sec?.textContent ?? '', all: container.querySelector('article')?.textContent ?? '' }
}

describe('valuation page calculator', () => {
  it('has the calculator section with the heading', () => {
    const { sec } = text()
    expect(sec?.querySelector('h2')?.textContent).toBe("What a year of new commercial business adds to your agency's value")
  })
  it('shows the worked example with its arithmetic as text (no JS needed)', () => {
    const { t } = text()
    for (const s of ['$3,000,000', '27%', '$810,000', '$6,750', '8.5', '$57,375', '8 accounts', '$25,000']) expect(t).toContain(s)
    expect(t).toMatch(/\$25,000 x 27% = \$6,750/)
    expect(t).toMatch(/\$6,750 x 8\.5 = \$57,375/)
    expect(t).toMatch(/one more turn/i)
  })
  it('labels defaults with sources and states the limits', () => {
    const { t } = text()
    expect(t).toMatch(/IA Valuations/)
    expect(t).toMatch(/estimate, not an appraisal/i)
    expect(t).toMatch(/not an M&A advisor/i)
  })
  it('has labelled inputs and a multiple selector', () => {
    const { sec } = text()
    expect(sec?.querySelectorAll('input').length).toBe(4)
    expect(sec?.querySelectorAll('select').length).toBe(1)
  })
  it('never quotes 4,725, no dashes', () => {
    const { all } = text()
    expect(all).not.toMatch(/4,725|4725|—|–/)
  })
})
