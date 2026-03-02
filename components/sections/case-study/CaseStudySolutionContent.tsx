'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import type { CaseStudy } from '@/lib/data/case-studies'

// Dynamic import -- ImageLightbox loads only when the user clicks an image.
const ImageLightbox = dynamic(() => import('@/components/ui/ImageLightbox'), {
  ssr: false, // Lightbox uses browser APIs (focus, body scroll lock); skip SSR.
})

interface Props {
  caseStudy: CaseStudy
}

export function CaseStudySolutionContent({ caseStudy }: Props) {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)
  const { solution } = caseStudy

  const openLightbox = (index: number) => {
    setLightboxIndex(index)
    setLightboxOpen(true)
  }

  return (
    <div className="space-y-6">
      <p className="text-dark-900 text-base leading-relaxed">
        {solution.approach}
      </p>

      <div>
        <h3 className="font-display font-semibold text-lg text-dark-900 mb-3">
          Key Decisions
        </h3>
        <ul className="space-y-2">
          {solution.keyDecisions.map((decision, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="mt-1.5 w-2 h-2 rounded-full bg-orange-400 shrink-0" />
              <span className="text-dark-900 text-base leading-relaxed">{decision}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Image gallery -- each image is a clickable lightbox trigger */}
      {solution.images.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
          {solution.images.map((image, i) => (
            <button
              key={i}
              onClick={() => openLightbox(i)}
              className="group relative overflow-hidden rounded-lg bg-dark-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-dark-900"
              aria-label={`Open image: ${image.alt}`}
            >
              <div className="aspect-video">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, 50vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              {/* Hover overlay hint */}
              <div className="absolute inset-0 bg-dark-900/0 group-hover:bg-dark-900/40 transition-all duration-300" />
              {image.caption && (
                <p className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-dark-900/70 to-transparent px-3 py-2 text-white text-xs">
                  {image.caption}
                </p>
              )}
            </button>
          ))}
        </div>
      )}

      {/* Lightbox modal */}
      <ImageLightbox
        images={solution.images}
        initialIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
      />
    </div>
  )
}
