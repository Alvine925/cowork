import type { Metadata } from 'next';
import VirtualOfficeClient from '@/views/services/virtual-office';

export const metadata: Metadata = {
  title: 'Virtual Office in Kenya | Professional Business Presence | Paper Street',
  description:
    'Get a virtual office in Kenya with a prestigious business address in Westlands, official mail handling, reception answering, and boardroom credits.',
  keywords: ['virtual office Kenya', 'virtual office Nairobi', 'remote business address Kenya'],
  alternates: {
    canonical: 'https://paperstreet.africa/services/virtual-office',
  },
};

export default function VirtualOfficePage() {
  return <VirtualOfficeClient />;
}
