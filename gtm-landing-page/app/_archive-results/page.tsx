'use client'

import { Header, Footer } from '@/components/sections'
import { Button } from '@/components/ui/button'

type Metric = { value: string; label: string }

type Snapshot = {
  index: string
  client: string
  clientUrl: string
  role: string
  photo?: string
  quote: string
  bands: {
    title: string
    dateRange: string
    accent: 'emerald' | 'indigo'
    metrics: Metric[]
  }[]
}

const snapshots: Snapshot[] = [
  {
    index: '01',
    client: 'Inframail',
    clientUrl: 'https://inframail.com',
    role: 'Co-founder @ Inframail',
    // photo: '/testimonials/kidous.jpg',
    quote: "Max's system is incredibly thorough.",
    bands: [
      {
        title: 'First 90 Days Performance',
        dateRange: 'TODO: date range',
        accent: 'emerald',
        metrics: [
          { value: 'TODO', label: 'qualified meetings' },
          { value: 'TODO', label: 'reply rate' },
          { value: 'TODO', label: 'positive replies' },
          { value: 'TODO', label: 'pipeline generated' },
        ],
      },
      {
        title: 'Last 90 Days Performance',
        dateRange: 'TODO: date range',
        accent: 'indigo',
        metrics: [
          { value: 'TODO', label: 'cold emails sent' },
          { value: 'TODO', label: 'inbox rate' },
          { value: 'TODO', label: 'reply rate' },
          { value: 'TODO', label: 'meetings booked' },
        ],
      },
    ],
  },
  {
    index: '02',
    client: 'ReviewFix',
    clientUrl: 'https://reviewfix.com.au',
    role: 'Founder @ ReviewFix',
    quote: 'TODO: get Connal testimonial',
    bands: [
      {
        title: 'Weekly Refresh Performance',
        dateRange: 'TODO: date range',
        accent: 'emerald',
        metrics: [
          { value: '5', label: 'meetings booked' },
          { value: 'TODO', label: 'leads scraped / wk' },
          { value: 'TODO', label: 'email match rate' },
          { value: 'TODO', label: 'reply rate' },
        ],
      },
    ],
  },
]

export default function Results() {
  return (
    <main className="min-h-screen">
      <Header />

      <section className="max-w-container mx-auto px-6 lg:px-12 pt-32 lg:pt-40 pb-16">
        <div className="max-w-3xl mx-auto text-center flex flex-col gap-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary leading-tight tracking-tight">
            What we&apos;ve delivered.
          </h1>
          <p className="text-lg md:text-xl text-text-secondary leading-relaxed">
            Real numbers from real engagements.
          </p>
        </div>
      </section>

      <section className="max-w-container mx-auto px-6 lg:px-12 pb-24 flex flex-col gap-24">
        {snapshots.map((s) => (
          <SnapshotBlock key={s.index} s={s} />
        ))}
      </section>

      <section className="max-w-container mx-auto px-6 lg:px-12 py-24 text-center border-t border-border">
        <div className="flex flex-col items-center gap-6 max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary leading-tight">
            Want results like these?
          </h2>
          <p className="text-base md:text-lg text-text-secondary">
            Book a call. We&apos;ll review your offer, ICP, and economics.
          </p>
          <Button
            variant="shimmer"
            size="xl"
            className="font-semibold"
            onClick={() => {
              window.location.href = '/#book-call'
            }}
          >
            Book a Call
          </Button>
        </div>
      </section>

      <Footer />
    </main>
  )
}

function SnapshotBlock({ s }: { s: Snapshot }) {
  return (
    <div className="max-w-5xl mx-auto w-full flex flex-col gap-8">
      <header className="text-center flex flex-col gap-2">
        <p className="text-xs tracking-[0.3em] text-text-secondary/60 font-mono">
          {s.index} &nbsp;·&nbsp; {s.client.toUpperCase()}
        </p>
        <h2 className="text-3xl md:text-5xl font-bold text-text-primary tracking-tight">
          {s.client}
        </h2>
      </header>

      <div className="flex flex-col gap-6">
        {s.bands.map((b, i) => (
          <MetricBand key={i} band={b} />
        ))}
      </div>

      <QuoteBlock s={s} />
    </div>
  )
}

function MetricBand({ band }: { band: Snapshot['bands'][number] }) {
  const accentClass =
    band.accent === 'emerald'
      ? 'border-emerald-500/40 bg-emerald-500/[0.03]'
      : 'border-indigo-500/40 bg-indigo-500/[0.03]'

  return (
    <div className={`rounded-card border ${accentClass} p-6 md:p-8`}>
      <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-2 mb-6">
        <h3 className="text-lg md:text-xl font-bold text-text-primary">{band.title}</h3>
        <p className="text-sm text-text-secondary/70">{band.dateRange}</p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {band.metrics.map((m, i) => (
          <div key={i} className="flex flex-col gap-1">
            <p className="text-2xl md:text-3xl lg:text-4xl font-bold text-text-primary tabular-nums">
              {m.value}
            </p>
            <p className="text-xs md:text-sm text-text-secondary/80">{m.label}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

function QuoteBlock({ s }: { s: Snapshot }) {
  return (
    <figure className="flex flex-col md:flex-row items-start gap-6 pt-4">
      <div className="flex-shrink-0">
        {s.photo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={s.photo}
            alt={s.client}
            className="w-24 h-24 rounded-full object-cover border border-border"
          />
        ) : (
          <div className="w-24 h-24 rounded-full border border-dashed border-border flex items-center justify-center text-xs text-text-secondary/50">
            photo
          </div>
        )}
      </div>
      <div className="flex flex-col gap-3">
        <blockquote className="text-lg md:text-xl text-text-primary leading-relaxed">
          &ldquo;{s.quote}&rdquo;
        </blockquote>
        <figcaption className="text-sm">
          <a
            href={s.clientUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-text-primary hover:text-accent-primary underline-offset-4 hover:underline"
          >
            {s.client}
          </a>
          <span className="text-text-secondary"> — {s.role}</span>
        </figcaption>
      </div>
    </figure>
  )
}
