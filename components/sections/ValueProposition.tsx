'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Check } from 'lucide-react'
import Image from 'next/image'

// Problem cards data
const problemCards = [
  {
    title: 'User Experience Issues',
    icon: '/images/Card Icons 64px/SVG/UXpert.svg',
    items: [
      'Poor user adoption',
      'Confusing interface',
      'Escalating customer support volume',
      'Conflicting user feedback',
    ],
  },
  {
    title: 'Business Performance',
    icon: '/images/Card Icons 64px/SVG/ROI.svg',
    items: [
      'High churn rates',
      'Stalling revenue growth',
      'Losing ground to competitors',
      'Low conversion rates',
    ],
  },
  {
    title: 'Development Challenges',
    icon: '/images/Card Icons 64px/SVG/Priority Tasks.svg',
    items: [
      'Wasted engineering resources',
      'Redesigns that backfire',
      'Features nobody uses',
      'Mounting technical debt',
    ],
  },
]

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
}

const fadeUpVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
}

const itemVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
}

const imageVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
}

interface ProblemCardProps {
  card: typeof problemCards[0]
  index: number
}

function ProblemCard({ card, index }: ProblemCardProps) {
  return (
    <motion.div
      variants={cardVariants}
      className="bg-primary-yellow rounded-lg p-6 flex gap-4"
    >
      {/* Icon */}
      <div className="shrink-0">
        <div className="w-12 h-12 bg-orange-400 rounded-full flex items-center justify-center overflow-hidden">
          <Image
            src={card.icon}
            alt=""
            width={32}
            height={32}
            className="w-8 h-8"
          />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col gap-6">
        <h3 className="font-display font-bold text-2xl text-dark-900 leading-tight">
          {card.title}
        </h3>

        <motion.ul
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-2"
        >
          {card.items.map((item, idx) => (
            <motion.li
              key={idx}
              variants={itemVariants}
              className="flex items-start gap-2 text-dark-900"
            >
              <Check size={18} className="text-orange-400 shrink-0 mt-0.5" />
              <span className="text-base leading-relaxed">{item}</span>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </motion.div>
  )
}

export function ValueProposition() {
  const problemRef = useRef<HTMLDivElement>(null)
  const whyMeRef = useRef<HTMLDivElement>(null)
  const isProblemInView = useInView(problemRef, { once: true, margin: '-100px' })
  const isWhyMeInView = useInView(whyMeRef, { once: true, margin: '-100px' })

  return (
    <section className="bg-dark-700">
      {/* Part A: Problem Description */}
      <div ref={problemRef} className="py-16 lg:py-20">
        <div className="container mx-auto px-6 lg:px-20">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isProblemInView ? 'visible' : 'hidden'}
            className="flex flex-col gap-12"
          >
            {/* Header */}
            <div className="max-w-[960px] mx-auto text-center">
              <motion.p
                variants={fadeUpVariants}
                className="text-orange-400 font-bold text-sm uppercase tracking-widest mb-2"
              >
                Common Pitfalls
              </motion.p>
              <motion.h2
                variants={fadeUpVariants}
                className="font-display font-bold text-3xl lg:text-4xl text-dark-50 leading-tight mb-4"
              >
                The product trap that costs teams time and budget
              </motion.h2>
              <motion.p
                variants={fadeUpVariants}
                className="text-lg text-dark-50 leading-relaxed"
              >
                When user-centric thinking isn&apos;t woven into every stage of development, the consequences compound fast. Here&apos;s what that looks like in practice.
              </motion.p>
            </div>

            {/* Cards Grid */}
            <motion.div
              variants={containerVariants}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              {problemCards.map((card, index) => (
                <ProblemCard key={card.title} card={card} index={index} />
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Part B: Why Me */}
      <div ref={whyMeRef} className="py-16 lg:py-20">
        <div className="container mx-auto px-6 lg:px-20">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isWhyMeInView ? 'visible' : 'hidden'}
            className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center"
          >
            {/* Image */}
            <motion.div variants={imageVariants} className="flex-1 w-full">
              <div className="relative aspect-4/3 w-full overflow-hidden rounded-lg bg-dark-500">
                <Image
                  src="/images/Cases/Atlas Onboarding/Atlas Onboarding 01-min.png"
                  alt="Atlas Onboarding redesign -- streamlined user flow design for a B2B SaaS platform"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </motion.div>

            {/* Content */}
            <div className="flex-1 flex flex-col gap-12 py-8">
              <motion.div variants={fadeUpVariants} className="flex flex-col gap-8">
                <h2 className="font-display font-bold text-3xl lg:text-[32px] text-dark-50 leading-tight">
                  Design as a competitive advantage, not an afterthought
                </h2>
                <div className="flex flex-col gap-4 text-lg text-dark-50 leading-relaxed">
                  <p>
                    For 25 years I&apos;ve embedded myself in product teams facing the exact
                    challenges listed above. The common thread is not a lack of design
                    effort -- it&apos;s a lack of design strategy integrated with business
                    and engineering realities.
                  </p>
                  <p>
                    My capability is the combination of two things most designers have in
                    isolation: a 10,000-foot view of how a product ecosystem fits together,
                    and the hands-on skill to translate that vision into flows, components,
                    and prototypes that ship.
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
