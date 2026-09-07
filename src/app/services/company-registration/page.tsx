import type { Metadata } from 'next';
import CompanyRegistrationClient from '@/views/services/company-registration';

export const metadata: Metadata = {
  title: 'Company Registration & BRS Support in Kenya | Paper Street',
  description:
    'Complete support for Kenyan company incorporation, eCitizen BRS documentation, registered office address, KRA PIN, and CR12 setup.',
  keywords: ['company registration Kenya', 'eCitizen business registration', 'BRS company setup Kenya'],
  alternates: {
    canonical: 'https://paperstreet.africa/services/company-registration',
  },
};

export default function CompanyRegistrationPage() {
  return <CompanyRegistrationClient />;
}
