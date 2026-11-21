import type { SitePage } from '@/lib/site-pages'
import type { AnswerPageProps } from '@/components/answer/AnswerPage'
import { INK, LINE, MUTED, SERIF } from '@/components/home/InsuranceHome'
import { CASE_STUDIES, RESULTS_PATH } from '@/content/case-studies'
import { PROFILES, FOUNDED } from '@/content/profiles'
import { ProfileLinks } from '@/components/home/ProfileLinks'
import { LINKEDIN_URL } from '@/content/about'

/**
 * /reviews (MAX-738). For a prospect already in the funnel who searches "Maxionlabs reviews" or asks an AI engine "is
 * Maxionlabs legit". The answer line comes first, then what clients said in their own words, then where to check us.
 *
 * Rules of the page:
 *  - Quotes are only the cleared testimonials already on the site: each case study's `testimonial` (content/case-studies,
 *    every one traced to OPS proof/testimonials/manifest.md and a QUOTABLE funnel-tracker row), plus Rebecca Ditchey's
 *    on-camera line (manifest row "cleared", verbatim at 13:16 in proof/testimonials/aesc_2026-09-21_youtube-package.md,
 *    video embedded on the homepage since 2026-09-22).
 *  - Attribution is exactly what the case page shows (name, role, date). Names cleared by Max on 2026-11-21: Ivan
 *    Ivankovic (EU tender) and "Conor", first name only (online reputation). An uncleared case reads 'The client'.
 *  - No ratings, stars or review counts we do not have. Clutch and G2 both show 0 reviews (checked 2026-11-21), so the
 *    page says the first ones are being collected and links the profiles. No AggregateRating or Review JSON-LD.
 *  - No location in the body. The registered entity line lives in the footer; /about carries "Based in Madrid, Spain".
 */

export const UPDATED = '2026-11-21'
export const UPDATED_LABEL = 'November 2026'
export const PRICE_LINE = 'As of November 2026, 4,725 USD a month, month to month, for 15 qualified appointments.'

export const PAGE: SitePage = {
  path: '/reviews',
  title: 'Maxionlabs reviews: what clients say, and where to check',
  description:
    'Maxionlabs reviews from named clients on video and in writing, plus our Clutch, G2, Crunchbase and Sortlist profiles so you can check us yourself.',
  kind: 'about',
  changeFrequency: 'monthly',
  updated: UPDATED,
}

/** The answer line. One sentence: what clients say, and where to verify it. */
export const ANSWER =
  'Clients describe Maxionlabs as honest, easy to work with and worth what they paid, in their own words on video and in writing below, and you can check us yourself on Clutch, G2, Crunchbase and Sortlist.'

export type ReviewQuote = {
  quote: string
  /** Who said it, as the page may show them: a name only on a named case. */
  who: string
  role: string
  said: string
  /** The public source: the YouTube testimonial where one exists. */
  url?: string
  /** The case study behind the quote, when there is one. */
  casePath?: string
}

/** Rebecca Ditchey, executive education. Not a case page; the homepage embeds her video. */
const AESC: ReviewQuote = {
  quote: 'I saw a return on the investment that we made in you pretty quickly.',
  who: 'Rebecca Ditchey',
  role: 'Senior Program Manager, AESC',
  said: 'Recorded interview, 21 September 2026',
  url: 'https://www.youtube.com/watch?v=laYwFMVGZhw',
}

/** Video quotes first (someone else's face and voice), then written. Within each, the order of the /results hub. */
export const QUOTES: ReviewQuote[] = (() => {
  // Attribution exactly as the case page shows it (CaseStudyPage: name, role, said). Cleared names on anonymized cases
  // (Ivan Ivankovic, "Conor" first name only) appear as they do there; an uncleared one is already 'The client'.
  const fromCases: ReviewQuote[] = CASE_STUDIES.filter((c) => c.testimonial).map((c) => {
    const t = c.testimonial!
    return {
      quote: t.quote,
      who: t.name,
      role: t.role,
      said: t.said,
      url: t.url,
      casePath: `${RESULTS_PATH}/${c.slug}`,
    }
  })
  const all = [...fromCases, AESC]
  return [...all.filter((q) => q.url), ...all.filter((q) => !q.url)]
})()

const WORDS = ['no', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten']
const NAMED = QUOTES.filter((q) => q.who !== 'The client')
/** Derived from the cards so the FAQ count never drifts from what the page shows. */
export const NAMED_LINE = `${WORDS[NAMED.length]} clients put their names to the testimonials on this page, ${WORDS[NAMED.filter((q) => q.url).length]} of them on video`

export const FAQ = [
  {
    q: 'Is Maxionlabs legit?',
    a: `Yes. Maxionlabs is an outsourced outbound agency founded in ${FOUNDED} by Max Pidvalnyi. The registered company and address are in the footer of every page, payments go through Stripe, and ${NAMED_LINE}. Maxionlabs has no connection to Maxion Research or any other company with a similar name.`,
  },
  {
    q: 'Where can I see independent reviews of Maxionlabs?',
    a: 'On Clutch and G2. Both profiles are live and the first reviews are being collected now, so neither shows a rating yet as of November 2026. Until they do, the client videos on YouTube are the closest independent check. Crunchbase and Sortlist list the company too.',
  },
  {
    q: 'Who runs Maxionlabs?',
    a: 'Max Pidvalnyi (Maksym Pidvalnyi), the founder. He is the person you talk to on the call, and his LinkedIn profile is linked from the about page.',
  },
  {
    q: 'How do you get paid?',
    a: `Monthly and upfront, through Stripe, and work starts on payment. ${PRICE_LINE} Cancel any month.`,
  },
]

const linkCls = 'text-accent hover:underline underline-offset-4'

function QuoteCards() {
  return (
    <ul data-testid="review-quotes" className="flex flex-col gap-4">
      {QUOTES.map((q) => (
        <li key={q.quote} data-testid="review-card" className={`rounded-card border ${LINE} bg-white p-5 lg:p-6`}>
          <blockquote className={`${SERIF} text-xl ${INK} leading-snug`}>{`“${q.quote}”`}</blockquote>
          <p className={`mt-3 text-sm ${INK}`}>
            <span className="font-semibold">{q.who}</span>
            <span className={MUTED}>{`, ${q.role}`}</span>
          </p>
          <p className={`mt-1 text-sm ${MUTED}`}>
            {q.said}
            {q.url && (
              <>
                {'. '}
                <a href={q.url} target="_blank" rel="noopener noreferrer" className={linkCls}>
                  Watch the video
                </a>
              </>
            )}
            {q.casePath && (
              <>
                {'. '}
                <a href={q.casePath} className={linkCls}>
                  Read the case study
                </a>
              </>
            )}
          </p>
        </li>
      ))}
    </ul>
  )
}

export const CONTENT: AnswerPageProps = {
  eyebrow: 'Reviews',
  h1: 'Maxionlabs reviews',
  lede: ANSWER,
  published: UPDATED,
  updated: UPDATED,
  path: PAGE.path,
  toc: false,
  faqHeading: 'Questions people ask before they trust us',
  sections: [
    {
      id: 'in-their-words',
      heading: 'What clients say',
      body: (
        <>
          <p className={MUTED}>
            Every quote is word for word from the client. Names appear only where the client cleared them.
          </p>
          <QuoteCards />
        </>
      ),
    },
    {
      id: 'verify',
      heading: 'Verify us elsewhere',
      body: (
        <>
          <p>
            The first Clutch reviews are being collected now, so the profile shows no rating yet. G2 is the same. We will
            not show a score here until those sites do.
          </p>
          <ProfileLinks />
          <p className={`text-sm ${MUTED}`}>
            Or check the founder directly on{' '}
            <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className={linkCls}>
              LinkedIn
            </a>{' '}
            and read <a href="/about" className={linkCls}>who runs Maxionlabs</a>.
          </p>
        </>
      ),
    },
  ],
  faq: FAQ,
  sources: [
    ...PROFILES.map((p) => ({ label: `Maxionlabs on ${p.name}`, url: p.url })),
    ...QUOTES.filter((q) => q.url).map((q) => ({ label: `${q.who}, ${q.role}, video testimonial on YouTube`, url: q.url! })),
  ],
}
