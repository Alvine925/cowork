import type { Metadata } from 'next';
import {
  PortalAuthProvider,
  PortalProfileView,
  ProtectedPortalWrapper,
} from '@/views/portal';

export const metadata: Metadata = {
  title: 'Client Profile Settings | Paper Street',
  description: 'Manage client account details, telephone numbers, and Supabase auth credentials.',
  robots: {
    index: false,
    follow: true,
  },
};

export default function Page() {
  return (
    <PortalAuthProvider>
      <ProtectedPortalWrapper type="client">
        <PortalProfileView type="client" />
      </ProtectedPortalWrapper>
    </PortalAuthProvider>
  );
}
