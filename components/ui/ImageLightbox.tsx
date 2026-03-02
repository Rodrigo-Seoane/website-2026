'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import type { CaseStudyImage } from '@/lib/data/case-studies'

interface ImageLightboxProps {
  images: CaseStudyImage[]
  initialIndex?: number
  isOpen: boolean
  onClose: () => void
}

export function ImageLightbox({
  images,
  initialIndex = 0,
  isOpen,
  onClose,
}: ImageLightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex)
  const previousFocusRef = useRef<Element | null>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  // Sync initialIndex when lightbox opens; manage body scroll and focus
  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(initialIndex)
      previousFocusRef.current = document.activeElement
      document.body.style.overflow = 'hidden'
      // Move focus to close button after render
      setTimeout(() => closeButtonRef.current?.focus(), 0)
    } else {
      document.body.style.overflow = ''
      // Restore focus to the element that opened the lightbox
      if (previousFocusRef.current && previousFocusRef.current instanceof HTMLElement) {
        previousFocusRef.current.focus()
      }
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen, initialIndex])

  const goTo = useCallback((index: number) => {
    setCurrentIndex((index + images.length) % images.length)
  }, [images.length])

  const prev = useCallback(() => goTo(currentIndex - 1), [currentIndex, goTo])
  const next = useCallback(() => goTo(currentIndex + 1), [currentIndex, goTo])

  // Keyboard handler
  useEffect(() => {
    if (!isOpen) return

    const handleKey = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'Escape':
          e.preventDefault()
          onClose()
          break
        case 'ArrowLeft':
          e.preventDefault()
          prev()
          break
        case 'ArrowRight':
          e.preventDefault()
          next()
          break
      }
    }

    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [isOpen, prev, next, onClose])

  const currentImage = images[currentIndex]

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label="Image gallery viewer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-dark-900/95 p-4"
          // Click on backdrop closes
          onClick={onClose}
        >
          {/* Screen reader announcement */}
          <span className="sr-only" aria-live="polite">
            Image {currentIndex + 1} of {images.length}
          </span>

          {/* Close button */}
          <button
            ref={closeButtonRef}
            onClick={(e) => { e.stopPropagation(); onClose() }}
            aria-label="Close gallery"
            className="absolute top-4 right-4 text-white hover:text-primary-yellow transition-colors z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-yellow rounded"
          >
            <X size={32} />
          </button>

          {/* Counter */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 text-white/70 text-sm z-10">
            {currentIndex + 1} / {images.length}
          </div>

          {/* Image -- stop propagation so clicking the image does not close */}
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="relative max-w-5xl max-h-[75vh] w-full flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={currentImage.src}
              alt={currentImage.alt}
              fill
              sizes="(max-width: 768px) 100vw, 80vw"
              className="object-contain"
              priority
            />
          </motion.div>

          {/* Caption */}
          {currentImage.caption && (
            <p className="text-white/80 text-sm mt-4 text-center max-w-2xl z-10">
              {currentImage.caption}
            </p>
          )}

          {/* Navigation arrows */}
          <button
            onClick={(e) => { e.stopPropagation(); prev() }}
            aria-label="Previous image"
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-primary-yellow transition-colors z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-yellow rounded"
          >
            <ChevronLeft size={36} />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); next() }}
            aria-label="Next image"
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-primary-yellow transition-colors z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-yellow rounded"
          >
            <ChevronRight size={36} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// Default export for compatibility with next/dynamic
export default ImageLightbox
