'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { ExternalLink } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import { cn } from '@/lib/utils/cn'
import { isMediumUrl } from '@/lib/data/articles'
import { fadeUp } from '@/lib/utils/animations'
import type { Article } from '@/lib/data/articles'

interface FeaturedArticleProps {
  article: Article
}

/**
 * Large hero card that sits above the regular grid.
 *
 * Layout:
 *   - Mobile:  stacked (image on top, text below)
 *   - md+:     side-by-side (image left 55 %, text right 45 %)
 *
 * The card uses the same hover lift + shadow as ArticleCard / CaseStudyCard
 * but the image aspect is wider (16/9) to give the featured piece visual weight.
 */
export function FeaturedArticle({ article }: FeaturedArticleProps) {
  const platform = isMediumUrl(article.linkedInUrl) ? 'Medium' : 'LinkedIn'

  return (
    <motion.a
      href={article.linkedInUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Featured: ${article.title} -- opens on ${platform} in a new tab`}
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      className={cn(
        'group block rounded-2xl overflow-hidden',
        'border border-neutral-200 dark:border-dark-border',
        'bg-white dark:bg-dark-surface'
      )}
    >
      <motion.div
        whileHover={{ y: -6, boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="grid grid-cols-1 md:grid-cols-[55fr_45fr]"
      >
        {/* Left / Top: thumbnail */}
        <div className="relative aspect-video md:aspect-auto md:min-h-[320px] overflow-hidden bg-dark-150">
          <Image
            src={article.thumbnail}
            alt={article.title}
            fill
            sizes="(max-width: 768px) 100vw, 55vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            priority
          />

          {/* Hover overlay */}
          <div className="absolute inset-0 bg-dark-900/0 group-hover:bg-dark-900/50 transition-all duration-300 flex items-center justify-center">
            <ExternalLink
              size={48}
              className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              aria-hidden="true"
            />
          </div>

          {/* Featured label -- top left */}
          <div className="absolute top-4 left-4 flex items-center gap-2">
            <Badge
              variant="warning"
              className="bg-primary-yellow text-dark-900 font-bold uppercase tracking-wide text-xs"
            >
              Featured
            </Badge>
          </div>
        </div>

        {/* Right / Bottom: content */}
        <div className="p-6 md:p-8 flex flex-col justify-center">
          {/* Category */}
          <Badge variant="default" className="w-fit">
            {article.category}
          </Badge>

          {/* Title */}
          <h2 className="font-display font-bold text-2xl md:text-3xl text-dark-900 dark:text-dark-50 mt-4 leading-tight text-balance">
            {article.title}
          </h2>

          {/* Spacer + external CTA */}
          <div className="mt-6 flex items-center gap-2 text-dark-500 dark:text-dark-150">
            <ExternalLink size={16} aria-hidden="true" />
            <span className="text-sm font-medium">
              Read the full article on {platform}
            </span>
          </div>
        </div>
      </motion.div>
    </motion.a>
  )
}
