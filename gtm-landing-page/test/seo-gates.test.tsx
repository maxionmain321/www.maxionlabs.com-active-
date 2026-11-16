/**
 * SEO gates (MAX-738, Max 2026-11-16): "how do we make sure we only do pages around what they search? my ICP".
 *
 * 1. Demand gate. Every answer page names a targetQuery that lives in content/search-targets.ts with owner-side
 *    evidence (an autocomplete string Google actually returned, or an Ahrefs bucket), checked in the last 90 days,
 *    and Serpstat US volume of at least MIN_VOLUME_US. A page without evidence or volume must be listed in
 *    PAGES_WITHOUT_EVIDENCE, so the gap is reported, never silent.
 * 1b. ICP gate. The target's live SERP read (icp.audience) is owner or mixed, never producer, and never a query in
 *    REJECTED_TARGETS. A mixed target's page says who it is not for ("solo agent" or "personal lines") inside the first
 *    200 words, so a producer who lands there leaves on the first screen.
 * 2. Title gate. The page title carries the targetQuery's key words.
 * 3. Owner-language gate. Rendered text on every guide, the homepage and /about never uses our framing: "closer(s)"
 *    as a role, "first meeting(s)", "booked" as the delivered unit, "sales appointment", or "Label: explanation" openers.
 */
import { describe, it, expect, vi } from 'vitest'
import { render } from '@testing-library/react'
import { ANSWER_PAGES } from '@/lib/site-pages'
import { SEARCH_TARGETS, PAGES_WITHOUT_EVIDENCE, REJECTED_TARGETS, MIN_VOLUME_US, hasEvidence } from '@/content/search-targets'
import { assertOwnerLanguage, ownerLanguageOffenders, LABEL_OPENER } from './helpers/copy-guards'
import Home from '@/app/page'
import AboutPage from '@/app/about/page'
import PricingPage from '@/app/pricing/page'
import AppointmentSettingPage from '@/app/commercial-insurance-appointment-setting/page'
import LeadsPage from '@/app/commercial-insurance-leads/page'
import StoppedGrowingPage from '@/app/why-insurance-agency-stopped-growing/page'
import HireProducerPage from '@/app/hire-producer-or-book-meetings/page'
import AbstraktPage from '@/app/abstrakt-alternative/page'

// The cal.com embed on the homepage is a client-only widget. Mock it so the server-rendered copy is what we test.
vi.mock('@calcom/embed-react', () => ({
  default: () => <div data-testid="cal-embed" />,
  getCalApi: vi.fn().mockResolvedValue(vi.fn()),
}))

const MAX_AGE_DAYS = 90
const STOP = new Set(
  'a an and are can do does for how i in is it my of on or should the to what when which who why with you your'.split(' '),
)

/** Key words of a query, as stems: "growing" and "grow" share "grow", "agencies" and "agency" share "agen". */
function keyStems(query: string): string[] {
  return query
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter((w) => w && !STOP.has(w))
    .map((w) => (w.length <= 5 ? w.slice(0, 4) : w.slice(0, w.length - 3)))
}

const words = (s: string) => s.split(/\s+/).filter(Boolean)

const byQuery = new Map(SEARCH_TARGETS.map((t) => [t.query, t]))

/** Answer pages by route, so the ICP gate can render the page its registry row points at. */
const ANSWER_ROUTES: Record<string, () => React.ReactElement> = {
  '/commercial-insurance-appointment-setting': () => <AppointmentSettingPage />,
  '/commercial-insurance-leads': () => <LeadsPage />,
  '/why-insurance-agency-stopped-growing': () => <StoppedGrowingPage />,
  '/hire-producer-or-book-meetings': () => <HireProducerPage />,
  '/abstrakt-alternative': () => <AbstraktPage />,
}

/** The first N words a reader meets on an answer page: eyebrow, h1 and lede, down to the table of contents. */
function firstWords(container: Element, n: number): string {
  const article = container.querySelector('article')!
  let text = ''
  for (const node of article.children) {
    if (node.tagName === 'NAV') break
    if (node.querySelector('nav[aria-label="Contents"]')) {
      // The header block wraps eyebrow, h1, lede and the contents nav; stop at the nav inside it.
      for (const child of node.children) {
        if (child.tagName === 'NAV' || child.querySelector('nav[aria-label="Contents"]')) break
        text += ' ' + (child.textContent ?? '')
      }
      break
    }
    text += ' ' + (node.textContent ?? '')
  }
  return words(text).slice(0, n).join(' ')
}

describe('search-target registry', () => {
  it('has unique queries, ISO check dates, only non-empty autocomplete strings, and a volume plus ICP read on every row', () => {
    expect(new Set(SEARCH_TARGETS.map((t) => t.query)).size).toBe(SEARCH_TARGETS.length)
    for (const t of SEARCH_TARGETS) {
      expect(t.checked).toMatch(/^\d{4}-\d{2}-\d{2}$/)
      expect(['owner', 'producer', 'mixed']).toContain(t.side)
      for (const s of t.evidence.autocomplete) expect(s.trim().length).toBeGreaterThan(0)
      expect(t.volumeSource).toBe('treg serpstat g_us')
      expect(t.volumeUS === null || (Number.isInteger(t.volumeUS) && t.volumeUS >= 0), `${t.query} volumeUS`).toBe(true)
      expect(['owner', 'producer', 'mixed']).toContain(t.icp.audience)
      expect(t.icp.basis.length, `${t.query} icp.basis`).toBeGreaterThan(20)
      expect(t.icp.checked).toMatch(/^\d{4}-\d{2}-\d{2}$/)
    }
  })

  it('points every registry page at a real answer page that targets that same query', () => {
    for (const t of SEARCH_TARGETS.filter((x) => x.page)) {
      const page = ANSWER_PAGES.find((p) => p.path === t.page)
      expect(page, `${t.query} -> ${t.page}`).toBeDefined()
      expect(page?.targetQuery).toBe(t.query)
    }
  })

  it('keeps the rejected list disjoint from any page, and every rejection carries a reason and a date', () => {
    for (const r of REJECTED_TARGETS) {
      expect(r.reason.length).toBeGreaterThan(20)
      expect(r.checked).toMatch(/^\d{4}-\d{2}-\d{2}$/)
      const t = byQuery.get(r.query)
      expect(t?.page, `"${r.query}" is rejected but ${t?.page} targets it`).toBeUndefined()
    }
  })
})

describe('demand gate: every answer page targets a query owners search', () => {
  it.each(ANSWER_PAGES.map((p) => [p.path, p] as const))('%s has a registered, owner-side, fresh targetQuery with volume', (_path, page) => {
    expect(page.targetQuery, 'set targetQuery on the PAGE export').toBeTruthy()
    const t = byQuery.get(page.targetQuery!)
    expect(t, `add "${page.targetQuery}" to content/search-targets.ts`).toBeDefined()
    expect(['owner', 'mixed']).toContain(t!.side)
    const ageDays = (Date.now() - new Date(t!.checked + 'T00:00:00Z').getTime()) / 86_400_000
    expect(ageDays, `re-check "${t!.query}" live, evidence is ${Math.floor(ageDays)} days old`).toBeLessThanOrEqual(MAX_AGE_DAYS)
    if (!PAGES_WITHOUT_EVIDENCE.includes(page.path)) {
      expect(hasEvidence(t!), `"${t!.query}" has no autocomplete string and no Ahrefs bucket`).toBe(true)
      expect(t!.volumeUS ?? 0, `"${t!.query}" has Serpstat US volume ${t!.volumeUS}, floor is ${MIN_VOLUME_US}`).toBeGreaterThanOrEqual(
        MIN_VOLUME_US,
      )
    }
  })

  it('PAGES_WITHOUT_EVIDENCE lists exactly the answer pages whose query has no evidence or no volume, and reports them', () => {
    const missing = ANSWER_PAGES.filter((p) => {
      const t = p.targetQuery ? byQuery.get(p.targetQuery) : undefined
      return !t || !hasEvidence(t) || (t.volumeUS ?? 0) < MIN_VOLUME_US
    }).map((p) => p.path)
    expect([...PAGES_WITHOUT_EVIDENCE].sort()).toEqual(missing.sort())
    if (missing.length) console.warn(`[seo-gates] pages with no search evidence or volume: ${missing.join(', ')}`)
  })
})

describe('ICP gate: the live SERP for the target is written for owners, or the page filters producers out on the first screen', () => {
  it.each(ANSWER_PAGES.map((p) => [p.path, p] as const))('%s targets an owner or mixed SERP, never a rejected query', (_path, page) => {
    expect(REJECTED_TARGETS.map((r) => r.query), `"${page.targetQuery}" is in REJECTED_TARGETS`).not.toContain(page.targetQuery)
    const t = byQuery.get(page.targetQuery!)!
    expect(['owner', 'mixed'], `"${t.query}" SERP read: ${t.icp.basis}`).toContain(t.icp.audience)
  })

  it('covers every answer page in ANSWER_ROUTES', () => {
    expect(Object.keys(ANSWER_ROUTES).sort()).toEqual(ANSWER_PAGES.map((p) => p.path).sort())
  })

  it.each(ANSWER_PAGES.filter((p) => byQuery.get(p.targetQuery!)?.icp.audience === 'mixed').map((p) => [p.path, p] as const))(
    '%s (mixed SERP) says solo agent or personal lines inside the first 200 words',
    (_path, page) => {
      const { container } = render(ANSWER_ROUTES[page.path]())
      const first200 = firstWords(container, 200)
      expect(first200, `first 200 words of ${page.path}`).toMatch(/solo agents?|personal lines/i)
    },
  )
})

describe('title gate: the title carries the target query key words', () => {
  it.each(ANSWER_PAGES.map((p) => [p.path, p] as const))('%s title contains every key word of its targetQuery', (_path, page) => {
    const title = page.title.toLowerCase()
    const missing = keyStems(page.targetQuery ?? '').filter((s) => !title.includes(s))
    expect(missing, `title "${page.title}" vs query "${page.targetQuery}"`).toEqual([])
  })
})

describe('owner-language guard', () => {
  it('catches the words Max flagged and lets the plain uses through', () => {
    for (const bad of [
      'Your closers are fine.',
      'You are the only closer here.',
      'We deliver 15 first meetings a month.',
      'Booked first meetings for your producers.',
      'A meeting booked for you is never resold.',
      'We book sales appointments for agencies.',
    ]) {
      expect(ownerLanguageOffenders(bad), bad).not.toEqual([])
    }
    for (const ok of [
      'That is closer to what your underwriters mean.',
      'Take a closer look at the calendar.',
      '15 qualified sales meetings a month.',
      'Count last month’s sales meetings and who booked them.',
      'If the owner booked them himself, you are short of meetings.',
      'Their homepage says “We book sales appointments for B2B companies”.',
    ]) {
      expect(ownerLanguageOffenders(ok), ok).toEqual([])
    }
  })

  const pages: [string, () => React.ReactElement][] = [
    ['/pricing', () => <PricingPage />],
    ['/commercial-insurance-appointment-setting', () => <AppointmentSettingPage />],
    ['/commercial-insurance-leads', () => <LeadsPage />],
    ['/why-insurance-agency-stopped-growing', () => <StoppedGrowingPage />],
    ['/hire-producer-or-book-meetings', () => <HireProducerPage />],
    ['/abstrakt-alternative', () => <AbstraktPage />],
  ]

  it('covers every answer page', () => {
    expect(pages.map(([p]) => p).filter((p) => p !== '/pricing').sort()).toEqual(ANSWER_PAGES.map((p) => p.path).sort())
  })

  it.each(pages)('%s uses owner words, not ours', (_path, make) => {
    const { container } = render(make())
    const article = container.querySelector('article')!
    expect(() => assertOwnerLanguage(article.textContent ?? '')).not.toThrow()
  })

  it.each(pages)('%s has no paragraph, list item or FAQ answer that opens with a label and a colon', (_path, make) => {
    const { container } = render(make())
    const article = container.querySelector('article')!
    const nodes = [...article.querySelectorAll('p, li, [data-testid="faq-item"] dd')].filter(
      (n) => !n.closest('#sources') && !n.closest('nav[aria-label="Contents"]') && !n.closest('table'),
    )
    const offenders = nodes.map((n) => (n.textContent ?? '').trim()).filter((t) => LABEL_OPENER.test(t))
    expect(offenders).toEqual([])
  })

  /**
   * The homepage and /about carry the same unit. Whole page, header and footer included, because the footer tagline
   * and the price card are where "first meetings" and "booked" last lived (2026-11-16). Alt text and JSON-LD are
   * markup, not text, so they are checked separately below.
   */
  const sitePages: [string, () => React.ReactElement][] = [
    ['/', () => <Home />],
    ['/about', () => <AboutPage />],
  ]

  it.each(sitePages)('%s uses owner words, not ours, on the whole rendered page', (_path, make) => {
    const { container } = render(make())
    expect(() => assertOwnerLanguage(container.textContent ?? '')).not.toThrow()
  })

  it.each(sitePages)('%s carries no "first meeting(s)" in JSON-LD or alt text either', (_path, make) => {
    const { container } = render(make())
    expect(container.innerHTML).not.toMatch(/first meetings?/i)
  })
})
