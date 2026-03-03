'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'
import { Badge } from '@/components/ui/Badge'
import { ImpactMetric } from '@/components/ui/ImpactMetric'
import { TestimonialCard } from '@/components/ui/TestimonialCard'
import { staggerContainer, fadeUp } from '@/lib/utils/animations'
import type { CaseStudy } from '@/lib/data/case-studies'

interface CaseStudyHeroProps {
  caseStudy: CaseStudy
}

const metricVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
}

export function CaseStudyHero({ caseStudy }: CaseStudyHeroProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <section ref={ref} className="bg-surface-primary pt-12 pb-16 lg:pb-24 relative overflow-hidden">
      <div className="container mx-auto px-6 lg:px-20">
        {/* Top Section: Logo + Title + Badges + Tagline + Metrics */}
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
          className="max-w-[900px] mb-12"
        >
          {/* Client Logo */}
          <motion.div variants={fadeUp} className="mb-2">
            {caseStudy.clientLogo ? (
              <Image
                src={caseStudy.clientLogo}
                alt={caseStudy.client}
                width={120}
                height={40}
                className="object-contain h-10 w-auto"
              />
            ) : (
              <p className="font-sans font-bold text-xl text-[#001d6c] uppercase tracking-[1px]">
                {caseStudy.client}
              </p>
            )}
          </motion.div>

          {/* Project Title */}
          <motion.h1
            variants={fadeUp}
            className="font-display font-extrabold text-[40px] lg:text-[60px] leading-[1.07] text-content-active-primary mb-2"
          >
            {caseStudy.title}
          </motion.h1>

          {/* Service Badges */}
          <motion.div variants={fadeUp} className="flex gap-1.5 flex-wrap mb-4">
            {caseStudy.services.slice(0, 3).map((service, index) => (
              <Badge
                key={index}
                variant="terciary"
                className="px-3 py-1.5 rounded-2xl text-[14px] tracking-[1.4px]"
              >
                {service}
              </Badge>
            ))}
          </motion.div>

          {/* Tagline */}
          {caseStudy.tagline && (
            <motion.p
              variants={fadeUp}
              className="font-display font-bold text-[20px] lg:text-[24px] leading-[1.1] text-content-active-primary max-w-[846px] mb-6"
            >
              {caseStudy.tagline}
            </motion.p>
          )}

          {/* Impact Metrics */}
          <motion.div
            variants={staggerContainer}
            className="flex flex-wrap gap-6 lg:gap-9"
          >
            {caseStudy.metrics.map((metric, i) => (
              <motion.div key={i} variants={metricVariants}>
                <ImpactMetric
                  value={`${metric.prefix || ''}${metric.value}${metric.suffix || ''}`}
                  label={metric.label}
                />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Hero Image Container with Testimonial Overlay */}
        <div className="relative w-full max-w-7xl mx-auto">
          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative aspect-[2/1] w-full overflow-hidden rounded-2xl border-4 border-border-accent bg-surface-quaternary"
          >
            <Image
              src={caseStudy.heroImage}
              alt={`${caseStudy.title} - hero image`}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1280px) 90vw, 1280px"
              className="object-cover"
              priority
            />
            {/* Subtle overlay */}
            <div className="absolute inset-0 bg-surface-quaternary opacity-25 rounded-2xl" />
          </motion.div>

          {/* Testimonial Card - Overlay on desktop, stacked on mobile */}
          {caseStudy.results?.testimonial && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-6 lg:mt-0 lg:absolute lg:right-6 lg:-top-12 lg:w-[342px] z-10"
            >
              <TestimonialCard testimonial={caseStudy.results.testimonial} />
            </motion.div>
          )}
        </div>
      </div>
    </section>
  )
}
