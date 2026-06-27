import { V3Nav } from '@/components/sections/v3/V3Nav'
import { V3Hero } from '@/components/sections/v3/V3Hero'
import { V3Proof } from '@/components/sections/v3/V3Proof'
import { V3Claim } from '@/components/sections/v3/V3Claim'
import { V3PushAway } from '@/components/sections/v3/V3PushAway'
import { V3CTABlock } from '@/components/sections/v3/V3CTABlock'
import { V3Footer } from '@/components/sections/v3/V3Footer'

export default function V3Page() {
  return (
    <main className="min-h-screen bg-background">
      <V3Nav />
      <V3Hero />
      <V3Proof />
      <V3Claim />
      <V3PushAway />
      <V3CTABlock />
      <V3Footer />
    </main>
  )
}
