import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, cleanup } from '@testing-library/react'
import { BookCall } from '@/components/home/BookCall'
import { LANDING_STORAGE_KEY } from '@/lib/insurance-attribution'
import { VISITOR_ID_KEY } from '@/lib/analytics'

/**
 * The homepage booking embed (MAX-738, 2026-11-20): no visible question of its own, Cal already asks "Where did you
 * first hear about me?" (slug lead-source). The first landing's referrer, path and utm params render as hidden fields
 * and go to the Cal embed as metadata[...] config. The Cal component is mocked to record the config it mounted with.
 */
const mounted: Record<string, string>[] = []
vi.mock('@calcom/embed-react', () => ({
  default: (props: { config: Record<string, string> }) => {
    mounted.push(props.config)
    return <div data-testid="cal-embed" />
  },
  getCalApi: vi.fn().mockResolvedValue(vi.fn()),
}))

function seedBrowser(href: string, referrer: string) {
  const entries = new Map<string, string>()
  Object.defineProperty(window, 'localStorage', {
    configurable: true,
    value: { getItem: (k: string) => entries.get(k) ?? null, setItem: (k: string, v: string) => entries.set(k, v) },
  })
  Object.defineProperty(document, 'referrer', { configurable: true, value: referrer })
  window.history.replaceState({}, '', href)
  return entries
}

describe('BookCall, first landing into the Cal booking, no question of its own', () => {
  beforeEach(() => {
    mounted.length = 0
    cleanup()
  })

  it('renders the first landing as hidden fields, stores it once, and asks no visible question', () => {
    const entries = seedBrowser('/?utm_source=chatgpt.com&utm_medium=referral', 'https://chatgpt.com/')
    const { container, getByTestId } = render(<BookCall />)
    expect(container.querySelector('select, label, input:not([type="hidden"])')).toBeNull()
    expect(container.textContent).not.toMatch(/how did you find us|hear about/i)
    const hidden = Object.fromEntries(
      [...container.querySelectorAll('input[type="hidden"][data-testid="landing-field"]')].map((i) => [i.getAttribute('name'), (i as HTMLInputElement).value]),
    )
    expect(hidden).toEqual({
      'metadata[referrer]': 'https://chatgpt.com/',
      'metadata[landingPath]': '/',
      'metadata[utm_source]': 'chatgpt.com',
      'metadata[utm_medium]': 'referral',
      'metadata[visitorId]': window.sessionStorage.getItem(VISITOR_ID_KEY),
    })
    expect(hidden['metadata[visitorId]']).toMatch(/^[A-Za-z0-9_-]{1,64}$/)
    expect(JSON.parse(entries.get(LANDING_STORAGE_KEY)!).utm_source).toBe('chatgpt.com')
    expect(getByTestId('cal-embed')).toBeInTheDocument()
  })

  it('hands the landing to the Cal embed config once, with no foundUs key', () => {
    seedBrowser('/?utm_source=chatgpt.com', 'https://chatgpt.com/')
    render(<BookCall />)
    expect(mounted).toHaveLength(1)
    expect(mounted[0]).toMatchObject({ layout: 'month_view', 'metadata[referrer]': 'https://chatgpt.com/', 'metadata[utm_source]': 'chatgpt.com', 'metadata[landingPath]': '/' })
    expect(Object.keys(mounted[0]).filter((k) => /foundUs/i.test(k))).toEqual([])
    // the same id PostHogInit bootstraps, so the Cal booking joins the visit that led to it
    expect(mounted[0]['metadata[visitorId]']).toBe(window.sessionStorage.getItem(VISITOR_ID_KEY))
  })

  it('still books when storage is blocked and nothing is known about the landing', () => {
    Object.defineProperty(window, 'localStorage', {
      configurable: true,
      value: { getItem: () => { throw new Error('blocked') }, setItem: () => { throw new Error('blocked') } },
    })
    Object.defineProperty(document, 'referrer', { configurable: true, value: '' })
    window.history.replaceState({}, '', '/')
    const { getByTestId, container } = render(<BookCall />)
    expect(getByTestId('cal-embed')).toBeInTheDocument()
    // landingPath, plus the visitor id held in sessionStorage
    expect(container.querySelectorAll('[data-testid="landing-field"]')).toHaveLength(2)
    expect((container.querySelector('input[name="metadata[landingPath]"]') as HTMLInputElement).value).toBe('/')
  })
})
