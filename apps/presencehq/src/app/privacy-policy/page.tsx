import type { Metadata } from 'next';
import PrivacyPolicyClient from '@/views/privacy-policy';

export const metadata: Metadata = {
  title: 'Privacy Policy | Paper Street Kenya',
  description:
    'Read the Paper Street Privacy Policy to learn how we protect and process business and personal data under Kenya Data Protection regulations.',
  keywords: ['Paper Street privacy policy', 'Kenya data protection policy'],
  alternates: {
    canonical: 'https://paperstreet.africa/privacy-policy',
  },
};

export default function PrivacyPolicyPage() {
  return <PrivacyPolicyClient />;
}
