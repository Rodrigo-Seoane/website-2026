'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils/cn'

interface CategoryFilterProps {
  categories: string[]
  activeCategory: string
  onCategoryChange: (category: string) => void
}

export function CategoryFilter({
  categories,
  activeCategory,
  onCategoryChange,
}: CategoryFilterProps) {
  return (
    <div className="flex gap-3 overflow-x-auto pb-2" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
      {categories.map((category) => {
        const isActive = category === activeCategory
        return (
          <button
            key={category}
            onClick={() => onCategoryChange(category)}
            className={cn(
              'relative z-10 px-5 py-2 rounded-full text-sm font-semibold',
              'whitespace-nowrap transition-colors duration-200',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-dark-900',
              isActive ? 'text-dark-50' : 'text-dark-900 border border-dark-900/30 hover:border-dark-900'
            )}
          >
            {/* Animated background pill -- only rendered for the active button */}
            {isActive && (
              <motion.span
                layoutId="category-filter-bg"
                className="absolute inset-0 bg-dark-900 rounded-full"
                style={{ zIndex: -1 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
              />
            )}
            {category}
          </button>
        )
      })}
    </div>
  )
}
