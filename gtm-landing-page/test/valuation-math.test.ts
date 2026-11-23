import { describe, it, expect } from 'vitest'
import { valuationAdd, usd, DEFAULTS, MULTIPLES } from '@/lib/valuation-math'

describe('valuationAdd', () => {
  it('reproduces the worked example on the page', () => {
    const r = valuationAdd(DEFAULTS)
    expect(r.newCommission).toBe(25000)
    expect(r.currentEbitda).toBe(810000)
    expect(r.currentValue).toBe(6885000)
    expect(r.addedEarnings).toBe(6750)
    expect(r.addedValue).toBe(57375)
    expect(r.oneTurn).toBe(810000)
  })
  it('defaults use only sourced figures', () => {
    expect(DEFAULTS.marginPct).toBe(27)
    expect(DEFAULTS.multiple).toBe(8.5)
    expect(MULTIPLES.map((m) => m.value)).toEqual([6, 8.5, 9, 10, 13])
  })
  it('scales with the inputs', () => {
    const r = valuationAdd({ revenue: 1_000_000, accounts: 4, commissionPerAccount: 5000, marginPct: 20, multiple: 6 })
    expect(r.addedValue).toBe(24000)
    expect(r.oneTurn).toBe(200000)
  })
  it('treats bad input as zero', () => {
    const r = valuationAdd({ revenue: NaN, accounts: -3, commissionPerAccount: 5000, marginPct: 27, multiple: 8.5 })
    expect(r.addedValue).toBe(0)
    expect(r.oneTurn).toBe(0)
  })
  it('formats dollars', () => {
    expect(usd(57375)).toBe('$57,375')
  })
})
