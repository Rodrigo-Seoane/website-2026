'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Mail } from 'lucide-react'

export function AboutCTA() {
  return (
    <section className="py-20 md:py-28 bg-dark-700">
      <div className="container mx-auto px-6 lg:px-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto"
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold text-dark-50">
            Let&apos;s Work Together
          </h2>
          <p className="text-dark-50/70 text-lg mt-4 leading-relaxed">
            Ready to transform your product experience? Book a 20-minute discovery call to discuss your project.
          </p>

          {/* CTA buttons */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            {/* Primary: Calendly */}
            <a
              href="https://calendly.com/rodrigo_seoane/discovery"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary-yellow text-dark-900 font-semibold text-lg rounded hover:bg-primary-yellow/90 hover:shadow-lg transition-all duration-300 focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2"
            >
              Book a Discovery Call
              <ArrowRight size={20} aria-hidden="true" />
            </a>

            {/* Secondary: Email */}
            <a
              href="mailto:business@rodrigoseoane.com"
              className="inline-flex items-center gap-2 px-8 py-4 border-2 border-dark-50 text-dark-50 font-semibold text-lg rounded hover:bg-dark-50 hover:text-dark-900 transition-all duration-300 focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2"
            >
              <Mail size={20} aria-hidden="true" />
              Send an Email
            </a>
          </div>

          {/* Contact info line */}
          <p className="text-dark-50/50 text-sm mt-6">
            Or reach out directly at{' '}
            <span className="text-dark-50 font-medium">business@rodrigoseoane.com</span>
          </p>
        </motion.div>
      </div>
    </section>
  )
}
