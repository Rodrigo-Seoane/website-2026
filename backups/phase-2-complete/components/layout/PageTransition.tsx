'use client'

import { motion } from 'framer-motion'
import { fadeUp } from '@/lib/utils/animations'

interface PageTransitionProps {
  children: React.ReactNode
  className?: string
}

export function PageTransition({ children, className }: PageTransitionProps) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="hidden"
      variants={fadeUp}
      className={className}
    >
      {children}
    </motion.div>
  )
}
