import type { Metadata } from 'next';
import {
  ClientPassesView,
  PortalAuthProvider,
  ProtectedPortalWrapper,
} from '@/views/portal';

export const metadata: Metadata = {
  title: 'Entry Passes & QR Check-In | Paper Street',
  description: 'Access digital reception entry passes and high-speed WiFi credentials for Paper Street locations.',
  robots: {
    index: false,
    follow: true,
  },
};

export default function Page() {
  return (
    <PortalAuthProvider>
      <ProtectedPortalWrapper type="client">
        <ClientPassesView />
      </ProtectedPortalWrapper>
    </PortalAuthProvider>
  );
}
