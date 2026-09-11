import type { Metadata } from 'next';
import DedicatedDeskPage from '@/views/services/dedicated-desk';

export const metadata: Metadata = {
  title: 'Dedicated Desk in Kisumu CBD | Paper Street',
  description:
    'Your own reserved personal desk in Kisumu CBD with lockable storage, ergonomic seating, generator power backup, and meeting room credits.',
  keywords: [
    'dedicated desk Kisumu',
    'private desk rental Kisumu',
    'coworking space Kisumu CBD',
    'desk space Kisumu',
  ],
  alternates: {
    canonical: 'https://paperstreet.co.ke/services/dedicated-desk',
  },
};

export default function Page() {
  return <DedicatedDeskPage />;
}
