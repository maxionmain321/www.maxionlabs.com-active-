import { describe, expect, it } from 'vitest'
import { aiSource, ctaLocation, isBookingHref, VISITOR_ID_KEY, INTERNAL_KEY, visitorId, isTrackedHost, internalFlag } from '@/lib/analytics'

describe('aiSource: which AI engine sent the visit', () => {
  it('maps each AI referrer host to its source name', () => {
    expect(aiSource('https://chatgpt.com/')).toBe('chatgpt')
    expect(aiSource('https://chat.openai.com/c/abc')).toBe('chatgpt')
    expect(aiSource('https://www.perplexity.ai/search?q=x')).toBe('perplexity')
    expect(aiSource('https://perplexity.ai/')).toBe('perplexity')
    expect(aiSource('https://claude.ai/chat/123')).toBe('claude')
    expect(aiSource('https://gemini.google.com/app')).toBe('gemini')
    expect(aiSource('https://copilot.microsoft.com/')).toBe('copilot')
    expect(aiSource('https://you.com/search?q=x')).toBe('you')
  })

  it('falls back to utm_source when the engine strips the referrer (ChatGPT adds utm_source=chatgpt.com)', () => {
    expect(aiSource('', 'chatgpt.com')).toBe('chatgpt')
    expect(aiSource('', 'perplexity')).toBe(null)
    expect(aiSource('https://www.google.com/', 'perplexity.ai')).toBe('perplexity')
  })

  it('ignores everything else, including look-alike hosts and garbage', () => {
    expect(aiSource('')).toBe(null)
    expect(aiSource('https://www.google.com/search?q=chatgpt.com')).toBe(null)
    expect(aiSource('https://google.com/')).toBe(null)
    expect(aiSource('https://notchatgpt.com/')).toBe(null)
    expect(aiSource('https://chatgpt.com.evil.io/')).toBe(null)
    expect(aiSource('https://www.maxionlabs.com/pricing')).toBe(null)
    expect(aiSource('not a url')).toBe(null)
  })
})

describe('isBookingHref: which links are a booking CTA', () => {
  it('matches the book-call anchor on any page and Cal links', () => {
    expect(isBookingHref('#book-call')).toBe(true)
    expect(isBookingHref('/#book-call')).toBe(true)
    expect(isBookingHref('https://www.maxionlabs.com/#book-call')).toBe(true)
    expect(isBookingHref('https://cal.com/maksym-pidvalnyi/insurance')).toBe(true)
  })

  it('does not match other links', () => {
    expect(isBookingHref(null)).toBe(false)
    expect(isBookingHref('/pricing')).toBe(false)
    expect(isBookingHref('#price')).toBe(false)
    expect(isBookingHref('https://calendly.com/x')).toBe(false)
    expect(isBookingHref('mailto:maksym@maxionlabs.com')).toBe(false)
  })
})

describe('ctaLocation: where on the page the CTA sits', () => {
  const a = { tag: 'a' }
  it('an explicit data-cta on the link or an ancestor wins', () => {
    expect(ctaLocation([{ tag: 'a', cta: 'page_end' }, { tag: 'footer' }])).toBe('page_end')
    expect(ctaLocation([a, { tag: 'div', cta: 'hero' }, { tag: 'header' }])).toBe('hero')
  })

  it('maps landmarks and the homepage sections by element', () => {
    expect(ctaLocation([a, { tag: 'nav' }, { tag: 'header' }])).toBe('header')
    expect(ctaLocation([a, { tag: 'div' }, { tag: 'footer' }])).toBe('footer')
    expect(ctaLocation([a, { tag: 'div' }, { tag: 'section', testid: 'hero-section' }])).toBe('hero')
    expect(ctaLocation([a, { tag: 'div' }, { tag: 'section', id: 'price' }])).toBe('pricing')
    expect(ctaLocation([a, { tag: 'section', id: 'book-call' }])).toBe('final_cta')
  })

  it('the nearest landmark wins over a farther one', () => {
    expect(ctaLocation([a, { tag: 'section', id: 'price' }, { tag: 'main' }, { tag: 'footer' }])).toBe('pricing')
  })

  it('anything else is an inline link in the body', () => {
    expect(ctaLocation([a, { tag: 'p' }, { tag: 'article' }, { tag: 'main' }])).toBe('inline')
    expect(ctaLocation([])).toBe('inline')
  })
})

/** A Storage stand-in; `broken` throws on every call, like Safari private mode or blocked site data. */
function store(init: Record<string, string> = {}, broken = false) {
  const m = new Map(Object.entries(init))
  return {
    m,
    getItem: (k: string) => {
      if (broken) throw new Error('blocked')
      return m.has(k) ? m.get(k)! : null
    },
    setItem: (k: string, v: string) => {
      if (broken) throw new Error('blocked')
      m.set(k, v)
    },
  }
}

describe('visitorId: one browser keeps one PostHog distinct id across reloads and pages, without cookies', () => {
  const make = () => 'new-id'
  it('creates an id once and writes it to sessionStorage and localStorage', () => {
    const s = store(), l = store()
    expect(visitorId(s, l, make)).toBe('new-id')
    expect(s.m.get(VISITOR_ID_KEY)).toBe('new-id')
    expect(l.m.get(VISITOR_ID_KEY)).toBe('new-id')
  })
  it('a reload or a full navigation to /#book-call reuses the stored id', () => {
    const s = store(), l = store()
    const first = visitorId(s, l, () => 'a')
    expect(visitorId(s, l, () => 'b')).toBe(first)
  })
  it('a new tab (empty sessionStorage) picks the id up from localStorage and copies it back', () => {
    const s = store(), l = store({ [VISITOR_ID_KEY]: 'kept' })
    expect(visitorId(s, l, make)).toBe('kept')
    expect(s.m.get(VISITOR_ID_KEY)).toBe('kept')
  })
  it('sessionStorage wins when the two disagree, and is copied to localStorage', () => {
    const s = store({ [VISITOR_ID_KEY]: 'tab' }), l = store({ [VISITOR_ID_KEY]: 'old' })
    expect(visitorId(s, l, make)).toBe('tab')
    expect(l.m.get(VISITOR_ID_KEY)).toBe('tab')
  })
  it('ignores a garbage stored value', () => {
    const s = store({ [VISITOR_ID_KEY]: '<script>' }), l = store()
    expect(visitorId(s, l, make)).toBe('new-id')
  })
  it('blocked or missing storage still returns an id', () => {
    expect(visitorId(store({}, true), store({}, true), make)).toBe('new-id')
    expect(visitorId(null, null, make)).toBe('new-id')
  })
})

describe('isTrackedHost: local and preview traffic is never counted', () => {
  it('counts the production hosts', () => {
    expect(isTrackedHost('www.maxionlabs.com')).toBe(true)
    expect(isTrackedHost('maxionlabs.com')).toBe(true)
  })
  it('skips localhost, loopback and Vercel preview hosts', () => {
    expect(isTrackedHost('localhost')).toBe(false)
    expect(isTrackedHost('127.0.0.1')).toBe(false)
    expect(isTrackedHost('0.0.0.0')).toBe(false)
    expect(isTrackedHost('[::1]')).toBe(false)
    expect(isTrackedHost('gtm-landing-page-git-x-max.vercel.app')).toBe(false)
    expect(isTrackedHost('vercel.app')).toBe(false)
    expect(isTrackedHost('')).toBe(false)
  })
})

describe('internalFlag: ?internal=1 once marks this browser as Max, for good', () => {
  const at = (q: string) => new URL(`https://www.maxionlabs.com/${q}`)
  it('sets and persists the flag from ?internal=1', () => {
    const l = store()
    expect(internalFlag(at('?internal=1'), l)).toBe(true)
    expect(l.m.get(INTERNAL_KEY)).toBe('1')
    expect(internalFlag(at('pricing'), l)).toBe(true)
  })
  it('?internal=0 clears it', () => {
    const l = store({ [INTERNAL_KEY]: '1' })
    expect(internalFlag(at('?internal=0'), l)).toBe(false)
    expect(internalFlag(at(''), l)).toBe(false)
  })
  it('a normal visitor is not internal, and blocked storage still honours the URL', () => {
    expect(internalFlag(at(''), store())).toBe(false)
    expect(internalFlag(at('?internal=1'), store({}, true))).toBe(true)
    expect(internalFlag(at(''), null)).toBe(false)
  })
})
