import type { Metadata } from 'next';
import LoginSelectorClient from '@/views/login';

export const metadata: Metadata = {
  title: 'Choose Workspace Access | Member & Client Portals | Paper Street',
  description:
    'Select your Paper Street workspace access. Member operating desk for registered offices and mail, or client portal for on-demand day passes and meeting rooms.',
  keywords: ['workspace login', 'Paper Street member login', 'client desk Kenya'],
  alternates: {
    canonical: 'https://paperstreet.co.ke/login',
  },
};

export default function LoginPage() {
  return <LoginSelectorClient />;
}
