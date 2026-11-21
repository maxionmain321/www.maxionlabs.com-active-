/**
 * Footer "Guides" links. Kept separate from lib/site-pages.ts because the answer content files import the
 * homepage, which renders the footer (a circular import). test/site-pages.test.tsx asserts this list matches
 * ANSWER_PAGES plus /pricing, so a new page cannot ship without a footer link.
 */
export const GUIDE_LINKS: { path: string; label: string }[] = [
  { path: '/pricing', label: 'Pricing and how it compares' },
  { path: '/commercial-insurance-appointment-setting', label: 'Commercial insurance appointment setting' },
  { path: '/hire-producer-or-book-meetings', label: 'Producer compensation, or more sales meetings?' },
  { path: '/commercial-insurance-leads', label: 'Are commercial insurance leads worth it?' },
  { path: '/why-insurance-agency-stopped-growing', label: 'Why an agency stops growing' },
  { path: '/abstrakt-alternative', label: 'Maxionlabs and Abstrakt compared' },
  { path: '/best-appointment-setting-companies-commercial-insurance', label: 'Appointment setting companies compared' },
]
