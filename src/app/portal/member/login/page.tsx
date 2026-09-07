import type { Metadata } from 'next';
import { MemberLoginPage, PortalAuthProvider } from '@/views/portal';

export const metadata: Metadata = {
  title: 'Member Portal Sign In | Paper Street Operating Desk',
  description:
    'Sign in to your Paper Street member operating desk to manage registered business addresses, mail logs, legal documents, and boardroom credits.',
  keywords: ['member sign in', 'virtual office portal Kenya', 'Paper Street member desk'],
  robots: {
    index: false,
    follow: true,
  },
};

export default function Page() {
  return (
    <PortalAuthProvider>
      <MemberLoginPage />
    </PortalAuthProvider>
  );
}
