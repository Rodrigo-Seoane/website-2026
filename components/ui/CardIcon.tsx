import Image from 'next/image'

const ICON_NAMES = [
  'Competitive Edge',
  'Engagement',
  'Increase Engagement',
  'Loyalty',
  'Priority Tasks',
  'ROI',
  'Subscription',
  'Support Costs',
  'UXpert',
  'Web Design',
] as const

export type CardIconName = (typeof ICON_NAMES)[number]
export type CardIconSize = 64 | 48 | 32 | 24

interface CardIconProps {
  name: CardIconName
  size?: CardIconSize
  className?: string
}

export function CardIcon({ name, size = 64, className }: CardIconProps) {
  return (
    <Image
      src={`/images/Card Icons 64px/SVG/${name}.svg`}
      alt=""
      width={size}
      height={size}
      className={className}
    />
  )
}
