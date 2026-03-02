import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { caseStudies, getCaseStudyBySlug, getNextCaseStudy } from '@/lib/data/case-studies'
import { ProgressBar } from '@/components/ui/ProgressBar'
import {
  CaseStudyHero,
  CaseStudyOverview,
  CaseStudySection,
  CaseStudyResults,
  NextProject,
} from '@/components/sections/case-study'
import { CaseStudySolutionContent } from '@/components/sections/case-study/CaseStudySolutionContent'
import { CaseStudyProblemContent } from '@/components/sections/case-study/CaseStudyProblemContent'

// --- Route generation & metadata ----------------------------------------

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return caseStudies.map((study) => ({
    slug: study.slug,
  }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const caseStudy = getCaseStudyBySlug(slug)

  if (!caseStudy) {
    return { title: 'Case Study Not Found' }
  }

  return {
    title: `${caseStudy.title} | Rodrigo Seoane`,
    description: caseStudy.metaDescription,
    keywords: caseStudy.keywords,
    openGraph: {
      title: `${caseStudy.title} - Case Study`,
      description: caseStudy.metaDescription,
      images: [caseStudy.heroImage],
    },
  }
}

// --- Page ---------------------------------------------------------------

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params
  const caseStudy = getCaseStudyBySlug(slug)

  if (!caseStudy) {
    notFound()
  }

  const nextProject = getNextCaseStudy(slug)

  return (
    <>
      <ProgressBar />
      <CaseStudyHero caseStudy={caseStudy} />
      <CaseStudyOverview caseStudy={caseStudy} />

      <CaseStudySection title="The Challenge" id="problem" background="white">
        <CaseStudyProblemContent caseStudy={caseStudy} />
      </CaseStudySection>

      <CaseStudySection title="The Solution" id="solution" background="cream">
        <CaseStudySolutionContent caseStudy={caseStudy} />
      </CaseStudySection>

      <CaseStudyResults caseStudy={caseStudy} />
      {nextProject && <NextProject caseStudy={nextProject} />}
    </>
  )
}
