import { Drawing, Label, Arrow, STROKE, ACCENT_HEX, AMBER_HEX, MUTED_HEX } from './Drawing'

/**
 * Three months of the service, as an illustration: 42 qualified sales meetings (12 + 15 + 15), close 1 in 5, about 8
 * bound accounts, about $25,000 of commission a year that renews, set against what the 3 months cost.
 * paid: the 3-month price string, or null on pages that must not show our price (Max, 2026-11-21: the number lives on
 * /pricing, /reviews' price answer and llms.txt). Null draws the box as 3 months of plan fees, no number.
 */
export function MeetingsFunnel({ paid = '$14,175' }: { paid?: string | null } = {}) {
  const cost = paid ? `${paid} paid for the 3 months` : '3 months of plan fees'
  const dots: { cx: number; cy: number }[] = []
  for (let r = 0; r < 6; r++) for (let c = 0; c < 7; c++) dots.push({ cx: 48 + c * 24, cy: 84 + r * 22 })
  return (
    <Drawing
      id="meetings-funnel"
      viewBox="0 0 640 310"
      title="42 qualified sales meetings in 3 months to about 8 bound accounts"
      desc={`On the left, 42 small circles in six rows, labelled 42 qualified sales meetings in 3 months. An arrow runs into a funnel labelled close 1 in 5. Out of the funnel come 8 filled circles labelled about 8 bound accounts. Below them a box reads about $25,000 commission a year, a book that renews. A smaller box reads ${cost}.`}
      caption={`Three months, drawn as an illustration. 42 qualified sales meetings, your producers close 1 in 5, so about 8 bound accounts and about $25,000 of gross commission a year, a book that renews, against ${cost}.`}
    >
      {/* 42 meetings */}
      {dots.map((d, i) => (
        <circle key={i} cx={d.cx} cy={d.cy} r={7} {...STROKE} />
      ))}
      <Label x={120} y={52} anchor="middle" weight={600}>
        42 qualified sales meetings
      </Label>
      <Label x={120} y={228} anchor="middle" size={11} fill={MUTED_HEX}>
        in 3 months, held live
      </Label>

      <Arrow x1={212} y1={140} x2={254} y2={140} />

      {/* funnel */}
      <path d="M 262 84 L 386 86 L 350 164 L 349 204 L 300 205 L 298 164 Z" {...STROKE} fill={ACCENT_HEX} fillOpacity={0.1} />
      <Label x={324} y={126} anchor="middle" size={13} weight={600}>
        close 1 in 5
      </Label>

      <Arrow x1={360} y1={140} x2={402} y2={140} />

      {/* about 8 bound */}
      {[0, 1, 2, 3].map((i) => (
        <circle key={`a${i}`} cx={428 + i * 26} cy={128} r={9} fill={AMBER_HEX} stroke="none" />
      ))}
      {[0, 1, 2, 3].map((i) => (
        <circle key={`b${i}`} cx={428 + i * 26} cy={154} r={9} fill={AMBER_HEX} stroke="none" />
      ))}
      <Label x={467} y={52} anchor="middle" weight={600}>
        about 8 bound accounts
      </Label>

      <Arrow x1={467} y1={172} x2={467} y2={200} />

      {/* money boxes */}
      <path d="M 384 210 L 600 211 L 599 252 L 383 253 Z" {...STROKE} fill="white" />
      <Label x={492} y={228} anchor="middle" size={13} weight={600}>
        about $25,000 commission a year
      </Label>
      <Label x={492} y={244} anchor="middle" size={11} fill={MUTED_HEX}>
        a book that renews
      </Label>
      <path d="M 404 264 L 580 265 L 579 298 L 403 299 Z" {...STROKE} stroke={AMBER_HEX} fill="white" />
      <Label x={492} y={285} anchor="middle" size={13} weight={600} fill={AMBER_HEX}>
        {paid ? `${paid} for 3 months` : '3 months of plan fees'}
      </Label>
    </Drawing>
  )
}
