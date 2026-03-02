'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { finalCTAContent } from '@/lib/data/ux-pulse-check'
import { fadeUp, staggerContainer } from '@/lib/utils/animations'

export function FinalCTA() {
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
          className="max-w-2xl mx-auto text-center"
        >
          <motion.h2
            variants={fadeUp}
            className="font-display text-3xl lg:text-4xl font-bold text-white mb-4"
          >
            {finalCTAContent.headline}
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="text-lg text-cream-500/80 mb-8"
          >
            {finalCTAContent.subheadline}
          </motion.p>

          <motion.div variants={fadeUp}>
            <a
              href={finalCTAContent.ctaUrl}
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary-yellow text-dark-900 font-semibold rounded-lg hover:bg-primary-yellow/90 transition-colors"
            >
              {finalCTAContent.ctaText}
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
