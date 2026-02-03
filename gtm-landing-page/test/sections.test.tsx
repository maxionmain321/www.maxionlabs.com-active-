import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { BentoGrid } from '@/components/sections/BentoGrid'
import { Matrix } from '@/components/sections/Matrix'
import { RiskReversal } from '@/components/sections/RiskReversal'
import { ExpansionServices } from '@/components/sections/ExpansionServices'
import { ProofAuthority } from '@/components/sections/ProofAuthority'
import { FAQ } from '@/components/sections/FAQ'
import { CTA } from '@/components/sections/CTA'
import { Footer } from '@/components/sections/Footer'

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => (
      <div {...props}>{children}</div>
    ),
    h1: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => (
      <h1 {...props}>{children}</h1>
    ),
    h2: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => (
      <h2 {...props}>{children}</h2>
    ),
    p: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => (
      <p {...props}>{children}</p>
    ),
  },
  AnimatePresence: ({ children }: React.PropsWithChildren) => <>{children}</>,
}))

describe('BentoGrid Section', () => {
  it('renders the section with correct test id', () => {
    render(<BentoGrid />)
    expect(screen.getByTestId('bento-grid-section')).toBeInTheDocument()
  })

  it('renders all 8 deliverable cards', () => {
    render(<BentoGrid />)
    expect(screen.getByTestId('bento-card-genesis-strategy')).toBeInTheDocument()
    expect(screen.getByTestId('bento-card-day-3-priority')).toBeInTheDocument()
    expect(screen.getByTestId('bento-card-validation-matrix')).toBeInTheDocument()
    expect(screen.getByTestId('bento-card-revenue-utility')).toBeInTheDocument()
    expect(screen.getByTestId('bento-card-ghost-proof')).toBeInTheDocument()
    expect(screen.getByTestId('bento-card-sales-toolkit')).toBeInTheDocument()
    expect(screen.getByTestId('bento-card-brand-safety')).toBeInTheDocument()
    expect(screen.getByTestId('bento-card-month-2-expansion')).toBeInTheDocument()
  })

  it('renders section heading', () => {
    render(<BentoGrid />)
    expect(screen.getByText('The Deliverable Stack')).toBeInTheDocument()
  })

  it('cards have glow variant for hover effect', () => {
    render(<BentoGrid />)
    const card = screen.getByTestId('bento-card-genesis-strategy')
    expect(card).toHaveAttribute('data-variant', 'glow')
  })
})

describe('Matrix Section', () => {
  it('renders the 3x3 grid with 9 cells', () => {
    render(<Matrix />)
    expect(screen.getByTestId('matrix-grid')).toBeInTheDocument()
    for (let i = 1; i <= 9; i++) {
      expect(screen.getByTestId(`matrix-cell-${i}`)).toBeInTheDocument()
    }
  })

  it('cells display correct numbers', () => {
    render(<Matrix />)
    for (let i = 1; i <= 9; i++) {
      const cell = screen.getByTestId(`matrix-cell-${i}`)
      expect(cell).toHaveTextContent(String(i))
    }
  })

  it('cells are keyboard accessible', () => {
    render(<Matrix />)
    const cell = screen.getByTestId('matrix-cell-1')
    expect(cell.tagName).toBe('BUTTON')
    expect(cell).toHaveAttribute('type', 'button')
  })

  it('shows tooltip on hover', async () => {
    render(<Matrix />)
    const cell = screen.getByTestId('matrix-cell-1')
    fireEvent.mouseEnter(cell)
    expect(screen.getByRole('tooltip')).toBeInTheDocument()
  })

  it('renders section heading', () => {
    render(<Matrix />)
    expect(screen.getByText('9-Cell Validation Matrix')).toBeInTheDocument()
  })
})

describe('RiskReversal Section', () => {
  it('renders the section', () => {
    render(<RiskReversal />)
    expect(screen.getByTestId('risk-reversal-section')).toBeInTheDocument()
  })

  it('renders all 3 risk cards', () => {
    render(<RiskReversal />)
    expect(screen.getByTestId('risk-card-7-day-sprint')).toBeInTheDocument()
    expect(screen.getByTestId('risk-card-30-day-milestone')).toBeInTheDocument()
    expect(screen.getByTestId('risk-card-data-ownership')).toBeInTheDocument()
  })

  it('displays guarantee badges', () => {
    render(<RiskReversal />)
    expect(screen.getByText('$500 Cashback')).toBeInTheDocument()
    expect(screen.getByText('100% Refund')).toBeInTheDocument()
    expect(screen.getByText('100% Yours')).toBeInTheDocument()
  })

  it('renders 3-column grid on desktop', () => {
    render(<RiskReversal />)
    const grid = screen.getByTestId('risk-cards-grid')
    expect(grid).toHaveClass('md:grid-cols-3')
  })
})

describe('ExpansionServices Section', () => {
  it('renders the section', () => {
    render(<ExpansionServices />)
    expect(screen.getByTestId('expansion-services-section')).toBeInTheDocument()
  })

  it('renders 2 expansion cards', () => {
    render(<ExpansionServices />)
    expect(screen.getByTestId('expansion-card-tam-mapping')).toBeInTheDocument()
    expect(screen.getByTestId('expansion-card-bespoke-gtm')).toBeInTheDocument()
  })

  it('displays Clay Certified badge', () => {
    render(<ExpansionServices />)
    expect(screen.getByText('Clay Certified')).toBeInTheDocument()
  })

  it('renders 2-column grid', () => {
    render(<ExpansionServices />)
    const grid = screen.getByTestId('expansion-cards-grid')
    expect(grid).toHaveClass('md:grid-cols-2')
  })
})

describe('ProofAuthority Section', () => {
  it('renders the section', () => {
    render(<ProofAuthority />)
    expect(screen.getByTestId('proof-authority-section')).toBeInTheDocument()
  })

  it('displays case study stats', () => {
    render(<ProofAuthority />)
    expect(screen.getByTestId('stat-arr')).toBeInTheDocument()
    expect(screen.getByTestId('stat-replies')).toBeInTheDocument()
    expect(screen.getByTestId('stat-tam')).toBeInTheDocument()
    expect(screen.getByText('+$240K')).toBeInTheDocument()
    expect(screen.getByText('400+')).toBeInTheDocument()
    expect(screen.getByText('200K')).toBeInTheDocument()
  })

  it('renders video testimonial placeholder', () => {
    render(<ProofAuthority />)
    expect(screen.getByTestId('video-testimonial')).toBeInTheDocument()
  })

  it('renders logo marquee', () => {
    render(<ProofAuthority />)
    expect(screen.getByTestId('logo-marquee')).toBeInTheDocument()
  })

  it('displays CRM logos with grayscale', () => {
    render(<ProofAuthority />)
    // Multiple logos exist due to marquee duplication for infinite scroll
    const hubspotLogos = screen.getAllByTestId('logo-hubspot')
    expect(hubspotLogos.length).toBeGreaterThan(0)
    expect(hubspotLogos[0]).toHaveClass('grayscale')
  })
})

describe('FAQ Section', () => {
  it('renders the section', () => {
    render(<FAQ />)
    expect(screen.getByTestId('faq-section')).toBeInTheDocument()
  })

  it('renders 4 FAQ items', () => {
    render(<FAQ />)
    expect(screen.getByTestId('faq-item-domain-safety')).toBeInTheDocument()
    expect(screen.getByTestId('faq-item-qualified-meeting')).toBeInTheDocument()
    expect(screen.getByTestId('faq-item-what-needed')).toBeInTheDocument()
    expect(screen.getByTestId('faq-item-qualification')).toBeInTheDocument()
  })

  it('displays all questions', () => {
    render(<FAQ />)
    expect(screen.getByText('How do you protect my domain and sender reputation?')).toBeInTheDocument()
    expect(screen.getByText('What counts as a "qualified" meeting?')).toBeInTheDocument()
    expect(screen.getByText('What is needed from me to start?')).toBeInTheDocument()
    expect(screen.getByText('Do you have any qualification criteria?')).toBeInTheDocument()
  })

  it('accordion items have correct structure', () => {
    render(<FAQ />)
    const item = screen.getByTestId('faq-item-domain-safety')
    expect(item).toHaveClass('border')
    expect(item).toHaveClass('rounded-card')
  })
})

describe('CTA Section', () => {
  it('renders the section', () => {
    render(<CTA />)
    expect(screen.getByTestId('cta-section')).toBeInTheDocument()
  })

  it('displays CTA heading', () => {
    render(<CTA />)
    expect(screen.getByText('Ready to Book More Sales Calls?')).toBeInTheDocument()
  })

  it('renders CTA button with shimmer variant', () => {
    render(<CTA />)
    const button = screen.getByRole('button', { name: /Let's Book You Sales Calls/i })
    expect(button).toBeInTheDocument()
  })
})

describe('Footer', () => {
  it('renders the footer', () => {
    render(<Footer />)
    expect(screen.getByTestId('footer')).toBeInTheDocument()
  })

  it('displays copyright with current year', () => {
    render(<Footer />)
    const year = new Date().getFullYear()
    expect(screen.getByText(new RegExp(String(year)))).toBeInTheDocument()
  })

  it('renders privacy and terms links', () => {
    render(<Footer />)
    expect(screen.getByText('Privacy Policy')).toBeInTheDocument()
    expect(screen.getByText('Terms of Service')).toBeInTheDocument()
  })
})

describe('Full Page Integration', () => {
  it('all sections can render together without errors', () => {
    render(
      <>
        <BentoGrid />
        <Matrix />
        <RiskReversal />
        <ExpansionServices />
        <ProofAuthority />
        <FAQ />
        <CTA />
        <Footer />
      </>
    )

    // Verify all sections are present
    expect(screen.getByTestId('bento-grid-section')).toBeInTheDocument()
    expect(screen.getByTestId('matrix-section')).toBeInTheDocument()
    expect(screen.getByTestId('risk-reversal-section')).toBeInTheDocument()
    expect(screen.getByTestId('expansion-services-section')).toBeInTheDocument()
    expect(screen.getByTestId('proof-authority-section')).toBeInTheDocument()
    expect(screen.getByTestId('faq-section')).toBeInTheDocument()
    expect(screen.getByTestId('cta-section')).toBeInTheDocument()
    expect(screen.getByTestId('footer')).toBeInTheDocument()
  })
})
