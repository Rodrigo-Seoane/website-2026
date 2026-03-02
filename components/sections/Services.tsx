'use client'

import { motion } from 'framer-motion'
import { Check, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { staggerContainer, fadeUp } from '@/lib/utils/animations'
import { services, type Service } from '@/lib/data/services'

interface ServiceCardProps {
  service: Service
  isPopular?: boolean
}

function ServiceCard({ service, isPopular = false }: ServiceCardProps) {
  return (
    <motion.div variants={fadeUp} className="relative h-full">
      {/* Popular Badge */}
      {isPopular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
          <span className="bg-orange-400 text-dark-50 text-sm font-medium px-4 py-1 rounded-full whitespace-nowrap">
            Most Popular
          </span>
        </div>
      )}

      <div
        className={`group h-full flex flex-col p-6 md:p-8 bg-cream-500 rounded-xl transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border-b-4 ${
          isPopular ? 'border-orange-400 ring-2 ring-orange-400' : 'border-dark-900'
        }`}
      >
        {/* Category Tag */}
        <p className="text-orange-400 font-bold text-sm uppercase tracking-widest mb-2 text-center">
          {service.category}
        </p>

        {/* Title */}
        <h3 className="font-display text-2xl md:text-3xl font-bold text-dark-900 mb-3 text-center">
          {service.title}
        </h3>

        {/* Subtitle */}
        <p className="text-dark-900 font-semibold text-base mb-4 text-center">
          {service.subtitle}
        </p>

        {/* Ideal For */}
        <p className="text-dark-900/80 text-base mb-6 leading-relaxed">
          <span className="font-bold">Ideal For:</span> {service.idealFor}
        </p>

        {/* Features */}
        <ul className="space-y-3 mb-8 grow">
          {service.features.map((feature, index) => (
            <li
              key={index}
              className="flex items-start gap-3 text-base text-dark-900"
            >
              <Check size={20} className="text-orange-400 shrink-0 mt-0.5" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div className="mt-auto">
          <a
            href="https://calendly.com/rodrigo_seoane/discovery"
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full py-4 px-6 bg-dark-900 text-dark-50 font-semibold text-center rounded text-lg hover:bg-dark-900/90 transition-colors"
          >
            {service.cta}
          </a>
        </div>
      </div>
    </motion.div>
  )
}

export function Services() {
  return (
    <section className="py-16 md:py-24 bg-dark-700">
      <div className="container mx-auto px-6 lg:px-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-12 md:mb-16"
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold text-dark-50 mb-4">
            How to work with me
          </h2>
          <p className="text-dark-50 text-lg leading-relaxed">
            I focus on urgent, complex problems for teams building the future -- from untangling enterprise ecosystems to scaling AI tools for startups.
          </p>
        </motion.div>

        {/* Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch"
        >
          {services.map((service, index) => (
            <ServiceCard key={service.id} service={service} isPopular={index === 1} />
          ))}
        </motion.div>

        {/* UX Pulse Check Subsection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-16 md:mt-20"
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            {/* Content */}
            <div className="flex-1 max-w-3xl">
              <p className="text-orange-400 font-bold text-sm uppercase tracking-widest mb-2">
                UX Pulse Check
              </p>
              <h3 className="font-display text-2xl md:text-3xl font-bold text-dark-50 mb-4">
                Need a fast diagnosis? The UX Pulse Check delivers answers in days.
              </h3>
              <p className="text-dark-50 text-lg mb-6">
                Sometimes you don&apos;t need a long-term partner, you need a precision expert who can quickly:
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3 text-dark-50">
                  <Check size={20} className="text-orange-400 shrink-0 mt-0.5" />
                  <span>Pinpoint where your product bleeds revenue</span>
                </li>
                <li className="flex items-start gap-3 text-dark-50">
                  <Check size={20} className="text-orange-400 shrink-0 mt-0.5" />
                  <span>Deliver ready-to-implement solutions</span>
                </li>
                <li className="flex items-start gap-3 text-dark-50">
                  <Check size={20} className="text-orange-400 shrink-0 mt-0.5" />
                  <span>Provide recovery estimates within days</span>
                </li>
              </ul>
            </div>

            {/* CTA Button */}
            <div className="shrink-0">
              <Link
                href="/ux-pulse-check"
                className="inline-flex items-center gap-3 px-8 py-4 bg-primary-yellow text-dark-900 font-semibold text-lg rounded hover:bg-primary-yellow/90 transition-colors"
              >
                Diagnose my UX issues
                <ArrowRight size={20} />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
