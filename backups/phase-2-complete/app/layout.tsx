import type { Metadata } from 'next'
import { Plus_Jakarta_Sans, Inter } from 'next/font/google'
import { ThemeProvider } from '@/components/layout/ThemeProvider'
import { Navigation } from '@/components/layout/Navigation'
import { Footer } from '@/components/layout/Footer'
import './globals.css'

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Rodrigo Seoane | Senior Product Designer',
  description:
    'B2B SaaS Product Designer specializing in onboarding and customer retention. 25+ years of experience. Based in Barcelona.',
  keywords: ['product designer', 'B2B SaaS', 'onboarding', 'UX design', 'Barcelona'],
  authors: [{ name: 'Rodrigo Seoane' }],
  openGraph: {
    title: 'Rodrigo Seoane | Senior Product Designer',
    description: 'B2B SaaS Product Designer specializing in onboarding and customer retention.',
    url: 'https://rodrigoseoane.com',
    siteName: 'Rodrigo Seoane',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rodrigo Seoane | Senior Product Designer',
    description: 'B2B SaaS Product Designer specializing in onboarding and customer retention.',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${plusJakarta.variable} ${inter.variable} antialiased`}>
        <ThemeProvider>
          <Navigation />
          <main className="min-h-screen pt-16">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
