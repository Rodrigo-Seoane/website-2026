# PRD: Homepage Content Optimization

## Overview

This PRD documents all changes required to implement the optimized homepage content as specified in `Homepage-Optimized-Content.md`. The optimization addresses copy improvements, accessibility fixes (heading hierarchy, visually-hidden headings), and content updates across all homepage sections to better target B2B SaaS decision-makers.

**Strategic Alignment:**
- Primary Objective: Attract qualified B2B SaaS opportunities
- Target KPIs: 1 qualified job inquiry/week, 5 total contacts/week, 80%+ case study scroll depth
- Target Audience: Product Managers, VP/Head of Product, CTOs, Design Leaders at growth-stage B2B SaaS companies

---

## Affected Codebase Files

### Page Files

| File | Impact | Description |
|------|--------|-------------|
| `/Users/rodrigo.seoane/local-sites/portfolio-2026/app/page.tsx` | No change required | Homepage composition file - already correctly imports all sections |

### Section Components

| File | Impact | Description |
|------|--------|-------------|
| `/Users/rodrigo.seoane/local-sites/portfolio-2026/components/sections/Hero.tsx` | **Major** | H1 headline, subheadline copy changes |
| `/Users/rodrigo.seoane/local-sites/portfolio-2026/components/sections/ValueProposition.tsx` | **Major** | Section label addition, H2/H3 copy changes, body copy rewrite, problem card items update, alt text fix |
| `/Users/rodrigo.seoane/local-sites/portfolio-2026/components/sections/FeaturedWork.tsx` | **Minor** | Section subheadline copy update, alt text improvements |
| `/Users/rodrigo.seoane/local-sites/portfolio-2026/components/sections/Services.tsx` | **Major** | Subheadline fix (remove asterisks), H3 rewrite for UX Pulse Check, capability list update |
| `/Users/rodrigo.seoane/local-sites/portfolio-2026/components/sections/ClientLogos.tsx` | **Minor** | Add visually-hidden H2 heading for accessibility |
| `/Users/rodrigo.seoane/local-sites/portfolio-2026/components/sections/Testimonials.tsx` | **Minor** | Add visible H2 section heading |
| `/Users/rodrigo.seoane/local-sites/portfolio-2026/components/sections/ContactForm.tsx` | **Minor** | H2 and subheadline copy changes, alt text improvement |

### Data Files

| File | Impact | Description |
|------|--------|-------------|
| `/Users/rodrigo.seoane/local-sites/portfolio-2026/lib/data/services.ts` | **Minor** | Subtitle copy tweak for Embedded Designer |
| `/Users/rodrigo.seoane/local-sites/portfolio-2026/lib/data/testimonials.ts` | No change | Testimonials are retained verbatim |

### Utilities/Configuration

| File | Impact | Description |
|------|--------|-------------|
| `/Users/rodrigo.seoane/local-sites/portfolio-2026/app/globals.css` | **Minor** | Add `sr-only` utility class for visually-hidden content |

---

## Detailed Changes by Section

### Section 1: Hero (`Hero.tsx`)

**Current Code Location:** Lines 35-48

**Changes Required:**

1. **H1 Headline** (Line 39)
   - Current: `Product Design & Strategy for AI & SaaS Innovation`
   - New: `B2B SaaS Design That Drives Retention and Growth`

2. **Subheadline** (Lines 44-46)
   - Current: `Hello! I'm Rodrigo Seoane, and I help product companies to transform their user experiences to fuel business growth.`
   - New: `I'm Rodrigo Seoane. Over 25 years, I've helped product teams at AI and SaaS companies turn complex user experiences into measurable business outcomes.`

**No structural changes required** - the component already has correct CTA buttons and availability indicator.

---

### Section 2: Problem Statement (`ValueProposition.tsx` - Part A)

**Current Code Location:** Lines 152-190

**Changes Required:**

1. **Add Section Label** (above H2)
   - Add: `<p className="text-orange-400 font-bold text-sm uppercase tracking-widest mb-2">Common Pitfalls</p>`

2. **H2 Headline** (Lines 163-166)
   - Current: `Avoid the product trap mistakes`
   - New: `The product trap that costs teams time and budget`

3. **Subheadline** (Lines 169-176)
   - Current: `It's a common scenario when an user centric approach isn't consistently integrated into the product development process. This oversight often leads to a slew of issues that costs you time and budget.`
   - New: `When user-centric thinking isn't woven into every stage of development, the consequences compound fast. Here's what that looks like in practice.`

4. **Problem Card Items** (Lines 9-40 - data object)
   - Card 1 "User Experience Issues":
     - Keep items but update: `Growing customer support` -> `Escalating customer support volume`
   - Card 2 "Business Performance":
     - Update: `High user churn rates` -> `High churn rates`
     - Update: `Declining revenue growth` -> `Stalling revenue growth`
     - Update: `Losing to competitors` -> `Losing ground to competitors`
     - Update: `Low user conversions` -> `Low conversion rates`
   - Card 3 "Development Challenges":
     - Update: `Wasted dev resources` -> `Wasted engineering resources`
     - Update: `Redesign that backfire` -> `Redesigns that backfire` (plural fix)
     - Update: `Unused new features` -> `Features nobody uses`
     - Update: `Technical debt` -> `Mounting technical debt`

---

### Section 3: Why Me (`ValueProposition.tsx` - Part B)

**Current Code Location:** Lines 193-237

**Changes Required:**

1. **H2 Headline** (Lines 217-219)
   - Current: `Imagine using design to be your secret weapon?`
   - New: `Design as a competitive advantage, not an afterthought`

2. **Body Copy** (Lines 220-231)
   - Current two paragraphs need complete rewrite
   - New Paragraph 1: `For 25 years I've embedded myself in product teams facing the exact challenges listed above. The common thread is not a lack of design effort -- it's a lack of design strategy integrated with business and engineering realities.`
   - New Paragraph 2: `My capability is the combination of two things most designers have in isolation: a 10,000-foot view of how a product ecosystem fits together, and the hands-on skill to translate that vision into flows, components, and prototypes that ship.`

3. **Image Alt Text** (Lines 207-209)
   - Current: `Design work showcase`
   - New: `Atlas Onboarding redesign -- streamlined user flow design for a B2B SaaS platform`

---

### Section 4: Featured Work (`FeaturedWork.tsx`)

**Current Code Location:** Lines 230-276

**Changes Required:**

1. **Section Subheadline** (Lines 250-251)
   - Current: `Showcasing measurable impact through thoughtful design`
   - New: `Measurable impact through strategic design`

2. **Case Study Image Alt Texts** - update the `alt` attributes in `CaseSection` component:
   - AXA GO: `AXA GO Agent's Coach -- AI-powered training simulation interface`
   - Atlas: `Atlas Onboarding -- redesigned user onboarding flow for a B2B SaaS platform`
   - BennitAI: `BennitAI Marketplace -- AI-powered community engagement platform design`

**Note:** Currently the alt text uses `caseData.title` which is acceptable but the specified alt texts are more descriptive. This is a recommended improvement, not a critical fix.

---

### Section 5: Services (`Services.tsx`)

**Current Code Location:** Lines 80-166

**Changes Required:**

1. **Section Subheadline** (Lines 95-99)
   - Current: `I thrive on solving <strong>*urgent, complex problems*</strong> for teams building the future.`
   - New: `I focus on urgent, complex problems for teams building the future -- from untangling enterprise ecosystems to scaling AI tools for startups.`
   - Note: Remove the asterisks which render as literal text

2. **UX Pulse Check H3** (Lines 129-130)
   - Current: `Or diagnose critical issues fast with my surgical UX audit.`
   - New: `Need a fast diagnosis? The UX Pulse Check delivers answers in days.`

3. **UX Pulse Check Capability 3** (Line 146)
   - Current: `Give you € recovery estimates within days`
   - New: `Provide recovery estimates within days`

---

### Section 6: Client Logos (`ClientLogos.tsx`)

**Current Code Location:** Lines 47-69

**Changes Required:**

1. **Add Visually-Hidden H2** (after line 49, inside the section)
   - Add: `<h2 className="sr-only">Trusted by</h2>`
   - This fixes the heading hierarchy gap for accessibility

---

### Section 7: Testimonials (`Testimonials.tsx`)

**Current Code Location:** Lines 48-147

**Changes Required:**

1. **Add Section Heading** (after line 50, before the carousel)
   - Add visible H2: `<h2 className="font-display text-3xl md:text-4xl font-bold text-dark-900 text-center mb-8">What Our Clients Say</h2>`

---

### Section 8: Contact Form (`ContactForm.tsx`)

**Current Code Location:** Lines 160-319

**Changes Required:**

1. **H2 Headline** (Lines 172-173)
   - Current: `Ready to transform your User Experience?`
   - New: `Ready to work together?`

2. **Subheadline** (Lines 175-176)
   - Current: `Let's talk about how we can realign your product with your users' needs and start turning those challenges into triumphs. No strings attached.`
   - New: `Let's talk about your product challenges. No commitment, no pressure -- just a conversation about what's possible.`

3. **Skyline Image Alt Text** (Lines 310-311)
   - Current: `Rio de Janeiro and Barcelona skyline`
   - New: `Skyline illustration of Rio de Janeiro and Barcelona`

---

### Data File: Services (`services.ts`)

**Current Code Location:** Lines 11-54

**Changes Required:**

1. **Embedded Designer Subtitle** (Line 17)
   - Current: `When you need strategic guidance with tactical execution.`
   - New: `When you need strategic guidance with hands-on execution.`

---

### Global Styles (`globals.css`)

**Changes Required:**

1. **Add sr-only utility class** (in the @layer utilities section)

```css
@layer utilities {
  .text-balance {
    text-wrap: balance;
  }

  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border-width: 0;
  }
}
```

---

## Internal Implementation Patterns

### Pattern 1: Section Header with Label

**Source:** `/Users/rodrigo.seoane/local-sites/portfolio-2026/components/sections/FeaturedWork.tsx` (Lines 243-253)

**Relevance:** Use this pattern for the Problem Statement section label.

```tsx
<div>
  <p className="text-orange-400 font-bold text-sm uppercase tracking-widest mb-2">
    Featured Work
  </p>
  <h2 className="font-display text-3xl md:text-4xl font-bold text-dark-900">
    Case Studies
  </h2>
  <p className="text-dark-900/70 mt-2 max-w-lg">
    Measurable impact through strategic design
  </p>
</div>
```

### Pattern 2: Animation Variants

**Source:** `/Users/rodrigo.seoane/local-sites/portfolio-2026/lib/utils/animations.ts`

**Relevance:** Continue using shared animation variants for consistency.

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

### Pattern 3: Heading Styling Consistency

**Source:** Multiple section components

**Relevance:** Maintain consistent heading styles across sections.

```tsx
// H2 Section Headers (dark background)
className="font-display text-3xl md:text-4xl font-bold text-dark-50"

// H2 Section Headers (light background)
className="font-display text-3xl md:text-4xl font-bold text-dark-900"

// H3 Card Titles
className="font-display text-2xl md:text-3xl font-bold text-dark-900"
```

---

## Documentation Excerpts

### Next.js Image Component - Alt Text Best Practices

**Source:** Next.js Documentation

**Key Points:**
- Alt text should describe the image content or function
- Decorative images can use `alt=""`
- Alt text is important for accessibility and SEO
- Keep alt text concise but descriptive

### WCAG Heading Hierarchy

**Source:** W3C WCAG 2.1 Guidelines

**Key Points:**
- Headings must not skip levels (H1 -> H2 -> H3, never H1 -> H3)
- Each page should have one H1
- Headings should describe the content that follows
- Screen readers use heading hierarchy for navigation
- Visually-hidden headings are valid for maintaining semantic structure

```css
/* Standard sr-only pattern for screen readers */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}
```

---

## Heading Hierarchy - Final Document Outline

The corrected heading structure for the homepage:

```
H1: B2B SaaS Design That Drives Retention and Growth
|
+-- H2: The product trap that costs teams time and budget
|   +-- H3: User Experience Issues
|   +-- H3: Business Performance
|   +-- H3: Development Challenges
|
+-- H2: Design as a competitive advantage, not an afterthought
|
+-- H2: Case Studies
|
+-- H2: AI-Driven Training to Improve Onboarding and Retention (AXA)
|
+-- H2: Transforming User Adoption through Streamlined Onboarding (Atlas)
|
+-- H2: AI-Powered Platform Design for Community Engagement (BennitAI)
|
+-- H2: How to work with me
|   +-- H3: Embedded Designer
|   +-- H3: Advisory Retainer
|   +-- H3: Workshop Facilitation
|   +-- H3: Need a fast diagnosis? The UX Pulse Check delivers answers in days.
|
+-- H2: Trusted by (visually hidden)
|
+-- H2: What Our Clients Say
|
+-- H2: Ready to work together?
```

---

## Implementation Priority

### Phase 1: Copy Updates (High Priority)
1. Hero.tsx - H1 and subheadline
2. ValueProposition.tsx - All copy changes
3. Services.tsx - Subheadline fix and UX Pulse Check updates
4. ContactForm.tsx - Headline and subheadline

### Phase 2: Accessibility Fixes (High Priority)
1. globals.css - Add sr-only utility class
2. ClientLogos.tsx - Add visually-hidden H2
3. Testimonials.tsx - Add visible H2 section heading

### Phase 3: Data File Updates (Medium Priority)
1. services.ts - Subtitle tweak

### Phase 4: Alt Text Improvements (Medium Priority)
1. ValueProposition.tsx - Why Me image alt
2. FeaturedWork.tsx - Case study image alts (optional enhancement)
3. ContactForm.tsx - Skyline image alt

---

## Recommendations

1. **Implement all copy changes in a single pass** - The changes are interdependent and should maintain narrative flow.

2. **Test heading hierarchy** - Use browser dev tools or accessibility tools to verify the heading outline after implementation.

3. **Verify responsive behavior** - All text changes should work within existing responsive containers.

4. **No structural changes needed** - The existing component architecture supports all required changes.

5. **Consider SEO impact** - The new H1 and copy include target keywords (B2B SaaS, retention, onboarding).

---

## Open Questions

1. **Case study alt texts** - Should we update the FeaturedWork component to use explicit alt texts instead of `caseData.title`? The spec recommends it but it requires adding an `altText` field to the case data or hardcoding in the component.

2. **Hero visual upgrade** - The optimized content mentions upgrading the abstract shapes to a product mockup. Is this asset available, or should it remain as a future enhancement?

---

## Self-Verification Checklist

- [x] All listed files exist in the codebase
- [x] Code snippets reference actual lines and structures
- [x] Changes align with Homepage-Optimized-Content.md specifications
- [x] Changes follow Dev-Guidelines.md requirements
- [x] Changes fit within Phase 3 of IMPLEMENTATION_PLAN.md
- [x] Heading hierarchy is documented and corrected
- [x] Implementation priority is clearly defined
- [x] No irrelevant files or tangential changes included

---

**Document Created:** February 4, 2026
**Status:** Ready for Spec Writer Review
