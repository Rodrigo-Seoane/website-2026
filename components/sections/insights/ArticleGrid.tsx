'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CategoryFilter } from '@/components/ui/CategoryFilter'
import { FeaturedArticle } from './FeaturedArticle'
import { ArticleCard } from './ArticleCard'
import {
  getFeaturedArticle,
  getNonFeaturedArticles,
  getAllArticleCategories,
} from '@/lib/data/articles'

/**
 * Composes the category filter, the featured hero card, and the responsive
 * article grid.  All filtering logic lives here -- mirrors the pattern in
 * app/work/page.tsx exactly (useState + useMemo + AnimatePresence with layout).
 *
 * Grid columns: 1 (mobile) -> 2 (sm) -> 3 (lg)
 */
export function ArticleGrid() {
  const [activeCategory, setActiveCategory] = useState<string>('All')

  // Derive filter pills once: ['All', ...unique categories in data order]
  const categories = useMemo(() => ['All', ...getAllArticleCategories()], [])

  const featured = getFeaturedArticle()

  // Filter non-featured articles client-side
  const filteredArticles = useMemo(
    () =>
      activeCategory === 'All'
        ? getNonFeaturedArticles()
        : getNonFeaturedArticles().filter((a) => a.category === activeCategory),
    [activeCategory]
  )

  // When a category filter is active, also hide the featured card if it does
  // not match.  When "All" is selected the featured card is always visible.
  const showFeatured =
    activeCategory === 'All' || (featured?.category === activeCategory)

  return (
    <div className="bg-white dark:bg-dark-background py-10 lg:py-14">
      <div className="container mx-auto px-6 lg:px-20">
        {/* Category filter bar */}
        <CategoryFilter
          categories={categories}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />

        {/* Featured article -- animated in/out when filtered */}
        <AnimatePresence mode="popLayout">
          {showFeatured && featured && (
            <motion.div
              key="featured"
              layout
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="mt-8"
            >
              <FeaturedArticle article={featured} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Article grid -- 1 col mobile / 2 col sm / 3 col lg */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredArticles.map((article, index) => (
              <motion.div
                key={article.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <ArticleCard article={article} priority={index < 3} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Empty state when a filter returns zero results */}
        {filteredArticles.length === 0 && !showFeatured && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-12 text-center text-dark-500 dark:text-dark-150 text-lg"
          >
            No articles in this category yet. Check back soon.
          </motion.p>
        )}
      </div>
    </div>
  )
}
