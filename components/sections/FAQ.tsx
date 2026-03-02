'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Accordion } from '@/components/ui/Accordion'
import { faqItems } from '@/lib/data/ux-pulse-check'

export function FAQ() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const accordionItems = faqItems.map((item) => ({
    question: item.question,
    answer: item.answer,
  }))

  return (
    <section className="py-16 lg:py-20 bg-primary-yellow">
      <div className="container mx-auto px-6 lg:px-20 max-w-3xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="inline-block text-sm font-bold uppercase tracking-wider text-orange-900 mb-4">
            FAQ
          </span>
          <h2 className="font-display text-3xl lg:text-4xl font-bold text-dark-900">
            Ask anything about our service
          </h2>
        </motion.div>

        {/* Accordion */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Accordion items={accordionItems} defaultOpenIndex={0} />
        </motion.div>
      </div>
    </section>
  )
}
