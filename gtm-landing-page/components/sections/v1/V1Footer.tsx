'use client'

/**
 * V1 Footer Component
 *
 * Minimal footer with copyright and email
 */
export function V1Footer() {
  return (
    <footer className="bg-background border-t border-border py-8">
      <div className="max-w-container mx-auto px-6 lg:px-12 text-center text-text-secondary text-sm">
        © 2026 Maxionlabs · maksym@maxionlabs.com<br />
        <span className="text-xs">Registered in Ukraine, Vinytska 15, Kiev, 08130. Payments processed through Stripe.</span>
      </div>
    </footer>
  )
}
