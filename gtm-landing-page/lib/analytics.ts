/**
 * PostHog analytics (MAX-738, Max approved 2026-11-21). EU cloud, cookieless (persistence 'memory'), so no consent
 * banner. Pure helpers live here so they are unit-tested in test/analytics.test.ts; the browser wiring is
 * components/analytics/PostHogInit.tsx (pageviews, aeo_referral, cta_click) and components/home/BookCall.tsx
 * (booking_completed). Weekly read: OPS SOPs/seo-aeo-weekly.md § Analytics.
 */

/** Public, write-only key of EU project 361692 (https://eu.posthog.com/project/361692). Env wins so a project move needs
 * no code change; an empty key means PostHog is off and PostHogInit says so in the console. */
export const POSTHOG_KEY = process.env.NEXT_PUBLIC_POSTHOG_KEY || 'phc_sPUJP2qmeG75JDDCrk6at5A9dWJM5aP7fPGiETgjyChV'
export const POSTHOG_HOST = process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://eu.i.posthog.com'

/** AI engines whose referrer (or utm_source) marks an answer-engine visit. Host or any subdomain of it. */
const AI_HOSTS: [string, string][] = [
  ['chatgpt.com', 'chatgpt'],
  ['chat.openai.com', 'chatgpt'],
  ['perplexity.ai', 'perplexity'],
  ['claude.ai', 'claude'],
  ['gemini.google.com', 'gemini'],
  ['copilot.microsoft.com', 'copilot'],
  ['you.com', 'you'],
]

function matchHost(host: string): string | null {
  const h = host.toLowerCase().replace(/\.$/, '')
  for (const [domain, source] of AI_HOSTS) if (h === domain || h.endsWith(`.${domain}`)) return source
  return null
}

/** The AI engine that sent this visit, from document.referrer, else from a utm_source that names an engine's host. */
export function aiSource(referrer: string, utmSource?: string | null): string | null {
  try {
    if (referrer) {
      const hit = matchHost(new URL(referrer).host)
      if (hit) return hit
    }
  } catch {
    /* not a URL */
  }
  if (utmSource && /^[a-z0-9.-]+\.[a-z]+$/i.test(utmSource.trim())) return matchHost(utmSource.trim())
  return null
}

/** A booking CTA: the #book-call anchor on any page, or a Cal booking link. */
export function isBookingHref(href: string | null | undefined): boolean {
  if (!href) return false
  if (/#book-call$/.test(href)) return true
  try {
    const host = new URL(href).host.toLowerCase()
    return host === 'cal.com' || host.endsWith('.cal.com')
  } catch {
    return false
  }
}

/** One element in the chain from the clicked link up to the document root. */
export type CtaNode = { tag: string; id?: string; testid?: string; cta?: string }

/**
 * Where the CTA sits. Walks from the link outward: an explicit data-cta wins, then the nearest landmark (header,
 * footer, the homepage hero, pricing and final booking sections). Anything else is an inline body link.
 */
export function ctaLocation(chain: CtaNode[]): string {
  for (const n of chain) {
    if (n.cta) return n.cta
    const tag = n.tag.toLowerCase()
    if (tag === 'header') return 'header'
    if (tag === 'footer') return 'footer'
    if (n.testid === 'hero-section') return 'hero'
    if (n.id === 'price') return 'pricing'
    if (n.id === 'book-call') return 'final_cta'
  }
  return 'inline'
}

/** Builds the chain for ctaLocation from a DOM element. */
export function ctaChain(el: Element | null): CtaNode[] {
  const chain: CtaNode[] = []
  for (let n = el; n; n = n.parentElement) {
    chain.push({
      tag: n.tagName,
      id: n.id || undefined,
      testid: n.getAttribute('data-testid') || undefined,
      cta: n.getAttribute('data-cta') || undefined,
    })
  }
  return chain
}

/* ---- One person, one visitor (MAX-738 pressure test, 2026-11-21). ----
 * persistence 'memory' alone gave every page load a new distinct id, so a reload or the full navigation to /#book-call
 * split one person's money-page visit, CTA click and booking across visitors. The site still sets no cookies: a random
 * first-party id lives in sessionStorage plus localStorage and is handed to posthog.init as bootstrap.distinctID. */
export const VISITOR_ID_KEY = 'maxionlabs.vid.v1'
const VALID_ID = /^[A-Za-z0-9_-]{1,64}$/
type KV = Pick<Storage, 'getItem' | 'setItem'>

function read(s: KV | null): string | null {
  try {
    const v = s?.getItem(VISITOR_ID_KEY) ?? null
    return v && VALID_ID.test(v) ? v : null
  } catch {
    return null
  }
}
function write(s: KV | null, v: string) {
  try {
    s?.setItem(VISITOR_ID_KEY, v)
  } catch {
    /* blocked storage: the id still holds for this page */
  }
}

/** sessionStorage first (this tab), then localStorage (this browser), else a new id; written back to both. */
export function visitorId(session: KV | null, local: KV | null, make: () => string = newId): string {
  const id = read(session) ?? read(local) ?? make()
  if (read(session) !== id) write(session, id)
  if (read(local) !== id) write(local, id)
  return id
}

export function newId(): string {
  const c = globalThis.crypto
  if (c?.randomUUID) return c.randomUUID()
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 12)}`
}

/** Local and preview traffic never reaches PostHog: localhost, loopback and *.vercel.app. */
export function isTrackedHost(hostname: string): boolean {
  const h = hostname.toLowerCase().replace(/\.$/, '')
  if (!h || h === 'localhost' || h.endsWith('.localhost')) return false
  if (h === '127.0.0.1' || h === '0.0.0.0' || h === '[::1]' || h === '::1') return false
  if (h === 'vercel.app' || h.endsWith('.vercel.app')) return false
  return true
}

/** Max's own browsers: open any page once with ?internal=1 and this browser is internal for good (?internal=0 undoes
 * it). Stored in localStorage, never a cookie. Internal visits carry internal=true and nothing is captured. */
export const INTERNAL_KEY = 'maxionlabs.internal'
export function internalFlag(url: URL, local: KV | null): boolean {
  const q = url.searchParams.get('internal')
  try {
    if (q === '1') local?.setItem(INTERNAL_KEY, '1')
    if (q === '0') local?.setItem(INTERNAL_KEY, '0')
    if (q === '1' || q === '0') return q === '1'
    return local?.getItem(INTERNAL_KEY) === '1'
  } catch {
    return q === '1'
  }
}
