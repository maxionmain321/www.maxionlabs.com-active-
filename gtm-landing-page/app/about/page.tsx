import type { Metadata } from 'next'
import { HomeHeader, CONTAINER, SERIF, INK, MUTED, LINE, PAPER, CTA, Mono, H2 } from '@/components/home/InsuranceHome'
import { HomeFooter } from '@/components/home/HomeFooter'
import { PAGE, EYEBROW, H1, LEDE, SECTIONS, RESULTS, JSON_LD, SITE_URL, VERIFY_FACTS } from '@/content/about'
import { ProfileLinks } from '@/components/home/ProfileLinks'

export const metadata: Metadata = {
  title: PAGE.title,
  description: PAGE.description,
  alternates: { canonical: `${SITE_URL}${PAGE.path}` },
  openGraph: { title: PAGE.title, description: PAGE.description, type: 'profile', siteName: 'Maxionlabs', url: `${SITE_URL}${PAGE.path}` },
  twitter: { card: 'summary', title: PAGE.title, description: PAGE.description },
}

/** Same frame as AnswerPage (header, paper, footer, JSON-LD), without the FAQ, sources and table of contents. */
export default function AboutPage() {
  return (
    <>
      <HomeHeader prefix="/" />
      <main className={`min-h-screen overflow-x-clip ${PAPER} ${INK}`}>
        <article className={`${CONTAINER} py-14 lg:py-20`}>
          <div className="max-w-3xl">
            <Mono className="!text-accent">{EYEBROW}</Mono>
            <h1 className={`${SERIF} mt-5 text-[36px] md:text-[48px] font-medium ${INK} leading-[1.05] tracking-[-0.015em]`}>
              {H1}
            </h1>
            <p data-testid="about-answer" className={`mt-6 text-lg md:text-xl ${MUTED} leading-relaxed`}>
              {LEDE}
            </p>

            {SECTIONS.map((s) => (
              <section key={s.id} id={s.id} className="mt-12 scroll-mt-20">
                <H2 className="!text-[28px] md:!text-[34px] lg:!text-[34px]">{s.heading}</H2>
                <div className={`mt-4 flex flex-col gap-4 text-base ${INK} leading-relaxed`}>
                  {s.paragraphs.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                  {s.id === 'results' && (
                    <ul data-testid="about-results" className="mt-2 flex flex-col">
                      {RESULTS.map((r) => (
                        <li key={r.case} className={`py-3 border-t ${LINE} flex flex-col gap-1`}>
                          <span className={`font-semibold ${INK}`}>{r.case}</span>
                          <span>{r.result}</span>
                          <span className={`text-sm ${MUTED}`}>{r.note}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </section>
            ))}

            <section id="verify-us" data-testid="about-verify" className="mt-12 scroll-mt-20">
              <H2 className="!text-[28px] md:!text-[34px] lg:!text-[34px]">Verify us</H2>
              <dl className={`mt-4 rounded-card border ${LINE} bg-white divide-y divide-[#D8DEE6] text-sm`}>
                {VERIFY_FACTS.map((f) => (
                  <div key={f.label} className="grid grid-cols-[9rem_1fr] gap-3 px-4 py-3">
                    <dt className={MUTED}>{f.label}</dt>
                    <dd className={`${INK} font-medium`}>{f.value}</dd>
                  </div>
                ))}
              </dl>
              <div className="mt-4">
                <ProfileLinks testId="about-profiles" />
              </div>
              <a href="/reviews" className="mt-4 inline-block text-sm text-accent hover:underline underline-offset-4">
                Read client reviews
              </a>
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }} />
    </>
  )
}
