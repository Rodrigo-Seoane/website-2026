# PRD: Work/Portfolio Section (Phase 4)

**Project:** Rodrigo Seoane Portfolio
**Feature:** Work Index Page and Case Study Template
**Timeline:** Week 3 (Feb 10-16, 2026)
**Status:** Ready for Implementation

---

## 1. Overview

Phase 4 implements the complete Work/Portfolio section of the portfolio website, consisting of:
1. **Work Index Page** (`/work`) - A filterable grid of all case studies
2. **Individual Case Study Pages** (`/work/[slug]`) - Detailed project narratives with rich media

The section must showcase Rodrigo's UX design work through compelling visual storytelling, measurable results, and a seamless browsing experience. The design should reflect the portfolio's primary brand color (yellow #FFD115) while maintaining excellent readability and accessibility.

### Goals
- Enable potential clients to quickly scan and filter case studies by industry/category
- Provide engaging, detailed case study pages that demonstrate design thinking and business impact
- Showcase measurable outcomes with animated metrics
- Create a memorable browsing experience with smooth animations and transitions
- Support SEO for individual case study discoverability

### User Stories

**As a potential client, I want to:**
- Browse all portfolio work at a glance to assess overall experience
- Filter case studies by industry or service type to find relevant projects
- See key metrics on cards before diving into full case studies
- Navigate smoothly between case studies without returning to the index
- View design work in full-screen to appreciate detail

**As a hiring manager, I want to:**
- Quickly scan project outcomes and metrics (60-second review time)
- Understand the design process, not just the final deliverables
- See business impact quantified with real numbers
- Assess the breadth of experience across different industries

---

## 2. Affected Codebase Files

### Files to Create

| File Path | Type | Description |
|-----------|------|-------------|
| `app/work/page.tsx` | Page | Work index page with filtering |
| `app/work/[slug]/page.tsx` | Page | Individual case study page |
| `components/sections/case-study/CaseStudyHero.tsx` | Section | Hero with project info, client, metrics |
| `components/sections/case-study/CaseStudyOverview.tsx` | Section | Overview grid (role, timeline, tools) |
| `components/sections/case-study/CaseStudySection.tsx` | Section | Reusable section layout wrapper |
| `components/sections/case-study/CaseStudyResults.tsx` | Section | Results with animated metrics |
| `components/sections/case-study/NextProject.tsx` | Section | Preview of next case study |
| `components/ui/ImageLightbox.tsx` | UI | Full-screen image viewer |
| `components/ui/ProgressBar.tsx` | UI | Sticky scroll progress indicator |
| `components/ui/CategoryFilter.tsx` | UI | Filter tabs for categories |
| `components/ui/AnimatedCounter.tsx` | UI | Count-up animation component |
| `components/ui/CaseStudyCard.tsx` | UI | Card for work index grid |
| `components/sections/case-study/index.ts` | Export | Barrel export for case study sections |

### Files to Modify

| File Path | Change Required |
|-----------|-----------------|
| `lib/data/case-studies.ts` | Extend data structure with full case study content (problem, solution, results, images) |
| `components/ui/index.ts` | Add exports for new UI components |

### Existing Files to Leverage (No Changes)

| File Path | Reuse Purpose |
|-----------|---------------|
| `components/ui/Badge.tsx` | Industry tags, service badges |
| `components/ui/Card.tsx` | Case study card base |
| `components/sections/FeaturedWork.tsx` | Animation patterns, card layout reference |
| `lib/utils/animations.ts` | fadeUp, staggerContainer variants |
| `lib/utils/cn.ts` | Class name utility |

---

## 3. Data Structure Specification

### Extended CaseStudy Interface

**File:** `lib/data/case-studies.ts`

```typescript
export interface CaseStudyMetric {
  label: string
  value: number
  prefix?: string  // e.g., '+', '-'
  suffix?: string  // e.g., '%', 'x', 'K'
}

export interface CaseStudyImage {
  src: string
  alt: string
  caption?: string
  aspectRatio?: '16/9' | '4/3' | '1/1' | '3/4'
}

export interface CaseStudySection {
  title: string
  content: string  // Rich text / markdown
  images?: CaseStudyImage[]
}

export type Industry = 'SaaS' | 'IIoT' | 'Insurance' | 'Food Service' | 'Marketplace'

export type ServiceType =
  | 'UX Research'
  | 'Prototyping'
  | 'Onboarding Strategy'
  | 'AI Integration'
  | 'Platform Design'
  | 'Landing Page Design'
  | 'Role-Based Onboarding'
  | 'AI-Driven Training'
  | 'UX Design'
  | 'Cross-Functional Collaboration'

export interface CaseStudy {
  // Basic Info (existing)
  slug: string
  title: string
  client: string
  industry: Industry
  thumbnail: string
  description: string
  services: ServiceType[]
  outcomes: string[]
  metrics: CaseStudyMetric[]
  featured: boolean
  year: string

  // Extended Content (new)
  heroImage: string
  clientLogo?: string
  timeline: string  // e.g., "3 months"
  role: string      // e.g., "Lead UX Designer"
  tools: string[]   // e.g., ['Figma', 'Maze', 'Notion']

  // Case Study Sections
  problem: {
    background: string
    painPoints: string[]
    businessChallenge: string
  }

  solution: {
    approach: string
    keyDecisions: string[]
    images: CaseStudyImage[]
  }

  results: {
    metrics: CaseStudyMetric[]
    testimonial?: {
      quote: string
      author: string
      role: string
    }
    businessImpact: string
  }

  // SEO
  metaDescription: string
  keywords: string[]
}

// Helper Functions (new)
export function getAllIndustries(): Industry[]
export function getAllServiceTypes(): ServiceType[]
export function getNextCaseStudy(currentSlug: string): CaseStudy | null
export function getPreviousCaseStudy(currentSlug: string): CaseStudy | null
```

### Sample Data Structure

```typescript
{
  slug: 'atlas-onboarding',
  title: 'Atlas Onboarding',
  client: 'Atlas',
  industry: 'SaaS',
  thumbnail: '/images/Case Covers/Atlas Onboarding.png',
  heroImage: '/images/Cases/Atlas Onboarding/Atlas Onboarding 01-min.png',
  description: 'Redesigned the onboarding flow for an IIoT platform...',
  services: ['UX Research', 'Prototyping', 'Onboarding Strategy'],
  outcomes: ['Increased User Adoption', 'Improved Sales Conversion'],
  metrics: [
    { label: 'User Adoption', value: 47, suffix: '%', prefix: '+' },
    { label: 'Sales Conversion', value: 32, suffix: '%', prefix: '+' },
  ],
  featured: true,
  year: '2024',
  timeline: '3 months',
  role: 'Lead UX Designer',
  tools: ['Figma', 'Maze', 'Notion', 'Miro'],

  problem: {
    background: 'Atlas, an IIoT platform for industrial asset management...',
    painPoints: [
      'High drop-off rate during initial setup',
      'Users struggling to understand value proposition',
      'Complex technical onboarding without guidance',
    ],
    businessChallenge: 'Sales team spending excessive time on demos...',
  },

  solution: {
    approach: 'We implemented a user-centered design process...',
    keyDecisions: [
      'Progressive disclosure of features',
      'Interactive product tours',
      'Role-based onboarding paths',
    ],
    images: [
      { src: '/images/Cases/Atlas Onboarding/Atlas Onboarding 02-min.png', alt: 'Wireframes', caption: 'Initial wireframe explorations' },
      { src: '/images/Cases/Atlas Onboarding/Atlas Onboarding 03-min.png', alt: 'User flows', caption: 'Redesigned user flow' },
    ],
  },

  results: {
    metrics: [
      { label: 'User Adoption', value: 47, suffix: '%', prefix: '+' },
      { label: 'Sales Conversion', value: 32, suffix: '%', prefix: '+' },
      { label: 'Onboarding Time', value: 40, suffix: '%', prefix: '-' },
    ],
    testimonial: {
      quote: 'The new onboarding reduced our support tickets by 60%...',
      author: 'John Smith',
      role: 'VP of Product, Atlas',
    },
    businessImpact: 'The redesigned onboarding contributed to a 28% increase in annual recurring revenue.',
  },

  metaDescription: 'UX case study: How I increased user adoption by 47% for Atlas IIoT platform through strategic onboarding redesign.',
  keywords: ['UX case study', 'onboarding design', 'IIoT', 'SaaS'],
}
```

---

## 4. Component Specifications

### 4.1 Work Index Page (`app/work/page.tsx`)

**Layout:**
```
+------------------------------------------+
|  [Page Header]                           |
|  "Work" title + description              |
+------------------------------------------+
|  [Category Filter Bar]                   |
|  All | SaaS | Insurance | Food | ...     |
+------------------------------------------+
|  [Case Study Grid - 2 columns]           |
|  +----------------+  +----------------+  |
|  | Card 1         |  | Card 2         |  |
|  | - Thumbnail    |  | - Thumbnail    |  |
|  | - Title        |  | - Title        |  |
|  | - Industry     |  | - Industry     |  |
|  | - Key Metric   |  | - Key Metric   |  |
|  +----------------+  +----------------+  |
|  +----------------+  +----------------+  |
|  | Card 3         |  | Card 4         |  |
|  +----------------+  +----------------+  |
+------------------------------------------+
```

**Behavior:**
- Client-side filtering by industry (no page reload)
- "All" shows all case studies (default state)
- Cards animate in with stagger effect
- Hover: Card lifts with shadow, image zooms slightly

**SEO Metadata:**
```typescript
export const metadata: Metadata = {
  title: 'Work | Rodrigo Seoane - UX Portfolio',
  description: 'Explore UX design case studies showcasing measurable results in SaaS onboarding, customer retention, and product design.',
  openGraph: {
    title: 'Work | Rodrigo Seoane',
    description: 'UX design case studies with measurable business impact.',
  },
}
```

### 4.2 Case Study Card (`components/ui/CaseStudyCard.tsx`)

**Props Interface:**
```typescript
interface CaseStudyCardProps {
  caseStudy: CaseStudy
  priority?: boolean  // For image loading priority
}
```

**Visual Design:**
- Aspect ratio: 4:3 for thumbnail
- Thumbnail with zoom effect on hover (scale 1.05)
- Dark overlay appears on hover with arrow icon
- Industry badge (top-left, using Badge component)
- Primary metric badge (bottom-right, e.g., "+47% Adoption")
- Title and client name below image
- Services as subtle tags

**Animation:**
- `whileHover`: Card lifts -8px, shadow increases
- Image scale transform: 1 to 1.05
- Overlay opacity: 0 to 0.6
- Duration: 300ms, easeOut

### 4.3 Category Filter (`components/ui/CategoryFilter.tsx`)

**Props Interface:**
```typescript
interface CategoryFilterProps {
  categories: string[]
  activeCategory: string
  onCategoryChange: (category: string) => void
}
```

**Behavior:**
- Horizontal scrollable on mobile
- Active state: filled background (dark-900), white text
- Inactive state: transparent, dark-900 text, border
- Smooth transition between states
- "All" always first

**Visual Design:**
- Pill-shaped buttons
- Spacing: gap-3
- Active indicator: animated underline using `layoutId`

### 4.4 Individual Case Study Page (`app/work/[slug]/page.tsx`)

**Page Structure:**
```
+------------------------------------------+
|  [Progress Bar - sticky top]             |
+------------------------------------------+
|  [CaseStudyHero]                         |
|  - Client name/logo                      |
|  - Project title                         |
|  - Industry tag                          |
|  - Year                                  |
|  - Hero image                            |
|  - Key metric badges                     |
+------------------------------------------+
|  [CaseStudyOverview]                     |
|  - Problem statement (brief)             |
|  - My role                               |
|  - Timeline                              |
|  - Tools used                            |
+------------------------------------------+
|  [CaseStudySection: Problem]             |
|  - Background                            |
|  - User pain points (list)               |
|  - Business challenge                    |
+------------------------------------------+
|  [CaseStudySection: Solution]            |
|  - Design approach                       |
|  - Key decisions (list)                  |
|  - Image gallery (clickable lightbox)    |
+------------------------------------------+
|  [CaseStudyResults]                      |
|  - Animated metric counters              |
|  - Testimonial (if available)            |
|  - Business impact statement             |
+------------------------------------------+
|  [NextProject]                           |
|  - Preview of next case study            |
|  - "View Next Project" CTA               |
+------------------------------------------+
```

**Dynamic Routing:**
```typescript
// app/work/[slug]/page.tsx
import { notFound } from 'next/navigation'
import { caseStudies, getCaseStudyBySlug, getNextCaseStudy } from '@/lib/data/case-studies'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return caseStudies.map((study) => ({
    slug: study.slug,
  }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const caseStudy = getCaseStudyBySlug(slug)

  if (!caseStudy) {
    return { title: 'Case Study Not Found' }
  }

  return {
    title: `${caseStudy.title} | Rodrigo Seoane`,
    description: caseStudy.metaDescription,
    keywords: caseStudy.keywords,
    openGraph: {
      title: `${caseStudy.title} - Case Study`,
      description: caseStudy.metaDescription,
      images: [caseStudy.heroImage],
    },
  }
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params
  const caseStudy = getCaseStudyBySlug(slug)

  if (!caseStudy) {
    notFound()
  }

  const nextProject = getNextCaseStudy(slug)

  return (
    <>
      <ProgressBar />
      <CaseStudyHero caseStudy={caseStudy} />
      <CaseStudyOverview caseStudy={caseStudy} />
      <CaseStudySection title="The Challenge" id="problem">
        {/* Problem content */}
      </CaseStudySection>
      <CaseStudySection title="The Solution" id="solution">
        {/* Solution content + images */}
      </CaseStudySection>
      <CaseStudyResults caseStudy={caseStudy} />
      {nextProject && <NextProject caseStudy={nextProject} />}
    </>
  )
}
```

### 4.5 Progress Bar (`components/ui/ProgressBar.tsx`)

**Implementation:**
```typescript
'use client'

import { motion, useScroll, useSpring } from 'framer-motion'

export function ProgressBar() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-primary-yellow origin-left z-50"
      style={{ scaleX }}
    />
  )
}
```

**Design:**
- Height: 4px
- Color: primary-yellow (#FFD115)
- Position: fixed top
- z-index: 50 (above navigation)
- Smooth spring animation for natural feel

### 4.6 Case Study Hero (`components/sections/case-study/CaseStudyHero.tsx`)

**Layout:**
```
+------------------------------------------+
|  Background: primary-yellow              |
|                                          |
|  [Industry Badge]                        |
|  [CLIENT NAME]                           |
|  [Project Title - Large]                 |
|  [Year] | [Timeline]                     |
|                                          |
|  +------------------------------------+  |
|  |                                    |  |
|  |      [Hero Image]                  |  |
|  |                                    |  |
|  +------------------------------------+  |
|                                          |
|  [Metric Badge 1] [Metric Badge 2] [..] |
+------------------------------------------+
```

**Props:**
```typescript
interface CaseStudyHeroProps {
  caseStudy: CaseStudy
}
```

**Animation:**
- Title: fadeUp with 0.3s delay
- Image: scale from 0.95 to 1, opacity 0 to 1
- Metrics: stagger from bottom with 0.1s delay each

### 4.7 Case Study Overview (`components/sections/case-study/CaseStudyOverview.tsx`)

**Layout:** 4-column grid on desktop, 2-column on tablet, stacked on mobile

```
+----------+----------+----------+----------+
| Role     | Timeline | Tools    | Problem  |
| Lead UX  | 3 months | Figma,   | Brief    |
| Designer |          | Maze...  | overview |
+----------+----------+----------+----------+
```

**Design:**
- Background: cream-500 (#FFF9F0)
- Cards with subtle borders
- Icon for each category
- Stagger animation on scroll

### 4.8 Case Study Section (`components/sections/case-study/CaseStudySection.tsx`)

**Props:**
```typescript
interface CaseStudySectionProps {
  title: string
  id?: string  // For anchor links
  children: React.ReactNode
  background?: 'white' | 'cream' | 'dark'
}
```

**Design:**
- Consistent padding (py-16 lg:py-24)
- Max-width container
- Title with orange-400 accent line
- Prose styling for content

### 4.9 Image Lightbox (`components/ui/ImageLightbox.tsx`)

**Props:**
```typescript
interface ImageLightboxProps {
  images: CaseStudyImage[]
  initialIndex?: number
  isOpen: boolean
  onClose: () => void
}
```

**Features:**
- Full-screen overlay with dark background (bg-dark-900/95)
- Current image centered with object-fit contain
- Navigation arrows (left/right)
- Thumbnail strip at bottom (optional)
- Counter (e.g., "2/5")
- Caption display below image
- Zoom controls (optional for v1.1)

**Keyboard Support:**
- Escape: Close lightbox
- ArrowLeft: Previous image
- ArrowRight: Next image
- Tab: Navigate between controls

**Accessibility:**
- `role="dialog"` with `aria-modal="true"`
- `aria-label="Image gallery viewer"`
- Focus trap within modal
- Return focus to trigger element on close
- Announce image changes to screen readers

**Animation:**
- Overlay fade in (opacity 0 to 1)
- Image scale in (0.9 to 1)
- Navigation elements slide in from edges
- Close animation reverses

### 4.10 Animated Counter (`components/ui/AnimatedCounter.tsx`)

**Props:**
```typescript
interface AnimatedCounterProps {
  value: number
  prefix?: string
  suffix?: string
  duration?: number  // seconds, default 2
  className?: string
}
```

**Implementation Pattern:**
```typescript
'use client'

import { useEffect, useRef, useState } from 'react'
import { useInView, animate } from 'framer-motion'

export function AnimatedCounter({
  value,
  prefix = '',
  suffix = '',
  duration = 2,
  className,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    if (isInView) {
      const controls = animate(0, value, {
        duration,
        onUpdate: (latest) => setDisplayValue(Math.round(latest)),
      })
      return () => controls.stop()
    }
  }, [isInView, value, duration])

  return (
    <span ref={ref} className={className}>
      {prefix}{displayValue}{suffix}
    </span>
  )
}
```

**Trigger:** Animation starts when element enters viewport (useInView)

### 4.11 Case Study Results (`components/sections/case-study/CaseStudyResults.tsx`)

**Layout:**
```
+------------------------------------------+
|  Background: primary-yellow              |
|                                          |
|  [Results Title]                         |
|                                          |
|  +----------+  +----------+  +----------+|
|  | +47%     |  | +32%     |  | -40%     ||
|  | User     |  | Sales    |  | Onboard  ||
|  | Adoption |  | Convers. |  | Time     ||
|  +----------+  +----------+  +----------+|
|                                          |
|  [Testimonial Quote]                     |
|  - Quote text                            |
|  - Author, Role                          |
|                                          |
|  [Business Impact Statement]             |
+------------------------------------------+
```

**Animation:**
- Metrics: AnimatedCounter triggered on scroll
- Testimonial: fadeUp after metrics complete
- Large numbers with prefix/suffix styling

### 4.12 Next Project Preview (`components/sections/case-study/NextProject.tsx`)

**Props:**
```typescript
interface NextProjectProps {
  caseStudy: CaseStudy
}
```

**Layout:**
```
+------------------------------------------+
|  Background: dark-900                    |
|                                          |
|  [Up Next]                               |
|  [Project Title]                         |
|  [Industry Tag]                          |
|                                          |
|  +------------------------------------+  |
|  |      [Thumbnail Preview]           |  |
|  +------------------------------------+  |
|                                          |
|  [View Case Study ->]                    |
+------------------------------------------+
```

**Behavior:**
- Full-width clickable area links to next case study
- Hover: Image zooms, title underlines
- Wraps to first case study if at end

---

## 5. Interaction Specifications

### 5.1 Work Index Page Filtering

**State Management:**
```typescript
const [activeCategory, setActiveCategory] = useState<string>('All')

const filteredStudies = activeCategory === 'All'
  ? caseStudies
  : caseStudies.filter(study => study.industry === activeCategory)
```

**Animation on Filter Change:**
- Exiting cards: fade out (opacity to 0)
- Entering cards: stagger fade in from bottom
- Layout animation for grid reflow
- Use AnimatePresence for smooth transitions

### 5.2 Card Hover Effects

```typescript
<motion.div
  whileHover={{
    y: -8,
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  }}
  transition={{ duration: 0.3, ease: 'easeOut' }}
>
  {/* Card content */}
</motion.div>
```

### 5.3 Lightbox Interactions

**Opening:**
1. User clicks image in solution section
2. Store current scroll position
3. Open lightbox with initial image index
4. Body scroll locked
5. Focus moves to lightbox

**Navigation:**
1. Click arrow or press arrow key
2. Current image fades/slides out
3. New image fades/slides in
4. Counter updates
5. Screen reader announces "Image X of Y"

**Closing:**
1. User clicks close button, overlay, or presses Escape
2. Lightbox animates out
3. Body scroll unlocked
4. Focus returns to original trigger
5. Scroll position restored

### 5.4 Progress Bar Behavior

- Appears immediately on case study pages
- Updates smoothly as user scrolls
- Reaches 100% at page bottom
- Persists during scroll
- Does not appear on index page

---

## 6. Accessibility Requirements

### WCAG 2.1 AA Compliance

**Color Contrast:**
- Text on yellow background: Use dark-900 (#080D00) for AAA contrast
- Metrics text: Large text (24px+) can use lighter colors
- Interactive elements: 4.5:1 minimum contrast ratio

**Keyboard Navigation:**
- All interactive elements focusable via Tab
- Visible focus indicators (outline or ring)
- Filter buttons operable via Enter/Space
- Cards focusable with Enter to navigate
- Lightbox fully keyboard accessible

**Screen Reader Support:**
- Semantic heading structure (h1 > h2 > h3)
- Alt text on all images
- Descriptive link text (not "click here")
- ARIA labels on icon-only buttons
- Live regions for dynamic content (filter results, lightbox navigation)

**Motion Preferences:**
```typescript
const prefersReducedMotion = useReducedMotion()

const animationProps = prefersReducedMotion
  ? { initial: { opacity: 1 }, animate: { opacity: 1 } }
  : { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 } }
```

**Lightbox Accessibility:**
- Focus trap within lightbox
- `role="dialog"` with `aria-modal="true"`
- `aria-labelledby` pointing to caption
- Close button with `aria-label="Close gallery"`
- Navigation buttons with `aria-label="Previous image"` / `"Next image"`

---

## 7. Performance Considerations

### Image Optimization

**Next.js Image Component:**
```typescript
<Image
  src={caseStudy.thumbnail}
  alt={caseStudy.title}
  fill
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
  className="object-cover"
  priority={index < 4}  // Prioritize above-fold images
/>
```

**Recommendations:**
- Use WebP format where possible
- Implement blur placeholder for images
- Lazy load images below fold
- Set explicit width/height or use fill with sizes

### Code Splitting

- Dynamic import for ImageLightbox (not needed on initial load)
- Keep case study page bundle under 150KB JS

```typescript
const ImageLightbox = dynamic(
  () => import('@/components/ui/ImageLightbox'),
  { loading: () => <div className="animate-pulse bg-neutral-200 w-full h-96" /> }
)
```

### Animation Performance

- Use `transform` and `opacity` only (GPU-accelerated)
- Avoid animating `width`, `height`, `margin`
- Use `will-change: transform` sparingly
- Implement `useReducedMotion` hook
- Keep animations under 300ms for responsive feel

### Static Generation

- All case study pages pre-rendered at build time
- Use `generateStaticParams` for all slugs
- Metadata generated statically per page
- ISR not needed (content rarely changes)

---

## 8. Responsive Design Specifications

### Breakpoints

| Breakpoint | Grid Columns | Container Padding |
|------------|--------------|-------------------|
| Mobile (<640px) | 1 column | px-6 |
| Tablet (640-1024px) | 2 columns | px-8 |
| Desktop (>1024px) | 2 columns | px-20 |

### Work Index Page

**Mobile:**
- Single column card layout
- Horizontal scrolling filter bar
- Full-width cards
- Reduced card padding

**Desktop:**
- 2-column grid
- Fixed filter bar
- Hover effects enabled

### Case Study Page

**Mobile:**
- Stacked overview grid (single column)
- Full-width images
- Swipe for lightbox navigation
- Metrics in 2-column grid

**Desktop:**
- 4-column overview grid
- Side-by-side images where appropriate
- Arrow navigation for lightbox
- Metrics in 3-column grid

---

## 9. Acceptance Criteria

### Work Index Page

- [ ] Page displays all case studies in 2-column grid
- [ ] Category filter shows all unique industries
- [ ] Clicking filter updates displayed cards without page reload
- [ ] Card hover shows lift effect and shadow
- [ ] Cards display thumbnail, title, client, industry badge, key metric
- [ ] Clicking card navigates to case study page
- [ ] Page is fully responsive
- [ ] All animations respect prefers-reduced-motion

### Case Study Page

- [ ] Progress bar appears and tracks scroll position
- [ ] Hero section displays all project metadata
- [ ] Overview section shows role, timeline, tools
- [ ] Problem section displays background and pain points
- [ ] Solution section displays approach and images
- [ ] Clicking images opens lightbox
- [ ] Results section shows animated metrics (count up on scroll)
- [ ] Next project preview links to next case study
- [ ] Last case study wraps to first
- [ ] Page has unique SEO metadata
- [ ] Page is accessible via keyboard only

### Lightbox

- [ ] Opens with selected image
- [ ] Arrow keys navigate between images
- [ ] Escape key closes lightbox
- [ ] Click outside image closes lightbox
- [ ] Focus is trapped within lightbox
- [ ] Counter shows current position
- [ ] Animation is smooth (no jank)

### Data

- [ ] At least 3 case studies fully populated with real content
- [ ] All images have alt text
- [ ] Metrics have accurate values
- [ ] Helper functions work correctly

---

## 10. Dependencies and Risks

### Dependencies

| Dependency | Purpose | Already Installed |
|------------|---------|-------------------|
| framer-motion | Animations, scroll progress | Yes (v12.29.2) |
| lucide-react | Icons | Yes |
| next/image | Image optimization | Yes (built-in) |
| react-intersection-observer | Viewport detection | Yes |

### Risks and Mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| Content not ready | Medium | Use placeholder content, design for easy updates |
| Lightbox performance | Low | Lazy load component, optimize images |
| Animation jank on mobile | Medium | Test on real devices, reduce motion complexity |
| SEO metadata incomplete | Low | Generate defaults from base data |
| Large image files | High | Enforce max file sizes, use next/image |

---

## 11. Documentation Excerpts

### Next.js generateStaticParams
**Source:** [Next.js Documentation](https://nextjs.org/docs/app/api-reference/functions/generate-static-params)

> The `generateStaticParams` function can be used in combination with dynamic route segments to statically generate routes at build time instead of on-demand at request time.

### Framer Motion useScroll
**Source:** [Motion Documentation](https://motion.dev/docs/react-use-scroll)

```jsx
const { scrollYProgress } = useScroll()
return <motion.div style={{ scaleX: scrollYProgress }} />
```

### Accessible Modal Guidelines
**Source:** [A11Y Collective](https://www.a11y-collective.com/blog/modal-accessibility/)

> When a modal opens, the keyboard focus must shift directly to it, and focus should remain confined within the modal until it closes. Use `role="dialog"`, `aria-modal="true"`, `aria-labelledby`, and `aria-describedby` for screen reader support.

### UX Case Study Best Practices
**Source:** [UXfol.io](https://blog.uxfol.io/ux-case-study-template/)

> Lead with Results. You should include the results of the project before the full case study begins. Hiring managers are busy people and may only have allocated five minutes to review your whole portfolio.

---

## 12. Internal Pattern References

### Animation Variants Pattern
**Source:** `/Users/rodrigo.seoane/local-sites/portfolio-2026/lib/utils/animations.ts`

```typescript
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
}

export const staggerContainer: Variants = {
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

### Card Hover Pattern
**Source:** `/Users/rodrigo.seoane/local-sites/portfolio-2026/components/ui/Card.tsx`

```typescript
<motion.div
  whileHover={
    hover
      ? { y: -4, boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }
      : undefined
  }
  transition={{ duration: 0.3, ease: 'easeOut' }}
>
```

### Section Component Pattern
**Source:** `/Users/rodrigo.seoane/local-sites/portfolio-2026/components/sections/FeaturedWork.tsx`

```typescript
const sectionVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
}

function CaseSection({ caseData, imagePosition, index }: CaseSectionProps) {
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

### Badge Component
**Source:** `/Users/rodrigo.seoane/local-sites/portfolio-2026/components/ui/Badge.tsx`

Use for industry tags and metric badges with `variant="warning"` for yellow emphasis.

---

## 13. Open Questions

1. **Image aspect ratios:** Should all case study images enforce a consistent aspect ratio, or allow mixed ratios?

2. **Lightbox gallery vs. inline images:** Should all images in the solution section open in lightbox, or only selected gallery images?

3. **Case study length:** Is there a target word count or scroll length for case studies? (Currently ~60 seconds read time recommended)

4. **Video support:** Should the lightbox support video embeds in v1.0, or defer to v1.1?

5. **Filter persistence:** Should the active filter category persist when returning from a case study page?

6. **Mobile navigation:** Should there be swipe gestures to navigate between case studies on mobile?

---

## 14. External Sources & References

### Documentation
- [Next.js Dynamic Routes](https://nextjs.org/docs/app/api-reference/file-conventions/dynamic-routes)
- [Next.js generateStaticParams](https://nextjs.org/docs/app/api-reference/functions/generate-static-params)
- [Motion useScroll](https://motion.dev/docs/react-use-scroll)
- [Motion AnimateNumber](https://motion.dev/docs/react-animate-number)
- [React Aria Modal](https://react-spectrum.adobe.com/react-aria/Modal.html)

### Tutorials & Best Practices
- [UX Case Study Template - UXfol.io](https://blog.uxfol.io/ux-case-study-template/)
- [Accessible Modal Implementation - A11Y Collective](https://www.a11y-collective.com/blog/modal-accessibility/)
- [Framer Motion Scroll Animations - LogRocket](https://blog.logrocket.com/react-scroll-animations-framer-motion/)
- [Client-side Filtering in React - CSS-Tricks](https://css-tricks.com/filtering-data-client-side-comparing-css-jquery-and-react/)
- [React Filter by Category - ReactHustle](https://reacthustle.com/blog/react-filter-by-category)

### Design Inspiration
- [Magic UI Next.js Portfolio Templates](https://magicui.design/blog/nextjs-portfolio-template)
- [Codrops Case Study: Stefan Vitasovic Portfolio](https://tympanus.net/codrops/2025/03/05/case-study-stefan-vitasovic-portfolio-2025/)
- [CareerFoundry UX Portfolio Examples](https://careerfoundry.com/en/blog/ux-design/ux-portfolio-examples-inspiration/)

### GitHub Resources
- [driaug/animated-counter](https://github.com/driaug/animated-counter) - Animated counter with Framer Motion
- [react-aria-modal](https://github.com/davidtheclark/react-aria-modal) - Accessible modal implementation

---

**Document Status:** Ready for Specification Review
**Next Steps:**
1. Review and approve PRD
2. Finalize case study content for 3 projects
3. Create technical specification (SPEC-work-portfolio-section.md)
4. Begin implementation following component order above
5. Test on multiple devices and screen readers
