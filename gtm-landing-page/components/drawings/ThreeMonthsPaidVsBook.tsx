import { Drawing, Label, STROKE, ACCENT_HEX, AMBER_HEX, MUTED_HEX } from './Drawing'

const BASE = 240
const SCALE = 170 / 25000 // $25,000 is 170 units tall

function Bar({ x, value, label, sub, fill, amber }: { x: number; value: number; label: string; sub: string; fill?: boolean; amber?: boolean }) {
  const h = value * SCALE
  const top = BASE - h
  const w = 110
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
 * Three months of the service against the book it leaves behind, as an illustration: $14,175 paid month to month
 * (or $12,500 prepaid), about $25,000 of gross commission in year one, about $21,000 in year two at 84% retention.
 */
export function ThreeMonthsPaidVsBook() {
  return (
    <Drawing
      id="three-months-paid-vs-book"
      viewBox="0 0 640 290"
      title="3 months paid against the book it leaves"
      desc="Three bars on one baseline. The first, outlined in amber, is $14,175 paid for 3 months, with a note that it is $12,500 if prepaid. The second, shaded indigo, is about $25,000 of gross commission in year one from about 8 bound accounts. The third, also shaded, is about $21,000 in year two at 84% retention, with nothing more paid."
      caption="Three months, as an illustration. $14,175 paid month to month, or $12,500 prepaid, against about $25,000 of gross commission in year one from about 8 bound accounts and about $21,000 in year two at 84% retention, nothing more paid. Gross, before producer pay."
    >
      <path d="M 40 240 Q 320 243 600 239" {...STROKE} />
      <Bar x={80} value={14175} label="$14,175 paid" sub="3 months, or $12,500 prepaid" amber />
      <Bar x={260} value={25000} label="about $25,000" sub="year one, about 8 accounts" fill />
      <Bar x={440} value={21000} label="about $21,000" sub="year two, 84% kept" fill />
      <Label x={320} y={282} anchor="middle" size={12} fill={MUTED_HEX}>
        gross commission, before producer pay. an illustration, not a quote
      </Label>
    </Drawing>
  )
}
