# PRD: Vibe Lab Page

## Overview

The Vibe Lab page is a dedicated showcase for design and code experiments -- a playground for exploring real problems that deserve better solutions. It represents Phase 6 of the portfolio website implementation, combining visual distinction (animated gradient text, glowing borders) with practical maintainability (easy-to-update experiment data structure).

**Timeline:** Week 5 (Feb 24 - Mar 2)
**Priority:** High
**Page Route:** `/vibe-lab`

---

## Goals and Objectives

### Primary Goals
1. Create a visually distinctive page that differentiates from the main portfolio
2. Showcase the "Mi Agenda Fiscal" experiment with compelling visual treatment
3. Establish an extensible data structure for future experiments
4. Implement polished micro-interactions (gradient text, glowing borders)

### Success Criteria
- Page loads with Lighthouse Performance score >= 95
- Animations respect `prefers-reduced-motion`
- Mobile-first responsive design across all breakpoints
- Data structure allows adding new experiments with zero code changes to components

---

## User Stories

### US-1: First-time Visitor
**As a** portfolio visitor,
**I want to** immediately understand what Vibe Lab is,
**So that** I can decide if the experiments are relevant to explore.

**Acceptance Criteria:**
- Hero section clearly communicates the purpose ("playground for design + code experiments")
- Animated gradient text draws attention without being distracting
- Page loads within 2.5 seconds on 3G connection

### US-2: Potential Client
**As a** potential client evaluating Rodrigo's skills,
**I want to** see live, working experiments,
**So that** I can assess his ability to ship functional products.

**Acceptance Criteria:**
- Live experiments are clearly marked with status badges
- "Launch Project" CTA navigates to the live app
- Key benefits are highlighted for each experiment

### US-3: Future Self (Maintainability)
**As** the portfolio owner,
**I want to** add new experiments without modifying component code,
**So that** I can keep the lab fresh with minimal effort.

**Acceptance Criteria:**
- Adding an experiment requires only editing `lib/data/experiments.ts`
- Component renders dynamically based on data file
- "Coming Soon" section appears when placeholder experiments exist

---

## Feature Requirements

### 1. Vibe Lab Hero Section

**Purpose:** Establish the page identity and communicate the lab's purpose.

#### 1.1 Animated Gradient Headline

**Content:**
- Headline: "Vibe Lab"
- Tagline: "A playground for design + code experiments."
- Description: "A space to explore real problems deserving better solutions. Prototype, test, and share small apps built with intuition, research, and vibe coding."

**Animation Specification:**

```css
/* Gradient text animation using CSS background-clip */
.gradient-text {
  --bg-size: 400%;
  background: linear-gradient(
    90deg,
    var(--color-primary-yellow),
    var(--color-orange-400),
    var(--color-accent-peach),
    var(--color-primary-yellow)
  ) 0 0 / var(--bg-size) 100%;
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  animation: gradient-flow 8s linear infinite;
}

@keyframes gradient-flow {
  to {
    background-position: var(--bg-size) 0;
  }
}

/* Accessibility: Disable for motion-sensitive users */
@media (prefers-reduced-motion: reduce) {
  .gradient-text {
    animation: none;
    background: var(--color-primary-yellow);
    -webkit-background-clip: text;
    background-clip: text;
  }
}
```

**Tailwind Configuration Addition:**

```typescript
// Add to tailwind.config.ts or globals.css @theme
animation: {
  'gradient-text': 'gradient-flow 8s linear infinite',
},
keyframes: {
  'gradient-flow': {
    to: { backgroundPosition: '400% center' },
  },
}
```

**Interaction:**
- Gradient flows continuously left-to-right
- Speed: 8 seconds per cycle (subtle, not distracting)
- On `prefers-reduced-motion: reduce`, show static gradient or solid color

#### 1.2 Hero Layout

- Background: `bg-dark-background` (dark theme default for lab aesthetic)
- Padding: `py-20 lg:py-28` with `container mx-auto px-6 lg:px-20`
- Text alignment: Left-aligned on desktop, center on mobile
- Staggered entrance animation using existing `staggerContainer` and `fadeUp` variants

---

### 2. Experiment Cards Section

**Purpose:** Showcase live and upcoming experiments with visual impact.

#### 2.1 Experiment Card Component

**Card Structure:**

```tsx
interface ExperimentCardProps {
  experiment: Experiment
}
```

**Visual Specifications:**

| Property | Value |
|----------|-------|
| Border radius | `rounded-2xl` (16px) |
| Background | `bg-dark-surface` (#141414) |
| Border | 1px with glowing animation |
| Padding | `p-6 lg:p-8` |
| Max width | `max-w-2xl` for single card, grid for multiple |

**Card Content Hierarchy:**
1. Status badge (top-left corner)
2. Category tag (e.g., "Web App", "Cost reduction")
3. Thumbnail image (16:9 aspect ratio)
4. Title
5. Description
6. Benefits list (checkmark icons)
7. Tags (tech stack)
8. CTA button(s)

#### 2.2 Glowing Border Animation

**CSS Implementation:**

```css
.experiment-card {
  position: relative;
  border-radius: 16px;
  padding: 2px; /* Creates space for the glowing border */
}

.experiment-card::before,
.experiment-card::after {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: linear-gradient(
    45deg,
    var(--color-primary-yellow),
    var(--color-orange-400),
    var(--color-accent-peach),
    var(--color-primary-yellow)
  );
  background-size: 300% 300%;
  z-index: -1;
  animation: glow-rotate 6s ease-in-out infinite;
}

.experiment-card::after {
  filter: blur(20px);
  opacity: 0.5;
  transform: translate3d(0, 0, 0); /* Safari fix */
}

.experiment-card .inner {
  background: var(--color-dark-surface);
  border-radius: inherit;
  padding: 24px;
}

@keyframes glow-rotate {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}

@media (prefers-reduced-motion: reduce) {
  .experiment-card::before,
  .experiment-card::after {
    animation: none;
    background-position: 50% 50%;
  }
}
```

**Tailwind Configuration Addition:**

```typescript
animation: {
  'glow': 'glow-rotate 6s ease-in-out infinite',
},
keyframes: {
  'glow-rotate': {
    '0%, 100%': { backgroundPosition: '0% 50%' },
    '50%': { backgroundPosition: '100% 50%' },
  },
}
```

**Hover Enhancement:**
- On hover: Increase glow blur from 20px to 30px
- Slight card lift: `translateY(-4px)` with `transition-transform duration-300`

#### 2.3 Status Badges

**Badge Variants:**

| Status | Background | Text | Dot Color |
|--------|------------|------|-----------|
| Live | `bg-green-500/20` | `text-green-400` | Pulsing green dot |
| In Progress | `bg-yellow-500/20` | `text-yellow-400` | Static yellow dot |
| Concept | `bg-blue-500/20` | `text-blue-400` | Static blue dot |

**Badge Component:**

```tsx
interface StatusBadgeProps {
  status: 'live' | 'in-progress' | 'concept'
}

// Pulsing dot for "Live" status
<span className="relative flex h-2 w-2">
  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
  <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
</span>
```

---

### 3. Mi Agenda Fiscal Experiment (Launch Content)

**This is the primary experiment at launch:**

#### 3.1 Content Specification

| Field | Value |
|-------|-------|
| ID | `mi-agenda-fiscal` |
| Title | Mi Agenda Fiscal |
| Status | `live` |
| Category | Web App |
| Subcategory | Cost reduction |
| URL | https://agendafiscal.rodrigoseoane.com/ |
| Thumbnail | `/images/experiments/mi-agenda-fiscal.png` (to be created) |

**Headline:**
> "Never miss a tax deadline again. Keep your tax obligations under control."

**Benefits (2 items max for clarity):**
1. **"Save valuable time"** -- Automates calendar and spreadsheet organization
2. **"Avoid fines & surcharges"** -- Protects finances

**Tags:** `['React', 'Tailwind CSS', 'Tax Planning']`

#### 3.2 Card CTA

- Primary: "Launch Project" -> External link to agendafiscal.rodrigoseoane.com
- Secondary: None for initial launch

---

### 4. Coming Soon Section

**Purpose:** Signal that more experiments are planned without leaving the page empty.

**Display Logic:**
- Show when: No experiments with `status: 'in-progress'` or `status: 'concept'` exist
- OR: Always show as a footer teaser

**Content:**
- Title: "More experiments brewing..."
- Description: "New projects are always in the works. Check back soon or follow on LinkedIn for updates."

**Visual Treatment:**
- Subtle glass-morphism card or dashed border outline
- Reduced opacity (60-70%)
- No glowing effect (contrast with live experiments)

---

### 5. Data Structure Specification

**File:** `lib/data/experiments.ts`

```typescript
export type ExperimentStatus = 'live' | 'in-progress' | 'concept'

export interface Experiment {
  /** Unique identifier for the experiment */
  id: string

  /** Display title */
  title: string

  /** One-line description (max 120 characters) */
  description: string

  /** Long-form headline for card */
  headline: string

  /** Current status */
  status: ExperimentStatus

  /** Category label (e.g., "Web App", "CLI Tool") */
  category: string

  /** Optional subcategory (e.g., "Cost reduction") */
  subcategory?: string

  /** Path to thumbnail image */
  thumbnail: string

  /** External URL to live project (required for status: 'live') */
  url?: string

  /** Key benefits (max 3) */
  benefits: {
    title: string
    description: string
  }[]

  /** Tech stack tags */
  tags: string[]

  /** Sort order (lower = higher priority) */
  order: number

  /** Featured flag for homepage teaser (future use) */
  featured: boolean
}

export const experiments: Experiment[] = [
  {
    id: 'mi-agenda-fiscal',
    title: 'Mi Agenda Fiscal',
    description: 'A tax deadline management app for Spanish freelancers.',
    headline: 'Never miss a tax deadline again. Keep your tax obligations under control.',
    status: 'live',
    category: 'Web App',
    subcategory: 'Cost reduction',
    thumbnail: '/images/experiments/mi-agenda-fiscal.png',
    url: 'https://agendafiscal.rodrigoseoane.com/',
    benefits: [
      {
        title: 'Save valuable time',
        description: 'Automates calendar and spreadsheet organization',
      },
      {
        title: 'Avoid fines & surcharges',
        description: 'Protects your finances by keeping deadlines visible',
      },
    ],
    tags: ['React', 'Tailwind CSS', 'Tax Planning'],
    order: 1,
    featured: true,
  },
]

// Helper functions
export function getLiveExperiments(): Experiment[] {
  return experiments
    .filter((e) => e.status === 'live')
    .sort((a, b) => a.order - b.order)
}

export function getUpcomingExperiments(): Experiment[] {
  return experiments
    .filter((e) => e.status === 'in-progress' || e.status === 'concept')
    .sort((a, b) => a.order - b.order)
}

export function getExperimentById(id: string): Experiment | undefined {
  return experiments.find((e) => e.id === id)
}
```

---

## Affected Codebase Files

### Files to Create

| Path | Description |
|------|-------------|
| `/app/vibe-lab/page.tsx` | Page component (replace placeholder) |
| `/components/sections/vibe-lab/VibeLabHero.tsx` | Hero section with gradient text |
| `/components/sections/vibe-lab/ExperimentCard.tsx` | Card component with glowing border |
| `/components/sections/vibe-lab/StatusBadge.tsx` | Status badge component |
| `/components/sections/vibe-lab/ComingSoonTeaser.tsx` | Coming soon placeholder |
| `/components/sections/vibe-lab/index.ts` | Barrel export |
| `/lib/data/experiments.ts` | Data file with Experiment interface |
| `/public/images/experiments/mi-agenda-fiscal.png` | Thumbnail image (needs creation) |

### Files to Modify

| Path | Changes Required |
|------|------------------|
| `/app/globals.css` | Add gradient-text and glow animations to `@theme` |
| `/lib/utils/animations.ts` | Add new animation variants if needed |

### Existing Components to Reuse

| Component | Location | Usage |
|-----------|----------|-------|
| `Badge` | `/components/ui/Badge.tsx` | Extend for status badge variant |
| `Card` | `/components/ui/Card.tsx` | Reference for card patterns |
| `Button` | `/components/ui/Button.tsx` | CTA buttons |
| `staggerContainer`, `fadeUp` | `/lib/utils/animations.ts` | Page entrance animations |
| `cn` | `/lib/utils/cn.ts` | Class name merging |

---

## Internal Implementation Patterns

### Pattern 1: Section Component Structure

**Source:** `/Users/rodrigo.seoane/local-sites/portfolio-2026/components/sections/insights/InsightsHero.tsx`

**Relevance:** Establishes the hero section pattern with stagger animations.

```tsx
'use client'

import { motion } from 'framer-motion'
import { staggerContainer, fadeUp } from '@/lib/utils/animations'

export function InsightsHero() {
  return (
    <div className="bg-primary-yellow py-16 lg:py-20">
      <div className="container mx-auto px-6 lg:px-20">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.h1 variants={fadeUp} className="...">
            Title
          </motion.h1>
          <motion.p variants={fadeUp} className="...">
            Description
          </motion.p>
        </motion.div>
      </div>
    </div>
  )
}
```

### Pattern 2: Data-Driven Section

**Source:** `/Users/rodrigo.seoane/local-sites/portfolio-2026/components/sections/FeaturedWork.tsx`

**Relevance:** Shows how to render data-driven content with `useInView` for scroll animations.

```tsx
'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const sectionVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
}

function CaseSection({ data }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <motion.div
      ref={ref}
      variants={sectionVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
    >
      {/* Content */}
    </motion.div>
  )
}
```

### Pattern 3: Badge Component Pattern

**Source:** `/Users/rodrigo.seoane/local-sites/portfolio-2026/components/ui/Badge.tsx`

**Relevance:** Establishes the badge variant pattern to extend for status badges.

```tsx
import { cn } from '@/lib/utils/cn'

type BadgeVariant = 'default' | 'success' | 'warning' | 'info'

const variants: Record<BadgeVariant, string> = {
  default: 'bg-neutral-100 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300',
  success: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  // ... other variants
}

export function Badge({ variant = 'default', children, className }: BadgeProps) {
  return (
    <span className={cn(
      'inline-flex items-center px-3 py-1 rounded-full text-sm font-medium',
      variants[variant],
      className
    )}>
      {children}
    </span>
  )
}
```

### Pattern 4: Data File Structure

**Source:** `/Users/rodrigo.seoane/local-sites/portfolio-2026/lib/data/articles.ts`

**Relevance:** Establishes the pattern for typed data exports with helper functions.

```typescript
export interface Article {
  id: string
  title: string
  category: ArticleCategory
  linkedInUrl: string
  thumbnail: string
  featured: boolean
}

export const articles: Article[] = [ /* ... */ ]

export function getFeaturedArticle(): Article | undefined {
  return articles.find((a) => a.featured)
}
```

---

## Documentation Excerpts

### Framer Motion - Stagger Children

**Source:** [Motion Documentation](https://motion.dev/docs/react-animation)

**Key Points:**
- Use `variants` prop with `staggerChildren` for sequential child animations
- `delayChildren` sets initial delay before stagger begins
- `useInView` hook triggers animations on scroll visibility

```typescript
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
}
```

### CSS Animated Gradient Text

**Source:** [web.dev - Speedy CSS Tip](https://web.dev/articles/speedy-css-tip-animated-gradient-text)

**Key Points:**
- Use `background-clip: text` with `color: transparent`
- Set `background-size` to 400% for smooth animation
- Animation duration of 8s creates subtle, non-distracting motion
- Always include `-webkit-background-clip` for Safari support

```css
.gradient-text {
  --bg-size: 400%;
  background: linear-gradient(90deg, color1, color2, color1) 0 0 / var(--bg-size) 100%;
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  animation: move-bg 8s infinite linear;
}
```

### CSS Glowing Border Animation

**Source:** [LetsBuildUI - How to Animate Borders](https://www.letsbuildui.dev/articles/how-to-animate-borders-in-css/)

**Key Points:**
- Use `::before` for sharp gradient border
- Use `::after` with `filter: blur()` for soft glow effect
- Add `transform: translate3d(0, 0, 0)` for Safari compatibility
- Animate `background-position` for smooth color cycling

```css
.card::after {
  filter: blur(25px);
  transform: translate3d(0, 0, 0); /* Safari fix */
}
```

### Tailwind CSS Gradient Animation Config

**Source:** [DEV.to - Animated Text Gradient](https://dev.to/ibelick/creating-an-animated-text-gradient-with-tailwind-css-and-vanilla-css-1mkn)

**Key Points:**
- Configure `keyframes` and `animation` in Tailwind extend
- Use `bg-[200%_auto]` or similar for background sizing
- Combine `bg-clip-text` and `text-transparent` utilities

```javascript
// tailwind.config.js / globals.css @theme
keyframes: {
  'text': {
    to: { backgroundPosition: '200% center' },
  },
},
animation: {
  'text-gradient': 'text 1.5s linear infinite',
},
```

---

## External Implementation Patterns

### From GitHub: shadergradient

**Source:** [github.com/ruucm/shadergradient](https://github.com/ruucm/shadergradient)

**Pattern:** WebGL-based gradient animations for React
**Relevance:** Reference for more advanced gradient effects (v1.1+)
**Note:** Overkill for initial implementation; CSS gradients are sufficient

### From DEV.to: Cards Mouse Hover Effect

**Source:** [dev.to/yxsh/cards-mouse-hover-effect](https://dev.to/yxsh/cards-mouse-hover-effect-with-css-js-33j0)

**Pattern:** Windows 10-style hover glow that follows cursor
**Consideration:** Requires JavaScript for cursor tracking; defer to v1.1 if desired

### From CodeHim: CSS Glowing Border Animation

**Source:** [codehim.com/css-glowing-border-animation](https://codehim.com/animation-effects/css-glowing-border-animation/)

**Pattern:** Pure CSS glowing border with blur effect
**Implementation:**

```css
.animated-border-box {
  position: relative;
}

.animated-border-box::after {
  content: '';
  position: absolute;
  inset: 0;
  background: conic-gradient(from var(--angle), gold, coral, gold);
  filter: blur(15px);
  opacity: 0.6;
  z-index: -1;
  border-radius: inherit;
}
```

---

## Accessibility Requirements

### A11y-1: Reduced Motion Support

**Requirement:** All animations must respect `prefers-reduced-motion: reduce`

**Implementation:**
```css
@media (prefers-reduced-motion: reduce) {
  .gradient-text,
  .experiment-card::before,
  .experiment-card::after {
    animation: none !important;
  }
}
```

### A11y-2: Color Contrast

**Requirement:** All text must meet WCAG AA contrast ratios (4.5:1 for normal text, 3:1 for large text)

**Verification:**
- Light text on dark background: `text-neutral-100` on `bg-dark-background` (passes)
- Badge text must remain readable in all states
- Status badge dots should not convey information solely through color (include text labels)

### A11y-3: Keyboard Navigation

**Requirement:** All interactive elements must be keyboard accessible

**Implementation:**
- Cards with links use semantic `<a>` elements
- Focus states use visible outlines: `focus-visible:ring-2 focus-visible:ring-primary-yellow`
- Tab order follows visual order

### A11y-4: Screen Reader Support

**Requirement:** Content must be understandable without visual presentation

**Implementation:**
- Status badges include text labels, not just colored dots
- Decorative animations have `aria-hidden="true"`
- External links include "opens in new tab" indication

---

## Performance Considerations

### P-1: Animation Performance

**Strategy:** Use CSS transforms and opacity only

**Implementation:**
- Gradient text: Animate `background-position` (GPU-accelerated)
- Glowing border: Animate `background-position` on pseudo-elements
- Card hover: Use `transform: translateY()` (GPU-accelerated)
- Avoid: Animating `width`, `height`, `margin`, or `box-shadow`

### P-2: Image Optimization

**Strategy:** Use Next.js Image component with appropriate sizing

**Implementation:**
```tsx
<Image
  src={experiment.thumbnail}
  alt={experiment.title}
  width={800}
  height={450}
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
  loading="lazy"
/>
```

### P-3: CSS-in-JS Considerations

**Strategy:** Prefer static Tailwind classes over dynamic style objects

**Avoid:**
```tsx
// Avoid runtime style computation
<div style={{ animation: `gradient ${speed}s linear infinite` }} />
```

**Prefer:**
```tsx
// Static Tailwind class
<div className="animate-gradient-text" />
```

### P-4: Lighthouse Targets

| Metric | Target |
|--------|--------|
| Performance | >= 95 |
| Accessibility | >= 95 |
| Best Practices | >= 95 |
| SEO | >= 95 |
| LCP | < 2.5s |
| CLS | < 0.1 |

---

## SEO Requirements

### Page Metadata

```typescript
export const metadata: Metadata = {
  title: 'Vibe Lab | Design & Code Experiments | Rodrigo Seoane',
  description:
    'A playground for design and code experiments. Explore prototypes, tools, and apps built with intuition, research, and creative coding.',
  keywords: [
    'design experiments',
    'code playground',
    'prototypes',
    'creative coding',
    'product design',
    'UX experiments',
  ],
  openGraph: {
    title: 'Vibe Lab | Rodrigo Seoane',
    description:
      'A playground for design and code experiments. Explore prototypes and tools.',
    url: 'https://rodrigoseoane.com/vibe-lab',
    type: 'website',
    images: [
      {
        url: '/images/og/vibe-lab.jpg',
        width: 1200,
        height: 630,
        alt: 'Vibe Lab - Design & Code Experiments',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vibe Lab | Rodrigo Seoane',
    description: 'A playground for design and code experiments.',
    images: ['/images/og/vibe-lab.jpg'],
  },
}
```

---

## Acceptance Criteria

### Hero Section
- [ ] Headline "Vibe Lab" displays with animated gradient effect
- [ ] Animation is smooth (no jank) at 60fps
- [ ] Animation pauses when `prefers-reduced-motion: reduce` is set
- [ ] Tagline and description render with staggered entrance
- [ ] Dark background provides sufficient contrast
- [ ] Responsive: Center-aligned on mobile, left-aligned on desktop

### Experiment Cards
- [ ] Mi Agenda Fiscal card renders with all content fields
- [ ] Glowing border animation is visible and smooth
- [ ] Glow intensifies on hover
- [ ] Card lifts slightly on hover (`translateY(-4px)`)
- [ ] Status badge shows "Live" with pulsing green dot
- [ ] "Launch Project" CTA opens external URL in new tab
- [ ] Tags display as pill badges below benefits
- [ ] Thumbnail image lazy loads with Next.js Image
- [ ] Card is fully keyboard accessible

### Coming Soon Section
- [ ] Displays when no in-progress/concept experiments exist
- [ ] Subtle styling differentiates from live experiments
- [ ] Contains call-to-action for LinkedIn follow

### Data Structure
- [ ] Adding new experiment to `experiments.ts` renders on page
- [ ] Helper functions (`getLiveExperiments`, etc.) work correctly
- [ ] TypeScript types are strict (no `any`)

### Performance
- [ ] Lighthouse Performance >= 95
- [ ] No layout shift during animation (CLS < 0.1)
- [ ] Page weight < 1MB

### Accessibility
- [ ] Color contrast passes WCAG AA
- [ ] All animations respect reduced motion preference
- [ ] Keyboard navigation works for all interactive elements
- [ ] Screen reader announces status badges correctly

---

## Dependencies and Risks

### Dependencies

| Dependency | Status | Notes |
|------------|--------|-------|
| Framer Motion | Installed | v11 in project |
| Lucide React | Installed | For icons |
| Next.js Image | Available | For optimized images |
| Tailwind CSS | Installed | v4 with new `@theme` syntax |

### Risks

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| Animation performance on low-end devices | Medium | Medium | Test on throttled CPU; implement `prefers-reduced-motion` |
| Safari gradient animation bugs | Medium | Low | Use `-webkit-` prefixes; add `translate3d(0,0,0)` hack |
| Thumbnail image not ready | Low | Low | Use placeholder with clear dimensions |
| Scope creep (cursor-following glow) | Medium | Medium | Defer advanced effects to v1.1 |

---

## Open Questions

1. **Thumbnail Image:** Should we create a screenshot of Mi Agenda Fiscal, or request a branded thumbnail from the project?

2. **Dark Mode Consistency:** The lab has a dark aesthetic by default. Should this override system dark/light mode, or adapt?

3. **Homepage Teaser:** Should a single experiment card appear on the homepage as a "Vibe Lab Preview" section?

4. **Analytics Events:** What events should be tracked? Suggested:
   - `vibe_lab_view`: Page view
   - `experiment_click`: Click on "Launch Project" CTA
   - `experiment_hover`: Card hover (for engagement tracking)

5. **Future Experiment Categories:** Should we define a fixed set of categories, or allow free-form text?

---

## References

- [IMPLEMENTATION_PLAN.md - Phase 6 Section](/Users/rodrigo.seoane/local-sites/portfolio-2026/IMPLEMENTATION_PLAN.md)
- [Dev-Guidelines.md](/Users/rodrigo.seoane/local-sites/portfolio-2026/Dev-Guidelines.md)
- [web.dev - Animated Gradient Text](https://web.dev/articles/speedy-css-tip-animated-gradient-text)
- [LetsBuildUI - Animated Borders](https://www.letsbuildui.dev/articles/how-to-animate-borders-in-css/)
- [DEV.to - Tailwind Gradient Text](https://dev.to/ibelick/creating-an-animated-text-gradient-with-tailwind-css-and-vanilla-css-1mkn)
- [Framer Motion Documentation](https://motion.dev/docs/react-animation)

---

**Document Version:** 1.0
**Created:** February 4, 2026
**Status:** Ready for Spec Writing
