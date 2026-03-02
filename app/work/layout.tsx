import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Work | Rodrigo Seoane - UX Portfolio',
  description:
    'Explore UX design case studies showcasing measurable results in SaaS onboarding, customer retention, and product design.',
  openGraph: {
    title: 'Work | Rodrigo Seoane',
    description: 'UX design case studies with measurable business impact.',
  },
}

export default function WorkLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
