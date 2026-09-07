import type { Metadata } from 'next';
import ServicesClient from '@/views/services';

export const metadata: Metadata = {
  title: 'Virtual Office & Workspace Services in Kenya | Paper Street',
  description:
    'Explore Paper Street services: virtual offices, registered business addresses, mail handling, meeting rooms, hot desks, reception, and company registration support.',
  keywords: [
    'virtual office services Kenya',
    'coworking services Kenya',
    'business services Nairobi',
    'office solutions Kenya',
  ],
  alternates: {
    canonical: 'https://paperstreet.africa/services',
  },
};

export default function ServicesPage() {
  return <ServicesClient />;
}
