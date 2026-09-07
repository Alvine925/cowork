import type { Metadata } from 'next';
import IndustriesClient from '@/views/industries';

export const metadata: Metadata = {
  title: 'Business Solutions for Every Industry | Paper Street Kenya',
  description:
    'Professional virtual office, coworking, and business address solutions for startups, consultants, SMEs, remote teams, and growing companies in Kenya.',
  keywords: [
    'workspace for startups Kenya',
    'SME office solutions Kenya',
    'remote team workspace Kenya',
    'consultant business address Nairobi',
  ],
  alternates: {
    canonical: 'https://paperstreet.africa/industries',
  },
};

export default function IndustriesPage() {
  return <IndustriesClient />;
}
