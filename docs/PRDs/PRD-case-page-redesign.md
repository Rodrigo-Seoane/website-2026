# PRD: Case Page Redesign

## Overview

This PRD documents the research and discovery phase for redesigning the Case Page (individual case study pages). The redesign addresses three tasks from the launch plan:

- **FW-01:** Cases Grid Hero Background (for /work page)
- **CS-01:** Redesign Case Hero
- **CS-02:** Case Hero Cover Image Ratio

The redesign transforms the case study hero section to match the new Figma design, which features a more dynamic layout with the client logo, project title, tagline, key metrics displayed prominently, a testimonial card overlay, and a dual-image hero composition.

---

## Figma Reference

**Figma File:** Portfolio UI Design
**URL:** `https://www.figma.com/design/hWnOIJprK4cfVhAW0kPKlK/Portfolio--UI-Design?node-id=234-13945&m=dev`
**Node ID:** `234:13945`

### Visual Documentation

The Figma design shows the Di Blasi Franchise case study page with the following key layout elements:

![Case Study Hero Design - Figma Screenshot](/Users/rodrigo.seoane/local-sites/portfolio-2026/docs/PRDs/assets/case-hero-figma-screenshot.png)

**Note:** The screenshot is captured from Figma and shows:
1. Yellow (`#FFD115`) hero background spanning the full viewport
2. Client logo in top-left corner
3. Project title ("Di Blasi Franchise") with Plus Jakarta Sans ExtraBold at 60px
4. Service badges below the title
5. Tagline subtitle ("UX-Driven National Expansion through Targeted Onboarding")
6. Three key metrics displayed horizontally (40%, 25%, 25%)
7. A testimonial card floating over the hero image
8. Large hero image with rounded corners (16px) and border accent
9. Context and Objectives sections in a two-column layout below
10. Key Deliverables section with stat cards

---

## Design Specifications from Figma

### Layout Structure

#### Hero Section (Node: `234:13767`)
- **Background:** `--surface/primary` (#FFD115)
- **Height:** 1795px (full content area including overlap sections)
- **Padding:** 80px horizontal (section padding/large)

#### Client Logo Block (Node: `234:13768`)
- **Position:** Top-left, offset 81px from left, 51px from top
- **Logo dimensions:** 69.67px x 32.91px

#### Title Block (Node: `234:13770`)
- **Font:** Plus Jakarta Sans ExtraBold
- **Size:** 60px
- **Line height:** 64px (1.07)
- **Color:** `--body/content/primary` (#1A1502)

#### Service Badges (Node: `234:13772`)
- **Background:** `--surface/terciary` (#686B63)
- **Padding:** 12px horizontal, 6px vertical
- **Border radius:** 16px (full pill)
- **Font:** Adelle Regular, 14px
- **Text color:** `--body/content/secondary` (#F7F7F7)
- **Letter spacing:** 1.4px
- **Gap between badges:** 6px

#### Tagline (Node: `234:13779`)
- **Font:** Plus Jakarta Sans Bold
- **Size:** 24px
- **Line height:** 1.1
- **Color:** `--body/content/primary` (#1A1502)
- **Max width:** 846px
- **Position:** Left 81px, top 214px

#### Impact Metrics (Node: `234:13780`)
- **Position:** Left 84px, top 270px
- **Gap between metrics:** 36px
- **Metric value font:** Plus Jakarta Sans Bold, 32px, line height 1.1
- **Metric label font:** Inter Regular, 14px, line height 1.32
- **Max width per metric:** ~150px

#### Testimonial Card (Node: `234:13793`)
- **Position:** Right side, overlapping hero image
- **Background:** `--surface/quaternary` (#FFFAE8)
- **Border:** 4px solid `--surface/action/quaternary` (#665408)
- **Border radius:** 8px
- **Padding:** 20px
- **Width:** 342px
- **Shadow:** 0px 4px 16px rgba(130, 130, 130, 0.15)

#### Hero Image Container (Node: `234:13790`)
- **Position:** Centered horizontally, top 437px
- **Width:** 1280px
- **Height:** 640px (aspect ratio ~2:1)
- **Background:** `--surface/quaternary` (#FFFAE8)
- **Border:** 4px solid `--surface/action/quaternary` (#665408)
- **Border radius:** 16px
- **Overlay:** 25% opacity `--surface/quaternary`

### Typography Scale (from Figma Styles)

| Style Name | Font Family | Weight | Size | Line Height | Letter Spacing |
|------------|-------------|--------|------|-------------|----------------|
| Header/H1 | Plus Jakarta Sans | Bold (700) | 32px | 1.1 | 0 |
| Header/H2 | Plus Jakarta Sans | Bold (700) | 28px | 1.1 | 0 |
| Header/H3 | Plus Jakarta Sans | Bold (700) | 24px | 1.1 | 0 |
| Header/H4 | Plus Jakarta Sans | Bold (700) | 20px | 1.1 | 0 |
| Body/Large | Inter | SemiBold (600) | 18px | 1.32 | 0 |
| Body/Regular | Inter | Regular (400) | 16px | 1.32 | 0 |
| Body/Small | Inter | Regular (400) | 14px | 1.32 | 0 |
| Caption/Regular | Inter | SemiBold (600) | 14px | 1 | 4% |
| Caption/Small | Inter | Medium (500) | 12px | 1.2 | 4% |
| Button/Medium | Inter | SemiBold (600) | 16px | 1 | 0.5px |

### Color Tokens (from Figma Variables)

| Token Name | Value | Usage |
|------------|-------|-------|
| `--surface/primary` | #FFD115 | Hero background, primary yellow |
| `--surface/secondary` | #2E5E5E | Dark teal (secondary) |
| `--surface/terciary` | #686B63 | Badge backgrounds, muted |
| `--surface/quaternary` | #FFFAE8 | Cream, card backgrounds |
| `--surface/action/quaternary` | #665408 | Gold/brown border accent |
| `--body/content/primary` | #1A1502 | Primary text color |
| `--body/content/secondary` | #F7F7F7 | Light text on dark backgrounds |
| `--body/action/primary` | #F7F7F7 | Action text (light) |

---

## Current State Analysis

### Current Implementation Files

| File Path | Type | Current Role |
|-----------|------|--------------|
| `/app/work/[slug]/page.tsx` | Page | Dynamic case study page with ProgressBar, Hero, Overview, Sections, Results, NextProject |
| `/components/sections/case-study/CaseStudyHero.tsx` | Component | Current hero section with basic layout |
| `/components/sections/case-study/CaseStudyOverview.tsx` | Component | 4-column overview grid |
| `/components/sections/case-study/CaseStudySection.tsx` | Component | Reusable section wrapper |
| `/components/sections/case-study/CaseStudyResults.tsx` | Component | Results with animated counters |
| `/components/sections/case-study/CaseStudyProblemContent.tsx` | Component | Problem narrative content |
| `/components/sections/case-study/CaseStudySolutionContent.tsx` | Component | Solution narrative with lightbox |
| `/components/sections/case-study/NextProject.tsx` | Component | Next case study teaser |
| `/app/work/page.tsx` | Page | Work index page with CaseBlockSection |
| `/components/sections/CaseBlockSection.tsx` | Component | Alternating case study blocks |
| `/components/ui/CaseStudyCard.tsx` | Component | Card for grid view (currently unused on /work) |
| `/lib/data/case-studies.ts` | Data | Case study data interface and entries |

### Current CaseStudyHero Structure

The current hero component (`CaseStudyHero.tsx`) has:

1. **Yellow background** (`bg-surface-primary`)
2. **Top metadata row:** Industry badge, year, timeline
3. **Client logo or text fallback**
4. **Project title** (h1)
5. **Hero image** (aspect-video, full width)
6. **Metric badges** (horizontal flex wrap)

**What's Missing vs. Figma Design:**

1. **No tagline/subtitle** - Figma shows a prominent tagline below the title
2. **Hero image layout** - Current uses simple aspect-video; Figma shows a wider container with decorative border
3. **No testimonial overlay card** - Figma has a floating testimonial card over the hero
4. **Metrics layout different** - Figma shows metrics with value+label stacked, current shows badges
5. **No gold border on hero image** - Figma has 4px gold (#665408) border
6. **Service badges styling** - Figma uses pill badges with specific colors

### Current /work Page Structure

The `/app/work/page.tsx` currently uses:
- Page header with title and description
- `CaseBlockSection` components in a stacked layout
- Alternating left/right image positions
- No grid view, no filtering

**Figma shows a different /work page pattern** - but this PRD focuses primarily on the individual case study page hero redesign.

---

## Proposed Changes

### 1. CaseStudyHero Redesign (CS-01, CS-02)

#### New Layout Structure

```
+----------------------------------------------------------+
|  HERO SECTION (bg-surface-primary)                       |
|                                                          |
|  [Client Logo]                                           |
|                                                          |
|  [Project Title - 60px Plus Jakarta Sans ExtraBold]      |
|  [Service Badges] [Badge] [Badge]                        |
|                                                          |
|  [Tagline - 24px Bold]                                   |
|                                                          |
|  [Metric 1]    [Metric 2]    [Metric 3]                  |
|   40%           25%           25%                        |
|   Lead Qual.    CAC Reduced   CAC Reduced                |
|                                                          |
|  +--------------------+-----------------------+          |
|  |                    |                       |          |
|  |   HERO IMAGE       |  [Testimonial Card]   |          |
|  |   (2:1 ratio)      |   floating overlay    |          |
|  |   gold border      |                       |          |
|  |                    |                       |          |
|  +--------------------+-----------------------+          |
|                                                          |
+----------------------------------------------------------+
```

#### Component Changes

**New Props for CaseStudyHero:**
```typescript
interface CaseStudyHeroProps {
  caseStudy: CaseStudy
}

// CaseStudy interface needs extension:
interface CaseStudy {
  // ... existing fields ...
  tagline?: string  // New: e.g., "UX-Driven National Expansion through Targeted Onboarding"
}
```

**Visual Changes:**
1. Project title font size: 4xl/5xl -> 60px (custom or use `text-6xl`)
2. Add tagline display below title
3. Change metric badges to stacked value+label layout
4. Add testimonial card overlay (positioned absolute)
5. Hero image container: add gold border, rounded-2xl, wider aspect ratio

### 2. Data Model Updates

Add `tagline` field to `CaseStudy` interface in `/lib/data/case-studies.ts`:

```typescript
export interface CaseStudy {
  // ... existing fields ...
  tagline?: string  // Short descriptor shown in hero, e.g., from caseSubtitles
}
```

**Note:** The `caseSubtitles` mapping in `CaseBlockSection.tsx` already has this data. Consider moving it to the main data file.

### 3. New Design Tokens Required

The following tokens need to be added or mapped in `globals.css`:

```css
@theme inline {
  /* New tokens from Figma */
  --color-surface-quaternary: #FFFAE8;
  --color-surface-action-quaternary: #665408;
  --color-body-content-primary: #1A1502;
  --color-body-content-secondary: #F7F7F7;
}
```

**Mapping to existing tokens:**
- `--color-surface-primary` = `#FFD115` (already exists as `--color-surface-primary`)
- `--color-surface-terciary` = `#FFF9F0` (similar to Figma's quaternary)
- Figma's `#686B63` maps to `--color-content-disable-primary`

### 4. Work Page Hero Background (FW-01)

The `/work` page header currently uses `bg-surface-primary`. The Figma design maintains this yellow background, so no change is needed for the hero background color. However, consider:

1. **Grid Layout Option:** Future enhancement to add filterable grid view (CategoryFilter + CaseStudyCard)
2. **Background Pattern:** Could add subtle pattern/texture if design requires

---

## Component Inventory

### Components to Modify

| Component | File Path | Changes Required |
|-----------|-----------|------------------|
| CaseStudyHero | `/components/sections/case-study/CaseStudyHero.tsx` | Major redesign - new layout, testimonial card, metrics display |
| Badge | `/components/ui/Badge.tsx` | Add new variant for service badges (terciary bg) |

### Components to Create

| Component | File Path | Purpose |
|-----------|-----------|---------|
| TestimonialCard | `/components/ui/TestimonialCard.tsx` | Floating testimonial overlay for hero |
| ImpactMetric | `/components/ui/ImpactMetric.tsx` | Stacked value+label metric display |

### Data Files to Modify

| File | Changes |
|------|---------|
| `/lib/data/case-studies.ts` | Add `tagline` field to interface and data entries |
| `/app/globals.css` | Add new color tokens if needed |

---

## Design Tokens

### Current Tokens (from globals.css)

```css
/* Surfaces */
--color-surface-primary: #ffd115;      /* Yellow - matches Figma */
--color-surface-secondary: #2e5e5e;    /* Teal */
--color-surface-terciary: #fff9f0;     /* Cream - similar to Figma quaternary */

/* Content */
--color-content-active-primary: #080d00;    /* Dark - close to Figma #1A1502 */
--color-content-active-secondary: #f7f7f7;  /* Light - matches Figma */
--color-content-disable-primary: #686b63;   /* Gray - matches Figma terciary */
```

### New Tokens Needed

```css
/* Add to @theme inline in globals.css */
--color-surface-quaternary: #FFFAE8;         /* Warm cream for cards */
--color-border-accent: #665408;              /* Gold/brown for hero image border */
--color-body-content-primary: #1A1502;       /* True black-brown from Figma */
```

### Token Mapping Strategy

| Figma Token | Current Token | Action |
|-------------|---------------|--------|
| `--surface/primary` (#FFD115) | `--color-surface-primary` | Already exists |
| `--surface/terciary` (#686B63) | `--color-content-disable-primary` | Reuse for badge bg |
| `--surface/quaternary` (#FFFAE8) | `--color-surface-terciary` | Close match, may need new token |
| `--surface/action/quaternary` (#665408) | None | **CREATE** `--color-border-accent` |
| `--body/content/primary` (#1A1502) | `--color-content-active-primary` | Slightly different, evaluate |

---

## Accessibility Requirements

### WCAG 2.1 AA Compliance

1. **Color Contrast:**
   - Text on yellow background: #1A1502 on #FFD115 = 7.2:1 (passes AA/AAA)
   - Badge text: #F7F7F7 on #686B63 = 4.7:1 (passes AA)
   - Card text: #1A1502 on #FFFAE8 = 12.5:1 (passes AAA)

2. **Focus Indicators:**
   - All interactive elements must have visible focus states
   - Use `focus-visible:ring-2` pattern established in codebase

3. **Image Alt Text:**
   - Hero image requires descriptive alt text
   - Client logo needs alt text with company name

4. **Semantic HTML:**
   - Use `<h1>` for project title (already implemented)
   - Use `<figure>` and `<figcaption>` for hero image
   - Use `<blockquote>` for testimonial

5. **Screen Reader Considerations:**
   - Metrics should be readable as "40% Improvement in Lead Qualification"
   - Testimonial card should have proper heading structure

---

## Responsive Behavior

### Breakpoints

| Breakpoint | Width | Layout Changes |
|------------|-------|----------------|
| Mobile | < 640px | Stack all elements, testimonial below image, full-width metrics |
| Tablet | 640px - 1024px | Side-by-side metrics (2 per row), testimonial still overlays |
| Desktop | > 1024px | Full layout as designed, testimonial overlay, 3-column metrics |

### Mobile Adaptations

1. **Hero Image:**
   - Mobile: `aspect-video` (16:9), full width
   - Desktop: `aspect-[2/1]`, max-width 1280px

2. **Testimonial Card:**
   - Mobile: Below hero image, full width with margin
   - Desktop: Overlay position, right side, 342px width

3. **Metrics:**
   - Mobile: Stack vertically or 2-column grid
   - Desktop: 3-column horizontal flex with 36px gap

4. **Title:**
   - Mobile: `text-3xl` (30px)
   - Desktop: `text-6xl` (60px) or custom 60px

5. **Tagline:**
   - Mobile: `text-lg` (18px)
   - Desktop: `text-2xl` (24px)

---

## Data Requirements

### CaseStudy Interface Extension

```typescript
export interface CaseStudy {
  // Existing fields
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
  heroImage: string
  clientLogo?: string
  timeline: string
  role: string
  tools: string[]
  problem: { ... }
  solution: { ... }
  results: { ... }
  metaDescription: string
  keywords: string[]

  // New field for redesign
  tagline?: string  // E.g., "UX-Driven National Expansion through Targeted Onboarding"
}
```

### Data Migration

Move `caseSubtitles` from `CaseBlockSection.tsx` to `case-studies.ts` as the `tagline` field:

```typescript
// In case-studies.ts, add to each entry:
{
  slug: 'diblasi-franchise',
  title: 'Di Blasi Franchise Expansion',
  tagline: 'UX-Driven National Expansion through Targeted Onboarding',
  // ... rest of fields
}
```

---

## Success Criteria

### Visual Parity

- [ ] Hero section matches Figma design at desktop width (1440px+)
- [ ] Client logo displays correctly with fallback to text
- [ ] Title uses Plus Jakarta Sans ExtraBold at correct size
- [ ] Service badges use correct styling (pill shape, colors)
- [ ] Tagline displays below title with correct typography
- [ ] Metrics display with value above label, correct spacing
- [ ] Hero image has gold border and rounded corners
- [ ] Testimonial card overlays correctly on desktop
- [ ] All colors match design tokens

### Responsive Behavior

- [ ] Mobile layout stacks elements appropriately
- [ ] Testimonial moves below image on mobile
- [ ] Metrics stack on narrow viewports
- [ ] No horizontal overflow at any breakpoint

### Accessibility

- [ ] All text passes WCAG AA contrast requirements
- [ ] Focus states visible on all interactive elements
- [ ] Proper heading hierarchy maintained
- [ ] Screen reader announces content logically

### Performance

- [ ] Hero image uses `priority` for LCP optimization
- [ ] Client logo uses appropriate sizing
- [ ] No layout shift during load

### Code Quality

- [ ] Components follow existing patterns in codebase
- [ ] TypeScript interfaces properly extended
- [ ] Design tokens used (no hardcoded colors)
- [ ] Animations use established framer-motion patterns

---

## Open Questions

1. **Testimonial Placement:** The Figma design shows a specific testimonial for Di Blasi. Should every case study show a testimonial in the hero, or only those with testimonials defined? Current data already has `results.testimonial` for all entries.

2. **Hero Image Aspect Ratio:** Figma shows approximately 2:1 ratio. Current implementation uses `aspect-video` (16:9). Should we:
   - Change all hero images to 2:1?
   - Create a new aspect ratio token?
   - Support variable aspect ratios per case study?

3. **Tagline vs. Description:** The `tagline` field would duplicate some information from `description`. Consider:
   - Keep both (tagline is short, description is detailed)
   - Make tagline required for hero display
   - Fall back to truncated description if no tagline

4. **Service Badges:** Figma shows "Service" placeholder badges. Should we:
   - Show actual services from `services[]` array
   - Limit to 3 badges max
   - Add truncation/overflow handling

5. **Context & Objectives Section:** The Figma design shows a two-column layout below the hero with Context and Objectives. This seems to replace the current CaseStudyOverview component. Should this be part of the hero redesign or a separate task?

6. **Key Deliverables Section:** Figma shows a "Key Deliverables" section with stat cards. Is this a new section to add, or a redesign of the existing overview?

---

## Implementation Notes

### Internal Patterns to Follow

1. **Animation Patterns** (from `/lib/utils/animations.ts`):
   ```typescript
   import { fadeUp, staggerContainer } from '@/lib/utils/animations'
   ```

2. **Component Structure** (from existing case study components):
   ```typescript
   'use client'
   import { useRef } from 'react'
   import { motion, useInView } from 'framer-motion'
   ```

3. **Container Pattern**:
   ```typescript
   <div className="container mx-auto px-6 lg:px-20">
   ```

4. **Color Token Usage**:
   ```typescript
   className="bg-surface-primary text-content-active-primary"
   ```

### External Documentation

- **Framer Motion v12:** https://www.framer.com/motion/
- **Next.js Image Component:** https://nextjs.org/docs/app/api-reference/components/image
- **Tailwind CSS v4:** https://tailwindcss.com/docs

---

## Summary

### Key Design Changes

1. **Hero Layout Transformation:**
   - Larger, more prominent title (60px)
   - New tagline/subtitle element
   - Metrics displayed as stacked value/label pairs
   - Testimonial card overlay on hero image
   - Gold border accent on hero image

2. **New Visual Elements:**
   - Service pill badges with terciary styling
   - Testimonial card component
   - Impact metric display component

3. **Token Additions:**
   - `--color-surface-quaternary`: #FFFAE8
   - `--color-border-accent`: #665408

### Files to Modify

| Priority | File | Scope |
|----------|------|-------|
| High | `/components/sections/case-study/CaseStudyHero.tsx` | Major redesign |
| High | `/lib/data/case-studies.ts` | Add tagline field |
| Medium | `/components/ui/Badge.tsx` | Add terciary variant |
| Medium | `/app/globals.css` | Add new tokens |
| Low | `/components/ui/TestimonialCard.tsx` | New component |
| Low | `/components/ui/ImpactMetric.tsx` | New component |

### Estimated Scope

- **Complexity:** Medium-High
- **Components affected:** 3-5 files
- **New components:** 2
- **Design tokens:** 2 new tokens
- **Breaking changes:** None (additive changes only)

### Recommended Implementation Order

1. Add design tokens to `globals.css`
2. Extend `CaseStudy` interface with `tagline` field
3. Update case study data with tagline values
4. Create `ImpactMetric` component
5. Create `TestimonialCard` component
6. Redesign `CaseStudyHero` component
7. Add responsive styling
8. Test across breakpoints
9. Verify accessibility
