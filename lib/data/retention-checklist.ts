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

export interface LeadFormData {
  name: string
  email: string
  company?: string
  role?: string
  consent: boolean
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

// --- Content Exports ---

export const checklistHeroContent: ChecklistHeroContent = {
  label: 'FREE ASSESSMENT',
  headline: '12 UX Red Flags Killing Your SaaS Retention',
  subheadline:
    'A quick diagnostic for Product Managers who want to stop losing users and start growing revenue.',
  bodyCopy:
    'Score your product\u2019s retention risk in under 3 minutes. Get actionable fixes you can prioritize with your team this week.',
  ctaText: 'Start Your Free Assessment',
  trustSignals: [
    'Takes under 3 minutes',
    'No credit card required',
    'Instant results',
  ],
}

export const responseOptions = [
  { label: 'Yes, this is a problem', value: 1 },
  { label: 'Partially \u2014 we have some issues', value: 0.5 },
  { label: 'No, we handle this well', value: 0 },
] as const

export const checklistItems: ChecklistItem[] = [
  {
    id: 'red-flag-01',
    number: 1,
    title: 'Your Onboarding Has No Clear "Aha Moment"',
    problem:
      'Users sign up but never experience the core value of your product. They wander through features without understanding why they should care, and drop off within the first session.',
    whyItMatters:
      'Users who don\u2019t reach their "aha moment" within the first 3\u20135 minutes have a 60\u201380% chance of never coming back. Every session without a clear value demonstration is a lost user.',
    fixIt:
      'Map your activation path: identify the ONE action users must complete to experience core value.\nReduce time-to-value by removing all friction before that moment.\nAdd a guided first-run experience that leads directly to the aha moment.',
  },
  {
    id: 'red-flag-02',
    number: 2,
    title: 'You\u2019re Asking Too Much Before Delivering Value',
    problem:
      'Your signup flow requires extensive profile setup, team invitations, integrations, or configuration before users can do anything useful. The setup feels like homework.',
    whyItMatters:
      'Every additional step in your signup flow causes 20\u201340% drop-off. Users are trading their time for a promise of value \u2014 the longer you delay that value, the more users abandon.',
    fixIt:
      'Apply progressive disclosure: only ask for what\u2019s needed RIGHT NOW.\nLet users experience the product before requiring full setup.\nMove non-essential configuration to post-activation settings.',
  },
  {
    id: 'red-flag-03',
    number: 3,
    title: 'Your Navigation Is a Maze',
    problem:
      'Users can\u2019t find key features. Your menu structure reflects your org chart or technical architecture rather than user tasks. Important actions are buried 3+ clicks deep.',
    whyItMatters:
      'When users can\u2019t find what they need within 2\u20133 clicks, they assume the feature doesn\u2019t exist or the product is too complex. Both lead to churn.',
    fixIt:
      'Restructure navigation around user tasks, not internal departments.\nEnsure primary actions are accessible within 1\u20132 clicks.\nRun a tree test or card sort with 5 users to validate your IA.',
  },
  {
    id: 'red-flag-04',
    number: 4,
    title: 'Empty States That Kill Momentum',
    problem:
      'When a user opens a new section for the first time, they see a blank page or a generic "no data yet" message. There\u2019s no guidance on what to do next.',
    whyItMatters:
      'Empty states are your product\u2019s first impression for each feature. A blank page communicates "nothing to see here" when it should communicate "here\u2019s how to get started."',
    fixIt:
      'Design every empty state as a mini-onboarding moment.\nInclude a clear CTA showing the user exactly what action to take.\nUse sample data or templates to demonstrate the feature\u2019s value.',
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
      'When users don\u2019t receive feedback, they don\u2019t know if their action worked. This creates anxiety, leads to repeated clicks, and erodes trust in your product\u2019s reliability.',
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
      'When a user stops logging in, nothing happens. No email, no in-app message when they return, no acknowledgment that they\u2019ve been away.',
    whyItMatters:
      'Dormant users represent recoverable revenue. Without re-engagement, a temporary absence becomes permanent churn. The cost of re-activating is far lower than acquiring new users.',
    fixIt:
      'Set up automated re-engagement emails triggered by inactivity (7, 14, 30 days).\nDesign a "welcome back" experience for returning dormant users.\nHighlight what\u2019s new or what they missed since their last visit.',
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
      'Let free users experience premium features in limited contexts (trials, previews).\nTrigger upgrade prompts at moments of demonstrated value, not arbitrary limits.\nShow the specific benefit they\u2019ll unlock, not just a feature list.',
  },
  {
    id: 'red-flag-12',
    number: 12,
    title: 'You Ship Features Without Validating Them',
    problem:
      'Your team ships new features based on stakeholder requests, competitor analysis, or gut instinct \u2014 but rarely tests with actual users before launch.',
    whyItMatters:
      'Unvalidated features accumulate UX debt. Each feature that doesn\u2019t match real user needs adds complexity without value, making the product harder to use and more expensive to maintain.',
    fixIt:
      'Test prototypes with 5 users before committing to development.\nRun discovery interviews to validate the problem exists before designing solutions.\nMeasure feature adoption post-launch and sunset features nobody uses.',
  },
]

export const leadCaptureContent: LeadCaptureContent = {
  headline: 'Your assessment is complete!',
  subheadline:
    'Enter your details to get your personalized results and the full PDF checklist with fix-it recommendations.',
  ctaText: 'Get My Results',
  privacyLabel:
    'I agree to receive my results and occasional UX insights. Unsubscribe anytime.',
  privacyNote: 'We respect your privacy. Your data is never shared.',
  roleOptions: [
    'Product Manager',
    'CTO',
    'Founder',
    'Design Leader',
    'Other',
  ],
}

export const resultsContent: ResultsContent = {
  headline: 'Your Retention Risk Score',
  tiers: [
    {
      tier: 'green',
      label: 'Solid Foundation',
      range: '0\u20133',
      summary:
        'Your UX foundation is strong. Focus on optimization and growth experiments.',
      recommendation:
        'Your product is in good shape. Consider periodic UX audits to maintain your edge and stay ahead of evolving user expectations.',
    },
    {
      tier: 'amber',
      label: 'Friction Is Building',
      range: '4\u20137',
      summary:
        'Friction is costing you users. Prioritize the top 3 red flags for quick wins.',
      recommendation:
        'You have fixable friction points. A targeted UX Pulse Check could help you prioritize and resolve them before they become retention emergencies.',
      recommendationCta: {
        text: 'Learn About UX Pulse Check',
        href: '/ux-pulse-check',
      },
    },
    {
      tier: 'red',
      label: 'Urgent Action Needed',
      range: '8\u201312',
      summary:
        'Users are struggling. You need a structured UX review to stop the bleeding.',
      recommendation:
        'Your product has significant UX issues affecting retention. A comprehensive UX Pulse Check with actionable recommendations can help turn things around fast.',
      recommendationCta: {
        text: 'Book a Free Discovery Call',
        href: 'https://calendly.com/rodrigo_seoane/discovery',
      },
    },
  ],
  downloadCtaText: 'Download Full PDF Checklist',
  downloadUrl: '/pdfs/12-ux-red-flags-checklist.pdf',
}

export const checklistCTAContent: ChecklistCTAContent = {
  primaryCta: {
    text: 'Book a Free Discovery Call',
    href: 'https://calendly.com/rodrigo_seoane/discovery',
  },
  secondaryCta: {
    text: 'Explore UX Pulse Check',
    href: '/ux-pulse-check',
  },
}
