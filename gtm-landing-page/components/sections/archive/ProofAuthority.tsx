'use client'

import { motion } from 'framer-motion'
import { staggerContainer, staggerItem, viewportOptions } from '@/lib/animations'

interface Stat {
  id: string
  value: string
  label: string
}

const stats: Stat[] = [
  { id: 'arr', value: '+$240K', label: 'ARR Generated' },
  { id: 'replies', value: '400+', label: 'Positive Replies' },
  { id: 'tam', value: '200K', label: 'TAM Leads Mapped' },
]

const logos = [
  { id: 'hubspot', name: 'HubSpot' },
  { id: 'salesforce', name: 'Salesforce' },
  { id: 'pipedrive', name: 'Pipedrive' },
  { id: 'attio', name: 'Attio' },
  { id: 'ghl', name: 'GoHighLevel' },
]

export function ProofAuthority() {
  return (
    <section
      data-testid="proof-authority-section"
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
          Real Results. Real Clients.
        </h2>
        <p className="text-lg text-text-secondary max-w-2xl mx-auto">
          Don't just take our word for it. See what we've built for agencies and SaaS companies like yours.
        </p>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        data-testid="stats-grid"
        className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 mb-16 lg:mb-20"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOptions}
      >
        {stats.map((stat) => (
          <motion.div
            key={stat.id}
            variants={staggerItem}
            className="text-center"
            data-testid={`stat-${stat.id}`}
          >
            <div className="text-4xl md:text-5xl lg:text-6xl font-bold text-accent mb-2">
              {stat.value}
            </div>
            <div className="text-lg text-text-secondary">
              {stat.label}
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Video Testimonial */}
      <motion.div
        className="mb-16 lg:mb-20"
        initial="hidden"
        whileInView="visible"
        viewport={viewportOptions}
        variants={staggerItem}
      >
        <div
          data-testid="video-testimonial"
          className="max-w-3xl mx-auto aspect-video rounded-card border border-border bg-card overflow-hidden"
        >
          {/* YouTube Embed Placeholder */}
          <div className="w-full h-full flex items-center justify-center bg-slate/50">
            <div className="text-center p-8">
              <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-accent"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
              <p className="text-text-secondary text-sm">
                Video testimonial from Kidous Mahteme
              </p>
              <p className="text-text-secondary/60 text-xs mt-1">
                (YouTube embed placeholder)
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Logo Marquee */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={viewportOptions}
        variants={staggerItem}
      >
        <p className="text-center text-text-secondary text-sm mb-6">
          Integrated with your favorite CRMs
        </p>
        <LogoMarquee />
      </motion.div>
    </section>
  )
}

function LogoMarquee() {
  return (
    <div
      data-testid="logo-marquee"
      className="relative overflow-hidden py-4"
    >
      {/* Gradient Fade Edges */}
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

      {/* Scrolling Container - respects prefers-reduced-motion via CSS */}
      <div className="flex animate-marquee motion-reduce:animate-none motion-reduce:justify-center gap-12 lg:gap-16">
        {/* First set of logos */}
        {logos.map((logo) => (
          <LogoItem key={logo.id} logo={logo} />
        ))}
        {/* Duplicate for seamless loop */}
        {logos.map((logo) => (
          <LogoItem key={`${logo.id}-dup`} logo={logo} />
        ))}
      </div>
    </div>
  )
}

interface LogoItemProps {
  logo: { id: string; name: string }
}

function LogoItem({ logo }: LogoItemProps) {
  return (
    <div
      className="flex-shrink-0 flex items-center justify-center h-12 px-6 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
      data-testid={`logo-${logo.id}`}
    >
      {/* Text placeholder for logos - replace with actual SVG/images */}
      <span className="text-xl font-semibold text-text-primary whitespace-nowrap">
        {logo.name}
      </span>
    </div>
  )
}

export default ProofAuthority
