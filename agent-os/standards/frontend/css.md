## CSS best practices

- **Consistent Methodology**: Apply and stick to the project's consistent CSS methodology (Tailwind, BEM, utility classes, CSS modules, etc.) across the entire project
- **Avoid Overriding Framework Styles**: Work with your framework's patterns rather than fighting against them with excessive overrides
- **Maintain Design System**: Establish and document design tokens (colors, spacing, typography) for consistency
- **Minimize Custom CSS**: Leverage framework utilities and components to reduce custom CSS maintenance burden
- **Performance Considerations**: Optimize for production with CSS purging/tree-shaking to remove unused styles

## Project-Specific Design Tokens

### Color Palette (Linear/Vercel Aesthetic)
- **Background:** Pure black `#000000` or `bg-black`
- **Borders:** Subtle slate `#1F1F1F` or custom `border-[#1F1F1F]`
- **Primary Accent:** Indigo Glow `#5E5CE6` for focus states, CTAs, and highlights
- **Text:** High contrast white/gray scale for readability

### Typography
- **Font Family:** Geist Sans (primary) or Inter (fallback)
- **Headers:** High letter-spacing for clinical, modern look
- **Body:** Clean, readable tracking

### Visual Effects
- **Glassmorphism:** Use backdrop-blur with subtle transparency for overlays
- **Glows:** Subtle pulsing border glows using Indigo accent color
- **Animations:** Scroll-reveal animations via Framer Motion, smooth transitions
- **Hover States:** Subtle scale transforms, glow intensification

### Layout Patterns
- **Bento Grids:** Card-based layouts with subtle borders
- **50/50 Splits:** Hero sections with equal visual weight
- **Spacing:** Generous white space for premium feel
