export interface Testimonial {
  id: string
  quote: string
  author: string
  role: string
  company: string
  avatar?: string
}

export const testimonials: Testimonial[] = [
  {
    id: 'testimonial-1',
    quote:
      "Rodrigo transformed our onboarding experience. User activation jumped 53% in just three months. His deep understanding of user psychology made all the difference.",
    author: 'Sarah Chen',
    role: 'VP of Product',
    company: 'FinanceFlow',
    avatar: '/images/testimonials/avatar-1.jpg',
  },
  {
    id: 'testimonial-2',
    quote:
      "Working with Rodrigo was a game-changer for our retention metrics. He doesn't just design interfaces—he solves business problems through design.",
    author: 'Marcus Rodriguez',
    role: 'CEO',
    company: 'CloudMetrics',
    avatar: '/images/testimonials/avatar-2.jpg',
  },
  {
    id: 'testimonial-3',
    quote:
      "The patient portal redesign exceeded all expectations. Rodrigo's focus on accessibility and user research resulted in a 45% reduction in no-shows.",
    author: 'Dr. Emily Watson',
    role: 'Chief Medical Officer',
    company: 'MediConnect',
    avatar: '/images/testimonials/avatar-3.jpg',
  },
  {
    id: 'testimonial-4',
    quote:
      "Rodrigo brings a rare combination of strategic thinking and pixel-perfect execution. Our checkout conversion improved by 28% after his redesign.",
    author: 'James Park',
    role: 'Head of E-commerce',
    company: 'ShopStream',
    avatar: '/images/testimonials/avatar-4.jpg',
  },
  {
    id: 'testimonial-stina',
    quote:
      'Rodrigo is a great designer to work with, with an excellent ability to translate very complex ideas and concepts into compelling visuals and user stories. He is always ready to collaborate until the last mile of the project, responding to new needs and changes, always keeping a good sense of humor and a smile in the process.',
    author: 'Stina Heikkila',
    role: 'Lead Researcher',
    company: 'Urbact',
    avatar: '/images/testimonials/stina-heikkila.jpg',
  },
  {
    id: 'testimonial-martin',
    quote:
      'Rodrigo&apos;s user-centric approach was transformative. By rebalancing functionality for managers and operators through role-based dashboards and rapid prototyping, we didn&apos;t just simplify navigation—we operationalized scalability.',
    author: 'Martin Kelman',
    role: 'CDTO',
    company: 'ATS Global',
    avatar: '/images/testimonials/martin-kelman.jpg',
  },
]
