import { Drawing, Label, STROKE, ACCENT_HEX, AMBER_HEX, MUTED_HEX } from './Drawing'

const TESTS = [
  'above your floor, say $25,000 in premium',
  'a need now or inside 3 months',
  'your counties, and your carriers write the line',
  'the owner or the decider in the room',
]

const X = 120
const Y = 40
const W = 400
const ROW = 44

/** One qualified sales meeting as a card with four ticked boxes. Fail one and it does not count toward the 15. */
export function AppointmentSettingWhatCounts() {
  const top = Y
  const bottom = Y + 56 + TESTS.length * ROW + 18
  return (
    <Drawing
      id="what-counts"
      viewBox="0 0 640 310"
      title="What counts as one qualified sales meeting"
      desc="A card headed one qualified sales meeting with four ticked boxes down the left. Above your floor, say $25,000 in premium. A need now or inside 3 months. Your counties, and your carriers write the line. The owner or the decider in the room. Under the card a line reads fail any one and it does not count toward the 15, we replace it."
      caption="What counts, drawn as the card we sign before the first email goes out. Every meeting passes all four tests or it does not count toward the 15 and we replace it. The $25,000 floor and the 3 months are yours to set."
    >
      {/* the card */}
      <path d={`M ${X} ${top} L ${X + W + 2} ${top + 1} L ${X + W} ${bottom} L ${X - 1} ${bottom + 1} Z`} {...STROKE} fill="white" />
      <path d={`M ${X + 2} ${top + 40} Q ${X + W / 2} ${top + 43} ${X + W - 2} ${top + 40}`} {...STROKE} stroke={ACCENT_HEX} strokeOpacity={0.6} />
      <Label x={X + 16} y={top + 27} size={14} weight={600}>
        one qualified sales meeting
      </Label>
      <Label x={X + W - 16} y={top + 27} anchor="end" size={11} fill={MUTED_HEX}>
        signed before anything sends
      </Label>

      {TESTS.map((t, i) => {
        const cy = top + 66 + i * ROW
        const bx = X + 18
        return (
          <g key={i}>
            <path d={`M ${bx} ${cy - 10} L ${bx + 21} ${cy - 9} L ${bx + 20} ${cy + 11} L ${bx - 1} ${cy + 10} Z`} {...STROKE} fill="white" />
            <path d={`M ${bx + 4} ${cy + 1} L ${bx + 9} ${cy + 7} L ${bx + 18} ${cy - 6}`} {...STROKE} stroke={ACCENT_HEX} strokeWidth={2.75} />
            <Label x={bx + 36} y={cy + 5} size={13}>
              {t}
            </Label>
          </g>
        )
      })}

      {/* the consequence */}
      <Label x={320} y={bottom + 30} anchor="middle" size={13} weight={600} fill={AMBER_HEX}>
        fail any one and it does not count toward the 15. we replace it.
      </Label>
    </Drawing>
  )
}
