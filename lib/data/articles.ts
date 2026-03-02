// ---------------------------------------------------------------------------
// Article data for the Insights page.
// ---------------------------------------------------------------------------

export interface Article {
  id: string
  title: string
  category: ArticleCategory
  /** Full URL to the LinkedIn or Medium post. */
  linkedInUrl: string
  /** Path relative to /public -- e.g. '/images/insights/01-Art Simplify.png' */
  thumbnail: string
  /** Exactly one article is displayed as the featured hero card. */
  featured: boolean
}

export type ArticleCategory =
  | 'UX Strategy'
  | 'Customer Retention'
  | 'B2B SaaS'
  | 'Thought Leadership'

// ---------------------------------------------------------------------------
// Static data
// ---------------------------------------------------------------------------

export const articles: Article[] = [
  {
    id: 'art-simplifying-checkout',
    title: 'The Art of Simplifying Your Checkout Process',
    category: 'UX Strategy',
    linkedInUrl:
      'https://www.linkedin.com/pulse/art-simplifying-your-checkout-process-rodrigoseoane-zfwcf',
    thumbnail: '/images/insights/01-Art Simplify.png',
    featured: true,
  },
  {
    id: 'flawless-onboarding',
    title: 'How a Flawless Onboarding Increases User Retention',
    category: 'Customer Retention',
    linkedInUrl:
      'https://www.linkedin.com/pulse/how-flawless-onboarding-increases-user-retention-rodrigoseoane-iubvf',
    thumbnail: '/images/insights/02-Flawless-Onboarding.png',
    featured: false,
  },
  {
    id: 'onboarding-pitfalls',
    title: 'Unveiling Common Onboarding Pitfalls in SaaS Apps',
    category: 'B2B SaaS',
    linkedInUrl:
      'https://www.linkedin.com/pulse/unveiling-common-onboarding-pitfalls-saas-apps-rodrigoseoane-ixl2f',
    thumbnail: '/images/insights/03-Common Pitfalls.png',
    featured: false,
  },
  {
    id: 'smart-decisions',
    title: 'How to make smart decisions? Tips to help.',
    category: 'Thought Leadership',
    linkedInUrl:
      'https://www.linkedin.com/pulse/how-make-smart-decisions-tips-help-rodrigoseoane-zjvnf',
    thumbnail: '/images/insights/04-Smart Decisions.png',
    featured: false,
  },
  {
    id: 'ux-agile-backlog',
    title: 'Implementing UX into Agile Backlog',
    category: 'UX Strategy',
    linkedInUrl:
      'https://www.linkedin.com/pulse/implementing-ux-agile-backlog-rodrigoseoane',
    thumbnail: '/images/insights/05-UX to Agile.png',
    featured: false,
  },
  {
    id: 'ux-debt-101',
    title: 'UX Debt 101 | Symptoms, Impact & Solutions',
    category: 'UX Strategy',
    linkedInUrl:
      'https://www.linkedin.com/pulse/ux-debt-101-symptoms-impact-solutions-rodrigoseoane',
    thumbnail: '/images/insights/06-UX Debt.png',
    featured: false,
  },
  {
    id: 'ui-audit',
    title: 'Do you understand the issues users have with your product?',
    category: 'UX Strategy',
    linkedInUrl:
      'https://rodrigoseoane.medium.com/how-to-audit-your-ui-in-60-minutes-9d6a1bfd4dc3',
    thumbnail: '/images/insights/07-UI-Possible-Design.png',
    featured: false,
  },
  {
    id: 'platform-service-ux-designer',
    title:
      'Qual a diferença entre o designer de Plataformas, designer de Serviços e o UX designer?',
    category: 'Thought Leadership',
    linkedInUrl:
      'https://rodrigoseoane.medium.com/qual-a-diferen%C3%A7a-entre-o-designer-de-plataformas-designer-de-servi%C3%A7os-e-o-ux-designer-8d05828704a7',
    thumbnail: '/images/insights/07-UI-Possible-Design.png',
    featured: false,
  },
]

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Returns the single featured article, or undefined if none is marked. */
export function getFeaturedArticle(): Article | undefined {
  return articles.find((a) => a.featured)
}

/** Returns all non-featured articles. */
export function getNonFeaturedArticles(): Article[] {
  return articles.filter((a) => !a.featured)
}

/**
 * Returns deduplicated categories in first-appearance order --
 * mirrors the pattern used by getAllIndustries() in case-studies.ts.
 */
export function getAllArticleCategories(): ArticleCategory[] {
  const seen = new Set<ArticleCategory>()
  const result: ArticleCategory[] = []
  for (const article of articles) {
    if (!seen.has(article.category)) {
      seen.add(article.category)
      result.push(article.category)
    }
  }
  return result
}

/** Determines whether a URL points to Medium (vs LinkedIn). */
export function isMediumUrl(url: string): boolean {
  return url.includes('medium.com')
}
