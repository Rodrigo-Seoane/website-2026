# PRD: UX Pulse Check Page Content Optimization

## Overview

This PRD documents the implementation requirements for updating the UX Pulse Check service page with optimized content. The optimized content addresses spelling errors, duplicate content, improves semantic HTML structure, enhances conversion copy, and adds new sections (Problem Identification, Service Eligibility expanded, Final CTA) per the `UXPulseCheck-Optimized-Content.md` specification.

**Primary Objective:** Support 5 qualified contacts per week while positioning Rodrigo as a B2B SaaS UX specialist.

**Target Audience:** Product managers, CTOs, founders, and design leaders at growth-stage B2B SaaS companies experiencing user churn or conversion issues.

---

## Affected Codebase Files

### Page File

| File Path | Change Type | Description |
|-----------|-------------|-------------|
| `/Users/rodrigo.seoane/local-sites/portfolio-2026/app/ux-pulse-check/page.tsx` | MODIFY | Add new sections (ProblemSection, FinalCTA), update section order, update metadata |

### Data Files

| File Path | Change Type | Description |
|-----------|-------------|-------------|
| `/Users/rodrigo.seoane/local-sites/portfolio-2026/lib/data/ux-pulse-check.ts` | MODIFY | Update all content with optimized copy, add new data structures for Problem and Eligibility sections |

### Section Components

| File Path | Change Type | Description |
|-----------|-------------|-------------|
| `/Users/rodrigo.seoane/local-sites/portfolio-2026/components/sections/PulseCheckHero.tsx` | MODIFY | Update headline, subheadline, CTA text per optimized content |
| `/Users/rodrigo.seoane/local-sites/portfolio-2026/components/sections/PulseCheckBenefits.tsx` | MODIFY | Add section headline "What you'll achieve with a UX Pulse Check", update benefit #4 (was duplicate) |
| `/Users/rodrigo.seoane/local-sites/portfolio-2026/components/sections/ProcessSteps.tsx` | MODIFY | Update process introduction copy, refine step descriptions with euro impact mentions |
| `/Users/rodrigo.seoane/local-sites/portfolio-2026/components/sections/PricingCards.tsx` | MODIFY | Add subheadline, update "LIMITED TIME OFFER" to "Best Value" badge, update feature lists |
| `/Users/rodrigo.seoane/local-sites/portfolio-2026/components/sections/ServiceForMe.tsx` | MODIFY | Restructure to checkmark list format (6 items), add intro and closing copy |
| `/Users/rodrigo.seoane/local-sites/portfolio-2026/components/sections/FAQ.tsx` | MODIFY | Update FAQ content with 6 questions (currently 5), enhance answers with specifics |
| `/Users/rodrigo.seoane/local-sites/portfolio-2026/components/sections/ContactForm.tsx` | MODIFY | Add Company URL field, Service dropdown field, update labels and success message |

### New Components to Create

| File Path | Type | Lines Target | Description |
|-----------|------|--------------|-------------|
| `/Users/rodrigo.seoane/local-sites/portfolio-2026/components/sections/ProblemSection.tsx` | Section | ~80 lines | New "Understanding the hurdles" problem identification section |
| `/Users/rodrigo.seoane/local-sites/portfolio-2026/components/sections/FinalCTA.tsx` | Section | ~60 lines | Final conversion CTA section before contact form |

### Testimonials Data

| File Path | Change Type | Description |
|-----------|-------------|-------------|
| `/Users/rodrigo.seoane/local-sites/portfolio-2026/lib/data/testimonials.ts` | MODIFY | Add/update Stina Heikkila and Martin Kelman testimonials with correct quotes |

### UI Components (No Changes Required)

| File Path | Status | Notes |
|-----------|--------|-------|
| `/Users/rodrigo.seoane/local-sites/portfolio-2026/components/ui/Accordion.tsx` | NO CHANGE | Already supports rich text answers, works as-is |
| `/Users/rodrigo.seoane/local-sites/portfolio-2026/components/sections/Testimonials.tsx` | NO CHANGE | Carousel already functional, just needs updated data |

---

## Internal Implementation Patterns

### Pattern 1: Section Component Structure
**Source:** `/Users/rodrigo.seoane/local-sites/portfolio-2026/components/sections/PulseCheckHero.tsx`
**Relevance:** All section components follow this animation and structure pattern

```typescript
'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { fadeUp, staggerContainer } from '@/lib/utils/animations'

export function SectionName() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section className="py-16 lg:py-20 bg-{color}">
      <div className="container mx-auto px-6 lg:px-20">
        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {/* Content with fadeUp variants */}
        </motion.div>
      </div>
    </section>
  )
}
```

### Pattern 2: Data-Driven Content
**Source:** `/Users/rodrigo.seoane/local-sites/portfolio-2026/lib/data/ux-pulse-check.ts`
**Relevance:** All page content is externalized to data files for easy updates

```typescript
export interface ContentType {
  id: string
  // ... fields
}

export const contentData: ContentType[] = [
  // Data entries
]
```

### Pattern 3: Reusable Animation Variants
**Source:** `/Users/rodrigo.seoane/local-sites/portfolio-2026/lib/utils/animations.ts`
**Relevance:** Use existing animation variants, no new animations needed

```typescript
import type { Variants } from 'framer-motion'

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

### Pattern 4: Design Token Usage
**Source:** `/Users/rodrigo.seoane/local-sites/portfolio-2026/app/globals.css`
**Relevance:** All styling uses these CSS custom properties

```css
/* Primary: bg-primary-yellow (#ffd115) */
/* Dark sections: bg-dark-700 (#2e5e5e) */
/* Light sections: bg-cream-500 (#fff9f0) */
/* Text on yellow: text-dark-900 (#080d00) */
/* Text on dark: text-white or text-cream-500 */
/* Accent: text-orange-400 (#ef8c48) */
```

---

## Detailed Changes by File

### 1. `/Users/rodrigo.seoane/local-sites/portfolio-2026/lib/data/ux-pulse-check.ts`

**Current Lines:** 196
**Target Lines:** ~280 (adding new content structures)

#### Updates Required:

**heroContent** - Update copy:
```typescript
export const heroContent = {
  label: 'UX PULSE CHECK',
  headline: 'UX Pulse Check', // Changed from longer headline
  subheadline: 'Diagnose invisible UX wounds bleeding your revenue.',
  bodyCopy: 'My UX Pulse Check delivers surgical audits that pinpoint exactly where your app loses users and money—with € recovery estimates and ready-to-implement solutions in 3 days.',
  ctaText: 'Request Diagnosis', // Changed from "Get Your Pulse Check"
  ctaUrl: '#contact-form',
}
```

**NEW - problemContent:**
```typescript
export const problemContent = {
  headline: 'Understanding the hurdles from the inside out.',
  bodyCopy: `No matter which industry you belong to, time is often an asset in short supply and teams are repeatedly requested to ship products and features on tight deadlines.

This approach, while pragmatic in the short term, leads to the accumulation of UX debt—an array of overlooked user experience issues that become barriers for users, detracting from the usability of the product and potentially causing them to abandon not just the purchase but the brand itself.`,
}
```

**benefits** - Update Benefit #4 (was duplicate of #2):
```typescript
{
  id: 'benefit-4',
  title: 'Enhanced User Retention Strategy',
  description: 'Receive data-backed retention strategies that address why users leave, helping you build experiences that turn one-time users into loyal customers who stay and grow with your product.',
}
```

**processSteps** - Update with enhanced copy:
```typescript
export const processSteps: ProcessStep[] = [
  {
    id: 'step-1',
    number: 1,
    title: 'Order your Audit',
    description: 'Book an introductory call to explain your current struggles and share what\'s keeping users from succeeding with your product.',
  },
  {
    id: 'step-2',
    number: 2,
    title: 'Design Review',
    description: 'I will identify the pain points and quick wins to improve in your app to deliver a great experience to users, analyzing your key flows with expert heuristics.',
  },
  {
    id: 'step-3',
    number: 3,
    title: 'Receive Report',
    description: 'I send you a comprehensive report with actionable recommendations for your key issues, aligned with business goals and customer needs—complete with € impact estimates.',
  },
  {
    id: 'step-4',
    number: 4,
    title: 'Implement Right Away',
    description: 'Start implementing the design changes and recommendations into your key screens, supported by prioritized roadmaps and production-ready specifications.',
  },
]
```

**pricingPlans** - Update features and add subheadline:
```typescript
export const pricingSectionContent = {
  headline: 'Flexible pricing plans for your needs',
  subheadline: 'Transparent pricing designed for B2B SaaS teams who need results fast. Choose the option that matches your timeline and implementation readiness.',
}

export const pricingPlans: PricingPlan[] = [
  {
    id: 'plan-essentials',
    name: 'UX Audit Essentials',
    duration: '3-5 business days',
    price: 490,
    currency: '€',
    description: 'Startups and growth-stage businesses needing rapid identification of experience leaks and conversion barriers.',
    features: [
      'Heuristic analysis of 3 core user flows',
      'Conversion leak diagnosis with € impact estimates',
      'Quick-win prioritization matrix',
      'Competitor UX benchmarking',
    ],
    cta: 'Select UX Audit Essentials',
    ctaUrl: '#contact-form',
  },
  {
    id: 'plan-redesign',
    name: 'UX Audit + UI Redesign',
    duration: '7-10 business days',
    price: 1490,
    currency: '€',
    description: 'Product teams ready to implement solutions immediately. Fix critical UX issues with production-ready designs.',
    features: [
      'Everything in UX Audit Essentials',
      'UI redesign of 3-5 critical screens',
      'Mobile/desktop responsive variants',
      'Developer handoff package (Figma specs, assets)',
      '1-day retainer for implementation guidance',
    ],
    cta: 'Select UX Audit + UI Redesign',
    ctaUrl: '#contact-form',
    featured: true,
    badge: 'Best Value',
  },
]
```

**NEW - eligibilityContent** - Restructured from qualificationCards:
```typescript
export const eligibilityContent = {
  headline: 'Is this service for you?',
  intro: 'This service delivers the best results when there\'s mutual alignment. Here\'s who benefits most from a UX Pulse Check:',
  criteria: [
    'You\'re a SaaS, ecommerce, or web app that needs strategic direction.',
    'Your business is generating revenue and ready to invest in growth.',
    'You want to uncover key UX issues and act on them immediately.',
    'You\'re open to constructive criticism and willing to implement changes.',
    'You have high expectations for design quality and user experience.',
    'You\'re committed to doing what it takes to achieve measurable results.',
  ],
  closingCopy: 'If this sounds like you, let\'s talk about how a UX Pulse Check can accelerate your product\'s success.',
}
```

**faqItems** - Update to 6 questions with enhanced answers:
```typescript
export const faqItems: FAQItem[] = [
  {
    id: 'faq-1',
    question: 'What are the benefits of a UX Audit?',
    answer: 'A UX Audit can significantly enhance your product\'s market competitiveness. It can lead to better user engagement, higher conversion rates, and increased retention by removing friction points in the user experience. These improvements can directly boost revenue and contribute positively to your company\'s profitability.',
  },
  {
    id: 'faq-2',
    question: 'What does the UX Audit deliver?',
    answer: `My UX Audit delivers **actionable revenue recovery plans**, not just generic feedback. You receive:

1. **Video Diagnosis**: 5-minute Loom walkthrough highlighting your top 3 revenue leaks with € impact estimates
2. **Interactive Fix Map**: Clickable Miro board showing exactly where and how to implement changes
3. **Priority Roadmap**: Sorted by effort vs. impact—know what to fix first to recover 15-30% lost revenue
4. **Competitor Benchmarks**: See how your key flows compare to category leaders

*(For UX Audit + UI Redesign add: Production-ready Figma screens + 1-day retainer voucher)*`,
  },
  {
    id: 'faq-3',
    question: 'What is the timeline for a UX Audit?',
    answer: 'Our standard UX Audit process is completed within 3 to 10 business days depending on the selected package. For more extensive data collection and analysis, we offer tailored solutions to suit your timeline and specific needs.',
  },
  {
    id: 'faq-4',
    question: 'Is a UX Audit beneficial for startups?',
    answer: `A UX Audit acts as your **reality check against intuition**, surgically identifying where rushed design decisions create revenue leaks. By analyzing real user behavior, it replaces gut feelings with data-backed insights to:

1. **Fix conversion killers** you didn\'t spot during rapid builds
2. **Prioritize high-impact tweaks** that recover 15-30% of lost revenue
3. **Prevent costly redesigns** later by grounding future development in user needs

All delivered in days so you can keep shipping fast *without* sacrificing growth.`,
  },
  {
    id: 'faq-5',
    question: 'How frequently should a UX Audit be conducted?',
    answer: 'For startups and growth-stage companies, an annual UX Audit is typically sufficient to maintain momentum. However, enterprise companies or products undergoing significant changes may benefit from quarterly audits to maintain engagement, reduce churn, and focus on innovation rather than fixing usability issues.',
  },
  {
    id: 'faq-6',
    question: 'Can a UX Audit help our SEO and online presence?',
    answer: 'While the primary focus of a UX Audit is to enhance user experience, improvements in UX often correlate with better SEO performance. Search engines like Google factor in user engagement metrics such as bounce rate, time on page, and task completion. By making your site more user-friendly and reducing friction, you may also see improvements in search rankings and online visibility.',
  },
]
```

**NEW - finalCTAContent:**
```typescript
export const finalCTAContent = {
  headline: 'Ready to transform your User Experience?',
  subheadline: 'Let\'s talk about how we can realign your product with your users\' needs and start turning those challenges into measurable growth. No strings attached.',
  ctaText: 'Start Your UX Diagnosis',
  ctaUrl: '#contact-form',
}
```

**NEW - contactFormContent:**
```typescript
export const contactFormContent = {
  headline: 'Get started with your UX Pulse Check',
  intro: 'Share a few details about your project and I\'ll get back to you within 24 hours to discuss how we can improve your user experience.',
  serviceOptions: [
    'UX Audit Essentials (€490)',
    'UX Audit + UI Redesign (€1,490)',
    'Not sure yet - Let\'s discuss',
  ],
  successMessage: 'Thank you! Your request has been received. I\'ll review your details and get back to you within 24 hours to discuss your UX Pulse Check.',
  errorMessage: 'Oops! Something went wrong while submitting the form. Please check your connection and try again, or email me directly at hello@rodrigoseoane.com.',
}
```

---

### 2. `/Users/rodrigo.seoane/local-sites/portfolio-2026/components/sections/PulseCheckHero.tsx`

**Current Lines:** 73
**Target Lines:** ~80

#### Updates Required:

1. Update background padding for improved spacing
2. Import updated `heroContent` from data file
3. Add body copy paragraph between subheadline and CTA
4. Update CTA button text to "Request Diagnosis"

```typescript
// Line 28-30: Update headline structure
<motion.h1
  variants={fadeUp}
  className="font-display text-4xl lg:text-5xl font-bold text-dark-900 leading-tight"
>
  {heroContent.headline}
</motion.h1>

// Add subheadline (tagline style)
<motion.p
  variants={fadeUp}
  className="text-xl font-semibold text-dark-900"
>
  {heroContent.subheadline}
</motion.p>

// Add body copy
<motion.p
  variants={fadeUp}
  className="text-lg text-dark-900/80 max-w-xl"
>
  {heroContent.bodyCopy}
</motion.p>

// Update CTA
<motion.div variants={fadeUp}>
  <a
    href={heroContent.ctaUrl}
    className="inline-flex items-center gap-2 px-8 py-4 bg-dark-900 text-white font-semibold rounded-lg hover:bg-dark-900/90 transition-colors"
  >
    {heroContent.ctaText}
  </a>
</motion.div>
```

---

### 3. NEW: `/Users/rodrigo.seoane/local-sites/portfolio-2026/components/sections/ProblemSection.tsx`

**Lines Target:** ~80

```typescript
'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { problemContent } from '@/lib/data/ux-pulse-check'
import { fadeUp, staggerContainer } from '@/lib/utils/animations'

export function ProblemSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section className="py-16 lg:py-20 bg-cream-500">
      <div className="container mx-auto px-6 lg:px-20">
        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="max-w-3xl mx-auto text-center"
        >
          <motion.h2
            variants={fadeUp}
            className="font-display text-3xl lg:text-4xl font-bold text-dark-900 mb-6"
          >
            {problemContent.headline}
          </motion.h2>

          <motion.div
            variants={fadeUp}
            className="text-lg text-dark-900/80 leading-relaxed space-y-4"
          >
            {problemContent.bodyCopy.split('\n\n').map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
```

---

### 4. `/Users/rodrigo.seoane/local-sites/portfolio-2026/components/sections/PulseCheckBenefits.tsx`

**Current Lines:** 58
**Target Lines:** ~80

#### Updates Required:

1. Add section headline "What you'll achieve with a UX Pulse Check"
2. Benefit #4 content already updated via data file

```typescript
// Add before the grid, after container opening
<motion.h2
  initial={{ opacity: 0, y: 20 }}
  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
  transition={{ duration: 0.5 }}
  className="font-display text-3xl lg:text-4xl font-bold text-white mb-12 text-center lg:text-left"
>
  What you'll achieve with a UX Pulse Check
</motion.h2>
```

---

### 5. `/Users/rodrigo.seoane/local-sites/portfolio-2026/components/sections/ProcessSteps.tsx`

**Current Lines:** 62
**Target Lines:** ~80

#### Updates Required:

1. Add process introduction paragraph after headline

```typescript
// After the h2 headline, add:
<motion.p
  initial={{ opacity: 0, y: 20 }}
  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
  transition={{ duration: 0.5, delay: 0.1 }}
  className="text-lg text-dark-900/80 text-center max-w-2xl mx-auto mb-12"
>
  From discovery to implementation, my streamlined 4-step process ensures you get actionable insights fast—without disrupting your team's workflow.
</motion.p>
```

---

### 6. `/Users/rodrigo.seoane/local-sites/portfolio-2026/components/sections/PricingCards.tsx`

**Current Lines:** 110
**Target Lines:** ~130

#### Updates Required:

1. Remove "LIMITED TIME OFFER" label
2. Add subheadline below the section headline
3. Update badge text to "Best Value" (from "Recommended")
4. Update CTA button text per plan

```typescript
// Update header section:
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
  transition={{ duration: 0.5 }}
  className="text-center mb-12"
>
  <h2 className="font-display text-3xl lg:text-4xl font-bold text-dark-900 mb-4">
    {pricingSectionContent.headline}
  </h2>
  <p className="text-lg text-dark-900/80 max-w-2xl mx-auto">
    {pricingSectionContent.subheadline}
  </p>
</motion.div>

// In PricingCard component, update badge:
{plan.featured && plan.badge && (
  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-orange-400 text-white px-4 py-1 rounded-full text-sm font-medium">
    {plan.badge}
  </span>
)}
```

---

### 7. `/Users/rodrigo.seoane/local-sites/portfolio-2026/components/sections/ServiceForMe.tsx`

**Current Lines:** 75
**Target Lines:** ~100

#### Updates Required:

1. Restructure from 6 cards (3 duplicated) to checkmark list format
2. Add intro text and closing copy

```typescript
'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Check } from 'lucide-react'
import { eligibilityContent } from '@/lib/data/ux-pulse-check'
import { fadeUp, staggerContainer } from '@/lib/utils/animations'

export function ServiceForMe() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section className="py-16 lg:py-20 bg-cream-500">
      <div className="container mx-auto px-6 lg:px-20 max-w-3xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h2 className="font-display text-3xl lg:text-4xl font-bold text-dark-900 mb-4">
            {eligibilityContent.headline}
          </h2>
          <p className="text-lg text-dark-900/80">
            {eligibilityContent.intro}
          </p>
        </motion.div>

        {/* Criteria List */}
        <motion.ul
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="space-y-4 mb-8"
        >
          {eligibilityContent.criteria.map((criterion, index) => (
            <motion.li
              key={index}
              variants={fadeUp}
              className="flex items-start gap-3"
            >
              <Check size={24} className="text-orange-400 shrink-0 mt-0.5" />
              <span className="text-lg text-dark-900">{criterion}</span>
            </motion.li>
          ))}
        </motion.ul>

        {/* Closing Copy */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-lg text-dark-900/80 text-center"
        >
          {eligibilityContent.closingCopy}
        </motion.p>
      </div>
    </section>
  )
}
```

---

### 8. `/Users/rodrigo.seoane/local-sites/portfolio-2026/components/sections/FAQ.tsx`

**Current Lines:** 48
**Target Lines:** ~50 (minimal changes, content updated via data file)

#### Updates Required:

1. Update subheadline text (fix typo "anaything" -> "anything" - already correct in current code)
2. FAQ items updated via data file to include 6 questions

The Accordion component already supports markdown-style formatting in answers, so the numbered lists in FAQ answers will work correctly.

---

### 9. NEW: `/Users/rodrigo.seoane/local-sites/portfolio-2026/components/sections/FinalCTA.tsx`

**Lines Target:** ~60

```typescript
'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { finalCTAContent } from '@/lib/data/ux-pulse-check'
import { fadeUp, staggerContainer } from '@/lib/utils/animations'

export function FinalCTA() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section className="py-20 lg:py-24 bg-dark-700">
      <div className="container mx-auto px-6 lg:px-20">
        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="max-w-2xl mx-auto text-center"
        >
          <motion.h2
            variants={fadeUp}
            className="font-display text-3xl lg:text-4xl font-bold text-white mb-4"
          >
            {finalCTAContent.headline}
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="text-lg text-cream-500/80 mb-8"
          >
            {finalCTAContent.subheadline}
          </motion.p>

          <motion.div variants={fadeUp}>
            <a
              href={finalCTAContent.ctaUrl}
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary-yellow text-dark-900 font-semibold rounded-lg hover:bg-primary-yellow/90 transition-colors"
            >
              {finalCTAContent.ctaText}
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
```

---

### 10. `/Users/rodrigo.seoane/local-sites/portfolio-2026/components/sections/ContactForm.tsx`

**Current Lines:** 320
**Target Lines:** ~380

#### Updates Required:

1. Add Company URL field (optional)
2. Add Service dropdown field (required)
3. Update form headline and intro text
4. Update success/error messages

```typescript
// Update FormData interface:
interface FormData {
  name: string
  email: string
  companyUrl?: string  // NEW
  service: string      // NEW
  message: string
  consent: boolean
}

// Add new fields to form (after email field):
<FloatingInput
  label="Company Website"
  name="companyUrl"
  type="url"
  register={register}
  error={errors.companyUrl?.message}
/>

<div className="relative">
  <select
    {...register('service', {
      required: 'Please select a service',
    })}
    className={cn(
      'w-full px-4 py-3 pt-6',
      'bg-cream-500',
      'border-b border-dark-150',
      'outline-none transition-all duration-300',
      'focus:border-b-2 focus:border-dark-900',
      'appearance-none cursor-pointer'
    )}
  >
    <option value="">Select a service...</option>
    {contactFormContent.serviceOptions.map((option, index) => (
      <option key={index} value={option}>{option}</option>
    ))}
  </select>
  <label className="absolute left-4 top-1 text-xs tracking-[0.24px] text-dark-900">
    Which service are you interested in?
  </label>
</div>

// Update textarea label:
<FloatingTextarea
  label="Tell me about your UX challenges"
  register={register}
  error={errors.message?.message}
  required
/>
```

---

### 11. `/Users/rodrigo.seoane/local-sites/portfolio-2026/lib/data/testimonials.ts`

**Current Lines:** 57
**Target Lines:** ~70

#### Updates Required:

Update Stina Heikkila testimonial and add Martin Kelman:

```typescript
{
  id: 'testimonial-stina',
  quote: 'Rodrigo is a great designer to work with, with an excellent ability to translate very complex ideas and concepts into compelling visuals and user stories. He is always ready to collaborate until the last mile of the project, responding to new needs and changes, always keeping a good sense of humor and a smile in the process.',
  author: 'Stina Heikkila',
  role: 'Lead Researcher',
  company: 'Urbact',  // Updated from Boundaryless
  avatar: '/images/testimonials/stina-heikkila.jpg',
},
{
  id: 'testimonial-martin',
  quote: 'Rodrigo\'s user-centric approach was transformative. By rebalancing functionality for managers and operators through role-based dashboards and rapid prototyping, we didn\'t just simplify navigation—we operationalized scalability.',
  author: 'Martin Kelman',
  role: 'CDTO',
  company: 'ATS Global',
  avatar: '/images/testimonials/martin-kelman.jpg',
},
```

---

### 12. `/Users/rodrigo.seoane/local-sites/portfolio-2026/app/ux-pulse-check/page.tsx`

**Current Lines:** 31
**Target Lines:** ~45

#### Updates Required:

1. Import new section components
2. Update section order per optimized content
3. Add second Testimonials instance before final CTA

```typescript
import { Metadata } from 'next'
import { PulseCheckHero } from '@/components/sections/PulseCheckHero'
import { ProblemSection } from '@/components/sections/ProblemSection'  // NEW
import { PulseCheckBenefits } from '@/components/sections/PulseCheckBenefits'
import { ProcessSteps } from '@/components/sections/ProcessSteps'
import { Testimonials } from '@/components/sections/Testimonials'
import { PricingCards } from '@/components/sections/PricingCards'
import { ServiceForMe } from '@/components/sections/ServiceForMe'
import { FAQ } from '@/components/sections/FAQ'
import { FinalCTA } from '@/components/sections/FinalCTA'  // NEW
import { ContactForm } from '@/components/sections/ContactForm'

export const metadata: Metadata = {
  title: 'UX Pulse Check | Rodrigo Seoane',
  description:
    'Diagnose invisible UX wounds bleeding your revenue. Get surgical audits that pinpoint exactly where users drop off, why conversions stall, and what quick wins can boost your bottom line.',
  keywords: ['UX Audit', 'UX Pulse Check', 'User Experience Audit', 'SaaS UX Audit', 'Conversion Optimization'],
}

export default function UXPulseCheckPage() {
  return (
    <>
      <PulseCheckHero />
      <ProblemSection />           {/* NEW */}
      <PulseCheckBenefits />
      <ProcessSteps />
      <Testimonials />             {/* First testimonial (Stina) */}
      <PricingCards />
      <ServiceForMe />
      <FAQ />
      <Testimonials />             {/* Second testimonial (Martin) - needs filtering logic */}
      <FinalCTA />                 {/* NEW */}
      <ContactForm />
    </>
  )
}
```

**Note:** The Testimonials component currently shows all testimonials in a carousel. For page-specific testimonials, consider adding a `testimonialIds` prop to filter which testimonials to display, or create a simplified single testimonial component.

---

## Documentation Excerpts

### Next.js 14 Metadata API
**Source:** https://nextjs.org/docs/app/api-reference/functions/generate-metadata
**Key Points:**
- Use `Metadata` type for type-safe metadata
- Keywords can be added as an array
- OpenGraph and Twitter cards follow same patterns

### Framer Motion useInView
**Source:** https://motion.dev/docs/react-use-in-view
**Key Points:**
- `margin` prop specifies when the element is considered "in view"
- `once: true` ensures animation only plays once
- Returns boolean that can drive conditional animation states

### React Hook Form with TypeScript
**Source:** https://react-hook-form.com/ts
**Key Points:**
- Use `useForm<FormData>()` for type safety
- Register function provides all necessary input props
- Validation rules passed inline with register

---

## Recommendations

1. **Create reusable SingleTestimonial component**: Rather than using the full carousel twice, create a simpler component for displaying individual testimonials in strategic locations.

2. **Consider FAQ answer markdown rendering**: The FAQ answers contain markdown-style formatting (bold text, numbered lists). Consider using a simple markdown parser like `react-markdown` for proper rendering, or convert to React elements.

3. **Form tracking**: Add Google Analytics event tracking for form submissions and CTA clicks as specified in the optimized content implementation notes.

4. **Service pre-selection**: When clicking pricing CTAs, pass the selected service to the contact form URL hash (e.g., `#contact-form?service=essentials`) and pre-select the dropdown.

5. **Image assets needed**: The optimized content specifies hero images, benefit icons, and testimonial photos that need to be added to `/public/images/`.

---

## Open Questions

1. **Testimonial filtering**: Should the Testimonials component support filtering by ID to show specific testimonials in different page positions?

2. **Form submission backend**: The current form logs to console. Needs backend integration (Netlify Forms, Formspree, or custom API route).

3. **Testimonial photos**: Are actual photos available for Stina Heikkila and Martin Kelman, or should we use initials/placeholders?

4. **FAQ markdown**: Should FAQ answers support markdown formatting, or should we convert the numbered lists to plain text?

5. **Analytics events**: Should we implement the recommended conversion tracking events now, or defer to a future sprint?

---

## Implementation Order

1. **Data file updates** (`lib/data/ux-pulse-check.ts`, `lib/data/testimonials.ts`)
2. **New components** (`ProblemSection.tsx`, `FinalCTA.tsx`)
3. **Modified components** (in order of page flow):
   - `PulseCheckHero.tsx`
   - `PulseCheckBenefits.tsx`
   - `ProcessSteps.tsx`
   - `PricingCards.tsx`
   - `ServiceForMe.tsx`
   - `FAQ.tsx`
   - `ContactForm.tsx`
4. **Page composition** (`app/ux-pulse-check/page.tsx`)
5. **Testing and refinement**

---

## Verification Checklist

- [x] All listed files exist in the codebase
- [x] Code snippets follow existing project patterns
- [x] Changes align with Dev-Guidelines.md requirements
- [x] Content matches UXPulseCheck-Optimized-Content.md specification
- [x] Implementation preserves existing animation patterns
- [x] No over-engineering (KISS principle maintained)
- [x] Reuses existing components where possible (DRY principle)

---

**Document Version:** 1.0
**Created:** February 8, 2026
**Status:** Ready for Spec Writing
