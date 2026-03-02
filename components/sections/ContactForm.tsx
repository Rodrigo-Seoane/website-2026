'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { motion, AnimatePresence } from 'framer-motion'
import { Check } from 'lucide-react'
import Image from 'next/image'
import { cn } from '@/lib/utils/cn'

interface ServiceOption {
  value: string
  label: string
}

interface FormData {
  name: string
  email: string
  companyUrl?: string
  service: string
  message: string
  consent: boolean
}

interface ContactFormProps {
  serviceOptions?: ServiceOption[]
  showCompanyUrl?: boolean
}

interface FloatingInputProps {
  label: string
  error?: string
  register: ReturnType<typeof useForm<FormData>>['register']
  name: 'name' | 'email' | 'companyUrl'
  type?: string
  required?: boolean
}

function FloatingInput({
  label,
  error,
  register,
  name,
  type = 'text',
  required,
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

interface FloatingTextareaProps {
  label: string
  error?: string
  register: ReturnType<typeof useForm<FormData>>['register']
  required?: boolean
}

function FloatingTextarea({
  label,
  error,
  register,
  required,
}: FloatingTextareaProps) {
  const [focused, setFocused] = useState(false)
  const [hasValue, setHasValue] = useState(false)

  return (
    <div className="relative">
      <textarea
        {...register('message', {
          required: required ? `${label} is required` : false,
          minLength: {
            value: 10,
            message: 'Message must be at least 10 characters',
          },
          onChange: (e) => setHasValue(!!e.target.value),
        })}
        onFocus={() => setFocused(true)}
        onBlur={(e) => {
          setFocused(false)
          setHasValue(!!e.target.value)
        }}
        rows={4}
        className={cn(
          'peer w-full px-4 py-3 pt-6',
          'bg-cream-500',
          'border-b border-dark-150',
          'outline-none transition-all duration-300 resize-none',
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
            : 'top-4 text-base'
        )}
      >
        {label}
      </label>
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  )
}

const defaultHomeServices: ServiceOption[] = [
  { value: 'Embedded Designer', label: 'Embedded Designer' },
  { value: 'Advisory Retainer', label: 'Advisory Retainer' },
  { value: 'Workshop Facilitation', label: 'Workshop Facilitation' },
]

export function ContactForm({
  serviceOptions = defaultHomeServices,
  showCompanyUrl = false
}: ContactFormProps) {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>()

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    console.log('Form data:', data)
    setIsSubmitting(false)
    setIsSubmitted(true)
    reset()
  }

  return (
    <section id="contact" className="bg-primary-yellow">
      <div className="px-6 lg:px-20 pt-20">
        <div className="max-w-[1280px] mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-[900px] mx-auto mb-12"
          >
            <h2 className="font-display text-[32px] leading-[1.1] font-bold text-dark-900">
              Ready to work together?
            </h2>
            <p className="text-dark-900/80 mt-4 font-body font-semibold text-lg leading-[1.32]">
              Let&apos;s talk about your product challenges. No commitment, no pressure -- just a conversation about what&apos;s possible.
            </p>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="max-w-[600px] mx-auto"
          >
            <AnimatePresence mode="wait">
              {isSubmitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="h-full flex items-center justify-center p-8 text-center"
                >
                  <div>
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', delay: 0.2 }}
                      className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-600 flex items-center justify-center"
                    >
                      <Check size={32} className="text-white" />
                    </motion.div>
                    <h3 className="font-display text-xl font-semibold mb-2 text-dark-900">
                      Thank you!
                    </h3>
                    <p className="text-dark-900/80 mb-6">
                      Your submission has been received. I&apos;ll get back to you within 24 hours.
                    </p>
                    <button
                      onClick={() => setIsSubmitted(false)}
                      className="text-dark-900 font-medium hover:underline"
                    >
                      Send another message
                    </button>
                  </div>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
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

                  {showCompanyUrl && (
                    <FloatingInput
                      label="Company Website"
                      name="companyUrl"
                      type="url"
                      register={register}
                      error={errors.companyUrl?.message}
                    />
                  )}

                  {/* Service Dropdown */}
                  <div className="relative">
                    <select
                      {...register('service', {
                        required: 'Please select a service',
                      })}
                      className={cn(
                        'w-full px-4 py-3 pt-6',
                        'bg-cream-500',
                        'border-b border-dark-150',
                        'outline-none transition-all duration-300',
                        'focus:border-b-2 focus:border-dark-900',
                        'appearance-none cursor-pointer',
                        errors.service && 'border-red-500'
                      )}
                    >
                      <option value="">Select a service...</option>
                      {serviceOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                      <option value="Not sure yet - Let's discuss">Not sure yet - Let&apos;s discuss</option>
                    </select>
                    <label className="absolute left-4 top-1 text-xs tracking-[0.24px] text-dark-900 pointer-events-none">
                      Which service are you interested in?
                    </label>
                    {errors.service && (
                      <p className="mt-1 text-sm text-red-500">{errors.service.message}</p>
                    )}
                  </div>

                  <FloatingTextarea
                    label="Tell me about your UX challenges"
                    register={register}
                    error={errors.message?.message}
                    required
                  />

                  {/* Consent Checkbox */}
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
                      I agree to the processing of my personal data
                    </label>
                  </div>
                  {errors.consent && (
                    <p className="text-sm text-red-500">{errors.consent.message}</p>
                  )}

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
                        Sending...
                      </>
                    ) : (
                      'Send'
                    )}
                  </button>

                  {/* Legal Disclaimer */}
                  <p className="text-xs text-dark-500 text-center mt-4">
                    By submitting this form, you agree to our Privacy Policy.
                  </p>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>

      {/* Rio-BCN Skyline Illustration */}
      <div className="w-full overflow-hidden mt-20">
        <Image
          src="/images/Illustration Rio-BCN.svg"
          alt="Skyline illustration of Rio de Janeiro and Barcelona"
          width={1440}
          height={193}
          className="w-full h-auto block"
        />
      </div>
    </section>
  )
}
