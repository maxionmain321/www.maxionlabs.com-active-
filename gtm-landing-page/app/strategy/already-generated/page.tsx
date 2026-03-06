import type { Metadata } from 'next'
import { ArrowLeft, Calendar, Mail } from 'lucide-react'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
  title: 'Strategy Already Generated | Maxionlabs',
  robots: 'noindex',
}

export default function AlreadyGeneratedPage() {
  return (
    <main className="min-h-screen relative">
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-[600px] bg-gradient-to-t from-[#5E5CE6]/[0.07] via-[#00d9ff]/[0.03] to-transparent" />

      <section className="max-w-container mx-auto px-6 lg:px-12 pt-20 lg:pt-28 pb-16 lg:pb-24">
        <a
          href="/"
          className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-text-primary transition-colors mb-12"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Maxionlabs
        </a>

        <div className="max-w-2xl mx-auto text-center">
          <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-accent-primary/10 border border-accent-primary/20 mx-auto mb-8">
            <Mail className="w-7 h-7 text-accent-primary" />
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary leading-tight tracking-tight mb-6">
            Your strategy was already generated
          </h1>

          <p className="text-lg text-text-secondary leading-relaxed mb-4">
            We have already created a personalized outbound strategy for this
            website. Check your inbox - we sent the full strategy to your email.
          </p>

          <p className="text-text-secondary/60 mb-10">
            Each company gets one free strategy to keep quality high.
            If you need a deeper analysis or want us to execute it, let&apos;s talk.
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
          </div>
        </div>
      </section>
    </main>
  )
}
