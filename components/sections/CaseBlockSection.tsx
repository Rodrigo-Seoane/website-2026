'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { TrendingUp, Users, LucideIcon } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

// Animation variants for sequential disclosure
const sectionVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
}

const categoryVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
}

const titleVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
}

const featureVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
}

const buttonVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
}

const imageVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
}

interface Feature {
  icon: LucideIcon
  text: string
}

interface CTA {
  label: string
  href: string
}

interface CaseBlockData {
  slug: string
  category: string
  title: string
  features: Feature[]
  image: string
  altText: string
  primaryCta: CTA
  secondaryCta: CTA
}

interface CaseBlockSectionProps {
  caseData: CaseBlockData
  index: number
  showDivider?: boolean
}

export function CaseBlockSection({ caseData, index, showDivider = true }: CaseBlockSectionProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  // Alternating layout: even index = content-left/image-right, odd = image-left/content-right
  const imagePosition = index % 2 === 0 ? 'right' : 'left'
  const contentOrder = imagePosition === 'left' ? 'order-2' : 'order-1'
  const imageOrder = imagePosition === 'left' ? 'order-1' : 'order-2'

  return (
    <motion.div
      ref={ref}
      variants={sectionVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      className="bg-surface-primary"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-20">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-20 items-center py-10 sm:py-16 lg:py-20">
          {/* Content */}
          <div className={`flex-1 flex flex-col gap-8 sm:gap-12 py-4 sm:py-8 ${contentOrder}`}>
            {/* Section Text */}
            <div className="flex flex-col gap-8 sm:gap-12">
              <motion.div variants={categoryVariants} className="flex flex-col gap-2">
                <p className="font-sans font-bold text-base text-[#001d6c] uppercase tracking-wide leading-none">
                  {caseData.category}
                </p>
                <motion.h2
                  variants={titleVariants}
                  className="font-display font-bold text-xl sm:text-2xl lg:text-[32px] text-content-active-primary leading-[1.1]"
                >
                  {caseData.title}
                </motion.h2>
              </motion.div>
            </div>

            {/* Features */}
            <motion.div
              variants={sectionVariants}
              className="flex flex-col sm:flex-row gap-6"
            >
              {caseData.features.map((feature, idx) => (
                <motion.div
                  key={idx}
                  variants={featureVariants}
                  className="flex-1 flex flex-col gap-4"
                >
                  <div className="w-12 h-12 flex items-center justify-center text-accent-primary">
                    <feature.icon size={48} strokeWidth={1.5} />
                  </div>
                  <p className="text-content-active-primary text-lg leading-[1.4]">
                    {feature.text}
                  </p>
                </motion.div>
              ))}
            </motion.div>

            {/* Buttons */}
            <motion.div variants={buttonVariants} className="flex flex-col sm:flex-row gap-4 sm:gap-6">
              <Link
                href={caseData.primaryCta.href}
                className="inline-flex items-center justify-center h-12 sm:h-16 px-6 sm:px-10 bg-content-active-primary text-content-active-secondary font-semibold text-base sm:text-lg rounded tracking-[0.5px] hover:bg-content-active-primary/90 transition-colors"
              >
                {caseData.primaryCta.label}
              </Link>
              <Link
                href={caseData.secondaryCta.href}
                className="inline-flex items-center justify-center h-12 sm:h-16 px-6 sm:px-10 bg-surface-terciary text-surface-secondary font-semibold text-base sm:text-lg rounded tracking-[0.5px] hover:bg-surface-terciary/80 transition-colors"
              >
                {caseData.secondaryCta.label}
              </Link>
            </motion.div>
          </div>

          {/* Image */}
          <motion.div
            variants={imageVariants}
            className={`flex-1 ${imageOrder}`}
          >
            <div className="relative aspect-4/3 w-full overflow-hidden rounded-lg bg-content-disable-light">
              <Image
                src={caseData.image}
                alt={caseData.altText}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Divider between sections */}
      {showDivider && (
        <div className="container mx-auto px-4 sm:px-6 lg:px-20">
          <div className="h-px bg-content-active-primary/10" />
        </div>
      )}
    </motion.div>
  )
}

// Feature data mapping for each case study
export const caseFeatures: Record<string, Feature[]> = {
  'axa-go-agents-coach': [
    {
      icon: TrendingUp,
      text: 'Won awards for innovation within AXA Group Operations.',
    },
    {
      icon: Users,
      text: 'Demonstrated the scalability of AI-driven tools for addressing critical business challenges.',
    },
  ],
  'atlas-onboarding': [
    {
      icon: TrendingUp,
      text: '10+ Improved SUS Score — Increased by 10.2 points, exceeding the 2023 goal.',
    },
    {
      icon: Users,
      text: '53% Boost in Sales Conversion — 53% increase in low-friction sales post-launch, driven by clearer value communication.',
    },
  ],
  'bennitai-marketplace': [
    {
      icon: TrendingUp,
      text: '23% Community Membership — Achieved within 3 months post-launch.',
    },
    {
      icon: Users,
      text: '200+ Opportunities Created — Ranging from short-term fixes to long-term collaborations in the first month.',
    },
  ],
  'diblasi-franchise': [
    {
      icon: TrendingUp,
      text: '40% Improvement in Lead Qualification — Achieved within 3 months.',
    },
    {
      icon: Users,
      text: '25% Reduction in CAC — Post-launch, driven by targeted messaging and clearer value propositions.',
    },
  ],
  'atlas-optimise': [
    {
      icon: TrendingUp,
      text: '31% Enterprise Customer Retention — Achieved within 6 months.',
    },
    {
      icon: Users,
      text: '16% New leads via B2B Resource Marketplace spin-off.',
    },
  ],
}

// Short subtitles for case block display (matches live site)
export const caseSubtitles: Record<string, string> = {
  'axa-go-agents-coach': 'AI-Driven Training to Improve Onboarding and Retention',
  'atlas-onboarding': 'Redesigning Atlas Onboarding for Low-Friction Sales',
  'bennitai-marketplace': 'Bridging the IIoT Talent Gap with AI-Driven Design',
  'diblasi-franchise': 'UX-Driven National Expansion through Targeted Onboarding',
  'atlas-optimise': 'Scaling from 0 to 1 with User-Centric Design',
}
