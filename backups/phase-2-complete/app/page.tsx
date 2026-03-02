'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default function Home() {
  return (
    <section className="container mx-auto px-6 py-24 md:py-32">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl"
      >
        <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
          Designing{' '}
          <span className="text-primary-yellow">B2B SaaS</span>{' '}
          products that users love
        </h1>

        <p className="mt-6 text-lg md:text-xl text-neutral-600 dark:text-neutral-400 max-w-2xl">
          Senior Product Designer specializing in onboarding and customer retention.
          25+ years helping companies turn users into advocates.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row gap-4">
          <Link
            href="/work"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary-yellow text-neutral-900 font-medium rounded-lg hover:shadow-lg hover:scale-105 transition-all duration-300"
          >
            Explore Work
            <ArrowRight size={18} />
          </Link>
          <a
            href="https://calendly.com/rodrigo_seoane/discovery"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-6 py-3 border-2 border-accent-brown text-accent-brown dark:border-accent-peach dark:text-accent-peach font-medium rounded-lg hover:bg-accent-brown hover:text-white dark:hover:bg-accent-peach dark:hover:text-neutral-900 transition-all duration-300"
          >
            Book a Discovery Call
          </a>
        </div>
      </motion.div>

      {/* Status indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="mt-16 flex items-center gap-3"
      >
        <span className="flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-green-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
        </span>
        <span className="text-sm text-neutral-600 dark:text-neutral-400">
          Available for new projects
        </span>
      </motion.div>
    </section>
  )
}
