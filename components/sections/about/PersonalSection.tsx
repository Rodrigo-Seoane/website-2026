'use client'

import { motion } from 'framer-motion'
import { Globe, Camera, UtensilsCrossed, Music } from 'lucide-react'
import { interests } from '@/lib/data/about'
import { staggerContainer, fadeUp } from '@/lib/utils/animations'

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Globe,
  Camera,
  UtensilsCrossed,
  Music,
}

export function PersonalSection() {
  return (
    <section className="py-16 md:py-24 bg-cream-500">
      <div className="container mx-auto px-6 lg:px-20">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-12 md:mb-16"
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold text-dark-900">
            Beyond the Desk
          </h2>
          <p className="text-dark-900/70 text-lg mt-3 leading-relaxed">
            The things that keep me curious outside of work.
          </p>
        </motion.div>

        {/* 4-card grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
        >
          {interests.map((item) => {
            const Icon = iconMap[item.icon]
            return (
              <motion.div
                key={item.id}
                variants={fadeUp}
                className="group h-full flex flex-col p-6 md:p-8 bg-cream-500 rounded-xl transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border-b-4 border-dark-900"
              >
                {/* Icon circle */}
                <div className="w-12 h-12 bg-orange-400 rounded-full flex items-center justify-center mb-4">
                  <Icon size={24} className="text-dark-50" aria-hidden="true" />
                </div>

                <h3 className="font-display text-xl font-bold text-dark-900 mb-3">
                  {item.title}
                </h3>

                <p className="text-dark-900/75 text-base leading-relaxed grow">
                  {item.description}
                </p>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
