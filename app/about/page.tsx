import type { Metadata } from 'next'
import {
  AboutHero,
  StorySection,
  PhilosophySection,
  SkillsSection,
  ToolsSection,
  PersonalSection,
  AboutCTA,
} from '@/components/sections/about'
import { Testimonials } from '@/components/sections/Testimonials'

export const metadata: Metadata = {
  title: 'About Rodrigo Seoane | Senior Product Designer | Barcelona',
  description:
    'Innovation-driven Product Designer with 25+ years of experience transforming complex problems into user-centric solutions. From Rio de Janeiro to Barcelona, specializing in B2B SaaS and enterprise design.',
  keywords: [
    'product designer',
    'UX designer',
    'UI designer',
    'Barcelona',
    'B2B SaaS',
    'design thinking',
    'user experience',
    'enterprise design',
  ],
  openGraph: {
    title: 'About Rodrigo Seoane | Senior Product Designer',
    description:
      '25+ years transforming complex problems into user-centric solutions.',
    url: 'https://rodrigoseoane.com/about',
    type: 'profile',
    images: [
      {
        url: '/images/about/rodrigo-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Rodrigo Seoane - Senior Product Designer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Rodrigo Seoane | Senior Product Designer',
    description:
      '25+ years transforming complex problems into user-centric solutions.',
    images: ['/images/about/rodrigo-og.jpg'],
  },
}

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <StorySection />
      <PhilosophySection />
      <SkillsSection />
      <ToolsSection />
      <PersonalSection />
      <AboutCTA />
      <Testimonials />
    </>
  )
}
