import type { Metadata } from 'next';
import {
  ClientOffersView,
  PortalAuthProvider,
  ProtectedPortalWrapper,
} from '@/views/portal';

export const metadata: Metadata = {
  title: 'Exclusive Member Offers & Perks | Paper Street Client Portal',
  description: 'View active commercial discounts, launch rate savings, and partner promotions across Kenya.',
  robots: {
    index: false,
    follow: true,
  },
};

export default function Page() {
  return (
    <PortalAuthProvider>
      <ProtectedPortalWrapper type="client">
        <ClientOffersView />
      </ProtectedPortalWrapper>
    </PortalAuthProvider>
  );
}
