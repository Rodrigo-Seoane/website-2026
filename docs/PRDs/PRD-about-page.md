# PRD: About Page

## Overview

This PRD documents the requirements for implementing the About page (`/about`) for Rodrigo Seoane's portfolio website as part of Phase 5 of the implementation plan. The About page serves as a personal brand storytelling hub, showcasing Rodrigo's 25+ years of design experience, his journey from Rio de Janeiro to Barcelona, his design philosophy, skills, tools expertise, and personal interests.

**Target Timeline:** Week 4 (Feb 17-23, 2026)
**Priority:** High - Core page for personal branding and client trust-building

---

## User Stories

### Primary Users
1. **Prospective Clients** - Evaluating Rodrigo for design projects
2. **Recruiters/Hiring Managers** - Assessing fit for full-time or contract roles
3. **Collaborators** - Fellow designers, developers, or product managers seeking partnerships
4. **General Visitors** - People discovering Rodrigo through referrals or content

### User Stories

| ID | As a... | I want to... | So that... |
|----|---------|--------------|------------|
| US-1 | Prospective client | Quickly understand Rodrigo's expertise and experience | I can assess if he's the right fit for my project |
| US-2 | Prospective client | See testimonials from past clients | I can build trust and confidence in his work |
| US-3 | Hiring manager | Understand his background and career trajectory | I can evaluate his experience level and growth |
| US-4 | Collaborator | Learn about his design philosophy and approach | I can determine compatibility for working together |
| US-5 | Any visitor | Know what tools and technologies he uses | I can understand his technical capabilities |
| US-6 | Any visitor | Get a sense of his personality beyond work | I can connect with him on a personal level |
| US-7 | Any visitor | Easily book a discovery call | I can take the next step in engaging his services |

---

## Affected Codebase Files

### Pages (New/Modified)
- `/Users/rodrigo.seoane/local-sites/portfolio-2026/app/about/page.tsx` - **MODIFY** - Currently placeholder, needs full implementation

### Components to Create
- `/Users/rodrigo.seoane/local-sites/portfolio-2026/components/sections/about/AboutHero.tsx` - **NEW** - Hero section with photo, headline, location badge
- `/Users/rodrigo.seoane/local-sites/portfolio-2026/components/sections/about/StorySection.tsx` - **NEW** - Rio to Barcelona journey narrative
- `/Users/rodrigo.seoane/local-sites/portfolio-2026/components/sections/about/PhilosophySection.tsx` - **NEW** - 3-4 approach cards
- `/Users/rodrigo.seoane/local-sites/portfolio-2026/components/sections/about/SkillsSection.tsx` - **NEW** - Visual skills representation
- `/Users/rodrigo.seoane/local-sites/portfolio-2026/components/sections/about/ToolsSection.tsx` - **NEW** - Logo grid with hover effects
- `/Users/rodrigo.seoane/local-sites/portfolio-2026/components/sections/about/PersonalSection.tsx` - **NEW** - Interest cards
- `/Users/rodrigo.seoane/local-sites/portfolio-2026/components/sections/about/AboutCTA.tsx` - **NEW** - "Let's Work Together" call-to-action
- `/Users/rodrigo.seoane/local-sites/portfolio-2026/components/sections/about/index.ts` - **NEW** - Barrel export

### Data Files to Create
- `/Users/rodrigo.seoane/local-sites/portfolio-2026/lib/data/about.ts` - **NEW** - About page data (skills, tools, interests, philosophy)

### Existing Components to Reuse
- `/Users/rodrigo.seoane/local-sites/portfolio-2026/components/sections/Testimonials.tsx` - **REUSE** - Already implemented with Embla Carousel
- `/Users/rodrigo.seoane/local-sites/portfolio-2026/components/ui/Card.tsx` - **REUSE** - For philosophy/interest cards
- `/Users/rodrigo.seoane/local-sites/portfolio-2026/components/ui/Badge.tsx` - **REUSE** - For location and skill badges
- `/Users/rodrigo.seoane/local-sites/portfolio-2026/components/ui/Button.tsx` - **REUSE** - For CTAs

### Assets Required
- `/Users/rodrigo.seoane/local-sites/portfolio-2026/public/images/about/rodrigo-portrait.jpg` - **NEEDED** - Large professional photo
- `/Users/rodrigo.seoane/local-sites/portfolio-2026/public/images/about/rodrigo-secondary.jpg` - **NEEDED** - Optional secondary photo
- `/Users/rodrigo.seoane/local-sites/portfolio-2026/public/images/tools/*.{svg,png}` - **NEEDED** - Tool logos (Figma, Sketch, Framer, etc.)
- `/Users/rodrigo.seoane/local-sites/portfolio-2026/public/images/Illustration Rio-BCN.svg` - **EXISTS** - Rio to Barcelona illustration

### Configuration
- `/Users/rodrigo.seoane/local-sites/portfolio-2026/lib/data/testimonials.ts` - **MODIFY** - Add real testimonial (Stina Heikkila from Boundaryless)

---

## Internal Implementation Patterns

### Pattern 1: Section Layout with Animation
**Source:** `/Users/rodrigo.seoane/local-sites/portfolio-2026/components/sections/Services.tsx`
**Relevance:** Demonstrates standard section structure with stagger animations

```typescript
// Section structure pattern
<section className="py-16 md:py-24 bg-dark-700">
  <div className="container mx-auto px-6 lg:px-20">
    {/* Header */}
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.5 }}
      className="text-center max-w-3xl mx-auto mb-12 md:mb-16"
    >
      {/* Section title and description */}
    </motion.div>

    {/* Content Grid */}
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8"
    >
      {/* Cards */}
    </motion.div>
  </div>
</section>
```

### Pattern 2: Card Component with Hover Effects
**Source:** `/Users/rodrigo.seoane/local-sites/portfolio-2026/components/sections/Services.tsx`
**Relevance:** Card design pattern for philosophy and interest sections

```typescript
// Service card pattern adaptable for philosophy/interest cards
<div className="group h-full flex flex-col p-6 md:p-8 bg-cream-500 rounded-xl transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border-b-4 border-dark-900">
  {/* Icon */}
  <div className="w-12 h-12 bg-orange-400 rounded-full flex items-center justify-center">
    <Image src={icon} alt="" width={32} height={32} />
  </div>

  {/* Title */}
  <h3 className="font-display text-2xl md:text-3xl font-bold text-dark-900 mb-3">
    {title}
  </h3>

  {/* Description/Content */}
  <p className="text-dark-900/80 text-base leading-relaxed">
    {description}
  </p>
</div>
```

### Pattern 3: Hero Section with Parallax
**Source:** `/Users/rodrigo.seoane/local-sites/portfolio-2026/components/sections/Hero.tsx`
**Relevance:** Hero layout with scroll parallax effects

```typescript
const containerRef = useRef<HTMLElement>(null)
const { scrollYProgress } = useScroll({
  target: containerRef,
  offset: ['start start', 'end start'],
})

const y = useTransform(scrollYProgress, [0, 1], [0, 100])
const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

// Grid layout: content left, visual right
<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
  <motion.div style={{ y, opacity }}>
    {/* Content */}
  </motion.div>
  <motion.div>
    {/* Visual/Image */}
  </motion.div>
</div>
```

### Pattern 4: Testimonials Carousel (Reusable)
**Source:** `/Users/rodrigo.seoane/local-sites/portfolio-2026/components/sections/Testimonials.tsx`
**Relevance:** Directly reusable for About page testimonials section

```typescript
// Embla Carousel implementation
const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true })
const [selectedIndex, setSelectedIndex] = useState(0)
const [isPaused, setIsPaused] = useState(false)

// Auto-rotate every 5 seconds with pause on hover
useEffect(() => {
  if (!emblaApi || isPaused) return
  const intervalId = setInterval(() => emblaApi.scrollNext(), 5000)
  return () => clearInterval(intervalId)
}, [emblaApi, isPaused])
```

### Pattern 5: Animation Variants
**Source:** `/Users/rodrigo.seoane/local-sites/portfolio-2026/lib/utils/animations.ts`
**Relevance:** Consistent animation patterns across the site

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

### Pattern 6: Client Logos Grid (Adaptable for Tools)
**Source:** `/Users/rodrigo.seoane/local-sites/portfolio-2026/components/sections/ClientLogos.tsx`
**Relevance:** Logo display pattern adaptable for tools section

```typescript
// Logo item with hover effect
<div className="w-[165px] h-[100px] bg-cream-500 rounded flex items-center justify-center p-4 hover:shadow-md transition-shadow duration-300">
  <Image
    src={logo}
    alt={name}
    width={124}
    height={50}
    className="object-contain max-h-12 w-auto mix-blend-multiply"
  />
</div>
```

---

## Documentation Excerpts

### Framer Motion - Scroll Animations
**Source:** https://motion.dev/docs/react-scroll-animations
**Key Points:**
- Use `useScroll` hook for scroll-linked animations
- `whileInView` prop triggers animations when element enters viewport
- `viewport={{ once: true }}` ensures animation plays only once
- Combine with `useTransform` for parallax effects

```typescript
import { motion, useScroll, useTransform } from 'framer-motion'

// Parallax effect
const { scrollYProgress } = useScroll()
const y = useTransform(scrollYProgress, [0, 1], [0, -100])

// Scroll-triggered animation
<motion.div
  initial={{ opacity: 0, y: 50 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, amount: 0.3 }}
/>
```

### Next.js - Server vs Client Components
**Source:** https://nextjs.org/docs/app/getting-started/server-and-client-components
**Key Points:**
- Server Components by default (no 'use client' directive needed)
- Add 'use client' only for components using useState, useEffect, event handlers
- Keep Client Components "leaf-level" and small
- About page can be mostly Server Component with interactive islands

```typescript
// Server Component (default) - no directive needed
export default function AboutPage() {
  return (
    <>
      <AboutHero />        {/* Could be server rendered */}
      <StorySection />     {/* Server rendered */}
      <SkillsSection />    {/* Server rendered with client island for animations */}
    </>
  )
}

// Client Component island
'use client'
export function AnimatedSkillBar({ skill }: Props) {
  // Interactive logic here
}
```

### WCAG Accessibility Guidelines
**Source:** https://www.w3.org/TR/WCAG21/
**Key Points:**
- Minimum contrast ratio 4.5:1 for text, 3:1 for large text
- Logical heading hierarchy (h1 -> h6)
- Alt text for all meaningful images
- Keyboard navigation for all interactive elements
- Focus states must be visible
- Touch targets minimum 44x44 pixels

### Tailwind CSS - Design Tokens
**Source:** Project globals.css (`/Users/rodrigo.seoane/local-sites/portfolio-2026/app/globals.css`)
**Key Points:**
- Primary yellow: `#ffd115` (--color-primary-yellow)
- Orange accent: `#ef8c48` (--color-orange-400)
- Cream background: `#fff9f0` (--color-cream-500)
- Dark teal: `#2e5e5e` (--color-dark-700)
- Dark text: `#080d00` (--color-dark-900)
- Font display: Plus Jakarta Sans
- Font body: Inter

---

## External Implementation Patterns

### From Medium: Interactive Hover Grid Animation
**Source:** https://medium.com/@yash140498/how-to-build-an-interactive-hover-grid-animation-step-by-step-guide-with-next-js-and-react-hooks-718180dd8eb9
**Pattern:** For tools grid hover effects

```typescript
// Hover effect tracking with mouse position
const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
  const rect = e.currentTarget.getBoundingClientRect()
  const x = e.clientX - rect.left
  const y = e.clientY - rect.top
  setMousePosition({ x, y })
}

// Tool card with glow effect on hover
<div
  className="relative group"
  onMouseMove={handleMouseMove}
  style={{
    '--mouse-x': `${mousePosition.x}px`,
    '--mouse-y': `${mousePosition.y}px`,
  } as React.CSSProperties}
>
  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-radial from-orange-400/30 to-transparent"
       style={{ background: `radial-gradient(circle at var(--mouse-x) var(--mouse-y), rgba(239, 140, 72, 0.3), transparent 50%)` }} />
</div>
```

### From Dribbble Blog: Portfolio Storytelling
**Source:** https://dribbble.com/stories/2024/03/18/crafting-a-narrative-mastering-storytelling-in-your-design-portfolio
**Key Insights:**
- Structure story with beginning (origin), middle (journey), end (current state)
- Use visual timeline or geographical markers for journey narrative
- Include personal reflections that humanize the professional story
- Balance vulnerability with professionalism

### From Workik: Skill Set Visualization
**Source:** https://workik.com/top-six-skill-set-widgets-for-websites
**Pattern:** Skills visualization approaches

```typescript
// Skill bar approach
<div className="space-y-4">
  {skills.map(skill => (
    <div key={skill.name}>
      <div className="flex justify-between mb-1">
        <span className="font-medium">{skill.name}</span>
        <span>{skill.level}%</span>
      </div>
      <div className="h-2 bg-dark-150 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="h-full bg-orange-400 rounded-full"
        />
      </div>
    </div>
  ))}
</div>

// Alternative: Skill categories with badges
<div className="flex flex-wrap gap-2">
  {skills.map(skill => (
    <Badge key={skill} variant="default">{skill}</Badge>
  ))}
</div>
```

### From Hover.dev: CSS Hover Effects Best Practices
**Source:** https://www.hover.dev/
**Key Insights:**
- Use CSS transitions for simple hover effects (better performance)
- Framer Motion for complex, physics-based animations
- Keep hover animations subtle (200-300ms duration)
- Avoid mixing hover with functional elements on mobile
- Use `transform` and `opacity` for GPU-accelerated animations

---

## Feature Requirements

### Section 1: About Hero

**Layout:**
- Two-column layout on desktop (content left, photo right)
- Stack vertically on mobile (content first, then photo)
- Full-width container with standard padding

**Content Requirements:**
| Element | Content | Notes |
|---------|---------|-------|
| Headline | "Revenue Recovery Specialist" | Primary headline, font-display, bold |
| Subtitle | "Innovation-Driven Product Designer \| 25+ Years Transforming Complex Problems into User-Centric Solutions" | Secondary text |
| Location Badge | Barcelona, Spain | With map pin icon |
| Tagline | "Welcome to my headquarters" | Optional decorative text |

**Visual Requirements:**
- Large professional portrait photo (minimum 600x800px)
- Photo should have subtle parallax on scroll
- Rounded corners on image (rounded-2xl)
- Optional: floating decorative shapes (see Hero.tsx pattern)

**Animation Requirements:**
- Headline fade-up on page load
- Subtitle staggered fade-up (0.1s delay)
- Location badge fade-in (0.2s delay)
- Photo slide-in from right (0.3s delay)

### Section 2: Story (Rio to Barcelona Journey)

**Layout:**
- Full-width section with cream background
- Two-part narrative: text with timeline/illustration
- Option A: Text left, illustration right
- Option B: Centered text with illustration below

**Content Requirements:**

**Part 1: The Beginning (First 10 Years)**
```
Origin: Rio de Janeiro, Brazil
Focus: Creative design work with small/local businesses
Work Type: Marketing materials and responsive websites
Theme: Building foundations, learning the craft
```

**Part 2: The Evolution (Past 15 Years)**
```
Location: Barcelona, Spain (current)
Focus: Large corporations implementing design thinking
Work Type: Product strategy to modular component design
Theme: Scaling impact, enterprise expertise
```

**Visual Requirements:**
- Use existing illustration: `/public/images/Illustration Rio-BCN.svg`
- Consider animated path/timeline connecting the two locations
- Optional: Flag icons for Brazil and Spain

**Animation Requirements:**
- Text sections reveal on scroll
- Illustration animates in (fade + scale)
- Optional: SVG path animation for journey line

### Section 3: Philosophy (Design Approach Cards)

**Layout:**
- 3-4 cards in a responsive grid
- Desktop: 3 or 4 columns
- Tablet: 2 columns
- Mobile: 1 column

**Content Requirements:**

| Card | Title | Description | Icon |
|------|-------|-------------|------|
| 1 | Collaborative Mindset | "I bring a collaborative and proactive mindset to every project, believing that the best solutions emerge from diverse perspectives." | Partnership/Handshake |
| 2 | User-Centric Focus | "Profound understanding of user psychology drives every decision, ensuring designs resonate with real human needs." | User/Heart |
| 3 | Stakeholder Alignment | "Building strong relationships with stakeholders, clients, and team members to ensure shared vision and successful outcomes." | Team/Connect |
| 4 | Continuous Learning | "Adaptability and continuous learning keep my skills sharp and my approaches fresh in an ever-evolving field." | Growth/Book |

**Visual Requirements:**
- Each card has an icon (use existing SVG icons or Lucide)
- Hover: lift effect (-4px translateY) + enhanced shadow
- Border-bottom accent color (orange-400)
- Consistent card height across row

**Animation Requirements:**
- Staggered fade-up on scroll into view
- Icon scale animation on card hover

### Section 4: Skills Visualization

**Layout:**
- Two approaches to consider:
  - **Option A:** Skill bars with percentages (more quantitative)
  - **Option B:** Skill categories with badges (more qualitative)
- Recommendation: Option B is more authentic for creative professionals

**Content Requirements:**

**Core Competencies:**
```
- User Research & Psychology
- UI/UX Design
- Design Systems
- Prototyping & Interaction Design
- Information Architecture
- Product Strategy
- Design Thinking Facilitation
- Stakeholder Management
```

**Technical Skills:**
```
- Figma (Primary tool)
- Sketch
- Adobe Creative Suite
- Framer
- Prototyping tools
- HTML/CSS basics
```

**Soft Skills:**
```
- Complex Problem Solving
- Cross-functional Collaboration
- Client Communication
- Mentorship
- Workshop Facilitation
```

**Visual Requirements:**
- Group skills by category
- Use Badge component for individual skills
- Visual hierarchy: category headings with skill badges below
- Alternative: Animated skill bars filling on scroll

**Animation Requirements:**
- Staggered reveal of skill groups
- If using bars: animate fill width on scroll
- Badge hover: subtle scale (1.05)

### Section 5: Tools

**Layout:**
- Grid of tool logos
- Desktop: 6 columns
- Tablet: 4 columns
- Mobile: 3 columns

**Content Requirements (Tools to Display):**
| Tool | Category | Logo Required |
|------|----------|---------------|
| Figma | Design | Yes |
| Sketch | Design | Yes |
| Adobe XD | Design | Yes |
| Photoshop | Graphics | Yes |
| Illustrator | Graphics | Yes |
| Framer | Prototyping | Yes |
| Miro | Collaboration | Yes |
| Notion | Documentation | Yes |
| Jira | Project Management | Yes |
| Slack | Communication | Yes |
| VS Code | Development | Yes |
| GitHub | Version Control | Yes |

**Visual Requirements:**
- Each logo in a card container (similar to ClientLogos pattern)
- Grayscale by default, color on hover
- Subtle shadow on hover
- Tool name appears below/on hover

**Animation Requirements:**
- Grid items fade in with stagger
- Hover: scale(1.05) + color transition + shadow
- Optional: cursor glow effect following mouse

### Section 6: Personal Interests

**Layout:**
- 3-4 interest cards in responsive grid
- Similar layout to Philosophy section

**Content Requirements:**
| Interest | Description | Icon/Visual |
|----------|-------------|-------------|
| Travel & Culture | "Exploring new places and cultures fuels my creativity and broadens my perspective." | Globe/Plane |
| Photography | "Capturing moments and compositions that tell stories beyond words." | Camera |
| Cooking | "The creative process of cooking parallels design - experimentation, iteration, and presentation." | Chef/Utensils |
| Music | "From Brazilian beats to electronic, music provides rhythm to my creative process." | Music/Headphones |

**Visual Requirements:**
- Card with icon and text
- Optional: background image/illustration per card
- Hover effects consistent with Philosophy cards

**Animation Requirements:**
- Staggered fade-up reveal
- Subtle hover animation

### Section 7: Testimonials (Reuse Existing)

**Implementation:**
- Import and use existing `Testimonials` component
- Add Stina Heikkila testimonial to data file

**Content to Add:**
```typescript
{
  id: 'testimonial-stina',
  quote: "Rodrigo is a great designer to work with. He has an excellent ability to translate very complex ideas and concepts into compelling visuals.",
  author: 'Stina Heikkila',
  role: 'Lead Researcher',
  company: 'Boundaryless',
  avatar: '/images/testimonials/stina-heikkila.jpg', // if available
}
```

### Section 8: CTA (Call to Action)

**Layout:**
- Full-width section with contrasting background
- Centered content
- Primary CTA button prominent

**Content Requirements:**
| Element | Content |
|---------|---------|
| Headline | "Let's Work Together" |
| Subtext | "Ready to transform your product experience? Book a 20-minute discovery call to discuss your project." |
| Primary CTA | "Book a Discovery Call" -> Calendly link |
| Secondary CTA | "Send an Email" -> mailto:business@rodrigoseoane.com |
| Contact Info | business@rodrigoseoane.com |

**Visual Requirements:**
- Dark or teal background (dark-700)
- Yellow primary button
- Secondary link-style button
- Ample padding (py-20 or more)

**Animation Requirements:**
- Content fade-up on scroll
- Button hover animations (existing Button component)

---

## Data Structure Specifications

### `/lib/data/about.ts`

```typescript
// Types
export interface Philosophy {
  id: string
  title: string
  description: string
  icon: string // Lucide icon name
}

export interface Skill {
  name: string
  category: 'core' | 'technical' | 'soft'
  level?: number // 0-100 if using bars
}

export interface Tool {
  id: string
  name: string
  category: 'design' | 'graphics' | 'prototyping' | 'collaboration' | 'development'
  logo: string // path to logo image
  url?: string // official website
}

export interface Interest {
  id: string
  title: string
  description: string
  icon: string // Lucide icon name
  image?: string // optional background image
}

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

export interface StoryContent {
  beginning: {
    location: string
    years: string
    title: string
    description: string
  }
  evolution: {
    location: string
    years: string
    title: string
    description: string
  }
  illustration: string
}

// Data exports
export const aboutHero: AboutHeroContent = { /* ... */ }
export const story: StoryContent = { /* ... */ }
export const philosophy: Philosophy[] = [ /* ... */ ]
export const skills: Skill[] = [ /* ... */ ]
export const tools: Tool[] = [ /* ... */ ]
export const interests: Interest[] = [ /* ... */ ]
```

---

## Interaction Specifications

### Scroll Animations
| Section | Trigger | Animation | Duration |
|---------|---------|-----------|----------|
| Hero | Page load | Stagger fade-up | 0.5s per element |
| Story | Scroll into view (30% visible) | Fade-up + slide | 0.6s |
| Philosophy Cards | Scroll into view | Stagger fade-up | 0.4s per card |
| Skills | Scroll into view | Stagger reveal by group | 0.3s per group |
| Tools Grid | Scroll into view | Stagger fade-in | 0.1s per item |
| Personal | Scroll into view | Stagger fade-up | 0.4s per card |
| Testimonials | Auto-rotate | Fade transition | 0.3s, 5s interval |
| CTA | Scroll into view | Fade-up | 0.5s |

### Hover States
| Element | Hover Effect | Duration |
|---------|--------------|----------|
| Philosophy Card | translateY(-4px), shadow-xl | 0.3s |
| Tool Logo | scale(1.05), grayscale(0), shadow | 0.3s |
| Interest Card | translateY(-4px), shadow-xl | 0.3s |
| Primary Button | scale(1.05), shadow-lg | 0.2s |
| Secondary Button | scale(1.02) | 0.2s |

### Focus States
- All interactive elements must have visible focus rings
- Use `focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2`

### Click/Tap Behavior
| Element | Action |
|---------|--------|
| Discovery Call CTA | Opens Calendly in new tab |
| Email CTA | Opens default mail client |
| Tool Logo (optional) | Opens tool website in new tab |
| Testimonial Dots | Jump to specific testimonial |
| Testimonial Arrows | Navigate prev/next |

---

## Accessibility Requirements

### WCAG 2.1 AA Compliance

**Semantic HTML:**
- Single `<h1>` for page title (in Hero)
- Logical heading hierarchy (`<h2>` for sections, `<h3>` for cards)
- Use `<section>` with `aria-labelledby` for each major section
- Use `<ul>` / `<li>` for skill lists
- Use `<blockquote>` for testimonials

**Images:**
- Alt text for portrait photo: "Rodrigo Seoane, Senior Product Designer"
- Alt text for illustration: "Illustration showing journey from Rio de Janeiro to Barcelona"
- Tool logos: `alt="{Tool Name} logo"`
- Decorative images: `alt=""`

**Color Contrast:**
- All text meets 4.5:1 minimum contrast ratio
- Large text (24px+) meets 3:1 minimum
- Interactive elements have 3:1 contrast with background

**Keyboard Navigation:**
- All interactive elements accessible via Tab
- Logical tab order follows visual layout
- Testimonial carousel navigable with arrow keys
- Focus trap in any modal (if applicable)
- Escape key closes any overlays

**Screen Reader Support:**
- Testimonial carousel announces current slide ("Testimonial 1 of 4")
- Section headings are descriptive
- Button text is descriptive ("Book a Discovery Call" not "Click here")

**Motion:**
- Respect `prefers-reduced-motion` media query
- Disable auto-rotate on testimonials if reduced motion preferred
- Simplify or disable parallax effects

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

**Touch Targets:**
- All interactive elements minimum 44x44px
- Adequate spacing between touch targets

---

## Performance Considerations

### Image Optimization
- Use `next/image` for all images
- Portrait photo: Serve WebP format with JPEG fallback
- Tool logos: Use SVG where possible, otherwise optimized PNG
- Lazy load images below the fold
- Set explicit `width` and `height` to prevent layout shift

```typescript
<Image
  src="/images/about/rodrigo-portrait.jpg"
  alt="Rodrigo Seoane, Senior Product Designer"
  width={600}
  height={800}
  priority // for above-fold hero image
  className="object-cover rounded-2xl"
/>
```

### Bundle Size
- Keep About page as Server Component where possible
- Use 'use client' only for interactive sections
- Lazy load Testimonials carousel (below fold)
- Consider dynamic import for heavy animations

```typescript
import dynamic from 'next/dynamic'

const Testimonials = dynamic(
  () => import('@/components/sections/Testimonials').then(mod => mod.Testimonials),
  { loading: () => <div className="h-64 animate-pulse bg-cream-500" /> }
)
```

### Animation Performance
- Use `transform` and `opacity` for animations (GPU accelerated)
- Avoid animating `width`, `height`, `margin`, `padding`
- Use `will-change` sparingly for heavy animations
- Disable complex animations on mobile or low-power devices

### Metrics Targets
| Metric | Target |
|--------|--------|
| LCP | < 2.5s |
| FID | < 100ms |
| CLS | < 0.1 |
| Page weight | < 500KB (excluding images) |
| Image budget | < 800KB total |

---

## SEO Metadata

```typescript
// app/about/page.tsx
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Rodrigo Seoane | Senior Product Designer | Barcelona',
  description: 'Innovation-driven Product Designer with 25+ years of experience transforming complex problems into user-centric solutions. From Rio de Janeiro to Barcelona, specializing in B2B SaaS and enterprise design.',
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
    description: '25+ years transforming complex problems into user-centric solutions.',
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
    description: '25+ years transforming complex problems into user-centric solutions.',
    images: ['/images/about/rodrigo-og.jpg'],
  },
}
```

---

## Acceptance Criteria

### Hero Section
- [ ] Large portrait photo displays correctly
- [ ] Headline and subtitle render with correct typography
- [ ] Location badge shows with map pin icon
- [ ] Parallax effect works on scroll
- [ ] Responsive: stacks on mobile, side-by-side on desktop
- [ ] Photo loads with priority (no lazy loading)

### Story Section
- [ ] Both narrative parts (beginning/evolution) display
- [ ] Rio-BCN illustration renders
- [ ] Scroll animation triggers correctly
- [ ] Responsive layout works on all breakpoints

### Philosophy Section
- [ ] 3-4 philosophy cards display in grid
- [ ] Each card has icon, title, description
- [ ] Hover effect (lift + shadow) works
- [ ] Stagger animation on scroll
- [ ] Responsive: 1 col mobile, 2 col tablet, 3-4 col desktop

### Skills Section
- [ ] Skills grouped by category
- [ ] All skills visible and readable
- [ ] Animation on scroll (if using bars)
- [ ] Responsive layout

### Tools Section
- [ ] Logo grid displays all tools
- [ ] Grayscale to color hover effect works
- [ ] Tool names visible (below or on hover)
- [ ] Responsive: 3 col mobile, 4 col tablet, 6 col desktop

### Personal Section
- [ ] 3-4 interest cards display
- [ ] Each card has icon, title, description
- [ ] Hover effects work
- [ ] Responsive layout

### Testimonials Section
- [ ] Carousel loads and auto-rotates
- [ ] Pause on hover works
- [ ] Navigation (dots and arrows) functional
- [ ] Real testimonial (Stina) displays
- [ ] Accessible (keyboard nav, screen reader)

### CTA Section
- [ ] "Book a Discovery Call" links to Calendly
- [ ] "Send Email" opens mail client
- [ ] Contact info visible
- [ ] Responsive and properly padded

### Cross-Cutting
- [ ] All sections have scroll animations
- [ ] Dark mode styling (if applicable, check site-wide)
- [ ] Mobile responsive (320px to 1440px+)
- [ ] WCAG AA accessibility compliance
- [ ] Page metadata correct
- [ ] prefers-reduced-motion respected
- [ ] Performance targets met

---

## Dependencies

### Internal Dependencies
- Testimonials component must be functional
- Animation utilities must be available
- UI components (Card, Badge, Button) must be complete
- Design tokens in globals.css must be correct

### External Dependencies
- Embla Carousel (already installed)
- Framer Motion (already installed)
- Lucide React icons (already installed)
- Next/Image (built-in)

### Assets Dependencies
- Portrait photo must be provided by client
- Tool logos must be sourced (SVG preferred)
- Secondary photos (optional) from client

---

## Risks and Mitigations

| Risk | Impact | Likelihood | Mitigation |
|------|--------|------------|------------|
| Portrait photo not ready | High | Medium | Use placeholder with clear dimensions; design component to swap easily |
| Tool logos not available | Medium | Low | Use text-based fallback or generic icons; source from official brand assets |
| Performance issues with animations | Medium | Medium | Test on low-end devices; implement prefers-reduced-motion; lazy load sections |
| Testimonial content not approved | Low | Low | Use existing testimonials data; Stina quote is from public source |
| Story content needs refinement | Low | Medium | Start with provided content; component should accept props for easy updates |

---

## Open Questions

1. **Photo assets:** Does the client have a professional portrait photo ready? What secondary photos are available for personal interests section?

2. **Tool logos:** Should we source SVG logos ourselves or will the client provide? Any licensing concerns?

3. **Skills visualization:** Preference between skill bars (quantitative) vs. badge groups (qualitative)?

4. **Testimonials:** Should we add more testimonials beyond Stina Heikkila? Any other quotes to include?

5. **Personal interests:** Are the suggested interests accurate? Should they be different?

6. **Dark mode:** Should the About page support dark mode, or is it light-mode only like some sections?

7. **Language:** Is the content in English only, or should we plan for Portuguese/Spanish translations in future?

---

## References

### Internal Files
- `/Users/rodrigo.seoane/local-sites/portfolio-2026/IMPLEMENTATION_PLAN.md`
- `/Users/rodrigo.seoane/local-sites/portfolio-2026/DELIVERABLES.md`
- `/Users/rodrigo.seoane/local-sites/portfolio-2026/components/sections/Testimonials.tsx`
- `/Users/rodrigo.seoane/local-sites/portfolio-2026/components/sections/Services.tsx`
- `/Users/rodrigo.seoane/local-sites/portfolio-2026/components/sections/Hero.tsx`
- `/Users/rodrigo.seoane/local-sites/portfolio-2026/lib/utils/animations.ts`
- `/Users/rodrigo.seoane/local-sites/portfolio-2026/app/globals.css`

### External Sources
- [Motion (Framer Motion) Documentation](https://motion.dev/docs/react-scroll-animations)
- [Next.js Server and Client Components](https://nextjs.org/docs/app/getting-started/server-and-client-components)
- [WCAG 2.1 Guidelines](https://www.w3.org/TR/WCAG21/)
- [Portfolio Storytelling Best Practices](https://dribbble.com/stories/2024/03/18/crafting-a-narrative-mastering-storytelling-in-your-design-portfolio)
- [Skill Set Visualization Widgets](https://workik.com/top-six-skill-set-widgets-for-websites)
- [React & Next.js Best Practices 2026](https://fabwebstudio.com/blog/react-nextjs-best-practices-2026-performance-scale)
- [Accessible Portfolio Layouts](https://scale.jobs/blog/how-to-design-accessible-portfolio-layouts)

---

**Document Version:** 1.0
**Created:** February 3, 2026
**Author:** UX Research Specialist Agent
**Status:** Ready for Spec Writing
