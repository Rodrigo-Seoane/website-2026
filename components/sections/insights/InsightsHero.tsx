'use client'

import { motion } from 'framer-motion'
import { staggerContainer, fadeUp } from '@/lib/utils/animations'

/**
 * Page-level header for the Insights page.
 * Mirrors the yellow-band hero used on /work (WorkPage header).
 */
export function InsightsHero() {
  return (
    <div className="bg-primary-yellow py-16 lg:py-20">
      <div className="container mx-auto px-6 lg:px-20">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.h1
            variants={fadeUp}
            className="font-display text-4xl lg:text-5xl font-bold text-dark-900"
          >
            Insights
          </motion.h1>
          <motion.p
            variants={fadeUp}
            className="mt-3 text-dark-900/70 text-lg max-w-xl"
          >
            Design thinking, UX strategy, and lessons learned -- shared on
            LinkedIn and Medium.
          </motion.p>
        </motion.div>
      </div>
    </div>
  )
}
