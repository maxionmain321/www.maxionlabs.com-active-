import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { PRICE_STANDARD_LINE } from '@/lib/pricing-copy'
import { MD_PATHS, mdUrlPath } from '@/lib/markdown/paths'
import { markdownFor } from '@/lib/markdown/render'
import { ANSWER_PAGES } from '@/lib/site-pages'
import { PAGE as reviews } from '@/content/reviews'
import { CASE_STUDIES } from '@/content/case-studies'
import { EM_DASH, EN_DASH } from './helpers/copy-guards'
import robots from '@/app/robots'

/** Plain Markdown copies of the money pages (MAX-738), generated from the same components the pages render. */

const FORBIDDEN = [EM_DASH, EN_DASH, ';', 'closer', 'booked', 'first meeting', 'sales appointment', '$500']

describe('markdown paths', () => {
  it('maps a page path to its .md URL', () => {
    expect(mdUrlPath('/')).toBe('/index.md')
    expect(mdUrlPath('/pricing')).toBe('/pricing.md')
    expect(mdUrlPath('/results/inframail')).toBe('/results/inframail.md')
  })
  it('covers the money pages, every case and every answer page', () => {
    for (const p of ['/', '/pricing', '/about', '/reviews', '/results', '/abstrakt-alternative', '/best-appointment-setting-companies-commercial-insurance'])
      expect(MD_PATHS).toContain(p)
    for (const c of CASE_STUDIES) expect(MD_PATHS).toContain(`/results/${c.slug}`)
    for (const a of ANSWER_PAGES) expect(MD_PATHS).toContain(a.path)
  })
})

describe('markdown copies', () => {
  it('/pricing.md carries the dated price line and starts with the title', () => {
    const md = markdownFor('/pricing')!
    expect(md.startsWith('# ')).toBe(true)
    expect(md).toContain(PRICE_STANDARD_LINE)
    expect(md).toContain('## ')
    expect(md).toMatch(/Sources/)
  })

  it('every answer page .md starts with title then its answer line, and has no forbidden words', () => {
    for (const a of ANSWER_PAGES) {
      const md = markdownFor(a.path)!
      expect(md, a.path).toBeTruthy()
      const [first, second] = md.split('\n\n')
      expect(first.startsWith('# ')).toBe(true)
      expect(second.length).toBeGreaterThan(40)
      // A competitor's own words in quotation marks may carry them (the Abstrakt page quotes "meetings booked"), as in the page tests.
      const ours = md.replace(/\u201C[^\u201D]*\u201D|"[^"]*"/g, ' ').toLowerCase()
      for (const f of FORBIDDEN) expect(/^\w/.test(f) ? new RegExp(`\\b${f.replace(/[$]/g, '\\$')}`, 'i').test(ours) : ours.includes(f.toLowerCase()), `${a.path} has "${f}"`).toBe(false)
    }
  })

  it('every markdown copy is clean of dashes and semicolons, with no HTML left', () => {
    for (const p of MD_PATHS) {
      const md = markdownFor(p)!
      expect(md, p).toBeTruthy()
      expect(md.startsWith('# '), p).toBe(true)
      for (const f of [EM_DASH, EN_DASH, ';']) expect(md.includes(f), `${p} has ${f}`).toBe(false)
      expect(md, p).not.toMatch(/<\/?(div|p|span|section|svg)\b/)
    }
  })

  it('keeps the price rule: the exact price only on pricing, reviews, the comparison page (best-appointment-setting-companies)', () => {
    const allowed = new Set(['/pricing', reviews.path, '/best-appointment-setting-companies-commercial-insurance'])
    for (const p of MD_PATHS) {
      if (allowed.has(p)) continue
      expect(markdownFor(p)!.includes('4,725'), `${p} quotes the price`).toBe(false)
    }
  })

  it('case page .md carries its answer line', () => {
    for (const c of CASE_STUDIES) expect(markdownFor(`/results/${c.slug}`)).toContain(c.answer.slice(0, 60))
  })
})

describe('robots and llms.txt', () => {
  it('names the AI crawlers with allow /', () => {
    const r = robots()
    const rules = Array.isArray(r.rules) ? r.rules : [r.rules]
    const named = rules.filter((x) => x.allow === '/' || (Array.isArray(x.allow) && x.allow.includes('/'))).flatMap((x) => (Array.isArray(x.userAgent) ? x.userAgent : [x.userAgent]))
    for (const bot of ['GPTBot', 'OAI-SearchBot', 'ChatGPT-User', 'ClaudeBot', 'Claude-User', 'Claude-SearchBot', 'PerplexityBot', 'Perplexity-User', 'Google-Extended', 'Applebot-Extended', 'Bingbot', 'CCBot'])
      expect(named).toContain(bot)
    expect(r.sitemap).toBe('https://www.maxionlabs.com/sitemap.xml')
  })
  it('llms.txt lists every .md URL', () => {
    const txt = readFileSync(join(process.cwd(), 'public/llms.txt'), 'utf8')
    expect(txt).toContain('## Markdown versions')
    for (const p of MD_PATHS) expect(txt).toContain(`https://www.maxionlabs.com${mdUrlPath(p)}`)
  })
})

describe('alternate link', () => {
  it('every md page declares <link rel="alternate" type="text/markdown"> in its metadata', async () => {
    const mods: Record<string, () => Promise<{ metadata?: any; generateMetadata?: any }>> = {
      '/': () => import('@/app/page'),
      '/pricing': () => import('@/app/pricing/page'),
      '/about': () => import('@/app/about/page'),
      '/reviews': () => import('@/app/reviews/page'),
      '/results': () => import('@/app/results/page'),
      '/abstrakt-alternative': () => import('@/app/abstrakt-alternative/page'),
      '/best-appointment-setting-companies-commercial-insurance': () => import('@/app/best-appointment-setting-companies-commercial-insurance/page'),
      '/commercial-insurance-appointment-setting': () => import('@/app/commercial-insurance-appointment-setting/page'),
      '/commercial-insurance-leads': () => import('@/app/commercial-insurance-leads/page'),
      '/hire-producer-or-book-meetings': () => import('@/app/hire-producer-or-book-meetings/page'),
      '/why-insurance-agency-stopped-growing': () => import('@/app/why-insurance-agency-stopped-growing/page'),
    }
    for (const [p, load] of Object.entries(mods)) {
      const m = await load()
      expect(m.metadata.alternates.types['text/markdown'], p).toBe(`https://www.maxionlabs.com${mdUrlPath(p)}`)
    }
    const slug = await import('@/app/results/[slug]/page')
    const meta = await slug.generateMetadata({ params: Promise.resolve({ slug: CASE_STUDIES[0].slug }) })
    expect(meta.alternates?.types?.['text/markdown']).toBe(`https://www.maxionlabs.com/results/${CASE_STUDIES[0].slug}.md`)
  })
})
