import type { Metadata } from 'next';
import {
  ClientBookingsView,
  PortalAuthProvider,
  ProtectedPortalWrapper,
} from '@/views/portal';

export const metadata: Metadata = {
  title: 'Reserve Workspace & Meeting Rooms | Paper Street',
  description: 'Book executive boardrooms, meeting suites, podcast studios, and hot desks in Westlands, Riverside, and CBD.',
  keywords: ['book meeting room Nairobi', 'hot desk day pass Kenya', 'boardroom reservation'],
  robots: {
    index: false,
    follow: true,
  },
};

export default function Page() {
  return (
    <PortalAuthProvider>
      <ProtectedPortalWrapper type="client">
        <ClientBookingsView />
      </ProtectedPortalWrapper>
    </PortalAuthProvider>
  );
}
