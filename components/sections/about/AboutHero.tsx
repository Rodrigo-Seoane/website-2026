'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { MapPin } from 'lucide-react'
import Image from 'next/image'
import { aboutHero } from '@/lib/data/about'
import { staggerContainer, fadeUp } from '@/lib/utils/animations'

// Toggle to `true` once `/public/images/about/rodrigo-portrait.jpg` is in place.
const IMAGE_AVAILABLE = false

export function AboutHero() {
  const containerRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  const photoY = useTransform(scrollYProgress, [0, 1], [0, 60])
  const photoOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0.4])

  return (
    <section
      ref={containerRef}
      className="relative min-h-[70vh] flex items-center bg-cream-500 pt-16"
    >
      <div className="container mx-auto px-6 lg:px-20 py-16 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* LEFT: Content column */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="max-w-xl"
          >
            {/* Tagline */}
            <motion.p
              variants={fadeUp}
              className="text-orange-400 font-bold text-sm uppercase tracking-widest mb-3"
            >
              {aboutHero.tagline}
            </motion.p>

            {/* H1 -- the single h1 on the page */}
            <motion.h1
              variants={fadeUp}
              className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-dark-900"
            >
              {aboutHero.headline}
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              variants={fadeUp}
              className="mt-6 text-lg md:text-xl text-dark-900/80 leading-relaxed"
            >
              {aboutHero.subtitle}
            </motion.p>

            {/* Location Badge */}
            <motion.div
              variants={fadeUp}
              className="mt-8 inline-flex items-center gap-2 bg-dark-900 text-dark-50 px-4 py-2 rounded-full"
            >
              <MapPin size={16} className="text-orange-400" aria-hidden="true" />
              <span className="text-sm font-medium">
                {aboutHero.location.city}, {aboutHero.location.country}
              </span>
            </motion.div>
          </motion.div>

          {/* RIGHT: Portrait column */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative flex justify-center"
            style={{ y: photoY, opacity: photoOpacity }}
          >
            {/* Decorative shape behind the photo */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-4/5 h-4/5 bg-orange-400/15 rounded-3xl" />
            </div>

            {/* Portrait image or placeholder */}
            <div className="relative w-full max-w-md aspect-[3/4] rounded-2xl overflow-hidden shadow-xl">
              {IMAGE_AVAILABLE ? (
                <Image
                  src={aboutHero.image}
                  alt="Rodrigo Seoane, Senior Product Designer"
                  fill
                  sizes="(max-width: 1024px) 90vw, 450px"
                  priority
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full bg-dark-700 flex items-center justify-center">
                  <span className="text-dark-50 text-sm font-medium">Portrait photo</span>
                </div>
              )}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
