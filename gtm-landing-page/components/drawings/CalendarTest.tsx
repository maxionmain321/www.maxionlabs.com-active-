import { Drawing, Label, STROKE, AMBER_HEX, MUTED_HEX, LINE_HEX } from './Drawing'

const DAYS = ['M', 'T', 'W', 'T', 'F']
const X0 = 70
const Y0 = 52
const CW = 100
const CH = 52

/** Which cells carry a sales meeting with a $25,000+ account, and who got it. 5 marks, 4 from the owner or a referral. */
const MARKS: { row: number; col: number; who: string }[] = [
  { row: 0, col: 1, who: 'owner' },
  { row: 1, col: 3, who: 'referral' },
  { row: 2, col: 0, who: 'owner' },
  { row: 2, col: 4, who: 'referral' },
  { row: 3, col: 2, who: 'producer' },
]

/** A month of workdays with the few sales meetings marked and labelled by who got each one. */
export function CalendarTest() {
  return (
    <Drawing
      id="calendar-test"
      viewBox="0 0 640 330"
      title="The meetings-or-closers test on last month's calendar"
      desc="A calendar grid of last month, five weekdays across and four weeks down. Five cells carry an amber circle for a sales meeting with an account above $25,000 in premium. Each circle is labelled with who got the meeting: owner, referral, owner, referral, producer. Four of the five came from the owner or a referral partner."
      caption="The meetings-or-closers test, drawn. Mark every sales meeting last month with an account above $25,000, then write who got each one. Here it is 5 for the team and 4 of the 5 came from the owner or a referral, so that agency is short of meetings."
    >
      <Label x={X0} y={28} size={14} weight={600}>
        last month
      </Label>
      {DAYS.map((d, i) => (
        <Label key={i} x={X0 + i * CW + CW / 2} y={Y0 - 8} anchor="middle" fill={MUTED_HEX}>
          {d}
        </Label>
      ))}
      {/* grid, drawn as slightly uneven lines */}
      {[0, 1, 2, 3, 4].map((r) => (
        <path key={`r${r}`} d={`M ${X0 - 2} ${Y0 + r * CH} Q ${X0 + 250} ${Y0 + r * CH + (r % 2 ? 1.5 : -1.5)} ${X0 + 5 * CW + 2} ${Y0 + r * CH}`} {...STROKE} stroke={LINE_HEX} />
      ))}
      {[0, 1, 2, 3, 4, 5].map((c) => (
        <path key={`c${c}`} d={`M ${X0 + c * CW} ${Y0 - 2} Q ${X0 + c * CW + (c % 2 ? 1.5 : -1.5)} ${Y0 + 104} ${X0 + c * CW} ${Y0 + 4 * CH + 2}`} {...STROKE} stroke={LINE_HEX} />
      ))}
      {/* the marks */}
      {MARKS.map((m, i) => {
        const cx = X0 + m.col * CW + CW / 2
        const cy = Y0 + m.row * CH + 20
        return (
          <g key={i}>
            <path
              d={`M ${cx - 11} ${cy} C ${cx - 11} ${cy - 14} ${cx + 12} ${cy - 15} ${cx + 11} ${cy} C ${cx + 10} ${cy + 15} ${cx - 12} ${cy + 14} ${cx - 11} ${cy}`}
              fill={AMBER_HEX}
              stroke="none"
            />
            <Label x={cx} y={cy + 24} anchor="middle" size={11} fill={MUTED_HEX}>
              {m.who}
            </Label>
          </g>
        )
      })}
      <Label x={X0} y={Y0 + 4 * CH + 36} size={13}>
        5 sales meetings above $25,000. 4 from the owner or a referral.
      </Label>
      <Label x={X0} y={Y0 + 4 * CH + 56} size={13} fill={MUTED_HEX}>
        count yours, then write who got each one
      </Label>
    </Drawing>
  )
}
