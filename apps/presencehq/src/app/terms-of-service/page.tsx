import type { Metadata } from 'next';
import TermsClient from '@/views/terms-of-service';

export const metadata: Metadata = {
  title: 'Terms of Service | Paper Street Kenya',
  description:
    'Review the terms of service, acceptable use policies, and virtual office membership rules for Paper Street in Kenya.',
  keywords: ['Paper Street terms of service', 'virtual office rules Kenya'],
  alternates: {
    canonical: 'https://paperstreet.africa/terms-of-service',
  },
};

export default function TermsOfServicePage() {
  return <TermsClient />;
}
