# Specification: GTM Systems "War Machine" Landing Page

## Goal
Build a high-converting, Linear.app/Vercel-aesthetic landing page for GTM Systems that showcases outbound infrastructure services with a bold risk-reversal guarantee, using Next.js 15, Tailwind CSS, Shadcn/UI, and Framer Motion.

## User Stories
- As a SaaS founder or agency owner, I want to understand the GTM Systems offering quickly so that I can determine if it solves my outbound lead generation problems.
- As a prospective client, I want to see proof of results and risk guarantees so that I feel confident booking a sales call.

## Specific Requirements

**Tech Stack & Project Setup**
- Next.js 15 with App Router (`/app` directory structure)
- Tailwind CSS v3.4+ with custom theme configuration
- Shadcn/UI components (Accordion, Button, Card primitives)
- Framer Motion for animations and scroll-triggered reveals
- Geist Sans as primary font (fallback: Inter)
- TypeScript for type safety

**Design System Tokens**
- Background: `#000000` (pure black)
- Border/Slate: `#1F1F1F` (subtle dividers and card borders)
- Accent/Indigo Glow: `#5E5CE6` (CTAs, focus states, hover effects)
- Text Primary: `#FAFAFA` (white with slight warmth)
- Text Secondary: `#A1A1AA` (muted gray for subtext)
- Spacing scale: 4px base (4, 8, 12, 16, 24, 32, 48, 64, 96)
- Border radius: `8px` for cards, `6px` for buttons, `4px` for small elements

**Hero Section (50/50 Split)**
- Left column: H1 headline, sub-headline paragraph, shimmering CTA button
- Right column: 16:9 VSL player container with pulsing indigo border glow
- VSL player uses glassmorphism overlay with centered play icon
- Shimmering button effect via CSS gradient animation on hover
- Mobile: Stack vertically, video player below headline

**Bento Grid (Deliverable Stack)**
- 7 cards in asymmetric bento layout (2 large, 5 medium)
- Each card has icon, title, and 1-2 line description
- Scroll-reveal animation using Framer Motion `whileInView`
- Cards have subtle border glow on hover transitioning to indigo
- Stagger animation delay of 100ms between cards

**9-Cell Matrix Visualizer**
- 3x3 CSS Grid with equal cell sizing
- Default state: cells show number and subtle border
- Hover state: cell lights up with indigo glow, reveals tooltip with angle data
- Example data: "Cell 4: CEO + Operational Efficiency Hook"
- Smooth transition (200ms) for hover effects

**Risk Reversal Section**
- 3 cards in horizontal row (stack on mobile)
- Card 1: "7-Day Sprint" - $500 cashback guarantee icon and text
- Card 2: "30-Day Milestone" - 100% refund guarantee
- Card 3: "Infrastructure Ownership" - $4,000/mo cost absorption
- Each card has prominent guarantee badge/icon at top

**Expansion Services Section**
- 2 equal-width cards side by side
- Card 1: TAM Mapping with data/chart icon
- Card 2: Bespoke GTM Engineering with Clay certification mention
- Subtle gradient overlay on hover

**Proof & Authority Section**
- Case study stats block: +$240K ARR, 400+ replies, 200k TAM leads
- Video testimonial embed area (YouTube iframe placeholder with thumbnail)
- Horizontal scrolling logo marquee (infinite CSS animation)
- CRM logos: HubSpot, Salesforce, Pipedrive, Attio, GHL (grayscale filter)

**FAQ Accordion**
- Shadcn/UI Accordion component with custom styling
- Questions: Domain Safety, Definition of "Qualified," Post-Sprint Scaling
- Indigo left border accent on expanded state
- Smooth height animation on expand/collapse

**Animation Specifications**
- Page load: Fade-in from bottom (y: 20px to 0) over 600ms
- Scroll reveal: `whileInView` with 0.2 threshold, once: true
- Hover transitions: 200ms ease-out for all interactive elements
- VSL border pulse: CSS keyframe animation, 2s infinite
- Logo marquee: CSS translateX animation, 30s linear infinite

**Responsive Breakpoints**
- Mobile: 0-639px (single column, stacked layout)
- Tablet: 640-1023px (2-column grid where applicable)
- Desktop: 1024px+ (full layout with 50/50 hero split)
- Max content width: 1280px with horizontal padding 24px (mobile) / 48px (desktop)

**Accessibility Requirements**
- All interactive elements keyboard accessible with visible focus rings
- Color contrast ratio minimum 4.5:1 for body text
- Video player controls accessible via keyboard
- Accordion fully accessible with ARIA attributes (Shadcn handles this)
- Reduced motion media query support for animations

## Visual Design
No visual mockups provided. Implementation should follow Linear.app and Vercel design patterns:
- Clean, minimal aesthetic with generous whitespace
- Subtle depth through borders rather than shadows
- Accent color used sparingly for CTAs and interactive states
- Typography hierarchy through size and weight, not color variation

## Existing Code to Leverage

**No existing codebase found**
- This is a greenfield project
- Use Shadcn/UI CLI to scaffold components (`npx shadcn@latest init`)
- Follow Next.js 15 App Router conventions for file structure
- Reference Shadcn/UI documentation for component primitives

## Out of Scope
- User authentication or login functionality
- Backend API or database integration
- Payment processing or checkout flow
- Blog or content management system
- Multi-page navigation (single landing page only)
- Contact form with email delivery (CTA links to external booking)
- Analytics implementation (can be added post-launch)
- A/B testing infrastructure
- Internationalization or multiple languages
- Dark/light mode toggle (dark mode only)
