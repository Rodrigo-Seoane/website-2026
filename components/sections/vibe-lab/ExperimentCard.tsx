'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import { cn } from '@/lib/utils/cn'
import type { Experiment } from '@/lib/data/experiments'

interface ExperimentCardProps {
  experiment: Experiment
}

/**
 * Compact experiment card following the CaseStudyCard pattern.
 * Features a subtle yellow glow on hover to differentiate from case studies.
 */
export function ExperimentCard({ experiment }: ExperimentCardProps) {
  const CardWrapper = experiment.url ? 'a' : 'div'
  const wrapperProps = experiment.url
    ? { href: experiment.url, target: '_blank', rel: 'noopener noreferrer' }
    : {}

  return (
    <CardWrapper
      {...wrapperProps}
      className={cn(
        'group block rounded-2xl overflow-hidden',
        'border border-neutral-200 dark:border-dark-border',
        'bg-white dark:bg-dark-surface',
        // Subtle glow on hover
        'hover:shadow-[0_0_30px_-5px_rgba(255,209,21,0.4)]',
        'transition-shadow duration-300'
      )}
    >
      <motion.div
        whileHover={{ y: -8, boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15)' }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="h-full"
      >
        {/* Thumbnail - aspect 16:9 for experiments */}
        <div className="relative aspect-video overflow-hidden bg-neutral-100 dark:bg-dark-700">
          <Image
            src={experiment.thumbnail}
            alt={experiment.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 600px"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />

          {/* Hover overlay */}
          <div className="absolute inset-0 bg-dark-900/0 group-hover:bg-dark-900/60 transition-all duration-300 flex items-center justify-center">
            {experiment.url && (
              <ArrowUpRight
                size={40}
                className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              />
            )}
          </div>

          {/* Status badge - top left */}
          <div className="absolute top-3 left-3">
            <Badge
              variant={experiment.status === 'live' ? 'success' : 'warning'}
            >
              {experiment.status === 'live' ? 'Live' : experiment.status}
            </Badge>
          </div>

          {/* Category badge - bottom right */}
          <div className="absolute bottom-3 right-3">
            <Badge variant="default" className="bg-white/90 text-dark-900 font-semibold">
              {experiment.category}
            </Badge>
          </div>
        </div>

        {/* Card body */}
        <div className="p-5">
          <h3 className="font-display font-bold text-lg text-dark-900 dark:text-neutral-100">
            {experiment.title}
          </h3>
          <p className="text-dark-500 dark:text-neutral-400 text-sm mt-1 line-clamp-2">
            {experiment.headline}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-3">
            {experiment.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs px-2 py-0.5 rounded bg-neutral-100 dark:bg-dark-border text-dark-500 dark:text-neutral-400"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </CardWrapper>
  )
}
