'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'
import { Badge } from '@/components/ui/Badge'
import { staggerContainer, fadeUp } from '@/lib/utils/animations'
import type { CaseStudy } from '@/lib/data/case-studies'

interface CaseStudyHeroProps {
  caseStudy: CaseStudy
}

const metricVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
}

export function CaseStudyHero({ caseStudy }: CaseStudyHeroProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <section ref={ref} className="bg-primary-yellow pt-8 pb-12 lg:pb-16">
      <div className="container mx-auto px-6 lg:px-20">
        {/* Top metadata */}
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
          className="max-w-3xl"
        >
          <motion.div variants={fadeUp} className="flex items-center gap-3 mb-4">
            <Badge variant="warning">{caseStudy.industry}</Badge>
            <span className="text-dark-500 text-sm">{caseStudy.year}</span>
            <span className="text-dark-500 text-sm">{caseStudy.timeline}</span>
          </motion.div>

          {/* Client logo or client name text */}
          <motion.div variants={fadeUp} className="mb-3">
            {caseStudy.clientLogo ? (
              <Image
                src={caseStudy.clientLogo}
                alt={caseStudy.client}
                width={120}
                height={40}
                className="object-contain"
              />
            ) : (
              <p className="font-sans font-bold text-xl text-[#001d6c] uppercase tracking-[1px]">
                {caseStudy.client}
              </p>
            )}
          </motion.div>

          {/* Project title */}
          <motion.h1
            variants={fadeUp}
            className="font-display font-bold text-4xl lg:text-5xl text-dark-900 leading-[1.1]"
          >
            {caseStudy.title}
          </motion.h1>
        </motion.div>

        {/* Hero image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mt-8 relative aspect-video w-full overflow-hidden rounded-lg bg-dark-150"
        >
          <Image
            src={caseStudy.heroImage}
            alt={`${caseStudy.title} -- hero image`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1200px) 90vw, 80vw"
            className="object-cover"
            priority
          />
        </motion.div>

        {/* Metric badges */}
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
          className="mt-6 flex flex-wrap gap-3"
        >
          {caseStudy.metrics.map((metric, i) => (
            <motion.div key={i} variants={metricVariants}>
              <Badge variant="default" className="bg-white text-dark-900 text-sm font-semibold px-4 py-2">
                {metric.prefix}{metric.value}{metric.suffix} {metric.label}
              </Badge>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
