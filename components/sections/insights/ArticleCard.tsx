'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { ExternalLink } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import { cn } from '@/lib/utils/cn'
import { isMediumUrl } from '@/lib/data/articles'
import type { Article } from '@/lib/data/articles'

interface ArticleCardProps {
  article: Article
  /** Set to true for the first few visible cards so the browser prioritises them. */
  priority?: boolean
}

/**
 * Standard article card rendered inside the filtered grid.
 *
 * Hover behaviour is a direct port of CaseStudyCard:
 *   - motion.div lifts by 8 px and gains a deep shadow
 *   - thumbnail scales to 105 %
 *   - a dark overlay fades in over the image
 *
 * The card is an <a> that opens the external post in a new tab.
 * A visually-hidden suffix is appended for screen readers so they announce
 * that the link opens externally.
 */
export function ArticleCard({ article, priority = false }: ArticleCardProps) {
  const platform = isMediumUrl(article.linkedInUrl) ? 'Medium' : 'LinkedIn'

  return (
    <a
      href={article.linkedInUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${article.title} -- opens on ${platform} in a new tab`}
      className={cn(
        'group block rounded-2xl overflow-hidden',
        'border border-neutral-200 dark:border-dark-border',
        'bg-white dark:bg-dark-surface'
      )}
    >
      <motion.div
        whileHover={{ y: -8, boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="h-full"
      >
        {/* Thumbnail -- aspect-4/3, matching CaseStudyCard */}
        <div className="relative aspect-4/3 overflow-hidden bg-dark-150">
          <Image
            src={article.thumbnail}
            alt={article.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            priority={priority}
          />

          {/* Hover overlay -- dark wash + external-link icon */}
          <div className="absolute inset-0 bg-dark-900/0 group-hover:bg-dark-900/60 transition-all duration-300 flex items-center justify-center">
            <ExternalLink
              size={40}
              className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              aria-hidden="true"
            />
          </div>

          {/* Category badge -- top left, mirroring the industry badge position */}
          <div className="absolute top-3 left-3">
            <Badge variant="warning">{article.category}</Badge>
          </div>

          {/* Platform indicator -- bottom right */}
          <div className="absolute bottom-3 right-3">
            <Badge variant="default" className="bg-white/90 text-dark-900 font-semibold">
              {platform}
            </Badge>
          </div>
        </div>

        {/* Card body */}
        <div className="p-5">
          <h3 className="font-display font-bold text-lg text-dark-900 dark:text-dark-50 leading-snug">
            {article.title}
          </h3>

          {/* External link affordance row */}
          <p className="text-dark-500 dark:text-dark-150 text-sm mt-2 flex items-center gap-1.5">
            <ExternalLink size={13} aria-hidden="true" />
            <span>Read on {platform}</span>
          </p>
        </div>
      </motion.div>
    </a>
  )
}
