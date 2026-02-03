'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Mail, MessageSquare, TrendingUp, DollarSign } from 'lucide-react'
import { fadeInUp, staggerContainer, staggerItem, viewportOptions } from '@/lib/animations'

/**
 * Case Study Section Component
 *
 * Two-column layout showcasing Inframail case study with dashboard screenshot,
 * results bullet points, testimonial, and optional YouTube video embed.
 */
export function CaseStudy() {
  return (
    <section
      id="case-study"
      data-testid="case-study-section"
      className="max-w-container mx-auto px-6 lg:px-12 py-20 lg:py-32 scroll-mt-20"
    >
      <motion.div
        className="flex flex-col gap-12"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOptions}
      >
        {/* Headline */}
        <motion.h2
          className="text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary text-center leading-tight"
          variants={fadeInUp}
        >
          How We Added{' '}
          <span className="text-[#00d9ff]">Thousands in MRR</span> in 4 Months
        </motion.h2>

        {/* Two-Column Grid: Dashboard + Case Study Text */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center"
          variants={staggerItem}
        >
          {/* Left: Dashboard Screenshot */}
          <DashboardScreenshot />

          {/* Right: Case Study Text */}
          <CaseStudyText />
        </motion.div>

        {/* Full-Width Testimonial */}
        <Testimonial />

        {/* Optional: YouTube Video Embed */}
        <YouTubeEmbed />
      </motion.div>
    </section>
  )
}

/**
 * Dashboard Screenshot Component
 *
 * Displays a placeholder or actual dashboard screenshot showing campaign metrics.
 */
function DashboardScreenshot() {
  return (
    <motion.div variants={fadeInUp} className="relative">
      <div className="relative aspect-[4/3] w-full rounded-card border border-border bg-background/50 backdrop-blur-sm overflow-hidden">
        <Image
          src="/images/Kidous dashboard metrics 02.02.2026.png"
          alt="Campaign Dashboard showing 464,000+ emails sent and 616+ engaged leads"
          fill
          className="object-contain"
        />
      </div>
    </motion.div>
  )
}

/**
 * Case Study Text Component
 *
 * Numbers-first layout with huge green stats and icons.
 */
function CaseStudyText() {
  return (
    <motion.div variants={fadeInUp} className="flex flex-col gap-8">
      <p className="text-base md:text-lg text-text-secondary leading-relaxed">
        Our client, a B2B SaaS in the email marketing space, needed to reach
        thousands of email marketers and agencies fast.
      </p>

      <p className="text-sm font-semibold text-text-primary">In 4 months:</p>

      {/* Numbers Grid */}
      <div className="flex flex-col gap-6">
        {/* 464K Emails */}
        <div className="flex items-start gap-4">
          <Mail className="w-6 h-6 text-accent-primary flex-shrink-0 mt-2" />
          <div>
            <p className="text-4xl md:text-5xl font-bold text-accent-primary">464,000+</p>
            <p className="text-sm md:text-base text-text-secondary mt-1">cold emails sent</p>
          </div>
        </div>

        {/* 616+ Engaged Leads */}
        <div className="flex items-start gap-4">
          <MessageSquare className="w-6 h-6 text-accent-primary flex-shrink-0 mt-2" />
          <div>
            <p className="text-4xl md:text-5xl font-bold text-accent-primary">616+</p>
            <p className="text-sm md:text-base text-text-secondary mt-1">engaged leads</p>
          </div>
        </div>

        {/* Direct Sign-ups */}
        <div className="flex items-start gap-4">
          <TrendingUp className="w-6 h-6 text-accent-primary flex-shrink-0 mt-2" />
          <div>
            <p className="text-4xl md:text-5xl font-bold text-accent-primary">50+</p>
            <p className="text-sm md:text-base text-text-secondary mt-1">clients signed directly via cold email</p>
          </div>
        </div>

        {/* Thousands in MRR */}
        <div className="flex items-start gap-4">
          <DollarSign className="w-6 h-6 text-accent-primary flex-shrink-0 mt-2" />
          <div>
            <p className="text-4xl md:text-5xl font-bold text-accent-primary">Thousands in MRR</p>
            <p className="text-sm md:text-base text-text-secondary mt-1">added through cold email outreach</p>
          </div>
        </div>
      </div>

      {/* Highlighted Key Message */}
      <div className="relative px-6 py-4 rounded-xl bg-accent-primary/10 border-l-4 border-accent-primary">
        <p className="text-base md:text-lg text-text-primary font-bold leading-relaxed">
          Beyond direct sign-ups, cold email created massive brand awareness. Most clients who came through other channels had already seen our emails.
        </p>
      </div>
    </motion.div>
  )
}

/**
 * Testimonial Component
 *
 * Full-width testimonial quote from Kidous Mahteme with attribution.
 */
function Testimonial() {
  return (
    <motion.div
      variants={fadeInUp}
      className="max-w-4xl mx-auto text-center space-y-6 py-8"
    >
      <blockquote className="text-xl md:text-2xl text-text-primary italic leading-relaxed">
        &ldquo;Max&apos;s system is incredibly thorough. The way he structures campaigns,
        validates messaging, and manages the technical infrastructure is at an
        agency level.&rdquo;
      </blockquote>
      <div className="flex flex-col items-center gap-2">
        <p className="text-base font-semibold text-text-primary">Kidous Mahteme</p>
        <p className="text-sm text-text-secondary">Co-founder @ Inframail</p>
      </div>
    </motion.div>
  )
}

/**
 * YouTube Embed Component
 *
 * Lazy-loaded YouTube testimonial video embed.
 */
function YouTubeEmbed() {
  return (
    <motion.div
      variants={fadeInUp}
      className="max-w-3xl mx-auto w-full"
    >
      <div className="space-y-4">
        <p className="text-center text-base text-text-secondary">
          Watch the full testimonial:
        </p>
        <div className="relative aspect-video w-full rounded-card overflow-hidden border border-border">
          <iframe
            src="https://www.youtube.com/embed/qslrNyCbT-k"
            title="Kidous Mahteme Testimonial"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            loading="lazy"
            className="absolute inset-0 w-full h-full"
          />
        </div>
      </div>
    </motion.div>
  )
}

export default CaseStudy
