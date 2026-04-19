'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { fadeInUp } from '@/lib/animations'

interface LiveStats {
  positive_replies_30d: number
  pipeline_value_usd: number
  active_clients: number
  meetings_booked_30d: number
  last_updated: string | null
}

const ZERO_STATS: LiveStats = {
  positive_replies_30d: 0,
  pipeline_value_usd: 0,
  active_clients: 0,
  meetings_booked_30d: 0,
  last_updated: null,
}

export function LiveStatsStrip() {
  const [stats, setStats] = useState<LiveStats>(ZERO_STATS)

  useEffect(() => {
    let cancelled = false
    fetch('/api/live-stats')
      .then(async (r) => (r.ok ? ((await r.json()) as Partial<LiveStats>) : {}))
      .then((data) => {
        if (!cancelled) setStats({ ...ZERO_STATS, ...data })
      })
      .catch(() => {
        if (!cancelled) setStats(ZERO_STATS)
      })
    return () => {
      cancelled = true
    }
  }, [])

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

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 w-full">
        <StatCard value={formatInt(stats.active_clients)} label="active clients" />
        <StatCard value={formatInt(stats.positive_replies_30d)} label="engaged leads" />
        <StatCard value={formatInt(stats.meetings_booked_30d)} label="meetings booked" />
        <StatCard value={formatUsd(stats.pipeline_value_usd)} label="annual opportunity value" />
      </div>

      {stats.last_updated && (
        <p className="text-[11px] text-text-secondary/50 font-mono">
          updated {formatAgo(stats.last_updated)} · auto-refreshed hourly
        </p>
      )}
    </motion.div>
  )
}

function StatCard({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-card border border-border/60 bg-background/40 backdrop-blur-sm px-4 py-3 flex flex-col items-start gap-0.5">
      <span className="text-2xl md:text-3xl font-bold text-text-primary tabular-nums leading-none">
        {value}
      </span>
      <span className="text-xs text-text-secondary/70">{label}</span>
    </div>
  )
}

function formatInt(n: number): string {
  return n.toLocaleString('en-US')
}

function formatUsd(n: number): string {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`
  if (n >= 1_000) return `$${Math.round(n / 1_000)}K`
  return `$${n}`
}

function formatAgo(iso: string): string {
  const diffMs = Date.now() - new Date(iso).getTime()
  const diffHrs = Math.floor(diffMs / 3_600_000)
  if (diffHrs < 1) return 'just now'
  if (diffHrs < 24) return `${diffHrs}h ago`
  return `${Math.floor(diffHrs / 24)}d ago`
}

export default LiveStatsStrip
