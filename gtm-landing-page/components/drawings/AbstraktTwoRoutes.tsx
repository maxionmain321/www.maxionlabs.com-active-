import { Drawing, Label, Person, Arrow, STROKE, ACCENT_HEX, AMBER_HEX, MUTED_HEX } from './Drawing'

/** A handset drawn as one bent path with two little ends. */
function Phone({ x, y, color = STROKE.stroke }: { x: number; y: number; color?: string }) {
  const s = { ...STROKE, stroke: color }
  return (
    <g>
      <path d={`M ${x - 16} ${y - 6} Q ${x} ${y + 14} ${x + 16} ${y - 6}`} {...s} />
      <path d={`M ${x - 16} ${y - 6} L ${x - 20} ${y - 14}`} {...s} />
      <path d={`M ${x + 16} ${y - 6} L ${x + 20} ${y - 14}`} {...s} />
    </g>
  )
}

/** An envelope. */
function Envelope({ x, y, color = STROKE.stroke }: { x: number; y: number; color?: string }) {
  const s = { ...STROKE, stroke: color }
  return (
    <g>
      <path d={`M ${x - 20} ${y - 12} L ${x + 21} ${y - 11} L ${x + 20} ${y + 14} L ${x - 21} ${y + 13} Z`} {...s} />
      <path d={`M ${x - 20} ${y - 12} L ${x} ${y + 3} L ${x + 21} ${y - 11}`} {...s} />
    </g>
  )
}

/** A sheet of paper with three lines, the public record. */
function Record({ x, y }: { x: number; y: number }) {
  return (
    <g>
      <path d={`M ${x - 15} ${y - 20} L ${x + 15} ${y - 21} L ${x + 16} ${y + 20} L ${x - 14} ${y + 21} Z`} {...STROKE} />
      <path d={`M ${x - 8} ${y - 8} L ${x + 8} ${y - 8}`} {...STROKE} stroke={MUTED_HEX} />
      <path d={`M ${x - 8} ${y} L ${x + 8} ${y}`} {...STROKE} stroke={MUTED_HEX} />
      <path d={`M ${x - 8} ${y + 8} L ${x + 3} ${y + 8}`} {...STROKE} stroke={AMBER_HEX} />
    </g>
  )
}

/** A small calendar page with one amber mark on it. */
function Calendar({ x, y }: { x: number; y: number }) {
  return (
    <g>
      <path d={`M ${x - 20} ${y - 16} L ${x + 21} ${y - 17} L ${x + 20} ${y + 18} L ${x - 21} ${y + 17} Z`} {...STROKE} />
      <path d={`M ${x - 20} ${y - 6} L ${x + 20} ${y - 6}`} {...STROKE} />
      <circle cx={x + 6} cy={y + 7} r={5} fill={AMBER_HEX} stroke="none" />
    </g>
  )
}

/**
 * Two routes to the same owner. Abstrakt: a phone team in St. Louis, 125 dials per appointment and 8 calls to reach a
 * decision-maker, calling in the agency's name. Maxionlabs: a public record that changed, an email from a domain we own,
 * the owner replies, we call to confirm fit, then the producer's calendar.
 */
export function AbstraktTwoRoutes() {
  const top = 88
  const bottom = 236
  return (
    <Drawing
      id="abstrakt-two-routes"
      viewBox="0 0 640 330"
      title="Two routes to the same business owner"
      desc="Two rows. The top row, labelled Abstrakt, shows a phone, then the words 125 dials per appointment, then 8 calls to reach the decider, then a calendar, with the note calling in your agency's name from St. Louis. The bottom row, labelled Maxionlabs, shows a public record that changed, then an envelope for an email from our domain, then an owner saying yes, then a phone for the call that confirms fit, then the producer's calendar."
      caption="Two routes to the same owner. Abstrakt dials in your agency's name, 125 dials per appointment and 8 calls to reach the decider by its own numbers. We email the owner off a public record that changed, and call only the ones who reply yes."
    >
      {/* top row, Abstrakt */}
      <Label x={24} y={top - 44} size={14} weight={600}>
        Abstrakt
      </Label>
      <Label x={24} y={top - 26} size={11} fill={MUTED_HEX}>
        phone first, in your agency&apos;s name, from St. Louis
      </Label>
      <Phone x={70} y={top} />
      <Arrow x1={100} y1={top - 2} x2={150} y2={top - 2} />
      <Label x={158} y={top - 6} size={13} weight={600}>
        125 dials
      </Label>
      <Label x={158} y={top + 10} size={11} fill={MUTED_HEX}>
        per appointment
      </Label>
      <Arrow x1={270} y1={top - 2} x2={318} y2={top - 2} />
      <Label x={326} y={top - 6} size={13} weight={600}>
        8 calls
      </Label>
      <Label x={326} y={top + 10} size={11} fill={MUTED_HEX}>
        to reach the decider
      </Label>
      <Arrow x1={470} y1={top - 2} x2={520} y2={top - 2} />
      <Calendar x={566} y={top} />
      <Label x={566} y={top + 38} anchor="middle" size={11} fill={MUTED_HEX}>
        appointment set
      </Label>

      {/* divider */}
      <path d="M 24 158 Q 320 162 616 157" {...STROKE} stroke="#D8DEE6" />

      {/* bottom row, Maxionlabs */}
      <Label x={24} y={bottom - 50} size={14} weight={600} fill={ACCENT_HEX}>
        Maxionlabs
      </Label>
      <Label x={24} y={bottom - 32} size={11} fill={MUTED_HEX}>
        email first, from our own domain, we call only a yes
      </Label>
      <Record x={60} y={bottom} />
      <Label x={60} y={bottom + 38} anchor="middle" size={11} fill={MUTED_HEX}>
        a record changed
      </Label>
      <Arrow x1={88} y1={bottom - 2} x2={138} y2={bottom - 2} color={ACCENT_HEX} />
      <Envelope x={170} y={bottom} color={ACCENT_HEX} />
      <Label x={170} y={bottom + 38} anchor="middle" size={11} fill={MUTED_HEX}>
        email the owner
      </Label>
      <Arrow x1={204} y1={bottom - 2} x2={254} y2={bottom - 2} color={ACCENT_HEX} />
      <Person x={290} y={bottom - 30} />
      <path d={`M 304 ${bottom - 34} Q 318 ${bottom - 52} 338 ${bottom - 44}`} {...STROKE} />
      <Label x={344} y={bottom - 40} size={12} weight={600}>
        yes
      </Label>
      <Label x={290} y={bottom + 38} anchor="middle" size={11} fill={MUTED_HEX}>
        owner replies
      </Label>
      <Arrow x1={336} y1={bottom - 2} x2={386} y2={bottom - 2} color={ACCENT_HEX} />
      <Phone x={420} y={bottom} color={ACCENT_HEX} />
      <Label x={420} y={bottom + 38} anchor="middle" size={11} fill={MUTED_HEX}>
        we confirm fit
      </Label>
      <Arrow x1={452} y1={bottom - 2} x2={520} y2={bottom - 2} color={ACCENT_HEX} />
      <Calendar x={566} y={bottom} />
      <Label x={566} y={bottom + 38} anchor="middle" size={11} fill={MUTED_HEX}>
        producer&apos;s calendar
      </Label>

      <Label x={320} y={316} anchor="middle" size={13}>
        same owner, two different front doors
      </Label>
    </Drawing>
  )
}
