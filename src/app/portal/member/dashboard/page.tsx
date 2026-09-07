import type { Metadata } from 'next';
import {
  MemberDashboardView,
  PortalAuthProvider,
  ProtectedPortalWrapper,
} from '@/views/portal';

export const metadata: Metadata = {
  title: 'Member Overview | Paper Street Operating Desk',
  description: 'Overview of your active virtual office membership, registered address status, and recent activity.',
  robots: {
    index: false,
    follow: true,
  },
};

export default function Page() {
  return (
    <PortalAuthProvider>
      <ProtectedPortalWrapper type="member">
        <MemberDashboardView />
      </ProtectedPortalWrapper>
    </PortalAuthProvider>
  );
}
