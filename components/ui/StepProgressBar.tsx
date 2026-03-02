'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils/cn'

interface StepProgressBarProps {
  current: number
  total: number
  className?: string
}

export function StepProgressBar({ current, total, className }: StepProgressBarProps) {
  const percentage = (current / total) * 100

  return (
    <div
      className={cn('w-full h-2 bg-dark-150 rounded-full overflow-hidden', className)}
      role="progressbar"
      aria-valuenow={current}
      aria-valuemin={0}
      aria-valuemax={total}
      aria-label={`Question ${current} of ${total}`}
    >
      <motion.div
        className="h-full bg-orange-400 rounded-full"
        animate={{ width: `${percentage}%` }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      />
    </div>
  )
}
