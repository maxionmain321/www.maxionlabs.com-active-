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

  it('renders VSL player with correct test id', () => {
    render(<Hero />)
    expect(screen.getByTestId('vsl-player')).toBeInTheDocument()
  })

  it('renders VSL player with aspect-video class', () => {
    render(<Hero />)
    const vslPlayer = screen.getByTestId('vsl-player')
    expect(vslPlayer).toHaveClass('aspect-video')
  })

  it('has proper heading hierarchy with single H1', () => {
    render(<Hero />)
    const h1Elements = screen.getAllByRole('heading', { level: 1 })
    expect(h1Elements).toHaveLength(1)
  })

  it('renders eyebrow pill text for B2B revenue leaders', () => {
    render(<Hero />)
    const matches = screen.getAllByText(/B2B/i)
    expect(matches.length).toBeGreaterThan(0)
  })
})
