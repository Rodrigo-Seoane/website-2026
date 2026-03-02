'use client'

import { motion } from 'framer-motion'
import {
  Figma, PenTool, Layers, Image as ImageIcon, Paintbrush,
  Zap, LayoutGrid, FileText, ClipboardList, MessageSquare,
  Code2, Github,
} from 'lucide-react'
import { tools } from '@/lib/data/about'
import { staggerContainer, fadeUp } from '@/lib/utils/animations'

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Figma,
  PenTool,
  Layers,
  Image: ImageIcon,
  Paintbrush,
  Zap,
  LayoutGrid,
  FileText,
  ClipboardList,
  MessageSquare,
  Code2,
  Github,
}

export function ToolsSection() {
  return (
    <section className="py-16 md:py-24 bg-dark-700">
      <div className="container mx-auto px-6 lg:px-20">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-12 md:mb-16"
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold text-dark-50">
            Tools of the Trade
          </h2>
          <p className="text-dark-50/70 text-lg mt-3 leading-relaxed">
            The tools I reach for every day to bring ideas to life.
          </p>
        </motion.div>

        {/* Tool grid: 3 cols mobile, 4 cols tablet, 6 cols desktop */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 lg:gap-6 max-w-5xl mx-auto"
        >
          {tools.map((tool) => {
            const Icon = iconMap[tool.icon]
            return (
              <motion.div
                key={tool.id}
                variants={fadeUp}
                className="group flex flex-col items-center justify-center p-4 bg-cream-500 rounded-xl transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-default"
              >
                {/* Icon -- muted by default, orange on hover via group-hover */}
                <div className="w-12 h-12 flex items-center justify-center mb-3">
                  <Icon size={32} className="text-dark-500 group-hover:text-orange-400 transition-colors duration-300" aria-hidden="true" />
                </div>

                {/* Tool name */}
                <span className="text-dark-900 text-sm font-medium text-center leading-tight">
                  {tool.name}
                </span>

                {/* Category -- appears on hover */}
                <span className="text-dark-500 text-xs mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {tool.category}
                </span>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
