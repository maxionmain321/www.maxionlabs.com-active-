'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Globe, Users, DollarSign, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { fadeInUp, staggerItem } from '@/lib/animations'

const DEAL_SIZES = [
  { value: 'under-2k', label: 'Under $2K' },
  { value: '2k-5k', label: '$2K - $5K' },
  { value: '5k-10k', label: '$5K - $10K' },
  { value: '10k-25k', label: '$10K - $25K' },
  { value: '25k-50k', label: '$25K - $50K' },
  { value: '50k-plus', label: '$50K+' },
]

interface StrategyFormProps {
  onSubmit: (url: string, icp: string, dealSize: string) => void
  error: string | null
}

export function StrategyForm({ onSubmit, error }: StrategyFormProps) {
  const [url, setUrl] = useState('')
  const [icp, setIcp] = useState('')
  const [dealSize, setDealSize] = useState('')

  const isValid = url.trim().length > 0 && icp.trim().length > 0 && dealSize.length > 0

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!isValid) return
    onSubmit(url, icp, dealSize)
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="max-w-2xl mx-auto"
      variants={fadeInUp}
    >
      <div className="rounded-2xl border border-[#1F1F1F] bg-[#0A0A0A] p-8 lg:p-10 space-y-8">
        {/* URL Input */}
        <motion.div variants={staggerItem} className="space-y-3">
          <label
            htmlFor="url"
            className="flex items-center gap-2 text-sm font-medium text-text-primary"
          >
            <Globe className="w-4 h-4 text-accent-primary" />
            Your website URL
          </label>
          <input
            id="url"
            type="text"
            placeholder="yourcompany.com"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-black border border-[#1F1F1F] text-text-primary placeholder:text-text-secondary/40 focus:outline-none focus:border-accent-primary/60 focus:ring-1 focus:ring-accent-primary/30 transition-all"
          />
        </motion.div>

        {/* ICP Input */}
        <motion.div variants={staggerItem} className="space-y-3">
          <label
            htmlFor="icp"
            className="flex items-center gap-2 text-sm font-medium text-text-primary"
          >
            <Users className="w-4 h-4 text-accent-primary" />
            Who is your ideal customer?
          </label>
          <input
            id="icp"
            type="text"
            placeholder="e.g., SaaS founders, 50-200 employees, B2B"
            value={icp}
            onChange={(e) => setIcp(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-black border border-[#1F1F1F] text-text-primary placeholder:text-text-secondary/40 focus:outline-none focus:border-accent-primary/60 focus:ring-1 focus:ring-accent-primary/30 transition-all"
          />
          <p className="text-xs text-text-secondary/60">
            Industry, company size, job titles, or any combination
          </p>
        </motion.div>

        {/* Deal Size Select */}
        <motion.div variants={staggerItem} className="space-y-3">
          <label
            htmlFor="dealSize"
            className="flex items-center gap-2 text-sm font-medium text-text-primary"
          >
            <DollarSign className="w-4 h-4 text-accent-primary" />
            Average deal size
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {DEAL_SIZES.map((size) => (
              <button
                key={size.value}
                type="button"
                onClick={() => setDealSize(size.value)}
                className={`px-4 py-2.5 rounded-xl border text-sm font-medium transition-all ${
                  dealSize === size.value
                    ? 'border-accent-primary bg-accent-primary/10 text-accent-primary shadow-[0_0_12px_rgba(94,92,230,0.15)]'
                    : 'border-[#1F1F1F] text-text-secondary hover:border-[#2F2F2F] hover:text-text-primary'
                }`}
              >
                {size.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Error */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm"
          >
            {error}
          </motion.div>
        )}

        {/* Submit */}
        <motion.div variants={staggerItem}>
          <Button
            type="submit"
            variant="shimmer"
            size="xl"
            className="w-full font-semibold text-base"
            disabled={!isValid}
          >
            <Zap className="w-5 h-5" />
            Generate My Strategy
          </Button>
          <p className="text-center text-xs text-text-secondary/50 mt-3">
            Free. No credit card. Takes about 60 seconds.
          </p>
        </motion.div>
      </div>
    </motion.form>
  )
}
