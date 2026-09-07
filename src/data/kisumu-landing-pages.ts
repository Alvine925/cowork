import { LandingPageConfig } from './landing-page-types'
import { kisumuKeywordLandingPages } from './kisumu-keyword-landing-pages'
import { kisumuDailyDeskLandingPages } from './kisumu-daily-desk-landing-pages'
import { kisumuPrivateOfficeLandingPages } from './kisumu-private-office-landing-pages'
import { kisumuMeetingRoomLandingPages } from './kisumu-meeting-room-landing-pages'
import { kisumuVirtualOfficeLandingPages } from './kisumu-virtual-office-landing-pages'
import { kisumuRemoteWorkLandingPages } from './kisumu-remote-work-landing-pages'
import { kisumuPersonaLandingPages } from './kisumu-persona-landing-pages'
import { kisumuGuideLandingPages } from './kisumu-guide-landing-pages'
import { kisumuVoExpansionLandingPages } from './kisumu-vo-expansion-landing-pages'
import { kisumuBusinessAddressLandingPages } from './kisumu-business-address-landing-pages'
import { kisumuRegistrationAddressLandingPages } from './kisumu-registration-address-landing-pages'
import { kisumuMailHandlingLandingPages } from './kisumu-mail-handling-landing-pages'
import { kisumuCbdPresenceLandingPages } from './kisumu-cbd-presence-landing-pages'
import { kisumuProblemSearchLandingPages } from './kisumu-problem-search-landing-pages'
import { kisumuVirtualBranchLandingPages } from './kisumu-virtual-branch-landing-pages'

export type { LandingPageConfig } from './landing-page-types'

const baseKisumuLandingPages: Record<string, LandingPageConfig> = {
  'coworking-space-kisumu': {
    slug: 'coworking-space-kisumu',
    title: 'Coworking Space in Kisumu',
    metaTitle: 'Coworking Space Kisumu | Flexible Workspace & Desks | Paper Street',
    metaDescription:
      'Find flexible coworking space in Kisumu with private offices, hot desks, meeting rooms and virtual office services. Book your workspace today.',
    targetKeywords: [
      'coworking space Kisumu',
      'coworking space in Kisumu',
      'coworking spaces in Kisumu',
      'shared workspace Kisumu',
      'flexible workspace Kisumu',
      'affordable coworking space Kisumu',
      'coworking space Kisumu CBD',
    ],
    eyebrow: 'Kisumu CBD Commercial Center · Oginga Odinga Street',
    heroHeading: 'The Premier Coworking Space in Kisumu.',
    heroSubtitle:
      'Work productively in a modern commercial building in Kisumu CBD. Enterprise fibre internet, 100% generator backup, ergonomic seating, and a quiet professional atmosphere.',
    heroImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&auto=format&q=80',
    primaryCtaText: 'Get a Day Pass (From KES 1,000)',
    primaryCtaHref: '/services/hot-desk',
    secondaryCtaText: 'Book a Workspace Tour',
    secondaryCtaHref: '/contact',
    startingPrice: 'From KES 1,000',
    priceLabel: 'Day Pass Starting From',
    keyStats: [
      { value: '100 Mbps', label: 'Dedicated Fibre' },
      { value: '100%', label: 'Generator Backup' },
      { value: 'CBD', label: 'Oginga Odinga St' },
      { value: 'Zero', label: 'Lease Lock-in' },
    ],
    overviewTitle: 'Why Paper Street is Kisumu’s Best Coworking Space',
    overviewContent: [
      'Paper Street is located in a prime commercial building at the Kisumu CBD Commercial Center on Oginga Odinga Street. We provide remote professionals, consultants, startups, and expanding businesses with reliable, move-in-ready workspace in Western Kenya.',
      'Unlike noisy cafes or unstable home setups, our coworking floor offers quiet focus zones, dedicated high-speed fibre Wi-Fi, automatic standby generator backup, bookable meeting rooms, and professional front-desk staff.',
      'Whether you need a desk for a single day, a dedicated monthly workstation, or a full virtual office presence, Paper Street delivers professional commercial infrastructure without expensive lease overhead.',
    ],
    features: [
      {
        title: 'Enterprise High-Speed Internet',
        desc: 'Symmetrical high-speed fibre optic Wi-Fi and LAN connections designed for uninterrupted video conferencing and heavy uploads.',
      },
      {
        title: 'Automatic Generator Backup',
        desc: 'Instant standby generator switchover guarantees zero downtime during national grid power blackouts in Kisumu.',
      },
      {
        title: 'Ergonomic Workstations',
        desc: 'Comfortable mesh office chairs, spacious desks, and individual power outlets at every seat.',
      },
      {
        title: 'Private Meeting Rooms',
        desc: 'Air-conditioned meeting suites equipped with presentation displays and teleconferencing tools for client pitches.',
      },
      {
        title: 'Front-Desk Concierge',
        desc: 'Professional receptionist to greet your visiting clients and safely receive your incoming packages and mail.',
      },
      {
        title: 'Air-Conditioned & Maintained',
        desc: 'Clean, climate-controlled commercial workspace with daily professional cleaning and maintenance.',
      },
    ],
    pricingPackages: [
      {
        name: 'Day Pass',
        price: 'From KES 1,000',
        period: '/ day',
        description: 'Perfect for drop-in work, travelers, and remote professionals.',
        features: [
          'Full business day access (8am – 6pm)',
          'High-speed fibre Wi-Fi',
          'Generator power backup',
          'Power sockets at every desk',
          'Access to quiet shared workspace',
        ],
        ctaText: 'Buy Day Pass',
        ctaHref: '/services/hot-desk',
      },
      {
        name: 'Hot Desk Monthly',
        price: 'From KES 12,000',
        period: '/ month',
        popular: true,
        description: 'Flexible desk access for active freelancers and remote workers.',
        features: [
          'Unlimited monthly flexible desk access',
          'High-speed fibre Wi-Fi & LAN',
          'Generator power backup',
          '2 hours monthly meeting room credit',
          'Front-desk reception & parcel handling',
          'Daily cleaning & utilities covered',
        ],
        ctaText: 'Join Hot Desk',
        ctaHref: '/services/hot-desk',
      },
      {
        name: 'Dedicated Desk',
        price: 'From KES 16,500',
        period: '/ month',
        description: 'Your own permanent reserved desk with lockable storage.',
        features: [
          'Permanent reserved personal desk',
          'Lockable storage pedestal/drawer',
          'Official Kisumu CBD registered business address',
          '5 hours monthly meeting room credit',
          'Mail receipt, logging & notifications',
          '24/7 building access option',
        ],
        ctaText: 'Reserve Dedicated Desk',
        ctaHref: '/services/dedicated-desk',
      },
    ],
    faqs: [
      {
        q: 'Where is Paper Street Coworking located in Kisumu?',
        a: 'We are located at the Kisumu CBD Commercial Center on Oginga Odinga Street in Kisumu CBD, within walking distance of major commercial banks, legal chambers, and county government offices.',
      },
      {
        q: 'Can I drop in for a single day without a membership contract?',
        a: 'Yes, our Day Pass starts from KES 1,000 and grants full access to high-speed fibre internet, automatic generator backup, ergonomic seating, and air-conditioned workspace for the business day.',
      },
      {
        q: 'How reliable is the power and internet in Kisumu?',
        a: 'We have automatic standby generator backup that kicks in instantly during power outages, coupled with dual-carrier enterprise fibre internet to ensure 100% operational uptime.',
      },
      {
        q: 'What are the operating hours for coworking members?',
        a: 'The workspace is open Monday to Friday from 8:00 AM to 6:00 PM, with extended and weekend access available for dedicated desk and private office members.',
      },
      {
        q: 'Are meeting rooms included with coworking memberships?',
        a: 'Yes, monthly hot desk members receive 2 hours of meeting room credit per month, while dedicated desk members receive 5 hours monthly. Additional hours can be booked at member-discounted rates.',
      },
      {
        q: 'Can I register my company address at Paper Street?',
        a: 'Yes, our dedicated desk, private office, and virtual office plans include a registered commercial business address on Oginga Odinga Street compliant with BRS on eCitizen, KRA PIN, and banking requirements.',
      },
      {
        q: 'Can I take client phone calls or Zoom meetings from the coworking floor?',
        a: 'Short calls with headphones are welcome in the shared space. For confidential client discussions or longer team meetings, private phone booths and soundproof meeting rooms are available.',
      },
      {
        q: 'Is there parking available near the building in Kisumu CBD?',
        a: 'Yes, secure street and commercial building parking is available along Oginga Odinga Street and adjacent CBD streets.',
      },
    ],
  },

  'hot-desk-kisumu': {
    slug: 'hot-desk-kisumu',
    title: 'Hot Desk & Day Pass Coworking in Kisumu',
    metaTitle: 'Hot Desk in Kisumu | Flexible Coworking Day Pass | Paper Street',
    metaDescription:
      'Hot desk in Kisumu — flexible day pass and monthly coworking at Paper Street Kisumu CBD. Enterprise Wi-Fi, generator backup. Walk in from KES 1,000/day.',
    targetKeywords: [
      'hot desk Kisumu',
      'hot desk in Kisumu',
      'hot desk Kisumu CBD',
      'coworking day pass Kisumu',
      'desk for a day Kisumu',
      'workspace for a day Kisumu',
      'daily coworking Kisumu',
    ],
    eyebrow: 'Flexible Daily & Monthly Desks · Kisumu CBD',
    heroHeading: 'Flexible Hot Desks & Day Passes in Kisumu.',
    heroSubtitle:
      'Drop in, connect to fast fibre Wi-Fi, and get straight to work. No long-term contracts, no setup fees.',
    heroImage: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1600&auto=format&q=80',
    primaryCtaText: 'Get a Day Pass (From KES 1,000)',
    primaryCtaHref: '/services/hot-desk',
    secondaryCtaText: 'View Monthly Passes',
    secondaryCtaHref: '/pricing',
    startingPrice: 'From KES 1,000',
    priceLabel: 'Single Day Pass',
    keyStats: [
      { value: 'From KES 1,000', label: 'Per Day' },
      { value: 'Instant', label: 'Walk-in Setup' },
      { value: '100%', label: 'Power Uptime' },
      { value: 'AC', label: 'Air Conditioned' },
    ],
    overviewTitle: 'A Professional Desk for a Day in Kisumu Town',
    overviewContent: [
      'Need a quiet, professional place to work in Kisumu for today? Whether you are visiting from Nairobi, between client meetings, or escaping a power blackout at home, Paper Street offers instant walk-in hot desking.',
      'Located in a commercial building on Oginga Odinga Street in Kisumu CBD, you get a clean desk, ergonomic chair, power socket, superfast internet, and generator backup.',
    ],
    features: [
      { title: 'Plug & Play Access', desc: 'Arrive, choose any open flexible desk, plug in, and start working immediately.' },
      { title: 'Dedicated Power Sockets', desc: 'Multiple grounded power points at each desk so your laptop and phone stay charged.' },
      { title: 'Quiet Work Environment', desc: 'Focus-friendly atmosphere without the background chatter and blender noise of cafes.' },
      { title: 'Climate Controlled', desc: 'Air-conditioned workspace designed for comfortable working throughout the day.' },
    ],
    pricingPackages: [
      {
        name: 'Single Day Pass',
        price: 'From KES 1,000',
        period: '/ day',
        description: 'Drop in for a productive full day.',
        features: ['Full day access (8am – 6pm)', 'Fast fibre Wi-Fi', 'Generator power backup', 'Power sockets at desk'],
        ctaText: 'Drop In Today',
        ctaHref: '/services/hot-desk',
      },
      {
        name: 'Weekly 5-Day Pass',
        price: 'From KES 4,500',
        period: '/ week',
        popular: true,
        description: 'Great for weekly business trips or intense work sprints.',
        features: ['5 consecutive days access', 'Priority desk seating', 'Fast fibre Wi-Fi', 'Generator backup'],
        ctaText: 'Get Weekly Pass',
        ctaHref: '/services/hot-desk',
      },
      {
        name: 'Monthly Hot Desk',
        price: 'From KES 12,000',
        period: '/ month',
        description: 'Full monthly flexible desk access.',
        features: ['Unlimited monthly access', 'Meeting room credits', 'Parcel reception', 'Fibre Wi-Fi & LAN'],
        ctaText: 'Get Monthly Hot Desk',
        ctaHref: '/services/hot-desk',
      },
    ],
    faqs: [
      {
        q: 'What is the difference between a hot desk and a dedicated desk?',
        a: 'A hot desk allows you to pick any available desk on the coworking floor each day you work. A dedicated desk is permanently assigned exclusively to you with a lockable storage pedestal and an official registered business address.',
      },
      {
        q: 'Do I need to book my day pass in advance or can I walk in?',
        a: 'You can walk in directly during business hours (8:00 AM to 6:00 PM) without prior booking, or purchase online in advance for instant check-in.',
      },
      {
        q: 'What is included in the KES 1,000 Day Pass?',
        a: 'Your day pass includes full business day access to the air-conditioned coworking floor, high-speed dual-carrier fibre Wi-Fi, continuous generator power backup, power sockets at your desk, and front-desk assistance.',
      },
      {
        q: 'Can I take video calls from a hot desk?',
        a: 'Yes, routine calls using headphones are permitted on the coworking floor. For confidential client meetings or extended strategy sessions, private meeting rooms can be booked by the hour.',
      },
      {
        q: 'How fast and stable is the Wi-Fi?',
        a: 'We provide symmetrical enterprise fibre optic internet backed by secondary failover lines, engineered to maintain low latency for HD Zoom, Teams, and Google Meet video calls.',
      },
      {
        q: 'Can I leave my equipment overnight on a hot desk?',
        a: 'Hot desks are cleared at the end of each business day. If you need to leave dual monitors, documents, or accessories set up overnight, we recommend upgrading to a Dedicated Desk.',
      },
      {
        q: 'What payment options do you accept for day passes and monthly desks?',
        a: 'We accept M-Pesa, major credit/debit cards (Visa, Mastercard), and direct bank transfers.',
      },
    ],
  },

  'private-offices-kisumu': {
    slug: 'private-offices-kisumu',
    title: 'Private Offices for Rent in Kisumu',
    metaTitle: 'Private Office in Kisumu | Furnished Serviced Offices | Paper Street',
    metaDescription:
      'Private offices for rent in Kisumu — fully furnished, lockable, all-inclusive serviced offices in Kisumu CBD. 1-person to team suites. No deposit. From KES 28,000/month.',
    targetKeywords: [
      'private office Kisumu',
      'private office for rent Kisumu',
      'private office space Kisumu',
      'furnished office Kisumu',
      'serviced office Kisumu',
      'small private office Kisumu',
      'executive office Kisumu',
    ],
    eyebrow: 'Furnished & Serviced Private Suites · Kisumu CBD',
    heroHeading: 'Private Offices for Rent in Kisumu CBD.',
    heroSubtitle:
      'Fully furnished, lockable private team suites in a commercial building on Oginga Odinga Street. All utilities, internet, generator backup, and reception included.',
    heroImage: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=1600&auto=format&q=80',
    primaryCtaText: 'Inquire About Private Offices',
    primaryCtaHref: '/contact',
    secondaryCtaText: 'Explore Office Sizes',
    secondaryCtaHref: '#pricing',
    startingPrice: 'From KES 35,000',
    priceLabel: 'Private Suites Starting From',
    keyStats: [
      { value: '1–10 Pax', label: 'Suite Capacities' },
      { value: '100% Lockable', label: 'Secure Privacy' },
      { value: 'Turnkey', label: 'Furnished & Ready' },
      { value: 'All-Inclusive', label: 'One Monthly Invoice' },
    ],
    overviewTitle: 'Turnkey Serviced Private Offices in Kisumu',
    overviewContent: [
      'For expanding companies, legal advocates, financial consultancies, and NGOs that require confidential and secure office space, Paper Street provides lockable private office suites.',
      'Avoid the hassle of buying office furniture, installing partitions, contracting internet providers, and managing utility bills. Our private offices come fully furnished with commercial desks, ergonomic chairs, dedicated power, and high-speed fibre.',
    ],
    features: [
      { title: 'Lockable & Fully Secure', desc: 'Private keycard/lock access ensuring total security for your equipment and documents.' },
      { title: 'Commercial CBD Address', desc: 'Registered office address on Oginga Odinga Street for your company registration and banking.' },
      { title: 'All Utilities Included', desc: 'Electricity, automatic standby generator, fibre internet, and daily cleaning on one bill.' },
      { title: 'Boardroom Hours Included', desc: 'Monthly boardroom credits to host clients and conduct team reviews.' },
    ],
    pricingPackages: [
      {
        name: '1–2 Person Private Suite',
        price: 'From KES 35,000',
        period: '/ month',
        description: 'Ideal for solo practitioners, legal advocates, and senior consultants.',
        features: ['Lockable private room', '2 ergonomic workstations', 'High-speed fibre internet', 'CBD business address', 'Meeting room credits'],
        ctaText: 'Schedule a Tour',
        ctaHref: '/contact',
      },
      {
        name: '3–5 Person Team Office',
        price: 'From KES 65,000',
        period: '/ month',
        popular: true,
        description: 'Custom team suite for startups, regional agencies, and project teams.',
        features: ['Spacious team room', '3–5 workstations & storage', 'Generator backup included', 'Mail & parcel handling', '10 hours meeting room credit'],
        ctaText: 'Schedule a Tour',
        ctaHref: '/contact',
      },
      {
        name: '6–10 Person Satellite Office',
        price: 'Custom Quote',
        period: '/ month',
        description: 'Corporate satellite branch for expanding national enterprises.',
        features: ['Large dedicated layout', 'Priority meeting room access', 'Dedicated network setup', 'Front-desk concierge'],
        ctaText: 'Request Custom Proposal',
        ctaHref: '/contact',
      },
    ],
    faqs: [
      {
        q: 'What office sizes and team capacities are available in Kisumu CBD?',
        a: 'We offer private lockable suites ranging from 1 to 2 person solo executive offices to 3 to 5 person team suites and 6 to 10 person regional corporate satellite offices.',
      },
      {
        q: 'What is included in the private office monthly rental rate?',
        a: 'The monthly fee is all-inclusive: commercial desks, ergonomic mesh chairs, high-speed fibre internet, automatic generator backup, electricity, water, daily cleaning, reception services, and boardroom credits.',
      },
      {
        q: 'Do I need to pay a 3 to 6 month security deposit?',
        a: 'Zero security deposit applies to annual upfront plans. For monthly rolling terms, a standard two-month refundable security deposit applies upon onboarding, avoiding the 6-month lock-in and legal fees of traditional commercial leases.',
      },
      {
        q: 'How quickly can our team move into a private office?',
        a: 'Our suites are turnkey and fully furnished. You can complete verification and move in within 24 hours with internet and power running immediately.',
      },
      {
        q: 'Can we use the address for company registration with BRS on eCitizen?',
        a: 'Yes. Every private office membership includes an official commercial registered address on Oginga Odinga Street compliant with BRS company registration and KRA PIN records.',
      },
      {
        q: 'Can we brand our private office door with our company name and logo?',
        a: 'Yes, long-term private office members can display custom company signage at their suite entrance.',
      },
      {
        q: 'What are the access hours for private office members?',
        a: 'Private office members receive secure keycard access allowing flexible working during extended business hours and weekends.',
      },
    ],
  },

  'office-space-kisumu': {
    slug: 'office-space-kisumu',
    title: 'Office Space for Rent in Kisumu',
    metaTitle: 'Office Space for Rent in Kisumu | Furnished & Serviced | Paper Street',
    metaDescription:
      'Find furnished and serviced office space for rent in Kisumu CBD. Move-in ready private offices and flexible workspaces with internet and generator backup.',
    targetKeywords: [
      'office space Kisumu',
      'office space for rent Kisumu',
      'office rental Kisumu',
      'affordable office space Kisumu',
      'furnished office space Kisumu',
      'serviced office Kisumu',
      'office for rent Kisumu CBD',
    ],
    eyebrow: 'Commercial Office Space · Kisumu CBD Commercial Center',
    heroHeading: 'Office Space for Rent in Kisumu.',
    heroSubtitle:
      'Set up your business in Kisumu CBD without the expensive fit-out costs and long-term lease traps of traditional commercial rentals.',
    heroImage: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1600&auto=format&q=80',
    primaryCtaText: 'View Available Spaces',
    primaryCtaHref: '/pricing',
    secondaryCtaText: 'Contact Office Manager',
    secondaryCtaHref: '/contact',
    startingPrice: 'From KES 12,000',
    priceLabel: 'Flexible Office Options From',
    keyStats: [
      { value: 'CBD Center', label: 'Prime Location' },
      { value: 'Zero', label: 'Fit-out Expenses' },
      { value: 'Immediate', label: 'Move-in Ready' },
      { value: 'All-in-One', label: 'Managed Facility' },
    ],
    overviewTitle: 'A Smarter Way to Rent Office Space in Kisumu Town',
    overviewContent: [
      'Renting conventional commercial office space in Kisumu often requires 3–6 months deposit, legal fees, partitioning expenses, painting, furnishing, and sourcing your own generator and internet contracts.',
      'Paper Street eliminates these upfront capital barriers. Located in a commercial building on Oginga Odinga Street, we provide turnkey flexible office space with enterprise infrastructure ready on day one.',
    ],
    features: [
      { title: 'Prime Commercial Building', desc: 'Prestigious address at Kisumu CBD Commercial Center on Oginga Odinga Street.' },
      { title: 'Zero Capital Expenditure', desc: 'No fit-out construction, partition expenses, or furniture buying required.' },
      { title: 'Complete Power & Data Infrastructure', desc: 'Dual-carrier high-speed fibre and automatic generator backup built-in.' },
      { title: 'On-Demand Meeting Facilities', desc: 'Enclosed meeting rooms and boardrooms available when you need them.' },
    ],
    pricingPackages: [
      {
        name: 'Virtual Office Presence',
        price: 'From KES 3,500',
        period: '/ month',
        description: 'Official CBD address and mail handling without physical desks.',
        features: ['BRS & KRA registered address', 'Mail receipt & scanning', 'Meeting room discounts'],
        ctaText: 'Get Business Address',
        ctaHref: '/services/business-address',
      },
      {
        name: 'Coworking Desk Space',
        price: 'From KES 12,000',
        period: '/ month',
        popular: true,
        description: 'Flexible shared office space for 1 to 3 team members.',
        features: ['Full month access', 'High-speed fibre & power backup', 'Reception & mail handling', 'Daily cleaning included'],
        ctaText: 'Choose Desk Space',
        ctaHref: '/services/hot-desk',
      },
      {
        name: 'Serviced Private Office',
        price: 'From KES 35,000',
        period: '/ month',
        description: 'Enclosed private office for teams needing dedicated space.',
        features: ['Lockable private suite', 'Fully furnished', 'Boardroom credits', 'All utilities included'],
        ctaText: 'Inquire Private Office',
        ctaHref: '/contact',
      },
    ],
    faqs: [
      {
        q: 'How does serviced office space compare to leasing a bare commercial unit in Kisumu?',
        a: 'A bare lease requires you to pay 3 to 6 months deposit, legal fees, drywall partitioning, furniture purchases, individual internet contracts, and generator setups. Paper Street provides a turnkey office on Oginga Odinga Street with all utilities bundled into a single predictable monthly fee.',
      },
      {
        q: 'What types of office space can I rent at Paper Street?',
        a: 'We offer single-day hot desks (KES 1,000/day), dedicated reserved desks (KES 16,500/month), lockable private suites (from KES 35,000/month), and virtual office addresses (KES 3,500/month).',
      },
      {
        q: 'Are internet and electricity included in the office rent?',
        a: 'Yes. Dual-carrier symmetrical fibre, electricity, 100% generator power backup, air conditioning, and daily cleaning are included in all workspace plans.',
      },
      {
        q: 'Can non-members book meeting rooms in the building?',
        a: 'Yes, external organizations and non-members can book our private meeting rooms and boardrooms by the hour or day.',
      },
      {
        q: 'Where on Oginga Odinga Street is the facility located?',
        a: 'We are situated at the Kisumu CBD Commercial Center on Oginga Odinga Street, conveniently close to major banks, government registries, and legal chambers.',
      },
    ],
  },

  'meeting-rooms-kisumu': {
    slug: 'meeting-rooms-kisumu',
    title: 'Meeting Rooms for Hire in Kisumu',
    metaTitle: 'Meeting Rooms in Kisumu | 4-6 Pax Meeting Space | Paper Street',
    metaDescription:
      'Private 4 to 6 pax meeting rooms for hire in Kisumu CBD. Hourly and daily rates for small teams, client meetings, interviews, and video conferences with 4K screen.',
    targetKeywords: [
      'meeting room Kisumu',
      'meeting rooms Kisumu',
      'meeting room for hire Kisumu',
      'meeting room for rent Kisumu',
      'meeting space Kisumu',
      'business meeting room Kisumu',
      'meeting room Kisumu CBD',
    ],
    eyebrow: 'Private 4 to 6 Pax Meeting Suites · Kisumu CBD',
    heroHeading: 'Meeting Rooms for Hire in Kisumu.',
    heroSubtitle:
      'Private, professional 4 to 6 person meeting rooms equipped with 4K presentation screens, video conferencing capability, high-speed Wi-Fi, and reception service. Book by the hour.',
    heroImage: 'https://images.unsplash.com/photo-1562575214-da9fcf59b907?w=1600&auto=format&q=80',
    primaryCtaText: 'Book a Meeting Room',
    primaryCtaHref: '/services/meeting-rooms',
    secondaryCtaText: 'View Room Options',
    secondaryCtaHref: '#pricing',
    startingPrice: 'From KES 1,500',
    priceLabel: 'Hourly Rate From',
    keyStats: [
      { value: '4 to 6 Pax', label: 'Room Capacity' },
      { value: 'Hourly', label: 'Flexible Booking' },
      { value: '4K Screen', label: 'Plug & Play' },
      { value: 'Front Desk', label: 'Guest Greeting' },
    ],
    overviewTitle: 'Professional Client Meeting Spaces in Kisumu CBD',
    overviewContent: [
      'Hosting client discussions in public venues can compromise your privacy and professional presentation.',
      'Paper Street offers dedicated, air-conditioned 4 to 6 person meeting rooms in our commercial building on Oginga Odinga Street, complete with 4K presentation displays, conference audio, fast Wi-Fi, and reception support.',
    ],
    features: [
      { title: '4K Presentation Display Screen', desc: 'Connect your laptop via HDMI or wireless screen share for presentations and spreadsheets.' },
      { title: 'Acoustic Privacy', desc: 'Sound-insulated walls ensure confidential legal and financial discussions remain private.' },
      { title: 'High-Speed Wi-Fi & Generator', desc: 'Uninterrupted internet connection for remote video participants on Zoom or Teams.' },
      { title: 'Guest Reception & Greeting', desc: 'Front-desk staff welcome your guests professionally upon arrival.' },
    ],
    pricingPackages: [
      {
        name: 'Hourly Meeting Room (4 to 6 Pax)',
        price: 'From KES 1,500',
        period: '/ hour',
        description: 'Ideal for client interviews, legal consultations, and team pitches.',
        features: ['4 to 6 person capacity', '4K presentation monitor', 'High-speed Wi-Fi', 'Reception greeting'],
        ctaText: 'Book Meeting Room',
        ctaHref: '/services/meeting-rooms',
      },
      {
        name: 'Half-Day Meeting Package',
        price: 'From KES 5,000',
        period: '/ 4 hours',
        popular: true,
        description: '4-hour reserved block for partner discussions and workshops.',
        features: ['4 hours reserved access', '4 to 6 pax executive setup', 'Whiteboard & markers', 'Reception guest greeting'],
        ctaText: 'Book Half-Day',
        ctaHref: '/services/meeting-rooms',
      },
      {
        name: 'Full Day Meeting Package',
        price: 'From KES 8,000',
        period: '/ full day',
        description: 'Full-day booking for strategic reviews and project audits.',
        features: ['Full day usage (8am to 6pm)', 'Priority front-desk support', 'Presentation facilities', 'High-speed Wi-Fi & backup power'],
        ctaText: 'Reserve Full Day',
        ctaHref: '/services/meeting-rooms',
      },
    ],
    faqs: [
      {
        q: 'How much does it cost to hire a meeting room in Kisumu?',
        a: 'Our 4 to 6 pax Meeting Room starts from KES 1,500 per hour, from KES 5,000 for half-day (4 hours), and from KES 8,000 for full-day (8 hours).',
      },
      {
        q: 'Where can I hire a meeting room in Kisumu?',
        a: 'Paper Street is located at Kisumu CBD Commercial Center on Oginga Odinga Street in Kisumu CBD, within easy walking distance of major banks, law courts, and county registries.',
      },
      {
        q: 'Can I book a meeting room by the hour?',
        a: 'Yes. You can book for a single hour, multiple hours, half-days, or full consecutive days with no minimum full-day commitment.',
      },
      {
        q: 'Do the meeting rooms have Wi-Fi and power backup?',
        a: 'Yes. All meeting rooms include high-speed dual-carrier fibre Wi-Fi and automatic standby generator backup, ensuring uninterrupted video calls during KPLC grid outages.',
      },
      {
        q: 'Can I connect a laptop to a TV screen or presentation display?',
        a: 'Yes. Rooms are equipped with 4K presentation displays supporting direct HDMI plug-in and wireless screen mirroring.',
      },
      {
        q: 'How many people can the meeting rooms accommodate?',
        a: 'Our private meeting suites comfortably seat 4 to 6 people (4-6 pax).',
      },
      {
        q: 'Can non-members use and book the meeting rooms?',
        a: 'Yes. Meeting rooms are open to both members and external corporate clients.',
      },
    ],
  },

  'conference-room-kisumu': {
    slug: 'conference-room-kisumu',
    title: 'Conference & Meeting Rooms in Kisumu',
    metaTitle: 'Conference Room in Kisumu | 4-6 Pax Conference Venue | Paper Street',
    metaDescription:
      'Hire a 4 to 6 pax conference room in Kisumu CBD. Fully equipped for workshops, seminars, and corporate video conferences with 4K screen and generator backup.',
    targetKeywords: [
      'conference room Kisumu',
      'conference room for hire Kisumu',
      'conference venue Kisumu',
      'conference facilities Kisumu',
      'training venue Kisumu',
    ],
    eyebrow: '4 to 6 Pax Conference Facilities · Kisumu CBD',
    heroHeading: 'Conference & Meeting Rooms in Kisumu.',
    heroSubtitle:
      'Professional conference facilities for corporate workshops, team seminars, and NGO reviews in Kisumu CBD on Oginga Odinga Street.',
    heroImage: 'https://images.unsplash.com/photo-1517502884422-41eaead166d4?w=1600&auto=format&q=80',
    primaryCtaText: 'Inquire About Conference Room',
    primaryCtaHref: '/contact',
    secondaryCtaText: 'View Rates',
    secondaryCtaHref: '#pricing',
    startingPrice: 'From KES 1,500',
    priceLabel: 'Hourly Room Hire From',
    keyStats: [
      { value: '4 to 6 Pax', label: 'Room Capacity' },
      { value: '4K Display', label: 'Presentation AV' },
      { value: 'Generator', label: 'Zero Outages' },
      { value: 'Central CBD', label: 'Oginga Odinga St' },
    ],
    overviewTitle: 'Equipped 4 to 6 Pax Meeting & Conference Space in Kisumu',
    overviewContent: [
      'Planning a partner review, NGO seminar, or corporate workshop in Kisumu? Paper Street provides equipped meeting facilities in our commercial building on Oginga Odinga Street.',
      'Our space includes 4K presentation screens, high-speed Wi-Fi for all delegates, and automatic generator backup to prevent blackout delays.',
    ],
    features: [
      { title: '4K Presentation Equipment', desc: 'Large 4K presentation display screens and whiteboards for collaborative reviews.' },
      { title: 'High-Speed Dual Fibre Wi-Fi', desc: 'Bandwidth capacity for multi-user internet exercises and HD video streaming.' },
      { title: 'Standby Power Backup', desc: 'Zero downtime during sessions with automatic commercial generator switchover.' },
      { title: 'Central CBD Location', desc: 'Easy pedestrian and transit access for attending delegates on Oginga Odinga Street.' },
    ],
    pricingPackages: [
      {
        name: 'Hourly Conference Hire',
        price: 'From KES 1,500',
        period: '/ hour',
        description: 'Single-hour booking for executive presentations.',
        features: ['4 to 6 pax capacity', '4K presentation display', 'Enterprise dual fibre Wi-Fi', 'Standby generator backup'],
        ctaText: 'Book by Hour',
        ctaHref: '/contact',
      },
      {
        name: 'Half-Day Conference Block',
        price: 'From KES 5,000',
        period: '/ 4 hours',
        popular: true,
        description: '4-hour block for partner reviews and workshops.',
        features: ['4 hours reserved access', '4 to 6 pax executive setup', 'Magnetic whiteboard & markers', 'Front-desk reception'],
        ctaText: 'Reserve Half-Day',
        ctaHref: '/contact',
      },
    ],
    faqs: [
      {
        q: 'What is the capacity of the conference venue in Kisumu?',
        a: 'The room comfortably seats 4 to 6 participants (4-6 pax).',
      },
      {
        q: 'What presentation technology is provided in the conference room?',
        a: 'The space includes a 4K presentation display with HDMI and wireless casting, and a magnetic whiteboard with markers.',
      },
      {
        q: 'How reliable is the Wi-Fi for multiple attending delegates?',
        a: 'We have dedicated enterprise dual fibre internet load-balanced to handle simultaneous cloud work and HD video conferencing.',
      },
      {
        q: 'What happens if there is a power blackout during our session?',
        a: 'Our automatic standby generator switches on in seconds, ensuring your presentation screens, lighting, air conditioning, and internet continue without interruption.',
      },
    ],
  },

  'boardroom-kisumu': {
    slug: 'boardroom-kisumu',
    title: 'Executive Boardroom for Hire in Kisumu',
    metaTitle: 'Boardroom for Hire in Kisumu | 4-6 Pax Executive Boardroom | Paper Street',
    metaDescription:
      'Executive 4 to 6 pax boardroom for hire in Kisumu CBD. Large 4K presentation screen, video conferencing, and reception on Oginga Odinga Street.',
    targetKeywords: [
      'boardroom Kisumu',
      'boardroom for hire Kisumu',
      'boardroom rental Kisumu',
      'executive meeting room Kisumu',
      'boardroom Kisumu CBD',
    ],
    eyebrow: 'Executive 4 to 6 Pax Boardroom · Kisumu CBD',
    heroHeading: 'Boardroom for Hire in Kisumu.',
    heroSubtitle:
      'Host high-level board meetings, partner presentations, and investor pitches in a modern 4 to 6 person boardroom on Oginga Odinga Street.',
    heroImage: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?w=1600&auto=format&q=80',
    primaryCtaText: 'Reserve Boardroom',
    primaryCtaHref: '/services/meeting-rooms',
    secondaryCtaText: 'View Rates & Details',
    secondaryCtaHref: '#pricing',
    startingPrice: 'From KES 2,500',
    priceLabel: 'Hourly Boardroom Rate',
    keyStats: [
      { value: '4 to 6 Pax', label: 'Executive Seating' },
      { value: '4K Display', label: 'HDMI & Wireless' },
      { value: 'Video Conf', label: 'Zoom/Teams Ready' },
      { value: 'Concierge', label: 'Front-Desk Support' },
    ],
    overviewTitle: 'Executive 4 to 6 Pax Boardroom Experience in Kisumu CBD',
    overviewContent: [
      'First impressions matter when presenting to prospective investors, corporate clients, or board members. Paper Street executive boardroom provides an impressive commercial setting in Kisumu CBD.',
      'Equipped with executive high-back seating, a conference table, 4K presentation screen, and front-desk reception, you can conduct your business meetings with confidence.',
    ],
    features: [
      { title: 'Executive Table & Seating', desc: 'Comfortable executive high-back chairs and solid conference table accommodating 4 to 6 guests.' },
      { title: 'Presentation & Video Tech', desc: '4K display screen with easy laptop connectivity for slide decks and remote video calls.' },
      { title: 'Front-Desk Concierge', desc: 'Our reception team warmly greets your board members and guests upon arrival.' },
      { title: 'Acoustic Privacy', desc: 'Quiet, enclosed room ensuring total confidentiality for board discussions.' },
    ],
    pricingPackages: [
      {
        name: 'Hourly Boardroom Hire',
        price: 'From KES 2,500',
        period: '/ hour',
        description: 'For short executive strategy meetings and client presentations.',
        features: ['Boardroom setup (4 to 6 pax)', '4K presentation screen', 'High-speed dual fibre Wi-Fi', 'Front-desk greeting'],
        ctaText: 'Book by the Hour',
        ctaHref: '/services/meeting-rooms',
      },
      {
        name: 'Half-Day Boardroom Hire (4 Hours)',
        price: 'From KES 9,000',
        period: '/ 4 hours',
        description: 'For morning or afternoon director meetings.',
        features: ['4 hours reserved access', '4 to 6 pax setup', '4K screen & whiteboard', 'Front-desk reception'],
        ctaText: 'Book Half-Day',
        ctaHref: '/services/meeting-rooms',
      },
      {
        name: 'Full Day Boardroom Hire',
        price: 'From KES 15,000',
        period: '/ full day',
        popular: true,
        description: 'For full-day director meetings and quarterly reviews.',
        features: ['Full day access (8am to 6pm)', 'Priority reception support', 'High-speed fibre & power backup', 'Presentation & whiteboard setup'],
        ctaText: 'Book Full Day',
        ctaHref: '/services/meeting-rooms',
      },
    ],
    faqs: [
      {
        q: 'How much does it cost to hire the executive boardroom in Kisumu?',
        a: 'The Executive Boardroom starts from KES 2,500 per hour, from KES 9,000 for a half day (4 hours), and from KES 15,000 for a full day (8 hours), with 4K display and generator backup included.',
      },
      {
        q: 'How many delegates can the boardroom comfortably seat?',
        a: 'The boardroom comfortably seats 4 to 6 delegates (4-6 pax) around the table with executive leather task chairs.',
      },
      {
        q: 'What audio-visual and video conferencing hardware is provided?',
        a: 'The boardroom features a 4K presentation display, HDMI/wireless casting adapters, and a large magnetic whiteboard.',
      },
      {
        q: 'Can we conduct hybrid board meetings with remote directors on Zoom or Teams?',
        a: 'Yes. The boardroom is optimized for hybrid meetings with wide-angle camera framing, clear audio capture, and low-latency fibre internet.',
      },
      {
        q: 'Is there front-desk reception support to receive arriving board members?',
        a: 'Yes. Our professional reception team welcomes your arriving delegates at the building entrance, confirms attendance, and directs them into the boardroom.',
      },
      {
        q: 'Can non-members book the executive boardroom?',
        a: 'Yes, external organizations and non-members can book our boardroom directly online or through our office desk.',
      },
    ],
  },

  'virtual-office-kisumu': {
    slug: 'virtual-office-kisumu',
    title: 'Virtual Office in Kisumu',
    metaTitle: 'Virtual Office Kisumu | Business Address & Mail Services | Paper Street',
    metaDescription:
      'Get a virtual office in Kisumu CBD. Compliant registered business address on Oginga Odinga Street for BRS and KRA, mail handling, and meeting room access.',
    targetKeywords: [
      'virtual office Kisumu',
      'virtual office in Kisumu',
      'virtual office address Kisumu',
      'virtual office services Kisumu',
      'virtual business address Kisumu',
      'virtual office for startups Kisumu',
      'virtual office for freelancers Kisumu',
    ],
    eyebrow: 'Commercial Presence · Kisumu CBD Commercial Center',
    heroHeading: 'Virtual Office in Kisumu.',
    heroSubtitle:
      'A compliant commercial business address on Oginga Odinga Street for company registration, KRA PIN, corporate banking, mail handling, and meeting room access.',
    heroImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600&auto=format&q=80',
    primaryCtaText: 'Activate Virtual Office (From KES 3,500/mo)',
    primaryCtaHref: '/services/virtual-office',
    secondaryCtaText: 'Compare Plans',
    secondaryCtaHref: '#pricing',
    startingPrice: 'From KES 3,500',
    priceLabel: 'Starting From / Month',
    keyStats: [
      { value: '24 Hours', label: 'Setup Time' },
      { value: 'BRS & KRA', label: 'Compliant' },
      { value: 'Mail Scan', label: 'Digital Portal' },
      { value: 'Zero', label: 'Physical Lease' },
    ],
    overviewTitle: 'Complete Virtual Office Presence in Western Kenya',
    overviewContent: [
      'Under the Kenyan Companies Act, every registered company must have a verifiable registered office address. A Paper Street virtual office provides an official commercial address in Kisumu CBD without paying for unused physical desk space.',
      'We receive your statutory mail, KRA letters, and client correspondence, notify you instantly, provide digital mail scans, and give you access to meeting rooms whenever you need to host clients in Kisumu.',
    ],
    features: [
      { title: 'Commercial Registered Address', desc: 'Use our address on eCitizen, BRS company registration, CR12, KRA PIN, and bank accounts.' },
      { title: 'Mail Receipt & Digital Scanning', desc: 'Front-desk staff sign for incoming mail and upload digital scans to your client portal.' },
      { title: 'Mail Forwarding', desc: 'Physical forwarding of important original documents anywhere in Kenya.' },
      { title: 'Meeting Room Access', desc: 'Included monthly credits or member discounts to book meeting rooms in Kisumu CBD.' },
    ],
    pricingPackages: [
      {
        name: 'Business Address Plan',
        price: 'From KES 3,500',
        period: '/ month',
        description: 'Official CBD business address for company registration & banking.',
        features: ['Registered commercial address in Kisumu CBD', 'BRS & KRA compliant address', 'Mail & package receipt', 'Email notifications upon mail arrival'],
        ctaText: 'Get Address Plan',
        ctaHref: '/services/business-address',
      },
      {
        name: 'Virtual Office Professional',
        price: 'From KES 6,500',
        period: '/ month',
        popular: true,
        description: 'Full business identity with mail scanning and meeting hours.',
        features: ['Kisumu CBD business address', 'Digital mail scanning to portal', '2 hours monthly meeting room access', 'Front-desk client greeting', 'Member day pass discounts'],
        ctaText: 'Get Virtual Office',
        ctaHref: '/services/virtual-office',
      },
      {
        name: 'Virtual Office Enterprise',
        price: 'From KES 12,000',
        period: '/ month',
        description: 'Comprehensive business presence with workspace access.',
        features: ['Kisumu CBD business address', 'Unlimited digital mail scanning', 'Mail forwarding coordination', '6 hours monthly meeting room access', '2 monthly coworking day passes'],
        ctaText: 'Get Enterprise Plan',
        ctaHref: '/services/virtual-office',
      },
    ],
    faqs: [
      {
        q: 'Can I use this virtual office address to register my company with BRS on eCitizen?',
        a: 'Yes. Our commercial address at Kisumu CBD Commercial Center on Oginga Odinga Street is fully recognized and accepted by the Business Registration Service (BRS) for company incorporation, CR12 generation, and Annual Returns.',
      },
      {
        q: 'Will commercial banks accept this address for business bank account opening?',
        a: 'Yes. Major Kenyan commercial banks (KCB, Equity, Absa, Stanbic, NCBA) accept our address accompanied by our signed landlord address authorisation letter during mandatory KYC verification.',
      },
      {
        q: 'How do I receive my physical mail and official letters if I am not in Kisumu?',
        a: 'Our front-desk team signs for incoming letters, logs them into your account, and sends you an email alert with high-resolution digital scans. We can also courier physical original documents anywhere in Kenya upon request.',
      },
      {
        q: 'Does the virtual office plan include access to meeting rooms in Kisumu?',
        a: 'Yes. The Virtual Office Professional plan includes 2 hours of monthly meeting room credits, while the Enterprise plan includes 6 hours per month. Additional hours are available at discounted member rates.',
      },
      {
        q: 'How fast can my virtual office be activated?',
        a: 'Once you submit your basic verification details and complete payment, your official address authorisation letter is issued within 24 hours.',
      },
      {
        q: 'What is the minimum contract term for a virtual office in Kisumu?',
        a: 'We offer flexible month-to-month, quarterly, and annual billing terms, with discounts available for annual commitments.',
      },
    ],
  },

  'business-address-kisumu': {
    slug: 'business-address-kisumu',
    title: 'Professional Business Address in Kisumu',
    metaTitle: 'Business Address in Kisumu | Professional Virtual Address | Paper Street',
    metaDescription:
      'Rent a professional business address in Kisumu CBD. Accepted by BRS for company registration, KRA PIN, and commercial banks with mail handling from KES 3,500/mo.',
    targetKeywords: [
      'business address Kisumu',
      'professional business address Kisumu',
      'business address for rent Kisumu',
      'registered business address Kisumu',
      'virtual business address Kisumu',
      'company address Kisumu',
    ],
    eyebrow: 'Corporate Address · Oginga Odinga Street, Kisumu CBD',
    heroHeading: 'Professional Business Address in Kisumu.',
    heroSubtitle:
      'Give your company instant credibility with a recognized commercial building address on Oginga Odinga Street for company registration, tax compliance, and client trust.',
    heroImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600&auto=format&q=80',
    primaryCtaText: 'Get Business Address (From KES 3,500/mo)',
    primaryCtaHref: '/services/business-address',
    secondaryCtaText: 'View Address Features',
    secondaryCtaHref: '#pricing',
    startingPrice: 'From KES 3,500',
    priceLabel: 'Monthly Fee',
    keyStats: [
      { value: 'CBD Location', label: 'Oginga Odinga St' },
      { value: 'BRS / KRA', label: 'Approved' },
      { value: 'Instant', label: '24hr Activation' },
      { value: 'Mail Care', label: 'Safe Receipt' },
    ],
    overviewTitle: 'Why Your Business Needs a Commercial Address in Kisumu',
    overviewContent: [
      'Using a residential address or PO Box on official business proposals and invoices can diminish your company’s professional image during supplier vetting or bank account opening.',
      'A Paper Street business address at the Kisumu CBD Commercial Center provides a verifiable commercial location on your official documents, with professional front-desk staff to handle all incoming mail.',
    ],
    features: [
      { title: 'Official Registered Office', desc: 'Valid for eCitizen BRS company registration, CR12, and KRA PIN certificates.' },
      { title: 'Bank Account Vetting', desc: 'Accepted by major commercial banks during corporate KYC address verification.' },
      { title: 'Mail & Parcel Receipt', desc: 'Our front desk receives and safely stores all incoming correspondence.' },
      { title: 'Digital Notifications', desc: 'Receive instant email and portal alerts whenever new mail arrives.' },
    ],
    pricingPackages: [
      {
        name: 'Standard Business Address',
        price: 'From KES 3,500',
        period: '/ month',
        popular: true,
        description: 'Compliant registered commercial address for SMEs and startups.',
        features: ['Prestigious Kisumu CBD address', 'Use on website, invoices & registry', 'Mail receipt and email alerts', '30-day physical mail storage'],
        ctaText: 'Activate Address',
        ctaHref: '/services/business-address',
      },
      {
        name: 'Address + Mail Scanning',
        price: 'From KES 5,500',
        period: '/ month',
        description: 'Complete digital mail management for remote business owners.',
        features: ['Prestigious Kisumu CBD address', 'Digital scanning of all incoming mail', 'Secure portal archive', 'Discounted meeting room rates'],
        ctaText: 'Get Address + Scan',
        ctaHref: '/services/business-address',
      },
    ],
    faqs: [
      {
        q: 'Why do I need a commercial registered address instead of a PO Box in Kenya?',
        a: 'The Kenyan Companies Act 2015 requires a verifiable physical building and street location for company incorporation. Additionally, commercial banks reject pure PO Box addresses during mandatory KYC vetting.',
      },
      {
        q: 'Is the business address compliant with KRA PIN registration?',
        a: 'Yes, our commercial address at Kisumu CBD Commercial Center on Oginga Odinga Street satisfies all KRA tax registration and PIN certificate requirements.',
      },
      {
        q: 'Can I put this address on my business website, invoices, and contracts?',
        a: 'Yes. Subscribing to our Business Address plan grants you the full commercial right to display the address on your official marketing materials, contracts, and proposals.',
      },
      {
        q: 'What happens when a statutory notice, court document, or courier parcel arrives?',
        a: 'Our front-desk reception logs the item in our secure system, safely stores it, and immediately notifies you via email.',
      },
      {
        q: 'Can I upgrade from a Business Address to a physical desk or private office later?',
        a: 'Yes. You can transition seamlessly to a hot desk, dedicated desk, or private office suite anytime your operational needs expand without changing your registered business address.',
      },
    ],
  },

  'remote-work-kisumu': {
    slug: 'remote-work-kisumu',
    title: 'Workspace for Remote Workers in Kisumu',
    metaTitle: 'Where to Work Remotely in Kisumu | Remote Work Coworking Space | Paper Street',
    metaDescription:
      'Discover the best place for remote work in Kisumu. High-speed fibre internet, automatic generator backup, and quiet focus desks at Paper Street Kisumu CBD.',
    targetKeywords: [
      'where to work remotely in Kisumu',
      'best place for remote work Kisumu',
      'workspace for remote workers Kisumu',
    ],
    eyebrow: 'Productive Remote Work Hub · Kisumu CBD',
    heroHeading: 'Where to Work Remotely in Kisumu.',
    heroSubtitle:
      'The dedicated remote workspace for software developers, remote employees, and distributed teams in Kisumu CBD with 100% power and internet reliability.',
    heroImage: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1600&auto=format&q=80',
    primaryCtaText: 'Get a Day Pass (From KES 1,000)',
    primaryCtaHref: '/services/hot-desk',
    secondaryCtaText: 'View Monthly Desks',
    secondaryCtaHref: '/pricing',
    startingPrice: 'From KES 1,000',
    priceLabel: 'Day Pass Rate',
    keyStats: [
      { value: '100 Mbps', label: 'Fibre Wi-Fi' },
      { value: '100%', label: 'Generator Backup' },
      { value: 'Quiet', label: 'Focus Space' },
      { value: 'Ergonomic', label: 'Task Chairs' },
    ],
    overviewTitle: 'Escape Home Distractions & Power Blackouts in Kisumu',
    overviewContent: [
      'Remote work in Kisumu offers great lifestyle benefits, but power blackouts and unstable home internet can disrupt your workflow and live video calls.',
      'Paper Street provides a dedicated commercial workspace in Kisumu CBD where you can work with zero interruptions, fast fibre internet, automatic generator backup, and comfortable ergonomic seating.',
    ],
    features: [
      { title: 'Zero Blackout Downtime', desc: 'Standby generator ensures you never drop an international video call or lose unsaved code.' },
      { title: 'High-Speed Fibre Internet', desc: 'Low-latency symmetrical fibre connection for seamless video calls, git pushes, and cloud work.' },
      { title: 'Quiet Professional Environment', desc: 'Focus-friendly atmosphere without barking dogs, domestic noise, or cafe chatter.' },
      { title: 'Ergonomic Desk Setups', desc: 'Comfortable mesh chairs and spacious desks designed for full workdays.' },
    ],
    pricingPackages: [
      {
        name: 'Remote Worker Day Pass',
        price: 'From KES 1,000',
        period: '/ day',
        description: 'Drop in whenever you need a distraction-free work day.',
        features: ['Full day access (8am – 6pm)', 'Fast fibre Wi-Fi', 'Generator backup', 'Power socket at desk'],
        ctaText: 'Book Day Pass',
        ctaHref: '/services/hot-desk',
      },
      {
        name: 'Monthly Dedicated Remote Desk',
        price: 'From KES 16,500',
        period: '/ month',
        popular: true,
        description: 'Your permanent workspace base in Kisumu CBD.',
        features: ['Permanent reserved desk', 'Lockable storage', 'High-speed Wi-Fi & LAN', 'Meeting room credits'],
        ctaText: 'Get Dedicated Desk',
        ctaHref: '/services/dedicated-desk',
      },
    ],
    faqs: [
      {
        q: 'Is the internet fast and stable enough for international remote video meetings?',
        a: 'Yes, we provide enterprise dual-carrier symmetrical fibre internet designed specifically for high-definition video calls on Zoom, Teams, and Google Meet, with low ping to global cloud servers.',
      },
      {
        q: 'What happens when power cuts happen in Kisumu?',
        a: 'Our automatic standby generator engages instantly upon grid failure, keeping the Wi-Fi routers, workstation sockets, and air conditioning completely active without interruption.',
      },
      {
        q: 'Can I take daily standup calls and sprint reviews from the workspace?',
        a: 'Yes, routine calls with headphones are welcome in the shared areas, and private phone booths or meeting rooms are available for confidential discussions.',
      },
      {
        q: 'What are the daily and monthly pricing options for remote workers?',
        a: 'We offer walk-in Day Passes at KES 1,000, Weekly 5-Day Passes at KES 4,500, Monthly Hot Desks at KES 12,000, and Dedicated Desks at KES 16,500.',
      },
      {
        q: 'Are ergonomic chairs and multi-plug sockets available at every desk?',
        a: 'Yes, all desks are equipped with breathable mesh ergonomic task chairs and multiple grounded power sockets for laptops and smartphones.',
      },
    ],
  },

  'freelancers-kisumu': {
    slug: 'freelancers-kisumu',
    title: 'Coworking Space for Freelancers in Kisumu',
    metaTitle: 'Coworking Space for Freelancers in Kisumu | Affordable Desks | Paper Street',
    metaDescription:
      'The top coworking space for freelancers and independent consultants in Kisumu. Flexible day passes, quiet desks, fast Wi-Fi, generator backup, and meeting rooms.',
    targetKeywords: [
      'workspace for freelancers Kisumu',
      'coworking space for freelancers Kisumu',
      'coworking space for entrepreneurs Kisumu',
    ],
    eyebrow: 'Freelance & Consultant Workspace · Kisumu CBD',
    heroHeading: 'Workspace for Freelancers & Entrepreneurs in Kisumu.',
    heroSubtitle:
      'Boost your freelance productivity and client credibility with a professional workspace in Kisumu CBD. Fast Wi-Fi, generator backup, and meeting rooms.',
    heroImage: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1600&auto=format&q=80',
    primaryCtaText: 'Get a Freelancer Day Pass',
    primaryCtaHref: '/services/hot-desk',
    secondaryCtaText: 'View Monthly Plans',
    secondaryCtaHref: '/pricing',
    startingPrice: 'From KES 1,000',
    priceLabel: 'Day Pass From',
    keyStats: [
      { value: 'From KES 1,000', label: 'Day Pass' },
      { value: 'Fibre Wi-Fi', label: 'High Speed' },
      { value: 'Generator', label: 'Backup Power' },
      { value: 'Meeting Room', label: 'Client Pitches' },
    ],
    overviewTitle: 'Take Your Freelance Business to the Next Level',
    overviewContent: [
      'Working from home as a freelancer in Kisumu often means struggling with domestic distractions and power cuts. Meeting corporate clients in noisy venues can also hurt your ability to charge premium rates.',
      'At Paper Street Kisumu CBD, you get a clean desk, reliable power, fast internet, and access to private meeting rooms to present proposals to your clients with confidence.',
    ],
    features: [
      { title: 'Affordable Drop-In Passes', desc: 'Day passes at KES 1,000 and flexible monthly options that fit your project cash flow.' },
      { title: 'Uninterrupted Power & Internet', desc: 'Automatic generator backup and fibre internet so you never miss a client deadline.' },
      { title: 'Meeting Rooms for Client Pitches', desc: 'Private meeting rooms to present work and close deals professionally.' },
      { title: 'Official Invoicing Address', desc: 'Option to use our CBD address on your proposals and business invoices.' },
    ],
    pricingPackages: [
      {
        name: 'Freelancer Day Pass',
        price: 'From KES 1,000',
        period: '/ day',
        description: 'Drop-in for a full day of deep focus.',
        features: ['Full day access', 'Fast fibre Wi-Fi', 'Generator backup', 'Quiet work area'],
        ctaText: 'Get Day Pass',
        ctaHref: '/services/hot-desk',
      },
      {
        name: 'Monthly Hot Desk',
        price: 'From KES 12,000',
        period: '/ month',
        popular: true,
        description: 'Full monthly flexible desk access.',
        features: ['Unlimited monthly desk access', 'Meeting room credits', 'Fibre Wi-Fi & LAN', 'Front-desk parcel receipt'],
        ctaText: 'Join Hot Desk',
        ctaHref: '/services/hot-desk',
      },
    ],
    faqs: [
      {
        q: 'Can I book a meeting room to meet a prospective client?',
        a: 'Yes, meeting rooms and boardrooms can be booked by the hour at member-discounted rates to present proposals professionally.',
      },
      {
        q: 'How does coworking help me justify higher freelance rates?',
        a: 'Inviting corporate clients to a dedicated commercial building on Oginga Odinga Street with front-desk reception and presentation screens creates immediate credibility compared to meeting in noisy public cafes.',
      },
      {
        q: 'Do I have to commit to a long monthly contract?',
        a: 'No. You can use daily drop-in passes (From KES 1,000) or weekly passes (From KES 4,500) based on your current project workload.',
      },
      {
        q: 'Can I use the Paper Street address on my client proposals and invoices?',
        a: 'Yes. Monthly dedicated desk and virtual office members receive full rights to use our commercial address at Kisumu CBD Commercial Center on their proposals and invoices.',
      },
    ],
  },

  'startups-kisumu': {
    slug: 'startups-kisumu',
    title: 'Coworking & Office Space for Startups in Kisumu',
    metaTitle: 'Coworking Space for Startups in Kisumu | Startup Office Space Kisumu CBD | Paper Street',
    metaDescription:
      'Affordable coworking and office space for startups in Kisumu. Preserve your runway with flexible team desks, fast fibre internet, generator backup, and CBD registered address.',
    targetKeywords: [
      'coworking space for startups Kisumu',
      'office space for startups Kisumu',
      'virtual office for startups Kisumu',
    ],
    eyebrow: 'Startup Hub & Office Suites · Kisumu CBD',
    heroHeading: 'Coworking & Office Space for Startups in Kisumu.',
    heroSubtitle:
      'Preserve capital runway and scale your startup with flexible team desks, commercial registered office addresses, and boardroom access in Kisumu CBD.',
    heroImage: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1600&auto=format&q=80',
    primaryCtaText: 'Explore Startup Desks',
    primaryCtaHref: '/services/dedicated-desk',
    secondaryCtaText: 'Virtual Office for Startups',
    secondaryCtaHref: '/services/virtual-office',
    startingPrice: 'From KES 3,500',
    priceLabel: 'Startup Plans From',
    keyStats: [
      { value: 'Zero CapEx', label: 'No Fit-Out Costs' },
      { value: 'BRS Address', label: 'Incorporation Ready' },
      { value: 'Team Desks', label: 'Scalable' },
      { value: '100% Uptime', label: 'Power & Internet' },
    ],
    overviewTitle: 'Build and Scale Your Startup in Western Kenya',
    overviewContent: [
      'Early-stage startups in Kisumu need to preserve cash for product development and user growth rather than locking money into long commercial leases and office fit-outs.',
      'Paper Street provides the operational backbone for startups: flexible team desks, legal registered office addresses for eCitizen BRS incorporation, enterprise fibre internet, and boardrooms to pitch to partners and investors.',
    ],
    features: [
      { title: 'Zero Upfront Fit-Out Costs', desc: 'Plug and play desks and private suites ready immediately for your team.' },
      { title: 'Official Registered Office for BRS', desc: 'Meet statutory requirements for private limited company incorporation on eCitizen.' },
      { title: 'Scalable Team Seating', desc: 'Start with 2 desks and scale up as you hire developers and sales personnel.' },
      { title: 'Boardroom for Investor Pitches', desc: 'Present to advisors, partners, and investors in a professional boardroom.' },
    ],
    pricingPackages: [
      {
        name: 'Startup Virtual Office',
        price: 'From KES 3,500',
        period: '/ month',
        description: 'BRS registered address and mail handling for remote startups.',
        features: ['Kisumu CBD registered address', 'BRS & KRA compliance', 'Mail receipt & scanning', 'Boardroom access discounts'],
        ctaText: 'Get Virtual Office',
        ctaHref: '/services/virtual-office',
      },
      {
        name: 'Dedicated Team Workstations',
        price: 'From KES 16,500',
        period: '/ desk / month',
        popular: true,
        description: 'Reserved dedicated desks for your on-site startup team.',
        features: ['Permanent reserved desks', 'High-speed fibre Wi-Fi & LAN', 'Generator power backup', 'Meeting room credits'],
        ctaText: 'Reserve Team Desks',
        ctaHref: '/services/dedicated-desk',
      },
      {
        name: 'Private Startup Suite',
        price: 'From KES 35,000',
        period: '/ month',
        description: 'Enclosed private office for confidential team work.',
        features: ['Lockable private room', 'Furnished for 2–5 pax', 'Boardroom credits included', 'All utilities covered'],
        ctaText: 'Inquire Private Suite',
        ctaHref: '/contact',
      },
    ],
    faqs: [
      {
        q: 'Can we use Paper Street address to register our startup company with BRS on eCitizen?',
        a: 'Yes, our commercial address at Kisumu CBD Commercial Center on Oginga Odinga Street is accepted by the Business Registration Service (BRS) for company incorporation and CR12 generation.',
      },
      {
        q: 'How does coworking extend our startup capital runway?',
        a: 'By eliminating lease deposits (saving KES 100,000+), fit-out partitioning (saving KES 200,000+), furniture purchases, and separate utility contracts, your startup saves over KES 400,000 in upfront capital.',
      },
      {
        q: 'Can we scale our desk count as our engineering and sales teams grow?',
        a: 'Yes, you can add or subtract dedicated desks on a flexible monthly basis without incurring lease penalty fees.',
      },
      {
        q: 'Is there a private boardroom to pitch to venture capital investors or grant donors?',
        a: 'Yes. Our executive boardroom is equipped with 4K presentation screens, video conferencing hardware, and front-desk reception greeting.',
      },
    ],
  },

  'dedicated-desk-kisumu': {
    slug: 'dedicated-desk-kisumu',
    title: 'Dedicated Desk in Kisumu',
    metaTitle: 'Dedicated Desk in Kisumu | Your Own Workspace | Paper Street',
    metaDescription:
      'Rent a dedicated desk in Kisumu CBD. Your own permanent reserved workstation with lockable storage, high-speed fibre internet, generator backup, and registered business address.',
    targetKeywords: [
      'dedicated desk Kisumu',
      'dedicated workspace Kisumu',
      'dedicated office desk Kisumu',
      'desk rental Kisumu',
      'coworking desk Kisumu',
    ],
    eyebrow: 'Permanent Reserved Workstations · Kisumu CBD',
    heroHeading: 'Dedicated Desk in Kisumu.',
    heroSubtitle:
      'Your own permanently reserved desk in Kisumu CBD. Lockable storage, registered commercial business address, high-speed fibre internet, and meeting room credits included.',
    heroImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&auto=format&q=80',
    primaryCtaText: 'Reserve Dedicated Desk (KES 16,500/mo)',
    primaryCtaHref: '/services/dedicated-desk',
    secondaryCtaText: 'Schedule a Tour',
    secondaryCtaHref: '/contact',
    startingPrice: 'From KES 16,500',
    priceLabel: 'Monthly Rate',
    keyStats: [
      { value: 'Reserved', label: 'Same Desk Daily' },
      { value: 'Lockable', label: 'Pedestal Storage' },
      { value: 'CBD Address', label: 'BRS / KRA Ready' },
      { value: '5 Hours', label: 'Meeting Credit' },
    ],
    overviewTitle: 'Your Permanent Workstation in Kisumu CBD',
    overviewContent: [
      'Dedicated desks sit between a flexible hot desk and a private office suite. You get your own permanently reserved desk that nobody else can use, complete with a lockable storage pedestal for your monitors, documents, and equipment.',
      'Includes an official registered business address at Kisumu CBD Commercial Center on Oginga Odinga Street for BRS company incorporation and corporate banking, plus 5 hours of monthly meeting room access.',
    ],
    features: [
      { title: 'Permanent Reserved Desk', desc: 'Your personal workstation setup stays intact every day — leave your dual screens and accessories.' },
      { title: 'Lockable Storage Pedestal', desc: 'Secure drawers for confidential files, tech peripherals, and physical documents.' },
      { title: 'Commercial Business Address', desc: 'Valid for BRS company registration, CR12, KRA tax PIN, and bank accounts.' },
      { title: 'Meeting Room Credits Included', desc: '5 hours per month to host clients in professional meeting rooms and boardrooms.' },
    ],
    pricingPackages: [
      {
        name: 'Monthly Dedicated Desk',
        price: 'From KES 16,500',
        period: '/ month',
        popular: true,
        description: 'Permanent reserved workstation with full business amenities.',
        features: [
          'Permanent reserved desk seat',
          'Lockable storage pedestal',
          'High-speed fibre Wi-Fi & LAN',
          'Automatic generator power backup',
          'Kisumu CBD registered address',
          '5 hours monthly meeting room credit',
          'Front-desk mail receipt & notifications',
        ],
        ctaText: 'Reserve Desk',
        ctaHref: '/services/dedicated-desk',
      },
    ],
    faqs: [
      {
        q: 'Can I leave my external monitor, keyboard, and computer on my dedicated desk overnight?',
        a: 'Yes. Your dedicated desk is exclusively reserved for you. You can leave dual monitors, docking stations, and paperwork set up permanently.',
      },
      {
        q: 'Does this plan include a registered address for BRS company registration?',
        a: 'Yes. Dedicated desk members receive full rights to use our commercial building address at Kisumu CBD Commercial Center on Oginga Odinga Street for company incorporation, KRA PIN, and banking.',
      },
      {
        q: 'How many meeting room hours are included with a dedicated desk?',
        a: 'Each dedicated desk includes 5 hours of monthly meeting room credit to host client presentations and team sessions.',
      },
      {
        q: 'What storage is provided with the dedicated desk?',
        a: 'Each desk comes with a personal lockable storage pedestal with keys for confidential documents and valuable peripherals.',
      },
      {
        q: 'What are the access hours for dedicated desk members?',
        a: 'Dedicated desk members enjoy extended access from Monday to Saturday, allowing early morning and evening work sessions.',
      },
    ],
  },

  'private-office-kisumu': {
    slug: 'private-office-kisumu',
    title: 'Private Offices for Rent in Kisumu',
    metaTitle: 'Private Office in Kisumu | Furnished Serviced Offices | Paper Street',
    metaDescription:
      'Private offices for rent in Kisumu — fully furnished, lockable, all-inclusive serviced offices in Kisumu CBD. 1-person to team suites. No deposit. From KES 28,000/month.',
    targetKeywords: [
      'private office Kisumu',
      'private office for rent Kisumu',
      'private office space Kisumu',
      'furnished office Kisumu',
      'serviced office Kisumu',
      'small private office Kisumu',
      'executive office Kisumu',
    ],
    eyebrow: 'Furnished & Serviced Private Suites · Kisumu CBD',
    heroHeading: 'Private Offices for Rent in Kisumu.',
    heroSubtitle:
      'Fully furnished, lockable private team suites in a commercial building on Oginga Odinga Street. All utilities, internet, generator backup, and reception included.',
    heroImage: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=1600&auto=format&q=80',
    primaryCtaText: 'Inquire About Private Offices',
    primaryCtaHref: '/contact',
    secondaryCtaText: 'Explore Office Sizes',
    secondaryCtaHref: '#pricing',
    startingPrice: 'From KES 28,000',
    priceLabel: 'Private Suites Starting From',
    keyStats: [
      { value: '1–10 Pax', label: 'Suite Capacities' },
      { value: '100% Lockable', label: 'Secure Privacy' },
      { value: 'Turnkey', label: 'Furnished & Ready' },
      { value: 'All-Inclusive', label: 'One Monthly Invoice' },
    ],
    overviewTitle: 'Turnkey Serviced Private Offices in Kisumu',
    overviewContent: [
      'For expanding companies, legal advocates, financial consultancies, and NGOs that require confidential and secure office space, Paper Street provides lockable private office suites.',
      'Avoid the hassle of buying office furniture, installing partitions, contracting internet providers, and managing utility bills. Our private offices come fully furnished with commercial desks, ergonomic chairs, dedicated power, and high-speed fibre.',
    ],
    features: [
      { title: 'Lockable & Fully Secure', desc: 'Private keycard/lock access ensuring total security for your equipment and documents.' },
      { title: 'Commercial CBD Address', desc: 'Registered office address on Oginga Odinga Street for your company registration and banking.' },
      { title: 'All Utilities Included', desc: 'Electricity, automatic standby generator, fibre internet, and daily cleaning on one bill.' },
      { title: 'Boardroom Hours Included', desc: 'Monthly boardroom credits to host clients and conduct team reviews.' },
    ],
    pricingPackages: [
      {
        name: '1–2 Person Private Suite',
        price: 'From KES 35,000',
        period: '/ month',
        description: 'Ideal for solo practitioners, legal advocates, and senior consultants.',
        features: ['Lockable private room', '2 ergonomic workstations', 'High-speed fibre internet', 'CBD business address', 'Meeting room credits'],
        ctaText: 'Schedule a Tour',
        ctaHref: '/contact',
      },
      {
        name: '3–5 Person Team Office',
        price: 'From KES 65,000',
        period: '/ month',
        popular: true,
        description: 'Custom team suite for startups, regional agencies, and project teams.',
        features: ['Spacious team room', '3–5 workstations & storage', 'Generator backup included', 'Mail & parcel handling', '10 hours meeting room credit'],
        ctaText: 'Schedule a Tour',
        ctaHref: '/contact',
      },
    ],
    faqs: [
      {
        q: 'What office sizes and team capacities are available in Kisumu CBD?',
        a: 'We offer private lockable suites ranging from 1 to 2 person solo executive offices to 3 to 5 person team suites and 6 to 10 person regional corporate satellite offices.',
      },
      {
        q: 'What is included in the private office monthly rental rate?',
        a: 'The monthly fee is all-inclusive: commercial desks, ergonomic mesh chairs, high-speed fibre internet, automatic generator backup, electricity, water, daily cleaning, reception services, and boardroom credits.',
      },
      {
        q: 'Do I need to pay a 3 to 6 month security deposit?',
        a: 'Zero security deposit applies to annual upfront plans. For monthly rolling terms, a standard two-month refundable security deposit applies upon onboarding, avoiding the 6-month lock-in and legal fees of traditional commercial leases.',
      },
      {
        q: 'How quickly can our team move into a private office?',
        a: 'Our suites are turnkey and fully furnished. You can complete verification and move in within 24 hours with internet and power running immediately.',
      },
      {
        q: 'Can we use the address for company registration with BRS on eCitizen?',
        a: 'Yes. Every private office membership includes an official commercial registered address on Oginga Odinga Street compliant with BRS company registration and KRA PIN records.',
      },
      {
        q: 'Can we brand our private office door with our company name and logo?',
        a: 'Yes, long-term private office members can display custom company signage at their suite entrance.',
      },
      {
        q: 'What are the access hours for private office members?',
        a: 'Private office members receive secure keycard access allowing flexible working during extended business hours and weekends.',
      },
    ],
  },

  'team-office-kisumu': {
    slug: 'team-office-kisumu',
    title: 'Team Offices in Kisumu',
    metaTitle: 'Team Offices in Kisumu | Flexible Offices for Small Teams | Paper Street',
    metaDescription:
      'Flexible team offices in Kisumu CBD for small teams of 2–10 people. Lockable private suites, enterprise internet, generator backup, and meeting room credits.',
    targetKeywords: [
      'team office Kisumu',
      'office for small team Kisumu',
      'shared office Kisumu',
      'team workspace Kisumu',
      'office for startups Kisumu',
      'office for NGOs Kisumu',
    ],
    eyebrow: 'Private Team Suites · Kisumu CBD Commercial Center',
    heroHeading: 'Flexible Team Offices in Kisumu.',
    heroSubtitle:
      'Enclosed, fully furnished private team suites in Kisumu CBD for startups, NGOs, and growing businesses with 2–10 team members. No multi-year leases.',
    heroImage: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=1600&auto=format&q=80',
    primaryCtaText: 'Book a Team Office Viewing',
    primaryCtaHref: '/contact',
    secondaryCtaText: 'View Pricing Packages',
    secondaryCtaHref: '#pricing',
    startingPrice: 'From KES 35,000',
    priceLabel: 'Team Suites From',
    keyStats: [
      { value: '2–10 Pax', label: 'Team Sizes' },
      { value: 'Lockable', label: 'Enclosed Room' },
      { value: 'Turnkey', label: 'Fully Furnished' },
      { value: '0 Dep (Annual)', label: '2 Mo for Monthly' },
    ],
    overviewTitle: 'Private Team Offices Built for 2–10 Employees in Kisumu',
    overviewContent: [
      'Small teams and satellite branches in Kisumu need space to collaborate closely without the distractions of open coworking floors or the overhead of bare commercial rentals.',
      'Paper Street team offices provide private, fully furnished suites equipped with high-speed dual fibre connections, generator backup, dedicated storage, and included boardroom booking credits.',
    ],
    features: [
      { title: 'Enclosed Team Environment', desc: 'Lockable private rooms configured specifically for your team headcount.' },
      { title: 'Scalable Month-to-Month', desc: 'Add desks or move to larger suites as your project team or staff grows.' },
      { title: 'All Facilities Included', desc: 'High-speed internet, power backup, daily cleaning, and reception greeting on one monthly invoice.' },
      { title: 'Boardroom Access', desc: 'Host stakeholder meetings and client presentations in our executive boardrooms.' },
    ],
    pricingPackages: [
      {
        name: '2–3 Person Team Suite',
        price: 'From KES 45,000',
        period: '/ month',
        description: 'Ideal for small consulting firms, partner startups, and remote pods.',
        features: ['Lockable private suite', 'Ergonomic workstations', 'High-speed fibre & power backup', 'CBD address & mail handling', '6 hours boardroom credit'],
        ctaText: 'Inquire Now',
        ctaHref: '/contact',
      },
      {
        name: '4–6 Person Team Office',
        price: 'From KES 65,000',
        period: '/ month',
        popular: true,
        description: 'Perfect for NGO field teams, regional bank pods, and growing tech teams.',
        features: ['Spacious team room', '4–6 desks & storage', 'Generator backup & dual fibre', '10 hours boardroom credit', 'Front-desk reception'],
        ctaText: 'Schedule Viewing',
        ctaHref: '/contact',
      },
    ],
    faqs: [
      {
        q: 'Can we customise the desk layout for our team?',
        a: 'Yes, our team can arrange desks in collaborative clusters or linear pod formats depending on your workflow.',
      },
      {
        q: 'What is included in the team office monthly fee?',
        a: 'Everything is included: commercial workstations, ergonomic mesh chairs, high-speed fibre internet, automatic generator power backup, air conditioning, daily cleaning, and monthly boardroom hours.',
      },
      {
        q: 'Can we scale up to a larger suite if our team expands?',
        a: 'Yes, you can upgrade to a larger private office anytime as your staffing grows without lease termination penalties.',
      },
      {
        q: 'Do team suites have lockable doors for confidential files and hardware?',
        a: 'Yes, each team office has a secure lockable door with dedicated keys issued exclusively to your authorized staff.',
      },
    ],
  },

  'meeting-room-kisumu': {
    slug: 'meeting-room-kisumu',
    title: 'Meeting Rooms for Hire in Kisumu',
    metaTitle: 'Meeting Rooms in Kisumu | Meeting Room Hire & Rental | Paper Street',
    metaDescription:
      'Private meeting rooms for hire in Kisumu CBD. Hourly and daily rates for small teams, client meetings, interviews, and video conferences with presentation screens.',
    targetKeywords: [
      'meeting room Kisumu',
      'meeting rooms Kisumu',
      'meeting room for hire Kisumu',
      'meeting room for rent Kisumu',
      'meeting space Kisumu',
      'business meeting room Kisumu',
      'meeting room Kisumu CBD',
    ],
    eyebrow: 'Private Meeting Suites · Kisumu CBD Commercial Center',
    heroHeading: 'Meeting Rooms for Hire in Kisumu.',
    heroSubtitle:
      'Private, professional meeting rooms equipped with presentation screens, video conferencing capability, high-speed Wi-Fi, and reception service. Book by the hour.',
    heroImage: 'https://images.unsplash.com/photo-1562575214-da9fcf59b907?w=1600&auto=format&q=80',
    primaryCtaText: 'Book a Meeting Room',
    primaryCtaHref: '/services/meeting-rooms',
    secondaryCtaText: 'View Room Options',
    secondaryCtaHref: '#pricing',
    startingPrice: 'From KES 1,500',
    priceLabel: 'Hourly Rate From',
    keyStats: [
      { value: '2–12 Pax', label: 'Room Capacities' },
      { value: 'Hourly', label: 'Flexible Booking' },
      { value: 'Display Screen', label: 'Plug & Play' },
      { value: 'Front Desk', label: 'Guest Greeting' },
    ],
    overviewTitle: 'Professional Client Meeting Spaces in Kisumu CBD',
    overviewContent: [
      'Hosting client discussions in public venues can compromise your privacy and professional presentation.',
      'Paper Street offers dedicated, air-conditioned meeting rooms in our commercial building on Oginga Odinga Street, complete with presentation displays, conference audio, fast Wi-Fi, and reception support.',
    ],
    features: [
      { title: 'Presentation Display Screen', desc: 'Connect your laptop via HDMI or wireless screen share for presentations and spreadsheets.' },
      { title: 'Acoustic Privacy', desc: 'Sound-insulated walls ensure confidential legal and financial discussions remain private.' },
      { title: 'High-Speed Wi-Fi & Generator', desc: 'Uninterrupted internet connection for remote video participants on Zoom or Teams.' },
      { title: 'Guest Reception & Greeting', desc: 'Front-desk staff welcome your guests professionally upon arrival.' },
    ],
    pricingPackages: [
      {
        name: 'Small Meeting Room (2–4 Pax)',
        price: 'From KES 1,500',
        period: '/ hour',
        description: 'Ideal for 1-on-1 interviews, legal consultations, and partner catch-ups.',
        features: ['Enclosed private room', 'Presentation monitor', 'High-speed Wi-Fi', 'Reception greeting'],
        ctaText: 'Book Small Room',
        ctaHref: '/services/meeting-rooms',
      },
      {
        name: 'Executive Boardroom (6–12 Pax)',
        price: 'From KES 2,500',
        period: '/ hour',
        popular: true,
        description: 'Great for board meetings, client presentations, and team workshops.',
        features: ['Large conference table', 'Presentation screen', 'Video conference setup', 'Whiteboard & markers', 'Reception guest greeting'],
        ctaText: 'Book Boardroom',
        ctaHref: '/services/meeting-rooms',
      },
      {
        name: 'Full Day Boardroom Package',
        price: 'From KES 15,000',
        period: '/ full day',
        description: 'Full-day booking for strategic reviews and full-day workshops.',
        features: ['Full day usage (8am – 5pm)', 'Priority front-desk support', 'Presentation facilities', 'High-speed Wi-Fi & backup power'],
        ctaText: 'Reserve Full Day',
        ctaHref: '/services/meeting-rooms',
      },
    ],
    faqs: [
      {
        q: 'How much does it cost to hire a meeting room in Kisumu?',
        a: 'Our Small Meeting Room (2 to 4 pax) starts from KES 1,500 per hour (from KES 5,000 for half-day, from KES 8,000 for full-day). Our Executive Boardroom (6 to 12 pax) starts from KES 2,500 per hour (from KES 9,000 for half-day, from KES 15,000 for full-day).',
      },
      {
        q: 'Where can I hire a meeting room in Kisumu?',
        a: 'Paper Street is located at Kisumu CBD Commercial Center on Oginga Odinga Street in Kisumu CBD, within easy walking distance of major banks, law courts, and county registries.',
      },
      {
        q: 'Can I book a meeting room by the hour?',
        a: 'Yes. You can book for a single hour, multiple hours, half-days, or full consecutive days with no minimum full-day commitment.',
      },
      {
        q: 'Do the meeting rooms have Wi-Fi and power backup?',
        a: 'Yes. All meeting rooms include high-speed dual-carrier fibre Wi-Fi and automatic standby generator backup, ensuring uninterrupted video calls during KPLC grid outages.',
      },
      {
        q: 'Can I connect a laptop to a TV screen or presentation display?',
        a: 'Yes. Rooms are equipped with HD/4K presentation displays supporting direct HDMI plug-in and wireless screen mirroring.',
      },
      {
        q: 'Can I book a meeting room for a full day or multi-day workshop?',
        a: 'Yes. We offer discounted full-day packages (KES 8,000 for small rooms, KES 15,000 for boardrooms and training spaces) for extended corporate seminars and NGO project workshops.',
      },
      {
        q: 'How many people can the meeting rooms accommodate?',
        a: 'We have room options ranging from 2 to 4 person interview rooms, 6 to 12 person executive boardrooms, and workshop layouts seating up to 20 people.',
      },
      {
        q: 'Can non-members use and book the meeting rooms?',
        a: 'Yes. Meeting rooms and boardrooms are open to both members and external corporate clients.',
      },
    ],
  },

  'training-room-kisumu': {
    slug: 'training-room-kisumu',
    title: 'Training & Workshop Rooms in Kisumu',
    metaTitle: 'Training Room in Kisumu | Training & Workshop Venue | Paper Street',
    metaDescription:
      'Hire fully equipped training rooms and workshop venues in Kisumu CBD. Presentation screens, enterprise Wi-Fi, generator backup, and flexible seating.',
    targetKeywords: [
      'training room Kisumu',
      'training venue Kisumu',
      'training room for hire Kisumu',
      'workshop venue Kisumu',
      'seminar venue Kisumu',
    ],
    eyebrow: 'Training & Workshop Facilities · Kisumu CBD',
    heroHeading: 'Training & Workshop Rooms in Kisumu.',
    heroSubtitle:
      'Professional training and seminar facilities in Kisumu CBD for corporate workshops, NGO capacity-building sessions, and professional development courses.',
    heroImage: 'https://images.unsplash.com/photo-1517502884422-41eaead166d4?w=1600&auto=format&q=80',
    primaryCtaText: 'Book a Training Room',
    primaryCtaHref: '/contact',
    secondaryCtaText: 'View Rates',
    secondaryCtaHref: '#pricing',
    startingPrice: 'From KES 9,000',
    priceLabel: 'Half-Day Package From',
    keyStats: [
      { value: '8–20 Pax', label: 'Seating Capacity' },
      { value: 'Dual Screens', label: 'Presentation AV' },
      { value: 'Generator', label: 'Zero Downtime' },
      { value: 'CBD Center', label: 'Oginga Odinga St' },
    ],
    overviewTitle: 'Fully Equipped Training and Workshop Facilities in Kisumu',
    overviewContent: [
      'Whether you are conducting an NGO capacity-building training, corporate induction, or professional development seminar, Paper Street provides configured workshop spaces on Oginga Odinga Street.',
      'Enjoy dual presentation monitors, whiteboard walls, high-density Wi-Fi for all delegates, and automatic generator backup to guarantee your training agenda runs without power delays.',
    ],
    features: [
      { title: 'Flexible Room Layouts', desc: 'Classroom rows, U-shape, or workshop pod configurations available.' },
      { title: 'Dual Presentation Screens', desc: 'High-visibility displays ensuring clear sightlines from every seat.' },
      { title: 'Continuous Generator Backup', desc: 'Automatic power switchover so instructional sessions are never interrupted.' },
      { title: 'Front-Desk Attendee Greeting', desc: 'Reception staff assist with delegate sign-in and direction.' },
    ],
    pricingPackages: [
      {
        name: 'Half-Day Training (4 Hours)',
        price: 'From KES 9,000',
        period: '/ 4 hours',
        description: 'Morning (8am–12pm) or afternoon (1pm–5pm) sessions.',
        features: ['4 hours room usage', 'Dual presentation displays & whiteboard', 'Enterprise Wi-Fi for all delegates', 'Air conditioning'],
        ctaText: 'Book Half-Day',
        ctaHref: '/contact',
      },
      {
        name: 'Full-Day Training Package',
        price: 'From KES 15,000',
        period: '/ full day',
        popular: true,
        description: 'Complete full-day corporate or NGO workshop.',
        features: ['Full day usage (8:30am – 5:00pm)', 'AV screens & whiteboards', 'Generator power backup', 'Reception check-in support'],
        ctaText: 'Book Full-Day',
        ctaHref: '/contact',
      },
    ],
    faqs: [
      {
        q: 'What is the capacity of the training room in Kisumu?',
        a: 'The room accommodates 8 to 20 delegates in interactive classroom, U-shape, or workshop pod formats.',
      },
      {
        q: 'What audio-visual equipment is included?',
        a: 'Dual large presentation display screens, whiteboard walls with dry-erase markers, and full HDMI and wireless laptop connectivity.',
      },
      {
        q: 'Can delegates connect multiple laptops to the Wi-Fi simultaneously?',
        a: 'Yes, our enterprise dual-carrier symmetrical fibre Wi-Fi is configured with high-density access points to handle 20+ active laptops without bandwidth degradation.',
      },
      {
        q: 'How does generator backup work during regional power outages?',
        a: 'Our automatic standby generator engages instantly upon grid failure, keeping the lighting, presentation screens, air conditioning, and Wi-Fi running seamlessly.',
      },
      {
        q: 'Can we book the training venue for full-week workshop programmes?',
        a: 'Yes, we offer discounted multi-day packages for week-long NGO and corporate trainings with secure overnight storage for materials.',
      },
    ],
  },

  'coworking-space-for-freelancers-kisumu': {
    slug: 'coworking-space-for-freelancers-kisumu',
    title: 'Coworking Space for Freelancers in Kisumu',
    metaTitle: 'Coworking Space for Freelancers in Kisumu | Paper Street',
    metaDescription:
      'Professional coworking space for freelancers and consultants in Kisumu CBD. Fast fibre internet, automatic generator backup, quiet desks, and meeting rooms.',
    targetKeywords: [
      'coworking space for freelancers Kisumu',
      'workspace for freelancers Kisumu',
      'freelancer desk Kisumu',
    ],
    eyebrow: 'Freelancer & Consultant Hub · Kisumu CBD',
    heroHeading: 'Coworking Space for Freelancers in Kisumu.',
    heroSubtitle:
      'Escape home power outages and noisy cafes. Work productively with enterprise fibre internet, automatic generator backup, and meeting rooms in Kisumu CBD.',
    heroImage: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1600&auto=format&q=80',
    primaryCtaText: 'Get a Day Pass (From KES 1,000)',
    primaryCtaHref: '/services/hot-desk',
    secondaryCtaText: 'View Monthly Desks',
    secondaryCtaHref: '/pricing',
    startingPrice: 'From KES 1,000',
    priceLabel: 'Day Pass From',
    keyStats: [
      { value: 'From KES 1,000', label: 'Day Pass' },
      { value: 'Dual Fibre', label: 'Fast Wi-Fi' },
      { value: 'Generator', label: '100% Uptime' },
      { value: 'Meeting Room', label: 'Client Pitches' },
    ],
    overviewTitle: 'The Workspace Built for Independent Professionals in Kisumu',
    overviewContent: [
      'Freelancers, software developers, and consultants in Kisumu need reliable infrastructure to deliver client work without home power outages or cafe noise.',
      'Paper Street Kisumu CBD gives you a commercial working base on Oginga Odinga Street with quiet focus desks, fast internet, generator backup, and private meeting rooms to impress clients.',
    ],
    features: [
      { title: 'Affordable Day Passes & Monthly Plans', desc: 'Day passes at KES 1,000 and monthly hot desks at KES 12,000 tailored for freelance cash flow.' },
      { title: 'Uninterrupted Power & Internet', desc: 'Automatic generator backup and fibre internet so you never miss a client deadline.' },
      { title: 'Meeting Rooms for Pitches', desc: 'Private meeting rooms to present proposals and sign contracts professionally.' },
      { title: 'CBD Invoicing Address', desc: 'Add credibility to your invoices with our registered commercial address.' },
    ],
    pricingPackages: [
      {
        name: 'Freelancer Day Pass',
        price: 'From KES 1,000',
        period: '/ day',
        description: 'Drop in for a full day of focused work.',
        features: ['Full day access (8am – 6pm)', 'Fast fibre Wi-Fi', 'Generator power backup', 'Quiet desk space'],
        ctaText: 'Get Day Pass',
        ctaHref: '/services/hot-desk',
      },
      {
        name: 'Monthly Hot Desk',
        price: 'From KES 12,000',
        period: '/ month',
        popular: true,
        description: 'Full monthly flexible desk access.',
        features: ['Unlimited monthly access', 'Meeting room credits', 'Fibre Wi-Fi & LAN', 'Front-desk parcel receipt'],
        ctaText: 'Join Hot Desk',
        ctaHref: '/services/hot-desk',
      },
    ],
    faqs: [
      {
        q: 'Can I take video calls from my desk?',
        a: 'Yes, routine calls with headphones are permitted on the coworking floor, and private meeting rooms are available for confidential client calls.',
      },
      {
        q: 'What is included in the KES 1,000 freelancer day pass?',
        a: 'Your day pass includes a comfortable desk, ergonomic task chair, fast enterprise Wi-Fi, continuous generator power backup, and air conditioning.',
      },
      {
        q: 'Can I use the Paper Street address on my client proposals and invoices?',
        a: 'Yes, dedicated desk and virtual office members receive full rights to use our commercial building address at Kisumu CBD Commercial Center on their proposals and invoices.',
      },
    ],
  },

  'coworking-space-for-startups-kisumu': {
    slug: 'coworking-space-for-startups-kisumu',
    title: 'Coworking Space for Startups in Kisumu',
    metaTitle: 'Coworking Space for Startups in Kisumu | Paper Street',
    metaDescription:
      'Scalable workspace and team offices for startups in Kisumu CBD. Zero fit-out costs, BRS-ready commercial business address, and enterprise fibre internet.',
    targetKeywords: [
      'coworking space for startups Kisumu',
      'office space for startups Kisumu',
      'startup workspace Kisumu',
    ],
    eyebrow: 'Startup Hub · Kisumu CBD Commercial Center',
    heroHeading: 'Coworking Space for Startups in Kisumu.',
    heroSubtitle:
      'Preserve your runway and scale your startup with flexible team desks, legal registered office addresses for BRS incorporation, and boardroom access in Kisumu CBD.',
    heroImage: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1600&auto=format&q=80',
    primaryCtaText: 'Explore Startup Desks',
    primaryCtaHref: '/services/dedicated-desk',
    secondaryCtaText: 'Virtual Office for Startups',
    secondaryCtaHref: '/services/virtual-office',
    startingPrice: 'From KES 3,500',
    priceLabel: 'Startup Plans From',
    keyStats: [
      { value: 'Zero CapEx', label: 'No Fit-Out Costs' },
      { value: 'BRS Address', label: 'Incorporation Ready' },
      { value: 'Team Desks', label: 'Scalable' },
      { value: '100% Uptime', label: 'Power & Internet' },
    ],
    overviewTitle: 'Launch and Grow Your Startup in Western Kenya',
    overviewContent: [
      'Startups in Kisumu need to preserve cash for product development and hiring rather than locking capital into long commercial leases and partition fit-outs.',
      'Paper Street provides flexible team desks, registered office addresses for eCitizen BRS incorporation, enterprise fibre internet, and boardrooms to pitch to partners and investors.',
    ],
    features: [
      { title: 'Zero Upfront Fit-Out Costs', desc: 'Plug-and-play desks and private suites ready immediately for your team.' },
      { title: 'Official Registered Office for BRS', desc: 'Meet statutory requirements for private limited company incorporation.' },
      { title: 'Scalable Team Workstations', desc: 'Start with 2 desks and add more as you recruit.' },
      { title: 'Boardroom for Investor Pitches', desc: 'Present to advisors, partners, and investors in a professional boardroom.' },
    ],
    pricingPackages: [
      {
        name: 'Startup Virtual Office',
        price: 'From KES 3,500',
        period: '/ month',
        description: 'BRS registered address and mail handling for remote startups.',
        features: ['Kisumu CBD registered address', 'BRS & KRA compliance', 'Mail receipt & scanning', 'Boardroom discounts'],
        ctaText: 'Get Virtual Office',
        ctaHref: '/services/virtual-office',
      },
      {
        name: 'Dedicated Team Desks',
        price: 'From KES 16,500',
        period: '/ desk / month',
        popular: true,
        description: 'Permanent reserved desks for your core startup team.',
        features: ['Permanent reserved desks', 'High-speed fibre Wi-Fi & LAN', 'Generator power backup', 'Meeting room credits'],
        ctaText: 'Reserve Desks',
        ctaHref: '/services/dedicated-desk',
      },
    ],
    faqs: [
      {
        q: 'Can we use the Paper Street address for BRS company incorporation?',
        a: 'Yes, our commercial building address on Oginga Odinga Street is accepted by BRS for company incorporation and CR12 issuance.',
      },
      {
        q: 'Can we scale our team desk count month-to-month?',
        a: 'Yes, you can add or subtract workstations flexibly as your startup recruits engineers and sales reps without long-term penalty clauses.',
      },
      {
        q: 'Do you offer private enclosed rooms for confidential startup operations?',
        a: 'Yes, our furnished private suites are lockable and tailored for teams of 2 to 10 people.',
      },
    ],
  },

  'coworking-space-for-ngos-kisumu': {
    slug: 'coworking-space-for-ngos-kisumu',
    title: 'Coworking Space for NGOs in Kisumu',
    metaTitle: 'Coworking Space for NGOs in Kisumu | Paper Street',
    metaDescription:
      'Flexible workspace, private team offices, and training venues for NGOs and development organisations in Kisumu CBD.',
    targetKeywords: [
      'coworking space for NGOs Kisumu',
      'NGO workspace Kisumu',
      'office space for NGOs Kisumu',
    ],
    eyebrow: 'NGO & Development Sector Hub · Kisumu CBD',
    heroHeading: 'Coworking Space for NGOs in Kisumu.',
    heroSubtitle:
      'Flexible field offices, private team suites, project workshop rooms, and official Kisumu programme addresses for NGOs and development agencies.',
    heroImage: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1600&auto=format&q=80',
    primaryCtaText: 'Discuss NGO Requirements',
    primaryCtaHref: '/contact',
    secondaryCtaText: 'View Workspace Options',
    secondaryCtaHref: '#pricing',
    startingPrice: 'From KES 3,500',
    priceLabel: 'Plans From',
    keyStats: [
      { value: 'Field Ready', label: 'Move In Today' },
      { value: 'Training AV', label: 'Workshop Space' },
      { value: 'Generator', label: '100% Uptime' },
      { value: 'All-in-One', label: 'Single Invoice' },
    ],
    overviewTitle: 'Workspace Solutions for Development Programmes in Western Kenya',
    overviewContent: [
      'NGO programmes operating in Western Kenya often have variable team presence depending on grant cycles and field schedules. Long commercial leases create unnecessary overhead during low-activity months.',
      'Paper Street offers scalable team desks, private lockable programme offices, training workshop rooms, and registered Kisumu addresses for government liaison.',
    ],
    features: [
      { title: 'Project-Aligned Flexibility', desc: 'Scale desk counts up during field sprints and down between funding cycles.' },
      { title: 'Training & Capacity-Building Rooms', desc: 'Fully equipped workshop spaces with presentation screens and generator backup.' },
      { title: 'Confidential Team Suites', desc: 'Lockable private offices for secure beneficiary data and programme files.' },
      { title: 'Clean Donor Budgeting', desc: 'All inclusive monthly invoices that code cleanly into donor budget lines.' },
    ],
    pricingPackages: [
      {
        name: 'NGO Field Programme Address',
        price: 'From KES 3,500',
        period: '/ month',
        description: 'Official Kisumu address for liaison and statutory correspondence.',
        features: ['Kisumu CBD address on Oginga Odinga St', 'Mail & courier receipt', 'Digital mail scanning', 'Meeting room credits'],
        ctaText: 'Get Address Plan',
        ctaHref: '/services/virtual-office',
      },
      {
        name: 'Private Field Office Suite',
        price: 'From KES 35,000',
        period: '/ month',
        popular: true,
        description: 'Lockable private office for project coordinators and field officers.',
        features: ['Lockable private room', 'Furnished with desks & storage', 'Generator power backup', 'Boardroom credits included'],
        ctaText: 'Inquire Field Office',
        ctaHref: '/contact',
      },
    ],
    faqs: [
      {
        q: 'Can Paper Street provide formal VAT receipts and invoices for donor accounting?',
        a: 'Yes, we provide standard VAT invoices and compliant documentation formatted for USAID, EU, FCDO, UN agencies, and global foundation compliance.',
      },
      {
        q: 'Can we book workshop venues for community stakeholder trainings?',
        a: 'Yes, our training facilities accommodate up to 20 delegates with presentation screens, high-speed Wi-Fi, and generator backup.',
      },
      {
        q: 'Can we rent field offices on short-term 3-month or 6-month grant cycles?',
        a: 'Yes, our flexible terms allow development programmes to align office expenditure directly with project funding timelines.',
      },
    ],
  },

  'workspace-for-remote-workers-kisumu': {
    slug: 'workspace-for-remote-workers-kisumu',
    title: 'Workspace for Remote Workers in Kisumu',
    metaTitle: 'Workspace for Remote Workers in Kisumu | Paper Street',
    metaDescription:
      'Quiet, professional workspace for remote employees and distributed teams in Kisumu CBD. 100% power and enterprise fibre internet uptime.',
    targetKeywords: [
      'workspace for remote workers Kisumu',
      'where to work remotely in Kisumu',
      'remote work Kisumu',
    ],
    eyebrow: 'Remote Work Hub · Kisumu CBD Commercial Center',
    heroHeading: 'Workspace for Remote Workers in Kisumu.',
    heroSubtitle:
      'Work remotely from Kisumu with guaranteed enterprise fibre internet, automatic generator backup, quiet focus desks, and ergonomic seating.',
    heroImage: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1600&auto=format&q=80',
    primaryCtaText: 'Get a Day Pass (From KES 1,000)',
    primaryCtaHref: '/services/hot-desk',
    secondaryCtaText: 'View Monthly Desks',
    secondaryCtaHref: '/pricing',
    startingPrice: 'From KES 1,000',
    priceLabel: 'Day Pass From',
    keyStats: [
      { value: '100 Mbps', label: 'Dual Fibre' },
      { value: '100%', label: 'Generator Backup' },
      { value: 'Quiet', label: 'Focus Zone' },
      { value: 'AC', label: 'Air Conditioned' },
    ],
    overviewTitle: 'Professional Workspace for Remote Employees in Kisumu',
    overviewContent: [
      'Working remotely in Kisumu for companies in Nairobi or overseas requires rock-solid internet and power reliability. Dropping calls during sprint reviews or client meetings damages your professional standing.',
      'Paper Street Kisumu CBD provides the infrastructure remote professionals need: symmetrical enterprise fibre, instantaneous generator backup, ergonomic chairs, and air-conditioned focus areas.',
    ],
    features: [
      { title: 'Dual-Carrier Fibre Internet', desc: 'Redundant high-speed connectivity for seamless Zoom, Teams, and cloud workflows.' },
      { title: 'Zero Power Downtime', desc: 'Automatic generator backup ensures you never drop an important video call.' },
      { title: 'Ergonomic Workstations', desc: 'Comfortable mesh office chairs and spacious desks designed for 8+ hour workdays.' },
      { title: 'Private Call Rooms', desc: 'Bookable meeting rooms for confidential client presentations and interviews.' },
    ],
    pricingPackages: [
      {
        name: 'Remote Day Pass',
        price: 'From KES 1,000',
        period: '/ day',
        description: 'Drop in whenever you need uninterrupted focus.',
        features: ['Full day access (8am – 6pm)', 'Fast fibre Wi-Fi', 'Generator backup', 'Power sockets at desk'],
        ctaText: 'Get Day Pass',
        ctaHref: '/services/hot-desk',
      },
      {
        name: 'Monthly Dedicated Desk',
        price: 'From KES 16,500',
        period: '/ month',
        popular: true,
        description: 'Permanent workstation in Kisumu CBD.',
        features: ['Permanent reserved desk', 'Lockable storage pedestal', 'Fibre Wi-Fi & LAN', 'Meeting room credits'],
        ctaText: 'Get Dedicated Desk',
        ctaHref: '/services/dedicated-desk',
      },
    ],
    faqs: [
      {
        q: 'Is the internet fast and stable enough for daily video meetings?',
        a: 'Yes, our enterprise dual-carrier symmetrical fibre is engineered specifically for simultaneous high-definition video conferencing on Zoom, Teams, and Google Meet.',
      },
      {
        q: 'What is the policy on taking phone calls and video calls?',
        a: 'Short calls with headphones are permitted on the open floor. For extended meetings or confidential discussions, private phone booths and meeting rooms are available.',
      },
      {
        q: 'How does the automatic standby generator work?',
        a: 'Our commercial generator activates automatically in seconds during national grid blackouts, keeping your power sockets and internet running with zero interruption.',
      },
    ],
  },

  'office-space-for-small-businesses-kisumu': {
    slug: 'office-space-for-small-businesses-kisumu',
    title: 'Office Space for Small Businesses in Kisumu',
    metaTitle: 'Office Space for Small Businesses in Kisumu | Paper Street',
    metaDescription:
      'Serviced office space for small businesses and SMEs in Kisumu CBD. Move-in ready private suites, all utilities included, and commercial business address.',
    targetKeywords: [
      'office space for small businesses Kisumu',
      'SME office Kisumu',
      'small business office Kisumu',
    ],
    eyebrow: 'SME & Business Office Suites · Kisumu CBD',
    heroHeading: 'Office Space for Small Businesses in Kisumu.',
    heroSubtitle:
      'Furnished private offices, commercial business addresses, and meeting facilities for SMEs and growing businesses in Kisumu CBD without heavy traditional commercial lease deposits.',
    heroImage: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1600&auto=format&q=80',
    primaryCtaText: 'Inquire About Office Space',
    primaryCtaHref: '/contact',
    secondaryCtaText: 'View Pricing Options',
    secondaryCtaHref: '#pricing',
    startingPrice: 'From KES 28,000',
    priceLabel: 'Office Suites From',
    keyStats: [
      { value: '1–10 Pax', label: 'Office Sizes' },
      { value: 'Zero Fit-out', label: 'Ready Day One' },
      { value: 'CBD Center', label: 'Oginga Odinga St' },
      { value: 'All-in-One', label: 'Single Monthly Bill' },
    ],
    overviewTitle: 'Turnkey Office Solutions for Kisumu Small Businesses',
    overviewContent: [
      'Leasing bare commercial space in Kisumu puts unnecessary strain on SME working capital. Between 3–6 month deposits, legal fees, partitioning, and generator purchases, upfront costs add up quickly.',
      'Paper Street offers turnkey serviced office suites in a commercial building on Oginga Odinga Street. Move in immediately with high-speed internet, power backup, daily cleaning, and reception services included in a single monthly invoice.',
    ],
    features: [
      { title: 'Zero Capital Fit-Out', desc: 'Commercial desks, ergonomic seating, and air conditioning ready from day one.' },
      { title: 'All Utilities Included', desc: 'Fibre internet, generator backup, power, water, and cleaning covered in one bill.' },
      { title: 'Prestigious CBD Address', desc: 'Commercial registered address on Oginga Odinga Street for your company paperwork.' },
      { title: 'Client Meeting Facilities', desc: 'Access private meeting rooms and boardrooms to host business partners.' },
    ],
    pricingPackages: [
      {
        name: 'Small Business Private Suite',
        price: 'From KES 35,000',
        period: '/ month',
        popular: true,
        description: 'Enclosed private office for 1 to 3 team members.',
        features: ['Lockable private room', 'Fully furnished', 'High-speed fibre & generator', 'CBD business address', 'Meeting room credits'],
        ctaText: 'Inquire Office',
        ctaHref: '/contact',
      },
      {
        name: 'SME Team Office',
        price: 'From KES 65,000',
        period: '/ month',
        description: 'Spacious team office for 4 to 8 employees.',
        features: ['Large enclosed team room', '4–8 workstations & storage', 'Boardroom credits included', 'Front-desk reception'],
        ctaText: 'Schedule Viewing',
        ctaHref: '/contact',
      },
    ],
    faqs: [
      {
        q: 'What are the lease term requirements for small businesses in Kisumu?',
        a: 'We offer flexible month-to-month and annual agreements without multi-year lease lock-in, allowing your business to adapt quickly.',
      },
      {
        q: 'How much money does a serviced office save compared to a bare commercial lease?',
        a: 'An SME typically saves between KES 300,000 and KES 500,000 in upfront fit-out, legal drafting, deposit, and furniture expenses during year one.',
      },
      {
        q: 'Are high-speed internet and generator electricity included in the monthly rent?',
        a: 'Yes, all utilities including dual-carrier fibre, generator fuel, electricity, water, and daily janitorial cleaning are covered on one invoice.',
      },
      {
        q: 'Can our company use the address on official government bids and bank accounts?',
        a: 'Yes, our commercial registered address on Oginga Odinga Street is accepted for BRS eCitizen company registration, KRA PIN, and commercial banking KYC.',
      },
    ],
  },
}

export const kisumuLandingPages: Record<string, LandingPageConfig> = {
  ...baseKisumuLandingPages,
  ...kisumuKeywordLandingPages,
  ...kisumuDailyDeskLandingPages,
  ...kisumuPrivateOfficeLandingPages,
  ...kisumuMeetingRoomLandingPages,
  ...kisumuVirtualOfficeLandingPages,
  ...kisumuRemoteWorkLandingPages,
  ...kisumuPersonaLandingPages,
  ...kisumuGuideLandingPages,
  ...kisumuVoExpansionLandingPages,
  ...kisumuBusinessAddressLandingPages,
  ...kisumuRegistrationAddressLandingPages,
  ...kisumuMailHandlingLandingPages,
  ...kisumuCbdPresenceLandingPages,
  ...kisumuProblemSearchLandingPages,
  ...kisumuVirtualBranchLandingPages,
}


