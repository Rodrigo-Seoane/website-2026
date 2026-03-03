'use client'

import { cn } from '@/lib/utils/cn'
import type { CaseStudyTestimonial } from '@/lib/data/case-studies'

interface TestimonialCardProps {
  testimonial: CaseStudyTestimonial
  className?: string
}

export function TestimonialCard({ testimonial, className }: TestimonialCardProps) {
  return (
    <div
      className={cn(
        'bg-surface-quaternary border-4 border-border-accent rounded-lg p-5',
        'shadow-[0px_4px_16px_0px_rgba(130,130,130,0.15)]',
        'flex flex-col gap-4',
        className
      )}
    >
      {/* Quote Icon */}
      <div className="w-8 h-[23px] flex-shrink-0">
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
      <blockquote>
        <p className="font-body text-[16px] leading-[1.32] text-content-active-primary">
          {testimonial.quote}
        </p>
      </blockquote>

      {/* Author Info */}
      <div className="flex gap-4 items-center">
        {/* Avatar Placeholder */}
        <div
          className="w-12 h-12 rounded-full bg-gradient-to-br from-surface-primary to-surface-quaternary flex items-center justify-center shrink-0 overflow-hidden"
          aria-hidden="true"
        >
          <span className="font-display font-bold text-[14px] text-content-active-primary">
            {testimonial.author
              .split(' ')
              .map((n) => n.charAt(0))
              .join('')
              .toUpperCase()
              .slice(0, 2)}
          </span>
        </div>

        {/* Name and Role */}
        <div className="flex flex-col gap-0.5">
          <p className="font-body font-semibold text-[16px] leading-[1.32] text-content-active-primary">
            {testimonial.author}
          </p>
          <p className="font-body font-medium text-[12px] leading-[1.2] tracking-[0.48px] uppercase text-content-active-primary opacity-60">
            {testimonial.role}
          </p>
        </div>
      </div>
    </div>
  )
}
