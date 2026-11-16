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

/**
 * "Label: explanation" sentence openers are an AI tell (Max, 2026-11-16, on /pricing). A paragraph, list item or FAQ
 * answer may not start with a 1 to 4 word label followed by a colon.
 */
export const LABEL_OPENER = /^\s*[A-Z][\w' ]{0,30}:\s/

/**
 * Owner language (Max, 2026-11-16, MAX-738). Owners say producer, new business, in the room, appointment, and we sell
 * "qualified sales meetings". These are our words or a competitor's, and owners do not search or say them.
 * Text inside double quotes (curly or straight) is exempt: quoting a competitor's own headline is a fact, not our voice.
 */
const OWNER_LANGUAGE_BANS: [string, RegExp][] = [
  // "closer" as a role. "closer to" and "closer look" are comparatives, not a role.
  ['"closer(s)" as a role, say producer(s)', /\bclosers\b|\bcloser\b(?!\s+(?:to|look|than)\b)/gi],
  ['"first meeting(s)", say qualified sales meeting(s)', /\bfirst meetings?\b/gi],
  ['"sales appointment(s)" is Abstrakt\'s headline', /\bsales appointments?\b/gi],
  // "booked" within 6 words of the unit, either side, unless an owner or "who" did the booking ("who booked them").
  [
    '"booked" as the delivered unit, say qualified live sales meetings',
    /(?<!\b(?:who|owner|owners|he|she|they|himself|you|i)\s)\bbooked\b(?:\W+\w+){0,5}?\W+(?:meetings?|calls?|appointments?)\b|\b(?:meetings?|calls?|appointments?)\b(?:\W+\w+){0,4}?\W+booked\b/gi,
  ],
]

const QUOTED = /“[^”]*”|"[^"]*"/g

/** Every banned owner-language match in the text, quoted spans removed first. */
export function ownerLanguageOffenders(text: string): string[] {
  const hay = text.replace(QUOTED, ' ')
  const hits: string[] = []
  for (const [why, re] of OWNER_LANGUAGE_BANS) {
    for (const m of hay.matchAll(re)) {
      // The backward "meetings ... booked" branch: skip it when the booker is a person ("and who booked them").
      if (/\b(?:who|owner|owners|he|she|they|himself|you|i)\s+booked\b/i.test(m[0]) && !/^booked/i.test(m[0])) continue
      hits.push(`${why}: "${m[0]}"`)
    }
  }
  return hits
}

export function assertOwnerLanguage(text: string): void {
  const hits = ownerLanguageOffenders(text)
  if (hits.length) throw new Error(`Owner-language guard:\n  ${hits.join('\n  ')}`)
}
