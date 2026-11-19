/**
 * One case study = one file in this folder shaped like this. The page template (components/results/CaseStudyPage.tsx),
 * the /results hub, the sitemap and the tests all read the same object, so a case ships by adding a file and listing it in
 * index.ts. How to fill it, and the proof rules that bind every field, are in README.md next to this file.
 *
 * The shape follows what the pages ChatGPT cites for owner proof questions have in common (OPS
 * knowledge_base/maxionlabs-acquisition/content/cited-case-study-patterns-2026-11-19.md): a fact table and takeaways
 * before the story, the client's words before the story, the unit defined next to every number, captioned receipts, and
 * links to the other cases.
 */

export type CaseResult = {
  /** The number as it appears on the page, e.g. "35" or "$73,800". */
  value: string
  /** The unit in the registry row's own words, e.g. "sales-qualified demos". Rendered as "{value} {label}". */
  label: string
  /**
   * Rendered. One plain sentence on what counted and who counted it, from the registry row's Definition column, e.g.
   * "A demo the client's sales team marked qualified in their CRM after holding it." The reader sees it under the number.
   */
  how: string
  /**
   * Where this number comes from and how it may be quoted: the funnel-tracker row, its verified date and its caveats.
   * Not rendered. A test fails the page when it is missing, so a number cannot ship without its paper trail.
   */
  caveat: string
}

export type CaseTestimonial = {
  /** Verbatim, from the source named below. Never from memory. */
  quote: string
  name: string
  role: string
  source: 'written' | 'video' | 'G2' | 'Clutch'
  /** Where the quote was said, for the reader: "Slack, 30 October 2026" or "Recorded interview, 28 August 2026". */
  said: string
  /** Public URL of the source where one exists (a YouTube testimonial, a review page). */
  url?: string
  /** A masked screenshot already published under public/images/proof/, with its alt text. */
  screenshot?: { src: string; alt: string }
}

/** One row of the "At a glance" table at the top of the page. */
export type GlanceRow = {
  label: string
  value: string
}

/**
 * A masked receipt: a screenshot of the real system (the client's portal, a Slack thread, a campaign dashboard), with
 * the caption saying where it is from and when. Only images the proof registry marks showable, hosted under a path that
 * does not name an anonymized client.
 */
export type CaseEvidence = {
  src: string
  alt: string
  /** Rendered under the image: what it shows and where it comes from, e.g. "The client's portal, status column, masked. October 2026." */
  caption: string
}

export type CaseStudy = {
  /** URL segment under /results/. */
  slug: string
  client: {
    /** What the page calls the client: a business type when anonymized, the company when the registry row clears the name. */
    label: string
    naming: 'named' | 'anonymized'
    /** The cleared company name, named rows only. */
    name?: string
  }
  /** The buyer's industry in plain words, shown in the eyebrow and the hub card. */
  industry: string
  /** The "Case" column of the registry row this page quotes, so a reader of the data file can find it. */
  trackerRow: string
  /** Page title, 60 characters or fewer, unique across the site. */
  title: string
  /** Meta description, 160 characters or fewer, unique. */
  description: string
  /** The h1. */
  h1: string
  /** The lede. The first sentence is the direct answer: the result, for whom, in what time. Carries results[0].value. */
  answer: string
  /**
   * The fact table under the lede, in this order where the row applies: Client, Industry, Who we reached, What we sent,
   * The unit we counted, Engagement, Deal structure. The template appends the published, updated and counted-on dates.
   * Every value is a fact the registry row or the client's attribution file states.
   */
  glance: GlanceRow[]
  /** Three or four bullets, each carrying a figure that is already a result on the page. The block a reader skims and a model lifts. */
  takeaways: string[]
  /** When the work ran, e.g. "March to October 2026". Dates the registry supports, nothing inferred. */
  timeframe: string
  /** Paragraphs. Who the client is, what they sell, what was not working. */
  situation: string[]
  /** Paragraphs. The mechanics, in the order they ran. */
  whatWeDid: string[]
  /** The headline number first. Each one a QUOTABLE row figure with its caveat. */
  results: CaseResult[]
  /** One short paragraph under the results, for a caveat the reader should see (e.g. meetings are not customers). */
  resultsNote?: string
  /** Rendered right after the glance, before the story, where one exists. */
  testimonial?: CaseTestimonial
  /** Captioned masked receipts, rendered after the results. Leave out when the registry has no showable image under a neutral path. */
  evidence?: CaseEvidence[]
  /**
   * One short paragraph: what this case means for a commercial insurance agency owner. The template appends the fixed
   * sentence that links /commercial-insurance-appointment-setting and /pricing, so do not link them here.
   */
  insuranceTakeaway: string
  /**
   * The case's own questions. The template appends two fixed ones: why the client is not named (anonymized pages only,
   * unless the case already answers it) and what the same work costs a commercial insurance agency today.
   */
  faq: { q: string; a: string }[]
  /** Public sources a reader can open. The client's own public page, a public video, our pricing page. */
  sources: { label: string; url: string }[]
  /**
   * Phrases this page may never carry, from the registry row's caveats ("cold email" on the career-services row,
   * "removed" on the reputation row). Matched case-insensitively against the whole rendered page by the tests.
   */
  forbidden: string[]
  /** ISO date the page first went live. Article datePublished. */
  published: string
  /** ISO date the content last changed. Article dateModified and the sitemap lastmod. */
  updated: string
  /** The registry row's verified date on the day this file was last edited. Shown to the reader as "Counted on". */
  verified: string
}
