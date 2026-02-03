import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Hero } from '@/components/sections/Hero'

// Mock framer-motion to avoid animation issues in tests
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
    button: ({ children, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
      <button {...props}>{children}</button>
    ),
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}))

describe('Hero Section', () => {
  beforeEach(() => {
    // Reset any mocks before each test
    vi.clearAllMocks()
  })

  describe('Layout', () => {
    it('renders 50/50 split layout with grid classes for desktop', () => {
      render(<Hero />)

      const heroSection = screen.getByTestId('hero-section')
      expect(heroSection).toBeInTheDocument()

      // Check for grid layout container
      const gridContainer = screen.getByTestId('hero-grid')
      expect(gridContainer).toHaveClass('lg:grid-cols-2')
    })

    it('renders stacked layout for mobile with single column', () => {
      render(<Hero />)

      const gridContainer = screen.getByTestId('hero-grid')
      // Default grid is single column (stacked), lg breakpoint changes to 2 columns
      expect(gridContainer).toHaveClass('grid-cols-1')
    })

    it('applies max-width container (1280px) constraint', () => {
      render(<Hero />)

      const heroSection = screen.getByTestId('hero-section')
      expect(heroSection).toHaveClass('max-w-container')
    })

    it('applies correct horizontal padding (24px mobile, 48px desktop)', () => {
      render(<Hero />)

      const heroSection = screen.getByTestId('hero-section')
      // px-6 = 24px, lg:px-12 = 48px
      expect(heroSection).toHaveClass('px-6', 'lg:px-12')
    })
  })

  describe('Content', () => {
    it('renders H1 heading with correct text', () => {
      render(<Hero />)

      const heading = screen.getByRole('heading', { level: 1 })
      expect(heading).toBeInTheDocument()
      expect(heading).toHaveTextContent('GTM Systems for Agencies & SaaS')
    })

    it('renders sub-headline paragraph with secondary text color', () => {
      render(<Hero />)

      const subheadline = screen.getByTestId('hero-subheadline')
      expect(subheadline).toBeInTheDocument()
      expect(subheadline).toHaveClass('text-text-secondary')
    })

    it('renders CTA button with correct text', () => {
      render(<Hero />)

      const ctaButton = screen.getByRole('button', { name: /let's book you sales calls/i })
      expect(ctaButton).toBeInTheDocument()
    })
  })

  describe('VSL Player', () => {
    it('renders VSL player container with 16:9 aspect ratio', () => {
      render(<Hero />)

      const vslContainer = screen.getByTestId('vsl-player')
      expect(vslContainer).toBeInTheDocument()
      expect(vslContainer).toHaveClass('aspect-video')
    })

    it('renders play icon button', () => {
      render(<Hero />)

      const playButton = screen.getByRole('button', { name: /play video/i })
      expect(playButton).toBeInTheDocument()
    })

    it('VSL player has glassmorphism styling', () => {
      render(<Hero />)

      const vslContainer = screen.getByTestId('vsl-player')
      expect(vslContainer).toHaveClass('backdrop-blur-md')
    })

    it('VSL player has pulsing border glow animation class', () => {
      render(<Hero />)

      const vslContainer = screen.getByTestId('vsl-player')
      expect(vslContainer).toHaveClass('animate-pulse-glow')
    })
  })

  describe('Accessibility', () => {
    it('CTA button is keyboard accessible', async () => {
      const user = userEvent.setup()
      render(<Hero />)

      const ctaButton = screen.getByRole('button', { name: /let's book you sales calls/i })

      // Tab to the first focusable element, then to CTA
      await user.tab()

      // Button should be focusable
      expect(document.activeElement).toBe(ctaButton) || expect(ctaButton).toBeVisible()
    })

    it('play button is keyboard focusable', async () => {
      const user = userEvent.setup()
      render(<Hero />)

      const playButton = screen.getByRole('button', { name: /play video/i })

      // Play button should be focusable
      playButton.focus()
      expect(playButton).toHaveFocus()
    })

    it('play button has visible focus ring', () => {
      render(<Hero />)

      const playButton = screen.getByRole('button', { name: /play video/i })
      expect(playButton).toHaveClass('focus-visible:ring-2')
    })

    it('has proper heading hierarchy with single H1', () => {
      render(<Hero />)

      const h1Elements = screen.getAllByRole('heading', { level: 1 })
      expect(h1Elements).toHaveLength(1)
    })
  })
})
