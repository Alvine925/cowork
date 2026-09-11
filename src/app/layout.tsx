import type { Metadata } from 'next';
import '@/index.css';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { FloatingWhatsApp } from '@/components/home/FloatingWhatsApp';
import { BackToTop } from '@/components/home/BackToTop';
import { Toaster } from 'sonner';
import { CookieBanner } from '@/components/layout/CookieBanner';

export const metadata: Metadata = {
  metadataBase: new URL('https://www.paperstreet.co.ke'),
  title: {
    default: 'Coworking Space & Virtual Office in Kenya | Paper Street',
    template: '%s | Paper Street',
  },
  description:
    'Find prestigious coworking spaces and virtual offices in Nairobi and across Kenya. Professional business addresses, official mail logging, boardrooms, and flexible workspaces.',
  keywords: [
    'coworking space Kenya',
    'virtual office Kenya',
    'business address Nairobi',
    'flexible workspace Kenya',
    'meeting rooms Westlands',
    'registered office Kenya',
  ],
  authors: [{ name: 'Paper Street' }],
  creator: 'Paper Street',
  publisher: 'Paper Street',
  openGraph: {
    type: 'website',
    locale: 'en_KE',
    url: 'https://paperstreet.co.ke',
    siteName: 'Paper Street',
    title: 'Coworking Space & Virtual Office in Kenya | Paper Street',
    description:
      'Find prestigious coworking spaces and virtual offices in Nairobi and across Kenya. Professional business addresses, mail handling, and flexible workspaces.',
    images: [
      {
        url: '/favicon.svg',
        width: 800,
        height: 600,
        alt: 'Paper Street Workspace Kenya',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Coworking Space & Virtual Office in Kenya | Paper Street',
    description:
      'Professional business addresses, official mail logging, boardrooms, and flexible workspaces across Kenya.',
    images: ['/favicon.svg'],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon.png', type: 'image/png', sizes: '512x512' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className="min-h-screen bg-[#fbfaf7] text-[#2D2D2D] antialiased flex flex-col font-sans"
      >
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <FloatingWhatsApp />
        <BackToTop />
        <CookieBanner />
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
