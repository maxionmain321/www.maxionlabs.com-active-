# Task Breakdown: GTM Systems "War Machine" Landing Page

## Overview
Total Tasks: 62
Tech Stack: Next.js 15 (App Router), Tailwind CSS v3.4+, Shadcn/UI, Framer Motion, TypeScript

## Task List

### Project Foundation

#### Task Group 1: Project Setup & Configuration
**Dependencies:** None

- [x] 1.0 Complete project foundation setup
  - [x] 1.1 Initialize Next.js 15 project with App Router
    - Use `npx create-next-app@latest` with TypeScript enabled
    - Select App Router (`/app` directory structure)
    - Enable ESLint and Tailwind CSS during setup
  - [x] 1.2 Configure Tailwind CSS with custom theme
    - Set background color: `#000000`
    - Set border/slate color: `#1F1F1F`
    - Set accent/indigo glow: `#5E5CE6`
    - Set text primary: `#FAFAFA`
    - Set text secondary: `#A1A1AA`
    - Configure spacing scale: 4, 8, 12, 16, 24, 32, 48, 64, 96
    - Set border radius tokens: 8px (cards), 6px (buttons), 4px (small)
  - [x] 1.3 Install and configure Geist Sans font
    - Add Geist Sans as primary font
    - Configure Inter as fallback font
    - Set up font variables in layout.tsx
  - [x] 1.4 Initialize Shadcn/UI
    - Run `npx shadcn@latest init`
    - Configure dark mode as default
    - Set up component aliases
  - [x] 1.5 Install Framer Motion
    - Add framer-motion package
    - Create animation utilities file with reusable variants
  - [x] 1.6 Set up project folder structure
    - Create `/app` with page.tsx and layout.tsx
    - Create `/components/ui` for Shadcn components
    - Create `/components/sections` for page sections
    - Create `/lib` for utilities
    - Create `/styles` for global CSS

**Acceptance Criteria:**
- Next.js 15 project runs with `npm run dev`
- Tailwind CSS compiles with custom theme tokens
- Geist Sans font loads correctly
- Shadcn/UI initialized and ready for component installation
- Framer Motion available for import

---

### Design System Layer

#### Task Group 2: Design System & Reusable Components
**Dependencies:** Task Group 1

- [x] 2.0 Complete design system foundation
  - [x] 2.1 Write 4-6 focused tests for design system components
    - Test Button component renders with correct styles
    - Test Button shimmer animation activates on hover
    - Test Card component applies correct border styles
    - Test focus ring visibility on interactive elements
    - Test color contrast meets accessibility requirements
  - [x] 2.2 Install required Shadcn/UI components
    - Install Accordion component (`npx shadcn@latest add accordion`)
    - Install Button component (`npx shadcn@latest add button`)
    - Install Card component (`npx shadcn@latest add card`)
  - [x] 2.3 Create custom Button variant with shimmer effect
    - Add primary button with indigo glow background
    - Implement CSS gradient animation for shimmer on hover
    - Add visible focus ring with indigo outline
    - Ensure 200ms ease-out transition
  - [x] 2.4 Create Card component with glow border hover
    - Base state: `#1F1F1F` border
    - Hover state: indigo glow border transition
    - 8px border radius
    - 200ms transition duration
  - [x] 2.5 Create reusable animation variants
    - Fade-in-up variant (y: 20px to 0, 600ms)
    - Scroll reveal variant (whileInView, threshold 0.2, once: true)
    - Stagger children variant (100ms delay between items)
  - [x] 2.6 Implement reduced motion support
    - Add `prefers-reduced-motion` media query
    - Disable animations when reduced motion is preferred
    - Ensure all functionality works without animations
  - [x] 2.7 Run design system tests
    - Execute tests from 2.1
    - Verify all component variants render correctly

**Acceptance Criteria:**
- Tests from 2.1 pass
- Button shimmer effect animates smoothly
- Card hover glow transitions correctly
- Animation variants are reusable across components
- Reduced motion preference is respected

---

### Hero Section

#### Task Group 3: Hero Section Implementation
**Dependencies:** Task Group 2

- [x] 3.0 Complete Hero section
  - [x] 3.1 Write 4-6 focused tests for Hero section
    - Test 50/50 split layout renders correctly on desktop
    - Test vertical stack layout on mobile (<640px)
    - Test CTA button is keyboard accessible
    - Test VSL player container has correct aspect ratio
    - Test heading hierarchy (H1 present)
  - [x] 3.2 Create Hero section layout component
    - Implement 50/50 split grid for desktop (1024px+)
    - Implement stacked layout for mobile/tablet
    - Add max-width container (1280px)
    - Apply horizontal padding (24px mobile, 48px desktop)
  - [x] 3.3 Build Hero left column content
    - H1: "GTM Systems for Agencies & SaaS."
    - Sub-headline paragraph with secondary text color
    - CTA button: "Let's Book You Sales Calls" with shimmer effect
    - Apply fade-in-up animation on page load
  - [x] 3.4 Build VSL player container
    - 16:9 aspect ratio container
    - Glassmorphism overlay with backdrop blur
    - Centered play icon button
    - Pulsing indigo border glow (CSS keyframe, 2s infinite)
  - [x] 3.5 Implement VSL player interactions
    - Play icon is keyboard focusable
    - Visible focus ring on play button
    - Placeholder for YouTube embed or video source
  - [x] 3.6 Run Hero section tests
    - Execute tests from 3.1
    - Verify responsive behavior at all breakpoints

**Acceptance Criteria:**
- Tests from 3.1 pass
- Hero displays correctly at all breakpoints
- VSL player has animated border glow
- CTA button shimmer works on hover
- All elements keyboard accessible

---

### Bento Grid Section

#### Task Group 4: Deliverable Stack Bento Grid
**Dependencies:** Task Group 2

- [ ] 4.0 Complete Bento Grid section
  - [ ] 4.1 Write 4-6 focused tests for Bento Grid
    - Test 7 cards render with correct content
    - Test asymmetric grid layout (2 large, 5 medium)
    - Test scroll-reveal animation triggers
    - Test card hover state applies glow border
    - Test stagger animation delay between cards
  - [ ] 4.2 Create Bento Grid container layout
    - CSS Grid with asymmetric positioning
    - 2 large cards (span 2 columns or rows)
    - 5 medium cards (single cell)
    - Responsive: stack to single column on mobile
  - [ ] 4.3 Create BentoCard component
    - Icon slot at top
    - Title with primary text color
    - Description with secondary text color (1-2 lines)
    - Hover glow border transition
  - [ ] 4.4 Implement card content for all 7 deliverables
    - Card 1: Genesis Strategy Blueprint
    - Card 2: Day 3 Priority Lane
    - Card 3: 9-Cell Validation Matrix
    - Card 4: Ghost-Proof Nurture
    - Card 5: Outbound-to-Close Sales Toolkit
    - Card 6: Brand-Safety Firewall
    - Card 7: Managed Revenue Utility
  - [ ] 4.5 Add scroll-reveal animations
    - Framer Motion `whileInView` with 0.2 threshold
    - `once: true` to animate only on first view
    - Stagger delay of 100ms between cards
  - [ ] 4.6 Run Bento Grid tests
    - Execute tests from 4.1
    - Verify animations trigger correctly on scroll

**Acceptance Criteria:**
- Tests from 4.1 pass
- Grid layout is asymmetric with correct card sizes
- All 7 deliverable cards display content
- Scroll animations stagger correctly
- Hover effects work on all cards

---

### 9-Cell Matrix Section

#### Task Group 5: 9-Cell Matrix Visualizer
**Dependencies:** Task Group 2

- [ ] 5.0 Complete 9-Cell Matrix section
  - [ ] 5.1 Write 4-6 focused tests for Matrix
    - Test 3x3 grid renders with 9 cells
    - Test default cell state shows number and border
    - Test hover state applies indigo glow
    - Test tooltip reveals angle data on hover
    - Test keyboard navigation between cells
  - [ ] 5.2 Create 3x3 CSS Grid container
    - Equal cell sizing
    - Gap between cells using spacing scale
    - Centered within section
    - Responsive sizing for mobile
  - [ ] 5.3 Build MatrixCell component
    - Default state: number label, subtle `#1F1F1F` border
    - Hover state: indigo glow, scale slight up
    - 200ms transition for hover effects
    - Focus ring for keyboard users
  - [ ] 5.4 Implement tooltip with angle data
    - Tooltip appears on hover/focus
    - Example: "Cell 4: CEO + Operational Efficiency Hook"
    - Tooltip positioned above cell
    - Smooth fade-in transition
  - [ ] 5.5 Add cell data content
    - Populate all 9 cells with appropriate angle data
    - Each cell has unique ICP + Hook combination
  - [ ] 5.6 Run Matrix section tests
    - Execute tests from 5.1
    - Verify hover and focus states work correctly

**Acceptance Criteria:**
- Tests from 5.1 pass
- 3x3 grid displays correctly
- Hover reveals tooltip with angle data
- All cells keyboard accessible
- Smooth transitions on all interactions

---

### Risk Reversal Section

#### Task Group 6: Risk Mitigation Cards
**Dependencies:** Task Group 2

- [ ] 6.0 Complete Risk Reversal section
  - [ ] 6.1 Write 3-5 focused tests for Risk Reversal
    - Test 3 cards render in horizontal row on desktop
    - Test cards stack vertically on mobile
    - Test each card has guarantee badge/icon
    - Test card content matches spec requirements
  - [ ] 6.2 Create Risk Reversal section layout
    - 3-column grid for desktop
    - Single column stack for mobile
    - Section heading with primary text
  - [ ] 6.3 Build RiskCard component
    - Prominent guarantee badge/icon at top
    - Title with primary text
    - Description text with secondary color
    - Card styling consistent with design system
  - [ ] 6.4 Implement 3 risk reversal cards
    - Card 1: "7-Day Sprint" - $500 cashback guarantee
    - Card 2: "30-Day Milestone" - 100% refund guarantee
    - Card 3: "Infrastructure Ownership" - $4,000/mo absorption
  - [ ] 6.5 Add scroll-reveal animations
    - Stagger animation for 3 cards
    - Consistent with other section animations
  - [ ] 6.6 Run Risk Reversal tests
    - Execute tests from 6.1
    - Verify responsive layout transitions

**Acceptance Criteria:**
- Tests from 6.1 pass
- 3 cards display with correct content
- Cards stack on mobile, row on desktop
- Guarantee badges prominent and visible

---

### Expansion Services Section

#### Task Group 7: Expansion Services Cards
**Dependencies:** Task Group 2

- [ ] 7.0 Complete Expansion Services section
  - [ ] 7.1 Write 3-4 focused tests for Expansion Services
    - Test 2 cards render side by side on desktop
    - Test cards stack on mobile
    - Test hover gradient overlay appears
    - Test card content matches spec
  - [ ] 7.2 Create Expansion Services layout
    - 2-column equal-width grid
    - Stack vertically on mobile
    - Section heading
  - [ ] 7.3 Build ExpansionCard component
    - Icon slot for data/chart icon
    - Title and description
    - Subtle gradient overlay on hover
  - [ ] 7.4 Implement 2 expansion cards
    - Card 1: TAM Mapping with data icon
    - Card 2: Bespoke GTM Engineering with Clay certification mention
  - [ ] 7.5 Run Expansion Services tests
    - Execute tests from 7.1
    - Verify hover effects work correctly

**Acceptance Criteria:**
- Tests from 7.1 pass
- 2 cards display side by side on desktop
- Hover gradient overlay transitions smoothly
- Card content matches requirements

---

### Proof & Authority Section

#### Task Group 8: Social Proof & Testimonials
**Dependencies:** Task Group 2

- [ ] 8.0 Complete Proof & Authority section
  - [ ] 8.1 Write 4-6 focused tests for Proof section
    - Test case study stats display correctly
    - Test YouTube placeholder renders
    - Test logo marquee animates
    - Test logos have grayscale filter
    - Test marquee animation respects reduced motion
  - [ ] 8.2 Build case study stats block
    - Stat 1: +$240K ARR
    - Stat 2: 400+ replies
    - Stat 3: 200k TAM leads
    - Large typography for numbers
    - Labels below each stat
  - [ ] 8.3 Create video testimonial embed area
    - YouTube iframe placeholder
    - Thumbnail preview image area
    - Placeholder for Kidous Mahteme testimonial
    - Accessible video controls
  - [ ] 8.4 Build horizontal scrolling logo marquee
    - Infinite CSS translateX animation (30s linear)
    - CRM logos: HubSpot, Salesforce, Pipedrive, Attio, GHL
    - Grayscale filter on all logos
    - Pause animation on hover (optional enhancement)
  - [ ] 8.5 Implement reduced motion for marquee
    - Static logo row when reduced motion preferred
    - No animation, just centered logos
  - [ ] 8.6 Run Proof section tests
    - Execute tests from 8.1
    - Verify marquee animation runs smoothly

**Acceptance Criteria:**
- Tests from 8.1 pass
- Stats display with prominent typography
- Video placeholder ready for YouTube URL
- Logo marquee scrolls infinitely
- Grayscale filter applied to logos

---

### FAQ Section

#### Task Group 9: FAQ Accordion
**Dependencies:** Task Group 2

- [ ] 9.0 Complete FAQ Accordion section
  - [ ] 9.1 Write 3-5 focused tests for FAQ
    - Test 3 FAQ items render
    - Test accordion expands/collapses on click
    - Test keyboard navigation (Enter/Space to toggle)
    - Test indigo border accent on expanded state
    - Test ARIA attributes present
  - [ ] 9.2 Style Shadcn/UI Accordion component
    - Custom styling for dark theme
    - Indigo left border accent on expanded item
    - Smooth height animation on expand/collapse
    - Text colors match design system
  - [ ] 9.3 Implement FAQ content
    - Question 1: Domain Safety explanation
    - Question 2: Definition of "Qualified" meeting
    - Question 3: Post-Sprint Scaling process
  - [ ] 9.4 Ensure full accessibility
    - Verify ARIA attributes (Shadcn provides these)
    - Test keyboard navigation
    - Ensure focus states visible
  - [ ] 9.5 Run FAQ section tests
    - Execute tests from 9.1
    - Verify all interactions work correctly

**Acceptance Criteria:**
- Tests from 9.1 pass
- Accordion expands/collapses smoothly
- Indigo border shows on expanded state
- Fully keyboard accessible
- ARIA attributes properly applied

---

### Page Assembly & Layout

#### Task Group 10: Page Assembly & Global Layout
**Dependencies:** Task Groups 3-9

- [ ] 10.0 Complete page assembly
  - [ ] 10.1 Create main page layout in app/page.tsx
    - Import all section components
    - Order sections per spec structure
    - Apply consistent section spacing (64px or 96px)
  - [ ] 10.2 Implement global layout in app/layout.tsx
    - Apply Geist Sans font globally
    - Set background color to pure black
    - Add meta tags for SEO basics
    - Configure viewport for responsive
  - [ ] 10.3 Add page-level animations
    - Fade-in-up on page load (600ms)
    - Ensure smooth scroll behavior
  - [ ] 10.4 Add sticky/fixed CTA (optional enhancement)
    - Mobile: fixed bottom CTA button
    - Appears after scrolling past hero
  - [ ] 10.5 Verify section flow and spacing
    - Check vertical rhythm between sections
    - Ensure consistent max-width containers
    - Verify padding at all breakpoints

**Acceptance Criteria:**
- All sections render in correct order
- Page layout is consistent and polished
- Global styles apply correctly
- Page load animation works

---

### Testing & Quality Assurance

#### Task Group 11: Test Review & Gap Analysis
**Dependencies:** Task Groups 1-10

- [ ] 11.0 Review existing tests and fill critical gaps
  - [ ] 11.1 Review tests from Task Groups 2-9
    - Review design system tests (Task 2.1)
    - Review Hero section tests (Task 3.1)
    - Review Bento Grid tests (Task 4.1)
    - Review Matrix tests (Task 5.1)
    - Review Risk Reversal tests (Task 6.1)
    - Review Expansion tests (Task 7.1)
    - Review Proof section tests (Task 8.1)
    - Review FAQ tests (Task 9.1)
    - Approximate total: 28-42 tests
  - [ ] 11.2 Analyze test coverage gaps for landing page
    - Identify critical user workflows lacking coverage
    - Focus on end-to-end page functionality
    - Check responsive behavior coverage
    - Verify accessibility test coverage
  - [ ] 11.3 Write up to 10 additional strategic tests
    - Full page render test at each breakpoint
    - End-to-end scroll interaction test
    - CTA click tracking test (navigation)
    - Cross-browser compatibility checks (if applicable)
    - Accessibility audit test (axe-core or similar)
  - [ ] 11.4 Run all landing page tests
    - Execute all tests from previous task groups
    - Run additional tests from 11.3
    - Expected total: 38-52 tests
    - Document any failures and fix

**Acceptance Criteria:**
- All feature-specific tests pass
- Critical user workflows covered
- Responsive layouts verified at all breakpoints
- Accessibility requirements validated
- No more than 10 additional tests added

---

### Accessibility & Polish

#### Task Group 12: Accessibility Audit & Final Polish
**Dependencies:** Task Group 11

- [ ] 12.0 Complete accessibility and polish
  - [ ] 12.1 Run accessibility audit
    - Use axe-core or Lighthouse accessibility audit
    - Check color contrast ratio (minimum 4.5:1)
    - Verify all interactive elements keyboard accessible
    - Check focus ring visibility
  - [ ] 12.2 Fix accessibility issues
    - Address any contrast failures
    - Add missing ARIA labels if needed
    - Ensure skip navigation if appropriate
    - Verify heading hierarchy (single H1)
  - [ ] 12.3 Verify responsive design at all breakpoints
    - Mobile: 320px, 375px, 414px
    - Tablet: 768px, 1024px
    - Desktop: 1280px, 1440px, 1920px
    - Check touch targets (minimum 44x44px on mobile)
  - [ ] 12.4 Performance optimization
    - Optimize images (if any added)
    - Ensure fonts load efficiently
    - Check Lighthouse performance score
    - Lazy load below-fold sections if needed
  - [ ] 12.5 Cross-browser testing
    - Test in Chrome, Firefox, Safari, Edge
    - Verify animations work consistently
    - Check CSS compatibility
  - [ ] 12.6 Final visual polish
    - Review spacing consistency
    - Verify animation timing feels smooth
    - Check hover states on all interactive elements
    - Ensure design matches Linear/Vercel aesthetic

**Acceptance Criteria:**
- Lighthouse accessibility score 90+
- All color contrasts meet WCAG 2.1 AA
- Responsive at all target breakpoints
- Consistent experience across browsers
- Visual polish matches spec aesthetic

---

## Execution Order

Recommended implementation sequence:

1. **Project Foundation** (Task Group 1) - Setup and configuration
2. **Design System** (Task Group 2) - Reusable components and tokens
3. **Hero Section** (Task Group 3) - Primary page entry point
4. **Bento Grid** (Task Group 4) - Deliverable showcase
5. **9-Cell Matrix** (Task Group 5) - Interactive visualizer
6. **Risk Reversal** (Task Group 6) - Trust building section
7. **Expansion Services** (Task Group 7) - Additional offerings
8. **Proof & Authority** (Task Group 8) - Social proof
9. **FAQ Accordion** (Task Group 9) - Objection handling
10. **Page Assembly** (Task Group 10) - Combine all sections
11. **Test Review** (Task Group 11) - Quality assurance
12. **Accessibility & Polish** (Task Group 12) - Final refinements

---

## Notes

- **Greenfield Project:** No existing code to leverage; start fresh with recommended scaffolding
- **Single Page:** This is a single landing page, no routing complexity
- **External Booking:** CTA links to external booking tool (no form implementation needed)
- **Dark Mode Only:** No theme toggle required; pure black background throughout
- **Animation Library:** Framer Motion for all JavaScript-based animations; CSS keyframes for continuous effects (pulse, marquee)
