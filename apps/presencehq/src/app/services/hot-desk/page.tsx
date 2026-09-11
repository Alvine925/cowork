import type { Metadata } from 'next';
import HotDeskClient from '@/views/services/hot-desk';

export const metadata: Metadata = {
  title: 'Hot Desk & Flexible Workspace in Kenya | Paper Street',
  description:
    'Flexible hot desking in prime Kenyan locations with high-speed internet, power backup, specialty coffee, and collaborative amenities.',
  keywords: ['hot desk Kenya', 'flexible desk Nairobi', 'coworking day pass Kenya'],
  alternates: {
    canonical: 'https://paperstreet.co.ke/services/hot-desk',
  },
};

export default function HotDeskPage() {
  return <HotDeskClient />;
}
