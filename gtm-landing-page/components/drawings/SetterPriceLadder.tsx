import { Drawing, Label, STROKE, ACCENT_HEX, AMBER_HEX, MUTED_HEX } from './Drawing'

/**
 * The four price shapes you find when you search "how much does an appointment setter cost", drawn as rungs on a
 * ladder, each with what you are actually buying written next to it. Prices from Salesbread (2026) and Abstrakt
 * (read 2026-11-16), repeated in the page text.
 */
export function SetterPriceLadder() {
  const rungs: { y: number; price: string; what: string; amber?: boolean }[] = [
    { y: 70, price: 'from $5,000 a month', what: 'a seat on a dialing floor, count agreed per contract' },
    { y: 130, price: '$2,000 to $5,000 a month', what: 'a retainer, meetings not promised' },
    { y: 190, price: '$75 to a few hundred a slot', what: 'a calendar slot, set, not held', amber: true },
    { y: 250, price: '$16 an hour', what: 'a caller, plus the dialer, data and your hours' },
  ]
  return (
    <Drawing
      id="setter-price-ladder"
      viewBox="0 0 640 300"
      title="The four price shapes for an appointment setter"
      desc="A ladder with four rungs. From the top: from $5,000 a month for a seat on a dialing floor, $2,000 to $5,000 a month for a retainer, $75 to a few hundred dollars per set calendar slot, and $16 an hour for a caller plus the dialer, data and your hours. A note on the right says none of the rungs says who you meet or how big the account is."
      caption="The four prices you find. $16 an hour for a caller, $75 to a few hundred dollars a set slot, $2,000 to $5,000 a month on retainer, from $5,000 a month for a dialing floor. No rung says who is in the room or what the account pays."
    >
      {/* ladder rails */}
      <path d="M 70 40 Q 72 160 70 282" {...STROKE} />
      <path d="M 300 42 Q 298 160 301 280" {...STROKE} />
      {rungs.map((r, i) => (
        <g key={i}>
          <path d={`M 70 ${r.y} Q 185 ${r.y + (i % 2 ? 2 : -2)} 300 ${r.y}`} {...STROKE} stroke={r.amber ? AMBER_HEX : STROKE.stroke} />
          <Label x={185} y={r.y - 10} anchor="middle" size={13} weight={600} fill={r.amber ? AMBER_HEX : undefined}>
            {r.price}
          </Label>
          <Label x={322} y={r.y + 4} size={12} fill={MUTED_HEX}>
            {r.what}
          </Label>
        </g>
      ))}
      {/* the missing rung */}
      <path d="M 322 268 L 612 269" {...STROKE} stroke={ACCENT_HEX} strokeDasharray="7 6" />
      <Label x={322} y={290} size={12} weight={600} fill={ACCENT_HEX}>
        who is in the room, and what the account pays? not on any rung
      </Label>
    </Drawing>
  )
}
