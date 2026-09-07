import type { Metadata } from 'next';
import {
  MemberDocumentsView,
  PortalAuthProvider,
  ProtectedPortalWrapper,
} from '@/views/portal';

export const metadata: Metadata = {
  title: 'Member Documents & Proof of Address | Paper Street',
  description: 'Download executed lease agreements, KRA proof of address utility letters, and scanned mail logs.',
  robots: {
    index: false,
    follow: true,
  },
};

export default function Page() {
  return (
    <PortalAuthProvider>
      <ProtectedPortalWrapper type="member">
        <MemberDocumentsView />
      </ProtectedPortalWrapper>
    </PortalAuthProvider>
  );
}
