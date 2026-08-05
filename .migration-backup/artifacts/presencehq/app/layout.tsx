import type { Metadata, Viewport } from 'next'
import { Inter, Manrope } from 'next/font/google'
import './globals.css'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { FloatingWhatsApp } from '@/components/layout/FloatingWhatsApp'
import { BackToTop } from '@/components/layout/BackToTop'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
  display: 'swap',
})

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0F2D52',
}

export const metadata: Metadata = {
  metadataBase: new URL('https://presencehq.com'),
  title: {
    default: 'PresenceHQ – Virtual Office & Business Presence Platform',
    template: '%s | PresenceHQ',
  },
  description:
    'Establish your professional business presence anywhere in Kenya. Virtual offices, business addresses, mail handling, meeting rooms, and flexible workspace solutions in Nairobi, Mombasa, Kisumu, Nakuru, and Eldoret.',
  keywords: [
    'virtual office',
    'business address',
    'mail handling',
    'meeting rooms',
    'business presence',
    'Nairobi virtual office',
    'Kenya business address',
  ],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'PresenceHQ',
    title: 'PresenceHQ – Virtual Office & Business Presence Platform',
    description:
      'Establish your professional business presence anywhere without renting a traditional office.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PresenceHQ – Virtual Office & Business Presence Platform',
    description:
      'Establish your professional business presence anywhere without renting a traditional office.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${manrope.variable}`}>
      <body className="min-h-screen bg-white flex flex-col">
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
        <FloatingWhatsApp />
        <BackToTop />
      </body>
    </html>
  )
}
