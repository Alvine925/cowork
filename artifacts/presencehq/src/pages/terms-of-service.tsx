import { PageHero } from '@/components/ui/PageHero'

export default function TermsOfServicePage() {
  return (
    <>
      <PageHero
        image="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600&auto=format&q=80"
        eyebrow="Legal"
        title="Terms of Service."
        height="h-[50vh] min-h-[380px]"
      />
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 md:px-12 max-w-3xl prose prose-gray prose-headings:font-heading prose-headings:text-navy">
          <h2>1. Service Description</h2>
          <p>PresenceHQ provides virtual office services including business addresses, mail handling, and meeting room access. Services are provided on a subscription basis with terms outlined at signup.</p>
          <h2>2. User Obligations</h2>
          <p>You agree to use our services for lawful business purposes only. You must provide accurate KYC documentation and notify us of any changes to your business details within 14 days.</p>
          <h2>3. KYC Compliance</h2>
          <p>In accordance with Kenyan law, we are required to verify the identity of all clients. Failure to provide required documentation within 30 days of signup may result in suspension of services.</p>
          <h2>4. Payment Terms</h2>
          <p>Monthly subscriptions are billed in advance. Annual subscriptions receive a discount equivalent to two months free. Late payment may result in suspension of services after a 7-day grace period.</p>
          <h2>5. Limitation of Liability</h2>
          <p>PresenceHQ is not liable for loss or damage to mail or packages beyond the limits specified in your service agreement. Our maximum liability is limited to the fees paid in the preceding three months.</p>
          <h2>6. Governing Law</h2>
          <p>These terms are governed by the laws of Kenya. Any disputes shall be resolved in the courts of Nairobi, Kenya.</p>
        </div>
      </section>
    </>
  )
}
