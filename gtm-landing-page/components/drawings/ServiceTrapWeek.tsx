import { Drawing, Label, STROKE, ACCENT_HEX, AMBER_HEX, MUTED_HEX } from './Drawing'

const X = 60
const W = 520
const H = 44

function WeekBar({ y, segs }: { y: number; segs: { w: number; label: string; fill?: string; dashed?: boolean }[] }) {
  let x = X
  return (
    <g>
      {segs.map((s, i) => {
        const left = x
        x += s.w * W
        return (
          <g key={i}>
            <path
              d={`M ${left} ${y} L ${x + (i % 2 ? 1 : -1)} ${y + 0.8} L ${x} ${y + H} L ${left - 0.6} ${y + H + (i % 2 ? -0.8 : 0.8)} Z`}
              {...STROKE}
              stroke={s.dashed ? AMBER_HEX : STROKE.stroke}
              strokeDasharray={s.dashed ? '7 6' : undefined}
              fill={s.fill ?? 'white'}
              fillOpacity={s.fill ? 0.18 : 1}
            />
            <Label x={(left + x) / 2} y={y + H / 2 + 4} anchor="middle" size={11} weight={s.fill ? 600 : 400} fill={s.dashed ? AMBER_HEX : undefined}>
              {s.label}
            </Label>
          </g>
        )
      })}
    </g>
  )
}

/** A producer's week today against the week 83% of respondents said it should be, from the 2013 ReSource Pro survey. */
export function ServiceTrapWeek() {
  return (
    <Drawing
      id="service-trap-week"
      viewBox="0 0 640 300"
      title="The service trap, a producer's week"
      desc="Two horizontal bars, each one working week. The top bar, labelled a producer's week today, is split into selling 25 to 50% and servicing 25 to 50%, with the rest unlabelled. The bottom bar, labelled what 83% said it should be, has a small dashed servicing block under 25% and a long selling block filling the rest."
      caption="The service trap as a week. In the 2013 survey most producers spent 25% to 50% of the week selling and 25% to 50% servicing. 83% said servicing should take under 25%. The gap between the bars is new business nobody chased."
    >
      <Label x={X} y={40} size={14} weight={600}>
        a producer&apos;s week today
      </Label>
      <WeekBar
        y={54}
        segs={[
          { w: 0.37, label: 'selling 25 to 50%', fill: ACCENT_HEX },
          { w: 0.4, label: 'servicing 25 to 50%' },
          { w: 0.23, label: 'the rest' },
        ]}
      />

      <Label x={X} y={166} size={14} weight={600}>
        what 83% said it should be
      </Label>
      <WeekBar
        y={180}
        segs={[
          { w: 0.72, label: 'selling', fill: ACCENT_HEX },
          { w: 0.2, label: 'under 25%', dashed: true },
          { w: 0.08, label: '' },
        ]}
      />

      <Label x={X} y={266} size={12} fill={MUTED_HEX}>
        2013 ReSource Pro survey, producers and managers
      </Label>
      <Label x={X} y={284} size={12} fill={MUTED_HEX}>
        the gap is new business nobody chased
      </Label>
    </Drawing>
  )
}
