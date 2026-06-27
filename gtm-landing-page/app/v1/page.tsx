import { V1Nav } from '@/components/sections/v1/V1Nav'
import { V1Hero } from '@/components/sections/v1/V1Hero'
import { V1DreamPain } from '@/components/sections/v1/V1DreamPain'
import { V1Mechanism } from '@/components/sections/v1/V1Mechanism'
import { V1Stats } from '@/components/sections/v1/V1Stats'
import { V1Guarantee } from '@/components/sections/v1/V1Guarantee'
import { V1CTA } from '@/components/sections/v1/V1CTA'
import { V1Footer } from '@/components/sections/v1/V1Footer'

export default function V1Page() {
  return (
    <main className="min-h-screen bg-background">
      <V1Nav />
      <V1Hero />
      <V1DreamPain />
      <V1Mechanism />
      <V1Stats />
      <V1Guarantee />
      <V1CTA />
      <V1Footer />
    </main>
  )
}
