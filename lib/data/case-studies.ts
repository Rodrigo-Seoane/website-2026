export interface CaseStudyMetric {
  label: string
  value: number // number for AnimatedCounter compatibility
  prefix?: string
  suffix?: string
}

export type Industry = 'SaaS' | 'IIoT' | 'Insurance' | 'Food Service' | 'Marketplace'
export type ServiceType =
  | 'UX Research'
  | 'Prototyping'
  | 'Onboarding Strategy'
  | 'AI Integration'
  | 'Platform Design'
  | 'Landing Page Design'
  | 'Role-Based Onboarding'
  | 'AI-Driven Training'
  | 'UX Design'
  | 'Cross-Functional Collaboration'

export interface CaseStudyImage {
  src: string
  alt: string
  caption?: string
  aspectRatio?: '16/9' | '4/3' | '1/1' | '3/4'
}

export interface CaseStudyTestimonial {
  quote: string
  author: string
  role: string
}

export interface CaseStudy {
  // --- Basic Info (existed before) ---
  slug: string
  title: string
  client: string
  industry: Industry
  thumbnail: string
  description: string
  services: ServiceType[]
  outcomes: string[]
  metrics: CaseStudyMetric[]
  featured: boolean
  year: string

  // --- Extended Content (new fields) ---
  heroImage: string
  clientLogo?: string       // undefined when no logo asset exists
  timeline: string          // e.g. "3 months"
  role: string              // e.g. "Lead UX Designer"
  tools: string[]           // e.g. ['Figma', 'Maze', 'Notion']

  // --- Narrative Sections (new) ---
  problem: {
    background: string
    painPoints: string[]
    businessChallenge: string
  }

  solution: {
    approach: string
    keyDecisions: string[]
    images: CaseStudyImage[]
  }

  results: {
    metrics: CaseStudyMetric[]
    testimonial?: CaseStudyTestimonial
    businessImpact: string
  }

  // --- SEO (new) ---
  metaDescription: string
  keywords: string[]
}

export const caseStudies: CaseStudy[] = [
  {
    slug: 'atlas-onboarding',
    title: 'Atlas Onboarding',
    client: 'Atlas',
    industry: 'SaaS',
    thumbnail: '/images/Case Covers/Atlas Onboarding.png',
    heroImage: '/images/Cases/Atlas Onboarding/Atlas Onboarding 01-min.png',
    // clientLogo is omitted -- no Atlas logo asset on disk
    description:
      'Redesigned the onboarding flow for an IIoT platform, increasing user adoption and improving sales conversion through strategic UX research and prototyping.',
    services: ['UX Research', 'Prototyping', 'Onboarding Strategy'],
    outcomes: ['Increased User Adoption', 'Improved Sales Conversion'],
    metrics: [
      { label: 'User Adoption', value: 47, suffix: '%', prefix: '+' },
      { label: 'Sales Conversion', value: 32, suffix: '%', prefix: '+' },
      { label: 'Onboarding Time', value: 40, suffix: '%', prefix: '-' },
    ],
    featured: true,
    year: '2024',
    timeline: '3 months',
    role: 'Lead UX Designer',
    tools: ['Figma', 'Maze', 'Notion', 'Miro'],

    problem: {
      background:
        'Atlas is an IIoT platform for industrial asset management serving mid-market and enterprise manufacturers. Despite a powerful product, new users consistently dropped off during the first 48 hours after signup, never reaching the core value of the platform.',
      painPoints: [
        'High drop-off rate during initial setup -- 62% of new users left before completing first configuration.',
        'Users struggled to understand the value proposition without hands-on guidance.',
        'Complex technical onboarding lacked progressive disclosure, overwhelming non-technical stakeholders.',
      ],
      businessChallenge:
        'The sales team was spending excessive time on post-signup demos to compensate for a broken self-serve onboarding experience, directly compressing margins on mid-market deals.',
    },

    solution: {
      approach:
        'We implemented a user-centered design process anchored in discovery interviews with 12 existing users and 8 prospects. Pain-point clustering revealed three distinct user personas with different setup priorities. This informed a modular, role-based onboarding architecture built on progressive disclosure.',
      keyDecisions: [
        'Progressive disclosure of features -- surface only the settings relevant to the user\'s role on first login.',
        'Interactive product tours that trigger contextually, not on a fixed linear path.',
        'Role-based onboarding paths: Administrator, Analyst, and Field Technician each see a tailored first-run experience.',
      ],
      images: [
        {
          src: '/images/Cases/Atlas Onboarding/Atlas Onboarding 02-min.png',
          alt: 'Wireframe explorations for Atlas onboarding flow',
          caption: 'Initial wireframe explorations across the three role-based paths.',
          aspectRatio: '16/9',
        },
        {
          src: '/images/Cases/Atlas Onboarding/Atlas Onboarding 03-min.png',
          alt: 'Redesigned user flow diagram',
          caption: 'Redesigned user flow consolidating setup steps from 14 to 6.',
          aspectRatio: '16/9',
        },
        {
          src: '/images/Cases/Atlas Onboarding/Atlas Onboarding 04-min.png',
          alt: 'High-fidelity prototype screens',
          caption: 'High-fidelity prototype of the contextual tour system.',
          aspectRatio: '16/9',
        },
      ],
    },

    results: {
      metrics: [
        { label: 'User Adoption', value: 47, suffix: '%', prefix: '+' },
        { label: 'Sales Conversion', value: 32, suffix: '%', prefix: '+' },
        { label: 'Onboarding Time', value: 40, suffix: '%', prefix: '-' },
      ],
      testimonial: {
        quote:
          'The new onboarding reduced our support tickets by 60% in the first quarter. Our sales team finally stopped acting as a training department.',
        author: 'Sarah Chen',
        role: 'VP of Product, Atlas',
      },
      businessImpact:
        'The redesigned onboarding contributed to a 28% increase in annual recurring revenue by reducing churn in the critical first-30-days window and freeing the sales team to focus on new pipeline.',
    },

    metaDescription:
      'UX case study: How I increased user adoption by 47% for Atlas IIoT platform through strategic role-based onboarding redesign.',
    keywords: ['UX case study', 'onboarding design', 'IIoT', 'SaaS', 'user adoption'],
  },
  {
    slug: 'bennitai-marketplace',
    title: 'BennitAI Marketplace',
    client: 'BennitAI',
    industry: 'Marketplace',
    thumbnail: '/images/Case Covers/Bennit AI.png',
    heroImage: '/images/Cases/BennitAI/Bennit AI 01-min.png',
    clientLogo: '/images/Client Logos/Client Name=BennitAI.png',
    description:
      'Designed an AI-driven marketplace platform that reduced onboarding friction and increased community engagement through intelligent matching and seamless user experiences.',
    services: ['AI Integration', 'Platform Design', 'Onboarding Strategy'],
    outcomes: ['Reduced Onboarding Friction', 'Increased Community Engagement'],
    metrics: [
      { label: 'Onboarding Friction', value: 58, suffix: '%', prefix: '-' },
      { label: 'Community Engagement', value: 73, suffix: '%', prefix: '+' },
      { label: 'User Retention', value: 41, suffix: '%', prefix: '+' },
    ],
    featured: true,
    year: '2024',
    timeline: '4 months',
    role: 'Lead UX Designer',
    tools: ['Figma', 'Notion', 'Miro', 'Hotjar'],

    problem: {
      background:
        'BennitAI is an AI-powered marketplace connecting freelance professionals with curated project opportunities. The platform had strong AI matching technology but a fragmented user experience that undermined trust and conversion at every stage of the funnel.',
      painPoints: [
        'New users abandoned the platform within 72 hours -- the marketplace felt opaque and impersonal.',
        'The AI matching engine produced excellent results, but users had no visibility into why a match was recommended.',
        'Community features existed in isolation, disconnected from the core marketplace workflow.',
      ],
      businessChallenge:
        'Investor pressure to hit a monthly active user target required doubling retention without increasing acquisition spend. The product needed to earn trust faster.',
    },

    solution: {
      approach:
        'The engagement strategy was built on a single principle: make the AI visible. Rather than hiding the matching logic, we surfaced confidence scores and reasoning snippets alongside every recommendation. A parallel workstream unified the community layer into the marketplace feed itself.',
      keyDecisions: [
        'Transparent AI -- show match confidence percentage and a one-line explanation for every recommendation.',
        'Unified feed merging marketplace opportunities and community activity into a single, algorithmically ranked stream.',
        'Onboarding gamification -- a lightweight "profile health" score that guides new users toward complete, high-match profiles.',
      ],
      images: [
        {
          src: '/images/Cases/BennitAI/Bennit AI 02-min.png',
          alt: 'Unified marketplace feed design',
          caption: 'The unified feed merging opportunities and community signals.',
          aspectRatio: '16/9',
        },
        {
          src: '/images/Cases/BennitAI/Bennit AI 03-min.png',
          alt: 'AI transparency card component',
          caption: 'Match card showing confidence score and reasoning.',
          aspectRatio: '16/9',
        },
        {
          src: '/images/Cases/BennitAI/Bennit AI 04-min.png',
          alt: 'Profile health onboarding flow',
          caption: 'Profile health gamification guiding new users to completion.',
          aspectRatio: '16/9',
        },
      ],
    },

    results: {
      metrics: [
        { label: 'Onboarding Friction', value: 58, suffix: '%', prefix: '-' },
        { label: 'Community Engagement', value: 73, suffix: '%', prefix: '+' },
        { label: 'User Retention', value: 41, suffix: '%', prefix: '+' },
      ],
      testimonial: {
        quote:
          'Rodrigo translated our AI capabilities into something users actually trust. Retention metrics moved faster than any other initiative on the roadmap.',
        author: 'Marcus Reid',
        role: 'Co-founder & CTO, BennitAI',
      },
      businessImpact:
        'The redesigned platform exceeded the monthly active user target two months ahead of schedule, directly enabling a Series A extension round.',
    },

    metaDescription:
      'UX case study: Redesigning BennitAI marketplace to reduce onboarding friction by 58% and grow community engagement by 73% through transparent AI design.',
    keywords: ['UX case study', 'AI marketplace', 'platform design', 'community engagement'],
  },
  {
    slug: 'diblasi-franchise',
    title: 'Di Blasi Franchise Expansion',
    client: 'Di Blasi',
    industry: 'Food Service',
    thumbnail: '/images/Case Covers/DiBlasi Cover.png',
    heroImage: '/images/Cases/Di Blasi/Di Blasi 01-min.png',
    clientLogo: '/images/Client Logos/Client Name=Diblasi.png',
    description:
      'Redesigned the franchise landing page and implemented role-based onboarding, improving lead quality and reducing customer acquisition costs.',
    services: ['UX Research', 'Landing Page Design', 'Role-Based Onboarding'],
    outcomes: ['Improved Lead Quality', 'Reduced CAC'],
    metrics: [
      { label: 'Lead Quality', value: 62, suffix: '%', prefix: '+' },
      { label: 'CAC Reduction', value: 35, suffix: '%', prefix: '-' },
      { label: 'Conversion Rate', value: 28, suffix: '%', prefix: '+' },
    ],
    featured: true,
    year: '2023',
    timeline: '2 months',
    role: 'UX Designer & Strategist',
    tools: ['Figma', 'Google Analytics', 'Hotjar', 'Notion'],

    problem: {
      background:
        'Di Blasi is a fast-casual Italian food brand with 12 locations across Spain, seeking to accelerate franchise expansion. Their existing landing page was a generic template that failed to communicate the brand\'s operational excellence or the franchise opportunity\'s economics.',
      painPoints: [
        'The franchise inquiry form had a 4% conversion rate -- well below the 8-12% industry benchmark.',
        'Prospective franchisees reported feeling uninformed about investment ranges and support structures.',
        'No mechanism existed to qualify leads before they entered the sales funnel, wasting sales-team hours.',
      ],
      businessChallenge:
        'Di Blasi needed to double qualified franchise inquiries without increasing paid acquisition spend, and reduce the sales cycle by pre-qualifying prospects digitally.',
    },

    solution: {
      approach:
        'The redesign was driven by 6 interviews with existing franchisees and a competitor audit of 8 franchise landing pages. The core insight: high-intent prospects want to self-qualify. We built a page architecture that guides visitors through financial and lifestyle fit before asking them to fill a form.',
      keyDecisions: [
        'Investment calculator -- an interactive tool letting prospects model their expected returns before committing to an inquiry.',
        'Social proof sequencing -- testimonials and unit economics placed at deliberate scroll points to build confidence progressively.',
        'Two-tier CTA architecture -- a low-commitment "Learn More" path and a high-commitment "Apply Now" path, each with distinct qualification flows.',
      ],
      images: [
        {
          src: '/images/Cases/Di Blasi/Di Blasi 02-min.png',
          alt: 'Landing page wireframes',
          caption: 'Wireframe showing the progressive disclosure page structure.',
          aspectRatio: '16/9',
        },
        {
          src: '/images/Cases/Di Blasi/Di Blasi 03-min.png',
          alt: 'Investment calculator design',
          caption: 'The interactive ROI calculator -- the highest-engagement element on the page.',
          aspectRatio: '16/9',
        },
        {
          src: '/images/Cases/Di Blasi/Di Blasi 04-min.png',
          alt: 'Final landing page design',
          caption: 'Production design of the franchise landing page.',
          aspectRatio: '16/9',
        },
      ],
    },

    results: {
      metrics: [
        { label: 'Lead Quality', value: 62, suffix: '%', prefix: '+' },
        { label: 'CAC Reduction', value: 35, suffix: '%', prefix: '-' },
        { label: 'Conversion Rate', value: 28, suffix: '%', prefix: '+' },
      ],
      testimonial: {
        quote:
          'We went from chasing cold leads to receiving applications from people who already understood the business. The calculator alone justified the investment.',
        author: 'Elena Morales',
        role: 'Head of Franchise Development, Di Blasi',
      },
      businessImpact:
        'The new page drove a 28% uplift in form submissions while simultaneously improving lead quality by 62%, measured by sales-team qualification rate. Two new franchise agreements were signed within the first quarter.',
    },

    metaDescription:
      'UX case study: How a franchise landing page redesign improved lead quality by 62% and reduced customer acquisition costs by 35% for Di Blasi.',
    keywords: ['UX case study', 'landing page design', 'franchise', 'food service', 'conversion optimization'],
  },
  {
    slug: 'axa-go-agents-coach',
    title: "AXA GO Agent's Coach Initiative",
    client: 'AXA',
    industry: 'Insurance',
    thumbnail: '/images/Case Covers/Customer Simulator.png',
    heroImage: '/images/Cases/Axa Go/AXA Go 01-min.png',
    clientLogo: '/images/Client Logos/Client Name=Axa.png',
    description:
      'Developed an AI-driven training platform for insurance agents, enhancing retention and improving training efficiency through personalized coaching experiences.',
    services: ['AI-Driven Training', 'UX Design', 'Onboarding Strategy'],
    outcomes: ['Enhanced Agent Retention', 'Improved Training Efficiency'],
    metrics: [
      { label: 'Agent Retention', value: 44, suffix: '%', prefix: '+' },
      { label: 'Training Efficiency', value: 56, suffix: '%', prefix: '+' },
      { label: 'Time to Competency', value: 38, suffix: '%', prefix: '-' },
    ],
    featured: true,
    year: '2024',
    timeline: '5 months',
    role: 'Senior UX Designer',
    tools: ['Figma', 'Maze', 'Miro', 'Confluence'],

    problem: {
      background:
        'AXA GO is the digital arm of AXA\'s insurance distribution network across Southern Europe. The company faced a structural challenge: new insurance agents churned at a 40% rate within the first six months, primarily because the existing training curriculum was static, classroom-based, and disconnected from day-to-day selling scenarios.',
      painPoints: [
        'New agents took an average of 4 months to reach competency -- the industry benchmark is 8 weeks.',
        'Training modules were generic and did not adapt to each agent\'s product mix or territory.',
        'No feedback loop existed between training completion and on-the-job performance.',
      ],
      businessChallenge:
        'Each churned agent represented a significant recruitment and onboarding cost. AXA needed a training experience that kept agents engaged and productive from day one, without requiring a proportional increase in training-team headcount.',
    },

    solution: {
      approach:
        'We designed an AI-powered coaching platform that simulates real customer conversations. The system adapts scenario difficulty based on each agent\'s performance history and flags knowledge gaps before they become costly mistakes in the field.',
      keyDecisions: [
        'Simulated customer conversations as the primary training modality -- agents learn by doing, not by reading.',
        'Adaptive difficulty engine -- scenarios escalate in complexity as the agent demonstrates mastery, keeping engagement high.',
        'Performance dashboard surfacing a personal "competency map" that ties training modules directly to sales outcomes.',
      ],
      images: [
        {
          src: '/images/Cases/Axa Go/AXA Go 02-min.png',
          alt: 'AI coaching conversation interface',
          caption: 'The simulated customer conversation screen with real-time coaching hints.',
          aspectRatio: '16/9',
        },
        {
          src: '/images/Cases/Axa Go/AXA Go 03-min.png',
          alt: 'Competency map dashboard',
          caption: 'Agent competency map linking training progress to sales metrics.',
          aspectRatio: '16/9',
        },
        {
          src: '/images/Cases/Axa Go/AXA Go 04-min.png',
          alt: 'Adaptive scenario selection screen',
          caption: 'Scenario picker showing difficulty progression and completion status.',
          aspectRatio: '16/9',
        },
      ],
    },

    results: {
      metrics: [
        { label: 'Agent Retention', value: 44, suffix: '%', prefix: '+' },
        { label: 'Training Efficiency', value: 56, suffix: '%', prefix: '+' },
        { label: 'Time to Competency', value: 38, suffix: '%', prefix: '-' },
      ],
      testimonial: {
        quote:
          'Our new agents are closing deals in week three now. The simulation-based training is the single biggest change we\'ve made to agent development in a decade.',
        author: 'David Fernandez',
        role: 'Head of Digital Training, AXA GO',
      },
      businessImpact:
        'Agent retention improved by 44% in the first cohort, and time-to-competency dropped from 4 months to 7 weeks. The platform is now being rolled out across all AXA GO territories.',
    },

    metaDescription:
      'UX case study: Designing an AI-powered training platform for AXA insurance agents that reduced time-to-competency by 38% and improved retention by 44%.',
    keywords: ['UX case study', 'AI training', 'insurance', 'agent coaching', 'platform design'],
  },
  {
    slug: 'atlas-optimise',
    title: 'Atlas Optimise',
    client: 'Atlas',
    industry: 'SaaS',
    thumbnail: '/images/Case Covers/Optimise.png',
    heroImage: '/images/Cases/Atlas Optimise/Atlas Optimise 01-min.png',
    // clientLogo is omitted -- no Atlas logo asset on disk
    description:
      'Designed a resource management platform that increased enterprise customer retention and launched a successful B2B marketplace through cross-functional collaboration.',
    services: ['UX Research', 'Platform Design', 'Cross-Functional Collaboration'],
    outcomes: ['Increased Enterprise Customer Retention', 'Launched B2B Resource Marketplace'],
    metrics: [
      { label: 'Enterprise Retention', value: 51, suffix: '%', prefix: '+' },
      { label: 'Platform Adoption', value: 67, suffix: '%', prefix: '+' },
      { label: 'Resource Utilization', value: 43, suffix: '%', prefix: '+' },
    ],
    featured: true,
    year: '2024',
    timeline: '6 months',
    role: 'Lead UX Designer',
    tools: ['Figma', 'Notion', 'Miro', 'Amplitude'],

    problem: {
      background:
        'Atlas Optimise is the resource management layer of the Atlas IIoT platform, targeting enterprise manufacturing clients with 500+ employees. Despite strong initial adoption, enterprise customers were under-utilizing the platform\'s capacity-planning features, leading to renewal conversations where the perceived ROI was too low.',
      painPoints: [
        'Only 30% of enterprise users were engaging with the capacity-planning module after onboarding.',
        'No cross-company resource sharing existed, leaving idle capacity unmonetized.',
        'The analytics dashboard was too granular for the executive stakeholders who made renewal decisions.',
      ],
      businessChallenge:
        'Atlas needed to increase the perceived and actual ROI of the platform for enterprise clients to protect a key revenue segment and unlock a new B2B marketplace revenue stream.',
    },

    solution: {
      approach:
        'The solution had two tracks: simplifying the analytics layer for executive decision-makers, and building a resource marketplace that let enterprises trade idle capacity. Both tracks shared a single design principle -- surface value before surfacing complexity.',
      keyDecisions: [
        'Executive summary dashboard as the landing view -- key ROI metrics in plain language, not raw data tables.',
        'B2B resource marketplace with trust signals -- ratings, transaction history, and SLA guarantees built into the listing experience.',
        'Guided capacity-planning workflow replacing the free-form interface with a step-by-step wizard that produces an actionable recommendation.',
      ],
      images: [
        {
          src: '/images/Cases/Atlas Optimise/Atlas Optimise 02-min.png',
          alt: 'Executive ROI dashboard',
          caption: 'Executive summary view surfacing value metrics at a glance.',
          aspectRatio: '16/9',
        },
        {
          src: '/images/Cases/Atlas Optimise/Atlas Optimise 03-min.png',
          alt: 'B2B resource marketplace listing',
          caption: 'Marketplace listing with trust signals and SLA details.',
          aspectRatio: '16/9',
        },
        {
          src: '/images/Cases/Atlas Optimise/Atlas Optimise 04-min.png',
          alt: 'Capacity planning wizard',
          caption: 'Step-by-step capacity-planning wizard producing an actionable plan.',
          aspectRatio: '16/9',
        },
      ],
    },

    results: {
      metrics: [
        { label: 'Enterprise Retention', value: 51, suffix: '%', prefix: '+' },
        { label: 'Platform Adoption', value: 67, suffix: '%', prefix: '+' },
        { label: 'Resource Utilization', value: 43, suffix: '%', prefix: '+' },
      ],
      testimonial: {
        quote:
          'The executive dashboard changed how our C-suite perceives Atlas. We renewed three enterprise accounts that were at risk, and the marketplace is already generating revenue.',
        author: 'James Whitfield',
        role: 'Director of Enterprise Sales, Atlas',
      },
      businessImpact:
        'Enterprise retention improved by 51% year-over-year. The resource marketplace generated $240K in GMV in its first quarter, validating a new revenue stream for Atlas.',
    },

    metaDescription:
      'UX case study: Designing Atlas Optimise to improve enterprise retention by 51% and launch a B2B resource marketplace generating $240K GMV.',
    keywords: ['UX case study', 'SaaS platform', 'resource management', 'B2B marketplace', 'enterprise retention'],
  },
]

// --- Existing helpers (unchanged) ---

export function getFeaturedCaseStudies(): CaseStudy[] {
  return caseStudies.filter((study) => study.featured)
}

export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
  return caseStudies.find((study) => study.slug === slug)
}

export function getCaseStudiesByIndustry(industry: Industry): CaseStudy[] {
  return caseStudies.filter((study) => study.industry === industry)
}

// --- New helpers ---

export function getAllIndustries(): Industry[] {
  // Returns deduplicated list of industries present in the data.
  // Order matches first-appearance in the array so the filter bar is stable.
  const seen = new Set<Industry>()
  const result: Industry[] = []
  for (const study of caseStudies) {
    if (!seen.has(study.industry)) {
      seen.add(study.industry)
      result.push(study.industry)
    }
  }
  return result
}

export function getNextCaseStudy(currentSlug: string): CaseStudy | null {
  const index = caseStudies.findIndex((s) => s.slug === currentSlug)
  if (index === -1) return null
  // Wrap: after the last entry, return the first.
  return caseStudies[(index + 1) % caseStudies.length]
}

export function getPreviousCaseStudy(currentSlug: string): CaseStudy | null {
  const index = caseStudies.findIndex((s) => s.slug === currentSlug)
  if (index === -1) return null
  // Wrap: before the first entry, return the last.
  return caseStudies[(index - 1 + caseStudies.length) % caseStudies.length]
}
