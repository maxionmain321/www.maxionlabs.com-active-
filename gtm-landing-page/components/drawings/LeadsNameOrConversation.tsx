import {
  Drawing,
  Label,
  Person,
  Arrow,
  STROKE,
  ACCENT_HEX,
  MUTED_HEX,
  AMBER_HEX,
} from "./Drawing";

/**
 * The split under every lead source: a name (somebody still has to dial it) or a conversation (somebody already set
 * it up). Left, a stack of four name cards next to a phone nobody is holding. Right, two people already talking.
 */
export function LeadsNameOrConversation() {
  const cards = [
    "shared web lead",
    "exclusive lead",
    "aged lead",
    "X-date list",
  ];
  return (
    <Drawing
      id="name-or-conversation"
      viewBox="0 0 640 300"
      title="A name or a conversation"
      desc="Two halves. On the left, four cards stacked and labelled shared web lead, exclusive lead, aged lead and X-date list, under the heading a name. Next to them a telephone sits on a desk with nobody holding it, labelled somebody still has to dial. On the right, under the heading a conversation, two stick figures face each other, labelled live transfer, referral, qualified sales meeting. A line below reads the dial is the part nobody owns."
      caption="Every lead source is one of two things. A name somebody in your shop still has to dial, or a conversation somebody already set up. Most agencies are short of the dial, not the name."
    >
      {/* left heading */}
      <Label x={150} y={40} anchor="middle" weight={600} size={15}>
        a name
      </Label>

      {/* stacked cards */}
      {cards.map((c, i) => {
        const x = 48 + i * 6;
        const y = 64 + i * 30;
        return (
          <g key={c}>
            <path
              d={`M ${x} ${y} L ${x + 150} ${y + 1} L ${x + 149} ${y + 26} L ${x - 1} ${y + 25} Z`}
              {...STROKE}
              fill="white"
            />
            <Label x={x + 10} y={y + 18} size={12}>
              {c}
            </Label>
          </g>
        );
      })}

      {/* the phone on a desk, nobody holding it */}
      <path d="M 228 206 L 300 206" {...STROKE} />
      <path
        d="M 238 180 Q 264 170 290 180 L 286 198 Q 264 190 242 198 Z"
        {...STROKE}
        fill="white"
      />
      <path d="M 256 198 L 254 206" {...STROKE} />
      <path d="M 272 198 L 274 206" {...STROKE} />
      <Label x={264} y={232} anchor="middle" size={11} fill={MUTED_HEX}>
        nobody holding it
      </Label>

      <Label
        x={150}
        y={262}
        anchor="middle"
        size={12}
        fill={AMBER_HEX}
        weight={600}
      >
        somebody still has to dial
      </Label>

      {/* divider */}
      <path d="M 320 56 Q 322 150 320 250" {...STROKE} stroke="#D8DEE6" />

      {/* right heading */}
      <Label x={490} y={40} anchor="middle" weight={600} size={15}>
        a conversation
      </Label>

      {/* two people already talking */}
      <Person x={440} y={96} />
      <Person x={540} y={94} accent />
      <path d="M 458 108 Q 490 96 522 106" {...STROKE} stroke={ACCENT_HEX} />
      <Label x={490} y={190} anchor="middle" size={12}>
        live transfer
      </Label>
      <Label x={490} y={208} anchor="middle" size={12}>
        referral
      </Label>
      <Label
        x={490}
        y={226}
        anchor="middle"
        size={12}
        weight={600}
        fill={ACCENT_HEX}
      >
        qualified sales meeting
      </Label>
      <Label x={490} y={262} anchor="middle" size={12} fill={MUTED_HEX}>
        already talking
      </Label>

      {/* the dial, the arrow that joins the two halves */}
      <Arrow x1={300} y1={150} x2={352} y2={150} color={AMBER_HEX} />
      <Label x={326} y={138} anchor="middle" size={11} fill={AMBER_HEX}>
        the dial
      </Label>

      <Label x={320} y={292} anchor="middle" size={13}>
        the dial is the part nobody in the building owns
      </Label>
    </Drawing>
  );
}
