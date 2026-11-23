'use client'

import { useState } from 'react'
import { DEFAULTS, MULTIPLES, valuationAdd, usd, type ValuationInput } from '@/lib/valuation-math'
import { LINE, MUTED, INK } from '@/components/home/InsuranceHome'

/**
 * Server-rendered with the defaults, so the worked example is in the HTML for crawlers and readers without JS.
 * Hydration only adds the live recalculation. No analytics event: lib/analytics.ts has no generic event helper.
 */
const FIELD = `mt-1 w-full rounded-card border ${LINE} bg-white px-3 py-2 text-base ${INK}`

const num = (s: string) => (s.trim() === '' ? NaN : Number(s.replace(/,/g, '')))

export function ValuationCalculator() {
  const [v, setV] = useState<ValuationInput>(DEFAULTS)
  const set = (k: keyof ValuationInput) => (e: { target: { value: string } }) => setV((p) => ({ ...p, [k]: num(e.target.value) }))
  const r = valuationAdd(v)
  const accounts = Math.max(0, Number.isFinite(v.accounts) ? v.accounts : 0)

  return (
    <div className="flex flex-col gap-4">
      <form className="grid gap-4 sm:grid-cols-2" onSubmit={(e) => e.preventDefault()}>
        <label className="text-sm">
          Annual revenue of your agency ($)
          <input className={FIELD} inputMode="numeric" defaultValue={DEFAULTS.revenue} onChange={set('revenue')} />
        </label>
        <label className="text-sm">
          New accounts won in a year
          <input className={FIELD} inputMode="numeric" defaultValue={DEFAULTS.accounts} onChange={set('accounts')} />
        </label>
        <label className="text-sm">
          Average commission per account ($ a year)
          <input className={FIELD} inputMode="numeric" defaultValue={DEFAULTS.commissionPerAccount} onChange={set('commissionPerAccount')} />
        </label>
        <label className="text-sm">
          EBITDA margin (%)
          <input className={FIELD} inputMode="decimal" defaultValue={DEFAULTS.marginPct} onChange={set('marginPct')} />
        </label>
        <label className="text-sm sm:col-span-2">
          Multiple
          <select className={FIELD} defaultValue={DEFAULTS.multiple} onChange={set('multiple')}>
            {MULTIPLES.map((m) => (
              <option key={m.value} value={m.value}>
                {m.label}
              </option>
            ))}
          </select>
        </label>
      </form>

      <div aria-live="polite" className={`rounded-card border ${LINE} bg-white p-5 flex flex-col gap-3`}>
        <p>
          Your EBITDA is {usd(v.revenue || 0)} x {v.marginPct || 0}% = {usd(r.currentEbitda)}.
        </p>
        <p>
          {accounts} accounts and {usd(r.newCommission)} of new commission a year. {usd(r.newCommission)} x{' '}
          {v.marginPct || 0}% = {usd(r.addedEarnings)} of earnings. {usd(r.addedEarnings)} x {v.multiple || 0} ={' '}
          {usd(r.addedValue)} of added value.
        </p>
        <p>
          One more turn of the multiple on your {usd(r.currentEbitda)} of EBITDA is {usd(r.oneTurn)}.
        </p>
      </div>

      <p className={`text-sm ${MUTED} leading-relaxed`}>
        Where the defaults come from. The 27% margin and the 8.5x average are IA Valuations, Valuation Views 2026 Q1. 6x
        to 9x for small to midsized generalist agencies and 10x to 13x for larger commercial lines agencies in major
        metros are IA Valuations as reported by IA Magazine, 11 Mar 2026. The $3,000,000, the 8 accounts and the $25,000
        are our own example, not a market figure. Change them to yours. It is an estimate, not an appraisal, and we are
        not an M&amp;A advisor. Real accounts cost producer pay and service, so their margin is usually lower than the
        average.
      </p>
    </div>
  )
}
