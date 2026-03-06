import type { Metadata } from 'next'
import { StrategyGenerator } from '@/components/sections/StrategyGenerator'

export const metadata: Metadata = {
  title: 'Free Outbound Strategy Generator | Maxionlabs',
  description:
    'Get a personalized outbound strategy in 60 seconds. We analyze your website and generate campaign playbooks, offer ideas, and actual cold email copy for your business.',
  openGraph: {
    title: 'Free Outbound Strategy Generator | Maxionlabs',
    description:
      'Get a personalized outbound strategy in 60 seconds. Campaign playbooks, offer ideas, and cold email copy tailored to your business.',
    type: 'website',
  },
}

export default function StrategyPage() {
  return (
    <main className="min-h-screen relative">
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-[600px] bg-gradient-to-t from-[#5E5CE6]/[0.07] via-[#00d9ff]/[0.03] to-transparent" />
      <StrategyGenerator />
    </main>
  )
}
