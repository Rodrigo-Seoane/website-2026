# PRD: UX Pulse Check Page

**Project:** Rodrigo Seoane Portfolio
**Feature:** UX Pulse Check Landing Page
**Figma Source:** [node-id=224-15261](https://www.figma.com/design/ypOyCEYg7VagmpHNBZRRGL/Portfolio-Website-2025?node-id=224-15261&m=dev)
**Created:** February 1, 2026

---

## 1. Files Affected

### Files to Create

| File Path | Type | Description |
|-----------|------|-------------|
| `app/ux-pulse-check/page.tsx` | Page | Main UX Pulse Check landing page |
| `components/sections/PulseCheckHero.tsx` | Section | Hero section with CTA and main visual |
| `components/sections/PulseCheckBenefits.tsx` | Section | 2x2 grid of value propositions |
| `components/sections/ProcessSteps.tsx` | Section | 4-step process "How we help" |
| `components/sections/PricingCards.tsx` | Section | Two pricing tiers with features |
| `components/sections/ServiceForMe.tsx` | Section | 6 qualification cards grid |
| `components/sections/FAQ.tsx` | Section | Accordion FAQ component |
| `components/ui/Accordion.tsx` | UI | Reusable accordion component with Framer Motion |
| `lib/data/ux-pulse-check.ts` | Data | Static data for pricing, FAQ, benefits, etc. |

### Files to Modify

| File Path | Type | Change |
|-----------|------|--------|
| `components/sections/Services.tsx` | Section | Already has link to `/ux-pulse-check` (line 153-159) |
| `components/layout/Navigation.tsx` | Layout | May need sub-navigation for UX Pulse Check |

### No Files to Delete

---

## 2. Page Structure & Sections

Based on Figma design (top to bottom):

### Section 1: Navigation Header
- Reuse existing `Navigation.tsx` component
- Background: `#FFD115` (primary-yellow)

### Section 2: Hero Section (`PulseCheckHero.tsx`)
- **Background:** `#FFD115` (primary-yellow)
- **Content:**
  - Label: "UX PULSE CHECK"
  - Headline: "Diagnose invisible UX wounds bleeding your revenue"
  - Subheadline: "My UX Pulse Check delivers surgical audits that pinpoint exactly where your app loses users and money – with € recovery estimates and ready-to-implement solutions in 3 days."
  - CTA Button: "Get Your Pulse Check → €490"
  - Hero Image: Placeholder for audit visualization

### Section 3: Benefits Grid (`PulseCheckBenefits.tsx`)
- **Background:** `#2E5E5E` (dark-700)
- **Layout:** 2x2 grid with image
- **Benefits:**
  1. "Streamlined User Journey" - Understand pain points
  2. "Prioritized Actionable Insights" - Impact-based prioritization
  3. "Clarity on User Experience Flaws" - Pinpoint churn disconnects
  4. "Enhanced User Retention Strategy" - Root cause focus

### Section 4: Process Steps (`ProcessSteps.tsx`)
- **Background:** `#FFD115` (primary-yellow)
- **Headline:** "How we help your business succeed"
- **Steps (horizontal layout):**
  1. "Order your Audit" - Book introductory call
  2. "Design review" - Identify pain points and quick wins
  3. "Receive Report" - Actionable recommendations
  4. "Implement right away" - Start design changes

### Section 5: Testimonial 1
- Reuse existing `Testimonials.tsx` pattern (single testimonial)
- **Background:** `#FFF9F0` (cream-500)

### Section 6: Pricing Section (`PricingCards.tsx`)
- **Background:** `#FFD115` (primary-yellow)
- **Header:**
  - Caption: "LIMITED TIME OFFER"
  - Title: "Flexible pricing plans for your needs"
- **Two Pricing Cards:**

#### Card 1: UX Audit Essentials (€490)
- Delivery: 3-5 business days
- Features:
  - Heuristic and competitor analysis
  - Expert review of up to 5 key user flows
  - Prioritized UX improvement roadmap
  - 30-min walkthrough of findings
- CTA: "Request your estimate"

#### Card 2: UX Audit + UI Redesign (€1,490) - Featured
- Delivery: 7-10 business days
- Has "Recommended" badge
- Features:
  - Everything in UX Audit Essentials
  - Conversion-ready UI improvements
  - Full Figma file with UI components
  - Design system documentation
  - 60-min strategic implementation call
- CTA: "Unlock My UX Redesign"

### Section 7: Service Qualification (`ServiceForMe.tsx`)
- **Background:** `#2E5E5E` (dark-700)
- **Header:**
  - Title: "Is this service for me?"
  - Description: Service suitability criteria
- **6 Qualification Cards (2x3 grid):**
  1. "Your business is generating a solid revenue stream"
  2. "Your business is generating a solid revenue stream" (duplicate in design)
  3. "You want to uncover key UX issues and act on them now"
  4. "You want to uncover key UX issues and act on them now" (duplicate)
  5. "You have high expectations for design and quality"
  6. "You have high expectations for design and quality" (duplicate)

### Section 8: FAQ Section (`FAQ.tsx`)
- **Background:** `#FFD115` (primary-yellow)
- **Header:**
  - Caption: "Caption"
  - Title: "Ask anything about our service"
- **FAQ Items (Accordion):**
  1. "What does a UX Audit deliver?" (expanded example)
  2. "What is included with my subscription?"
  3. "How do I get paid?"
  4. "Is my personal information safe?"
  5. "How can we get in touch?"

### Section 9: Testimonial 2
- Same pattern as Testimonial 1
- **Background:** `#FFF9F0` (cream-500)

### Section 10: Contact Form
- Reuse existing `ContactForm.tsx` component
- **Background:** `#FFD115` (primary-yellow)

### Section 11: Footer
- Reuse existing `Footer.tsx` component

---

## 3. Relevant Documentation

### Framer Motion - Layout Animations
**Source:** [Motion Documentation](https://motion.dev/)
- Use `layout` prop for automatic layout animations
- `AnimatePresence` required for exit animations
- Motion library (formerly Framer Motion) supports TypeScript, gestures, springs, layout transitions

### Accordion Pattern with Framer Motion
**Source:** [DEV Community - Accordion Tutorial](https://dev.to/bhendi/how-to-build-an-accordion-with-headlessui-framer-motion-and-tailwindcss-62h)

```typescript
// Animation variants for accordion
const contentVariants = {
  hidden: { height: 0, opacity: 0 },
  visible: {
    height: "auto",
    opacity: 1,
    transition: { duration: 0.3 }
  }
}

const iconVariants = {
  open: { rotate: 180 },
  closed: { rotate: 0 }
}
```

### Pricing Cards Best Practices
**Source:** [LogRocket - Tailwind Pricing Component](https://blog.logrocket.com/build-pricing-component-tailwind-css-from-scratch/)

Key patterns:
- Use flexbox for card layout
- Split price display: `<span>€</span><span>490</span>`
- Featured card: negative margin for emphasis (`-mt-6`)
- Consistent padding with `pt-4 pb-4` for feature lists

### Next.js 15 + Tailwind CSS v4
**Source:** [Next.js & Tailwind 2025 Guide](https://codeparrot.ai/blogs/nextjs-and-tailwind-css-2025-guide-setup-tips-and-best-practices)

- Modular component approach
- Use `@layer` directive for custom styles
- Define semantic color names in tailwind config
- Handle conditional styling with template literals

---

## 4. Code Patterns from Codebase

### Animation Variants Pattern
**Source:** [animations.ts](lib/utils/animations.ts)

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

### Section Component Pattern
**Source:** [ValueProposition.tsx](components/sections/ValueProposition.tsx)

```typescript
'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'

// Animation variants defined locally
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
}

export function SectionName() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  return (
    <section className="py-16 lg:py-20 bg-dark-700">
      <div ref={sectionRef} className="container mx-auto px-6 lg:px-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {/* Content */}
        </motion.div>
      </div>
    </section>
  )
}
```

### Card Component Pattern
**Source:** [Services.tsx](components/sections/Services.tsx)

```typescript
function ServiceCard({ service, isPopular = false }: ServiceCardProps) {
  return (
    <motion.div variants={fadeUp} className="relative h-full">
      {/* Badge */}
      {isPopular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
          <span className="bg-orange-400 text-dark-50 text-sm font-medium px-4 py-1 rounded-full whitespace-nowrap">
            Most Popular
          </span>
        </div>
      )}

      <div className={`group h-full flex flex-col p-6 md:p-8 bg-cream-500 rounded-xl
        transition-all duration-300 hover:shadow-xl hover:-translate-y-1
        border-b-4 ${isPopular ? 'border-orange-400 ring-2 ring-orange-400' : 'border-dark-900'}`}
      >
        {/* Card content */}
      </div>
    </motion.div>
  )
}
```

### Data File Pattern
**Source:** [services.ts](lib/data/services.ts)

```typescript
export interface Service {
  id: string
  category: string
  title: string
  subtitle: string
  idealFor: string
  features: string[]
  cta: string
}

export const services: Service[] = [
  {
    id: 'service-1',
    // ... properties
  },
]
```

### Page Composition Pattern
**Source:** [page.tsx](app/page.tsx)

```typescript
import { Hero } from '@/components/sections/Hero'
import { ValueProposition } from '@/components/sections/ValueProposition'
// ... more imports

export default function HomePage() {
  return (
    <>
      <Hero />
      <ValueProposition />
      {/* ... more sections */}
    </>
  )
}
```

---

## 5. External Code Patterns

### Accordion Component with Framer Motion
**Source:** [Medium - FAQ Accordion](https://medium.com/@akbar123jason/creating-animated-faq-accordion-with-framer-motion-in-react-568bf100670e)

```typescript
'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Minus } from 'lucide-react'

interface FAQItem {
  question: string
  answer: string
}

interface AccordionItemProps {
  item: FAQItem
  isOpen: boolean
  onToggle: () => void
}

function AccordionItem({ item, isOpen, onToggle }: AccordionItemProps) {
  return (
    <div className="border-b-4 border-orange-400 bg-white">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-6"
      >
        <span className="font-display font-bold text-xl text-dark-900 text-left">
          {item.question}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 0 : 0 }}
          className="bg-dark-900 rounded p-1"
        >
          {isOpen ? (
            <Minus className="w-4 h-4 text-white" />
          ) : (
            <Plus className="w-4 h-4 text-white" />
          )}
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <p className="px-6 pb-6 text-dark-900">
              {item.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export function FAQ({ items }: { items: FAQItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <div className="space-y-4">
      {items.map((item, index) => (
        <AccordionItem
          key={index}
          item={item}
          isOpen={openIndex === index}
          onToggle={() => setOpenIndex(openIndex === index ? null : index)}
        />
      ))}
    </div>
  )
}
```

### Pricing Card Pattern
**Source:** [GeeksforGeeks - Tailwind Pricing Table](https://www.geeksforgeeks.org/nextjs/how-to-create-a-pricing-table-in-tailwind-css-and-next-js/)

```typescript
interface PricingPlan {
  name: string
  price: string
  duration: string
  features: string[]
  cta: string
  featured?: boolean
}

function PricingCard({ plan }: { plan: PricingPlan }) {
  return (
    <div className={`relative flex flex-col p-8 rounded-xl ${
      plan.featured
        ? 'bg-cream-500 border-2 border-orange-400 shadow-xl'
        : 'bg-cream-500'
    }`}>
      {plan.featured && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2
          bg-orange-400 text-white px-4 py-1 rounded-full text-sm">
          Recommended
        </span>
      )}

      {/* Plan Name */}
      <h3 className="font-display text-2xl font-bold text-dark-900">
        {plan.name}
      </h3>

      {/* Duration */}
      <p className="text-dark-500 text-sm mt-2">{plan.duration}</p>

      {/* Price */}
      <div className="mt-6 flex items-baseline gap-1">
        <span className="text-4xl font-bold text-dark-900">€</span>
        <span className="text-5xl font-bold text-dark-900">{plan.price}</span>
      </div>

      {/* Features */}
      <ul className="mt-8 space-y-4 flex-grow">
        {plan.features.map((feature, i) => (
          <li key={i} className="flex items-start gap-3">
            <Check className="w-5 h-5 text-orange-400 shrink-0 mt-0.5" />
            <span className="text-dark-900">{feature}</span>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <button className={`mt-8 w-full py-4 rounded font-semibold ${
        plan.featured
          ? 'bg-dark-900 text-white hover:bg-dark-900/90'
          : 'bg-white text-dark-900 border border-dark-900 hover:bg-dark-50'
      }`}>
        {plan.cta}
      </button>
    </div>
  )
}
```

### Process Steps Pattern
**Source:** Derived from existing patterns

```typescript
const steps = [
  { number: 1, title: 'Order your Audit', description: '...' },
  { number: 2, title: 'Design review', description: '...' },
  { number: 3, title: 'Receive Report', description: '...' },
  { number: 4, title: 'Implement right away', description: '...' },
]

function ProcessSteps() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
      {steps.map((step) => (
        <div key={step.number} className="text-center">
          {/* Numbered Circle */}
          <div className="w-16 h-16 mx-auto rounded-full border-2 border-dark-900
            flex items-center justify-center mb-4">
            <span className="font-display text-2xl font-bold">{step.number}</span>
          </div>
          <h4 className="font-display font-bold text-xl mb-2">{step.title}</h4>
          <p className="text-dark-900/80">{step.description}</p>
        </div>
      ))}
    </div>
  )
}
```

---

## 6. Design Tokens Reference

### Colors (from Figma)
```css
/* Primary */
--color-primary-yellow: #FFD115
--color-orange-400: #EF8C48

/* Dark Palette */
--color-dark-50: #F7F7F7
--color-dark-700: #2E5E5E
--color-dark-900: #080D00

/* Surfaces */
--color-cream-500: #FFF9F0

/* Text */
--color-content-primary: #080D00
--color-content-secondary: #F7F7F7
--color-primary-90: #001D6C /* Used for captions */
--color-coolgray-90: #21272A
```

### Typography (from Figma)
```css
/* Display Font */
font-family: "Plus Jakarta Sans"
/* Headings: Bold, 42px, line-height: 1.1 */
/* Subheadings: Bold, 24px, line-height: 1.1 */
/* Card titles: Bold, 20px, line-height: 1.1 */

/* Body Font */
font-family: "Inter"
/* Large body: Regular, 18px, line-height: 1.4 */
/* Regular body: Regular, 16px, line-height: 1.4 */
/* Captions: Bold, 20px, uppercase, letter-spacing: 1px */
```

### Spacing
```css
--spacing-xs: 4px
--spacing-small: 8px
--spacing-regular: 16px
--spacing-large: 24px
--section-padding: 80px
```

---

## 7. Implementation Notes

### Animation Considerations
1. Use `useInView` with `once: true` for scroll-triggered animations
2. Apply `staggerChildren` for card grids and lists
3. Use `AnimatePresence` for accordion expand/collapse
4. Keep animations GPU-friendly (opacity, transform only)

### Accessibility Requirements
1. Accordion: Use `button` elements with `aria-expanded`
2. FAQ: Semantic heading structure within accordion
3. Pricing cards: Ensure proper focus states
4. Color contrast: Verify text readability on all backgrounds

### Responsive Breakpoints
- Mobile: Stack all content vertically
- `md:` (768px): 2-column grids
- `lg:` (1024px): Full layouts, increased padding

### Component Size Guidelines (per Dev-Guidelines.md)
- Section components: 200-300 lines max
- UI components: 50-100 lines max
- Data files: No strict limit

---

## 8. Data Structure Proposal

### `lib/data/ux-pulse-check.ts`

```typescript
// Types
export interface PricingPlan {
  id: string
  name: string
  duration: string
  price: number
  currency: string
  description: string
  features: string[]
  cta: string
  ctaUrl: string
  featured?: boolean
}

export interface FAQItem {
  id: string
  question: string
  answer: string
}

export interface Benefit {
  id: string
  title: string
  description: string
}

export interface ProcessStep {
  id: string
  number: number
  title: string
  description: string
}

export interface QualificationCard {
  id: string
  icon: 'check' | 'files' | 'quality'
  text: string
}

// Data exports
export const pricingPlans: PricingPlan[]
export const faqItems: FAQItem[]
export const benefits: Benefit[]
export const processSteps: ProcessStep[]
export const qualificationCards: QualificationCard[]
```

---

## 9. Sources & References

### Documentation
- [Motion (Framer Motion) Official Docs](https://motion.dev/)
- [Next.js & Tailwind CSS 2025 Guide](https://codeparrot.ai/blogs/nextjs-and-tailwind-css-2025-guide-setup-tips-and-best-practices)
- [Tailwind CSS Official Documentation](https://tailwindcss.com/docs)

### Tutorials
- [Simple Accordion with Framer Motion - DEV Community](https://dev.to/astylidis/simple-and-nice-accordion-with-framer-motion-l2l)
- [Creating Animated FAQ Accordion - Medium](https://medium.com/@akbar123jason/creating-animated-faq-accordion-with-framer-motion-in-react-568bf100670e)
- [Build Pricing Component with Tailwind - LogRocket](https://blog.logrocket.com/build-pricing-component-tailwind-css-from-scratch/)
- [Accessible Accordion with HeadlessUI - DEV Community](https://dev.to/bhendi/how-to-build-an-accordion-with-headlessui-framer-motion-and-tailwindcss-62h)

### Component Libraries
- [Aceternity UI](https://ui.aceternity.com/) - Tailwind + Framer Motion components
- [GitHub Topics: framer-motion](https://github.com/topics/framer-motion)
- [GitHub Topics: accordion-component](https://github.com/topics/accordion-component)

---

**Status:** Ready for Implementation Review
**Next Steps:**
1. Review and approve PRD
2. Create data file first
3. Build section components from top to bottom
4. Compose page
5. Test animations and responsiveness
