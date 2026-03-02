# Development Guidelines & Best Practices

**Project:** Rodrigo Seoane Portfolio  
**Purpose:** Keep code clean, maintainable, and context-efficient  
**Status:** Active - Reference This Document for ALL Development

---

## 🎯 Core Principles

### 1. KISS - Keep It Simple, Stupid

- Choose the simplest solution that works
- Avoid complex abstractions unless absolutely necessary
- If you can't explain it in one sentence, it's too complex

### 2. DRY - Don't Repeat Yourself

- Reuse existing components before creating new ones
- Extract repeated logic into utilities
- But: Don't abstract prematurely (see Rule of Three below)

### 3. YAGNI - You Aren't Gonna Need It

- Only build what's in the specifications
- No "future-proofing" or "just in case" code
- Features are added when needed, not anticipated

### 4. Single Responsibility Principle

- One file = One purpose
- One function = One task
- One component = One UI element

---

## 📋 Pre-Development Checklist

Before writing ANY code, ask yourself:

```
□ Does this already exist in the project?
   → Check /components, /lib/utils first

□ Can I use a built-in Next.js feature?
   → Image optimization, routing, metadata

□ Can I use a Tailwind utility class?
   → Before writing custom CSS

□ Does this library exist in our stack?
   → Framer Motion, Lucide React, React Hook Form

□ Is this in the specifications?
   → Don't add features not requested

□ Will this file do ONE thing well?
   → If no, split it up
```

---

## 🚫 Anti-Patterns to AVOID

### ❌ Over-Engineering

**DON'T:**

```typescript
// Creating unnecessary abstractions
const ButtonFactory = {
  createPrimaryButton: (props) => <Button variant="primary" {...props} />,
  createSecondaryButton: (props) => <Button variant="secondary" {...props} />,
}

// Complex state management for simple data
const [state, dispatch] = useReducer(complexReducer, initialState)
```

**DO:**

```typescript
// Just use the component directly
<Button variant="primary">Click Me</Button>

// Use simple state for simple needs
const [isOpen, setIsOpen] = useState(false)
```

### ❌ Reinventing the Wheel

**DON'T:**

```typescript
// Custom debounce when lodash exists
function myDebounce(fn, delay) {
  /* ... */
}

// Custom button when we have <Button>
function MySpecialButton() {
  /* ... */
}
```

**DO:**

```typescript
// Use existing solutions
import { debounce } from 'lodash'

// Extend existing components
<Button className="special-styling">Click Me</Button>
```

### ❌ Code Repetition

**DON'T:**

```typescript
// Repeated animation configs
<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
```

**DO:**

```typescript
// Shared animation variants
const fadeUpVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
}

<motion.div variants={fadeUpVariants}>
```

### ❌ Multiple Responsibilities Per File

**DON'T:**

```typescript
// components/HomePage.tsx (1000+ lines)
export function HomePage() {
  // Hero section logic
  // Featured work logic
  // Services logic
  // Contact form logic
  // All in one file!
}
```

**DO:**

```typescript
// app/page.tsx
import { Hero } from '@/components/sections/Hero'
import { FeaturedWork } from '@/components/sections/FeaturedWork'
import { Services } from '@/components/sections/Services'
import { ContactForm } from '@/components/sections/ContactForm'

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedWork />
      <Services />
      <ContactForm />
    </>
  )
}
```

---

## ✅ Component Development Rules

### Rule 1: Check Before You Create

**Before creating a new component:**

```bash
1. Search existing components: /components/ui
2. Check if Next.js has it built-in
3. Check if Tailwind can do it
4. Check if shadcn/ui has it (we can add components)
5. ONLY THEN create a new one
```

### Rule 2: Component Size Limit

**Recommended maximum lines per component file: 250-300**

If your component exceeds 300 lines:

- Split into smaller components
- Extract logic into custom hooks
- Move data to separate files
- Extract sub-components

**Guidelines by component type:**

- Simple UI components (Button, Card): 50-100 lines
- Complex components (Form, Modal): 150-250 lines
- Section components (Hero, FeaturedWork): 200-300 lines
- Page files: Can be longer if just composing sections (400+ OK)

### Rule 3: Component Structure

**Every component file must follow this structure:**

```typescript
// 1. Imports (grouped)
import React from 'react'
import { type ComponentProps } from './types'

// 2. Types/Interfaces (if not in separate file)
interface ButtonProps {
  variant: 'primary' | 'secondary'
  children: React.ReactNode
}

// 3. Component (single responsibility)
export function Button({ variant, children }: ButtonProps) {
  return (
    <button className={`btn-${variant}`}>
      {children}
    </button>
  )
}

// 4. Exports (named exports preferred)
```

### Rule 4: The Rule of Three

**Don't abstract until you've repeated something THREE times**

```typescript
// First time: Write it inline
<div className="rounded-lg border p-4">Content</div>

// Second time: Copy-paste is OK
<div className="rounded-lg border p-4">Content</div>

// Third time: NOW extract to component
<Card>Content</Card>
```

---

## 📁 File Organization Rules

### Rule 5: File Naming Convention

```
Components:     PascalCase.tsx      (Button.tsx, Hero.tsx)
Utils:          camelCase.ts        (formatDate.ts, api.ts)
Data:           kebab-case.ts       (case-studies.ts, experiments.ts)
Types:          kebab-case.types.ts (button.types.ts)
Hooks:          use-*.ts            (use-dark-mode.ts)
```

### Rule 6: Maximum Files Per Directory

**No more than 10 files in a single directory**

If you exceed 10:

- Create subdirectories by feature
- Group related components
- Move to appropriate location

### Rule 7: File Size Limits

```
Component (Simple):    < 100 lines  (Button, Badge, Card)
Component (Complex):   < 250 lines  (Form, Modal, Navigation)
Component (Section):   < 300 lines  (Hero, FeaturedWork, About)
Page:                  < 500 lines  (Can be longer if composing sections)
Utility:               < 100 lines
Data:                  No strict limit (can be large for content)
Hook:                  < 100 lines
```

### Rule 8: Import Organization

**Always group imports in this order:**

```typescript
// 1. React and Next.js
import React from "react";
import { useRouter } from "next/navigation";

// 2. Third-party libraries
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";

// 3. Internal components
import { Button } from "@/components/ui/Button";

// 4. Internal utilities
import { formatDate } from "@/lib/utils/formatDate";

// 5. Types
import type { CaseStudy } from "@/lib/types";

// 6. Styles (if any)
import "./styles.css";
```

---

## 🎨 Styling Rules

### Rule 9: Tailwind First, CSS Last

**Priority order:**

```
1. Use Tailwind utility classes
2. Use Tailwind custom classes in config
3. Use CSS modules (only if Tailwind can't do it)
4. NEVER use inline styles (except for dynamic values)
```

**DON'T:**

```typescript
<div style={{ padding: '16px', margin: '8px' }}>
```

**DO:**

```typescript
<div className="p-4 m-2">
```

### Rule 10: No Magic Numbers in Styles

**DON'T:**

```typescript
<div className="mt-[73px]">
```

**DO:**

```typescript
// Add to tailwind.config.ts
spacing: {
  'header': '80px',
}

<div className="mt-header">
```

---

## 🔧 Utility Function Rules

### Rule 11: Check lib/utils First

**Before creating a utility function:**

```bash
1. Check if it exists in /lib/utils
2. Check if lodash has it
3. Check if Next.js has it
4. ONLY THEN create it
```

### Rule 12: One Function = One File

**DON'T:**

```typescript
// utils/helpers.ts
export function formatDate() {}
export function validateEmail() {}
export function debounce() {}
```

**DO:**

```typescript
// utils/format-date.ts
export function formatDate() {}

// utils/validate-email.ts
export function validateEmail() {}
```

**Exception:** Closely related functions (max 3) can share a file

### Rule 13: Pure Functions Preferred

**Utility functions should be pure (no side effects):**

```typescript
// ✅ GOOD: Pure function
export function formatDate(date: Date): string {
  return date.toLocaleDateString();
}

// ❌ BAD: Side effects
export function formatDate(date: Date): string {
  console.log("Formatting date..."); // Side effect!
  localStorage.setItem("lastFormat", date); // Side effect!
  return date.toLocaleDateString();
}
```

---

## 📦 Data Management Rules

### Rule 14: Data Files Structure

**All static data goes in /lib/data/**

```
lib/data/
├── case-studies.ts       # Case study data
├── experiments.ts        # Vibe Lab experiments
├── insights.ts           # Blog/LinkedIn posts
├── testimonials.ts       # Client testimonials
└── navigation.ts         # Nav links, etc.
```

### Rule 15: Data File Format

**Every data file must export a typed array:**

```typescript
// lib/data/case-studies.ts
export interface CaseStudy {
  id: string;
  title: string;
  slug: string;
  // ...other fields
}

export const caseStudies: CaseStudy[] = [
  {
    id: "case-1",
    title: "Project Name",
    slug: "project-name",
  },
];
```

### Rule 16: No Business Logic in Data Files

**DON'T:**

```typescript
// case-studies.ts
export const caseStudies = [
  {
    id: "case-1",
    featured: calculateIfFeatured(), // ❌ Logic in data file
  },
];
```

**DO:**

```typescript
// case-studies.ts
export const caseStudies = [
  {
    id: "case-1",
    featured: true, // ✅ Just data
  },
];

// lib/utils/get-featured-studies.ts
export function getFeaturedStudies(studies: CaseStudy[]) {
  return studies.filter((s) => s.featured);
}
```

---

## 🎭 Animation Rules

### Rule 17: Shared Animation Variants

**Create reusable animation variants:**

```typescript
// lib/animations/variants.ts
export const fadeUpVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};
```

### Rule 18: Performance-First Animations

**Only animate transform and opacity:**

```typescript
// ✅ GOOD: GPU-accelerated
<motion.div
  initial={{ opacity: 0, x: -20 }}
  animate={{ opacity: 1, x: 0 }}
/>

// ❌ BAD: Causes reflow
<motion.div
  initial={{ width: 0, height: 0 }}
  animate={{ width: 100, height: 100 }}
/>
```

---

## 🧪 Testing & Validation Rules

### Rule 19: Type Everything

**No implicit 'any' types:**

```typescript
// ❌ BAD
function processData(data) {
  return data.map((item) => item.value);
}

// ✅ GOOD
function processData(data: DataItem[]): number[] {
  return data.map((item) => item.value);
}
```

### Rule 20: Props Validation

**All components must have typed props:**

```typescript
// ✅ GOOD
interface ButtonProps {
  variant: "primary" | "secondary";
  onClick?: () => void;
  disabled?: boolean;
  children: React.ReactNode;
}

export function Button({ variant, onClick, disabled, children }: ButtonProps) {
  // ...
}
```

---

## 🚀 Performance Rules

### Rule 21: Image Optimization

**Always use Next.js Image component:**

```typescript
// ❌ BAD
<img src="/images/hero.jpg" alt="Hero" />

// ✅ GOOD
import Image from 'next/image'
<Image
  src="/images/hero.jpg"
  alt="Hero"
  width={1200}
  height={800}
  priority // For above-fold images
/>
```

### Rule 22: Lazy Load Everything Below Fold

```typescript
// For components
const VibeLab = dynamic(() => import('@/components/sections/VibeLab'))

// For images
<Image loading="lazy" />
```

### Rule 23: Bundle Size Awareness

**Before importing a library, check its size:**

```bash
# Check bundle impact
npx next build
# Review the output

# If too large, look for alternatives
```

---

## 💬 Comments & Documentation

### Rule 24: Code Should Be Self-Documenting

**DON'T:**

```typescript
// This function adds two numbers
function add(a, b) {
  return a + b; // Returns the sum
}
```

**DO:**

```typescript
// Only comment WHY, not WHAT
function calculateDiscountedPrice(price: number, discount: number) {
  // Apply discount before tax calculation (business requirement)
  return price * (1 - discount);
}
```

### Rule 25: TODO Comments Format

**Use this format for TODOs:**

```typescript
// TODO(rodrigo): Add error handling for edge case
// FIXME(rodrigo): Animation stutters on mobile
// NOTE(rodrigo): Keep this for Q2 2026 feature
```

---

## 🔄 Refactoring Rules

### Rule 26: Boy Scout Rule

**Leave code better than you found it:**

- Fix obvious issues when you see them
- But: Stay within your current task scope
- Don't go on refactoring tangents

### Rule 27: Refactor Triggers

**Refactor when you encounter:**

- Code repeated 3+ times → Extract to function/component
- File over 150 lines → Split into smaller files
- Deeply nested conditions (3+ levels) → Extract to functions
- Unclear variable names → Rename
- Complex logic → Add comments or simplify

---

## 📝 Git Commit Rules

### Rule 28: Commit Message Format

```
feat: Add dark mode toggle to navigation
fix: Resolve hero animation stutter on mobile
refactor: Extract Hero into smaller components
docs: Update README with setup instructions
style: Format code with Prettier
perf: Optimize image loading on case study page
```

### Rule 29: Commit Size

**Each commit should:**

- Do ONE thing
- Be reversible
- Build successfully
- Pass TypeScript checks

**Too large:** "Implement entire homepage"
**Just right:** "Add Hero section with animations"

---

## 🎯 Context Window Optimization

### Rule 30: Minimize File Lengths

**Keep files reasonably sized to preserve context:**

- Simple components: 50-100 lines
- Complex components: 150-250 lines
- Section components: 200-300 lines
- Utility: 100 lines max
- Data: No strict limit (content-heavy is OK)

### Rule 31: Reference, Don't Duplicate

**When working with Claude Code:**

```typescript
// ✅ GOOD: Reference existing
"Use the Button component from /components/ui/Button.tsx";

// ❌ BAD: Duplicate
"Here's the Button component code again: [1000 lines]";
```

### Rule 32: Use Type Imports

**Save tokens with type imports:**

```typescript
// ✅ GOOD: Type-only import
import type { CaseStudy } from "@/lib/types";

// ❌ BAD: Full import when only type needed
import { CaseStudy } from "@/lib/types";
```

---

## 🎬 Development Workflow

### Step 1: Before Writing Code

```
1. Read the specifications
2. Check if it already exists
3. Check if a library can do it
4. Plan the file structure
5. Write types first
```

### Step 2: While Writing Code

```
1. Follow the rules above
2. Keep files small (one responsibility)
3. Test as you go
4. Use TypeScript strictly
5. Write self-documenting code
```

### Step 3: After Writing Code

```
1. Review against this checklist
2. Remove unused imports
3. Format with Prettier
4. Check TypeScript errors
5. Test in browser
6. Commit with clear message
```

---

## 🚨 Red Flags Checklist

**Stop and refactor if you see:**

```
□ Simple component over 150 lines
□ Complex component over 300 lines
□ Function over 50 lines
□ Repeated code 3+ times
□ 4+ levels of nesting
□ Any 'any' types
□ Commented-out code
□ Unused imports
□ Magic numbers
□ Unclear variable names (x, data, temp, etc.)
□ Multiple responsibilities in one file
```

---

## 📚 Quick Reference Commands

**For Claude Code:**

```
"Check if this component already exists in /components"
"Is there a utility function for [task] in /lib/utils?"
"Show me the design system colors from tailwind.config"
"List all animation variants in /lib/animations"
"What's the file size of [component]?"
```

**For Development:**

```bash
# Check bundle size
npm run build

# Type check
npm run type-check

# Lint
npm run lint

# Format
npm run format
```

---

## ✅ Pre-Commit Checklist

Before every commit:

```
□ TypeScript compiles without errors
□ No console.log() statements left
□ No commented-out code
□ Imports are organized
□ File sizes within limits
□ Follows component structure
□ No repeated code
□ No over-engineering
□ Follows specifications
```

---

## 🎓 Golden Rules Summary

1. **Simple beats complex**
2. **Reuse before creating**
3. **One file, one purpose**
4. **Small files, clear names**
5. **Tailwind first, CSS last**
6. **Type everything**
7. **Performance matters**
8. **Test as you build**
9. **Git commits are small**
10. **Context window is precious**

---

## 🤖 For Claude Code Specifically

**Start every session with:**

```
"I'm working on the Rodrigo Seoane portfolio project.
Reference /website-redesign-specifications.md for requirements.
Follow /development-guidelines.md for code standards.
Check existing components before creating new ones."
```

**When asking for code:**

```
"Keep files under 150 lines"
"Check if this exists first"
"Use existing design system from tailwind.config"
"Follow TypeScript strictly"
"No over-engineering"
```

---

**Last Updated:** January 28, 2026  
**Status:** Active - Reference for ALL Development  
**Review:** Before every coding session

**Remember:** These rules exist to make your life easier, not harder. They keep the codebase maintainable, the context window light, and the project on track. When in doubt, choose simplicity. 🚀
