'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Mail, MessageSquare, TrendingUp, Eye } from 'lucide-react'
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
      className="max-w-container mx-auto px-6 lg:px-12 py-24 lg:py-36 scroll-mt-20"
    >
      <motion.div
        className="flex flex-col gap-12"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOptions}
      >
        {/* Headline */}
        <motion.div className="flex flex-col gap-3 items-center" variants={fadeInUp}>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary text-center leading-tight">
            How We Helped Inframail Sign{' '}
            <span className="text-gradient">85+ Clients</span> via Cold Email
          </h2>
          <p className="text-base text-text-secondary">
            Inframail - B2B email infrastructure SaaS
          </p>
        </motion.div>

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
      <div className="relative aspect-[4/3] w-full rounded-card overflow-hidden">
        <Image
          src="/images/Kidous dashboard metrics 25.02.2026.png"
          alt="Inframail campaign dashboard showing 500K+ emails sent and 694 engaged leads"
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
    <motion.div variants={fadeInUp} className="flex flex-col gap-6">
      <p className="text-base text-text-secondary leading-relaxed">
        Inframail needed to reach thousands of email marketers fast. In 5 months:
      </p>

      {/* Numbers Grid */}
      <div className="flex flex-col gap-5">
        <div className="flex items-center gap-4">
          <Mail className="w-5 h-5 text-accent-primary flex-shrink-0" />
          <div className="flex items-baseline gap-2">
            <p className="text-3xl md:text-4xl font-bold text-accent-primary">500K+</p>
            <p className="text-sm text-text-secondary">emails sent</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <MessageSquare className="w-5 h-5 text-accent-primary flex-shrink-0" />
          <div className="flex items-baseline gap-2">
            <p className="text-3xl md:text-4xl font-bold text-accent-primary">694</p>
            <p className="text-sm text-text-secondary">engaged leads generated</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <TrendingUp className="w-5 h-5 text-accent-primary flex-shrink-0" />
          <div className="flex items-baseline gap-2">
            <p className="text-3xl md:text-4xl font-bold text-accent-primary">85+</p>
            <p className="text-sm text-text-secondary">clients signed directly from cold email</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Eye className="w-5 h-5 text-accent-primary flex-shrink-0" />
          <div className="flex items-baseline gap-2">
            <p className="text-3xl md:text-4xl font-bold text-accent-primary">100s more</p>
            <p className="text-sm text-text-secondary">signed after seeing the brand via outbound</p>
          </div>
        </div>
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
      <div className="flex flex-col items-center gap-3">
        <Image
          src="/images/inframail.png"
          alt="Inframail"
          width={120}
          height={32}
          className="opacity-80"
        />
        <div>
          <p className="text-base font-semibold text-text-primary">Kidous Mahteme</p>
          <p className="text-sm text-text-secondary">Co-founder @ Inframail</p>
        </div>
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
        <div className="relative aspect-video w-full rounded-card overflow-hidden">
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
