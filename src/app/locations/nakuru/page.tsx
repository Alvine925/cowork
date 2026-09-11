import type { Metadata } from 'next';
import NakuruClient from '@/views/locations/nakuru';

export const metadata: Metadata = {
  title: 'Nakuru Virtual Office & Coworking Hub | Paper Street',
  description:
    'Establish your presence at Central Business Plaza, Nakuru City. Rift Valley commercial address, meeting room credits, and mail logging.',
  keywords: ['Nakuru virtual office', 'coworking Nakuru City', 'business address Nakuru'],
  alternates: {
    canonical: 'https://paperstreet.co.ke/locations/nakuru',
  },
};

export default function NakuruPage() {
  return <NakuruClient />;
}
