import type { Metadata } from 'next';
import BlogDirectoryClient from '@/views/blog';

export const metadata: Metadata = {
  title: 'Insights, Guides & Case Studies | Paper Street Blog',
  description:
    'Practical business articles on company registration in Kenya, virtual office tax considerations, office costs, and scaling across East Africa.',
  keywords: ['Kenya business blog', 'virtual office guides Kenya', 'business registration tips'],
  alternates: {
    canonical: 'https://paperstreet.co.ke/blog',
  },
};

export default function BlogPage() {
  return <BlogDirectoryClient />;
}
