import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Refund Policy',
  description: 'Refund and cancellation policy for PresenceHQ.',
}

export default function RefundPolicyPage() {
  return (
    <main className="pt-32 pb-24 bg-white">
      <div className="container mx-auto px-4 md:px-6 max-w-3xl prose prose-navy">
        <h1 className="text-4xl font-bold text-navy font-[family-name:var(--font-heading)] mb-8">Refund Policy</h1>
        
        <h2>1. Cancellations</h2>
        <p>Month-to-month plans can be canceled at any time with 30 days notice. Annual plans can be canceled, but early termination may result in the forfeiture of the annual discount applied.</p>

        <h2>2. Refunds</h2>
        <p>Setup fees (if any) and services already rendered are non-refundable. If you cancel a prepaid annual plan, we will calculate the prorated amount based on the standard monthly rate for the months used, and refund the remaining balance.</p>
      </div>
    </main>
  )
}
