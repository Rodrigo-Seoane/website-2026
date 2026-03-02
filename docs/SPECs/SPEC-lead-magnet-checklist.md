# Technical Specification: Interactive Lead Magnet Checklist

**Source PRD:** `docs/PRDs/PRD-lead-magnet-checklist.md`
**Guidelines Reference:** `Dev-Guidelines.md`
**Date:** February 15, 2026
**Status:** Ready for Implementation

---

## Executive Summary

This specification provides tactical, file-level implementation guidance for building the "12 UX Red Flags Killing Your SaaS Retention" interactive checklist page with lead capture and a 5-email nurture sequence. The page lives at `/ux-pulse-check/checklist` as a nested route under the existing UX Pulse Check service page. It is a single-page client-side application with four states: hero landing, multi-step questionnaire, lead capture gate, and results display. Email delivery uses Resend with batch scheduling.

**Scope:**
- **Files to Create:** 15
- **Files to Modify:** 3
- **New Dependencies:** 2 (`resend`, `@react-email/components`)
- **Estimated Lines Written:** ~2,400 lines
- **Implementation Time:** 16-24 hours across 3 phases

---

## Planning Reasoning

### Architectural Decisions

**1. Single-Page Client-Side App with `useReducer`**
The questionnaire flow (hero, 12 questions, lead capture, results) is managed entirely on the client via a `useReducer` hook in the page component. This avoids unnecessary routing and keeps state transitions predictable. The reducer manages `currentStep` (a union of `'hero' | number | 'lead-capture' | 'results'`), the `answers` array, `leadData`, and `score`. No URL parameters, no localStorage during assessment -- localStorage is used only after submission so users can revisit results.

**2. Data-First Architecture**
Following the established pattern in `/lib/data/ux-pulse-check.ts`, all 12 checklist items with their titles, problem descriptions, "Why It Matters" content, and "Fix It" recommendations are externalized to `/lib/data/retention-checklist.ts`. The hero content, lead capture labels, results copy, and CTA content also live in this file. Components are pure renderers of this data.

**3. Component Organization: `components/sections/checklist/` Subdirectory**
The PRD specifies 5 section components and 3 UI components. Following the precedent set by `components/sections/vibe-lab/`, all checklist-specific section components are placed under `components/sections/checklist/` with a barrel `index.ts` export file. The 3 UI components (`ProgressBar`, `QuestionCard`, `ScoreBadge`) are placed under `components/ui/` because they are small and potentially reusable.

**4. Reuse of Existing ContactForm Patterns**
The `LeadCaptureGate` component reuses the `FloatingInput` internal component pattern from `ContactForm.tsx`. Rather than extracting `FloatingInput` into a shared component (which would require refactoring `ContactForm.tsx`), the `LeadCaptureGate` implements its own version of the floating label inputs following the exact same styling and behavior. This follows the project's YAGNI principle -- shared extraction can happen later if a third form appears.

**5. Accordion Reuse for Results Breakdown**
The detailed breakdown section in results reuses the existing `Accordion` component from `components/ui/Accordion.tsx`. The component accepts `{ question: string, answer: string }[]` items. For the results, `question` maps to the red flag title (prefixed with a status indicator) and `answer` maps to the "Why It Matters" + "Fix It" content for flagged items, or a brief acknowledgment for non-flagged items.

**6. Email Architecture: Resend Batch Scheduling**
At 15-20 leads/month (75-100 emails/month), Resend's free tier (3,000 emails/month) is more than sufficient. All 5 emails are scheduled at form submission time using Resend's `scheduledAt` parameter. No cron jobs, no database, no external queue. The API route at `app/api/checklist/submit/route.ts` handles both Resend audience contact creation and batch email scheduling in a single request.

**7. Email Templates with React Email**
All 5 email templates are React components in the `/emails/` directory using `@react-email/components`. This keeps templates type-safe, locally previewable, and consistent with the React codebase. Templates are simple -- no complex layouts. They use inline styles (email standard) with the brand's color palette.

**8. No Database**
Lead data is stored in Resend's contact/audience system. Assessment results are stored in `localStorage` on the client side (after form submission only). The results page reads from `localStorage` to display results on return visits. If `localStorage` is empty, the page shows a "Take the Assessment" prompt instead.

### File Selection Rationale

**Why not modify `ContactForm.tsx` directly:**
The existing `ContactForm` is a fully featured, page-specific component with its own `FormData` interface, `FloatingInput` sub-component, and submission logic. Extending it to support the checklist's different field set (no message field, different dropdown options, different submission endpoint) would bloat the component and violate single-responsibility. A new `LeadCaptureGate` component with its own form logic is cleaner.

**Why create `ProgressBar.tsx` and `ScoreBadge.tsx` as separate UI components:**
Both are small (30-40 lines), stateless, and potentially reusable. `ProgressBar` could serve future multi-step flows. `ScoreBadge` is a styled display component. Following the existing `components/ui/Accordion.tsx` precedent, these belong in `components/ui/`.

**Why `QuestionCard.tsx` is a UI component, not a section component:**
It renders a single question's content and response buttons. It receives all data and callbacks via props. It has no state of its own (selected answer is managed by the parent `ChecklistQuestionnaire`). It is a pure presentational component, consistent with the UI component pattern.

---

## State Management Architecture

### Reducer Design

The page component (`app/ux-pulse-check/checklist/page.tsx`) owns a `useReducer` that manages the entire flow state:

```typescript
// State shape
interface ChecklistState {
  phase: 'hero' | 'questionnaire' | 'lead-capture' | 'results'
  currentQuestion: number          // 0-11 index
  answers: (number | null)[]       // 12 slots, each null | 0 | 0.5 | 1
  direction: 1 | -1               // for slide animation direction
  leadData: LeadFormData | null
  score: number | null
  isSubmitting: boolean
  submitError: string | null
}

// Actions
type ChecklistAction =
  | { type: 'START_ASSESSMENT' }
  | { type: 'ANSWER_QUESTION'; questionIndex: number; value: number }
  | { type: 'NEXT_QUESTION' }
  | { type: 'PREV_QUESTION' }
  | { type: 'COMPLETE_QUESTIONNAIRE' }
  | { type: 'SUBMIT_LEAD'; data: LeadFormData }
  | { type: 'SUBMIT_SUCCESS'; score: number }
  | { type: 'SUBMIT_ERROR'; error: string }
```

### Data Flow

```
page.tsx (useReducer) ──state──> ChecklistHero (phase === 'hero')
                       ──state──> ChecklistQuestionnaire (phase === 'questionnaire')
                       │           └──> QuestionCard (per question)
                       │           └──> ProgressBar
                       ──state──> LeadCaptureGate (phase === 'lead-capture')
                       ──state──> ChecklistResults (phase === 'results')
                                   └──> ScoreBadge
                                   └──> Accordion (breakdown)
                                   └──> ChecklistCTA
```

All `dispatch` calls flow upward from child components via callback props. No context providers needed -- the state tree is shallow (one level of prop drilling from page to sections).

---

## File Changes

### Files to Create

---

#### 1. `lib/data/retention-checklist.ts`

**Purpose:** All content for the interactive checklist -- 12 items, hero text, lead capture labels, results copy, email content summaries.
**Lines Target:** ~350
**Dependencies:** None (pure data)

##### TypeScript Interfaces

```typescript
export interface ChecklistItem {
  id: string
  number: number
  title: string
  problem: string
  whyItMatters: string
  fixIt: string
}

export interface ChecklistHeroContent {
  label: string
  headline: string
  subheadline: string
  bodyCopy: string
  ctaText: string
  trustSignals: string[]
}

export interface LeadCaptureContent {
  headline: string
  subheadline: string
  ctaText: string
  privacyLabel: string
  privacyNote: string
  roleOptions: string[]
}

export type ScoreTier = 'green' | 'amber' | 'red'

export interface ScoreTierData {
  tier: ScoreTier
  label: string
  range: string
  summary: string
  recommendation: string
  recommendationCta?: { text: string; href: string }
}

export interface ResultsContent {
  headline: string
  tiers: ScoreTierData[]
  downloadCtaText: string
  downloadUrl: string
}

export interface ChecklistCTAContent {
  primaryCta: { text: string; href: string }
  secondaryCta: { text: string; href: string }
}
```

##### Data Exports

- `checklistHeroContent: ChecklistHeroContent` -- Hero section content with label "FREE ASSESSMENT", headline "12 UX Red Flags Killing Your SaaS Retention", subheadline, body copy, CTA "Start Your Free Assessment", and trust signals array `["Takes under 3 minutes", "No credit card required", "Instant results"]`.

- `checklistItems: ChecklistItem[]` -- Array of 12 items. Each item has `id` (e.g., `'red-flag-01'`), `number` (1-12), `title`, `problem` (from the PRD "Brief Problem Description" column), `whyItMatters` (expanded explanation for results -- 2-3 sentences explaining business impact), and `fixIt` (actionable recommendation from the PDF -- 2-3 bullet points as a single string with `\n` separators).

- `responseOptions` -- Array of 3 response options:
  ```typescript
  export const responseOptions = [
    { label: 'Yes, this is a problem', value: 1 },
    { label: 'Partially -- we have some issues', value: 0.5 },
    { label: 'No, we handle this well', value: 0 },
  ] as const
  ```

- `leadCaptureContent: LeadCaptureContent` -- Lead capture gate text with role dropdown options `['Product Manager', 'CTO', 'Founder', 'Design Leader', 'Other']`.

- `resultsContent: ResultsContent` -- Scoring tiers:
  - Green (0-3): label "Solid Foundation", summary and recommendation as defined in PRD.
  - Amber (4-7): label "Friction Is Building", recommendation links to `/ux-pulse-check`.
  - Red (8-12): label "Urgent Action Needed", recommendation links to `https://calendly.com/rodrigo_seoane/discovery`.

- `checklistCTAContent: ChecklistCTAContent` -- Primary CTA "Book a Free Discovery Call" pointing to Calendly, secondary CTA "Explore UX Pulse Check" pointing to `/ux-pulse-check`.

##### Full 12 Checklist Items

Populate each item using the PRD table for `title` and `problem` fields. The `whyItMatters` and `fixIt` fields expand on each item's business impact and actionable fix. Here is the content for all 12 items:

```typescript
export const checklistItems: ChecklistItem[] = [
  {
    id: 'red-flag-01',
    number: 1,
    title: 'Your Onboarding Has No Clear "Aha Moment"',
    problem:
      'Users sign up but never experience the core value of your product. They wander through features without understanding why they should care, and drop off within the first session.',
    whyItMatters:
      'Users who don&apos;t reach their "aha moment" within the first 3-5 minutes have a 60-80% chance of never coming back. Every session without a clear value demonstration is a lost user.',
    fixIt:
      'Map your activation path: identify the ONE action users must complete to experience core value.\nReduce time-to-value by removing all friction before that moment.\nAdd a guided first-run experience that leads directly to the aha moment.',
  },
  {
    id: 'red-flag-02',
    number: 2,
    title: 'You&apos;re Asking Too Much Before Delivering Value',
    problem:
      'Your signup flow requires extensive profile setup, team invitations, integrations, or configuration before users can do anything useful. The setup feels like homework.',
    whyItMatters:
      'Every additional step in your signup flow causes 20-40% drop-off. Users are trading their time for a promise of value -- the longer you delay that value, the more users abandon.',
    fixIt:
      'Apply progressive disclosure: only ask for what&apos;s needed RIGHT NOW.\nLet users experience the product before requiring full setup.\nMove non-essential configuration to post-activation settings.',
  },
  {
    id: 'red-flag-03',
    number: 3,
    title: 'Your Navigation Is a Maze',
    problem:
      'Users can&apos;t find key features. Your menu structure reflects your org chart or technical architecture rather than user tasks. Important actions are buried 3+ clicks deep.',
    whyItMatters:
      'When users can&apos;t find what they need within 2-3 clicks, they assume the feature doesn&apos;t exist or the product is too complex. Both lead to churn.',
    fixIt:
      'Restructure navigation around user tasks, not internal departments.\nEnsure primary actions are accessible within 1-2 clicks.\nRun a tree test or card sort with 5 users to validate your IA.',
  },
  {
    id: 'red-flag-04',
    number: 4,
    title: 'Empty States That Kill Momentum',
    problem:
      'When a user opens a new section for the first time, they see a blank page or a generic "no data yet" message. There&apos;s no guidance on what to do next.',
    whyItMatters:
      'Empty states are your product&apos;s first impression for each feature. A blank page communicates "nothing to see here" when it should communicate "here&apos;s how to get started."',
    fixIt:
      'Design every empty state as a mini-onboarding moment.\nInclude a clear CTA showing the user exactly what action to take.\nUse sample data or templates to demonstrate the feature&apos;s value.',
  },
  {
    id: 'red-flag-05',
    number: 5,
    title: 'Error Messages That Blame the User',
    problem:
      'When something goes wrong, your product shows cryptic error codes, technical jargon, or vague messages with no actionable guidance.',
    whyItMatters:
      'Error moments are trust-critical. A confusing error makes users feel stupid and erodes confidence in your product. Repeated bad error experiences accelerate churn.',
    fixIt:
      'Rewrite every error message to explain what happened in plain language.\nAlways include a specific action the user can take to resolve the issue.\nLog technical details for your team but never expose them to users.',
  },
  {
    id: 'red-flag-06',
    number: 6,
    title: 'No Feedback on User Actions',
    problem:
      'Users click buttons and nothing visibly happens. Forms submit without confirmation. Settings save without acknowledgment.',
    whyItMatters:
      'When users don&apos;t receive feedback, they don&apos;t know if their action worked. This creates anxiety, leads to repeated clicks, and erodes trust in your product&apos;s reliability.',
    fixIt:
      'Add visual confirmation for every user action (toasts, inline messages, state changes).\nUse loading indicators for operations that take more than 300ms.\nProvide success states that confirm what just happened.',
  },
  {
    id: 'red-flag-07',
    number: 7,
    title: 'Feature Overload on First Login',
    problem:
      'New users are greeted with every feature your product offers. Dashboards are packed with widgets, sidebars show all tools, and tooltips fire like a tutorial machine gun.',
    whyItMatters:
      'Cognitive overload causes decision paralysis. Users who feel overwhelmed on first login are far less likely to complete activation and far more likely to abandon.',
    fixIt:
      'Implement progressive disclosure: reveal features as users need them.\nStart with a simplified default view and let users customize over time.\nReplace tooltip tours with contextual guidance triggered by user actions.',
  },
  {
    id: 'red-flag-08',
    number: 8,
    title: 'No Re-Engagement for Dormant Users',
    problem:
      'When a user stops logging in, nothing happens. No email, no in-app message when they return, no acknowledgment that they&apos;ve been away.',
    whyItMatters:
      'Dormant users represent recoverable revenue. Without re-engagement, a temporary absence becomes permanent churn. The cost of re-activating is far lower than acquiring new users.',
    fixIt:
      'Set up automated re-engagement emails triggered by inactivity (7, 14, 30 days).\nDesign a "welcome back" experience for returning dormant users.\nHighlight what&apos;s new or what they missed since their last visit.',
  },
  {
    id: 'red-flag-09',
    number: 9,
    title: 'Your Settings Page Is a Graveyard',
    problem:
      'Critical configuration options are buried in a massive settings page that users only visit when something is already wrong.',
    whyItMatters:
      'Settings pages with 50+ options create analysis paralysis. Users miss critical configurations that would improve their experience, and support tickets spike for issues users could self-resolve.',
    fixIt:
      'Surface critical settings contextually, where users need them.\nGroup settings into logical categories with clear descriptions.\nAdd smart defaults so most users never need to touch settings.',
  },
  {
    id: 'red-flag-10',
    number: 10,
    title: 'Inconsistent Design Patterns',
    problem:
      'Buttons look different across pages. Some forms auto-save, others require clicking save. The product feels like it was built by 5 different teams.',
    whyItMatters:
      'Inconsistency forces users to re-learn your product on every page. It creates cognitive load, increases errors, and makes the product feel unpolished and unreliable.',
    fixIt:
      'Audit your product for pattern inconsistencies across all core flows.\nEstablish (or enforce) a component library with documented usage guidelines.\nPrioritize fixing inconsistencies in high-traffic flows first.',
  },
  {
    id: 'red-flag-11',
    number: 11,
    title: 'No Clear Path from Free to Paid',
    problem:
      'Users on your free tier never experience the value of premium features. The upgrade prompt is either invisible or feels like a generic paywall.',
    whyItMatters:
      'Without a clear upgrade path tied to demonstrated value, free users remain free forever. Generic paywalls feel aggressive; value-based upgrade prompts feel helpful.',
    fixIt:
      'Let free users experience premium features in limited contexts (trials, previews).\nTrigger upgrade prompts at moments of demonstrated value, not arbitrary limits.\nShow the specific benefit they&apos;ll unlock, not just a feature list.',
  },
  {
    id: 'red-flag-12',
    number: 12,
    title: 'You Ship Features Without Validating Them',
    problem:
      'Your team ships new features based on stakeholder requests, competitor analysis, or gut instinct -- but rarely tests with actual users before launch.',
    whyItMatters:
      'Unvalidated features accumulate UX debt. Each feature that doesn&apos;t match real user needs adds complexity without value, making the product harder to use and more expensive to maintain.',
    fixIt:
      'Test prototypes with 5 users before committing to development.\nRun discovery interviews to validate the problem exists before designing solutions.\nMeasure feature adoption post-launch and sunset features nobody uses.',
  },
]
```

---

#### 2. `components/sections/checklist/ChecklistHero.tsx`

**Purpose:** Hero section for the checklist landing page. Displayed when `phase === 'hero'`.
**Lines Target:** ~90
**Dependencies:** `lib/data/retention-checklist.ts`, `lib/utils/animations.ts`, `framer-motion`

##### Props Interface

```typescript
interface ChecklistHeroProps {
  onStart: () => void  // dispatches START_ASSESSMENT
}
```

##### Implementation Notes

- Follow the exact same pattern as `PulseCheckHero.tsx`: `'use client'`, `useRef`, `useInView`, `motion.div` with `staggerContainer` and `fadeUp` variants.
- Layout: Single-column centered layout (no 2-column grid -- this page does not have an image placeholder).
- Background: `bg-primary-yellow` matching the UX Pulse Check hero.
- Padding: `pt-28 pb-16 lg:pt-32 lg:pb-20` matching the existing hero.
- Elements in order:
  1. `<motion.span>` label: `checklistHeroContent.label` ("FREE ASSESSMENT") -- orange-400 color, uppercase, bold, tracking-wider.
  2. `<motion.h1>` headline: `checklistHeroContent.headline` -- `font-display text-4xl lg:text-5xl font-bold text-dark-900 leading-tight`.
  3. `<motion.p>` subheadline: `checklistHeroContent.subheadline` -- `text-xl font-semibold text-dark-900`.
  4. `<motion.p>` body copy: `checklistHeroContent.bodyCopy` -- `text-lg text-dark-900/80 max-w-xl mx-auto`.
  5. `<motion.div>` CTA button: `checklistHeroContent.ctaText` -- same button style as PulseCheckHero (`bg-dark-900 text-white font-semibold rounded-lg px-8 py-4`). `onClick={onStart}`.
  6. `<motion.div>` trust signals: Map over `checklistHeroContent.trustSignals`, display as inline flex items separated by `|` dividers. Style: `text-sm text-dark-900/60 font-medium`.
- Max-width container: `max-w-3xl mx-auto text-center`.

---

#### 3. `components/sections/checklist/ChecklistQuestionnaire.tsx`

**Purpose:** Multi-step questionnaire with 12 questions, progress bar, and navigation. Displayed when `phase === 'questionnaire'`.
**Lines Target:** ~180
**Dependencies:** `lib/data/retention-checklist.ts`, `components/ui/ProgressBar.tsx`, `components/ui/QuestionCard.tsx`, `lib/utils/animations.ts`, `framer-motion` (AnimatePresence)

##### Props Interface

```typescript
interface ChecklistQuestionnaireProps {
  currentQuestion: number              // 0-11
  answers: (number | null)[]           // current answers array
  direction: 1 | -1                    // animation direction
  onAnswer: (questionIndex: number, value: number) => void
  onNext: () => void
  onPrev: () => void
  onComplete: () => void               // called when answering question 12
}
```

##### Implementation Notes

- Background: `bg-cream-500` (`#fff9f0`).
- Padding: `py-16 lg:py-20`.
- Container: `container mx-auto px-6 lg:px-20 max-w-3xl`.
- Top section: `ProgressBar` component showing `currentQuestion + 1` out of 12. Below it, text: `"Question {currentQuestion + 1} of 12"` styled as `text-sm font-medium text-dark-500`.
- Main content: Wrap the `QuestionCard` in `AnimatePresence mode="wait"`. Use the `key={currentQuestion}` prop to trigger transitions. Animation:
  ```typescript
  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 100 : -100,
      opacity: 0,
    }),
  }
  ```
  Transition: `{ duration: 0.3, ease: 'easeInOut' }`.
- The `QuestionCard` receives the current `ChecklistItem`, the current answer (if any), and the `onAnswer` callback.
- Navigation buttons below the card:
  - "Back" button: Visible when `currentQuestion > 0`. Style: `text-dark-500 hover:text-dark-900 font-medium`. Calls `onPrev`.
  - "Next" / "See My Results" button: Enabled only when `answers[currentQuestion] !== null`. If `currentQuestion < 11`, shows "Next" and calls `onNext`. If `currentQuestion === 11`, shows "See My Results" and calls `onComplete`. Style: same as hero CTA (`bg-dark-900 text-white font-semibold rounded-lg px-8 py-3`). Disabled state: `opacity-50 cursor-not-allowed`.
- Layout for nav buttons: `flex items-center justify-between mt-8`.

---

#### 4. `components/sections/checklist/LeadCaptureGate.tsx`

**Purpose:** Email/name capture form appearing after all questions are answered. Displayed when `phase === 'lead-capture'`.
**Lines Target:** ~180
**Dependencies:** `lib/data/retention-checklist.ts`, `lib/utils/cn.ts`, `react-hook-form`, `framer-motion`, `lib/utils/animations.ts`

##### Props Interface

```typescript
interface LeadCaptureGateProps {
  onSubmit: (data: LeadFormData) => void
  isSubmitting: boolean
  submitError: string | null
}
```

##### LeadFormData Interface (exported from data file)

```typescript
export interface LeadFormData {
  name: string
  email: string
  company?: string
  role?: string
  consent: boolean
}
```

##### Implementation Notes

- Background: `bg-cream-500`.
- Padding: `py-16 lg:py-20`.
- Container: `container mx-auto px-6 lg:px-20 max-w-xl`.
- Uses `react-hook-form` with `useForm<LeadFormData>()` following the exact pattern from `ContactForm.tsx`.
- Implements its own `FloatingInput` sub-component following the exact same pattern as in `ContactForm.tsx` (lines 38-92): floating label that lifts on focus/value, `bg-cream-500` background, `border-b border-dark-150`, `focus:border-b-2 focus:border-dark-900`.
- Form fields:
  1. **Name** (required): `FloatingInput` with label "Your Name", `register('name', { required: 'Name is required' })`.
  2. **Email** (required): `FloatingInput` with label "Email Address", type "email", validation regex matching `ContactForm.tsx` pattern: `/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i`.
  3. **Company** (optional): `FloatingInput` with label "Company Name".
  4. **Role** (optional): Select dropdown with floating label "Your Role". Options from `leadCaptureContent.roleOptions`. Same select styling as `ContactForm.tsx` (lines 278-306).
  5. **Privacy consent** (required): Checkbox with label from `leadCaptureContent.privacyLabel`. Same checkbox styling as `ContactForm.tsx` (lines 316-334).
- Below form: `<p>` with `leadCaptureContent.privacyNote` ("We respect your privacy. Your data is never shared.") -- `text-xs text-dark-500 text-center mt-4`.
- Submit button: Full-width, `bg-dark-900 text-white` matching `ContactForm.tsx` submit button. Shows spinner when `isSubmitting`. Text from `leadCaptureContent.ctaText` ("Get My Results").
- Error display: If `submitError` is non-null, show error message in `text-red-500` above the submit button.
- Animations: Entire form wrapped in `motion.div` with `fadeUp` variant on mount. Header text uses `staggerContainer` + `fadeUp`.

---

#### 5. `components/sections/checklist/ChecklistResults.tsx`

**Purpose:** Score display, detailed breakdown (accordion), and personalized recommendations. Displayed when `phase === 'results'`.
**Lines Target:** ~200
**Dependencies:** `lib/data/retention-checklist.ts`, `components/ui/ScoreBadge.tsx`, `components/ui/Accordion.tsx`, `lib/utils/animations.ts`, `framer-motion`

##### Props Interface

```typescript
interface ChecklistResultsProps {
  score: number
  answers: (number | null)[]
  leadName: string
}
```

##### Implementation Notes

- **Score Hero Block:**
  - Background: `bg-dark-700` (`#2e5e5e`).
  - Padding: `pt-28 pb-16 lg:pt-32 lg:pb-20` (accounts for fixed nav).
  - Container: `container mx-auto px-6 lg:px-20 max-w-3xl text-center`.
  - Personalized greeting: `"Hi {leadName}, here are your results"` -- `text-lg text-white/80`.
  - Score display: `"Your Retention Risk Score"` as label, then `ScoreBadge` component showing the score.
  - Score format: Display raw score with one decimal (e.g., "6.5 / 12") for transparency. Use `Math.round(score)` for tier placement.
  - Tier determination: `score <= 3 ? 'green' : score <= 7 ? 'amber' : 'red'`. Uses rounded score.
  - Tier label and summary from `resultsContent.tiers[tierIndex]`.
  - Animation: `staggerContainer` + `fadeUp` with `useRef`/`useInView`.

- **Detailed Breakdown Block:**
  - Background: `bg-cream-500`.
  - Padding: `py-16 lg:py-20`.
  - Container: `container mx-auto px-6 lg:px-20 max-w-3xl`.
  - Heading: `"Detailed Breakdown"` -- `font-display text-2xl lg:text-3xl font-bold text-dark-900 mb-8`.
  - Uses the existing `Accordion` component. Map each of the 12 `checklistItems` to an accordion item:
    - For items with answer `1` (Yes): `question` = red circle indicator + title, `answer` = `whyItMatters` + `\n\n` + "How to fix it:\n" + `fixIt`.
    - For items with answer `0.5` (Partially): `question` = amber circle indicator + title, `answer` = `whyItMatters` + `\n\n` + "How to fix it:\n" + `fixIt`.
    - For items with answer `0` (No): `question` = green circle indicator + title, `answer` = "Great job! You handle this well. Keep it up.".
  - The indicator is a Unicode circle character prepended to the question text: `\u2B24` (or use a colored emoji/text prefix like "RED FLAG: " / "PARTIAL: " / "GOOD: " for screen readers).
  - Default open: The first flagged item (answer > 0) should be open by default. Pass `defaultOpenIndex` to Accordion.

- **Personalized Recommendation Block:**
  - Background: `bg-white`.
  - Padding: `py-12`.
  - Container: `max-w-3xl mx-auto px-6 lg:px-20`.
  - Content from `resultsContent.tiers[tierIndex].recommendation`.
  - If the tier has `recommendationCta`, render a CTA link/button.

- **CTA Section:**
  - Rendered by the `ChecklistCTA` component (see below) embedded at the bottom of the results.

---

#### 6. `components/sections/checklist/ChecklistCTA.tsx`

**Purpose:** Final CTA section with Discovery Call and UX Pulse Check links.
**Lines Target:** ~60
**Dependencies:** `lib/data/retention-checklist.ts`, `lib/utils/animations.ts`, `framer-motion`

##### Props Interface

```typescript
// No props -- reads from data file
```

##### Implementation Notes

- Follow the exact pattern of `FinalCTA.tsx`:
  - Background: `bg-dark-700`.
  - Padding: `py-20 lg:py-24`.
  - Container: `max-w-2xl mx-auto text-center`.
  - Primary CTA: `checklistCTAContent.primaryCta` -- `bg-primary-yellow text-dark-900 font-semibold rounded-lg px-8 py-4`. Links to Calendly (opens in new tab).
  - Secondary CTA: `checklistCTAContent.secondaryCta` -- `text-white underline hover:text-cream-500 font-medium`. Links to `/ux-pulse-check`.
  - Tertiary link: "Download Full PDF Checklist" -- `text-cream-500/60 hover:text-cream-500 text-sm`. Links to `/pdfs/12-ux-red-flags-checklist.pdf` (static asset).
  - Add UTM parameters to all CTAs: `?utm_source=checklist&utm_medium=web&utm_campaign=retention_checklist`.
- Animation: `staggerContainer` + `fadeUp` with `useRef`/`useInView`.

---

#### 7. `components/sections/checklist/index.ts`

**Purpose:** Barrel export file following the `components/sections/vibe-lab/index.ts` pattern.
**Lines Target:** ~5

```typescript
export { ChecklistHero } from './ChecklistHero'
export { ChecklistQuestionnaire } from './ChecklistQuestionnaire'
export { LeadCaptureGate } from './LeadCaptureGate'
export { ChecklistResults } from './ChecklistResults'
export { ChecklistCTA } from './ChecklistCTA'
```

---

#### 8. `components/ui/ProgressBar.tsx`

**Purpose:** Animated progress bar showing questionnaire completion.
**Lines Target:** ~35
**Dependencies:** `framer-motion`

##### Props Interface

```typescript
interface ProgressBarProps {
  current: number   // 1-12 (1-indexed for display)
  total: number     // 12
  className?: string
}
```

##### Implementation Notes

- Outer container: `w-full h-2 bg-dark-150 rounded-full overflow-hidden`.
- Inner bar: `motion.div` with `bg-primary-yellow` (or `bg-orange-400` for contrast on cream background). Height: `h-full`. Width animated: `animate={{ width: \`${(current / total) * 100}%\` }}` with `transition={{ duration: 0.4, ease: 'easeOut' }}`.
- Optional `className` prop for container overrides.
- Below the bar: Do NOT include text -- the parent `ChecklistQuestionnaire` handles the "Question X of 12" label.

---

#### 9. `components/ui/QuestionCard.tsx`

**Purpose:** Individual question card with the red flag title, problem description, and 3 response buttons.
**Lines Target:** ~70
**Dependencies:** `lib/data/retention-checklist.ts` (types), `lib/utils/cn.ts`

##### Props Interface

```typescript
interface QuestionCardProps {
  item: ChecklistItem
  selectedValue: number | null
  onSelect: (value: number) => void
}
```

##### Implementation Notes

- Card container: `bg-white rounded-xl p-8 shadow-sm`.
- Title: `<h2 className="font-display text-xl lg:text-2xl font-bold text-dark-900 mb-3">{item.title}</h2>`.
- Problem description: `<p className="text-dark-500 text-base leading-relaxed mb-8">{item.problem}</p>`.
- Prompt: `<p className="text-sm font-medium text-dark-900 mb-4">Does this red flag apply to your product?</p>`.
- Response buttons: Map over `responseOptions`. Each button:
  - Full-width block button.
  - Default state: `border-2 border-dark-150 rounded-lg px-6 py-4 text-left text-dark-900 hover:border-orange-400 transition-colors`.
  - Selected state: `border-2 border-orange-400 bg-orange-400/10 rounded-lg px-6 py-4 text-left text-dark-900 font-medium`.
  - On click: `onSelect(option.value)`.
  - Use `cn()` for conditional class merging.
- Buttons are arranged in a vertical stack with `space-y-3`.

---

#### 10. `components/ui/ScoreBadge.tsx`

**Purpose:** Color-coded circular score badge with tier label.
**Lines Target:** ~45
**Dependencies:** `lib/data/retention-checklist.ts` (ScoreTier type), `lib/utils/cn.ts`

##### Props Interface

```typescript
interface ScoreBadgeProps {
  score: number
  total: number
  tier: ScoreTier
  label: string
}
```

##### Implementation Notes

- Circular badge: `w-32 h-32 rounded-full flex flex-col items-center justify-center mx-auto mb-6`.
- Color by tier:
  - `green`: `bg-green-600 text-white`
  - `amber`: `bg-orange-400 text-white`
  - `red`: `bg-red-500 text-white`
- Score text inside badge: `<span className="font-display text-3xl font-bold">{score}</span>` followed by `<span className="text-sm font-medium opacity-80">/ {total}</span>`.
- Below badge: `<span className="text-lg font-semibold">{label}</span>` using the tier's label text ("Solid Foundation", "Friction Is Building", "Urgent Action Needed"). Color matches the tier: green-600, orange-400, or red-500 (applied to text when on light backgrounds; applied as white text when inside the dark score hero).
- Use `cn()` for dynamic tier class selection.

---

#### 11. `app/ux-pulse-check/checklist/page.tsx`

**Purpose:** Page component that composes all checklist sections and manages flow state.
**Lines Target:** ~180
**Dependencies:** All checklist section components via barrel import, `lib/data/retention-checklist.ts`, `framer-motion` (AnimatePresence), React (useReducer, useCallback)

##### Implementation Notes

- `'use client'` directive (state management requires client component).
- Metadata: Since this is a client component, export metadata from a separate `layout.tsx` file (see file 12 below), or use `generateMetadata` in a server component wrapper. Given the project pattern (UX Pulse Check page.tsx is a server component), the simplest approach is to make this a client component and add a `layout.tsx` for metadata.
- Actually, reviewing the existing code: `app/ux-pulse-check/page.tsx` is a server component (no `'use client'`). The checklist page needs client-side state. The best pattern: create `app/ux-pulse-check/checklist/page.tsx` as a server component that imports a client `ChecklistPage` wrapper. However, for simplicity and following KISS, make the page.tsx a client component and use a sibling `layout.tsx` for metadata. This matches how other Next.js 16 apps handle client-rendered pages with metadata.

- **State Reducer:** Define `ChecklistState`, `ChecklistAction`, and `checklistReducer` at the top of the file (or in a separate `use-checklist-reducer.ts` hook file if the page exceeds 200 lines -- for now, inline is acceptable).

- **Reducer Logic:**
  - `START_ASSESSMENT`: Set `phase` to `'questionnaire'`, `currentQuestion` to 0.
  - `ANSWER_QUESTION`: Update `answers[questionIndex]` to `value`.
  - `NEXT_QUESTION`: Increment `currentQuestion`, set `direction` to 1.
  - `PREV_QUESTION`: Decrement `currentQuestion`, set `direction` to -1.
  - `COMPLETE_QUESTIONNAIRE`: Set `phase` to `'lead-capture'`.
  - `SUBMIT_LEAD`: Set `isSubmitting` to true, store `leadData`. Actual API call happens in the component via `useCallback`.
  - `SUBMIT_SUCCESS`: Set `phase` to `'results'`, calculate and store `score`, set `isSubmitting` to false. Also persist results to `localStorage`.
  - `SUBMIT_ERROR`: Set `submitError`, set `isSubmitting` to false.

- **API Call:** On lead form submission:
  1. Dispatch `SUBMIT_LEAD`.
  2. Calculate score: `answers.reduce((sum, val) => sum + (val ?? 0), 0)`.
  3. POST to `/api/checklist/submit` with `{ leadData, answers, score }`.
  4. On success: Dispatch `SUBMIT_SUCCESS`. Save `{ score, answers, leadName, timestamp }` to `localStorage` key `'checklist-results'`.
  5. On error: Dispatch `SUBMIT_ERROR`.

- **Render:** Use `AnimatePresence mode="wait"` with `key={state.phase}` to animate phase transitions (fade in/out). Render the appropriate section component based on `state.phase`:
  - `'hero'`: `<ChecklistHero onStart={...} />`
  - `'questionnaire'`: `<ChecklistQuestionnaire currentQuestion={...} answers={...} direction={...} onAnswer={...} onNext={...} onPrev={...} onComplete={...} />`
  - `'lead-capture'`: `<LeadCaptureGate onSubmit={...} isSubmitting={...} submitError={...} />`
  - `'results'`: `<ChecklistResults score={...} answers={...} leadName={...} />`

- **localStorage Hydration:** On component mount, check if `localStorage` has `'checklist-results'`. If yes and data is valid, immediately set phase to `'results'` with stored data. This allows users to revisit their results. Include a "Retake Assessment" button in the results view that clears `localStorage` and resets state.

- **Scroll to Top:** On phase transitions, scroll to the top of the page: `window.scrollTo({ top: 0, behavior: 'smooth' })`.

---

#### 12. `app/ux-pulse-check/checklist/layout.tsx`

**Purpose:** Layout file for metadata (title, description, Open Graph).
**Lines Target:** ~25
**Dependencies:** None

```typescript
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '12 UX Red Flags Killing Your SaaS Retention | Free Assessment | Rodrigo Seoane',
  description:
    'Score your product&apos;s retention risk in under 3 minutes. Identify the 12 most common UX patterns that silently drive users away and get actionable fixes.',
  keywords: [
    'UX checklist',
    'SaaS retention',
    'user experience audit',
    'UX red flags',
    'product retention',
    'SaaS churn',
    'UX assessment',
  ],
  openGraph: {
    title: '12 UX Red Flags Killing Your SaaS Retention',
    description: 'Score your product in under 3 minutes. Get instant results and actionable fixes.',
    type: 'website',
  },
}

export default function ChecklistLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
```

---

#### 13. `app/api/checklist/submit/route.ts`

**Purpose:** API route handling lead form submission, Resend audience contact creation, and batch email scheduling.
**Lines Target:** ~150
**Dependencies:** `resend` package, email templates from `/emails/`

##### Request Format

```typescript
interface SubmitRequest {
  leadData: {
    name: string
    email: string
    company?: string
    role?: string
  }
  answers: number[]     // 12 values, each 0, 0.5, or 1
  score: number
}
```

##### Response Format

```typescript
// Success (200)
interface SubmitResponse {
  success: true
  score: number
}

// Error (400 | 500)
interface SubmitErrorResponse {
  success: false
  error: string
}
```

##### Implementation Notes

```typescript
import { Resend } from 'resend'
import { ChecklistResultsEmail } from '@/emails/checklist-results'
import { OnboardingValueEmail } from '@/emails/onboarding-value'
import { CaseStudyEmail } from '@/emails/case-study'
import { EmpathyPainPointsEmail } from '@/emails/empathy-pain-points'
import { DiscoveryCallCTAEmail } from '@/emails/discovery-call-cta'

const resend = new Resend(process.env.RESEND_API_KEY)
const SENDER = 'Rodrigo Seoane <business@rodrigoseoane.com>'
```

- **Validation:**
  - Check that `leadData.name` and `leadData.email` are present and valid.
  - Check that `answers` array has exactly 12 elements.
  - Check that `score` is a number between 0 and 12.
  - Return 400 with descriptive error if validation fails.

- **Contact Creation (optional, if Resend audience is set up):**
  ```typescript
  // Create or update contact in Resend audience
  await resend.contacts.create({
    email: leadData.email,
    firstName: leadData.name.split(' ')[0],
    lastName: leadData.name.split(' ').slice(1).join(' ') || undefined,
    audienceId: process.env.RESEND_AUDIENCE_ID!,
  })
  ```
  If `RESEND_AUDIENCE_ID` is not set, skip this step (graceful degradation).

- **Determine top 3 flagged red flags:**
  ```typescript
  import { checklistItems } from '@/lib/data/retention-checklist'

  const flaggedItems = answers
    .map((value, index) => ({ value, item: checklistItems[index] }))
    .filter(({ value }) => value > 0)
    .sort((a, b) => b.value - a.value)
    .slice(0, 3)
  ```

- **Determine score tier:**
  ```typescript
  const roundedScore = Math.round(score)
  const tier = roundedScore <= 3 ? 'green' : roundedScore <= 7 ? 'amber' : 'red'
  ```

- **Batch Email Scheduling:**
  ```typescript
  const now = new Date()
  const addDays = (date: Date, days: number) => {
    const result = new Date(date)
    result.setDate(result.getDate() + days)
    return result.toISOString()
  }

  const firstName = leadData.name.split(' ')[0]

  // Email 1: Immediate
  await resend.emails.send({
    from: SENDER,
    to: [leadData.email],
    subject: `Your UX Retention Score: ${score}/12 -- Here's Your Full Report`,
    react: ChecklistResultsEmail({
      firstName,
      score,
      tier,
      flaggedItems: flaggedItems.map(f => ({
        title: f.item.title,
        fixIt: f.item.fixIt,
      })),
    }),
  })

  // Email 2: Day 2
  await resend.emails.send({
    from: SENDER,
    to: [leadData.email],
    subject: 'The onboarding mistake that costs SaaS companies 60-80% of new users',
    react: OnboardingValueEmail({ firstName }),
    scheduledAt: addDays(now, 2),
  })

  // Email 3: Day 5
  await resend.emails.send({
    from: SENDER,
    to: [leadData.email],
    subject: 'How we reduced onboarding friction by 40%',
    react: CaseStudyEmail({ firstName }),
    scheduledAt: addDays(now, 5),
  })

  // Email 4: Day 8
  await resend.emails.send({
    from: SENDER,
    to: [leadData.email],
    subject: 'The real reason UX problems don&apos;t get fixed (it&apos;s not what you think)',
    react: EmpathyPainPointsEmail({ firstName }),
    scheduledAt: addDays(now, 8),
  })

  // Email 5: Day 12
  await resend.emails.send({
    from: SENDER,
    to: [leadData.email],
    subject: 'Quick question about your retention challenges',
    react: DiscoveryCallCTAEmail({ firstName, score }),
    scheduledAt: addDays(now, 12),
  })
  ```

- **Error Handling:**
  - Wrap all Resend calls in try/catch.
  - If Email 1 (immediate) fails, return 500 error -- user needs their results email.
  - If scheduled emails (2-5) fail, log the error but still return success -- the user got their results and the lead was captured. Log which email failed for manual follow-up.
  - Use `console.error` for server-side logging (Vercel captures these).

- **CORS / Security:**
  - Only accept POST requests.
  - Validate Content-Type is `application/json`.
  - Consider adding a simple rate limit check (e.g., max 5 submissions from same IP per hour) -- but this is a Phase 3 enhancement, not MVP.

---

#### 14. Email Templates (5 files)

All email templates use `@react-email/components` and follow the same structure. Each is a React component exported as the default export.

##### Common Email Layout Pattern

```typescript
import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Text,
  Link,
  Hr,
  Img,
} from '@react-email/components'

const baseStyles = {
  body: { backgroundColor: '#fff9f0', fontFamily: 'Inter, Arial, sans-serif' },
  container: { maxWidth: '600px', margin: '0 auto', padding: '40px 20px' },
  heading: { fontSize: '24px', fontWeight: 'bold', color: '#080d00', marginBottom: '16px' },
  text: { fontSize: '16px', lineHeight: '1.6', color: '#080d00' },
  link: { color: '#2e5e5e', textDecoration: 'underline' },
  cta: {
    display: 'inline-block',
    padding: '12px 24px',
    backgroundColor: '#ffd115',
    color: '#080d00',
    fontWeight: 'bold',
    textDecoration: 'none',
    borderRadius: '8px',
  },
  footer: { fontSize: '12px', color: '#686b63', marginTop: '32px' },
  signature: { fontSize: '14px', color: '#080d00', marginTop: '24px' },
}

// Every email includes this footer:
// "Rodrigo Seoane | B2B SaaS Product Designer"
// "You received this email because you completed the UX Retention Risk Assessment."
// "Unsubscribe | Privacy Policy"
// UTM parameters on all links: ?utm_source=checklist&utm_medium=email&utm_campaign=retention_nurture&utm_content=email_N
```

##### 14a. `emails/checklist-results.tsx` -- Email 1: Results + PDF (Day 0)

**Props:**
```typescript
interface ChecklistResultsEmailProps {
  firstName: string
  score: number
  tier: 'green' | 'amber' | 'red'
  flaggedItems: { title: string; fixIt: string }[]
}
```

**Content Structure:**
1. Greeting: "Hi {firstName},"
2. Score summary: "You scored {score}/12 on the UX Retention Risk Assessment."
3. Tier interpretation (one paragraph based on tier).
4. "Your top flagged red flags:" -- Numbered list of flaggedItems titles (up to 3).
5. One key fix from the top flagged item's `fixIt` (first line).
6. Link to PDF: "Download the full 12 UX Red Flags checklist with all fix-it recommendations."
7. CTA button: "Review Your Full Results Online" linking to `/ux-pulse-check/checklist` with UTM params.
8. Signature: "Rodrigo Seoane" / "B2B SaaS Product Designer" / "25+ years helping teams at Coca-Cola, World Bank, Rolls Royce, and TEDx"
9. Footer with unsubscribe.

##### 14b. `emails/onboarding-value.tsx` -- Email 2: Onboarding Mistakes (Day 2)

**Props:**
```typescript
interface OnboardingValueEmailProps {
  firstName: string
}
```

**Content Structure:**
1. Greeting: "Hi {firstName},"
2. Lead stat: "Users who don't reach their 'aha moment' within the first 3-5 minutes have a 60-80% chance of never coming back."
3. Three micro-tips (numbered list):
   - Map your activation path: What is the ONE thing users must do to experience value?
   - Apply progressive disclosure: only ask for what's needed RIGHT NOW.
   - Design every empty state as a mini-onboarding.
4. Authority line: "Over 25 years working with teams at Coca-Cola, World Bank, and Rolls Royce, onboarding is consistently where I find the most recoverable revenue."
5. Soft CTA: "Want to see how this applies to your product? Reply to this email with your app URL and I'll send you one specific onboarding observation -- free."
6. Signature + footer.

##### 14c. `emails/case-study.tsx` -- Email 3: Mini Case Study (Day 5)

**Props:**
```typescript
interface CaseStudyEmailProps {
  firstName: string
}
```

**Content Structure:**
1. Greeting: "Hi {firstName},"
2. Case study intro: Brief Atlas onboarding redesign case study.
3. Problem: "A B2B SaaS platform was losing 40% of new users during onboarding because the setup process required 12 steps before users could access core features."
4. Approach: "We identified 3 key red flags from the checklist (No Clear Aha Moment, Asking Too Much Before Delivering Value, Empty States) and restructured the onboarding to let users experience value within 2 minutes."
5. Result: "Onboarding completion rates improved by 40%, and 30-day retention increased by 25%."
6. Connection to reader: "If your assessment revealed similar red flags, the same approach could apply to your product."
7. CTA links: "See more case studies" (link to /work with UTM) + "Or let's discuss your specific situation" (Calendly link with UTM).
8. Signature + footer.

##### 14d. `emails/empathy-pain-points.tsx` -- Email 4: Internal Pain Points (Day 8)

**Props:**
```typescript
interface EmpathyPainPointsEmailProps {
  firstName: string
}
```

**Content Structure:**
1. Greeting: "Hi {firstName},"
2. Empathy opening: "You know the UX issues exist. You've probably flagged them in sprint planning more than once."
3. Pain point: "But between firefighting bugs, reporting to stakeholders, preparing epics, and managing competing priorities -- UX improvements keep getting pushed to 'next quarter.'"
4. Philosophical problem: "You shouldn't have to waste so much time making and defending decisions with little to no user research and validation."
5. Positive outcome: "Better user engagement, higher conversion rates, and increased retention by removing friction points in the user experience."
6. Position UX Pulse Check: "Sometimes what you need isn't more internal bandwidth -- it's an experienced outside perspective that can cut through the noise in 3-5 days."
7. Soft CTA: "If any of this resonates, I'd love to hear what you're dealing with. Reply to this email -- I read every one."
8. Signature + footer.

##### 14e. `emails/discovery-call-cta.tsx` -- Email 5: Discovery Call CTA (Day 12)

**Props:**
```typescript
interface DiscoveryCallCTAEmailProps {
  firstName: string
  score: number
}
```

**Content Structure:**
1. Greeting: "Hi {firstName},"
2. Reference assessment: "Two weeks ago, you scored {score}/12 on the UX Retention Risk Assessment."
3. Frame Discovery Call: "In 30 minutes, we'll review your top 2-3 red flags in detail, identify the highest-impact fix, and discuss whether a Surface, Structure, or Strategy engagement fits your needs."
4. Testimonial: Brief Martin Kelman quote: "Rodrigo's user-centric approach was transformative. By rebalancing functionality through role-based dashboards and rapid prototyping, we didn't just simplify navigation -- we operationalized scalability."
5. Urgency: "I have limited spots available this month for Discovery Calls."
6. CTA button: "Book Your Free Discovery Call" (Calendly link with UTM).
7. PS line: "Not ready for a call? No worries. Reply with your biggest UX challenge and I'll share a quick thought -- no strings attached."
8. Signature + footer.

**All emails must:**
- Send from: `Rodrigo Seoane <business@rodrigoseoane.com>`
- Include unsubscribe link (Resend handles this automatically via `{{{RESEND_UNSUBSCRIBE_URL}}}` placeholder).
- Include UTM parameters on all outbound links.
- Use inline styles (email client compatibility).
- Be under 100KB total size.

---

### Files to Modify

---

#### 15. `app/ux-pulse-check/page.tsx`

**Current Lines:** 42
**Target Lines:** ~48

##### Change 1: Add cross-link banner to checklist

Insert a new section component or inline banner between `<PulseCheckHero />` and `<ProblemSection />`. The simplest approach is an inline `<div>` banner:

**After line 23 (`<PulseCheckHero />`), insert:**
```typescript
{/* Checklist Cross-Link Banner */}
<div className="bg-dark-900 py-4">
  <div className="container mx-auto px-6 lg:px-20 text-center">
    <p className="text-cream-500 text-sm lg:text-base">
      Not sure if you need a UX audit?{' '}
      <a
        href="/ux-pulse-check/checklist"
        className="text-primary-yellow font-semibold hover:underline"
      >
        Take our free 3-minute assessment
      </a>{' '}
      to find out.
    </p>
  </div>
</div>
```

**No new imports required** -- this is pure JSX using existing Tailwind classes.

---

#### 16. `package.json`

**Changes:** Add 2 new dependencies.

```diff
  "dependencies": {
+   "@react-email/components": "^0.0.31",
    "clsx": "^2.1.1",
    "embla-carousel-react": "^8.6.0",
    "framer-motion": "^12.29.2",
    "lucide-react": "^0.563.0",
    "next": "16.1.6",
    "next-themes": "^0.4.6",
    "react": "19.2.3",
    "react-dom": "19.2.3",
    "react-hook-form": "^7.71.1",
    "react-intersection-observer": "^10.0.2",
+   "resend": "^4.1.0",
    "tailwind-merge": "^3.4.0"
  },
```

Run `npm install resend @react-email/components` after updating.

---

#### 17. `.env.local`

**Changes:** Add Resend environment variables.

```
# Resend Email Service
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxx
RESEND_AUDIENCE_ID=aud_xxxxxxxxxxxxxxxxxxxx
```

**Note:** The `RESEND_API_KEY` is obtained from https://resend.com/api-keys after account creation and domain verification. The `RESEND_AUDIENCE_ID` is optional -- only needed if using Resend's contact management feature. Both values must be set before email functionality works. During development without these keys, the API route should return a graceful error message.

---

## Implementation Order

### Phase 1: Core Assessment Experience (MVP) -- No Email

**Estimated Time:** 8-12 hours

```
Step 1:  lib/data/retention-checklist.ts          -- All data and interfaces (data before components)
Step 2:  components/ui/ProgressBar.tsx             -- Simple UI component, no dependencies
Step 3:  components/ui/QuestionCard.tsx             -- Simple UI component, depends on data types
Step 4:  components/ui/ScoreBadge.tsx               -- Simple UI component, depends on data types
Step 5:  components/sections/checklist/ChecklistHero.tsx          -- First section
Step 6:  components/sections/checklist/ChecklistQuestionnaire.tsx -- Core interaction
Step 7:  components/sections/checklist/LeadCaptureGate.tsx        -- Form (stubbed submit)
Step 8:  components/sections/checklist/ChecklistResults.tsx       -- Results display
Step 9:  components/sections/checklist/ChecklistCTA.tsx           -- CTA section
Step 10: components/sections/checklist/index.ts                   -- Barrel exports
Step 11: app/ux-pulse-check/checklist/layout.tsx                  -- Metadata
Step 12: app/ux-pulse-check/checklist/page.tsx                    -- Page composition + reducer
```

**Phase 1 Testing:** Full client-side flow works end-to-end. Form submission is stubbed (console.log + immediate results display). No emails sent. Verify: questionnaire navigation, progress bar, answer persistence, score calculation, results display with accordion, CTA links.

### Phase 2: Email Integration

**Estimated Time:** 4-6 hours

```
Step 13: npm install resend @react-email/components
Step 14: .env.local -- Add API keys
Step 15: emails/checklist-results.tsx               -- Email 1
Step 16: emails/onboarding-value.tsx                -- Email 2
Step 17: emails/case-study.tsx                      -- Email 3
Step 18: emails/empathy-pain-points.tsx             -- Email 4
Step 19: emails/discovery-call-cta.tsx              -- Email 5
Step 20: app/api/checklist/submit/route.ts          -- API route with batch scheduling
Step 21: Update page.tsx to call real API endpoint instead of stub
```

**Phase 2 Testing:** Submit the form with a real email address. Verify: Email 1 arrives immediately. Check Resend dashboard for scheduled emails 2-5. Verify email content renders correctly in Gmail, Outlook (webmail), and Apple Mail.

### Phase 3: Cross-Linking and Polish

**Estimated Time:** 2-4 hours

```
Step 22: app/ux-pulse-check/page.tsx               -- Add cross-link banner
Step 23: Mobile responsiveness testing and polish
Step 24: Accessibility audit (heading hierarchy, focus states, keyboard nav)
Step 25: Edge case testing (localStorage unavailable, API timeout, network error)
```

---

## Testing & Verification Steps

### Phase 1: Client-Side Flow (20 minutes)

**Navigate to `/ux-pulse-check/checklist` and verify:**

1. **Hero Section**
   - [ ] "FREE ASSESSMENT" label visible in orange
   - [ ] Headline "12 UX Red Flags Killing Your SaaS Retention" displays
   - [ ] CTA "Start Your Free Assessment" is clickable
   - [ ] Trust signals display below CTA
   - [ ] Clicking CTA transitions to questionnaire (smooth animation)

2. **Questionnaire**
   - [ ] Progress bar shows at top, starts at ~8% (1/12)
   - [ ] "Question 1 of 12" label displays
   - [ ] Question title and problem description display
   - [ ] 3 response buttons are visible and clickable
   - [ ] Selecting an answer highlights the button (orange border + background)
   - [ ] "Next" button is disabled until an answer is selected
   - [ ] "Next" button advances to question 2 with slide animation
   - [ ] "Back" button appears on question 2+
   - [ ] "Back" button returns to previous question with reverse slide
   - [ ] Previous answers are preserved when navigating back
   - [ ] Progress bar updates on each question
   - [ ] On question 12, "Next" button text changes to "See My Results"
   - [ ] Completing question 12 transitions to lead capture gate

3. **Lead Capture Gate**
   - [ ] Headline "Your assessment is complete!" displays
   - [ ] Name and Email fields are required (validation error on empty submit)
   - [ ] Email validation rejects malformed addresses
   - [ ] Company and Role fields are optional
   - [ ] Privacy checkbox is required
   - [ ] "Get My Results" button submits the form
   - [ ] Submitting transitions to results page

4. **Results Page**
   - [ ] Score displays in colored badge (correct tier color)
   - [ ] Raw score shows (e.g., "6.5 / 12")
   - [ ] Tier label and summary display correctly
   - [ ] Accordion shows all 12 items
   - [ ] Flagged items (answer > 0) show red/amber indicators
   - [ ] Non-flagged items show green indicators
   - [ ] Expanding a flagged item shows "Why It Matters" and "Fix It" content
   - [ ] Expanding a non-flagged item shows "Great job" message
   - [ ] First flagged item is open by default
   - [ ] CTA buttons link correctly (Calendly, /ux-pulse-check, PDF)
   - [ ] "Retake Assessment" button clears state and restarts

5. **localStorage Persistence**
   - [ ] Completing the assessment stores results in localStorage
   - [ ] Refreshing the page after completion shows results (not hero)
   - [ ] "Retake Assessment" clears localStorage and shows hero

### Phase 2: Email Integration (15 minutes)

1. **API Route**
   - [ ] POST to `/api/checklist/submit` with valid data returns 200
   - [ ] POST with missing name/email returns 400
   - [ ] POST with invalid email returns 400
   - [ ] POST with wrong answer count returns 400

2. **Email Delivery**
   - [ ] Email 1 arrives within 1-2 minutes of submission
   - [ ] Email 1 subject includes the score
   - [ ] Email 1 body includes personalized greeting
   - [ ] Email 1 body lists top 3 flagged items
   - [ ] PDF link works in Email 1
   - [ ] Resend dashboard shows 4 scheduled emails (days 2, 5, 8, 12)
   - [ ] All email links include UTM parameters

3. **Error Handling**
   - [ ] With invalid/missing RESEND_API_KEY, API returns 500 with message
   - [ ] With network error during scheduled emails, Email 1 still sent + success returned

### Phase 3: Responsive & Cross-Browser (15 minutes)

**Test at breakpoints:**
- [ ] Mobile (375px)
- [ ] Tablet (768px)
- [ ] Desktop (1440px)

**Verify:**
- [ ] Hero stacks properly on mobile (centered text, full-width button)
- [ ] Question cards are readable on mobile (full-width buttons)
- [ ] Response buttons are tap-friendly on touch devices (min 44px height)
- [ ] Progress bar is visible on mobile
- [ ] Lead capture form fields stack on mobile
- [ ] Results score badge is centered on mobile
- [ ] Accordion works on mobile (tap to expand)
- [ ] No horizontal overflow on any screen size

### Phase 4: Accessibility (10 minutes)

- [ ] Heading hierarchy: H1 (hero headline) > H2 (question titles, results sections)
- [ ] All form inputs have associated labels
- [ ] Focus states visible on all interactive elements
- [ ] Keyboard navigation works through entire flow (Tab, Enter, Space)
- [ ] Response buttons are keyboard-accessible (Enter/Space to select)
- [ ] Accordion buttons have `aria-expanded` attribute
- [ ] Progress bar has `role="progressbar"`, `aria-valuenow`, `aria-valuemin`, `aria-valuemax`
- [ ] Color contrast passes WCAG AA on all backgrounds

---

## Dependencies & Considerations

### New External Dependencies

| Package | Version | Purpose | Size Impact |
|---------|---------|---------|-------------|
| `resend` | ^4.1.0 | Email sending via Resend API | ~15KB (server-side only) |
| `@react-email/components` | ^0.0.31 | React components for email templates | ~50KB (server-side only, used in email templates) |

Both packages are server-side only (used in API routes and email templates). They do not affect client-side bundle size.

### Environment Variables Required

| Variable | Required | Description |
|----------|----------|-------------|
| `RESEND_API_KEY` | Yes (Phase 2) | API key from Resend dashboard |
| `RESEND_AUDIENCE_ID` | No | Resend audience ID for contact management |

### Domain Verification

Resend requires DNS verification (SPF, DKIM, DMARC records) for sending from `business@rodrigoseoane.com`. This must be configured in the Resend dashboard before Email 2 goes live. Email 1 can be tested with Resend's sandbox domain during development.

### Static Assets Required

| Asset | Path | Description |
|-------|------|-------------|
| PDF Checklist | `/public/pdfs/12-ux-red-flags-checklist.pdf` | The original PDF checklist for download. Must be placed in this directory before the results page download link works. |

### Color Tokens Used (All Verified in globals.css)

| Token | Hex | Usage |
|-------|-----|-------|
| `bg-primary-yellow` | `#ffd115` | Hero background, CTA buttons |
| `bg-cream-500` | `#fff9f0` | Questionnaire background, form background |
| `bg-dark-700` | `#2e5e5e` | Score hero background, CTA section |
| `bg-dark-900` | `#080d00` | Buttons, cross-link banner |
| `text-orange-400` | `#ef8c48` | Labels, progress bar, selected states |
| `text-dark-500` | `#686b63` | Secondary text |
| `text-dark-150` | `#c7c8c6` | Borders |
| `bg-green-600` | Tailwind default | Green tier badge |
| `bg-red-500` | Tailwind default | Red tier badge |

`bg-green-600` and `bg-red-500` are standard Tailwind CSS colors (not custom tokens). They are available by default in Tailwind v4.

### Potential Risks

1. **Resend Domain Verification Delay**
   - Risk: DNS propagation for SPF/DKIM can take 24-48 hours.
   - Mitigation: Start domain verification early (Phase 2 setup). Use Resend's sandbox domain (`onboarding@resend.dev`) for development testing.

2. **Resend Free Tier Limits**
   - Risk: 100 emails/day limit on free tier. If testing sends exceed this, scheduled emails may fail.
   - Mitigation: Test with minimal sends. The production volume (75-100 emails/month) is well within limits.

3. **localStorage Unavailability**
   - Risk: Private browsing or restrictive browser settings may block localStorage.
   - Mitigation: Wrap localStorage operations in try/catch. If unavailable, the page simply starts fresh on each visit (no results persistence).

4. **Email Deliverability**
   - Risk: Emails may land in spam without proper domain authentication.
   - Mitigation: Complete SPF, DKIM, and DMARC setup. Keep email content text-heavy (no heavy HTML). Include unsubscribe link in every email.

5. **React Email Compatibility**
   - Risk: `@react-email/components` version may have compatibility issues with React 19.
   - Mitigation: Email templates only run server-side in API routes. If React 19 causes issues, fall back to plain HTML string templates via Resend's `html` parameter instead of `react`.

---

## Open Questions and Decisions Made

The PRD lists 8 open questions. Here are the decisions made for this spec:

1. **Email domain verification:** Flagged as a prerequisite for Phase 2. Implementer must verify `rodrigoseoane.com` with Resend before going live.

2. **PDF hosting:** Decision: Host as a static asset at `/public/pdfs/12-ux-red-flags-checklist.pdf`. Simple, fast, no tracking overhead. Download tracking can be added via analytics events in a future iteration.

3. **Results persistence:** Decision: Use `localStorage` with a key `'checklist-results'`. No unique URL. Emails link back to `/ux-pulse-check/checklist` which reads from localStorage. If localStorage is empty, user sees the hero with a "Take Assessment" prompt. This is the simplest approach that satisfies the requirement.

4. **Navigation placement:** Decision: Do NOT add a top-level nav item. The checklist is discoverable via: (a) the cross-link banner on `/ux-pulse-check`, (b) direct links shared on social media, and (c) email sequence links. Adding it to nav would clutter the primary navigation for a lead-gen tool.

5. **Email personalization depth:** Decision: Email 1 includes personalized score and top 3 flagged items. Emails 2-5 use generic (non-personalized) content. This avoids the need to store detailed answer data server-side. The score is passed to Email 5 for the "Two weeks ago, you scored X/12" reference.

6. **Unsubscribe handling:** Decision: Rely on Resend's built-in unsubscribe mechanism. No additional custom unsubscribe from the results page -- this is unnecessary complexity for the MVP.

7. **Case study for Email 3:** Decision: Use the Atlas onboarding redesign as the case study. The content is generalized enough to not require specific client permission (no real metrics disclosed, framed as a representative example).

8. **Analytics:** Deferred to a future phase. No analytics event tracking in this spec. The Resend dashboard provides email open rates and click tracking out of the box.

---

## Post-Implementation Checklist

After completing all changes:

- [ ] Run `npm run type-check` (verify TypeScript compiles with new files)
- [ ] Run `npm run lint` (verify no lint errors)
- [ ] Run `npm run build` (verify production build succeeds)
- [ ] Test full client-side flow in browser (all Phase 1 verification steps)
- [ ] Test email delivery with real Resend API key (Phase 2 verification steps)
- [ ] Verify no console errors in browser DevTools
- [ ] Test on mobile device or responsive emulator
- [ ] Verify cross-link banner on `/ux-pulse-check` page
- [ ] Check git diff for unintended changes to existing files
- [ ] Verify PDF asset exists at `/public/pdfs/12-ux-red-flags-checklist.pdf`

---

## Document Control

**Version:** 1.0
**Created:** February 15, 2026
**Author:** Senior Product Manager (AI)
**Status:** Ready for Implementation
**Estimated Implementation Time:** 16-24 hours across 3 phases
**Complexity:** Medium-High

**Review Checklist:**
- [x] All file paths follow existing project naming conventions
- [x] All changes reference existing patterns (animation, form, data-driven)
- [x] Component sizes within reasonable limits (< 250 lines)
- [x] Data-first approach maintained (all content externalized)
- [x] No over-engineering (no database, no cron jobs, no CRM)
- [x] DRY principle followed (reusing Accordion, animation variants, styling patterns)
- [x] KISS principle followed (single-page app, useReducer, localStorage)
- [x] YAGNI principle followed (no analytics, no A/B testing, no branching email logic)
- [x] New dependencies justified and minimal (2 packages, server-side only)
- [x] Follows existing tech stack (Next.js 16, React 19, Tailwind CSS 4, Framer Motion)
- [x] Matches PRD requirements 100%
- [x] State management architecture clearly documented
- [x] API route request/response format specified
- [x] All 5 email templates specified with content and props
- [x] Implementation order is dependency-aware
- [x] Testing steps are comprehensive and actionable

**Frontend Builder Agent:** This specification is complete and ready for implementation. Begin with Phase 1, Step 1 (data layer). All code patterns are documented with reference to existing codebase files. The reducer architecture and component prop interfaces provide the contracts needed to build each component independently.
