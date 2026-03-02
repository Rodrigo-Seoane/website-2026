import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Vibe Lab | Design & Code Experiments | Rodrigo Seoane',
  description:
    'A playground for design and code experiments. Explore prototypes, tools, and apps built with intuition, research, and creative coding.',
  keywords: [
    'design experiments',
    'code playground',
    'prototypes',
    'creative coding',
    'product design',
    'UX experiments',
  ],
  openGraph: {
    title: 'Vibe Lab | Rodrigo Seoane',
    description:
      'A playground for design and code experiments. Explore prototypes and tools.',
    url: 'https://rodrigoseoane.com/vibe-lab',
    type: 'website',
    images: [
      {
        url: '/images/og/vibe-lab.jpg',
        width: 1200,
        height: 630,
        alt: 'Vibe Lab - Design & Code Experiments',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vibe Lab | Rodrigo Seoane',
    description: 'A playground for design and code experiments.',
    images: ['/images/og/vibe-lab.jpg'],
  },
}

export default function VibeLabLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
