import type { Metadata } from 'next';
import CareersClient from '@/views/careers';

export const metadata: Metadata = {
  title: 'Careers at Paper Street | Join Our Kenya Team',
  description:
    'Explore careers at Paper Street and help build better virtual office, coworking, and business presence services for companies across Africa.',
  keywords: ['Paper Street careers', 'workspace jobs Kenya', 'business services jobs Kenya'],
  alternates: {
    canonical: 'https://paperstreet.co.ke/careers',
  },
};

export default function CareersPage() {
  return <CareersClient />;
}
