import { Pool } from 'pg'

let pool: Pool | null = null

function getPool(): Pool | null {
  if (pool) return pool
  const url = process.env.DATABASE_URL
  if (!url) return null
  pool = new Pool({
    connectionString: url,
    ssl: { rejectUnauthorized: false },
    max: 2,
  })
  return pool
}

export type BuiltTab = { title: string; body: string }

export type BuiltPageContent = {
  h1_subtitle?: string
  tab1: BuiltTab
  tab2: BuiltTab
  tab3: BuiltTab
  tab4: BuiltTab
}

export type BuiltDeliverable = {
  slug: string
  prospect_company: string
  prospect_person: string | null
  page_content_json: BuiltPageContent
  created_at: string
  view_count: number
}

export async function fetchBuiltDeliverable(
  slug: string
): Promise<BuiltDeliverable | null> {
  const p = getPool()
  if (!p) return null
  const { rows } = await p.query(
    `SELECT slug, prospect_company, prospect_person, page_content_json, created_at, view_count
     FROM built_deliverables
     WHERE slug = $1
     LIMIT 1`,
    [slug]
  )
  if (rows.length === 0) return null
  const r = rows[0]
  return {
    slug: r.slug,
    prospect_company: r.prospect_company,
    prospect_person: r.prospect_person,
    page_content_json: r.page_content_json as BuiltPageContent,
    created_at: r.created_at,
    view_count: Number(r.view_count),
  }
}

export async function recordPageView(slug: string): Promise<void> {
  const p = getPool()
  if (!p) return
  try {
    await p.query(
      `UPDATE built_deliverables
       SET view_count = view_count + 1,
           last_viewed_at = now(),
           first_viewed_at = COALESCE(first_viewed_at, now())
       WHERE slug = $1`,
      [slug]
    )
  } catch (e) {
    console.error('[built-db] recordPageView failed', e)
  }
}

function slugifyAnchor(s: string): string {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export { slugifyAnchor }
