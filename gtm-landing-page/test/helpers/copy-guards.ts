/**
 * Shared copy guards for every public page (homepage, answer pages, later market and about pages).
 *
 * Names: a client may be named only when they published a testimonial or case study. The allow-list below is
 * read from OPS knowledge_base/maxionlabs-acquisition/proof/testimonials/manifest.md (rows marked cleared,
 * 2026-11-15). The ReviewFix founder appears as "Conor" only, never a surname. Everyone in CLIENT_NAMES_BLOCKED
 * stays off the site always.
 */

export const EM_DASH = String.fromCharCode(0x2014)
export const EN_DASH = String.fromCharCode(0x2013)

/** People and companies cleared for public naming (manifest.md, usage cleared). Documentation plus a test fixture. */
export const CLIENT_NAMES_ALLOWED = [
  'Mars Xiang',
  'Kidous Mahteme',
  'Anisa Ahmed',
  'Rebecca Ditchey',
  'Max Dalziel',
  'Conor',
]

/** Never rendered, anywhere. Includes the ReviewFix founder's surname and first-name spelling. */
export const CLIENT_NAMES_BLOCKED = [
  'Cosmo',
  'Heritage',
  'Pearsall',
  'Stiltner',
  'Herschlag',
  'Gabbel',
  'Strong Tower',
  'Connie',
  'Jeremy',
  'Tregeagle',
  'Connal',
]

/** Retired offer terms and framings, offer-v3.md and the retirement log. */
export const BANNED_TERMS = [
  'Step-down',
  'win-back',
  'Cross-sell',
  '$500',
  'pay per meeting',
  'trades, insurance and lending',
]

/**
 * Throws when rendered text or markup carries a blocked client name, a retired offer term, an em dash or an en dash.
 * `text` is the visible text; `markup` is the HTML (alt text, JSON-LD and attributes live there).
 */
export function assertCleanCopy(text: string, markup: string): void {
  const hay = [text, markup]
  for (const name of CLIENT_NAMES_BLOCKED) {
    if (hay.some((h) => h.includes(name))) throw new Error(`Blocked client name in copy: ${name}`)
  }
  for (const term of BANNED_TERMS) {
    if (hay.some((h) => h.toLowerCase().includes(term.toLowerCase()))) throw new Error(`Banned term in copy: ${term}`)
  }
  if (hay.some((h) => h.includes(EM_DASH))) throw new Error('Em dash (U+2014) in copy')
  if (hay.some((h) => h.includes(EN_DASH))) throw new Error('En dash (U+2013) in copy')
}
