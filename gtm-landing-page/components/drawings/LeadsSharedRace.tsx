import {
  Drawing,
  Label,
  Person,
  Arrow,
  STROKE,
  ACCENT_HEX,
  AMBER_HEX,
  MUTED_HEX,
} from "./Drawing";

/**
 * A shared web lead: one business owner filled in one form, and 3 agents got it in the same minute.
 * Three producers on the left, each with a phone line running to the one owner on the right.
 */
export function LeadsSharedRace() {
  return (
    <Drawing
      id="shared-race"
      viewBox="0 0 640 300"
      title="One form, 3 agents, same minute"
      desc="One business owner stands on the right holding a phone, labelled 1 owner, 1 form, 11pm. On the left three stick figures labelled agent 1, agent 2 and agent 3 each have an arrow running to the owner. The arrows arrive at the same point. A line underneath reads EverQuote sells each lead to a maximum of 3 agents, and the first to dial usually wins."
      caption="A shared web lead, drawn. 1 owner fills in 1 form at 11pm and 3 agents get it in the same minute. EverQuote's rule is a maximum of 3 agents per lead, and the first to dial usually wins."
    >
      {/* three agents */}
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <Person x={92} y={56 + i * 76} />
          <Label
            x={92}
            y={128 + i * 76}
            anchor="middle"
            size={11}
            fill={MUTED_HEX}
          >
            agent {i + 1}
          </Label>
          <Arrow x1={118} y1={82 + i * 76} x2={468} y2={150} />
        </g>
      ))}

      {/* the one owner, with the form */}
      <Person x={520} y={116} accent />
      <path
        d="M 548 150 L 592 151 L 591 196 L 547 195 Z"
        {...STROKE}
        stroke={ACCENT_HEX}
        fill="white"
      />
      <path
        d="M 556 162 L 584 162"
        {...STROKE}
        stroke={ACCENT_HEX}
        strokeWidth={1.5}
      />
      <path
        d="M 556 172 L 584 172"
        {...STROKE}
        stroke={ACCENT_HEX}
        strokeWidth={1.5}
      />
      <path
        d="M 556 182 L 576 182"
        {...STROKE}
        stroke={ACCENT_HEX}
        strokeWidth={1.5}
      />
      <Label x={540} y={206} anchor="middle" size={11} fill={MUTED_HEX}>
        1 owner, 1 form, 11pm
      </Label>

      {/* the clock */}
      <Label
        x={320}
        y={40}
        anchor="middle"
        size={13}
        weight={600}
        fill={AMBER_HEX}
      >
        same minute
      </Label>

      <Label x={320} y={262} anchor="middle" size={13}>
        EverQuote: a maximum of 3 agents per lead
      </Label>
      <Label x={320} y={284} anchor="middle" size={12} fill={MUTED_HEX}>
        the first to dial usually wins
      </Label>
    </Drawing>
  );
}
