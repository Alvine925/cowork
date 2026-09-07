import type { Metadata } from 'next';
import EldoretClient from '@/views/locations/eldoret';

export const metadata: Metadata = {
  title: 'Eldoret Virtual Office & Coworking Hub | Paper Street',
  description:
    'Establish your presence at Zion Mall Business Hub, Eldoret. North Rift logistics and commercial business address, mail forwarding, and desks.',
  keywords: ['Eldoret virtual office', 'coworking Zion Mall Eldoret', 'business address Eldoret'],
  alternates: {
    canonical: 'https://paperstreet.africa/locations/eldoret',
  },
};

export default function EldoretPage() {
  return <EldoretClient />;
}
