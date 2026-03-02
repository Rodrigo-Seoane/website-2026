'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { checklistCTAContent, resultsContent } from '@/lib/data/retention-checklist'
import { fadeUp, staggerContainer } from '@/lib/utils/animations'

const UTM = '?utm_source=checklist&utm_medium=web&utm_campaign=retention_checklist'

export function ChecklistCTA() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section className="py-20 lg:py-24 bg-dark-700">
      <div className="container mx-auto px-6 lg:px-20">
        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="max-w-2xl mx-auto text-center space-y-6"
        >
          <motion.h2
            variants={fadeUp}
            className="font-display text-3xl lg:text-4xl font-bold text-white mb-4"
          >
            Ready to fix your retention leaks?
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="text-lg text-cream-500/80 mb-8"
          >
            Get expert guidance to turn your red flags into growth opportunities.
          </motion.p>

          {/* Primary CTA */}
          <motion.div variants={fadeUp}>
            <a
              href={`${checklistCTAContent.primaryCta.href}${UTM}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary-yellow text-dark-900 font-semibold rounded-lg hover:bg-primary-yellow/90 transition-colors"
            >
              {checklistCTAContent.primaryCta.text}
            </a>
          </motion.div>

          {/* Secondary CTA */}
          <motion.div variants={fadeUp}>
            <a
              href={`${checklistCTAContent.secondaryCta.href}${UTM}`}
              className="text-white underline hover:text-cream-500 font-medium transition-colors"
            >
              {checklistCTAContent.secondaryCta.text}
            </a>
          </motion.div>

          {/* Tertiary CTA */}
          <motion.div variants={fadeUp}>
            <a
              href={`${resultsContent.downloadUrl}${UTM}`}
              className="text-cream-500/60 hover:text-cream-500 text-sm transition-colors"
            >
              {resultsContent.downloadCtaText}
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
