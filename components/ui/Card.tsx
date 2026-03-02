'use client'

import { motion, HTMLMotionProps } from 'framer-motion'
import { cn } from '@/lib/utils/cn'

interface CardProps extends HTMLMotionProps<'div'> {
  hover?: boolean
  children: React.ReactNode
}

export function Card({ hover = true, className, children, ...props }: CardProps) {
  return (
    <motion.div
      whileHover={
        hover
          ? { y: -4, boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }
          : undefined
      }
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className={cn(
        'rounded-2xl bg-white dark:bg-dark-surface',
        'border border-neutral-200 dark:border-dark-border',
        'overflow-hidden',
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  )
}
