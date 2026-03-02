import { Hero } from '@/components/sections/Hero'
import { ValueProposition } from '@/components/sections/ValueProposition'
import { FeaturedWork } from '@/components/sections/FeaturedWork'
import { Services } from '@/components/sections/Services'
import { ClientLogos } from '@/components/sections/ClientLogos'
import { Testimonials } from '@/components/sections/Testimonials'
import { ContactForm } from '@/components/sections/ContactForm'

export default function HomePage() {
  return (
    <>
      <Hero />
      <ValueProposition />
      <FeaturedWork />
      <Services />
      <ClientLogos />
      <Testimonials />
      <ContactForm />
    </>
  )
}
