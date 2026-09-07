import type { Metadata } from 'next';
import BusinessExpansionClient from '@/views/services/business-expansion';

export const metadata: Metadata = {
  title: 'Multi-City Business Expansion in Kenya | Paper Street',
  description:
    'Expand your business footprint to Nairobi, Mombasa, Kisumu, Nakuru, and Eldoret simultaneously with unified virtual office infrastructure.',
  keywords: ['business expansion Kenya', 'multi city presence Kenya', 'expand to Mombasa Kisumu'],
  alternates: {
    canonical: 'https://paperstreet.africa/services/business-expansion',
  },
};

export default function BusinessExpansionPage() {
  return <BusinessExpansionClient />;
}
