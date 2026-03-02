// ---------------------------------------------------------------------------
// Experiment data for the Vibe Lab page.
// ---------------------------------------------------------------------------

/** Lifecycle stage of an experiment. */
export type ExperimentStatus = 'live' | 'in-progress' | 'concept'

export interface Experiment {
  /** URL-safe unique identifier. */
  id: string
  /** Display name shown in the card title. */
  title: string
  /** One-line summary (max 120 characters) used in meta descriptions. */
  description: string
  /** Long-form headline rendered inside the card body. */
  headline: string
  /** Current lifecycle stage. */
  status: ExperimentStatus
  /** Primary category label, e.g. "Web App". */
  category: string
  /** Optional sub-category rendered as a pill next to category. */
  subcategory?: string
  /** Path relative to /public for the card thumbnail. */
  thumbnail: string
  /** External URL — required when status is "live", optional otherwise. */
  url?: string
  /** Concrete benefits of the experiment (max 3). */
  benefits: { title: string; description: string }[]
  /** Tech-stack or topic labels. */
  tags: string[]
  /** Sort weight — lower values appear first. */
  order: number
  /** Flag for future homepage teaser use. */
  featured: boolean
}

// ---------------------------------------------------------------------------
// Static data
// ---------------------------------------------------------------------------

export const experiments: Experiment[] = [
  {
    id: 'mi-agenda-fiscal',
    title: 'Mi Agenda Fiscal',
    description: 'A tax deadline management app for Spanish freelancers.',
    headline:
      'Never miss a tax deadline again. Keep your tax obligations under control.',
    status: 'live',
    category: 'Web App',
    subcategory: 'Cost reduction',
    thumbnail: '/images/experiments/mi-agenda-fiscal.png',
    url: 'https://agendafiscal.rodrigoseoane.com/',
    benefits: [
      {
        title: 'Save valuable time',
        description: 'Automates calendar and spreadsheet organization',
      },
      {
        title: 'Avoid fines & surcharges',
        description: 'Protects your finances by keeping deadlines visible',
      },
    ],
    tags: ['React', 'Tailwind CSS', 'Tax Planning'],
    order: 1,
    featured: true,
  },
]

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Returns all live experiments sorted by order ascending. */
export function getLiveExperiments(): Experiment[] {
  return experiments
    .filter((e) => e.status === 'live')
    .sort((a, b) => a.order - b.order)
}

/** Returns experiments that are in-progress or concept, sorted by order ascending. */
export function getUpcomingExperiments(): Experiment[] {
  return experiments
    .filter((e) => e.status === 'in-progress' || e.status === 'concept')
    .sort((a, b) => a.order - b.order)
}

/** Finds a single experiment by its URL-safe id. */
export function getExperimentById(id: string): Experiment | undefined {
  return experiments.find((e) => e.id === id)
}
