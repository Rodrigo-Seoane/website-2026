# Technical Specification: Homepage Content Optimization

**Source PRD:** `PRD-homepage-optimization.md`
**Content Reference:** `Homepage-Optimized-Content.md`
**Guidelines Reference:** `Dev-Guidelines.md`
**Date:** February 4, 2026
**Status:** Ready for Implementation

---

## Summary

This spec covers all content, copy, accessibility, and alt-text changes required across 8 files to implement the homepage optimization defined in the PRD. No structural changes to component architecture are needed. No new files are created. The changes fall into four categories: (1) copy rewrites targeting B2B SaaS decision-makers, (2) heading-hierarchy fixes that close accessibility gaps, (3) alt-text improvements for SEO and screen readers, and (4) one data-file subtitle tweak. The `app/page.tsx` composition file and `lib/data/testimonials.ts` require zero changes -- they are confirmed correct as-is.

---

## Planning Reasoning

### Why no change to globals.css

The PRD instructs adding a manual `.sr-only` utility class to the `@layer utilities` block in `globals.css`. This project uses **Tailwind CSS v4** (`@import "tailwindcss"` syntax, `@tailwindcss/postcss` v4 in devDependencies). In Tailwind v4, `sr-only` is a built-in utility class -- it is generated automatically when referenced in markup. Adding a duplicate manual definition would be dead code and violates the project's "Tailwind first, CSS last" rule (Dev-Guidelines Rule 9). The spec uses `sr-only` directly in `ClientLogos.tsx` without any CSS addition.

### Why the FeaturedWork alt-text approach uses an `altText` field on the data object

The PRD notes that `FeaturedWork.tsx` currently passes `caseData.title` as the `alt` attribute on case-study images and flags the more-descriptive alt texts as a "recommended improvement." The current `featuredCases` data array is defined inline in the component file (not in a shared data module). The simplest, least-invasive change is to add an `altText` string field to each object in that inline array and reference it in the `<Image>` tag. This avoids modifying the shared `case-studies.ts` data structure for a homepage-only concern, keeps the change co-located with the component, and follows the project's YAGNI principle.

### Why ValueProposition.tsx changes are grouped as one block

Parts A (Problem Statement) and Parts B (Why Me) live in a single component file and share animation variants. The PRD lists them as separate logical sections, but from an implementation standpoint they are one file with one editing session. The spec treats them together.

### Implementation order rationale

1. `globals.css` is listed first in the PRD but is a no-op in this project (see above). It is removed from the change list entirely.
2. `lib/data/services.ts` is edited first because `Services.tsx` imports from it; having the data in place before the component edit prevents any momentary inconsistency during development.
3. Copy-heavy section components are edited in page-render order (top to bottom): Hero, ValueProposition, FeaturedWork, Services, ClientLogos, Testimonials, ContactForm.
4. All changes within a single file are applied in source-line order so the developer can work top-to-bottom without jumping around.

---

## Files to Modify

### 1. `lib/data/services.ts`

**Edit location:** Line 16, the `subtitle` field of the first service object (`embedded-designer`).

**Change:**
```diff
- subtitle: 'When you need strategic guidance with tactical execution.',
+ subtitle: 'When you need strategic guidance with hands-on execution.',
```

**Rationale:** "Hands-on" aligns with the body-copy rewrite in the Why Me section ("hands-on skill to translate that vision") and removes the ambiguity of "tactical."

---

### 2. `components/sections/Hero.tsx`

Two string replacements. No structural, import, or className changes.

#### 2a. H1 headline -- Line 39

```diff
- Product Design & Strategy for AI & SaaS Innovation
+ B2B SaaS Design That Drives Retention and Growth
```

#### 2b. Subheadline paragraph -- Line 47

The current line uses an `&apos;` entity for the apostrophe in "I'm". The replacement text also contains an apostrophe ("I'm") and a second one ("I've"), both of which must use the same `&apos;` entity to keep JSX valid.

```diff
- Hello! I&apos;m Rodrigo Seoane, and I help product companies to transform their user experiences to fuel business growth.
+ I&apos;m Rodrigo Seoane. Over 25 years, I&apos;ve helped product teams at AI and SaaS companies turn complex user experiences into measurable business outcomes.
```

---

### 3. `components/sections/ValueProposition.tsx`

Seven discrete changes across the inline `problemCards` data array and the two JSX sections.

#### 3a. Problem Card 1, item 3 -- Line 16 (inside `problemCards` array)

```diff
- 'Growing customer support',
+ 'Escalating customer support volume',
```

#### 3b. Problem Card 2, all four items -- Lines 23-26

```diff
- 'High user churn rates',
- 'Declining revenue growth',
- 'Losing to competitors',
- 'Low user conversions',
+ 'High churn rates',
+ 'Stalling revenue growth',
+ 'Losing ground to competitors',
+ 'Low conversion rates',
```

#### 3c. Problem Card 3, all four items -- Lines 33-36

```diff
- 'Wasted dev resources',
- 'Redesign that backfire',
- 'Unused new features',
- 'Technical debt',
+ 'Wasted engineering resources',
+ 'Redesigns that backfire',
+ 'Features nobody uses',
+ 'Mounting technical debt',
```

#### 3d. Add "Common Pitfalls" section label above the H2 -- Insert before Line 163

The existing header block (lines 162-177) is:
```tsx
<div className="max-w-[960px] mx-auto text-center">
  <motion.h2
    variants={fadeUpVariants}
    className="font-display font-bold text-3xl lg:text-4xl text-dark-50 leading-tight mb-4"
  >
    Avoid the product trap mistakes
  </motion.h2>
  ...
</div>
```

Add a `<motion.p>` label element directly inside the `<div>`, before the `<motion.h2>`. Use the exact same label pattern already established in `FeaturedWork.tsx` lines 244-246, adapted for the dark background (the orange-400 color reads well on both light and dark backgrounds as confirmed by its use in the Services section's dark background).

After edit, the header block becomes:
```tsx
<div className="max-w-[960px] mx-auto text-center">
  <motion.p
    variants={fadeUpVariants}
    className="text-orange-400 font-bold text-sm uppercase tracking-widest mb-2"
  >
    Common Pitfalls
  </motion.p>
  <motion.h2
    variants={fadeUpVariants}
    className="font-display font-bold text-3xl lg:text-4xl text-dark-50 leading-tight mb-4"
  >
    The product trap that costs teams time and budget
  </motion.h2>
  <motion.p
    variants={fadeUpVariants}
    className="text-lg text-dark-50 leading-relaxed"
  >
    When user-centric thinking isn&apos;t woven into every stage of development, the consequences compound fast. Here&apos;s what that looks like in practice.
  </motion.p>
</div>
```

Note the three entity replacements in the subheadline: `isn't` becomes `isn&apos;t`, and `Here's` becomes `Here&apos;s`.

#### 3e. H2 headline in Problem Statement -- Line 167 (within the `<motion.h2>`)

Covered by 3d above -- the new text is `The product trap that costs teams time and budget`.

#### 3f. Subheadline paragraph in Problem Statement -- Lines 173-175

Covered by 3d above -- the new text replaces the existing `<motion.p>` content with the two-sentence version shown in 3d.

#### 3g. "Why Me" image alt text -- Line 206

```diff
- alt="Design work showcase"
+ alt="Atlas Onboarding redesign -- streamlined user flow design for a B2B SaaS platform"
```

#### 3h. "Why Me" H2 headline -- Line 218

```diff
- Imagine using design to be your secret weapon?
+ Design as a competitive advantage, not an afterthought
```

#### 3i. "Why Me" body copy -- Lines 221-231

Replace the entire two-paragraph `<div>` block. The current block is:
```tsx
<div className="flex flex-col gap-4 text-lg text-dark-50 leading-relaxed">
  <p>
    With 25 years of experience, I&apos;ve built my career working with teams
    like yours to tackle these problems and bottlenecks caused by
    overlooking the user needs for faster production cycles.
  </p>
  <p>
    My super power is the capacity to combine a 10.000ft overview, to
    understand the ecosystem and its interconnections to create the
    product vision, with the hard skills to translate goals into the
    flows and interface modular components.
  </p>
</div>
```

Replace with:
```tsx
<div className="flex flex-col gap-4 text-lg text-dark-50 leading-relaxed">
  <p>
    For 25 years I&apos;ve embedded myself in product teams facing the exact
    challenges listed above. The common thread is not a lack of design
    effort -- it&apos;s a lack of design strategy integrated with business
    and engineering realities.
  </p>
  <p>
    My capability is the combination of two things most designers have in
    isolation: a 10,000-foot view of how a product ecosystem fits together,
    and the hands-on skill to translate that vision into flows, components,
    and prototypes that ship.
  </p>
</div>
```

Entity note: `I've` becomes `I&apos;ve` and `it's` becomes `it&apos;s`.

---

### 4. `components/sections/FeaturedWork.tsx`

Two changes: the section subheadline and the case-study image alt texts.

#### 4a. Section subheadline -- Line 251

```diff
- Showcasing measurable impact through thoughtful design
+ Measurable impact through strategic design
```

#### 4b. Add `altText` field to each object in the `featuredCases` array and use it in the `<Image>` tag

Add an `altText` string property to each of the three case objects in the inline `featuredCases` array (lines 10-65):

**AXA GO object -- after line 25 (`image: '/images/Case Covers/Customer Simulator.png',`):**
```diff
  image: '/images/Case Covers/Customer Simulator.png',
+ altText: "AXA GO Agent's Coach -- AI-powered training simulation interface",
```

**Atlas object -- after line 43 (`image: '/images/Case Covers/Atlas Onboarding.png',`):**
```diff
  image: '/images/Case Covers/Atlas Onboarding.png',
+ altText: 'Atlas Onboarding -- redesigned user onboarding flow for a B2B SaaS platform',
```

**BennitAI object -- after line 61 (`image: '/images/Case Covers/Bennit AI.png',`):**
```diff
  image: '/images/Case Covers/Bennit AI.png',
+ altText: 'BennitAI Marketplace -- AI-powered community engagement platform design',
```

Then update the `CaseSectionProps` interface (line 124-128) to reflect the new shape. Because the type is inferred via `typeof featuredCases[0]`, this happens automatically -- no explicit interface edit is needed.

Finally, update the `<Image>` tag inside the `CaseSection` component (line 210) to use the new field:

```diff
- alt={caseData.title}
+ alt={caseData.altText}
```

---

### 5. `components/sections/Services.tsx`

Three changes in the Services section and UX Pulse Check subsection.

#### 5a. Section subheadline -- Lines 95-99

The current JSX is:
```tsx
<p className="text-dark-50 text-lg leading-relaxed">
  I thrive on solving <strong>*urgent, complex problems*</strong> for teams building the future.
  <br />
  From untangling the enterprise ecosystem to scaling AI tools for startups.
</p>
```

The asterisks inside `<strong>` render as literal `*` characters on screen. The replacement removes the `<strong>` tag entirely (the sentence structure carries the emphasis without inline formatting) and consolidates the two-line sentence into one continuous statement with an em-dash. Replace the entire `<p>` block with:

```tsx
<p className="text-dark-50 text-lg leading-relaxed">
  I focus on urgent, complex problems for teams building the future -- from untangling enterprise ecosystems to scaling AI tools for startups.
</p>
```

Note: "the enterprise ecosystem" becomes "enterprise ecosystems" (plural) to match the optimized copy exactly.

#### 5b. UX Pulse Check H3 -- Lines 129-130

```diff
- Or diagnose critical issues fast with my surgical UX audit.
+ Need a fast diagnosis? The UX Pulse Check delivers answers in days.
```

#### 5c. UX Pulse Check capability 3 (third `<li>`) -- Line 146

```diff
- <span>Give you € recovery estimates within days</span>
+ <span>Provide recovery estimates within days</span>
```

---

### 6. `components/sections/ClientLogos.tsx`

One addition: a visually-hidden H2 heading for accessibility.

#### 6a. Add visually-hidden H2 inside the `<section>` element

Insert immediately after the opening `<section>` tag (line 49), before the `{/* Marquee Container */}` comment. Tailwind v4 (the version in this project) ships `sr-only` as a built-in utility -- no CSS addition is needed.

Current lines 49-50:
```tsx
<section className="py-12 md:py-16 bg-primary-yellow overflow-hidden">
  {/* Marquee Container */}
```

After edit:
```tsx
<section className="py-12 md:py-16 bg-primary-yellow overflow-hidden">
  <h2 className="sr-only">Trusted by</h2>

  {/* Marquee Container */}
```

---

### 7. `components/sections/Testimonials.tsx`

One addition: a visible H2 section heading above the carousel.

#### 7a. Add H2 heading inside the container div, before the carousel wrapper

Insert between line 50 (`<div className="container mx-auto px-6 lg:px-20">`) and line 52 (`{/* Carousel */}`). The heading uses the same H2 style class pattern applied on light backgrounds elsewhere in the project (`font-display text-3xl md:text-4xl font-bold text-dark-900`), matching the FeaturedWork section header at line 247 of that file. The `bg-cream-500` background of this section qualifies as a light background.

Current lines 50-52:
```tsx
<div className="container mx-auto px-6 lg:px-20">

  {/* Carousel */}
```

After edit:
```tsx
<div className="container mx-auto px-6 lg:px-20">
  <h2 className="font-display text-3xl md:text-4xl font-bold text-dark-900 text-center mb-8">
    What Our Clients Say
  </h2>

  {/* Carousel */}
```

---

### 8. `components/sections/ContactForm.tsx`

Three string replacements. No structural changes.

#### 8a. H2 headline -- Line 173

```diff
- Ready to transform your User Experience?
+ Ready to work together?
```

#### 8b. Subheadline paragraph -- Line 176

The current line uses `&apos;` entities for two apostrophes. The replacement text contains none, which simplifies the line. Replace:

```diff
- Let&apos;s talk about how we can realign your product with your users&apos; needs and start turning those challenges into triumphs. No strings attached.
+ Let&apos;s talk about your product challenges. No commitment, no pressure -- just a conversation about what&apos;s possible.
```

Note: "Let's" and "what's" each require `&apos;`.

#### 8c. Rio-BCN skyline image alt text -- Line 311

```diff
- alt="Rio de Janeiro and Barcelona skyline"
+ alt="Skyline illustration of Rio de Janeiro and Barcelona"
```

---

## Files NOT Modified (confirmed no-ops)

| File | Reason |
|------|--------|
| `app/page.tsx` | Already imports all seven section components in the correct order. Zero changes. |
| `app/globals.css` | The PRD requests adding a `.sr-only` utility class. This project runs Tailwind CSS v4, which ships `sr-only` as a built-in utility. Adding a manual definition would be dead code. No edit required. |
| `lib/data/testimonials.ts` | All five testimonials are retained verbatim. The PRD explicitly states testimonial text must never be rewritten. Zero changes. |

---

## Implementation Order

Execute edits in this sequence. Each step is independently committable.

```
Step 1:  lib/data/services.ts                  -- subtitle tweak (data before component)
Step 2:  components/sections/Hero.tsx          -- H1 + subheadline
Step 3:  components/sections/ValueProposition.tsx -- cards data + labels + headers + body + alt
Step 4:  components/sections/FeaturedWork.tsx  -- subheadline + altText field + Image alt usage
Step 5:  components/sections/Services.tsx      -- subheadline fix + Pulse Check H3 + capability 3
Step 6:  components/sections/ClientLogos.tsx   -- sr-only H2
Step 7:  components/sections/Testimonials.tsx  -- visible H2
Step 8:  components/sections/ContactForm.tsx   -- H2 + subheadline + skyline alt
```

---

## Verification Steps

Run these checks after all edits are complete, in order.

### 1. TypeScript compilation

```bash
cd /Users/rodrigo.seoane/local-sites/portfolio-2026
npm run type-check
```

Expected: zero errors. The only typing concern is the `altText` field added to `featuredCases` -- because the type is inferred from the array literal via `typeof featuredCases[0]`, adding the field to all three objects is sufficient. No interface declaration needs updating.

### 2. Lint check

```bash
npm run lint
```

Expected: zero new warnings. No imports were added or removed. No unused variables were introduced.

### 3. Development server smoke test

```bash
npm run dev
```

Open `http://localhost:3010` and verify visually, top to bottom:

| Section | What to check |
|---------|---------------|
| Hero | H1 reads "B2B SaaS Design That Drives Retention and Growth". Subheadline reads the new two-sentence version. No raw `&apos;` entities visible on screen. |
| Problem Statement | Orange "Common Pitfalls" label is visible above the H2. H2 reads "The product trap that costs teams time and budget". Card items match the updated text exactly -- pay particular attention to "Redesigns" (plural), "Features nobody uses", and "Mounting technical debt". |
| Why Me | Image alt is not visible but inspect the `<img>` element in DevTools to confirm the new alt string. H2 reads "Design as a competitive advantage, not an afterthought". Body copy contains "10,000-foot" (comma-separated, hyphenated) not "10.000ft". |
| Featured Work | Subheadline reads "Measurable impact through strategic design". Inspect each case-study `<img>` in DevTools to confirm the three new alt strings. |
| Services | Subheadline has no asterisks. It reads as one sentence with the em-dash. UX Pulse Check H3 reads "Need a fast diagnosis? The UX Pulse Check delivers answers in days." Third capability reads "Provide recovery estimates within days" with no euro sign. |
| Client Logos | Inspect DOM in DevTools: confirm an `<h2>` with class `sr-only` and text "Trusted by" exists inside the `<section>`. It must not be visible on screen. |
| Testimonials | A visible "What Our Clients Say" H2 heading appears above the carousel, centered, in the dark-900 color. |
| Contact | H2 reads "Ready to work together?" Subheadline reads the new version with the em-dash. Inspect the skyline SVG `<img>` to confirm the updated alt. |

### 4. Heading hierarchy audit

Open DevTools (Chrome: Elements panel; or use any browser extension that extracts heading outlines). Confirm the full-page heading structure matches this exactly:

```
H1: B2B SaaS Design That Drives Retention and Growth
  H2: The product trap that costs teams time and budget
    H3: User Experience Issues
    H3: Business Performance
    H3: Development Challenges
  H2: Design as a competitive advantage, not an afterthought
  H2: Case Studies
  H2: AI-Driven Training to Improve Onboarding and Retention
  H2: Transforming User Adoption through Streamlined Onboarding
  H2: AI-Powered Platform Design for Community Engagement
  H2: How to work with me
    H3: Embedded Designer
    H3: Advisory Retainer
    H3: Workshop Facilitation
    H3: Need a fast diagnosis? The UX Pulse Check delivers answers in days.
  H2: Trusted by                          <-- visually hidden, present in DOM
  H2: What Our Clients Say
  H2: Ready to work together?
```

No levels are skipped. H1 appears exactly once.

### 5. Responsive check

Resize the browser to a mobile viewport (375px width). Confirm: (a) the "Common Pitfalls" label and new problem-statement H2 remain centered and readable; (b) the "What Our Clients Say" heading does not overflow or overlap the carousel arrows; (c) all card text wraps cleanly with the longer strings (particularly "Escalating customer support volume" and "Wasted engineering resources").

---

## Dependencies and Considerations

- **No new packages.** All changes are string/copy edits and one small structural addition (an `<h2>` element).
- **Tailwind v4 `sr-only`:** Confirmed built-in. No CSS file edit. If for any reason the class does not apply at runtime, add it manually to the `@layer utilities` block in `globals.css` using the standard definition (position absolute, 1px dimensions, clip, overflow hidden, white-space nowrap, border-width 0). This is the fallback only.
- **Entity encoding in JSX:** Every apostrophe in JSX text content must be written as `&apos;`. The spec calls out each occurrence explicitly. A raw `'` in JSX text will cause a build warning in strict mode.
- **The `featuredCases` alt-text change is the only edit that touches component logic** (switching from `caseData.title` to `caseData.altText`). Everything else is pure text replacement. If for any reason the `altText` approach is not desired, the alternative is to hardcode the alt strings directly in the `<Image alt="..." />` tag inside `CaseSection`, using a map keyed on `caseData.slug`. The data-field approach is cleaner and recommended.
- **No animation or layout changes.** Every `className`, every `variants` prop, every `motion.*` wrapper is unchanged. The only additions to the DOM are two new elements: the `<motion.p>` label in ValueProposition and the two `<h2>` headings in ClientLogos and Testimonials. Neither of these disrupts existing layout because the label slots into an already-flex column container and the headings are placed before their respective content blocks.
- **Open question from PRD -- hero visual upgrade.** The PRD flags upgrading the abstract shapes to a product mockup image. No asset is available. This is explicitly out of scope and flagged for a future iteration.
