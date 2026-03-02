import { getUpcomingExperiments } from '@/lib/data/experiments'

/**
 * Dashed-border teaser that renders only when there are no upcoming
 * experiments (in-progress or concept). Theme-aware styling.
 */
export function ComingSoonTeaser() {
  if (getUpcomingExperiments().length > 0) return null

  return (
    <div className="container mx-auto px-6 lg:px-20 pb-16 lg:pb-24">
      <div className="rounded-2xl border-2 border-dashed border-neutral-300 dark:border-dark-border bg-neutral-50 dark:bg-dark-surface/50 p-8">
        <p className="font-display font-bold text-lg text-dark-900 dark:text-neutral-300">
          More experiments brewing...
        </p>
        <p className="text-dark-500 dark:text-neutral-500 text-sm mt-2">
          New projects are always in the works. Check back soon or follow on
          LinkedIn for updates.
        </p>
      </div>
    </div>
  )
}
