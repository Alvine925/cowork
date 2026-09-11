import { ResetPasswordPage, PortalAuthProvider } from '@/views/portal';

export default function Page() {
  return (
    <PortalAuthProvider>
      <ResetPasswordPage />
    </PortalAuthProvider>
  );
}
