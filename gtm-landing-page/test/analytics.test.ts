import { describe, expect, it } from 'vitest'
import { aiSource, ctaLocation, isBookingHref } from '@/lib/analytics'

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
