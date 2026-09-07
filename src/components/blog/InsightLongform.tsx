import React from 'react'

type Props = {
  slug: string
  title: string
  category: string
}

function hash(s: string) {
  let h = 2166136261
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return h >>> 0
}

function pick<T>(arr: T[], seed: number, salt: number) {
  return arr[(seed + salt * 17) % arr.length]
}

const PRICING = [
  'Virtual Office is KES 8,000 per month on annual billing (KES 96,000 for the year, with no security deposit under current terms) or KES 10,000 per month plus a one-month deposit on a rolling monthly term.',
  'Business Address is KES 3,500 per month billed annually or KES 5,000 per month plus a two-month deposit if you prefer monthly billing.',
  'A day pass is KES 1,000 for a half day and KES 1,500 for a full day. A ten-day monthly flex pass is KES 14,000.',
  'Dedicated desks are KES 18,000 per month on annual billing or KES 20,000 per month plus a one-month deposit. Meeting rooms are KES 2,000 per hour, KES 7,000 half-day, and KES 12,000 full day.',
]

const INFRA = [
  'The live hub sits in Kisumu CBD on Oginga Odinga Street, open Monday to Saturday from 8:00 AM to 6:00 PM East Africa Time.',
  'Dual-carrier enterprise fibre is there so a single ISP outage does not kill a client call. Automatic standby generation covers typical KPLC interruptions.',
  'Reception logs mail, greets announced visitors, and issues check-in for day passes. Acoustic phone booths and a 4K boardroom sit in the same building.',
  'You do not need a virtual office to buy a day pass, and you do not need a dedicated desk to hold a registered address.',
]

const LEGAL = [
  'Kenyan company law expects a physical registered office, not a P.O. Box alone, for incorporation, CR12 extracts, and many bank KYC files.',
  'Paper Street issues landlord-style confirmation letters after KYC so you can file on eCitizen BRS and present a commercial address to KRA and lenders.',
  'Authorised collectors must match the names on your agreement. We will not hand mail to unnamed third parties.',
  'Activation for address plans is typically within 24 hours of a signed agreement and complete director identification.',
]

const MISTAKES = [
  'Putting an estate house on invoices trains enterprise buyers to discount you before they read the proposal.',
  'Cafes look informal on video, have unreliable power, and cannot sign for statutory mail.',
  'A cheap unused shop in a peri-urban block may fail bank site visits even if the rent is low.',
  'Signing a six-month commercial lease “just in case” locks cash in deposits and fit-out you may never amortise.',
]

const WHO = [
  'Consultants, NGOs, Nairobi companies opening a Western Kenya file, freelancers chasing retainers, and founders who still work from home most days.',
  'Finance, legal, agribusiness, health programmes, and logistics teams who visit Kisumu in bursts rather than every weekday.',
  'Directors who need a CR12-friendly address while the operating team stays distributed.',
  'Anyone who lost a tender or a bank account because the listed premises were residential.',
]

function sectionHeadings(title: string, category: string): string[] {
  return [
    `How this topic — ${title} — shows up in real Kisumu operations`,
    `What “${category}” actually costs when you include time, power, and credibility`,
    `A practical decision framework for ${title}`,
    `Registered address, virtual office, and day pass: which lever you pull first`,
    `Mail, KYC, and the paperwork banks still ask for`,
    `Infrastructure that Western Kenya teams underestimate`,
    `When a meeting room or dedicated desk is the right add-on`,
    `Comparisons: home, cafe, traditional lease, and Paper Street`,
    `A week-in-the-life example tied to ${title}`,
    `Common mistakes we still see on ${category.toLowerCase()} searches`,
    `Who this is for — and who should wait`,
    `How to start this month without a lease`,
    `Pricing snapshot you can put in a board paper`,
    `Risk, cancellation, and what “flexible” really means`,
    `Checklists before you request a quote or book a desk`,
    `What to do next after reading ${title}`,
  ]
}

function slugContext(slug: string, title: string, i: number) {
  const phrase = slug.replace(/-/g, ' ')
  const angles = [
    `Search demand for “${phrase}” is what brought you here; the commercial answer still lives on Oginga Odinga Street rather than in a P.O. Box or a residential plot.`,
    `Teams googling “${phrase}” usually need either a filing-ready address, a quiet desk today, or a room that does not sound like a cafe — sometimes all three across one quarter.`,
    `Treat “${phrase}” as an operations problem, not a branding slogan. ${title} only works if mail, power, fibre, and KYC are boringly reliable.`,
    `If a Nairobi HQ asked why Kisumu still matters for “${phrase}”, the reply is county files, lake-basin counterparties, and site visits that will not move to Westlands.`,
  ]
  return angles[i % angles.length]
}

function para(seed: number, title: string, slug: string, i: number, block: number): string {
  const legal = pick(LEGAL, seed, i + block)
  const infra = pick(INFRA, seed, i + block + 3)
  const price = pick(PRICING, seed, i + block + 5)
  const mistake = pick(MISTAKES, seed, i + block + 7)
  const who = pick(WHO, seed, i + block + 11)
  const local = slugContext(slug, title, i + block + seed)
  const variants = [
    `Readers land on “${title}” because something in the current setup is leaking money or legitimacy. ${local} ${mistake} ${infra} Paper Street treats virtual office, business address, and day pass as the default stack, with meeting rooms and dedicated desks available in the same hub when a pitch or a resident workstation is required. ${legal}`,
    `If you only remember one commercial fact from this section, remember that presence and occupancy are different products. ${local} ${price} Occupancy (a desk today) is booked; presence (an address that survives a bank visit) is quoted after KYC. Mixing those two motions is why “book now” pages confuse finance teams. ${who}`,
    `Kisumu is not a suburb of Nairobi’s office market. County files, lake-basin tenders, and Western Kenya site visits still happen in person. ${local} ${infra} A virtual office here is not a fake brass plate: mail is signed for, scans go to a portal on Virtual Office, and visitors can be greeted when you have booked the boardroom. ${legal}`,
    `Write the cost the way an auditor would. ${price} Then add the hidden line items of a private lease: deposit multiples, service charge, furniture, a receptionist, and generator fuel you will buy in a panic during a blackout. ${mistake} Flexible infrastructure exists specifically so you stop capitalising an empty room. ${local}`,
    `Operations fail in small ways: a KRA notice sits with a relative, a courier cannot find the estate, a director is on the road. ${legal} ${infra} Build a single nominated account manager, a collection rule, and a calendar for boardroom hours included on Virtual Office and Dedicated Desk. Business Address and day-pass clients simply book rooms when needed. ${local}`,
    `Search intent for this article is practical, not theoretical. ${who} Map your next ninety days: filings, client visits, and deep-work days. If filings dominate, start with Business Address or Virtual Office. If deep work dominates this week, book a day pass. If both, you can hold an address plan and still buy desks independently. ${local}`,
    `Governance matters. Annual billing removes the deposit on published presence plans and locks a known rate. Monthly billing costs more per month and holds a deposit refundable after a clean exit under the master terms. Day passes and rooms are prepaid. ${price} Read daily booking terms before a same-day reservation. ${local}`,
    `Credibility compounds. Letterheads, websites, and eCitizen forms that show a CBD commercial centre change how procurement and compliance officers treat the file. ${mistake} You can still live in Milimani or work from Nairobi; the registered office is a legal and commercial instrument, not a demand that you commute daily. ${local}`,
    `Power and connectivity are not amenities in Kisumu; they are the product. ${infra} A day pass that dies mid-call is more expensive than the sticker price. The same is true of an address that cannot receive a bank’s courier. ${price} ${local}`,
    `Procurement language still says “attach proof of premises.” ${legal} Virtual Office and Business Address exist to satisfy that sentence without a six-month deposit on empty floor plates. ${who} ${local}`,
    `If you host once a month, buy hours. If you host weekly, include hours in Virtual Office or Dedicated Desk. If you never host, still keep a boardroom option for the one meeting that wins a contract. ${infra} ${local}`,
    `Cancellation is a feature of flexible space only if you read the term: annual prepaid presence, monthly with deposit, or daily prepaid. ${price} ${mistake} ${local}`,
  ]
  return pick(variants, seed, i * 5 + block * 3)
}

function extraList(_seed: number, title: string): string[] {
  const items = [
    `Confirm whether you need registered-office use (BRS, KRA, banks) or only a quiet desk this week — “${title}” often mixes both.`,
    'Collect IDs for directors and the authorised account manager before you request an address quote.',
    'Decide annual versus monthly billing using cash-flow, not optimism; deposits apply on monthly presence plans.',
    'Name who may collect physical mail and who receives PDF scans.',
    'Diary hub hours (Monday–Saturday, 8:00–18:00) around county and bank queues.',
    'Book meeting rooms as a separate SKU unless your plan includes hours.',
    'Test the commute to Oginga Odinga Street once before you host a high-stakes visitor.',
    'Keep the portal login for invoices and scans off shared intern emails.',
    'Do not print a P.O. Box as if it were a registered office.',
    'If you outgrow a day pass, quote a dedicated desk instead of leaping to a raw lease.',
    'Join city waitlists only as waitlists — Nairobi, Mombasa, Nakuru, and Eldoret are not live hubs yet.',
    'Align refund expectations with daily booking terms for passes and rooms.',
  ]
  return items
}

export function InsightLongform({ slug, title, category }: Props) {
  const seed = hash(slug + title)
  const headings = sectionHeadings(title, category)
  const checks = extraList(seed, title)

  return (
    <div className="insight-longform mt-12 pt-10 border-t border-navy/15">
      <p>
        The short briefing above is the headline. The rest of this guide is the operating manual behind
        {' '}
        <strong>{title}</strong>
        {' '}
        for teams who will actually file, invoice, sit a client down, or work a full day in Kisumu. It is written so you can hand it to a co-founder, a finance officer, or a Nairobi HQ that still thinks Western Kenya is “just a trip.”
      </p>
      {headings.map((h2, i) => (
        <React.Fragment key={h2}>
          <h2>{h2}</h2>
          <p>{para(seed, title, slug, i, 0)}</p>
          <p>{para(seed, title, slug, i, 1)}</p>
          <p>{para(seed, title, slug, i, 2)}</p>
          <p>{para(seed, title, slug, i, 3)}</p>
          {i === 12 ? (
            <ul>
              {PRICING.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          ) : null}
          {i === 14 ? (
            <ul>
              {checks.slice(0, 10).map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          ) : null}
        </React.Fragment>
      ))}
      <h2>Closing position</h2>
      <p>
        {title}
        {' '}
        is not a slogan. It is a stack of address, mail, desks, and rooms that you can turn on without a traditional lease. Start with a
        {' '}
        <a href="/quote/virtual-office">virtual office quote</a>
        {' '}
        or a
        {' '}
        <a href="/quote/business-address">business address quote</a>
        {' '}
        if filings and banks are the constraint. Book a
        {' '}
        <a href="/book/hot-desk">day pass</a>
        {' '}
        if you need the hub this week. Keep
        {' '}
        <a href="/faq">the FAQ</a>
        {' '}
        and
        {' '}
        <a href="/pricing">pricing</a>
        {' '}
        open while you decide. Meeting rooms and dedicated desks remain one click away in the same Kisumu building.
      </p>
    </div>
  )
}

export function countLongformWords(slug: string, title: string, category: string) {
  const seed = hash(slug + title)
  const headings = sectionHeadings(title, category)
  const text = [
    title,
    ...headings,
    ...headings.flatMap((_, i) => [
      para(seed, title, slug, i, 0),
      para(seed, title, slug, i, 1),
      para(seed, title, slug, i, 2),
      para(seed, title, slug, i, 3),
    ]),
    ...PRICING,
    ...extraList(seed, title),
  ].join(' ')
  return text.trim().split(/\s+/).length
}
