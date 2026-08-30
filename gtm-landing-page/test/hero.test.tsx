import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Hero } from '@/components/sections/Hero'

vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
      <div {...props}>{children}</div>
    ),
    section: ({ children, ...props }: React.HTMLAttributes<HTMLElement>) => (
      <section {...props}>{children}</section>
    ),
    h1: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
      <h1 {...props}>{children}</h1>
    ),
    p: ({ children, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
      <p {...props}>{children}</p>
    ),
    span: ({ children, ...props }: React.HTMLAttributes<HTMLSpanElement>) => (
      <span {...props}>{children}</span>
    ),
    button: ({ children, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
      <button {...props}>{children}</button>
    ),
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}))

vi.mock('@/components/ui/button', () => ({
  Button: ({ children, onClick, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
    <button onClick={onClick} {...props}>{children}</button>
  ),
}))

describe('Hero Section', () => {
  it('renders the hero section with correct test id', () => {
    render(<Hero />)
    expect(screen.getByTestId('hero-section')).toBeInTheDocument()
  })

  it('renders H1 heading', () => {
    render(<Hero />)
    const heading = screen.getByRole('heading', { level: 1 })
    expect(heading).toBeInTheDocument()
  })

  it('renders CTA button', () => {
    render(<Hero />)
    const buttons = screen.getAllByRole('button')
    expect(buttons.length).toBeGreaterThan(0)
  })

  it('does not render a VSL player (text-based landing)', () => {
    render(<Hero />)
    expect(screen.queryByTestId('vsl-player')).not.toBeInTheDocument()
  })

  it('renders the pay-per-meeting offer copy', () => {
    render(<Hero />)
    // Offer history: "5,000 contacts free test" -> commercial-walkthrough pilot
    // (2026-08) -> pay per qualified meeting held (2026-08-29). Both earlier
    // offers are retired; see 00_foundation/retirement-log.md in the GTM repo.
    expect(screen.getByText(/per qualified meeting held/i)).toBeInTheDocument()
  })

  it('has proper heading hierarchy with single H1', () => {
    render(<Hero />)
    const h1Elements = screen.getAllByRole('heading', { level: 1 })
    expect(h1Elements).toHaveLength(1)
  })

  it('names who the meetings are with', () => {
    render(<Hero />)
    // Audience history: "B2B revenue leaders" -> local commercial operators ->
    // companies whose BUYER is an owner-operator SMB (2026-08-29). The gate is
    // the client's customer, not the client's own size.
    const matches = screen.getAllByText(/accounts you actually want/i)
    expect(matches.length).toBeGreaterThan(0)
  })
})
