import { PageHero } from '@/components/ui/PageHero'

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageHero
        image="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600&auto=format&q=80"
        eyebrow="Legal"
        title="Privacy Policy."
        height="h-[50vh] min-h-[380px]"
      />
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 md:px-12 max-w-3xl prose prose-gray prose-headings:font-heading prose-headings:text-navy">
          <h2>1. Information We Collect</h2>
          <p>We collect information you provide when registering for our services, including name, company name, email address, phone number, and billing information. We also collect usage data including pages visited and features used.</p>
          <h2>2. How We Use Your Information</h2>
          <p>We use your information to provide and improve our services, process payments, send service notifications, and comply with legal obligations including KYC (Know Your Customer) requirements.</p>
          <h2>3. Data Sharing</h2>
          <p>We do not sell your personal data. We share information with service providers who assist in delivering our services, and with regulators as required by Kenyan law.</p>
          <h2>4. Data Security</h2>
          <p>We implement industry-standard security measures to protect your personal information. Mail and packages are stored in secure, access-controlled facilities.</p>
          <h2>5. Your Rights</h2>
          <p>You have the right to access, correct, or delete your personal data. Contact us at privacy@presencehq.com to exercise these rights.</p>
          <h2>6. Contact</h2>
          <p>For privacy questions, contact us at <a href="mailto:privacy@presencehq.com">privacy@presencehq.com</a> or at our registered address.</p>
        </div>
      </section>
    </>
  )
}
