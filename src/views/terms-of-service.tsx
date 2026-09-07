'use client'

import { PageHero } from '@/components/ui/PageHero'

const lastUpdated = 'August 25, 2026'

export default function TermsOfServicePage() {
  return (
    <>
      <PageHero
        image="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1600&auto=format&q=80"
        eyebrow="Legal & Regulatory Framework"
        title="Terms of Service."
        subtitle="Please read these terms carefully before subscribing to or utilizing any Paper Street service."
        height="h-[50vh] min-h-[380px]"
      />
      <section className="py-24 bg-[#fbfaf7]">
        <div className="container mx-auto px-6 md:px-12 max-w-4xl text-[#2b4c3b] leading-relaxed">
          <p className="text-sm text-[#2b4c3b]/60 mb-12 uppercase tracking-widest font-mono">
            Last Updated: {lastUpdated}
          </p>

          <h2 className="font-heading text-2xl md:text-3xl text-[#2b4c3b] mt-12 mb-6 border-b border-[#2b4c3b]/10 pb-3">
            1. About Paper Street and These Terms
          </h2>
          <p className="mb-6">
            Paper Street ("Paper Street", "we", "us", or "our") operates commercial coworking spaces, private office suites, meeting rooms, and virtual office business address services across Kenya, including our flagship commercial facilities at Kisumu CBD Commercial Center on Oginga Odinga Street in Kisumu CBD and Westlands in Nairobi.
          </p>
          <p className="mb-6">
            By subscribing to a Paper Street plan, completing an onboarding agreement, using our website, or accessing any of our physical premises or virtual services, you ("the Client", "Member", or "you") agree to be bound by these Terms of Service. These terms constitute a legally binding contract between you and Paper Street under the Laws of the Republic of Kenya. If you do not agree to these terms, you may not use our services.
          </p>
          <p className="mb-6">
            If you are entering into this agreement on behalf of a corporate entity, limited liability partnership, NGO, or trust, you expressly represent and warrant that you possess the requisite legal authority to bind that entity to these terms. In that case, "you" refers to that legal entity.
          </p>

          <h2 className="font-heading text-2xl md:text-3xl text-[#2b4c3b] mt-12 mb-6 border-b border-[#2b4c3b]/10 pb-3">
            2. Scope of Services Provided
          </h2>
          <p className="mb-6">
            Paper Street offers the following categories of commercial workspace and administrative services, subject to availability and specific plan selections:
          </p>
          <ul className="list-disc pl-6 mb-6 space-y-3">
            <li>
              <strong>Virtual Office & Business Address:</strong> An official commercial building street address on Oginga Odinga Street in Kisumu CBD for use as your registered office under Section 47 of the Companies Act 2015, eCitizen Business Registration Service (BRS) incorporation, KRA PIN registration, commercial banking KYC vetting, and business correspondence.
            </li>
            <li>
              <strong>Mail Handling & Digitization:</strong> Physical receipt, logging, parcel signing, secure storage, and confidential same-day high-resolution PDF scanning of incoming mail from carriers including DHL, G4S, Fargo Courier, Speedaf, and Posta.
            </li>
            <li>
              <strong>Executive Meeting Rooms & Boardroom Suites:</strong> Access to fully equipped, acoustically treated 4 to 6 person (4-6 pax) meeting rooms featuring 4K presentation display screens with HDMI and wireless casting, magnetic dry-erase whiteboards, ergonomic mesh seating, dual-carrier enterprise fibre internet, and automatic standby generator backup power.
            </li>
            <li>
              <strong>Coworking Desks (Hot Desks & Dedicated Desks):</strong> Flexible or reserved ergonomic workstation access within our commercial coworking environments, supported by climate-controlled AC and high-speed internet.
            </li>
            <li>
              <strong>Private Office Suites:</strong> Fully enclosed, secure, furnished private commercial office suites for teams, including utilities, cleaning, reception greeting, and high-speed connectivity.
            </li>
            <li>
              <strong>Front-Desk Concierge Services:</strong> On-site reception personnel who greet visiting clients, sign for incoming deliveries, and handle guest intake during business hours (8:00 AM to 6:00 PM, Monday through Friday).
            </li>
          </ul>

          <h2 className="font-heading text-2xl md:text-3xl text-[#2b4c3b] mt-12 mb-6 border-b border-[#2b4c3b]/10 pb-3">
            3. Onboarding and Statutory KYC Compliance
          </h2>
          <p className="mb-6">
            In compliance with the Proceeds of Crime and Anti-Money Laundering Act (POCAMLA) and Kenyan commercial tenancy standards, service activation is contingent upon successful submission and verification of mandatory Know Your Customer (KYC) documentation:
          </p>
          <ul className="list-disc pl-6 mb-6 space-y-3">
            <li>A clear copy of the National ID card or valid Passport for all primary directors, partners, or beneficial owners.</li>
            <li>KRA PIN Certificate for all directors and the registered business entity (if existing).</li>
            <li>For incorporated companies: Certificate of Incorporation, current Form CR12 (issued within the last 90 days), and Memorandum & Articles of Association.</li>
            <li>For business names: Certificate of Registration of Business Name.</li>
            <li>For NGOs and trusts: Certificate of Registration from the NGO Coordination Board or Registrar of Documents, accompanied by the official list of trustees / officials.</li>
            <li>Proof of authorized physical residential address for primary directors (utility bill, bank statement, or tenancy agreement dated within the last 3 months).</li>
          </ul>
          <p className="mb-6">
            All KYC documentation must be submitted within 14 calendar days of plan initiation. Services, including address authorization letters and mail intake, will not be activated until documentation has been formally approved by Paper Street compliance. If documents are not furnished within 30 days, Paper Street reserves the right to terminate the account and retain any administrative setup fees incurred.
          </p>

          <h2 className="font-heading text-2xl md:text-3xl text-[#2b4c3b] mt-12 mb-6 border-b border-[#2b4c3b]/10 pb-3">
            4. Subscription Plans, Pricing & Security Deposit Policy
          </h2>
          <p className="mb-6">
            Paper Street services are structured around clear, non-negotiable financial terms. All indicative rates are quoted in Kenyan Shillings (KES).
          </p>

          <h3 className="font-heading text-xl text-[#2b4c3b] mt-8 mb-4">
            Security Deposit Policy (CRITICAL TERMS):
          </h3>
          <ul className="list-disc pl-6 mb-6 space-y-3">
            <li>
              <strong>Annual Upfront Subscriptions (Zero Security Deposit):</strong> Clients who subscribe to a 12-month annual plan and pay the full annual fee upfront enjoy a <strong>Zero Security Deposit (KES 0 deposit)</strong> benefit. The standard annual rate for the basic business address plan starts from KES 3,500 / month, billed as an upfront annual payment of KES 42,000 / year.
            </li>
            <li>
              <strong>Monthly Rolling Subscriptions (Two Months Refundable Security Deposit):</strong> Clients who choose flexible month-to-month billing must pay the first month subscription fee plus a mandatory <strong>Two Months Refundable Security Deposit</strong> prior to service activation (e.g., KES 5,000 first month + KES 10,000 refundable deposit = KES 15,000 total initial payment for a standard monthly address package).
            </li>
            <li>
              <strong>Nature and Handling of the Security Deposit:</strong> The security deposit is not an advance rental payment and cannot be applied by the Client to offset monthly subscription fees during an active contract term. Paper Street holds the deposit as security against unpaid invoices, unreturned access tokens, physical property damage, or unpaid courier forwarding charges.
            </li>
            <li>
              <strong>Deposit Refund Protocol (30-Day Timeline & Deductions):</strong> The security deposit is refundable exactly <strong>30 calendar days</strong> following formal contract conclusion and complete vacation of premises, subject to: (a) full settlement of all outstanding invoices; (b) deduction of any physical property repairs or damages; (c) deduction for unreturned access keycards (KES 2,500 per card); (d) settlement of courier forwarding or storage fees; and (e) submission of certified documentary proof from BRS (Form CR9 and updated CR12) confirming that the Client has legally changed its registered office address away from Paper Street premises.
            </li>
          </ul>

          <h3 className="font-heading text-xl text-[#2b4c3b] mt-8 mb-4">
            Indicative Service Pricing Schedule:
          </h3>
          <ul className="list-disc pl-6 mb-6 space-y-3">
            <li><strong>Virtual Business Address (Annual Upfront):</strong> Starts from KES 3,500 / month (billed annually at KES 42,000 / year with Zero Deposit).</li>
            <li><strong>Virtual Business Address (Monthly Rolling):</strong> Starts from KES 5,000 / month + 2 months refundable security deposit.</li>
            <li><strong>Virtual Office Pro (Digital Scanning & Boardrooms):</strong> Starts from KES 6,500 / month.</li>
            <li><strong>Coworking Day Pass:</strong> Starts from KES 1,000 / day.</li>
            <li><strong>Hot Desk Monthly Membership:</strong> Starts from KES 12,000 / month.</li>
            <li><strong>Dedicated Desk Monthly Membership:</strong> Starts from KES 16,500 / month.</li>
            <li><strong>Private Serviced Office Suite:</strong> Starts from KES 28,000 / month.</li>
            <li><strong>Executive Boardroom / Meeting Room Hire (4-6 Pax):</strong> Starts from KES 1,500 / hour.</li>
          </ul>

          <h2 className="font-heading text-2xl md:text-3xl text-[#2b4c3b] mt-12 mb-6 border-b border-[#2b4c3b]/10 pb-3">
            5. Legal Address Authorization & Restrictions on Use
          </h2>
          <p className="mb-6">
            A valid Paper Street subscription grants the Client a limited, non-exclusive, revocable license to utilize the designated commercial address (e.g., Kisumu CBD Commercial Center, Oginga Odinga Street, Kisumu CBD) strictly in accordance with these terms.
          </p>
          <ul className="list-disc pl-6 mb-6 space-y-3">
            <li>
              <strong>No Property Right Created:</strong> A subscription does not create any tenancy, sublease, leasehold title, or property ownership right in Paper Street real estate.
            </li>
            <li>
              <strong>Cessation of Use Upon Contract Expiry:</strong> If your subscription expires, is suspended for non-payment, or is terminated by either party, you must immediately cease displaying, marketing, or filing the Paper Street address as your registered office, trading address, or place of operation.
            </li>
            <li>
              <strong>Mandatory BRS Change of Address:</strong> Within 30 calendar days of contract termination, you must file Form CR9 with the Business Registration Service (BRS) to remove the Paper Street address from your company public record and provide a certified copy of the updated CR12 to Paper Street.
            </li>
            <li>
              <strong>Unauthorized Address Usage Sanctions:</strong> Any unauthorized use of a Paper Street address without an active, paid contract constitutes fraudulent misrepresentation under Kenyan law. Paper Street reserves the right to notify the Registrar of Companies, KRA, commercial banks, law enforcement authorities, and credit reference bureaus, while assessing an unauthorized usage penalty of KES 15,000 per month until official deregistration is proven.
            </li>
          </ul>

          <h2 className="font-heading text-2xl md:text-3xl text-[#2b4c3b] mt-12 mb-6 border-b border-[#2b4c3b]/10 pb-3">
            6. Permitted vs Prohibited Activities
          </h2>
          <p className="mb-6">
            You agree to use Paper Street facilities and address rights solely for legitimate, lawful commercial purposes. You expressly agree not to utilize our services, address, or premises for:
          </p>
          <ul className="list-disc pl-6 mb-6 space-y-3">
            <li>Any illegal, fraudulent, deceptive, or misleading business activity under the Laws of Kenya.</li>
            <li>Unlicensed deposit-taking, pyramid schemes, multi-level marketing scams, or unregulated financial intermediation.</li>
            <li>Activities that violate the Computer Misuse and Cybercrimes Act, data privacy legislation, or anti-money laundering statutes.</li>
            <li>Receiving, storing, or handling hazardous materials, controlled chemicals, perishable goods, or contraband on our physical premises.</li>
            <li>Harassment, abusive behavior, or defamation directed toward Paper Street personnel or fellow workspace members.</li>
          </ul>
          <p className="mb-6">
            Paper Street reserves the right to immediately terminate any membership without refund and report the matter to statutory authorities if unlawful or fraudulent activity is detected.
          </p>

          <h2 className="font-heading text-2xl md:text-3xl text-[#2b4c3b] mt-12 mb-6 border-b border-[#2b4c3b]/10 pb-3">
            7. Mail, Parcel Intake & Storage Protocols
          </h2>
          <p className="mb-6">
            Paper Street acts as an authorized intake agent for mail and parcels delivered to your registered business name:
          </p>
          <ul className="list-disc pl-6 mb-6 space-y-3">
            <li>
              <strong>Intake & Holding Period:</strong> Standard letters and packages will be held free of storage charge for up to 30 calendar days from receipt. Items uncollected after 30 days incur a storage fee of KES 50 per item per day.
            </li>
            <li>
              <strong>Uncollected Items Beyond 90 Days:</strong> Any parcel or letter uncollected after 90 days from arrival notice will be returned to sender or disposed of responsibly without liability to Paper Street.
            </li>
            <li>
              <strong>Digital PDF Scanning:</strong> For Virtual Office Pro members, authorized envelopes are opened in a private, confidential setting and scanned in high resolution (300 DPI) to PDF within one business day.
            </li>
            <li>
              <strong>Limitation of Parcel Liability:</strong> Paper Street is not liable for goods lost or damaged by third-party delivery couriers prior to physical intake. Our maximum liability for any parcel lost or damaged while in our physical custody is strictly limited to KES 5,000 per consignment or the declared shipping label value, whichever is lower. Members are advised to insure high-value goods directly with their carriers.
            </li>
          </ul>

          <h2 className="font-heading text-2xl md:text-3xl text-[#2b4c3b] mt-12 mb-6 border-b border-[#2b4c3b]/10 pb-3">
            8. Meeting Room & Workspace Code of Conduct
          </h2>
          <p className="mb-6">
            When utilizing physical meeting rooms, hot desks, or dedicated offices at our Kisumu CBD or Nairobi centers:
          </p>
          <ul className="list-disc pl-6 mb-6 space-y-3">
            <li>
              <strong>Cancellation Notice:</strong> Meeting room bookings must be cancelled at least 24 hours prior to the scheduled start time to receive a full booking credit. Cancellations within less than 24 hours are charged in full.
            </li>
            <li>
              <strong>Suite Capacities:</strong> Executive meeting suites are strictly configured for 4 to 6 people (4-6 pax). Room capacity limits must be adhered to at all times to maintain building acoustic comfort and safety standards.
            </li>
            <li>
              <strong>Equipment Care:</strong> Members are responsible for the proper use of 4K display screens, presentation cables, whiteboards, and furnishings. Any physical damage caused during a booking will be invoiced to the Client at full replacement cost.
            </li>
            <li>
              <strong>Acoustic Environment:</strong> High-volume phone calls and open speaker conversations must be conducted with headsets or within designated acoustic phone booths to avoid disturbing neighboring professionals.
            </li>
          </ul>

          <h2 className="font-heading text-2xl md:text-3xl text-[#2b4c3b] mt-12 mb-6 border-b border-[#2b4c3b]/10 pb-3">
            9. Payment Terms, Billing Cycles & Grace Periods
          </h2>
          <p className="mb-6">
            Invoices are issued electronically via email. Accepted payment channels include M-Pesa Buy Goods / Till, direct bank wire transfer (RTGS / EFT), Visa, and Mastercard. Paper Street does not accept cash payments.
          </p>
          <ul className="list-disc pl-6 mb-6 space-y-3">
            <li>
              <strong>Payment Due Dates:</strong> Monthly renewal invoices are due on the 1st day of each billing cycle.
            </li>
            <li>
              <strong>7-Day Grace Period:</strong> If payment is not received by the due date, a reminder notice is sent. If payment remains outstanding after 7 calendar days, all services (including mail scanning, phone answering, and physical building access) will be automatically suspended.
            </li>
            <li>
              <strong>Account Termination for Default:</strong> Accounts with payments in default beyond 30 calendar days will be permanently terminated, and the 2-month security deposit will be forfeited to offset arrears and administrative closure costs.
            </li>
          </ul>

          <h2 className="font-heading text-2xl md:text-3xl text-[#2b4c3b] mt-12 mb-6 border-b border-[#2b4c3b]/10 pb-3">
            10. Binding Contract Commitments, Early Departure & Legal Action
          </h2>
          <p className="mb-6">
            When entering into a service agreement with Paper Street (whether for an annual term or a fixed-period monthly contract), the Client commits to the full financial obligation for the entirety of the agreed contract term:
          </p>
          <ul className="list-disc pl-6 mb-6 space-y-3">
            <li>
              <strong>Remainder Term Payment Obligation:</strong> If a Client chooses to vacate the premises, cease utilizing services, or attempt to leave midway prior to the agreed contract expiration date, the Client remains legally and financially obligated to pay all subscription fees for the entire remaining months of the contracted period.
            </li>
            <li>
              <strong>Right to Initiate Legal Proceedings:</strong> Early departure or voluntary non-use does not discharge the Client from its contractual obligations. If a Client defaults on its remaining contract balance, Paper Street reserves the full legal right to initiate debt recovery procedures, report defaults to licensed Credit Reference Bureaus (CRBs), and commence formal legal proceedings in the courts of Kenya to recover all outstanding fees, accrued statutory interest, and all associated legal and court enforcement expenses.
            </li>
            <li>
              <strong>Contract Termination by Mutual Agreement:</strong> Early termination without remainder term liability is permissible only where expressly agreed in a formal written contract addendum signed by an authorized director of Paper Street.
            </li>
          </ul>

          <h2 className="font-heading text-2xl md:text-3xl text-[#2b4c3b] mt-12 mb-6 border-b border-[#2b4c3b]/10 pb-3">
            11. Limitation of Liability and Indemnification
          </h2>
          <p className="mb-6">
            To the fullest extent permissible under Kenyan law, Paper Street, its parent companies, directors, and employees shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of business profits, tender disqualifications, or data loss arising from service interruptions or courier delays.
          </p>
          <p className="mb-6">
            Our aggregate liability for any direct claim arising out of or related to these terms shall not exceed the total subscription fees paid by the Client to Paper Street in the three (3) calendar months immediately preceding the event giving rise to the claim.
          </p>
          <p className="mb-6">
            The Client agrees to defend, indemnify, and hold harmless Paper Street from any claims, damages, liabilities, and legal expenses arising from the Client unlawful use of the address, breach of these terms, or statutory tax defaults.
          </p>

          <h2 className="font-heading text-2xl md:text-3xl text-[#2b4c3b] mt-12 mb-6 border-b border-[#2b4c3b]/10 pb-3">
            12. Governing Law and Dispute Resolution
          </h2>
          <p className="mb-6">
            These Terms of Service are governed by and construed in accordance with the Laws of the Republic of Kenya.
          </p>
          <p className="mb-6">
            In the event of any dispute or controversy arising out of these terms, the parties agree to first engage in good-faith executive negotiations for a period of 30 days. If the dispute remains unresolved, the matter shall be referred to final and binding mediation under the rules of the Nairobi Centre for International Arbitration (NCIA) before any party may initiate formal court litigation.
          </p>

          <h2 className="font-heading text-2xl md:text-3xl text-[#2b4c3b] mt-12 mb-6 border-b border-[#2b4c3b]/10 pb-3">
            13. Legal Contact & Corporate Notices
          </h2>
          <p className="mb-4">
            For formal legal inquiries, contract notifications, or compliance submissions, contact:
          </p>
          <ul className="list-none pl-0 space-y-2 text-[#2b4c3b]/80 font-mono text-sm">
            <li><strong>Legal Desk:</strong> legal@paperstreet.africa</li>
            <li><strong>Client Support:</strong> hello@paperstreet.africa</li>
            <li><strong>Kisumu Commercial Center:</strong> Oginga Odinga Street, Kisumu CBD, Kenya</li>
            <li><strong>Nairobi Commercial Center:</strong> Westlands Business Park, Waiyaki Way, Nairobi, Kenya</li>
          </ul>
        </div>
      </section>
    </>
  )
}
