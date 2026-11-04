'use client'

import React, { Suspense } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { CheckCircle2, ArrowRight, Mail, Building2, Calendar, FileText } from 'lucide-react'

function QuoteSuccessContent() {
  const searchParams = useSearchParams()
  const ref = searchParams.get('ref') || 'PQ-260826-VO01'
  const email = searchParams.get('email') || 'your email'
  const service = searchParams.get('service') || 'Workspace Membership'
  const company = searchParams.get('company')

  return (
    <main className="min-h-screen bg-[#FBFAF7] pt-28 pb-32 text-navy">
      <div className="container mx-auto px-6 md:px-12 max-w-2xl">

        {/* Brand Header */}
        <div className="border-b-2 border-navy pb-6 mb-8 flex items-center justify-between">
          <div>
            <span className="font-heading text-2xl font-bold uppercase tracking-[0.2em] text-navy block">
              PAPER STREET
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-navy/60 block mt-1">
              CBD Commercial Center &middot; Kisumu CBD
            </span>
          </div>
          <span className="font-mono text-xs font-bold bg-navy/5 border border-navy/20 px-3 py-1 text-navy uppercase tracking-wider">
            Ref: {ref}
          </span>
        </div>

        {/* Success Card */}
        <div className="space-y-8">

          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1 text-xs font-semibold uppercase tracking-wider">
              <CheckCircle2 size={14} className="text-emerald-700" /> Quotation Sent Successfully
            </div>
            <h1 className="font-heading text-3xl md:text-4xl font-bold text-navy">
              Your Quotation Is in Your Inbox
            </h1>
            <p className="text-sm text-navy/80 leading-relaxed">
              We have prepared your quotation for <strong>{service}</strong> {company ? `for ${company}` : ''} and dispatched it directly to <strong className="text-navy">{email}</strong> with your official PDF quotation attached.
            </p>
          </div>

          {/* Key Inclusions & Summary */}
          <div className="border border-navy/15 bg-white p-6 space-y-4 shadow-sm">
            <span className="font-mono text-[10px] uppercase tracking-wider font-bold text-navy/50 block">
              What We Have Sent to Your Inbox
            </span>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-navy/80">
              <div className="flex items-start gap-2.5">
                <FileText size={16} className="text-navy/60 shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-navy font-semibold">Attached PDF Quotation</strong>
                  <span>Itemized investment breakdown, terms and next steps.</span>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <Building2 size={16} className="text-navy/60 shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-navy font-semibold">Commercial Specifications</strong>
                  <span>Detailed breakdown of the package and inclusions selected.</span>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <Calendar size={16} className="text-navy/60 shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-navy font-semibold">30-Day Rate Guarantee</strong>
                  <span>All quoted rates and terms are locked for 30 calendar days.</span>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <Mail size={16} className="text-navy/60 shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-navy font-semibold">Direct Communication</strong>
                  <span>Reply directly to the email to ask questions or proceed.</span>
                </div>
              </div>
            </div>
          </div>

          {/* Next Steps */}
          <div className="bg-navy/[0.03] border-l-4 border-navy p-5 text-xs text-navy/80 space-y-2">
            <strong className="block text-navy uppercase tracking-wider font-bold text-[11px]">
              What Happens Next
            </strong>
            <p>
              1. <strong>Check your email:</strong> Please review your inbox (and spam folder) for the quotation from <code>hello@paperstreet.co.ke</code>.
            </p>
            <p>
              2. <strong>Questions or Ready to Proceed?</strong> Simply reply to the quotation email or contact our team directly on WhatsApp or call at <strong className="text-navy">+254 110 486 677</strong>. We will be happy to assist you with agreement completion and onboarding.
            </p>
          </div>

          {/* Actions */}
          <div className="pt-2 flex flex-wrap items-center gap-4">
            <Link
              href="/services"
              className="bg-navy text-white text-xs font-semibold uppercase tracking-wider px-6 py-3.5 hover:bg-navy-600 transition-colors inline-flex items-center gap-2"
            >
              Explore All Workspace Services <ArrowRight size={13} />
            </Link>
            <Link
              href="/"
              className="border border-navy/30 text-navy text-xs font-semibold uppercase tracking-wider px-6 py-3.5 hover:bg-navy/5 transition-colors inline-block"
            >
              Return to Homepage
            </Link>
          </div>

        </div>

      </div>
    </main>
  )
}

export default function QuoteSuccessView() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#FBFAF7]" />}>
      <QuoteSuccessContent />
    </Suspense>
  )
}
