'use client'

import { motion } from 'framer-motion'
import { Badge } from '@/components/ui/Badge'
import { skillCategories } from '@/lib/data/about'
import { staggerContainer, fadeUp } from '@/lib/utils/animations'

export function SkillsSection() {
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
            Skills &amp; Expertise
          </h2>
          <p className="text-dark-900/70 text-lg mt-3 leading-relaxed">
            A quarter century of craft, distilled into capability.
          </p>
        </motion.div>

        {/* Skill groups */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="max-w-4xl mx-auto space-y-10"
        >
          {skillCategories.map((category) => (
            <motion.div key={category.id} variants={fadeUp}>
              {/* Category label */}
              <h3 className="font-display text-lg font-bold text-dark-900 mb-4">
                {category.label}
              </h3>

              {/* Badge row */}
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <Badge
                    key={skill}
                    variant="default"
                    className="bg-white border border-dark-150 text-dark-900 text-sm px-4 py-2 hover:scale-105 transition-transform duration-200 cursor-default"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
