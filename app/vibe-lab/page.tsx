'use client'

import { getLiveExperiments } from '@/lib/data/experiments'
import { VibeLabHero, ExperimentCard, ComingSoonTeaser } from '@/components/sections/vibe-lab'

export default function VibeLabPage() {
  const liveExperiments = getLiveExperiments()

  return (
    <div className="min-h-screen">
      <VibeLabHero />

      {/* Experiments grid */}
      <section className="bg-white dark:bg-dark-background py-10 lg:py-14">
        <div className="container mx-auto px-6 lg:px-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl">
            {liveExperiments.map((experiment) => (
              <ExperimentCard key={experiment.id} experiment={experiment} />
            ))}
          </div>
        </div>
      </section>

      <ComingSoonTeaser />
    </div>
  )
}
