import { Drawing, Label, Arrow, STROKE, ACCENT_HEX, AMBER_HEX, MUTED_HEX } from './Drawing'

/**
 * The bound-account math, drawn once: 5 qualified sales meetings, your producers close 1 in 5, so 1 bound account,
 * and at $25,000 premium and 12% commission that account pays about $3,000 a year. Illustration, repeated in the text.
 */
export function BoundAccountMath() {
  return (
    <Drawing
      id="bound-account-math"
      viewBox="0 0 640 260"
      title="The bound-account math"
      desc="Five open circles on the left, labelled 5 qualified sales meetings. An arrow labelled close 1 in 5 runs to one filled circle labelled 1 bound account. A second arrow runs to a box reading $25,000 premium times 12 percent, about $3,000 a year, and below it, renews. Under the five circles a crossed-out label reads price per appointment."
      caption="The bound-account math. Close 1 in 5 and 5 qualified sales meetings is 1 bound account, which at $25,000 in premium and 12% pays about $3,000 a year and renews. Compare what 5 meetings cost you, not what 1 appointment costs."
    >
      {/* 5 meetings */}
      {[0, 1, 2, 3, 4].map((i) => (
        <circle key={i} cx={60 + i * 30} cy={110} r={9} {...STROKE} />
      ))}
      <Label x={120} y={70} anchor="middle" weight={600}>
        5 qualified sales meetings
      </Label>
      {/* crossed out slot price */}
      <Label x={120} y={160} anchor="middle" size={12} fill={MUTED_HEX}>
        price per appointment
      </Label>
      <path d="M 52 156 L 190 157" {...STROKE} stroke={AMBER_HEX} />

      <Arrow x1={210} y1={110} x2={270} y2={110} />
      <Label x={240} y={92} anchor="middle" size={12} weight={600}>
        close 1 in 5
      </Label>

      {/* 1 bound account */}
      <circle cx={310} cy={110} r={13} fill={AMBER_HEX} stroke="none" />
      <Label x={310} y={70} anchor="middle" weight={600}>
        1 bound account
      </Label>

      <Arrow x1={340} y1={110} x2={400} y2={110} />

      {/* the money */}
      <path d="M 410 72 L 610 73 L 609 150 L 409 151 Z" {...STROKE} fill={ACCENT_HEX} fillOpacity={0.1} />
      <Label x={510} y={98} anchor="middle" size={12} fill={MUTED_HEX}>
        $25,000 premium x 12%
      </Label>
      <Label x={510} y={122} anchor="middle" size={14} weight={600}>
        about $3,000 a year
      </Label>
      <Label x={510} y={140} anchor="middle" size={11} fill={MUTED_HEX}>
        and it renews
      </Label>

      <Label x={320} y={225} anchor="middle" size={13}>
        what do 5 meetings cost you? that is the price to compare
      </Label>
    </Drawing>
  )
}
