import type { Metadata } from 'next';
import ServicesClient from '@/views/services';

export const metadata: Metadata = {
  title: 'Virtual Office, Business Address & Day Pass Services | Paper Street',
  description:
    'Paper Street Kisumu: virtual office, registered business address, and day passes first — plus meeting rooms, dedicated desks, and mail handling in the same hub.',
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
