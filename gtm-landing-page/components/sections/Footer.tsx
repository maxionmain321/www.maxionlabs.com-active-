'use client'

import { Linkedin } from 'lucide-react'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer
      data-testid="footer"
      className="max-w-container mx-auto px-6 lg:px-12 py-8 border-t border-border"
    >
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-text-secondary text-sm">
          &copy; {currentYear} Maxionlabs. All rights reserved.
        </div>
        <div className="flex items-center gap-6">
          <nav className="flex items-center gap-6">
            <a
              href="#privacy"
              className="text-text-secondary text-sm hover:text-text-primary transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="#terms"
              className="text-text-secondary text-sm hover:text-text-primary transition-colors"
            >
              Terms of Service
            </a>
          </nav>
          <a
            href="https://www.linkedin.com/in/maxpidvalnyi"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-text-secondary hover:text-accent transition-colors"
          >
            <Linkedin className="w-5 h-5" />
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
