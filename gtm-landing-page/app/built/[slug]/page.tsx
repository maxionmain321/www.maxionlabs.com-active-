import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { fetchBuiltDeliverable, recordPageView, slugifyAnchor, resolveTabs } from '@/lib/built-db'
import type { BuiltTab } from '@/lib/built-db'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  robots: { index: false, follow: false },
}

type Props = { params: Promise<{ slug: string }> }

const PAGE_STYLES = `
.built-page {
  --bg: #F7FAF7;
  --surface: #FFFFFF;
  --surface-2: #EFF5EF;
  --border: #DAE8DB;
  --border-2: #C4D9C6;
  --text: #0D1F12;
  --text-muted: #3D5C45;
  --text-dim: #7A9B81;
  --nav-bg: #0D2116;
  --nav-text: #A8C4AF;
  --accent: #1A6B3C;
  --accent-light: #24924F;
  --accent-bright: #2AB560;
  --accent-bg: rgba(26,107,60,0.07);
  --accent-border: rgba(26,107,60,0.22);
  --radius: 6px;
  --radius-lg: 10px;
  --shadow: 0 1px 3px rgba(0,0,0,0.06);
}
.built-page {
  background: var(--bg);
  color: var(--text);
  font-family: 'Georgia', 'Times New Roman', serif;
  font-size: 18px;
  line-height: 1.8;
  min-height: 100vh;
}
.built-page * { box-sizing: border-box; }
.built-nav {
  background: var(--nav-bg);
  padding: 0 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 56px;
  position: sticky;
  top: 0;
  z-index: 100;
  font-family: -apple-system, BlinkMacSystemFont, 'Inter', sans-serif;
}
.built-nav-name {
  font-size: 15px;
  font-weight: 700;
  color: #fff;
  letter-spacing: -0.01em;
}
.built-nav-meta {
  font-size: 12px;
  color: var(--nav-text);
}
.built-hero {
  max-width: 740px;
  margin: 0 auto;
  padding: 56px 40px 0;
}
.built-eyebrow {
  font-family: -apple-system, BlinkMacSystemFont, 'Inter', sans-serif;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--accent);
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
}
.built-eyebrow::before {
  content: '';
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--accent-bright);
}
.built-h1 {
  font-size: 38px;
  font-weight: 700;
  line-height: 1.15;
  letter-spacing: -0.02em;
  color: var(--text);
  margin: 0 0 18px;
  font-family: -apple-system, BlinkMacSystemFont, 'Inter', sans-serif;
}
.built-h1 em { color: var(--accent); font-style: normal; }
.built-lede {
  font-size: 19px;
  color: var(--text-muted);
  line-height: 1.65;
  margin-bottom: 24px;
  font-style: italic;
}
.built-meta {
  font-family: -apple-system, BlinkMacSystemFont, 'Inter', sans-serif;
  display: flex;
  align-items: center;
  gap: 14px;
  flex-wrap: wrap;
  font-size: 13px;
  color: var(--text-dim);
  padding-bottom: 24px;
  border-bottom: 1px solid var(--border);
}
.built-meta-dot {
  width: 3px;
  height: 3px;
  background: var(--border-2);
  border-radius: 50%;
}
.built-section-nav {
  position: sticky;
  top: 56px;
  background: var(--bg);
  border-bottom: 1px solid var(--border);
  z-index: 50;
}
.built-section-nav-inner {
  max-width: 740px;
  margin: 0 auto;
  padding: 12px 40px;
  display: flex;
  gap: 22px;
  overflow-x: auto;
  font-family: -apple-system, BlinkMacSystemFont, 'Inter', sans-serif;
  font-size: 12px;
}
.built-section-nav a {
  color: var(--text-dim);
  text-decoration: none;
  white-space: nowrap;
  font-weight: 600;
}
.built-section-nav a:hover { color: var(--accent); }
.built-article {
  max-width: 740px;
  margin: 0 auto;
  padding: 0 40px 80px;
}
.built-article h2 {
  font-family: -apple-system, BlinkMacSystemFont, 'Inter', sans-serif;
  font-size: 22px;
  font-weight: 800;
  letter-spacing: -0.02em;
  color: var(--text);
  margin: 52px 0 14px;
  padding-top: 6px;
  scroll-margin-top: 120px;
}
.built-article p { margin: 0 0 22px; }
.built-article p:last-child { margin-bottom: 0; }
.built-article strong { font-weight: 700; color: var(--text); }
.built-callout {
  background: var(--accent-bg);
  border: 1px solid var(--accent-border);
  border-radius: var(--radius-lg);
  padding: 18px 22px;
  margin: 28px 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Inter', sans-serif;
  font-size: 14px;
  line-height: 1.65;
  color: var(--text-muted);
}
.built-callout-label {
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--accent);
  margin-bottom: 7px;
}
.built-prompt-block {
  background: var(--nav-bg);
  border-radius: var(--radius-lg);
  padding: 18px 22px;
  margin: 18px 0 26px;
  font-family: 'Courier New', Courier, monospace;
  font-size: 13px;
  color: #A8C4AF;
  line-height: 1.7;
  white-space: pre-wrap;
}
.built-prompt-label {
  font-family: -apple-system, BlinkMacSystemFont, 'Inter', sans-serif;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--accent-bright);
  margin-bottom: 10px;
}
.built-closing {
  background: var(--nav-bg);
  border-radius: var(--radius-lg);
  padding: 36px 32px;
  margin: 52px 0 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Inter', sans-serif;
}
.built-closing h2 {
  font-size: 22px;
  font-weight: 800;
  color: #fff;
  margin: 0 0 12px;
  letter-spacing: -0.02em;
  padding: 0;
}
.built-closing p {
  font-size: 14px;
  color: var(--nav-text);
  margin: 0 0 14px;
  line-height: 1.65;
  font-family: -apple-system, BlinkMacSystemFont, 'Inter', sans-serif;
}
.built-footer {
  max-width: 740px;
  margin: 28px auto 0;
  padding: 0 40px 48px;
  font-family: -apple-system, BlinkMacSystemFont, 'Inter', sans-serif;
  font-size: 11px;
  color: var(--text-dim);
}
@media (max-width: 600px) {
  .built-nav { padding: 0 20px; }
  .built-hero { padding: 36px 22px 0; }
  .built-h1 { font-size: 30px; }
  .built-section-nav-inner { padding: 12px 22px; }
  .built-article { padding: 0 22px 60px; }
  .built-closing { padding: 28px 22px; }
  .built-footer { padding: 0 22px 48px; }
}
`

export default async function BuiltPage({ params }: Props) {
  const { slug } = await params
  const d = await fetchBuiltDeliverable(slug)
  if (!d) notFound()

  recordPageView(slug)

  const c = d.page_content_json
  const tabs = resolveTabs(c)
  const dateStr = new Date(d.created_at).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })

  return (
    <div className="built-page">
      <style dangerouslySetInnerHTML={{ __html: PAGE_STYLES }} />

      <nav className="built-nav">
        <span className="built-nav-name">Maxionlabs</span>
        <span className="built-nav-meta">{dateStr} · 2 min read</span>
      </nav>

      <header className="built-hero">
        <div className="built-eyebrow">Prospect brief</div>
        <h1 className="built-h1">
          Built for <em>{d.prospect_company}</em>
        </h1>
        {c.h1_subtitle && <p className="built-lede">{c.h1_subtitle}</p>}
        <div className="built-meta">
          <span>Diagnostic</span>
          <span className="built-meta-dot" />
          <span>One specific lever</span>
          <span className="built-meta-dot" />
          <span>One move you can run this week</span>
        </div>
      </header>

      <div className="built-section-nav">
        <div className="built-section-nav-inner">
          {tabs.map((t) => (
            <a key={t.title} href={`#${slugifyAnchor(t.title)}`}>
              {t.title}
            </a>
          ))}
        </div>
      </div>

      <article className="built-article">
        {tabs.map((t, i) => (
          <RenderTab key={t.title} tab={t} index={i} total={tabs.length} />
        ))}
      </article>

      <footer className="built-footer">
        Built by hand for {d.prospect_company}. Not indexed. Not shared.
      </footer>
    </div>
  )
}

function RenderTab({ tab, index, total }: { tab: BuiltTab; index: number; total: number }) {
  const id = slugifyAnchor(tab.title)
  const isClosing = index === total - 1

  if (isClosing) {
    return (
      <section id={id} className="built-closing">
        <h2>{tab.title}</h2>
        {renderBody(tab.body, { invert: true })}
      </section>
    )
  }

  return (
    <section id={id}>
      <h2>{tab.title}</h2>
      {renderBody(tab.body)}
    </section>
  )
}

function renderBody(body: string, opts: { invert?: boolean } = {}) {
  // Split on triple-backtick code fences. Even-indexed chunks are prose, odd are code blocks.
  const parts = body.split(/```/g)
  return parts.map((part, idx) => {
    const isCode = idx % 2 === 1
    if (isCode) {
      return (
        <div key={idx} className="built-prompt-block">
          <div className="built-prompt-label">Example outbound script</div>
          {part.trim()}
        </div>
      )
    }
    // Render paragraphs separated by blank lines
    const paragraphs = part.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean)
    return paragraphs.map((p, j) => (
      <p key={`${idx}-${j}`} style={opts.invert ? { color: 'var(--nav-text)' } : undefined}>
        {p}
      </p>
    ))
  })
}
