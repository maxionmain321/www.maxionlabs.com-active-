'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import { staggerContainer, fadeInUp } from '@/lib/animations'
import type { StrategyResult } from '@/lib/strategy-generator'
import { StrategyForm } from './StrategyForm'
import { StrategyLoading } from './StrategyLoading'
import { StrategyResults } from './StrategyResults'

type Phase = 'form' | 'loading' | 'results'

export function StrategyGenerator() {
  const [phase, setPhase] = useState<Phase>('form')
  const [strategy, setStrategy] = useState<StrategyResult | null>(null)
  const [generationId, setGenerationId] = useState<number | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [companyUrl, setCompanyUrl] = useState('')

  const handleSubmit = async (url: string, icp: string, dealSize: string) => {
    setPhase('loading')
    setError(null)
    setCompanyUrl(url)

    const maxAttempts = 2
    for (let attempt = 0; attempt < maxAttempts; attempt++) {
      try {
        const response = await fetch('/api/generate-strategy', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ url, icp, dealSize }),
        })

        const data = await response.json()

        if (response.status === 409 && data.redirect) {
          window.location.href = data.redirect
          return
        }

        // Auto-retry once on rate limit / overload
        if ((response.status === 429 || response.status === 503) && attempt < maxAttempts - 1) {
          await new Promise((r) => setTimeout(r, 5000))
          continue
        }

        if (!response.ok) {
          throw new Error(data.error || 'Failed to generate strategy')
        }

        setStrategy(data.strategy)
        setGenerationId(data.generationId)
        setPhase('results')
        return
      } catch (err) {
        if (attempt < maxAttempts - 1) {
          await new Promise((r) => setTimeout(r, 5000))
          continue
        }
        setError(err instanceof Error ? err.message : 'Something went wrong')
        setPhase('form')
      }
    }
  }

  const handleReset = () => {
    setPhase('form')
    setStrategy(null)
    setGenerationId(null)
    setError(null)
  }

  return (
    <section className="max-w-container mx-auto px-6 lg:px-12 pt-20 lg:pt-28 pb-16 lg:pb-24">
      {/* Back to home */}
      <motion.a
        href="/"
        className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-text-primary transition-colors mb-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Maxionlabs
      </motion.a>

      <AnimatePresence mode="wait">
        {phase === 'form' && (
          <motion.div
            key="form"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, y: -20, transition: { duration: 0.3 } }}
          >
            {/* Header */}
            <motion.div
              variants={fadeInUp}
              className="text-center max-w-3xl mx-auto mb-12 lg:mb-16"
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary leading-tight tracking-tight mb-6">
                Your Custom Outbound{' '}
                <span className="text-gradient">Strategy</span>
                <br />
                in 60 Seconds
              </h1>
              <p className="text-lg md:text-xl text-text-secondary leading-relaxed">
                We scrape your website, analyze your business, and generate
                campaign playbooks, offer ideas, and actual cold email copy.
                Personalized to you.
              </p>
            </motion.div>

            <StrategyForm onSubmit={handleSubmit} error={error} />
          </motion.div>
        )}

        {phase === 'loading' && (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.2 } }}
          >
            <StrategyLoading url={companyUrl} />
          </motion.div>
        )}

        {phase === 'results' && strategy && generationId && (
          <motion.div
            key="results"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <StrategyResults
              strategy={strategy}
              companyUrl={companyUrl}
              generationId={generationId}
              onReset={handleReset}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
