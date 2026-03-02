'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Check } from 'lucide-react'
import { pricingPlans, pricingSectionContent, type PricingPlan } from '@/lib/data/ux-pulse-check'
import { fadeUp, staggerContainer } from '@/lib/utils/animations'
import { cn } from '@/lib/utils/cn'

function PricingCard({ plan }: { plan: PricingPlan }) {
  return (
    <div
      className={cn(
        'relative flex flex-col p-8 bg-cream-500 rounded-xl',
        plan.featured && 'ring-2 ring-orange-400 shadow-xl'
      )}
    >
      {plan.featured && plan.badge && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-orange-400 text-white px-4 py-1 rounded-full text-sm font-medium">
          {plan.badge}
        </span>
      )}

      {/* Plan Name */}
      <h3 className="font-display text-2xl font-bold text-dark-900">
        {plan.name}
      </h3>

      {/* Duration */}
      <p className="text-dark-500 text-sm mt-1">{plan.duration}</p>

      {/* Price */}
      <div className="mt-4 mb-6">
        <span className="text-5xl font-bold text-dark-900">
          {plan.currency}{plan.price}
        </span>
      </div>

      {/* Description */}
      <p className="text-dark-900/80 mb-6">{plan.description}</p>

      {/* Features List */}
      <ul className="space-y-3 mb-8 flex-1">
        {plan.features.map((feature, index) => (
          <li key={index} className="flex items-start gap-3">
            <Check size={20} className="text-orange-400 shrink-0 mt-0.5" />
            <span className="text-dark-900">{feature}</span>
          </li>
        ))}
      </ul>

      {/* CTA Button */}
      <a
        href={plan.ctaUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          'w-full py-4 px-6 font-semibold rounded-lg text-center transition-colors',
          plan.featured
            ? 'bg-dark-900 text-white hover:bg-dark-900/90'
            : 'bg-dark-900/10 text-dark-900 hover:bg-dark-900/20'
        )}
      >
        {plan.cta}
      </a>
    </div>
  )
}

export function PricingCards() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="pricing" className="py-16 lg:py-20 bg-primary-yellow">
      <div className="container mx-auto px-6 lg:px-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-3xl lg:text-4xl font-bold text-dark-900 mb-4">
            {pricingSectionContent.headline}
          </h2>
          <p className="text-lg text-dark-900/80 max-w-2xl mx-auto">
            {pricingSectionContent.subheadline}
          </p>
        </motion.div>

        {/* Cards Grid */}
        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto"
        >
          {pricingPlans.map((plan) => (
            <motion.div key={plan.id} variants={fadeUp}>
              <PricingCard plan={plan} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
