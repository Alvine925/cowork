import type { Metadata } from 'next';
import KisumuClient from '@/views/locations/kisumu';

export const metadata: Metadata = {
  title: 'Kisumu Virtual Office & Coworking Hub | Paper Street',
  description:
    'Lakeside corporate presence at Milimani Corporate Center, Kisumu. Western Kenya business address, regional mail forwarding, and flexible desks.',
  keywords: ['Kisumu virtual office', 'coworking Milimani Kisumu', 'business address Kisumu'],
  alternates: {
    canonical: 'https://paperstreet.africa/locations/kisumu',
  },
};

export default function KisumuPage() {
  return <KisumuClient />;
}
