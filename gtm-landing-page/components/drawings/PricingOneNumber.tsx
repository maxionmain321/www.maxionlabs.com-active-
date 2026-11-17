import { Drawing, Label, STROKE, ACCENT_HEX, AMBER_HEX, MUTED_HEX } from './Drawing'

/**
 * The price as one box, with what is inside it on the left and what is not on the invoice on the right.
 * Numbers drawn: $4,725, 15, 12.
 */
export function PricingOneNumber() {
  const inside = ['15 qualified live sales meetings a month', '12 in month one', 'a brief before each meeting', 'your market as CSV files you keep', 'the renewal calendar', 'your counties locked']
  const notOn = ['no setup fee', 'no share of commission', 'no per-meeting invoice', 'no contract term']
  return (
    <Drawing
      id="pricing-one-number"
      viewBox="0 0 640 320"
      title="One number, $4,725 a month"
      desc="A big box in the middle reads $4,725 a month, month to month, cancel any month. Six lines on the left, each with a tick, list what is inside the price: 15 qualified live sales meetings a month, 12 in month one, a brief before each meeting, your market as CSV files you keep, the renewal calendar, your counties locked. Four lines on the right, each with a cross, list what is not on the invoice: no setup fee, no share of commission, no per-meeting invoice, no contract term."
      caption="One number. $4,725 a month buys 15 qualified live sales meetings a month, 12 in month one, with the brief, the CSV files, the renewal calendar and your counties locked. Nothing else on the invoice."
    >
      {/* the price box */}
      <path d="M 232 96 L 410 94 L 412 180 L 230 182 Z" {...STROKE} fill={ACCENT_HEX} fillOpacity={0.1} />
      <Label x={321} y={132} anchor="middle" size={24} weight={600}>
        $4,725
      </Label>
      <Label x={321} y={154} anchor="middle" size={12} fill={MUTED_HEX}>
        a month, month to month
      </Label>
      <Label x={321} y={170} anchor="middle" size={12} fill={MUTED_HEX}>
        cancel any month
      </Label>

      {/* inside */}
      <Label x={20} y={60} size={12} weight={600}>
        inside the price
      </Label>
      {inside.map((t, i) => {
        const y = 86 + i * 30
        return (
          <g key={t}>
            <path d={`M 22 ${y - 4} L 29 ${y + 3} L 40 ${y - 10}`} {...STROKE} stroke={ACCENT_HEX} />
            <Label x={50} y={y} size={11}>
              {t}
            </Label>
          </g>
        )
      })}

      {/* not on the invoice */}
      <Label x={448} y={60} size={12} weight={600}>
        not on the invoice
      </Label>
      {notOn.map((t, i) => {
        const y = 86 + i * 30
        return (
          <g key={t}>
            <path d={`M 450 ${y - 10} L 462 ${y + 2}`} {...STROKE} stroke={AMBER_HEX} />
            <path d={`M 462 ${y - 10} L 450 ${y + 2}`} {...STROKE} stroke={AMBER_HEX} />
            <Label x={472} y={y} size={11}>
              {t}
            </Label>
          </g>
        )
      })}

      {/* ground line */}
      <path d="M 40 290 Q 320 294 600 289" {...STROKE} />
      <Label x={320} y={312} anchor="middle" size={12} fill={MUTED_HEX}>
        if you have to ask what else is on the invoice, the price is not the price
      </Label>
    </Drawing>
  )
}
