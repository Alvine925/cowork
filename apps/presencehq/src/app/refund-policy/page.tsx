import type { Metadata } from 'next';
import RefundClient from '@/views/refund-policy';

export const metadata: Metadata = {
  title: 'Refund Policy | Paper Street Kenya',
  description:
    'Review Paper Street refund, cancellation, and deposit return terms for virtual office, coworking, and meeting room services in Kenya.',
  keywords: ['Paper Street refund policy', 'workspace refund Kenya'],
  alternates: {
    canonical: 'https://paperstreet.co.ke/refund-policy',
  },
};

export default function RefundPolicyPage() {
  return <RefundClient />;
}
