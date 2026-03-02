'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { caseStudies, getAllIndustries } from '@/lib/data/case-studies'
import { CategoryFilter } from '@/components/ui/CategoryFilter'
import { CaseStudyCard } from '@/components/ui/CaseStudyCard'
import { staggerContainer, fadeUp } from '@/lib/utils/animations'

export default function WorkPage() {
  const [activeCategory, setActiveCategory] = useState<string>('All')

  // Derive categories once: ['All', ...unique industries in data order]
  const categories = useMemo(() => ['All', ...getAllIndustries()], [])

  // Filter case studies client-side
  const filteredStudies = useMemo(
    () =>
      activeCategory === 'All'
        ? caseStudies
        : caseStudies.filter((study) => study.industry === activeCategory),
    [activeCategory]
  )

  return (
    <div className="min-h-screen">
      {/* Page Header */}
      <div className="bg-primary-yellow py-16 lg:py-20">
        <div className="container mx-auto px-6 lg:px-20">
          <h1 className="font-display text-4xl lg:text-5xl font-bold text-dark-900">
            Work
          </h1>
          <p className="mt-3 text-dark-900/70 text-lg max-w-xl">
            Case studies showcasing measurable impact through thoughtful design.
          </p>
        </div>
      </div>

      {/* Filter bar + Grid */}
      <div className="bg-white py-10 lg:py-14">
        <div className="container mx-auto px-6 lg:px-20">
          {/* Filter */}
          <CategoryFilter
            categories={categories}
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
          />

          {/* Case study grid */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredStudies.map((study, index) => (
                <motion.div
                  key={study.slug}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <CaseStudyCard caseStudy={study} priority={index < 4} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  )
}
