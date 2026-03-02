'use client'

import { motion } from 'framer-motion'
import { staggerContainer, fadeUp } from '@/lib/utils/animations'

/**
 * Page-level header for the Vibe Lab page.
 * Follows the yellow-band hero pattern from /work and /insights.
 */
export function VibeLabHero() {
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
            Vibe Lab
          </motion.h1>
          <motion.p
            variants={fadeUp}
            className="mt-3 text-dark-900/70 text-lg max-w-xl"
          >
            A playground for design + code experiments. Small apps built with
            intuition, research, and creative coding.
          </motion.p>
        </motion.div>
      </div>
    </div>
  )
}
