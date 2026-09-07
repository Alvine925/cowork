import type { Metadata } from 'next';
import BusinessAddressClient from '@/views/services/business-address';

export const metadata: Metadata = {
  title: 'Registered Business Address in Kenya | Paper Street',
  description:
    'Use a prestigious business address in Nairobi for company registration on eCitizen BRS, banking KYC, and professional correspondence.',
  keywords: ['business address Kenya', 'registered office address Kenya', 'business address Nairobi'],
  alternates: {
    canonical: 'https://paperstreet.africa/services/business-address',
  },
};

export default function BusinessAddressPage() {
  return <BusinessAddressClient />;
}
