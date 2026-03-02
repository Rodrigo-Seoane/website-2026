'use client'

import { useReducer, useCallback, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ChecklistHero,
  ChecklistQuestionnaire,
  LeadCaptureGate,
  ChecklistResults,
} from '@/components/sections/checklist'
import type { LeadFormData } from '@/lib/data/retention-checklist'

// --- State Types ---

type Phase = 'hero' | 'questionnaire' | 'lead-capture' | 'results'

interface ChecklistState {
  phase: Phase
  currentQuestion: number
  answers: (number | null)[]
  direction: 1 | -1
  leadData: LeadFormData | null
  score: number | null
  isSubmitting: boolean
  submitError: string | null
}

type ChecklistAction =
  | { type: 'START_ASSESSMENT' }
  | { type: 'ANSWER_QUESTION'; questionIndex: number; value: number }
  | { type: 'NEXT_QUESTION' }
  | { type: 'PREV_QUESTION' }
  | { type: 'COMPLETE_QUESTIONNAIRE' }
  | { type: 'SUBMIT_LEAD'; data: LeadFormData }
  | { type: 'SUBMIT_SUCCESS'; score: number }
  | { type: 'SUBMIT_ERROR'; error: string }
  | { type: 'HYDRATE_RESULTS'; score: number; answers: (number | null)[]; leadName: string }
  | { type: 'RETAKE' }

// --- Initial State ---

const initialState: ChecklistState = {
  phase: 'hero',
  currentQuestion: 0,
  answers: Array(12).fill(null),
  direction: 1,
  leadData: null,
  score: null,
  isSubmitting: false,
  submitError: null,
}

// --- Reducer ---

function checklistReducer(
  state: ChecklistState,
  action: ChecklistAction
): ChecklistState {
  switch (action.type) {
    case 'START_ASSESSMENT':
      return {
        ...state,
        phase: 'questionnaire',
        currentQuestion: 0,
      }

    case 'ANSWER_QUESTION': {
      const newAnswers = [...state.answers]
      newAnswers[action.questionIndex] = action.value
      return {
        ...state,
        answers: newAnswers,
      }
    }

    case 'NEXT_QUESTION':
      return {
        ...state,
        currentQuestion: Math.min(state.currentQuestion + 1, 11),
        direction: 1,
      }

    case 'PREV_QUESTION':
      return {
        ...state,
        currentQuestion: Math.max(state.currentQuestion - 1, 0),
        direction: -1,
      }

    case 'COMPLETE_QUESTIONNAIRE':
      return {
        ...state,
        phase: 'lead-capture',
      }

    case 'SUBMIT_LEAD':
      return {
        ...state,
        leadData: action.data,
        isSubmitting: true,
        submitError: null,
      }

    case 'SUBMIT_SUCCESS':
      return {
        ...state,
        phase: 'results',
        score: action.score,
        isSubmitting: false,
      }

    case 'SUBMIT_ERROR':
      return {
        ...state,
        isSubmitting: false,
        submitError: action.error,
      }

    case 'HYDRATE_RESULTS':
      return {
        ...state,
        phase: 'results',
        score: action.score,
        answers: action.answers,
        leadData: { name: action.leadName, email: '', consent: true },
      }

    case 'RETAKE':
      return { ...initialState }

    default:
      return state
  }
}

// --- localStorage helpers ---

const STORAGE_KEY = 'checklist-results'

interface StoredResults {
  score: number
  answers: (number | null)[]
  leadName: string
  timestamp: number
}

function saveResults(data: StoredResults): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  } catch {
    // localStorage unavailable (private browsing, etc.)
  }
}

function loadResults(): StoredResults | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as StoredResults
    if (
      typeof parsed.score === 'number' &&
      Array.isArray(parsed.answers) &&
      parsed.answers.length === 12
    ) {
      return parsed
    }
    return null
  } catch {
    return null
  }
}

function clearResults(): void {
  try {
    localStorage.removeItem(STORAGE_KEY)
  } catch {
    // localStorage unavailable
  }
}

// --- Page Component ---

export default function ChecklistPage() {
  const [state, dispatch] = useReducer(checklistReducer, initialState)

  // Hydrate from localStorage on mount
  useEffect(() => {
    const stored = loadResults()
    if (stored) {
      dispatch({
        type: 'HYDRATE_RESULTS',
        score: stored.score,
        answers: stored.answers,
        leadName: stored.leadName,
      })
    }
  }, [])

  // Scroll to top on phase transitions
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [state.phase])

  // Handle lead form submission
  const handleLeadSubmit = useCallback(
    async (data: LeadFormData) => {
      dispatch({ type: 'SUBMIT_LEAD', data })

      const score = state.answers.reduce(
        (sum: number, val) => sum + (val ?? 0),
        0
      )

      try {
        const response = await fetch('/api/checklist/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            leadData: {
              name: data.name,
              email: data.email,
              company: data.company,
              role: data.role,
            },
            answers: state.answers,
            score,
          }),
        })

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.error || 'Something went wrong')
        }

        // Save to localStorage
        saveResults({
          score,
          answers: state.answers,
          leadName: data.name.split(' ')[0],
          timestamp: Date.now(),
        })

        dispatch({ type: 'SUBMIT_SUCCESS', score })
      } catch (err) {
        const message =
          err instanceof Error ? err.message : 'Something went wrong'
        dispatch({ type: 'SUBMIT_ERROR', error: message })
      }
    },
    [state.answers]
  )

  // Handle retake
  const handleRetake = useCallback(() => {
    clearResults()
    dispatch({ type: 'RETAKE' })
  }, [])

  return (
    <AnimatePresence mode="wait">
      {state.phase === 'hero' && (
        <motion.div
          key="hero"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChecklistHero
            onStart={() => dispatch({ type: 'START_ASSESSMENT' })}
          />
        </motion.div>
      )}

      {state.phase === 'questionnaire' && (
        <motion.div
          key="questionnaire"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChecklistQuestionnaire
            currentQuestion={state.currentQuestion}
            answers={state.answers}
            direction={state.direction}
            onAnswer={(questionIndex, value) =>
              dispatch({ type: 'ANSWER_QUESTION', questionIndex, value })
            }
            onNext={() => dispatch({ type: 'NEXT_QUESTION' })}
            onPrev={() => dispatch({ type: 'PREV_QUESTION' })}
            onComplete={() => dispatch({ type: 'COMPLETE_QUESTIONNAIRE' })}
          />
        </motion.div>
      )}

      {state.phase === 'lead-capture' && (
        <motion.div
          key="lead-capture"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <LeadCaptureGate
            onSubmit={handleLeadSubmit}
            isSubmitting={state.isSubmitting}
            submitError={state.submitError}
          />
        </motion.div>
      )}

      {state.phase === 'results' && state.score !== null && (
        <motion.div
          key="results"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChecklistResults
            score={state.score}
            answers={state.answers}
            leadName={state.leadData?.name?.split(' ')[0] || 'there'}
            onRetake={handleRetake}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
