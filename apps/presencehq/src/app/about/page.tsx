import type { Metadata } from 'next';
import AboutClient from '@/views/about';

export const metadata: Metadata = {
  title: 'About Paper Street | Business Presence & Coworking in Kenya',
  description:
    'Learn how Paper Street helps Kenyan businesses build a credible professional presence with virtual offices, coworking spaces, and business support services.',
  keywords: [
    'Paper Street Kenya',
    'business support Kenya',
    'virtual office company Kenya',
    'coworking Nairobi',
  ],
  alternates: {
    canonical: 'https://paperstreet.africa/about',
  },
};

export default function AboutPage() {
  return <AboutClient />;
}
