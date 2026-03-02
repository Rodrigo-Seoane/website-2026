import { Metadata } from 'next'

export const metadata: Metadata = {
  title:
    '12 UX Red Flags Killing Your SaaS Retention | Free Assessment | Rodrigo Seoane',
  description:
    'Score your product\u2019s retention risk in under 3 minutes. Identify the 12 most common UX patterns that silently drive users away and get actionable fixes.',
  keywords: [
    'UX checklist',
    'SaaS retention',
    'user experience audit',
    'UX red flags',
    'product retention',
    'SaaS churn',
    'UX assessment',
  ],
  openGraph: {
    title: '12 UX Red Flags Killing Your SaaS Retention',
    description:
      'Score your product in under 3 minutes. Get instant results and actionable fixes.',
    type: 'website',
  },
}

export default function ChecklistLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
