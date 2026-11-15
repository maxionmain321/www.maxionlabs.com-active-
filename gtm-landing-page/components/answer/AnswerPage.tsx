import { HomeHeader, CONTAINER, SERIF, INK, MUTED, LINE, PAPER, CTA, Mono, H2 } from '@/components/home/InsuranceHome'
import { HomeFooter } from '@/components/home/HomeFooter'

export type AnswerPageProps = {
  eyebrow: string
  h1: string
  lede: string
  sections: { id: string; heading: string; body: React.ReactNode }[]
  faq: { q: string; a: string }[]
  sources: { label: string; url: string }[]
  updated: string
}

/**
 * Shared layout for answer pages: the homepage header, footer and type, one h1, a table of contents, the sections,
 * an FAQ, numbered sources, the booking CTA, and FAQPage plus Article JSON-LD.
 */
export function AnswerPage({ eyebrow, h1, lede, sections, faq, sources, updated }: AnswerPageProps) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        headline: h1,
        description: lede,
        dateModified: updated,
        author: { '@type': 'Person', name: 'Max Pidvalnyi' },
        publisher: { '@type': 'Organization', name: 'Maxionlabs', url: 'https://www.maxionlabs.com' },
      },
      {
        '@type': 'FAQPage',
        mainEntity: faq.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      },
    ],
  }
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
