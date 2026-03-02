'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { User, Clock, Wrench, AlertCircle } from 'lucide-react'
import { staggerContainer, fadeUp } from '@/lib/utils/animations'
import type { CaseStudy } from '@/lib/data/case-studies'

interface CaseStudyOverviewProps {
  caseStudy: CaseStudy
}

// Each overview item has an icon, a label, and a value renderer.
const overviewItems = [
  {
    key: 'role' as const,
    label: 'My Role',
    Icon: User,
    getValue: (cs: CaseStudy) => cs.role,
  },
  {
    key: 'timeline' as const,
    label: 'Timeline',
    Icon: Clock,
    getValue: (cs: CaseStudy) => cs.timeline,
  },
  {
    key: 'tools' as const,
    label: 'Tools Used',
    Icon: Wrench,
    getValue: (cs: CaseStudy) => cs.tools.join(', '),
  },
  {
    key: 'problem' as const,
    label: 'The Challenge',
    Icon: AlertCircle,
    getValue: (cs: CaseStudy) => cs.problem.businessChallenge,
  },
]

export function CaseStudyOverview({ caseStudy }: CaseStudyOverviewProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="bg-cream-500 py-12 lg:py-16">
      <div className="container mx-auto px-6 lg:px-20">
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {overviewItems.map((item) => {
            const Icon = item.Icon
            return (
              <motion.div
                key={item.key}
                variants={fadeUp}
                className="bg-white border border-neutral-200 rounded-xl p-5"
              >
                <div className="flex items-center gap-2 mb-3">
                  <Icon size={20} className="text-orange-400" />
                  <span className="text-xs font-semibold uppercase tracking-wider text-dark-500">
                    {item.label}
                  </span>
                </div>
                <p className="text-dark-900 text-sm leading-relaxed">
                  {item.getValue(caseStudy)}
                </p>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
