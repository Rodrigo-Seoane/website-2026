import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Insights | Rodrigo Seoane - UX Design',
  description:
    'Design thinking, UX strategy, and lessons learned. Articles on onboarding, customer retention, B2B SaaS, and product design published on LinkedIn and Medium.',
  keywords: [
    'UX strategy',
    'product design',
    'onboarding',
    'customer retention',
    'B2B SaaS',
    'design thinking',
  ],
  openGraph: {
    title: 'Insights | Rodrigo Seoane',
    description:
      'Design thinking, UX strategy, and lessons learned -- shared on LinkedIn and Medium.',
    url: 'https://rodrigoseoane.com/insights',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Insights | Rodrigo Seoane',
    description:
      'Design thinking, UX strategy, and lessons learned -- shared on LinkedIn and Medium.',
  },
}

export default function InsightsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
