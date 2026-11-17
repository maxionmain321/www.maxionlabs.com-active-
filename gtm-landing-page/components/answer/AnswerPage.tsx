import { HomeHeader, CONTAINER, SERIF, INK, MUTED, LINE, PAPER, CTA, Mono, H2 } from '@/components/home/InsuranceHome'
import { HomeFooter } from '@/components/home/HomeFooter'
import { LINKEDIN_URL, SITE_URL } from '@/content/about'

export type AnswerPageProps = {
  eyebrow: string
  h1: string
  lede: string
  sections: { id: string; heading: string; body: React.ReactNode }[]
  faq: { q: string; a: string }[]
  sources: { label: string; url: string }[]
  /**
   * ISO date the page first went live: `git log --diff-filter=A --format=%as -- content/answers/<route>.tsx`. Article
   * datePublished. Optional only so the archived drafts in content/answers/_archive/ still typecheck; every live page
   * sets it (test/seo-audit.test.tsx).
   */
  published?: string
  /** ISO date the content last changed. Article dateModified and the sitemap lastmod. */
  updated: string
  /** The page path, e.g. '/pricing'. When given, a BreadcrumbList joins the JSON-LD graph. */
  path?: string
}

export type ComparisonTableProps = {
  caption: string
  /** Column headings after the row-label column. */
  columns: string[]
  rows: { label: string; cells: React.ReactNode[] }[]
}

/**
 * A plain HTML comparison table for a section body. Server-rendered, so AI crawlers (which run no JavaScript)
 * see every cell in the initial HTML. Scrolls sideways on a phone instead of breaking the layout.
 */
export function ComparisonTable({ caption, columns, rows }: ComparisonTableProps) {
  return (
    <div className={`-mx-6 px-6 lg:mx-0 lg:px-0 overflow-x-auto`}>
      <table data-testid="comparison-table" className={`min-w-[720px] w-full border-collapse text-sm ${INK}`}>
        <caption className={`text-left ${MUTED} text-xs pb-3`}>{caption}</caption>
        <thead>
          <tr className={`border-b-2 ${LINE}`}>
            <th scope="col" className="text-left align-bottom py-2 pr-3 font-mono text-[11px] tracking-[0.18em] uppercase">
              <span className={MUTED}>Compare on</span>
            </th>
            {columns.map((c) => (
              <th key={c} scope="col" className={`text-left align-bottom py-2 px-3 ${SERIF} text-base font-medium`}>
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.label} className={`border-b ${LINE} align-top`}>
              <th scope="row" className={`text-left py-3 pr-3 font-semibold ${INK}`}>
                {r.label}
              </th>
              {r.cells.map((cell, i) => (
                <td key={i} className={`py-3 px-3 ${MUTED} leading-relaxed`}>
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

/**
 * Shared layout for answer pages: the homepage header, footer and type, one h1, a table of contents, the sections,
 * an FAQ, numbered sources, the booking CTA, and FAQPage plus Article JSON-LD (plus BreadcrumbList when `path` is set).
 */
export function AnswerPage({ eyebrow, h1, lede, sections, faq, sources, published, updated, path }: AnswerPageProps) {
  const graph: Record<string, unknown>[] = [
    {
      '@type': 'Article',
      headline: h1,
      description: lede,
      ...(published ? { datePublished: published } : {}),
      dateModified: updated,
      // Same Person as content/about.tsx JSON_LD: url and sameAs resolve the author to one entity.
      author: { '@type': 'Person', '@id': `${SITE_URL}/about#max`, name: 'Max Pidvalnyi', url: `${SITE_URL}/about`, sameAs: [LINKEDIN_URL] },
      publisher: { '@type': 'Organization', '@id': `${SITE_URL}/#org`, name: 'Maxionlabs', url: SITE_URL },
    },
    {
      '@type': 'FAQPage',
      mainEntity: faq.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    },
  ]
  if (path) {
    graph.push({
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Maxionlabs', item: 'https://www.maxionlabs.com/' },
        { '@type': 'ListItem', position: 2, name: eyebrow, item: `https://www.maxionlabs.com${path}` },
      ],
    })
  }
  const jsonLd = { '@context': 'https://schema.org', '@graph': graph }
  return (
    <>
      <HomeHeader prefix="/" />
      <main className={`min-h-screen overflow-x-clip ${PAPER} ${INK}`}>
        <article className={`${CONTAINER} py-14 lg:py-20`}>
          <div className="max-w-3xl">
            <Mono className="!text-accent">{eyebrow}</Mono>
            <h1
              className={`${SERIF} mt-5 text-[36px] md:text-[48px] font-medium ${INK} leading-[1.05] tracking-[-0.015em]`}
            >
              {h1}
            </h1>
            <p className={`mt-6 text-lg md:text-xl ${MUTED} leading-relaxed`}>{lede}</p>
            <p className={`mt-4 text-xs ${MUTED}`}>Updated {updated}</p>

            <nav aria-label="Contents" className={`mt-8 rounded-card border ${LINE} bg-white px-5 py-4`}>
              <Mono>On this page</Mono>
              <ol className="mt-3 flex flex-col gap-1.5 text-sm">
                {sections.map((s) => (
                  <li key={s.id}>
                    <a href={`#${s.id}`} className="text-accent hover:underline underline-offset-4">
                      {s.heading}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>

            {sections.map((s) => (
              <section key={s.id} id={s.id} className="mt-12 scroll-mt-20">
                <H2 className="!text-[28px] md:!text-[34px] lg:!text-[34px]">{s.heading}</H2>
                <div className={`mt-4 flex flex-col gap-4 text-base ${INK} leading-relaxed`}>{s.body}</div>
              </section>
            ))}

            <section id="faq" className="mt-14 scroll-mt-20">
              <H2 className="!text-[28px] md:!text-[34px] lg:!text-[34px]">Questions owners ask</H2>
              <dl className="mt-4">
                {faq.map((f) => (
                  <div key={f.q} data-testid="faq-item" className={`py-4 border-t ${LINE}`}>
                    <dt className={`${SERIF} text-xl ${INK}`}>{f.q}</dt>
                    <dd className={`mt-2 text-base ${MUTED} leading-relaxed`}>{f.a}</dd>
                  </div>
                ))}
              </dl>
            </section>

            <section id="sources" className="mt-14 scroll-mt-20">
              <Mono>Sources</Mono>
              <ol className={`mt-3 list-decimal pl-5 flex flex-col gap-1.5 text-sm ${MUTED}`}>
                {sources.map((s) => (
                  <li key={s.url} data-testid="source-item">
                    <a href={s.url} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline underline-offset-4">
                      {s.label}
                    </a>
                  </li>
                ))}
              </ol>
            </section>

            <div className={`mt-14 rounded-card border-2 border-accent bg-white p-6 lg:p-8`}>
              <p className={`${SERIF} text-2xl ${INK} leading-snug`}>See what this looks like for your agency.</p>
              <a href="/#book-call" className={`${CTA} mt-5`}>
                Book a 20 minute call with Max
              </a>
            </div>
          </div>
        </article>
      </main>
      <HomeFooter />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  )
}
