import { Drawing, Label, Arrow, STROKE, AMBER_HEX, MUTED_HEX, ACCENT_HEX } from './Drawing'

const JOBS: { n: string; name: string; sub1: string; sub2: string; skipped?: boolean }[] = [
  { n: '1', name: 'find them', sub1: 'fits your appetite', sub2: 'and has a reason now' },
  { n: '2', name: 'get the yes', sub1: 'the owner agrees', sub2: 'to a conversation' },
  { n: '3', name: 'check the yes', sub1: 'on a call, against', sub2: 'your written rules', skipped: true },
  { n: '4', name: 'hand it over', sub1: "on the producer's", sub2: 'calendar, brief first' },
]

const W = 128
const H = 86
const GAP = 34
const X0 = 22
const Y0 = 70

/**
 * The four jobs every appointment service does, drawn as four boxes in a row. Job 3, check the yes, is the one
 * most per-appointment vendors skip, so it is drawn in amber with a dashed outline.
 */
export function AppointmentSettingFourJobs() {
  return (
    <Drawing
      id="four-jobs"
      viewBox="0 0 640 230"
      title="The four jobs of an appointment service"
      desc="Four boxes in a row joined by arrows. Box 1, find them, fits your appetite and has a reason now. Box 2, get the yes, the owner agrees to a conversation. Box 3, check the yes, on a call against your written rules, drawn in amber with a dashed outline and the note most vendors skip this one. Box 4, hand it over, on the producer's calendar with a brief first."
      caption="The four jobs, drawn. Find them, get the yes, check the yes, hand it over. Job 3 is the one most per-appointment vendors skip, and it decides whether the meeting was worth your producer's afternoon."
    >
      {JOBS.map((j, i) => {
        const x = X0 + i * (W + GAP)
        const stroke = j.skipped ? AMBER_HEX : STROKE.stroke
        return (
          <g key={j.n}>
            <path
              d={`M ${x} ${Y0} L ${x + W + (i % 2 ? 2 : -1)} ${Y0 + 1} L ${x + W} ${Y0 + H} L ${x - 1} ${Y0 + H + (i % 2 ? -1 : 1)} Z`}
              {...STROKE}
              stroke={stroke}
              strokeDasharray={j.skipped ? '7 6' : undefined}
              fill={j.skipped ? AMBER_HEX : 'white'}
              fillOpacity={j.skipped ? 0.08 : 1}
            />
            <circle cx={x + 18} cy={Y0 + 20} r={11} {...STROKE} stroke={stroke} fill="white" />
            <Label x={x + 18} y={Y0 + 24.5} anchor="middle" size={12} weight={600} fill={stroke}>
              {j.n}
            </Label>
            <Label x={x + 36} y={Y0 + 25} size={14} weight={600} fill={j.skipped ? AMBER_HEX : undefined}>
              {j.name}
            </Label>
            <Label x={x + 12} y={Y0 + 52} size={11} fill={MUTED_HEX}>
              {j.sub1}
            </Label>
            <Label x={x + 12} y={Y0 + 68} size={11} fill={MUTED_HEX}>
              {j.sub2}
            </Label>
            {i < JOBS.length - 1 ? <Arrow x1={x + W + 5} y1={Y0 + H / 2} x2={x + W + GAP - 5} y2={Y0 + H / 2} /> : null}
          </g>
        )
      })}

      {/* the note over job 3 */}
      <path d={`M ${X0 + 2 * (W + GAP) + W / 2} ${Y0 - 10} Q ${X0 + 2 * (W + GAP) + W / 2 + 6} ${Y0 - 26} ${X0 + 2 * (W + GAP) + W / 2} ${Y0 - 38}`} {...STROKE} stroke={AMBER_HEX} />
      <Label x={X0 + 2 * (W + GAP) + W / 2} y={Y0 - 46} anchor="middle" size={12} weight={600} fill={AMBER_HEX}>
        most vendors skip this one
      </Label>

      {/* what your producer gets at the end */}
      <path d={`M ${X0} ${Y0 + H + 34} Q 320 ${Y0 + H + 37} ${X0 + 4 * W + 3 * GAP} ${Y0 + H + 33}`} {...STROKE} stroke={ACCENT_HEX} strokeOpacity={0.5} />
      <Label x={X0} y={Y0 + H + 58} size={13}>
        a per-appointment vendor gets paid at job 2. you find out about job 3 on Tuesday morning.
      </Label>
    </Drawing>
  )
}
