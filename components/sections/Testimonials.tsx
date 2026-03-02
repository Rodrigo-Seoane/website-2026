'use client'

import { useCallback, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import useEmblaCarousel from 'embla-carousel-react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils/cn'
import { testimonials } from '@/lib/data/testimonials'

export function Testimonials() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true })
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])
  const scrollTo = useCallback(
    (index: number) => emblaApi?.scrollTo(index),
    [emblaApi]
  )

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [emblaApi])

  // Auto-rotate every 5 seconds
  useEffect(() => {
    if (!emblaApi || isPaused) return

    const intervalId = setInterval(() => {
      emblaApi.scrollNext()
    }, 5000)

    return () => clearInterval(intervalId)
  }, [emblaApi, isPaused])

  // Update selected index on scroll
  useEffect(() => {
    if (!emblaApi) return
    onSelect()
    emblaApi.on('select', onSelect)
    return () => {
      emblaApi.off('select', onSelect)
    }
  }, [emblaApi, onSelect])

  return (
    <section className="py-10 md:py-12 bg-cream-500">
      <div className="container mx-auto px-6 lg:px-20">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-dark-900 text-center mb-8">
          What Our Clients Say
        </h2>

        {/* Carousel */}
        <div
          className="relative max-w-4xl mx-auto"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Navigation Arrows */}
          <button
            onClick={scrollPrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 md:-translate-x-8 z-10 p-2 rounded-full bg-white border border-dark-150 shadow-sm hover:bg-dark-50 transition-colors text-dark-900"
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={scrollNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 md:translate-x-8 z-10 p-2 rounded-full bg-white border border-dark-150 shadow-sm hover:bg-dark-50 transition-colors text-dark-900"
            aria-label="Next testimonial"
          >
            <ChevronRight size={20} />
          </button>

          {/* Embla Viewport */}
          <div ref={emblaRef} className="overflow-hidden">
            <div className="flex">
              {testimonials.map((testimonial, index) => (
                <div
                  key={testimonial.id}
                  className="flex-[0_0_100%] min-w-0 px-4"
                >
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: selectedIndex === index ? 1 : 0.5 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col md:flex-row gap-6 items-start justify-center p-6 max-w-4xl mx-auto"
                  >
                    {/* Left: Photo and Company */}
                    <div className="flex flex-col items-center gap-4 shrink-0">
                      {/* Avatar */}
                      <div className="w-24 h-24 rounded-full bg-dark-500/20 flex items-center justify-center overflow-hidden">
                        <span className="font-display font-bold text-2xl text-dark-900">
                          {testimonial.author
                            .split(' ')
                            .map((n) => n[0])
                            .join('')}
                        </span>
                      </div>
                      {/* Company placeholder */}
                      <div className="text-sm font-medium text-dark-500">
                        {testimonial.company}
                      </div>
                    </div>

                    {/* Right: Content */}
                    <div className="flex-1 text-dark-900">
                      {/* Author details */}
                      <div className="mb-4">
                        <p className="font-display font-bold text-2xl">
                          {testimonial.author}
                        </p>
                        <p className="font-semibold text-lg">
                          {testimonial.role}
                        </p>
                      </div>

                      {/* Quote Text */}
                      <blockquote className="text-base leading-relaxed">
                        {testimonial.quote}
                      </blockquote>
                    </div>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>

          {/* Dot Navigation */}
          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollTo(index)}
                className={cn(
                  'w-2 h-2 rounded-full transition-all duration-300',
                  selectedIndex === index
                    ? 'w-8 bg-orange-400'
                    : 'bg-dark-500/30 hover:bg-dark-500/50'
                )}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
