import type { Metadata } from 'next';
import ResourcesClient from '@/views/resources';

export const metadata: Metadata = {
  title: 'Business Resources for Kenyan Companies | Paper Street',
  description:
    'Explore practical business resources from Paper Street covering company registration, professional addresses, workspace, compliance, and growth in Kenya.',
  keywords: ['Kenya business resources', 'starting a business Kenya', 'business guides Kenya'],
  alternates: {
    canonical: 'https://paperstreet.africa/resources',
  },
};

export default function ResourcesPage() {
  return <ResourcesClient />;
}
