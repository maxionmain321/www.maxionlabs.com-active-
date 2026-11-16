import { Drawing, Label, STROKE, ACCENT_HEX, AMBER_HEX, MUTED_HEX } from './Drawing'

const BASE = 240
const SCALE = 150 / 100000 // $100,000 of premium is 150 units tall

function Account({ x, premium, label, counts }: { x: number; premium: number; label: string; counts: boolean }) {
  const h = Math.max(premium * SCALE, 14)
  const top = BASE - h
  const w = 70
  return (
    <g>
      <path
        d={`M ${x} ${top} L ${x + w + 1} ${top + 1} L ${x + w} ${BASE} L ${x - 1} ${BASE} Z`}
        {...STROKE}
        stroke={counts ? STROKE.stroke : MUTED_HEX}
        strokeDasharray={counts ? undefined : '6 5'}
        fill={counts ? ACCENT_HEX : 'white'}
        fillOpacity={counts ? 0.16 : 1}
      />
      <Label x={x + w / 2} y={top - 10} anchor="middle" size={13} weight={600} fill={counts ? undefined : MUTED_HEX}>
        {label}
      </Label>
      <Label x={x + w / 2} y={BASE + 20} anchor="middle" size={11} fill={counts ? ACCENT_HEX : MUTED_HEX} weight={600}>
        {counts ? '= 1 meeting' : "doesn't count"}
      </Label>
    </g>
  )
}

/** The $25,000 floor as a dashed line; accounts at $25,000, $75,000 and $100,000 above it each count as one meeting. */
export function PricingFloorNotTarget() {
  const floorY = BASE - 25000 * SCALE
  return (
    <Drawing
      id="pricing-floor-not-target"
      viewBox="0 0 640 300"
      title="The floor is a floor, not a target"
      desc="Four bars on one baseline, drawn as accounts by premium. A dashed amber line crosses the drawing at $25,000 and is labelled the floor. A small dashed bar at $10,000 sits under the line and reads doesn't count. Three shaded bars at $25,000, $75,000 and $100,000 stand above the line and each reads equals 1 meeting. A note on the right reads same price, nothing extra."
      caption="The floor is only a floor. $25,000 in premium, or 20 enrolled lives, is the smallest account that counts. $25,000, $75,000 and $100,000 each count as one meeting, same price, nothing extra. $10,000 doesn't count."
    >
      {/* baseline */}
      <path d={`M 40 ${BASE} Q 320 ${BASE + 3} 600 ${BASE - 1}`} {...STROKE} />

      {/* the floor */}
      <path d={`M 40 ${floorY} Q 320 ${floorY - 2} 600 ${floorY + 1}`} {...STROKE} stroke={AMBER_HEX} strokeDasharray="8 6" />
      <Label x={44} y={floorY - 8} size={12} weight={600} fill={AMBER_HEX}>
        the floor, $25,000 premium
      </Label>

      <Account x={110} premium={10000} label="$10,000" counts={false} />
      <Account x={240} premium={25000} label="$25,000" counts />
      <Account x={370} premium={75000} label="$75,000" counts />
      <Account x={500} premium={100000} label="$100,000" counts />

      <Label x={600} y={60} anchor="end" size={12} fill={MUTED_HEX}>
        same price, nothing extra
      </Label>
      <Label x={320} y={290} anchor="middle" size={12} fill={MUTED_HEX}>
        or 20 enrolled lives for a benefits shop
      </Label>
    </Drawing>
  )
}
