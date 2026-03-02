'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { checklistItems } from '@/lib/data/retention-checklist'
import { StepProgressBar } from '@/components/ui/StepProgressBar'
import { QuestionCard } from '@/components/ui/QuestionCard'

interface ChecklistQuestionnaireProps {
  currentQuestion: number
  answers: (number | null)[]
  direction: 1 | -1
  onAnswer: (questionIndex: number, value: number) => void
  onNext: () => void
  onPrev: () => void
  onComplete: () => void
}

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 100 : -100,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 100 : -100,
    opacity: 0,
  }),
}

export function ChecklistQuestionnaire({
  currentQuestion,
  answers,
  direction,
  onAnswer,
  onNext,
  onPrev,
  onComplete,
}: ChecklistQuestionnaireProps) {
  const item = checklistItems[currentQuestion]
  const hasAnswer = answers[currentQuestion] !== null
  const isLastQuestion = currentQuestion === 11

  return (
    <section className="py-16 lg:py-20 bg-cream-500 min-h-[80vh]">
      <div className="container mx-auto px-6 lg:px-20 max-w-3xl">
        {/* Progress */}
        <div className="mb-8">
          <StepProgressBar current={currentQuestion + 1} total={12} />
          <p className="text-sm font-medium text-dark-500 mt-3">
            Question {currentQuestion + 1} of 12
          </p>
        </div>

        {/* Question Card with slide animation */}
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentQuestion}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <QuestionCard
              item={item}
              selectedValue={answers[currentQuestion]}
              onSelect={(value) => onAnswer(currentQuestion, value)}
            />
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-8">
          {currentQuestion > 0 ? (
            <button
              type="button"
              onClick={onPrev}
              className="text-dark-500 hover:text-dark-900 font-medium transition-colors"
            >
              Back
            </button>
          ) : (
            <div />
          )}

          <button
            type="button"
            onClick={isLastQuestion ? onComplete : onNext}
            disabled={!hasAnswer}
            className="inline-flex items-center gap-2 px-8 py-3 bg-dark-900 text-white font-semibold rounded-lg hover:bg-dark-900/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLastQuestion ? 'See My Results' : 'Next'}
          </button>
        </div>
      </div>
    </section>
  )
}
