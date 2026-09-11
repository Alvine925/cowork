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
              <CheckCircle2 size={14} className="text-emerald-700" /> Quotation Dispatched Successfully
            </div>
            <h1 className="font-heading text-3xl md:text-4xl font-bold text-navy">
              Your Tailored Quotation Is on Its Way
            </h1>
            <p className="text-sm text-navy/80 leading-relaxed">
              We have generated your formal membership proposal for <strong>{service}</strong> {company ? `for ${company}` : ''} and dispatched it directly to <strong className="text-navy">{email}</strong>.
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
                  <strong className="block text-navy font-semibold">Official PDF Quotation</strong>
                  <span>Itemized financial breakdown &amp; standard package terms.</span>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <Building2 size={16} className="text-navy/60 shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-navy font-semibold">Legal Address Authorization</strong>
                  <span>Section 47 Companies Act 2015 &amp; BRS compliance outline.</span>
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
                  <strong className="block text-navy font-semibold">Sales Specialist Review</strong>
                  <span>Dedicated follow-up to address custom corporate inclusions.</span>
                </div>
              </div>
            </div>
          </div>

          {/* Next Steps */}
          <div className="bg-navy/[0.03] border-l-4 border-navy p-5 text-xs text-navy/80 space-y-2">
            <strong className="block text-navy uppercase tracking-wider font-bold text-[11px]">
              What Happens Next (Human Onboarding Specialist)
            </strong>
            <p>
              1. <strong>Check your email:</strong> Please review your inbox (and junk/spam folder) for the email from <code>hello@paperstreet.co.ke</code>.
            </p>
            <p>
              2. <strong>Direct Specialist Contact:</strong> A Paper Street membership specialist will reach out within <strong>2 business hours</strong> to guide you through KYC verification, answer questions, and finalize agreement signing.
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
