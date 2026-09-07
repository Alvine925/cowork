import type { Metadata } from 'next';
import {
  ClientFeedbackView,
  PortalAuthProvider,
  ProtectedPortalWrapper,
} from '@/views/portal';

export const metadata: Metadata = {
  title: 'Complaints & Feedback Desk | Paper Street Client Portal',
  description:
    'Submit feedback, report facility issues, or request maintenance at Paper Street workspaces with automated email alerts to management.',
  keywords: ['client support Paper Street', 'workspace feedback Kenya', 'helpdesk ticket'],
  robots: {
    index: false,
    follow: true,
  },
};

export default function Page() {
  return (
    <PortalAuthProvider>
      <ProtectedPortalWrapper type="client">
        <ClientFeedbackView />
      </ProtectedPortalWrapper>
    </PortalAuthProvider>
  );
}
