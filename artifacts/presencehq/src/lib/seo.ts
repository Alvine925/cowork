export const SITE_URL = 'https://paperstreet.africa'
export const SITE_NAME = 'Paper Street'
export const DEFAULT_OG_IMAGE = `${SITE_URL}/favicon.svg`

export type PageSeo = {
  title: string
  description: string
  keywords: string[]
  type?: 'website' | 'article'
  noindex?: boolean
}

const defaultSeo: PageSeo = {
  title: 'Coworking Space & Virtual Office in Kenya | Paper Street',
  description:
    'Find coworking space and virtual office services in Kenya. Paper Street offers professional business addresses, mail handling, meeting rooms, and flexible workspaces.',
  keywords: [
    'coworking space Kenya',
    'virtual office Kenya',
    'business address Kenya',
    'flexible workspace Kenya',
  ],
}

const routeSeo: Record<string, PageSeo> = {
  '/': defaultSeo,
  '/about': {
    title: 'About Paper Street | Business Presence in Kenya',
    description:
      'Learn how Paper Street helps Kenyan businesses build a credible professional presence with virtual offices, coworking spaces, and business support services.',
    keywords: ['Paper Street Kenya', 'business support Kenya', 'virtual office company Kenya'],
  },
  '/contact': {
    title: 'Contact Paper Street | Virtual Office Kenya',
    description:
      'Talk to Paper Street about virtual offices, coworking space, business addresses, mail handling, and meeting rooms across Kenya.',
    keywords: ['contact virtual office Kenya', 'coworking space enquiry Kenya', 'Paper Street contact'],
  },
  '/pricing': {
    title: 'Virtual Office & Coworking Prices in Kenya | Paper Street',
    description:
      'Compare Paper Street virtual office and coworking membership plans in Kenya, with professional addresses, mail handling, workspace, and meeting room access.',
    keywords: ['virtual office prices Kenya', 'coworking prices Kenya', 'business address cost Kenya'],
  },
  '/industries': {
    title: 'Business Solutions for Every Industry | Paper Street',
    description:
      'Professional virtual office, coworking, and business address solutions for startups, consultants, SMEs, remote teams, and growing companies in Kenya.',
    keywords: ['workspace for startups Kenya', 'SME office solutions Kenya', 'remote team workspace Kenya'],
  },
  '/partners': {
    title: 'Partner with Paper Street | Business Network Kenya',
    description:
      'Partner with Paper Street to help businesses access trusted virtual offices, coworking space, meeting rooms, and professional addresses across Kenya.',
    keywords: ['Paper Street partners', 'business partnerships Kenya', 'workspace partner Kenya'],
  },
  '/resources': {
    title: 'Business Resources for Kenyan Companies | Paper Street',
    description:
      'Explore practical business resources from Paper Street covering company registration, professional addresses, workspace, compliance, and growth in Kenya.',
    keywords: ['Kenya business resources', 'starting a business Kenya', 'business guides Kenya'],
  },
  '/careers': {
    title: 'Careers at Paper Street | Join Our Kenya Team',
    description:
      'Explore careers at Paper Street and help build better virtual office, coworking, and business presence services for companies across Africa.',
    keywords: ['Paper Street careers', 'workspace jobs Kenya', 'business services jobs Kenya'],
  },
  '/services': {
    title: 'Virtual Office & Workspace Services in Kenya | Paper Street',
    description:
      'Explore Paper Street services: virtual offices, business addresses, mail handling, meeting rooms, hot desks, reception, and company registration support.',
    keywords: [
      'virtual office services Kenya',
      'coworking services Kenya',
      'business services Nairobi',
      'office solutions Kenya',
    ],
  },
  '/services/virtual-office': {
    title: 'Virtual Office in Kenya | Professional Business Presence',
    description:
      'Get a virtual office in Kenya with a professional business address, mail handling, reception support, and workspace access when you need it.',
    keywords: ['virtual office Kenya', 'virtual office Nairobi', 'remote business address Kenya'],
  },
  '/services/business-address': {
    title: 'Professional Business Address in Kenya | Paper Street',
    description:
      'Use a prestigious professional business address in Kenya for company registration, banking, correspondence, and a more credible business presence.',
    keywords: ['business address Kenya', 'registered office address Kenya', 'business address Nairobi'],
  },
  '/services/mail-handling': {
    title: 'Business Mail Handling Services in Kenya | Paper Street',
    description:
      'Never miss important business correspondence. Paper Street receives, logs, stores, scans, and forwards your business mail securely in Kenya.',
    keywords: ['mail handling Kenya', 'business mail service Kenya', 'mail receipt Nairobi'],
  },
  '/services/mail-forwarding': {
    title: 'Business Mail Forwarding in Kenya | Paper Street',
    description:
      'Forward business mail and parcels from your Paper Street address to any location in Kenya or around the world on a schedule that works for you.',
    keywords: ['mail forwarding Kenya', 'business mail forwarding Nairobi', 'parcel forwarding Kenya'],
  },
  '/services/meeting-rooms': {
    title: 'Meeting Rooms for Hire in Kenya | Paper Street',
    description:
      'Book professional meeting rooms in Kenya by the hour for client meetings, interviews, workshops, board meetings, and presentations.',
    keywords: ['meeting rooms Kenya', 'meeting room hire Nairobi', 'boardroom rental Kenya'],
  },
  '/services/hot-desk': {
    title: 'Hot Desk Coworking in Kenya | Flexible Workspace',
    description:
      'Work productively from a professional hot desk in Kenya. Get flexible coworking access without the cost or commitment of a traditional office lease.',
    keywords: ['hot desk Kenya', 'hot desk Nairobi', 'flexible coworking Kenya'],
  },
  '/services/dedicated-desk': {
    title: 'Dedicated Desk Coworking in Kenya | Paper Street',
    description:
      'Get a dedicated desk in a professional coworking environment in Kenya, with a consistent workspace, business amenities, and a productive community.',
    keywords: ['dedicated desk Kenya', 'dedicated desk Nairobi', 'coworking desk Kenya'],
  },
  '/services/reception-services': {
    title: 'Virtual Receptionist Services in Kenya | Paper Street',
    description:
      'Give your business a professional first impression with reception and phone answering services from Paper Street in Kenya.',
    keywords: ['virtual receptionist Kenya', 'reception services Nairobi', 'phone answering service Kenya'],
  },
  '/services/business-expansion': {
    title: 'Expand Your Business Across Kenya | Paper Street',
    description:
      'Establish a professional presence in Nairobi, Mombasa, Kisumu, Nakuru, or Eldoret without committing to a long physical office lease.',
    keywords: ['business expansion Kenya', 'expand business Nairobi Mombasa', 'Kenya business presence'],
  },
  '/services/company-registration': {
    title: 'Company Registration Support in Kenya | Paper Street',
    description:
      'Get practical company registration support in Kenya, including document preparation, business address guidance, and help navigating the registration process.',
    keywords: ['company registration Kenya', 'register a company Kenya', 'business registration support Nairobi'],
  },
  '/locations': {
    title: 'Coworking & Virtual Office Locations Across Kenya',
    description:
      'Find Paper Street coworking spaces and virtual office locations in Nairobi, Mombasa, Kisumu, Nakuru, and Eldoret.',
    keywords: ['coworking locations Kenya', 'virtual office locations Kenya', 'office space Nairobi Mombasa'],
  },
  '/locations/nairobi': {
    title: 'Coworking Space & Virtual Office in Nairobi',
    description:
      'Build your business presence in Nairobi with Paper Street virtual offices, professional addresses, coworking desks, mail handling, and meeting rooms.',
    keywords: ['coworking space Nairobi', 'virtual office Nairobi', 'business address Nairobi'],
  },
  '/locations/mombasa': {
    title: 'Coworking Space & Virtual Office in Mombasa',
    description:
      'Build your business presence in Mombasa with Paper Street virtual offices, professional addresses, coworking desks, mail handling, and meeting rooms.',
    keywords: ['coworking space Mombasa', 'virtual office Mombasa', 'business address Mombasa'],
  },
  '/locations/kisumu': {
    title: 'Coworking Space & Virtual Office in Kisumu',
    description:
      'Build your business presence in Kisumu with Paper Street virtual offices, professional addresses, coworking desks, mail handling, and meeting rooms.',
    keywords: ['coworking space Kisumu', 'virtual office Kisumu', 'business address Kisumu'],
  },
  '/locations/nakuru': {
    title: 'Coworking Space & Virtual Office in Nakuru',
    description:
      'Build your business presence in Nakuru with Paper Street virtual offices, professional addresses, coworking desks, mail handling, and meeting rooms.',
    keywords: ['coworking space Nakuru', 'virtual office Nakuru', 'business address Nakuru'],
  },
  '/locations/eldoret': {
    title: 'Coworking Space & Virtual Office in Eldoret',
    description:
      'Build your business presence in Eldoret with Paper Street virtual offices, professional addresses, coworking desks, mail handling, and meeting rooms.',
    keywords: ['coworking space Eldoret', 'virtual office Eldoret', 'business address Eldoret'],
  },
  '/blog': {
    title: 'Business Insights & Guides for Kenya | Paper Street',
    description:
      'Read Paper Street guides on virtual offices, coworking, company registration, business addresses, compliance, and growing a business in Kenya.',
    keywords: ['Kenya business blog', 'virtual office advice Kenya', 'coworking guides Kenya'],
  },
  '/privacy-policy': {
    title: 'Privacy Policy | Paper Street Kenya',
    description: 'Read the Paper Street privacy policy and learn how we collect, use, and protect personal information.',
    keywords: ['Paper Street privacy policy', 'data protection Kenya'],
  },
  '/terms-of-service': {
    title: 'Terms of Service | Paper Street Kenya',
    description: 'Read the terms and conditions that apply to Paper Street virtual office, coworking, and business support services.',
    keywords: ['Paper Street terms', 'virtual office terms Kenya'],
  },
  '/cookie-policy': {
    title: 'Cookie Policy | Paper Street Kenya',
    description: 'Learn how Paper Street uses cookies and similar technologies on our website.',
    keywords: ['Paper Street cookie policy', 'website cookies Kenya'],
  },
  '/refund-policy': {
    title: 'Refund Policy | Paper Street Kenya',
    description: 'Read the Paper Street refund policy for virtual office, coworking, and business support services.',
    keywords: ['Paper Street refund policy', 'workspace refund Kenya'],
  },
}

export const publicRoutes = Object.keys(routeSeo)

export function getPageSeo(pathname: string): PageSeo & { path: string } {
  const path = pathname === '/' ? '/' : pathname.replace(/\/+$/, '')
  const blogMatch = path.match(/^\/blog\/([^/]+)$/)

  if (blogMatch) {
    const slug = decodeURIComponent(blogMatch[1])
    const article = blogArticleSeo[slug]
    if (article) {
      return { ...article, path }
    }
  }

  if (routeSeo[path]) {
    return { ...routeSeo[path], path }
  }

  return {
    title: 'Page Not Found | Paper Street',
    description: 'The Paper Street page you requested could not be found.',
    keywords: ['Paper Street Kenya'],
    noindex: true,
    path,
  }
}

const blogArticleSeo: Record<string, PageSeo> = {
  'virtual-office-vs-physical-office-kenya': {
    title: 'Virtual Office vs Physical Office in Kenya | Paper Street',
    description:
      'Compare the real cost of a virtual office and physical office in Kenya, including rent, utilities, staff, deposits, and the savings a flexible workspace offers.',
    keywords: ['virtual office vs physical office Kenya', 'office costs Nairobi', 'coworking vs office lease Kenya'],
    type: 'article',
  },
  'register-company-kenya-2025': {
    title: 'How to Register a Company in Kenya | Paper Street',
    description:
      'Follow this practical step-by-step guide to register a company in Kenya through eCitizen, from name search and documents to KRA PIN and banking.',
    keywords: ['how to register a company in Kenya', 'eCitizen company registration', 'BRS Kenya'],
    type: 'article',
  },
  'professional-business-address-kenya': {
    title: 'Why Your Business Address Matters in Kenya | Paper Street',
    description:
      'Discover why a professional business address in Kenya builds credibility with clients, banks, regulators, and government procurement teams.',
    keywords: ['professional business address Kenya', 'business credibility Kenya', 'registered office address'],
    type: 'article',
  },
  'expand-business-mombasa-kisumu-nakuru': {
    title: 'Expanding a Business Across Kenya | Paper Street',
    description:
      'Learn how businesses can expand from Nairobi to Mombasa, Kisumu, Nakuru, and Eldoret with a credible local presence and flexible workspace.',
    keywords: ['expand business across Kenya', 'business expansion Mombasa', 'business expansion Kisumu'],
    type: 'article',
  },
  'mail-handling-business-kenya': {
    title: 'Business Mail Handling in Kenya: A Practical Guide',
    description:
      'See how professional mail handling in Kenya protects businesses from missed legal notices, invoices, government letters, and important parcels.',
    keywords: ['business mail handling Kenya', 'mail scanning Kenya', 'business correspondence service'],
    type: 'article',
  },
  'meeting-room-tips-nairobi': {
    title: '10 Tips for Better Client Meetings in Nairobi',
    description:
      'Make your next Nairobi client meeting more professional with practical advice on venue, preparation, technology, room setup, and guest experience.',
    keywords: ['meeting rooms Nairobi', 'client meeting tips Kenya', 'boardroom Nairobi'],
    type: 'article',
  },
  'kyc-compliance-kenya-businesses': {
    title: 'KYC Compliance for Kenyan Businesses | Paper Street',
    description:
      'Understand KYC requirements for Kenyan businesses, including documents, retention, compliance duties, and practical steps for staying prepared.',
    keywords: ['KYC compliance Kenya', 'business compliance Kenya', 'AML Kenya'],
    type: 'article',
  },
  'hot-desk-dedicated-desk-difference': {
    title: 'Hot Desk vs Dedicated Desk: Kenya Workspace Guide',
    description:
      'Compare hot desks and dedicated desks in Kenya to choose the right flexible workspace for your team, schedule, budget, and working style.',
    keywords: ['hot desk vs dedicated desk', 'coworking desk Kenya', 'flexible workspace guide'],
    type: 'article',
  },
  'freelancer-professional-presence-kenya': {
    title: 'Build a Professional Presence as a Freelancer in Kenya',
    description:
      'Learn how Kenyan freelancers and consultants can build credibility with a professional address, flexible workspace, and business-ready tools.',
    keywords: ['freelancer workspace Kenya', 'freelancer business address', 'consultant office Kenya'],
    type: 'article',
  },
  'kenya-data-protection-act-smes': {
    title: 'Kenya Data Protection Act Guide for SMEs',
    description:
      'A practical overview of the Kenya Data Protection Act for SMEs, including common obligations, customer data handling, and compliance steps.',
    keywords: ['Kenya Data Protection Act SMEs', 'data protection compliance Kenya', 'ODPC Kenya'],
    type: 'article',
  },
  'reception-services-kenya-smb': {
    title: 'Why Kenyan SMEs Need Professional Reception Services',
    description:
      'Learn how a professional receptionist and phone answering service can help Kenyan SMEs improve customer experience without full-time office overhead.',
    keywords: ['reception services Kenya', 'virtual receptionist for SMEs', 'phone answering Kenya'],
    type: 'article',
  },
}