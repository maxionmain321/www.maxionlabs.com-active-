'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { staggerContainer, staggerItem, viewportOptions } from '@/lib/animations'

interface MatrixCell {
  id: number
  icp: string
  hook: string
}

const matrixData: MatrixCell[] = [
  { id: 1, icp: 'CEO', hook: 'Revenue Growth' },
  { id: 2, icp: 'CEO', hook: 'Operational Efficiency' },
  { id: 3, icp: 'CEO', hook: 'Market Expansion' },
  { id: 4, icp: 'VP Sales', hook: 'Pipeline Velocity' },
  { id: 5, icp: 'VP Sales', hook: 'Team Performance' },
  { id: 6, icp: 'VP Sales', hook: 'Quota Attainment' },
  { id: 7, icp: 'Rev Ops', hook: 'Process Automation' },
  { id: 8, icp: 'Rev Ops', hook: 'Data Quality' },
  { id: 9, icp: 'Rev Ops', hook: 'Tech Stack ROI' },
]

export function Matrix() {
  return (
    <section
      data-testid="matrix-section"
      className="max-w-container mx-auto px-6 lg:px-12 py-16 lg:py-24"
    >
      {/* Section Header */}
      <motion.div
        className="text-center mb-12 lg:mb-16"
        initial="hidden"
        whileInView="visible"
        viewport={viewportOptions}
        variants={staggerItem}
      >
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary mb-4">
          9-Cell Validation Matrix
        </h2>
        <p className="text-lg text-text-secondary max-w-2xl mx-auto">
          Systematically test ICP × Angle combinations to discover your highest-converting angle according to data, not guessing.
        </p>
      </motion.div>

      {/* 3x3 Matrix Grid */}
      <motion.div
        className="flex justify-center"
        initial="hidden"
        whileInView="visible"
        viewport={viewportOptions}
        variants={staggerContainer}
      >
        <div
          data-testid="matrix-grid"
          className="grid grid-cols-3 gap-3 md:gap-4 lg:gap-6 max-w-lg lg:max-w-2xl w-full"
        >
          {matrixData.map((cell) => (
            <MatrixCellComponent key={cell.id} cell={cell} />
          ))}
        </div>
      </motion.div>

      {/* Legend */}
      <motion.div
        className="flex justify-center gap-8 mt-8 text-sm text-text-secondary"
        initial="hidden"
        whileInView="visible"
        viewport={viewportOptions}
        variants={staggerItem}
      >
        <div className="flex items-center gap-2">
          <span className="font-medium text-text-primary">Rows:</span> ICP Personas
        </div>
        <div className="flex items-center gap-2">
          <span className="font-medium text-text-primary">Columns:</span> Pain Point Hooks
        </div>
      </motion.div>
    </section>
  )
}

interface MatrixCellProps {
  cell: MatrixCell
}

function MatrixCellComponent({ cell }: MatrixCellProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isFocused, setIsFocused] = useState(false)

  const showTooltip = isHovered || isFocused

  return (
    <motion.div
      variants={staggerItem}
      className="relative"
    >
      <button
        type="button"
        data-testid={`matrix-cell-${cell.id}`}
        className="w-full aspect-square rounded-card border border-border bg-card flex items-center justify-center text-2xl md:text-3xl lg:text-4xl font-bold text-text-primary transition-all duration-200 ease-out hover:border-accent hover:shadow-[0_0_20px_rgba(94,92,230,0.3)] hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        aria-describedby={`tooltip-${cell.id}`}
      >
        {cell.id}
      </button>

      {/* Tooltip */}
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            id={`tooltip-${cell.id}`}
            role="tooltip"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.15 }}
            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-slate border border-border rounded-small text-sm text-text-primary whitespace-nowrap z-10 shadow-lg"
          >
            <span className="font-semibold text-accent">{cell.icp}</span>
            <span className="text-text-secondary"> × </span>
            <span>{cell.hook}</span>
            {/* Tooltip Arrow */}
            <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default Matrix
