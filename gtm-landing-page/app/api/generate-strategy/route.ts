import { NextRequest, NextResponse } from 'next/server'
import { scrapeWebsite, generateStrategy } from '@/lib/strategy-generator'
import { isDomainUsed, recordGeneration } from '@/lib/strategy-db'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { url, icp, dealSize } = body

    if (!url || !icp || !dealSize) {
      return NextResponse.json(
        { error: 'Missing required fields: url, icp, dealSize' },
        { status: 400 }
      )
    }

    // Check if this domain already got a strategy
    if (await isDomainUsed(url)) {
      return NextResponse.json(
        { error: 'domain_used', redirect: '/strategy/already-generated' },
        { status: 409 }
      )
    }

    // Step 1: Scrape the website
    let websiteContent: string
    try {
      websiteContent = await scrapeWebsite(url)
    } catch {
      return NextResponse.json(
        { error: 'Could not fetch the website. Please check the URL and try again.' },
        { status: 422 }
      )
    }

    if (websiteContent.length < 50) {
      return NextResponse.json(
        { error: 'Could not extract enough content from the website. Please check the URL.' },
        { status: 422 }
      )
    }

    // Step 2: Generate strategy with Claude
    const strategy = await generateStrategy(websiteContent, icp, dealSize)

    // Step 3: Record in database (email added later on unlock)
    const generationId = await recordGeneration(url, icp, dealSize, JSON.stringify(strategy))

    return NextResponse.json({ strategy, generationId })
  } catch (error) {
    console.error('Strategy generation error:', error)

    // Surface rate-limit errors clearly so the frontend can show a helpful message
    if (error && typeof error === 'object' && 'status' in error) {
      const status = (error as { status: number }).status
      if (status === 429) {
        return NextResponse.json(
          { error: 'High demand right now. Please wait 30 seconds and try again.' },
          { status: 429 }
        )
      }
      if (status === 529) {
        return NextResponse.json(
          { error: 'Our AI is temporarily overloaded. Please try again in a minute.' },
          { status: 503 }
        )
      }
    }

    const message = error instanceof Error ? error.message : String(error)
    return NextResponse.json(
      { error: `Failed to generate strategy: ${message}` },
      { status: 500 }
    )
  }
}
