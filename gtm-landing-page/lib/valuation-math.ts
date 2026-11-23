/**
 * Arithmetic for the calculator on /insurance-agency-valuation (MAX-738). Every default is a figure already cited on
 * that page: about 27% EBITDA margin and about 8.5x average (IA Valuations, Valuation Views 2026 Q1), 6x to 9x small to
 * midsized generalist and 10x to 13x larger commercial lines metro agencies (IA Magazine, 11 Mar 2026). The $3M, 8
 * accounts and $25,000 are the page's own illustration, not a market figure.
 */

export type ValuationInput = {
  revenue: number
  accounts: number
  commissionPerAccount: number
  marginPct: number
  multiple: number
}

export const DEFAULTS: ValuationInput = {
  revenue: 3_000_000,
  accounts: 8,
  commissionPerAccount: 3125,
  marginPct: 27,
  multiple: 8.5,
}

export const MULTIPLES: { value: number; label: string }[] = [
  { value: 6, label: '6x, low end, small to midsized generalist' },
  { value: 8.5, label: '8.5x, average' },
  { value: 9, label: '9x, high end, small to midsized generalist' },
  { value: 10, label: '10x, low end, larger commercial lines metro' },
  { value: 13, label: '13x, high end, larger commercial lines metro' },
]

const clean = (n: number) => (Number.isFinite(n) && n > 0 ? n : 0)
const cents = (n: number) => Math.round(n * 100) / 100

export function valuationAdd(i: ValuationInput) {
  const revenue = clean(i.revenue)
  const margin = clean(i.marginPct) / 100
  const multiple = clean(i.multiple)
  const newCommission = cents(clean(i.accounts) * clean(i.commissionPerAccount))
  const currentEbitda = cents(revenue * margin)
  const addedEarnings = cents(newCommission * margin)
  return {
    newCommission,
    currentEbitda,
    currentValue: cents(currentEbitda * multiple),
    addedEarnings,
    addedValue: cents(addedEarnings * multiple),
    oneTurn: currentEbitda,
  }
}

export function usd(n: number): string {
  return `$${Math.round(n).toLocaleString('en-US')}`
}
