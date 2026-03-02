# Website Redesign Specifications Document

**Project:** Rodrigo Seoane Portfolio Redesign  
**Version:** 1.0  
**Date:** January 28, 2026  
**Status:** Pre-Development

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Client Profile](#2-client-profile)
3. [Business Objectives & Success Metrics](#3-business-objectives--success-metrics)
4. [Technical Specifications](#4-technical-specifications)
5. [Design System](#5-design-system)
6. [Site Architecture](#6-site-architecture)
7. [Feature Requirements](#7-feature-requirements)
8. [Content Strategy](#8-content-strategy)
9. [Design References](#9-design-references)
10. [Project Timeline](#10-project-timeline)
11. [Hosting & Deployment](#11-hosting--deployment)
12. [Analytics & Tracking](#12-analytics--tracking)
13. [Article Links](#13-article-links)

---

## 1. Project Overview

### 1.1 Project Goal

Transform rodrigoseoane.com from a Webflow-based portfolio into a modern, high-performance Next.js application that positions Rodrigo as a thought leader in B2B SaaS product design, specifically specializing in onboarding and customer retention.

### 1.2 Key Transformation

- **From:** Static Webflow portfolio
- **To:** Dynamic React-based portfolio with smooth animations and modern interactions
- **Focus:** Converting visitors into client inquiries and establishing thought leadership

### 1.3 Success Definition

A portfolio website that:

- Attracts qualified B2B SaaS companies
- Generates consistent inbound inquiries
- Showcases 25+ years of expertise effectively
- Serves as content headquarters
- Reduces need for active job hunting

---

## 2. Client Profile

### 2.1 About Rodrigo Seoane

- **Name:** Rodrigo Seoane
- **Title:** Senior Product Designer
- **Experience:** 25+ years
- **Location:** Barcelona, Spain
- **Background:** Rio de Janeiro (first 10 years) → Barcelona (last 15 years)
- **Domain:** rodrigoseoane.com

### 2.2 Specialization

- **Primary Focus:** B2B SaaS Product Design
- **Expertise Areas:**
  - User onboarding optimization
  - Customer retention strategies
  - AI & SaaS innovation
  - Revenue growth through design
  - UX strategy

### 2.3 Core Principles & Values

- Works with innovative B2B SaaS companies
- Values design as key product development factor
- Ethics and transparency in all communications
- Attentive client service ("championship final" attention level)

**Target Clients:**

- B2B SaaS companies
- Share similar beliefs and values
- Understand value of UX/design
- Have budget for premium daily rates

### 2.4 Personal Brand

- **Tone:** Professional yet approachable, warm
- **Visual Style:** Bold, modern, minimalist
- **Personality:** Real person, authentic (no AI-generated images)
- **Philosophy:** "Less is More"

---

## 3. Business Objectives & Success Metrics

### 3.1 Primary Objectives (2026)

1. **Maximize Discoverability**
   - Be found by qualified B2B SaaS companies
   - Improve organic search presence
   - Reduce active job hunting efforts

2. **Establish Thought Leadership**
   - Build brand as expert in onboarding/retention
   - Create follower/reader base through content
   - Make website the content headquarters

### 3.2 Key Results - 2026 Roadmap

**Q1 Goals (Jan-Mar 2026):**

- Receive 1 qualified job offer per week from B2B SaaS companies
- Companies that share values and have budget for daily rate
- Target: ~12-13 offers in Q1

**Q2 Goals (Apr-Jun 2026):**

- 5 contacts per week via contact form or Discovery Call bookings
- Target: ~60-65 contacts in Q2
- 12 articles published (mix of new content and migrated pieces)
- Focus on onboarding/retention topics

**Q3 Goals (Jul-Sep 2026):**

- 8 published case studies
- Showcase B2B SaaS work
- Highlight retention/onboarding results
- Include new case study (in development)

### 3.3 Conversion Funnels

**Primary Funnel:**

```
Visitor → Work/Case Studies → Book Discovery Call → Client
```

**Secondary Funnel:**

```
Visitor → Insights/Articles → Newsletter/Follow → Contact → Client
```

**Tertiary Funnel:**

```
Google Search → Case Study → About → Contact Form → Client
```

---

## 4. Technical Specifications

### 4.1 Core Technology Stack

```json
{
  "framework": "Next.js 14+",
  "runtime": "React 18+",
  "language": "TypeScript",
  "styling": "Tailwind CSS",
  "animations": "Framer Motion 11+",
  "icons": "Lucide React",
  "forms": "React Hook Form 7+",
  "carousel": "Embla Carousel React 8+",
  "scroll": "React Intersection Observer 9+",
  "themes": "next-themes 0.2+ (dark mode)"
}
```

### 4.2 Project Structure

```
rodrigoseoane-portfolio/
├── app/
│   ├── (pages)/
│   │   ├── page.tsx                 # Homepage
│   │   ├── work/
│   │   │   ├── page.tsx             # Work index
│   │   │   └── [slug]/page.tsx      # Individual case study
│   │   ├── insights/
│   │   │   └── page.tsx             # Blog/LinkedIn posts
│   │   ├── about/
│   │   │   └── page.tsx             # About page
│   │   ├── vibe-lab/
│   │   │   └── page.tsx             # Experiments
│   │   └── layout.tsx               # Root layout
│   ├── template.tsx                 # Page transitions
│   └── globals.css                  # Global styles
├── components/
│   ├── ui/                          # Reusable UI components
│   ├── sections/                    # Page sections
│   └── layout/                      # Layout components
├── lib/
│   ├── data/                        # Static data (case studies, etc.)
│   └── utils/                       # Utility functions
├── public/
│   ├── images/
│   └── assets/
└── tailwind.config.ts
```

### 4.3 Performance Requirements

**Lighthouse Score Targets:**

- Performance: ≥ 95
- Accessibility: ≥ 95
- Best Practices: ≥ 95
- SEO: ≥ 95

**Core Web Vitals:**

- LCP: < 2.5s
- FID: < 100ms
- CLS: < 0.1

**Bundle Size:**

- First Load JS: < 150KB
- Total Page Weight: < 1MB

### 4.4 Browser Support

**Desktop:**

- Chrome: Last 2 versions
- Firefox: Last 2 versions
- Safari: Last 2 versions
- Edge: Last 2 versions

**Mobile:**

- iOS Safari: 15+
- Chrome Android: Last 2 versions

**Responsive Breakpoints:**

- Mobile: 320px - 767px
- Tablet: 768px - 1023px
- Desktop: 1024px - 1439px
- Large Desktop: 1440px+

---

## 5. Design System

### 5.1 Color Palette

**Primary Colors:**

```javascript
primary: {
  yellow: '#FFD60A',        // Main brand yellow
  DEFAULT: '#FFD60A',
}
```

**Accent Colors:**

```javascript
accent: {
  brown: '#5C3D2E',         // Rich brown
  peach: '#FFAD84',         // Warm peach
  DEFAULT: '#5C3D2E',
}
```

**Neutral Colors:**

```javascript
neutral: {
  black: '#000000',
  white: '#FFFFFF',
  gray: {
    50: '#FAFAFA',
    100: '#F5F5F5',
    200: '#E5E5E5',
    300: '#D4D4D4',
    400: '#A3A3A3',
    500: '#737373',
    600: '#525252',
    700: '#404040',
    800: '#262626',
    900: '#171717',
  }
}
```

**Dark Mode Palette:**

```javascript
dark: {
  background: '#0A0A0A',
  surface: '#141414',
  border: '#262626',
  text: {
    primary: '#FAFAFA',
    secondary: '#A3A3A3',
  },
  accent: {
    yellow: '#FFD60A',      // Stays vibrant
    brown: '#8B6F5E',       // Lightened for contrast
    peach: '#FFAD84',       // Same
  }
}
```

### 5.2 Typography

**Font Families:**

```javascript
fontFamily: {
  display: ['"Plus Jakarta Sans"', 'sans-serif'],  // Headings
  body: ['Inter', 'sans-serif'],                    // Body text
}
```

**Type Scale:**

```javascript
fontSize: {
  'xs': '0.75rem',      // 12px
  'sm': '0.875rem',     // 14px
  'base': '1rem',       // 16px
  'lg': '1.125rem',     // 18px
  'xl': '1.25rem',      // 20px
  '2xl': '1.5rem',      // 24px
  '3xl': '1.875rem',    // 30px
  '4xl': '2.25rem',     // 36px
  '5xl': '3rem',        // 48px
  '6xl': '3.75rem',     // 60px
  '7xl': '4.5rem',      // 72px - Hero headlines
  '8xl': '6rem',        // 96px - Extra bold statements
}
```

**Font Weights:**

```
Plus Jakarta Sans: 400, 500, 600, 700, 800
Inter: 400, 500, 600
```

### 5.3 Component Specifications

**Buttons:**

```yaml
Primary (CTA):
  background: primary-yellow
  text: neutral-black
  hover: scale(1.05) + shadow-lg
  transition: 300ms ease

Secondary:
  background: transparent
  border: 2px solid accent-brown
  text: accent-brown
  hover: background-accent-brown + text-white

Button Sizes:
  sm: px-4 py-2 text-sm
  md: px-6 py-3 text-base
  lg: px-8 py-4 text-lg
```

### 5.4 Animation Principles

**Timing:**

```javascript
transition-timing: {
  'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
  'bounce': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  'ease-in-out': 'cubic-bezier(0.42, 0, 0.58, 1)',
}

duration: {
  'fast': '150ms',
  'base': '300ms',
  'slow': '500ms',
}
```

**Animation Types:**

- Fade-up on scroll (all sections)
- Scale on hover (cards, images)
- Slide transitions (page changes)
- Number counters (metrics)
- Marquee scroll (client logos)
- Staggered reveals (lists)

---

## 6. Site Architecture

### 6.1 Site Map

```
rodrigoseoane.com/
├── / (Home)
├── /work
│   ├── /work/case-study-1
│   ├── /work/case-study-2
│   └── /work/[future-case-studies]
├── /insights
├── /about
├── /vibe-lab
└── /#contact (anchor on homepage)
```

### 6.2 Navigation Structure

**Desktop Navigation:**

```
[LOGO] ──── HOME | WORK | INSIGHTS | ABOUT | VIBE LAB ──── [Book a Discovery Call]
                                                             [🌙 Dark Mode Toggle]
```

### 6.3 URL Structure

```yaml
Homepage: /
Work Index: /work
Case Study: /work/[slug]
Insights: /insights
About: /about
Vibe Lab: /vibe-lab
Contact: /#contact
```

---

## 7. Feature Requirements

### 7.1 Homepage Features

**Hero Section:**

- Large headline with word-by-word reveal animation
- Animated phone mockup with floating icons
- 2 CTA buttons: "Explore Work" + "Book Discovery Call"
- Subtle parallax on scroll

**Featured Work:**

- 3-4 case study previews
- Hover: image zoom + overlay
- Animated metrics (count-up)
- Links to full case studies

**Services Section:**

- 3 service cards with hover effects
- "Request Estimate" buttons
- Icon animations on hover

**Client Logos:**

- Infinite marquee scroll
- Grayscale → color on hover
- Smooth CSS animation

**Testimonials:**

- Auto-rotating carousel (5s interval)
- Pause on hover
- Dot navigation

**Contact Form:**

- Name, Email, Message, Project Type fields
- Floating labels on focus
- Form validation
- Success state with animation
- Calendly embed alternative

### 7.2 Work Page Features

**Index Page (/work):**

- Filter by category
- 2-column grid of case studies
- Hover: lift + shadow
- Video preview on hover (if available)
- Key metric badges

**Individual Case Study:**

- Sticky progress bar
- Hero with project overview
- Problem → Solution → Results structure
- Animated metrics
- Image lightbox on click
- "Next Project" preview at bottom

### 7.3 Insights Page Features

- Category filter bar
- Featured article (large card at top)
- Grid of article cards
- Links to LinkedIn posts
- Hover animations on cards

**Initial Content: 8 Articles**

1. The Art of Simplifying Your Checkout Process
2. How a Flawless Onboarding Increases User Retention
3. Unveiling Common Onboarding Pitfalls in SaaS Apps
4. How to make smart decisions? Tips to help.
5. Implementing UX into Agile Backlog
6. UX Debt 101 | Symptoms, Impact & Solutions
7. Do you understand the issues users have with your product?
8. Qual a diferença entre o designer de Plataformas, designer de Serviços e o UX designer?

### 7.4 About Page Features

- Hero with large photo + headline
- Location badge (Barcelona 🇪🇸)
- Story section (Rio → Barcelona journey, text-based)
- Philosophy/Approach section (3-4 cards)
- Skills visualization
- Tool logos with hover states
- Personal interests (3-4 cards)
- Testimonials carousel
- CTA: "Let's Work Together" → Discovery Call

### 7.5 Vibe Lab Features

- Hero with animated gradient text
- Single experiment card (existing project)
- Easy-to-update structure for adding new experiments
- Status badges (Live, In Progress, Concept)
- Glowing border animation on cards
- "Coming Soon" teaser section

### 7.6 Global Features

**Page Transitions:**

- Smooth fade + slide between pages (Jonas Reymondin style)
- Loading state during navigation
- Scroll to top on page change
- 300-500ms transition duration

**Dark Mode:**

- Toggle in navigation
- Persistent setting (localStorage)
- Smooth color transitions
- System preference detection on first visit

**Scroll Animations:**

- Fade-up on all major sections
- Staggered delays (100ms between elements)
- Triggered at 20% viewport entry
- Parallax on hero images

**Accessibility:**

- Keyboard navigation support
- Focus states on all interactive elements
- Alt text for all images
- Proper heading hierarchy
- ARIA labels where needed
- `prefers-reduced-motion` support
- Color contrast compliance (WCAG AA)

---

## 8. Content Strategy

### 8.1 Existing Content

**Current Assets:**

- Current website content on rodrigoseoane.com
- 8 published articles (see section 7.3)
- Existing case studies (to be migrated)
- Client testimonials
- Professional photos (real, non-AI)

**Content Timeline:**

- Updated bio text: Ready in ~2 weeks
- New case study content: In development, ~2 weeks

### 8.2 Case Study Template

**Standard Structure:**

```yaml
Hero:
  - Project title
  - Client name/logo
  - Industry tag
  - Project date
  - Hero image
  - Key metric badge

Overview:
  - Problem statement
  - My role
  - Timeline
  - Tools used

Problem:
  - Background
  - User pain points
  - Business challenge

Solution:
  - Design process
  - Key decisions
  - Visual designs

Results:
  - Metrics/KPIs improved
  - User feedback
  - Business impact
```

---

## 9. Design References

### 9.1 Primary Inspirations

**1. Dan Machado (https://www.danmachado.com/)**

- Page structure and layout
- Minimalist approach
- Generous white space
- Clean navigation

**2. José Ocando (https://www.joseocando.com/)**

- Micro-interactions on hover
- Case study structure (visual-first)
- Smooth animations

**3. Gev.design (https://www.gev.design/)**

- Bold, modern aesthetic
- Large typography
- Interactive scroll animations
- Strong CTAs

**4. Jonas Reymondin (https://v5.jonasreymondin.com/)**

- Page transition system (PRIMARY REFERENCE)
- Smooth navigation feel
- SPA-like experience

---

## 10. Project Timeline

### 10.1 Development Phases

**Week 1: Foundation (Jan 27 - Feb 2)**

- Days 1-3: Setup & Demo
  - Next.js 14 + TypeScript project init
  - Tailwind config with design system
  - Page transitions demo
  - Hero section prototype
  - **Deliverable:** Working demo for review

- Days 4-7: Component Build
  - Button, Card, Badge components
  - Navigation (desktop + mobile)
  - Footer component
  - Form components
  - Dark mode implementation
  - **Deliverable:** Complete component library

**Week 2: Homepage (Feb 3-9)**

- Hero section with animations
- Featured work section
- Services cards
- Client logos marquee
- Testimonials carousel
- Contact form + Calendly integration
- **Deliverable:** Fully functional homepage

**Week 3: Work/Portfolio (Feb 10-16)**

- /work index page with filtering
- Case study template
- Migrate 2-3 existing case studies
- Image lightbox functionality
- Progress indicator
- **Deliverable:** Portfolio section complete

**Week 4: About + Insights (Feb 17-23)**

- About page with sections
- Timeline/journey (text-based)
- Skills section
- /insights page with 8 articles
- Article cards and filtering
- **Deliverable:** All main pages functional

**Week 5: Vibe Lab + Polish (Feb 24 - Mar 2)**

- Vibe Lab page
- Experiment card (existing project)
- Mobile optimization
- Performance tuning
- Animation refinements
- **Deliverable:** Feature-complete site

**Week 6: Testing + Launch (Mar 3-9)**

- Cross-browser testing
- Accessibility audit
- SEO implementation
- Google Analytics integration
- Vercel deployment
- DNS migration support
- **Deliverable:** Live site! 🎉

---

## 11. Hosting & Deployment

### 11.1 Platform

**Vercel (Free Tier)**

**Benefits:**

- Zero cost for hosting
- Automatic deployments from Git
- Global CDN included
- SSL/HTTPS automatic
- Native Next.js support

**Cost Savings:**

- Current (Webflow + 1&1): ~$264-696/year
- New (Vercel): ~$12-72/year
- **Savings: $192-624/year**

### 11.2 DNS Migration

- Keep domain at 1&1 (IONOS)
- Update DNS records to point to Vercel
- Simple 3-step process
- ~24-48hrs propagation time

---

## 12. Analytics & Tracking

### 12.1 Google Analytics Setup

**Property Details:**

- Property ID: 259250023
- Stream Name: URL Principal
- Stream URL: https://www.rodrigoseoane.com
- Stream ID: 2251627931
- **Measurement ID: G-XZCJLTM5Z4**

### 12.2 Conversion Tracking

**Primary Conversions:**

1. Discovery Call Booking (Calendly)
2. Contact Form Submission
3. Case Study View (scroll depth > 80%)
4. Article Read (time on page > 2min)

**Secondary Conversions:** 5. Email Click 6. LinkedIn Profile Click 7. Vibe Lab Project Click

### 12.3 Calendly Integration

**Scheduling Link:**
https://calendly.com/rodrigo_seoane/discovery

**Integration Type:**

- Inline embed on homepage
- Popup widget on all CTA buttons

---

## 13. Article Links

### 13.1 LinkedIn Posts for Insights Page

1. **The Art of Simplifying Your Checkout Process**
   - Focus: Conversion optimization
   - Category: UX Strategy

2. **How a Flawless Onboarding Increases User Retention**
   - Focus: Onboarding best practices
   - Category: Customer Retention

3. **Unveiling Common Onboarding Pitfalls in SaaS Apps**
   - Focus: Common mistakes to avoid
   - Category: B2B SaaS

4. **How to make smart decisions? Tips to help.**
   - Focus: Decision-making frameworks
   - Category: Thought Leadership

5. **Implementing UX into Agile Backlog**
   - Focus: Process integration
   - Category: UX Strategy

6. **UX Debt 101 | Symptoms, Impact & Solutions**
   - Focus: Technical debt in design
   - Category: UX Strategy

7. **Do you understand the issues users have with your product?**
   - Focus: User research
   - Category: UX Strategy

8. **Qual a diferença entre o designer de Plataformas, designer de Serviços e o UX designer?**
   - Focus: Design roles (Portuguese)
   - Category: Thought Leadership

**Note:** Full LinkedIn URLs needed for linking

---

## 14. Local Development Setup

### 14.1 Project Location

```
/Users/rodrigo.seoane/local-sites/portfolio-2026
```

### 14.2 Development Tools

- **IDE:** Visual Studio Code
- **Extension:** Claude Code
- **Version Control:** Git
- **Package Manager:** npm

### 14.3 Getting Started Commands

```bash
cd /Users/rodrigo.seoane/local-sites/portfolio-2026
npm install
npm run dev
# Open http://localhost:3010
```

---

## Document Control

**Version:** 1.0  
**Date:** January 28, 2026  
**Status:** Approved - Ready for Development

**Client:** Rodrigo Seoane  
**Developer:** Claude

---

**End of Specifications Document**
