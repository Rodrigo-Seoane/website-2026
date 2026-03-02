# SPEC: Work / Portfolio Section (Phase 4)

**Based on:** PRD-work-portfolio-section.md
**Created:** February 3, 2026
**Target:** frontend-craftsman agent

---

## Assumptions & Decisions Made During Audit

The following decisions were made after auditing the codebase against the PRD. Each assumption is recorded so the implementing developer does not have to guess.

1. **Metric value type will change from `string` to `number`.** The existing `CaseStudyMetric` interface declares `value: string` and the existing data uses string literals like `'47'`. The PRD and the `AnimatedCounter` component both require a numeric value (framer-motion `animate(0, value, ...)` requires a number). The spec changes the type to `number` and updates all existing data entries accordingly. Any code that currently reads `metric.value` as a string (such as in `FeaturedWork.tsx`) must be unaffected because that component does not reference the metric value field directly.

2. **Layout wrapper is provided by `app/layout.tsx`.** Navigation and Footer are already rendered for every route via the root layout. Page files must NOT re-import or render them. Follow the pattern established by `app/page.tsx` -- the page component returns only its own section content.

3. **`app/template.tsx` already provides a page-level fadeUp transition.** Do not add a redundant top-level motion wrapper in the Work index page or the case study page.

4. **Image paths use the `-min.png` variants that already exist on disk.** The PRD sample data references paths like `Atlas Onboarding 01-min.png`. These files are confirmed present in `public/images/Cases/`. Use these. Do NOT reference the `3x/` or `@2x-min.png` variants -- let `next/image` handle responsive sizing via `sizes`.

5. **Client logos exist for AXA, BennitAI, and DiBlasi** at `public/images/Client Logos/Client Name=Axa.png` etc. No logo exists for Atlas. The `CaseStudy.clientLogo` field is optional; it will be `undefined` for Atlas entries.

6. **The `CategoryFilter` component uses framer-motion `layoutId` for the animated active indicator.** This requires wrapping the filter in a single `LayoutGroup` so the animated pill animates between states correctly. The filter component is `'use client'`.

7. **Open Questions resolution.** All solution-section images will open in the lightbox (not just selected ones). Video support is deferred to v1.1. Filter state does not persist across navigation (no sessionStorage). Mobile swipe gestures are deferred to v1.1. All images enforce the aspect ratio defined per-image in the data (`aspectRatio` field).

8. **The `ImageLightbox` is dynamically imported** to keep the case study page initial JS bundle small, exactly as the PRD recommends.

---

## Files Overview

### Files to Create (13 files)

| # | File Path | Type | Role |
|---|-----------|------|------|
| 1 | `components/ui/AnimatedCounter.tsx` | UI | Scroll-triggered count-up number |
| 2 | `components/ui/ProgressBar.tsx` | UI | Sticky scroll progress indicator |
| 3 | `components/ui/CategoryFilter.tsx` | UI | Filter pill tabs with animated indicator |
| 4 | `components/ui/CaseStudyCard.tsx` | UI | Grid card for work index |
| 5 | `components/ui/ImageLightbox.tsx` | UI | Full-screen accessible image gallery |
| 6 | `components/sections/case-study/CaseStudyHero.tsx` | Section | Hero with title, image, metrics |
| 7 | `components/sections/case-study/CaseStudyOverview.tsx` | Section | Role / timeline / tools grid |
| 8 | `components/sections/case-study/CaseStudySection.tsx` | Section | Reusable content section wrapper |
| 9 | `components/sections/case-study/CaseStudyResults.tsx` | Section | Animated metrics + testimonial |
| 10 | `components/sections/case-study/NextProject.tsx` | Section | Next case study preview |
| 11 | `components/sections/case-study/index.ts` | Barrel | Re-exports all case-study sections |
| 12 | `app/work/[slug]/page.tsx` | Page | Dynamic case study page |
| 13 | *(none -- see modify below)* | -- | -- |

### Files to Modify (3 files)

| File Path | What Changes |
|-----------|--------------|
| `lib/data/case-studies.ts` | Extend interfaces, change `value` type to `number`, add extended content fields, add helper functions |
| `components/ui/index.ts` | Add exports for the 5 new UI components |
| `app/work/page.tsx` | Replace the placeholder with the full filterable grid page |

---

## Design Token Quick Reference

All tokens are already defined in `app/globals.css`. No CSS changes are needed.

| Token | Hex | Usage in this spec |
|-------|-----|--------------------|
| `primary-yellow` | `#FFD115` | Hero background, Results background, filter active state bg |
| `orange-400` | `#ef8c48` | Section accent lines, icon colors |
| `dark-900` | `#080D00` | Primary text, buttons, filter active text |
| `dark-700` | `#2E5E5E` | NextProject background |
| `dark-500` | `#686B63` | Secondary / muted text |
| `cream-500` | `#FFF9F0` | Overview card backgrounds |
| `dark-50` | `#F7F7F7` | Light text on dark backgrounds |

Fonts: `font-display` = Plus Jakarta Sans (headings). `font-body` = Inter (body).

Container pattern used everywhere: `container mx-auto px-6 lg:px-20`

Section vertical padding pattern: `py-16 lg:py-24`

---

## Implementation Order

Build in this exact sequence. Each numbered group can be started only after the group above it is complete, because of import dependencies.

**Before starting:** the directory `components/sections/case-study/` does not exist yet. Create it before writing any files into it:
```bash
mkdir -p components/sections/case-study
```

```
Phase A -- Data Layer (no UI dependencies)
  1. lib/data/case-studies.ts          (modified)

Phase B -- Leaf UI Components (no internal component dependencies)
  2. components/ui/AnimatedCounter.tsx
  3. components/ui/ProgressBar.tsx
  4. components/ui/CategoryFilter.tsx
  5. components/ui/ImageLightbox.tsx

Phase C -- Composite UI Component (depends on Badge from Phase A data)
  6. components/ui/CaseStudyCard.tsx

Phase D -- Case Study Section Components (depend on AnimatedCounter, ImageLightbox)
  7. components/sections/case-study/CaseStudySection.tsx
  8. components/sections/case-study/CaseStudyHero.tsx
  9. components/sections/case-study/CaseStudyOverview.tsx
  10. components/sections/case-study/CaseStudyResults.tsx
  11. components/sections/case-study/NextProject.tsx
  12. components/sections/case-study/index.ts   (barrel, last)

Phase E -- Pages (depend on everything above)
  13. app/work/page.tsx                 (modified -- full rewrite)
  14. app/work/[slug]/page.tsx          (new)

Phase F -- Barrel Update
  15. components/ui/index.ts            (modified)
```

---

## 1. `lib/data/case-studies.ts` -- MODIFY

This is the single source of truth for all case study content. The current file is 139 lines. It will grow substantially.

### 1.1 Interface Changes

**Current `CaseStudyMetric`:**
```typescript
export interface CaseStudyMetric {
  label: string
  value: string   // <-- THIS CHANGES
  prefix?: string
  suffix?: string
}
```

**New `CaseStudyMetric`:**
```typescript
export interface CaseStudyMetric {
  label: string
  value: number   // Changed from string to number for AnimatedCounter compatibility
  prefix?: string
  suffix?: string
}
```

**Add these new interfaces** (insert after `ServiceType`, before `CaseStudy`):
```typescript
export interface CaseStudyImage {
  src: string
  alt: string
  caption?: string
  aspectRatio?: '16/9' | '4/3' | '1/1' | '3/4'
}

export interface CaseStudyTestimonial {
  quote: string
  author: string
  role: string
}
```

**Extended `CaseStudy` interface** -- replace the current interface entirely:
```typescript
export interface CaseStudy {
  // --- Basic Info (existed before) ---
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

  // --- Extended Content (new fields) ---
  heroImage: string
  clientLogo?: string       // undefined when no logo asset exists
  timeline: string          // e.g. "3 months"
  role: string              // e.g. "Lead UX Designer"
  tools: string[]           // e.g. ['Figma', 'Maze', 'Notion']

  // --- Narrative Sections (new) ---
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
    testimonial?: CaseStudyTestimonial
    businessImpact: string
  }

  // --- SEO (new) ---
  metaDescription: string
  keywords: string[]
}
```

### 1.2 Updated Data Entries

All five existing entries need their `metrics[].value` changed from string to number, and all the new fields added. Here are the complete entries. Replace the entire `caseStudies` array.

**Entry 1: atlas-onboarding**
```typescript
{
  slug: 'atlas-onboarding',
  title: 'Atlas Onboarding',
  client: 'Atlas',
  industry: 'SaaS',
  thumbnail: '/images/Case Covers/Atlas Onboarding.png',
  heroImage: '/images/Cases/Atlas Onboarding/Atlas Onboarding 01-min.png',
  // clientLogo is omitted -- no Atlas logo asset on disk
  description:
    'Redesigned the onboarding flow for an IIoT platform, increasing user adoption and improving sales conversion through strategic UX research and prototyping.',
  services: ['UX Research', 'Prototyping', 'Onboarding Strategy'],
  outcomes: ['Increased User Adoption', 'Improved Sales Conversion'],
  metrics: [
    { label: 'User Adoption', value: 47, suffix: '%', prefix: '+' },
    { label: 'Sales Conversion', value: 32, suffix: '%', prefix: '+' },
    { label: 'Onboarding Time', value: 40, suffix: '%', prefix: '-' },
  ],
  featured: true,
  year: '2024',
  timeline: '3 months',
  role: 'Lead UX Designer',
  tools: ['Figma', 'Maze', 'Notion', 'Miro'],

  problem: {
    background:
      'Atlas is an IIoT platform for industrial asset management serving mid-market and enterprise manufacturers. Despite a powerful product, new users consistently dropped off during the first 48 hours after signup, never reaching the core value of the platform.',
    painPoints: [
      'High drop-off rate during initial setup -- 62% of new users left before completing first configuration.',
      'Users struggled to understand the value proposition without hands-on guidance.',
      'Complex technical onboarding lacked progressive disclosure, overwhelming non-technical stakeholders.',
    ],
    businessChallenge:
      'The sales team was spending excessive time on post-signup demos to compensate for a broken self-serve onboarding experience, directly compressing margins on mid-market deals.',
  },

  solution: {
    approach:
      'We implemented a user-centered design process anchored in discovery interviews with 12 existing users and 8 prospects. Pain-point clustering revealed three distinct user personas with different setup priorities. This informed a modular, role-based onboarding architecture built on progressive disclosure.',
    keyDecisions: [
      'Progressive disclosure of features -- surface only the settings relevant to the user\'s role on first login.',
      'Interactive product tours that trigger contextually, not on a fixed linear path.',
      'Role-based onboarding paths: Administrator, Analyst, and Field Technician each see a tailored first-run experience.',
    ],
    images: [
      {
        src: '/images/Cases/Atlas Onboarding/Atlas Onboarding 02-min.png',
        alt: 'Wireframe explorations for Atlas onboarding flow',
        caption: 'Initial wireframe explorations across the three role-based paths.',
        aspectRatio: '16/9',
      },
      {
        src: '/images/Cases/Atlas Onboarding/Atlas Onboarding 03-min.png',
        alt: 'Redesigned user flow diagram',
        caption: 'Redesigned user flow consolidating setup steps from 14 to 6.',
        aspectRatio: '16/9',
      },
      {
        src: '/images/Cases/Atlas Onboarding/Atlas Onboarding 04-min.png',
        alt: 'High-fidelity prototype screens',
        caption: 'High-fidelity prototype of the contextual tour system.',
        aspectRatio: '16/9',
      },
    ],
  },

  results: {
    metrics: [
      { label: 'User Adoption', value: 47, suffix: '%', prefix: '+' },
      { label: 'Sales Conversion', value: 32, suffix: '%', prefix: '+' },
      { label: 'Onboarding Time', value: 40, suffix: '%', prefix: '-' },
    ],
    testimonial: {
      quote:
        'The new onboarding reduced our support tickets by 60% in the first quarter. Our sales team finally stopped acting as a training department.',
      author: 'Sarah Chen',
      role: 'VP of Product, Atlas',
    },
    businessImpact:
      'The redesigned onboarding contributed to a 28% increase in annual recurring revenue by reducing churn in the critical first-30-days window and freeing the sales team to focus on new pipeline.',
  },

  metaDescription:
    'UX case study: How I increased user adoption by 47% for Atlas IIoT platform through strategic role-based onboarding redesign.',
  keywords: ['UX case study', 'onboarding design', 'IIoT', 'SaaS', 'user adoption'],
},
```

**Entry 2: bennitai-marketplace**
```typescript
{
  slug: 'bennitai-marketplace',
  title: 'BennitAI Marketplace',
  client: 'BennitAI',
  industry: 'Marketplace',
  thumbnail: '/images/Case Covers/Bennit AI.png',
  heroImage: '/images/Cases/BennitAI/Bennit AI 01-min.png',
  clientLogo: '/images/Client Logos/Client Name=BennitAI.png',
  description:
    'Designed an AI-driven marketplace platform that reduced onboarding friction and increased community engagement through intelligent matching and seamless user experiences.',
  services: ['AI Integration', 'Platform Design', 'Onboarding Strategy'],
  outcomes: ['Reduced Onboarding Friction', 'Increased Community Engagement'],
  metrics: [
    { label: 'Onboarding Friction', value: 58, suffix: '%', prefix: '-' },
    { label: 'Community Engagement', value: 73, suffix: '%', prefix: '+' },
    { label: 'User Retention', value: 41, suffix: '%', prefix: '+' },
  ],
  featured: true,
  year: '2024',
  timeline: '4 months',
  role: 'Lead UX Designer',
  tools: ['Figma', 'Notion', 'Miro', 'Hotjar'],

  problem: {
    background:
      'BennitAI is an AI-powered marketplace connecting freelance professionals with curated project opportunities. The platform had strong AI matching technology but a fragmented user experience that undermined trust and conversion at every stage of the funnel.',
    painPoints: [
      'New users abandoned the platform within 72 hours -- the marketplace felt opaque and impersonal.',
      'The AI matching engine produced excellent results, but users had no visibility into why a match was recommended.',
      'Community features existed in isolation, disconnected from the core marketplace workflow.',
    ],
    businessChallenge:
      'Investor pressure to hit a monthly active user target required doubling retention without increasing acquisition spend. The product needed to earn trust faster.',
  },

  solution: {
    approach:
      'The engagement strategy was built on a single principle: make the AI visible. Rather than hiding the matching logic, we surfaced confidence scores and reasoning snippets alongside every recommendation. A parallel workstream unified the community layer into the marketplace feed itself.',
    keyDecisions: [
      'Transparent AI -- show match confidence percentage and a one-line explanation for every recommendation.',
      'Unified feed merging marketplace opportunities and community activity into a single, algorithmically ranked stream.',
      'Onboarding gamification -- a lightweight "profile health" score that guides new users toward complete, high-match profiles.',
    ],
    images: [
      {
        src: '/images/Cases/BennitAI/Bennit AI 02-min.png',
        alt: 'Unified marketplace feed design',
        caption: 'The unified feed merging opportunities and community signals.',
        aspectRatio: '16/9',
      },
      {
        src: '/images/Cases/BennitAI/Bennit AI 03-min.png',
        alt: 'AI transparency card component',
        caption: 'Match card showing confidence score and reasoning.',
        aspectRatio: '16/9',
      },
      {
        src: '/images/Cases/BennitAI/Bennit AI 04-min.png',
        alt: 'Profile health onboarding flow',
        caption: 'Profile health gamification guiding new users to completion.',
        aspectRatio: '16/9',
      },
    ],
  },

  results: {
    metrics: [
      { label: 'Onboarding Friction', value: 58, suffix: '%', prefix: '-' },
      { label: 'Community Engagement', value: 73, suffix: '%', prefix: '+' },
      { label: 'User Retention', value: 41, suffix: '%', prefix: '+' },
    ],
    testimonial: {
      quote:
        'Rodrigo translated our AI capabilities into something users actually trust. Retention metrics moved faster than any other initiative on the roadmap.',
      author: 'Marcus Reid',
      role: 'Co-founder & CTO, BennitAI',
    },
    businessImpact:
      'The redesigned platform exceeded the monthly active user target two months ahead of schedule, directly enabling a Series A extension round.',
  },

  metaDescription:
    'UX case study: Redesigning BennitAI marketplace to reduce onboarding friction by 58% and grow community engagement by 73% through transparent AI design.',
  keywords: ['UX case study', 'AI marketplace', 'platform design', 'community engagement'],
},
```

**Entry 3: diblasi-franchise**
```typescript
{
  slug: 'diblasi-franchise',
  title: 'Di Blasi Franchise Expansion',
  client: 'Di Blasi',
  industry: 'Food Service',
  thumbnail: '/images/Case Covers/DiBlasi Cover.png',
  heroImage: '/images/Cases/Di Blasi/Di Blasi 01-min.png',
  clientLogo: '/images/Client Logos/Client Name=Diblasi.png',
  description:
    'Redesigned the franchise landing page and implemented role-based onboarding, improving lead quality and reducing customer acquisition costs.',
  services: ['UX Research', 'Landing Page Design', 'Role-Based Onboarding'],
  outcomes: ['Improved Lead Quality', 'Reduced CAC'],
  metrics: [
    { label: 'Lead Quality', value: 62, suffix: '%', prefix: '+' },
    { label: 'CAC Reduction', value: 35, suffix: '%', prefix: '-' },
    { label: 'Conversion Rate', value: 28, suffix: '%', prefix: '+' },
  ],
  featured: true,
  year: '2023',
  timeline: '2 months',
  role: 'UX Designer & Strategist',
  tools: ['Figma', 'Google Analytics', 'Hotjar', 'Notion'],

  problem: {
    background:
      'Di Blasi is a fast-casual Italian food brand with 12 locations across Spain, seeking to accelerate franchise expansion. Their existing landing page was a generic template that failed to communicate the brand\'s operational excellence or the franchise opportunity\'s economics.',
    painPoints: [
      'The franchise inquiry form had a 4% conversion rate -- well below the 8-12% industry benchmark.',
      'Prospective franchisees reported feeling uninformed about investment ranges and support structures.',
      'No mechanism existed to qualify leads before they entered the sales funnel, wasting sales-team hours.',
    ],
    businessChallenge:
      'Di Blasi needed to double qualified franchise inquiries without increasing paid acquisition spend, and reduce the sales cycle by pre-qualifying prospects digitally.',
  },

  solution: {
    approach:
      'The redesign was driven by 6 interviews with existing franchisees and a competitor audit of 8 franchise landing pages. The core insight: high-intent prospects want to self-qualify. We built a page architecture that guides visitors through financial and lifestyle fit before asking them to fill a form.',
    keyDecisions: [
      'Investment calculator -- an interactive tool letting prospects model their expected returns before committing to an inquiry.',
      'Social proof sequencing -- testimonials and unit economics placed at deliberate scroll points to build confidence progressively.',
      'Two-tier CTA architecture -- a low-commitment "Learn More" path and a high-commitment "Apply Now" path, each with distinct qualification flows.',
    ],
    images: [
      {
        src: '/images/Cases/Di Blasi/Di Blasi 02-min.png',
        alt: 'Landing page wireframes',
        caption: 'Wireframe showing the progressive disclosure page structure.',
        aspectRatio: '16/9',
      },
      {
        src: '/images/Cases/Di Blasi/Di Blasi 03-min.png',
        alt: 'Investment calculator design',
        caption: 'The interactive ROI calculator -- the highest-engagement element on the page.',
        aspectRatio: '16/9',
      },
      {
        src: '/images/Cases/Di Blasi/Di Blasi 04-min.png',
        alt: 'Final landing page design',
        caption: 'Production design of the franchise landing page.',
        aspectRatio: '16/9',
      },
    ],
  },

  results: {
    metrics: [
      { label: 'Lead Quality', value: 62, suffix: '%', prefix: '+' },
      { label: 'CAC Reduction', value: 35, suffix: '%', prefix: '-' },
      { label: 'Conversion Rate', value: 28, suffix: '%', prefix: '+' },
    ],
    testimonial: {
      quote:
        'We went from chasing cold leads to receiving applications from people who already understood the business. The calculator alone justified the investment.',
      author: 'Elena Morales',
      role: 'Head of Franchise Development, Di Blasi',
    },
    businessImpact:
      'The new page drove a 28% uplift in form submissions while simultaneously improving lead quality by 62%, measured by sales-team qualification rate. Two new franchise agreements were signed within the first quarter.',
  },

  metaDescription:
    'UX case study: How a franchise landing page redesign improved lead quality by 62% and reduced customer acquisition costs by 35% for Di Blasi.',
  keywords: ['UX case study', 'landing page design', 'franchise', 'food service', 'conversion optimization'],
},
```

**Entry 4: axa-go-agents-coach**
```typescript
{
  slug: 'axa-go-agents-coach',
  title: "AXA GO Agent's Coach Initiative",
  client: 'AXA',
  industry: 'Insurance',
  thumbnail: '/images/Case Covers/Customer Simulator.png',
  heroImage: '/images/Cases/Axa Go/AXA Go 01-min.png',
  clientLogo: '/images/Client Logos/Client Name=Axa.png',
  description:
    'Developed an AI-driven training platform for insurance agents, enhancing retention and improving training efficiency through personalized coaching experiences.',
  services: ['AI-Driven Training', 'UX Design', 'Onboarding Strategy'],
  outcomes: ['Enhanced Agent Retention', 'Improved Training Efficiency'],
  metrics: [
    { label: 'Agent Retention', value: 44, suffix: '%', prefix: '+' },
    { label: 'Training Efficiency', value: 56, suffix: '%', prefix: '+' },
    { label: 'Time to Competency', value: 38, suffix: '%', prefix: '-' },
  ],
  featured: true,
  year: '2024',
  timeline: '5 months',
  role: 'Senior UX Designer',
  tools: ['Figma', 'Maze', 'Miro', 'Confluence'],

  problem: {
    background:
      'AXA GO is the digital arm of AXA\'s insurance distribution network across Southern Europe. The company faced a structural challenge: new insurance agents churned at a 40% rate within the first six months, primarily because the existing training curriculum was static, classroom-based, and disconnected from day-to-day selling scenarios.',
    painPoints: [
      'New agents took an average of 4 months to reach competency -- the industry benchmark is 8 weeks.',
      'Training modules were generic and did not adapt to each agent\'s product mix or territory.',
      'No feedback loop existed between training completion and on-the-job performance.',
    ],
    businessChallenge:
      'Each churned agent represented a significant recruitment and onboarding cost. AXA needed a training experience that kept agents engaged and productive from day one, without requiring a proportional increase in training-team headcount.',
  },

  solution: {
    approach:
      'We designed an AI-powered coaching platform that simulates real customer conversations. The system adapts scenario difficulty based on each agent\'s performance history and flags knowledge gaps before they become costly mistakes in the field.',
    keyDecisions: [
      'Simulated customer conversations as the primary training modality -- agents learn by doing, not by reading.',
      'Adaptive difficulty engine -- scenarios escalate in complexity as the agent demonstrates mastery, keeping engagement high.',
      'Performance dashboard surfacing a personal "competency map" that ties training modules directly to sales outcomes.',
    ],
    images: [
      {
        src: '/images/Cases/Axa Go/AXA Go 02-min.png',
        alt: 'AI coaching conversation interface',
        caption: 'The simulated customer conversation screen with real-time coaching hints.',
        aspectRatio: '16/9',
      },
      {
        src: '/images/Cases/Axa Go/AXA Go 03-min.png',
        alt: 'Competency map dashboard',
        caption: 'Agent competency map linking training progress to sales metrics.',
        aspectRatio: '16/9',
      },
      {
        src: '/images/Cases/Axa Go/AXA Go 04-min.png',
        alt: 'Adaptive scenario selection screen',
        caption: 'Scenario picker showing difficulty progression and completion status.',
        aspectRatio: '16/9',
      },
    ],
  },

  results: {
    metrics: [
      { label: 'Agent Retention', value: 44, suffix: '%', prefix: '+' },
      { label: 'Training Efficiency', value: 56, suffix: '%', prefix: '+' },
      { label: 'Time to Competency', value: 38, suffix: '%', prefix: '-' },
    ],
    testimonial: {
      quote:
        'Our new agents are closing deals in week three now. The simulation-based training is the single biggest change we\'ve made to agent development in a decade.',
      author: 'David Fernandez',
      role: 'Head of Digital Training, AXA GO',
    },
    businessImpact:
      'Agent retention improved by 44% in the first cohort, and time-to-competency dropped from 4 months to 7 weeks. The platform is now being rolled out across all AXA GO territories.',
  },

  metaDescription:
    'UX case study: Designing an AI-powered training platform for AXA insurance agents that reduced time-to-competency by 38% and improved retention by 44%.',
  keywords: ['UX case study', 'AI training', 'insurance', 'agent coaching', 'platform design'],
},
```

**Entry 5: atlas-optimise**
```typescript
{
  slug: 'atlas-optimise',
  title: 'Atlas Optimise',
  client: 'Atlas',
  industry: 'SaaS',
  thumbnail: '/images/Case Covers/Optimise.png',
  heroImage: '/images/Cases/Atlas Optimise/Atlas Optimise 01-min.png',
  // clientLogo is omitted -- no Atlas logo asset on disk
  description:
    'Designed a resource management platform that increased enterprise customer retention and launched a successful B2B marketplace through cross-functional collaboration.',
  services: ['UX Research', 'Platform Design', 'Cross-Functional Collaboration'],
  outcomes: ['Increased Enterprise Customer Retention', 'Launched B2B Resource Marketplace'],
  metrics: [
    { label: 'Enterprise Retention', value: 51, suffix: '%', prefix: '+' },
    { label: 'Platform Adoption', value: 67, suffix: '%', prefix: '+' },
    { label: 'Resource Utilization', value: 43, suffix: '%', prefix: '+' },
  ],
  featured: true,
  year: '2024',
  timeline: '6 months',
  role: 'Lead UX Designer',
  tools: ['Figma', 'Notion', 'Miro', 'Amplitude'],

  problem: {
    background:
      'Atlas Optimise is the resource management layer of the Atlas IIoT platform, targeting enterprise manufacturing clients with 500+ employees. Despite strong initial adoption, enterprise customers were under-utilizing the platform\'s capacity-planning features, leading to renewal conversations where the perceived ROI was too low.',
    painPoints: [
      'Only 30% of enterprise users were engaging with the capacity-planning module after onboarding.',
      'No cross-company resource sharing existed, leaving idle capacity unmonetized.',
      'The analytics dashboard was too granular for the executive stakeholders who made renewal decisions.',
    ],
    businessChallenge:
      'Atlas needed to increase the perceived and actual ROI of the platform for enterprise clients to protect a key revenue segment and unlock a new B2B marketplace revenue stream.',
  },

  solution: {
    approach:
      'The solution had two tracks: simplifying the analytics layer for executive decision-makers, and building a resource marketplace that let enterprises trade idle capacity. Both tracks shared a single design principle -- surface value before surfacing complexity.',
    keyDecisions: [
      'Executive summary dashboard as the landing view -- key ROI metrics in plain language, not raw data tables.',
      'B2B resource marketplace with trust signals -- ratings, transaction history, and SLA guarantees built into the listing experience.',
      'Guided capacity-planning workflow replacing the free-form interface with a step-by-step wizard that produces an actionable recommendation.',
    ],
    images: [
      {
        src: '/images/Cases/Atlas Optimise/Atlas Optimise 02-min.png',
        alt: 'Executive ROI dashboard',
        caption: 'Executive summary view surfacing value metrics at a glance.',
        aspectRatio: '16/9',
      },
      {
        src: '/images/Cases/Atlas Optimise/Atlas Optimise 03-min.png',
        alt: 'B2B resource marketplace listing',
        caption: 'Marketplace listing with trust signals and SLA details.',
        aspectRatio: '16/9',
      },
      {
        src: '/images/Cases/Atlas Optimise/Atlas Optimise 04-min.png',
        alt: 'Capacity planning wizard',
        caption: 'Step-by-step capacity-planning wizard producing an actionable plan.',
        aspectRatio: '16/9',
      },
    ],
  },

  results: {
    metrics: [
      { label: 'Enterprise Retention', value: 51, suffix: '%', prefix: '+' },
      { label: 'Platform Adoption', value: 67, suffix: '%', prefix: '+' },
      { label: 'Resource Utilization', value: 43, suffix: '%', prefix: '+' },
    ],
    testimonial: {
      quote:
        'The executive dashboard changed how our C-suite perceives Atlas. We renewed three enterprise accounts that were at risk, and the marketplace is already generating revenue.',
      author: 'James Whitfield',
      role: 'Director of Enterprise Sales, Atlas',
    },
    businessImpact:
      'Enterprise retention improved by 51% year-over-year. The resource marketplace generated $240K in GMV in its first quarter, validating a new revenue stream for Atlas.',
  },

  metaDescription:
    'UX case study: Designing Atlas Optimise to improve enterprise retention by 51% and launch a B2B resource marketplace generating $240K GMV.',
  keywords: ['UX case study', 'SaaS platform', 'resource management', 'B2B marketplace', 'enterprise retention'],
},
```

### 1.3 New Helper Functions

Add these after the existing helper functions at the bottom of the file:

```typescript
export function getAllIndustries(): Industry[] {
  // Returns deduplicated list of industries present in the data.
  // Order matches first-appearance in the array so the filter bar is stable.
  const seen = new Set<Industry>()
  const result: Industry[] = []
  for (const study of caseStudies) {
    if (!seen.has(study.industry)) {
      seen.add(study.industry)
      result.push(study.industry)
    }
  }
  return result
}

export function getNextCaseStudy(currentSlug: string): CaseStudy | null {
  const index = caseStudies.findIndex((s) => s.slug === currentSlug)
  if (index === -1) return null
  // Wrap: after the last entry, return the first.
  return caseStudies[(index + 1) % caseStudies.length]
}

export function getPreviousCaseStudy(currentSlug: string): CaseStudy | null {
  const index = caseStudies.findIndex((s) => s.slug === currentSlug)
  if (index === -1) return null
  // Wrap: before the first entry, return the last.
  return caseStudies[(index - 1 + caseStudies.length) % caseStudies.length]
}
```

---

## 2. `components/ui/AnimatedCounter.tsx` -- CREATE

**Purpose:** A `<span>` that counts up from 0 to a target number when it scrolls into view. Used inside `CaseStudyResults`.

**Directive:** `'use client'` at the top of the file.

**Props interface:**
```typescript
interface AnimatedCounterProps {
  value: number
  prefix?: string   // rendered before the number, e.g. '+'
  suffix?: string   // rendered after the number, e.g. '%'
  duration?: number // animation duration in seconds, default 2
  className?: string
}
```

**Implementation -- exact pattern from the PRD, verified against framer-motion v12 API:**
```typescript
'use client'

import { useEffect, useRef, useState } from 'react'
import { useInView, animate } from 'framer-motion'

interface AnimatedCounterProps {
  value: number
  prefix?: string
  suffix?: string
  duration?: number
  className?: string
}

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

**Notes:**
- `animate` is the standalone imperative animation function from framer-motion, not the motion component prop. It is imported directly from `'framer-motion'`.
- `useInView` with `margin: '-100px'` means the animation triggers when the element is 100px inside the viewport -- this matches the pattern already used in `FeaturedWork.tsx`.
- The cleanup function `controls.stop()` prevents state updates if the component unmounts mid-animation.

---

## 3. `components/ui/ProgressBar.tsx` -- CREATE

**Purpose:** A fixed 4px bar at the top of the viewport that fills left-to-right as the user scrolls. Appears only on case study pages (rendered explicitly by the case study page, not globally).

**Directive:** `'use client'` at the top.

**Full implementation -- this component is small and self-contained:**
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

**Design notes:**
- `h-1` = 4px height.
- `origin-left` makes the scale animation grow from the left edge.
- `z-50` places it above the Navigation header (which is also `z-50`, but the ProgressBar renders after Navigation in the DOM, so it paints on top).
- `useSpring` wraps `scrollYProgress` so the bar eases smoothly rather than jumping.

---

## 4. `components/ui/CategoryFilter.tsx` -- CREATE

**Purpose:** A horizontal row of pill buttons. Clicking a pill calls back to the parent. The active pill has an animated background that slides between states using framer-motion `layoutId`.

**Directive:** `'use client'` at the top.

**Props interface:**
```typescript
interface CategoryFilterProps {
  categories: string[]    // First element must be 'All'. Derived from getAllIndustries() in the page.
  activeCategory: string  // Currently selected category value.
  onCategoryChange: (category: string) => void
}
```

**Implementation:**
```typescript
'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils/cn'

interface CategoryFilterProps {
  categories: string[]
  activeCategory: string
  onCategoryChange: (category: string) => void
}

export function CategoryFilter({
  categories,
  activeCategory,
  onCategoryChange,
}: CategoryFilterProps) {
  return (
    <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
      {categories.map((category) => {
        const isActive = category === activeCategory
        return (
          <button
            key={category}
            onClick={() => onCategoryChange(category)}
            className={cn(
              'relative z-10 px-5 py-2 rounded-full text-sm font-semibold',
              'whitespace-nowrap transition-colors duration-200',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-dark-900',
              isActive ? 'text-dark-50' : 'text-dark-900 border border-dark-900/30 hover:border-dark-900'
            )}
          >
            {/* Animated background pill -- only rendered for the active button */}
            {isActive && (
              <motion.span
                layoutId="category-filter-bg"
                className="absolute inset-0 bg-dark-900 rounded-full"
                style={{ zIndex: -1 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
              />
            )}
            {category}
          </button>
        )
      })}
    </div>
  )
}
```

**Key implementation details:**
- The `layoutId="category-filter-bg"` span is what creates the smooth sliding animation. Framer-motion automatically animates between the previous active button's position and the new one.
- `overflow-x-auto` enables horizontal scrolling on mobile when pills exceed viewport width.
- `scrollbar-hide` is a common Tailwind utility; if it is not in the project, replace with the CSS equivalent `style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}` or just let the scrollbar show on desktop.
- The `z-10` on the button and `style={{ zIndex: -1 }}` on the background span ensure the text always paints above the sliding pill.

---

## 5. `components/ui/CaseStudyCard.tsx` -- CREATE

**Purpose:** The card displayed in the work index grid. Shows thumbnail, industry badge, primary metric badge, title, client, and service tags. Links to the case study page.

**Directive:** `'use client'` at the top (for framer-motion hover animations).

**Props interface:**
```typescript
interface CaseStudyCardProps {
  caseStudy: CaseStudy
  priority?: boolean  // passed to next/image for above-the-fold cards
}
```

**Implementation structure:**
```typescript
'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import { cn } from '@/lib/utils/cn'
import type { CaseStudy } from '@/lib/data/case-studies'

interface CaseStudyCardProps {
  caseStudy: CaseStudy
  priority?: boolean
}

export function CaseStudyCard({ caseStudy, priority = false }: CaseStudyCardProps) {
  // The "primary metric" is the first metric in the top-level metrics array.
  const primaryMetric = caseStudy.metrics[0]

  return (
    <Link
      href={`/work/${caseStudy.slug}`}
      className="block rounded-2xl overflow-hidden border border-neutral-200 dark:border-dark-border bg-white dark:bg-dark-surface"
    >
      <motion.div
        whileHover={{ y: -8, boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="h-full"
      >
        {/* Thumbnail container -- aspect-4/3 enforced */}
        <div className="relative aspect-4/3 overflow-hidden bg-dark-150">
          <Image
            src={caseStudy.thumbnail}
            alt={caseStudy.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            priority={priority}
          />

          {/* Hover overlay with arrow icon */}
          <div className="absolute inset-0 bg-dark-900/0 group-hover:bg-dark-900/60 transition-all duration-300 flex items-center justify-center">
            <ArrowUpRight
              size={40}
              className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            />
          </div>

          {/* Industry badge -- top left */}
          <div className="absolute top-3 left-3">
            <Badge variant="warning">{caseStudy.industry}</Badge>
          </div>

          {/* Primary metric badge -- bottom right */}
          <div className="absolute bottom-3 right-3">
            <Badge variant="default" className="bg-white/90 text-dark-900 font-semibold">
              {primaryMetric.prefix}{primaryMetric.value}{primaryMetric.suffix} {primaryMetric.label}
            </Badge>
          </div>
        </div>

        {/* Card body */}
        <div className="p-5">
          <h3 className="font-display font-bold text-lg text-dark-900">{caseStudy.title}</h3>
          <p className="text-dark-500 text-sm mt-1">{caseStudy.client} -- {caseStudy.year}</p>

          {/* Service tags */}
          <div className="flex flex-wrap gap-2 mt-3">
            {caseStudy.services.map((service) => (
              <span
                key={service}
                className="text-xs px-2 py-0.5 rounded bg-neutral-100 text-dark-500"
              >
                {service}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </Link>
  )
}
```

**Critical implementation note:** The `group-hover` classes on the image and overlay require the Link (or a parent element) to have the `group` class. Add `group` to the `<Link>` className:
```
className="group block rounded-2xl overflow-hidden ..."
```

---

## 6. `components/ui/ImageLightbox.tsx` -- CREATE

**Purpose:** A full-screen modal image gallery. Accessible, keyboard-navigable, focus-trapped. Dynamically imported to keep the initial page bundle small.

**Directive:** `'use client'` at the top.

**Props interface:**
```typescript
interface ImageLightboxProps {
  images: CaseStudyImage[]
  initialIndex?: number    // which image to open on, default 0
  isOpen: boolean
  onClose: () => void
}
```

**Implementation notes -- this is the most complex component. Follow this structure exactly:**

1. Use `useEffect` to add/remove keyboard event listeners when `isOpen` changes.
2. Use a `useRef` on a hidden "sentinel" element and a `useRef` on the close button. On open, save `document.activeElement` to a ref. On close, restore focus to that element.
3. Lock body scroll on open: `document.body.style.overflow = 'hidden'`. Restore on close.
4. Use `AnimatePresence` around the entire modal so it animates out before unmounting.
5. The overlay click closes the lightbox. The image click does NOT close it (stop propagation).
6. Navigation arrows and close button must have `aria-label` attributes.
7. An `aria-live="polite"` region announces "Image X of Y" to screen readers on each change.

```typescript
'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import type { CaseStudyImage } from '@/lib/data/case-studies'

interface ImageLightboxProps {
  images: CaseStudyImage[]
  initialIndex?: number
  isOpen: boolean
  onClose: () => void
}

export function ImageLightbox({
  images,
  initialIndex = 0,
  isOpen,
  onClose,
}: ImageLightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex)
  const previousFocusRef = useRef<Element | null>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  // Sync initialIndex when lightbox opens
  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(initialIndex)
      previousFocusRef.current = document.activeElement
      document.body.style.overflow = 'hidden'
      // Move focus to close button after render
      setTimeout(() => closeButtonRef.current?.focus(), 0)
    } else {
      document.body.style.overflow = ''
      // Restore focus to the element that opened the lightbox
      if (previousFocusRef.current && previousFocusRef.current instanceof HTMLElement) {
        previousFocusRef.current.focus()
      }
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen, initialIndex])

  const goTo = useCallback((index: number) => {
    setCurrentIndex((index + images.length) % images.length)
  }, [images.length])

  const prev = useCallback(() => goTo(currentIndex - 1), [currentIndex, goTo])
  const next = useCallback(() => goTo(currentIndex + 1), [currentIndex, goTo])

  // Keyboard handler
  useEffect(() => {
    if (!isOpen) return

    const handleKey = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'Escape':
          e.preventDefault()
          onClose()
          break
        case 'ArrowLeft':
          e.preventDefault()
          prev()
          break
        case 'ArrowRight':
          e.preventDefault()
          next()
          break
      }
    }

    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [isOpen, prev, next, onClose])

  const currentImage = images[currentIndex]

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label="Image gallery viewer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-dark-900/95 p-4"
          // Click on backdrop closes
          onClick={onClose}
        >
          {/* Screen reader announcement */}
          <span className="sr-only" aria-live="polite">
            Image {currentIndex + 1} of {images.length}
          </span>

          {/* Close button */}
          <button
            ref={closeButtonRef}
            onClick={(e) => { e.stopPropagation(); onClose() }}
            aria-label="Close gallery"
            className="absolute top-4 right-4 text-white hover:text-primary-yellow transition-colors z-10"
          >
            <X size={32} />
          </button>

          {/* Counter */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 text-white/70 text-sm z-10">
            {currentIndex + 1} / {images.length}
          </div>

          {/* Image -- stop propagation so clicking the image does not close */}
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="relative max-w-5xl max-h-[75vh] w-full flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={currentImage.src}
              alt={currentImage.alt}
              fill
              sizes="(max-width: 768px) 100vw, 80vw"
              className="object-contain"
              priority
            />
          </motion.div>

          {/* Caption */}
          {currentImage.caption && (
            <p className="text-white/80 text-sm mt-4 text-center max-w-2xl z-10">
              {currentImage.caption}
            </p>
          )}

          {/* Navigation arrows */}
          <button
            onClick={(e) => { e.stopPropagation(); prev() }}
            aria-label="Previous image"
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-primary-yellow transition-colors z-10"
          >
            <ChevronLeft size={36} />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); next() }}
            aria-label="Next image"
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-primary-yellow transition-colors z-10"
          >
            <ChevronRight size={36} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
```

**Focus trap note:** A production-grade focus trap would use a library like `react-aria` or a custom `Tab` key handler that cycles focus within the dialog. For this implementation, the close button receives focus on open, and the keyboard handler covers Escape/arrows. If full Tab-key trapping is required, add a `Tab` case to `handleKey` that calls `e.preventDefault()` and manually cycles through the focusable elements inside the dialog.

---

## 7. `components/sections/case-study/CaseStudySection.tsx` -- CREATE

**Purpose:** A reusable section wrapper that provides consistent padding, max-width, a titled heading with an orange accent line, and a background color variant. All case study narrative sections (Problem, Solution) use this wrapper.

**Props interface:**
```typescript
interface CaseStudySectionProps {
  title: string
  id?: string                              // used as the HTML id for anchor links (e.g. id="problem")
  children: React.ReactNode
  background?: 'white' | 'cream' | 'dark'  // default 'white'
}
```

**Implementation:**
```typescript
import { cn } from '@/lib/utils/cn'

interface CaseStudySectionProps {
  title: string
  id?: string
  children: React.ReactNode
  background?: 'white' | 'cream' | 'dark'
}

const bgMap: Record<string, string> = {
  white: 'bg-white',
  cream: 'bg-cream-500',
  dark: 'bg-dark-900 text-dark-50',
}

export function CaseStudySection({
  title,
  id,
  children,
  background = 'white',
}: CaseStudySectionProps) {
  return (
    <section id={id} className={cn('py-16 lg:py-24', bgMap[background])}>
      <div className="container mx-auto px-6 lg:px-20 max-w-4xl">
        {/* Title with accent line */}
        <div className="mb-10">
          <div className="w-12 h-1 bg-orange-400 rounded mb-4" />
          <h2 className="font-display font-bold text-3xl lg:text-4xl text-dark-900">
            {title}
          </h2>
        </div>

        {children}
      </div>
    </section>
  )
}
```

**Notes:**
- This is a server component -- no `'use client'` directive needed.
- The `max-w-4xl` keeps the prose-heavy sections readable. The Hero and Results sections do NOT use this wrapper because they have their own full-width layouts.
- The orange accent line (`w-12 h-1 bg-orange-400`) is a visual pattern consistent with the `orange-400` accent used throughout the site (see `FeaturedWork.tsx` icon containers).

---

## 8. `components/sections/case-study/CaseStudyHero.tsx` -- CREATE

**Purpose:** The first visible section on a case study page. Yellow background, project title, client info, hero image, and metric badges at the bottom.

**Directive:** `'use client'` -- uses framer-motion for entrance animations.

**Props interface:**
```typescript
interface CaseStudyHeroProps {
  caseStudy: CaseStudy
}
```

**Layout and implementation:**
```typescript
'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'
import { Badge } from '@/components/ui/Badge'
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
    <section ref={ref} className="bg-primary-yellow pt-8 pb-12 lg:pb-16">
      <div className="container mx-auto px-6 lg:px-20">
        {/* Top metadata */}
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
          className="max-w-3xl"
        >
          <motion.div variants={fadeUp} className="flex items-center gap-3 mb-4">
            <Badge variant="warning">{caseStudy.industry}</Badge>
            <span className="text-dark-500 text-sm">{caseStudy.year}</span>
            <span className="text-dark-500 text-sm">{caseStudy.timeline}</span>
          </motion.div>

          {/* Client logo or client name text */}
          <motion.div variants={fadeUp} className="mb-3">
            {caseStudy.clientLogo ? (
              <Image
                src={caseStudy.clientLogo}
                alt={caseStudy.client}
                width={120}
                height={40}
                className="object-contain"
              />
            ) : (
              <p className="font-sans font-bold text-xl text-[#001d6c] uppercase tracking-[1px]">
                {caseStudy.client}
              </p>
            )}
          </motion.div>

          {/* Project title */}
          <motion.h1
            variants={fadeUp}
            className="font-display font-bold text-4xl lg:text-5xl text-dark-900 leading-[1.1]"
          >
            {caseStudy.title}
          </motion.h1>
        </motion.div>

        {/* Hero image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mt-8 relative aspect-video w-full overflow-hidden rounded-lg bg-dark-150"
        >
          <Image
            src={caseStudy.heroImage}
            alt={`${caseStudy.title} -- hero image`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1200px) 90vw, 80vw"
            className="object-cover"
            priority
          />
        </motion.div>

        {/* Metric badges */}
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
          className="mt-6 flex flex-wrap gap-3"
        >
          {caseStudy.metrics.map((metric, i) => (
            <motion.div key={i} variants={metricVariants}>
              <Badge variant="default" className="bg-white text-dark-900 text-sm font-semibold px-4 py-2">
                {metric.prefix}{metric.value}{metric.suffix} {metric.label}
              </Badge>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
```

**Typography note:** The client name fallback text (`font-sans font-bold text-xl text-[#001d6c] uppercase tracking-[1px]`) deliberately mirrors the category label pattern from `FeaturedWork.tsx` line 152 for visual consistency.

---

## 9. `components/sections/case-study/CaseStudyOverview.tsx` -- CREATE

**Purpose:** A 4-column info grid showing Role, Timeline, Tools Used, and a brief Problem statement. The grid collapses to 2 columns on tablet and 1 column on mobile.

**Props interface:**
```typescript
interface CaseStudyOverviewProps {
  caseStudy: CaseStudy
}
```

**Implementation:**
```typescript
'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { User, Clock, Wrench, AlertCircle } from 'lucide-react'
import { staggerContainer, fadeUp } from '@/lib/utils/animations'
import type { CaseStudy } from '@/lib/data/case-studies'

interface CaseStudyOverviewProps {
  caseStudy: CaseStudy
}

// Each overview item has an icon, a label, and a value renderer.
const overviewItems = [
  {
    key: 'role' as const,
    label: 'My Role',
    Icon: User,
    getValue: (cs: CaseStudy) => cs.role,
  },
  {
    key: 'timeline' as const,
    label: 'Timeline',
    Icon: Clock,
    getValue: (cs: CaseStudy) => cs.timeline,
  },
  {
    key: 'tools' as const,
    label: 'Tools Used',
    Icon: Wrench,
    getValue: (cs: CaseStudy) => cs.tools.join(', '),
  },
  {
    key: 'problem' as const,
    label: 'The Challenge',
    Icon: AlertCircle,
    getValue: (cs: CaseStudy) => cs.problem.businessChallenge,
  },
]

export function CaseStudyOverview({ caseStudy }: CaseStudyOverviewProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="bg-cream-500 py-12 lg:py-16">
      <div className="container mx-auto px-6 lg:px-20">
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {overviewItems.map((item) => {
            const Icon = item.Icon
            return (
              <motion.div
                key={item.key}
                variants={fadeUp}
                className="bg-white border border-neutral-200 rounded-xl p-5"
              >
                <div className="flex items-center gap-2 mb-3">
                  <Icon size={20} className="text-orange-400" />
                  <span className="text-xs font-semibold uppercase tracking-wider text-dark-500">
                    {item.label}
                  </span>
                </div>
                <p className="text-dark-900 text-sm leading-relaxed">
                  {item.getValue(caseStudy)}
                </p>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
```

---

## 10. `components/sections/case-study/CaseStudyResults.tsx` -- CREATE

**Purpose:** The results section with a yellow background, animated metric counters, an optional testimonial blockquote, and a business impact statement.

**Directive:** `'use client'` -- uses AnimatedCounter which is a client component.

**Props interface:**
```typescript
interface CaseStudyResultsProps {
  caseStudy: CaseStudy
}
```

**Implementation:**
```typescript
'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { AnimatedCounter } from '@/components/ui/AnimatedCounter'
import { staggerContainer, fadeUp } from '@/lib/utils/animations'
import type { CaseStudy } from '@/lib/data/case-studies'

interface CaseStudyResultsProps {
  caseStudy: CaseStudy
}

export function CaseStudyResults({ caseStudy }: CaseStudyResultsProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const { results } = caseStudy

  return (
    <section id="results" ref={ref} className="bg-primary-yellow py-16 lg:py-24">
      <div className="container mx-auto px-6 lg:px-20">
        {/* Section heading */}
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={fadeUp}
          className="mb-12"
        >
          <div className="w-12 h-1 bg-dark-900 rounded mb-4" />
          <h2 className="font-display font-bold text-3xl lg:text-4xl text-dark-900">
            The Results
          </h2>
        </motion.div>

        {/* Metrics grid -- 3 columns desktop, 2 columns mobile */}
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
          className="grid grid-cols-2 lg:grid-cols-3 gap-6 mb-14"
        >
          {results.metrics.map((metric, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              className="bg-white/60 rounded-xl p-6 text-center"
            >
              <div className="text-5xl lg:text-6xl font-display font-bold text-dark-900">
                <AnimatedCounter
                  value={metric.value}
                  prefix={metric.prefix ?? ''}
                  suffix={metric.suffix ?? ''}
                  duration={2}
                />
              </div>
              <p className="text-dark-500 text-sm mt-2 font-medium">{metric.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Testimonial -- conditional */}
        {results.testimonial && (
          <motion.div
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={fadeUp}
            className="mb-10 max-w-2xl"
          >
            <blockquote className="border-l-4 border-orange-400 pl-6">
              <p className="text-lg text-dark-900 italic leading-relaxed">
                "{results.testimonial.quote}"
              </p>
              <footer className="mt-3">
                <cite className="font-semibold text-dark-900 not-italic">
                  {results.testimonial.author}
                </cite>
                <span className="text-dark-500 text-sm ml-2">
                  {results.testimonial.role}
                </span>
              </footer>
            </blockquote>
          </motion.div>
        )}

        {/* Business impact statement */}
        <motion.p
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={fadeUp}
          className="text-dark-900 text-base leading-relaxed max-w-2xl"
        >
          {results.businessImpact}
        </motion.p>
      </div>
    </section>
  )
}
```

**Note on the accent line color:** The Results section heading uses `bg-dark-900` for the accent line (not `bg-orange-400`) to create contrast against the yellow background. This is a deliberate differentiation from the white-background sections.

---

## 11. `components/sections/case-study/NextProject.tsx` -- CREATE

**Purpose:** A dark-background teaser at the bottom of a case study that previews the next project and links to it. The entire section is a single clickable area.

**Directive:** `'use client'` -- framer-motion hover animations.

**Props interface:**
```typescript
interface NextProjectProps {
  caseStudy: CaseStudy   // This is the NEXT case study, not the current one.
}
```

**Implementation:**
```typescript
'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import type { CaseStudy } from '@/lib/data/case-studies'

interface NextProjectProps {
  caseStudy: CaseStudy
}

export function NextProject({ caseStudy }: NextProjectProps) {
  return (
    <Link
      href={`/work/${caseStudy.slug}`}
      className="group block bg-dark-900"
    >
      <div className="container mx-auto px-6 lg:px-20 py-16 lg:py-20">
        <div className="flex flex-col lg:flex-row lg:items-center gap-8">
          {/* Text column */}
          <div className="flex-1">
            <p className="text-dark-500 text-sm uppercase tracking-widest mb-3">
              Up Next
            </p>
            <h2
              className="font-display font-bold text-3xl lg:text-4xl text-dark-50
                         group-hover:text-primary-yellow transition-colors duration-300"
            >
              {caseStudy.title}
            </h2>
            <div className="mt-3">
              <Badge variant="default" className="bg-dark-900/50 text-dark-50 border border-dark-border">
                {caseStudy.industry}
              </Badge>
            </div>
            <div className="mt-6 flex items-center gap-2 text-primary-yellow font-semibold">
              View Case Study
              <ArrowRight
                size={20}
                className="group-hover:translate-x-2 transition-transform duration-300"
              />
            </div>
          </div>

          {/* Thumbnail */}
          <div className="flex-1 relative aspect-video overflow-hidden rounded-lg bg-dark-surface">
            <motion.div
              className="h-full"
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            >
              <Image
                src={caseStudy.thumbnail}
                alt={`${caseStudy.title} preview`}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </Link>
  )
}
```

---

## 12. `components/sections/case-study/index.ts` -- CREATE

Barrel export file. Contents:
```typescript
export { CaseStudyHero } from './CaseStudyHero'
export { CaseStudyOverview } from './CaseStudyOverview'
export { CaseStudySection } from './CaseStudySection'
export { CaseStudyResults } from './CaseStudyResults'
export { NextProject } from './NextProject'
```

---

## 13. `app/work/page.tsx` -- MODIFY (full rewrite)

The current file is a 10-line placeholder. Replace it entirely.

**This page is `'use client'`** because it manages the active filter category in local state. It does NOT re-render on route change -- it is a single static page with client-side filtering.

**SEO metadata:** Because this is a client component, `export const metadata` is not supported directly in this file. To preserve SEO, create a layout file alongside it: `app/work/layout.tsx` (see the addendum at the end of this section).

```typescript
'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { caseStudies, getAllIndustries } from '@/lib/data/case-studies'
import { CategoryFilter } from '@/components/ui/CategoryFilter'
import { CaseStudyCard } from '@/components/ui/CaseStudyCard'
import { staggerContainer, fadeUp } from '@/lib/utils/animations'

export default function WorkPage() {
  const [activeCategory, setActiveCategory] = useState<string>('All')

  // Derive categories once: ['All', ...unique industries in data order]
  const categories = useMemo(() => ['All', ...getAllIndustries()], [])

  // Filter case studies client-side
  const filteredStudies = useMemo(
    () =>
      activeCategory === 'All'
        ? caseStudies
        : caseStudies.filter((study) => study.industry === activeCategory),
    [activeCategory]
  )

  return (
    <div className="min-h-screen">
      {/* Page Header */}
      <div className="bg-primary-yellow py-16 lg:py-20">
        <div className="container mx-auto px-6 lg:px-20">
          <h1 className="font-display text-4xl lg:text-5xl font-bold text-dark-900">
            Work
          </h1>
          <p className="mt-3 text-dark-900/70 text-lg max-w-xl">
            Case studies showcasing measurable impact through thoughtful design.
          </p>
        </div>
      </div>

      {/* Filter bar + Grid */}
      <div className="bg-white py-10 lg:py-14">
        <div className="container mx-auto px-6 lg:px-20">
          {/* Filter */}
          <CategoryFilter
            categories={categories}
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
          />

          {/* Case study grid */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredStudies.map((study, index) => (
                <motion.div
                  key={study.slug}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <CaseStudyCard caseStudy={study} priority={index < 4} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  )
}
```

**Addendum -- `app/work/layout.tsx`** (new file, not listed in the PRD but required for SEO):

Because the page component is `'use client'`, static `metadata` export is not allowed in it. Next.js allows metadata to be exported from a layout at the same route level. Create this file:

```typescript
// app/work/layout.tsx
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Work | Rodrigo Seoane - UX Portfolio',
  description:
    'Explore UX design case studies showcasing measurable results in SaaS onboarding, customer retention, and product design.',
  openGraph: {
    title: 'Work | Rodrigo Seoane',
    description: 'UX design case studies with measurable business impact.',
  },
}

export default function WorkLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
```

**Animation note on `AnimatePresence`:** The `mode="popLayout"` prop ensures that exiting cards animate out and the grid reflows simultaneously. If this causes layout shift on the current framer-motion version (v12.29.2), fall back to `mode="sync"` which waits for exit animations to complete before reflowing.

---

## 14. `app/work/[slug]/page.tsx` -- CREATE

**Purpose:** The individual case study page. Server component. Statically generated at build time via `generateStaticParams`. Dynamically imports `ImageLightbox` to keep the bundle small.

**This is a server component** -- no `'use client'` directive. Client components (ProgressBar, the section components, the lightbox) are imported as-is; Next.js handles the boundary automatically.

```typescript
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import dynamic from 'next/dynamic'
import { caseStudies, getCaseStudyBySlug, getNextCaseStudy } from '@/lib/data/case-studies'
import { ProgressBar } from '@/components/ui/ProgressBar'
import {
  CaseStudyHero,
  CaseStudyOverview,
  CaseStudySection,
  CaseStudyResults,
  NextProject,
} from '@/components/sections/case-study'
import { CaseStudySolutionContent } from '@/components/sections/case-study/CaseStudySolutionContent'
import { CaseStudyProblemContent } from '@/components/sections/case-study/CaseStudyProblemContent'

// --- Route generation & metadata ----------------------------------------

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

// --- Page ---------------------------------------------------------------

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

**Two additional sub-components are referenced above that need to be created:**

### `components/sections/case-study/CaseStudyProblemContent.tsx` -- CREATE

A simple server component that renders the problem narrative. No animations needed -- the parent `CaseStudySection` provides the heading; this component provides the body.

```typescript
import type { CaseStudy } from '@/lib/data/case-studies'

interface Props {
  caseStudy: CaseStudy
}

export function CaseStudyProblemContent({ caseStudy }: Props) {
  const { problem } = caseStudy

  return (
    <div className="space-y-6">
      <p className="text-dark-900 text-base leading-relaxed">
        {problem.background}
      </p>

      <div>
        <h3 className="font-display font-semibold text-lg text-dark-900 mb-3">
          Pain Points
        </h3>
        <ul className="space-y-2">
          {problem.painPoints.map((point, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="mt-1.5 w-2 h-2 rounded-full bg-orange-400 shrink-0" />
              <span className="text-dark-900 text-base leading-relaxed">{point}</span>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="font-display font-semibold text-lg text-dark-900 mb-2">
          Business Challenge
        </h3>
        <p className="text-dark-900 text-base leading-relaxed">
          {problem.businessChallenge}
        </p>
      </div>
    </div>
  )
}
```

### `components/sections/case-study/CaseStudySolutionContent.tsx` -- CREATE

This is a **client component** because it manages the lightbox open/close state and renders the dynamically imported `ImageLightbox`.

```typescript
'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import type { CaseStudy } from '@/lib/data/case-studies'

// Dynamic import -- ImageLightbox loads only when the user clicks an image.
const ImageLightbox = dynamic(() => import('@/components/ui/ImageLightbox'), {
  ssr: false, // Lightbox uses browser APIs (focus, body scroll lock); skip SSR.
})

interface Props {
  caseStudy: CaseStudy
}

export function CaseStudySolutionContent({ caseStudy }: Props) {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)
  const { solution } = caseStudy

  const openLightbox = (index: number) => {
    setLightboxIndex(index)
    setLightboxOpen(true)
  }

  return (
    <div className="space-y-6">
      <p className="text-dark-900 text-base leading-relaxed">
        {solution.approach}
      </p>

      <div>
        <h3 className="font-display font-semibold text-lg text-dark-900 mb-3">
          Key Decisions
        </h3>
        <ul className="space-y-2">
          {solution.keyDecisions.map((decision, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="mt-1.5 w-2 h-2 rounded-full bg-orange-400 shrink-0" />
              <span className="text-dark-900 text-base leading-relaxed">{decision}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Image gallery -- each image is a clickable lightbox trigger */}
      {solution.images.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
          {solution.images.map((image, i) => (
            <button
              key={i}
              onClick={() => openLightbox(i)}
              className="group relative overflow-hidden rounded-lg bg-dark-150 focus-visible:ring-2 focus-visible:ring-dark-900"
              aria-label={`Open image: ${image.alt}`}
            >
              <div className="aspect-video">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, 50vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              {/* Hover overlay hint */}
              <div className="absolute inset-0 bg-dark-900/0 group-hover:bg-dark-900/40 transition-all duration-300" />
              {image.caption && (
                <p className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-dark-900/70 to-transparent px-3 py-2 text-white text-xs">
                  {image.caption}
                </p>
              )}
            </button>
          ))}
        </div>
      )}

      {/* Lightbox modal */}
      <ImageLightbox
        images={solution.images}
        initialIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
      />
    </div>
  )
}
```

**Dynamic import note:** `ImageLightbox` uses a default export in its file. The `dynamic()` call uses an arrow function returning `import(...)`. The `ssr: false` flag is required because the lightbox manipulates `document.body` and `document.activeElement` -- both unavailable during server rendering.

---

## 15. `components/ui/index.ts` -- MODIFY

**Current content:**
```typescript
export { Button } from './Button'
export { Card } from './Card'
export { Badge } from './Badge'
export { Input } from './Input'
```

**Add these lines at the end:**
```typescript
export { AnimatedCounter } from './AnimatedCounter'
export { ProgressBar } from './ProgressBar'
export { CategoryFilter } from './CategoryFilter'
export { CaseStudyCard } from './CaseStudyCard'
export { ImageLightbox } from './ImageLightbox'
```

---

## Testing Checklist

Run through this checklist after implementation. Each item maps directly to a PRD acceptance criterion.

### Work Index Page (`/work`)

- [ ] Page renders all 5 case studies in a 2-column grid on desktop (640px+).
- [ ] Page renders all 5 case studies in a 1-column grid on mobile (<640px).
- [ ] The filter bar shows "All" plus each unique industry present in the data.
- [ ] Clicking "All" (default) shows all case studies.
- [ ] Clicking an industry filter (e.g. "SaaS") shows only matching case studies with no page reload.
- [ ] The animated background pill slides smoothly between filter buttons.
- [ ] Cards display: thumbnail, industry badge (top-left), primary metric badge (bottom-right), title, client, year, and service tags.
- [ ] Hovering a card lifts it (-8px y), increases shadow, zooms the thumbnail to 1.05x, and shows a dark overlay with an arrow icon.
- [ ] Clicking a card navigates to `/work/[slug]`.
- [ ] Filter animation: when switching categories, outgoing cards fade out and incoming cards stagger in.
- [ ] The page title in the browser tab reads "Work | Rodrigo Seoane - UX Portfolio".

### Case Study Page (`/work/[slug]`)

- [ ] All 5 slugs resolve to valid pages. An invalid slug renders the Next.js 404.
- [ ] The yellow progress bar appears at the very top of the viewport and fills as the user scrolls.
- [ ] The progress bar reaches full width at the bottom of the page.
- [ ] The hero section shows: industry badge, year, timeline, client name (or logo), project title, hero image, and metric badges.
- [ ] Hero entrance animations fire on load (title fades up, image scales in, metric badges stagger).
- [ ] The overview grid shows Role, Timeline, Tools, and a brief challenge statement.
- [ ] The overview grid is 4 columns on desktop, 2 on tablet, 1 on mobile.
- [ ] The "The Challenge" section displays: background paragraph, pain-points list with orange bullet dots, and business challenge paragraph.
- [ ] The "The Solution" section displays: approach paragraph, key-decisions list with orange bullet dots, and an image gallery grid.
- [ ] Each solution image is clickable and opens the lightbox centered on that image.
- [ ] The Results section shows animated counters that count up from 0 when scrolled into view.
- [ ] Counters display prefix and suffix correctly (e.g. "+47%").
- [ ] If a testimonial exists, it renders as a blockquote with an orange left border, quote text, author, and role.
- [ ] The business impact statement renders below the testimonial.
- [ ] The NextProject section renders at the bottom with the next case study's title, industry badge, thumbnail, and a "View Case Study" link.
- [ ] The last case study's NextProject wraps to the first case study (atlas-onboarding).
- [ ] The browser tab title reads "[Project Title] | Rodrigo Seoane".
- [ ] OpenGraph metadata includes the hero image.

### Lightbox

- [ ] Clicking a solution image opens the lightbox at that image's index.
- [ ] The lightbox renders the current image centered with `object-contain` (no cropping).
- [ ] A counter displays "X / Y" at the top.
- [ ] Left and right arrow buttons navigate between images.
- [ ] The ArrowLeft and ArrowRight keyboard keys navigate between images.
- [ ] Pressing Escape closes the lightbox.
- [ ] Clicking the dark backdrop (outside the image) closes the lightbox.
- [ ] Clicking on the image itself does NOT close the lightbox.
- [ ] Body scroll is locked while the lightbox is open and restored on close.
- [ ] Focus moves into the lightbox on open and returns to the trigger element on close.
- [ ] A caption renders below the image when one is defined in the data.
- [ ] The lightbox entrance and exit animations are smooth (fade + scale).
- [ ] Screen reader: `role="dialog"`, `aria-modal="true"`, `aria-label` on the dialog and all buttons, and an `aria-live` region announcing image changes.

### Data Integrity

- [ ] All 5 case studies have fully populated `problem`, `solution`, and `results` fields.
- [ ] All `metrics[].value` fields are numbers (not strings). The app does not throw a type error.
- [ ] All image `src` paths resolve to files that exist in `public/images/`.
- [ ] All images have non-empty `alt` text.
- [ ] `getNextCaseStudy` returns the next study in array order; the last wraps to the first.
- [ ] `getAllIndustries` returns deduplicated industries in first-appearance order.

### Accessibility & Performance

- [ ] All interactive elements (filter buttons, cards, lightbox controls, image triggers) are reachable via Tab.
- [ ] Focus indicators (ring) are visible on all focusable elements.
- [ ] Filter buttons are operable with Enter and Space.
- [ ] Card links are operable with Enter.
- [ ] The above-the-fold hero image and the first 4 card thumbnails use `priority={true}` on the `Image` component.
- [ ] Images below the fold do NOT have `priority` set.
- [ ] All `next/image` usages include a `sizes` attribute appropriate for the display width.
- [ ] The ImageLightbox module is dynamically imported and does not appear in the initial page bundle.

---

## File Summary -- All Paths

| Action | File Path |
|--------|-----------|
| MODIFY | `lib/data/case-studies.ts` |
| MODIFY | `components/ui/index.ts` |
| MODIFY | `app/work/page.tsx` |
| CREATE | `app/work/layout.tsx` |
| CREATE | `app/work/[slug]/page.tsx` |
| CREATE | `components/ui/AnimatedCounter.tsx` |
| CREATE | `components/ui/ProgressBar.tsx` |
| CREATE | `components/ui/CategoryFilter.tsx` |
| CREATE | `components/ui/CaseStudyCard.tsx` |
| CREATE | `components/ui/ImageLightbox.tsx` |
| CREATE | `components/sections/case-study/CaseStudyHero.tsx` |
| CREATE | `components/sections/case-study/CaseStudyOverview.tsx` |
| CREATE | `components/sections/case-study/CaseStudySection.tsx` |
| CREATE | `components/sections/case-study/CaseStudyResults.tsx` |
| CREATE | `components/sections/case-study/CaseStudySolutionContent.tsx` |
| CREATE | `components/sections/case-study/CaseStudyProblemContent.tsx` |
| CREATE | `components/sections/case-study/NextProject.tsx` |
| CREATE | `components/sections/case-study/index.ts` |

**Total: 3 modified, 15 created = 18 files.**
