import { kisumuBlogPostsData } from './kisumu-seo-articles'

export interface BlogPost {
  slug: string
  title: string
  excerpt: string
  category: string
  author: string
  authorRole: string
  date: string
  readTime: string
  image: string
  featured?: boolean
}

export const blogPosts: BlogPost[] = [
  ...kisumuBlogPostsData,

  {
    slug: 'virtual-office-vs-physical-office-kenya',
    title: 'Virtual Office vs Physical Office in Kenya: A Complete Cost Breakdown',
    excerpt:
      'Renting commercial space in Kenyan cities can cost anywhere from KES 80,000 to over KES 500,000 per month with deposits and fit-outs. We break down every cost line by line so you can make an informed decision for your business.',
    category: 'Business Strategy',
    author: 'Grace Wanjiku',
    authorRole: 'Head of Client Success',
    date: 'July 28, 2025',
    readTime: '8 min',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&auto=format&q=80',
    featured: true,
  },
  {
    slug: 'register-company-kenya-2025',
    title: 'How to Register a Company in Kenya: A Step-by-Step Guide',
    excerpt:
      'Company registration in Kenya is managed through the eCitizen portal. This guide walks you through every stage, from name reservation to business address selection and obtaining your KRA PIN.',
    category: 'Company Registration',
    author: 'Brian Otieno',
    authorRole: 'Business Advisory Lead',
    date: 'July 21, 2025',
    readTime: '11 min',
    image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1200&auto=format&q=80',
  },
  {
    slug: 'professional-business-address-kenya',
    title: 'Why a Professional Business Address Matters in the Age of Remote Work',
    excerpt:
      'A recognized commercial CBD address signals credibility to clients, banks, and regulators. We explain why physical address perception remains a decisive commercial factor in Kenya.',
    category: 'Virtual Office',
    author: 'Grace Wanjiku',
    authorRole: 'Head of Client Success',
    date: 'July 14, 2025',
    readTime: '6 min',
    image: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1200&auto=format&q=80',
  },
  {
    slug: 'expand-business-mombasa-kisumu-nakuru',
    title: 'Expanding Your Business to Western Kenya: What You Need to Know',
    excerpt:
      'Western Kenya and the Lake Victoria trade basin present major commercial opportunities for expanding firms. This guide covers local market dynamics, commercial presence setup, and tender requirements in Kisumu.',
    category: 'Business Expansion',
    author: 'David Kamau',
    authorRole: 'Regional Expansion Specialist',
    date: 'July 7, 2025',
    readTime: '10 min',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200&auto=format&q=80',
  },
  {
    slug: 'mail-handling-business-kenya',
    title: 'How Professional Mail Handling Protects Your Business',
    excerpt:
      'Missed statutory notices, delayed tenders, and uncollected court or government correspondence cost Kenyan businesses significant sums. Here is how structured mail scanning and logging eliminates risk.',
    category: 'Mail Services',
    author: 'Faith Achieng',
    authorRole: 'Operations Manager',
    date: 'June 30, 2025',
    readTime: '7 min',
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200&auto=format&q=80',
  },
  {
    slug: 'meeting-room-tips-nairobi',
    title: '10 Ways to Make Your Next Client Strategy Session Count',
    excerpt:
      'First impressions in a meeting room are shaped by technology, preparation, and presentation privacy. Practical tips to ensure your meetings with high-value clients run smoothly.',
    category: 'Productivity',
    author: 'Peter Ngugi',
    authorRole: 'Workspace Experience Lead',
    date: 'June 23, 2025',
    readTime: '5 min',
    image: 'https://images.unsplash.com/photo-1562575214-da9fcf59b907?w=1200&auto=format&q=80',
  },
  {
    slug: 'kyc-compliance-kenya-businesses',
    title: 'KYC Compliance for Kenyan Businesses: What the Law Requires',
    excerpt:
      'The Proceeds of Crime and Anti-Money Laundering Act places clear obligations on businesses. This guide explains verified address requirements, required documentation, and statutory compliance.',
    category: 'Compliance',
    author: 'Brian Otieno',
    authorRole: 'Business Advisory Lead',
    date: 'June 16, 2025',
    readTime: '9 min',
    image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1200&auto=format&q=80',
  },
  {
    slug: 'hot-desk-dedicated-desk-difference',
    title: 'Hot Desk vs Dedicated Desk: Which Flexible Workspace Is Right for You?',
    excerpt:
      'Both options eliminate long property lease lock-ins. We examine the differences in pricing, overnight storage, routine, and power reliability to help you decide.',
    category: 'Workspace',
    author: 'Peter Ngugi',
    authorRole: 'Workspace Experience Lead',
    date: 'June 9, 2025',
    readTime: '6 min',
    image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1200&auto=format&q=80',
  },
  {
    slug: 'freelancer-professional-presence-kenya',
    title: 'How Freelancers and Consultants Build a Credible Business Presence',
    excerpt:
      'Going independent does not mean looking amateur. We break down the verified commercial addresses and presentation spaces that help Kenyan freelancers close enterprise contracts.',
    category: 'Entrepreneurship',
    author: 'Grace Wanjiku',
    authorRole: 'Head of Client Success',
    date: 'June 2, 2025',
    readTime: '8 min',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&auto=format&q=80',
  },
  {
    slug: 'kenya-data-protection-act-smes',
    title: 'The Kenya Data Protection Act: What Every Business Owner Must Know',
    excerpt:
      'Since the ODPC began active compliance enforcement, businesses face strict guidelines for handling customer documents and communications. Key practical steps for compliance.',
    category: 'Compliance',
    author: 'Brian Otieno',
    authorRole: 'Business Advisory Lead',
    date: 'May 26, 2025',
    readTime: '10 min',
    image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=1200&auto=format&q=80',
  },
]
