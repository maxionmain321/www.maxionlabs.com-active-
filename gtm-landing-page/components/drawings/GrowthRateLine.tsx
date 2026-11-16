import { Drawing, Label, STROKE, ACCENT_HEX, AMBER_HEX, MUTED_HEX, LINE_HEX } from './Drawing'

const X0 = 70
const X1 = 590
const BASE = 220
const TOP = 60

/** x for a quarter index, 0 = Q1 2023 through 11 = Q4 2025. */
const qx = (q: number) => X0 + ((X1 - X0) * q) / 11

/**
 * Reagan's organic growth line, 11.2% in Q2 2023 down to 7.1% in Q4 2025, over a flat dashed line for new accounts.
 * The growth line is the sourced number; the flat new-accounts line is the picture of an agency rate carried.
 */
export function GrowthRateLine() {
  // 11.2% sits near the top, 7.1% about two thirds of the way down.
  const yPeak = TOP + 10
  const yEnd = BASE - 56
  return (
    <Drawing
      id="growth-rate-line"
      viewBox="0 0 640 300"
      title="Rate did the growing, 2023 to 2025"
      desc="A chart across 2023, 2024 and 2025. One line, labelled organic growth, starts at 11.2% in the second quarter of 2023 and slopes down to 7.1% in the fourth quarter of 2025. Under it a flat dashed line, labelled your new accounts, does not move the whole time."
      caption="Rate did the growing. Organic growth peaked at 11.2% in the second quarter of 2023 and was down to 7.1% by the fourth quarter of 2025, Reagan's survey. The dashed line is your new accounts, and in this picture it never moves."
    >
      {/* axes */}
      <path d={`M ${X0 - 10} ${BASE} Q 330 ${BASE + 3} ${X1 + 14} ${BASE - 1}`} {...STROKE} />
      <path d={`M ${X0} ${BASE + 6} L ${X0 + 1} ${TOP - 12}`} {...STROKE} stroke={LINE_HEX} />

      {/* year ticks */}
      {[
        { q: 1.5, label: '2023' },
        { q: 5.5, label: '2024' },
        { q: 9.5, label: '2025' },
      ].map((t) => (
        <g key={t.label}>
          <path d={`M ${qx(t.q)} ${BASE - 5} L ${qx(t.q) + 0.5} ${BASE + 6}`} {...STROKE} stroke={MUTED_HEX} />
          <Label x={qx(t.q)} y={BASE + 26} anchor="middle" fill={MUTED_HEX}>
            {t.label}
          </Label>
        </g>
      ))}

      {/* organic growth line: Q2 2023 peak down to Q4 2025 */}
      <path
        d={`M ${qx(0)} ${yPeak + 14} Q ${qx(0.6)} ${yPeak - 4} ${qx(1)} ${yPeak} C ${qx(4)} ${yPeak + 10} ${qx(7)} ${yEnd - 30} ${qx(11)} ${yEnd}`}
        {...STROKE}
        stroke={ACCENT_HEX}
      />
      <circle cx={qx(1)} cy={yPeak} r={6} fill={ACCENT_HEX} stroke="none" />
      <Label x={qx(1)} y={yPeak - 16} anchor="middle" size={14} weight={600} fill={ACCENT_HEX}>
        11.2%
      </Label>
      <circle cx={qx(11)} cy={yEnd} r={6} fill={ACCENT_HEX} stroke="none" />
      <Label x={qx(11)} y={yEnd - 16} anchor="middle" size={14} weight={600} fill={ACCENT_HEX}>
        7.1%
      </Label>
      <Label x={qx(5)} y={yPeak + 44} anchor="middle" size={12} fill={ACCENT_HEX}>
        organic growth, mostly rate
      </Label>

      {/* new accounts, flat and dashed */}
      <path d={`M ${qx(0)} ${BASE - 22} Q ${qx(5.5)} ${BASE - 25} ${qx(11)} ${BASE - 23}`} {...STROKE} stroke={AMBER_HEX} strokeDasharray="8 7" />
      <Label x={qx(5.5)} y={BASE - 34} anchor="middle" size={12} weight={600} fill={AMBER_HEX}>
        your new accounts
      </Label>

      <Label x={X0} y={284} size={13} fill={MUTED_HEX}>
        when the top line grew and this one did not, rate did it
      </Label>
    </Drawing>
  )
}
