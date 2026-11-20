import type { CSSProperties } from 'react'
import { SERIF, INK, MUTED, LINE } from '@/components/home/InsuranceHome'
import type { CaseStudy, CaseResult } from '@/content/case-studies/types'

/**
 * Small server-rendered diagrams for the case pages and the hub, built only from a case's own data (results[] and the
 * glance rows), never from a number typed here. The look borrows from joinlegion.io's little diagrams: a faint dot
 * grid behind the figure, thin dashed grey tracks with the counted part in the accent colour, hollow lamp dots that
 * fill at the end of the path, mono uppercase sublabels, tiles with a whisper of a gradient. All in the site's own ink,
 * line and accent colours and its serif for the figures.
 */

/** The dot grid behind a diagram. Inline style because the colour is the site's line colour, not a Tailwind token. */
export const DOTS: CSSProperties = {
  backgroundImage: 'radial-gradient(#D8DEE6 1.1px, transparent 1.3px)',
  backgroundSize: '18px 18px',
}

export const TILE = 'bg-gradient-to-b from-white to-[#F1F4F8]'
export const MONO = 'font-mono text-[10px] font-medium tracking-[0.14em] uppercase'

/* ------------------------------------------------------------------ path */

/**
 * The stages a result can sit on, in path order. A result is placed by its own label, checked in the order below so
 * "sales-qualified demos held" lands on held, "interested leads from 19,467 emails" lands on replies, and a figure
 * that is not a stage at all ("8.6x return on what they paid us", "$7K to $20K a year, each contract") stays off the
 * path. Nothing is inferred: a case with no replies figure has no replies node.
 */
const STAGES: { key: string; tag: string; test: RegExp }[] = [
  { key: 'sent', tag: 'Sent', test: /\bemails?\b/i },
  { key: 'replies', tag: 'Replies', test: /\b(replies|reply|replied|leads?|interested|engaged)\b/i },
  { key: 'set', tag: 'Set', test: /\bset\b/i },
  { key: 'held', tag: 'Held', test: /\bheld\b/i },
  { key: 'qualified', tag: 'Qualified', test: /qualified|opportunit/i },
  { key: 'signed', tag: 'Signed', test: /\bcustomers?\b|\bcloses\b|\bsigned\b|\bpaying\b/i },
  { key: 'collected', tag: 'Collected', test: /\brevenue\b/i },
]
const CHECK_ORDER = ['held', 'qualified', 'set', 'collected', 'signed', 'replies', 'sent']

export type PathNode = { stage: string; tag: string; result: CaseResult; index: number }

/** The results of a case that sit on the list-to-counted path, in path order. Exported so the tests can check it. */
export function pathNodes(study: CaseStudy): PathNode[] {
  const nodes: PathNode[] = []
  study.results.forEach((result, index) => {
    const key = CHECK_ORDER.find((k) => STAGES.find((s) => s.key === k)!.test.test(result.label))
    if (!key) return
    nodes.push({ stage: key, tag: STAGES.find((s) => s.key === key)!.tag, result, index })
  })
  const order = (n: PathNode) => STAGES.findIndex((s) => s.key === n.stage) * 100 + n.index
  return nodes.sort((a, b) => order(a) - order(b))
}

/**
 * The case's figures on one path: sent, replies, set, held, qualified, signed, collected, whichever this case has.
 * Each node is a results[] value with its own label, so the unit under every number is the row's unit. Horizontal
 * from the sm breakpoint, a vertical track on phones. Shown only when at least two figures sit on the path.
 */
export function CasePath({ study }: { study: CaseStudy }) {
  const nodes = pathNodes(study)
  if (nodes.length < 2) return null
  return (
    <figure data-testid="case-path" className={`rounded-card border ${LINE} bg-white p-5 md:p-6`} style={DOTS}>
      <figcaption className={`${MONO} ${MUTED}`}>The path, in this case&apos;s own figures</figcaption>
      <ol className="mt-4 flex flex-col sm:flex-row sm:gap-3">
        {nodes.map((n, i) => {
          const last = i === nodes.length - 1
          return (
            <li key={n.result.value + n.result.label} data-testid="case-path-node" className="flex gap-4 sm:flex-col sm:flex-1 sm:gap-3">
              <div className="flex flex-col items-center self-stretch sm:flex-row sm:self-auto sm:w-full" aria-hidden="true">
                <span
                  className={`block w-3.5 h-3.5 rounded-full border-2 border-accent flex-shrink-0 ${last ? 'bg-accent' : 'bg-white'}`}
                />
                {!last && <span className="flex-1 min-h-4 border-l sm:border-l-0 sm:border-t border-dashed border-[#9AA3B1]" />}
              </div>
              <div className={`pb-6 sm:pb-0 ${last ? '' : ''}`}>
                <span className={`${MONO} text-accent`}>{n.tag}</span>
                <span data-testid="case-path-value" className={`block ${SERIF} text-[28px] md:text-[32px] font-medium ${INK} leading-none mt-1`}>
                  {n.result.value}
                </span>
                <span className={`block mt-1.5 text-xs ${MUTED} leading-snug sm:pr-3`}>{n.result.label}</span>
              </div>
            </li>
          )
        })}
      </ol>
    </figure>
  )
}

/* ------------------------------------------------------- work and count */

const OUR_ROWS = ['Who we reached', 'What we sent']
const COUNT_ROWS = ['The unit we counted', 'Who counted']

function Lane({ title, rows, accent }: { title: string; rows: CaseStudy['glance']; accent: boolean }) {
  return (
    <div className={`rounded-card border ${accent ? 'border-accent/50' : LINE} ${TILE} p-4 flex flex-col`}>
      <p className={`${MONO} ${accent ? 'text-accent' : MUTED}`}>{title}</p>
      <ul className="flex flex-col">
        {rows.map((r) => (
          <li key={r.label} data-testid="case-lane-row" className="mt-3 flex flex-col gap-0.5">
            <span className={`${MONO} ${MUTED}`}>{r.label}</span>
            <span className={`text-sm ${INK} leading-snug`}>{r.value}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

/**
 * The glance table's rows as two tiles: what we did (who we reached, what we sent) and what was counted (the unit,
 * who counted it), joined by the deal structure where the row exists. Nothing on it is new: every cell is a glance
 * value already in the fact table above. Skipped when either side has no row.
 */
export function WorkAndCount({ study }: { study: CaseStudy }) {
  const ours = study.glance.filter((g) => OUR_ROWS.includes(g.label))
  const count = study.glance.filter((g) => COUNT_ROWS.includes(g.label))
  const deal = study.glance.find((g) => g.label === 'Deal structure')
  if (!ours.length || !count.length) return null
  return (
    <figure data-testid="case-work-count" className={`rounded-card border ${LINE} bg-white p-5 md:p-6`} style={DOTS}>
      <figcaption className={`${MONO} ${MUTED}`}>The work and the count</figcaption>
      <div className="mt-4 grid md:grid-cols-[1fr_auto_1fr] gap-4 items-stretch">
        <Lane title="Our side" rows={ours} accent={false} />
        <div className="flex md:flex-col items-center justify-center gap-2 md:max-w-[160px] px-2">
          <svg
            viewBox="0 0 24 24"
            className="w-6 h-6 text-accent rotate-90 md:rotate-0 flex-shrink-0"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            focusable="false"
          >
            <path d="M4 12h16M14 6l6 6-6 6" />
          </svg>
          {deal && (
            <span data-testid="case-deal-chip" className={`text-center text-[11px] ${MUTED} leading-snug`}>
              {deal.value}
            </span>
          )}
        </div>
        <Lane title="The count" rows={count} accent />
      </div>
    </figure>
  )
}
