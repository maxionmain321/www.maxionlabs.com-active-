import { NextResponse } from 'next/server'
import { Pool } from 'pg'

export const revalidate = 3600

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

export async function GET() {
  const p = getPool()
  if (!p) return NextResponse.json({ error: 'no db' }, { status: 503 })

  try {
    const { rows } = await p.query(
      'SELECT positive_replies_30d, pipeline_value_usd, active_clients, last_updated FROM landing_page_stats WHERE id = 1'
    )
    if (rows.length === 0) {
      return NextResponse.json({ error: 'no stats' }, { status: 503 })
    }
    const r = rows[0]
    return NextResponse.json({
      positive_replies_30d: Number(r.positive_replies_30d),
      pipeline_value_usd: Number(r.pipeline_value_usd),
      active_clients: Number(r.active_clients),
      last_updated: r.last_updated ? new Date(r.last_updated).toISOString() : null,
    })
  } catch (e) {
    console.error('[live-stats] query failed', e)
    return NextResponse.json({ error: 'query failed' }, { status: 503 })
  }
}
