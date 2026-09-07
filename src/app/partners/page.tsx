import type { Metadata } from 'next';
import PartnersClient from '@/views/partners';

export const metadata: Metadata = {
  title: 'Partner with Paper Street | Business Network Kenya',
  description:
    'Partner with Paper Street to help businesses access trusted virtual offices, coworking space, meeting rooms, and professional addresses across Kenya.',
  keywords: ['Paper Street partners', 'business partnerships Kenya', 'workspace partner Kenya'],
  alternates: {
    canonical: 'https://paperstreet.africa/partners',
  },
};

export default function PartnersPage() {
  return <PartnersClient />;
}
