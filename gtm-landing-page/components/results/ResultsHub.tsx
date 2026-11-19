import { HomeHeader, CONTAINER, SERIF, INK, MUTED, LINE, PAPER, CTA, Mono, H2 } from '@/components/home/InsuranceHome'
import { HomeFooter } from '@/components/home/HomeFooter'
import { LINKEDIN_URL, SITE_URL } from '@/content/about'
import { AGGREGATE, CASE_STUDIES, RESULTS_HUB, RESULTS_PATH, RESULTS_UPDATED } from '@/content/case-studies'

const HUB_URL = `${SITE_URL}${RESULTS_PATH}`

/**
 * /results. The two aggregate rows from the proof registry, then one card per case. Same frame as /about and the
 * guides (header, paper, footer), server-rendered so every number is in the first HTML. JSON-LD: CollectionPage with an
 * ItemList of the case pages and a BreadcrumbList, authored by the same Person as the guides.
 */
export const RESULTS_JSON_LD = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'CollectionPage',
      '@id': `${HUB_URL}#page`,
      url: HUB_URL,
      name: RESULTS_HUB.title,
      description: RESULTS_HUB.description,
      inLanguage: 'en',
      dateModified: RESULTS_UPDATED,
      author: { '@type': 'Person', '@id': `${SITE_URL}/about#max`, name: 'Max Pidvalnyi', url: `${SITE_URL}/about`, sameAs: [LINKEDIN_URL] },
      publisher: { '@type': 'Organization', '@id': `${SITE_URL}/#org`, name: 'Maxionlabs', url: SITE_URL },
      mainEntity: { '@id': `${HUB_URL}#cases` },
    },
    {
      '@type': 'ItemList',
      '@id': `${HUB_URL}#cases`,
      name: 'Maxionlabs case studies',
      itemListElement: CASE_STUDIES.map((c, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: c.title,
        url: `${HUB_URL}/${c.slug}`,
      })),
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Maxionlabs', item: `${SITE_URL}/` },
        { '@type': 'ListItem', position: 2, name: 'Results', item: HUB_URL },
      ],
    },
  ],
}

export function ResultsHub() {
  return (
    <>
      <HomeHeader prefix="/" />
      <main className={`min-h-screen overflow-x-clip ${PAPER} ${INK}`}>
        <article className={`${CONTAINER} py-14 lg:py-20`}>
          <div className="max-w-3xl">
            <Mono className="!text-accent">Results</Mono>
            <h1 className={`${SERIF} mt-5 text-[36px] md:text-[48px] font-medium ${INK} leading-[1.05] tracking-[-0.015em]`}>
              What we have delivered, counted from the clients&apos; own records
            </h1>
            <p data-testid="results-answer" className={`mt-6 text-lg md:text-xl ${MUTED} leading-relaxed`}>
              Maxionlabs is an outsourced outbound agency. {AGGREGATE.meetings.value} {AGGREGATE.meetings.label}, and{' '}
              {AGGREGATE.pipeline.value} {AGGREGATE.pipeline.label}. {AGGREGATE.pipeline.detail} Six cases below, each with
              the number, who counted it, and what it means for a commercial insurance agency. Every figure is a count we
              can show you on a call.
            </p>
            <p className={`mt-4 text-xs ${MUTED}`}>Updated {RESULTS_UPDATED}</p>

            <section id="in-total" className="mt-12 scroll-mt-20">
              <H2 className="!text-[28px] md:!text-[34px] lg:!text-[34px]">In total, across every client</H2>
              <dl className="mt-4 grid sm:grid-cols-2 gap-4">
                {[AGGREGATE.meetings, AGGREGATE.pipeline].map((a) => (
                  <div key={a.value} data-testid="aggregate-row" className={`rounded-card border ${LINE} bg-white p-6 flex flex-col gap-2`}>
                    <dt className={`${SERIF} text-[40px] md:text-[48px] font-medium ${INK} leading-none`}>{a.value}</dt>
                    <dd className={`text-base ${INK} leading-snug`}>{a.label}</dd>
                    <dd className={`text-sm ${MUTED} leading-relaxed`}>{a.detail}</dd>
                    <dd className={`text-xs ${MUTED}`}>Counted on {a.verified}</dd>
                  </div>
                ))}
              </dl>
            </section>

            <section id="cases" className="mt-14 scroll-mt-20">
              <H2 className="!text-[28px] md:!text-[34px] lg:!text-[34px]">Six cases, one page each</H2>
              <p className={`mt-4 text-base ${INK} leading-relaxed`}>
                Named where the client cleared it, by business type where they did not. The order is roughly biggest proof
                first. All six are from before we narrowed to commercial insurance, so read them as proof the machine gets
                real decision makers to say yes and show up.
              </p>
              <ul className="mt-6 grid sm:grid-cols-2 gap-4">
                {CASE_STUDIES.map((c) => (
                  <li key={c.slug} data-testid="case-card" className={`rounded-card border ${LINE} bg-white p-6 flex flex-col gap-3`}>
                    <Mono>{c.industry}</Mono>
                    <p className={`${SERIF} text-[32px] font-medium ${INK} leading-none`}>{c.results[0].value}</p>
                    <p className={`text-sm ${INK} leading-snug`}>{c.results[0].label}</p>
                    <p className={`text-sm ${MUTED} leading-relaxed`}>
                      {c.client.naming === 'named' && c.client.name ? c.client.name : 'Client name private'}. {c.timeframe}.
                    </p>
                    <a href={`${RESULTS_PATH}/${c.slug}`} className="mt-auto inline-flex items-center gap-1 font-semibold text-accent hover:underline underline-offset-4">
                      Read the {c.industry.toLowerCase()} case <span aria-hidden="true">&rarr;</span>
                    </a>
                  </li>
                ))}
              </ul>
            </section>

            <section id="how-we-count" className="mt-14 scroll-mt-20">
              <H2 className="!text-[28px] md:!text-[34px] lg:!text-[34px]">How we count</H2>
              <div className={`mt-4 flex flex-col gap-4 text-base ${INK} leading-relaxed`}>
                <p>
                  A meeting is a meeting on the client&apos;s calendar. A held meeting is one that happened. A qualified meeting
                  is one the client&apos;s own team marked qualified. A customer is a paid account the client traced back to one
                  of our email threads. We never add those up into one number, and we never call pipeline revenue.
                </p>
                <p>
                  Our insurance clients are live now and their numbers stay private until they clear them. What a qualified
                  sales meeting means for an agency is on the{' '}
                  <a href="/commercial-insurance-appointment-setting" className="text-accent hover:underline underline-offset-4">
                    commercial insurance appointment setting page
                  </a>
                  , and the price is on the{' '}
                  <a href="/pricing" className="text-accent hover:underline underline-offset-4">
                    pricing page
                  </a>
                  .
                </p>
              </div>
            </section>

            <div className={`mt-14 rounded-card border-2 border-accent bg-white p-6 lg:p-8`}>
              <p className={`${SERIF} text-2xl ${INK} leading-snug`}>Ask Max where any of these numbers comes from.</p>
              <a href="/#book-call" className={`${CTA} mt-5`}>
                Book a 20 minute call with Max
              </a>
            </div>
          </div>
        </article>
      </main>
      <HomeFooter />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(RESULTS_JSON_LD) }} />
    </>
  )
}
