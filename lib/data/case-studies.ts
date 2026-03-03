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
  // --- Basic Info ---
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
  tagline?: string

  // --- Extended Content ---
  heroImage: string
  clientLogo?: string
  timeline: string
  role: string
  tools: string[]

  // --- Narrative Sections ---
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

  // --- SEO ---
  metaDescription: string
  keywords: string[]
}

export const caseStudies: CaseStudy[] = [
  // ─── 1. Atlas Onboarding ────────────────────────────────────────────────────
  {
    slug: 'atlas-onboarding',
    title: 'Atlas Play Onboarding',
    client: 'ATS Global',
    industry: 'IIoT',
    thumbnail: '/images/work/00. Case Covers/Atlas Onboarding.png',
    heroImage: '/images/work/01. Atlas Onboarding/Atlas Onboarding 01-min.png',
    tagline: 'Transforming User Adoption through Streamlined Onboarding',
    description:
      "Redesigned Atlas Play's onboarding flow, raising the SUS score by 10.2 points and driving a 53% increase in low-friction sales conversions through role-based user paths.",
    services: ['UX Research', 'Prototyping', 'Onboarding Strategy'],
    outcomes: ['Improved SUS Score', 'Increased Sales Conversion', 'Reduced UI Debates'],
    metrics: [
      { label: 'SUS Score Improvement', value: 10.2, prefix: '+', suffix: ' pts' },
      { label: 'Sales Conversion', value: 53, prefix: '+', suffix: '%' },
      { label: 'UI Consistency', value: 40, prefix: '-', suffix: '%' },
    ],
    featured: true,
    year: '2023',
    timeline: '3 months',
    role: 'Lead UX Designer',
    tools: ['Figma', 'Maze', 'Notion', 'Miro'],

    problem: {
      background:
        "Atlas faced significant challenges with user adoption due to a fragmented onboarding process. The platform's System Usability Scale (SUS) score was 42.6, below industry benchmarks, indicating poor user experience and limiting the sales team's ability to demonstrate value to enterprise prospects.",
      painPoints: [
        'Lack of role-based training paths left users without guidance tailored to their responsibilities.',
        'Inadequate documentation and absence of visual form-building tools slowed configuration and setup.',
        "Business analysts struggled to articulate the platform's value to clients without a structured, guided demo experience.",
      ],
      businessChallenge:
        "The sales team needed a frictionless way to demonstrate platform value to enterprise prospects during the sales cycle, while reducing post-sale onboarding support costs and improving the platform's measurable usability baseline.",
    },

    solution: {
      approach:
        'We conducted a user-centric discovery phase with 16 user interviews across various skill levels. Pain-point clustering revealed the need for role-based onboarding paths and a more visual form-building experience, informing a redesigned architecture built around progressive disclosure and contextual guidance.',
      keyDecisions: [
        'Role-based onboarding paths — prospects and users immediately see platform value relevant to their specific role.',
        'WYSIWYG form editor — a visual, drag-and-drop interface replacing the previous text-heavy configuration flow.',
        '16-interview discovery phase ensuring every design decision, from IA to interaction patterns, was grounded in real user data.',
      ],
      images: [
        {
          src: '/images/work/01. Atlas Onboarding/Atlas Onboarding 02-min.png',
          alt: 'Role-based onboarding flow wireframes',
          caption: 'Wireframe explorations across the role-based onboarding paths.',
          aspectRatio: '16/9',
        },
        {
          src: '/images/work/01. Atlas Onboarding/Atlas Onboarding 03-min.png',
          alt: 'WYSIWYG form editor design',
          caption: 'Visual form-building interface replacing the previous text-heavy configuration.',
          aspectRatio: '16/9',
        },
        {
          src: '/images/work/01. Atlas Onboarding/Atlas Onboarding 04-min.png',
          alt: 'High-fidelity prototype screens',
          caption: 'High-fidelity prototype of the contextual onboarding system.',
          aspectRatio: '16/9',
        },
      ],
    },

    results: {
      metrics: [
        { label: 'SUS Score Improvement', value: 10.2, prefix: '+', suffix: ' pts' },
        { label: 'Sales Conversion', value: 53, prefix: '+', suffix: '%' },
        { label: 'UI Consistency', value: 40, prefix: '-', suffix: '%' },
      ],
      testimonial: {
        quote:
          'With the dynamic role-based onboarding paths prospects can see the value immediately and it had direct impact on sales conversions with enterprise clients.',
        author: 'Paul Oostindie',
        role: 'Sales Manager',
      },
      businessImpact:
        "The redesigned onboarding raised the platform's SUS score by 10.2 points and drove a 53% increase in low-friction sales conversions post-launch, directly shortening the enterprise sales cycle and reducing onboarding support overhead.",
    },

    metaDescription:
      "UX case study: How role-based onboarding redesign raised Atlas Play's SUS score by 10.2 points and increased enterprise sales conversions by 53%.",
    keywords: ['UX case study', 'onboarding design', 'IIoT', 'SaaS', 'user adoption', 'SUS score'],
  },

  // ─── 2. BennitAI Marketplace ────────────────────────────────────────────────
  {
    slug: 'bennitai-marketplace',
    title: 'Bennit AI Marketplace',
    client: 'BennitAI',
    industry: 'Marketplace',
    thumbnail: '/images/work/00. Case Covers/Bennit AI.png',
    heroImage: '/images/work/04. BennitAI/Bennit AI 01-min.png',
    clientLogo: '/images/Client Logos/Client Name=BennitAI.png',
    tagline: 'Bridging the IIoT Talent Gap with AI-Driven Design',
    description:
      'Designed a two-sided AI-powered IIoT talent marketplace connecting Seekers and Solvers, driving a 23% community membership surge and 200+ project opportunities in the first month.',
    services: ['AI Integration', 'Platform Design', 'Onboarding Strategy'],
    outcomes: ['Community Membership Growth', 'Marketplace Launch'],
    metrics: [
      { label: 'Community Membership', value: 23, prefix: '+', suffix: '%' },
      { label: 'Opportunities Created', value: 200, suffix: '+' },
    ],
    featured: true,
    year: '2024',
    timeline: '4 months',
    role: 'Lead UX Designer',
    tools: ['Figma', 'Notion', 'Miro', 'Hotjar'],

    problem: {
      background:
        "The Industrial Internet of Things (IIoT) sector faced a critical talent shortage, with companies struggling to find skilled professionals for niche projects. BennitAI's existing corporate network lacked scalability, resulting in low engagement and fragmented collaboration that prevented the platform from growing.",
      painPoints: [
        'Companies with IIoT project demands could not efficiently find and vet niche specialists at speed.',
        'The existing network lacked AI-driven intelligence to match Seekers and Solvers based on project requirements.',
        'Fragmented collaboration tools prevented the community from scaling beyond its initial user base.',
      ],
      businessChallenge:
        'Design a two-sided marketplace connecting Seekers (companies with project demands) and Solvers (skilled professionals) while reducing onboarding friction and enabling AI-powered talent matching at scale.',
    },

    solution: {
      approach:
        'The solution centred on a transparent, AI-powered Seeker-Solver exchange. We conducted ecosystem mapping to understand both sides of the marketplace, then designed an AI matching layer that recommends talent based on project DNA, making the matching rationale visible to both parties.',
      keyDecisions: [
        'Seeker-Solver two-sided marketplace architecture — distinct, optimised onboarding flows for each user type.',
        'AI-powered matching surfacing talent recommendations based on project DNA and verified skill alignment.',
        'Design system adaptation ensuring a consistent, trustworthy UI across all marketplace touchpoints.',
      ],
      images: [
        {
          src: '/images/work/04. BennitAI/Bennit AI 02-min.png',
          alt: 'Seeker-Solver marketplace ecosystem map',
          caption: 'Ecosystem map defining the two-sided marketplace architecture.',
          aspectRatio: '16/9',
        },
        {
          src: '/images/work/04. BennitAI/Bennit AI 03-min.png',
          alt: 'AI matching interface design',
          caption: 'AI match card showing talent recommendations and project DNA alignment.',
          aspectRatio: '16/9',
        },
        {
          src: '/images/work/04. BennitAI/Bennit AI 04-min.png',
          alt: 'Marketplace onboarding flow',
          caption: 'Distinct onboarding flows for Seekers and Solvers, optimised for each user type.',
          aspectRatio: '16/9',
        },
      ],
    },

    results: {
      metrics: [
        { label: 'Community Membership', value: 23, prefix: '+', suffix: '%' },
        { label: 'Opportunities Created', value: 200, suffix: '+' },
      ],
      testimonial: {
        quote:
          "The IIoT talent crisis is paralyzing our industry. BennitAI's community exists to help companies find niche experts, and our fragmented network couldn't scale. We needed an AI-driven intelligence to connect 'Seekers' and 'Solvers' at speed. Rodrigo was brilliant to conceptualise and design the Seeker-Solver exchange presented at CSIA, which transformed an industry block into fluidity. A system enabling AI matching that recommends talent based on project DNA. The results spoke instantly.",
        author: 'Katherine Cahalane',
        role: 'CEO, BennitAI',
      },
      businessImpact:
        "The Seeker-Solver exchange drove a 23% surge in community membership within three months of launch and generated 200+ project opportunities in the first month, validating the platform's ability to connect IIoT talent at speed and scale.",
    },

    metaDescription:
      "UX case study: Designing BennitAI's two-sided IIoT talent marketplace with AI-powered matching, achieving 23% community growth and 200+ opportunities in month one.",
    keywords: ['UX case study', 'AI marketplace', 'IIoT', 'talent platform', 'two-sided marketplace'],
  },

  // ─── 3. Di Blasi Franchise ──────────────────────────────────────────────────
  {
    slug: 'diblasi-franchise',
    title: 'Di Blasi Franchise Expansion',
    client: 'Di Blasi',
    industry: 'Food Service',
    thumbnail: '/images/work/00. Case Covers/DiBlasi Cover.png',
    heroImage: '/images/work/05. Di Blasi/Di Blasi 01-min.png',
    clientLogo: '/images/Client Logos/Client Name=Diblasi.png',
    tagline: 'UX-Driven National Expansion through Targeted Onboarding',
    description:
      'Redesigned the franchise acquisition funnel with separate journeys for distinct traffic sources, improving lead qualification by 40% and reducing Customer Acquisition Cost by 25%.',
    services: ['UX Research', 'Landing Page Design', 'Role-Based Onboarding'],
    outcomes: ['Improved Lead Quality', 'Reduced CAC'],
    metrics: [
      { label: 'Lead Qualification', value: 40, prefix: '+', suffix: '%' },
      { label: 'CAC Reduction', value: 25, prefix: '-', suffix: '%' },
    ],
    featured: true,
    year: '2023',
    timeline: '2 months',
    role: 'UX Designer & Strategist',
    tools: ['Figma', 'Google Analytics', 'Hotjar', 'Notion'],

    problem: {
      background:
        'Di Blasi, a leading pizza franchise, faced stagnation after saturating the Rio de Janeiro market. Their outdated sales landing page suffered from 50% unqualified leads, inconsistent branding, and a mismatch between their iFood rating and franchisee expectations. The goal was to enable national expansion by reducing Customer Acquisition Cost and boosting lead quality.',
      painPoints: [
        '50% of leads were unqualified, wasting sales-team time and compressing margins on every franchise inquiry.',
        'Inconsistent branding across touchpoints undermined the premium perception needed to attract serious franchisee candidates.',
        'No mechanism to differentiate awareness-stage visitors (Facebook Ads) from high-intent prospects (Google Ads) in a single funnel.',
      ],
      businessChallenge:
        'Di Blasi needed to double qualified franchise inquiries without increasing paid acquisition spend, and reduce the sales cycle by pre-qualifying prospects digitally through separate, intent-matched user journeys.',
    },

    solution: {
      approach:
        "Traffic source analysis identified two primary entry points requiring distinct conversion paths: Facebook Ads for awareness-stage explorers and Google Ads for conversion-ready investors. We applied Nielsen's heuristics to the redesign, uncovering opportunities for role-based CTAs, jargon-free content, ROI calculators, and deliberate social proof sequencing.",
      keyDecisions: [
        "Separate conversion funnels for Facebook explorers and Google investors — each path tailored to the visitor's intent and readiness.",
        'Modular design system across franchisee portals ensuring brand cohesion and reducing long-term design and dev debt.',
        'Simplified forms with error prevention techniques (auto-formatting phone numbers) to reduce lead capture abandonment.',
      ],
      images: [
        {
          src: '/images/work/05. Di Blasi/Di Blasi 02-min.png',
          alt: 'Franchise landing page wireframes',
          caption: 'Progressive disclosure page structure showing the two distinct conversion paths.',
          aspectRatio: '16/9',
        },
        {
          src: '/images/work/05. Di Blasi/Di Blasi 03-min.png',
          alt: 'Role-based CTA and form design',
          caption: 'Separate CTA flows for exploration vs. investment-ready visitors.',
          aspectRatio: '16/9',
        },
        {
          src: '/images/work/05. Di Blasi/Di Blasi 04-min.png',
          alt: 'Final franchise landing page design',
          caption: 'Production design of the franchise acquisition landing page.',
          aspectRatio: '16/9',
        },
      ],
    },

    results: {
      metrics: [
        { label: 'Lead Qualification', value: 40, prefix: '+', suffix: '%' },
        { label: 'CAC Reduction', value: 25, prefix: '-', suffix: '%' },
      ],
      testimonial: {
        quote:
          'I needed someone who understood both pizza and people. Rodrigo worked his magic! Created separate journeys for Facebook explorers vs Google-ready investors.',
        author: 'Arnaldo Di Blasi',
        role: 'Founder, Di Blasi',
      },
      businessImpact:
        "The redesigned franchise funnel drove a 40% improvement in lead qualification within three months of launch and a 25% reduction in Customer Acquisition Cost, enabling Di Blasi's national expansion strategy.",
    },

    metaDescription:
      "UX case study: Redesigning Di Blasi's franchise acquisition funnel with intent-based user journeys to improve lead quality by 40% and reduce CAC by 25%.",
    keywords: ['UX case study', 'landing page design', 'franchise', 'food service', 'conversion optimization', 'CAC reduction'],
  },

  // ─── 4. AXA GO Agent's Coach ────────────────────────────────────────────────
  {
    slug: 'axa-go-agents-coach',
    title: "AXA GO Agent's Coach",
    client: 'AXA Group Operations',
    industry: 'Insurance',
    thumbnail: '/images/work/00. Case Covers/Customer Simulator.png',
    heroImage: '/images/work/03. Axa Go/AXA Go 01-min.png',
    clientLogo: '/images/Client Logos/Client Name=Axa.png',
    tagline: 'AI-Driven Training to Improve Onboarding and Retention',
    description:
      'Designed an AI-driven training PoC for AXA Group Operations — a personalized course generator and customer simulator validated across five European entities, winning internal innovation recognition.',
    services: ['AI-Driven Training', 'UX Design', 'Cross-Functional Collaboration'],
    outcomes: ['AI PoC Validated', 'Innovation Award', 'Cross-Entity Research'],
    metrics: [
      { label: 'Validated Feasibility', value: 43, suffix: '%' },
    ],
    featured: true,
    year: '2024',
    timeline: '5 months',
    role: 'Product Designer',
    tools: ['Figma', 'Maze', 'Miro', 'Confluence'],

    problem: {
      background:
        'AXA faced unprecedented attrition rates among sales agents, compounded by inefficient knowledge transfer across its entities. Training methodologies were costly and often outdated due to constant changes in products, underwriting laws, and regulations. The goal was to create a Proof of Concept leveraging AI-driven tools to enhance onboarding, improve retention, and validate scalable solutions.',
      painPoints: [
        'Sales representatives struggled with outdated training materials, leading to disengagement and high turnover.',
        'Knowledge transfer was slow and inconsistent across five AXA entities (Germany, Spain, Italy, France, Switzerland).',
        'No dynamic system existed to keep training materials current as products, regulations, and underwriting laws evolved.',
      ],
      businessChallenge:
        'AXA needed a scalable, AI-driven training PoC demonstrating measurable improvement in onboarding efficiency and retention across multiple entities, without proportionally increasing training-team headcount.',
    },

    solution: {
      approach:
        'We designed and validated a Proof of Concept across five AXA entities, collaborating with developers and AI specialists on technical feasibility. The solution centred on two AI-powered tools: a personalized course generator and a realistic customer conversation simulator.',
      keyDecisions: [
        'AI Course Generator — personalized training materials (quizzes and tests) that adapt dynamically to individual agent learning paths.',
        'Customer Simulator — a risk-free environment for agents to practise realistic customer interactions using AI-generated personas.',
        'Cross-entity research spanning Germany, Spain, Italy, France, and Switzerland to capture diverse training needs and validate scalability.',
      ],
      images: [
        {
          src: '/images/work/03. Axa Go/AXA Go 02-min.png',
          alt: 'AI coaching conversation interface',
          caption: 'The customer simulator interface for practising real-world sales conversations.',
          aspectRatio: '16/9',
        },
        {
          src: '/images/work/03. Axa Go/AXA Go 03-min.png',
          alt: 'AI course generator dashboard',
          caption: "Personalized course generator adapting training content to each agent's learning path.",
          aspectRatio: '16/9',
        },
        {
          src: '/images/work/03. Axa Go/AXA Go 04-min.png',
          alt: 'Cross-entity research synthesis',
          caption: 'Research synthesis across five AXA entities informing the training PoC design.',
          aspectRatio: '16/9',
        },
      ],
    },

    results: {
      metrics: [
        { label: 'Validated Feasibility', value: 43, suffix: '%' },
      ],
      testimonial: {
        quote:
          "Apart from his technical skills, Rodrigo is open minded, communicative and always available to help his colleagues, skills that make him an excellent match for any team. Working with him has been a valuable experience, I learnt from him lots of his expertise in UI following all the years he's been working as designer. I would absolutely collaborate with him again in the future if we have the opportunity. I highly recommend Rodrigo Seoane to any team looking for an experienced product designer.",
        author: 'Pablo Fernandez Alvarez',
        role: 'Lead Designer, AXA Group Operations',
      },
      businessImpact:
        'The PoC won internal innovation recognition within AXA Group Operations and secured approval to advance to a live pilot with a specific entity — validating the scalability of AI-driven tools for agent training across the network.',
    },

    metaDescription:
      'UX case study: Designing an AI training PoC for AXA Group Operations — a customer simulator and personalized course generator validated across five European entities.',
    keywords: ['UX case study', 'AI training', 'insurance', 'agent coaching', 'proof of concept', 'AXA'],
  },

  // ─── 5. Atlas Optimise ──────────────────────────────────────────────────────
  {
    slug: 'atlas-optimise',
    title: 'Atlas Optimise®',
    client: 'ATS Global',
    industry: 'SaaS',
    thumbnail: '/images/work/00. Case Covers/Optimise.png',
    heroImage: '/images/work/02. Atlas Optimise/Atlas Optimise 01-min.png',
    tagline: 'Scaling from 0 to 1 with User-Centric Design',
    description:
      "Designed role-based dashboards and a B2B resource marketplace for ATS Global's Atlas platform, increasing enterprise customer retention by 31% within six months.",
    services: ['UX Research', 'Platform Design', 'Cross-Functional Collaboration'],
    outcomes: ['Increased Enterprise Retention', 'B2B Marketplace Launch'],
    metrics: [
      { label: 'Enterprise Customer Retention', value: 31, prefix: '+', suffix: '%' },
      { label: 'New Leads (B2B Marketplace)', value: 16, prefix: '+', suffix: '%' },
    ],
    featured: true,
    year: '2024',
    timeline: '6 months',
    role: 'Lead UX Designer',
    tools: ['Figma', 'Notion', 'Miro', 'Amplitude'],

    problem: {
      background:
        'Atlas needed to expand its iBPM platform into resource management, but faced challenges due to siloed stakeholders and early designs that alienated non-technical managers. The goal was to create a unified strategy that would enhance user engagement, align cross-functional teams, and unlock a new B2B marketplace revenue stream.',
      painPoints: [
        'Siloed stakeholders across product, engineering, and executive functions prevented alignment on product direction.',
        'Early designs prioritised operator complexity over manager usability, alienating the key decision-makers at renewal.',
        'No role-based separation existed — managers and operators were served the same interface despite fundamentally different goals.',
      ],
      businessChallenge:
        'Atlas needed to increase the perceived and actual ROI of the platform for enterprise clients to protect a critical revenue segment, while simultaneously launching a B2B resource marketplace to open a new revenue stream.',
    },

    solution: {
      approach:
        'The solution ran on two tracks: simplifying the analytics and navigation layer for non-technical managers, and building a resource marketplace for enterprises to trade idle capacity. Both shared the principle of surfacing value before complexity. Cross-functional workshops aligned PMs, engineers, and executives before any design work began.',
      keyDecisions: [
        'Cross-functional workshops with PMs, engineers, and executives to define personas and align on OKRs before any design began.',
        'Role-based dashboards — managers see high-level ROI metrics and simplified navigation; operators retain the full feature set.',
        'Scalable design system enabling consistent UI across all marketplace touchpoints and reducing design-engineering debate.',
      ],
      images: [
        {
          src: '/images/work/02. Atlas Optimise/Atlas Optimise 02-min.png',
          alt: 'Executive ROI dashboard',
          caption: 'Executive summary view surfacing value metrics in plain language.',
          aspectRatio: '16/9',
        },
        {
          src: '/images/work/02. Atlas Optimise/Atlas Optimise 03-min.png',
          alt: 'B2B resource marketplace listing',
          caption: 'Marketplace listing with trust signals and SLA details.',
          aspectRatio: '16/9',
        },
        {
          src: '/images/work/02. Atlas Optimise/Atlas Optimise 04-min.png',
          alt: 'Role-based operator dashboard',
          caption: 'Operator dashboard with full feature access distinct from the manager view.',
          aspectRatio: '16/9',
        },
      ],
    },

    results: {
      metrics: [
        { label: 'Enterprise Customer Retention', value: 31, prefix: '+', suffix: '%' },
        { label: 'New Leads (B2B Marketplace)', value: 16, prefix: '+', suffix: '%' },
      ],
      testimonial: {
        quote:
          "Rodrigo's user-centric approach was transformative. By rebalancing functionality for managers and operators through role-based dashboards and rapid prototyping, we didn't just simplify navigation, we operationalized scalability.",
        author: 'Martin Kelman',
        role: 'CDTO, ATS Global',
      },
      businessImpact:
        'Enterprise customer retention increased by 31% within six months. The B2B Resource Marketplace launch generated 16% new leads, validating a new revenue stream for ATS Global.',
    },

    metaDescription:
      'UX case study: Designing Atlas Optimise® for ATS Global — role-based dashboards and a B2B marketplace that increased enterprise retention by 31%.',
    keywords: ['UX case study', 'SaaS platform', 'resource management', 'B2B marketplace', 'enterprise retention', 'role-based design'],
  },
]

// --- Helpers ---

export function getFeaturedCaseStudies(): CaseStudy[] {
  return caseStudies.filter((study) => study.featured)
}

export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
  return caseStudies.find((study) => study.slug === slug)
}

export function getCaseStudiesByIndustry(industry: Industry): CaseStudy[] {
  return caseStudies.filter((study) => study.industry === industry)
}

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
