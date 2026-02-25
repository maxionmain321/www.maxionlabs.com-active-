import {
  Header,
  Hero,
  SocialProof,
  CaseStudy,
  Pricing,
  HowItWorks,
  Qualification,
  FAQ,
  FinalCTA,
} from '@/components/sections'

export default function Home() {
  return (
    <main className="min-h-screen relative">
      {/* Ambient glow at bottom of page */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-[600px] bg-gradient-to-t from-[#5E5CE6]/[0.07] via-[#00d9ff]/[0.03] to-transparent" />
      <Header />
      <Hero />
      <SocialProof />
      <CaseStudy />
      <Pricing />
      <HowItWorks />
      <Qualification />
      <FAQ />
      <FinalCTA />
    </main>
  )
}
