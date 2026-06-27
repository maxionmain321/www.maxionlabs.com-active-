import { V2Nav } from '@/components/sections/v2/V2Nav'
import { V2Hero } from '@/components/sections/v2/V2Hero'
import { V2Problem } from '@/components/sections/v2/V2Problem'
import { V2Mechanism } from '@/components/sections/v2/V2Mechanism'
import { V2ProofStack } from '@/components/sections/v2/V2ProofStack'
import { V2Offer } from '@/components/sections/v2/V2Offer'
import { V2Objections } from '@/components/sections/v2/V2Objections'
import { V2Guarantee } from '@/components/sections/v2/V2Guarantee'
import { V2CTA } from '@/components/sections/v2/V2CTA'
import { V2Footer } from '@/components/sections/v2/V2Footer'

export default function V2Page() {
  return (
    <main className="min-h-screen bg-background">
      <V2Nav />
      <V2Hero />
      <V2Problem />
      <V2Mechanism />
      <V2ProofStack />
      <V2Offer />
      <V2Objections />
      <V2Guarantee />
      <V2CTA />
      <V2Footer />
    </main>
  )
}
