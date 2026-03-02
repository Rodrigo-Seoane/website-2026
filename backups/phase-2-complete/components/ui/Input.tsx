'use client'

import { forwardRef, useState } from 'react'
import { cn } from '@/lib/utils/cn'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className, value, ...props }, ref) => {
    const [focused, setFocused] = useState(false)
    const [hasValue, setHasValue] = useState(false)

    const isActive = focused || hasValue || !!value

    return (
      <div className="relative">
        <input
          ref={ref}
          className={cn(
            'peer w-full px-4 py-3 pt-6',
            'bg-white dark:bg-dark-surface',
            'border-2 border-neutral-200 dark:border-dark-border',
            'rounded-lg outline-none transition-all duration-300',
            'focus:border-primary-yellow',
            error && 'border-red-500',
            className
          )}
          onFocus={() => setFocused(true)}
          onBlur={(e) => {
            setFocused(false)
            setHasValue(!!e.target.value)
          }}
          value={value}
          {...props}
        />
        <label
          className={cn(
            'absolute left-4 transition-all duration-200 pointer-events-none',
            'text-neutral-500 dark:text-neutral-400',
            isActive
              ? 'top-2 text-xs text-primary-yellow'
              : 'top-1/2 -translate-y-1/2 text-base'
          )}
        >
          {label}
        </label>
        {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
      </div>
    )
  }
)

Input.displayName = 'Input'
