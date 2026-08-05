import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Terms and conditions for using PresenceHQ services.',
}

export default function TermsOfServicePage() {
  return (
    <main className="pt-32 pb-24 bg-white">
      <div className="container mx-auto px-4 md:px-6 max-w-3xl prose prose-navy">
        <h1 className="text-4xl font-bold text-navy font-[family-name:var(--font-heading)] mb-8">Terms of Service</h1>
        <p className="text-dark-gray/70 mb-8">Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
        
        <h2>1. Acceptance of Terms</h2>
        <p>By accessing or using the services provided by PresenceHQ, you agree to be bound by these Terms of Service. If you disagree with any part of these terms, you may not access the services.</p>

        <h2>2. Description of Service</h2>
        <p>PresenceHQ provides virtual office infrastructure, including but not limited to business addresses, mail handling, reception services, and meeting room access ("Services").</p>

        <h2>3. User Obligations</h2>
        <p>You agree to use our Services only for lawful purposes. You must not use our address to register illegal, fraudulent, or strictly prohibited businesses. We reserve the right to report suspicious activity to relevant authorities.</p>

        <h2>4. Compliance & KYC</h2>
        <p>To comply with local regulations, all clients must provide valid identification and, where applicable, company registration documents before services are activated.</p>
      </div>
    </main>
  )
}
