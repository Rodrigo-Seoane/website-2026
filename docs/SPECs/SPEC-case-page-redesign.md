# Technical Specification: Case Page Redesign

**Based on:** PRD-case-page-redesign.md
**Figma Reference:** https://www.figma.com/design/hWnOIJprK4cfVhAW0kPKlK/Portfolio--UI-Design?node-id=234-13945&m=dev
**Created:** February 18, 2026
**Target:** frontend-craftsman agent

---

## Overview

This specification details the implementation of a complete redesign for individual case study pages, transforming the hero section and adding new Context/Objectives and Key Deliverables sections to match the approved Figma design. The redesign focuses on:

1. **Hero Section Transformation**: Larger title (60px), tagline, testimonial card overlay, redesigned metrics display, and 2:1 hero image ratio with gold border accent
2. **New Sections**: Context & Objectives (two-column layout) and Key Deliverables (three stat cards)
3. **Testimonial Repositioning**: Move testimonial from Results section to Hero section overlay
4. **Service Badge Styling**: New terciary variant with muted background

### User Decisions Implemented

- **Image Ratio**: ALL case study hero images standardized to 2:1 aspect ratio
- **Testimonial**: Display ONLY in hero section (remove from results)
- **Scope**: Complete implementation of Hero + Context/Objectives + Key Deliverables sections

### Figma Reference Details

- **Node ID**: 234:13945
- **Design File**: Portfolio UI Design
- **Screenshots**: Full page design extracted and analyzed

---

## Planning Reasoning

### Architectural Decisions

1. **Testimonial Component Architecture**
   - Create dedicated `TestimonialCard.tsx` component for reusability
   - Uses absolute positioning within hero container on desktop
   - Stacks below hero image on mobile
   - Component accepts testimonial data and supports custom positioning

2. **Impact Metric Component Strategy**
   - Create `ImpactMetric.tsx` for value+label stacked display
   - Replaces inline badge pattern in hero
   - Cleaner separation of concerns vs. inline rendering

3. **Badge Variant Extension**
   - Add `terciary` variant to existing Badge component
   - Maps to `--color-content-disable-primary` (#686B63) background
   - Uses `--color-content-active-secondary` (#F7F7F7) for text

4. **Data Schema Additions**
   - Add optional `tagline` field to CaseStudy interface
   - Migrate existing subtitle data from CaseBlockSection component
   - No breaking changes - field is optional with fallback behavior

5. **Design Token Strategy**
   - Add `--color-surface-quaternary` (#FFFAE8) for testimonial card background
   - Add `--color-border-accent` (#665408) for hero image border
   - Reuse existing tokens where possible to maintain consistency

### Component Modification Strategy

The existing hero component will undergo a **major refactor** rather than incremental changes:
- Complete layout restructure to match Figma node hierarchy
- New responsive breakpoint logic for testimonial positioning
- Hero image aspect ratio change from 16:9 to 2:1
- Service badges replace timeline/year metadata in top section

---

## Data Schema Changes

### 1. Update CaseStudy Interface

**File**: `/Users/rodrigo.seoane/local-sites/portfolio-2026/lib/data/case-studies.ts`

Add the following optional field to the `CaseStudy` interface (after line 45):

```typescript
export interface CaseStudy {
  // ... existing fields ...
  year: string

  // NEW: Tagline for hero section
  tagline?: string  // Short descriptor, e.g., "UX-Driven National Expansion through Targeted Onboarding"

  // --- Extended Content (new fields) ---
  heroImage: string
  // ... rest of fields ...
}
```

### 2. Populate Tagline Data

Add `tagline` field to each case study entry. These values are sourced from the existing `caseSubtitles` mapping in `CaseBlockSection.tsx`:

**Di Blasi Franchise** (line ~252):
```typescript
{
  slug: 'diblasi-franchise',
  title: 'Di Blasi Franchise Expansion',
  client: 'Di Blasi',
  industry: 'Food Service',
  tagline: 'UX-Driven National Expansion through Targeted Onboarding',
  // ... rest of fields ...
}
```

**Atlas Onboarding** (line ~81):
```typescript
{
  slug: 'atlas-onboarding',
  title: 'Atlas Onboarding',
  client: 'Atlas',
  industry: 'SaaS',
  tagline: 'Simplifying Enterprise IIoT Setup for Non-Technical Users',
  // ... rest of fields ...
}
```

**BennitAI Marketplace** (line ~166):
```typescript
{
  slug: 'bennitai-marketplace',
  title: 'BennitAI Marketplace',
  client: 'BennitAI',
  industry: 'Marketplace',
  tagline: 'Transparent AI-Powered Matching for Freelance Professionals',
  // ... rest of fields ...
}
```

**AXA GO Agent's Coach** (line ~336):
```typescript
{
  slug: 'axa-go-agents-coach',
  title: "AXA GO Agent's Coach Initiative",
  client: 'AXA',
  industry: 'Insurance',
  tagline: 'AI-Driven Training Platform Reducing Agent Churn',
  // ... rest of fields ...
}
```

**Atlas Optimise** (line ~421):
```typescript
{
  slug: 'atlas-optimise',
  title: 'Atlas Optimise',
  client: 'Atlas',
  industry: 'SaaS',
  tagline: 'Enterprise Resource Management & B2B Marketplace Innovation',
  // ... rest of fields ...
}
```

---

## Design Token Updates

### File: `/Users/rodrigo.seoane/local-sites/portfolio-2026/app/globals.css`

Add the following new color tokens inside the `@theme inline` block (after line 12):

```css
@theme inline {
  /* ... existing tokens ... */
  --color-surface-terciary: #fff9f0;

  /* NEW: Testimonial card and accents */
  --color-surface-quaternary: #fffae8;  /* Warm cream for testimonial card background */
  --color-border-accent: #665408;       /* Gold/brown for hero image border */

  /* === CONTENT: Active === */
  --color-content-active-primary: #080d00;
  /* ... rest of tokens ... */
}
```

### Token Usage Reference

| Figma Token | CSS Custom Property | Hex Value | Usage in This Spec |
|-------------|---------------------|-----------|-------------------|
| `--surface/primary` | `--color-surface-primary` | #FFD115 | Hero background |
| `--surface/terciary` | `--color-content-disable-primary` | #686B63 | Service badge backgrounds |
| `--surface/quaternary` | `--color-surface-quaternary` | #FFFAE8 | Testimonial card background |
| `--surface/action/quaternary` | `--color-border-accent` | #665408 | Hero image border, testimonial card border |
| `--body/content/primary` | `--color-content-active-primary` | #1A1502 | Primary text |
| `--body/content/secondary` | `--color-content-active-secondary` | #F7F7F7 | Light text on dark badges |

---

## Component Specifications

### 1. ImpactMetric Component (NEW)

**File**: `/Users/rodrigo.seoane/local-sites/portfolio-2026/components/ui/ImpactMetric.tsx`
**Type**: Presentational component (no client directive needed)

#### Props Interface

```typescript
interface ImpactMetricProps {
  value: string      // e.g., "40%"
  label: string      // e.g., "Improvement in Lead Qualification"
  className?: string
}
```

#### Implementation

```typescript
import { cn } from '@/lib/utils/cn'

interface ImpactMetricProps {
  value: string
  label: string
  className?: string
}

export function ImpactMetric({ value, label, className }: ImpactMetricProps) {
  return (
    <div className={cn('flex flex-col gap-1', className)}>
      <p className="font-display font-bold text-[32px] leading-[1.1] text-content-active-primary">
        {value}
      </p>
      <p className="font-body text-[14px] leading-[1.32] text-content-active-primary max-w-[150px]">
        {label}
      </p>
    </div>
  )
}
```

#### Design Specifications

- **Value Typography**: Plus Jakarta Sans Bold, 32px, line-height 1.1
- **Label Typography**: Inter Regular, 14px, line-height 1.32
- **Label Max Width**: 150px (forces text wrapping for longer labels)
- **Gap**: 4px between value and label
- **Color**: Both use `--color-content-active-primary` (#1A1502)

#### Responsive Behavior

- Mobile (< 640px): Same sizing, stacks vertically in grid
- Tablet/Desktop: Horizontal layout with 36px gap between metrics

---

### 2. TestimonialCard Component (NEW)

**File**: `/Users/rodrigo.seoane/local-sites/portfolio-2026/components/ui/TestimonialCard.tsx`
**Type**: Client component (uses motion animations)

#### Props Interface

```typescript
import { CaseStudyTestimonial } from '@/lib/data/case-studies'

interface TestimonialCardProps {
  testimonial: CaseStudyTestimonial
  className?: string
}
```

#### Implementation

```typescript
'use client'

import Image from 'next/image'
import { cn } from '@/lib/utils/cn'
import type { CaseStudyTestimonial } from '@/lib/data/case-studies'

interface TestimonialCardProps {
  testimonial: CaseStudyTestimonial
  className?: string
}

export function TestimonialCard({ testimonial, className }: TestimonialCardProps) {
  return (
    <div
      className={cn(
        'bg-surface-quaternary border-4 border-border-accent rounded-lg p-5',
        'shadow-[0px_4px_16px_0px_rgba(130,130,130,0.15)]',
        'flex flex-col gap-6',
        className
      )}
    >
      {/* Quote Icon */}
      <div className="relative w-8 h-6">
        <svg
          viewBox="0 0 32 23"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          <path
            d="M0 22.848V9.504C0 3.168 3.168 0 9.504 0h3.168v3.168H9.504c-3.168 0-6.336 0-6.336 6.336v3.168h9.504v9.504H0v.672zm19.008 0V9.504C19.008 3.168 22.176 0 28.512 0h3.168v3.168h-3.168c-3.168 0-6.336 0-6.336 6.336v3.168h9.504v9.504h-12.672v.672z"
            fill="currentColor"
            className="text-content-active-primary opacity-30"
          />
        </svg>
      </div>

      {/* Quote Title */}
      <p className="font-body font-semibold text-[14px] leading-none tracking-[0.56px] uppercase text-content-active-primary">
        {testimonial.quote.substring(0, 30)}...
      </p>

      {/* Quote Body */}
      <p className="font-body text-[16px] leading-[1.32] text-content-active-primary">
        {testimonial.quote}
      </p>

      {/* Author Info */}
      <div className="flex gap-4 items-start">
        {/* Avatar Placeholder - Replace with actual image if available */}
        <div className="w-12 h-12 rounded-full bg-content-disable-light overflow-hidden flex-shrink-0">
          {/* Placeholder - could be replaced with Image component if avatar data added */}
          <div className="w-full h-full bg-gradient-to-br from-surface-primary to-accent-primary" />
        </div>

        {/* Name and Role */}
        <div className="flex flex-col gap-1">
          <p className="font-body font-medium text-[12px] leading-[1.2] tracking-[0.48px] uppercase text-content-active-primary">
            {testimonial.author.split(' ')[0]} {/* First name or company */}
          </p>
          <p className="font-body font-semibold text-[18px] leading-[1.32] text-content-active-primary">
            {testimonial.author}
          </p>
        </div>
      </div>
    </div>
  )
}
```

#### Design Specifications (from Figma)

- **Container**:
  - Background: `--color-surface-quaternary` (#FFFAE8)
  - Border: 4px solid `--color-border-accent` (#665408)
  - Border Radius: 8px
  - Padding: 20px
  - Width: 342px (desktop), 100% (mobile)
  - Shadow: 0px 4px 16px rgba(130, 130, 130, 0.15)

- **Quote Icon**:
  - Width: 31.68px
  - Height: 22.85px
  - Color: `--color-content-active-primary` at 30% opacity

- **Quote Title**:
  - Font: Inter Semi Bold, 14px
  - Line Height: 1
  - Letter Spacing: 0.56px
  - Text Transform: uppercase

- **Quote Body**:
  - Font: Inter Regular, 16px
  - Line Height: 1.32

- **Avatar**:
  - Size: 48px × 48px
  - Border Radius: 24px (full circle)

- **Author Info**:
  - Name Label: Inter Medium, 12px, uppercase, tracking 0.48px
  - Name: Inter Semi Bold, 18px, line-height 1.32

#### Responsive Behavior

- **Desktop (> 1024px)**:
  - Positioned absolute in hero container
  - Right-aligned with offset from hero image
  - Width: 342px fixed

- **Tablet (640px - 1024px)**:
  - Positioned absolute, smaller offset
  - Width: 300px

- **Mobile (< 640px)**:
  - Positioned static (not absolute)
  - Displayed below hero image
  - Full width with horizontal margins
  - Order: Logo → Title → Badges → Tagline → Metrics → Hero Image → **Testimonial**

---

### 3. Badge Component (MODIFY)

**File**: `/Users/rodrigo.seoane/local-sites/portfolio-2026/components/ui/Badge.tsx`

#### Add Terciary Variant

Update the `BadgeVariant` type and variants object:

```typescript
type BadgeVariant = 'default' | 'success' | 'warning' | 'info' | 'terciary'

const variants: Record<BadgeVariant, string> = {
  default: 'bg-neutral-100 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300',
  success: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  warning: 'bg-surface-primary/20 text-neutral-900',
  info: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  terciary: 'bg-content-disable-primary text-content-active-secondary', // NEW
}
```

#### Design Specifications for Terciary Variant

- **Background**: `--color-content-disable-primary` (#686B63)
- **Text Color**: `--color-content-active-secondary` (#F7F7F7)
- **Padding**: 12px horizontal, 6px vertical
- **Border Radius**: 16px (full pill shape)
- **Font**: Adelle Regular, 14px
- **Letter Spacing**: 1.4px
- **Gap Between Badges**: 6px

#### Usage Example (in Hero)

```typescript
<div className="flex gap-1.5 items-center">
  {caseStudy.services.map((service, index) => (
    <Badge
      key={index}
      variant="terciary"
      className="px-3 py-1.5 rounded-2xl text-[14px] tracking-[1.4px]"
    >
      {service}
    </Badge>
  ))}
</div>
```

---

### 4. CaseStudyHero Component (MAJOR REDESIGN)

**File**: `/Users/rodrigo.seoane/local-sites/portfolio-2026/components/sections/case-study/CaseStudyHero.tsx`

#### Complete Component Replacement

Replace the entire existing component with this new implementation:

```typescript
'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'
import { Badge } from '@/components/ui/Badge'
import { ImpactMetric } from '@/components/ui/ImpactMetric'
import { TestimonialCard } from '@/components/ui/TestimonialCard'
import { staggerContainer, fadeUp } from '@/lib/utils/animations'
import type { CaseStudy } from '@/lib/data/case-studies'

interface CaseStudyHeroProps {
  caseStudy: CaseStudy
}

const metricVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
}

export function CaseStudyHero({ caseStudy }: CaseStudyHeroProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <section ref={ref} className="bg-surface-primary pt-12 pb-16 lg:pb-24 relative overflow-hidden">
      <div className="container mx-auto px-6 lg:px-20">
        {/* Top Section: Logo + Title + Badges + Tagline + Metrics */}
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
          className="max-w-[900px] mb-12"
        >
          {/* Client Logo */}
          <motion.div variants={fadeUp} className="mb-2">
            {caseStudy.clientLogo ? (
              <Image
                src={caseStudy.clientLogo}
                alt={caseStudy.client}
                width={120}
                height={40}
                className="object-contain h-[40px] w-auto"
              />
            ) : (
              <p className="font-sans font-bold text-xl text-[#001d6c] uppercase tracking-[1px]">
                {caseStudy.client}
              </p>
            )}
          </motion.div>

          {/* Project Title */}
          <motion.h1
            variants={fadeUp}
            className="font-display font-extrabold text-[40px] lg:text-[60px] leading-[1.07] text-content-active-primary mb-2"
          >
            {caseStudy.title}
          </motion.h1>

          {/* Service Badges */}
          <motion.div variants={fadeUp} className="flex gap-1.5 flex-wrap mb-4">
            {caseStudy.services.slice(0, 3).map((service, index) => (
              <Badge
                key={index}
                variant="terciary"
                className="px-3 py-1.5 rounded-2xl text-[14px] tracking-[1.4px]"
              >
                {service}
              </Badge>
            ))}
          </motion.div>

          {/* Tagline */}
          {caseStudy.tagline && (
            <motion.p
              variants={fadeUp}
              className="font-display font-bold text-[20px] lg:text-[24px] leading-[1.1] text-content-active-primary max-w-[846px] mb-6"
            >
              {caseStudy.tagline}
            </motion.p>
          )}

          {/* Impact Metrics */}
          <motion.div
            variants={staggerContainer}
            className="flex flex-wrap gap-6 lg:gap-9"
          >
            {caseStudy.metrics.map((metric, i) => (
              <motion.div key={i} variants={metricVariants}>
                <ImpactMetric
                  value={`${metric.prefix || ''}${metric.value}${metric.suffix || ''}`}
                  label={metric.label}
                />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Hero Image Container with Testimonial Overlay */}
        <div className="relative w-full max-w-[1280px] mx-auto">
          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative aspect-[2/1] w-full overflow-hidden rounded-2xl border-4 border-border-accent bg-surface-quaternary"
          >
            <Image
              src={caseStudy.heroImage}
              alt={`${caseStudy.title} - hero image`}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1280px) 90vw, 1280px"
              className="object-cover"
              priority
            />
            {/* Subtle overlay */}
            <div className="absolute inset-0 bg-surface-quaternary opacity-25 rounded-2xl" />
          </motion.div>

          {/* Testimonial Card - Overlay on desktop, stacked on mobile */}
          {caseStudy.results?.testimonial && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-6 lg:mt-0 lg:absolute lg:right-0 lg:top-20 lg:w-[342px] z-10"
            >
              <TestimonialCard testimonial={caseStudy.results.testimonial} />
            </motion.div>
          )}
        </div>
      </div>
    </section>
  )
}
```

#### Key Implementation Notes

1. **Title Sizing**:
   - Mobile: 40px (text-[40px])
   - Desktop: 60px (text-[60px])
   - Font: Plus Jakarta Sans ExtraBold
   - Line Height: 1.07 (matches Figma 64px line-height for 60px text)

2. **Hero Image**:
   - Aspect Ratio: Changed from `aspect-video` (16:9) to `aspect-[2/1]`
   - Border: 4px solid `border-border-accent`
   - Border Radius: 16px (rounded-2xl)
   - Max Width: 1280px (matches Figma spec)
   - Overlay: 25% opacity `bg-surface-quaternary` for subtle tint

3. **Testimonial Positioning**:
   - Desktop: Absolute positioned, right-aligned, top offset 80px
   - Mobile: Static position below hero image with 24px top margin
   - Width: 342px fixed on desktop, full-width on mobile
   - Z-index: 10 (above hero image)

4. **Metrics Layout**:
   - Gap: 24px mobile, 36px desktop (gap-6 lg:gap-9)
   - Flex wrap enabled for responsive stacking
   - Uses ImpactMetric component for consistent styling

5. **Service Badges**:
   - Limit to first 3 services (`.slice(0, 3)`)
   - Gap: 6px (gap-1.5)
   - Uses new `terciary` variant

#### Responsive Breakpoints

| Breakpoint | Layout Changes |
|------------|----------------|
| < 640px | Title 40px, metrics stack 2-wide, testimonial below image |
| 640px - 1024px | Title 50px, testimonial overlay starts, reduced card width |
| > 1024px | Full design - title 60px, 342px testimonial card, metrics 3-wide |

---

### 5. ContextObjectives Section Component (NEW)

**File**: `/Users/rodrigo.seoane/local-sites/portfolio-2026/components/sections/case-study/ContextObjectives.tsx`

#### Implementation

```typescript
'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Target, Lightbulb } from 'lucide-react'
import { staggerContainer, fadeUp } from '@/lib/utils/animations'
import type { CaseStudy } from '@/lib/data/case-studies'

interface ContextObjectivesProps {
  caseStudy: CaseStudy
}

export function ContextObjectives({ caseStudy }: ContextObjectivesProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  // Extract objectives from problem data
  // In a future iteration, consider adding dedicated objectives field to data schema
  const contextText = caseStudy.problem.background
  const objectivesText = caseStudy.problem.businessChallenge

  return (
    <section ref={ref} className="bg-surface-primary py-12 lg:py-16">
      <div className="container mx-auto px-6 lg:px-20">
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12"
        >
          {/* Context Column */}
          <motion.div variants={fadeUp} className="flex flex-col gap-2">
            <div className="flex gap-2 items-center mb-2">
              <div className="w-8 h-8 flex items-center justify-center">
                <Lightbulb size={28} className="text-content-active-primary" />
              </div>
              <h2 className="font-display font-bold text-[24px] leading-[1.1] text-content-active-primary">
                Context
              </h2>
            </div>
            <div className="space-y-4 text-content-active-primary">
              <p className="font-body font-semibold text-[18px] leading-[1.32]">
                {contextText.split('.')[0]}.
              </p>
              <p className="font-body text-[16px] leading-[1.32]">
                {contextText.split('.').slice(1).join('.').trim()}
              </p>
            </div>
          </motion.div>

          {/* Objectives Column */}
          <motion.div variants={fadeUp} className="flex flex-col gap-2">
            <div className="flex gap-2 items-center mb-2">
              <div className="w-8 h-8 flex items-center justify-center">
                <Target size={28} className="text-content-active-primary" />
              </div>
              <h2 className="font-display font-bold text-[24px] leading-[1.1] text-content-active-primary">
                Objectives
              </h2>
            </div>
            <div className="space-y-4 text-content-active-primary">
              <p className="font-body font-semibold text-[18px] leading-[1.32]">
                {caseStudy.solution.keyDecisions[0] || 'Strategic Approach:'}
              </p>
              <p className="font-body text-[16px] leading-[1.32]">
                {objectivesText}
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
```

#### Design Specifications

- **Layout**: Two-column grid on desktop, stacked on mobile
- **Gap**: 48px between columns (gap-12)
- **Background**: `--color-surface-primary` (#FFD115)
- **Icons**: 32px size, from lucide-react library
- **Typography**:
  - Heading: Plus Jakarta Sans Bold, 24px, line-height 1.1
  - Subheading: Inter Semi Bold, 18px, line-height 1.32
  - Body: Inter Regular, 16px, line-height 1.32

#### Data Mapping Strategy

Currently maps to existing `problem` and `solution` data. Future enhancement: add dedicated `context` and `objectives` fields to data schema for more precise content control.

---

### 6. KeyDeliverables Section Component (NEW)

**File**: `/Users/rodrigo.seoane/local-sites/portfolio-2026/components/sections/case-study/KeyDeliverables.tsx`

#### Implementation

```typescript
'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Users, Layout, FileText } from 'lucide-react'
import { staggerContainer, fadeUp } from '@/lib/utils/animations'
import type { CaseStudy } from '@/lib/data/case-studies'

interface KeyDeliverablesProps {
  caseStudy: CaseStudy
}

// Map deliverable types to icons and content
const deliverableConfig = [
  {
    icon: Users,
    title: 'Cross-Functional Collaboration',
    getDescription: (cs: CaseStudy) =>
      'Workshops with stakeholders to align on OKRs, focusing on reducing CAC.',
  },
  {
    icon: Layout,
    title: 'Modular Design System',
    getDescription: (cs: CaseStudy) =>
      'Consistent design system across franchisee portals to ensure brand cohesion.',
  },
  {
    icon: FileText,
    title: 'Simplified Forms',
    getDescription: (cs: CaseStudy) =>
      'Error prevention techniques like auto-formatting phone numbers to streamline user interactions.',
  },
]

export function KeyDeliverables({ caseStudy }: KeyDeliverablesProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="bg-surface-primary py-12 lg:py-16">
      <div className="container mx-auto px-6 lg:px-20">
        {/* Section Heading */}
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={fadeUp}
          className="flex gap-2 items-center mb-8"
        >
          <div className="w-8 h-8">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 8h24M4 16h24M4 24h24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-content-active-primary" />
            </svg>
          </div>
          <h2 className="font-display font-bold text-[28px] leading-[1.1] text-content-active-primary">
            Key Deliverables
          </h2>
        </motion.div>

        {/* Deliverable Cards Grid */}
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {deliverableConfig.map((config, index) => {
            const Icon = config.icon
            return (
              <motion.div
                key={index}
                variants={fadeUp}
                className="bg-surface-quaternary border border-content-disable-primary rounded-lg p-4 lg:p-6 flex gap-8"
              >
                {/* Icon Container */}
                <div className="bg-surface-primary rounded-lg flex items-center justify-center w-12 h-12 flex-shrink-0">
                  <Icon size={28} className="text-content-active-primary" />
                </div>

                {/* Content */}
                <div className="flex flex-col gap-2 flex-1">
                  <h3 className="font-display font-bold text-[20px] leading-[1.1] text-content-active-primary">
                    {config.title}
                  </h3>
                  <p className="font-body text-[16px] leading-[1.32] text-content-active-primary">
                    {config.getDescription(caseStudy)}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
```

#### Design Specifications (from Figma)

- **Container**:
  - Background: `--color-surface-quaternary` (#FFFAE8)
  - Border: 1px solid `--color-content-disable-primary` (#686B63)
  - Border Radius: 8px
  - Padding: 24px horizontal, 36px vertical (desktop); 16px all (mobile)
  - Height: 156px (fixed on desktop)

- **Icon Container**:
  - Background: `--color-surface-primary` (#FFD115)
  - Size: 48px × 48px
  - Border Radius: 8px
  - Icon Size: 28px-32px

- **Typography**:
  - Card Title: Plus Jakarta Sans Bold, 20px, line-height 1.1
  - Card Body: Inter Regular, 16px, line-height 1.32

- **Grid Layout**:
  - Desktop: 3 columns, 16px gap
  - Tablet: 2 columns, 16px gap
  - Mobile: 1 column, 16px gap

#### Future Enhancement Notes

This component currently uses hardcoded deliverable content. In Phase 2, consider adding a `deliverables` array field to the CaseStudy interface for dynamic content:

```typescript
// Future data structure
deliverables?: {
  icon: string  // icon name or key
  title: string
  description: string
}[]
```

---

### 7. CaseStudyResults Component (MODIFY)

**File**: `/Users/rodrigo.seoane/local-sites/portfolio-2026/components/sections/case-study/CaseStudyResults.tsx`

#### Remove Testimonial Section

Delete lines 60-82 (the testimonial conditional block). The testimonial now renders ONLY in the hero section.

**Before** (lines 60-82):
```typescript
        {/* Testimonial -- conditional */}
        {results.testimonial && (
          <motion.div
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={fadeUp}
            className="mb-10 max-w-2xl"
          >
            <blockquote className="border-l-4 border-accent-primary pl-6">
              <p className="text-lg text-content-active-primary italic leading-relaxed">
                &ldquo;{results.testimonial.quote}&rdquo;
              </p>
              <footer className="mt-3">
                <cite className="font-semibold text-content-active-primary not-italic">
                  {results.testimonial.author}
                </cite>
                <span className="text-content-disable-primary text-sm ml-2">
                  {results.testimonial.role}
                </span>
              </footer>
            </blockquote>
          </motion.div>
        )}
```

**After**: Delete the entire block above. The results section will only contain:
1. Section heading
2. Metrics grid
3. Business impact statement

---

### 8. Case Study Page Layout (MODIFY)

**File**: `/Users/rodrigo.seoane/local-sites/portfolio-2026/app/work/[slug]/page.tsx`

#### Add New Section Imports and Rendering

Update the page component to include the new sections:

```typescript
import { ContextObjectives } from '@/components/sections/case-study/ContextObjectives'
import { KeyDeliverables } from '@/components/sections/case-study/KeyDeliverables'

// ... existing imports ...

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
      <ContextObjectives caseStudy={caseStudy} />  {/* NEW */}
      <KeyDeliverables caseStudy={caseStudy} />    {/* NEW */}
      <CaseStudyOverview caseStudy={caseStudy} />

      <CaseStudySection title="The Challenge" id="problem" background="white">
        <CaseStudyProblemContent caseStudy={caseStudy} />
      </CaseStudySection>

      <CaseStudySection title="The Solution" id="solution" background="cream">
        <CaseStudySolutionContent caseStudy={caseStudy} />
      </CaseStudySection>

      <CaseStudyResults caseStudy={caseStudy} />
      {nextProject && <NextProject caseStudy={nextProject} />}
    </>
  )
}
```

#### Section Order

1. ProgressBar (sticky at top)
2. **CaseStudyHero** (with testimonial overlay)
3. **ContextObjectives** (NEW - yellow background)
4. **KeyDeliverables** (NEW - yellow background)
5. CaseStudyOverview (cream background)
6. The Challenge section (white background)
7. The Solution section (cream background)
8. The Results (yellow background, testimonial removed)
9. NextProject (dark background)

---

## File Changes Summary

### Files to Create (4 files)

| # | File Path | Type | Purpose |
|---|-----------|------|---------|
| 1 | `/Users/rodrigo.seoane/local-sites/portfolio-2026/components/ui/ImpactMetric.tsx` | Component | Stacked value+label metric display |
| 2 | `/Users/rodrigo.seoane/local-sites/portfolio-2026/components/ui/TestimonialCard.tsx` | Component | Floating testimonial card with quote and author |
| 3 | `/Users/rodrigo.seoane/local-sites/portfolio-2026/components/sections/case-study/ContextObjectives.tsx` | Section | Two-column Context & Objectives section |
| 4 | `/Users/rodrigo.seoane/local-sites/portfolio-2026/components/sections/case-study/KeyDeliverables.tsx` | Section | Three-card deliverables grid section |

### Files to Modify (5 files)

| # | File Path | Changes |
|---|-----------|---------|
| 1 | `/Users/rodrigo.seoane/local-sites/portfolio-2026/app/globals.css` | Add 2 new color tokens: `--color-surface-quaternary`, `--color-border-accent` |
| 2 | `/Users/rodrigo.seoane/local-sites/portfolio-2026/lib/data/case-studies.ts` | Add `tagline?: string` field to interface; populate for all 5 case studies |
| 3 | `/Users/rodrigo.seoane/local-sites/portfolio-2026/components/ui/Badge.tsx` | Add `terciary` variant to BadgeVariant type and variants object |
| 4 | `/Users/rodrigo.seoane/local-sites/portfolio-2026/components/sections/case-study/CaseStudyHero.tsx` | **Complete component replacement** - new layout, testimonial integration, 2:1 image ratio |
| 5 | `/Users/rodrigo.seoane/local-sites/portfolio-2026/components/sections/case-study/CaseStudyResults.tsx` | Remove testimonial rendering block (lines 60-82) |
| 6 | `/Users/rodrigo.seoane/local-sites/portfolio-2026/app/work/[slug]/page.tsx` | Add ContextObjectives and KeyDeliverables imports and rendering |

---

## Implementation Order

Follow this sequence to minimize dependency conflicts:

### Phase 1: Design Tokens & Data (no UI dependencies)
1. Update `app/globals.css` - add new color tokens
2. Update `lib/data/case-studies.ts` - add tagline field and data

### Phase 2: Leaf UI Components (no internal component dependencies)
3. Create `components/ui/ImpactMetric.tsx`
4. Create `components/ui/TestimonialCard.tsx`
5. Modify `components/ui/Badge.tsx` - add terciary variant

### Phase 3: Section Components (depend on Phase 2)
6. Create `components/sections/case-study/ContextObjectives.tsx`
7. Create `components/sections/case-study/KeyDeliverables.tsx`
8. Modify `components/sections/case-study/CaseStudyHero.tsx` - complete replacement
9. Modify `components/sections/case-study/CaseStudyResults.tsx` - remove testimonial

### Phase 4: Page Integration (depends on everything above)
10. Modify `app/work/[slug]/page.tsx` - add new section imports and rendering

---

## Testing Checklist

### Visual Verification

**Hero Section**:
- [ ] Client logo displays correctly (or text fallback for Atlas cases)
- [ ] Title renders at 40px mobile, 60px desktop with correct font (Plus Jakarta Sans ExtraBold)
- [ ] Service badges use terciary variant (gray background, light text)
- [ ] Service badges limited to 3 maximum
- [ ] Tagline displays below badges with correct typography
- [ ] Impact metrics display in horizontal row with correct spacing (36px gap desktop)
- [ ] Hero image has 2:1 aspect ratio
- [ ] Hero image has 4px gold border (`--color-border-accent`)
- [ ] Hero image has 16px border radius
- [ ] Testimonial card overlays hero image on desktop (right-aligned)
- [ ] Testimonial card displays below hero on mobile
- [ ] Testimonial card has correct styling (cream background, gold border, shadow)
- [ ] Quote icon renders correctly at top of testimonial
- [ ] All colors match design tokens (no hardcoded hex values)

**Context & Objectives Section**:
- [ ] Section renders on yellow background
- [ ] Two-column layout on desktop, stacked on mobile
- [ ] Icons render correctly (Lightbulb for Context, Target for Objectives)
- [ ] Typography matches spec (24px headings, 18px subheadings, 16px body)
- [ ] Content wraps appropriately on narrow viewports

**Key Deliverables Section**:
- [ ] Section renders on yellow background
- [ ] Three cards display in grid layout (3 cols desktop, 2 cols tablet, 1 col mobile)
- [ ] Cards have cream background and gray border
- [ ] Icon containers have yellow background
- [ ] Icons render correctly (Users, Layout, FileText)
- [ ] Card height is consistent across row on desktop
- [ ] Typography matches spec

**Results Section**:
- [ ] Testimonial does NOT render in results section
- [ ] Section only contains: heading, metrics grid, business impact text
- [ ] No visual regressions in remaining content

### Responsive Behavior

- [ ] **Mobile (< 640px)**:
  - Title 40px
  - Metrics stack vertically or 2-wide
  - Testimonial appears below hero image (not overlay)
  - Context/Objectives stack vertically
  - Key Deliverables cards stack vertically

- [ ] **Tablet (640px - 1024px)**:
  - Title scales between 40-60px
  - Testimonial overlays hero at reduced width
  - Context/Objectives remain stacked
  - Key Deliverables display 2 columns

- [ ] **Desktop (> 1024px)**:
  - Title 60px
  - Metrics in horizontal row
  - Testimonial overlay at 342px width, right-aligned
  - Context/Objectives side-by-side
  - Key Deliverables 3 columns

### Data Integrity

- [ ] All 5 case studies have tagline data populated
- [ ] Taglines display correctly for each case
- [ ] Missing testimonials don't cause errors (TestimonialCard not rendered)
- [ ] Service badges truncate to 3 items
- [ ] All metrics format correctly with prefix/suffix

### Accessibility

- [ ] All images have descriptive alt text
- [ ] Heading hierarchy is correct (h1 for title, h2 for section headings, h3 for card titles)
- [ ] Testimonial uses proper `<blockquote>` element
- [ ] Focus indicators visible on all interactive elements
- [ ] Color contrast meets WCAG AA standards:
  - Text on yellow background: #1A1502 on #FFD115 = 7.2:1 ✓
  - Badge text: #F7F7F7 on #686B63 = 4.7:1 ✓
  - Card text: #1A1502 on #FFFAE8 = 12.5:1 ✓

### Performance

- [ ] Hero image uses `priority` prop for LCP optimization
- [ ] No layout shift during hero section load
- [ ] Animations perform smoothly at 60fps
- [ ] No console errors or warnings

### Cross-Browser Testing

Test in:
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Mobile Safari (iOS)
- [ ] Chrome Mobile (Android)

---

## Implementation Notes

### Typography Mapping

The Figma design uses specific font sizes that don't map 1:1 to Tailwind's default scale. Here's the mapping strategy:

| Figma Spec | Tailwind Class | Actual Size | Use Case |
|------------|----------------|-------------|----------|
| 60px | `text-[60px]` | 60px | Hero title (desktop) |
| 40px | `text-[40px]` | 40px | Hero title (mobile) |
| 32px | `text-[32px]` | 32px | Impact metric values |
| 28px | `text-[28px]` | 28px | Section headings (Key Deliverables) |
| 24px | `text-[24px]` | 24px | Tagline, Context/Objectives headings |
| 20px | `text-[20px]` | 20px | Deliverable card titles |
| 18px | `text-[18px]` | 18px | Semibold body text, subheadings |
| 16px | `text-[16px]` | 16px | Regular body text |
| 14px | `text-[14px]` | 14px | Metric labels, badges |

### Color Token Usage Patterns

Always use CSS custom properties (design tokens) instead of hardcoded values:

**Good**:
```typescript
className="bg-surface-primary text-content-active-primary"
className="border-border-accent"
```

**Bad**:
```typescript
className="bg-[#FFD115] text-[#1A1502]"  // Never hardcode hex values
```

### Animation Patterns

Reuse existing animation utilities from `lib/utils/animations.ts`:

```typescript
import { staggerContainer, fadeUp } from '@/lib/utils/animations'

// Container with staggered children
<motion.div
  initial="hidden"
  animate={isInView ? 'visible' : 'hidden'}
  variants={staggerContainer}
>
  {items.map(item => (
    <motion.div variants={fadeUp}>
      {/* content */}
    </motion.div>
  ))}
</motion.div>
```

### Responsive Design Strategy

Use mobile-first approach with `lg:` prefix for desktop breakpoints:

```typescript
// Mobile base, desktop override
className="text-[40px] lg:text-[60px]"  // 40px mobile, 60px desktop
className="gap-6 lg:gap-9"              // 24px mobile, 36px desktop
className="grid-cols-1 lg:grid-cols-2"  // 1 col mobile, 2 cols desktop
```

### Image Optimization

For the 2:1 aspect ratio hero images:

1. **Recommended Image Dimensions**:
   - Source: 2560px × 1280px (for @2x displays)
   - Minimum: 1280px × 640px (for @1x displays)

2. **Next.js Image Component Best Practices**:
   ```typescript
   <Image
     src={caseStudy.heroImage}
     alt={`${caseStudy.title} - hero image`}
     fill
     sizes="(max-width: 640px) 100vw, (max-width: 1280px) 90vw, 1280px"
     className="object-cover"
     priority  // Only for above-the-fold images
   />
   ```

3. **Aspect Ratio Handling**:
   - Use `aspect-[2/1]` Tailwind class
   - Ensure parent div has defined width
   - Set `object-cover` on Image component

---

## Future Enhancements (Out of Scope for v1)

These items are documented for future phases but NOT required for initial implementation:

1. **Dynamic Deliverables Data**
   - Add `deliverables` array to CaseStudy interface
   - Support custom icon selection per deliverable
   - Allow variable number of deliverable cards

2. **Context/Objectives Data Structure**
   - Add dedicated `context` and `objectives` fields to data schema
   - Support multiple objective bullet points
   - Add optional supporting images

3. **Testimonial Enhancements**
   - Add avatar image support to CaseStudyTestimonial interface
   - Support multiple testimonials with carousel
   - Add company logo to testimonial card

4. **Animation Refinements**
   - Parallax scroll effect on hero image
   - Stagger animation on testimonial card entrance
   - Hover states on deliverable cards

5. **A/B Testing Hooks**
   - Add data attributes for analytics tracking
   - Support alternative layouts via feature flags
   - Track testimonial engagement metrics

---

## Acceptance Criteria

The implementation is complete when:

1. ✅ All 5 case study pages render the new hero layout
2. ✅ Hero images display at 2:1 aspect ratio with gold border
3. ✅ Testimonials appear in hero section ONLY (not in results)
4. ✅ Context & Objectives section renders correctly
5. ✅ Key Deliverables section renders with 3 cards
6. ✅ Service badges use terciary variant styling
7. ✅ All typography matches Figma specifications
8. ✅ Responsive behavior works across all breakpoints
9. ✅ No console errors or warnings
10. ✅ All design tokens used (no hardcoded colors)
11. ✅ WCAG AA accessibility standards met
12. ✅ All test checklist items pass

---

## References

### Figma Design

- **URL**: https://www.figma.com/design/hWnOIJprK4cfVhAW0kPKlK/Portfolio--UI-Design?node-id=234-13945&m=dev
- **Node ID**: 234:13945
- **Page**: Di Blasi Franchise case study

### Related Documentation

- **PRD**: `/Users/rodrigo.seoane/local-sites/portfolio-2026/docs/PRDs/PRD-case-page-redesign.md`
- **Work Portfolio SPEC**: `/Users/rodrigo.seoane/local-sites/portfolio-2026/docs/SPECs/SPEC-work-portfolio-section.md`
- **Animation Utilities**: `/Users/rodrigo.seoane/local-sites/portfolio-2026/lib/utils/animations.ts`
- **Design Tokens**: `/Users/rodrigo.seoane/local-sites/portfolio-2026/app/globals.css`

### External Resources

- **Framer Motion v12 Docs**: https://www.framer.com/motion/
- **Next.js Image Optimization**: https://nextjs.org/docs/app/api-reference/components/image
- **Tailwind CSS v4 Docs**: https://tailwindcss.com/docs
- **Lucide React Icons**: https://lucide.dev/

---

## Appendix: Design Token Reference Table

Complete mapping of all design tokens used in this specification:

| Token Name | CSS Variable | Hex Value | Usage in Spec |
|------------|--------------|-----------|---------------|
| Surface Primary | `--color-surface-primary` | #FFD115 | Hero background, section backgrounds |
| Surface Secondary | `--color-surface-secondary` | #2E5E5E | Not used in this spec |
| Surface Terciary | `--color-surface-terciary` | #FFF9F0 | Not used in this spec |
| **Surface Quaternary** | `--color-surface-quaternary` | #FFFAE8 | Testimonial card bg, deliverable card bg |
| **Border Accent** | `--color-border-accent` | #665408 | Hero image border, testimonial border |
| Content Active Primary | `--color-content-active-primary` | #080D00 | All primary text |
| Content Active Secondary | `--color-content-active-secondary` | #F7F7F7 | Light text on dark backgrounds |
| Content Disable Primary | `--color-content-disable-primary` | #686B63 | Badge backgrounds, borders |
| Content Disable Light | `--color-content-disable-light` | #C7C8C6 | Subtle borders, dividers |
| Accent Primary | `--color-accent-primary` | #E8854A | Icon colors (orange) |

---

**End of Specification**
