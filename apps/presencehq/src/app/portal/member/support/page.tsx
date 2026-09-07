import type { Metadata } from 'next';
import {
  MemberSupportView,
  PortalAuthProvider,
  ProtectedPortalWrapper,
} from '@/views/portal';

export const metadata: Metadata = {
  title: 'Member Concierge & Reception | Paper Street',
  description: 'Contact front desk reception, request physical mail forwarding, and reserve boardroom credits.',
  robots: {
    index: false,
    follow: true,
  },
};

export default function Page() {
  return (
    <PortalAuthProvider>
      <ProtectedPortalWrapper type="member">
        <MemberSupportView />
      </ProtectedPortalWrapper>
    </PortalAuthProvider>
  );
}
