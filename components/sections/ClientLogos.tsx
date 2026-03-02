'use client'

import Image from 'next/image'

const clients = [
  { name: 'AXA', logo: '/images/Client Logos/Client Name=Axa.png' },
  { name: 'ATS Global', logo: '/images/Client Logos/Client Name=ATSGlobal.png' },
  { name: 'BennitAI', logo: '/images/Client Logos/Client Name=BennitAI.png' },
  { name: 'Boundaryless', logo: '/images/Client Logos/Client Name=Boundaryless.png' },
  { name: 'CivicHub', logo: '/images/Client Logos/Client Name=CivicHub.png' },
  { name: 'Di Blasi', logo: '/images/Client Logos/Client Name=Diblasi.png' },
  { name: 'FlossBCN', logo: '/images/Client Logos/Client Name=FlossBCN.png' },
  { name: 'IFC', logo: '/images/Client Logos/Client Name=IFC.png' },
  { name: 'OpenBank', logo: '/images/Client Logos/Client Name=OpenBank.png' },
  { name: 'Ouishare', logo: '/images/Client Logos/Client Name=Ouishare.png' },
  { name: 'SMP', logo: '/images/Client Logos/Client Name=SMP.png' },
  { name: 'Suara', logo: '/images/Client Logos/Client Name=Suara.png' },
  { name: 'TEDx', logo: '/images/Client Logos/Client Name=TEDx.png' },
  { name: 'Urbact', logo: '/images/Client Logos/Client Name=Urbact.png' },
  { name: 'We Tribu', logo: '/images/Client Logos/Client Name=We Tribu.png' },
]

// Duplicate for seamless loop
const duplicatedClients = [...clients, ...clients]

interface ClientLogoProps {
  name: string
  logo: string
}

function ClientLogo({ name, logo }: ClientLogoProps) {
  return (
    <div className="shrink-0 mx-2.5">
      <div className="w-[165px] h-[100px] bg-cream-500 rounded flex items-center justify-center p-4 hover:shadow-md transition-shadow duration-300">
        <Image
          src={logo}
          alt={name}
          width={124}
          height={50}
          className="object-contain max-h-12 w-auto mix-blend-multiply"
        />
      </div>
    </div>
  )
}

export function ClientLogos() {
  return (
    <section className="py-12 md:py-16 bg-primary-yellow overflow-hidden">
      <h2 className="sr-only">Trusted by</h2>

      {/* Marquee Container */}
      <div className="relative">
        {/* Gradient overlays for fade effect */}
        <div className="absolute left-0 top-0 bottom-0 w-20 md:w-32 bg-gradient-to-r from-primary-yellow to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 md:w-32 bg-gradient-to-l from-primary-yellow to-transparent z-10 pointer-events-none" />

        {/* Scrolling track */}
        <div className="flex animate-marquee">
          {duplicatedClients.map((client, index) => (
            <ClientLogo
              key={`${client.name}-${index}`}
              name={client.name}
              logo={client.logo}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
