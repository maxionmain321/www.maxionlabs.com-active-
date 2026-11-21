import { Drawing, Label, STROKE, ACCENT_HEX, MUTED_HEX } from './Drawing'

const BASE = 262
const SCALE = 200 / 180000 // 180,000 dollars is 200 units tall

function Bar({ x, value, label, filled }: { x: number; value: number; label: string; filled: boolean }) {
  const h = value * SCALE
  const top = BASE - h
  const w = 64
  return (
    <g>
      <path
        d={`M ${x} ${top} L ${x + w + 1} ${top + 1} L ${x + w} ${BASE} L ${x - 1} ${BASE} Z`}
        {...STROKE}
        fill={filled ? ACCENT_HEX : 'white'}
        fillOpacity={filled ? 0.18 : 1}
      />
      <Label x={x + w / 2} y={top - 10} anchor="middle" size={13} weight={600}>
        {label}
      </Label>
    </g>
  )
}

/** Cash out over 12 and 36 months: a $60,000 producer draw against the $4,725 a month fee. */
export function CostBars() {
  return (
    <Drawing
      id="cost-bars"
      viewBox="0 0 640 320"
      title="Cash over 12 and 36 months"
      desc="Four bars on one baseline. Over 12 months, a producer draw of about $60,000 next to Maxionlabs at $56,700. Over 36 months, a producer draw of up to $180,000 next to Maxionlabs at $170,100. The producer bars are white with an ink outline, the Maxionlabs bars are shaded indigo. The two bars in each pair are nearly the same height."
      caption="The cash is close. About $60,000 of draw against $56,700 over 12 months, and up to $180,000 against $170,100 over 36."
    >
      {/* baseline */}
      <path d="M 40 262 Q 320 265 600 261" {...STROKE} />

      {/* 12 months */}
      <Bar x={96} value={60000} label="~$60,000" filled={false} />
      <Bar x={184} value={56700} label="$56,700" filled />
      <Label x={172} y={288} anchor="middle" size={14} weight={600}>
        12 months
      </Label>

      {/* 36 months */}
      <Bar x={372} value={180000} label="up to $180,000" filled={false} />
      <Bar x={460} value={170100} label="$170,100" filled />
      <Label x={448} y={288} anchor="middle" size={14} weight={600}>
        36 months
      </Label>

      {/* legend */}
      <path d="M 40 24 L 62 24 L 62 40 L 40 40 Z" {...STROKE} fill="white" />
      <Label x={70} y={36} size={12} fill={MUTED_HEX}>
        producer draw, before tax, benefits, licensing
      </Label>
      <path d="M 40 50 L 62 50 L 62 66 L 40 66 Z" {...STROKE} fill={ACCENT_HEX} fillOpacity={0.18} />
      <Label x={70} y={62} size={12} fill={MUTED_HEX}>
        Maxionlabs standard plan, cancel any month
      </Label>
    </Drawing>
  )
}
