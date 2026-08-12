import { PageHero } from '@/components/ui/PageHero'

const lastUpdated = 'July 1, 2025'

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageHero
        image="https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=1600&auto=format&q=80"
        eyebrow="Legal"
        title="Privacy Policy."
        subtitle="Your privacy matters to us. Here is exactly what data we collect, why we collect it, and how we protect it."
        height="h-[50vh] min-h-[380px]"
      />
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 md:px-12 max-w-3xl prose prose-gray prose-headings:font-heading prose-headings:text-navy">

          <p className="text-sm text-dark-gray/50 not-prose mb-12">Last updated: {lastUpdated}</p>

          <h2>1. Introduction and Who We Are</h2>
          <p>
            Paper Street ("Paper Street", "we", "us", or "our") provides virtual office services and optional add-ons to businesses across Kenya. Our office is at Westlands Business Park, Waiyaki Way, Nairobi, Kenya.
          </p>
          <p>
            This Privacy Policy explains how we collect, use, store, and share personal data about you when you visit our website, sign up for our services, communicate with us, or visit any of our physical locations. It applies to all clients, visitors, and contacts of Paper Street.
          </p>
          <p>
            Paper Street is committed to protecting your personal information in accordance with the Kenya Data Protection Act, 2019, and any implementing regulations issued thereunder. We are registered as a data controller with the Office of the Data Protection Commissioner (ODPC) of Kenya.
          </p>

          <h2>2. Information We Collect</h2>
          <p>We collect personal data in the following categories depending on your relationship with us:</p>

          <h3>2.1 Information You Provide Directly</h3>
          <ul>
            <li><strong>Identity information:</strong> Your full legal name, date of birth, and a copy of your government-issued ID or passport.</li>
            <li><strong>Business information:</strong> Company name, Certificate of Incorporation, CR12, KRA PIN, and the nature of your business activities.</li>
            <li><strong>Contact details:</strong> Email address, phone number (including WhatsApp number), and residential address.</li>
            <li><strong>Billing information:</strong> M-Pesa number, bank account details, or payment card information. Full card numbers are processed by our PCI-compliant payment processor and are not stored on our systems.</li>
            <li><strong>Communication data:</strong> Any messages you send us via email, our contact form, WhatsApp, or telephone, including call recordings where you have been informed and consented.</li>
            <li><strong>Meeting room and booking preferences:</strong> Room requirements, catering preferences, and company representatives authorised to make bookings.</li>
          </ul>

          <h3>2.2 Information We Collect Automatically</h3>
          <ul>
            <li><strong>Website usage data:</strong> Pages visited, time spent on pages, browser type, operating system, referring URL, and device type, collected via cookies and similar technologies.</li>
            <li><strong>IP address and approximate location:</strong> Used to help detect fraud and comply with geo-specific legal requirements.</li>
            <li><strong>CCTV footage:</strong> Our physical locations are monitored by CCTV for the security of clients, staff, and property. Footage is retained for 30 days and then automatically overwritten.</li>
            <li><strong>Mail and parcel logs:</strong> Records of mail and parcels received on your behalf, including sender, carrier, weight, and dimensions.</li>
          </ul>

          <h3>2.3 Information from Third Parties</h3>
          <ul>
            <li>Credit reference information from licensed Kenyan credit reference bureaus where required for high-value service packages.</li>
            <li>Business registry information from the Business Registration Service (BRS) to verify company details.</li>
            <li>Information from referral partners or introducers where you have given them permission to share your details with us.</li>
          </ul>

          <h2>3. How We Use Your Information</h2>
          <p>We use your personal data for the following purposes:</p>

          <h3>3.1 Providing and Managing Your Services</h3>
          <ul>
            <li>Activating and administering your Paper Street subscription and any associated services.</li>
            <li>Verifying your identity and business details as required by Kenyan KYC regulations.</li>
            <li>Notifying you of mail and parcels received at your registered address.</li>
            <li>Managing any optional add-on services you have subscribed to, such as additional mail forwarding or workspace access.</li>
            <li>Answering calls in your company name and relaying messages as per your instructions.</li>
          </ul>

          <h3>3.2 Billing and Payments</h3>
          <ul>
            <li>Issuing invoices and processing payments for subscription fees, add-ons, and any additional charges.</li>
            <li>Chasing outstanding payments and managing debt recovery if necessary.</li>
            <li>Maintaining financial records as required by the Kenya Revenue Authority.</li>
          </ul>

          <h3>3.3 Legal and Regulatory Compliance</h3>
          <ul>
            <li>Complying with the Proceeds of Crime and Anti-Money Laundering Act (POCAMLA) and related regulations.</li>
            <li>Reporting suspicious transactions to the Financial Reporting Centre (FRC) as required by law.</li>
            <li>Responding to lawful requests from government authorities, courts, or law enforcement agencies.</li>
            <li>Retaining business records as required by Kenyan tax and company law.</li>
          </ul>

          <h3>3.4 Service Improvement and Marketing</h3>
          <ul>
            <li>Analysing how clients use our services to identify areas for improvement.</li>
            <li>Sending you service updates, new product announcements, and relevant offers where you have opted in or where we have a legitimate interest to do so.</li>
            <li>Conducting client satisfaction surveys (participation is always voluntary).</li>
          </ul>

          <h2>4. Legal Basis for Processing</h2>
          <p>We process your personal data on the following legal grounds under the Kenya Data Protection Act:</p>
          <ul>
            <li><strong>Contract performance:</strong> Processing necessary to fulfil the service agreement between you and Paper Street.</li>
            <li><strong>Legal obligation:</strong> Processing required by Kenyan law, including KYC, anti-money laundering, and tax obligations.</li>
            <li><strong>Legitimate interests:</strong> Processing for fraud prevention, service improvement, and direct marketing of similar services to existing clients, where these interests are not overridden by your rights.</li>
            <li><strong>Consent:</strong> Where we rely on consent (for example, for certain marketing communications), you may withdraw your consent at any time by contacting us at privacy@paperstreet.africa.</li>
          </ul>

          <h2>5. How We Share Your Information</h2>
          <p>We do not sell, rent, or trade your personal data. We share your information only in the following circumstances:</p>

          <h3>5.1 Service Providers</h3>
          <p>
            We share data with trusted third-party service providers who assist us in delivering our services, including payment processors, cloud hosting providers, SMS and email delivery platforms, and accounting software. All service providers are contractually required to protect your data and use it only for the purpose for which it was shared.
          </p>

          <h3>5.2 Regulatory and Law Enforcement Authorities</h3>
          <p>
            We may disclose your information to government bodies, regulatory authorities, or law enforcement agencies in Kenya where we are required to do so by law, court order, or to prevent fraud and financial crime. We will notify you of such disclosures unless we are legally prohibited from doing so.
          </p>

          <h3>5.3 Business Transfers</h3>
          <p>
            If Paper Street is involved in a merger, acquisition, or sale of all or a portion of its assets, your personal data may be transferred as part of that transaction. We will provide notice via email or a prominent notice on our website prior to your data being transferred and subject to a different privacy policy.
          </p>

          <h3>5.4 With Your Consent</h3>
          <p>
            We may share your information with third parties for purposes not covered above when you have given us your explicit written consent.
          </p>

          <h2>6. Data Retention</h2>
          <p>We retain your personal data for the following periods:</p>
          <ul>
            <li><strong>Active client records:</strong> For the duration of your subscription plus 7 years, in accordance with Kenyan tax and company law requirements.</li>
            <li><strong>KYC documentation:</strong> Retained for a minimum of 5 years after the end of the business relationship, as required by POCAMLA.</li>
            <li><strong>CCTV footage:</strong> 30 days, then automatically overwritten unless specific footage is preserved in connection with an incident or law enforcement request.</li>
            <li><strong>Website analytics data:</strong> Aggregated and anonymised after 26 months.</li>
            <li><strong>Enquiry and marketing contact data:</strong> Retained for 2 years from last contact if you did not become a client, or for the duration of your subscription plus 2 years if you did.</li>
          </ul>
          <p>
            After the applicable retention period, we will securely delete or anonymise your personal data.
          </p>

          <h2>7. Data Security</h2>
          <p>
            Paper Street implements a range of technical and organisational measures to protect your personal data from unauthorised access, loss, misuse, disclosure, alteration, or destruction, including:
          </p>
          <ul>
            <li>Encryption of data in transit using TLS 1.2 or higher.</li>
            <li>Encryption of sensitive data at rest in our databases.</li>
            <li>Role-based access controls so that only staff with a legitimate business need can access your data.</li>
            <li>Regular security reviews and vulnerability assessments.</li>
            <li>Physical security measures at all our locations, including access control systems and CCTV monitoring.</li>
            <li>Staff training on data protection and information security.</li>
          </ul>
          <p>
            In the event of a personal data breach that is likely to result in a high risk to your rights and freedoms, we will notify you and the ODPC without undue delay and within 72 hours of becoming aware of the breach, as required by the Kenya Data Protection Act.
          </p>

          <h2>8. Cookies and Tracking Technologies</h2>
          <p>
            Our website uses cookies and similar tracking technologies to improve your browsing experience, analyse site traffic, and understand how visitors use our site. We use the following types of cookies:
          </p>
          <ul>
            <li><strong>Strictly necessary cookies:</strong> Required for the website to function correctly. These cannot be disabled.</li>
            <li><strong>Analytics cookies:</strong> Help us understand how visitors interact with our website. We use anonymised data only.</li>
            <li><strong>Marketing cookies:</strong> Used to show you relevant advertisements on third-party platforms. These are only set with your consent.</li>
          </ul>
          <p>
            You can manage your cookie preferences at any time via the cookie settings panel on our website or through your browser settings. Note that disabling certain cookies may affect the functionality of our website.
          </p>

          <h2>9. Your Rights</h2>
          <p>Under the Kenya Data Protection Act, 2019, you have the following rights regarding your personal data:</p>
          <ul>
            <li><strong>Right of access:</strong> You may request a copy of the personal data we hold about you, free of charge, within 21 days of your request.</li>
            <li><strong>Right to rectification:</strong> You may request correction of any inaccurate or incomplete personal data we hold about you.</li>
            <li><strong>Right to erasure:</strong> You may request deletion of your personal data where it is no longer necessary for the purposes for which it was collected, subject to our legal retention obligations.</li>
            <li><strong>Right to restriction of processing:</strong> You may request that we temporarily stop processing your data in certain circumstances, for example while a dispute about accuracy is resolved.</li>
            <li><strong>Right to data portability:</strong> You may request that we provide your data in a structured, commonly used, machine-readable format where processing is based on consent or contract.</li>
            <li><strong>Right to object:</strong> You may object to processing based on our legitimate interests, including direct marketing. We will stop processing unless we can demonstrate compelling legitimate grounds.</li>
            <li><strong>Right to withdraw consent:</strong> Where processing is based on consent, you may withdraw consent at any time without affecting the lawfulness of processing prior to withdrawal.</li>
          </ul>
          <p>
            To exercise any of these rights, email us at <a href="mailto:privacy@paperstreet.africa">privacy@paperstreet.africa</a> with your name, email address, and a description of your request. We will respond within 21 days. If you are not satisfied with our response, you have the right to lodge a complaint with the Office of the Data Protection Commissioner of Kenya.
          </p>

          <h2>10. International Data Transfers</h2>
          <p>
            Some of our service providers are based outside Kenya, including cloud hosting and analytics platforms. When we transfer your personal data outside Kenya, we take steps to ensure it receives an equivalent level of protection to that required under Kenyan law, including through contractual safeguards such as Standard Contractual Clauses.
          </p>

          <h2>11. Children's Privacy</h2>
          <p>
            Our services are intended for use by businesses and individuals aged 18 and above. We do not knowingly collect personal data from anyone under the age of 18. If you believe we have inadvertently collected data from a minor, please contact us immediately at privacy@paperstreet.africa and we will delete it promptly.
          </p>

          <h2>12. Updates to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time to reflect changes in our practices, services, or applicable law. We will notify you of material changes by sending an email to the address on file at least 14 days before the changes take effect. The updated policy will also be posted on our website with the revised "Last updated" date. Your continued use of our services after the effective date of the updated policy constitutes your acceptance of it.
          </p>

          <h2>13. Contact and Complaints</h2>
          <p>
            If you have any questions, concerns, or complaints about this Privacy Policy or how we handle your personal data, please contact our Data Protection Officer:
          </p>
          <ul>
            <li><strong>Email:</strong> privacy@paperstreet.africa</li>
            <li><strong>Phone:</strong> +254 700 000 000</li>
            <li><strong>Postal address:</strong> Data Protection Officer, Paper Street, Westlands Business Park, Waiyaki Way, Nairobi, Kenya</li>
          </ul>
          <p>
            If you are not satisfied with our response to your complaint, you have the right to contact the Office of the Data Protection Commissioner of Kenya at <a href="https://www.odpc.go.ke" target="_blank" rel="noopener noreferrer">www.odpc.go.ke</a>.
          </p>
        </div>
      </section>
    </>
  )
}
