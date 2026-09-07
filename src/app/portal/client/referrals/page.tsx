import type { Metadata } from 'next';
import {
  ClientReferralsView,
  PortalAuthProvider,
  ProtectedPortalWrapper,
} from '@/views/portal';

export const metadata: Metadata = {
  title: 'Refer & Earn Discounts | Paper Street Client Portal',
  description: 'Invite colleagues and partner businesses to Paper Street. Earn KES 500 workspace credits for every successful booking.',
  robots: {
    index: false,
    follow: true,
  },
};

export default function Page() {
  return (
    <PortalAuthProvider>
      <ProtectedPortalWrapper type="client">
        <ClientReferralsView />
      </ProtectedPortalWrapper>
    </PortalAuthProvider>
  );
}
