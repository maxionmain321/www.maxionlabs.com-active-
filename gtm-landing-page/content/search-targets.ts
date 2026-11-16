/**
 * The queries we are allowed to build pages for (MAX-738, Max 2026-11-16: "only do pages around what they search, my ICP").
 *
 * Rule: no evidence, no page. Before a new guide, add its query here with evidence measured live, then set
 * `targetQuery` on the page's PAGE export. test/seo-gates.test.tsx fails when a page's query is missing, not owner-side,
 * older than 90 days, or has no evidence (unless the page is listed in PAGES_WITHOUT_EVIDENCE, which the test reports).
 *
 * evidence.autocomplete: exact strings Google autocomplete returned that equal or extend the query, from
 *   https://suggestqueries.google.com/complete/search?client=firefox&hl=en&gl=us&q=<query> (free, curl).
 *   Off-intent strings (job, life, music-producer variants) are left out. Empty means Google returned nothing on-intent.
 * evidence.ahrefsBucket: Ahrefs free Keyword Generator US volume bucket, from OPS
 *   knowledge_base/maxionlabs-acquisition/content/seo-icp-search-demand-2026-11-15.md (measured 2026-11-15).
 * side: owner = an agency owner buying for a team; producer = a producer, solo agent or job seeker; mixed = both.
 * checked: the date the autocomplete strings were pulled live.
 */

export type SearchTarget = {
  query: string
  side: 'owner' | 'producer' | 'mixed'
  evidence: {
    autocomplete: string[]
    ahrefsBucket?: '<100' | '>100' | '>1000'
    other?: string
  }
  checked: string
  page?: string
}

export const SEARCH_TARGETS: SearchTarget[] = [
  {
    query: 'commercial insurance appointment setting',
    side: 'owner',
    evidence: {
      autocomplete: ['commercial insurance appointment setting'],
      ahrefsBucket: '<100',
      other: 'Also returned under the seeds "insurance appointment setting" and "commercial insurance appointment".',
    },
    checked: '2026-11-16',
    page: '/commercial-insurance-appointment-setting',
  },
  {
    query: 'insurance appointment setting services',
    side: 'owner',
    evidence: { autocomplete: ['insurance appointment setting services'], ahrefsBucket: '>100' },
    checked: '2026-11-16',
  },
  {
    query: 'appointment setting for insurance agencies',
    side: 'owner',
    evidence: {
      autocomplete: [],
      ahrefsBucket: '<100',
      other: 'Google returned only agent-side variants: "appointment setting for insurance agents", "appointment setters for insurance agents".',
    },
    checked: '2026-11-16',
  },
  {
    query: 'should i hire another insurance producer',
    side: 'owner',
    evidence: {
      autocomplete: [],
      other:
        '0 suggestions 2026-11-16, same for "hire another insurance producer", "how to hire an insurance producer", "how to hire a commercial insurance producer", "cost to hire an insurance producer", "insurance agency hiring producer". The AI Overview for "should my insurance agency hire an appointment setter or another producer" frames it as meetings vs closing capacity (SERP 2026-11-15). Owner question, no measured demand.',
    },
    checked: '2026-11-16',
    page: '/hire-producer-or-book-meetings',
  },
  {
    query: 'insurance producer compensation',
    side: 'owner',
    evidence: {
      autocomplete: ['insurance producer compensation', 'insurance producer compensation models'],
      ahrefsBucket: '<100',
      other: 'Owner pay-structure threads on r/InsuranceAgent (titles, 2026-11-15). Salary variants in the same list are job seekers.',
    },
    checked: '2026-11-16',
  },
  {
    query: 'insurance producer validation',
    side: 'owner',
    evidence: { autocomplete: ['insurance producer validation'] },
    checked: '2026-11-16',
  },
  {
    query: 'what is a qualified commercial insurance appointment worth',
    side: 'owner',
    evidence: {
      autocomplete: [],
      other:
        '0 suggestions for "qualified commercial insurance appointment", "how much does an insurance appointment setter cost" and "insurance appointment setter cost" (2026-11-16). SERP 2026-11-15: AI Overview present, top 10 is book-valuation pages, nobody answers it. PAA "How much should I pay an appointment setter?".',
    },
    checked: '2026-11-16',
    page: '/commercial-insurance-appointment-cost',
  },
  {
    query: 'how much do insurance leads cost',
    side: 'mixed',
    evidence: {
      autocomplete: ['how much do insurance leads cost'],
      other: 'The other suggestions are life, health and auto (personal lines).',
    },
    checked: '2026-11-16',
  },
  {
    query: 'commercial insurance leads',
    side: 'mixed',
    evidence: {
      autocomplete: [
        'commercial insurance leads',
        'commercial insurance leads for agents',
        'commercial insurance leads for sale',
        'commercial insurance lead generation',
        'commercial insurance lead generation companies',
        'commercial insurance lead sources',
      ],
      ahrefsBucket: '>100',
      other: 'The demand doc reads this cluster as mostly producers buying leads; the page has to filter for owners in its first screen.',
    },
    checked: '2026-11-16',
    page: '/commercial-insurance-leads',
  },
  {
    query: 'is buying insurance leads worth it',
    side: 'mixed',
    evidence: {
      autocomplete: ['is buying insurance leads worth it'],
      other: '"are commercial insurance leads worth it" returned 0 suggestions (2026-11-16).',
    },
    checked: '2026-11-16',
  },
  {
    query: 'how to grow an insurance agency',
    side: 'owner',
    evidence: {
      autocomplete: ['how to grow an insurance agency', 'how to grow an independent insurance agency'],
      ahrefsBucket: '<100',
      other:
        '"why is my insurance agency not growing", "insurance agency not growing", "insurance agency stopped growing" and "how to grow commercial lines" all returned 0 (2026-11-16).',
    },
    checked: '2026-11-16',
    page: '/why-insurance-agency-stopped-growing',
  },
  {
    query: 'insurance agency growth',
    side: 'owner',
    evidence: {
      autocomplete: ['insurance agency growth', 'insurance agency growth strategies', 'insurance agency growth calculator'],
      ahrefsBucket: '>100',
    },
    checked: '2026-11-16',
  },
  {
    query: 'abstrakt marketing group reviews',
    side: 'mixed',
    evidence: {
      autocomplete: [
        'abstrakt marketing group reviews',
        'abstrakt marketing group reviews reddit',
        'abstrakt marketing group bbb',
        'abstrakt marketing group scam',
        'abstrakt marketing group google reviews',
      ],
      other:
        'Buyers shopping the category, mixed with job seekers ("glassdoor", "employee reviews" in the same list). "abstrakt marketing alternatives" and "abstrakt alternative" returned 0.',
    },
    checked: '2026-11-16',
    page: '/abstrakt-alternative',
  },
  {
    query: 'x date insurance',
    side: 'mixed',
    evidence: { autocomplete: ['x date insurance', 'x date insurance leads'], ahrefsBucket: '<100' },
    checked: '2026-11-16',
  },
]

/** A query has evidence when Google autocomplete returned it (or an extension of it) or Ahrefs puts it in a bucket. */
export function hasEvidence(t: SearchTarget): boolean {
  return t.evidence.autocomplete.length > 0 || t.evidence.ahrefsBucket !== undefined
}

/**
 * Live answer pages whose targetQuery has no measured demand. Built before this gate existed (2026-11-16).
 * The test reports these; they are candidates to retitle onto a query with evidence, not models for the next page.
 */
export const PAGES_WITHOUT_EVIDENCE: string[] = ['/hire-producer-or-book-meetings', '/commercial-insurance-appointment-cost']
