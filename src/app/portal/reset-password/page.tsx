import type { Metadata } from 'next';
import { ResetPasswordPage, PortalAuthProvider } from '@/views/portal';

export const metadata: Metadata = {
  title: 'Reset Password | Paper Street Portal',
  description: 'Set a new password for your Paper Street account.',
  robots: { index: false, follow: false },
};

export default function Page() {
  return (
    <PortalAuthProvider>
      <ResetPasswordPage />
    </PortalAuthProvider>
  );
}
