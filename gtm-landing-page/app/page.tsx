import { Header, Hero, VideoTestimonials, FinalCTA } from '@/components/sections'

export default function Home() {
  return (
    <main className="min-h-screen relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10 opacity-[0.35]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
          maskImage: 'radial-gradient(ellipse at 50% 0%, black 20%, transparent 85%)',
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[1400px] h-[900px] -z-10"
        style={{
          background:
            'radial-gradient(ellipse at top, rgba(94,92,230,0.14) 0%, rgba(94,92,230,0.05) 35%, transparent 65%)',
        }}
      />
      <Header />
      <Hero />
      <VideoTestimonials />
      <FinalCTA />
    </main>
  )
}
