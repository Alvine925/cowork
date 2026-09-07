import type { Metadata } from 'next';
import PricingClient from '@/views/pricing';

export const metadata: Metadata = {
  title: 'Virtual Office & Coworking Prices in Kenya | Paper Street',
  description:
    'Compare Paper Street virtual office and coworking membership plans in Kenya, with professional addresses, mail handling, workspace, and meeting room access.',
  keywords: [
    'virtual office prices Kenya',
    'coworking prices Kenya',
    'business address cost Kenya',
    'meeting room rates Nairobi',
  ],
  alternates: {
    canonical: 'https://paperstreet.africa/pricing',
  },
};

export default function PricingPage() {
  return <PricingClient />;
}
