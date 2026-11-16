import type { ReactNode } from 'react'

/**
 * Shared frame for the hand-drawn inline SVG drawings on answer pages. Server-rendered, no client JavaScript.
 *
 * Why every drawing goes through this: AI crawlers and screen readers do not read pixels, so each drawing
 * carries a <title> and a <desc> inside the SVG and a visible <figcaption> that states the point in words.
 * Every number drawn in an SVG must also appear in the page text (the page test checks this).
 *
 * Palette: site ink on white, with the indigo accent and the X-date amber from components/home/InsuranceHome.
 */
export const INK_HEX = '#131A26'
export const MUTED_HEX = '#5B6472'
export const LINE_HEX = '#D8DEE6'
export const ACCENT_HEX = '#5E5CE6'
export const AMBER_HEX = '#B7410E'

/** Hand-drawn stroke: round caps, no fill. Spread onto any path, line, circle or rect. */
export const STROKE = {
  fill: 'none',
  stroke: INK_HEX,
  strokeWidth: 2.25,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
}

export const LABEL_FONT = 'ui-monospace, SFMono-Regular, Menlo, monospace'

/** Small mono label, the same family the site uses for its eyebrow labels. */
export function Label({
  x,
  y,
  children,
  size = 13,
  anchor = 'start',
  fill = INK_HEX,
  weight = 400,
}: {
  x: number
  y: number
  children: ReactNode
  size?: number
  anchor?: 'start' | 'middle' | 'end'
  fill?: string
  weight?: number
}) {
  return (
    <text x={x} y={y} fontFamily={LABEL_FONT} fontSize={size} fill={fill} textAnchor={anchor} fontWeight={weight}>
      {children}
    </text>
  )
}

/** A stick figure, head at (x, y). About 56 units tall. */
export function Person({ x, y, accent = false }: { x: number; y: number; accent?: boolean }) {
  const s = accent ? { ...STROKE, stroke: ACCENT_HEX } : STROKE
  return (
    <g>
      <circle cx={x} cy={y} r={8} {...s} />
      <path d={`M ${x} ${y + 8} L ${x + 1} ${y + 32}`} {...s} />
      <path d={`M ${x - 13} ${y + 20} L ${x + 1} ${y + 15} L ${x + 14} ${y + 21}`} {...s} />
      <path d={`M ${x - 10} ${y + 54} L ${x + 1} ${y + 32} L ${x + 12} ${y + 54}`} {...s} />
    </g>
  )
}

/** An arrow drawn as one slightly bent path with an open head. */
export function Arrow({ x1, y1, x2, y2, color = INK_HEX }: { x1: number; y1: number; x2: number; y2: number; color?: string }) {
  const dx = x2 - x1
  const dy = y2 - y1
  const len = Math.hypot(dx, dy) || 1
  const ux = dx / len
  const uy = dy / len
  const bendX = (x1 + x2) / 2 - uy * 6
  const bendY = (y1 + y2) / 2 + ux * 6
  const hx1 = x2 - ux * 11 + uy * 7
  const hy1 = y2 - uy * 11 - ux * 7
  const hx2 = x2 - ux * 11 - uy * 7
  const hy2 = y2 - uy * 11 + ux * 7
  const s = { ...STROKE, stroke: color }
  return (
    <g>
      <path d={`M ${x1} ${y1} Q ${bendX} ${bendY} ${x2} ${y2}`} {...s} />
      <path d={`M ${hx1} ${hy1} L ${x2} ${y2} L ${hx2} ${hy2}`} {...s} />
    </g>
  )
}

export type DrawingProps = {
  /** Unique on the page; prefixes the title and desc ids for aria-labelledby. */
  id: string
  /** Short name of the drawing, read by crawlers and screen readers. */
  title: string
  /** What the drawing shows, in a sentence or two, including its numbers. */
  desc: string
  /** The visible caption. States the point in words, with the same numbers as the drawing. */
  caption: string
  viewBox: string
  children: ReactNode
}

export function Drawing({ id, title, desc, caption, viewBox, children }: DrawingProps) {
  return (
    <figure data-testid="drawing" className="my-2 rounded-card border border-[#D8DEE6] bg-white p-4 md:p-6">
      <svg
        viewBox={viewBox}
        role="img"
        aria-labelledby={`${id}-title ${id}-desc`}
        className="w-full h-auto"
        xmlns="http://www.w3.org/2000/svg"
      >
        <title id={`${id}-title`}>{title}</title>
        <desc id={`${id}-desc`}>{desc}</desc>
        {children}
      </svg>
      <figcaption className="mt-3 text-sm text-[#5B6472] leading-relaxed">{caption}</figcaption>
    </figure>
  )
}
