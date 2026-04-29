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
          Last 30 days across our active B2B clients
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 w-full">
        {STATS.map((s) => (
          <StatCard key={s.label} value={s.value} label={s.label} sub={s.sub} />
        ))}
      </div>

      <p className="text-[11px] text-text-secondary/50 font-mono">
        last updated {LAST_UPDATED}
      </p>
    </motion.div>
  )
}

function StatCard({ value, label, sub }: { value: string; label: string; sub?: string }) {
  return (
    <div className="rounded-card border border-border/60 bg-background/40 backdrop-blur-sm px-4 py-3 flex flex-col items-start gap-0.5">
      <span className="text-2xl md:text-3xl font-bold text-text-primary tabular-nums leading-none">
        {value}
      </span>
      <span className="text-xs text-text-secondary/70">
        {label}
        {sub && <span className="text-text-secondary/50"> {sub}</span>}
      </span>
    </div>
  )
}

export default LiveStatsStrip
