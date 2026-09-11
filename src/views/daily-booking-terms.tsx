'use client'

import Link from 'next/link'
import { PageHero } from '@/components/ui/PageHero'

const lastUpdated = 'August 26, 2026'

export default function DailyBookingTermsView() {
  return (
    <>
      <PageHero
        image="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&auto=format&q=80"
        eyebrow="Short-Term & Daily Workspace Bookings"
        title="Daily Booking Terms & Cancellation Policy."
        subtitle="Please read these terms carefully before reserving day passes, hot desks, or meeting rooms."
        height="h-[50vh] min-h-[380px]"
      />

      <section className="py-24 bg-[#fbfaf7]">
        <div className="container mx-auto px-6 md:px-12 max-w-4xl text-[#2b4c3b] leading-relaxed">
          <p className="text-sm text-[#2b4c3b]/60 mb-12 uppercase tracking-widest font-mono">
            Last Updated: {lastUpdated} · Paper Street Workspaces Kenya
          </p>

          <h2 className="font-heading text-2xl md:text-3xl text-[#2b4c3b] mt-12 mb-6 border-b border-[#2b4c3b]/10 pb-3">
            1. Scope and Applicability
          </h2>
          <p className="mb-6">
            These Daily Booking Terms &amp; Cancellation Conditions specifically govern all short-term, drop-in, and pay-as-you-go reservations made through the Paper Street online portal, phone reservation desk, or on-site reception at our commercial facilities in Kisumu CBD (CBD Commercial Center on Oginga Odinga Street).
          </p>
          <p className="mb-6">
            Services covered under these terms include:
          </p>
          <ul className="list-disc pl-6 mb-6 space-y-3">
            <li>
              <strong>Hot Desk Full-Day Passes:</strong> Single or consecutive day access to open coworking workstations during standard operating hours (8:00 AM – 6:00 PM).
            </li>
            <li>
              <strong>Hot Desk Half-Day Passes:</strong> Flexible 4-consecutive-hour workstation sessions (morning or afternoon).
            </li>
            <li>
              <strong>Multi-Day Flexi Bundles:</strong> 2, 3, or 5 pre-selected workstation days.
            </li>
            <li>
              <strong>Executive Meeting Rooms &amp; Boardrooms:</strong> Hourly, half-day, or full-day reservations of private 4 to 6 person presentation suites equipped with 4K display monitors, conferencing equipment, and high-speed internet.
            </li>
          </ul>
          <p className="mb-6 text-sm text-[#2b4c3b]/80">
            Note: Long-term monthly rolling subscriptions, annual virtual office packages, and dedicated desk leases are governed separately under our Master <Link href="/terms-of-service" className="underline font-semibold">Terms of Service</Link> and <Link href="/refund-policy" className="underline font-semibold">Refund Policy</Link>.
          </p>

          <h2 className="font-heading text-2xl md:text-3xl text-[#2b4c3b] mt-12 mb-6 border-b border-[#2b4c3b]/10 pb-3">
            2. Cancellation Policy &amp; 10% Administrative Fee
          </h2>
          <p className="mb-6">
            Because Paper Street allocates dedicated workstation capacity, boardroom time slots, bandwidth quotas, and reception staff upon booking confirmation, the following cancellation conditions apply to all short-term bookings:
          </p>
          <ul className="list-disc pl-6 mb-6 space-y-4">
            <li>
              <strong>Eligible Cancellations (At least 2 Full Days / 48 Hours Notice):</strong> If you cancel your reservation at least <strong>2 full calendar days (48 hours)</strong> prior to the scheduled booking start time, you will receive a <strong>90% refund</strong> of the total amount paid. A <strong>10% administrative and payment processing fee</strong> is deducted from the total package value.
            </li>
            <li>
              <strong>Late Cancellations (Under 48 Hours Notice):</strong> Any cancellation submitted with <strong>less than 48 hours notice</strong> prior to the scheduled start time is <strong>strictly non-refundable</strong>. The entire booking fee is retained to cover allocated space and holding costs.
            </li>
          </ul>

          <h2 className="font-heading text-2xl md:text-3xl text-[#2b4c3b] mt-12 mb-6 border-b border-[#2b4c3b]/10 pb-3">
            3. Free Rescheduling Policy (100% Free of Charge)
          </h2>
          <p className="mb-6">
            We understand that business schedules change. Paper Street offers completely <strong>free rescheduling</strong> for all daily workspace passes and meeting room bookings under the following terms:
          </p>
          <ul className="list-disc pl-6 mb-6 space-y-3">
            <li>
              <strong>Zero Rescheduling Fee:</strong> Rescheduling is 100% free of charge. No penalties, administrative fees, or deductions will be applied to your booking.
            </li>
            <li>
              <strong>Notice Requirement:</strong> Rescheduling requests must be submitted at least <strong>24 hours prior</strong> to the scheduled reservation start time.
            </li>
            <li>
              <strong>Validity Window:</strong> The newly selected date must fall within <strong>30 calendar days</strong> of the original booking date and is subject to desk or room availability.
            </li>
            <li>
              <strong>How to Reschedule:</strong> Contact reception via email at <a href="mailto:hello@paperstreet.co.ke" className="underline font-semibold">hello@paperstreet.co.ke</a> or call 0110486677 (+254 110 486 677) quoting your official Booking Reference.
            </li>
          </ul>

          <h2 className="font-heading text-2xl md:text-3xl text-[#2b4c3b] mt-12 mb-6 border-b border-[#2b4c3b]/10 pb-3">
            4. Non-Refundable Policy on Unutilized Bookings
          </h2>
          <p className="mb-6">
            Paper Street maintains a strict policy regarding unutilized or partially utilized reservations:
          </p>
          <ul className="list-disc pl-6 mb-6 space-y-3">
            <li>
              <strong>No-Shows:</strong> If a client fails to arrive and check in on the reserved date without prior written cancellation or rescheduling, the reservation is treated as fully consumed. No refunds, credits, or date transfers will be issued.
            </li>
            <li>
              <strong>Unutilized Hours &amp; Early Departure:</strong> If a client vacates a workspace or meeting room prior to the scheduled end time, no pro-rata refund or partial credit is granted for unused time.
            </li>
            <li>
              <strong>Multi-Day Passes:</strong> Individual unutilized days in a multi-day pass bundle cannot be refunded or carried over once the validity period has commenced.
            </li>
          </ul>

          <h2 className="font-heading text-2xl md:text-3xl text-[#2b4c3b] mt-12 mb-6 border-b border-[#2b4c3b]/10 pb-3">
            5. Check-In Protocols &amp; Operating Hours
          </h2>
          <ul className="list-disc pl-6 mb-6 space-y-3">
            <li>
              <strong>Reception Check-In:</strong> Upon arrival at Paper Street Commercial Center (Kisumu CBD), present your official alphanumeric Booking Reference (e.g. <span className="font-mono text-xs font-semibold">PS-XXXX-XXXX</span>) or digital pass to reception for space allocation and Wi-Fi onboarding.
            </li>
            <li>
              <strong>Standard Operating Hours:</strong>
              <ul className="list-circle pl-6 mt-2 space-y-1 text-sm">
                <li>Monday through Friday: 8:00 AM – 6:00 PM</li>
                <li>Saturday: 9:00 AM – 3:00 PM</li>
                <li>Sunday: Closed (Standard Access)</li>
              </ul>
            </li>
            <li>
              <strong>Extended-Hours / Overtime Access:</strong> Any workspace session extending beyond standard operating hours must be pre-authorized and is billed at the standard extended-hours rate of <strong>KES 200 per hour</strong>.
            </li>
          </ul>

          <h2 className="font-heading text-2xl md:text-3xl text-[#2b4c3b] mt-12 mb-6 border-b border-[#2b4c3b]/10 pb-3">
            6. Refund Disbursement Timelines
          </h2>
          <p className="mb-6">
            When an eligible cancellation is approved in accordance with Section 2:
          </p>
          <ul className="list-disc pl-6 mb-6 space-y-3">
            <li>Refunds are returned via the original payment channel (Paystack, M-Pesa, Visa, or Mastercard).</li>
            <li>Refund processing takes between <strong>3 to 5 business days</strong> depending on banking and mobile network clearing cycles.</li>
            <li>An electronic refund confirmation and credit receipt will be issued to your registered email address upon disbursement.</li>
          </ul>

          <h2 className="font-heading text-2xl md:text-3xl text-[#2b4c3b] mt-12 mb-6 border-b border-[#2b4c3b]/10 pb-3">
            7. Contact &amp; Enquiries
          </h2>
          <p className="mb-6">
            For cancellation requests, free rescheduling, or general enquiries regarding daily workspace bookings:
          </p>
          <p className="text-sm">
            <strong>Paper Street Workspaces</strong><br />
            CBD Commercial Center, Oginga Odinga Street, Kisumu CBD, Kenya<br />
            Telephone: 0110486677 / +254 110 486 677<br />
            Email: <a href="mailto:hello@paperstreet.co.ke" className="underline font-semibold">hello@paperstreet.co.ke</a><br />
            Website: <a href="https://paperstreet.co.ke" className="underline font-semibold">www.paperstreet.co.ke</a>
          </p>

        </div>
      </section>
    </>
  )
}
