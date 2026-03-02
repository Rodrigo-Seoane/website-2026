'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Target, Lightbulb } from 'lucide-react'
import { staggerContainer, fadeUp } from '@/lib/utils/animations'
import type { CaseStudy } from '@/lib/data/case-studies'

interface ContextObjectivesProps {
  caseStudy: CaseStudy
}

export function ContextObjectives({ caseStudy }: ContextObjectivesProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  // Extract context and objectives from problem data
  const contextText = caseStudy.problem.background
  const objectivesText = caseStudy.problem.businessChallenge

  return (
    <section ref={ref} className="bg-surface-primary py-12 lg:py-16">
      <div className="container mx-auto px-6 lg:px-20">
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12"
        >
          {/* Context Column */}
          <motion.div variants={fadeUp} className="flex flex-col gap-2">
            <div className="flex gap-2 items-center mb-2">
              <div className="w-8 h-8 flex items-center justify-center">
                <Lightbulb size={28} className="text-content-active-primary" />
              </div>
              <h2 className="font-display font-bold text-[24px] leading-[1.1] text-content-active-primary">
                Context
              </h2>
            </div>
            <div className="space-y-4 text-content-active-primary">
              <p className="font-body font-semibold text-[18px] leading-[1.32]">
                {contextText.split('.')[0]}.
              </p>
              <p className="font-body text-[16px] leading-[1.32]">
                {contextText.split('.').slice(1).join('.').trim()}
              </p>
            </div>
          </motion.div>

          {/* Objectives Column */}
          <motion.div variants={fadeUp} className="flex flex-col gap-2">
            <div className="flex gap-2 items-center mb-2">
              <div className="w-8 h-8 flex items-center justify-center">
                <Target size={28} className="text-content-active-primary" />
              </div>
              <h2 className="font-display font-bold text-[24px] leading-[1.1] text-content-active-primary">
                Objectives
              </h2>
            </div>
            <div className="space-y-4 text-content-active-primary">
              <p className="font-body font-semibold text-[18px] leading-[1.32]">
                {caseStudy.solution.keyDecisions[0] || 'Strategic Approach:'}
              </p>
              <p className="font-body text-[16px] leading-[1.32]">
                {objectivesText}
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
