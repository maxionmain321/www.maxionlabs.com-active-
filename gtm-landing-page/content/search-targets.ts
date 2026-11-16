/**
 * The queries we are allowed to build pages for (MAX-738, Max 2026-11-16: "only do pages around what they search, my ICP").
 *
 * Rule: no evidence, no page. Before a new guide, add its query here with evidence measured live, then set
 * `targetQuery` on the page's PAGE export. test/seo-gates.test.tsx fails when a page's query is missing, not owner-side,
 * older than 90 days, has no evidence, has volumeUS under 10, or has a producer-side SERP (unless the page is listed in
 * PAGES_WITHOUT_EVIDENCE, which the test reports).
 *
 * evidence.autocomplete: exact strings Google autocomplete returned that equal or extend the query, from
 *   https://suggestqueries.google.com/complete/search?client=firefox&hl=en&gl=us&q=<query> (free, curl).
 *   Off-intent strings (job, life, music-producer variants) are left out. Empty means Google returned nothing on-intent.
 * evidence.ahrefsBucket: Ahrefs free Keyword Generator US volume bucket, from OPS
 *   knowledge_base/maxionlabs-acquisition/content/seo-icp-search-demand-2026-11-15.md (measured 2026-11-15).
 * volumeUS: Serpstat region_queries_count for g_us, pulled through treg (about $0.0005 a keyword):
 *   treg call serpstat.google.keywords.volume --method POST --data '{"method":"SerpstatKeywordProcedure.getKeywordsInfo",
 *   "id":"1","params":{"se":"g_us","keywords":["<query>", ...]}}'. null = Serpstat has no row for the keyword (2026-11-16).
 * icp: who the top 10 Google results are written for, read live (treg call anyapi.google.serp.organic, gl=us hl=en,
 *   about $0.0005 a query, 2026-11-16). owner = growing an agency, hiring, agency marketing, agency operations.
 *   producer = lead vendors selling to individual agents, life, health, auto, Medicare, final expense, "for agents",
 *   job seekers. mixed = at least two owner-side results in a SERP that is otherwise producer-side or generic B2B.
 *   basis is one line a reader can check against the SERP.
 * side: the demand doc's owner-vs-solo classification of the query's wording (kept for the record; icp is the live read).
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
  volumeUS: number | null
  volumeSource: 'treg serpstat g_us'
  icp: { audience: 'owner' | 'producer' | 'mixed'; basis: string; checked: string }
  page?: string
}

const VOL = 'treg serpstat g_us' as const
const SERP_DATE = '2026-11-16'

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
    volumeUS: 10,
    volumeSource: VOL,
    icp: {
      audience: 'mixed',
      basis:
        '3 of 9 results are vendors selling to agencies (Superhuman Prospecting, Hitrate, Flatworld), 3 are "for insurance agents" tips, 1 is an Indeed jobs page, 1 r/sales thread; nobody writes for commercial owners by name.',
      checked: SERP_DATE,
    },
    page: '/commercial-insurance-appointment-setting',
  },
  {
    query: 'insurance appointment setting services',
    side: 'owner',
    evidence: { autocomplete: ['insurance appointment setting services'], ahrefsBucket: '>100' },
    checked: '2026-11-16',
    volumeUS: 20,
    volumeSource: VOL,
    icp: {
      audience: 'mixed',
      basis:
        '4 of 9 results are vendors selling to agencies or B2B buyers (Belkins, MarketReach, LaunchLeads, truep4p), 3 are life or captive-agent pieces, 1 YouTube for agents, 1 Quora thread.',
      checked: SERP_DATE,
    },
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
    volumeUS: null,
    volumeSource: VOL,
    icp: {
      audience: 'producer',
      basis:
        '5 of 10 results are for individual agents (Ritter, Connections Magazine, a final-expense setter, r/InsuranceAgent, insurance-forums), 1 Indeed jobs page, 2 sell to agencies (Hitrate, Sonant), 2 r/sales threads.',
      checked: SERP_DATE,
    },
  },
  {
    query: 'should i hire another insurance producer',
    side: 'owner',
    evidence: {
      autocomplete: [],
      other:
        '0 suggestions 2026-11-16, same for "hire another insurance producer", "how to hire an insurance producer", "how to hire a commercial insurance producer", "cost to hire an insurance producer", "insurance agency hiring producer". The AI Overview for "should my insurance agency hire an appointment setter or another producer" frames it as meetings vs closing capacity (SERP 2026-11-15). Owner question, no measured demand. The page built for it (/hire-producer-or-book-meetings) was retargeted onto "insurance producer compensation" on 2026-11-16.',
    },
    checked: '2026-11-16',
    volumeUS: null,
    volumeSource: VOL,
    icp: {
      audience: 'mixed',
      basis:
        '2 of 9 results are for agency owners (r/Insurance "Hiring New Agents", AgentSync producer management); 5 are consumer pages on switching to an independent agent; Google reads the query as a consumer one.',
      checked: SERP_DATE,
    },
  },
  {
    query: 'insurance producer compensation',
    side: 'owner',
    evidence: {
      autocomplete: ['insurance producer compensation', 'insurance producer compensation models'],
      ahrefsBucket: '<100',
      other:
        'Owner pay-structure threads on r/InsuranceAgent (titles, 2026-11-15). Salary variants in the same list are job seekers. Re-checked live 2026-11-16: both strings still returned.',
    },
    checked: '2026-11-16',
    volumeUS: 10,
    volumeSource: VOL,
    icp: {
      audience: 'mixed',
      basis:
        '2 of 9 results are written for owners paying producers (Big I Virtual University base-and-growth method, SmartChoice producer commission structure), 6 are carrier compensation-disclosure pages (AIG, Hartford, Chubb, NAIC, IAT, GatherGuard), 1 r/InsuranceAgent earnings thread.',
      checked: SERP_DATE,
    },
    page: '/hire-producer-or-book-meetings',
  },
  {
    query: 'insurance producer validation',
    side: 'owner',
    evidence: { autocomplete: ['insurance producer validation'] },
    checked: '2026-11-16',
    volumeUS: null,
    volumeSource: VOL,
    icp: {
      audience: 'mixed',
      basis:
        '3 of 9 results are written for owners (IA Magazine "Road to Riches", Agency Consulting, ReSource Pro), 4 are licence-verification homonyms (NIPR twice, Colorado DORA, AgentSync), 1 Pie Insurance piece for agents, 1 recruiter validation schedule.',
      checked: SERP_DATE,
    },
  },
  {
    query: 'what is a qualified commercial insurance appointment worth',
    side: 'owner',
    evidence: {
      autocomplete: [],
      other:
        '0 suggestions for "qualified commercial insurance appointment", "how much does an insurance appointment setter cost" and "insurance appointment setter cost" (2026-11-16). SERP 2026-11-15: AI Overview present, top 10 is book-valuation pages, nobody answers it. PAA "How much should I pay an appointment setter?". The page built for it (/commercial-insurance-appointment-cost) was folded into /pricing on 2026-11-16.',
    },
    checked: '2026-11-16',
    volumeUS: null,
    volumeSource: VOL,
    icp: {
      audience: 'mixed',
      basis:
        '0 of 9 results answer the question: 4 are agency-valuation pages for owners selling an agency, 5 are business-insurance quote pages for consumers.',
      checked: SERP_DATE,
    },
  },
  {
    query: 'how much does an appointment setter cost',
    side: 'mixed',
    evidence: {
      autocomplete: ['how much does an appointment setter cost', 'how much does appointment setting cost', 'how much do appointment setters cost'],
      other:
        'B2B buyers across industries; job-seeker strings left out. Insurance-specific shapes all returned 0 (2026-11-16): "how much does an insurance appointment setter cost", "insurance appointment setting cost", "cost per appointment insurance", "pay per appointment insurance". Was the target of /commercial-insurance-appointment-cost, folded into /pricing 2026-11-16.',
    },
    checked: '2026-11-16',
    volumeUS: null,
    volumeSource: VOL,
    icp: {
      audience: 'mixed',
      basis:
        '7 of 10 results are generic B2B buyer guides on setter cost (LeadRiver, r/b2bmarketing, Smirnov, TalentAlliance, ContractorTalk, SetSmart, SalesTactics), 2 are salary or jobs pages, 1 r/VirtualAssistant; 0 insurance-specific.',
      checked: SERP_DATE,
    },
  },
  {
    query: 'how much do insurance leads cost',
    side: 'mixed',
    evidence: {
      autocomplete: ['how much do insurance leads cost'],
      other: 'The other suggestions are life, health and auto (personal lines).',
    },
    checked: '2026-11-16',
    volumeUS: 30,
    volumeSource: VOL,
    icp: {
      audience: 'producer',
      basis:
        '10 of 10 results price life, health or final-expense leads for individual agents (two r/InsuranceAgent threads, a Facebook group, ActiveProspect, Aged Lead Store twice, GetInsureLeads, The Price Group, LeadDistro); 0 commercial.',
      checked: SERP_DATE,
    },
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
    volumeUS: 260,
    volumeSource: VOL,
    icp: {
      audience: 'mixed',
      basis:
        '6 of 8 results are lead vendors or prospecting tips for individual agents (SmartChoice, Expandi, Nationwide agent blog, insuranceleads.com, two YouTube videos), 2 address agencies (Nexpro lead generation for agencies, InsuranceLeadReviews).',
      checked: SERP_DATE,
    },
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
    volumeUS: 1,
    volumeSource: VOL,
    icp: {
      audience: 'producer',
      basis:
        '10 of 10 results are life or personal-lines agents weighing bought leads (EverQuote, two r/InsuranceAgent threads, three Facebook groups, SmartFinancial twice, insuranceleads.com); 0 agency owners.',
      checked: SERP_DATE,
    },
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
    volumeUS: 50,
    volumeSource: VOL,
    icp: {
      audience: 'owner',
      basis:
        '6 of 10 results are written for agency owners or founders (two LinkedIn pieces, an r/InsuranceAgent owner thread, Brightway, a YouTube agency-growth video, Ease), 4 are solo agents starting out or growing a personal book.',
      checked: SERP_DATE,
    },
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
    volumeUS: 50,
    volumeSource: VOL,
    icp: {
      audience: 'owner',
      basis:
        '9 of 9 results are written for agency owners (Renaissance, two r/InsuranceAgent owner threads, Zywave, Sage, SIAA, Applied GA, a LinkedIn growth-strategies piece, Kaplan).',
      checked: SERP_DATE,
    },
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
    volumeUS: 210,
    volumeSource: VOL,
    icp: {
      audience: 'mixed',
      basis:
        '6 of 10 results are buyer-side review or complaint pages (BBB, Trustpilot, Trustindex, iTRate, two r/StLouis threads), 4 are employee reviews on Indeed and Glassdoor; the buyers are B2B companies of every kind, not insurance-specific.',
      checked: SERP_DATE,
    },
    page: '/abstrakt-alternative',
  },
  {
    query: 'x date insurance',
    side: 'mixed',
    evidence: { autocomplete: ['x date insurance', 'x date insurance leads'], ahrefsBucket: '<100' },
    checked: '2026-11-16',
    volumeUS: null,
    volumeSource: VOL,
    icp: {
      audience: 'mixed',
      basis:
        '3 of 6 results are the Insurance Xdate lead vendor\'s own surfaces (site, App Store, Facebook), 1 "how insurance agents use x-dates" explainer, 1 Insurance Journal forum on buying x-date data, 1 InsuredMine agency-automation page.',
      checked: SERP_DATE,
    },
  },
  {
    query: 'insurance agency marketing',
    side: 'owner',
    evidence: {
      autocomplete: ['insurance agency marketing', 'insurance agency marketing ideas'],
      other:
        '7 of 10 autocomplete strings are brand navigation for Insurance Agency Marketing Services Inc (an IMO), including "topeka", "reviews", "photos" and "jobs"; left out above. Rejected at the ICP gate, see REJECTED_TARGETS.',
    },
    checked: '2026-11-16',
    volumeUS: 140,
    volumeSource: VOL,
    icp: {
      audience: 'producer',
      basis:
        '5 of 10 results are the IMO brand Insurance Agency Marketing Services Inc or a homonym, 4 are personal-lines agent marketing tips, 0 are written for commercial agency owners.',
      checked: SERP_DATE,
    },
  },
]

/** A query has evidence when Google autocomplete returned it (or an extension of it) or Ahrefs puts it in a bucket. */
export function hasEvidence(t: SearchTarget): boolean {
  return t.evidence.autocomplete.length > 0 || t.evidence.ahrefsBucket !== undefined
}

/** The volume floor a page's target must clear (Max, 2026-11-16): under 10 US searches a month is not a page. */
export const MIN_VOLUME_US = 10

/**
 * Live answer pages whose targetQuery has no measured demand or volume. Built before this gate existed (2026-11-16).
 * The test reports these; they are candidates to retitle onto a query with evidence, not models for the next page.
 * Empty since 2026-11-16: /hire-producer-or-book-meetings was retargeted and /commercial-insurance-appointment-cost
 * was folded into /pricing.
 */
export const PAGES_WITHOUT_EVIDENCE: string[] = []

/**
 * Queries looked at and rejected at the ICP gate, so nobody re-raises them. A page may not target any of these
 * (test/seo-gates.test.tsx). Volume is Serpstat g_us where it has a row.
 */
export const REJECTED_TARGETS: { query: string; reason: string; checked: string }[] = [
  {
    query: 'insurance agency marketing',
    reason:
      '140/mo, but 5 of the top 10 results are the IMO brand Insurance Agency Marketing Services Inc or a homonym, 4 are personal-lines agent tips, 0 are written for commercial agency owners; 7 of 10 autocomplete strings are IAMS brand navigation.',
    checked: '2026-11-16',
  },
  {
    query: 'commercial insurance marketing',
    reason: '"Marketing" is a job title in commercial insurance (the marketing rep places business with carriers); autocomplete returns salary and jobs strings.',
    checked: '2026-11-16',
  },
  {
    query: 'commercial lines marketing',
    reason: 'Same homonym: a commercial lines marketing rep is a role; autocomplete returns salary and jobs strings.',
    checked: '2026-11-16',
  },
  {
    query: 'how to get commercial insurance clients',
    reason: '1/mo on Serpstat g_us, and the SERP is written for producers building a personal book, not owners.',
    checked: '2026-11-16',
  },
]
