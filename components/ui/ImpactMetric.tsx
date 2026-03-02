import { cn } from '@/lib/utils/cn'

interface ImpactMetricProps {
  value: string
  label: string
  className?: string
}

export function ImpactMetric({ value, label, className }: ImpactMetricProps) {
  return (
    <div className={cn('flex flex-col gap-1', className)}>
      <p className="font-display font-bold text-[32px] leading-[1.1] text-content-active-primary">
        {value}
      </p>
      <p className="font-body text-[14px] leading-[1.32] text-content-active-primary max-w-[150px]">
        {label}
      </p>
    </div>
  )
}
