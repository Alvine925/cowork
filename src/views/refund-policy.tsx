'use client'

import { PageHero } from '@/components/ui/PageHero'

const lastUpdated = 'August 25, 2026'

export default function RefundPolicyPage() {
  return (
    <>
      <PageHero
        image="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600&auto=format&q=80"
        eyebrow="Financial & Contractual Policies"
        title="Refund & Cancellation Policy."
        subtitle="Binding contract obligations, early termination liabilities, and 30-day deposit return protocols."
        height="h-[50vh] min-h-[380px]"
      />
      <section className="py-24 bg-[#fbfaf7]">
        <div className="container mx-auto px-6 md:px-12 max-w-4xl text-[#2b4c3b] leading-relaxed">
          <p className="text-sm text-[#2b4c3b]/60 mb-12 uppercase tracking-widest font-mono">
            Last Updated: {lastUpdated}
          </p>

          <h2 className="font-heading text-2xl md:text-3xl text-[#2b4c3b] mt-12 mb-6 border-b border-[#2b4c3b]/10 pb-3">
            1. Binding Contract Commitment & Mid-Term Departure Liability
          </h2>
          <p className="mb-6">
            When a Client enters into a service contract with Paper Street (whether on an annual contract or a fixed-term monthly agreement), that agreement represents a legally binding, non-cancellable financial commitment for the entire duration of the agreed contract term.
          </p>
          <div className="p-6 bg-[#2b4c3b]/5 border-l-4 border-[#ebff48] mb-8">
            <h3 className="font-heading text-lg text-[#2b4c3b] font-bold mb-2">
              Mandatory Remainder Term Payment Obligation:
            </h3>
            <p className="text-sm text-[#2b4c3b]/90 leading-relaxed mb-3">
              If a Client chooses to vacate the premises, cease utilizing services, or attempt to terminate their agreement prior to the formal expiry of their contract term, the Client remains fully and legally obligated to pay all subscription fees for the entire remainder of the contracted period.
            </p>
            <p className="text-sm text-[#2b4c3b]/90 leading-relaxed">
              Early departure, voluntary non-use of services, or business closure does not release the Client from its contractual financial obligations. In the event of default or early abandonment without full settlement of the remaining contract balance, Paper Street reserves the full legal right to initiate debt collection procedures, report defaults to licensed Credit Reference Bureaus (CRBs), and commence formal legal proceedings in the courts of Kenya to recover all outstanding fees, accrued interest, and associated legal and enforcement expenses.
            </p>
          </div>

          <h2 className="font-heading text-2xl md:text-3xl text-[#2b4c3b] mt-12 mb-6 border-b border-[#2b4c3b]/10 pb-3">
            2. Security Deposit Policy & 30-Day Refund Protocol
          </h2>
          <p className="mb-6">
            Security deposits protect the facility against defaults, physical property damage, unreturned credentials, and statutory address liabilities:
          </p>
          <ul className="list-disc pl-6 mb-6 space-y-3">
            <li>
              <strong>Annual Upfront Subscriptions (Zero Deposit):</strong> Clients who subscribe to a 12-month annual plan and pay the full annual fee upfront are granted a <strong>Zero Security Deposit (KES 0 deposit)</strong> benefit.
            </li>
            <li>
              <strong>Monthly Subscriptions (Two Months Refundable Deposit):</strong> Clients on monthly billing terms must pay a mandatory <strong>Two Months Refundable Security Deposit</strong> prior to service activation. This deposit is held separately and cannot be applied by the Client to offset monthly subscription fees during an active contract.
            </li>
            <li>
              <strong>30-Day Deposit Return Timeline:</strong> Eligible security deposits are processed and refunded exactly <strong>30 calendar days</strong> after the contract has formally ended and the Client has fully vacated the premises.
            </li>
            <li>
              <strong>Mandatory Deductions Prior to Refund:</strong> Before any deposit balance is disbursed, Paper Street will audit and deduct:
              <ul className="list-circle pl-6 mt-2 space-y-2">
                <li>Any unpaid subscription balances, utility surcharges, or late payment penalties.</li>
                <li>Costs associated with physical repairs, room damage, or missing furniture/equipment.</li>
                <li>Replacement fees for unreturned access keycards or building credentials (KES 2,500 per card).</li>
                <li>Accumulated courier forwarding charges or overdue parcel storage fees.</li>
              </ul>
            </li>
            <li>
              <strong>Mandatory Proof of Address Change (BRS Form CR9):</strong> For virtual office and registered business address clients, no security deposit will be released until the Client submits certified documentary proof from the Business Registration Service (BRS Form CR9 and updated CR12) confirming that the registered office has been officially changed away from Paper Street commercial premises.
            </li>
          </ul>

          <h2 className="font-heading text-2xl md:text-3xl text-[#2b4c3b] mt-12 mb-6 border-b border-[#2b4c3b]/10 pb-3">
            3. Cancellation & Refund Rules by Service Category
          </h2>
          <ul className="list-disc pl-6 mb-6 space-y-3">
            <li>
              <strong>Contracted Virtual Office & Office Leases:</strong> Non-refundable. Clients are liable for all monthly fees through the end of their agreed contract term.
            </li>
            <li>
              <strong>Prepaid Annual Plans:</strong> Annual plans represent discounted bulk commitments and are non-refundable once activated. If a cancellation request is submitted within 14 days of initial signup prior to any address usage or documentation issuance, a refund may be granted minus an administrative processing fee of KES 5,000.
            </li>
            <li>
              <strong>Meeting Room & Boardroom Reservations:</strong> Cancellations made at least 24 hours prior to the scheduled booking time receive a 100% booking credit. Cancellations made with less than 24 hours notice are non-refundable and charged in full.
            </li>
            <li>
              <strong>Day Passes & Event Bookings:</strong> Day passes and event space bookings are non-refundable once purchased.
            </li>
          </ul>

          <h2 className="font-heading text-2xl md:text-3xl text-[#2b4c3b] mt-12 mb-6 border-b border-[#2b4c3b]/10 pb-3">
            4. Summary of Non-Refundable Charges
          </h2>
          <ul className="list-disc pl-6 mb-6 space-y-3">
            <li>One-time onboarding and administrative setup fees.</li>
            <li>Subscription fees paid for elapsed or active contract months.</li>
            <li>Fees paid to third-party courier companies for parcel forwarding.</li>
            <li>Late payment interest charges and legal enforcement recovery costs.</li>
          </ul>

          <h2 className="font-heading text-2xl md:text-3xl text-[#2b4c3b] mt-12 mb-6 border-b border-[#2b4c3b]/10 pb-3">
            5. Formal Deposit Refund Procedure
          </h2>
          <p className="mb-4">
            Upon the formal conclusion of your contract term, please submit your deposit refund request to our finance department:
          </p>
          <ul className="list-none pl-0 space-y-2 text-[#2b4c3b]/80 font-mono text-sm">
            <li><strong>Finance & Billing Desk:</strong> billing@paperstreet.africa</li>
            <li><strong>Legal & Compliance Desk:</strong> legal@paperstreet.africa</li>
            <li><strong>Subject Line:</strong> Deposit Refund Request - [Your Company Name] - Contract End Date: [DD/MM/YYYY]</li>
            <li><strong>Required Attachments:</strong> (1) Certified BRS Form CR9 / updated CR12; (2) Keycard return confirmation receipt; (3) M-Pesa / Bank disbursement details.</li>
          </ul>
        </div>
      </section>
    </>
  )
}
