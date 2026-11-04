export type FaqItem = {
  q: string
  a: string
}

export type FaqSection = {
  id: string
  title: string
  intro: string
  items: FaqItem[]
}

export const FAQ_SECTIONS: FaqSection[] = [
  {
    id: 'getting-started',
    title: 'Getting started',
    intro: 'How Paper Street works if you need a Kisumu presence, a desk today, or both.',
    items: [
      {
        q: 'What does Paper Street sell first?',
        a: 'The three priority products are Virtual Office, Business Address, and Day Pass. Meeting rooms and dedicated desks are available in the same Kisumu CBD hub. Mail scanning, forwarding, and extra meeting hours can be added to a presence plan.',
      },
      {
        q: 'Do I need to visit Kisumu to get a virtual office or business address?',
        a: 'No. You can request a quote online, complete KYC remotely, and start using the address once your agreement is signed. You may visit the hub anytime during opening hours for collection, meetings, or a day pass.',
      },
      {
        q: 'How do I choose between Virtual Office and Business Address?',
        a: 'Choose Business Address if you mainly need a registered commercial address for BRS, KRA, and banking, with mail held for collection. Choose Virtual Office if you also want digital mail scans, front-desk greeting for visitors, and monthly meeting room hours. Most growing teams start on Virtual Office.',
      },
      {
        q: 'Can I use a day pass without a virtual office?',
        a: 'Yes. Day passes are sold on their own. You do not need an address plan to book a half-day or full-day desk.',
      },
      {
        q: 'How fast can I get started?',
        a: 'Day passes and meeting rooms can be booked for the same or next available slot. Virtual Office and Business Address typically activate within 24 hours after we receive a signed agreement and complete KYC documents.',
      },
    ],
  },
  {
    id: 'virtual-office',
    title: 'Virtual Office',
    intro: 'The flagship presence plan: address, mail scanning, reception, and meeting hours.',
    items: [
      {
        q: 'What is included in Virtual Office?',
        a: 'A verifiable Kisumu CBD commercial address, digital mail scanning to PDF in your portal, front-desk greeting for announced visitors, document forwarding coordination, and monthly meeting room booking hours. Exact hour allowances are confirmed on your quote.',
      },
      {
        q: 'What does Virtual Office cost?',
        a: 'KES 9,000 per month on annual billing (KES 108,000 per year with 1 month free, no security deposit). KES 10,000 per month on monthly billing, plus a one-month deposit (KES 10,000).',
      },
      {
        q: 'Can I put the address on my website, invoices, and letterhead?',
        a: 'Yes. That is the point of the plan. Use it as your commercial correspondence and registered office address in line with your agreement and Kenyan filing rules.',
      },
      {
        q: 'Will someone greet my clients if they visit?',
        a: 'Yes, on Virtual Office. Reception greets announced visitors and directs them to a booked meeting room or waiting area. Walk-in guests without a booking may need to wait or reschedule.',
      },
      {
        q: 'Can NGOs, consultants, and Nairobi companies use a Kisumu virtual office?',
        a: 'Yes. The plan is used for Western Kenya presence, branch representation, and a professional address when your team works remotely.',
      },
    ],
  },
  {
    id: 'business-address',
    title: 'Business Address',
    intro: 'Registered office use for company formation, tax, and banking KYC.',
    items: [
      {
        q: 'Can I use the address for company registration?',
        a: 'Yes. Business Address and Virtual Office both allow use of our Kisumu CBD commercial address as a registered office for government filings, statutory records, and official documents, subject to KYC approval.',
      },
      {
        q: 'Does the bank accept this address for KYC?',
        a: 'We issue proof-of-address documentation used for corporate banking KYC. Individual banks still apply their own checks. Most clients use the address successfully for KRA, eCitizen BRS, and bank onboarding.',
      },
      {
        q: 'What does Business Address cost?',
        a: 'KES 4,500 per month on annual billing (KES 54,000 per year with 1 month free). KES 5,000 per month on monthly billing, plus a two-month deposit (KES 10,000).',
      },
      {
        q: 'Is mail scanned on Business Address?',
        a: 'Standard Business Address receives and holds mail for collection. Digital PDF scanning is included on Virtual Office, or can be added. Physical courier forwarding is an add-on on both plans.',
      },
      {
        q: 'Can sole proprietors and freelancers use Business Address?',
        a: 'Yes, if you need a commercial address on proposals, a website, or registrations. We still require valid ID and standard KYC for the authorised account holder.',
      },
    ],
  },
  {
    id: 'day-pass',
    title: 'Day Pass',
    intro: 'Drop-in desks in Kisumu CBD with power backup and fibre Wi-Fi.',
    items: [
      {
        q: 'How do day passes work?',
        a: 'Book a half-day (4 hours, KES 1,000) or full-day (KES 1,500) open desk. Check in at reception, connect to Wi-Fi, and work from an ergonomic workstation. A monthly flex pass covers 10 working days for KES 14,000.',
      },
      {
        q: 'What is included with a day pass?',
        a: 'An open-plan workstation, dual-carrier fibre Wi-Fi, automatic generator backup, reception check-in, and access to shared amenities such as power outlets. Meeting rooms are booked separately unless your pass bundle says otherwise.',
      },
      {
        q: 'Do I need to book in advance?',
        a: 'Advance booking is recommended, especially midweek. Walk-ins are accepted when desks are free. Peak days can sell out.',
      },
      {
        q: 'What are the hub hours for day passes?',
        a: 'The Kisumu hub is open Monday to Saturday, 8:00 AM to 6:00 PM EAT. Confirm public-holiday hours with reception before you travel.',
      },
      {
        q: 'Can I leave equipment overnight on a day pass?',
        a: 'No. Day-pass desks are not reserved overnight. If you need to leave monitors and drawers in place, look at Dedicated Desk.',
      },
    ],
  },
  {
    id: 'hub',
    title: 'Meeting rooms & dedicated desks',
    intro: 'Use the same building when you need a boardroom or a resident workstation.',
    items: [
      {
        q: 'Is meeting room access included in packages?',
        a: 'Virtual Office and Dedicated Desk include monthly meeting room hours. Business Address and Day Pass clients book rooms by the hour (KES 2,000), half-day (KES 7,000), or full day (KES 12,000).',
      },
      {
        q: 'What is in the meeting room?',
        a: 'A private boardroom for about 6 to 12 people, 4K display with HDMI and wireless casting, conference speakerphone, magnetic whiteboard, and reception greeting for your guests.',
      },
      {
        q: 'What is a dedicated desk?',
        a: 'A permanently assigned workstation so you can leave monitors in place, with lockable storage, commercial business address and mail handling, monthly meeting room credits, generator backup, and an Ethernet port. Annual from KES 18,000 per month; monthly KES 20,000 plus a one-month deposit.',
      },
      {
        q: 'Can I book a room if I am not on a monthly plan?',
        a: 'Yes. Meeting rooms are available to day-pass users and external clients subject to availability.',
      },
    ],
  },
  {
    id: 'mail',
    title: 'Mail & reception',
    intro: 'How letters, parcels, and visitors are handled at the Kisumu hub.',
    items: [
      {
        q: 'How does mail handling work?',
        a: 'Reception signs for mail addressed to your company at our commercial address, logs it, and stores it securely. Business Address holds it for pickup. Virtual Office also scans letters to searchable PDFs in your portal. You can add physical forwarding by courier.',
      },
      {
        q: 'Do you accept parcels and courier deliveries?',
        a: 'Yes, during opening hours, within reasonable size and security limits. High-value or oversized freight may need prior arrangement. We are not a public post-restante for personal shopping parcels unrelated to your registered company.',
      },
      {
        q: 'Who can collect my mail?',
        a: 'The authorised account manager named on your agreement, or a person you nominate in writing with valid ID. Reception will not release mail to unnamed third parties.',
      },
      {
        q: 'How soon are scans uploaded?',
        a: 'On Virtual Office, incoming letters are typically logged and scanned on the same business day they arrive, then sent to your portal or nominated email.',
      },
    ],
  },
  {
    id: 'billing',
    title: 'Billing, deposits & cancellation',
    intro: 'Monthly versus annual billing, deposits, and how plans end.',
    items: [
      {
        q: 'What do I pay on monthly billing?',
        a: 'You pay the first month plus the stated security deposit. Virtual Office: KES 10,000 + KES 10,000 deposit. Business Address: KES 5,000 + KES 10,000 deposit (two months). Dedicated Desk: KES 20,000 + one-month deposit. Day passes and meeting rooms are prepaid per booking.',
      },
      {
        q: 'How does annual billing work?',
        a: 'You pay 12 months upfront at the lower monthly rate. Under current terms, annual Virtual Office, Business Address, and Dedicated Desk plans do not carry a security deposit. This is the better rate if you are sure you will use the address for a year.',
      },
      {
        q: 'Are there setup fees?',
        a: 'There is no separate setup fee on published plans. Activation still requires a signed agreement and KYC. Deposits on monthly plans are not setup fees; they are refundable after a clean exit.',
      },
      {
        q: 'When is the deposit refunded?',
        a: 'Security deposits on monthly plans are held and refunded within 30 days of completing your term, less any unpaid fees or documented damage, as set out in the master terms.',
      },
      {
        q: 'Do I have to sign a long-term lease?',
        a: 'No. Presence plans are membership agreements billed monthly or annually. Day passes and rooms are pay-as-you-go. You are not taking a conventional office lease.',
      },
      {
        q: 'How do I cancel?',
        a: 'Follow the notice periods in your agreement and the master terms. Annual plans are prepaid for the term. Daily bookings follow the daily booking terms and refund policy.',
      },
      {
        q: 'Which payment methods do you accept?',
        a: 'We accept the methods shown at checkout and on invoices (typically mobile money and bank transfer for Kenya). Confirm the options on your quote or booking screen.',
      },
    ],
  },
  {
    id: 'kyc',
    title: 'Documents & compliance',
    intro: 'What we need before an address can go live.',
    items: [
      {
        q: 'What documents are required?',
        a: 'Registered companies: certificate of incorporation or registration, company documents, valid ID or passport for at least two directors (or the sole director), company contact details, and details of the authorised account manager. Individuals and sole traders: valid ID or passport and contact details. We may request additional KYC if required by law or banking partners.',
      },
      {
        q: 'Why do you need KYC?',
        a: 'A commercial registered address cannot be issued anonymously. KYC protects you, other members, and Paper Street against misuse of the address for fraud or unregistered activity.',
      },
      {
        q: 'Can you refuse an application?',
        a: 'Yes. We may decline or terminate service if KYC is incomplete, the intended use breaches our terms, or the activity is not appropriate for a shared commercial hub.',
      },
    ],
  },
  {
    id: 'location',
    title: 'Kisumu hub & other cities',
    intro: 'Where you work today, and waitlists for expansion cities.',
    items: [
      {
        q: 'Where is the live hub?',
        a: 'Kisumu Central Business District, Kenya, with a commercial presence on Oginga Odinga Street. Use the Locations page for the published address and directions. Reception is open Monday to Saturday, 8:00 AM to 6:00 PM EAT.',
      },
      {
        q: 'Can I tour the space?',
        a: 'Yes. Walk in during opening hours or book a short visit via Contact. Tours cover desks, the boardroom, and how mail is logged.',
      },
      {
        q: 'What about Nairobi, Mombasa, Nakuru, and Eldoret?',
        a: 'Those cities are on the expansion waitlist. Join the waitlist on the Locations page. You will be notified when a hub opens; they are not live inventory today.',
      },
      {
        q: 'Is parking available?',
        a: 'CBD parking is typically on-street or in nearby public lots. Confirm current guidance with reception when you book a meeting or day pass.',
      },
    ],
  },
  {
    id: 'portal',
    title: 'Client portal',
    intro: 'Invoices, mail scans, and bookings after you are a client.',
    items: [
      {
        q: 'What is the client portal for?',
        a: 'Logged-in clients can view invoices, bookings, passes, profile details, and (on Virtual Office) mail scans. Use Log in in the header once your account is activated.',
      },
      {
        q: 'I cannot log in. What should I do?',
        a: 'Use the portal login help or Contact. New address clients receive access after KYC and the first invoice are processed — not at the quote-request stage.',
      },
    ],
  },
]

/** Short list used on the homepage teaser. */
export const HOME_FAQS: FaqItem[] = [
  FAQ_SECTIONS[0].items[2],
  FAQ_SECTIONS[2].items[0],
  FAQ_SECTIONS[5].items[0],
  FAQ_SECTIONS[4].items[0],
  FAQ_SECTIONS[3].items[0],
  FAQ_SECTIONS[1].items[1],
  FAQ_SECTIONS[6].items[0],
  FAQ_SECTIONS[7].items[0],
  FAQ_SECTIONS[6].items[4],
]
