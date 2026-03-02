import Link from 'next/link'
import { Linkedin, Mail, Twitter } from 'lucide-react'

const footerLinks = [
  { label: 'Work', href: '/work' },
  { label: 'Insights', href: '/insights' },
  { label: 'About', href: '/about' },
  { label: 'Vibe Lab', href: '/vibe-lab' },
]

const socialLinks = [
  { icon: Linkedin, href: 'https://linkedin.com/in/rodrigoseoane', label: 'LinkedIn' },
  { icon: Twitter, href: 'https://twitter.com/rodrigoseoane', label: 'Twitter' },
  { icon: Mail, href: 'mailto:hello@rodrigoseoane.com', label: 'Email' },
]

export function Footer() {
  return (
    <footer className="border-t border-neutral-200 dark:border-dark-border">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="font-display font-bold text-2xl">
              Rodrigo Seoane
            </Link>
            <p className="mt-4 text-neutral-600 dark:text-neutral-400 max-w-md">
              Senior Product Designer specializing in B2B SaaS onboarding and customer retention.
              Based in Barcelona, working globally.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-semibold mb-4">Navigation</h3>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="font-semibold mb-4">Connect</h3>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-neutral-100 hover:bg-primary-yellow dark:bg-neutral-800 dark:hover:bg-primary-yellow dark:hover:text-neutral-900 transition-colors"
                  aria-label={social.label}
                >
                  <social.icon size={20} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-neutral-200 dark:border-dark-border text-center text-sm text-neutral-500">
          <p>&copy; {new Date().getFullYear()} Rodrigo Seoane. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
