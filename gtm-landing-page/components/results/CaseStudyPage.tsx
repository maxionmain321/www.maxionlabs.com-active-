import { AnswerPage } from '@/components/answer/AnswerPage'
import type { AnswerPageProps } from '@/components/answer/AnswerPage'
import { SERIF, INK, MUTED, LINE } from '@/components/home/InsuranceHome'
import { SITE_URL } from '@/content/about'
import { RESULTS_PATH } from '@/content/case-studies'
import type { CaseStudy } from '@/content/case-studies/types'

const A = 'text-accent hover:underline underline-offset-4'

/** The result figures, big, each with its unit, server-rendered so a crawler reads every number in the first HTML. */
function ResultsGrid({ study }: { study: CaseStudy }) {
  return (
    <dl className="grid sm:grid-cols-2 gap-4 mt-2">
      {study.results.map((r) => (
        <div key={`${r.value} ${r.label}`} data-testid="case-result" className={`rounded-card border ${LINE} bg-white p-5 flex flex-col gap-1`}>
          <dt className={`${SERIF} text-[34px] md:text-[40px] font-medium ${INK} leading-none`}>{r.value}</dt>
          <dd className={`text-sm ${MUTED} leading-snug`}>{r.label}</dd>
        </div>
      ))}
    </dl>
  )
}

function Testimonial({ t }: { t: NonNullable<CaseStudy['testimonial']> }) {
  return (
    <figure data-testid="case-testimonial" className={`rounded-card border ${LINE} bg-white p-6 flex flex-col gap-4`}>
      <blockquote className={`${SERIF} text-xl md:text-2xl ${INK} leading-snug border-l-2 border-accent/60 pl-4`}>
        &ldquo;{t.quote}&rdquo;
      </blockquote>
      <figcaption className={`text-sm ${MUTED}`}>
        <span className={`font-semibold ${INK}`}>{t.name}</span>, {t.role}. {t.said}.
        {t.url && (
          <>
            {' '}
            <a href={t.url} target="_blank" rel="noopener noreferrer" className={A}>
              {t.source === 'video' ? 'Watch the video' : 'See the source'}
            </a>
          </>
        )}
      </figcaption>
      {t.screenshot && (
        <img src={t.screenshot.src} alt={t.screenshot.alt} loading="lazy" className={`rounded-card border ${LINE} w-full`} />
      )}
    </figure>
  )
}

/**
 * Builds the AnswerPage props for one case, so every case shares the guides' frame: header, eyebrow, h1, lede, table of
 * contents, sections, FAQ, sources, CTA, footer, and Article plus FAQPage plus BreadcrumbList JSON-LD. Adds an ItemList of
 * the result figures and the Organization the Article is about, and the insurance takeaway with its two fixed links.
 */
export function caseStudyProps(study: CaseStudy): AnswerPageProps {
  const path = `${RESULTS_PATH}/${study.slug}`
  const sections: AnswerPageProps['sections'] = [
    {
      id: 'situation',
      heading: 'The situation',
      body: (
        <>
          {study.situation.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </>
      ),
    },
    {
      id: 'what-we-did',
      heading: 'What we did',
      body: (
        <>
          {study.whatWeDid.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </>
      ),
    },
    {
      id: 'results',
      heading: 'The results',
      body: (
        <>
          <ResultsGrid study={study} />
          {study.resultsNote && <p className={`text-sm ${MUTED}`}>{study.resultsNote}</p>}
          <p className={`text-xs ${MUTED}`}>{study.timeframe}. Counted on {study.verified}.</p>
        </>
      ),
    },
  ]
  if (study.testimonial) {
    sections.push({
      id: 'in-their-words',
      heading: 'In their words',
      body: <Testimonial t={study.testimonial} />,
    })
  }
  sections.push({
    id: 'for-insurance-agencies',
    heading: 'What this means for a commercial insurance agency',
    body: (
      <>
        <p>{study.insuranceTakeaway}</p>
        <p>
          Today Maxionlabs is an outsourced outbound agency for independent commercial P&amp;C and benefits agencies. The unit is a{' '}
          <a href="/commercial-insurance-appointment-setting" className={A}>
            qualified sales meeting with a business owner
          </a>{' '}
          above your floor, held live with your producer, 15 a month for{' '}
          <a href="/pricing" className={A}>
            $4,725 a month
          </a>
          , month to month. The other cases are on the{' '}
          <a href={RESULTS_PATH} className={A}>
            results page
          </a>
          .
        </p>
      </>
    ),
  })

  const extraGraph: Record<string, unknown>[] = [
    {
      '@type': 'ItemList',
      '@id': `${SITE_URL}${path}#results`,
      name: `Results, ${study.client.label}`,
      itemListElement: study.results.map((r, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: `${r.value} ${r.label}`,
      })),
    },
  ]

  return {
    path,
    breadcrumbs: [{ name: 'Results', path: RESULTS_PATH }],
    eyebrow: `Case study, ${study.industry}`,
    h1: study.h1,
    lede: study.answer,
    published: study.published,
    updated: study.updated,
    sections,
    faq: study.faq,
    faqHeading: 'Questions about this case',
    sources: study.sources,
    extraGraph,
    article: {
      about: {
        '@type': 'Organization',
        name: study.client.naming === 'named' && study.client.name ? study.client.name : study.client.label,
        description: study.industry,
      },
    },
  }
}

export function CaseStudyPage({ study }: { study: CaseStudy }) {
  return <AnswerPage {...caseStudyProps(study)} />
}
