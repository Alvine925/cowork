import type { Metadata } from 'next';
import {
  ClientPackagesView,
  PortalAuthProvider,
  ProtectedPortalWrapper,
} from '@/views/portal';

export const metadata: Metadata = {
  title: 'Workspace Packages & Pricing | Paper Street Client Desk',
  description:
    'Browse all on-demand workspace packages: full-day hot desk passes, meeting suites, podcast booths, and boardroom packages in Nairobi.',
  keywords: ['coworking packages Nairobi', 'meeting room rates Kenya', 'day pass bundle'],
  robots: {
    index: false,
    follow: true,
  },
};

export default function Page() {
  return (
    <PortalAuthProvider>
      <ProtectedPortalWrapper type="client">
        <ClientPackagesView />
      </ProtectedPortalWrapper>
    </PortalAuthProvider>
  );
}
