import { Drawing, Label, STROKE, ACCENT_HEX, AMBER_HEX, MUTED_HEX, LINE_HEX } from './Drawing'

const DAYS = ['M', 'T', 'W', 'T', 'F']
const CX0 = 44
const CY0 = 70
const CW = 46
const CH = 34

/** Three sales meetings with a new account above the floor last month, and who got each one. */
const MARKS: { row: number; col: number; who: string }[] = [
  { row: 0, col: 3, who: 'you' },
  { row: 2, col: 1, who: 'referral' },
  { row: 3, col: 4, who: 'you' },
]

/** The book sorted by commission: two tall bars, then a long tail of small ones. Heights in units. */
const BARS = [96, 70, 22, 18, 16, 14, 12, 11, 10, 9, 8, 8]
const BX0 = 356
const BBASE = CY0 + 4 * CH
const BW = 17

/** The calendar-and-book check, drawn: last month's sales meetings and who got them, next to the book by commission. */
export function CalendarAndBook() {
  return (
    <Drawing
      id="calendar-and-book"
      viewBox="0 0 640 300"
      title="The calendar-and-book check"
      desc="Two sheets side by side. On the left, last month's calendar, five weekdays across and four weeks down, with three amber marks for sales meetings with a new account above the floor, labelled you, referral, you. The line under it reads 3 sales meetings, 2 from you. On the right, the book sorted by commission as twelve bars, two tall and ten small. The line under it reads 20% of accounts bring 80% of commission."
      caption="The calendar-and-book check, drawn. Left, last month's sales meetings with a new account above your floor and who got each one, here 3 sales meetings, 2 from you. Right, the book by commission, where 20% of accounts bring about 80% of it. Two sheets, and they point at your cause."
    >
      {/* calendar sheet */}
      <Label x={CX0} y={34} size={14} weight={600}>
        last month
      </Label>
      {DAYS.map((d, i) => (
        <Label key={i} x={CX0 + i * CW + CW / 2} y={CY0 - 8} anchor="middle" size={11} fill={MUTED_HEX}>
          {d}
        </Label>
      ))}
      {[0, 1, 2, 3, 4].map((r) => (
        <path key={`r${r}`} d={`M ${CX0 - 2} ${CY0 + r * CH} Q ${CX0 + 115} ${CY0 + r * CH + (r % 2 ? 1.2 : -1.2)} ${CX0 + 5 * CW + 2} ${CY0 + r * CH}`} {...STROKE} stroke={LINE_HEX} />
      ))}
      {[0, 1, 2, 3, 4, 5].map((c) => (
        <path key={`c${c}`} d={`M ${CX0 + c * CW} ${CY0 - 2} Q ${CX0 + c * CW + (c % 2 ? 1.2 : -1.2)} ${CY0 + 68} ${CX0 + c * CW} ${CY0 + 4 * CH + 2}`} {...STROKE} stroke={LINE_HEX} />
      ))}
      {MARKS.map((m, i) => {
        const cx = CX0 + m.col * CW + CW / 2
        const cy = CY0 + m.row * CH + 13
        return (
          <g key={i}>
            <path
              d={`M ${cx - 8} ${cy} C ${cx - 8} ${cy - 10} ${cx + 9} ${cy - 11} ${cx + 8} ${cy} C ${cx + 7} ${cy + 11} ${cx - 9} ${cy + 10} ${cx - 8} ${cy}`}
              fill={AMBER_HEX}
              stroke="none"
            />
            <Label x={cx} y={cy + 19} anchor="middle" size={9} fill={MUTED_HEX}>
              {m.who}
            </Label>
          </g>
        )
      })}
      <Label x={CX0} y={CY0 + 4 * CH + 30} size={12} weight={600}>
        3 sales meetings, 2 from you
      </Label>
      <Label x={CX0} y={CY0 + 4 * CH + 48} size={11} fill={MUTED_HEX}>
        new accounts above your floor only
      </Label>

      {/* divider */}
      <path d={`M 318 40 Q 320 150 319 262`} {...STROKE} stroke={LINE_HEX} strokeDasharray="6 7" />

      {/* book sheet */}
      <Label x={BX0} y={34} size={14} weight={600}>
        the book, by commission
      </Label>
      <path d={`M ${BX0 - 8} ${BBASE} Q ${BX0 + 120} ${BBASE + 2} ${BX0 + BARS.length * (BW + 5) + 4} ${BBASE - 1}`} {...STROKE} />
      {BARS.map((h, i) => {
        const x = BX0 + i * (BW + 5)
        const big = i < 2
        return (
          <path
            key={i}
            d={`M ${x} ${BBASE - h} L ${x + BW + (i % 2 ? 0.8 : -0.8)} ${BBASE - h + 0.6} L ${x + BW} ${BBASE} L ${x} ${BBASE} Z`}
            {...STROKE}
            strokeWidth={1.8}
            fill={big ? ACCENT_HEX : 'white'}
            fillOpacity={big ? 0.18 : 1}
          />
        )
      })}
      <Label x={BX0 + BW + 2} y={BBASE - 104} anchor="middle" size={11} weight={600} fill={ACCENT_HEX}>
        20% of accounts
      </Label>
      <Label x={BX0 + 7 * (BW + 5)} y={BBASE - 42} anchor="middle" size={11} fill={MUTED_HEX}>
        the small tail
      </Label>
      <Label x={BX0} y={BBASE + 30} size={12} weight={600}>
        20% of accounts bring 80% of commission
      </Label>
      <Label x={BX0} y={BBASE + 48} size={11} fill={MUTED_HEX}>
        and the tail gets the same service
      </Label>
    </Drawing>
  )
}
