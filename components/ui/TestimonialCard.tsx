'use client'

import { cn } from '@/lib/utils/cn'
import type { CaseStudyTestimonial } from '@/lib/data/case-studies'

interface TestimonialCardProps {
  testimonial: CaseStudyTestimonial
  className?: string
}

export function TestimonialCard({ testimonial, className }: TestimonialCardProps) {
  // Generate initials from author name for avatar fallback
  const initials = testimonial.author
    .split(' ')
    .map(name => name.charAt(0))
    .join('')
    .toUpperCase()
    .slice(0, 2)

  return (
    <div
      className={cn(
        'bg-surface-quaternary border-4 border-border-accent rounded-lg p-5',
        'shadow-[0px_4px_16px_0px_rgba(130,130,130,0.15)]',
        'flex flex-col gap-6',
        className
      )}
    >
      {/* Quote Icon */}
      <div className="relative w-8 h-6">
        <svg
          viewBox="0 0 32 23"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
          aria-hidden="true"
        >
          <path
            d="M0 22.848V9.504C0 3.168 3.168 0 9.504 0h3.168v3.168H9.504c-3.168 0-6.336 0-6.336 6.336v3.168h9.504v9.504H0v.672zm19.008 0V9.504C19.008 3.168 22.176 0 28.512 0h3.168v3.168h-3.168c-3.168 0-6.336 0-6.336 6.336v3.168h9.504v9.504h-12.672v.672z"
            fill="currentColor"
            className="text-content-active-primary opacity-30"
          />
        </svg>
      </div>

      {/* Quote Body */}
      <blockquote className="flex flex-col gap-4">
        <p className="font-body text-[16px] leading-[1.32] text-content-active-primary">
          {testimonial.quote}
        </p>
      </blockquote>

      {/* Author Info */}
      <div className="flex gap-4 items-start">
        {/* Avatar with Initials Fallback */}
        <div
          className="w-12 h-12 rounded-full bg-gradient-to-br from-surface-primary to-accent-primary flex items-center justify-center shrink-0"
          aria-hidden="true"
        >
          <span className="font-display font-bold text-[14px] text-content-active-primary">
            {initials}
          </span>
        </div>

        {/* Name and Role */}
        <div className="flex flex-col gap-1">
          <p className="font-body font-medium text-[12px] leading-[1.2] tracking-[0.48px] uppercase text-content-active-primary">
            {testimonial.role}
          </p>
          <p className="font-body font-semibold text-[18px] leading-[1.32] text-content-active-primary">
            {testimonial.author}
          </p>
        </div>
      </div>
    </div>
  )
}
