'use client'

import { InsightsHero, ArticleGrid } from '@/components/sections/insights'

/**
 * Insights page -- client component because ArticleGrid owns the category
 * filter state.  SEO metadata lives in the sibling layout.tsx (same pattern
 * as app/work/).
 */
export default function InsightsPage() {
  return (
    <div className="min-h-screen">
      <InsightsHero />
      <ArticleGrid />
    </div>
  )
}
