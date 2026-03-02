import { cn } from '@/lib/utils/cn'

interface CaseStudySectionProps {
  title: string
  id?: string
  children: React.ReactNode
  background?: 'white' | 'cream' | 'dark'
}

const bgMap: Record<string, string> = {
  white: 'bg-white',
  cream: 'bg-cream-500',
  dark: 'bg-dark-900 text-dark-50',
}

export function CaseStudySection({
  title,
  id,
  children,
  background = 'white',
}: CaseStudySectionProps) {
  return (
    <section id={id} className={cn('py-16 lg:py-24', bgMap[background])}>
      <div className="container mx-auto px-6 lg:px-20 max-w-4xl">
        {/* Title with accent line */}
        <div className="mb-10">
          <div className="w-12 h-1 bg-orange-400 rounded mb-4" />
          <h2
            className={cn(
              'font-display font-bold text-3xl lg:text-4xl',
              background === 'dark' ? 'text-dark-50' : 'text-dark-900'
            )}
          >
            {title}
          </h2>
        </div>

        {children}
      </div>
    </section>
  )
}
