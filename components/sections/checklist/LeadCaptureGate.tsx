'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils/cn'
import { leadCaptureContent } from '@/lib/data/retention-checklist'
import { fadeUp, staggerContainer } from '@/lib/utils/animations'
import type { LeadFormData } from '@/lib/data/retention-checklist'

interface LeadCaptureGateProps {
  onSubmit: (data: LeadFormData) => void
  isSubmitting: boolean
  submitError: string | null
}

interface FloatingInputProps {
  label: string
  error?: string
  name: 'name' | 'email' | 'company'
  type?: string
  required?: boolean
  register: ReturnType<typeof useForm<LeadFormData>>['register']
}

function FloatingInput({
  label,
  error,
  name,
  type = 'text',
  required,
  register,
}: FloatingInputProps) {
  const [focused, setFocused] = useState(false)
  const [hasValue, setHasValue] = useState(false)

  return (
    <div className="relative">
      <input
        type={type}
        {...register(name, {
          required: required ? `${label} is required` : false,
          pattern:
            type === 'email'
              ? {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address',
                }
              : undefined,
          onChange: (e) => setHasValue(!!e.target.value),
        })}
        onFocus={() => setFocused(true)}
        onBlur={(e) => {
          setFocused(false)
          setHasValue(!!e.target.value)
        }}
        className={cn(
          'peer w-full px-4 py-3 pt-6',
          'bg-cream-500',
          'border-b border-dark-150',
          'outline-none transition-all duration-300',
          'focus:border-b-2 focus:border-dark-900',
          error && 'border-red-500'
        )}
      />
      <label
        className={cn(
          'absolute left-4 transition-all duration-200 pointer-events-none',
          'text-dark-500 font-body',
          focused || hasValue
            ? 'top-1 text-xs tracking-[0.24px] text-dark-900'
            : 'top-1/2 -translate-y-1/2 text-base'
        )}
      >
        {label}
      </label>
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  )
}

export function LeadCaptureGate({
  onSubmit,
  isSubmitting,
  submitError,
}: LeadCaptureGateProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LeadFormData>()

  const [roleFocused, setRoleFocused] = useState(false)
  const [roleHasValue, setRoleHasValue] = useState(false)

  return (
    <section className="py-16 lg:py-20 bg-cream-500 min-h-[80vh]">
      <div className="container mx-auto px-6 lg:px-20 max-w-xl">
        {/* Header */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="text-center mb-10"
        >
          <motion.h2
            variants={fadeUp}
            className="font-display text-3xl lg:text-4xl font-bold text-dark-900 mb-3"
          >
            {leadCaptureContent.headline}
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="text-lg text-dark-500"
          >
            {leadCaptureContent.subheadline}
          </motion.p>
        </motion.div>

        {/* Form */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5"
        >
          <FloatingInput
            label="Your Name"
            name="name"
            register={register}
            error={errors.name?.message}
            required
          />

          <FloatingInput
            label="Email Address"
            name="email"
            type="email"
            register={register}
            error={errors.email?.message}
            required
          />

          <FloatingInput
            label="Company Name"
            name="company"
            register={register}
            error={errors.company?.message}
          />

          {/* Role Dropdown */}
          <div className="relative">
            <select
              {...register('role')}
              onFocus={() => setRoleFocused(true)}
              onBlur={(e) => {
                setRoleFocused(false)
                setRoleHasValue(!!e.target.value)
              }}
              onChange={(e) => setRoleHasValue(!!e.target.value)}
              className={cn(
                'w-full px-4 py-3 pt-6',
                'bg-cream-500',
                'border-b border-dark-150',
                'outline-none transition-all duration-300',
                'focus:border-b-2 focus:border-dark-900',
                'appearance-none cursor-pointer'
              )}
            >
              <option value="">Select your role...</option>
              {leadCaptureContent.roleOptions.map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>
            <label
              className={cn(
                'absolute left-4 transition-all duration-200 pointer-events-none',
                'text-dark-500 font-body',
                roleFocused || roleHasValue
                  ? 'top-1 text-xs tracking-[0.24px] text-dark-900'
                  : 'top-1/2 -translate-y-1/2 text-base'
              )}
            >
              Your Role
            </label>
          </div>

          {/* Privacy Consent */}
          <div className="flex items-start gap-2">
            <input
              type="checkbox"
              id="consent"
              {...register('consent', {
                required: 'You must agree to continue',
              })}
              className="mt-1 w-5 h-5 accent-dark-900 cursor-pointer"
            />
            <label
              htmlFor="consent"
              className="text-base text-dark-900 cursor-pointer font-body"
            >
              {leadCaptureContent.privacyLabel}
            </label>
          </div>
          {errors.consent && (
            <p className="text-sm text-red-500">{errors.consent.message}</p>
          )}

          {/* Error Message */}
          {submitError && (
            <p className="text-sm text-red-500 text-center">{submitError}</p>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 bg-dark-900 text-dark-50 font-semibold text-lg hover:bg-dark-900/90 transition-colors flex items-center justify-center disabled:opacity-50"
          >
            {isSubmitting ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                  className="w-5 h-5 border-2 border-dark-50/30 border-t-dark-50 rounded-full mr-2"
                />
                Submitting...
              </>
            ) : (
              leadCaptureContent.ctaText
            )}
          </button>

          {/* Privacy Note */}
          <p className="text-xs text-dark-500 text-center mt-4">
            {leadCaptureContent.privacyNote}
          </p>
        </motion.form>
      </div>
    </section>
  )
}
