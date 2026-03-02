'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowUpRight, TrendingUp, Users } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

// Featured cases data - only 3 specific cases
const featuredCases = [
  {
    slug: 'axa-go-agents-coach',
    category: "AXA GO Agent's Coach Initiative",
    title: 'AI-Driven Training to Improve Onboarding and Retention',
    features: [
      {
        icon: TrendingUp,
        text: 'Personalized AI coaching that adapts to each agent\'s learning pace and performance metrics.',
      },
      {
        icon: Users,
        text: 'Reduced time-to-competency by 38% while improving agent retention rates significantly.',
      },
    ],
    image: '/images/Case Covers/Customer Simulator.png',
    altText: "AXA GO Agent's Coach -- AI-powered training simulation interface",
    primaryCta: { label: 'View Case Study', href: '/work/axa-go-agents-coach' },
    secondaryCta: { label: 'See Results', href: '/work/axa-go-agents-coach#results' },
  },
  {
    slug: 'atlas-onboarding',
    category: 'Atlas Onboarding',
    title: 'Transforming User Adoption through Streamlined Onboarding',
    features: [
      {
        icon: TrendingUp,
        text: 'Strategic UX research and prototyping to identify and eliminate onboarding friction points.',
      },
      {
        icon: Users,
        text: 'Increased user adoption by 47% and improved sales conversion through optimized flows.',
      },
    ],
    image: '/images/Case Covers/Atlas Onboarding.png',
    altText: 'Atlas Onboarding -- redesigned user onboarding flow for a B2B SaaS platform',
    primaryCta: { label: 'View Case Study', href: '/work/atlas-onboarding' },
    secondaryCta: { label: 'See Results', href: '/work/atlas-onboarding#results' },
  },
  {
    slug: 'bennitai-marketplace',
    category: 'BennitAI Marketplace',
    title: 'AI-Powered Platform Design for Community Engagement',
    features: [
      {
        icon: TrendingUp,
        text: 'Intelligent matching algorithms that connect users with relevant opportunities seamlessly.',
      },
      {
        icon: Users,
        text: 'Reduced onboarding friction by 58% while boosting community engagement by 73%.',
      },
    ],
    image: '/images/Case Covers/Bennit AI.png',
    altText: 'BennitAI Marketplace -- AI-powered community engagement platform design',
    primaryCta: { label: 'View Case Study', href: '/work/bennitai-marketplace' },
    secondaryCta: { label: 'See Results', href: '/work/bennitai-marketplace#results' },
  },
]

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

interface CaseSectionProps {
  caseData: typeof featuredCases[0]
  imagePosition: 'left' | 'right'
  index: number
}

function CaseSection({ caseData, imagePosition, index }: CaseSectionProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const contentOrder = imagePosition === 'left' ? 'order-2' : 'order-1'
  const imageOrder = imagePosition === 'left' ? 'order-1' : 'order-2'

  return (
    <motion.div
      ref={ref}
      variants={sectionVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      className="bg-primary-yellow"
    >
      <div className="container mx-auto px-6 lg:px-20">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center py-16 lg:py-20">
          {/* Content */}
          <div className={`flex-1 flex flex-col gap-12 py-8 ${contentOrder}`}>
            {/* Section Text */}
            <div className="flex flex-col gap-12">
              <motion.div variants={categoryVariants} className="flex flex-col gap-2">
                <p className="font-sans font-bold text-xl text-[#001d6c] uppercase tracking-[1px] leading-none">
                  {caseData.category}
                </p>
                <motion.h2
                  variants={titleVariants}
                  className="font-display font-bold text-3xl lg:text-[32px] text-dark-900 leading-[1.1]"
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
                  <div className="w-12 h-12 flex items-center justify-center text-orange-400">
                    <feature.icon size={40} strokeWidth={1.5} />
                  </div>
                  <p className="text-dark-900 text-lg leading-[1.4]">
                    {feature.text}
                  </p>
                </motion.div>
              ))}
            </motion.div>

            {/* Buttons */}
            <motion.div variants={buttonVariants} className="flex gap-6 flex-wrap">
              <Link
                href={caseData.primaryCta.href}
                className="inline-flex items-center justify-center h-16 px-10 bg-dark-900 text-dark-50 font-semibold text-lg rounded tracking-[0.5px] hover:bg-dark-900/90 transition-colors"
              >
                {caseData.primaryCta.label}
              </Link>
              <Link
                href={caseData.secondaryCta.href}
                className="inline-flex items-center justify-center h-16 px-10 bg-cream-100 text-dark-700 font-semibold text-lg rounded tracking-[0.5px] hover:bg-cream-100/80 transition-colors"
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
            <div className="relative aspect-4/3 w-full overflow-hidden rounded-lg bg-dark-150">
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

      {/* Divider between sections (except last) */}
      {index < featuredCases.length - 1 && (
        <div className="container mx-auto px-6 lg:px-20">
          <div className="h-px bg-dark-900/10" />
        </div>
      )}
    </motion.div>
  )
}

export function FeaturedWork() {
  return (
    <section>
      {/* Section Header */}
      <div className="bg-primary-yellow pt-16 lg:pt-24">
        <div className="container mx-auto px-6 lg:px-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.5 }}
            className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 pb-8"
          >
            <div>
              <p className="text-orange-400 font-bold text-sm uppercase tracking-widest mb-2">
                Featured Work
              </p>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-dark-900">
                Case Studies
              </h2>
              <p className="text-dark-900/70 mt-2 max-w-lg">
                Measurable impact through strategic design
              </p>
            </div>
            <Link
              href="/work"
              className="inline-flex items-center gap-2 text-dark-900 font-semibold hover:text-orange-400 transition-colors"
            >
              View all projects
              <ArrowUpRight size={18} />
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Case Studies - Alternating Layout */}
      {featuredCases.map((caseData, index) => (
        <CaseSection
          key={caseData.slug}
          caseData={caseData}
          imagePosition={index % 2 === 0 ? 'right' : 'left'}
          index={index}
        />
      ))}
    </section>
  )
}
