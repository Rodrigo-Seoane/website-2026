'use client'

import { cn } from '@/lib/utils/cn'
import { responseOptions } from '@/lib/data/retention-checklist'
import type { ChecklistItem } from '@/lib/data/retention-checklist'

interface QuestionCardProps {
  item: ChecklistItem
  selectedValue: number | null
  onSelect: (value: number) => void
}

export function QuestionCard({ item, selectedValue, onSelect }: QuestionCardProps) {
  return (
    <div className="bg-white rounded-xl p-8 shadow-sm">
      <h2 className="font-display text-xl lg:text-2xl font-bold text-dark-900 mb-3">
        {item.title}
      </h2>

      <p className="text-dark-500 text-base leading-relaxed mb-8">
        {item.problem}
      </p>

      <p className="text-sm font-medium text-dark-900 mb-4">
        Does this red flag apply to your product?
      </p>

      <div className="space-y-3">
        {responseOptions.map((option) => {
          const isSelected = selectedValue === option.value

          return (
            <button
              key={option.value}
              type="button"
              onClick={() => onSelect(option.value)}
              className={cn(
                'w-full text-left rounded-lg px-6 py-4 border-2 transition-colors',
                isSelected
                  ? 'border-orange-400 bg-orange-400/10 font-medium text-dark-900'
                  : 'border-dark-150 text-dark-900 hover:border-orange-400'
              )}
            >
              {option.label}
            </button>
          )
        })}
      </div>
    </div>
  )
}
