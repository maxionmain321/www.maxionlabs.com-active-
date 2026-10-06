'use client'

import { useEffect, useRef, useState } from 'react'
import { ATTRIBUTION_STORAGE_KEY, captureAttribution, preserveAttribution, bookingUrl, type AttributionLedger } from '@/lib/insurance-attribution'

/** Approved commercial-insurance landing page. */
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
    <main className="min-h-screen bg-[#f5f7fb] text-[#12243b]">
      <header className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-6 py-6 sm:px-10">
        <a href="/" className="flex items-center gap-2.5 text-xl font-bold tracking-tight"><span aria-hidden className="h-3 w-3 rounded-sm bg-[#235be8]" />Maxionlabs</a>
        <span className="text-sm text-[#52647b]">Commercial insurance agencies</span>
      </header>
      <div className="mx-auto max-w-6xl px-6 pb-12 sm:px-10">
        <section className="grid items-center gap-8 py-9 sm:py-14 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
          <div>
            <h1 className="max-w-xl text-[42px] font-semibold leading-[1.05] tracking-[-0.045em] sm:text-[58px]">Meet business owners inside your appetite.</h1>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-[#52647b]">We find your market, contact the owners and have a human setter qualify and book the people who want to talk.</p>
            <div className="mt-7 flex flex-wrap gap-x-5 gap-y-2 text-sm font-medium text-[#153e75]"><span>Your written rules</span><span>Human qualification</span><span>Appointments never resold</span></div>
          </div>
          <div className="rounded-2xl bg-[#122b4b] p-7 text-white shadow-[0_20px_45px_-25px_rgba(18,43,75,0.6)] sm:p-9">
            <p className="text-sm text-[#b9cbe3]">Your appointment plan</p>
            <p className="mt-3 text-[27px] font-semibold leading-snug tracking-tight">$4,725/month for 15 qualified appointments. Guaranteed.</p>
            <p className="mt-5 border-t border-white/20 pt-5 text-base font-medium leading-relaxed text-[#b8f2de]">Month one: 12 appointments. Month two onward: 15. No-shows replaced.</p>
            <p className="mt-3 text-sm leading-relaxed text-[#c0cde0]">Paid upfront monthly. Work starts on payment. Month to month.</p>
            <button type="button" onClick={openCalendar} className="mt-6 w-full rounded-lg bg-[#b8f2de] px-6 py-4 font-semibold text-[#122b4b] transition-colors hover:bg-[#d5faed] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#b8f2de]">Book your intro call <span aria-hidden className="ml-2">↗</span></button>
            <p className="mt-3 text-xs leading-relaxed text-[#c0cde0]">We will look at your market and whether the numbers work for your agency.</p>
          </div>
        </section>

        <section className="rounded-2xl border border-[#d9e3f1] bg-white p-6 sm:p-9">
          <div className="flex flex-wrap items-end justify-between gap-4"><div><p className="text-sm font-medium text-[#235be8]">Month one</p><h2 className="mt-2 text-3xl font-semibold tracking-tight">Build the market. Then book the meetings.</h2></div><span className="rounded-full bg-[#e9f7f0] px-4 py-2 text-sm font-medium text-[#1d6047]">12 appointments in month one</span></div>
          <p className="mt-3 max-w-3xl leading-relaxed text-[#52647b]">Month one includes agreeing your rules and building the campaign as outreach gets going. That is why the first-month guarantee is 12, then 15 from month two.</p>
          <ol className="mt-8 grid gap-7 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ['Agree your appetite', 'Assess your carrier appetite, serviceable geography and premium or group-size floor together.'],
              ['Map your market', 'Identify the addressable businesses that fit those agreed rules.'],
              ['Build the contact list', 'Find the owner or decision-maker contacts and prepare your campaigns.'],
              ['Qualify & book', 'Campaigns bring replies. Our setter calls, checks fit and books the people who qualify.'],
            ].map(([title, body], index) => <li key={title} className="border-t-2 border-[#d9e3f1] pt-4"><span className="text-sm font-semibold text-[#235be8]">{index + 1}</span><h3 className="mt-2 text-lg font-semibold">{title}</h3><p className="mt-2 text-sm leading-relaxed text-[#52647b]">{body}</p></li>)}
          </ol>
          <div className="mt-7 flex flex-wrap items-center gap-2 rounded-lg bg-[#f0f5ff] px-4 py-3 text-sm"><span className="font-semibold text-[#153e75]">Illustrative market</span><span className="text-[#52647b]">Trucking + specialty contractors · California · 11–50 employees</span><p className="w-full text-xs text-[#52647b]">Example only. We agree your industries, area and size criteria before outreach.</p></div>
        </section>

        <section className="grid gap-6 py-8 lg:grid-cols-2">
          <div className="rounded-2xl bg-[#e8effb] p-6 sm:p-8"><h2 className="text-2xl font-semibold tracking-tight">What counts as qualified?</h2><ul className="mt-5 space-y-3 text-[#243d5c]"><li>In your territory and carrier appetite.</li><li>Above the premium or group-size floor you set.</li><li>A need now or within three months.</li><li>The decision maker is in the meeting: the business owner or the person who decides on the purchase.</li></ul><details className="mt-5 border-t border-[#c6d5eb] pt-4"><summary className="cursor-pointer text-sm font-medium text-[#153e75]">Group size, local meetings &amp; timing</summary><p className="mt-3 text-sm leading-relaxed text-[#52647b]">For benefits, total headcount and enrolled members are different numbers. We agree which matters for your agency. Travel radius and meeting format are discussed on the intro call. We ask about timing and confirm what we can; a renewal date does not establish willingness to switch brokers.</p></details></div>
          <div className="rounded-2xl border border-[#d9e3f1] bg-white p-6 sm:p-8"><h2 className="text-2xl font-semibold tracking-tight">If we miss the guarantee</h2><p className="mt-5 leading-relaxed text-[#52647b]">For each appointment short of your monthly guarantee, you receive a $315 credit against the next month. Any unused credit is refunded if you cancel.</p><p className="mt-4 font-medium text-[#153e75]">No-shows are replaced.</p><div className="mt-5 border-t border-[#d9e3f1] pt-4"><h3 className="font-semibold">7-day payment refund</h3><p className="mt-2 text-sm leading-relaxed text-[#52647b]">Not happy for any reason within 7 days of payment? You receive a full refund, no questions asked. Deliverables are not held back during those 7 days.</p></div><p className="mt-3 text-sm leading-relaxed text-[#52647b]">We do not guarantee a quote, a bound policy or a sale.</p></div>
        </section>

        <section className="grid gap-8 rounded-2xl bg-[#122b4b] p-6 text-white sm:p-9 lg:grid-cols-[1fr_1.1fr]">
          <div><p className="text-sm text-[#b8f2de]">Before the meeting</p><h2 className="mt-3 text-3xl font-semibold leading-tight tracking-tight">Know who you are meeting.<br />And why they said yes.</h2><p className="mt-4 leading-relaxed text-[#c0cde0]">You get a brief with business and contact details, confirmed needs and renewal timing. Current carrier is included when known.</p><details className="mt-5 border-t border-white/20 pt-4"><summary className="cursor-pointer text-sm font-medium text-[#b8f2de]">How we check the reason for meeting</summary><p className="mt-3 text-sm leading-relaxed text-[#c0cde0]">Our setter asks what they need help with: new coverage, a possible broker change or information. You get what they told us in their own words. Unconfirmed facts stay marked as unknown; we do not assume they will leave their broker.</p></details></div>
          <div className="rounded-xl bg-white p-5 text-[#12243b] sm:p-6"><h3 className="text-lg font-semibold">Illustrative meeting brief</h3><p className="mt-1 text-xs leading-relaxed text-[#52647b]">Fictional example showing the format. This is not a client result.</p><dl className="mt-5 grid gap-y-4 text-sm sm:grid-cols-[120px_1fr] sm:gap-x-4"><dt className="font-medium text-[#52647b]">Business</dt><dd>California specialty contractor; 11–50 employees. Owner attending.</dd><dt className="font-medium text-[#52647b]">Why they said yes</dt><dd>Wants to discuss coverage for a growing vehicle fleet. Switching intent not confirmed.</dd><dt className="font-medium text-[#52647b]">Timing</dt><dd>New need this month. Renewal date not yet confirmed.</dd><dt className="font-medium text-[#52647b]">Current carrier</dt><dd className="text-[#1d6047]">Unknown. Ask on the meeting.</dd></dl></div>
        </section>

        <section className="grid gap-7 py-9 lg:grid-cols-[1.1fr_1fr]">
          <div className="p-1"><h2 className="text-2xl font-semibold tracking-tight">What the evidence shows</h2><p className="mt-4 font-medium text-[#153e75]">26 sales-qualified demos. 6 annual contracts signed.</p><p className="mt-2 text-sm leading-relaxed text-[#52647b]">Construction software selling to contractors. Cross-industry evidence; we do not have an insurance agency case study yet, and this does not establish your insurance conversion rate.</p><a href="/#client-wins" className="mt-4 inline-block text-sm font-medium text-[#235be8] underline underline-offset-4">See client evidence ↗</a><p className="mt-2 text-xs text-[#52647b]">Anonymized with permission. Registry verified September 30, 2026; corrected October 1.</p></div>
          <div className="rounded-xl border border-[#d9e3f1] bg-white px-6 py-5"><h2 className="text-xl font-semibold">See your market on the call.</h2><p className="mt-3 text-sm leading-relaxed text-[#52647b]">We use your target territory and appetite to show a measured count of fitting businesses and 5 real rows, with names blurred. If those criteria are unknown, we explain the starting scope we used.</p><details className="mt-5 border-t border-[#d9e3f1] pt-4"><summary className="cursor-pointer font-semibold">What else is included?</summary><p className="mt-3 text-sm leading-relaxed text-[#52647b]">Your mapped market as CSV files and a renewal calendar that builds as dates are captured and confirmed. Cross-sell and win-back campaigns are included when you supply client lists and policy information. No additional appointment or sales guarantee attaches to these bonuses.</p></details><p className="mt-5 border-t border-[#d9e3f1] pt-4 text-sm text-[#52647b]">Bring a partner or producer to the intro call if they need to see the targeting before you decide.</p></div>
        </section>
        <section aria-label="Who we work with right now" className="rounded-2xl border border-[#d9e3f1] bg-white p-6 sm:p-9">
          <h2 className="text-2xl font-semibold tracking-tight">Who we work with right now</h2>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[#52647b]">Current clients, described by business type only. None of them is an insurance agency, and we do not have an insurance case study yet.</p>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              ['A construction-software company', '26 sales-qualified demos and 6 annual contracts signed so far from the outbound we run for them.'],
              ['An executive career-services company', '20 unique paying customers attributed to the outbound program.'],
              ['An online reputation services company', ''],
              ['An ERP implementation firm', ''],
              ['A commercial landscaping and snow company', ''],
              ['A job-application platform', ''],
            ].map(([title, body]) => <li key={title} className="rounded-xl border border-[#d9e3f1] bg-[#f5f7fb] p-4"><h3 className="font-semibold">{title}</h3>{body && <p className="mt-2 text-sm leading-relaxed text-[#52647b]">{body}</p>}</li>)}
          </ul>
        </section>
        {calendar && <section aria-label="Booking" className="rounded-2xl border border-[#d9e3f1] bg-white p-6 sm:p-8"><h2 className="mb-4 text-2xl font-semibold">Choose a time</h2><iframe title="Book your intro call" src={calendar} className="min-h-[720px] w-full border-0" /><a className="text-sm text-[#235be8] underline" href={calendar}>Open the calendar in a new page</a></section>}
      </div>
      <footer className="border-t border-[#d9e3f1] px-6 py-6 text-center text-xs text-[#52647b]">Maxionlabs · Commercial insurance appointment setting<br />Registered in Ukraine, Vinytska 15, Kiev, 08130. Payments processed through Stripe.</footer>
    </main>
  )
}
