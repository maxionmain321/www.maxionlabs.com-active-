import {
  Drawing,
  Label,
  STROKE,
  AMBER_HEX,
  MUTED_HEX,
  LINE_HEX,
} from "./Drawing";

/**
 * The X-date list nobody works: a spreadsheet on a shelf, an empty chair, a phone, and the sum of what working it
 * takes, 100 dials to find the 3 who will talk and the 1 who is in window.
 */
export function LeadsListOnShelf() {
  return (
    <Drawing
      id="list-on-shelf"
      viewBox="0 0 640 300"
      title="The list on the shelf"
      desc="A spreadsheet labelled last quarter's X-date list sits on a shelf with a few dust marks over it. Below, an empty chair at a desk with a telephone, labelled the seat that works it. To the right, three columns of marks read 100 dials, 3 will talk, 1 is in window. The line underneath reads a list only works if somebody works it."
      caption="The list most owners already own. Last quarter's X-date list on a shelf, an empty seat under it, and what working it takes, about 100 dials to find the 3 who'll talk and the 1 in window."
    >
      {/* shelf */}
      <path d="M 40 118 L 290 120" {...STROKE} />
      <path d="M 52 120 L 52 132" {...STROKE} />
      <path d="M 278 120 L 278 132" {...STROKE} />

      {/* the spreadsheet on the shelf */}
      <path
        d="M 86 44 L 236 45 L 235 117 L 85 116 Z"
        {...STROKE}
        fill="white"
      />
      {[58, 72, 86, 100].map((y) => (
        <path
          key={y}
          d={`M 92 ${y} L 230 ${y + 0.5}`}
          {...STROKE}
          stroke={LINE_HEX}
          strokeWidth={1.5}
        />
      ))}
      {[120, 160, 198].map((x) => (
        <path
          key={x}
          d={`M ${x} 48 L ${x + 0.5} 114`}
          {...STROKE}
          stroke={LINE_HEX}
          strokeWidth={1.5}
        />
      ))}
      {/* dust */}
      <path
        d="M 100 36 Q 104 32 108 36"
        {...STROKE}
        stroke={MUTED_HEX}
        strokeWidth={1.5}
      />
      <path
        d="M 196 34 Q 200 30 204 34"
        {...STROKE}
        stroke={MUTED_HEX}
        strokeWidth={1.5}
      />
      <path
        d="M 150 30 Q 154 26 158 30"
        {...STROKE}
        stroke={MUTED_HEX}
        strokeWidth={1.5}
      />
      <Label x={160} y={146} anchor="middle" size={12} weight={600}>
        last quarter&apos;s X-date list
      </Label>

      {/* empty chair at a desk with a phone */}
      <path d="M 90 236 L 250 237" {...STROKE} />
      <path d="M 100 237 L 100 262" {...STROKE} />
      <path d="M 240 237 L 240 262" {...STROKE} />
      <path
        d="M 196 218 Q 214 212 232 218 L 229 232 Q 214 226 199 232 Z"
        {...STROKE}
        fill="white"
      />
      {/* chair, empty */}
      <path
        d="M 124 262 L 124 196 L 166 196 L 166 262"
        {...STROKE}
        stroke={AMBER_HEX}
      />
      <path d="M 120 226 L 170 226" {...STROKE} stroke={AMBER_HEX} />
      <Label
        x={160}
        y={286}
        anchor="middle"
        size={12}
        fill={AMBER_HEX}
        weight={600}
      >
        the seat that works it
      </Label>

      {/* divider */}
      <path d="M 320 40 Q 322 150 320 270" {...STROKE} stroke={LINE_HEX} />

      {/* what working it takes */}
      <Label x={480} y={50} anchor="middle" size={13} weight={600}>
        what working it takes
      </Label>
      {/* 100 dials as a 10 x 10 block of dots */}
      {Array.from({ length: 100 }, (_, i) => (
        <circle
          key={i}
          cx={380 + (i % 10) * 11}
          cy={74 + Math.floor(i / 10) * 11}
          r={3}
          fill={MUTED_HEX}
          stroke="none"
        />
      ))}
      <Label x={430} y={196} anchor="middle" size={12}>
        100 dials
      </Label>
      {/* 3 who talk */}
      {[0, 1, 2].map((i) => (
        <circle key={i} cx={530 + i * 18} cy={100} r={6} {...STROKE} />
      ))}
      <Label x={548} y={124} anchor="middle" size={12}>
        3 will talk
      </Label>
      {/* 1 in window */}
      <circle cx={548} cy={160} r={8} fill={AMBER_HEX} stroke="none" />
      <Label x={548} y={186} anchor="middle" size={12}>
        1 is in window
      </Label>

      <Label x={480} y={250} anchor="middle" size={13}>
        a list only works if somebody works it
      </Label>
      <Label x={480} y={272} anchor="middle" size={11} fill={MUTED_HEX}>
        no seat, and the cheapest list is the dearest thing you bought
      </Label>
    </Drawing>
  );
}
