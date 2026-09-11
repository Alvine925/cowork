import type { Metadata } from 'next';
import DedicatedDeskClient from '@/views/services/dedicated-desk';

export const metadata: Metadata = {
  title: 'Dedicated Desk & Fixed Workstations in Kenya | Paper Street',
  description:
    'Your own reserved desk with lockable storage, ergonomic seating, 24/7 access option, and full member benefits across Kenya.',
  keywords: ['dedicated desk Nairobi', 'fixed workstation Kenya', 'private desk coworking'],
  alternates: {
    canonical: 'https://paperstreet.co.ke/services/dedicated-desk',
  },
};

export default function DedicatedDeskPage() {
  return <DedicatedDeskClient />;
}
