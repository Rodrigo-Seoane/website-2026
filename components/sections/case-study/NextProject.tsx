'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import type { CaseStudy } from '@/lib/data/case-studies'

interface NextProjectProps {
  caseStudy: CaseStudy
}

export function NextProject({ caseStudy }: NextProjectProps) {
  return (
    <Link
      href={`/work/${caseStudy.slug}`}
      className="group block bg-dark-900"
    >
      <div className="container mx-auto px-6 lg:px-20 py-16 lg:py-20">
        <div className="flex flex-col lg:flex-row lg:items-center gap-8">
          {/* Text column */}
          <div className="flex-1">
            <p className="text-dark-500 text-sm uppercase tracking-widest mb-3">
              Up Next
            </p>
            <h2
              className="font-display font-bold text-3xl lg:text-4xl text-dark-50
                         group-hover:text-primary-yellow transition-colors duration-300"
            >
              {caseStudy.title}
            </h2>
            <div className="mt-3">
              <Badge variant="default" className="bg-dark-900/50 text-dark-50 border border-dark-border">
                {caseStudy.industry}
              </Badge>
            </div>
            <div className="mt-6 flex items-center gap-2 text-primary-yellow font-semibold">
              View Case Study
              <ArrowRight
                size={20}
                className="group-hover:translate-x-2 transition-transform duration-300"
              />
            </div>
          </div>

          {/* Thumbnail */}
          <div className="flex-1 relative aspect-video overflow-hidden rounded-lg bg-dark-surface">
            <motion.div
              className="h-full"
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            >
              <Image
                src={caseStudy.thumbnail}
                alt={`${caseStudy.title} preview`}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </Link>
  )
}
