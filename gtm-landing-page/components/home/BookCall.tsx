'use client'

import { useEffect, useState } from 'react'
import Cal, { getCalApi } from '@calcom/embed-react'
import { FOUND_US_OPTIONS, captureLanding, firstLanding, landingMetadata, type Landing } from '@/lib/insurance-attribution'

/**
 * The only client component on the homepage. Everything around it is server-rendered copy.
 * Intake questions live in cal.com on maksym-pidvalnyi/intro-growth-call, not here, with one exception (MAX-738,
 * 2026-11-20): the optional "How did you find us?" select above the calendar, so an owner sent by ChatGPT can say so.
 * Its answer, the first landing's referrer and utm params ride into the booking as Cal `metadata[...]` config, which
 * Cal persists as booking.metadata (cal.com/help/embedding/prefill-booking-form-embed). The hidden inputs mirror what
 * goes to Cal so the page itself shows what is sent. The embed reads config once at mount, so a changed answer
 * remounts it (key).
 */
const BASE_CONFIG = { layout: 'month_view', useSlotsViewOnSmallScreen: 'true', theme: 'light' } as const

export function BookCall() {
  const [landing, setLanding] = useState<Landing | null>(null)
  const [ready, setReady] = useState(false)
  const [foundUs, setFoundUs] = useState('')

  useEffect(() => {
    const url = new URL(window.location.href)
    const at = new Date().toISOString()
    try {
      setLanding(firstLanding(window.localStorage, url, document.referrer, at))
    } catch {
      setLanding(captureLanding(url, document.referrer, at))
    }
    setReady(true)
    ;(async function () {
      const cal = await getCalApi({ namespace: 'intro-growth-call' })
      cal('ui', { hideEventTypeDetails: false, layout: 'month_view' })
    })()
  }, [])

  const metadata = landingMetadata(landing, foundUs)

  return (
    <div className="w-full">
      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 px-3 pt-2 pb-3 text-left">
        <label htmlFor="found-us" className="text-sm text-[#5B6675]">
          How did you find us? Optional.
        </label>
        <select
          id="found-us"
          name="found_us"
          data-testid="found-us"
          value={foundUs}
          onChange={(e) => setFoundUs(e.target.value)}
          className="rounded-md border border-[#D8DEE6] bg-white px-3 py-1.5 text-sm text-[#101828]"
        >
          {FOUND_US_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </div>
      {Object.entries(metadata).map(([key, value]) => (
        <input key={key} type="hidden" name={key} value={value} data-testid="landing-field" readOnly />
      ))}
      <div style={{ minHeight: '630px' }}>
        {ready ? (
          <Cal
            key={foundUs}
            namespace="intro-growth-call"
            calLink="maksym-pidvalnyi/intro-growth-call"
            style={{ width: '100%', height: '100%', overflow: 'scroll' }}
            config={{ ...BASE_CONFIG, ...metadata }}
          />
        ) : null}
      </div>
    </div>
  )
}

export default BookCall
