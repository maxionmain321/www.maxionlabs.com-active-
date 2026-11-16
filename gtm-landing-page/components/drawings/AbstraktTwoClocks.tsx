import { Drawing, Label, STROKE, ACCENT_HEX, AMBER_HEX, MUTED_HEX, LINE_HEX } from './Drawing'

const X0 = 60
const BOX = 44
const GAP = 2

/** A hand-drawn tick inside a month box. */
function Tick({ x, y, color }: { x: number; y: number; color: string }) {
  return <path d={`M ${x - 9} ${y + 1} L ${x - 2} ${y + 8} L ${x + 10} ${y - 8}`} {...STROKE} stroke={color} />
}

/** Twelve month boxes in a row. */
function Strip({ y, ticks, color }: { y: number; ticks: number[]; color: string }) {
  return (
    <g>
      {Array.from({ length: 12 }, (_, i) => {
        const x = X0 + i * (BOX + GAP)
        const wob = i % 2 ? 1 : -1
        return (
          <g key={i}>
            <path d={`M ${x} ${y} L ${x + BOX + wob} ${y + 1} L ${x + BOX} ${y + BOX} L ${x - wob} ${y + BOX - 1} Z`} {...STROKE} stroke={LINE_HEX} />
            <Label x={x + BOX / 2} y={y + BOX + 15} anchor="middle" size={10} fill={MUTED_HEX}>
              {i + 1}
            </Label>
            {ticks.includes(i + 1) && <Tick x={x + BOX / 2} y={y + BOX / 2} color={color} />}
          </g>
        )
      })}
    </g>
  )
}

/**
 * When the count gets checked. Abstrakt: the agreed number is measured at the end of the year, and a miss means they work
 * free until they hit it. Maxionlabs: 15 is checked every month, $315 back per miss, and the owner can leave any month.
 */
export function AbstraktTwoClocks() {
  const topY = 62
  const bottomY = 200
  return (
    <Drawing
      id="abstrakt-two-clocks"
      viewBox="0 0 640 330"
      title="When the count gets checked, year end or every month"
      desc="Two strips of 12 month boxes. The top strip, labelled Abstrakt, has one tick in month 12 and the note count checked at year end, miss means they work free until they hit it. The bottom strip, labelled Maxionlabs, has a tick in every one of the 12 months and the note 15 checked every month, $315 back per miss, leave any month."
      caption="When you find out. Abstrakt's number is measured at the end of the year, and a miss means they work free until they hit it. Ours is 15 checked every month, $315 back per miss, and you can leave any month. Same 12 months, 1 check against 12."
    >
      <Label x={X0} y={topY - 30} size={14} weight={600}>
        Abstrakt
      </Label>
      <Label x={X0 + 90} y={topY - 30} size={11} fill={MUTED_HEX}>
        the number in your agreement, measured at year end
      </Label>
      <Strip y={topY} ticks={[12]} color={AMBER_HEX} />
      <Label x={X0} y={topY + BOX + 38} size={12} fill={AMBER_HEX} weight={600}>
        1 check, in month 12. a miss means they work free until they hit it
      </Label>

      <Label x={X0} y={bottomY - 30} size={14} weight={600} fill={ACCENT_HEX}>
        Maxionlabs
      </Label>
      <Label x={X0 + 110} y={bottomY - 30} size={11} fill={MUTED_HEX}>
        15 qualified sales meetings, measured every month
      </Label>
      <Strip y={bottomY} ticks={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]} color={ACCENT_HEX} />
      <Label x={X0} y={bottomY + BOX + 38} size={12} fill={ACCENT_HEX} weight={600}>
        12 checks. $315 back per meeting short, and you can leave any month
      </Label>

      <Label x={320} y={318} anchor="middle" size={13}>
        same 12 months, 1 check against 12
      </Label>
    </Drawing>
  )
}
