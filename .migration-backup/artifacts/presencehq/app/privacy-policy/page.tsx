import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy Policy and data protection terms for PresenceHQ services.',
}

export default function PrivacyPolicyPage() {
  return (
    <main className="pt-32 pb-24 bg-white">
      <div className="container mx-auto px-4 md:px-6 max-w-3xl prose prose-navy">
        <h1 className="text-4xl font-bold text-navy font-[family-name:var(--font-heading)] mb-8">Privacy Policy</h1>
        <p className="text-dark-gray/70 mb-8">Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
        
        <h2>1. Introduction</h2>
        <p>
          At PresenceHQ ("we", "our", or "us"), we respect your privacy and are committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website or use our services.
        </p>

        <h2>2. Data We Collect</h2>
        <p>We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:</p>
        <ul>
          <li><strong>Identity Data:</strong> includes first name, last name, username or similar identifier, and government-issued ID (for compliance).</li>
          <li><strong>Contact Data:</strong> includes billing address, physical address, email address and telephone numbers.</li>
          <li><strong>Financial Data:</strong> includes payment card details (processed securely via our payment partners).</li>
          <li><strong>Transaction Data:</strong> includes details about payments to and from you and other details of products and services you have purchased from us.</li>
        </ul>

        <h2>3. How We Use Your Data</h2>
        <p>We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:</p>
        <ul>
          <li>Where we need to perform the contract we are about to enter into or have entered into with you (e.g., providing virtual office services).</li>
          <li>Where it is necessary for our legitimate interests (or those of a third party) and your interests and fundamental rights do not override those interests.</li>
          <li>Where we need to comply with a legal or regulatory obligation (such as KYC and AML regulations).</li>
        </ul>

        <h2>4. Data Security</h2>
        <p>
          We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used, or accessed in an unauthorized way, altered, or disclosed. In addition, we limit access to your personal data to those employees, agents, contractors, and other third parties who have a business need to know.
        </p>

        <h2>5. Contact Us</h2>
        <p>
          If you have any questions about this privacy policy or our privacy practices, please contact us at privacy@presencehq.com.
        </p>
      </div>
    </main>
  )
}
