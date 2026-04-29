'use client'

import { motion } from 'framer-motion'
import { fadeInUp, staggerContainer, staggerItem, viewportOptions } from '@/lib/animations'

/**
 * HOW TO ADD A NEW TESTIMONIAL:
 * 1. Upload video to YouTube (must be 16:9 regular video, not a Short).
 * 2. Copy the video ID from the URL (https://youtu.be/VIDEO_ID).
 * 3. Add a new object to the `testimonials` array below. Schema:
 *    {
 *      youtubeId: 'abc123XYZ',           // or null for "coming soon" placeholder
 *      name: 'First Last',
 *      role: 'Role @ Company',
 *      companyUrl: 'https://example.com', // optional, makes role clickable
 *      dateRange: 'MMM YYYY - MMM YYYY (active)', // engagement window
 *      outcomes: [                        // 2-4 concrete wins, keep punchy
 *        'X emails sent',
 *        'Y engaged leads',
 *        'Z signups / meetings / clients',
 *      ],
 *    }
 * 4. Grid auto-adjusts: 2 testimonials = 2 cols, 3+ = still 2 cols (wraps).
 *    If you want a 3-col layout, change `md:grid-cols-2` → `md:grid-cols-3`.
 */
type VideoTestimonial = {
  youtubeId: string | null
  name: string
  role: string
  companyUrl?: string
  dateRange: string
  outcomes: string[]
  note?: string
}

const testimonials: VideoTestimonial[] = [
  {
    youtubeId: 'qslrNyCbT-k',
    name: 'Kidous Mahteme',
    role: 'Co-founder @ Inframail',
    companyUrl: 'https://inframail.com',
    dateRange: 'Oct 2025 - May 2026 (active)',
    outcomes: [
      '630,328 emails sent',
      '858 positive replies',
      '70+ directly attributable customers',
    ],
    note: 'Note: 1,300+ of all-time Inframail customers received a cold email from us before signing up.',
  },
  {
    youtubeId: 'yMmsy7V3HoU',
    name: 'Connal Tregeagle',
    role: 'Founder @ ReviewFix',
    companyUrl: 'https://reviewfix.com.au',
    dateRange: 'Mar 2026 - May 2026 (active)',
    outcomes: [
      '13 B2B service clients signed',
      'Under 60 days',
      '≈7× ROI on cash collected',
    ],
  },
]

export function VideoTestimonials() {
  return (
    <section
      data-testid="video-testimonials-section"
      className="max-w-container mx-auto px-6 lg:px-12 py-32 lg:py-48"
    >
      <motion.div
        className="flex flex-col items-center gap-16 lg:gap-20"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOptions}
      >
        <motion.h2
          className="text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary text-center leading-tight"
          variants={fadeInUp}
        >
          Clients&apos; Wins
        </motion.h2>

        <motion.div
          className="grid md:grid-cols-2 gap-10 w-full max-w-5xl"
          variants={staggerItem}
        >
          {testimonials.map((t, i) => (
            <TestimonialCard key={i} t={t} />
          ))}
        </motion.div>
      </motion.div>
    </section>
  )
}

function TestimonialCard({ t }: { t: VideoTestimonial }) {
  return (
    <motion.div variants={fadeInUp} className="flex flex-col gap-4">
      <div className="relative aspect-video w-full rounded-card overflow-hidden border border-border">
        {t.youtubeId ? (
          <iframe
            src={`https://www.youtube.com/embed/${t.youtubeId}?rel=0`}
            title={`${t.name} testimonial`}
            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 w-full h-full"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-sm text-text-secondary/60">
            video coming soon
          </div>
        )}
      </div>

      <div className="flex flex-col gap-0.5">
        <p className="text-sm font-semibold text-text-primary">{t.name}</p>
        {t.companyUrl ? (
          <a
            href={t.companyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-text-secondary/80 hover:text-accent-primary underline-offset-4 hover:underline"
          >
            {t.role}
          </a>
        ) : (
          <p className="text-xs text-text-secondary/80">{t.role}</p>
        )}
      </div>

      <div className="flex flex-col gap-2 pt-3 border-t border-border/50">
        <p className="text-xs text-text-secondary/60 uppercase tracking-wide">{t.dateRange}</p>
        <ul className="flex flex-col gap-2">
          {t.outcomes.map((o, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-text-primary/90">
              <span className="text-[#00d9ff] mt-0.5">→</span>
              <span>{o}</span>
            </li>
          ))}
        </ul>
        {t.note && (
          <p className="text-xs text-text-secondary/60 italic pt-3 mt-1">{t.note}</p>
        )}
      </div>
    </motion.div>
  )
}

export default VideoTestimonials
