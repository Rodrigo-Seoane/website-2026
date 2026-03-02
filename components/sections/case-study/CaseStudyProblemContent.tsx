import type { CaseStudy } from '@/lib/data/case-studies'

interface Props {
  caseStudy: CaseStudy
}

export function CaseStudyProblemContent({ caseStudy }: Props) {
  const { problem } = caseStudy

  return (
    <div className="space-y-6">
      <p className="text-dark-900 text-base leading-relaxed">
        {problem.background}
      </p>

      <div>
        <h3 className="font-display font-semibold text-lg text-dark-900 mb-3">
          Pain Points
        </h3>
        <ul className="space-y-2">
          {problem.painPoints.map((point, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="mt-1.5 w-2 h-2 rounded-full bg-orange-400 shrink-0" />
              <span className="text-dark-900 text-base leading-relaxed">{point}</span>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="font-display font-semibold text-lg text-dark-900 mb-2">
          Business Challenge
        </h3>
        <p className="text-dark-900 text-base leading-relaxed">
          {problem.businessChallenge}
        </p>
      </div>
    </div>
  )
}
