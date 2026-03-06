'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Target,
  Lightbulb,
  BarChart3,
  Mail,
  Lock,
  ArrowRight,
  Download,
  Calendar,
  ChevronDown,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  fadeInUp,
  staggerContainer,
  staggerItem,
} from '@/lib/animations'
import type { StrategyResult } from '@/lib/strategy-generator'

interface StrategyResultsProps {
  strategy: StrategyResult
  companyUrl: string
  generationId: number
  onReset: () => void
}

const PLAYBOOK_COLORS = [
  { accent: '#5E5CE6', bg: 'rgba(94,92,230,0.08)', border: 'rgba(94,92,230,0.3)', text: '#5E5CE6' },
  { accent: '#00d9ff', bg: 'rgba(0,217,255,0.08)', border: 'rgba(0,217,255,0.3)', text: '#00d9ff' },
  { accent: '#34d399', bg: 'rgba(52,211,153,0.08)', border: 'rgba(52,211,153,0.3)', text: '#34d399' },
]

function generatePrintHtml(strategy: StrategyResult, domain: string): string {
  const playbooks = strategy.campaign_playbooks
    .map(
      (p, i) => `
    <div class="playbook">
      <h3><span class="num">${String(i + 1).padStart(2, '0')}</span> ${p.name} <span class="badge">${p.type}</span></h3>
      <div class="meta-grid">
        <div><span class="meta-label">Who:</span> ${p.target_who}</div>
        <div><span class="meta-label">Why:</span> ${p.target_why}</div>
        <div><span class="meta-label">Sequence:</span> ${p.sequence_structure}</div>
        <div><span class="meta-label">Expected:</span> ${p.expected_results}</div>
      </div>
      ${
        p.email_1
          ? `<div class="email-box">
        <div class="email-header">Email 1 - ${p.email_1.framework}</div>
        <div class="email-subject"><span class="meta-label">Subject:</span> ${p.email_1.subject_line}</div>
        <div class="email-body">${p.email_1.body}</div>
        ${p.email_1.personalization_slot ? `<div class="personalize">Personalize: ${p.email_1.personalization_slot}</div>` : ''}
      </div>`
          : ''
      }
      ${
        p.follow_ups?.length
          ? `<div class="follow-ups">${p.follow_ups.map((f) => `<div><span class="meta-label">${f.step}:</span> ${f.angle}</div>`).join('')}</div>`
          : ''
      }
    </div>`
    )
    .join('')

  const offers = strategy.offer_ideas
    .map(
      (o, i) => `
    <div class="offer">
      <h3><span class="num">${String(i + 1).padStart(2, '0')}</span> ${o.name} <span class="badge cyan">${o.type}</span></h3>
      <p>${o.description}</p>
      ${o.cold_email_cta ? `<div class="cta-box">"${o.cold_email_cta}"</div>` : ''}
    </div>`
    )
    .join('')

  const titles = strategy.market_estimate.job_titles
    .map((t) => `<span class="pill">${t}</span>`)
    .join(' ')

  return `<!DOCTYPE html>
<html><head><meta charset="utf-8"><title>Outbound Strategy - ${domain}</title>
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; color: #1a1a1a !important; }
  body { font-family: 'Segoe UI', system-ui, -apple-system, sans-serif; color: #1a1a1a !important; background: #ffffff !important; padding: 40px; max-width: 900px; margin: 0 auto; line-height: 1.6; }
  h1 { font-size: 28px; margin-bottom: 8px; color: #111111 !important; font-weight: 700; }
  h2 { font-size: 22px; margin: 40px 0 20px; padding-bottom: 10px; border-bottom: 2px solid #e5e5e5; color: #111111 !important; font-weight: 700; }
  h3 { font-size: 17px; margin-bottom: 12px; color: #111111 !important; font-weight: 600; }
  .subtitle { color: #5E5CE6 !important; font-size: 14px; margin-bottom: 4px; font-weight: 600; }
  .summary { color: #444444 !important; margin-bottom: 30px; font-size: 15px; }
  .num { color: #999999 !important; font-size: 14px; margin-right: 8px; }
  .badge { display: inline-block; background: #f0f0f0; color: #555555 !important; font-size: 11px; padding: 2px 10px; border-radius: 12px; margin-left: 8px; font-family: monospace; }
  .badge.cyan { background: #e0f7fa; color: #0097a7 !important; }
  .meta-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin: 12px 0; font-size: 14px; }
  .meta-grid div { background: #f8f8f8; padding: 10px 14px; border-radius: 8px; color: #333333 !important; }
  .meta-label { font-weight: 700; color: #111111 !important; }
  .email-box { background: #f9f9f9; border: 1px solid #e0e0e0; border-radius: 10px; padding: 16px; margin: 12px 0; }
  .email-header { font-size: 12px; font-weight: 700; text-transform: uppercase; color: #5E5CE6 !important; margin-bottom: 10px; letter-spacing: 0.5px; }
  .email-subject { color: #111111 !important; font-size: 14px; margin-bottom: 8px; }
  .email-body { font-family: monospace; font-size: 13px; white-space: pre-line; margin: 10px 0; color: #333333 !important; }
  .personalize { font-size: 12px; color: #7c4dff !important; background: #f3e8ff; padding: 8px 12px; border-radius: 6px; margin-top: 10px; }
  .follow-ups { font-size: 13px; color: #555555 !important; margin-top: 10px; }
  .follow-ups div { margin-bottom: 4px; color: #555555 !important; }
  .playbook, .offer { margin-bottom: 30px; padding-bottom: 24px; border-bottom: 1px solid #eee; }
  .playbook:last-child, .offer:last-child { border-bottom: none; }
  .cta-box { background: #e0f7fa; border-radius: 8px; padding: 12px 16px; font-family: monospace; font-size: 13px; font-style: italic; margin-top: 10px; color: #0097a7 !important; }
  .market { display: flex; gap: 40px; align-items: flex-start; }
  .market-left { flex-shrink: 0; }
  .market-left p { font-size: 20px; font-weight: 700; color: #111111 !important; }
  .label { font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: #888888 !important; margin-bottom: 6px; font-weight: 600; }
  .pill { display: inline-block; background: #e8f5e9; color: #2e7d32 !important; padding: 4px 14px; border-radius: 20px; font-size: 13px; margin: 3px 4px 3px 0; }
  .footer { margin-top: 50px; padding-top: 20px; border-top: 2px solid #e5e5e5; text-align: center; color: #999999 !important; font-size: 12px; }
  @media print { body { padding: 20px; } }
</style></head><body>
  <div class="subtitle">Outbound Strategy for ${domain}</div>
  <h1>Your Personalized Strategy</h1>
  <p class="summary">${strategy.company_summary}</p>

  <h2>Campaign Playbooks</h2>
  ${playbooks}

  <h2>Offer Ideas</h2>
  ${offers}

  <h2>Market Estimate</h2>
  <div class="market">
    <div class="market-left">
      <div class="label">Companies in ICP</div>
      <p>${strategy.market_estimate.estimated_companies}</p>
    </div>
    <div>
      <div class="label">Job Titles</div>
      <div>${titles}</div>
    </div>
  </div>

  <div class="footer">Generated by Maxionlabs - maxionlabs.com</div>
</body></html>`
}

export function StrategyResults({
  strategy,
  companyUrl,
  generationId,
  onReset,
}: StrategyResultsProps) {
  const [unlocked, setUnlocked] = useState(false)
  const [email, setEmail] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [unlockError, setUnlockError] = useState<string | null>(null)
  const [expandedPlaybook, setExpandedPlaybook] = useState(0)
  const [downloading, setDownloading] = useState(false)
  const printRef = useRef<HTMLDivElement>(null)

  const domain = companyUrl.replace(/^https?:\/\//, '').replace(/\/$/, '')

  const handleUnlock = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim() || !email.includes('@')) return

    setSubmitting(true)
    setUnlockError(null)

    try {
      const response = await fetch('/api/unlock-strategy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, generationId }),
      })

      const data = await response.json()

      if (response.status === 409 && data.redirect) {
        window.location.href = data.redirect
        return
      }

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong')
      }

      setUnlocked(true)
    } catch (err) {
      setUnlockError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setSubmitting(false)
    }
  }

  const handleDownload = async () => {
    setDownloading(true)
    try {
      const html2canvas = (await import('html2canvas')).default
      const { jsPDF } = await import('jspdf')

      // Create a temporary container with print-friendly content
      const container = document.createElement('div')
      container.innerHTML = generatePrintHtml(strategy, domain)
      container.style.position = 'absolute'
      container.style.left = '-9999px'
      container.style.top = '0'
      container.style.width = '900px'
      container.style.background = 'white'
      document.body.appendChild(container)

      const canvas = await html2canvas(container, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#ffffff',
        width: 900,
      })

      document.body.removeChild(container)

      const imgData = canvas.toDataURL('image/png')
      const pdf = new jsPDF('p', 'mm', 'a4')
      const pdfWidth = pdf.internal.pageSize.getWidth()
      const pdfHeight = pdf.internal.pageSize.getHeight()
      const imgWidth = pdfWidth
      const imgHeight = (canvas.height * pdfWidth) / canvas.width

      let heightLeft = imgHeight
      let position = 0

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
      heightLeft -= pdfHeight

      while (heightLeft > 0) {
        position = -(imgHeight - heightLeft)
        pdf.addPage()
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
        heightLeft -= pdfHeight
      }

      pdf.save(`strategy-${domain.replace(/[^a-z0-9]/gi, '-')}.pdf`)
    } catch {
      // Fallback to print dialog
      const html = generatePrintHtml(strategy, domain)
      const printWindow = window.open('', '_blank')
      if (!printWindow) return
      printWindow.document.write(html)
      printWindow.document.close()
      printWindow.onload = () => printWindow.print()
    } finally {
      setDownloading(false)
    }
  }

  const togglePlaybook = (index: number) => {
    setExpandedPlaybook(expandedPlaybook === index ? -1 : index)
  }

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
    >
      {/* Header */}
      <motion.div
        variants={fadeInUp}
        className="text-center max-w-3xl mx-auto mb-14"
      >
        <p className="text-sm font-mono mb-3 text-[#00d9ff]">
          Strategy generated for <span className="text-accent-primary font-semibold text-base">{domain}</span>
        </p>
        <h1 className="text-3xl md:text-5xl font-bold mb-5 bg-gradient-to-r from-white via-white to-accent-primary bg-clip-text text-transparent">
          Your Outbound Strategy
        </h1>
        <p className="text-text-secondary/90 text-lg leading-relaxed">{strategy.company_summary}</p>
      </motion.div>

      {/* Results container with blur gate */}
      <div className="relative">
        {/* Blur overlay + email gate */}
        {!unlocked && (
          <motion.div
            className="absolute inset-0 z-20 flex items-start justify-center pt-32 md:pt-44"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <div className="w-full max-w-md mx-4">
              <motion.div
                className="rounded-2xl border border-accent-primary/30 bg-[#0A0A0A]/95 backdrop-blur-sm p-8 shadow-[0_0_40px_rgba(94,92,230,0.15)]"
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 0.8, duration: 0.5 }}
              >
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-accent-primary/10 border border-accent-primary/20 mx-auto mb-5">
                  <Lock className="w-5 h-5 text-accent-primary" />
                </div>
                <h3 className="text-xl font-bold text-text-primary text-center mb-2">
                  Your strategy is ready
                </h3>
                <p className="text-sm text-text-secondary text-center mb-6">
                  Enter your email to unlock your personalized campaign
                  playbooks, offer ideas, and cold email copy. We will also send a copy to your inbox.
                </p>
                {unlockError && (
                  <div className="px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm mb-4">
                    {unlockError}
                  </div>
                )}
                <form onSubmit={handleUnlock} className="space-y-3">
                  <input
                    type="email"
                    placeholder="you@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-black border border-[#1F1F1F] text-text-primary placeholder:text-text-secondary/40 focus:outline-none focus:border-accent-primary/60 focus:ring-1 focus:ring-accent-primary/30 transition-all"
                    required
                  />
                  <Button
                    type="submit"
                    variant="shimmer"
                    size="lg"
                    className="w-full font-semibold"
                    disabled={submitting}
                  >
                    {submitting ? 'Unlocking...' : 'Unlock My Strategy'}
                    {!submitting && <ArrowRight className="w-4 h-4" />}
                  </Button>
                </form>
                <p className="text-xs text-text-secondary/40 text-center mt-3">
                  No spam. Just your strategy.
                </p>
              </motion.div>
            </div>
          </motion.div>
        )}

        {/* Results - blurred when locked */}
        <div
          className={`transition-all duration-700 space-y-10 ${
            !unlocked
              ? 'blur-[8px] select-none pointer-events-none'
              : 'blur-0'
          }`}
        >
          {/* Section 1: Campaign Playbooks - Accordion */}
          <motion.div variants={staggerItem}>
            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-accent-primary/10 border border-accent-primary/20">
                <Target className="w-5 h-5 text-accent-primary" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-text-primary">
                Campaign Playbooks
              </h2>
            </div>
            <div className="space-y-4">
              {strategy.campaign_playbooks.map((playbook, i) => {
                const color = PLAYBOOK_COLORS[i % PLAYBOOK_COLORS.length]
                const isExpanded = expandedPlaybook === i

                return (
                  <div
                    key={i}
                    className="rounded-2xl border overflow-hidden transition-colors"
                    style={{
                      borderColor: isExpanded ? color.border : 'rgba(31,31,31,1)',
                    }}
                  >
                    {/* Clickable header */}
                    <button
                      onClick={() => togglePlaybook(i)}
                      className="w-full text-left px-6 py-5 flex items-center gap-4 transition-colors"
                      style={{
                        background: isExpanded ? color.bg : 'rgba(10,10,10,0.8)',
                        borderBottom: isExpanded ? `1px solid ${color.border}` : 'none',
                      }}
                    >
                      <span
                        className="text-3xl font-black leading-none select-none shrink-0 opacity-30"
                        style={{ color: color.accent }}
                      >
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 flex-wrap">
                          <h3 className="font-bold text-text-primary text-lg truncate">
                            {playbook.name}
                          </h3>
                          <span
                            className="text-[11px] font-mono px-3 py-1 rounded-full font-medium shrink-0"
                            style={{
                              background: `${color.accent}22`,
                              color: color.text,
                              border: `1px solid ${color.accent}44`,
                            }}
                          >
                            {playbook.type}
                          </span>
                        </div>
                        <p className="text-sm text-text-secondary/70 mt-1 truncate">
                          {playbook.target_who}
                        </p>
                      </div>
                      <motion.div
                        animate={{ rotate: isExpanded ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                        className="shrink-0"
                      >
                        <ChevronDown className="w-5 h-5 text-text-secondary/50" />
                      </motion.div>
                    </button>

                    {/* Expandable content */}
                    <AnimatePresence initial={false}>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: 'easeInOut' }}
                          className="overflow-hidden"
                        >
                          <div className="p-6 lg:p-8 bg-gradient-to-b from-[#0A0A0A] to-black space-y-6">
                            {/* Meta grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                              <div className="rounded-xl bg-black/60 p-4 border-l-2" style={{ borderLeftColor: `${color.accent}88` }}>
                                <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: color.text }}>Who</span>
                                <p className="text-text-secondary/80 mt-1.5 leading-relaxed">{playbook.target_who}</p>
                              </div>
                              <div className="rounded-xl bg-black/60 p-4 border-l-2" style={{ borderLeftColor: `${color.accent}88` }}>
                                <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: color.text }}>Why</span>
                                <p className="text-text-secondary/80 mt-1.5 leading-relaxed">{playbook.target_why}</p>
                              </div>
                              <div className="rounded-xl bg-black/60 p-4 border-l-2" style={{ borderLeftColor: `${color.accent}88` }}>
                                <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: color.text }}>Sequence</span>
                                <p className="text-text-secondary/80 mt-1.5 leading-relaxed">{playbook.sequence_structure}</p>
                              </div>
                              <div className="rounded-xl bg-black/60 p-4 border-l-2" style={{ borderLeftColor: `${color.accent}88` }}>
                                <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: color.text }}>Expected</span>
                                <p className="text-text-secondary/80 mt-1.5 leading-relaxed">{playbook.expected_results}</p>
                              </div>
                            </div>

                            {/* Email preview */}
                            {playbook.email_1 && (
                              <div className="rounded-xl border overflow-hidden" style={{ borderColor: `${color.accent}25` }}>
                                <div
                                  className="flex items-center gap-2 px-5 py-3 border-b"
                                  style={{
                                    background: `${color.accent}0d`,
                                    borderBottomColor: `${color.accent}15`,
                                  }}
                                >
                                  <Mail className="w-3.5 h-3.5" style={{ color: color.text }} />
                                  <span className="text-xs font-bold text-text-primary uppercase tracking-widest">Email 1</span>
                                  <span
                                    className="text-[10px] font-mono px-2 py-0.5 rounded-full ml-auto"
                                    style={{
                                      background: `${color.accent}1a`,
                                      color: color.text,
                                    }}
                                  >
                                    {playbook.email_1.framework}
                                  </span>
                                </div>
                                <div className="p-5 bg-black space-y-3">
                                  <div>
                                    <p className="text-[10px] text-text-secondary/50 uppercase tracking-widest mb-1">Subject</p>
                                    <p className="text-sm font-medium text-text-primary font-mono">
                                      {playbook.email_1.subject_line}
                                    </p>
                                  </div>
                                  <div>
                                    <p className="text-[10px] text-text-secondary/50 uppercase tracking-widest mb-1">Body</p>
                                    <p className="text-sm text-text-secondary/80 leading-relaxed whitespace-pre-line font-mono">
                                      {playbook.email_1.body}
                                    </p>
                                  </div>
                                  {playbook.email_1.personalization_slot && (
                                    <div
                                      className="rounded-lg px-4 py-2.5"
                                      style={{
                                        background: `${color.accent}0d`,
                                        border: `1px solid ${color.accent}20`,
                                      }}
                                    >
                                      <p className="text-xs" style={{ color: `${color.text}cc` }}>
                                        <span className="font-bold">Personalize:</span>{' '}
                                        {playbook.email_1.personalization_slot}
                                      </p>
                                    </div>
                                  )}
                                </div>
                              </div>
                            )}

                            {/* Follow-ups */}
                            {playbook.follow_ups && playbook.follow_ups.length > 0 && (
                              <div className="space-y-2 pl-1">
                                {playbook.follow_ups.map((followUp, j) => (
                                  <div key={j} className="flex items-start gap-3 text-sm">
                                    <span
                                      className="text-xs font-mono whitespace-nowrap mt-0.5 min-w-[110px]"
                                      style={{ color: `${color.text}88` }}
                                    >
                                      {followUp.step}
                                    </span>
                                    <p className="text-text-secondary/80">{followUp.angle}</p>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )
              })}
            </div>
          </motion.div>

          {/* Section 2: Offer Ideas */}
          <motion.div
            variants={staggerItem}
            className="rounded-2xl border border-[#1F1F1F] border-t-2 border-t-[#00d9ff]/50 bg-gradient-to-b from-[#0A0A0A] to-black p-6 lg:p-10"
          >
            <div className="flex items-center gap-3 mb-10">
              <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-[#00d9ff]/10 border border-[#00d9ff]/20">
                <Lightbulb className="w-5 h-5 text-[#00d9ff]" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-text-primary">
                Offer Ideas
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {strategy.offer_ideas.map((offer, i) => (
                <div
                  key={i}
                  className="rounded-xl bg-black/60 border border-[#1F1F1F] p-6 space-y-3"
                >
                  <div className="flex items-start gap-3">
                    <span className="text-4xl font-black text-[#00d9ff]/10 leading-none select-none shrink-0">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div>
                      <h3 className="font-bold text-text-primary text-lg mb-1">
                        {offer.name}
                      </h3>
                      <span className="text-[11px] font-mono px-3 py-1 rounded-full bg-[#00d9ff]/15 text-[#00d9ff] border border-[#00d9ff]/25 font-medium">
                        {offer.type}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-text-secondary/80 leading-relaxed">
                    {offer.description}
                  </p>
                  {offer.cold_email_cta && (
                    <div className="rounded-lg bg-[#00d9ff]/5 border border-[#00d9ff]/15 px-4 py-3">
                      <p className="text-[10px] text-[#00d9ff] uppercase tracking-widest font-bold mb-1.5">Use in cold email</p>
                      <p className="text-sm text-text-primary italic font-mono leading-relaxed">
                        &ldquo;{offer.cold_email_cta}&rdquo;
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Section 3: Market Estimate */}
          <motion.div
            variants={staggerItem}
            className="rounded-2xl border border-[#1F1F1F] border-t-2 border-t-green-500/50 bg-gradient-to-b from-[#0A0A0A] to-black p-6 lg:p-10"
          >
            <div className="flex items-center gap-3 mb-10">
              <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-green-500/10 border border-green-500/20">
                <BarChart3 className="w-5 h-5 text-green-400" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-text-primary">
                Market Estimate
              </h2>
            </div>
            <div className="flex flex-col md:flex-row md:items-start gap-10">
              <div className="md:max-w-[55%]">
                <p className="text-[10px] text-green-400 uppercase tracking-widest font-bold mb-3">Companies in your ICP</p>
                <p className="text-xl md:text-2xl font-bold text-text-primary leading-snug">
                  {strategy.market_estimate.estimated_companies}
                </p>
              </div>
              <div>
                <p className="text-[10px] text-green-400 uppercase tracking-widest font-bold mb-3">Job titles to reach out to</p>
                <div className="flex flex-wrap gap-2">
                  {strategy.market_estimate.job_titles.map((title, i) => (
                    <span
                      key={i}
                      className="px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 text-sm text-green-400 font-medium"
                    >
                      {title}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* CTA Section - only show when unlocked */}
        {unlocked && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="rounded-2xl border border-accent-primary/20 bg-gradient-to-b from-accent-primary/5 to-transparent p-8 lg:p-12 text-center mt-10"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-text-primary mb-3">
              Want us to execute this strategy?
            </h2>
            <p className="text-text-secondary mb-2 max-w-lg mx-auto">
              Book a free 15-minute growth mapping call. We will walk through
              the numbers for your business and show you exactly what to expect.
            </p>
            <p className="text-sm text-text-secondary/60 mb-8">
              We also sent a copy of this strategy to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="https://cal.com/maxionlabs/growth-mapping"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="shimmer" size="xl" className="font-semibold">
                  <Calendar className="w-5 h-5" />
                  Book Growth Mapping Call
                </Button>
              </a>
              <Button
                variant="outline"
                size="lg"
                onClick={handleDownload}
                className="text-text-secondary"
                disabled={downloading}
              >
                {downloading ? (
                  <>
                    <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Generating PDF...
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4" />
                    Download Strategy
                  </>
                )}
              </Button>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}
