'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { heroContent } from '@/lib/data/ux-pulse-check'
import { fadeUp, staggerContainer } from '@/lib/utils/animations'

export function PulseCheckHero() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section className="pt-28 pb-16 lg:pt-32 lg:pb-20 bg-primary-yellow">
      <div className="container mx-auto px-6 lg:px-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Content */}
          <motion.div
            ref={ref}
            variants={staggerContainer}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="space-y-6"
          >
            <motion.span
              variants={fadeUp}
              className="inline-block text-sm font-bold uppercase tracking-wider text-dark-900"
            >
              {heroContent.label}
            </motion.span>

            <motion.h1
              variants={fadeUp}
              className="font-display text-4xl lg:text-5xl font-bold text-dark-900 leading-tight"
            >
              {heroContent.headline}
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="text-xl font-semibold text-dark-900"
            >
              {heroContent.subheadline}
            </motion.p>

            <motion.p
              variants={fadeUp}
              className="text-lg text-dark-900/80 max-w-xl"
            >
              {heroContent.bodyCopy}
            </motion.p>

            <motion.div variants={fadeUp}>
              <a
                href={heroContent.ctaUrl}
                className="inline-flex items-center gap-2 px-8 py-4 bg-dark-900 text-white font-semibold rounded-lg hover:bg-dark-900/90 transition-colors"
              >
                {heroContent.ctaText}
              </a>
            </motion.div>
          </motion.div>

          {/* Right: Image placeholder */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative"
          >
            <div className="aspect-video bg-dark-900/10 rounded-xl flex items-center justify-center">
              <span className="text-dark-900/40 font-medium">
                Hero Image Placeholder
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
