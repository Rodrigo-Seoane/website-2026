'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import { cn } from '@/lib/utils/cn'
import type { CaseStudy } from '@/lib/data/case-studies'

interface CaseStudyCardProps {
  caseStudy: CaseStudy
  priority?: boolean
}

export function CaseStudyCard({ caseStudy, priority = false }: CaseStudyCardProps) {
  // The "primary metric" is the first metric in the top-level metrics array.
  const primaryMetric = caseStudy.metrics[0]

  return (
    <Link
      href={`/work/${caseStudy.slug}`}
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
        {/* Thumbnail container -- aspect-4/3 enforced */}
        <div className="relative aspect-4/3 overflow-hidden bg-dark-150">
          <Image
            src={caseStudy.thumbnail}
            alt={caseStudy.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            priority={priority}
          />

          {/* Hover overlay with arrow icon */}
          <div className="absolute inset-0 bg-dark-900/0 group-hover:bg-dark-900/60 transition-all duration-300 flex items-center justify-center">
            <ArrowUpRight
              size={40}
              className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            />
          </div>

          {/* Industry badge -- top left */}
          <div className="absolute top-3 left-3">
            <Badge variant="warning">{caseStudy.industry}</Badge>
          </div>

          {/* Primary metric badge -- bottom right */}
          <div className="absolute bottom-3 right-3">
            <Badge variant="default" className="bg-white/90 text-dark-900 font-semibold">
              {primaryMetric.prefix}{primaryMetric.value}{primaryMetric.suffix} {primaryMetric.label}
            </Badge>
          </div>
        </div>

        {/* Card body */}
        <div className="p-5">
          <h3 className="font-display font-bold text-lg text-dark-900">{caseStudy.title}</h3>
          <p className="text-dark-500 text-sm mt-1">{caseStudy.client} -- {caseStudy.year}</p>

          {/* Service tags */}
          <div className="flex flex-wrap gap-2 mt-3">
            {caseStudy.services.map((service) => (
              <span
                key={service}
                className="text-xs px-2 py-0.5 rounded bg-neutral-100 text-dark-500"
              >
                {service}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </Link>
  )
}
