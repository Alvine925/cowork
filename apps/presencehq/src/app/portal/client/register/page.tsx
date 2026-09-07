import type { Metadata } from 'next';
import { ClientRegisterPage, PortalAuthProvider } from '@/views/portal';

export const metadata: Metadata = {
  title: 'Create Client Account | On-Demand Workspace | Paper Street',
  description:
    'Register for on-demand workspace booking at Paper Street. Reserve conference rooms, podcast studios, and day passes across Nairobi.',
  keywords: ['create client account', 'workspace registration Nairobi', 'book meeting room Kenya'],
};

export default function Page() {
  return (
    <PortalAuthProvider>
      <ClientRegisterPage />
    </PortalAuthProvider>
  );
}
