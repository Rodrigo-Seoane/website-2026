# Implementation Plan: Rodrigo Seoane Portfolio

**Based on:** spec.md v1.0
**Target Launch:** March 9, 2026
**Stack:** Next.js 14+ | TypeScript | Tailwind CSS | Framer Motion

---

## Table of Contents

1. [Project Setup & Configuration](#phase-1-project-setup--configuration)
2. [Design System & Components](#phase-2-design-system--components)
3. [Homepage Development](#phase-3-homepage-development)
4. [Work/Portfolio Section](#phase-4-workportfolio-section)
5. [About & Insights Pages](#phase-5-about--insights-pages)
6. [Vibe Lab & Polish](#phase-6-vibe-lab--polish)
7. [Testing & Deployment](#phase-7-testing--deployment)

---

## Phase 1: Project Setup & Configuration

**Timeline:** Days 1-3 (Jan 27-29)
**Goal:** Establish foundation with working demo

### 1.1 Initialize Next.js Project

```bash
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir=false --import-alias "@/*"
```

**Dependencies to install:**

```bash
npm install framer-motion@11 lucide-react react-hook-form embla-carousel-react react-intersection-observer next-themes
```

**Dev dependencies:**

```bash
npm install -D @types/node @tailwindcss/typography
```

### 1.2 Project Structure Setup

Create the following directory structure:

```
portfolio-2026/
├── app/
│   ├── layout.tsx              # Root layout with providers
│   ├── template.tsx            # Page transitions wrapper
│   ├── page.tsx                # Homepage
│   ├── globals.css             # Global styles + Tailwind
│   ├── work/
│   │   ├── page.tsx            # Work index
│   │   └── [slug]/
│   │       └── page.tsx        # Individual case study
│   ├── insights/
│   │   └── page.tsx            # Blog/articles
│   ├── about/
│   │   └── page.tsx            # About page
│   └── vibe-lab/
│       └── page.tsx            # Experiments
├── components/
│   ├── ui/                     # Reusable primitives
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Badge.tsx
│   │   ├── Input.tsx
│   │   └── index.ts            # Barrel export
│   ├── sections/               # Page sections
│   │   ├── Hero.tsx
│   │   ├── FeaturedWork.tsx
│   │   ├── Services.tsx
│   │   ├── ClientLogos.tsx
│   │   ├── Testimonials.tsx
│   │   └── ContactForm.tsx
│   └── layout/                 # Layout components
│       ├── Navigation.tsx
│       ├── Footer.tsx
│       ├── ThemeProvider.tsx
│       └── PageTransition.tsx
├── lib/
│   ├── data/                   # Static data
│   │   ├── case-studies.ts
│   │   ├── testimonials.ts
│   │   ├── articles.ts
│   │   └── services.ts
│   ├── utils/                  # Utility functions
│   │   ├── cn.ts               # Class name merger
│   │   └── animations.ts       # Framer Motion variants
│   └── hooks/                  # Custom hooks
│       └── useScrollAnimation.ts
├── public/
│   ├── images/
│   │   ├── work/               # Case study images
│   │   ├── clients/            # Client logos
│   │   └── about/              # Personal photos
│   └── fonts/                  # Local fonts (if needed)
├── tailwind.config.ts
├── next.config.js
└── tsconfig.json
```

### 1.3 Tailwind Configuration

**File:** `tailwind.config.ts`

```typescript
import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          yellow: '#FFD60A',
          DEFAULT: '#FFD60A',
        },
        accent: {
          brown: '#5C3D2E',
          peach: '#FFAD84',
          DEFAULT: '#5C3D2E',
        },
        dark: {
          background: '#0A0A0A',
          surface: '#141414',
          border: '#262626',
        },
      },
      fontFamily: {
        display: ['"Plus Jakarta Sans"', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      fontSize: {
        '7xl': '4.5rem',
        '8xl': '6rem',
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'bounce': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      },
      animation: {
        'marquee': 'marquee 30s linear infinite',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}

export default config
```

### 1.4 Global Styles

**File:** `app/globals.css`

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 250 250 250;
    --foreground: 23 23 23;
    --primary: 255 214 10;
    --accent: 92 61 46;
  }

  .dark {
    --background: 10 10 10;
    --foreground: 250 250 250;
  }

  html {
    scroll-behavior: smooth;
  }

  body {
    @apply bg-neutral-50 text-neutral-900 dark:bg-dark-background dark:text-neutral-100;
    @apply font-body antialiased;
  }
}

@layer utilities {
  .text-balance {
    text-wrap: balance;
  }
}
```

### 1.5 Theme Provider Setup

**File:** `components/layout/ThemeProvider.tsx`

```typescript
'use client'

import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { type ThemeProviderProps } from 'next-themes/dist/types'

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
```

### 1.6 Root Layout

**File:** `app/layout.tsx`

```typescript
import type { Metadata } from 'next'
import { Plus_Jakarta_Sans, Inter } from 'next/font/google'
import { ThemeProvider } from '@/components/layout/ThemeProvider'
import { Navigation } from '@/components/layout/Navigation'
import { Footer } from '@/components/layout/Footer'
import './globals.css'

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-display',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
})

export const metadata: Metadata = {
  title: 'Rodrigo Seoane | Senior Product Designer',
  description: 'B2B SaaS Product Designer specializing in onboarding and customer retention. 25+ years of experience.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${plusJakarta.variable} ${inter.variable}`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Navigation />
          <main>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
```

### Phase 1 Deliverables

- [ ] Next.js project initialized and running on localhost:3010
- [ ] Tailwind configured with design system colors/fonts
- [ ] Dark mode toggle working
- [ ] Basic navigation skeleton
- [ ] Folder structure in place
- [ ] Page transitions demo (Framer Motion fade)

---

## Phase 2: Design System & Components

**Timeline:** Days 4-7 (Jan 30 - Feb 2)
**Goal:** Complete reusable component library

### 2.1 Utility Functions

**File:** `lib/utils/cn.ts`

```typescript
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

**File:** `lib/utils/animations.ts`

```typescript
import { Variants } from 'framer-motion'

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

export const scaleOnHover = {
  whileHover: { scale: 1.05 },
  whileTap: { scale: 0.98 },
  transition: { type: 'spring', stiffness: 400, damping: 17 },
}

export const slideIn: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4 },
  },
}
```

### 2.2 Button Component

**File:** `components/ui/Button.tsx`

```typescript
'use client'

import { forwardRef } from 'react'
import { motion, HTMLMotionProps } from 'framer-motion'
import { cn } from '@/lib/utils/cn'

interface ButtonProps extends HTMLMotionProps<'button'> {
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  children: React.ReactNode
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', className, children, ...props }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-300'

    const variants = {
      primary: 'bg-primary-yellow text-neutral-900 hover:shadow-lg hover:scale-105',
      secondary: 'border-2 border-accent-brown text-accent-brown hover:bg-accent-brown hover:text-white dark:border-accent-peach dark:text-accent-peach dark:hover:bg-accent-peach dark:hover:text-neutral-900',
      ghost: 'text-neutral-700 hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-white',
    }

    const sizes = {
      sm: 'px-4 py-2 text-sm',
      md: 'px-6 py-3 text-base',
      lg: 'px-8 py-4 text-lg',
    }

    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: variant === 'primary' ? 1.05 : 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {children}
      </motion.button>
    )
  }
)

Button.displayName = 'Button'
```

### 2.3 Card Component

**File:** `components/ui/Card.tsx`

```typescript
'use client'

import { motion, HTMLMotionProps } from 'framer-motion'
import { cn } from '@/lib/utils/cn'

interface CardProps extends HTMLMotionProps<'div'> {
  hover?: boolean
  children: React.ReactNode
}

export function Card({ hover = true, className, children, ...props }: CardProps) {
  return (
    <motion.div
      whileHover={hover ? { y: -4, boxShadow: '0 20px 40px rgba(0,0,0,0.1)' } : undefined}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className={cn(
        'rounded-2xl bg-white dark:bg-dark-surface',
        'border border-neutral-200 dark:border-dark-border',
        'overflow-hidden',
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  )
}
```

### 2.4 Badge Component

**File:** `components/ui/Badge.tsx`

```typescript
import { cn } from '@/lib/utils/cn'

interface BadgeProps {
  variant?: 'default' | 'success' | 'warning' | 'info'
  children: React.ReactNode
  className?: string
}

export function Badge({ variant = 'default', children, className }: BadgeProps) {
  const variants = {
    default: 'bg-neutral-100 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300',
    success: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    warning: 'bg-primary-yellow/20 text-neutral-900',
    info: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  }

  return (
    <span
      className={cn(
        'inline-flex items-center px-3 py-1 rounded-full text-sm font-medium',
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  )
}
```

### 2.5 Input Component

**File:** `components/ui/Input.tsx`

```typescript
'use client'

import { forwardRef, useState } from 'react'
import { cn } from '@/lib/utils/cn'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className, ...props }, ref) => {
    const [focused, setFocused] = useState(false)
    const [hasValue, setHasValue] = useState(false)

    return (
      <div className="relative">
        <input
          ref={ref}
          className={cn(
            'peer w-full px-4 py-3 pt-6',
            'bg-white dark:bg-dark-surface',
            'border-2 border-neutral-200 dark:border-dark-border',
            'rounded-lg outline-none transition-all duration-300',
            'focus:border-primary-yellow',
            error && 'border-red-500',
            className
          )}
          onFocus={() => setFocused(true)}
          onBlur={(e) => {
            setFocused(false)
            setHasValue(!!e.target.value)
          }}
          {...props}
        />
        <label
          className={cn(
            'absolute left-4 transition-all duration-200 pointer-events-none',
            'text-neutral-500 dark:text-neutral-400',
            (focused || hasValue || props.value)
              ? 'top-2 text-xs text-primary-yellow'
              : 'top-1/2 -translate-y-1/2 text-base'
          )}
        >
          {label}
        </label>
        {error && (
          <p className="mt-1 text-sm text-red-500">{error}</p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'
```

### 2.6 Navigation Component

**File:** `components/layout/Navigation.tsx`

```typescript
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils/cn'

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Work', href: '/work' },
  { label: 'Insights', href: '/insights' },
  { label: 'About', href: '/about' },
  { label: 'Vibe Lab', href: '/vibe-lab' },
]

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled ? 'bg-white/80 dark:bg-dark-background/80 backdrop-blur-md shadow-sm' : 'bg-transparent'
      )}
    >
      <nav className="container mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="font-display font-bold text-xl">
          RS
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'relative font-medium transition-colors',
                pathname === item.href
                  ? 'text-neutral-900 dark:text-white'
                  : 'text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white'
              )}
            >
              {item.label}
              {pathname === item.href && (
                <motion.div
                  layoutId="underline"
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary-yellow"
                />
              )}
            </Link>
          ))}
        </div>

        {/* CTA + Theme Toggle */}
        <div className="hidden md:flex items-center gap-4">
          {mounted && (
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          )}
          <Button size="sm" asChild>
            <a href="https://calendly.com/rodrigo_seoane/discovery" target="_blank" rel="noopener noreferrer">
              Book a Discovery Call
            </a>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 top-16 bg-white dark:bg-dark-background md:hidden"
          >
            <div className="flex flex-col p-6 gap-6">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="text-2xl font-display font-semibold"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
              <Button className="mt-4">Book a Discovery Call</Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
```

### 2.7 Footer Component

**File:** `components/layout/Footer.tsx`

```typescript
import Link from 'next/link'
import { Linkedin, Mail, Twitter } from 'lucide-react'

const footerLinks = [
  { label: 'Work', href: '/work' },
  { label: 'Insights', href: '/insights' },
  { label: 'About', href: '/about' },
  { label: 'Vibe Lab', href: '/vibe-lab' },
]

const socialLinks = [
  { icon: Linkedin, href: 'https://linkedin.com/in/rodrigoseoane', label: 'LinkedIn' },
  { icon: Twitter, href: 'https://twitter.com/rodrigoseoane', label: 'Twitter' },
  { icon: Mail, href: 'mailto:hello@rodrigoseoane.com', label: 'Email' },
]

export function Footer() {
  return (
    <footer className="border-t border-neutral-200 dark:border-dark-border">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="font-display font-bold text-2xl">
              Rodrigo Seoane
            </Link>
            <p className="mt-4 text-neutral-600 dark:text-neutral-400 max-w-md">
              Senior Product Designer specializing in B2B SaaS onboarding and customer retention.
              Based in Barcelona, working globally.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-semibold mb-4">Navigation</h3>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="font-semibold mb-4">Connect</h3>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-neutral-100 hover:bg-primary-yellow dark:bg-neutral-800 dark:hover:bg-primary-yellow transition-colors"
                  aria-label={social.label}
                >
                  <social.icon size={20} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-neutral-200 dark:border-dark-border text-center text-sm text-neutral-500">
          <p>&copy; {new Date().getFullYear()} Rodrigo Seoane. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
```

### 2.8 Page Transitions

**File:** `app/template.tsx`

```typescript
'use client'

import { motion } from 'framer-motion'

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}
```

### Phase 2 Deliverables

- [ ] Button component (primary, secondary, ghost variants)
- [ ] Card component with hover effects
- [ ] Badge component
- [ ] Input component with floating labels
- [ ] Navigation (desktop + mobile, with theme toggle)
- [ ] Footer component
- [ ] Page transition wrapper
- [ ] Utility functions (cn, animations)
- [ ] All components support dark mode

---

## Phase 3: Homepage Development

**Timeline:** Week 2 (Feb 3-9)
**Goal:** Fully functional homepage with all sections

### 3.1 Homepage Structure

**File:** `app/page.tsx`

```typescript
import { Hero } from '@/components/sections/Hero'
import { FeaturedWork } from '@/components/sections/FeaturedWork'
import { Services } from '@/components/sections/Services'
import { ClientLogos } from '@/components/sections/ClientLogos'
import { Testimonials } from '@/components/sections/Testimonials'
import { ContactForm } from '@/components/sections/ContactForm'

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedWork />
      <Services />
      <ClientLogos />
      <Testimonials />
      <ContactForm />
    </>
  )
}
```

### 3.2 Hero Section

**File:** `components/sections/Hero.tsx`

Key features to implement:
- Word-by-word headline reveal animation
- Animated phone mockup with floating icons
- 2 CTA buttons with hover effects
- Subtle parallax on scroll
- Responsive layout (stack on mobile)

```typescript
// Implementation includes:
// - Framer Motion staggered text animation
// - useInView for scroll-triggered animations
// - CSS float animation for mockup
// - Parallax using useScroll and useTransform
```

### 3.3 Featured Work Section

**File:** `components/sections/FeaturedWork.tsx`

Key features:
- 3-4 case study cards from data file
- Image zoom + overlay on hover
- Animated metrics (count-up effect)
- Links to individual case studies

### 3.4 Services Section

**File:** `components/sections/Services.tsx`

Key features:
- 3 service cards
- Icon animations on hover
- "Request Estimate" buttons → opens contact form or Calendly

### 3.5 Client Logos Marquee

**File:** `components/sections/ClientLogos.tsx`

Key features:
- Infinite horizontal scroll (CSS animation)
- Grayscale → color on hover
- Duplicate logos array for seamless loop

### 3.6 Testimonials Carousel

**File:** `components/sections/Testimonials.tsx`

Key features:
- Embla Carousel implementation
- Auto-rotate (5s interval)
- Pause on hover
- Dot navigation
- Fade transitions

### 3.7 Contact Form

**File:** `components/sections/ContactForm.tsx`

Key features:
- React Hook Form for validation
- Fields: Name, Email, Message, Project Type (dropdown)
- Floating labels
- Success state with animation
- Calendly embed option

### 3.8 Data Files

**File:** `lib/data/case-studies.ts`

```typescript
export interface CaseStudy {
  slug: string
  title: string
  client: string
  category: string
  thumbnail: string
  description: string
  metrics: {
    label: string
    value: string
    prefix?: string
    suffix?: string
  }[]
  tags: string[]
  featured: boolean
}

export const caseStudies: CaseStudy[] = [
  {
    slug: 'example-saas-onboarding',
    title: 'Reimagining User Onboarding',
    client: 'Example SaaS',
    category: 'B2B SaaS',
    thumbnail: '/images/work/example-thumb.jpg',
    description: 'Increased user activation by 53% through redesigned onboarding flow.',
    metrics: [
      { label: 'User Activation', value: '53', suffix: '%', prefix: '+' },
      { label: 'Time to Value', value: '40', suffix: '%', prefix: '-' },
    ],
    tags: ['Onboarding', 'User Research', 'Product Design'],
    featured: true,
  },
  // ... more case studies
]
```

**File:** `lib/data/services.ts`

```typescript
export interface Service {
  id: string
  title: string
  description: string
  icon: string
  features: string[]
}

export const services: Service[] = [
  {
    id: 'product-design',
    title: 'Product Design',
    description: 'End-to-end design for B2B SaaS products',
    icon: 'Layers',
    features: ['User Research', 'UI/UX Design', 'Prototyping', 'Design Systems'],
  },
  // ... more services
]
```

**File:** `lib/data/testimonials.ts`

```typescript
export interface Testimonial {
  id: string
  quote: string
  author: string
  role: string
  company: string
  avatar?: string
}

export const testimonials: Testimonial[] = [
  // Placeholder - to be filled with actual testimonials
]
```

### Phase 3 Deliverables

- [ ] Hero section with animations
- [ ] Featured Work section with hover effects
- [ ] Services cards section
- [ ] Client logos marquee (infinite scroll)
- [ ] Testimonials carousel (auto-rotate)
- [ ] Contact form with validation
- [ ] Calendly integration
- [ ] All sections responsive
- [ ] Scroll animations on all sections

---

## Phase 4: Work/Portfolio Section

**Timeline:** Week 3 (Feb 10-16)
**Goal:** Portfolio index and case study template

### 4.1 Work Index Page

**File:** `app/work/page.tsx`

Features:
- Page header with title
- Category filter bar (client-side filtering)
- 2-column grid of case study cards
- Hover: lift effect + shadow
- Key metric badges on cards

### 4.2 Individual Case Study Page

**File:** `app/work/[slug]/page.tsx`

Structure:
```
- Hero Section
  - Project title
  - Client name/logo
  - Industry tag
  - Project date
  - Hero image
  - Key metric badge

- Overview Section
  - Problem statement
  - My role
  - Timeline
  - Tools used

- Problem Section
  - Background
  - User pain points
  - Business challenge

- Solution Section
  - Design process
  - Key decisions
  - Visual designs (with lightbox)

- Results Section
  - Animated metrics
  - User feedback
  - Business impact

- Next Project Preview
```

### 4.3 Case Study Components

**Components to create:**

1. `CaseStudyHero.tsx` - Hero with project info
2. `CaseStudyOverview.tsx` - Overview grid
3. `CaseStudySection.tsx` - Reusable section layout
4. `ImageLightbox.tsx` - Full-screen image viewer
5. `ProgressBar.tsx` - Sticky scroll progress
6. `NextProject.tsx` - Preview of next case study

### 4.4 Dynamic Routing

```typescript
// app/work/[slug]/page.tsx
import { notFound } from 'next/navigation'
import { caseStudies } from '@/lib/data/case-studies'

interface Props {
  params: { slug: string }
}

export async function generateStaticParams() {
  return caseStudies.map((study) => ({
    slug: study.slug,
  }))
}

export default function CaseStudyPage({ params }: Props) {
  const caseStudy = caseStudies.find((s) => s.slug === params.slug)

  if (!caseStudy) {
    notFound()
  }

  return (
    // ... render case study
  )
}
```

### Phase 4 Deliverables

- [ ] /work index page with filtering
- [ ] Case study template page
- [ ] Dynamic routing with [slug]
- [ ] Sticky progress bar
- [ ] Image lightbox functionality
- [ ] Animated metrics on scroll
- [ ] "Next Project" navigation
- [ ] 2-3 case studies migrated with real content
- [ ] SEO metadata for each case study

---

## Phase 5: About & Insights Pages

**Timeline:** Week 4 (Feb 17-23)
**Goal:** Complete About and Insights pages

### 5.1 About Page

**File:** `app/about/page.tsx`

Sections:
1. **Hero** - Large photo + headline + location badge
2. **Story** - Rio → Barcelona journey (text-based narrative)
3. **Philosophy** - 3-4 approach cards with hover effects
4. **Skills** - Visual skill representation
5. **Tools** - Logo grid with hover states
6. **Personal** - 3-4 interest cards
7. **Testimonials** - Carousel (reuse component)
8. **CTA** - "Let's Work Together" → Discovery Call

### 5.2 Insights Page

**File:** `app/insights/page.tsx`

Features:
- Category filter bar
- Featured article (large card at top)
- Grid of article cards
- Links to LinkedIn posts (external)
- Hover animations

**Initial 8 Articles:**
1. The Art of Simplifying Your Checkout Process
2. How a Flawless Onboarding Increases User Retention
3. Unveiling Common Onboarding Pitfalls in SaaS Apps
4. How to make smart decisions? Tips to help
5. Implementing UX into Agile Backlog
6. UX Debt 101 | Symptoms, Impact & Solutions
7. Do you understand the issues users have with your product?
8. Qual a diferenca... (Portuguese)

### 5.3 Article Data Structure

**File:** `lib/data/articles.ts`

```typescript
export interface Article {
  id: string
  title: string
  excerpt: string
  category: 'UX Strategy' | 'Customer Retention' | 'B2B SaaS' | 'Thought Leadership'
  linkedInUrl: string
  thumbnail: string
  publishDate: string
  readTime: string
  featured: boolean
}

export const articles: Article[] = [
  // ... article data
]
```

### Phase 5 Deliverables

- [ ] About page with all sections
- [ ] Story narrative section
- [ ] Skills visualization
- [ ] Tool logos with hover effects
- [ ] Personal interests section
- [ ] Insights page with 8 articles
- [ ] Category filtering
- [ ] Featured article highlight
- [ ] Article cards with hover effects
- [ ] All pages responsive

---

## Phase 6: Vibe Lab & Polish

**Timeline:** Week 5 (Feb 24 - Mar 2)
**Goal:** Vibe Lab page and site-wide polish

### 6.1 Vibe Lab Page

**File:** `app/vibe-lab/page.tsx`

Features:
- Hero with animated gradient text
- Single experiment card (existing project)
- Status badges (Live, In Progress, Concept)
- Glowing border animation on cards
- "Coming Soon" teaser section
- Easy-to-update structure for future experiments

### 6.2 Experiment Data

**File:** `lib/data/experiments.ts`

```typescript
export interface Experiment {
  id: string
  title: string
  description: string
  status: 'live' | 'in-progress' | 'concept'
  thumbnail: string
  url?: string
  tags: string[]
}

export const experiments: Experiment[] = [
  // ... experiment data
]
```

### 6.3 Animation Polish

Review and refine:
- [ ] All scroll-triggered animations (fade-up, stagger)
- [ ] Hover states consistency across components
- [ ] Page transition smoothness
- [ ] Number counter animations
- [ ] Parallax effects on hero images
- [ ] prefers-reduced-motion support

### 6.4 Mobile Optimization

- [ ] Test all pages on mobile breakpoints
- [ ] Touch-friendly tap targets (min 44px)
- [ ] Swipe gestures for carousels
- [ ] Simplified animations on mobile
- [ ] Mobile navigation polish

### 6.5 Performance Tuning

- [ ] Image optimization (next/image)
- [ ] Font loading optimization
- [ ] Code splitting verification
- [ ] Lazy loading below-fold content
- [ ] Bundle size analysis

### Phase 6 Deliverables

- [ ] Vibe Lab page complete
- [ ] Experiment cards with glowing effect
- [ ] All animations refined
- [ ] Mobile-optimized across all pages
- [ ] Performance baseline established
- [ ] prefers-reduced-motion implemented

---

## Phase 7: Testing & Deployment

**Timeline:** Week 6 (Mar 3-9)
**Goal:** Launch site

### 7.1 Cross-Browser Testing

Test on:
- [ ] Chrome (last 2 versions)
- [ ] Firefox (last 2 versions)
- [ ] Safari (last 2 versions)
- [ ] Edge (last 2 versions)
- [ ] iOS Safari 15+
- [ ] Chrome Android (last 2 versions)

### 7.2 Accessibility Audit

- [ ] Keyboard navigation on all interactive elements
- [ ] Focus states visible
- [ ] Alt text on all images
- [ ] Proper heading hierarchy (h1 → h6)
- [ ] ARIA labels where needed
- [ ] Color contrast compliance (WCAG AA)
- [ ] Screen reader testing

### 7.3 SEO Implementation

**Metadata for each page:**

```typescript
// Example for homepage
export const metadata: Metadata = {
  title: 'Rodrigo Seoane | Senior Product Designer',
  description: 'B2B SaaS Product Designer specializing in onboarding and customer retention. 25+ years of experience. Based in Barcelona.',
  keywords: ['product designer', 'B2B SaaS', 'onboarding', 'UX design', 'Barcelona'],
  openGraph: {
    title: 'Rodrigo Seoane | Senior Product Designer',
    description: 'B2B SaaS Product Designer specializing in onboarding and customer retention.',
    url: 'https://rodrigoseoane.com',
    siteName: 'Rodrigo Seoane',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rodrigo Seoane | Senior Product Designer',
    description: 'B2B SaaS Product Designer specializing in onboarding and customer retention.',
    images: ['/images/og-image.jpg'],
  },
}
```

**Additional SEO:**
- [ ] robots.txt
- [ ] sitemap.xml (auto-generated by Next.js)
- [ ] Structured data (JSON-LD) for Person schema
- [ ] Canonical URLs

### 7.4 Analytics Integration

**File:** `app/layout.tsx` (add Google Analytics)

```typescript
import Script from 'next/script'

// Inside layout
<Script
  src="https://www.googletagmanager.com/gtag/js?id=G-XZCJLTM5Z4"
  strategy="afterInteractive"
/>
<Script id="google-analytics" strategy="afterInteractive">
  {`
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-XZCJLTM5Z4');
  `}
</Script>
```

**Conversion tracking events:**
- Discovery Call booking
- Contact form submission
- Case study view (scroll depth > 80%)
- Article read (time > 2min)

### 7.5 Vercel Deployment

**Steps:**

1. Push to GitHub repository
2. Connect repository to Vercel
3. Configure build settings:
   - Framework: Next.js
   - Build command: `npm run build`
   - Output directory: `.next`
4. Set environment variables (if any)
5. Deploy preview build
6. Test thoroughly on preview URL
7. Promote to production

### 7.6 DNS Migration

**From IONOS (1&1) to Vercel:**

1. In Vercel: Add custom domain `rodrigoseoane.com`
2. Vercel provides DNS records to add
3. In IONOS DNS settings:
   - Add A record pointing to Vercel IP
   - Add CNAME for `www` pointing to `cname.vercel-dns.com`
4. Wait for propagation (24-48 hours)
5. Verify SSL certificate activated
6. Remove old Webflow DNS records

### 7.7 Launch Checklist

**Pre-Launch:**
- [ ] All pages functional and tested
- [ ] Forms working (contact, Calendly)
- [ ] All links working (internal and external)
- [ ] Images optimized and loading
- [ ] Dark mode working correctly
- [ ] Mobile responsive across devices
- [ ] Performance scores meeting targets
- [ ] Accessibility audit passed
- [ ] SEO metadata in place
- [ ] Analytics tracking verified
- [ ] 404 page created
- [ ] Favicon and app icons set

**Launch Day:**
- [ ] Deploy to production
- [ ] Verify DNS propagation
- [ ] Test live site thoroughly
- [ ] Verify analytics receiving data
- [ ] Test contact form on live site
- [ ] Social media preview cards working
- [ ] Announce launch

### Phase 7 Deliverables

- [ ] Cross-browser testing complete
- [ ] Accessibility audit passed
- [ ] SEO implementation complete
- [ ] Google Analytics integrated
- [ ] Deployed to Vercel
- [ ] DNS migrated from Webflow
- [ ] Site live at rodrigoseoane.com

---

## Performance Targets

| Metric | Target | Priority |
|--------|--------|----------|
| Lighthouse Performance | ≥ 95 | High |
| Lighthouse Accessibility | ≥ 95 | High |
| Lighthouse Best Practices | ≥ 95 | Medium |
| Lighthouse SEO | ≥ 95 | High |
| LCP | < 2.5s | High |
| FID | < 100ms | Medium |
| CLS | < 0.1 | High |
| First Load JS | < 150KB | Medium |
| Total Page Weight | < 1MB | Medium |

---

## Risk Mitigation

| Risk | Mitigation |
|------|------------|
| Content not ready | Use placeholder content, design for easy updates |
| Images not optimized | Use next/image, set up image pipeline early |
| Animation performance issues | Test on low-end devices, implement reduce-motion |
| Scope creep | Strict adherence to spec, changes go to v1.1 |
| DNS migration issues | Keep Webflow active until DNS fully propagated |

---

## Post-Launch (v1.1+)

Future enhancements (not in initial scope):
- Blog with local content (not just LinkedIn links)
- Newsletter integration
- Case study video embeds
- Multi-language support (English/Spanish/Portuguese)
- Advanced analytics dashboard
- A/B testing infrastructure

---

**Document Control**

- **Version:** 1.0
- **Created:** January 28, 2026
- **Status:** Ready for Development
