import type { Metadata } from 'next';
import { ClientLoginPage, PortalAuthProvider } from '@/views/portal';

export const metadata: Metadata = {
  title: 'Client Desk Sign In | Paper Street On-Demand Spaces',
  description:
    'Access on-demand hot desk day passes, meeting room reservations, guest check-in QR codes, and M-Pesa payment receipts.',
  keywords: ['client desk login', 'meeting room booking Nairobi', 'coworking day pass login'],
};

export default function Page() {
  return (
    <PortalAuthProvider>
      <ClientLoginPage />
    </PortalAuthProvider>
  );
}
