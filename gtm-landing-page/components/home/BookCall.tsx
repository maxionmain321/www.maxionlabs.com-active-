'use client'

import { useEffect } from 'react'
import Cal, { getCalApi } from '@calcom/embed-react'

/**
 * The only client component on the homepage. Everything around it is server-rendered copy.
 * Intake questions live in cal.com on maksym-pidvalnyi/intro-growth-call, not here.
 */
export function BookCall() {
  useEffect(() => {
    ;(async function () {
      const cal = await getCalApi({ namespace: 'intro-growth-call' })
      cal('ui', { hideEventTypeDetails: false, layout: 'month_view' })
    })()
  }, [])

  return (
    <div className="w-full" style={{ minHeight: '630px' }}>
      <Cal
        namespace="intro-growth-call"
        calLink="maksym-pidvalnyi/intro-growth-call"
        style={{ width: '100%', height: '100%', overflow: 'scroll' }}
        config={{ layout: 'month_view', useSlotsViewOnSmallScreen: 'true', theme: 'light' }}
      />
    </div>
  )
}

export default BookCall
