import type { Metadata } from 'next';
import PricingClient from '@/views/pricing';

export const metadata: Metadata = {
  title: 'Virtual Office, Business Address & Day Pass Prices | Paper Street Kisumu',
  description:
    'Compare Paper Street virtual office, business address, and day pass rates in Kisumu, plus dedicated desks and meeting rooms in the same hub.',
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
