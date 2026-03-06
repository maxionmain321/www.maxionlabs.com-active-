import { createClient } from '@libsql/client'

function getClient() {
  const url = process.env.TURSO_DATABASE_URL || 'file:.data/strategy.db'
  const authToken = process.env.TURSO_AUTH_TOKEN

  return createClient(
    authToken ? { url, authToken } : { url }
  )
}

let initialized = false

async function ensureTable() {
  if (initialized) return
  const client = getClient()
  await client.execute(`
    CREATE TABLE IF NOT EXISTS strategy_usage (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT,
      domain TEXT NOT NULL,
      url TEXT NOT NULL,
      icp TEXT,
      deal_size TEXT,
      strategy_json TEXT,
      created_at TEXT
    )
  `)
  await client.execute(`CREATE INDEX IF NOT EXISTS idx_domain ON strategy_usage(domain)`)
  await client.execute(`CREATE INDEX IF NOT EXISTS idx_email ON strategy_usage(email)`)
  initialized = true
}

function extractDomain(url: string): string {
  let clean = url.trim().toLowerCase()
  clean = clean.replace(/^https?:\/\//, '')
  clean = clean.replace(/^www\./, '')
  clean = clean.split('/')[0]
  return clean
}

export async function isDomainUsed(url: string): Promise<boolean> {
  await ensureTable()
  const client = getClient()
  const domain = extractDomain(url)
  const result = await client.execute({
    sql: 'SELECT id FROM strategy_usage WHERE domain = ?',
    args: [domain],
  })
  return result.rows.length > 0
}

export async function isEmailUsed(email: string): Promise<boolean> {
  await ensureTable()
  const client = getClient()
  const normalized = email.toLowerCase().trim()
  const result = await client.execute({
    sql: 'SELECT id FROM strategy_usage WHERE email = ?',
    args: [normalized],
  })
  return result.rows.length > 0
}

export async function recordGeneration(
  url: string,
  icp: string,
  dealSize: string,
  strategyJson: string
): Promise<number> {
  await ensureTable()
  const client = getClient()
  const domain = extractDomain(url)
  const result = await client.execute({
    sql: 'INSERT INTO strategy_usage (domain, url, icp, deal_size, strategy_json, created_at) VALUES (?, ?, ?, ?, ?, datetime(?))',
    args: [domain, url, icp, dealSize, strategyJson, new Date().toISOString()],
  })
  return Number(result.lastInsertRowid)
}

export async function recordEmailUnlock(id: number, email: string): Promise<void> {
  await ensureTable()
  const client = getClient()
  await client.execute({
    sql: 'UPDATE strategy_usage SET email = ? WHERE id = ?',
    args: [email.toLowerCase().trim(), id],
  })
}

export async function getGenerationById(id: number): Promise<Record<string, unknown> | undefined> {
  await ensureTable()
  const client = getClient()
  const result = await client.execute({
    sql: 'SELECT * FROM strategy_usage WHERE id = ?',
    args: [id],
  })
  if (result.rows.length === 0) return undefined
  const row = result.rows[0]
  const obj: Record<string, unknown> = {}
  for (const key of Object.keys(row)) {
    obj[key] = row[key as keyof typeof row]
  }
  return obj
}
