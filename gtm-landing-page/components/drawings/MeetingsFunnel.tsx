import { Drawing, Label, Arrow, STROKE, ACCENT_HEX, AMBER_HEX, MUTED_HEX } from './Drawing'

/** 15 first meetings, close 1 in 5, 3 bound accounts, about $9,000 of first-year commission against a $4,725 fee. */
export function MeetingsFunnel() {
  const dots: { cx: number; cy: number }[] = []
  for (let r = 0; r < 3; r++) for (let c = 0; c < 5; c++) dots.push({ cx: 60 + c * 30, cy: 96 + r * 30 })
  return (
    <Drawing
      id="meetings-funnel"
      viewBox="0 0 640 300"
      title="15 first meetings to 3 bound accounts"
      desc="On the left, 15 small circles in three rows, labelled 15 first meetings a month. An arrow runs into a funnel labelled close 1 in 5. Out of the funnel come 3 filled circles labelled 3 bound accounts. Below them a box reads about $9,000 first-year commission, and a smaller box reads $4,725 fee."
      caption="The month's maths. 15 first meetings, your producers close 1 in 5, so 3 bound accounts and about $9,000 of first-year commission against a $4,725 fee."
    >
      {/* 15 meetings */}
      {dots.map((d, i) => (
        <circle key={i} cx={d.cx} cy={d.cy} r={8} {...STROKE} />
      ))}
      <Label x={120} y={62} anchor="middle" weight={600}>
        15 first meetings
      </Label>
      <Label x={120} y={190} anchor="middle" size={11} fill={MUTED_HEX}>
        a month, held live
      </Label>

      <Arrow x1={200} y1={126} x2={248} y2={126} />

      {/* funnel */}
      <path d="M 258 70 L 382 72 L 346 150 L 345 190 L 296 191 L 294 150 Z" {...STROKE} fill={ACCENT_HEX} fillOpacity={0.1} />
      <Label x={320} y={112} anchor="middle" size={13} weight={600}>
        close 1 in 5
      </Label>

      <Arrow x1={356} y1={126} x2={404} y2={126} />

      {/* 3 bound */}
      <circle cx={436} cy={126} r={9} fill={AMBER_HEX} stroke="none" />
      <circle cx={462} cy={125} r={9} fill={AMBER_HEX} stroke="none" />
      <circle cx={488} cy={127} r={9} fill={AMBER_HEX} stroke="none" />
      <Label x={462} y={62} anchor="middle" weight={600}>
        3 bound accounts
      </Label>

      <Arrow x1={462} y1={146} x2={462} y2={186} />

      {/* money boxes */}
      <path d="M 392 196 L 594 197 L 593 236 L 391 237 Z" {...STROKE} fill="white" />
      <Label x={492} y={213} anchor="middle" size={13} weight={600}>
        about $9,000
      </Label>
      <Label x={492} y={229} anchor="middle" size={11} fill={MUTED_HEX}>
        first-year commission
      </Label>
      <path d="M 420 250 L 566 251 L 565 282 L 419 283 Z" {...STROKE} stroke={AMBER_HEX} fill="white" />
      <Label x={492} y={271} anchor="middle" size={13} weight={600} fill={AMBER_HEX}>
        $4,725 fee
      </Label>
    </Drawing>
  )
}
