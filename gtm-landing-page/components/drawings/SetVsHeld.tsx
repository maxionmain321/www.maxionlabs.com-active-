import { Drawing, Label, Arrow, STROKE, AMBER_HEX, MUTED_HEX, LINE_HEX } from './Drawing'

/**
 * What 10 set appointments at $300 turn into: 7 held, 4 above the floor. You paid $3,000 for 4 real meetings, so $750
 * each, not $300. Illustration, numbers repeated in the page text.
 */
export function SetVsHeld() {
  const row = (count: number, cx0: number, cy: number, filled: number, faded = false) =>
    Array.from({ length: count }, (_, i) => (
      <circle
        key={i}
        cx={cx0 + i * 22}
        cy={cy}
        r={7}
        {...STROKE}
        stroke={faded ? LINE_HEX : STROKE.stroke}
        fill={i < filled ? AMBER_HEX : 'white'}
      />
    ))
  return (
    <Drawing
      id="set-vs-held"
      viewBox="0 0 640 300"
      title="10 set appointments, 7 held, 4 above the floor"
      desc="Three rows of circles. Top row: 10 circles labelled 10 set appointments at $300 each, $3,000. Middle row: 7 circles labelled 7 held, 3 no-shows. Bottom row: 4 filled circles labelled 4 above your floor. On the right, a note reads $3,000 divided by 4 is $750 a real meeting, not $300."
      caption="Set is not held, and held is not qualified. Buy 10 set appointments at $300, 7 show, 4 are above your floor. That is $3,000 for 4 real meetings, so $750 each, not $300."
    >
      {/* set */}
      <Label x={40} y={56} size={13} weight={600}>
        10 set appointments, $300 each
      </Label>
      {row(10, 50, 82, 0)}
      <Label x={290} y={87} size={12} fill={MUTED_HEX}>
        $3,000 on the invoice
      </Label>

      <Arrow x1={150} y1={100} x2={150} y2={128} />

      {/* held */}
      <Label x={40} y={150} size={13} weight={600}>
        7 held
      </Label>
      {row(7, 50, 176, 0)}
      {row(3, 50 + 7 * 22, 176, 0, true)}
      <Label x={290} y={181} size={12} fill={MUTED_HEX}>
        3 no-shows
      </Label>

      <Arrow x1={150} y1={194} x2={150} y2={222} />

      {/* above floor */}
      <Label x={40} y={244} size={13} weight={600}>
        4 above your floor
      </Label>
      {row(4, 50, 270, 4)}
      {row(3, 50 + 4 * 22, 270, 0, true)}
      <Label x={290} y={275} size={12} fill={MUTED_HEX}>
        3 under $25,000 in premium
      </Label>

      {/* the real price */}
      <path d="M 440 150 L 614 151 L 613 232 L 439 233 Z" {...STROKE} stroke={AMBER_HEX} fill="white" />
      <Label x={527} y={178} anchor="middle" size={12} fill={MUTED_HEX}>
        $3,000 for 4 real meetings
      </Label>
      <Label x={527} y={204} anchor="middle" size={15} weight={600} fill={AMBER_HEX}>
        $750 each, not $300
      </Label>
    </Drawing>
  )
}
