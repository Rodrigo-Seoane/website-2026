'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { AnimatedCounter } from '@/components/ui/AnimatedCounter'
import { staggerContainer, fadeUp } from '@/lib/utils/animations'
import type { CaseStudy } from '@/lib/data/case-studies'

interface CaseStudyResultsProps {
  caseStudy: CaseStudy
}

export function CaseStudyResults({ caseStudy }: CaseStudyResultsProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const { results } = caseStudy

  return (
    <section id="results" ref={ref} className="bg-primary-yellow py-16 lg:py-24">
      <div className="container mx-auto px-6 lg:px-20">
        {/* Section heading */}
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={fadeUp}
          className="mb-12"
        >
          <div className="w-12 h-1 bg-dark-900 rounded mb-4" />
          <h2 className="font-display font-bold text-3xl lg:text-4xl text-dark-900">
            The Results
          </h2>
        </motion.div>

        {/* Metrics grid -- 3 columns desktop, 2 columns mobile */}
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
          className="grid grid-cols-2 lg:grid-cols-3 gap-6 mb-14"
        >
          {results.metrics.map((metric, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              className="bg-white/60 rounded-xl p-6 text-center"
            >
              <div className="text-5xl lg:text-6xl font-display font-bold text-dark-900">
                <AnimatedCounter
                  value={metric.value}
                  prefix={metric.prefix ?? ''}
                  suffix={metric.suffix ?? ''}
                  duration={2}
                />
              </div>
              <p className="text-dark-500 text-sm mt-2 font-medium">{metric.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Testimonial -- conditional */}
        {results.testimonial && (
          <motion.div
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={fadeUp}
            className="mb-10 max-w-2xl"
          >
            <blockquote className="border-l-4 border-orange-400 pl-6">
              <p className="text-lg text-dark-900 italic leading-relaxed">
                &ldquo;{results.testimonial.quote}&rdquo;
              </p>
              <footer className="mt-3">
                <cite className="font-semibold text-dark-900 not-italic">
                  {results.testimonial.author}
                </cite>
                <span className="text-dark-500 text-sm ml-2">
                  {results.testimonial.role}
                </span>
              </footer>
            </blockquote>
          </motion.div>
        )}

        {/* Business impact statement */}
        <motion.p
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={fadeUp}
          className="text-dark-900 text-base leading-relaxed max-w-2xl"
        >
          {results.businessImpact}
        </motion.p>
      </div>
    </section>
  )
}
