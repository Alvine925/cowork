import type { Metadata } from 'next';
import {
  MemberMembershipView,
  PortalAuthProvider,
  ProtectedPortalWrapper,
} from '@/views/portal';

export const metadata: Metadata = {
  title: 'Membership Terms & Inclusions | Paper Street Member Desk',
  description: 'Review your annual virtual office agreement, billing frequency, security deposit status, and included services.',
  robots: {
    index: false,
    follow: true,
  },
};

export default function Page() {
  return (
    <PortalAuthProvider>
      <ProtectedPortalWrapper type="member">
        <MemberMembershipView />
      </ProtectedPortalWrapper>
    </PortalAuthProvider>
  );
}
