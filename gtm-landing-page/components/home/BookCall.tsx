'use client'

import { useEffect, useRef, useState } from 'react'
import posthog from 'posthog-js'
import Cal, { getCalApi } from '@calcom/embed-react'
import { captureLanding, firstLanding, landingMetadata, type Landing } from '@/lib/insurance-attribution'
import { visitorId } from '@/lib/analytics'

/**
 * The only client component on the homepage. Everything around it is server-rendered copy.
 * Intake questions live in cal.com on maksym-pidvalnyi/insurance, not here. "Where did you first hear about
 * me?" (slug lead-source, required, includes ChatGPT or other AI assistant) is one of them, so the page asks nothing
 * (Max, 2026-11-20). What the page adds invisibly (MAX-738): the first landing's referrer, path and utm params, passed
 * to the embed as Cal `metadata[...]` config, which Cal persists as booking.metadata
 * (cal.com/help/embedding/prefill-booking-form-embed). The hidden inputs mirror what goes to Cal. The embed reads
 * config once at mount, so it mounts only after the landing is read. The PostHog visitor id (the same one PostHogInit
 * bootstraps) rides along as metadata[visitorId] so a Cal booking joins the visit that led to it.
 */
const BASE_CONFIG = { layout: 'month_view', useSlotsViewOnSmallScreen: 'true', theme: 'light' } as const

export function BookCall() {
  const [landing, setLanding] = useState<Landing | null>(null)
  const [vid, setVid] = useState('')
  const [ready, setReady] = useState(false)
  const landingRef = useRef<Landing | null>(null)
  const booked = useRef(false)

  useEffect(() => {
    const url = new URL(window.location.href)
    const at = new Date().toISOString()
    let first: Landing
    try {
      first = firstLanding(window.localStorage, url, document.referrer, at)
    } catch {
      first = captureLanding(url, document.referrer, at)
    }
    landingRef.current = first
    setLanding(first)
    let session: Storage | null = null
    let local: Storage | null = null
    try {
      session = window.sessionStorage
      local = window.localStorage
    } catch {
      /* blocked storage */
    }
    setVid(visitorId(session, local))
    setReady(true)
    ;(async function () {
      const cal = await getCalApi({ namespace: 'intro-growth-call' })
      cal('ui', { hideEventTypeDetails: false, layout: 'month_view' })
      // booking_completed (PostHog, MAX-738): Cal fires bookingSuccessful and/or bookingSuccessfulV2; count once.
      const onBooked = () => {
        if (booked.current) return
        booked.current = true
        const l = landingRef.current
        posthog.capture('booking_completed', {
          landingPath: l?.landingPath ?? '',
          referrer: l?.referrer ?? '',
          utm_source: l?.utm_source ?? '',
          utm_medium: l?.utm_medium ?? '',
          utm_campaign: l?.utm_campaign ?? '',
          utm_content: l?.utm_content ?? '',
          utm_term: l?.utm_term ?? '',
        })
      }
      cal('on', { action: 'bookingSuccessfulV2', callback: onBooked })
      cal('on', { action: 'bookingSuccessful', callback: onBooked })
    })()
  }, [])

  const metadata = landingMetadata(landing, vid)

  return (
    <div className="w-full">
      {Object.entries(metadata).map(([key, value]) => (
        <input key={key} type="hidden" name={key} value={value} data-testid="landing-field" readOnly />
      ))}
      <div style={{ minHeight: '630px' }}>
        {ready ? (
          <Cal
            namespace="intro-growth-call"
            calLink="maksym-pidvalnyi/insurance"
            style={{ width: '100%', height: '100%', overflow: 'scroll' }}
            config={{ ...BASE_CONFIG, ...metadata }}
          />
        ) : null}
      </div>
    </div>
  )
}

export default BookCall
