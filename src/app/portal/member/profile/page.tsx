import type { Metadata } from 'next';
import {
  PortalAuthProvider,
  PortalProfileView,
  ProtectedPortalWrapper,
} from '@/views/portal';

export const metadata: Metadata = {
  title: 'Member Profile & Identity | Paper Street',
  description: 'Manage corporate entity details, authorized contacts, and Supabase security credentials.',
  robots: {
    index: false,
    follow: true,
  },
};

export default function Page() {
  return (
    <PortalAuthProvider>
      <ProtectedPortalWrapper type="member">
        <PortalProfileView type="member" />
      </ProtectedPortalWrapper>
    </PortalAuthProvider>
  );
}
