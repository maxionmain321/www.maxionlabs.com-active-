import { Header, Hero, VideoTestimonials, UrgencyGate, FinalCTA } from '@/components/sections'

export default function Home() {
  return (
    <main className="min-h-screen relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10 opacity-[0.35]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(11,13,18,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(11,13,18,0.045) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
          maskImage: 'radial-gradient(ellipse at 50% 0%, black 20%, transparent 85%)',
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute top-0 inset-x-0 w-full h-[900px] -z-10"
        style={{
          background:
            'radial-gradient(ellipse 900px 620px at 22% 8%, rgba(120,150,255,0.20) 0%, transparent 70%), radial-gradient(ellipse 900px 620px at 80% 12%, rgba(255,214,140,0.22) 0%, transparent 70%), radial-gradient(ellipse 700px 500px at 52% 0%, rgba(180,210,255,0.18) 0%, transparent 75%)',
        }}
      />
      <Header />
      <Hero />
      <UrgencyGate />
      <VideoTestimonials />
      <FinalCTA />
    </main>
  )
}
