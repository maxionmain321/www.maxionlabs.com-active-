import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { CaseStudyPage } from '@/components/results/CaseStudyPage'
import { CASE_STUDIES, findCase, RESULTS_PATH } from '@/content/case-studies'
import { SITE_URL } from '@/content/about'

/**
 * One route for every case study. The data lives in content/case-studies/<slug>.ts and the rendering in
 * components/results/CaseStudyPage.tsx, so a new case is a new data file, never a new page component.
 */

type Props = { params: Promise<{ slug: string }> }

export const dynamicParams = false

export function generateStaticParams() {
  return CASE_STUDIES.map((c) => ({ slug: c.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const study = findCase(slug)
  if (!study) return {}
  const canonical = `${SITE_URL}${RESULTS_PATH}/${study.slug}`
  return {
    title: study.title,
    description: study.description,
    alternates: { canonical },
    openGraph: { title: study.title, description: study.description, type: 'article', siteName: 'Maxionlabs', url: canonical },
    twitter: { card: 'summary_large_image', title: study.title, description: study.description },
  }
}

export default async function Page({ params }: Props) {
  const { slug } = await params
  const study = findCase(slug)
  if (!study) notFound()
  return <CaseStudyPage study={study} />
}
