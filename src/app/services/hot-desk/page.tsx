import type { Metadata } from 'next';
import HotDeskPage from '@/views/services/hot-desk';

export const metadata: Metadata = {
  title: 'Hot Desk Day Passes in Kisumu CBD | Paper Street',
  description:
    'Flexible hot desking in Kisumu CBD with dependable internet, 100% generator backup, private phone booths, and collaborative workspace amenities.',
  keywords: [
    'hot desk Kisumu',
    'coworking space Kisumu CBD',
    'day pass workspace Kenya',
    'desk rental Kisumu',
  ],
  alternates: {
    canonical: 'https://paperstreet.africa/services/hot-desk',
  },
};

export default function Page() {
  return <HotDeskPage />;
}
