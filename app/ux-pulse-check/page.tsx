import { Metadata } from 'next'
import { PulseCheckHero } from '@/components/sections/PulseCheckHero'
import { ProblemSection } from '@/components/sections/ProblemSection'
import { PulseCheckBenefits } from '@/components/sections/PulseCheckBenefits'
import { ProcessSteps } from '@/components/sections/ProcessSteps'
import { Testimonials } from '@/components/sections/Testimonials'
import { PricingCards } from '@/components/sections/PricingCards'
import { ServiceForMe } from '@/components/sections/ServiceForMe'
import { FAQ } from '@/components/sections/FAQ'
import { FinalCTA } from '@/components/sections/FinalCTA'
import { ContactForm } from '@/components/sections/ContactForm'

export const metadata: Metadata = {
  title: 'UX Pulse Check | Rodrigo Seoane',
  description:
    'Diagnose invisible UX wounds bleeding your revenue. Get surgical audits that pinpoint exactly where users drop off, why conversions stall, and what quick wins can boost your bottom line.',
  keywords: ['UX Audit', 'UX Pulse Check', 'User Experience Audit', 'SaaS UX Audit', 'Conversion Optimization'],
}

export default function UXPulseCheckPage() {
  return (
    <>
      <PulseCheckHero />
      <ProblemSection />
      <PulseCheckBenefits />
      <ProcessSteps />
      <Testimonials />
      <PricingCards />
      <ServiceForMe />
      <FAQ />
      <Testimonials />
      <FinalCTA />
      <ContactForm
        serviceOptions={[
          { value: 'UX Audit Essentials (€490)', label: 'Essentials (€490)' },
          { value: 'UX Audit + UI Redesign (€1,490)', label: 'Essentials + UI Redesign (€1,490)' },
        ]}
        showCompanyUrl={true}
      />
    </>
  )
}
