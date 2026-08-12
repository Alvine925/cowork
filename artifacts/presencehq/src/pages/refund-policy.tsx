import { PageHero } from '@/components/ui/PageHero'

export default function RefundPolicyPage() {
  return (
    <>
      <PageHero
        image="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600&auto=format&q=80"
        eyebrow="Legal"
        title="Refund Policy."
        height="h-[50vh] min-h-[380px]"
      />
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 md:px-12 max-w-3xl prose prose-gray prose-headings:font-heading prose-headings:text-navy">
          <h2>1. Cancellations</h2>
          <p>Month-to-month plans can be cancelled at any time with 30 days' notice. Annual plans can be cancelled, but early termination may result in the forfeiture of the annual discount applied.</p>
          <h2>2. Refunds</h2>
          <p>Setup fees (if any) and services already rendered are non-refundable. If you cancel a prepaid annual plan, we will calculate the prorated amount based on the standard monthly rate for the months used, and refund the remaining balance within 14 business days.</p>
          <h2>3. Contact</h2>
          <p>To request a refund or cancellation, email <a href="mailto:billing@paperstreet.africa">billing@paperstreet.africa</a> with your account details.</p>
        </div>
      </section>
    </>
  )
}
