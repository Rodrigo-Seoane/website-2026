'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { story } from '@/lib/data/about'
import { fadeUp, staggerContainer } from '@/lib/utils/animations'

export function StorySection() {
  return (
    <section className="py-16 md:py-24 bg-cream-500">
      <div className="container mx-auto px-6 lg:px-20">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-12 md:mb-16"
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold text-dark-900">
            My Story
          </h2>
          <p className="text-dark-900/70 text-lg mt-3 leading-relaxed">
            25 years across two continents. One continuous thread.
          </p>
        </motion.div>

        {/* Two-column: chapters left, illustration right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* LEFT: Two chapters */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="space-y-10"
          >
            {/* Chapter: Beginning */}
            <motion.div variants={fadeUp} className="relative pl-6 border-l-4 border-orange-400">
              <span className="text-orange-400 font-bold text-sm uppercase tracking-widest">
                {story.beginning.years}
              </span>
              <p className="text-dark-500 text-sm font-medium mt-1">
                {story.beginning.location}
              </p>
              <h3 className="font-display text-2xl font-bold text-dark-900 mt-2">
                {story.beginning.title}
              </h3>
              <p className="text-dark-900/75 text-base leading-relaxed mt-3">
                {story.beginning.description}
              </p>
            </motion.div>

            {/* Chapter: Evolution */}
            <motion.div variants={fadeUp} className="relative pl-6 border-l-4 border-dark-700">
              <span className="text-dark-700 font-bold text-sm uppercase tracking-widest">
                {story.evolution.years}
              </span>
              <p className="text-dark-500 text-sm font-medium mt-1">
                {story.evolution.location}
              </p>
              <h3 className="font-display text-2xl font-bold text-dark-900 mt-2">
                {story.evolution.title}
              </h3>
              <p className="text-dark-900/75 text-base leading-relaxed mt-3">
                {story.evolution.description}
              </p>
            </motion.div>
          </motion.div>

          {/* RIGHT: Illustration */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7 }}
            className="flex items-center justify-center"
          >
            <Image
              src={story.illustration}
              alt="Illustration showing journey from Rio de Janeiro to Barcelona"
              width={600}
              height={250}
              className="w-full h-auto object-contain"
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
