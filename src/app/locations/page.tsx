import type { Metadata } from 'next';
import LocationsClient from '@/views/locations';

export const metadata: Metadata = {
  title: 'Coworking Spaces & Virtual Office Locations in Kenya | Paper Street',
  description:
    'Prime flexible workspace and business address locations across Nairobi, Mombasa, Kisumu, Nakuru, and Eldoret.',
  keywords: ['coworking locations Kenya', 'virtual office Nairobi', 'workspace Mombasa', 'office Kisumu'],
  alternates: {
    canonical: 'https://paperstreet.co.ke/locations',
  },
};

export default function LocationsPage() {
  return <LocationsClient />;
}
