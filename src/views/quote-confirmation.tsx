'use client'

import React, { useEffect, useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import {
  ArrowLeft,
  Download,
  CheckCircle2,
  Mail,
  Phone,
  Clock,
  Building2,
  FileCheck,
  Loader2,
  FileText,
} from 'lucide-react'

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

    const issueDate = new Date().toLocaleDateString('en-KE', { day: 'numeric', month: 'long', year: 'numeric' })
    const validUntil = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString('en-KE', { day: 'numeric', month: 'long', year: 'numeric' })
    const grandTotal = quote.totalCommitmentKES + (quote.depositAmountKES || 0)

    const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Paper Street Official Quotation - ${quote.quoteReference}</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #0F2D52; background: #ffffff; margin: 0; padding: 40px 20px; font-size: 13px; line-height: 1.6; }
    .quote-container { max-width: 680px; margin: 0 auto; background: #ffffff; }
    .header { border-bottom: 2px solid #0F2D52; padding-bottom: 16px; margin-bottom: 24px; }
    .brand { font-size: 20px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; color: #0F2D52; }
    .brand-sub { font-size: 11px; color: #64748B; margin-top: 4px; }
    .title-row { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 20px; border-bottom: 1px solid #cbd5e1; padding-bottom: 16px; }
    .doc-title { font-size: 14px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; color: #0F2D52; }
    .meta-item { font-size: 12px; margin-top: 4px; color: #475569; }
    .meta-item strong { color: #0F2D52; }
    .badge { font-weight: 700; color: #1e40af; }
    .section-title { font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px; color: #0F2D52; margin-top: 20px; margin-bottom: 8px; }
    .detail-grid { display: table; width: 100%; border-bottom: 1px solid #cbd5e1; padding-bottom: 16px; margin-bottom: 20px; }
    .detail-row { display: table-row; }
    .detail-label { display: table-cell; width: 35%; padding: 4px 0; color: #64748B; font-size: 12px; }
    .detail-val { display: table-cell; padding: 4px 0; color: #0F2D52; font-size: 12px; font-weight: 600; }
    table.ledger { width: 100%; border-collapse: collapse; margin: 16px 0 24px 0; font-size: 12px; }
    table.ledger th { text-align: left; padding: 8px 0; border-bottom: 1px solid #0F2D52; font-size: 10px; text-transform: uppercase; letter-spacing: 1px; color: #0F2D52; }
    table.ledger td { padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #1e293b; }
    table.ledger td.num { text-align: right; font-family: monospace; font-size: 13px; }
    table.ledger th.num { text-align: right; }
    .total-row td { border-top: 2px solid #0F2D52; border-bottom: 2px solid #0F2D52; font-weight: 700; color: #0F2D52; font-size: 14px; padding: 12px 0; }
    .footer { margin-top: 40px; padding-top: 16px; border-top: 1px solid #cbd5e1; font-size: 11px; color: #64748B; text-align: center; }
  </style>
</head>
<body>
  <div class="quote-container">
    <div class="header">
      <div class="brand">PAPER STREET WORKSPACES</div>
      <div class="brand-sub">CBD Commercial Center · Oginga Odinga St · Kisumu CBD, Kenya</div>
      <div class="brand-sub">Tel: +254 709 123 456 · Email: hello@paperstreet.africa · Web: www.paperstreet.africa</div>
    </div>

    <div class="title-row">
      <div>
        <div class="doc-title">OFFICIAL MEMBERSHIP QUOTATION</div>
        <div class="meta-item">Quote Ref: <strong>${quote.quoteReference}</strong></div>
        <div class="meta-item">Issue Date: <strong>${issueDate}</strong></div>
      </div>
      <div style="text-align: right;">
        <div class="meta-item">Status: <span class="badge">PROPOSAL DELIVERED</span></div>
        <div class="meta-item">Validity: <strong>30 Days (${validUntil})</strong></div>
      </div>
    </div>

    <div class="section-title">PROPOSAL PREPARED FOR</div>
    <div class="detail-grid">
      ${quote.companyName ? `
      <div class="detail-row">
        <div class="detail-label">Organization / Company:</div>
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

    <div class="section-title">SPECIFICATIONS &amp; FACILITY DETAILS</div>
    <div class="detail-grid">
      <div class="detail-row">
        <div class="detail-label">Package &amp; Tier:</div>
        <div class="detail-val">${quote.serviceTitle} &mdash; ${quote.tierName}</div>
      </div>
      <div class="detail-row">
        <div class="detail-label">Facility Location:</div>
        <div class="detail-val">CBD Commercial Center, Oginga Odinga St, Kisumu CBD</div>
      </div>
      <div class="detail-row">
        <div class="detail-label">Commitment Term:</div>
        <div class="detail-val">${quote.commitmentPeriod}</div>
      </div>
      <div class="detail-row">
        <div class="detail-label">Target Start Date:</div>
        <div class="detail-val">${quote.startDate}</div>
      </div>
    </div>

    <div class="section-title">ITEMIZED INVESTMENT BREAKDOWN</div>
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
            <strong>${quote.serviceTitle} (${quote.tierName})</strong><br>
            <span style="font-size: 11px; color: #64748B;">Standard Rate: KES ${quote.monthlyRateKES.toLocaleString()} / mo &middot; Term: ${quote.commitmentPeriod}</span>
          </td>
          <td class="num">KES ${quote.totalCommitmentKES.toLocaleString()}</td>
        </tr>
        ${quote.depositAmountKES > 0 ? `
        <tr>
          <td>
            <strong>Refundable Security Deposit</strong><br>
            <span style="font-size: 11px; color: #64748B;">Fully refundable upon contract completion</span>
          </td>
          <td class="num">KES ${quote.depositAmountKES.toLocaleString()}</td>
        </tr>
        ` : ''}
        <tr class="total-row">
          <td>TOTAL INITIAL INVESTMENT</td>
          <td class="num">KES ${grandTotal.toLocaleString()}</td>
        </tr>
      </tbody>
    </table>

    <div class="section-title">PAPER STREET TERMS OF SERVICE &amp; REGULATORY FRAMEWORK</div>
    <div style="font-size: 11px; color: #334155; line-height: 1.6; margin-bottom: 24px; border: 1px solid #cbd5e1; padding: 18px; background: #f8fafc;">
      <p style="margin: 0 0 10px 0;"><strong>1. About Paper Street and These Terms:</strong> Paper Street ("Paper Street", "we", "us", or "our") operates commercial coworking spaces, private office suites, meeting rooms, and virtual office business address services across Kenya, including our flagship commercial facilities at Kisumu CBD Commercial Center on Oginga Odinga Street in Kisumu CBD and Westlands in Nairobi. By subscribing to a Paper Street plan, completing an onboarding agreement, using our website, or accessing any of our physical premises or virtual services, you ("the Client", "Member", or "you") agree to be bound by these Terms of Service. These terms constitute a legally binding contract under the Laws of the Republic of Kenya.</p>
      
      <p style="margin: 0 0 10px 0;"><strong>2. Scope of Services Provided:</strong> Paper Street offers commercial workspace and administrative services including Virtual Office &amp; Business Address on Oginga Odinga St in Kisumu CBD under Section 47 of the Companies Act 2015, eCitizen BRS incorporation, KRA PIN registration, and banking KYC; Mail Handling &amp; Digitization (logging, parcel signing, 300 DPI high-res PDF scans); Executive Meeting Rooms (4-6 pax with 4K screens &amp; whiteboards); Coworking Desks; Private Office Suites; and Front-Desk Concierge Services (8:00 AM to 6:00 PM, Monday through Friday).</p>
      
      <p style="margin: 0 0 10px 0;"><strong>3. Onboarding and Statutory KYC Compliance:</strong> In compliance with the Proceeds of Crime and Anti-Money Laundering Act (POCAMLA), service activation requires clear copies of National ID / Passport for primary directors, KRA PIN certificates, Certificate of Incorporation, current CR12 (issued within 90 days), and proof of physical residential address. All KYC documents must be submitted within 14 calendar days of plan initiation.</p>
      
      <p style="margin: 0 0 10px 0;"><strong>4. Subscription Plans, Pricing &amp; Security Deposit Policy:</strong> Annual upfront plans (12 months) enjoy a Zero Security Deposit benefit. Monthly rolling contracts require a mandatory Two Months Refundable Security Deposit prior to activation. The deposit is held as security against unpaid invoices or property damages and is refunded within exactly 30 calendar days following contract conclusion, subject to clearance and proof from BRS (Form CR9 and updated CR12) confirming the legal change of registered office address away from Paper Street premises.</p>
      
      <p style="margin: 0 0 10px 0;"><strong>5. Legal Address Authorization &amp; Restrictions on Use:</strong> A valid subscription grants a limited, non-exclusive, revocable license to utilize the designated commercial address. It does not create any tenancy or leasehold title. Upon contract expiry or termination, you must immediately cease displaying the address and file Form CR9 with BRS within 30 days. Unauthorized use carries a penalty of KES 15,000 per month plus statutory reporting.</p>
      
      <p style="margin: 0 0 10px 0;"><strong>6. Permitted vs Prohibited Activities:</strong> Services and premises may be used solely for legitimate, lawful commercial purposes. Unauthorized activities include illegal/fraudulent schemes, unlicensed deposit-taking, pyramid schemes, cybercrime violations, or handling hazardous/contraband materials. Immediate termination and reporting applies to violations.</p>
      
      <p style="margin: 0 0 10px 0;"><strong>7. Mail, Parcel Intake &amp; Storage Protocols:</strong> Standard letters and packages are held free of storage charge for up to 30 calendar days. Items uncollected after 30 days incur KES 50/day. Items uncollected after 90 days will be returned to sender or disposed of without liability. Virtual Office Pro mail is scanned to PDF (300 DPI) within 1 business day. Custody liability is limited to KES 5,000 per parcel or declared value (lower).</p>
      
      <p style="margin: 0 0 10px 0;"><strong>8. Meeting Room &amp; Workspace Code of Conduct:</strong> Meeting rooms must be cancelled at least 24 hours in advance to receive credit. Cancellations under 24 hours are charged in full. Meeting suites are strictly 4-6 pax capacity. Members are responsible for proper equipment care and acoustic consideration.</p>
      
      <p style="margin: 0 0 10px 0;"><strong>9. Payment Terms, Billing Cycles &amp; Grace Periods:</strong> Invoices are issued electronically (M-Pesa Till, RTGS/EFT, Visa/Mastercard; no cash). Due on the 1st of each cycle. 7-day grace period before service suspension. Accounts in default beyond 30 days are permanently terminated with deposit forfeiture.</p>
      
      <p style="margin: 0 0 10px 0;"><strong>10. Binding Contract Commitments, Early Departure &amp; Legal Action:</strong> The Client commits to the full financial obligation for the entirety of the agreed contract term. In the event of early departure or voluntary non-use, the Client remains legally obligated for all subscription fees for the remaining contracted period. Paper Street reserves the right to initiate debt recovery, report defaults to CRBs, and commence formal legal proceedings in the courts of Kenya.</p>
      
      <p style="margin: 0 0 10px 0;"><strong>11. Limitation of Liability and Indemnification:</strong> Paper Street is not liable for indirect, incidental, or consequential damages. Aggregate liability is strictly capped at subscription fees paid in the preceding three (3) months. The Client indemnifies Paper Street from unlawful use or tax defaults.</p>
      
      <p style="margin: 0 0 10px 0;"><strong>12. Governing Law and Dispute Resolution:</strong> Governed by the Laws of the Republic of Kenya. Disputes shall first undergo 30-day good-faith negotiations, followed by binding mediation under the Nairobi Centre for International Arbitration (NCIA) before any court litigation.</p>
      
      <p style="margin: 0;"><strong>13. Legal Contact &amp; Corporate Notices:</strong> Legal Desk: legal@paperstreet.africa &middot; Client Support: hello@paperstreet.africa &middot; Kisumu Commercial Center: Oginga Odinga Street, Kisumu CBD &middot; Nairobi Commercial Center: Westlands Business Park, Waiyaki Way, Nairobi.</p>
    </div>

    <div class="section-title">ONBOARDING &amp; ACTIVATION NEXT STEPS</div>
    <div style="font-size: 12px; color: #475569; line-height: 1.6; margin-bottom: 24px;">
      1. A Paper Street Client Relationship Specialist will contact you within 2 business hours to verify custom requirements.<br>
      2. Submit corporate verification documents (CR12 / Certificate of Incorporation) for KYC verification.<br>
      3. Service agreement execution &amp; instant issuance of Official Proof of Address / Access Badges.
    </div>

    <div class="footer">
      <strong>Paper Street Workspaces</strong> &middot; CBD Commercial Center, Oginga Odinga Street, Kisumu CBD, Kenya<br>
      Tel: +254 709 123 456 &middot; Email: hello@paperstreet.africa &middot; Web: www.paperstreet.africa
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

        {/* Flat Institutional Quotation Document */}
        <div className="space-y-8">
          
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6 border-b-2 border-navy pb-6">
            <div>
              <span className="font-heading text-2xl md:text-3xl font-bold tracking-[0.2em] uppercase text-navy block">
                PAPER STREET
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-navy/60 block mt-1">
                Kisumu CBD · Commercial Center
              </span>
            </div>

            <div className="sm:text-right space-y-1">
              <span className="font-mono text-xs text-navy font-bold block">
                OFFICIAL MEMBERSHIP QUOTATION
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
                Proposal Prepared For
              </span>
              <p className="font-semibold text-navy text-sm">{quote?.companyName || quote?.clientName || 'Corporate Client'}</p>
              {quote?.companyName && (
                <p className="text-navy/70">Attn: {quote.clientName}</p>
              )}
              <p className="text-navy/70">{quote?.clientEmail || 'Client Email'}</p>
              <p className="text-navy/70">{quote?.clientPhone || 'Client Phone'}</p>
            </div>

            <div className="sm:text-right space-y-1">
              <span className="font-mono text-[9px] uppercase tracking-wider text-navy/50 font-bold block mb-1">
                Proposal Status &amp; Validity
              </span>
              <p className="text-navy"><strong>Status:</strong> Quotation Delivered &amp; In Review</p>
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
                    Selected Workspace Membership
                  </span>
                  <h2 className="text-lg font-heading font-bold text-navy">{quote.serviceTitle} &mdash; {quote.tierName}</h2>
                </div>
                <span className="text-navy/70">Location: CBD Commercial Center, Kisumu CBD</span>
              </div>

              <div className="grid sm:grid-cols-2 gap-4 pt-2 text-navy/80">
                <p><strong>Commitment Term:</strong> {quote.commitmentPeriod}</p>
                <p><strong>Target Start Date:</strong> {quote.startDate} {quote.endDate ? `to ${quote.endDate}` : ''}</p>
                {quote.teamSize && quote.teamSize > 1 && (
                  <p><strong>Workstations:</strong> {quote.teamSize} Dedicated Desks</p>
                )}
              </div>
            </div>
          )}

          {/* Investment Ledger */}
          {quote && (
            <div className="space-y-3 border-b border-navy/15 pb-6">
              <span className="font-mono text-[9px] uppercase tracking-wider text-navy/50 font-bold block mb-1">
                Itemized Investment Proposal
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
                      <p className="font-semibold">{quote.serviceTitle} ({quote.tierName})</p>
                      <p className="text-[11px] text-navy/60">Standard Rate: KES {quote.monthlyRateKES.toLocaleString()} / mo · {quote.commitmentPeriod}</p>
                    </td>
                    <td className="py-3 text-right font-mono font-semibold text-navy">
                      KES {quote.totalCommitmentKES.toLocaleString()}
                    </td>
                  </tr>

                  {quote.depositAmountKES > 0 && (
                    <tr>
                      <td className="py-3 text-navy">
                        <p className="font-semibold">Refundable Security Deposit</p>
                        <p className="text-[11px] text-navy/60">Fully refundable upon contract termination</p>
                      </td>
                      <td className="py-3 text-right font-mono font-semibold text-navy">
                        KES {quote.depositAmountKES.toLocaleString()}
                      </td>
                    </tr>
                  )}

                  <tr className="border-t-2 border-navy text-sm font-bold">
                    <td className="pt-4 text-navy uppercase font-heading tracking-wider">
                      Total Initial Investment
                    </td>
                    <td className="pt-4 text-right font-mono text-navy text-base">
                      KES {grandTotal.toLocaleString()}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          {/* Complete 13 Terms of Service Sections */}
          <div className="space-y-3 border-b border-navy/15 pb-6 text-xs">
            <span className="font-mono text-[9px] uppercase tracking-wider text-navy/50 font-bold block">
              Paper Street Terms of Service &amp; Regulatory Framework
            </span>
            <div className="space-y-3 text-navy/75 leading-relaxed bg-navy/[0.02] p-4 border border-navy/10 max-h-[380px] overflow-y-auto font-mono text-[11px]">
              <div>
                <strong className="text-navy block font-semibold mb-0.5">1. About Paper Street and These Terms</strong>
                <span>Paper Street operates commercial coworking spaces, private office suites, meeting rooms, and virtual office business address services across Kenya, including our flagship commercial facilities at Kisumu CBD Commercial Center on Oginga Odinga Street in Kisumu CBD and Westlands in Nairobi. By subscribing to a Paper Street plan, completing an onboarding agreement, using our website, or accessing any of our physical premises or virtual services, you agree to be bound by these Terms of Service.</span>
              </div>

              <div>
                <strong className="text-navy block font-semibold mb-0.5">2. Scope of Services Provided</strong>
                <span>Paper Street offers Virtual Office &amp; Business Address under Section 47 of the Companies Act 2015, eCitizen BRS incorporation, KRA PIN registration, and corporate banking KYC; Mail Handling &amp; Digitization (300 DPI PDF scans); Executive Meeting Rooms (4-6 pax with 4K displays); Coworking Desks; Private Office Suites; and Front-Desk Concierge Services (8:00 AM to 6:00 PM, Monday through Friday).</span>
              </div>

              <div>
                <strong className="text-navy block font-semibold mb-0.5">3. Onboarding and Statutory KYC Compliance</strong>
                <span>In compliance with POCAMLA and Kenyan tenancy standards, service activation requires clear copies of director National ID / Passport, KRA PIN certificates, Certificate of Incorporation, current CR12 (within 90 days), and proof of physical residential address within 14 calendar days of plan initiation.</span>
              </div>

              <div>
                <strong className="text-navy block font-semibold mb-0.5">4. Subscription Plans, Pricing &amp; Security Deposit Policy</strong>
                <span>Annual upfront plans enjoy a Zero Security Deposit benefit. Monthly rolling contracts require a mandatory Two Months Refundable Security Deposit prior to service activation. Deposits are refunded exactly 30 calendar days following contract conclusion, subject to clearance and certified proof from BRS (Form CR9 and updated CR12) confirming legal change of registered office address away from Paper Street premises.</span>
              </div>

              <div>
                <strong className="text-navy block font-semibold mb-0.5">5. Legal Address Authorization &amp; Restrictions on Use</strong>
                <span>A valid subscription grants a limited, non-exclusive, revocable license to utilize the designated commercial address. It does not create any tenancy or leasehold title. Upon contract expiry or termination, you must immediately cease displaying the address and file Form CR9 with BRS within 30 days. Unauthorized use carries a penalty of KES 15,000 per month plus statutory reporting.</span>
              </div>

              <div>
                <strong className="text-navy block font-semibold mb-0.5">6. Permitted vs Prohibited Activities</strong>
                <span>Services and premises may be used solely for legitimate, lawful commercial purposes. Unauthorized activities include illegal/fraudulent schemes, unlicensed deposit-taking, pyramid schemes, cybercrime violations, or handling hazardous/contraband materials. Immediate termination and reporting applies to violations.</span>
              </div>

              <div>
                <strong className="text-navy block font-semibold mb-0.5">7. Mail, Parcel Intake &amp; Storage Protocols</strong>
                <span>Standard letters and packages are held free of storage charge for up to 30 calendar days. Items uncollected after 30 days incur KES 50/day. Items uncollected after 90 days will be returned to sender or disposed of without liability. Virtual Office Pro mail is scanned to PDF (300 DPI) within 1 business day. Custody liability is limited to KES 5,000 per parcel or declared value (lower).</span>
              </div>

              <div>
                <strong className="text-navy block font-semibold mb-0.5">8. Meeting Room &amp; Workspace Code of Conduct</strong>
                <span>Meeting rooms must be cancelled at least 24 hours in advance to receive credit. Cancellations under 24 hours are charged in full. Meeting suites are strictly 4-6 pax capacity. Members are responsible for proper equipment care and acoustic consideration.</span>
              </div>

              <div>
                <strong className="text-navy block font-semibold mb-0.5">9. Payment Terms, Billing Cycles &amp; Grace Periods</strong>
                <span>Invoices are issued electronically (M-Pesa Till, RTGS/EFT, Visa/Mastercard; no cash). Due on the 1st of each cycle. 7-day grace period before service suspension. Accounts in default beyond 30 days are permanently terminated with deposit forfeiture.</span>
              </div>

              <div>
                <strong className="text-navy block font-semibold mb-0.5">10. Binding Contract Commitments, Early Departure &amp; Legal Action</strong>
                <span>The Client commits to the full financial obligation for the entirety of the agreed contract term. In the event of early departure or voluntary non-use, the Client remains legally obligated for all subscription fees for the remaining contracted period. Paper Street reserves the right to initiate debt recovery, report defaults to CRBs, and commence formal legal proceedings in the courts of Kenya.</span>
              </div>

              <div>
                <strong className="text-navy block font-semibold mb-0.5">11. Limitation of Liability and Indemnification</strong>
                <span>Paper Street is not liable for indirect, incidental, or consequential damages. Aggregate liability is strictly capped at subscription fees paid in the preceding three (3) months. The Client indemnifies Paper Street from unlawful use or tax defaults.</span>
              </div>

              <div>
                <strong className="text-navy block font-semibold mb-0.5">12. Governing Law and Dispute Resolution</strong>
                <span>Governed by the Laws of the Republic of Kenya. Disputes shall first undergo 30-day good-faith negotiations, followed by binding mediation under the Nairobi Centre for International Arbitration (NCIA) before any court litigation.</span>
              </div>

              <div>
                <strong className="text-navy block font-semibold mb-0.5">13. Legal Contact &amp; Corporate Notices</strong>
                <span>Legal Desk: legal@paperstreet.africa &middot; Client Support: hello@paperstreet.africa &middot; Kisumu Commercial Center: Oginga Odinga Street, Kisumu CBD &middot; Nairobi Commercial Center: Westlands Business Park, Waiyaki Way, Nairobi.</span>
              </div>
            </div>
          </div>

          {/* Onboarding Next Steps (Human in the Loop) */}
          <div className="pt-2 text-xs space-y-2">
            <span className="font-mono text-[9px] uppercase tracking-wider text-navy/50 font-bold block">
              What Happens Next (Human Onboarding Specialist)
            </span>
            <p className="text-navy/80 leading-relaxed">
              1. <strong>Direct Specialist Contact:</strong> A Paper Street membership specialist will reach out to <strong>{quote?.clientEmail || 'your email'}</strong> and <strong>{quote?.clientPhone || 'your phone'}</strong> within 2 business hours.
            </p>
            <p className="text-navy/80 leading-relaxed">
              2. <strong>KYC &amp; Agreement Execution:</strong> We will review any custom mailbox or meeting room requirements and prepare your official Membership Agreement.
            </p>
            <p className="text-navy/80 leading-relaxed">
              3. <strong>Instant Certificate Issuance:</strong> Upon agreement signing, your verified Proof of Address certificate and building access passes will be immediately activated.
            </p>
          </div>

          {/* Footer */}
          <div className="pt-8 border-t border-navy/15 text-center text-[11px] text-navy/50 space-y-1">
            <p className="font-semibold text-navy/70">Paper Street Workspaces</p>
            <p>CBD Commercial Center, Oginga Odinga Street, Kisumu CBD, Kenya</p>
            <p>Phone: +254 709 123 456 &nbsp;|&nbsp; Email: hello@paperstreet.africa &nbsp;|&nbsp; www.paperstreet.africa</p>
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
