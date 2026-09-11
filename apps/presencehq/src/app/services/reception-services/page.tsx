import type { Metadata } from 'next';
import ReceptionServicesClient from '@/views/services/reception-services';

export const metadata: Metadata = {
  title: 'Telephone Reception & Virtual Front Desk in Kenya | Paper Street',
  description:
    'Dedicated telephone answering in your company name, live call forwarding, and front desk visitor greeting in Nairobi.',
  keywords: ['reception services Kenya', 'virtual receptionist Nairobi', 'phone answering Kenya'],
  alternates: {
    canonical: 'https://paperstreet.co.ke/services/reception-services',
  },
};

export default function ReceptionServicesPage() {
  return <ReceptionServicesClient />;
}
