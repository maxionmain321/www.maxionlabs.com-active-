'use client'

import { motion } from 'framer-motion'
import { fadeInUp } from '@/lib/animations'

const STATS = [
  { value: '8', label: 'active B2B clients', sub: '(+1 onboarding)' },
  { value: '152K', label: 'emails sent' },
  { value: '227', label: 'qualified leads engaged' },
]

const LAST_UPDATED = 'April 29, 2026'

export function LiveStatsStrip() {
  return (
    <motion.div
      data-testid="live-stats-strip"
      variants={fadeInUp}
      className="flex flex-col items-center gap-3 w-full max-w-3xl"
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/[0.06] px-3 py-1">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
          </span>
          <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-emerald-300/90">
            Live fulfillment
          </span>
        </span>
        <p className="text-sm text-text-secondary">
          April 2026 across our active B2B clients
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full pt-2">
        {STATS.map((s) => (
          <StatCard key={s.label} value={s.value} label={s.label} sub={s.sub} />
        ))}
      </div>

      <p className="text-[11px] text-text-secondary/50 font-mono pt-2">
        last updated {LAST_UPDATED}
      </p>
    </motion.div>
  )
}

function StatCard({ value, label, sub }: { value: string; label: string; sub?: string }) {
  return (
    <div className="group relative rounded-card overflow-hidden border border-border/60 bg-gradient-to-br from-background/60 via-background/30 to-background/10 backdrop-blur-sm px-6 py-6 flex flex-col items-center gap-1.5 text-center transition-all duration-300 hover:border-[#00d9ff]/40 hover:-translate-y-0.5">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#00d9ff]/[0.04] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <span className="relative text-4xl md:text-5xl font-bold tabular-nums leading-none bg-gradient-to-b from-white to-white/70 bg-clip-text text-transparent">
        {value}
      </span>
      <span className="relative text-xs md:text-[13px] text-text-secondary/80 mt-1">
        {label}
      </span>
      {sub && (
        <span className="relative text-[11px] text-text-secondary/50 font-mono">
          {sub}
        </span>
      )}
    </div>
  )
}

export default LiveStatsStrip
