'use client'

import { useEffect, useState } from 'react'
import Cal, { getCalApi } from '@calcom/embed-react'
import { captureLanding, firstLanding, landingMetadata, type Landing } from '@/lib/insurance-attribution'

/**
 * The only client component on the homepage. Everything around it is server-rendered copy.
 * Intake questions live in cal.com on maksym-pidvalnyi/intro-growth-call, not here. "Where did you first hear about
 * me?" (slug lead-source, required, includes ChatGPT or other AI assistant) is one of them, so the page asks nothing
 * (Max, 2026-11-20). What the page adds invisibly (MAX-738): the first landing's referrer, path and utm params, passed
 * to the embed as Cal `metadata[...]` config, which Cal persists as booking.metadata
 * (cal.com/help/embedding/prefill-booking-form-embed). The hidden inputs mirror what goes to Cal. The embed reads
 * config once at mount, so it mounts only after the landing is read.
 */
const BASE_CONFIG = { layout: 'month_view', useSlotsViewOnSmallScreen: 'true', theme: 'light' } as const

export function BookCall() {
  const [landing, setLanding] = useState<Landing | null>(null)
  const [ready, setReady] = useState(false)

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

  const metadata = landingMetadata(landing)

  return (
    <div className="w-full">
      {Object.entries(metadata).map(([key, value]) => (
        <input key={key} type="hidden" name={key} value={value} data-testid="landing-field" readOnly />
      ))}
      <div style={{ minHeight: '630px' }}>
        {ready ? (
          <Cal
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
