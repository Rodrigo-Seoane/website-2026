export interface PricingPlan {
  id: string
  name: string
  duration: string
  price: number
  currency: string
  description: string
  features: string[]
  cta: string
  ctaUrl: string
  featured?: boolean
  badge?: string
}

export interface FAQItem {
  id: string
  question: string
  answer: string
}

export interface Benefit {
  id: string
  title: string
  description: string
  icon?: string
}

export interface ProcessStep {
  id: string
  number: number
  title: string
  description: string
}

export interface QualificationCard {
  id: string
  icon: 'revenue' | 'action' | 'quality'
  text: string
}

export interface EligibilityContent {
  headline: string
  intro: string
  criteria: string[]
  closingCopy: string
}

export const heroContent = {
  label: 'UX PULSE CHECK',
  headline: 'UX Pulse Check',
  subheadline: 'Diagnose invisible UX wounds bleeding your revenue.',
  bodyCopy: 'My UX Pulse Check delivers surgical audits that pinpoint exactly where your app loses users and money—with € recovery estimates and ready-to-implement solutions in 3 days.',
  ctaText: 'Request Diagnosis',
  ctaUrl: '#contact-form',
}

export const problemContent = {
  headline: 'Understanding the hurdles from the inside out.',
  bodyCopy: `No matter which industry you belong to, time is often an asset in short supply and teams are repeatedly requested to ship products and features on tight deadlines.

This approach, while pragmatic in the short term, leads to the accumulation of UX debt—an array of overlooked user experience issues that become barriers for users, detracting from the usability of the product and potentially causing them to abandon not just the purchase but the brand itself.`,
}

export const benefits: Benefit[] = [
  {
    id: 'benefit-1',
    title: 'Streamlined User Journey',
    description:
      'Understand pain points and friction in your current user flow that cause drop-offs and abandoned sessions.',
  },
  {
    id: 'benefit-2',
    title: 'Prioritized Actionable Insights',
    description:
      'Get a clear roadmap of improvements ranked by impact, so you know exactly where to focus your resources first.',
  },
  {
    id: 'benefit-3',
    title: 'Clarity on User Experience Flaws',
    description:
      'Pinpoint the exact disconnects between what users expect and what your product delivers that cause churn.',
  },
  {
    id: 'benefit-4',
    title: 'Enhanced User Retention Strategy',
    description:
      'Receive data-backed retention strategies that address why users leave, helping you build experiences that turn one-time users into loyal customers who stay and grow with your product.',
  },
]

export const processSteps: ProcessStep[] = [
  {
    id: 'step-1',
    number: 1,
    title: 'Order your Audit',
    description:
      'Book an introductory call to explain your current struggles and share what&apos;s keeping users from succeeding with your product.',
  },
  {
    id: 'step-2',
    number: 2,
    title: 'Design Review',
    description:
      'I will identify the pain points and quick wins to improve in your app to deliver a great experience to users, analyzing your key flows with expert heuristics.',
  },
  {
    id: 'step-3',
    number: 3,
    title: 'Receive Report',
    description:
      'I send you a comprehensive report with actionable recommendations for your key issues, aligned with business goals and customer needs—complete with € impact estimates.',
  },
  {
    id: 'step-4',
    number: 4,
    title: 'Implement Right Away',
    description:
      'Start implementing the design changes and recommendations into your key screens, supported by prioritized roadmaps and production-ready specifications.',
  },
]

export const pricingSectionContent = {
  headline: 'Flexible pricing plans for your needs',
  subheadline: 'Transparent pricing designed for B2B SaaS teams who need results fast. Choose the option that matches your timeline and implementation readiness.',
}

export const pricingPlans: PricingPlan[] = [
  {
    id: 'plan-essentials',
    name: 'UX Audit Essentials',
    duration: '3-5 business days',
    price: 490,
    currency: '€',
    description: 'Startups and growth-stage businesses needing rapid identification of experience leaks and conversion barriers.',
    features: [
      'Heuristic analysis of 3 core user flows',
      'Conversion leak diagnosis with € impact estimates',
      'Quick-win prioritization matrix',
      'Competitor UX benchmarking',
    ],
    cta: 'Select UX Audit Essentials',
    ctaUrl: '#contact-form',
  },
  {
    id: 'plan-redesign',
    name: 'UX Audit + UI Redesign',
    duration: '7-10 business days',
    price: 1490,
    currency: '€',
    description: 'Product teams ready to implement solutions immediately. Fix critical UX issues with production-ready designs.',
    features: [
      'Everything in UX Audit Essentials',
      'UI redesign of 3-5 critical screens',
      'Mobile/desktop responsive variants',
      'Developer handoff package (Figma specs, assets)',
      '1-day retainer for implementation guidance',
    ],
    cta: 'Select UX Audit + UI Redesign',
    ctaUrl: '#contact-form',
    featured: true,
    badge: 'Best Value',
  },
]

export const qualificationCards: QualificationCard[] = [
  {
    id: 'qual-1',
    icon: 'revenue',
    text: 'Your business is generating a solid revenue stream',
  },
  {
    id: 'qual-2',
    icon: 'action',
    text: 'You want to uncover key UX issues and act on them now',
  },
  {
    id: 'qual-3',
    icon: 'quality',
    text: 'You have high expectations for design and quality',
  },
]

export const eligibilityContent: EligibilityContent = {
  headline: 'Is this service for you?',
  intro: 'This service delivers the best results when there&apos;s mutual alignment. Here&apos;s who benefits most from a UX Pulse Check:',
  criteria: [
    'You&apos;re a SaaS, ecommerce, or web app that needs strategic direction.',
    'Your business is generating revenue and ready to invest in growth.',
    'You want to uncover key UX issues and act on them immediately.',
    'You&apos;re open to constructive criticism and willing to implement changes.',
    'You have high expectations for design quality and user experience.',
    'You&apos;re committed to doing what it takes to achieve measurable results.',
  ],
  closingCopy: 'If this sounds like you, let&apos;s talk about how a UX Pulse Check can accelerate your product&apos;s success.',
}

export const faqItems: FAQItem[] = [
  {
    id: 'faq-1',
    question: 'What are the benefits of a UX Audit?',
    answer: 'A UX Audit can significantly enhance your product&apos;s market competitiveness. It can lead to better user engagement, higher conversion rates, and increased retention by removing friction points in the user experience. These improvements can directly boost revenue and contribute positively to your company&apos;s profitability.',
  },
  {
    id: 'faq-2',
    question: 'What does the UX Audit deliver?',
    answer: `My UX Audit delivers **actionable revenue recovery plans**, not just generic feedback. You receive:

1. **Video Diagnosis**: 5-minute Loom walkthrough highlighting your top 3 revenue leaks with € impact estimates
2. **Interactive Fix Map**: Clickable Miro board showing exactly where and how to implement changes
3. **Priority Roadmap**: Sorted by effort vs. impact—know what to fix first to recover 15-30% lost revenue
4. **Competitor Benchmarks**: See how your key flows compare to category leaders

*(For UX Audit + UI Redesign add: Production-ready Figma screens + 1-day retainer voucher)*`,
  },
  {
    id: 'faq-3',
    question: 'What is the timeline for a UX Audit?',
    answer: 'Our standard UX Audit process is completed within 3 to 10 business days depending on the selected package. For more extensive data collection and analysis, we offer tailored solutions to suit your timeline and specific needs.',
  },
  {
    id: 'faq-4',
    question: 'Is a UX Audit beneficial for startups?',
    answer: `A UX Audit acts as your **reality check against intuition**, surgically identifying where rushed design decisions create revenue leaks. By analyzing real user behavior, it replaces gut feelings with data-backed insights to:

1. **Fix conversion killers** you didn&apos;t spot during rapid builds
2. **Prioritize high-impact tweaks** that recover 15-30% of lost revenue
3. **Prevent costly redesigns** later by grounding future development in user needs

All delivered in days so you can keep shipping fast *without* sacrificing growth.`,
  },
  {
    id: 'faq-5',
    question: 'How frequently should a UX Audit be conducted?',
    answer: 'For startups and growth-stage companies, an annual UX Audit is typically sufficient to maintain momentum. However, enterprise companies or products undergoing significant changes may benefit from quarterly audits to maintain engagement, reduce churn, and focus on innovation rather than fixing usability issues.',
  },
  {
    id: 'faq-6',
    question: 'Can a UX Audit help our SEO and online presence?',
    answer: 'While the primary focus of a UX Audit is to enhance user experience, improvements in UX often correlate with better SEO performance. Search engines like Google factor in user engagement metrics such as bounce rate, time on page, and task completion. By making your site more user-friendly and reducing friction, you may also see improvements in search rankings and online visibility.',
  },
]

export const finalCTAContent = {
  headline: 'Ready to transform your User Experience?',
  subheadline: 'Let&apos;s talk about how we can realign your product with your users&apos; needs and start turning those challenges into measurable growth. No strings attached.',
  ctaText: 'Start Your UX Diagnosis',
  ctaUrl: '#contact-form',
}

export const contactFormContent = {
  headline: 'Get started with your UX Pulse Check',
  intro: 'Share a few details about your project and I&apos;ll get back to you within 24 hours to discuss how we can improve your user experience.',
  serviceOptions: [
    'UX Audit Essentials (€490)',
    'UX Audit + UI Redesign (€1,490)',
    'Not sure yet - Let&apos;s discuss',
  ],
  successMessage: 'Thank you! Your request has been received. I&apos;ll review your details and get back to you within 24 hours to discuss your UX Pulse Check.',
  errorMessage: 'Oops! Something went wrong while submitting the form. Please check your connection and try again, or email me directly at hello@rodrigoseoane.com.',
}
