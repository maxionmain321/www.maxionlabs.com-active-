import { Drawing, Label, STROKE, ACCENT_HEX, AMBER_HEX, MUTED_HEX } from './Drawing'

type Box = { h: number; label: string; sub?: string; dashed?: boolean; fill?: string }

/** One column of boxes stacked on a price. */
function Stack({ x, w, price, boxes, color }: { x: number; w: number; price: string; boxes: Box[]; color: string }) {
  let y = 56
  const placed = boxes.map((b) => {
    const top = y
    y += b.h
    return { ...b, top }
  })
  const bottom = y
  return (
    <g>
      <Label x={x + w / 2} y={40} anchor="middle" size={18} weight={600} fill={color}>
        {price}
      </Label>
      {placed.map((b, i) => (
        <g key={i}>
          <path
            d={`M ${x} ${b.top} L ${x + w + (i % 2 ? 2 : -1)} ${b.top + 1} L ${x + w} ${b.top + b.h} L ${x - 1} ${b.top + b.h + (i % 2 ? -1 : 1)} Z`}
            {...STROKE}
            stroke={b.dashed ? AMBER_HEX : STROKE.stroke}
            strokeDasharray={b.dashed ? '7 6' : undefined}
            fill={b.fill ?? 'white'}
            fillOpacity={b.fill ? 0.14 : 1}
          />
          <Label x={x + w / 2} y={b.top + b.h / 2 + (b.sub ? -2 : 5)} anchor="middle" size={b.fill ? 14 : 12} weight={b.fill ? 600 : 400} fill={b.dashed ? AMBER_HEX : undefined}>
            {b.label}
          </Label>
          {b.sub && (
            <Label x={x + w / 2} y={b.top + b.h / 2 + 14} anchor="middle" size={10} fill={MUTED_HEX}>
              {b.sub}
            </Label>
          )}
        </g>
      ))}
      <path d={`M ${x - 24} ${bottom + 8} Q ${x + w / 2} ${bottom + 11} ${x + w + 24} ${bottom + 7}`} {...STROKE} />
    </g>
  )
}

/**
 * $5,000 against $4,725, and what sits under each price. Abstrakt's appointment number is in the agreement, by industry,
 * so it is drawn dashed. Ours is 15 qualified sales meetings a month, 12 in month one.
 */
export function AbstraktPriceStack() {
  const abstrakt: Box[] = [
    { h: 52, label: 'appointment number', sub: 'by industry, in your agreement, not published', dashed: true },
    { h: 40, label: 'BDR team, success manager, weekly coaching' },
    { h: 40, label: 'results portal, recorded calls, the tools' },
    { h: 52, label: 'a flat monthly programme', sub: 'checked at year end', fill: AMBER_HEX },
  ]
  const ours: Box[] = [
    { h: 52, label: 'qualified sales meetings every month', sub: 'held live, no-shows replaced', fill: ACCENT_HEX },
    { h: 40, label: 'the map of your territory, as CSV you keep' },
    { h: 40, label: 'renewal calendar, territory lock' },
    { h: 52, label: 'month to month', sub: 'checked every month, credit per miss', fill: ACCENT_HEX },
  ]
  return (
    <Drawing
      id="abstrakt-price-stack"
      viewBox="0 0 640 300"
      title="What sits under $5,000 a month and under our plan"
      desc="Two stacks of boxes. The left stack, headed $5,000 a month for Abstrakt, has a dashed box for the appointment number, which is set by industry in the agreement and not published, then a box for the BDR team, success manager and weekly coaching, a box for the results portal, recorded calls and tools, and a base box reading a flat monthly programme, checked at year end. The right stack, headed plan sized to you for Maxionlabs, has a solid box for qualified sales meetings every month, then the map of your territory as CSV, then renewal calendar and territory lock, and a base box reading month to month, checked every month, credit per miss."
      caption="What sits under each price. Abstrakt's $5,000 buys a flat programme, and the appointment number is set by industry in your agreement, dashed here because it isn't published. Our plan, sized to your agency, buys qualified sales meetings every month, the map of your territory, and credit per miss."
    >
      <Stack x={36} w={270} price="$5,000 a month" boxes={abstrakt} color={AMBER_HEX} />
      <Stack x={334} w={270} price="Plan sized to you" boxes={ours} color={ACCENT_HEX} />
      <Label x={171} y={286} anchor="middle" size={12} fill={MUTED_HEX}>
        Abstrakt, pricing page, read 2026-11-16
      </Label>
      <Label x={469} y={286} anchor="middle" size={12} fill={MUTED_HEX}>
        Maxionlabs, published terms
      </Label>
    </Drawing>
  )
}
