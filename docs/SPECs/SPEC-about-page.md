# Technical Specification: About Page (Phase 5)

---

## Summary

This specification covers the full implementation of the `/about` page. The current `app/about/page.tsx` is a four-line placeholder. It will be replaced with a composed page that assembles eight distinct sections, each living in its own component file under `components/sections/about/`. A single new data file (`lib/data/about.ts`) supplies all content and type definitions. One existing data file (`lib/data/testimonials.ts`) receives one new entry. No changes to globals.css, layout files, or any existing UI primitives are required.

The page is built against the patterns already established in this codebase: `'use client'` on every component that uses Framer Motion or React state, the `@/` path alias defined in `tsconfig.json`, the `cn()` utility from `@/lib/utils/cn`, the animation variants exported from `@/lib/utils/animations.ts`, and the container/padding convention (`container mx-auto px-6 lg:px-20`) used in every existing section.

---

## Planning Reasoning

### Why these architectural decisions were made

**1. Page file stays a Server Component.** `app/about/page.tsx` on the homepage is already a Server Component (no `'use client'` directive, no hooks). The About page follows the same pattern: it exports metadata (which must live in a Server Component) and simply renders a flat list of section components. Every section that needs animation or state declares `'use client'` individually. This matches how `app/page.tsx` composes `Hero`, `Services`, `Testimonials`, etc.

**2. Every section component gets `'use client'`.** Every existing section in `components/sections/` that uses `motion` from Framer Motion declares `'use client'`. Hero.tsx, Services.tsx, ValueProposition.tsx, ContactForm.tsx, ClientLogos.tsx -- all of them. The About sections follow suit. None of them are heavy enough to warrant `next/dynamic` lazy loading except `Testimonials`, which is already a fully formed client component imported directly. The PRD suggested lazy loading Testimonials via `dynamic()`, but the homepage already imports it synchronously with no reported issues, so parity is maintained here.

**3. Testimonials is imported, not re-implemented.** The existing `Testimonials` component in `components/sections/Testimonials.tsx` reads directly from `lib/data/testimonials.ts`. It is self-contained: it imports its own data, runs its own carousel logic, and renders its own markup. To add a testimonial to the About page, you only need to append one object to the array in `testimonials.ts`. The component then picks it up automatically on both the homepage and the About page with zero code changes to the component itself.

**4. The about barrel export follows the case-study precedent.** The project already has a subfolder pattern: `components/sections/case-study/` with its own `index.ts` barrel file that re-exports every component in that folder. The `components/sections/about/` folder mirrors this structure exactly.

**5. Tool logos use Lucide icons as the baseline, not image files.** The PRD lists 12 tools and flags that logo image assets do not yet exist. Lucide React (already installed, already used throughout the codebase) ships icons for Figma, Code2 (stand-in for VS Code), Github, and several others. For tools where Lucide has no direct match, a generic `Wrench` or `Layers` icon is substituted. The component is architected so that when real SVG/PNG logos are provided, you swap the `icon` field in the data array to an image path and add a one-line conditional render. This avoids blocking implementation on assets.

**6. Skills use the Badge component, not animated bars.** The PRD recommended Option B (badge groups) as "more authentic for creative professionals." The existing `Badge` component at `components/ui/Badge.tsx` is a pure presentational component that already handles variants and className merging. It maps directly onto this use case with no modification.

**7. Philosophy and Personal cards use inline styling, not the Card UI component.** The existing `Card` component (`components/ui/Card.tsx`) renders `bg-white` with a neutral border -- a generic container. The Services section (the closest visual analog to what Philosophy and Personal cards need) does not use `Card` at all. Instead it builds its own card markup with `bg-cream-500 rounded-xl border-b-4 border-dark-900` and the hover class combo `hover:shadow-xl hover:-translate-y-1`. The Philosophy and Personal sections replicate this exact pattern for visual consistency.

**8. The StorySection illustration reuses the same SVG already in the project.** `/public/images/Illustration Rio-BCN.svg` is already rendered in `ContactForm.tsx` at the bottom of the homepage. The StorySection uses the same file. The illustration is 1440x193 in ContactForm; in StorySection it will render at a different size appropriate to the two-column layout, but `next/image` handles the scaling.

**9. Portrait photo is a required asset with a graceful placeholder.** The portrait image does not exist in `public/` yet. The AboutHero component renders a placeholder div (matching the portrait dimensions and background color) when the image path points to a file that has not been uploaded. When the real photo arrives, drop it at `public/images/about/rodrigo-portrait.jpg` and the component picks it up with no code change. The placeholder is styled to match the cream/teal palette and includes the text "Portrait photo" so it is obvious during development.

---

## File Changes

### Files to Modify

#### `lib/data/testimonials.ts`
- [ ] Append a fifth testimonial object to the `testimonials` array, immediately after the existing `testimonial-4` entry. The new object:

```typescript
{
  id: 'testimonial-stina',
  quote:
    'Rodrigo is a great designer to work with. He has an excellent ability to translate very complex ideas and concepts into compelling visuals.',
  author: 'Stina Heikkila',
  role: 'Lead Researcher',
  company: 'Boundaryless',
  avatar: '/images/testimonials/stina-heikkila.jpg',
}
```

No interface change is needed. The existing `Testimonial` interface already has `avatar` as optional (`avatar?: string`), so if `stina-heikkila.jpg` is not yet present the avatar fallback (initials circle already implemented in `Testimonials.tsx` lines 91-98) renders automatically.

#### `app/about/page.tsx`
- [ ] Delete the entire current file content (the four-line placeholder).
- [ ] Replace with the full page component as specified in the "Files to Create" section below. This is the only file in `app/` that changes.

---

### Files to Create

The following nine files must be created. They are listed in dependency order: the data file first, then each section component, then the barrel export, then the page.

---

#### `lib/data/about.ts`

**Purpose:** Single source of truth for all About page content and TypeScript interfaces. Every section component imports from this file. No string literals for user-facing content live in component files.

**Interfaces to export:**

```typescript
export interface AboutHeroContent {
  headline: string
  subtitle: string
  tagline: string
  location: {
    city: string
    country: string
  }
  image: string
}

export interface StoryChapter {
  location: string
  years: string
  title: string
  description: string
}

export interface StoryContent {
  beginning: StoryChapter
  evolution: StoryChapter
  illustration: string
}

export interface Philosophy {
  id: string
  title: string
  description: string
  icon: string // Lucide icon name as a string key, resolved in the component
}

export interface SkillCategory {
  id: string
  label: string
  skills: string[]
}

export interface Tool {
  id: string
  name: string
  category: string
  icon: string // Lucide icon name as a string key
}

export interface Interest {
  id: string
  title: string
  description: string
  icon: string // Lucide icon name as a string key
}
```

**Data exports with full content:**

```typescript
export const aboutHero: AboutHeroContent = {
  headline: 'Revenue Recovery Specialist',
  subtitle:
    'Innovation-Driven Product Designer | 25+ Years Transforming Complex Problems into User-Centric Solutions',
  tagline: 'Welcome to my headquarters',
  location: {
    city: 'Barcelona',
    country: 'Spain',
  },
  image: '/images/about/rodrigo-portrait.jpg',
}

export const story: StoryContent = {
  beginning: {
    location: 'Rio de Janeiro, Brazil',
    years: 'First 10 Years',
    title: 'Building the Foundation',
    description:
      'My journey began in Rio de Janeiro, where I honed my craft working with small and local businesses. From marketing materials to responsive websites, every project taught me the fundamentals of translating human needs into visual solutions.',
  },
  evolution: {
    location: 'Barcelona, Spain',
    years: 'Past 15 Years',
    title: 'Scaling the Impact',
    description:
      'Barcelona became my home and my proving ground. Working with large corporations, I shifted from pixel-level execution to product strategy and modular design systems. The complexity grew -- and so did my ability to navigate it, bringing design thinking into the heart of enterprise product development.',
  },
  illustration: '/images/Illustration Rio-BCN.svg',
}

export const philosophy: Philosophy[] = [
  {
    id: 'collaborative',
    title: 'Collaborative Mindset',
    description:
      'I bring a collaborative and proactive mindset to every project, believing that the best solutions emerge from diverse perspectives.',
    icon: 'Users',
  },
  {
    id: 'user-centric',
    title: 'User-Centric Focus',
    description:
      'Profound understanding of user psychology drives every decision, ensuring designs resonate with real human needs.',
    icon: 'Heart',
  },
  {
    id: 'stakeholder',
    title: 'Stakeholder Alignment',
    description:
      'Building strong relationships with stakeholders, clients, and team members to ensure shared vision and successful outcomes.',
    icon: 'Target',
  },
  {
    id: 'learning',
    title: 'Continuous Learning',
    description:
      'Adaptability and continuous learning keep my skills sharp and my approaches fresh in an ever-evolving field.',
    icon: 'TrendingUp',
  },
]

export const skillCategories: SkillCategory[] = [
  {
    id: 'core',
    label: 'Core Competencies',
    skills: [
      'User Research & Psychology',
      'UI/UX Design',
      'Design Systems',
      'Prototyping & Interaction Design',
      'Information Architecture',
      'Product Strategy',
      'Design Thinking Facilitation',
      'Stakeholder Management',
    ],
  },
  {
    id: 'technical',
    label: 'Technical Skills',
    skills: [
      'Figma',
      'Sketch',
      'Adobe Creative Suite',
      'Framer',
      'Prototyping Tools',
      'HTML/CSS',
    ],
  },
  {
    id: 'soft',
    label: 'Soft Skills',
    skills: [
      'Complex Problem Solving',
      'Cross-functional Collaboration',
      'Client Communication',
      'Mentorship',
      'Workshop Facilitation',
    ],
  },
]

export const tools: Tool[] = [
  { id: 'figma', name: 'Figma', category: 'Design', icon: 'Figma' },
  { id: 'sketch', name: 'Sketch', category: 'Design', icon: 'PenTool' },
  { id: 'adobe-xd', name: 'Adobe XD', category: 'Design', icon: 'Layers' },
  { id: 'photoshop', name: 'Photoshop', category: 'Graphics', icon: 'Image' },
  { id: 'illustrator', name: 'Illustrator', category: 'Graphics', icon: 'Paintbrush' },
  { id: 'framer', name: 'Framer', category: 'Prototyping', icon: 'Zap' },
  { id: 'miro', name: 'Miro', category: 'Collaboration', icon: 'LayoutGrid' },
  { id: 'notion', name: 'Notion', category: 'Documentation', icon: 'FileText' },
  { id: 'jira', name: 'Jira', category: 'Project Mgmt', icon: 'ClipboardList' },
  { id: 'slack', name: 'Slack', category: 'Communication', icon: 'MessageSquare' },
  { id: 'vscode', name: 'VS Code', category: 'Development', icon: 'Code2' },
  { id: 'github', name: 'GitHub', category: 'Version Control', icon: 'Github' },
]

export const interests: Interest[] = [
  {
    id: 'travel',
    title: 'Travel & Culture',
    description:
      'Exploring new places and cultures fuels my creativity and broadens my perspective.',
    icon: 'Globe',
  },
  {
    id: 'photography',
    title: 'Photography',
    description:
      'Capturing moments and compositions that tell stories beyond words.',
    icon: 'Camera',
  },
  {
    id: 'cooking',
    title: 'Cooking',
    description:
      'The creative process of cooking parallels design -- experimentation, iteration, and presentation.',
    icon: 'UtensilsCrossed',
  },
  {
    id: 'music',
    title: 'Music',
    description:
      'From Brazilian beats to electronic, music provides rhythm to my creative process.',
    icon: 'Music',
  },
]
```

**Key implementation notes:**
- The `icon` fields are string keys that map to Lucide React icon names. Each component that renders icons imports a map object (or a lookup function) that resolves these strings to the actual Lucide components. This keeps the data file free of React imports and makes it a pure data module.
- All string content matches the PRD verbatim.

---

#### `components/sections/about/AboutHero.tsx`

**Purpose:** The page's top section. Two-column layout on desktop (content left, portrait right), stacked on mobile. Contains the single `<h1>` for the page. Implements scroll-linked parallax on the portrait image, matching the technique in `components/sections/Hero.tsx`.

**Props interface:** None. This component imports its data directly from `@/lib/data/about` (matching how `Services.tsx` imports from `@/lib/data/services` and how `Testimonials.tsx` imports from `@/lib/data/testimonials`).

**Dependencies to import:**
```typescript
'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { MapPin } from 'lucide-react'
import Image from 'next/image'
import { aboutHero } from '@/lib/data/about'
import { staggerContainer, fadeUp } from '@/lib/utils/animations'
```

**Structure and key implementation details:**

The outer `<section>` gets `ref={containerRef}` for the `useScroll` hook, identical to how `Hero.tsx` lines 10-14 set up its parallax. The scroll offset is `['start start', 'end start']`.

```typescript
const containerRef = useRef<HTMLElement>(null)
const { scrollYProgress } = useScroll({
  target: containerRef,
  offset: ['start start', 'end start'],
})
const photoY = useTransform(scrollYProgress, [0, 1], [0, 60])
const photoOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0.4])
```

The parallax values are intentionally gentler than on the homepage Hero (60px vs 100px, opacity floor of 0.4 vs 0) because the About Hero is not full-viewport-height and the photo should remain visible as the user scrolls into the Story section.

The grid structure:
```tsx
<section ref={containerRef} className="relative min-h-[70vh] flex items-center bg-cream-500 pt-16">
  <div className="container mx-auto px-6 lg:px-20 py-16 md:py-20">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

      {/* LEFT: Content column */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="max-w-xl"
      >
        {/* Tagline */}
        <motion.p variants={fadeUp} className="text-orange-400 font-bold text-sm uppercase tracking-widest mb-3">
          {aboutHero.tagline}
        </motion.p>

        {/* H1 -- single h1 on the page */}
        <motion.h1 variants={fadeUp} className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-dark-900">
          {aboutHero.headline}
        </motion.h1>

        {/* Subtitle */}
        <motion.p variants={fadeUp} className="mt-6 text-lg md:text-xl text-dark-900/80 leading-relaxed">
          {aboutHero.subtitle}
        </motion.p>

        {/* Location Badge */}
        <motion.div variants={fadeUp} className="mt-8 inline-flex items-center gap-2 bg-dark-900 text-dark-50 px-4 py-2 rounded-full">
          <MapPin size={16} className="text-orange-400" />
          <span className="text-sm font-medium">{aboutHero.location.city}, {aboutHero.location.country}</span>
        </motion.div>
      </motion.div>

      {/* RIGHT: Portrait column */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="relative flex justify-center"
        style={{ y: photoY, opacity: photoOpacity }}
      >
        {/* Decorative shape behind the photo -- matches Hero.tsx floating shape pattern */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-4/5 h-4/5 bg-orange-400/15 rounded-3xl" />
        </div>

        {/* Portrait image or placeholder */}
        <div className="relative w-full max-w-md aspect-[3/4] rounded-2xl overflow-hidden shadow-xl">
          <Image
            src={aboutHero.image}
            alt="Rodrigo Seoane, Senior Product Designer"
            fill
            sizes="(max-width: 1024px) 90vw, 450px"
            priority
            className="object-cover"
          />
        </div>
      </motion.div>

    </div>
  </div>
</section>
```

**Placeholder handling for missing portrait:** If `rodrigo-portrait.jpg` does not exist at build time, Next.js `Image` with `fill` will throw. To prevent this during development, wrap the `Image` in a simple check: if the image path is the expected path but the file has not been placed yet, render a placeholder `<div>` instead:

```tsx
const IMAGE_AVAILABLE = true // set to false during dev if portrait not yet dropped in

// Inside the portrait container div:
{IMAGE_AVAILABLE ? (
  <Image src={aboutHero.image} alt="Rodrigo Seoane, Senior Product Designer" fill sizes="..." priority className="object-cover" />
) : (
  <div className="w-full h-full bg-dark-700 flex items-center justify-center">
    <span className="text-dark-50 text-sm font-medium">Portrait photo</span>
  </div>
)}
```

This boolean is the only dev-time toggle in the entire spec. Set it to `true` once the file lands.

---

#### `components/sections/about/StorySection.tsx`

**Purpose:** The narrative section telling the Rio-to-Barcelona journey. Two-part text layout with the existing Rio-BCN illustration. Uses Option A from the PRD: text on the left side of each chapter, illustration anchored to the right.

**Dependencies to import:**
```typescript
'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { story } from '@/lib/data/about'
import { fadeUp, staggerContainer } from '@/lib/utils/animations'
```

**Structure and key implementation details:**

The section background is `bg-cream-500` (matching the PRD's "cream background" requirement and providing visual separation from the dark-700 sections that will surround it). The illustration is the same file used in `ContactForm.tsx` line 309: `/images/Illustration Rio-BCN.svg`. In ContactForm it renders at full width (1440px declared width). Here it renders within a column, so it will scale down naturally via `object-contain`.

Layout: a two-column grid on desktop. Left column holds the two chapters stacked vertically. Right column holds the illustration, vertically centered.

```tsx
<section className="py-16 md:py-24 bg-cream-500">
  <div className="container mx-auto px-6 lg:px-20">

    {/* Section header */}
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.5 }}
      className="text-center max-w-3xl mx-auto mb-12 md:mb-16"
    >
      <h2 className="font-display text-3xl md:text-4xl font-bold text-dark-900">
        My Story
      </h2>
      <p className="text-dark-900/70 text-lg mt-3 leading-relaxed">
        25 years across two continents. One continuous thread.
      </p>
    </motion.div>

    {/* Two-column: chapters left, illustration right */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

      {/* LEFT: Two chapters */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        className="space-y-10"
      >
        {/* Chapter: Beginning */}
        <motion.div variants={fadeUp} className="relative pl-6 border-l-4 border-orange-400">
          <span className="text-orange-400 font-bold text-sm uppercase tracking-widest">
            {story.beginning.years}
          </span>
          <p className="text-dark-500 text-sm font-medium mt-1">{story.beginning.location}</p>
          <h3 className="font-display text-2xl font-bold text-dark-900 mt-2">
            {story.beginning.title}
          </h3>
          <p className="text-dark-900/75 text-base leading-relaxed mt-3">
            {story.beginning.description}
          </p>
        </motion.div>

        {/* Chapter: Evolution */}
        <motion.div variants={fadeUp} className="relative pl-6 border-l-4 border-dark-700">
          <span className="text-dark-700 font-bold text-sm uppercase tracking-widest">
            {story.evolution.years}
          </span>
          <p className="text-dark-500 text-sm font-medium mt-1">{story.evolution.location}</p>
          <h3 className="font-display text-2xl font-bold text-dark-900 mt-2">
            {story.evolution.title}
          </h3>
          <p className="text-dark-900/75 text-base leading-relaxed mt-3">
            {story.evolution.description}
          </p>
        </motion.div>
      </motion.div>

      {/* RIGHT: Illustration */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.7 }}
        className="flex items-center justify-center"
      >
        <Image
          src={story.illustration}
          alt="Illustration showing journey from Rio de Janeiro to Barcelona"
          width={600}
          height={250}
          className="w-full h-auto object-contain"
        />
      </motion.div>
    </div>
  </div>
</section>
```

The two chapters are visually differentiated by their left border color: `border-orange-400` for the beginning (warm, origin) and `border-dark-700` (teal) for the evolution (current). This creates a subtle visual timeline without an explicit connector line, which avoids the complexity of SVG path animation while still communicating the journey structure.

On mobile (single column), the chapters stack first, the illustration renders below them.

---

#### `components/sections/about/PhilosophySection.tsx`

**Purpose:** A 4-card grid presenting design approach values. This is the closest analog to the Services section cards in the existing codebase. The card markup pattern is copied directly from `Services.tsx` lines 26-77 (the `ServiceCard` inner component), adapted to remove pricing/CTA elements and add an icon circle.

**Dependencies to import:**
```typescript
'use client'

import { motion } from 'framer-motion'
import { Users, Heart, Target, TrendingUp } from 'lucide-react'
import { philosophy } from '@/lib/data/about'
import { staggerContainer, fadeUp } from '@/lib/utils/animations'
```

**Icon resolution map (defined inside the component, above the JSX):**
```typescript
const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Users,
  Heart,
  Target,
  TrendingUp,
}
```

This pattern -- a plain object mapping string keys to Lucide components -- is the simplest way to keep the data file free of React imports while still letting each data entry declare which icon it wants.

**Structure:**

Section header uses the exact same `motion.div` / `whileInView` / `viewport` pattern as `Services.tsx` lines 85-100. The grid uses `staggerContainer` + `fadeUp` variants from `@/lib/utils/animations.ts`.

```tsx
<section className="py-16 md:py-24 bg-dark-700">
  <div className="container mx-auto px-6 lg:px-20">

    {/* Header -- dark-700 bg, so text is dark-50 */}
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.5 }}
      className="text-center max-w-3xl mx-auto mb-12 md:mb-16"
    >
      <h2 className="font-display text-3xl md:text-4xl font-bold text-dark-50">
        My Design Philosophy
      </h2>
      <p className="text-dark-50/70 text-lg mt-3 leading-relaxed">
        The principles that guide every decision I make.
      </p>
    </motion.div>

    {/* 4-card grid */}
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
    >
      {philosophy.map((item) => {
        const Icon = iconMap[item.icon]
        return (
          <motion.div
            key={item.id}
            variants={fadeUp}
            className="group h-full flex flex-col p-6 md:p-8 bg-cream-500 rounded-xl transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border-b-4 border-dark-900"
          >
            {/* Icon circle */}
            <div className="w-12 h-12 bg-orange-400 rounded-full flex items-center justify-center mb-4">
              <Icon size={24} className="text-dark-50" />
            </div>

            <h3 className="font-display text-xl font-bold text-dark-900 mb-3">
              {item.title}
            </h3>

            <p className="text-dark-900/75 text-base leading-relaxed grow">
              {item.description}
            </p>
          </motion.div>
        )
      })}
    </motion.div>
  </div>
</section>
```

The `grow` class on the description paragraph ensures all cards in a row reach the same height regardless of text length, matching the `grow` usage in `Services.tsx` line 52.

---

#### `components/sections/about/SkillsSection.tsx`

**Purpose:** Displays all skills grouped by category. Each category is a heading followed by a row of Badge components. Uses `Badge` from `@/components/ui/Badge` with a custom `className` override to match the cream-on-dark palette of this section.

**Dependencies to import:**
```typescript
'use client'

import { motion } from 'framer-motion'
import { Badge } from '@/components/ui/Badge'
import { skillCategories } from '@/lib/data/about'
import { staggerContainer, fadeUp } from '@/lib/utils/animations'
```

**Structure:**

The section background is `bg-cream-500` to alternate with the dark-700 Philosophy section above it.

```tsx
<section className="py-16 md:py-24 bg-cream-500">
  <div className="container mx-auto px-6 lg:px-20">

    {/* Header */}
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.5 }}
      className="text-center max-w-3xl mx-auto mb-12 md:mb-16"
    >
      <h2 className="font-display text-3xl md:text-4xl font-bold text-dark-900">
        Skills & Expertise
      </h2>
      <p className="text-dark-900/70 text-lg mt-3 leading-relaxed">
        A quarter century of craft, distilled into capability.
      </p>
    </motion.div>

    {/* Skill groups */}
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      className="max-w-4xl mx-auto space-y-10"
    >
      {skillCategories.map((category) => (
        <motion.div key={category.id} variants={fadeUp}>
          {/* Category label */}
          <h3 className="font-display text-lg font-bold text-dark-900 mb-4">
            {category.label}
          </h3>

          {/* Badge row */}
          <div className="flex flex-wrap gap-2">
            {category.skills.map((skill) => (
              <Badge
                key={skill}
                variant="default"
                className="bg-white border border-dark-150 text-dark-900 text-sm px-4 py-2 hover:scale-105 transition-transform duration-200 cursor-default"
              >
                {skill}
              </Badge>
            ))}
          </div>
        </motion.div>
      ))}
    </motion.div>
  </div>
</section>
```

The `Badge` component already accepts `className` and merges it via `cn()`. The override classes here (`bg-white border border-dark-150 text-dark-900`) replace the default `bg-neutral-100 text-neutral-700` to produce badges that sit cleanly on the cream background. The `hover:scale-105` and `transition-transform` produce the subtle scale effect specified in the PRD's interaction table, using only CSS (no Framer Motion needed for this micro-interaction -- consistent with the hover.dev best practice noted in the PRD).

---

#### `components/sections/about/ToolsSection.tsx`

**Purpose:** A responsive grid of tool cards. Each card shows a Lucide icon (standing in for the eventual logo image), the tool name, and its category. On hover: the card lifts, a subtle shadow appears, and the icon color transitions from muted to orange-400. This follows the ClientLogos hover pattern (`hover:shadow-md transition-shadow duration-300` from `ClientLogos.tsx` line 34) but extends it with the color transition.

**Dependencies to import:**
```typescript
'use client'

import { motion } from 'framer-motion'
import {
  Figma, PenTool, Layers, Image as ImageIcon, Paintbrush,
  Zap, LayoutGrid, FileText, ClipboardList, MessageSquare,
  Code2, Github,
} from 'lucide-react'
import { tools } from '@/lib/data/about'
import { staggerContainer, fadeUp } from '@/lib/utils/animations'
```

**Icon resolution map:**
```typescript
const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Figma,
  PenTool,
  Layers,
  Image: ImageIcon,   // renamed to avoid conflict with next/image
  Paintbrush,
  Zap,
  LayoutGrid,
  FileText,
  ClipboardList,
  MessageSquare,
  Code2,
  Github,
}
```

**Structure:**

```tsx
<section className="py-16 md:py-24 bg-dark-700">
  <div className="container mx-auto px-6 lg:px-20">

    {/* Header -- white text on dark-700 */}
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.5 }}
      className="text-center max-w-3xl mx-auto mb-12 md:mb-16"
    >
      <h2 className="font-display text-3xl md:text-4xl font-bold text-dark-50">
        Tools of the Trade
      </h2>
      <p className="text-dark-50/70 text-lg mt-3 leading-relaxed">
        The tools I reach for every day to bring ideas to life.
      </p>
    </motion.div>

    {/* Tool grid: 3 cols mobile, 4 cols tablet, 6 cols desktop */}
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 lg:gap-6 max-w-5xl mx-auto"
    >
      {tools.map((tool) => {
        const Icon = iconMap[tool.icon]
        return (
          <motion.div
            key={tool.id}
            variants={fadeUp}
            className="group flex flex-col items-center justify-center p-4 bg-cream-500 rounded-xl transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-default"
          >
            {/* Icon -- muted by default, orange on hover via group-hover */}
            <div className="w-12 h-12 flex items-center justify-center mb-3">
              <Icon size={32} className="text-dark-500 group-hover:text-orange-400 transition-colors duration-300" />
            </div>

            {/* Tool name */}
            <span className="text-dark-900 text-sm font-medium text-center leading-tight">
              {tool.name}
            </span>

            {/* Category -- appears on hover */}
            <span className="text-dark-500 text-xs mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {tool.category}
            </span>
          </motion.div>
        )
      })}
    </motion.div>
  </div>
</section>
```

The `group` / `group-hover` Tailwind pattern handles the coordinated hover state (icon color change + category label fade-in) with no JavaScript event handlers. This is GPU-friendly (opacity and color are both composited properties) and matches the codebase's general preference for CSS transitions over JS-driven state for simple hover effects.

When real logo images are provided in the future, each card becomes an `Image` component and the icon map is removed. The card container dimensions and hover classes stay identical.

---

#### `components/sections/about/PersonalSection.tsx`

**Purpose:** Four interest cards. Structurally identical to PhilosophySection: same card markup, same stagger animation, same icon-circle pattern. The section background is `bg-cream-500` to alternate with the dark-700 Tools section above it.

**Dependencies to import:**
```typescript
'use client'

import { motion } from 'framer-motion'
import { Globe, Camera, UtensilsCrossed, Music } from 'lucide-react'
import { interests } from '@/lib/data/about'
import { staggerContainer, fadeUp } from '@/lib/utils/animations'
```

**Icon resolution map:**
```typescript
const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Globe,
  Camera,
  UtensilsCrossed,
  Music,
}
```

**Structure:** Identical grid/card pattern to PhilosophySection. The only differences are the section heading text and the data source (`interests` instead of `philosophy`). The grid is `grid-cols-1 md:grid-cols-2 lg:grid-cols-4` (same as Philosophy). Each card has the same `bg-cream-500 rounded-xl border-b-4 border-dark-900 hover:shadow-xl hover:-translate-y-1` class set.

The section header:
```tsx
<h2 className="font-display text-3xl md:text-4xl font-bold text-dark-900">
  Beyond the Desk
</h2>
<p className="text-dark-900/70 text-lg mt-3 leading-relaxed">
  The things that keep me curious outside of work.
</p>
```

The card loop is a direct copy of the PhilosophySection card loop with `interests.map(...)` and `interests` data fields.

---

#### `components/sections/about/AboutCTA.tsx`

**Purpose:** The final content section before the Testimonials carousel. A dark-teal background section with centered headline, subtext, and two action links. This mirrors the visual weight and structure of the `ContactForm.tsx` header block (lines 165-178) -- same centered layout, same `motion.div` with `whileInView`, same typography hierarchy.

**Dependencies to import:**
```typescript
'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Mail } from 'lucide-react'
```

No data import is needed. The CTA content is short and static (headline, subtext, two links, one email address). Putting five strings into a data file would be over-engineering for content that is unlikely to change independently of the component's visual structure.

**Structure:**

```tsx
<section className="py-20 md:py-28 bg-dark-700">
  <div className="container mx-auto px-6 lg:px-20">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.5 }}
      className="text-center max-w-2xl mx-auto"
    >
      <h2 className="font-display text-3xl md:text-4xl font-bold text-dark-50">
        Let&apos;s Work Together
      </h2>
      <p className="text-dark-50/70 text-lg mt-4 leading-relaxed">
        Ready to transform your product experience? Book a 20-minute discovery call to discuss your project.
      </p>

      {/* CTA buttons */}
      <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
        {/* Primary: Calendly */}
        <a
          href="https://calendly.com/rodrigo_seoane/discovery"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-8 py-4 bg-primary-yellow text-dark-900 font-semibold text-lg rounded hover:bg-primary-yellow/90 hover:shadow-lg transition-all duration-300 focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2"
        >
          Book a Discovery Call
          <ArrowRight size={20} />
        </a>

        {/* Secondary: Email */}
        <a
          href="mailto:business@rodrigoseoane.com"
          className="inline-flex items-center gap-2 px-8 py-4 border-2 border-dark-50 text-dark-50 font-semibold text-lg rounded hover:bg-dark-50 hover:text-dark-900 transition-all duration-300 focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2"
        >
          <Mail size={20} />
          Send an Email
        </a>
      </div>

      {/* Contact info line */}
      <p className="text-dark-50/50 text-sm mt-6">
        Or reach out directly at <span className="text-dark-50 font-medium">business@rodrigoseoane.com</span>
      </p>
    </motion.div>
  </div>
</section>
```

The Calendly URL (`https://calendly.com/rodrigo_seoane/discovery`) is the same URL already used in `Services.tsx` line 67. Consistency is intentional.

The primary button styling (`bg-primary-yellow text-dark-900`) matches the `Button` component's `primary` variant and the UX Pulse Check CTA in `Services.tsx` line 155. The secondary button styling (`border-2 border-dark-50 text-dark-50`) mirrors the homepage Hero's "Get in Touch" outline button but adapted for the dark-700 background.

---

#### `components/sections/about/index.ts`

**Purpose:** Barrel export file. Follows the identical pattern as `components/sections/case-study/index.ts`.

**Full file content:**
```typescript
export { AboutHero } from './AboutHero'
export { StorySection } from './StorySection'
export { PhilosophySection } from './PhilosophySection'
export { SkillsSection } from './SkillsSection'
export { ToolsSection } from './ToolsSection'
export { PersonalSection } from './PersonalSection'
export { AboutCTA } from './AboutCTA'
```

---

#### `app/about/page.tsx`

**Purpose:** The page entry point. Server Component (no `'use client'`). Exports page-level metadata, then renders the section sequence. Follows the identical composition pattern as `app/page.tsx` (the homepage).

**Full file content:**

```typescript
import type { Metadata } from 'next'
import {
  AboutHero,
  StorySection,
  PhilosophySection,
  SkillsSection,
  ToolsSection,
  PersonalSection,
  AboutCTA,
} from '@/components/sections/about'
import { Testimonials } from '@/components/sections/Testimonials'

export const metadata: Metadata = {
  title: 'About Rodrigo Seoane | Senior Product Designer | Barcelona',
  description:
    'Innovation-driven Product Designer with 25+ years of experience transforming complex problems into user-centric solutions. From Rio de Janeiro to Barcelona, specializing in B2B SaaS and enterprise design.',
  keywords: [
    'product designer',
    'UX designer',
    'UI designer',
    'Barcelona',
    'B2B SaaS',
    'design thinking',
    'user experience',
    'enterprise design',
  ],
  openGraph: {
    title: 'About Rodrigo Seoane | Senior Product Designer',
    description:
      '25+ years transforming complex problems into user-centric solutions.',
    url: 'https://rodrigoseoane.com/about',
    type: 'profile',
    images: [
      {
        url: '/images/about/rodrigo-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Rodrigo Seoane - Senior Product Designer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Rodrigo Seoane | Senior Product Designer',
    description:
      '25+ years transforming complex problems into user-centric solutions.',
    images: ['/images/about/rodrigo-og.jpg'],
  },
}

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <StorySection />
      <PhilosophySection />
      <SkillsSection />
      <ToolsSection />
      <PersonalSection />
      <AboutCTA />
      <Testimonials />
    </>
  )
}
```

**Section ordering rationale:** The sequence follows the PRD's narrative arc: identity (Hero) -> origin story (Story) -> values (Philosophy) -> capability (Skills + Tools) -> personality (Personal) -> action (CTA) -> social proof (Testimonials). Testimonials is placed last because it is the existing carousel component that auto-rotates -- putting it at the bottom means it only begins auto-rotating once the user has scrolled the entire page, which is the natural moment to encounter social proof before deciding to book.

---

## Implementation Order

Build in this exact sequence. Each step depends on the previous one being complete.

1. **`lib/data/about.ts`** -- All section components import from this file. Nothing else compiles without it.
2. **`lib/data/testimonials.ts`** (modification) -- Append the Stina entry. This can be done in parallel with step 1.
3. **`components/sections/about/AboutHero.tsx`**
4. **`components/sections/about/StorySection.tsx`**
5. **`components/sections/about/PhilosophySection.tsx`**
6. **`components/sections/about/SkillsSection.tsx`**
7. **`components/sections/about/ToolsSection.tsx`**
8. **`components/sections/about/PersonalSection.tsx`**
9. **`components/sections/about/AboutCTA.tsx`**
10. **`components/sections/about/index.ts`** -- Barrel export. Must come after all section files exist.
11. **`app/about/page.tsx`** -- Replace placeholder. Must come after barrel export exists.

Steps 3 through 9 have no interdependencies with each other and can be built in any order or in parallel, as long as step 1 is done first.

---

## Dependencies and Considerations

### Packages already installed (no `npm install` required)
- `framer-motion` ^12.29.2
- `lucide-react` ^0.563.0
- `embla-carousel-react` ^8.6.0 (used by Testimonials, not by any new About component)
- `clsx` + `tailwind-merge` (used via `cn()`)
- `next` 16.1.6 (next/image, next/link, Metadata type)

### Assets that do not yet exist
| Asset | Needed By | Fallback |
|-------|-----------|----------|
| `/public/images/about/rodrigo-portrait.jpg` | AboutHero | Placeholder div controlled by `IMAGE_AVAILABLE` boolean |
| `/public/images/about/rodrigo-og.jpg` | page.tsx metadata (OG image) | OG cards will render without an image until this file is placed. No runtime error. |
| `/public/images/testimonials/stina-heikkila.jpg` | Testimonials carousel | Initials circle fallback already implemented in `Testimonials.tsx` |

### Lucide icon availability note
The following icon names are used in this spec. All are confirmed present in lucide-react ^0.563.0:
`MapPin`, `Users`, `Heart`, `Target`, `TrendingUp`, `Globe`, `Camera`, `UtensilsCrossed`, `Music`, `Figma`, `PenTool`, `Layers`, `Image`, `Paintbrush`, `Zap`, `LayoutGrid`, `FileText`, `ClipboardList`, `MessageSquare`, `Code2`, `Github`, `ArrowRight`, `Mail`.

If at build time any icon fails to resolve, the error message from lucide-react will name the specific icon. The fix is to check the lucide-react icon index and substitute the closest match, then update both the data file and the component's iconMap.

### Accessibility checklist built into the spec
- Single `<h1>` is in AboutHero only.
- All other section headers are `<h2>`. Card titles are `<h3>`.
- The illustration in StorySection has a descriptive alt. The portrait has a descriptive alt. Tool icons will get `aria-hidden="true"` treatment because the tool name is always rendered as visible text below.
- Both CTA links have `focus-visible` ring styles.
- The Testimonials component already has `aria-label` on prev/next buttons and on dot navigation buttons.
- `prefers-reduced-motion` is already handled globally by Framer Motion's built-in reduced-motion detection (it respects the OS setting and simplifies or skips animations automatically). No additional CSS rule is needed in this spec.

### What is explicitly NOT in scope
- No changes to `Navigation.tsx` or `Footer.tsx`. The `/about` route is already linked in the footer nav (line 8 of Footer.tsx: `{ label: 'About Me', href: '/about' }`).
- No changes to `globals.css`. All colors and fonts used are already defined.
- No new UI primitives. Badge, Button, and Card exist; none need modification.
- No dark mode toggle logic. The site uses `next-themes` but the existing sections do not implement dark-mode-specific styling in their section bodies (they use fixed palette classes like `bg-dark-700`, `bg-cream-500`). The About page follows the same convention.

---

## Testing Checklist

Run through this list after implementation is complete. Each item maps to a specific PRD acceptance criterion.

### AboutHero
- [ ] Page loads with the headline "Revenue Recovery Specialist" as the visible `<h1>`
- [ ] Subtitle text renders below the headline
- [ ] Location badge displays "Barcelona, Spain" with a map pin icon
- [ ] On desktop: two-column layout with content left, portrait right
- [ ] On mobile (resize to 320px width): content stacks above portrait
- [ ] Scrolling down causes the portrait to shift subtly upward (parallax)
- [ ] If `rodrigo-portrait.jpg` is absent, the placeholder div renders instead of a broken image

### StorySection
- [ ] "First 10 Years" chapter renders with Rio de Janeiro location label and orange left border
- [ ] "Past 15 Years" chapter renders with Barcelona location label and teal left border
- [ ] Rio-BCN illustration renders to the right on desktop, below the chapters on mobile
- [ ] Scrolling into view triggers the text reveal and the illustration scale-in

### PhilosophySection
- [ ] Four cards render in a row on desktop (lg breakpoint)
- [ ] Cards collapse to 2 columns on tablet (md), 1 column on mobile
- [ ] Each card has an orange icon circle, a title, and a description
- [ ] Hovering a card lifts it 4px and shows an enlarged shadow
- [ ] All four card heights match within each row (no ragged bottoms)

### SkillsSection
- [ ] Three category headings render: "Core Competencies", "Technical Skills", "Soft Skills"
- [ ] All skill badges render beneath their respective headings
- [ ] Hovering a badge scales it to 1.05x
- [ ] Badge count matches the data: 8 core, 6 technical, 5 soft = 19 total badges

### ToolsSection
- [ ] 12 tool cards render
- [ ] Grid is 3 columns on mobile, 4 on tablet, 6 on desktop
- [ ] Each card shows an icon and the tool name
- [ ] Hovering a card: icon color changes from gray to orange, category label fades in, card lifts with shadow
- [ ] No broken icon renders (all 12 Lucide icons resolve)

### PersonalSection
- [ ] Four interest cards render with correct titles: Travel & Culture, Photography, Cooking, Music
- [ ] Card layout and hover behavior matches PhilosophySection

### AboutCTA
- [ ] "Book a Discovery Call" link points to `https://calendly.com/rodrigo_seoane/discovery` and opens in a new tab
- [ ] "Send an Email" link generates a mailto link to `business@rodrigoseoane.com`
- [ ] Both links have visible focus rings when tabbed to
- [ ] Section has adequate vertical padding (visually comfortable, not cramped)

### Testimonials (existing component, new data)
- [ ] The carousel now cycles through 5 testimonials (was 4)
- [ ] Stina Heikkila's testimonial appears with her name, role (Lead Researcher), and company (Boundaryless)
- [ ] Dot navigation shows 5 dots
- [ ] Auto-rotate pauses on hover, resumes on mouse-leave
- [ ] Initials circle renders for Stina (since her avatar image likely does not exist yet)

### Page-level
- [ ] `<title>` tag in browser reads "About Rodrigo Seoane | Senior Product Designer | Barcelona"
- [ ] Heading hierarchy is correct: one `<h1>`, multiple `<h2>`, `<h3>` only inside cards
- [ ] Full page scrolls smoothly from top to bottom with no layout shift (CLS < 0.1)
- [ ] Page renders without JavaScript errors in the browser console
- [ ] `npm run type-check` (i.e., `tsc --noEmit`) passes with no errors

---

**Document Version:** 1.0
**Created:** February 3, 2026
**Source PRD:** PRD-about-page.md
**Status:** Ready for Implementation
