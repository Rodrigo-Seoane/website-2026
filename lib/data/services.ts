export interface Service {
  id: string
  category: string
  title: string
  subtitle: string
  idealFor: string
  features: string[]
  cta: string
}

export const services: Service[] = [
  {
    id: 'embedded-designer',
    category: '3 to 12 Months',
    title: 'Embedded Designer',
    subtitle: 'When you need strategic guidance with hands-on execution.',
    idealFor:
      'Teams scaling AI tools, launching MVPs, or overhauling legacy systems.',
    features: [
      'Own end-to-end design for new features or product lines.',
      'Hands-on prototyping for high-priority features or workflows.',
      'Audit existing UX to uncover hidden growth opportunities.',
    ],
    cta: 'Request your estimate',
  },
  {
    id: 'advisory-retainer',
    category: 'Strategy + Hands-On',
    title: 'Advisory Retainer',
    subtitle: 'When you need a design leader in the trenches.',
    idealFor:
      'Innovation hubs balancing long-term strategy with immediate design needs.',
    features: [
      'Define product vision and align it with business goals.',
      'Align stakeholders through workshops and iterative prototyping.',
      'Mentor your team on user-centric methods and design systems.',
    ],
    cta: "Let's talk about your goals",
  },
  {
    id: 'workshop-facilitation',
    category: 'Strategy & Alignment',
    title: 'Workshop Facilitation',
    subtitle: 'When you need alignment and actionable insights fast.',
    idealFor:
      'Teams struggling to align on priorities, or preparing for a product launch.',
    features: [
      'Design scalable experiences with solid business models.',
      'Align on OKRs and prioritize features that drive growth.',
      'Co-create solutions through design sprints and rapid prototyping.',
    ],
    cta: 'Explore market opportunities',
  },
]
