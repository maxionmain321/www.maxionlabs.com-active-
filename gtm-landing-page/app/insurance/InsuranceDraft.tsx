'use client'

import { useEffect, useRef, useState } from 'react'
import { ATTRIBUTION_STORAGE_KEY, captureAttribution, preserveAttribution, bookingUrl, type AttributionLedger } from '@/lib/insurance-attribution'

/** Local draft. Copy and calendar/intake changes require review before publication. */
export default function InsurancePage() {
  const ledgerRef = useRef<AttributionLedger | null>(null)
  const [calendar, setCalendar] = useState<string | null>(null)
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(ATTRIBUTION_STORAGE_KEY)
      let previous: AttributionLedger | null = null
      if (raw) {
        const value = JSON.parse(raw)
        if (value?.first && Array.isArray(value.touches)) {
          // Revalidate storage with the same URL allowlist as new observations.
          const u = new URL('https://local/insurance')
          if (value.first.channel) u.searchParams.set('utm_source', value.first.channel)
          if (value.first.sourceId) u.searchParams.set('utm_content', value.first.sourceId)
          u.searchParams.set('variant', value.first.variant)
          previous = { first: captureAttribution(u), touches: value.touches.slice(-29) }
        }
      }
      const ledger = preserveAttribution(previous, captureAttribution(new URL(window.location.href)), new Date().toISOString())
      ledgerRef.current = ledger
      window.localStorage.setItem(ATTRIBUTION_STORAGE_KEY, JSON.stringify(ledger))
    } catch { /* Booking remains available when browser storage is blocked. */ }
  }, [])
  function openCalendar() {
    const ledger = ledgerRef.current ?? preserveAttribution(null, captureAttribution(new URL(window.location.href)), new Date().toISOString())
    setCalendar(bookingUrl(ledger))
  }
  return (
    <main className="min-h-screen bg-white text-slate-950">
      <header className="mx-auto max-w-5xl px-6 py-7 border-b border-slate-200"><a href="/" className="text-xl font-semibold tracking-tight">Maxionlabs</a><span className="block sm:inline sm:ml-6 text-sm text-slate-500">Appointments for commercial insurance agencies</span></header>
      <div className="mx-auto max-w-5xl px-6 py-14 sm:py-20">
        <section className="max-w-3xl">
          <h1 className="text-4xl sm:text-6xl font-semibold leading-[1.08] tracking-tight">Meet business owners inside your carrier appetite.</h1>
          <p className="mt-6 text-xl leading-relaxed text-slate-600">We map your market, contact the owners and have our setter qualify the people who say yes. The appointments go on your calendar. They are never resold to another agency.</p>
          <div className="mt-8 border-l-4 border-indigo-600 pl-5">
            <p className="text-2xl font-semibold">From $3,400/month for 10 qualified appointments. Guaranteed.</p>
            <p className="mt-2 text-base font-medium">Month one: 5 appointments. Month two onward: 10. No-shows replaced.</p>
            <p className="mt-2 text-sm text-slate-600">Paid upfront monthly. Work starts on payment. Month to month.</p>
          </div>
          <button type="button" onClick={openCalendar} className="mt-8 rounded-md bg-indigo-600 px-7 py-4 text-white font-semibold hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-indigo-600">Book your intro call</button>
          <p className="mt-3 text-sm text-slate-500">We will look at your market and whether the numbers work for your agency.</p>
        </section>
        <section className="mt-14 border-t border-slate-200 pt-9 grid gap-9 sm:grid-cols-2">
          <div><h2 className="text-2xl font-semibold">What counts as qualified?</h2><p className="mt-4 leading-relaxed text-slate-600">In your territory and carrier appetite. Above the premium or group-size floor you set. A need now or within three months. We agree those rules before outreach begins.</p></div>
          <div><h2 className="text-2xl font-semibold">If we miss the guarantee</h2><p className="mt-4 leading-relaxed text-slate-600">For each appointment short of your monthly guarantee, you receive a $340 credit against the next month. Any unused credit is refunded if you cancel. We replace no-shows. We do not guarantee a quote, a bound policy or a sale.</p></div>
        </section>
        <section className="mt-12 border-t border-slate-200 pt-9"><h2 className="text-2xl font-semibold">Before and after the appointment</h2><p className="mt-4 max-w-3xl leading-relaxed text-slate-600">You get the mapped market as CSV files and a brief before each meeting: business and contact details, confirmed needs and renewal timing. Carrier details are included when known. We build your renewal calendar as dates are confirmed. Cross-sell and win-back campaigns are included when you supply the client lists and policy information.</p></section>
        <section className="mt-12 border-t border-slate-200 pt-9"><h2 className="text-2xl font-semibold">Evidence from other industries</h2><p className="mt-4 max-w-3xl leading-relaxed text-slate-600">For construction software selling to contractors: 26 sales-qualified demos and 6 annual contracts signed. This is cross-industry evidence, not an insurance result or a promise of your conversion rate.</p><a className="inline-block mt-4 text-indigo-700 underline underline-offset-4" href="/#client-wins">See client evidence</a><p className="mt-2 text-xs text-slate-500">Anonymized with permission. Proof registry verified September 30, 2026; corrected count confirmed October 1.</p></section>
        {calendar && <section aria-label="Booking" className="mt-12 border-t border-slate-200 pt-8"><h2 className="text-2xl font-semibold mb-4">Choose a time</h2><iframe title="Book your intro call" src={calendar} className="w-full min-h-[720px] border-0" /><a className="text-indigo-700 underline" href={calendar}>Open the calendar in a new page</a></section>}
      </div>
      <footer className="border-t border-slate-200 px-6 py-7 text-center text-sm text-slate-500">Maxionlabs · Commercial insurance appointment setting</footer>
    </main>
  )
}
