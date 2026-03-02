'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Users, Layout, FileText } from 'lucide-react'
import { staggerContainer, fadeUp } from '@/lib/utils/animations'
import type { CaseStudy } from '@/lib/data/case-studies'

interface KeyDeliverablesProps {
  caseStudy: CaseStudy
}

// Map deliverable types to icons and content
const deliverableConfig = [
  {
    icon: Users,
    title: 'Cross-Functional Collaboration',
    getDescription: (cs: CaseStudy) =>
      'Workshops with stakeholders to align on OKRs, focusing on reducing CAC.',
  },
  {
    icon: Layout,
    title: 'Modular Design System',
    getDescription: (cs: CaseStudy) =>
      'Consistent design system across franchisee portals to ensure brand cohesion.',
  },
  {
    icon: FileText,
    title: 'Simplified Forms',
    getDescription: (cs: CaseStudy) =>
      'Error prevention techniques like auto-formatting phone numbers to streamline user interactions.',
  },
]

export function KeyDeliverables({ caseStudy }: KeyDeliverablesProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="bg-surface-primary py-12 lg:py-16">
      <div className="container mx-auto px-6 lg:px-20">
        {/* Section Heading */}
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={fadeUp}
          className="flex gap-2 items-center mb-8"
        >
          <div className="w-8 h-8">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 8h24M4 16h24M4 24h24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-content-active-primary" />
            </svg>
          </div>
          <h2 className="font-display font-bold text-[28px] leading-[1.1] text-content-active-primary">
            Key Deliverables
          </h2>
        </motion.div>

        {/* Deliverable Cards Grid */}
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {deliverableConfig.map((config, index) => {
            const Icon = config.icon
            return (
              <motion.div
                key={index}
                variants={fadeUp}
                className="bg-surface-quaternary border border-content-disable-primary rounded-lg p-4 lg:p-6 flex gap-8"
              >
                {/* Icon Container */}
                <div className="bg-surface-primary rounded-lg flex items-center justify-center w-12 h-12 flex-shrink-0">
                  <Icon size={28} className="text-content-active-primary" />
                </div>

                {/* Content */}
                <div className="flex flex-col gap-2 flex-1">
                  <h3 className="font-display font-bold text-[20px] leading-[1.1] text-content-active-primary">
                    {config.title}
                  </h3>
                  <p className="font-body text-[16px] leading-[1.32] text-content-active-primary">
                    {config.getDescription(caseStudy)}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
