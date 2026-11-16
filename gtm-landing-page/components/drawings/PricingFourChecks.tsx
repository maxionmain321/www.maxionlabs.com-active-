import { Drawing, Label, Arrow, Person, STROKE, ACCENT_HEX, AMBER_HEX, MUTED_HEX } from './Drawing'

/**
 * The four checks written into the agreement, between an owner who replied yes and the producer's calendar.
 * Numbers drawn: $25,000, 20, 3, $315.
 */
export function PricingFourChecks() {
  const checks = ['above your floor, $25,000 premium or 20 lives', 'a need now or inside 3 months', 'your counties, your carriers', 'the owner in the room']
  return (
    <Drawing
      id="pricing-four-checks"
      viewBox="0 0 640 320"
      title="The four checks a meeting has to pass"
      desc="On the left a stick figure labelled an owner who replied yes. An arrow runs into a card in the middle labelled the agreement, with four ticked lines: above your floor, $25,000 premium or 20 lives; a need now or inside 3 months; your counties, your carriers; the owner in the room. An arrow leaves the card to a calendar square on the right labelled your producer's calendar. Under the card two short lines read a miss is $315 back and a no-show is replaced."
      caption="Four checks, in writing, between an owner who replied yes and your producer's calendar. Above your floor of $25,000 in premium or 20 lives, a need inside 3 months, your counties and carriers, the owner in the room. A miss is $315 back, a no-show is replaced."
    >
      {/* owner who replied */}
      <Person x={64} y={110} accent />
      <Label x={64} y={190} anchor="middle" size={11} fill={MUTED_HEX}>
        an owner who
      </Label>
      <Label x={64} y={204} anchor="middle" size={11} fill={MUTED_HEX}>
        replied yes
      </Label>
      <Arrow x1={96} y1={140} x2={150} y2={140} />

      {/* the agreement card */}
      <path d="M 160 56 L 452 54 L 454 228 L 158 230 Z" {...STROKE} fill="white" />
      <Label x={306} y={80} anchor="middle" size={12} weight={600}>
        the agreement
      </Label>
      {checks.map((t, i) => {
        const y = 112 + i * 32
        return (
          <g key={t}>
            <path d={`M 178 ${y - 4} L 186 ${y + 4} L 199 ${y - 12}`} {...STROKE} stroke={ACCENT_HEX} />
            <Label x={210} y={y} size={11}>
              {t}
            </Label>
          </g>
        )
      })}
      <Arrow x1={462} y1={140} x2={516} y2={140} />

      {/* calendar */}
      <path d="M 526 96 L 616 94 L 618 184 L 524 186 Z" {...STROKE} fill="white" />
      <path d="M 526 118 L 617 116" {...STROKE} />
      <path d="M 546 86 L 546 104" {...STROKE} />
      <path d="M 596 86 L 596 104" {...STROKE} />
      <path d="M 548 136 L 594 135 L 595 166 L 547 167 Z" {...STROKE} fill={ACCENT_HEX} fillOpacity={0.18} />
      <Label x={571} y={206} anchor="middle" size={11} fill={MUTED_HEX}>
        your producer&apos;s
      </Label>
      <Label x={571} y={220} anchor="middle" size={11} fill={MUTED_HEX}>
        calendar
      </Label>

      {/* the two consequences */}
      <path d="M 180 262 L 192 274" {...STROKE} stroke={AMBER_HEX} />
      <path d="M 192 262 L 180 274" {...STROKE} stroke={AMBER_HEX} />
      <Label x={202} y={272} size={12} weight={600} fill={AMBER_HEX}>
        a miss is $315 back
      </Label>
      <path d="M 372 268 Q 379 258 386 268 Q 379 278 372 268" {...STROKE} stroke={AMBER_HEX} />
      <Label x={396} y={272} size={12} weight={600} fill={AMBER_HEX}>
        a no-show is replaced
      </Label>
    </Drawing>
  )
}
