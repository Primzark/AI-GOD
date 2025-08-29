# Joyful Vibe — Design Notes

## Visual Language
- Primary: `#4F46E5` (Indigo 600). Accent: `#22C55E` (Emerald 500).
- Neutrals: slate/stone palette with subtle glassmorphism accents.
- Typography: Inter (headings semibold, body regular). Generous line height.
- Spacing: 8px scale; sections 80–120px vertical rhythm.
- Cards: rounded-2xl, soft shadows, 1px hairline borders, hover lift.
- Motion: 150–250ms ease; parallax/blur on hero; respects reduced motion.
- Themes: light/dark via CSS variables; persists preference.

## Accessibility
- Semantic HTML; headings outline; landmark roles.
- High-contrast defaults; visible focus rings; skip links; keyboard nav.
- ARIA on interactive components (accordion, menu, modal).
- i18n: English + Korean placeholders; RTL-safe styles.

## UX Patterns
- Sticky navbar with scroll shadow.
- Minimalist hero with clear USP and CTAs.
- Feature grid cards; testimonials; pricing tiers.
- Blog with tags, search, TOC, code blocks.
- Forms with client/server validation; clear error states.
- Smooth transitions (Framer Motion) and skeleton loaders.

## Components
- NavBar with MegaMenu, ThemeToggle, LocaleSwitcher.
- Hero, FeatureCard, Testimonial, PricingTable, Stats, FAQ accordion.
- Newsletter signup, Footer with sitemap & social icons.
- Toast/Alert, Modal/Drawer, Skeleton, EmptyState, ErrorBoundary.
- Pagination, Breadcrumbs.

## Performance
- Preconnect for fonts, lazy-load images, responsive sources.
- Lighthouse targets ≥95 on Performance/Best Practices/SEO.
- AXE clean.

## Notes
- Dark mode is system-aware and persisted via localStorage.
- Route transitions and micro-interactions are subtle and fast.
- Admin screens use optimistic updates and toasts for CRUD.
