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

async function callClaude(
  client: Anthropic,
  websiteContent: string,
  icp: string,
  dealSize: string,
  maxRetries = 3
): Promise<string> {
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
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

      return message.content
        .filter((block) => block.type === 'text')
        .map((block) => (block.type === 'text' ? block.text : ''))
        .join('')
    } catch (err: unknown) {
      const status = err instanceof Anthropic.APIError ? err.status : 0
      const isRetryable = status === 429 || status === 529 || status >= 500

      if (isRetryable && attempt < maxRetries - 1) {
        const delay = Math.min(1000 * Math.pow(2, attempt), 8000)
        console.log(`[Strategy] Retry ${attempt + 1}/${maxRetries} after ${delay}ms (status: ${status})`)
        await new Promise((r) => setTimeout(r, delay))
        continue
      }
      throw err
    }
  }
  throw new Error('Max retries exceeded')
}

export async function generateStrategy(
  websiteContent: string,
  icp: string,
  dealSize: string
): Promise<StrategyResult> {
  const client = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY,
  })

  const responseText = await callClaude(client, websiteContent, icp, dealSize)

  const jsonStr = responseText
    .replace(/^```json\s*/i, '')
    .replace(/^```\s*/i, '')
    .replace(/\s*```$/i, '')
    .trim()

  const result: StrategyResult = JSON.parse(jsonStr)
  return result
}
