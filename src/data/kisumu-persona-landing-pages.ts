import { LandingPageConfig } from './landing-page-types'

export const kisumuPersonaLandingPages: Record<string, LandingPageConfig> = {
  'coworking-space-for-startups-kisumu': {
    slug: 'coworking-space-for-startups-kisumu',
    title: 'Coworking Space for Startups in Kisumu',
    metaTitle: 'Coworking Space for Startups in Kisumu | Lean Startup Hub | Paper Street',
    metaDescription:
      'The premier coworking space for startups in Kisumu CBD. Flexible desks, private team suites, fast dual fibre internet, and investor pitch rooms from KES 1,000/day.',
    targetKeywords: [
      'coworking space for startups Kisumu',
      'startup coworking Kisumu',
      'tech startup workspace Kisumu',
      'incubator coworking Kisumu',
      'startup hub Kisumu CBD',
    ],
    eyebrow: 'Startup Innovation Hub · Kisumu CBD',
    heroHeading: 'Coworking Space for Startups in Kisumu.',
    heroSubtitle:
      'Protect your runway and accelerate product development. Symmetrical dual fibre internet, 100% generator power backup, and investor meeting rooms on Oginga Odinga Street from KES 1,000.',
    heroImage: 'https://images.unsplash.com/photo-152202176988-66273c2fd55f?w=1600&auto=format&q=80',
    primaryCtaText: 'Launch at Paper Street (From KES 1,000)',
    primaryCtaHref: '/services/hot-desk',
    secondaryCtaText: 'Explore Team Desks',
    secondaryCtaHref: '/pricing',
    startingPrice: 'From KES 1,000',
    priceLabel: 'Day Pass Starting From',
    keyStats: [
      { value: 'From KES 1,000', label: 'Day Pass' },
      { value: '0 Dep (Annual)', label: '2 Mo for Monthly' },
      { value: 'Dual Fibre', label: 'Fast Wi-Fi' },
      { value: 'CBD Center', label: 'Oginga Odinga St' },
    ],
    overviewTitle: 'Built for High-Growth Startups and Tech Teams in Western Kenya',
    overviewContent: [
      'Founders building tech platforms, fintech solutions, agritech apps, and creative agencies in Western Kenya need reliable infrastructure without burning cash on traditional commercial leases.',
      'Paper Street provides flexible coworking desks and team suites at Kisumu CBD Commercial Center on Oginga Odinga Street. Focus on coding, shipping features, and pitching investors while we handle internet, power, and facilities.',
    ],
    features: [
      { title: 'Zero Capital Lock-In', desc: 'No heavy multi-month security deposits or agent commissions: scale your team desks up or down.' },
      { title: 'Symmetrical Enterprise Fibre', desc: 'Dual-carrier connections engineered for rapid cloud deployments, GitHub syncing, and Zoom calls.' },
      { title: 'Investor Pitch Facilities', desc: 'Book private 4 to 6 person boardroom suites with 4K presentation screens for investor decks.' },
      { title: 'Continuous Power Uptime', desc: 'Automatic commercial standby generator keeps work running during KPLC power cuts.' },
    ],
    pricingPackages: [
      {
        name: 'Startup Day Pass',
        price: 'From KES 1,000',
        period: '/ day',
        description: 'Drop in for a full business day of coding and focus.',
        features: ['Full day access (8am to 6pm)', 'Fast enterprise fibre Wi-Fi', 'Generator power backup', 'Power sockets at desk'],
        ctaText: 'Get Day Pass',
        ctaHref: '/services/hot-desk',
      },
      {
        name: 'Startup Dedicated Desk',
        price: 'From KES 16,500',
        period: '/ month',
        popular: true,
        description: 'Permanent assigned workstation with lockable storage.',
        features: ['Assigned permanent desk', 'Lockable storage pedestal', 'Meeting room credits (4-6 pax)', 'Official registered business address'],
        ctaText: 'Reserve Desk',
        ctaHref: '/contact',
      },
    ],
    faqs: [
      {
        q: 'How does Paper Street help startups save money in Kisumu?',
        a: 'We eliminate multi-month security deposits, fit-out costs, furniture purchases, and separate utility bills: providing an all-inclusive flexible workspace from KES 1,000/day.',
      },
      {
        q: 'Can startup founders register their company using this address?',
        a: 'Yes, dedicated desk and private office memberships include official commercial registered office rights on Oginga Odinga Street for BRS eCitizen registration.',
      },
      {
        q: 'Can we add desk seats as our startup hires new team members?',
        a: 'Yes, you can scale from a single desk to multiple team workstations or a private team office seamlessly.',
      },
    ],
  },

  'coworking-space-for-freelancers-kisumu': {
    slug: 'coworking-space-for-freelancers-kisumu',
    title: 'Coworking Space for Freelancers in Kisumu',
    metaTitle: 'Coworking Space for Freelancers in Kisumu | Freelance Hub | Paper Street',
    metaDescription:
      'The top coworking space for freelancers in Kisumu CBD. Enjoy fast dual fibre internet, 100% generator backup, and quiet focus desks on Oginga Odinga Street from KES 1,000.',
    targetKeywords: [
      'coworking space for freelancers Kisumu',
      'freelancer coworking Kisumu',
      'freelance workspace Kisumu',
      'coworking for independent workers Kisumu',
      'freelance desk Kisumu CBD',
    ],
    eyebrow: 'Freelancer Community & Focus Desks · Kisumu CBD',
    heroHeading: 'Coworking Space for Freelancers in Kisumu.',
    heroSubtitle:
      'Level up your freelance business in a professional commercial setting. Symmetrical enterprise fibre, automatic standby power, and air-conditioned focus desks from KES 1,000/day.',
    heroImage: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=1600&auto=format&q=80',
    primaryCtaText: 'Get a Day Pass (From KES 1,000)',
    primaryCtaHref: '/services/hot-desk',
    secondaryCtaText: 'View Monthly Passes',
    secondaryCtaHref: '/pricing',
    startingPrice: 'From KES 1,000',
    priceLabel: 'Day Pass Starting From',
    keyStats: [
      { value: 'From KES 1,000', label: 'Day Pass' },
      { value: 'Flexible', label: 'No Contracts' },
      { value: 'Dual Fibre', label: 'Fast Wi-Fi' },
      { value: 'CBD Center', label: 'Oginga Odinga St' },
    ],
    overviewTitle: 'A Productive Home for Independent Professionals in Western Kenya',
    overviewContent: [
      'Working from home or spending hours in noisy coffee shops often leads to lost hours from domestic distractions, spotty Wi-Fi, and frequent blackouts.',
      'Paper Street offers freelancers and solo consultants a structured, high-productivity environment on Oginga Odinga Street in Kisumu CBD. Access enterprise internet, comfortable seating, and meeting rooms to win higher-value contracts.',
    ],
    features: [
      { title: 'Affordable Drop-In Flexibility', desc: 'Purchase day passes from KES 1,000 or monthly flexible desks from KES 12,000 with zero lock-in.' },
      { title: 'Uninterrupted Power Backup', desc: 'Automatic commercial standby generator switches on during KPLC power blackouts.' },
      { title: 'Professional Client Meeting Rooms', desc: 'Host corporate clients in private 4 to 6 person meeting rooms with 4K displays.' },
      { title: 'Air-Conditioned Focus Space', desc: 'Work in a quiet, climate-controlled space designed for deep focus.' },
    ],
    pricingPackages: [
      {
        name: 'Single Day Pass',
        price: 'From KES 1,000',
        period: '/ day',
        description: 'Drop in for a day of productive freelance work.',
        features: ['Full day access (8am to 6pm)', 'Fast enterprise fibre Wi-Fi', 'Generator power backup', 'Power sockets at desk'],
        ctaText: 'Get Day Pass',
        ctaHref: '/services/hot-desk',
      },
      {
        name: 'Monthly Hot Desk',
        price: 'From KES 12,000',
        period: '/ month',
        popular: true,
        description: 'Unlimited monthly flexible desk access.',
        features: ['Unlimited monthly access', 'Fast fibre Wi-Fi & LAN', 'Generator backup included', 'Front-desk parcel receipt'],
        ctaText: 'Join Monthly',
        ctaHref: '/services/hot-desk',
      },
    ],
    faqs: [
      {
        q: 'Why do freelancers choose Paper Street over coffee shops in Kisumu?',
        a: 'We offer quiet focus zones without customer chatter, guaranteed dual enterprise fibre internet, automatic generator power backup during blackouts, and ergonomic chairs.',
      },
      {
        q: 'Can I use the space on irregular days?',
        a: 'Yes, our 5-Day Flexi Pass (from KES 4,500) gives you 5 day passes to use anytime within 30 days.',
      },
      {
        q: 'Can I take client video calls with headphones?',
        a: 'Yes, routine calls with headphones are standard on the open floor, and private meeting rooms can be booked for sensitive presentations.',
      },
    ],
  },

  'coworking-space-for-ngos-kisumu': {
    slug: 'coworking-space-for-ngos-kisumu',
    title: 'Coworking Space for NGOs in Kisumu',
    metaTitle: 'Coworking Space for NGOs in Kisumu | Project Offices & Desks | Paper Street',
    metaDescription:
      'Serviced coworking and office space for NGOs, non-profits, and field teams in Kisumu CBD. Secure private rooms, fast dual fibre, and boardrooms on Oginga Odinga Street.',
    targetKeywords: [
      'coworking space for NGOs Kisumu',
      'NGO office space Kisumu',
      'non profit workspace Kisumu',
      'humanitarian office Kisumu',
      'project office Kisumu CBD',
    ],
    eyebrow: 'NGO & Development Project Hub · Kisumu CBD',
    heroHeading: 'Coworking Space for NGOs in Kisumu.',
    heroSubtitle:
      'The trusted workspace partner for international NGOs, health research projects, and civil society teams in Western Kenya. Secure private suites and meeting rooms on Oginga Odinga Street.',
    heroImage: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1600&auto=format&q=80',
    primaryCtaText: 'Inquire for NGO Team',
    primaryCtaHref: '/contact',
    secondaryCtaText: 'View Private Suites',
    secondaryCtaHref: '/pricing',
    startingPrice: 'From KES 1,000',
    priceLabel: 'Day Pass Starting From',
    keyStats: [
      { value: 'NGO Ready', label: 'VAT Compliant' },
      { value: 'From KES 1,000', label: 'Day Pass' },
      { value: 'Dual Fibre', label: 'Secure Wi-Fi' },
      { value: 'CBD Center', label: 'Oginga Odinga St' },
    ],
    overviewTitle: 'Institutional Grade Workspace for Development & Research Teams',
    overviewContent: [
      'Non-governmental organizations (NGOs), development agencies, and global health research initiatives operating in Kisumu and the greater Lake Victoria basin require secure, compliant workspace.',
      'Paper Street delivers turnkey office infrastructure at Kisumu CBD Commercial Center on Oginga Odinga Street: private team offices, high-capacity dual-carrier fibre, generator backup, and boardrooms for stakeholder workshops.',
    ],
    features: [
      { title: 'Compliant Invoicing & Tax Receipts', desc: 'Electronic KRA VAT tax invoices and documentation formatted for donor compliance and audit requirements.' },
      { title: 'Secure Lockable Team Suites', desc: 'Private enclosed offices ensuring complete data confidentiality for research and donor files.' },
      { title: 'Stakeholder Workshop Rooms', desc: 'Private 4 to 6 person boardroom suites with 4K presentation screens for county and donor reviews.' },
      { title: 'Central Strategic Location', desc: 'Convenient CBD location close to county government offices, partner agencies, and regional transit.' },
    ],
    pricingPackages: [
      {
        name: 'NGO Field Day Pass',
        price: 'From KES 1,000',
        period: '/ day',
        description: 'Drop-in pass for visiting researchers and field staff.',
        features: ['Full day access (8am to 6pm)', 'Fast enterprise fibre Wi-Fi', 'Generator power backup', 'Ergonomic seating'],
        ctaText: 'Get Field Pass',
        ctaHref: '/services/hot-desk',
      },
      {
        name: 'NGO Project Team Suite',
        price: 'From KES 65,000',
        period: '/ month',
        popular: true,
        description: 'Dedicated private office for 3 to 5 project officers.',
        features: ['Lockable private room', '3–5 ergonomic workstations', 'Generator backup included', 'Monthly boardroom credits (4-6 pax)'],
        ctaText: 'Inquire Team Suite',
        ctaHref: '/contact',
      },
    ],
    faqs: [
      {
        q: 'Can NGOs receive formal tax invoices and receipts for donor reporting?',
        a: 'Yes, we provide standard electronic KRA tax invoices and comprehensive receipts required for institutional donor audits.',
      },
      {
        q: 'Can short-term visiting research missions book desks for 1 to 3 weeks?',
        a: 'Yes, we offer flexible weekly and monthly packages for visiting monitoring and evaluation (M&E) teams and consultants.',
      },
      {
        q: 'Is the building secure for storing project laptops and files?',
        a: 'Yes, our building features commercial security, CCTV surveillance, and secure lockable private suites.',
      },
    ],
  },

  'office-space-for-startups-kisumu': {
    slug: 'office-space-for-startups-kisumu',
    title: 'Office Space for Startups in Kisumu',
    metaTitle: 'Office Space for Startups in Kisumu | Move-In Ready Offices | Paper Street',
    metaDescription:
      'Affordable, fully furnished office space for startups in Kisumu CBD. Move-in ready private suites on Oginga Odinga Street with dual fibre, AC, and generator backup from KES 28,000/mo.',
    targetKeywords: [
      'office space for startups Kisumu',
      'startup office Kisumu',
      'small office for startups Kisumu',
      'furnished startup office Kisumu',
      'private office for startups Kisumu CBD',
    ],
    eyebrow: 'Furnished Startup Offices · Kisumu CBD',
    heroHeading: 'Office Space for Startups in Kisumu.',
    heroSubtitle:
      'Move-in ready private team suites on Oginga Odinga Street. Zero fit-out costs, enterprise dual fibre internet, automatic standby generator backup, and boardroom credits from KES 28,000/month.',
    heroImage: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1600&auto=format&q=80',
    primaryCtaText: 'Tour Startup Offices',
    primaryCtaHref: '/contact',
    secondaryCtaText: 'View Office Sizes',
    secondaryCtaHref: '/pricing',
    startingPrice: 'From KES 28,000',
    priceLabel: 'Private Suites From',
    keyStats: [
      { value: 'From KES 28,000', label: 'Monthly Suite' },
      { value: 'Turnkey', label: 'Fully Furnished' },
      { value: 'Dual Fibre', label: 'Fast Internet' },
      { value: 'CBD Center', label: 'Oginga Odinga St' },
    ],
    overviewTitle: 'Plug-and-Play Office Infrastructure for Scaling Startups',
    overviewContent: [
      'Signing a traditional commercial lease in Kisumu requires upfront capital for 3 to 6 months of security deposit, legal lease drafting fees, expensive furniture purchases, and internet installation.',
      'Paper Street eliminates these overhead burdens. Our private startup offices on Oginga Odinga Street come fully furnished with ergonomic workstations, high-speed fibre, standby generator power, and meeting room access.',
    ],
    features: [
      { title: 'Turnkey & Move-In Ready', desc: 'Start working within 24 hours: desks, chairs, high-speed Wi-Fi, and power are fully set up.' },
      { title: 'All-Inclusive Monthly Pricing', desc: 'Rent, electricity, backup generator, high-speed fibre, cleaning, and security on one transparent bill.' },
      { title: 'Commercial Registered Address', desc: 'Included registered office rights on Oginga Odinga Street for company incorporation and banking.' },
      { title: 'Boardroom Access Included', desc: 'Monthly meeting room hours with 4K displays to host clients and pitch investors.' },
    ],
    pricingPackages: [
      {
        name: '1–2 Person Startup Suite',
        price: 'From KES 28,000',
        period: '/ month',
        description: 'Private enclosed office for solo founders or 2 co-founders.',
        features: ['Lockable private room', '2 ergonomic workstations', 'High-speed fibre internet', 'CBD business address'],
        ctaText: 'Schedule a Tour',
        ctaHref: '/contact',
      },
      {
        name: '3–5 Person Team Suite',
        price: 'From KES 65,000',
        period: '/ month',
        popular: true,
        description: 'Spacious private office for growing startup teams.',
        features: ['Private enclosed team office', '3–5 workstations & storage', 'Generator backup included', 'Monthly boardroom credits (4-6 pax)'],
        ctaText: 'Schedule a Tour',
        ctaHref: '/contact',
      },
    ],
    faqs: [
      {
        q: 'How quickly can our startup move into an office?',
        a: 'Our offices are fully furnished and move-in ready. You can complete verification and move in within 24 hours.',
      },
      {
        q: 'Are internet and electricity included in the monthly rent?',
        a: 'Yes, high-speed dual fibre internet, commercial generator backup, electricity, water, daily cleaning, and reception services are all included.',
      },
      {
        q: 'Can we use the address for BRS company registration and tax compliance?',
        a: 'Yes, all private office suites include commercial registered address rights on Oginga Odinga Street.',
      },
    ],
  },

  'workspace-for-entrepreneurs-kisumu': {
    slug: 'workspace-for-entrepreneurs-kisumu',
    title: 'Workspace for Entrepreneurs in Kisumu',
    metaTitle: 'Workspace for Entrepreneurs in Kisumu | Business Growth Hub | Paper Street',
    metaDescription:
      'Professional workspace for entrepreneurs, business founders, and consultants in Kisumu CBD. Hot desks, dedicated desks, and private suites on Oginga Odinga Street from KES 1,000/day.',
    targetKeywords: [
      'workspace for entrepreneurs Kisumu',
      'entrepreneur workspace Kisumu',
      'business incubator Kisumu',
      'coworking for entrepreneurs Kisumu',
      'founder workspace Kisumu CBD',
    ],
    eyebrow: 'Entrepreneur & Founder Workspace · Kisumu CBD',
    heroHeading: 'Workspace for Entrepreneurs in Kisumu.',
    heroSubtitle:
      'The business base for ambitious founders, business builders, and consultants in Western Kenya. Enterprise dual fibre, automatic standby generator backup, and boardrooms on Oginga Odinga Street.',
    heroImage: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1600&auto=format&q=80',
    primaryCtaText: 'Join Entrepreneur Hub (From KES 1,000)',
    primaryCtaHref: '/services/hot-desk',
    secondaryCtaText: 'See pricing',
    secondaryCtaHref: '/pricing',
    startingPrice: 'From KES 1,000',
    priceLabel: 'Day Pass Starting From',
    keyStats: [
      { value: 'From KES 1,000', label: 'Day Pass' },
      { value: 'Commercial', label: 'CBD Address' },
      { value: 'Dual Fibre', label: 'Fast Wi-Fi' },
      { value: 'CBD Center', label: 'Oginga Odinga St' },
    ],
    overviewTitle: 'Fueling Entrepreneurial Growth in Western Kenya',
    overviewContent: [
      'Building a thriving enterprise in Kisumu requires more than just an idea: it requires a professional commercial presence, reliable infrastructure, and a focused environment.',
      'Paper Street provides entrepreneurs with high-grade working facilities on Oginga Odinga Street in Kisumu CBD. Access flexible desk options, private offices, registered business address compliance, and executive meeting rooms.',
    ],
    features: [
      { title: 'Commercial Business Credibility', desc: 'Position your enterprise on Oginga Odinga Street in the financial and commercial heart of Kisumu.' },
      { title: 'Reliable Enterprise Infrastructure', desc: 'Dual-carrier symmetrical fibre internet and standby generator backup ensure zero business disruption.' },
      { title: 'Client Pitch & Boardrooms', desc: 'Host partners, clients, and investors in modern 4 to 6 person boardroom suites equipped with 4K screens.' },
      { title: 'Flexible Membership Tiers', desc: 'Choose from day passes, monthly flexi desks, dedicated desks, or private office suites.' },
    ],
    pricingPackages: [
      {
        name: 'Entrepreneur Day Pass',
        price: 'From KES 1,000',
        period: '/ day',
        description: 'Drop in for a day of productive strategic work.',
        features: ['Full day access (8am to 6pm)', 'Fast enterprise fibre Wi-Fi', 'Generator power backup', 'Ergonomic seating'],
        ctaText: 'Get Day Pass',
        ctaHref: '/services/hot-desk',
      },
      {
        name: 'Dedicated Founder Desk',
        price: 'From KES 16,500',
        period: '/ month',
        popular: true,
        description: 'Your permanent assigned desk with lockable storage.',
        features: ['Assigned permanent desk', 'Lockable storage pedestal', 'Meeting room credits (4-6 pax)', 'Official registered business address'],
        ctaText: 'Reserve Founder Desk',
        ctaHref: '/contact',
      },
    ],
    faqs: [
      {
        q: 'Why should entrepreneurs in Kisumu base their operations at Paper Street?',
        a: 'We provide an established commercial CBD address, high-speed dual fibre internet, automatic generator backup, and boardroom facilities that elevate your brand reputation.',
      },
      {
        q: 'Can I register my new company using Paper Street address?',
        a: 'Yes, dedicated desk, private office, and virtual office plans include commercial registered address rights on Oginga Odinga Street compliant with BRS and KRA.',
      },
      {
        q: 'Can I book meeting rooms to pitch prospective clients?',
        a: 'Yes, private 4 to 6 person meeting rooms with 4K presentation screens can be booked by the hour.',
      },
    ],
  },
}
