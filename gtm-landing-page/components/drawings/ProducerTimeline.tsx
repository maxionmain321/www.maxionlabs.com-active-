import { Drawing, Label, STROKE, ACCENT_HEX, AMBER_HEX, MUTED_HEX } from './Drawing'

const Y = 150
const X_HIRE = 60
const X_M6 = 160
const X_M12 = 260
const X_Y2 = 420
const X_Y3 = 580

function Tick({ x, label, sub }: { x: number; label: string; sub?: string }) {
  return (
    <g>
      <path d={`M ${x} ${Y - 9} L ${x + 0.5} ${Y + 9}`} {...STROKE} />
      <Label x={x} y={Y + 30} anchor="middle" weight={600}>
        {label}
      </Label>
      {sub ? (
        <Label x={x} y={Y + 48} anchor="middle" size={11} fill={MUTED_HEX}>
          {sub}
        </Label>
      ) : null}
    </g>
  )
}

/** The three-year producer bet as a timeline: you know by month 6 to 12, validation at about year 3, 45.5% make it. */
export function ProducerTimeline() {
  return (
    <Drawing
      id="producer-timeline"
      viewBox="0 0 640 250"
      title="The three-year producer bet"
      desc="A timeline from hire to year 3. A shaded band from hire to month 12 is labelled draw, benefits, a desk, your time. A bracket over month 6 to month 12 reads you know by now. Year 2 and year 3 are labelled ramp, if the answer is yes. At year 3 a coin reads 45.5%, the share of producers who made it in the 2023 study."
      caption="The producer bet on one line. You pay the draw from day one, you know by month 6 to 12 if it will work, and validation takes about 3 years. In the 2023 study, 45.5% made it."
    >
      {/* paid band, hire to month 12 */}
      <path d={`M ${X_HIRE} ${Y - 26} L ${X_M12} ${Y - 26} L ${X_M12} ${Y + 2} L ${X_HIRE} ${Y + 2} Z`} fill={ACCENT_HEX} fillOpacity={0.14} stroke="none" />
      <Label x={(X_HIRE + X_M12) / 2} y={Y - 34} anchor="middle" size={11} fill={ACCENT_HEX} weight={600}>
        draw, benefits, a desk, your time
      </Label>

      {/* the line */}
      <path d={`M ${X_HIRE - 6} ${Y} Q 320 ${Y + 3} ${X_Y3 + 14} ${Y - 1}`} {...STROKE} />
      <path d={`M ${X_Y3 + 4} ${Y - 8} L ${X_Y3 + 14} ${Y - 1} L ${X_Y3 + 4} ${Y + 7}`} {...STROKE} />

      <Tick x={X_HIRE} label="hire" />
      <Tick x={X_M6} label="month 6" />
      <Tick x={X_M12} label="month 12" />
      <Tick x={X_Y2} label="year 2" sub="ramp, if the answer is yes" />
      <Tick x={X_Y3} label="year 3" sub="validates, or not" />

      {/* bracket: you know by now */}
      <path d={`M ${X_M6} ${Y - 60} L ${X_M6} ${Y - 72} L ${X_M12} ${Y - 72} L ${X_M12} ${Y - 60}`} {...STROKE} />
      <Label x={(X_M6 + X_M12) / 2} y={Y - 80} anchor="middle" size={12} weight={600}>
        you know by now
      </Label>

      {/* the coin at year 3 */}
      <path
        d={`M ${X_Y3 - 30} 72 C ${X_Y3 - 30} 50 ${X_Y3 + 32} 48 ${X_Y3 + 30} 72 C ${X_Y3 + 29} 95 ${X_Y3 - 31} 94 ${X_Y3 - 30} 72`}
        {...STROKE}
        stroke={AMBER_HEX}
      />
      <Label x={X_Y3} y={77} anchor="middle" size={14} weight={600} fill={AMBER_HEX}>
        45.5%
      </Label>
      <Label x={X_Y3} y={114} anchor="middle" size={11} fill={MUTED_HEX}>
        make it (2023 study)
      </Label>
    </Drawing>
  )
}
