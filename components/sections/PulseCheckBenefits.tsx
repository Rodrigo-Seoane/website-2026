'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { benefits } from '@/lib/data/ux-pulse-check'
import { fadeUp, staggerContainer } from '@/lib/utils/animations'

export function PulseCheckBenefits() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section className="py-16 lg:py-20 bg-dark-700">
      <div className="container mx-auto px-6 lg:px-20">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="font-display text-3xl lg:text-4xl font-bold text-white mb-12 text-center"
        >
          What you&apos;ll achieve with a UX Pulse Check
        </motion.h2>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: 2x2 Benefits Grid */}
          <motion.div
            ref={ref}
            variants={staggerContainer}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="grid grid-cols-1 sm:grid-cols-2 gap-8"
          >
            {benefits.map((benefit) => (
              <motion.div
                key={benefit.id}
                variants={fadeUp}
                className="space-y-3"
              >
                <h3 className="font-display font-bold text-xl text-white">
                  {benefit.title}
                </h3>
                <p className="text-cream-500/80 leading-relaxed">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </motion.div>

          {/* Right: Image */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="relative"
          >
            <div className="aspect-square bg-dark-500/30 rounded-xl flex items-center justify-center">
              <span className="text-cream-500/40 font-medium">
                Benefits Image Placeholder
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
