'use client'

import { cn } from '@/lib/utils/cn'
import type { ScoreTier } from '@/lib/data/retention-checklist'

interface ScoreBadgeProps {
  score: number
  total: number
  tier: ScoreTier
  label: string
}

const tierColors: Record<ScoreTier, string> = {
  green: 'bg-green-600 text-white',
  amber: 'bg-orange-400 text-white',
  red: 'bg-red-500 text-white',
}

const tierLabelColors: Record<ScoreTier, string> = {
  green: 'text-green-600',
  amber: 'text-orange-400',
  red: 'text-red-500',
}

export function ScoreBadge({ score, total, tier, label }: ScoreBadgeProps) {
  return (
    <div className="flex flex-col items-center">
      <div
        className={cn(
          'w-32 h-32 rounded-full flex flex-col items-center justify-center mb-6',
          tierColors[tier]
        )}
      >
        <span className="font-display text-3xl font-bold">{score}</span>
        <span className="text-sm font-medium opacity-80">/ {total}</span>
      </div>
      <span className={cn('text-lg font-semibold', tierLabelColors[tier])}>
        {label}
      </span>
    </div>
  )
}
