'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Check } from 'lucide-react'
import { eligibilityContent } from '@/lib/data/ux-pulse-check'
import { fadeUp, staggerContainer } from '@/lib/utils/animations'

export function ServiceForMe() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section className="py-16 lg:py-20 bg-cream-500">
      <div className="container mx-auto px-6 lg:px-20 max-w-3xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h2 className="font-display text-3xl lg:text-4xl font-bold text-dark-900 mb-4">
            {eligibilityContent.headline}
          </h2>
          <p className="text-lg text-dark-900/80">
            {eligibilityContent.intro}
          </p>
        </motion.div>

        {/* Criteria List */}
        <motion.ul
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="space-y-4 mb-8"
        >
          {eligibilityContent.criteria.map((criterion, index) => (
            <motion.li
              key={index}
              variants={fadeUp}
              className="flex items-start gap-3"
            >
              <Check size={24} className="text-orange-400 shrink-0 mt-0.5" />
              <span className="text-lg text-dark-900">{criterion}</span>
            </motion.li>
          ))}
        </motion.ul>

        {/* Closing Copy */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-lg text-dark-900/80 text-center"
        >
          {eligibilityContent.closingCopy}
        </motion.p>
      </div>
    </section>
  )
}
