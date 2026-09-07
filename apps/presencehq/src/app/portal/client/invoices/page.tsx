import type { Metadata } from 'next';
import {
  ClientInvoicesView,
  PortalAuthProvider,
  ProtectedPortalWrapper,
} from '@/views/portal';

export const metadata: Metadata = {
  title: 'Orders & Tax Receipts | Paper Street Client Desk',
  description: 'Download official KRA ETR-compliant transaction receipts and PDF tax invoices for workspace bookings.',
  robots: {
    index: false,
    follow: true,
  },
};

export default function Page() {
  return (
    <PortalAuthProvider>
      <ProtectedPortalWrapper type="client">
        <ClientInvoicesView />
      </ProtectedPortalWrapper>
    </PortalAuthProvider>
  );
}
