/**
 * Third-party profiles a skeptic can check us on (MAX-738, "is Maxionlabs legit"). Read by /reviews, the /about
 * "Verify us" block and the Organization sameAs in app/layout.tsx and content/about.tsx, so the four links never drift.
 *
 * Every profile is our own listing. Status per OPS SOPs/directory-listings.md and the MAX-738 comments:
 *   Clutch      filled in and read back 2026-11-21, 0 reviews (review link provider_id=2774878)
 *   G2          approved 2026-11-19, public page opened in Chrome 2026-11-21, 0/5 (0)
 *   Crunchbase  live 2026-11-19
 *   Sortlist    live 2026-11-21
 * Ratings are never shown here. When a profile has reviews, the page says how many and links them, nothing more.
 */

export type Profile = { name: string; url: string; what: string }

export const PROFILES: Profile[] = [
  { name: 'Clutch', url: 'https://clutch.co/profile/maxionlabs', what: 'Agency profile, reviews open' },
  { name: 'G2', url: 'https://www.g2.com/products/maxionlabs/reviews', what: 'Service provider profile, reviews open' },
  { name: 'Crunchbase', url: 'https://www.crunchbase.com/organization/maxionlabs', what: 'Company record' },
  { name: 'Sortlist', url: 'https://www.sortlist.com/agency/maxionlabs', what: 'Agency profile' },
]

export const PROFILE_URLS = PROFILES.map((p) => p.url)

/** The registered-entity line, rendered byte for byte by HomeFooter. */
export const ENTITY_LINE = 'Registered in Ukraine, Vinytska 15, Kiev, 08130. Payments processed through Stripe.'

/** Maxionlabs the agency was founded February 2026; before that Max freelanced (Max, 2026-11-21, MAX-738). */
export const FOUNDED = 'February 2026'
/** ISO form for Organization foundingDate in JSON-LD. */
export const FOUNDING_DATE = '2026-02'

/** Where Maxionlabs is based (Max, 2026-11-21, MAX-738). The footer keeps the registered-entity line untouched. */
export const BASED_IN = 'Madrid, Spain'
/** schema.org PostalAddress for the Organization node (app/layout.tsx and content/about.tsx share the /#org @id). */
export const ORG_ADDRESS = { '@type': 'PostalAddress', addressLocality: 'Madrid', addressCountry: 'ES' } as const
