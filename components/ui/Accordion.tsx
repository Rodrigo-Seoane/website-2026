'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Minus } from 'lucide-react'
import { cn } from '@/lib/utils/cn'

interface AccordionItem {
  question: string
  answer: string
}

interface AccordionProps {
  items: AccordionItem[]
  defaultOpenIndex?: number
  className?: string
}

export function Accordion({ items, defaultOpenIndex = -1, className }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number>(defaultOpenIndex)

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? -1 : index)
  }

  return (
    <div className={cn('space-y-4', className)}>
      {items.map((item, index) => {
        const isOpen = openIndex === index

        return (
          <div
            key={index}
            className="bg-white border-b-4 border-orange-400 overflow-hidden"
          >
            <button
              onClick={() => toggleItem(index)}
              className="w-full p-6 flex items-center justify-between text-left"
              aria-expanded={isOpen}
            >
              <span className="font-display font-bold text-xl text-dark-900 pr-4">
                {item.question}
              </span>
              <span className="bg-dark-900 rounded p-1 shrink-0">
                {isOpen ? (
                  <Minus size={20} className="text-white" />
                ) : (
                  <Plus size={20} className="text-white" />
                )}
              </span>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                >
                  <div className="text-dark-900 px-6 pb-6">
                    {item.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}
