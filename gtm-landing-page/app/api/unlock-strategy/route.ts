import { NextRequest, NextResponse } from 'next/server'
import { isEmailUsed, recordEmailUnlock, getGenerationById } from '@/lib/strategy-db'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, generationId } = body

    if (!email || !generationId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Check if this email already unlocked a strategy
    if (await isEmailUsed(email)) {
      return NextResponse.json(
        { error: 'email_used', redirect: '/strategy/already-generated' },
        { status: 409 }
      )
    }

    // Verify the generation exists
    const generation = await getGenerationById(generationId)
    if (!generation) {
      return NextResponse.json(
        { error: 'Generation not found' },
        { status: 404 }
      )
    }

    // Record the email unlock
    await recordEmailUnlock(generationId, email)

    // Send strategy to email (fire and forget)
    sendStrategyEmail(email, generation).catch((err) =>
      console.error('Failed to send strategy email:', err)
    )

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Unlock error:', error)
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    )
  }
}

async function sendStrategyEmail(
  email: string,
  generation: Record<string, unknown>
) {
  const strategy = JSON.parse(generation.strategy_json as string)
  const domain = generation.domain as string

  const playbooks = strategy.campaign_playbooks
    .map(
      (p: { name: string; type: string; target_who: string; target_why: string; sequence_structure: string; expected_results: string; email_1?: { framework: string; subject_line: string; body: string }; follow_ups?: { step: string; angle: string }[] }) => {
        let text = `${p.name} (${p.type})\nWho: ${p.target_who}\nWhy: ${p.target_why}\nSequence: ${p.sequence_structure}\nExpected: ${p.expected_results}`
        if (p.email_1) {
          text += `\n\n  [${p.email_1.framework}]\n  Subject: ${p.email_1.subject_line}\n\n  ${p.email_1.body}`
        }
        if (p.follow_ups?.length) {
          text += '\n\n  ' + p.follow_ups.map((f) => `${f.step}: ${f.angle}`).join('\n  ')
        }
        return text
      }
    )
    .join('\n\n---\n\n')

  const offers = strategy.offer_ideas
    .map(
      (o: { name: string; type: string; description: string; cold_email_cta: string }) =>
        `${o.name} (${o.type})\n${o.description}${o.cold_email_cta ? `\nCTA: "${o.cold_email_cta}"` : ''}`
    )
    .join('\n\n')

  const market = strategy.market_estimate
  const marketText = `Companies: ${market.estimated_companies}\nJob Titles: ${market.job_titles?.join(', ') || 'N/A'}`

  const textBody = `Your Outbound Strategy for ${domain}

${strategy.company_summary}

== CAMPAIGN PLAYBOOKS ==

${playbooks}

== OFFER IDEAS ==

${offers}

== MARKET ESTIMATE ==

${marketText}

---

Want us to execute this strategy for you?
Book a free 15-minute growth mapping call: https://cal.com/maxionlabs/growth-mapping

- Maxionlabs`

  // Use Gmail MCP or a simple SMTP send
  // For now, log it - will be connected to n8n webhook or Gmail API
  console.log(`[Strategy Email] To: ${email} | Domain: ${domain} | Length: ${textBody.length} chars`)

  // TODO: Connect to email sending service (n8n webhook, Gmail API, or Resend)
  // When ready, uncomment and configure:
  //
  // await fetch('https://your-n8n-webhook-url', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify({ to: email, subject: `Your Outbound Strategy for ${domain}`, body: textBody }),
  // })
}
