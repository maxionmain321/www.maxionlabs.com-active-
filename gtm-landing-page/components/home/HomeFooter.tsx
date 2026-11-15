import { GUIDE_LINKS } from '@/lib/guide-links'

/** Homepage footer. Server-rendered. The registered-entity line matches components/sections/Footer.tsx. */
export function HomeFooter() {
  const year = new Date().getFullYear()
  return (
    <footer data-testid="home-footer" className="border-t border-border bg-white">
      <div className="max-w-container mx-auto px-6 lg:px-12 py-12 flex flex-col gap-6">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
          <div className="flex flex-col gap-2 max-w-md">
            <span className="text-lg font-bold text-text-primary">Maxionlabs</span>
            <p className="text-sm text-text-secondary leading-relaxed">
              First meetings for independent commercial insurance agencies. Qualified on premium,
              renewal date and line, booked on your producers&apos; calendars.
            </p>
            <p className="text-xs text-text-secondary">
              Registered in Ukraine, Vinytska 15, Kiev, 08130. Payments processed through Stripe.
            </p>
          </div>
          <nav aria-label="Guides" data-testid="footer-guides" className="flex flex-col gap-2 text-sm">
            <span className="text-xs font-semibold uppercase tracking-wide text-text-primary">Guides</span>
            {GUIDE_LINKS.map((g) => (
              <a key={g.path} href={g.path} className="text-text-secondary hover:text-text-primary">
                {g.label}
              </a>
            ))}
          </nav>
          <nav aria-label="Footer" className="flex flex-col gap-2 text-sm">
            <a href="https://landscaping.maxionlabs.com" className="text-text-secondary hover:text-text-primary">
              Landscaping
            </a>
            <a href="/roi" className="text-text-secondary hover:text-text-primary">
              ROI calculator
            </a>
            <a href="mailto:maksym@maxionlabs.com" className="text-text-secondary hover:text-text-primary">
              maksym@maxionlabs.com
            </a>
            <a
              href="https://www.linkedin.com/in/maxpidvalnyi"
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-secondary hover:text-text-primary"
            >
              LinkedIn
            </a>
          </nav>
        </div>
        <div className="text-xs text-text-secondary">&copy; {year} Maxionlabs. All rights reserved.</div>
      </div>
    </footer>
  )
}

export default HomeFooter
