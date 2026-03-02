'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { checklistHeroContent } from '@/lib/data/retention-checklist'
import { fadeUp, staggerContainer } from '@/lib/utils/animations'

interface ChecklistHeroProps {
  onStart: () => void
}

export function ChecklistHero({ onStart }: ChecklistHeroProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section className="pt-28 pb-16 lg:pt-32 lg:pb-20 bg-primary-yellow">
      <div className="container mx-auto px-6 lg:px-20">
        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="max-w-3xl mx-auto text-center space-y-6"
        >
          <motion.span
            variants={fadeUp}
            className="inline-block text-sm font-bold uppercase tracking-wider text-orange-400"
          >
            {checklistHeroContent.label}
          </motion.span>

          <motion.h1
            variants={fadeUp}
            className="font-display text-4xl lg:text-5xl font-bold text-dark-900 leading-tight"
          >
            {checklistHeroContent.headline}
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="text-xl font-semibold text-dark-900"
          >
            {checklistHeroContent.subheadline}
          </motion.p>

          <motion.p
            variants={fadeUp}
            className="text-lg text-dark-900/80 max-w-xl mx-auto"
          >
            {checklistHeroContent.bodyCopy}
          </motion.p>

          <motion.div variants={fadeUp}>
            <button
              onClick={onStart}
              className="inline-flex items-center gap-2 px-8 py-4 bg-dark-900 text-white font-semibold rounded-lg hover:bg-dark-900/90 transition-colors"
            >
              {checklistHeroContent.ctaText}
            </button>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="flex flex-wrap items-center justify-center gap-2 text-sm text-dark-900/60 font-medium"
          >
            {checklistHeroContent.trustSignals.map((signal, index) => (
              <span key={signal} className="flex items-center gap-2">
                {index > 0 && (
                  <span className="text-dark-900/30" aria-hidden="true">|</span>
                )}
                {signal}
              </span>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
