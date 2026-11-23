import { Drawing, Label, STROKE, ACCENT_HEX, AMBER_HEX, MUTED_HEX } from './Drawing'

const BASE = 240
const SCALE = 170 / 810000 // $810,000 is 170 units tall

function Bar({ x, value, label, sub, fill, amber }: { x: number; value: number; label: string; sub: string; fill?: boolean; amber?: boolean }) {
  const h = Math.max(value * SCALE, 4)
  const top = BASE - h
  const w = 130
  return (
    <g>
      <path
        d={`M ${x} ${top} L ${x + w + 1} ${top + 1} L ${x + w} ${BASE} L ${x - 1} ${BASE} Z`}
        {...STROKE}
        stroke={amber ? AMBER_HEX : STROKE.stroke}
        fill={fill ? ACCENT_HEX : 'white'}
        fillOpacity={fill ? 0.16 : 1}
      />
      <Label x={x + w / 2} y={top - 10} anchor="middle" size={13} weight={600} fill={amber ? AMBER_HEX : undefined}>
        {label}
      </Label>
      <Label x={x + w / 2} y={BASE + 22} anchor="middle" size={12} fill={MUTED_HEX}>
        {sub}
      </Label>
    </g>
  )
}

/**
 * What 8 new accounts add to a $3M agency's value, next to what one more turn of the multiple adds, as an illustration:
 * $3M revenue at a 27% margin is $810,000 of EBITDA; 8 accounts and $25,000 of commission at that margin is $6,750 of
 * earnings, about $57,000 of value at 8.5x. Margin and multiple are IA Valuations' Q1 2026 averages.
 */
export function ValuationTurnVsAccounts() {
  return (
    <Drawing
      id="valuation-turn-vs-accounts"
      viewBox="0 0 640 290"
      title="8 new accounts against one turn of the multiple"
      desc="Two bars on one baseline. The first, shaded indigo and very short, is about $57,000 of value from 8 new accounts and $25,000 of commission a year, at a 27% margin and an 8.5 times multiple. The second, outlined in amber and much taller, is about $810,000 of value from one more turn of the multiple on a $3M agency."
      caption="A $3M agency, as an illustration. 8 new accounts and $25,000 of commission add about $57,000 of value at a 27% margin and 8.5x. One more turn of the multiple adds about $810,000. Averages are IA Valuations' Q1 2026."
    >
      <path d="M 40 240 Q 320 243 600 239" {...STROKE} />
      <Bar x={120} value={57375} label="about $57,000" sub="8 new accounts" fill />
      <Bar x={390} value={810000} label="about $810,000" sub="one more turn of multiple" amber />
      <Label x={320} y={282} anchor="middle" size={12} fill={MUTED_HEX}>
        value added, a $3M agency. an illustration, not a valuation
      </Label>
    </Drawing>
  )
}
