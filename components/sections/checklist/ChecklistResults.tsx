'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { checklistItems, resultsContent } from '@/lib/data/retention-checklist'
import { ScoreBadge } from '@/components/ui/ScoreBadge'
import { Accordion } from '@/components/ui/Accordion'
import { fadeUp, staggerContainer } from '@/lib/utils/animations'
import { ChecklistCTA } from './ChecklistCTA'
import type { ScoreTier } from '@/lib/data/retention-checklist'

interface ChecklistResultsProps {
  score: number
  answers: (number | null)[]
  leadName: string
  onRetake: () => void
}

function getTier(score: number): ScoreTier {
  const rounded = Math.round(score)
  if (rounded <= 3) return 'green'
  if (rounded <= 7) return 'amber'
  return 'red'
}

function getTierIndex(tier: ScoreTier): number {
  if (tier === 'green') return 0
  if (tier === 'amber') return 1
  return 2
}

export function ChecklistResults({
  score,
  answers,
  leadName,
  onRetake,
}: ChecklistResultsProps) {
  const heroRef = useRef(null)
  const heroInView = useInView(heroRef, { once: true, margin: '-100px' })

  const breakdownRef = useRef(null)
  const breakdownInView = useInView(breakdownRef, { once: true, margin: '-100px' })

  const tier = getTier(score)
  const tierIndex = getTierIndex(tier)
  const tierData = resultsContent.tiers[tierIndex]

  // Build accordion items from answers
  const accordionItems = checklistItems.map((item, index) => {
    const answerValue = answers[index]
    let indicator: string
    if (answerValue === 1) {
      indicator = '\u{1F534}'
    } else if (answerValue === 0.5) {
      indicator = '\u{1F7E0}'
    } else {
      indicator = '\u{1F7E2}'
    }

    const question = `${indicator}  ${item.title}`

    let answer: string
    if (answerValue && answerValue > 0) {
      const fixItFormatted = item.fixIt
        .split('\n')
        .map((line) => `\u2022 ${line}`)
        .join('\n')
      answer = `${item.whyItMatters}\n\nHow to fix it:\n${fixItFormatted}`
    } else {
      answer = 'Great job! You handle this well. Keep it up.'
    }

    return { question, answer }
  })

  // Find first flagged item index for default open
  const firstFlaggedIndex = answers.findIndex((a) => a !== null && a > 0)

  // Display score with one decimal
  const displayScore = Number.isInteger(score) ? score : score.toFixed(1)

  return (
    <>
      {/* Score Hero Block */}
      <section className="pt-28 pb-16 lg:pt-32 lg:pb-20 bg-dark-700">
        <div className="container mx-auto px-6 lg:px-20 max-w-3xl text-center">
          <motion.div
            ref={heroRef}
            variants={staggerContainer}
            initial="hidden"
            animate={heroInView ? 'visible' : 'hidden'}
            className="space-y-6"
          >
            <motion.p
              variants={fadeUp}
              className="text-lg text-white/80"
            >
              Hi {leadName}, here are your results
            </motion.p>

            <motion.p
              variants={fadeUp}
              className="text-sm font-medium text-white/60 uppercase tracking-wider"
            >
              {resultsContent.headline}
            </motion.p>

            <motion.div variants={fadeUp}>
              <ScoreBadge
                score={Number(displayScore)}
                total={12}
                tier={tier}
                label={tierData.label}
              />
            </motion.div>

            <motion.p
              variants={fadeUp}
              className="text-lg text-white/80 max-w-xl mx-auto"
            >
              {tierData.summary}
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Detailed Breakdown Block */}
      <section className="py-16 lg:py-20 bg-cream-500">
        <div className="container mx-auto px-6 lg:px-20 max-w-3xl">
          <motion.div
            ref={breakdownRef}
            initial={{ opacity: 0, y: 20 }}
            animate={breakdownInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="font-display text-2xl lg:text-3xl font-bold text-dark-900 mb-8">
              Detailed Breakdown
            </h2>

            <Accordion
              items={accordionItems}
              defaultOpenIndex={firstFlaggedIndex >= 0 ? firstFlaggedIndex : -1}
            />
          </motion.div>
        </div>
      </section>

      {/* Personalized Recommendation Block */}
      <section className="py-12 bg-white">
        <div className="max-w-3xl mx-auto px-6 lg:px-20 text-center">
          <p className="text-lg text-dark-900 leading-relaxed mb-6">
            {tierData.recommendation}
          </p>

          {tierData.recommendationCta && (
            <a
              href={`${tierData.recommendationCta.href}?utm_source=checklist&utm_medium=web&utm_campaign=retention_checklist`}
              target={tierData.recommendationCta.href.startsWith('http') ? '_blank' : undefined}
              rel={tierData.recommendationCta.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="inline-flex items-center gap-2 px-8 py-4 bg-dark-900 text-white font-semibold rounded-lg hover:bg-dark-900/90 transition-colors"
            >
              {tierData.recommendationCta.text}
            </a>
          )}

          <div className="mt-8">
            <button
              onClick={onRetake}
              className="text-dark-500 hover:text-dark-900 font-medium underline transition-colors"
            >
              Retake Assessment
            </button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <ChecklistCTA />
    </>
  )
}
