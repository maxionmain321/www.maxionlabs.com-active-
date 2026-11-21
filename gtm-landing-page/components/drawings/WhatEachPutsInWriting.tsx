import { Drawing, Label, STROKE, INK_HEX, MUTED_HEX, LINE_HEX, ACCENT_HEX } from './Drawing'

type Check = 'yes' | 'partly' | 'no'

const CHECKS = ['Commercial focus', 'Price', 'Meeting definition', 'No-show policy']
/** Header lines, two per column so neighbouring labels never collide. */
const HEAD: [string, string][] = [['Commercial', 'focus'], ['Published', 'price'], ['Meeting', 'definition'], ['No-show', 'policy']]

/**
 * A dot grid: one row per provider, one column per thing a buyer can check on their website. Full dot = published,
 * half dot = partly, empty ring = not published. Drawn from the same PROVIDERS rows as the comparison table, so the
 * two cannot disagree. No numbers inside the SVG.
 */
export function WhatEachPutsInWriting({ providers }: { providers: { name: string; checks: Check[] }[] }) {
  const rowH = 40
  const top = 80
  const colX = (i: number) => 330 + i * 100
  const height = top + providers.length * rowH + 10
  const summary = providers
    .map((p) => `${p.name}: ${p.checks.map((c, i) => `${CHECKS[i].toLowerCase()} ${c === 'yes' ? 'published' : c === 'partly' ? 'partly' : 'not published'}`).join(', ')}`)
    .join('. ')
  return (
    <Drawing
      id="what-each-puts-in-writing"
      viewBox={`0 0 720 ${height}`}
      title="What each appointment setting provider puts in writing"
      desc={`A grid of dots, one row per provider, one column per check. ${summary}.`}
      caption="Full dot, it is on their website. Half dot, partly. Empty ring, not published. Only Maxionlabs publishes all four. Everything else is a question for their sales call."
    >
      {HEAD.map(([a, b], i) => (
        <g key={a}>
          <Label x={colX(i)} y={32} anchor="middle" size={12} fill={MUTED_HEX} weight={600}>
            {a}
          </Label>
          <Label x={colX(i)} y={48} anchor="middle" size={12} fill={MUTED_HEX} weight={600}>
            {b}
          </Label>
        </g>
      ))}
      {providers.map((p, r) => {
        const y = top + r * rowH
        const us = p.name === 'Maxionlabs'
        return (
          <g key={p.name}>
            <Label x={20} y={y + 5} size={13} weight={us ? 700 : 400} fill={us ? ACCENT_HEX : INK_HEX}>
              {p.name}
            </Label>
            <path d={`M 20 ${y + 20} L 700 ${y + 20}`} {...STROKE} stroke={LINE_HEX} strokeWidth={1} />
            {p.checks.map((c, i) => {
              const cx = colX(i)
              return (
                <g key={i}>
                  <circle cx={cx} cy={y} r={10} {...STROKE} stroke={c === 'no' ? LINE_HEX : INK_HEX} fill="white" />
                  {c === 'yes' && <circle cx={cx} cy={y} r={10} fill={us ? ACCENT_HEX : INK_HEX} />}
                  {c === 'partly' && <path d={`M ${cx} ${y - 10} A 10 10 0 0 0 ${cx} ${y + 10} Z`} fill={INK_HEX} />}
                </g>
              )
            })}
          </g>
        )
      })}
    </Drawing>
  )
}
