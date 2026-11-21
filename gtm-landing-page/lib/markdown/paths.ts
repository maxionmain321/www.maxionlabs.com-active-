import { ANSWER_PAGES } from '@/lib/site-pages'
import { CASE_STUDIES, RESULTS_PATH } from '@/content/case-studies'

/** The pages that get a plain Markdown copy at <path>.md (home is /index.md). Answer pages and cases come from the same lists the sitemap uses. */
export const MD_PATHS: string[] = [
  '/',
  '/pricing',
  '/about',
  '/reviews',
  RESULTS_PATH,
  ...CASE_STUDIES.map((c) => `${RESULTS_PATH}/${c.slug}`),
  ...ANSWER_PAGES.map((p) => p.path),
]

export function mdUrlPath(path: string): string {
  return path === '/' ? '/index.md' : `${path}.md`
}

/** Next metadata fragment: <link rel="alternate" type="text/markdown" href="...">. Spread into `alternates`. */
export function mdAlternate(path: string) {
  return { types: { 'text/markdown': `https://www.maxionlabs.com${mdUrlPath(path)}` } }
}
