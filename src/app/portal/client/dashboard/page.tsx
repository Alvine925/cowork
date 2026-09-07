import type { Metadata } from 'next';
import {
  ClientDashboardView,
  PortalAuthProvider,
  ProtectedPortalWrapper,
} from '@/views/portal';

export const metadata: Metadata = {
  title: 'Client Workspace Hub | Paper Street',
  description: 'View active day passes, upcoming conference room reservations, and check-in QR access codes.',
  robots: {
    index: false,
    follow: true,
  },
};

export default function Page() {
  return (
    <PortalAuthProvider>
      <ProtectedPortalWrapper type="client">
        <ClientDashboardView />
      </ProtectedPortalWrapper>
    </PortalAuthProvider>
  );
}
