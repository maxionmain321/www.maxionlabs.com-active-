import { Drawing, Label, Arrow, Person, STROKE, ACCENT_HEX, AMBER_HEX, MUTED_HEX } from './Drawing'

const Y = 120

/**
 * How a meeting gets to the producer's calendar: a public record changes, one email names it, the owner says yes,
 * we call to confirm and take the renewal date, then it lands on the producer's calendar with a brief.
 */
export function AppointmentSettingRecordToCalendar() {
  return (
    <Drawing
      id="record-to-calendar"
      viewBox="0 0 640 250"
      title="From a changed public record to your producer's calendar"
      desc="Five steps left to right. A document with a corner folded, labelled a public record changes, with the examples DOT authority, contractor licence, OSHA citation, Form 5500. An envelope labelled one email, names the record. A speech bubble that says yes. A phone labelled our call, renewal date, fit. A calendar page with one day marked, labelled your producer's calendar, brief first. A stick figure stands next to the calendar."
      caption="How a meeting reaches your producer, drawn. A record changes, we email the owner about it, the owner says yes, we call to confirm and take the renewal date, then it goes on your producer's calendar, brief first."
    >
      {/* 1. the record */}
      <path d={`M 36 ${Y - 36} L 84 ${Y - 37} L 98 ${Y - 23} L 97 ${Y + 30} L 37 ${Y + 31} Z`} {...STROKE} fill="white" />
      <path d={`M 84 ${Y - 37} L 84 ${Y - 23} L 98 ${Y - 23}`} {...STROKE} />
      <path d={`M 48 ${Y - 8} L 84 ${Y - 7}`} {...STROKE} stroke={MUTED_HEX} />
      <path d={`M 48 ${Y + 4} L 80 ${Y + 5}`} {...STROKE} stroke={MUTED_HEX} />
      <path d={`M 48 ${Y + 16} L 72 ${Y + 16}`} {...STROKE} stroke={AMBER_HEX} />
      <Label x={67} y={Y + 56} anchor="middle" size={12} weight={600}>
        a record changes
      </Label>
      <Label x={67} y={Y + 72} anchor="middle" size={10} fill={MUTED_HEX}>
        DOT authority, licence,
      </Label>
      <Label x={67} y={Y + 86} anchor="middle" size={10} fill={MUTED_HEX}>
        OSHA citation, Form 5500
      </Label>

      <Arrow x1={108} y1={Y} x2={146} y2={Y} />

      {/* 2. the email */}
      <path d={`M 156 ${Y - 22} L 236 ${Y - 23} L 235 ${Y + 24} L 157 ${Y + 25} Z`} {...STROKE} fill="white" />
      <path d={`M 157 ${Y - 22} L 196 ${Y + 6} L 235 ${Y - 23}`} {...STROKE} />
      <Label x={196} y={Y + 56} anchor="middle" size={12} weight={600}>
        one email
      </Label>
      <Label x={196} y={Y + 72} anchor="middle" size={10} fill={MUTED_HEX}>
        names the record
      </Label>

      <Arrow x1={246} y1={Y} x2={284} y2={Y} />

      {/* 3. the yes */}
      <path d={`M 294 ${Y - 26} Q 294 ${Y - 40} 310 ${Y - 40} L 352 ${Y - 40} Q 368 ${Y - 40} 368 ${Y - 26} L 368 ${Y + 2} Q 368 ${Y + 16} 352 ${Y + 16} L 322 ${Y + 16} L 306 ${Y + 32} L 309 ${Y + 16} Q 294 ${Y + 14} 294 ${Y + 2} Z`} {...STROKE} fill={ACCENT_HEX} fillOpacity={0.1} />
      <Label x={331} y={Y - 6} anchor="middle" size={15} weight={600} fill={ACCENT_HEX}>
        yes
      </Label>
      <Label x={331} y={Y + 56} anchor="middle" size={12} weight={600}>
        the owner replies
      </Label>

      <Arrow x1={378} y1={Y} x2={416} y2={Y} />

      {/* 4. our call */}
      <path d={`M 436 ${Y - 34} L 466 ${Y - 35} L 467 ${Y + 30} L 437 ${Y + 31} Z`} {...STROKE} fill="white" />
      <path d={`M 445 ${Y - 24} L 458 ${Y - 24}`} {...STROKE} stroke={MUTED_HEX} />
      <circle cx={451.5} cy={Y + 22} r={2.5} fill={MUTED_HEX} stroke="none" />
      <Label x={451} y={Y + 56} anchor="middle" size={12} weight={600}>
        our call
      </Label>
      <Label x={451} y={Y + 72} anchor="middle" size={10} fill={MUTED_HEX}>
        renewal date, fit,
      </Label>
      <Label x={451} y={Y + 86} anchor="middle" size={10} fill={MUTED_HEX}>
        who signs
      </Label>

      <Arrow x1={478} y1={Y} x2={514} y2={Y} />

      {/* 5. the calendar */}
      <path d={`M 524 ${Y - 32} L 588 ${Y - 33} L 587 ${Y + 28} L 525 ${Y + 29} Z`} {...STROKE} fill="white" />
      <path d={`M 525 ${Y - 18} L 587 ${Y - 19}`} {...STROKE} />
      <path d={`M 536 ${Y - 40} L 536 ${Y - 26}`} {...STROKE} />
      <path d={`M 576 ${Y - 40} L 576 ${Y - 26}`} {...STROKE} />
      {[0, 1, 2].map((r) =>
        [0, 1, 2, 3].map((c) => (
          <circle key={`${r}${c}`} cx={534 + c * 15} cy={Y - 8 + r * 13} r={1.6} fill={MUTED_HEX} stroke="none" />
        )),
      )}
      <path d={`M 557 ${Y + 5} C 557 ${Y - 3} 572 ${Y - 4} 571 ${Y + 5} C 571 ${Y + 13} 556 ${Y + 13} 557 ${Y + 5}`} fill={AMBER_HEX} stroke="none" />
      <Person x={612} y={Y - 30} accent />
      <Label x={566} y={Y + 56} anchor="middle" size={12} weight={600}>
        producer&apos;s calendar
      </Label>
      <Label x={566} y={Y + 72} anchor="middle" size={10} fill={MUTED_HEX}>
        brief in the inbox first
      </Label>

      <Label x={320} y={30} anchor="middle" size={13}>
        only a yes that passes the four tests gets this far
      </Label>
    </Drawing>
  )
}
