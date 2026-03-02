import Link from 'next/link'
import Image from 'next/image'

const footerLinks = [
  { label: 'Home', href: '/' },
  { label: 'Featured Work', href: '/work' },
  { label: 'Resources & Insights', href: '/insights' },
  { label: 'About Me', href: '/about' },
  { label: 'Contact', href: '#contact' },
]

export function Footer() {
  return (
    <footer className="bg-dark-700 h-[200px] -mt-px">
      <div className="h-full max-w-[1280px] mx-auto px-6 lg:px-20 flex items-center">
        <div className="w-full flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-0">
          {/* Logo */}
          <Link href="/" className="shrink-0">
            <Image
              src="/images/Logo Footer.svg"
              alt="Rodrigo Seoane"
              width={64}
              height={64}
            />
          </Link>

          {/* Social Icons */}
          <div className="flex items-center gap-4">
            <a
              href="https://www.linkedin.com/in/rodrigoseoane/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center text-dark-50 hover:text-primary-yellow transition-colors"
              aria-label="LinkedIn"
            >
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                <rect x="2" y="9" width="4" height="12"></rect>
                <circle cx="4" cy="4" r="2"></circle>
              </svg>
            </a>
            <a
              href="https://youtube.com/shorts/mFZFdoD7w-Q?si=cC5NrmjOIqLBoPpx"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center text-dark-50 hover:text-primary-yellow transition-colors"
              aria-label="YouTube"
            >
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
                <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
              </svg>
            </a>
            <a
              href="https://www.instagram.com/rodrigo.seoane/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center text-dark-50 hover:text-primary-yellow transition-colors"
              aria-label="Instagram"
            >
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6">
            {footerLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-dark-50 uppercase tracking-wider hover:text-primary-yellow transition-colors font-body"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Copyright */}
          <div className="text-right text-dark-50">
            <p className="text-sm">©uxpertanalysis 2026</p>
            <p className="text-[10px] tracking-[0.4px] mt-1">Built with love from Barcelona.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
