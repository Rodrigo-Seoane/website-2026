# Technical Specification: UX Pulse Check Page Content Optimization

**Based on:** PRD-ux-pulse-check.md v1.0
**Optimized Content Source:** UXPulseCheck-Optimized-Content.md
**Created:** February 8, 2026
**Status:** Ready for Implementation

---

## Executive Summary

This specification provides tactical, file-level implementation guidance for updating the UX Pulse Check service page with optimized content. All changes maintain existing architectural patterns, reuse components where possible, and follow the development guidelines established in Dev-Guidelines.md.

**Scope:**
- **Files to Modify:** 10
- **Files to Create:** 2
- **Estimated Lines Changed:** ~800 lines
- **Implementation Time:** 4-6 hours

---

## Planning Reasoning

### Architectural Decisions

**1. Data-First Approach**
All content updates are externalized to `/lib/data/ux-pulse-check.ts` following the established pattern. This maintains separation of concerns and makes future content updates trivial.

**2. Component Reuse**
- Reuse existing `Accordion` component for FAQ (no changes needed)
- Reuse existing `Testimonials` carousel component (data updates only)
- Reuse existing animation variants from `/lib/utils/animations.ts`

**3. New Component Justification**
- `ProblemSection.tsx`: New content section not covered by existing components. Simple text-focused section (~80 lines).
- `FinalCTA.tsx`: Standalone CTA section before contact form. Reuses existing patterns (~60 lines).

**4. Contact Form Enhancement**
Adding two new fields (Company URL, Service dropdown) to existing form. Changes are minimal and maintain the floating label pattern already established.

**5. Section Restructure**
`ServiceForMe.tsx` is being completely rewritten from card-based layout to checkmark list format. This is a structural change but maintains the same animation patterns.

### File Selection Rationale

**Modified Files:**
1. `/lib/data/ux-pulse-check.ts` - All content updates centralized here
2. `/lib/data/testimonials.ts` - Update/add testimonials used on page
3. `/components/sections/PulseCheckHero.tsx` - Add body copy paragraph
4. `/components/sections/PulseCheckBenefits.tsx` - Add section headline
5. `/components/sections/ProcessSteps.tsx` - Add intro paragraph
6. `/components/sections/PricingCards.tsx` - Add subheadline, update badge
7. `/components/sections/ServiceForMe.tsx` - Complete restructure to list format
8. `/components/sections/FAQ.tsx` - No code changes (content via data file)
9. `/components/sections/ContactForm.tsx` - Add two new fields
10. `/app/ux-pulse-check/page.tsx` - Add new sections, update imports

**Created Files:**
1. `/components/sections/ProblemSection.tsx` - New problem identification section
2. `/components/sections/FinalCTA.tsx` - New conversion CTA section

---

## Implementation Order

**Phase 1: Data Layer (30 minutes)**
1. Update `/lib/data/ux-pulse-check.ts`
2. Update `/lib/data/testimonials.ts`

**Phase 2: New Components (45 minutes)**
3. Create `/components/sections/ProblemSection.tsx`
4. Create `/components/sections/FinalCTA.tsx`

**Phase 3: Component Updates (90 minutes)**
5. Update `/components/sections/PulseCheckHero.tsx`
6. Update `/components/sections/PulseCheckBenefits.tsx`
7. Update `/components/sections/ProcessSteps.tsx`
8. Update `/components/sections/PricingCards.tsx`
9. Rewrite `/components/sections/ServiceForMe.tsx`
10. Update `/components/sections/ContactForm.tsx`

**Phase 4: Page Composition (15 minutes)**
11. Update `/app/ux-pulse-check/page.tsx`

**Phase 5: Testing (30 minutes)**
12. Visual verification
13. Form functionality testing
14. Mobile responsiveness check
15. Dark mode check (if applicable)

---

## File Changes

### Files to Modify

#### 1. `/lib/data/ux-pulse-check.ts`

**Current Lines:** 196
**Target Lines:** ~380
**Changes:** Update all content, add new data structures

##### Change 1: Update heroContent

**Current (Lines 40-47):**
```typescript
export const heroContent = {
  label: 'UX PULSE CHECK',
  headline: 'Diagnose invisible UX wounds bleeding your revenue',
  subheadline:
    'My UX Pulse Check delivers surgical audits that pinpoint exactly where users drop off, why conversions stall, and what quick wins can boost your bottom line—all within days, not months.',
  ctaText: 'Get Your Pulse Check → €490',
  ctaUrl: '#pricing',
}
```

**New:**
```typescript
export const heroContent = {
  label: 'UX PULSE CHECK',
  headline: 'UX Pulse Check',
  subheadline: 'Diagnose invisible UX wounds bleeding your revenue.',
  bodyCopy: 'My UX Pulse Check delivers surgical audits that pinpoint exactly where your app loses users and money—with € recovery estimates and ready-to-implement solutions in 3 days.',
  ctaText: 'Request Diagnosis',
  ctaUrl: '#contact-form',
}
```

**Reasoning:** Simplified headline, split subheadline into tagline + body copy, updated CTA text for stronger conversion language.

---

##### Change 2: Add problemContent (NEW)

**Insert after heroContent (Line ~48):**
```typescript
export const problemContent = {
  headline: 'Understanding the hurdles from the inside out.',
  bodyCopy: `No matter which industry you belong to, time is often an asset in short supply and teams are repeatedly requested to ship products and features on tight deadlines.

This approach, while pragmatic in the short term, leads to the accumulation of UX debt—an array of overlooked user experience issues that become barriers for users, detracting from the usability of the product and potentially causing them to abandon not just the purchase but the brand itself.`,
}
```

**Reasoning:** New problem identification section content. Multi-paragraph body copy will be split in component using `.split('\n\n')`.

---

##### Change 3: Update benefits (Line 49-74)

**Keep benefits 1-3 unchanged. Replace benefit 4:**

```typescript
{
  id: 'benefit-4',
  title: 'Enhanced User Retention Strategy',
  description:
    'Receive data-backed retention strategies that address why users leave, helping you build experiences that turn one-time users into loyal customers who stay and grow with your product.',
},
```

**Reasoning:** Original benefit 4 was duplicate of benefit 2. New content focuses on retention outcomes.

---

##### Change 4: Update processSteps (Lines 76-105)

```typescript
export const processSteps: ProcessStep[] = [
  {
    id: 'step-1',
    number: 1,
    title: 'Order your Audit',
    description:
      'Book an introductory call to explain your current struggles and share what\'s keeping users from succeeding with your product.',
  },
  {
    id: 'step-2',
    number: 2,
    title: 'Design Review',
    description:
      'I will identify the pain points and quick wins to improve in your app to deliver a great experience to users, analyzing your key flows with expert heuristics.',
  },
  {
    id: 'step-3',
    number: 3,
    title: 'Receive Report',
    description:
      'I send you a comprehensive report with actionable recommendations for your key issues, aligned with business goals and customer needs—complete with € impact estimates.',
  },
  {
    id: 'step-4',
    number: 4,
    title: 'Implement Right Away',
    description:
      'Start implementing the design changes and recommendations into your key screens, supported by prioritized roadmaps and production-ready specifications.',
  },
]
```

**Reasoning:** Enhanced descriptions with € impact mentions, more specific language about deliverables.

---

##### Change 5: Add pricingSectionContent (NEW)

**Insert before pricingPlans (Line ~107):**
```typescript
export const pricingSectionContent = {
  headline: 'Flexible pricing plans for your needs',
  subheadline: 'Transparent pricing designed for B2B SaaS teams who need results fast. Choose the option that matches your timeline and implementation readiness.',
}
```

---

##### Change 6: Update pricingPlans (Lines 107-144)

```typescript
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

**Changes:**
- Updated durations (removed "delivery" suffix)
- Shortened descriptions (more punchy)
- Completely new feature lists (more specific deliverables)
- Updated CTA text
- Added `badge: 'Best Value'` property to featured plan

**Reasoning:** The `badge` property replaces hardcoded "LIMITED TIME OFFER" text. PricingCards component will display this.

---

##### Change 7: Replace qualificationCards with eligibilityContent (Lines 146-162)

**Remove `QualificationCard` interface and `qualificationCards` array.**

**Add new interface and content:**
```typescript
export interface EligibilityContent {
  headline: string
  intro: string
  criteria: string[]
  closingCopy: string
}

export const eligibilityContent: EligibilityContent = {
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

**Reasoning:** Changed from 3 card icons to 6 checkmark list items. ServiceForMe component will be completely rewritten to match this structure.

---

##### Change 8: Update faqItems (Lines 164-195)

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

1. **Fix conversion killers** you didn't spot during rapid builds
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

**Changes:**
- 6 questions (was 5)
- Completely rewritten answers with markdown formatting (bold, lists)
- More specific deliverables and metrics

**Note:** The existing Accordion component supports markdown-style formatting in answers (renders as plain text with whitespace preserved).

---

##### Change 9: Add finalCTAContent (NEW)

**Insert at end of file:**
```typescript
export const finalCTAContent = {
  headline: 'Ready to transform your User Experience?',
  subheadline: 'Let\'s talk about how we can realign your product with your users\' needs and start turning those challenges into measurable growth. No strings attached.',
  ctaText: 'Start Your UX Diagnosis',
  ctaUrl: '#contact-form',
}
```

---

##### Change 10: Add contactFormContent (NEW)

**Insert at end of file:**
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

**Reasoning:** Externalizes form-specific content for the UX Pulse Check page.

---

#### 2. `/lib/data/testimonials.ts`

**Current Lines:** 57
**Target Lines:** ~75

##### Change 1: Update Stina Heikkila testimonial

**Find and replace:**
```typescript
{
  id: 'testimonial-stina',
  quote: 'Rodrigo is a great designer to work with, with an excellent ability to translate very complex ideas and concepts into compelling visuals and user stories. He is always ready to collaborate until the last mile of the project, responding to new needs and changes, always keeping a good sense of humor and a smile in the process.',
  author: 'Stina Heikkila',
  role: 'Lead Researcher',
  company: 'Urbact',
  avatar: '/images/testimonials/stina-heikkila.jpg',
},
```

**Changes:**
- Fixed typo: "until the last mile of the birth" → "project"
- Updated company to "Urbact"

---

##### Change 2: Add Martin Kelman testimonial (NEW)

**Insert new testimonial:**
```typescript
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

#### 3. `/components/sections/PulseCheckHero.tsx`

**Current Lines:** 73
**Target Lines:** ~85

##### Change 1: Update headline structure (Lines 31-36)

**Replace:**
```typescript
<motion.h1
  variants={fadeUp}
  className="font-display text-4xl lg:text-5xl font-bold text-dark-900 leading-tight"
>
  {heroContent.headline}
</motion.h1>
```

**With (same code, just note the headline is now shorter):**
```typescript
<motion.h1
  variants={fadeUp}
  className="font-display text-4xl lg:text-5xl font-bold text-dark-900 leading-tight"
>
  {heroContent.headline}
</motion.h1>
```

---

##### Change 2: Split subheadline into tagline and body copy

**Replace lines 38-43 with:**
```typescript
<motion.p
  variants={fadeUp}
  className="text-xl font-semibold text-dark-900"
>
  {heroContent.subheadline}
</motion.p>

<motion.p
  variants={fadeUp}
  className="text-lg text-dark-900/80 max-w-xl"
>
  {heroContent.bodyCopy}
</motion.p>
```

**Reasoning:** Now we have 3 text elements: headline, subheadline (tagline style), and body copy. The subheadline gets larger, bolder styling.

---

##### Change 3: Update CTA text (already dynamic, no code change needed)

The CTA already uses `{heroContent.ctaText}`, so data change handles this.

---

#### 4. `/components/sections/PulseCheckBenefits.tsx`

**Current Lines:** 58
**Target Lines:** ~80

##### Change 1: Add section headline

**After the opening `<div className="container mx-auto px-6 lg:px-20">` (around line 20), insert:**

```typescript
<motion.h2
  initial={{ opacity: 0, y: 20 }}
  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
  transition={{ duration: 0.5 }}
  className="font-display text-3xl lg:text-4xl font-bold text-white mb-12 text-center"
>
  What you'll achieve with a UX Pulse Check
</motion.h2>
```

**Reasoning:** Adds semantic heading wrapper for the 4 benefit cards.

---

#### 5. `/components/sections/ProcessSteps.tsx`

**Current Lines:** 62
**Target Lines:** ~85

##### Change 1: Add section headline (if not present)

**Verify there's an h2 headline. If not, add:**
```typescript
<motion.h2
  initial={{ opacity: 0, y: 20 }}
  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
  transition={{ duration: 0.5 }}
  className="font-display text-3xl lg:text-4xl font-bold text-dark-900 mb-6 text-center"
>
  How we help your business succeed
</motion.h2>
```

---

##### Change 2: Add intro paragraph

**After headline, before the process steps grid:**
```typescript
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

#### 6. `/components/sections/PricingCards.tsx`

**Current Lines:** 110
**Target Lines:** ~140

##### Change 1: Add pricingSectionContent import

**Update import (line 6 area):**
```typescript
import { pricingPlans, pricingSectionContent } from '@/lib/data/ux-pulse-check'
```

---

##### Change 2: Update header section

**Replace the header div (around lines 15-22) with:**
```typescript
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
```

**Reasoning:** Adds subheadline explaining pricing transparency.

---

##### Change 3: Update badge rendering

**Find the featured badge rendering (around line 55-60 in card rendering) and update to:**
```typescript
{plan.featured && plan.badge && (
  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-orange-400 text-white px-4 py-1 rounded-full text-sm font-medium">
    {plan.badge}
  </span>
)}
```

**Reasoning:** Now renders dynamic `plan.badge` text instead of hardcoded "Recommended" or "LIMITED TIME OFFER".

---

#### 7. `/components/sections/ServiceForMe.tsx`

**Current Lines:** 75
**Target Lines:** ~105

**COMPLETE REWRITE - Replace entire file contents:**

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

**Reasoning:** Complete structural change from 3-column card grid to single-column checkmark list. Maintains same animation patterns (fadeUp, staggerContainer).

---

#### 8. `/components/sections/FAQ.tsx`

**No code changes required.**

The component already pulls from `faqItems` in the data file. Content updates in the data file will automatically reflect here. The Accordion component supports multi-paragraph text with markdown-style formatting.

---

#### 9. `/components/sections/ContactForm.tsx`

**Current Lines:** ~320
**Target Lines:** ~400

##### Change 1: Update FormData interface

**Find the interface (around line 15-20) and add new fields:**
```typescript
interface FormData {
  name: string
  email: string
  companyUrl?: string  // NEW - optional
  service: string      // NEW - required
  message: string
  consent: boolean
}
```

---

##### Change 2: Add Company URL field

**After the email field (around line 120), insert:**
```typescript
<FloatingInput
  label="Company Website"
  name="companyUrl"
  type="url"
  register={register}
  error={errors.companyUrl?.message}
/>
```

---

##### Change 3: Add Service dropdown field

**After Company URL field, insert:**
```typescript
<div className="relative">
  <select
    {...register('service', {
      required: 'Please select a service',
    })}
    className={cn(
      'w-full px-4 py-3 pt-6',
      'bg-white dark:bg-dark-surface',
      'border-2 border-neutral-200 dark:border-dark-border',
      'rounded-lg outline-none transition-all duration-300',
      'focus:border-primary-yellow',
      'appearance-none cursor-pointer',
      errors.service && 'border-red-500'
    )}
  >
    <option value="">Select a service...</option>
    <option value="UX Audit Essentials (€490)">UX Audit Essentials (€490)</option>
    <option value="UX Audit + UI Redesign (€1,490)">UX Audit + UI Redesign (€1,490)</option>
    <option value="Not sure yet - Let's discuss">Not sure yet - Let's discuss</option>
  </select>
  <label className="absolute left-4 top-2 text-xs text-neutral-500 dark:text-neutral-400">
    Which service are you interested in?
  </label>
  {errors.service && (
    <p className="mt-1 text-sm text-red-500">{errors.service.message}</p>
  )}
</div>
```

**Note:** If you want to use the data file's `contactFormContent.serviceOptions`, import it and map over the array:
```typescript
import { contactFormContent } from '@/lib/data/ux-pulse-check'

// In the select:
<option value="">Select a service...</option>
{contactFormContent.serviceOptions.map((option, index) => (
  <option key={index} value={option}>{option}</option>
))}
```

---

##### Change 4: Update Message field label

**Find the textarea field and update label to:**
```typescript
<FloatingTextarea
  label="Tell me about your UX challenges"
  name="message"
  register={register}
  error={errors.message?.message}
  required
/>
```

---

##### Change 5: Update success/error messages

**If using data file approach, import and use:**
```typescript
import { contactFormContent } from '@/lib/data/ux-pulse-check'

// In success state:
<p className="text-dark-900">{contactFormContent.successMessage}</p>

// In error state:
<p className="text-red-500">{contactFormContent.errorMessage}</p>
```

**Otherwise, hardcode the messages as specified in the data structure.**

---

#### 10. `/app/ux-pulse-check/page.tsx`

**Current Lines:** 31
**Target Lines:** ~45

**Replace entire file contents:**

```typescript
import { Metadata } from 'next'
import { PulseCheckHero } from '@/components/sections/PulseCheckHero'
import { ProblemSection } from '@/components/sections/ProblemSection'
import { PulseCheckBenefits } from '@/components/sections/PulseCheckBenefits'
import { ProcessSteps } from '@/components/sections/ProcessSteps'
import { Testimonials } from '@/components/sections/Testimonials'
import { PricingCards } from '@/components/sections/PricingCards'
import { ServiceForMe } from '@/components/sections/ServiceForMe'
import { FAQ } from '@/components/sections/FAQ'
import { FinalCTA } from '@/components/sections/FinalCTA'
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
      <ProblemSection />
      <PulseCheckBenefits />
      <ProcessSteps />
      <Testimonials />
      <PricingCards />
      <ServiceForMe />
      <FAQ />
      <Testimonials />
      <FinalCTA />
      <ContactForm />
    </>
  )
}
```

**Changes:**
1. Import `ProblemSection`
2. Import `FinalCTA`
3. Added `ProblemSection` after hero
4. Added second `Testimonials` instance before final CTA
5. Added `FinalCTA` before contact form
6. Added `keywords` to metadata

**Note on Testimonials:** The component currently shows all testimonials in carousel. This works fine. If you want specific testimonials per position, you'd need to add a `testimonialIds` prop to filter which ones display. For now, the carousel approach works.

---

### Files to Create

#### 11. `/components/sections/ProblemSection.tsx`

**Lines Target:** ~80

**Full file contents:**

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

**Key Features:**
- Simple text-focused section
- Splits multi-paragraph body copy on `\n\n`
- Uses existing `fadeUp` and `staggerContainer` variants
- Centered layout with max-width container
- Light background (`bg-cream-500`) to differentiate from hero

**Notes:**
- Verify `bg-cream-500` exists in tailwind.config. If not, use `bg-neutral-50` or `bg-neutral-100`.

---

#### 12. `/components/sections/FinalCTA.tsx`

**Lines Target:** ~60

**Full file contents:**

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

**Key Features:**
- Dark background section (`bg-dark-700`) for visual contrast
- Yellow CTA button on dark for high contrast
- Centered layout
- Simple 3-element structure: headline, subheadline, CTA button
- Smooth scroll anchor link to contact form

**Notes:**
- Verify `bg-dark-700` and `text-cream-500` exist in tailwind.config.
- If not, use `bg-neutral-800` and `text-neutral-100` instead.

---

## Before/After Code Snippets

### Hero Section - Before
```typescript
<motion.h1 className="...">
  Diagnose invisible UX wounds bleeding your revenue
</motion.h1>
<motion.p className="...">
  My UX Pulse Check delivers surgical audits...
</motion.p>
<a href="#pricing">Get Your Pulse Check → €490</a>
```

### Hero Section - After
```typescript
<motion.h1 className="...">
  UX Pulse Check
</motion.h1>
<motion.p className="text-xl font-semibold...">
  Diagnose invisible UX wounds bleeding your revenue.
</motion.p>
<motion.p className="text-lg...">
  My UX Pulse Check delivers surgical audits...
</motion.p>
<a href="#contact-form">Request Diagnosis</a>
```

---

### ServiceForMe - Before (Card Grid)
```typescript
<div className="grid grid-cols-3 gap-6">
  {qualificationCards.map(card => (
    <Card icon={card.icon}>
      {card.text}
    </Card>
  ))}
</div>
```

### ServiceForMe - After (Checkmark List)
```typescript
<ul className="space-y-4">
  {eligibilityContent.criteria.map(criterion => (
    <li className="flex items-start gap-3">
      <Check size={24} className="text-orange-400" />
      <span>{criterion}</span>
    </li>
  ))}
</ul>
```

---

## Testing & Verification Steps

### Phase 1: Visual Verification (15 minutes)

**Navigate to `/ux-pulse-check` and verify:**

1. **Hero Section**
   - [ ] Headline is "UX Pulse Check"
   - [ ] Subheadline is bold tagline style
   - [ ] Body copy paragraph displays
   - [ ] CTA says "Request Diagnosis"
   - [ ] CTA links to `#contact-form`

2. **Problem Section (NEW)**
   - [ ] Appears after hero
   - [ ] Headline displays correctly
   - [ ] Two paragraphs of body copy
   - [ ] Centered layout with max-width

3. **Benefits Section**
   - [ ] Section headline "What you'll achieve..." displays
   - [ ] 4 benefit cards display
   - [ ] Benefit 4 is about retention (not duplicate)

4. **Process Steps**
   - [ ] Intro paragraph displays below headline
   - [ ] 4 steps with updated descriptions
   - [ ] Mentions "€ impact estimates"

5. **Testimonials**
   - [ ] Stina Heikkila quote correct (no "birth" typo)
   - [ ] Martin Kelman testimonial appears

6. **Pricing Section**
   - [ ] Subheadline displays below headline
   - [ ] Featured plan has "Best Value" badge
   - [ ] Feature lists updated
   - [ ] CTA text updated

7. **Service Eligibility (ServiceForMe)**
   - [ ] Checkmark list format (not cards)
   - [ ] 6 criteria items
   - [ ] Intro and closing copy display

8. **FAQ Section**
   - [ ] 6 questions (was 5)
   - [ ] Answers show markdown formatting (bold, lists)
   - [ ] No spelling errors

9. **Final CTA (NEW)**
   - [ ] Dark background section
   - [ ] Yellow button
   - [ ] Text displays correctly
   - [ ] Links to `#contact-form`

10. **Contact Form**
    - [ ] Company URL field (optional)
    - [ ] Service dropdown (required)
    - [ ] 3 service options in dropdown
    - [ ] Message field label updated

---

### Phase 2: Functionality Testing (10 minutes)

1. **Navigation**
   - [ ] All anchor links work (#contact-form, etc.)
   - [ ] Smooth scroll behavior

2. **Form Validation**
   - [ ] Name required
   - [ ] Email required and validated
   - [ ] Company URL optional (can be blank)
   - [ ] Service dropdown required
   - [ ] Message required
   - [ ] Consent checkbox required

3. **Form Submission**
   - [ ] Success message displays on submit
   - [ ] Error handling works

4. **Pricing CTA Clicks**
   - [ ] Both pricing CTAs link to contact form
   - [ ] Smooth scroll to form

---

### Phase 3: Responsive Check (10 minutes)

**Test at breakpoints:**
- [ ] Mobile (375px)
- [ ] Tablet (768px)
- [ ] Desktop (1440px)

**Verify:**
- [ ] Hero stacks properly on mobile
- [ ] Checkmark list readable on mobile
- [ ] Form fields stack on mobile
- [ ] Service dropdown works on touch devices
- [ ] All text is readable (no overflow)

---

### Phase 4: Accessibility Check (5 minutes)

- [ ] Heading hierarchy correct (H1 → H2 → H3)
- [ ] Form labels associated with inputs
- [ ] Keyboard navigation works
- [ ] Focus states visible
- [ ] Color contrast passes (especially dark section)

---

## Dependencies & Considerations

### External Dependencies

**No new dependencies required.** All changes use existing:
- `framer-motion` (already installed)
- `lucide-react` (already installed, using `Check` icon)
- `react-hook-form` (already installed)

### Color Tokens to Verify

**Ensure these exist in `tailwind.config.ts`:**
- `bg-cream-500` (or use `bg-neutral-50`)
- `bg-dark-700` (or use `bg-neutral-800`)
- `text-cream-500` (or use `text-neutral-100`)
- `bg-primary-yellow`
- `text-orange-400`

### Potential Risks

1. **Background Color Mismatch**
   - Risk: `bg-cream-500` or `bg-dark-700` may not be defined
   - Mitigation: Use neutral variants if missing, or add to config

2. **Form Backend Integration**
   - Risk: Form doesn't have backend handler
   - Note: This is outside scope but needs attention post-implementation

3. **Testimonial Photos**
   - Risk: Avatar images may not exist (`/images/testimonials/martin-kelman.jpg`)
   - Mitigation: Component should handle missing images gracefully

4. **FAQ Markdown Rendering**
   - Risk: Accordion may not render bold/numbered lists properly
   - Note: Current implementation treats as plain text, which is acceptable

---

## Post-Implementation Checklist

After completing all changes:

- [ ] Run `npm run type-check` (verify TypeScript compiles)
- [ ] Run `npm run lint` (verify no lint errors)
- [ ] Test in browser (all verification steps above)
- [ ] Check git diff for unintended changes
- [ ] Verify no console errors
- [ ] Test form submission flow
- [ ] Check mobile responsiveness
- [ ] Verify dark mode (if applicable)

---

## Implementation Notes

### Line Count Targets
- Simple sections: 60-80 lines (ProblemSection, FinalCTA)
- Complex sections: 100-150 lines (ServiceForMe rewrite, ContactForm updates)
- Data file: ~380 lines (large but data-only, acceptable)

### Code Patterns to Maintain
1. All sections use `'use client'` directive
2. All sections use `useRef` + `useInView` for scroll animations
3. All sections use existing animation variants
4. All content from data files (no hardcoded strings)
5. Consistent spacing classes (`py-16 lg:py-20`)
6. Consistent container classes (`container mx-auto px-6 lg:px-20`)

### Future Enhancements (Out of Scope)
- Form backend integration (Netlify Forms, Formspree, etc.)
- Analytics event tracking (form submissions, CTA clicks)
- Service pre-selection via URL params
- FAQ markdown rendering with react-markdown
- Testimonial filtering by ID for page-specific display
- Image assets (testimonial photos, hero images, benefit icons)

---

## Document Control

**Version:** 1.0
**Created:** February 8, 2026
**Author:** Senior Product Manager (AI)
**Status:** Ready for Implementation
**Estimated Implementation Time:** 4-6 hours
**Complexity:** Medium

**Review Checklist:**
- [x] All file paths are absolute (as per guidelines)
- [x] All changes reference existing patterns
- [x] Component sizes within limits (< 150 lines)
- [x] Data-first approach maintained
- [x] No over-engineering
- [x] DRY principle followed (reusing components)
- [x] KISS principle followed (simple solutions)
- [x] Follows Dev-Guidelines.md patterns
- [x] Matches PRD requirements 100%
- [x] Implementable without ambiguity

**Frontend Craftsman Agent:** This specification is complete and ready for implementation. Begin with Phase 1 (data layer updates), then proceed sequentially through each phase. All code snippets are production-ready and follow established patterns.
