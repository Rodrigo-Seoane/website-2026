# SPEC: Design Tokens Update - Semantic Color, Typography & Effect System

**Date:** 2026-02-16
**Status:** Draft
**Depends on:** Primitives.json, Dev-Guidelines.md

---

## Objective

Replace the current flat color token naming (e.g. `primary-yellow`, `accent-brown`) with a semantic token system that matches the Figma design system. Add typography scale tokens and effect tokens. Update all 58 component files that reference the old tokens.

---

## Token Mapping: Old to New

### Color Tokens

| Old Token | Old Hex | New Semantic Token | New HSLA | New Hex |
|---|---|---|---|---|
| `primary-yellow` | `#ffd115` | `surface-primary` | `hsla(48, 100%, 54.1%, 1)` | `#ffd115` |
| `accent` / `accent-brown` | `#5C3D2E` | `accent-secondary` | `hsla(24, 83.3%, 14.1%, 1)` | `#421e06` |
| `accent-peach` | `#FFAD84` | `accent-primary` | `hsla(24, 83.9%, 61%, 1)` | `#e8854a` |
| `orange-400` | `#ef8c48` | **REMOVED** (use `accent-primary`) | - | - |
| `orange-900` | `#421e06` | **REMOVED** (use `accent-secondary`) | - | - |
| `cream-100` / `cream-500` | `#fff9f0` | `surface-terciary` | `hsla(36, 100%, 97.1%, 1)` | `#fff9f0` |
| `dark-50` | `#f7f7f7` | `content-active-secondary` | `hsla(0, 0%, 96.9%, 1)` | `#f7f7f7` |
| `dark-150` | `#c7c8c6` | `content-disable-light` | `hsla(90, 1.8%, 78%, 1)` | `#c7c8c6` |
| `dark-500` | `#686b63` | `content-disable-primary` | `hsla(83, 3.9%, 40.4%, 1)` | `#686b63` |
| `dark-700` | `#2e5e5e` | `surface-secondary` | `hsla(180, 34.3%, 27.5%, 1)` | `#2e5e5e` |
| `dark-900` | `#080d00` | `content-active-primary` | `hsla(83, 100%, 2.5%, 1)` | `#080d00` |
| `dark-background` | `#0A0A0A` | **KEEP** (dark mode only) | - | - |
| `dark-surface` | `#141414` | **KEEP** (dark mode only) | - | - |
| `dark-border` | `#262626` | **KEEP** (dark mode only) | - | - |
| _(new)_ | - | `message-danger` | `hsla(0, 100%, 71%, 1)` | `#ff6b6b` |
| _(new)_ | - | `message-success` | `hsla(122, 39.4%, 49.2%, 1)` | `#4caf50` |
| _(new)_ | - | `message-alert` | `hsla(48, 100%, 54.1%, 1)` | `#ffd115` |
| _(new)_ | - | `content-active-terciary` | `hsla(0, 0%, 100%, 1)` | `#ffffff` |

### Button Token Mapping

| Token | Value | Hex |
|---|---|---|
| `button-bg-primary` | `hsla(83, 100%, 2.5%, 1)` | `#080d00` (= content-active-primary) |
| `button-bg-secondary` | `hsla(48, 100%, 54.1%, 1)` | `#ffd115` (= surface-primary) |
| `button-bg-terciary` | `hsla(36, 100%, 97.1%, 1)` | `#fff9f0` (= surface-terciary) |
| `button-text-primary` | `hsla(0, 0%, 96.9%, 1)` | `#f7f7f7` (= content-active-secondary) |
| `button-text-secondary` | `hsla(24, 83.3%, 14.1%, 1)` | `#421e06` (= accent-secondary) |
| `button-text-terciary` | `hsla(24, 83.9%, 61%, 1)` | `#e8854a` (= accent-primary) |

### Typography Tokens (NEW)

| Token | Value | px equivalent |
|---|---|---|
| `menu-nav` | `0.88rem` | 14px |
| `hero-page-title` | `3.5rem` | 56px |
| `hero-subtitle` | `1.25rem` | 20px |
| `header-h1` | `2rem` | 32px |
| `header-h2` | `1.75rem` | 28px |
| `header-h3` | `1.5rem` | 24px |
| `header-h4` | `1.25rem` | 20px |
| `body-large` | `1.13rem` | 18px |
| `body-regular` | `1rem` | 16px |
| `body-small` | `0.88rem` | 14px |
| `body-extra-small` | `0.75rem` | 12px |
| `list-regular` | `0.88rem` | 14px |
| `caption-large` | `1rem` | 16px |
| `caption-regular` | `0.88rem` | 14px |
| `caption-small` | `0.75rem` | 12px |
| `button-medium` | `1rem` | 16px |
| `button-large` | `1.13rem` | 18px |

### Effect Tokens (NEW)

| Token | Value |
|---|---|
| `layer-blur` | `blur(16px)` |

---

## Files to Modify

### 1. `app/globals.css`

**What to do:** Replace the entire `@theme inline` block with the new semantic token system.

**Replace the color tokens with:**
```css
@theme inline {
  /* === ACCENT === */
  --color-accent-primary: #e8854a;
  --color-accent-secondary: #421e06;

  /* === SURFACES === */
  --color-surface-primary: #ffd115;
  --color-surface-secondary: #2e5e5e;
  --color-surface-terciary: #fff9f0;

  /* === CONTENT: Active === */
  --color-content-active-primary: #080d00;
  --color-content-active-secondary: #f7f7f7;
  --color-content-active-terciary: #ffffff;

  /* === CONTENT: Disabled === */
  --color-content-disable-primary: #686b63;
  --color-content-disable-light: #c7c8c6;

  /* === MESSAGES === */
  --color-message-danger: #ff6b6b;
  --color-message-success: #4caf50;
  --color-message-alert: #ffd115;

  /* === BUTTON Backgrounds === */
  --color-button-bg-primary: #080d00;
  --color-button-bg-secondary: #ffd115;
  --color-button-bg-terciary: #fff9f0;

  /* === BUTTON Text === */
  --color-button-text-primary: #f7f7f7;
  --color-button-text-secondary: #421e06;
  --color-button-text-terciary: #e8854a;

  /* === DARK MODE (keep as-is) === */
  --color-dark-background: #0A0A0A;
  --color-dark-surface: #141414;
  --color-dark-border: #262626;

  /* === FONTS === */
  --font-display: "Plus Jakarta Sans", system-ui, sans-serif;
  --font-body: "Inter", system-ui, sans-serif;

  /* === TYPOGRAPHY SCALE === */
  --font-size-menu-nav: 0.88rem;
  --font-size-hero-page-title: 3.5rem;
  --font-size-hero-subtitle: 1.25rem;
  --font-size-header-h1: 2rem;
  --font-size-header-h2: 1.75rem;
  --font-size-header-h3: 1.5rem;
  --font-size-header-h4: 1.25rem;
  --font-size-body-large: 1.13rem;
  --font-size-body-regular: 1rem;
  --font-size-body-small: 0.88rem;
  --font-size-body-extra-small: 0.75rem;
  --font-size-list-regular: 0.88rem;
  --font-size-caption-large: 1rem;
  --font-size-caption-regular: 0.88rem;
  --font-size-caption-small: 0.75rem;
  --font-size-button-medium: 1rem;
  --font-size-button-large: 1.13rem;

  /* === TIMING === */
  --ease-smooth: cubic-bezier(0.4, 0, 0.2, 1);
  --ease-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55);

  /* === ANIMATIONS === */
  --animate-marquee: marquee 30s linear infinite;
  --animate-float: float 3s ease-in-out infinite;
}
```

**Also add** a utility class for the backdrop blur effect:
```css
@layer utilities {
  .text-balance {
    text-wrap: balance;
  }
  .layer-blur {
    backdrop-filter: blur(16px);
  }
}
```

---

### 2. `components/ui/Button.tsx`

**What to do:** Update variant classes to use new semantic button tokens. Update size classes to use typography tokens.

**Replace `variants` object with:**
```
primary:  'bg-button-bg-primary text-button-text-primary hover:shadow-lg hover:scale-105'
secondary: 'bg-button-bg-secondary text-button-text-secondary hover:shadow-lg hover:scale-105'
ghost:    'bg-button-bg-terciary text-button-text-terciary hover:shadow-md'
```

**Replace `sizes` object with:**
```
sm: 'px-4 py-2 text-body-small'
md: 'px-6 py-3 text-button-medium'
lg: 'px-8 py-4 text-button-large'
```

---

### 3. `components/layout/Navigation.tsx`

**What to do:** Replace all old token references:
- `primary-yellow` → `surface-primary`
- `orange-900` → `accent-secondary`
- `dark-50` → `content-active-secondary`
- `dark-900` → `content-active-primary`

---

### 4. `components/layout/Footer.tsx`

**What to do:** Replace all old token references:
- `dark-700` → `surface-secondary`
- `dark-50` → `content-active-secondary`
- `primary-yellow` → `surface-primary`

---

### 5. `components/sections/Hero.tsx`

**What to do:** Replace all old token references:
- `primary-yellow` → `surface-primary`
- `dark-900` → `content-active-primary`
- `cream-500` → `surface-terciary`
- `orange-400` → `accent-primary`
- Hardcoded `fill="#ffd115"` → use CSS class with `fill-surface-primary`
- Hardcoded `bg-[#1a1502]` → `bg-content-active-primary` (closest semantic match)

---

### 6. `components/sections/ValueProposition.tsx`

**What to do:** Replace all old token references:
- `primary-yellow` → `surface-primary`
- `dark-900` → `content-active-primary`
- `dark-500` → `content-disable-primary`
- `cream-500` → `surface-terciary`
- Hardcoded `fill="#ffd115"` → `fill-surface-primary` via class
- Hardcoded `stroke="#1a1502"` → `stroke-content-active-primary` via class
- Hardcoded `bg-[#1a1502]` → `bg-content-active-primary`
- Hardcoded `text-[#fff6d0]` → `text-surface-terciary` (closest match)

---

### 7. `components/sections/FeaturedWork.tsx`

**What to do:** Replace all old token references:
- `primary-yellow` → `surface-primary`
- `dark-900` → `content-active-primary`
- `cream-500` → `surface-terciary`
- Hardcoded `text-[#001d6c]` → remove or tokenize separately if needed

---

### 8. `components/sections/Services.tsx`

**What to do:** Replace:
- `cream-500` → `surface-terciary`
- `dark-900` → `content-active-primary`
- `orange-400` → `accent-primary`
- `primary-yellow` → `surface-primary`

---

### 9. `components/sections/ContactForm.tsx`

**What to do:** Replace:
- `primary-yellow` → `surface-primary`
- `dark-900` → `content-active-primary`
- `cream-500` → `surface-terciary`
- `dark-500` → `content-disable-primary`
- `accent-brown` → `accent-secondary`

---

### 10. `components/sections/Testimonials.tsx`

**What to do:** Replace:
- `primary-yellow` → `surface-primary`
- `dark-900` → `content-active-primary`
- `cream-500` → `surface-terciary`

---

### 11. `components/sections/ClientLogos.tsx`

**What to do:** Replace:
- `cream-500` → `surface-terciary`
- `dark-900` → `content-active-primary`
- `dark-500` → `content-disable-primary`

---

### 12. `components/sections/ProcessSteps.tsx`

**What to do:** Replace:
- `primary-yellow` → `surface-primary`
- `dark-900` → `content-active-primary`
- `cream-500` → `surface-terciary`
- `dark-500` → `content-disable-primary`

---

### 13. `components/sections/PricingCards.tsx`

**What to do:** Replace:
- `primary-yellow` → `surface-primary`
- `dark-900` → `content-active-primary`
- `cream-500` → `surface-terciary`
- `accent-brown` → `accent-secondary`
- `orange-400` → `accent-primary`

---

### 14. `components/sections/FinalCTA.tsx`

**What to do:** Replace:
- `primary-yellow` → `surface-primary`
- `dark-900` → `content-active-primary`
- `dark-50` → `content-active-secondary`

---

### 15. `components/sections/ProblemSection.tsx`

**What to do:** Replace:
- `primary-yellow` → `surface-primary`
- `dark-900` → `content-active-primary`
- `cream-500` → `surface-terciary`

---

### 16. `components/sections/ServiceForMe.tsx`

**What to do:** Replace:
- `primary-yellow` → `surface-primary`
- `dark-900` → `content-active-primary`
- `cream-500` → `surface-terciary`
- `orange-400` → `accent-primary`

---

### 17. `components/sections/FAQ.tsx`

**What to do:** Replace:
- `primary-yellow` → `surface-primary`
- `dark-900` → `content-active-primary`
- `cream-500` → `surface-terciary`

---

### 18. `components/sections/PulseCheckHero.tsx`

**What to do:** Replace:
- `primary-yellow` → `surface-primary`
- `dark-900` → `content-active-primary`
- `cream-500` → `surface-terciary`
- `orange-400` → `accent-primary`

---

### 19. `components/sections/PulseCheckBenefits.tsx`

**What to do:** Replace:
- `primary-yellow` → `surface-primary`
- `dark-900` → `content-active-primary`
- `cream-500` → `surface-terciary`

---

### 20-24. `components/sections/checklist/*.tsx` (5 files)

Files: `ChecklistHero.tsx`, `ChecklistQuestionnaire.tsx`, `ChecklistResults.tsx`, `ChecklistCTA.tsx`, `LeadCaptureGate.tsx`

**What to do in each:** Replace:
- `primary-yellow` → `surface-primary`
- `dark-900` → `content-active-primary`
- `cream-500` → `surface-terciary`
- `orange-400` → `accent-primary`
- `dark-500` → `content-disable-primary`
- `dark-50` → `content-active-secondary`

---

### 25-31. `components/sections/about/*.tsx` (7 files)

Files: `AboutHero.tsx`, `StorySection.tsx`, `PhilosophySection.tsx`, `SkillsSection.tsx`, `ToolsSection.tsx`, `PersonalSection.tsx`, `AboutCTA.tsx`

**What to do in each:** Replace:
- `primary-yellow` → `surface-primary`
- `dark-900` → `content-active-primary`
- `dark-500` → `content-disable-primary`
- `cream-500` → `surface-terciary`
- `dark-700` → `surface-secondary`
- `dark-50` → `content-active-secondary`
- `accent-peach` → `accent-primary`

---

### 32-35. `components/sections/insights/*.tsx` (4 files)

Files: `InsightsHero.tsx`, `FeaturedArticle.tsx`, `ArticleCard.tsx`, `ArticleGrid.tsx`

**What to do in each:** Replace:
- `primary-yellow` → `surface-primary`
- `dark-900` → `content-active-primary`
- `dark-500` → `content-disable-primary`
- `cream-500` → `surface-terciary`
- `dark-150` → `content-disable-light`

---

### 36-38. `components/sections/vibe-lab/*.tsx` (3 files)

Files: `VibeLabHero.tsx`, `ExperimentCard.tsx`, `ComingSoonTeaser.tsx`

**What to do in each:** Replace:
- `primary-yellow` → `surface-primary`
- `dark-900` → `content-active-primary`
- `dark-500` → `content-disable-primary`
- `cream-500` → `surface-terciary`
- `dark-700` → `surface-secondary`

---

### 39-44. `components/sections/case-study/*.tsx` (6 files)

Files: `CaseStudyHero.tsx`, `CaseStudyOverview.tsx`, `CaseStudyProblemContent.tsx`, `CaseStudySolutionContent.tsx`, `CaseStudyResults.tsx`, `CaseStudySection.tsx`, `NextProject.tsx`

**What to do in each:** Replace:
- `primary-yellow` → `surface-primary`
- `dark-900` → `content-active-primary`
- `dark-500` → `content-disable-primary`
- `cream-500` → `surface-terciary`
- `dark-150` → `content-disable-light`
- `dark-border` → `dark-border` (keep as-is, dark mode only)
- `dark-surface` → `dark-surface` (keep as-is, dark mode only)
- Hardcoded `text-[#001d6c]` in CaseStudyHero → evaluate if still needed

---

### 45-51. `components/ui/*.tsx` (7 files)

Files: `Badge.tsx`, `Card.tsx`, `Input.tsx`, `Accordion.tsx`, `CaseStudyCard.tsx`, `CategoryFilter.tsx`, `ImageLightbox.tsx`

**What to do in each:** Replace:
- `primary-yellow` → `surface-primary`
- `dark-900` → `content-active-primary`
- `dark-500` → `content-disable-primary`
- `dark-border` → keep (dark mode)
- `dark-surface` → keep (dark mode)
- `dark-150` → `content-disable-light`
- `cream-500` / `cream-100` → `surface-terciary`

---

### 52-53. `components/ui/ProgressBar.tsx` & `StepProgressBar.tsx`

**What to do:** Replace:
- `primary-yellow` → `surface-primary`
- `dark-150` → `content-disable-light`
- `orange-400` → `accent-primary`

---

### 54. `components/ui/ScoreBadge.tsx`

**What to do:** Replace:
- `orange-400` → `accent-primary`
- Use `message-danger`, `message-success` for score-based coloring

---

### 55. `components/ui/QuestionCard.tsx`

**What to do:** Replace old token references with semantic equivalents.

---

### 56-58. `app/launch-tracker/page.tsx`, `app/vibe-lab/page.tsx`, `app/work/page.tsx`

**What to do:** Replace all old token references following the same mapping above.

---

## Files NOT Modified

- `app/layout.tsx` - No color token references (uses font vars only)
- `postcss.config.mjs` - No changes needed
- Any files inside `backups/` - Do not touch

---

## Search-and-Replace Cheat Sheet

For efficient implementation, use these find-and-replace patterns **in order**:

| Find | Replace |
|---|---|
| `accent-brown` | `accent-secondary` |
| `accent-peach` | `accent-primary` |
| `orange-400` | `accent-primary` |
| `orange-900` | `accent-secondary` |
| `primary-yellow` | `surface-primary` |
| `cream-500` | `surface-terciary` |
| `cream-100` | `surface-terciary` |
| `dark-50` (NOT `dark-500`) | `content-active-secondary` |
| `dark-150` | `content-disable-light` |
| `dark-500` | `content-disable-primary` |
| `dark-700` | `surface-secondary` |
| `dark-900` | `content-active-primary` |

**Important:** Do NOT replace `dark-background`, `dark-surface`, or `dark-border` - these stay for dark mode.

---

## Validation Checklist

After implementation:
1. Run `npm run build` - must compile without errors
2. Grep for any remaining old token names (excluding `dark-background`, `dark-surface`, `dark-border`)
3. Visual check: all pages should render identically (hex values are unchanged for most tokens)
4. Verify Button component renders all 3 variants correctly
5. Verify dark mode still works (dark-* tokens preserved)
