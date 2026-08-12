import { PageHero } from '@/components/ui/PageHero'

const lastUpdated = 'July 1, 2025'

export default function TermsOfServicePage() {
  return (
    <>
      <PageHero
        image="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1600&auto=format&q=80"
        eyebrow="Legal"
        title="Terms of Service."
        subtitle="Please read these terms carefully before using any Paper Street service."
        height="h-[50vh] min-h-[380px]"
      />
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 md:px-12 max-w-3xl prose prose-gray prose-headings:font-heading prose-headings:text-navy">

          <p className="text-sm text-dark-gray/50 not-prose mb-12">Last updated: {lastUpdated}</p>

          <h2>1. About Paper Street and These Terms</h2>
          <p>
            Paper Street ("Paper Street", "we", "us", or "our") provides virtual office services and optional add-ons to businesses in Kenya.
          </p>
          <p>
            By signing up for a Paper Street plan, using our website, or accessing any of our services, you ("the Client" or "you") agree to be bound by these Terms of Service. These terms constitute a legally binding agreement between you and Paper Street. If you do not agree to these terms, you may not use our services.
          </p>
          <p>
            If you are entering into this agreement on behalf of a company or other legal entity, you represent that you have the authority to bind that entity to these terms. In that case, "you" refers to that entity.
          </p>

          <h2>2. Services Provided</h2>
          <p>Paper Street offers the following categories of services, each subject to availability in your selected location:</p>
          <ul>
            <li><strong>Virtual Office:</strong> Our core service — a prestigious business address you can use for company registration, banking, and correspondence, with mail handling and a dedicated phone number with call answering included. Optional add-ons such as workspace access can be added to any plan.</li>
            <li><strong>Business Address Registration:</strong> Use of a Paper Street address as your official registered business address for government filings, banking, and correspondence.</li>
            <li><strong>Mail Handling and Forwarding:</strong> Receipt, sorting, scanning, and forwarding of physical mail and parcels delivered to your Paper Street address. Packages exceeding 5 kg or 50 cm in any dimension may be subject to additional storage fees.</li>
            <li><strong>Workspace Add-ons:</strong> Optional bookable workspace access at selected locations, available by the hour or half-day subject to availability and advance notice as agreed in writing.</li>
            <li><strong>Hot Desks and Dedicated Desks:</strong> Flexible or reserved desk space in our coworking environments at participating locations.</li>
            <li><strong>Reception Services:</strong> A trained receptionist who answers calls in your company name, greets visitors at your registered address, and relays messages according to your instructions.</li>
            <li><strong>Company Registration Assistance:</strong> Guidance and document preparation support for registering a business with the Registrar of Companies in Kenya. Note that Paper Street is not a law firm and does not provide legal advice. We assist with document preparation only.</li>
            <li><strong>Business Expansion Support:</strong> Advisory and logistical support for businesses seeking to establish a presence in additional Kenyan cities.</li>
          </ul>
          <p>
            The specific services included in your subscription are detailed in your chosen plan at the time of signup. Paper Street reserves the right to modify service offerings with 30 days written notice to active clients.
          </p>

          <h2>3. Account Registration and KYC Compliance</h2>
          <p>
            To activate any Paper Street service, you must complete our onboarding process, which includes providing the following documents in accordance with Kenyan anti-money laundering and Know Your Customer (KYC) regulations:
          </p>
          <ul>
            <li>A copy of your national ID, passport, or other government-issued photo identification.</li>
            <li>A recent utility bill, bank statement, or official document confirming your residential address (issued within the last three months).</li>
            <li>For companies: a copy of the Certificate of Incorporation, CR12 form (list of directors and shareholders), and the KRA PIN certificate.</li>
            <li>For NGOs and associations: a copy of the certificate of registration and list of officials.</li>
          </ul>
          <p>
            All KYC documents must be submitted within 14 days of signup. Services will not be activated until documentation has been reviewed and approved. If documents are not provided within 30 days, Paper Street reserves the right to cancel the subscription and withhold any setup fees already paid.
          </p>
          <p>
            You are responsible for keeping your account information accurate and up to date. If your business ownership, directorship, or registered address changes, you must notify us in writing within 14 days.
          </p>

          <h2>4. Permitted and Prohibited Use</h2>
          <p>You may use Paper Street services for any lawful business purpose. You agree not to use our address or services in connection with:</p>
          <ul>
            <li>Any business activity that is illegal under Kenyan law or the laws of any jurisdiction in which you operate.</li>
            <li>Pyramid schemes, ponzi schemes, or any unlicensed financial services business.</li>
            <li>Activities that are deceptive, fraudulent, or misleading to consumers or regulators.</li>
            <li>Businesses that are required by law to maintain a physical staffed office (e.g. certain financial institutions) where a virtual office would not satisfy regulatory requirements, without disclosing this to Paper Street in writing.</li>
            <li>Storing controlled substances, hazardous materials, perishable goods, or any items that are illegal to possess on our premises.</li>
            <li>Harassment, defamation, or abuse of Paper Street staff or other clients.</li>
          </ul>
          <p>
            Paper Street may terminate your account immediately and without refund if we determine, in our sole discretion, that your use of our services violates any of the above prohibitions or poses a legal or reputational risk to Paper Street or our staff.
          </p>

          <h2>5. Subscription Plans and Payment Terms</h2>
          <p>
            Paper Street services are offered on a monthly or annual subscription basis. Prices are listed in Kenyan Shillings (KES) inclusive of applicable taxes unless otherwise stated.
          </p>
          <ul>
            <li><strong>Monthly subscriptions</strong> are billed in advance at the start of each billing cycle. Your first payment includes the first month's subscription plus a two-month security deposit: KES 8,400 for Basic, KES 12,000 for Professional, or KES 24,000 for Premium.</li>
            <li><strong>Annual subscriptions</strong> are billed in full at the start of the annual term. The current annual prices are KES 42,000 for Basic, KES 60,000 for Professional, and KES 120,000 for Premium. No security deposit is required for annual customers under these plan terms.</li>
            <li><strong>Add-ons and one-time services</strong> (such as additional meeting room hours, mail forwarding fees, or parcel handling) are invoiced at the end of the calendar month in which they are used.</li>
          </ul>
          <p>
            Accepted payment methods include M-Pesa, bank transfer, Visa, and Mastercard. Paper Street does not accept cash payments. Invoices are sent electronically to the email address on file.
          </p>
          <p>
            If a payment is not received by the due date, Paper Street will send a reminder. If payment remains outstanding after a 7-day grace period, services (including mail handling and phone answering) will be suspended. If payment is not received within 30 days of the due date, the account may be terminated and any remaining mail or parcels at our premises will be held for a further 14 days before being returned to sender.
          </p>
          <p>
            Paper Street reserves the right to adjust subscription prices with 60 days written notice to existing clients. Price changes will apply at the start of the next billing cycle following the notice period.
          </p>

          <h2>6. Cancellation and Refund Policy</h2>
          <p>
            You may cancel your Paper Street subscription at any time by providing written notice to hello@paperstreet.co.ke or through your account dashboard.
          </p>
          <ul>
            <li><strong>Monthly subscriptions:</strong> Cancellations take effect at the end of the current billing cycle. No refunds are issued for partial months.</li>
            <li><strong>Annual subscriptions:</strong> If you cancel within 30 days of your annual billing date and have not used any services during that period, you are entitled to a full refund. If you cancel after 30 days, a pro-rated refund will be issued for the unused complete months remaining, minus a cancellation administration fee of KES 2,000.</li>
            <li><strong>Setup fees and registration fees:</strong> Non-refundable once paid.</li>
          </ul>
          <p>
            Paper Street may cancel your subscription at any time for a material breach of these terms. In the event of termination by Paper Street without cause, a pro-rated refund will be issued for the unused portion of your subscription.
          </p>

          <h2>7. Mail and Parcel Handling</h2>
          <p>
            Paper Street will accept mail and parcels delivered to your registered address by any carrier. We will notify you via email or SMS within one business day of receipt. The following conditions apply:
          </p>
          <ul>
            <li>Mail and parcels will be held at our premises for up to 30 days from the date of receipt. Storage fees of KES 50 per item per day apply after the initial 30-day period.</li>
            <li>Uncollected mail or parcels held beyond 90 days will be returned to sender or, if undeliverable, disposed of responsibly.</li>
            <li>Paper Street is not responsible for the contents of mail or parcels and cannot guarantee against loss or damage caused by the carrier prior to delivery to our premises.</li>
            <li>Our liability for any mail or parcel lost or damaged while in our custody is limited to KES 5,000 per item, or the amount declared on the shipping label, whichever is lower. We strongly recommend insuring high-value parcels through your carrier.</li>
            <li>We will not accept mail or parcels addressed to individuals (non-business names) unless you have specifically authorized this in writing.</li>
          </ul>

          <h2>8. Meeting Room Bookings</h2>
          <p>
            Meeting room bookings are subject to the following conditions:
          </p>
          <ul>
            <li>Bookings must be cancelled at least 24 hours in advance for a full credit. Cancellations with less than 24 hours notice will be charged in full.</li>
            <li>The booking holder is responsible for the conduct of all guests during the booking period.</li>
            <li>Any damage to meeting room furniture, equipment, or facilities caused during your booking will be charged to your account at replacement cost.</li>
            <li>Meeting rooms may not be used for events open to the general public without prior written approval from Paper Street management.</li>
            <li>Noise levels must be kept at a reasonable level to avoid disturbing other clients.</li>
          </ul>

          <h2>9. Intellectual Property</h2>
          <p>
            All content on the Paper Street website, including text, graphics, logos, icons, and software, is the property of Paper Street and is protected by Kenyan and international intellectual property laws. You may not reproduce, distribute, or create derivative works from any Paper Street content without our prior written consent.
          </p>
          <p>
            Paper Street grants you a limited, non-exclusive, non-transferable licence to use our services and access our client portal for the duration of your active subscription.
          </p>

          <h2>10. Limitation of Liability</h2>
          <p>
            To the maximum extent permitted by applicable law, Paper Street and its directors, employees, and agents shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of or inability to use our services, including but not limited to loss of profits, loss of data, or loss of business opportunity.
          </p>
          <p>
            Our total aggregate liability to you for any claim arising from or related to these terms or our services shall not exceed the total amount you paid to Paper Street in the three calendar months immediately preceding the event giving rise to the claim.
          </p>

          <h2>11. Indemnification</h2>
          <p>
            You agree to indemnify, defend, and hold harmless Paper Street, its officers, directors, employees, and agents from and against any claims, damages, losses, costs, and expenses (including reasonable legal fees) arising from your use of our services, your violation of these terms, or your violation of any third-party rights.
          </p>

          <h2>12. Changes to These Terms</h2>
          <p>
            Paper Street may update these Terms of Service from time to time. We will notify you of material changes by email at least 30 days before the changes take effect. Your continued use of our services after the effective date of the updated terms constitutes acceptance of the new terms. If you do not agree to the updated terms, you may cancel your subscription before the effective date.
          </p>

          <h2>13. Governing Law and Dispute Resolution</h2>
          <p>
            These Terms of Service are governed by and construed in accordance with the laws of the Republic of Kenya. You agree to submit to the exclusive jurisdiction of the courts of Nairobi, Kenya for any dispute arising from these terms or your use of Paper Street services.
          </p>
          <p>
            Before initiating formal legal proceedings, both parties agree to attempt in good faith to resolve any dispute through direct negotiation for a period of 30 days. If the dispute is not resolved within 30 days, either party may refer the matter to mediation under the Nairobi Centre for International Arbitration rules before resorting to litigation.
          </p>

          <h2>14. Contact</h2>
          <p>
            For questions about these Terms of Service, please contact us:
          </p>
          <ul>
            <li><strong>Email:</strong> legal@paperstreet.co.ke</li>
            <li><strong>Phone:</strong> +254 700 000 000</li>
            <li><strong>Address:</strong> Paper Street, Westlands Business Park, Waiyaki Way, Nairobi, Kenya</li>
          </ul>
        </div>
      </section>
    </>
  )
}
