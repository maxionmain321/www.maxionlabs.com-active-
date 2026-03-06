import Anthropic from '@anthropic-ai/sdk'
import { STRATEGY_SYSTEM_PROMPT, buildUserPrompt } from './strategy-prompt'

export interface PlaybookEmail {
  framework: string
  subject_line: string
  body: string
  personalization_slot: string
}

export interface FollowUp {
  step: string
  angle: string
}

export interface CampaignPlaybook {
  name: string
  type: string
  target_who: string
  target_why: string
  sequence_structure: string
  expected_results: string
  email_1: PlaybookEmail
  follow_ups: FollowUp[]
}

export interface OfferIdea {
  name: string
  type: string
  description: string
  cold_email_cta: string
}

export interface MarketEstimate {
  estimated_companies: string
  job_titles: string[]
}

export interface StrategyResult {
  company_summary: string
  campaign_playbooks: CampaignPlaybook[]
  offer_ideas: OfferIdea[]
  market_estimate: MarketEstimate
}

export async function scrapeWebsite(url: string): Promise<string> {
  let normalizedUrl = url.trim()
  if (!normalizedUrl.startsWith('http://') && !normalizedUrl.startsWith('https://')) {
    normalizedUrl = 'https://' + normalizedUrl
  }

  const response = await fetch(normalizedUrl, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (compatible; MaxionlabsBot/1.0)',
      'Accept': 'text/html,application/xhtml+xml',
    },
    signal: AbortSignal.timeout(10000),
  })

  if (!response.ok) {
    throw new Error(`Failed to fetch website: ${response.status}`)
  }

  const html = await response.text()

  const cleaned = html
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<noscript[\s\S]*?<\/noscript>/gi, '')
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/<\/(p|div|h[1-6]|li|tr|br|hr)[^>]*>/gi, '\n')
    .replace(/<(br|hr)[^>]*\/?>/gi, '\n')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .replace(/[ \t]+/g, ' ')
    .replace(/\n\s*\n/g, '\n')
    .trim()

  return cleaned
}

export async function generateStrategy(
  websiteContent: string,
  icp: string,
  dealSize: string
): Promise<StrategyResult> {
  const client = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY,
  })

  const message = await client.messages.create({
    model: 'claude-sonnet-4-5-20250929',
    max_tokens: 4096,
    messages: [
      {
        role: 'user',
        content: buildUserPrompt(websiteContent, icp, dealSize),
      },
    ],
    system: STRATEGY_SYSTEM_PROMPT,
  })

  const responseText = message.content
    .filter((block) => block.type === 'text')
    .map((block) => {
      if (block.type === 'text') return block.text
      return ''
    })
    .join('')

  const jsonStr = responseText
    .replace(/^```json\s*/i, '')
    .replace(/^```\s*/i, '')
    .replace(/\s*```$/i, '')
    .trim()

  const result: StrategyResult = JSON.parse(jsonStr)
  return result
}
