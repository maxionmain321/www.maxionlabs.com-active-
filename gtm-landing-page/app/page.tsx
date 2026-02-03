import {
  Header,
  Hero,
  CaseStudy,
  Pricing,
  HowItWorks,
  Qualification,
  FAQ,
  FinalCTA,
} from '@/components/sections'

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Sticky Navigation */}
      <Header />

      {/* Section 1: Hero + VSL */}
      <Hero />

      {/* Section 2: Social Proof / Case Study */}
      <CaseStudy />

      {/* Section 3: How Pricing Works */}
      <Pricing />

      {/* Section 4: How It Works (3-phase timeline) */}
      <HowItWorks />

      {/* Section 5: Qualification Criteria */}
      <Qualification />

      {/* Section 6: FAQ / Objection Handling */}
      <FAQ />

      {/* Section 7: Final CTA with Cal.com Embed + Footer */}
      <FinalCTA />
    </main>
  )
}
