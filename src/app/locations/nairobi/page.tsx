import type { Metadata } from 'next';
import NairobiClient from '@/views/locations/nairobi';

export const metadata: Metadata = {
  title: 'Nairobi Virtual Office & Coworking in Westlands | Paper Street',
  description:
    'A prestigious Nairobi business presence at Westlands Business Park, Waiyaki Way. Professional registered address, boardroom hire, and flexible desks.',
  keywords: ['Nairobi virtual office', 'coworking Westlands Nairobi', 'business address Waiyaki Way'],
  alternates: {
    canonical: 'https://paperstreet.africa/locations/nairobi',
  },
};

export default function NairobiPage() {
  return <NairobiClient />;
}
