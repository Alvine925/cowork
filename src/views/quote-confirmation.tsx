'use client'

import React, { useEffect, useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import {
  ArrowLeft,
  Download,
  Loader2,
} from 'lucide-react'
import {
  calcAnnualSaving,
  kes,
  fmtDate,
} from '@/lib/quote-email-templates'

interface StoredQuote {
  quoteReference: string
  serviceSlug: string
  serviceTitle: string
  tierName: string
  commitmentPeriod: string
  monthlyRateKES: number
  totalCommitmentKES: number
  depositAmountKES: number
  startDate: string
  endDate?: string
  durationMonths?: number
  teamSize?: number
  companyName?: string
  clientName: string
  clientEmail: string
  clientPhone: string
  additionalRequirements?: string
  inclusions?: string[]
}

function QuoteConfirmationContent() {
  const searchParams = useSearchParams()
  const refParam = searchParams.get('ref')

  const [quote, setQuote] = useState<StoredQuote | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      let storedStr: string | null = null
      if (refParam) {
        storedStr = sessionStorage.getItem(`paperstreet_quote_${refParam}`)
      }
      if (!storedStr) {
        storedStr = sessionStorage.getItem('paperstreet_latest_quote')
      }

      if (storedStr) {
        try {
          const parsed = JSON.parse(storedStr)
          setQuote(parsed)
        } catch (e) {
          console.error('Failed to parse quote', e)
        }
      }
      setLoading(false)
    }
  }, [refParam])

  const handleDownloadPdf = () => {
    if (!quote) return

    const issueDate = fmtDate(new Date().toISOString())
    const validUntil = (() => {
      const d = new Date()
      d.setDate(d.getDate() + 30)
      return fmtDate(d.toISOString())
    })()
    const grandTotal = quote.totalCommitmentKES + (quote.depositAmountKES || 0)
    const durationMonths = quote.durationMonths || 12
    const teamSize = quote.teamSize || 1
    const { standardAnnualValue, savingKES, discountPercent } = calcAnnualSaving(
      quote.serviceSlug,
      quote.monthlyRateKES,
      quote.totalCommitmentKES,
      durationMonths,
      teamSize
    )

    const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Paper Street Quotation - ${quote.quoteReference}</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #2b4c3b; background: #ffffff; margin: 0; padding: 40px 24px; font-size: 13px; line-height: 1.6; }
    .quote-container { max-width: 680px; margin: 0 auto; }
    .header { background: #2b4c3b; padding: 24px 28px; margin-bottom: 24px; }
    .brand { font-size: 20px; font-weight: 800; letter-spacing: 3px; text-transform: uppercase; color: #ffffff; }
    .brand-sub { font-size: 11px; color: rgba(255,255,255,0.7); margin-top: 4px; text-transform: uppercase; letter-spacing: 1px; }
    .contact-line { font-size: 11px; color: rgba(255,255,255,0.75); margin-top: 8px; }
    .title-row { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 20px; border-bottom: 1px solid #e0e0d8; padding-bottom: 16px; }
    .doc-title { display: inline-block; background: #ebff48; color: #2b4c3b; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px; padding: 4px 10px; }
    .meta-item { font-size: 12px; margin-top: 6px; color: #64748b; }
    .meta-item strong { color: #2b4c3b; }
    .section-title { font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px; color: #64748b; margin-top: 24px; margin-bottom: 8px; border-bottom: 1px solid #e0e0d8; padding-bottom: 4px; }
    .detail-grid { display: table; width: 100%; margin-bottom: 16px; }
    .detail-row { display: table-row; }
    .detail-label { display: table-cell; width: 35%; padding: 6px 0; color: #64748b; font-size: 12px; }
    .detail-val { display: table-cell; padding: 6px 0; color: #2b4c3b; font-size: 12px; font-weight: 600; }
    table.ledger { width: 100%; border-collapse: collapse; margin: 16px 0 24px 0; font-size: 12px; }
    table.ledger th { text-align: left; padding: 8px 0; border-bottom: 2px solid #2b4c3b; font-size: 10px; text-transform: uppercase; letter-spacing: 1px; color: #2b4c3b; }
    table.ledger td { padding: 10px 0; border-bottom: 1px solid #f0f0e8; color: #334155; }
    table.ledger td.num { text-align: right; font-family: monospace; font-size: 13px; }
    table.ledger th.num { text-align: right; }
    .total-row td { background: #2b4c3b; color: #ebff48; font-weight: 800; font-size: 15px; padding: 12px 10px; }
    .total-row td.num { font-size: 16px; }
    .conditions { background: #f8f8f4; border-left: 3px solid #2b4c3b; padding: 14px 16px; font-size: 12px; color: #334155; line-height: 1.6; margin: 24px 0; }
    .footer { margin-top: 40px; padding-top: 16px; border-top: 1px solid #e0e0d8; font-size: 11px; color: #64748b; text-align: center; }
  </style>
</head>
<body>
  <div class="quote-container">
    <div class="header">
      <div class="brand">PAPER STREET</div>
      <div class="brand-sub">Office Solutions &amp; Business Services</div>
      <div class="contact-line">Phone / WhatsApp: +254 110 486 677 &nbsp;·&nbsp; Email: hello@paperstreet.co.ke &nbsp;·&nbsp; paperstreet.co.ke</div>
    </div>

    <div class="title-row">
      <div>
        <div class="doc-title">QUOTATION</div>
        <div class="meta-item">Quote Ref: <strong>${quote.quoteReference}</strong></div>
        <div class="meta-item">Issue Date: <strong>${issueDate}</strong></div>
      </div>
      <div style="text-align: right;">
        <div class="meta-item">Validity: <strong>30 Days (${validUntil})</strong></div>
        <div class="meta-item">Prepared for: <strong>${quote.companyName || quote.clientName}</strong></div>
      </div>
    </div>

    <div class="section-title">PREPARED FOR</div>
    <div class="detail-grid">
      ${quote.companyName ? `
      <div class="detail-row">
        <div class="detail-label">Company / Organization:</div>
        <div class="detail-val">${quote.companyName}</div>
      </div>` : ''}
      <div class="detail-row">
        <div class="detail-label">Contact Person:</div>
        <div class="detail-val">${quote.clientName}</div>
      </div>
      <div class="detail-row">
        <div class="detail-label">Email:</div>
        <div class="detail-val">${quote.clientEmail}</div>
      </div>
      <div class="detail-row">
        <div class="detail-label">Phone:</div>
        <div class="detail-val">${quote.clientPhone}</div>
      </div>
    </div>

    <div class="section-title">YOUR PROPOSED SOLUTION</div>
    <div class="detail-grid">
      <div class="detail-row">
        <div class="detail-label">Service:</div>
        <div class="detail-val">${quote.serviceTitle} &mdash; ${quote.tierName}</div>
      </div>
      <div class="detail-row">
        <div class="detail-label">Contract Term:</div>
        <div class="detail-val">${quote.commitmentPeriod}</div>
      </div>
      <div class="detail-row">
        <div class="detail-label">Start Date:</div>
        <div class="detail-val">${fmtDate(quote.startDate)}</div>
      </div>
      ${quote.teamSize && quote.teamSize > 1 ? `
      <div class="detail-row">
        <div class="detail-label">Workstations:</div>
        <div class="detail-val">${quote.teamSize} Dedicated Workstations</div>
      </div>` : ''}
    </div>

    <div class="section-title">INVESTMENT BREAKDOWN</div>
    <table class="ledger">
      <thead>
        <tr>
          <th>Description</th>
          <th class="num">Amount (KES)</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <strong>Monthly equivalent rate</strong><br>
            <span style="font-size: 11px; color: #64748b;">${kes(quote.monthlyRateKES)}${teamSize > 1 ? ' × ' + teamSize : ''} / month</span>
          </td>
          <td class="num">${kes(quote.monthlyRateKES * teamSize)} / mo</td>
        </tr>
        ${savingKES > 0 ? `
        <tr>
          <td>
            <span style="color: #64748b; text-decoration: line-through;">Standard annual value</span>
          </td>
          <td class="num" style="color: #64748b; text-decoration: line-through;">${kes(standardAnnualValue)}</td>
        </tr>
        <tr>
          <td style="color: #16a34a;">
            <strong>Annual commitment discount (${discountPercent}% off)</strong>
          </td>
          <td class="num" style="color: #16a34a; font-weight: 600;">−${kes(savingKES)}</td>
        </tr>
        ` : ''}
        <tr>
          <td>
            <strong>Service fee (${durationMonths} months)</strong>
          </td>
          <td class="num" style="font-weight: 600;">${kes(quote.totalCommitmentKES)}</td>
        </tr>
        <tr>
          <td>
            <strong>Security deposit</strong><br>
            <span style="font-size: 11px; color: #64748b;">${quote.depositAmountKES > 0 ? 'Refundable upon contract completion' : 'No deposit required under this arrangement'}</span>
          </td>
          <td class="num">${quote.depositAmountKES > 0 ? kes(quote.depositAmountKES) : 'KES 0'}</td>
        </tr>
        <tr class="total-row">
          <td>TOTAL INITIAL AMOUNT PAYABLE</td>
          <td class="num">${kes(grandTotal)}</td>
        </tr>
      </tbody>
    </table>

    <div class="conditions">
      <strong>Commercial Conditions:</strong><br>
      • Quotation validity: 30 days from issue date.<br>
      • Payment terms: Initial payment required prior to service commencement.<br>
      • Full service agreement and onboarding documentation provided separately.<br>
      • For questions, contact hello@paperstreet.co.ke or call +254 110 486 677.
    </div>

    <div class="footer">
      <strong>Paper Street</strong> &middot; Office Solutions &amp; Business Services &middot; Kisumu, Kenya<br>
      Phone / WhatsApp: +254 110 486 677 &middot; Email: hello@paperstreet.co.ke &middot; https://paperstreet.co.ke
    </div>
  </div>
</body>
</html>`

    const blob = new Blob([htmlContent], { type: 'text/html' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `PaperStreet_Quotation_${quote.quoteReference}.html`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-[#FBFAF7] pt-32 pb-24 px-6 text-navy flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-navy" />
      </main>
    )
  }

  const quoteRef = quote?.quoteReference || refParam || 'PQ-260826-VO01'
  const grandTotal = quote ? quote.totalCommitmentKES + (quote.depositAmountKES || 0) : 0
  const durationMonths = quote?.durationMonths || 12
  const teamSize = quote?.teamSize || 1
  const { standardAnnualValue, savingKES, discountPercent } = quote
    ? calcAnnualSaving(quote.serviceSlug, quote.monthlyRateKES, quote.totalCommitmentKES, durationMonths, teamSize)
    : { standardAnnualValue: 0, savingKES: 0, discountPercent: 0 }

  return (
    <main className="min-h-screen bg-[#FBFAF7] pt-24 pb-28 text-navy">
      <div className="container mx-auto px-6 md:px-12 max-w-3xl">

        {/* Navigation & Action Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-navy/15 pb-4 mb-8">
          <Link
            href="/services"
            className="text-xs uppercase tracking-wider font-semibold text-navy/60 hover:text-navy transition-colors inline-flex items-center gap-1.5"
          >
            <ArrowLeft size={13} /> Back to Services
          </Link>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleDownloadPdf}
              className="bg-navy text-white text-xs font-semibold uppercase tracking-wider px-5 py-2 hover:bg-navy-600 transition-colors inline-flex items-center gap-1.5 cursor-pointer"
            >
              <Download size={13} /> Download Quotation
            </button>
          </div>
        </div>

        {/* Flat Professional Quotation Document */}
        <div className="space-y-8">

          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6 border-b-2 border-navy pb-6">
            <div>
              <span className="font-heading text-2xl md:text-3xl font-bold tracking-[0.2em] uppercase text-navy block">
                PAPER STREET
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-navy/60 block mt-1">
                Office Solutions &amp; Business Services · Kisumu CBD
              </span>
            </div>

            <div className="sm:text-right space-y-1">
              <span className="font-mono text-xs text-navy font-bold block">
                QUOTATION
              </span>
              <span className="inline-block bg-navy/5 border border-navy/20 text-navy font-mono text-[10px] font-bold px-2 py-0.5 uppercase tracking-wider">
                REF: {quoteRef}
              </span>
            </div>
          </div>

          {/* Client & Organization Details */}
          <div className="grid sm:grid-cols-2 gap-8 text-xs border-b border-navy/15 pb-6">
            <div className="space-y-1">
              <span className="font-mono text-[9px] uppercase tracking-wider text-navy/50 font-bold block mb-1">
                Prepared For
              </span>
              <p className="font-semibold text-navy text-sm">{quote?.companyName || quote?.clientName || 'Client'}</p>
              {quote?.companyName && (
                <p className="text-navy/70">Attn: {quote.clientName}</p>
              )}
              <p className="text-navy/70">{quote?.clientEmail || 'Client Email'}</p>
              <p className="text-navy/70">{quote?.clientPhone || 'Client Phone'}</p>
            </div>

            <div className="sm:text-right space-y-1">
              <span className="font-mono text-[9px] uppercase tracking-wider text-navy/50 font-bold block mb-1">
                Quotation Status &amp; Validity
              </span>
              <p className="text-navy"><strong>Status:</strong> Quotation Delivered</p>
              <p className="text-navy/80 font-mono text-[11px]"><strong>Reference:</strong> {quoteRef}</p>
              <p className="text-navy/80"><strong>Validity:</strong> 30 Days from Issue</p>
              <p className="text-navy/80"><strong>Issue Date:</strong> {new Date().toLocaleDateString('en-KE')}</p>
            </div>
          </div>

          {/* Package Specifications */}
          {quote && (
            <div className="space-y-3 border-b border-navy/15 pb-6 text-xs">
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                <div>
                  <span className="font-mono text-[9px] uppercase tracking-wider text-navy/50 font-bold block mb-0.5">
                    Your Proposed Solution
                  </span>
                  <h2 className="text-lg font-heading font-bold text-navy">{quote.serviceTitle} &mdash; {quote.tierName}</h2>
                </div>
                <span className="text-navy/70">Location: Kisumu CBD</span>
              </div>

              <div className="grid sm:grid-cols-2 gap-4 pt-2 text-navy/80">
                <p><strong>Contract Term:</strong> {quote.commitmentPeriod}</p>
                <p><strong>Target Start Date:</strong> {fmtDate(quote.startDate)} {quote.endDate ? `to ${fmtDate(quote.endDate)}` : ''}</p>
                {quote.teamSize && quote.teamSize > 1 && (
                  <p><strong>Workstations:</strong> {quote.teamSize} Dedicated Workstations</p>
                )}
              </div>
            </div>
          )}

          {/* Investment Ledger */}
          {quote && (
            <div className="space-y-3 border-b border-navy/15 pb-6">
              <span className="font-mono text-[9px] uppercase tracking-wider text-navy/50 font-bold block mb-1">
                Investment Breakdown
              </span>
              <table className="w-full text-xs border-collapse">
                <thead>
                  <tr className="border-b border-navy/20 text-navy font-semibold uppercase tracking-wider font-mono text-[10px]">
                    <th className="py-2 text-left">Description</th>
                    <th className="py-2 text-right">Amount (KES)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-navy/5">
                  <tr>
                    <td className="py-3 text-navy">
                      <p className="font-semibold">Monthly equivalent rate</p>
                      <p className="text-[11px] text-navy/60">{quote.serviceTitle} ({quote.tierName}) · {quote.commitmentPeriod}</p>
                    </td>
                    <td className="py-3 text-right font-mono text-navy">
                      {kes(quote.monthlyRateKES * teamSize)} / mo
                    </td>
                  </tr>

                  {savingKES > 0 && (
                    <>
                      <tr>
                        <td className="py-2 text-navy/60">
                          Standard annual value
                        </td>
                        <td className="py-2 text-right font-mono text-navy/60 line-through">
                          {kes(standardAnnualValue)}
                        </td>
                      </tr>
                      <tr>
                        <td className="py-2 text-emerald-800 font-semibold">
                          Annual commitment discount ({discountPercent}% off)
                        </td>
                        <td className="py-2 text-right font-mono text-emerald-800 font-semibold">
                          −{kes(savingKES)}
                        </td>
                      </tr>
                    </>
                  )}

                  <tr>
                    <td className="py-3 text-navy font-semibold">
                      Service fee ({durationMonths} months)
                    </td>
                    <td className="py-3 text-right font-mono font-semibold text-navy">
                      {kes(quote.totalCommitmentKES)}
                    </td>
                  </tr>

                  <tr>
                    <td className="py-3 text-navy">
                      <p className="font-semibold">Security deposit</p>
                      <p className="text-[11px] text-navy/60">
                        {quote.depositAmountKES > 0 ? 'Fully refundable upon contract completion' : 'No deposit required under this arrangement'}
                      </p>
                    </td>
                    <td className="py-3 text-right font-mono text-navy">
                      {quote.depositAmountKES > 0 ? kes(quote.depositAmountKES) : 'KES 0'}
                    </td>
                  </tr>

                  <tr className="border-t-2 border-navy text-sm font-bold bg-navy text-white">
                    <td className="p-3 text-white uppercase font-heading tracking-wider">
                      Total Initial Amount Payable
                    </td>
                    <td className="p-3 text-right font-mono text-white text-base">
                      {kes(grandTotal)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          {/* Commercial Conditions */}
          <div className="space-y-3 border-b border-navy/15 pb-6 text-xs">
            <span className="font-mono text-[9px] uppercase tracking-wider text-navy/50 font-bold block">
              Commercial Conditions
            </span>
            <div className="space-y-2 text-navy/75 leading-relaxed bg-navy/[0.02] p-4 border border-navy/10 text-xs">
              <p>• <strong>Quotation Validity:</strong> 30 calendar days from issue date.</p>
              <p>• <strong>Payment Terms:</strong> Initial payment payable upon acceptance and prior to service activation.</p>
              <p>• <strong>Agreement:</strong> Full service terms and onboarding agreement provided separately prior to activation.</p>
              <p>• For our general terms, please review our <Link href="/terms-of-service" className="text-navy font-semibold underline">Terms of Service</Link>.</p>
            </div>
          </div>

          {/* How to Get Started */}
          <div className="pt-2 text-xs space-y-2">
            <span className="font-mono text-[9px] uppercase tracking-wider text-navy/50 font-bold block">
              How to Get Started
            </span>
            <p className="text-navy/80 leading-relaxed">
              1. <strong>Confirm Your Acceptance:</strong> Reply to your quotation email or message our team to confirm.
            </p>
            <p className="text-navy/80 leading-relaxed">
              2. <strong>Service Agreement &amp; Verification:</strong> We'll provide your simple agreement and guide you through standard KYC verification.
            </p>
            <p className="text-navy/80 leading-relaxed">
              3. <strong>Activation:</strong> Once the agreement and initial payment are completed, your service is activated immediately.
            </p>
          </div>

          {/* Footer */}
          <div className="pt-8 border-t border-navy/15 text-center text-[11px] text-navy/50 space-y-1">
            <p className="font-semibold text-navy/70">Paper Street</p>
            <p>Office Solutions &amp; Business Services · Kisumu, Kenya</p>
            <p>Phone / WhatsApp: +254 110 486 677 &nbsp;|&nbsp; Email: hello@paperstreet.co.ke &nbsp;|&nbsp; https://paperstreet.co.ke</p>
          </div>

        </div>

      </div>
    </main>
  )
}

export default function QuoteConfirmationView() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-[#FBFAF7] pt-32 pb-24 px-6 text-navy flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-navy" />
        </main>
      }
    >
      <QuoteConfirmationContent />
    </Suspense>
  )
}
