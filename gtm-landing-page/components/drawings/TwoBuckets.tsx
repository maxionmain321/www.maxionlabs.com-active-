import { Drawing, Label, Person, STROKE, ACCENT_HEX, MUTED_HEX } from './Drawing'

/** Two buckets: first meetings (nearly empty) and closers (full). New business needs both full. */
export function TwoBuckets() {
  return (
    <Drawing
      id="two-buckets"
      viewBox="0 0 640 300"
      title="Two buckets: first meetings and closers"
      desc="Two buckets side by side. The left bucket, labelled first meetings, holds three small dots and is nearly empty. The right bucket, labelled closers, your producers, holds three stick figures standing and waiting. A plus sign joins them and the line below reads new business needs both full."
      caption="Two buckets, and new business needs both full. Here the closers are full and waiting and the meetings bucket is nearly empty."
    >
      {/* left bucket */}
      <path d="M 88 110 Q 86 170 96 232 L 206 234 Q 216 170 212 110" {...STROKE} />
      <path d="M 82 108 Q 150 98 218 108" {...STROKE} />
      <circle cx={130} cy={218} r={6} fill={ACCENT_HEX} stroke="none" />
      <circle cx={158} cy={222} r={6} fill={ACCENT_HEX} stroke="none" />
      <circle cx={182} cy={216} r={6} fill={ACCENT_HEX} stroke="none" />
      <Label x={150} y={84} anchor="middle" weight={600}>
        first meetings
      </Label>
      <Label x={150} y={262} anchor="middle" fill={MUTED_HEX}>
        nearly empty
      </Label>

      {/* plus */}
      <path d="M 300 160 L 340 162" {...STROKE} />
      <path d="M 320 140 L 321 182" {...STROKE} />

      {/* right bucket */}
      <path d="M 428 110 Q 426 170 436 232 L 546 234 Q 556 170 552 110" {...STROKE} />
      <path d="M 422 108 Q 490 98 558 108" {...STROKE} />
      <Person x={458} y={128} />
      <Person x={492} y={122} />
      <Person x={526} y={130} />
      <Label x={490} y={84} anchor="middle" weight={600}>
        closers (your producers)
      </Label>
      <Label x={490} y={262} anchor="middle" fill={MUTED_HEX}>
        full, and waiting
      </Label>

      <Label x={320} y={292} anchor="middle" size={14}>
        new business needs both full
      </Label>
    </Drawing>
  )
}
