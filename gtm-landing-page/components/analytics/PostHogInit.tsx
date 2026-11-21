'use client'

import { useEffect } from 'react'
import posthog from 'posthog-js'
import {
  POSTHOG_HOST,
  POSTHOG_KEY,
  aiSource,
  ctaChain,
  ctaLocation,
  internalFlag,
  isBookingHref,
  isTrackedHost,
  visitorId,
} from '@/lib/analytics'

const safe = <T,>(get: () => T): T | null => {
  try {
    return get()
  } catch {
    return null
  }
}

/**
 * Initializes PostHog once per page load (MAX-738). Cookieless: persistence 'memory' sets no cookie, so no consent
 * banner. One browser keeps one distinct id across reloads and pages: a first-party random id in sessionStorage plus
 * localStorage (lib/analytics visitorId) is passed as bootstrap.distinctID. Never runs on localhost or *.vercel.app.
 * A browser opened once with ?internal=1 is internal (Max): every event carries internal=true and before_send drops it.
 * Pageviews on load and on history changes, page leave, autocapture and heatmaps on, DNT respected.
 * Adds two events on top: aeo_referral (an AI engine sent the visit) and cta_click (any booking CTA, by location).
 */
export function PostHogInit() {
  useEffect(() => {
    if (!POSTHOG_KEY) {
      console.error('PostHog: NEXT_PUBLIC_POSTHOG_KEY is not set, analytics are off')
      return
    }
    if (!isTrackedHost(window.location.hostname)) return
    const internal = internalFlag(new URL(window.location.href), safe(() => window.localStorage))
    const distinctID = visitorId(safe(() => window.sessionStorage), safe(() => window.localStorage))
    if (!posthog.__loaded) posthog.init(POSTHOG_KEY, {
      api_host: POSTHOG_HOST,
      persistence: 'memory',
      bootstrap: { distinctID, isIdentifiedID: false },
      before_send: (event) => (internal ? null : event),
      capture_pageview: 'history_change',
      capture_pageleave: true,
      autocapture: true,
      enable_heatmaps: true,
      respect_dnt: true,
      person_profiles: 'identified_only',
      loaded: (ph) => {
        ph.register({ internal })
        const url = new URL(window.location.href)
        const source = aiSource(document.referrer, url.searchParams.get('utm_source'))
        if (source) ph.capture('aeo_referral', { ai_source: source, referrer: document.referrer, landingPath: url.pathname })
      },
    })

    const onClick = (e: MouseEvent) => {
      const link = (e.target as Element | null)?.closest?.('a')
      if (!link || !isBookingHref(link.getAttribute('href'))) return
      posthog.capture('cta_click', {
        location: ctaLocation(ctaChain(link)),
        text: (link.textContent ?? '').trim().slice(0, 80),
        href: link.getAttribute('href'),
      })
    }
    document.addEventListener('click', onClick, true)
    return () => document.removeEventListener('click', onClick, true)
  }, [])

  return null
}

export default PostHogInit
