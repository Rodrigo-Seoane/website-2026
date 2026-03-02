'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { staggerContainer, fadeUp } from '@/lib/utils/animations'

export function Hero() {
  const containerRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, 100])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  return (
    <section
      ref={containerRef}
      className="relative min-h-[85vh] flex items-center overflow-hidden bg-primary-yellow pt-20"
    >
      <div className="container mx-auto px-6 lg:px-20 py-16 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: Content */}
          <motion.div
            style={{ y, opacity }}
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="max-w-2xl"
          >
            {/* Headline */}
            <motion.h1
              variants={fadeUp}
              className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-dark-900"
            >
              B2B SaaS Design That Drives Retention and Growth
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              variants={fadeUp}
              className="mt-6 text-lg md:text-xl text-dark-900/80 leading-relaxed"
            >
              I&apos;m Rodrigo Seoane. Over 25 years, I&apos;ve helped product teams at AI and SaaS companies turn complex user experiences into measurable business outcomes.
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={fadeUp}
              className="mt-10 flex flex-col sm:flex-row gap-4"
            >
              <Link
                href="/work"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-dark-900 text-dark-50 font-semibold rounded text-lg hover:bg-dark-900/90 transition-all duration-300"
              >
                Explore Work
                <ArrowRight size={20} />
              </Link>
              <Link
                href="#contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-dark-900 text-dark-900 font-semibold rounded text-lg hover:bg-dark-900 hover:text-dark-50 transition-all duration-300"
              >
                Get in Touch
              </Link>
            </motion.div>

            {/* Status indicator */}
            <motion.div
              variants={fadeUp}
              className="mt-12 flex items-center gap-3"
            >
              <span className="relative flex h-3 w-3">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75" />
                <span className="relative inline-flex h-3 w-3 rounded-full bg-green-600" />
              </span>
              <span className="text-sm font-medium text-dark-900/70">
                Available for new projects
              </span>
            </motion.div>
          </motion.div>

          {/* Right: Visual placeholder - can add illustration later */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative hidden lg:flex justify-center items-center"
          >
            {/* Abstract decorative shapes */}
            <div className="relative w-full h-[400px]">
              <motion.div
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute top-10 right-10 w-40 h-40 bg-orange-400/30 rounded-2xl"
              />
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                className="absolute bottom-10 left-10 w-32 h-32 bg-dark-900/10 rounded-full"
              />
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-cream-500/50 rounded-3xl"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
