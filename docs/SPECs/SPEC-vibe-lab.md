# Technical Specification — Vibe Lab Page (Phase 6)

**Source PRD:** `PRD-vibe-lab.md`
**Guidelines ref:** `Dev-Guidelines.md`
**Date:** 2026-02-04
**Status:** Ready for implementation

---

## Summary

This spec covers the full implementation of the `/vibe-lab` route: a dedicated showcase page for design-and-code experiments. The current placeholder at `app/vibe-lab/page.tsx` (9 lines, no metadata, no sections) is replaced with a fully composed page. Five new components are created inside a new `components/sections/vibe-lab/` directory, one new data file is created at `lib/data/experiments.ts`, and two keyframe animations plus their `--animate-*` custom properties are added to `app/globals.css`. No changes to Navigation, layout, or any other existing component are required — the nav link to `/vibe-lab` already exists.

The page is structured identically to how `/insights` and `/about` are structured: metadata lives in a sibling `layout.tsx` (server component), the page component assembles section components via a barrel export, and each section component is a focused single-responsibility file under 200 lines.

---

## Planning Reasoning

### Why a sibling `layout.tsx` for metadata instead of inline `export const metadata`

The `/insights` route uses a `layout.tsx` for its `Metadata` export. The `/about` route places metadata directly in `page.tsx` because that page is a server component (no `'use client'` directive). The Vibe Lab page imports client components that use `motion` and `useInView`, which forces the page itself to be a client component. Client components cannot export `metadata`. Therefore, a `layout.tsx` is required — this is the same pattern as `/insights`.

### Why custom CSS keyframes in `globals.css` rather than inline Framer Motion

The gradient-text animation and the glowing-border animation both operate on `background-position`, which is not a property Framer Motion animates. These are pure CSS animations that run on the GPU compositor thread with zero JS overhead. The project already defines keyframes in `globals.css` (`marquee`, `float`) and exposes them through `--animate-*` custom properties inside `@theme inline`. The two new animations follow that exact pattern.

### Why `StatusBadge` is a standalone component rather than an extension of `Badge`

The existing `Badge` component (`components/ui/Badge.tsx`) is a pure presentational wrapper: it takes `variant` and `children`, applies a background/text color pair, and renders a `<span>`. The Vibe Lab status badge has fundamentally different internal structure — it contains a pulsing animated dot alongside a text label, and the dot's animation is conditional on the `live` status. Modifying `Badge` to accommodate this would violate its single-responsibility contract and introduce motion logic into a stateless UI primitive. A dedicated `StatusBadge` keeps `Badge` clean and meets the guideline "One component = One UI element."

### Why `ExperimentCard` does not wrap the existing `Card` component

The existing `Card` (`components/ui/Card.tsx`) is a `motion.div` with a standard white/dark-surface background and a 1 px neutral border. The experiment card requires a glowing animated pseudo-element border rendered via a wrapper `<div>` whose `::before` and `::after` pseudo-elements sit behind an inner content container. This is structurally incompatible with `Card`'s single-element model — there is no way to inject pseudo-elements into a child without replacing the outer container. The card also needs a CSS class (`experiment-card`) to target the pseudo-elements in `globals.css`. A self-contained component is the correct choice here.

### Why the glowing border is CSS + pseudo-elements rather than a `box-shadow` approach

`box-shadow` animates on the main thread and triggers paint on every frame. The pseudo-element approach animates only `background-position` (GPU-composited) and the blur is static. This satisfies the P-1 performance requirement in the PRD ("animate background-position only") and keeps the Lighthouse Performance score high.

### Why `ComingSoonTeaser` receives no props

The display logic ("show when no upcoming experiments exist") is trivial and self-contained. The component imports `getUpcomingExperiments()` directly and decides its own visibility. This avoids prop-drilling a boolean from the page and keeps the component independently testable. The data file is the single source of truth; the component is just a reader.

### Assumptions made where the PRD is ambiguous

1. **Thumbnail image:** The PRD lists `/images/experiments/mi-agenda-fiscal.png` as "to be created." This spec does not create the image file. The `ExperimentCard` component renders a grey placeholder (`bg-dark-700`) with alt text when the image path resolves to a missing file, matching the pattern already used in `AboutHero.tsx` (see `IMAGE_AVAILABLE` flag there). The builder should place the actual PNG at `public/images/experiments/mi-agenda-fiscal.png` before or after implementation — the component works either way.

2. **Dark aesthetic override:** The PRD asks whether the lab should override system dark/light mode. This spec does **not** force dark mode site-wide. Instead, the hero and card sections use explicit dark-palette classes (`bg-dark-background`, `bg-dark-surface`, `text-neutral-100`) that produce the dark aesthetic regardless of the user's theme setting. This is the least invasive approach and avoids breaking the ThemeProvider contract.

3. **OG image:** The metadata references `/images/og/vibe-lab.jpg`. This file does not exist yet. The metadata is written as specified; the OG image is a design-asset deliverable outside this spec's scope.

---

## File Changes

### Files to Modify

#### `app/globals.css`

Two new keyframe blocks and two new `--animate-*` custom properties must be added. The keyframes go after the existing `@keyframes float` block. The custom properties go inside the existing `@theme inline` block alongside `--animate-marquee` and `--animate-float`.

**Inside `@theme inline`, add these two lines after `--animate-float`:**

```css
  --animate-gradient-text: gradient-flow 8s linear infinite;
  --animate-glow: glow-rotate 6s ease-in-out infinite;
```

**After the `@keyframes float` block, add these two keyframe blocks:**

```css
@keyframes gradient-flow {
  to {
    background-position: 400% center;
  }
}

@keyframes glow-rotate {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}
```

**After the `@keyframes glow-rotate` block, add the reduced-motion media query:**

```css
@media (prefers-reduced-motion: reduce) {
  .gradient-text {
    animation: none !important;
    background: var(--color-primary-yellow) !important;
    -webkit-background-clip: text !important;
    background-clip: text !important;
  }
  .experiment-card::before,
  .experiment-card::after {
    animation: none !important;
    background-position: 50% 50% !important;
  }
}
```

- [ ] Add `--animate-gradient-text` and `--animate-glow` to the `@theme inline` block
- [ ] Add `@keyframes gradient-flow` after the existing `@keyframes float`
- [ ] Add `@keyframes glow-rotate` after `gradient-flow`
- [ ] Add the `@media (prefers-reduced-motion: reduce)` block after `glow-rotate`

---

### Files to Create

#### `lib/data/experiments.ts`

This is the single data file for all Vibe Lab experiments. It follows the exact structural pattern of `lib/data/articles.ts`: interface definition at the top, typed array export, helper functions at the bottom, JSDoc comments on fields.

- [ ] Export the `ExperimentStatus` type: `'live' | 'in-progress' | 'concept'`
- [ ] Export the `Experiment` interface with these fields, all typed strictly (no `any`):
  - `id: string` — URL-safe unique identifier
  - `title: string` — Display name
  - `description: string` — One-line summary, max 120 characters
  - `headline: string` — Long-form headline rendered inside the card
  - `status: ExperimentStatus`
  - `category: string` — e.g. `'Web App'`
  - `subcategory?: string` — optional, e.g. `'Cost reduction'`
  - `thumbnail: string` — path relative to `/public`
  - `url?: string` — external URL; required when `status` is `'live'`, optional otherwise
  - `benefits: { title: string; description: string }[]` — max 3 items
  - `tags: string[]` — tech stack labels
  - `order: number` — lower values sort first
  - `featured: boolean` — flag for future homepage teaser use
- [ ] Export the `experiments` array with the single Mi Agenda Fiscal entry:

```typescript
export const experiments: Experiment[] = [
  {
    id: 'mi-agenda-fiscal',
    title: 'Mi Agenda Fiscal',
    description: 'A tax deadline management app for Spanish freelancers.',
    headline:
      'Never miss a tax deadline again. Keep your tax obligations under control.',
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
```

- [ ] Export three helper functions (pure, no side effects):
  - `getLiveExperiments(): Experiment[]` — filters to `status === 'live'`, sorts by `order` ascending
  - `getUpcomingExperiments(): Experiment[]` — filters to `status === 'in-progress' || status === 'concept'`, sorts by `order` ascending
  - `getExperimentById(id: string): Experiment | undefined` — finds by `id`

---

#### `components/sections/vibe-lab/StatusBadge.tsx`

A small, focused component (target: under 60 lines). It is **not** a client component — it contains no hooks or event handlers, only conditional class selection. It uses `cn` from the project utility.

**Props interface:**

```typescript
interface StatusBadgeProps {
  status: 'live' | 'in-progress' | 'concept'
}
```

**Implementation structure:**

The component renders a `<span>` containing two children: a dot element and a text label. The dot is a nested two-span structure that produces the Tailwind `animate-ping` pulse effect when `status === 'live'`, and a static colored dot for the other two statuses. The outer `<span>` carries the background color and rounded-full shape.

```tsx
import { cn } from '@/lib/utils/cn'

interface StatusBadgeProps {
  status: 'live' | 'in-progress' | 'concept'
}

// Static lookup maps — keeps the JSX branch-free
const configs = {
  live: {
    bg: 'bg-green-500/20',
    text: 'text-green-400',
    dot: 'bg-green-500',
    ping: 'bg-green-400',
    label: 'Live',
  },
  'in-progress': {
    bg: 'bg-yellow-500/20',
    text: 'text-yellow-400',
    dot: 'bg-yellow-500',
    ping: null, // no pulse
    label: 'In Progress',
  },
  concept: {
    bg: 'bg-blue-500/20',
    text: 'text-blue-400',
    dot: 'bg-blue-500',
    ping: null,
    label: 'Concept',
  },
} as const

export function StatusBadge({ status }: StatusBadgeProps) {
  const { bg, text, dot, ping, label } = configs[status]

  return (
    <span className={cn('inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium', bg, text)}>
      {/* Dot — pulsing ring only for "live" */}
      <span className="relative flex h-2 w-2">
        {ping && (
          <span className={cn('absolute inline-flex h-full w-full animate-ping rounded-full opacity-75', ping)} />
        )}
        <span className={cn('relative inline-flex h-2 w-2 rounded-full', dot)} />
      </span>
      {label}
    </span>
  )
}
```

- [ ] Create the file with the exact structure above
- [ ] Verify: no `'use client'` directive needed (no hooks, no event handlers)
- [ ] Verify: `animate-ping` is a built-in Tailwind utility — no custom keyframe required

---

#### `components/sections/vibe-lab/ExperimentCard.tsx`

This is the most complex component in the feature (target: 120-170 lines). It is a client component because it uses `motion` from Framer Motion for the hover lift. It renders the glowing border via CSS classes that target `.experiment-card` pseudo-elements defined in `globals.css`.

**Props interface:**

```typescript
interface ExperimentCardProps {
  experiment: Experiment
}
```

**Structural layout (outside-in):**

1. Outer wrapper `<div className="experiment-card">` — this element is what the `::before` and `::after` pseudo-elements in globals.css attach to. It has `position: relative`, `rounded-2xl`, and a 2 px padding that creates the visible border gap.
2. Inner content container `<div className="experiment-card__inner">` — has `bg-dark-surface`, `rounded-2xl`, and the actual content padding. The CSS class name `experiment-card__inner` is targeted in globals.css to set the dark background.
3. Inside the inner container, top to bottom:
   - `StatusBadge` component (top-left)
   - Category + subcategory row (category as text, subcategory as a small pill next to it)
   - Thumbnail image via Next.js `Image` (16:9 aspect ratio, `loading="lazy"`, `sizes` attribute for responsive)
   - Headline (the long-form text, not the title)
   - Benefits list: each benefit is a row with a `Check` icon from lucide-react, a bold title, and a description
   - Tags: each tag is a small rounded pill with `bg-dark-border text-neutral-400`
   - CTA row: a single `<a>` element styled as a button (primary variant styling from Button but implemented as an `<a>` because it navigates to an external URL). Includes `ExternalLink` icon from lucide-react. Has `target="_blank"`, `rel="noopener noreferrer"`, and an accessible label that states the link opens in a new tab.

**Hover behavior:**

The inner content container is wrapped in a `motion.div` with:

```tsx
whileHover={{ y: -4 }}
transition={{ duration: 0.3, ease: 'easeOut' }}
```

The glow intensification on hover (blur 20px to 30px) is handled via a CSS class swap. The outer `.experiment-card` div gains the class `hover:experiment-card--hovered` — but because pseudo-element `filter` values cannot be toggled via Tailwind utilities alone, this is handled with a `group` + `group-hover` pattern: the outer div carries `group`, and a dedicated invisible `<div>` inside the outer wrapper (but outside the inner content) carries the intensified blur via `group-hover` classes.

**Concrete approach for the glow intensification:** Rather than trying to animate the `::after` blur (which would require JS), use a second absolutely-positioned div that sits between the pseudo-elements and the inner content. This div is invisible by default and on `group-hover` transitions its own `filter: blur()` and `opacity`. Here is the pattern:

```tsx
<div className="experiment-card group">
  {/* The ::before and ::after pseudo-elements on .experiment-card handle the base glow */}

  {/* Hover glow intensifier — visible only on hover */}
  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
       style={{ background: 'linear-gradient(45deg, var(--color-primary-yellow), var(--color-orange-400), var(--color-accent-peach), var(--color-primary-yellow))', backgroundSize: '300% 300%', filter: 'blur(30px)', zIndex: 0 }}
       aria-hidden="true"
  />

  {/* Inner content */}
  <motion.div className="experiment-card__inner relative" style={{ zIndex: 1 }} whileHover={{ y: -4 }} transition={{ duration: 0.3, ease: 'easeOut' }}>
    {/* ... card content ... */}
  </motion.div>
</div>
```

Note: The `style` prop is used here *only* for the gradient definition and blur value because these are static values that cannot be expressed as Tailwind utilities (the gradient references CSS custom properties). This is consistent with the guideline "NEVER use inline styles (except for dynamic values)" — these are effectively static values that Tailwind cannot reach.

- [ ] Add `'use client'` directive at the top of the file
- [ ] Import: `motion` from `framer-motion`, `Image` from `next/image`, `Check` and `ExternalLink` from `lucide-react`, `cn` from `@/lib/utils/cn`, `StatusBadge` from `./StatusBadge`, and `type Experiment` from `@/lib/data/experiments`
- [ ] Outer wrapper div carries class `experiment-card group` and has `relative` positioning
- [ ] Hover glow intensifier div: absolutely positioned, `inset-0`, `rounded-2xl`, transitions opacity on group-hover
- [ ] Inner content div carries class `experiment-card__inner relative` with `z-index: 1`
- [ ] Wrap inner content in `motion.div` with `whileHover={{ y: -4 }}` and `transition={{ duration: 0.3, ease: 'easeOut' }}`
- [ ] StatusBadge renders at the top, receiving `experiment.status`
- [ ] Category row: category as `text-orange-400 font-bold text-sm uppercase tracking-widest`, subcategory (if present) as `text-xs px-2 py-0.5 rounded-full bg-dark-border text-neutral-400`
- [ ] Thumbnail: `<Image>` with `src={experiment.thumbnail}`, `alt={experiment.title}`, `width={800}`, `height={450}`, `sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"`, `loading="lazy"`, wrapped in a container with `aspect-video overflow-hidden rounded-xl bg-dark-700`
- [ ] Headline: `<p>` with `font-display font-bold text-lg text-neutral-100 leading-snug`
- [ ] Benefits list: iterate `experiment.benefits`, each row is a `<div className="flex items-start gap-3">` with a `<Check size={18} className="text-green-400 mt-0.5 shrink-0" />` and a nested title + description
- [ ] Tags: iterate `experiment.tags`, each is a `<span>` with `text-xs px-2.5 py-1 rounded-full bg-dark-border text-neutral-400`
- [ ] CTA link: conditional — only render if `experiment.url` exists. Styled as `inline-flex items-center gap-2 px-6 py-3 bg-primary-yellow text-neutral-900 font-semibold rounded-lg hover:shadow-lg transition-all duration-300 focus-visible:ring-2 focus-visible:ring-primary-yellow`. Text is "Launch Project". Includes `<ExternalLink size={16} />`. Has `target="_blank"`, `rel="noopener noreferrer"`, `aria-label` that appends "opens in a new tab".

---

#### `components/sections/vibe-lab/VibeLabHero.tsx`

The hero section with the animated gradient headline. Client component (uses `motion`). Target: 60-80 lines.

**Layout pattern:** Matches `InsightsHero.tsx` structurally — a full-width div with a background color, a centered container with padding, and a `motion.div` stagger container wrapping animated child elements. The difference is this hero uses `bg-dark-background` (dark aesthetic) instead of `bg-primary-yellow`, and the headline uses the gradient-text animation.

**Gradient text implementation:** The headline "Vibe Lab" is rendered inside a `<motion.h1>` that carries two class groups: the standard display-font sizing classes, and the gradient classes. The gradient is achieved with static Tailwind-compatible classes plus the custom animation:

```tsx
<motion.h1
  variants={fadeUp}
  className={cn(
    'font-display text-5xl lg:text-7xl font-bold',
    // Gradient text classes
    'bg-clip-text text-transparent',
    'bg-gradient-to-r from-primary-yellow via-orange-400 to-accent-peach',
    'bg-[400%_auto]',
    'animate-gradient-text',
  )}
>
  Vibe Lab
</motion.h1>
```

Explanation of each class:
- `bg-clip-text` — Tailwind utility for `-webkit-background-clip: text; background-clip: text`
- `text-transparent` — sets `color: transparent` so the background shows through
- `bg-gradient-to-r from-primary-yellow via-orange-400 to-accent-peach` — defines the gradient using the design system tokens already in `@theme`
- `bg-[400%_auto]` — sets `background-size: 400% auto`, giving the animation room to scroll
- `animate-gradient-text` — applies the `--animate-gradient-text` custom property defined in globals.css, which maps to `gradient-flow 8s linear infinite`

The `prefers-reduced-motion` handling for `.gradient-text` in globals.css targets the class `.gradient-text`. Therefore, this `<h1>` must also carry the class `gradient-text` so that the media query can disable its animation and fall back to a solid color. Add `gradient-text` to the className list.

**Text alignment:** On mobile (`text-center`), on desktop (`lg:text-left`). The container itself is `max-w-3xl` to keep the description line length comfortable.

- [ ] Add `'use client'` directive
- [ ] Import `motion` from `framer-motion`, `staggerContainer` and `fadeUp` from `@/lib/utils/animations`, `cn` from `@/lib/utils/cn`
- [ ] Outer div: `bg-dark-background py-20 lg:py-28`
- [ ] Container div: `container mx-auto px-6 lg:px-20`
- [ ] Inner alignment div: `text-center lg:text-left max-w-3xl lg:max-w-none`
- [ ] `motion.div` with `variants={staggerContainer}`, `initial="hidden"`, `animate="visible"`
- [ ] `motion.h1` with `variants={fadeUp}` and the gradient classes listed above, plus the class `gradient-text` for the reduced-motion media query target. Text content: `Vibe Lab`
- [ ] `motion.p` with `variants={fadeUp}` for the tagline. Classes: `mt-4 text-lg text-accent-peach font-semibold`. Text: `A playground for design + code experiments.`
- [ ] `motion.p` with `variants={fadeUp}` for the description. Classes: `mt-3 text-neutral-400 text-base lg:text-lg max-w-xl lg:max-w-2xl`. Text: `A space to explore real problems deserving better solutions. Prototype, test, and share small apps built with intuition, research, and vibe coding.`
- [ ] On mobile the max-w-xl/max-w-2xl constraints and text-center alignment are applied via the parent alignment div; on lg the text-left takes over

---

#### `components/sections/vibe-lab/ComingSoonTeaser.tsx`

A self-contained section that conditionally renders based on data. Not a client component — it imports data directly and renders statically. Target: under 50 lines.

**Visibility logic:** Import `getUpcomingExperiments` from `@/lib/data/experiments`. If the returned array has length > 0, return `null` (upcoming experiments will be rendered as cards by the page; no teaser is needed). If the array is empty, render the teaser. This satisfies the PRD requirement: "Show when no experiments with `status: 'in-progress'` or `status: 'concept'` exist."

**Visual treatment:** A dashed-border card with reduced opacity. No glowing effect. The card uses `border-2 border-dashed border-dark-border` and `opacity-60` (matching the PRD's 60-70% range). Background is `bg-dark-surface/50` (semi-transparent to differentiate from live cards).

**Content:**
- Title: "More experiments brewing..." — `font-display font-bold text-lg text-neutral-300`
- Description: "New projects are always in the works. Check back soon or follow on LinkedIn for updates." — `text-neutral-500 text-sm mt-2`

- [ ] Import `getUpcomingExperiments` from `@/lib/data/experiments`
- [ ] Early return `null` if `getUpcomingExperiments().length > 0`
- [ ] Outer `<div>` with padding matching the card section: `container mx-auto px-6 lg:px-20 pb-16 lg:pb-24`
- [ ] Inner card div: `rounded-2xl border-2 border-dashed border-dark-border bg-dark-surface/50 opacity-60 p-8 max-w-2xl`
- [ ] Title `<p>` and description `<p>` as specified above

---

#### `components/sections/vibe-lab/index.ts`

Barrel export file. Follows the exact pattern of `components/sections/insights/index.ts` and `components/sections/about/index.ts`.

```typescript
export { VibeLabHero } from './VibeLabHero'
export { ExperimentCard } from './ExperimentCard'
export { StatusBadge } from './StatusBadge'
export { ComingSoonTeaser } from './ComingSoonTeaser'
```

- [ ] Create with the four named exports above

---

#### `app/vibe-lab/layout.tsx`

Server component. Contains only the `Metadata` export. Follows the pattern of `app/insights/layout.tsx` exactly: a default export layout that renders `{children}`, and a `metadata` export.

```typescript
import type { Metadata } from 'next'

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

export default function VibeLabLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
```

- [ ] Create file with the metadata and passthrough layout above
- [ ] Note: `/images/og/vibe-lab.jpg` does not exist yet — this is a design-asset deliverable

---

#### `app/vibe-lab/page.tsx` (replace existing placeholder)

Client component. Assembles the hero, the experiment cards grid, and the coming-soon teaser. Follows the composition pattern of `app/insights/page.tsx`.

**Page structure:**

```tsx
'use client'

import { getLiveExperiments } from '@/lib/data/experiments'
import { VibeLabHero, ExperimentCard, ComingSoonTeaser } from '@/components/sections/vibe-lab'

export default function VibeLabPage() {
  const liveExperiments = getLiveExperiments()

  return (
    <div className="min-h-screen bg-dark-background">
      <VibeLabHero />

      {/* Experiment cards */}
      <section className="container mx-auto px-6 lg:px-20 py-16 lg:py-24">
        <div className="max-w-2xl mx-auto flex flex-col gap-12">
          {liveExperiments.map((experiment) => (
            <ExperimentCard key={experiment.id} experiment={experiment} />
          ))}
        </div>
      </section>

      <ComingSoonTeaser />
    </div>
  )
}
```

**Grid layout decision:** At launch there is exactly one live experiment. The cards section uses `max-w-2xl mx-auto` and `flex flex-col gap-12` — a single-column centered layout. When a second experiment is added in the future, the developer changes this to a two-column grid (`grid grid-cols-1 md:grid-cols-2 gap-8`) and removes the `max-w-2xl`. This is a one-line change at that point. No grid abstraction is warranted now (YAGNI).

- [ ] Replace the entire contents of the existing file with the code above
- [ ] Verify: `'use client'` is present (required because `ExperimentCard` is a client component)
- [ ] Verify: the outer div carries `bg-dark-background` to maintain the dark aesthetic throughout the page

---

#### `app/globals.css` additions — complete target state

For clarity, here is what the top portion of `globals.css` should look like after the modifications. Only the lines marked with `// NEW` are additions; everything else is unchanged:

```css
@import "tailwindcss";

/* Design System Configuration - Based on Figma */
@theme inline {
  /* ... all existing color, font, and timing variables unchanged ... */

  /* Custom Animations */
  --animate-marquee: marquee 30s linear infinite;
  --animate-float: float 3s ease-in-out infinite;
  --animate-gradient-text: gradient-flow 8s linear infinite;   /* NEW */
  --animate-glow: glow-rotate 6s ease-in-out infinite;         /* NEW */
}

/* Keyframe Animations */
@keyframes marquee {
  0% { transform: translateX(0%); }
  100% { transform: translateX(-50%); }
}

@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}

@keyframes gradient-flow {                                     /* NEW */
  to {
    background-position: 400% center;
  }
}

@keyframes glow-rotate {                                       /* NEW */
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}

@media (prefers-reduced-motion: reduce) {                      /* NEW */
  .gradient-text {
    animation: none !important;
    background: var(--color-primary-yellow) !important;
    -webkit-background-clip: text !important;
    background-clip: text !important;
  }
  .experiment-card::before,
  .experiment-card::after {
    animation: none !important;
    background-position: 50% 50% !important;
  }
}

/* ... remainder of file (Base Styles, Utility Classes) unchanged ... */
```

And the `.experiment-card` pseudo-element styles. These go inside the existing `@layer utilities` block (or immediately after it — the project uses Tailwind v4 with `@import "tailwindcss"` which auto-layers):

```css
/* Glowing border for Vibe Lab experiment cards */                /* NEW */
.experiment-card {
  position: relative;
  border-radius: 1rem; /* 16px = rounded-2xl */
}

.experiment-card::before,
.experiment-card::after {
  content: '';
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
  animation: var(--animate-glow);
}

.experiment-card::after {
  filter: blur(20px);
  opacity: 0.5;
  transform: translate3d(0, 0, 0); /* Safari compositing fix */
}

.experiment-card__inner {
  background: var(--color-dark-surface);
  border-radius: inherit;
  padding: 1.5rem; /* 24px — overridden to 2rem on lg via Tailwind on the element */
  position: relative;
  z-index: 1;
}
```

- [ ] Add `.experiment-card` and `.experiment-card__inner` CSS rules after the `@layer utilities` block
- [ ] The `padding` in `.experiment-card__inner` is a baseline; the actual component applies `p-6 lg:p-8` via Tailwind classes on the inner div, which will override this. Keep the CSS rule for specificity safety but the Tailwind classes are authoritative.

---

## Implementation Order

Build in this sequence. Each step's output is a dependency for the next.

1. **`app/globals.css`** — Add keyframes and custom properties first. Nothing else compiles correctly without `animate-gradient-text` and `animate-glow` being defined. Add the `.experiment-card` pseudo-element rules here too.

2. **`lib/data/experiments.ts`** — The data file. All components that render experiment data import from here. No component dependencies.

3. **`components/sections/vibe-lab/StatusBadge.tsx`** — No component dependencies (only imports `cn`). Used by `ExperimentCard`.

4. **`components/sections/vibe-lab/ExperimentCard.tsx`** — Depends on `StatusBadge` and `experiments.ts`. The most complex component; build and visually verify before moving on.

5. **`components/sections/vibe-lab/VibeLabHero.tsx`** — Depends only on `animations.ts` (already exists) and `cn`. Independent of other vibe-lab components. Can be built in parallel with step 4 if desired.

6. **`components/sections/vibe-lab/ComingSoonTeaser.tsx`** — Depends only on `experiments.ts`. Independent of card or hero.

7. **`components/sections/vibe-lab/index.ts`** — Barrel export. Depends on steps 3, 4, 5, 6 being complete.

8. **`app/vibe-lab/layout.tsx`** — Metadata only. No runtime dependencies. Can be created at any point.

9. **`app/vibe-lab/page.tsx`** — Final assembly. Depends on the barrel export (step 7) and `experiments.ts` (step 2).

---

## Dependencies and Considerations

### External dependencies — all already installed

| Package | Version in package.json | Used by |
|---|---|---|
| `framer-motion` | `^12.29.2` | `VibeLabHero` (motion, staggerContainer, fadeUp), `ExperimentCard` (motion whileHover) |
| `lucide-react` | `^0.563.0` | `ExperimentCard` (Check, ExternalLink) |
| `next` (Image) | `16.1.6` | `ExperimentCard` (Image) |
| `clsx` + `tailwind-merge` | installed | `cn` utility, used everywhere |
| `tailwindcss` | `^4` | All Tailwind classes; `@theme inline` syntax for custom properties |

### Tailwind v4 specifics

This project uses Tailwind CSS v4 with the `@import "tailwindcss"` directive and `@theme inline` for custom properties. Animation utilities like `animate-gradient-text` are automatically available as classes when `--animate-gradient-text` is defined inside `@theme inline`. No `tailwind.config.ts` file exists or is needed. The `bg-[400%_auto]` arbitrary value syntax and `from-primary-yellow` / `via-orange-400` / `to-accent-peach` token references work because those `--color-*` variables are already in `@theme`.

### Path alias

`tsconfig.json` maps `@/*` to `./*` from the project root. All internal imports use this alias (e.g., `@/lib/data/experiments`, `@/components/sections/vibe-lab`).

### What is NOT in scope

- The thumbnail image file (`public/images/experiments/mi-agenda-fiscal.png`) — design asset, not code
- The OG image (`public/images/og/vibe-lab.jpg`) — design asset
- Navigation changes — the link `{ label: 'Vibe Lab', href: '/vibe-lab' }` already exists in `Navigation.tsx`
- Analytics event instrumentation — listed as an open question in the PRD; deferred
- Cursor-following glow effect — explicitly deferred to v1.1 in the PRD

---

## Testing Checklist

Run through this checklist after implementation, in order.

### Build and type checks

- [ ] `npm run type-check` passes with zero errors
- [ ] `npm run build` completes successfully
- [ ] No unused imports or variables (check ESLint output)

### Hero section — visual and animation

- [ ] "Vibe Lab" headline renders with a smoothly scrolling gradient (yellow -> orange -> peach -> yellow, cycling left to right)
- [ ] Gradient animation completes one full cycle in approximately 8 seconds
- [ ] Tagline and description appear below the headline with correct colors (`text-accent-peach` for tagline, `text-neutral-400` for description)
- [ ] Staggered entrance: headline animates in first, then tagline, then description (each offset by ~100 ms)
- [ ] On mobile (< 1024 px): text is center-aligned. On desktop (>= 1024 px): text is left-aligned
- [ ] Background is the dark `#0A0A0A` color across the full width

### Experiment card — layout and content

- [ ] The Mi Agenda Fiscal card renders with: status badge, category ("Web App"), subcategory pill ("Cost reduction"), thumbnail area, headline, two benefits with green check icons, three tags, and the "Launch Project" CTA
- [ ] Thumbnail area shows a grey placeholder (`bg-dark-700`) if the image file is missing, or the image if present. No broken-image icon or error
- [ ] "Launch Project" button opens `https://agendafiscal.rodrigoseoane.com/` in a new browser tab
- [ ] All text is legible against the dark card background (white/light-grey on dark)

### Experiment card — glowing border animation

- [ ] A colored glow is visible around the card edges. The glow cycles through the yellow/orange/peach palette
- [ ] The glow animation completes one cycle in approximately 6 seconds
- [ ] On hover: the glow visibly intensifies (blur increases) and the card body lifts upward by 4 px
- [ ] The card lift and glow intensification animate smoothly (no jump)

### Status badge

- [ ] The "Live" badge renders with a green background tint, green text, and a pulsing green dot
- [ ] The pulsing dot animates with a ring that expands and fades (the standard `animate-ping` pattern)
- [ ] Badge text reads "Live"

### Coming soon teaser

- [ ] The dashed-border teaser card is visible below the experiment cards
- [ ] It reads "More experiments brewing..." with the description text
- [ ] Its opacity is visibly reduced compared to the live experiment card
- [ ] If a second experiment with `status: 'in-progress'` is added to `experiments.ts`, the teaser disappears on page reload (no code change required)

### Accessibility

- [ ] Set OS-level `prefers-reduced-motion: reduce`. Reload the page. Verify: the gradient text is static (solid yellow, no animation). Verify: the glowing border is static (no cycling). Verify: the "Live" badge ping still animates (it is a Tailwind built-in that is not suppressed by the custom media query — this is intentional; the ping is a small 2 px element and is not a motion-sensitive animation in the same sense as the full-card glow)
- [ ] Tab through the page with keyboard. Verify: the "Launch Project" link receives visible focus (ring outline)
- [ ] Open the page in a screen reader. Verify: the "Launch Project" link announces that it opens in a new tab

### Responsive layout

- [ ] At 375 px width (iPhone SE): hero text is centered, card is full-width within padding, tags wrap naturally, CTA button is readable
- [ ] At 768 px width (iPad): layout is comfortable, no horizontal overflow
- [ ] At 1280 px width (desktop): hero text is left-aligned, card is centered at max-w-2xl, spacing is generous

### Performance

- [ ] Run Lighthouse on the page. Verify Performance >= 95, Accessibility >= 95
- [ ] Open Chrome DevTools > Performance panel. Scroll and hover over the card. Verify: no red (long task) frames during the glow animation or card hover
- [ ] Page total weight (First Load JS in Next.js build output) is reasonable — the page adds no new external dependencies beyond what is already bundled

---

**Spec version:** 1.0
**Written:** 2026-02-04
**PRD source:** PRD-vibe-lab.md v1.0
