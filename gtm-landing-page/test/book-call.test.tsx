import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, fireEvent, cleanup } from '@testing-library/react'
import { BookCall } from '@/components/home/BookCall'
import { LANDING_STORAGE_KEY } from '@/lib/insurance-attribution'

/**
 * The homepage booking embed (MAX-738, 2026-11-20): one optional "How did you find us?" select with an AI-assistant
 * option, the first landing's referrer and utm params as hidden fields, and both handed to the Cal embed as
 * metadata[...] config. The Cal component is mocked to record the config it was mounted with.
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

describe('BookCall, how did you find us + first landing', () => {
  beforeEach(() => {
    mounted.length = 0
    cleanup()
  })

  it('renders the optional select with "ChatGPT or another AI assistant" and the first landing as hidden fields', () => {
    const entries = seedBrowser('/?utm_source=chatgpt.com&utm_medium=referral', 'https://chatgpt.com/')
    const { container, getByTestId } = render(<BookCall />)
    const select = getByTestId('found-us') as HTMLSelectElement
    expect(select.value).toBe('')
    expect([...select.options].map((o) => o.textContent)).toContain('ChatGPT or another AI assistant')
    expect(container.querySelector('label[for="found-us"]')?.textContent).toMatch(/how did you find us/i)
    const hidden = Object.fromEntries(
      [...container.querySelectorAll('input[type="hidden"][data-testid="landing-field"]')].map((i) => [i.getAttribute('name'), (i as HTMLInputElement).value]),
    )
    expect(hidden).toEqual({
      'metadata[referrer]': 'https://chatgpt.com/',
      'metadata[landingPath]': '/',
      'metadata[utm_source]': 'chatgpt.com',
      'metadata[utm_medium]': 'referral',
    })
    expect(JSON.parse(entries.get(LANDING_STORAGE_KEY)!).utm_source).toBe('chatgpt.com')
    expect(getByTestId('cal-embed')).toBeInTheDocument()
  })

  it('hands the answer and the landing to the Cal embed config, remounting it when the answer changes', () => {
    seedBrowser('/?utm_source=chatgpt.com', 'https://chatgpt.com/')
    const { getByTestId, container } = render(<BookCall />)
    const last = () => mounted[mounted.length - 1]
    expect(last()).toMatchObject({ layout: 'month_view', 'metadata[referrer]': 'https://chatgpt.com/', 'metadata[utm_source]': 'chatgpt.com' })
    expect(last()['metadata[foundUs]']).toBeUndefined()
    fireEvent.change(getByTestId('found-us'), { target: { value: 'ai-assistant' } })
    expect(last()).toMatchObject({ 'metadata[foundUs]': 'ai-assistant', 'metadata[referrer]': 'https://chatgpt.com/' })
    expect((container.querySelector('input[name="metadata[foundUs]"]') as HTMLInputElement).value).toBe('ai-assistant')
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
    expect(container.querySelectorAll('[data-testid="landing-field"]')).toHaveLength(1)
    expect((container.querySelector('input[name="metadata[landingPath]"]') as HTMLInputElement).value).toBe('/')
  })
})
