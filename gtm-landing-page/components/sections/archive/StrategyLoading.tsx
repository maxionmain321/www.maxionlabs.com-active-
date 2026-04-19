'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const STEPS = [
  { label: 'Fetching your website', icon: '01' },
  { label: 'Analyzing your business model', icon: '02' },
  { label: 'Researching your market', icon: '03' },
  { label: 'Building campaign playbooks', icon: '04' },
  { label: 'Writing custom email copy', icon: '05' },
  { label: 'Finalizing your strategy', icon: '06' },
]

interface StrategyLoadingProps {
  url: string
}

export function StrategyLoading({ url }: StrategyLoadingProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [progress, setProgress] = useState(0)

  // Smooth progress bar - estimates ~55 seconds total, creeps up each second
  useEffect(() => {
    const ESTIMATED_SECONDS = 55
    let elapsed = 0
    const interval = setInterval(() => {
      elapsed += 1
      // Ease out: fast at start, slows near end, caps at 95
      const raw = (elapsed / ESTIMATED_SECONDS) * 100
      const eased = Math.min(95, raw * (2 - raw / 100))
      setProgress(Math.round(eased))
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const timings = [2000, 5000, 10000, 18000, 28000, 40000]
    const timeouts: NodeJS.Timeout[] = []

    timings.forEach((time, index) => {
      if (index > 0) {
        timeouts.push(
          setTimeout(() => setCurrentStep(index), time)
        )
      }
    })

    return () => timeouts.forEach(clearTimeout)
  }, [])

  // Extract domain for display
  const domain = url.replace(/^https?:\/\//, '').replace(/\/$/, '')

  return (
    <div className="max-w-2xl mx-auto text-center">
      {/* Animated orb */}
      <div className="relative w-32 h-32 mx-auto mb-12">
        <motion.div
          className="absolute inset-0 rounded-full bg-accent-primary/20"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute inset-3 rounded-full bg-accent-primary/30"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 0.3,
          }}
        />
        <motion.div
          className="absolute inset-6 rounded-full bg-accent-primary/50 shadow-[0_0_40px_rgba(94,92,230,0.4)]"
          animate={{
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      {/* Domain being analyzed */}
      <motion.p
        className="text-sm text-text-secondary/60 mb-2 font-mono"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        {domain}
      </motion.p>

      {/* Current step text */}
      <AnimatePresence mode="wait">
        <motion.h2
          key={currentStep}
          className="text-2xl md:text-3xl font-bold text-text-primary mb-12"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.4 }}
        >
          {STEPS[currentStep].label}
        </motion.h2>
      </AnimatePresence>

      {/* Step indicators */}
      <div className="space-y-3 max-w-sm mx-auto">
        {STEPS.map((step, index) => (
          <motion.div
            key={index}
            className={`flex items-center gap-4 px-4 py-2.5 rounded-xl transition-all duration-500 ${
              index < currentStep
                ? 'opacity-40'
                : index === currentStep
                ? 'bg-accent-primary/5 border border-accent-primary/20'
                : 'opacity-20'
            }`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: index <= currentStep ? 1 : 0.2, x: 0 }}
            transition={{ delay: index * 0.1 + 0.3 }}
          >
            <span
              className={`text-xs font-mono w-6 ${
                index < currentStep
                  ? 'text-[#00d9ff]'
                  : index === currentStep
                  ? 'text-accent-primary'
                  : 'text-text-secondary/30'
              }`}
            >
              {index < currentStep ? '\u2713' : step.icon}
            </span>
            <span
              className={`text-sm ${
                index === currentStep
                  ? 'text-text-primary font-medium'
                  : 'text-text-secondary/60'
              }`}
            >
              {step.label}
            </span>
            {index === currentStep && (
              <motion.div
                className="ml-auto w-4 h-4 rounded-full border-2 border-accent-primary border-t-transparent"
                animate={{ rotate: 360 }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              />
            )}
          </motion.div>
        ))}
      </div>

      {/* Progress bar */}
      <div className="mt-8 max-w-sm mx-auto">
        <div className="flex justify-between text-xs mb-2">
          <span className="text-text-secondary">Estimated progress</span>
          <span className="text-white font-mono font-medium">{progress}%</span>
        </div>
        <div className="h-2 bg-[#1F1F1F] rounded-full overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-[#5E5CE6] via-[#7B78FF] to-[#00d9ff] shadow-[0_0_12px_rgba(94,92,230,0.6),0_0_24px_rgba(0,217,255,0.3)]"
            style={{ width: `${progress}%`, transition: 'width 1s ease-out' }}
          />
        </div>
      </div>
    </div>
  )
}
