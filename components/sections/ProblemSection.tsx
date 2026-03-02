'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { problemContent } from '@/lib/data/ux-pulse-check'
import { fadeUp, staggerContainer } from '@/lib/utils/animations'

export function ProblemSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section className="py-16 lg:py-20 bg-cream-500">
      <div className="container mx-auto px-6 lg:px-20">
        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="max-w-3xl mx-auto text-center"
        >
          <motion.h2
            variants={fadeUp}
            className="font-display text-3xl lg:text-4xl font-bold text-dark-900 mb-6"
          >
            {problemContent.headline}
          </motion.h2>

          <motion.div
            variants={fadeUp}
            className="text-lg text-dark-900/80 leading-relaxed space-y-4"
          >
            {problemContent.bodyCopy.split('\n\n').map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
