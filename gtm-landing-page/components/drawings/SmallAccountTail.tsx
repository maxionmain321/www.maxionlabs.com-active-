import { Drawing, Label, Arrow, STROKE, ACCENT_HEX, MUTED_HEX } from './Drawing'

/** Two big accounts and a tail of small ones, every one of them pulling on the same service desk. */
export function SmallAccountTail() {
  const small: { x: number; y: number }[] = []
  for (let r = 0; r < 2; r++) for (let c = 0; c < 8; c++) small.push({ x: 300 + c * 40, y: 70 + r * 44 })
  return (
    <Drawing
      id="small-account-tail"
      viewBox="0 0 640 300"
      title="Too many small accounts, one service desk"
      desc="On the left, two large boxes labelled a $30,000 account. On the right, sixteen small boxes labelled $1,500 accounts. Arrows run from both groups down to one box labelled your service desk, certificates, remarkets, calls. The line below reads every account pulls on the same desk, whatever it pays."
      caption="Too many small accounts, drawn. A $1,500 commission account and a $30,000 one both want certificates, a remarket and a call back, on the same desk. 16 small ones eat the hours the next big account needed."
    >
      {/* two big accounts */}
      {[0, 1].map((i) => (
        <g key={i}>
          <path
            d={`M ${60 + i * 100} 66 L ${146 + i * 100} 67 L ${145 + i * 100} 152 L ${59 + i * 100} 151 Z`}
            {...STROKE}
            fill={ACCENT_HEX}
            fillOpacity={0.16}
          />
          <Label x={103 + i * 100} y={104} anchor="middle" size={12} weight={600}>
            a $30,000
          </Label>
          <Label x={103 + i * 100} y={122} anchor="middle" size={12} weight={600}>
            account
          </Label>
        </g>
      ))}
      <Label x={152} y={44} anchor="middle" size={13} weight={600}>
        2 big accounts
      </Label>

      {/* the small tail */}
      {small.map((s, i) => (
        <path key={i} d={`M ${s.x} ${s.y} L ${s.x + 30} ${s.y + (i % 2 ? 0.8 : -0.8)} L ${s.x + 30} ${s.y + 30} L ${s.x - 0.6} ${s.y + 30} Z`} {...STROKE} strokeWidth={1.8} fill="white" />
      ))}
      <Label x={455} y={44} anchor="middle" size={13} weight={600}>
        16 small ones, $1,500 each
      </Label>

      {/* arrows into the desk */}
      <Arrow x1={152} y1={160} x2={290} y2={224} />
      <Arrow x1={455} y1={152} x2={350} y2={224} />

      {/* the service desk */}
      <path d="M 200 232 L 440 233 L 439 282 L 199 281 Z" {...STROKE} fill="white" />
      <Label x={320} y={252} anchor="middle" size={13} weight={600}>
        your service desk
      </Label>
      <Label x={320} y={270} anchor="middle" size={11} fill={MUTED_HEX}>
        certificates, remarkets, call backs
      </Label>

      <Label x={470} y={262} size={11} fill={MUTED_HEX}>
        same desk, whatever
      </Label>
      <Label x={470} y={278} size={11} fill={MUTED_HEX}>
        the account pays
      </Label>
    </Drawing>
  )
}
