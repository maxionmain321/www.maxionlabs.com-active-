import { AnswerPage } from '@/components/answer/AnswerPage'
import type { AnswerPageProps } from '@/components/answer/AnswerPage'
import { SERIF, INK, MUTED, LINE } from '@/components/home/InsuranceHome'
import { SITE_URL } from '@/content/about'
import { CASE_STUDIES, RESULTS_PATH } from '@/content/case-studies'
import type { CaseStudy } from '@/content/case-studies/types'

const A = 'text-accent hover:underline underline-offset-4'

/**
 * The fixed FAQ every case page carries after its own questions. The cost answer is the pricing page's offer, the one
 * place that owns the number. The naming answer is appended only on anonymized pages whose own FAQ does not cover it.
 */
export const COST_FAQ = {
  q: 'What would the same work cost a commercial insurance agency today?',
  a: 'The unit today is a qualified sales meeting with a business owner above your premium floor, held live with your producer. 15 a month for $4,725 a month, month to month, with the terms on the pricing page.',
}

export const NAMING_FAQ = {
  q: 'Why is the client not named?',
  a: 'Our agreement with this client keeps their name private, so the page gives the business type and nothing that identifies them. The numbers are counted from their own records and we can walk through the method on a call.',
}

/** The fact table under the lede, plain HTML so a crawler reads every cell in the first response. */
function Glance({ study }: { study: CaseStudy }) {
  const rows = [
    ...study.glance,
    { label: 'Published', value: study.published },
    { label: 'Updated', value: study.updated },
    { label: 'Counted on', value: study.verified },
  ]
  return (
    <div className="-mx-6 px-6 lg:mx-0 lg:px-0 overflow-x-auto">
      <table data-testid="case-glance" className={`w-full border-collapse text-sm ${INK}`}>
        <caption className={`text-left ${MUTED} text-xs pb-3`}>The engagement in one table, every value from the client&apos;s own records.</caption>
        <tbody>
          {rows.map((r) => (
            <tr key={r.label} className={`border-b ${LINE} align-top`}>
              <th scope="row" className={`text-left py-2.5 pr-4 font-semibold ${INK} whitespace-nowrap`}>
                {r.label}
              </th>
              <td className={`py-2.5 ${MUTED} leading-relaxed`}>{r.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

/** The result figures, big, each with its unit and the one-line definition of what counted, server-rendered. */
function ResultsGrid({ study }: { study: CaseStudy }) {
  return (
    <dl className="grid sm:grid-cols-2 gap-4 mt-2">
      {study.results.map((r) => (
        <div key={`${r.value} ${r.label}`} data-testid="case-result" className={`rounded-card border ${LINE} bg-white p-5 flex flex-col gap-1`}>
          <dt className={`${SERIF} text-[34px] md:text-[40px] font-medium ${INK} leading-none`}>{r.value}</dt>
          <dd className={`text-sm ${INK} leading-snug`}>{r.label}</dd>
          <dd data-testid="case-result-how" className={`text-xs ${MUTED} leading-relaxed mt-1`}>
            {r.how}
          </dd>
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

/** Captioned masked receipts from the real systems, after the results. */
function Evidence({ items }: { items: NonNullable<CaseStudy['evidence']> }) {
  return (
    <div className="grid gap-4 mt-4">
      {items.map((e) => (
        <figure key={e.src} data-testid="case-evidence" className={`rounded-card border ${LINE} bg-white p-4 flex flex-col gap-3`}>
          <img src={e.src} alt={e.alt} loading="lazy" className={`rounded-card border ${LINE} w-full`} />
          <figcaption className={`text-xs ${MUTED} leading-relaxed`}>{e.caption}</figcaption>
        </figure>
      ))}
    </div>
  )
}

/** The fixed questions appended to the case's own FAQ. */
export function caseFaq(study: CaseStudy): CaseStudy['faq'] {
  const faq = [...study.faq]
  const namesItself = study.faq.some((f) => /not named|only named/i.test(f.q))
  if (study.client.naming === 'anonymized' && !namesItself) faq.push(NAMING_FAQ)
  faq.push(COST_FAQ)
  return faq
}

/**
 * Builds the AnswerPage props for one case, so every case shares the guides' frame: header, eyebrow, h1, lede, table of
 * contents, sections, FAQ, sources, CTA, footer, and Article plus FAQPage plus BreadcrumbList JSON-LD. The order is the
 * one the cited case studies share: the fact table and the takeaways, the client's words, then the story, the results
 * with what counted under each number, the receipts, the insurance takeaway, and the other cases.
 */
export function caseStudyProps(study: CaseStudy): AnswerPageProps {
  const path = `${RESULTS_PATH}/${study.slug}`
  const others = CASE_STUDIES.filter((c) => c.slug !== study.slug)
  const sections: AnswerPageProps['sections'] = [
    {
      id: 'at-a-glance',
      heading: 'At a glance',
      body: (
        <>
          <Glance study={study} />
          <ul data-testid="case-takeaways" className={`mt-2 flex flex-col gap-2 pl-5 list-disc ${INK}`}>
            {study.takeaways.map((t) => (
              <li key={t} className="leading-relaxed">
                {t}
              </li>
            ))}
          </ul>
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
  sections.push(
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
          {study.evidence && study.evidence.length > 0 && <Evidence items={study.evidence} />}
        </>
      ),
    },
    {
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
    },
    {
      id: 'other-cases',
      heading: 'The other cases',
      body: (
        <ul data-testid="other-cases" className={`flex flex-col gap-2 pl-5 list-disc ${INK}`}>
          {others.map((c) => (
            <li key={c.slug} className="leading-relaxed">
              {/* The headline figure and the industry, not the other page's h1: another row's forbidden words must not leak in. */}
              <a href={`${RESULTS_PATH}/${c.slug}`} className={A}>
                {c.results[0].value} {c.results[0].label}, {c.industry.toLowerCase()}
              </a>
            </li>
          ))}
        </ul>
      ),
    },
  )

  const extraGraph: Record<string, unknown>[] = [
    {
      '@type': 'ItemList',
      '@id': `${SITE_URL}${path}#results`,
      name: `Results, ${study.client.label}`,
      itemListElement: study.results.map((r, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: `${r.value} ${r.label}`,
        description: r.how,
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
    faq: caseFaq(study),
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
