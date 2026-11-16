import {
  Drawing,
  Label,
  Arrow,
  STROKE,
  ACCENT_HEX,
  AMBER_HEX,
  MUTED_HEX,
} from "./Drawing";

const SCALE = 150 / 3000; // $3,000 of commission is 150 units tall

/**
 * Cost per bound account, two rows as an illustration. A $20 shared web lead that binds 1 in 40 costs $800 per bound
 * account and brings about $480 of commission on a $4,000 BOP. A $315 qualified sales meeting that binds 1 in 5 costs
 * $1,575 per bound account and brings about $3,000 of commission on a $25,000 account.
 */
function Row({
  y,
  price,
  odds,
  cost,
  commission,
  account,
  filled,
}: {
  y: number;
  price: string;
  odds: string;
  cost: string;
  commission: number;
  account: string;
  filled: boolean;
}) {
  const h = commission * SCALE;
  const barX = 470;
  const base = y + 70;
  return (
    <g>
      {/* the lead or meeting */}
      <path
        d={`M 40 ${y + 24} L 150 ${y + 25} L 149 ${y + 66} L 39 ${y + 65} Z`}
        {...STROKE}
        fill="white"
      />
      <Label x={95} y={y + 42} anchor="middle" size={12} fill={MUTED_HEX}>
        {filled ? "sales meeting" : "shared lead"}
      </Label>
      <Label x={95} y={y + 58} anchor="middle" size={13} weight={600}>
        {price}
      </Label>

      <Arrow x1={158} y1={y + 45} x2={192} y2={y + 45} />

      {/* the odds */}
      <Label x={236} y={y + 40} anchor="middle" size={12} fill={MUTED_HEX}>
        binds
      </Label>
      <Label x={236} y={y + 58} anchor="middle" size={13} weight={600}>
        {odds}
      </Label>

      <Arrow x1={280} y1={y + 45} x2={314} y2={y + 45} />

      {/* cost per bound account */}
      <path
        d={`M 320 ${y + 24} L 440 ${y + 25} L 439 ${y + 66} L 319 ${y + 65} Z`}
        {...STROKE}
        stroke={AMBER_HEX}
        fill="white"
      />
      <Label x={380} y={y + 40} anchor="middle" size={11} fill={MUTED_HEX}>
        per bound account
      </Label>
      <Label
        x={380}
        y={y + 58}
        anchor="middle"
        size={13}
        weight={600}
        fill={AMBER_HEX}
      >
        {cost}
      </Label>

      {/* what the account pays back, as a bar */}
      <path
        d={`M ${barX} ${base - h} L ${barX + 60} ${base - h + 1} L ${barX + 59} ${base} L ${barX - 1} ${base} Z`}
        {...STROKE}
        fill={filled ? ACCENT_HEX : "white"}
        fillOpacity={filled ? 0.18 : 1}
      />
      <Label x={barX + 70} y={base - h + 4} size={13} weight={600}>
        {`$${commission.toLocaleString("en-US")} a year`}
      </Label>
      <Label x={barX + 70} y={base - h + 20} size={11} fill={MUTED_HEX}>
        {account}
      </Label>
    </g>
  );
}

export function LeadsCostPerBound() {
  return (
    <Drawing
      id="cost-per-bound"
      viewBox="0 0 640 320"
      title="Cost per bound account, two rows"
      desc="Two rows as an illustration. Top row, a shared lead at $20 binds 1 in 40, so $800 per bound account, and the small bar beside it reads $480 a year, a $4,000 BOP. Bottom row, a sales meeting at $315 binds 1 in 5, so $1,575 per bound account, and the tall bar beside it reads $3,000 a year, a $25,000 account. The cost per bound account is about double on the bottom row and the commission is about 6 times."
      caption="Cost per bound account, as an illustration. A $20 shared lead binding 1 in 40 is $800 per bound account and about $480 a year on a $4,000 BOP. A $315 qualified sales meeting binding 1 in 5 is $1,575 per bound account and about $3,000 a year on a $25,000 account."
    >
      <Row
        y={0}
        price="$20"
        odds="1 in 40"
        cost="$800"
        commission={480}
        account="a $4,000 BOP"
        filled={false}
      />
      <path d="M 40 150 Q 320 153 600 149" {...STROKE} stroke="#D8DEE6" />
      <Row
        y={160}
        price="$315"
        odds="1 in 5"
        cost="$1,575"
        commission={3000}
        account="a $25,000 account"
        filled
      />
      <Label x={320} y={310} anchor="middle" size={12} fill={MUTED_HEX}>
        12% commission, gross, year one. Your numbers will differ.
      </Label>
    </Drawing>
  );
}
