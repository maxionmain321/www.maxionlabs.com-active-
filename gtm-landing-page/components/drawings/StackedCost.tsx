import { Drawing, Label, STROKE, ACCENT_HEX, AMBER_HEX, MUTED_HEX } from './Drawing'

const X = 180
const W = 280

/** What a producer costs beyond the draw, as boxes stacked on the $60,000 base. */
export function StackedCost() {
  const boxes: { h: number; label: string; fill?: string; dashed?: boolean }[] = [
    { h: 34, label: "a mentor's hours (yours)", dashed: true },
    { h: 30, label: 'licensing and E&O' },
    { h: 34, label: 'benefits' },
    { h: 30, label: 'payroll tax' },
    { h: 96, label: '$60,000 draw', fill: ACCENT_HEX },
  ]
  let y = 40
  const placed = boxes.map((b) => {
    const top = y
    y += b.h
    return { ...b, top }
  })
  const bottom = y
  return (
    <Drawing
      id="stacked-cost"
      viewBox="0 0 640 300"
      title="What a producer costs, stacked"
      desc="Five boxes stacked on top of each other. The big bottom box is the $60,000 draw. On top of it sit payroll tax, benefits, licensing and E&O, and a dashed box for the mentor's hours, which are the owner's. A bracket on the right spans the whole stack and reads the real number."
      caption="The draw is only the bottom box. Tax, benefits, licensing, E&O and a mentor's hours stack on the $60,000, and the mentor is usually you."
    >
      {placed.map((b, i) => (
        <g key={i}>
          <path
            d={`M ${X} ${b.top} L ${X + W + (i % 2 ? 2 : -1)} ${b.top + 1} L ${X + W} ${b.top + b.h} L ${X - 1} ${b.top + b.h + (i % 2 ? -1 : 1)} Z`}
            {...STROKE}
            stroke={b.dashed ? AMBER_HEX : STROKE.stroke}
            strokeDasharray={b.dashed ? '7 6' : undefined}
            fill={b.fill ?? 'white'}
            fillOpacity={b.fill ? 0.16 : 1}
          />
          <Label x={X + W / 2} y={b.top + b.h / 2 + 5} anchor="middle" size={b.fill ? 15 : 13} weight={b.fill ? 600 : 400} fill={b.dashed ? AMBER_HEX : undefined}>
            {b.label}
          </Label>
        </g>
      ))}
      {/* ground */}
      <path d={`M ${X - 40} ${bottom + 8} Q 320 ${bottom + 11} ${X + W + 40} ${bottom + 7}`} {...STROKE} />
      {/* bracket on the right */}
      <path d={`M ${X + W + 22} ${placed[0].top} L ${X + W + 34} ${placed[0].top} L ${X + W + 34} ${bottom} L ${X + W + 22} ${bottom}`} {...STROKE} />
      <Label x={X + W + 46} y={(placed[0].top + bottom) / 2 - 4} size={12} weight={600}>
        the real
      </Label>
      <Label x={X + W + 46} y={(placed[0].top + bottom) / 2 + 12} size={12} weight={600}>
        number
      </Label>
      <Label x={X - 22} y={placed[4].top + placed[4].h / 2 + 4} anchor="end" size={11} fill={MUTED_HEX}>
        near the BLS median
      </Label>
    </Drawing>
  )
}
