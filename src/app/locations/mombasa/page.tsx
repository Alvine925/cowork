import type { Metadata } from 'next';
import MombasaClient from '@/views/locations/mombasa';

export const metadata: Metadata = {
  title: 'Mombasa Virtual Office & Coworking Hub | Paper Street',
  description:
    'Establish your coastal trade presence at Nyali Executive Tower, Mombasa. Complete virtual office, local phone answering, and port logistics support.',
  keywords: ['Mombasa virtual office', 'coworking Nyali Mombasa', 'business address Mombasa'],
  alternates: {
    canonical: 'https://paperstreet.co.ke/locations/mombasa',
  },
};

export default function MombasaPage() {
  return <MombasaClient />;
}
