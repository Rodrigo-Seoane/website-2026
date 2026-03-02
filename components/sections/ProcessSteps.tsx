'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { processSteps } from '@/lib/data/ux-pulse-check'
import { fadeUp, staggerContainer } from '@/lib/utils/animations'

export function ProcessSteps() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section className="py-16 lg:py-20 bg-primary-yellow">
      <div className="container mx-auto px-6 lg:px-20">
        {/* Header */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="font-display text-3xl lg:text-4xl font-bold text-center text-dark-900 mb-6"
        >
          How we help your business succeed
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-lg text-dark-900/80 text-center max-w-2xl mx-auto mb-12"
        >
          From discovery to implementation, my streamlined 4-step process ensures you get actionable insights fast—without disrupting your team&apos;s workflow.
        </motion.p>

        {/* Steps Grid */}
        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {processSteps.map((step) => (
            <motion.div
              key={step.id}
              variants={fadeUp}
              className="text-center"
            >
              {/* Number Circle */}
              <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center border-2 border-dark-900 rounded-full">
                <span className="font-display font-bold text-2xl text-dark-900">
                  {step.number}
                </span>
              </div>

              {/* Title */}
              <h3 className="font-display font-bold text-xl text-dark-900 mb-2">
                {step.title}
              </h3>

              {/* Description */}
              <p className="text-dark-900/80 leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
