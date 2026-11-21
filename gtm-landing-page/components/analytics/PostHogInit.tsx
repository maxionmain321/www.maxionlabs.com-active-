'use client'

import { useEffect } from 'react'
import posthog from 'posthog-js'
import { POSTHOG_HOST, POSTHOG_KEY, aiSource, ctaChain, ctaLocation, isBookingHref } from '@/lib/analytics'

/**
 * Initializes PostHog once per page load (MAX-738). Cookieless: persistence 'memory' keeps nothing on the device, so
 * no consent banner. Pageviews on load and on history changes, page leave, autocapture and heatmaps on, DNT respected.
 * Adds two events on top: aeo_referral (an AI engine sent the visit) and cta_click (any booking CTA, by location).
 */
export function PostHogInit() {
  useEffect(() => {
    if (!POSTHOG_KEY) {
      console.error('PostHog: NEXT_PUBLIC_POSTHOG_KEY is not set, analytics are off')
      return
    }
    if (!posthog.__loaded) posthog.init(POSTHOG_KEY, {
      api_host: POSTHOG_HOST,
      persistence: 'memory',
      capture_pageview: 'history_change',
      capture_pageleave: true,
      autocapture: true,
      enable_heatmaps: true,
      respect_dnt: true,
      person_profiles: 'identified_only',
      loaded: (ph) => {
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
