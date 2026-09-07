'use client'

import React, { useEffect, useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { generateCalendarDetails, formatDisplayDateOrDates } from '@/lib/booking-rules-engine'
import {
  CheckCircle2,
  Download,
  Calendar,
  Clock,
  MapPin,
  Shield,
  Loader2,
  AlertCircle,
  QrCode,
  Share2,
  ArrowLeft,
} from 'lucide-react'

interface ConfirmedBooking {
  id?: string | number
  clientName: string
  clientEmail: string
  clientPhone: string
  companyName?: string
  serviceTitle: string
  tierName?: string
  location: string
  bookingDate: string
  startTime: string
  endTime: string
  durationHours?: number
  rentAmountKES: number
  depositAmountKES: number
  totalAmountKES: number
  paystackReference: string
  paymentChannel?: string
  paymentDate?: string
  passCode?: string
  status: string
}

function BookingConfirmationContent() {
  const searchParams = useSearchParams()

  const reference = searchParams.get('reference') || searchParams.get('trxref')

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [booking, setBooking] = useState<ConfirmedBooking | null>(null)

  useEffect(() => {
    if (!reference) {
      setError('No transaction reference found in this URL.')
      setLoading(false)
      return
    }

    let isMounted = true

    async function verifyBooking() {
      try {
        setLoading(true)
        setError(null)

        let localMeta = null
        if (typeof window !== 'undefined') {
          try {
            const raw = sessionStorage.getItem(`ps_pending_${reference}`) || sessionStorage.getItem('ps_pending_latest')
            if (raw) localMeta = JSON.parse(raw)
          } catch (_) {}
        }

        let data: any = null

        // 1. Invoke Supabase verify-paystack Edge Function
        const { data: edgeData, error: edgeErr } = await supabase.functions.invoke('verify-paystack', {
          body: { reference, metadata: localMeta },
        })

        if (!edgeErr && edgeData?.success) {
          data = edgeData
        } else {
          // Fallback to Next.js API route
          const res = await fetch('/api/paystack/verify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ reference, metadata: localMeta }),
          })
          data = await res.json()
        }

        if (!isMounted) return

        if (!data || !data.success) {
          // Direct Supabase DB lookup fallback for pre-inserted booking
          const { data: dbBooking } = await supabase
            .from('client_bookings')
            .select('*')
            .eq('paystack_reference', reference)
            .maybeSingle()

          if (dbBooking) {
            setBooking({
              id: dbBooking.id,
              clientName: dbBooking.client_name,
              clientEmail: dbBooking.client_email,
              clientPhone: dbBooking.client_phone,
              companyName: dbBooking.company_name,
              serviceTitle: dbBooking.service_title,
              location: dbBooking.location,
              bookingDate: dbBooking.booking_date,
              startTime: dbBooking.start_time,
              endTime: dbBooking.end_time,
              durationHours: dbBooking.duration_hours,
              rentAmountKES: dbBooking.rent_amount_kes,
              depositAmountKES: dbBooking.deposit_amount_kes,
              totalAmountKES: dbBooking.total_amount_kes,
              paystackReference: dbBooking.paystack_reference,
              passCode: dbBooking.qr_code_token || `PS-${reference}`,
              paymentChannel: 'Paystack',
              paymentDate: dbBooking.created_at,
              status: dbBooking.payment_status === 'paid' ? 'confirmed' : 'confirmed',
            })
          } else {
            setError(data?.error || 'Unable to verify payment.')
          }
        } else {
          setBooking(data.booking)
          try {
            sessionStorage.removeItem(`ps_pending_${reference}`)
            sessionStorage.removeItem('ps_pending_latest')
          } catch (_) {}
        }
      } catch (err: any) {
        if (isMounted) {
          setError(err?.message || 'A network error occurred while confirming your reservation.')
        }
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    verifyBooking()

    return () => {
      isMounted = false
    }
  }, [reference])

  const handleDownloadReceipt = () => {
    if (!booking) return

    const dateList = (booking.bookingDate || '').includes(',')
      ? booking.bookingDate.split(',').map((d: string) => d.trim()).filter(Boolean)
      : (booking.bookingDate || '').includes(';')
      ? booking.bookingDate.split(';').map((d: string) => d.trim()).filter(Boolean)
      : [booking.bookingDate || '']

    const receiptHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Paper Street Official Receipt - ${booking.paystackReference}</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #0F2D52; background: #ffffff; margin: 0; padding: 40px 20px; font-size: 13px; line-height: 1.6; }
    .receipt-container { max-width: 680px; margin: 0 auto; background: #ffffff; }
    .header { border-bottom: 2px solid #0F2D52; padding-bottom: 16px; margin-bottom: 24px; }
    .brand { font-size: 20px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; color: #0F2D52; }
    .brand-sub { font-size: 11px; color: #64748B; margin-top: 4px; }
    .title-row { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 20px; border-bottom: 1px solid #cbd5e1; padding-bottom: 16px; }
    .doc-title { font-size: 14px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; color: #0F2D52; }
    .meta-item { font-size: 12px; margin-top: 4px; color: #475569; }
    .meta-item strong { color: #0F2D52; }
    .badge { font-weight: 700; color: #065f46; }
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
  <div class="receipt-container">
    <div class="header">
      <div class="brand">PAPER STREET WORKSPACES</div>
      <div class="brand-sub">CBD Commercial Center · Oginga Odinga St · Kisumu CBD, Kenya</div>
      <div class="brand-sub">Tel: +254 709 123 456 · Email: hello@paperstreet.africa · Web: www.paperstreet.africa</div>
    </div>

    <div class="title-row">
      <div>
        <div class="doc-title">OFFICIAL BOOKING RECEIPT</div>
        <div class="meta-item">Reference: <strong>${booking.paystackReference}</strong></div>
        <div class="meta-item">Issue Date: <strong>${new Date().toLocaleDateString('en-KE', { day: 'numeric', month: 'long', year: 'numeric' })}</strong></div>
      </div>
      <div style="text-align: right;">
        <div class="meta-item">Status: <span class="badge">PAYMENT CONFIRMED AND VERIFIED</span></div>
        <div class="meta-item">Access Pass Code: <strong>${booking.passCode || 'ACTIVE'}</strong></div>
      </div>
    </div>

    <div class="section-title">CLIENT DETAILS</div>
    <div class="detail-grid">
      <div class="detail-row">
        <div class="detail-label">Client Name:</div>
        <div class="detail-val">${booking.clientName}</div>
      </div>
      <div class="detail-row">
        <div class="detail-label">Email:</div>
        <div class="detail-val">${booking.clientEmail}</div>
      </div>
      <div class="detail-row">
        <div class="detail-label">Phone:</div>
        <div class="detail-val">${booking.clientPhone}</div>
      </div>
      ${booking.companyName ? `
      <div class="detail-row">
        <div class="detail-label">Company:</div>
        <div class="detail-val">${booking.companyName}</div>
      </div>` : ''}
    </div>

    <div class="section-title">RESERVATION DETAILS</div>
    <div class="detail-grid">
      <div class="detail-row">
        <div class="detail-label">Package &amp; Tier:</div>
        <div class="detail-val">${booking.serviceTitle}</div>
      </div>
      <div class="detail-row">
        <div class="detail-label">Facility Location:</div>
        <div class="detail-val">${booking.location}</div>
      </div>
    </div>

    <!-- Individual Rows for Each Scheduled Date & Time -->
    <div class="section-title">SCHEDULED PASS DATES &amp; ACCESS HOURS (${dateList.length} DAY PASS${dateList.length > 1 ? 'ES' : ''})</div>
    <table class="ledger" style="margin-top: 6px; margin-bottom: 20px;">
      <thead>
        <tr>
          <th style="width: 25%;">Pass Day</th>
          <th style="width: 45%;">Date</th>
          <th class="num" style="width: 30%;">Access Window</th>
        </tr>
      </thead>
      <tbody>
        ${dateList.map((dStr, idx) => `
          <tr>
            <td style="font-weight: 600; color: #0F2D52;">Day ${idx + 1}</td>
            <td>${formatDisplayDateOrDates(dStr)}</td>
            <td class="num">${booking.startTime} &mdash; ${booking.endTime}</td>
          </tr>
        `).join('')}
      </tbody>
    </table>

    <div class="section-title">PAYMENT BREAKDOWN</div>
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
            <strong>${booking.serviceTitle}</strong><br>
            <span style="font-size: 11px; color: #64748B;">Schedule: ${formattedDate} (${booking.startTime} - ${booking.endTime})</span>
          </td>
          <td class="num">KES ${(booking.rentAmountKES || booking.totalAmountKES).toLocaleString()}</td>
        </tr>
        ${booking.depositAmountKES > 0 ? `
        <tr>
          <td>
            <strong>Refundable Security Deposit</strong><br>
            <span style="font-size: 11px; color: #64748B;">Refundable within 30 days of term completion</span>
          </td>
          <td class="num">KES ${booking.depositAmountKES.toLocaleString()}</td>
        </tr>` : ''}
        <tr class="total-row">
          <td>TOTAL AMOUNT PAID</td>
          <td class="num">KES ${booking.totalAmountKES.toLocaleString()}</td>
        </tr>
      </tbody>
    </table>

    <div style="font-size: 12px; color: #475569; margin: 24px 0; border-top: 1px solid #cbd5e1; padding-top: 14px;">
      <strong style="color: #0F2D52;">Front Desk Check-in:</strong> Present booking reference <strong>${booking.paystackReference}</strong> at Paper Street reception upon arrival. Our team will verify your reservation and allocate your space.
    </div>

    <div class="footer">
      <p style="margin: 0 0 4px 0;">This is an official payment receipt issued by Paper Street Workspaces.</p>
      <p style="margin: 0;">For enquiries contact hello@paperstreet.africa or call +254 709 123 456</p>
    </div>
  </div>
</body>
</html>`

    const blob = new Blob([receiptHtml], { type: 'text/html' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `PaperStreet_Receipt_${booking.paystackReference}.html`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  // 1. Loading state
  if (loading) {
    return (
      <main className="min-h-screen bg-[#fbfaf7] pt-32 pb-24 px-6 text-navy flex items-center justify-center">
        <div className="max-w-md w-full text-center space-y-4">
          <Loader2 className="w-8 h-8 animate-spin mx-auto text-navy" />
          <h2 className="font-heading text-2xl text-navy">Verifying Payment Confirmation</h2>
          <p className="text-xs text-navy/70 leading-relaxed">
            Retrieving your official booking receipt and payment confirmation...
          </p>
        </div>
      </main>
    )
  }

  // 2. Error state
  if (error || !booking) {
    return (
      <main className="min-h-screen bg-[#fbfaf7] pt-32 pb-24 px-6 text-navy">
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="border border-red-200 bg-red-50/40 p-8 space-y-4">
            <div className="flex items-center gap-3 text-red-700">
              <AlertCircle size={22} />
              <h1 className="font-heading text-2xl">Payment Confirmation Notice</h1>
            </div>
            <p className="text-xs text-red-700 leading-relaxed">
              {error || 'We could not confirm this transaction reference.'}
            </p>
            {reference && (
              <p className="text-xs text-navy/60 font-mono">Reference: {reference}</p>
            )}
            <div className="pt-4 flex flex-wrap gap-4">
              <Link
                href="/services"
                className="bg-navy text-white text-xs font-semibold uppercase tracking-wider px-6 py-3 hover:bg-navy-600 transition-colors inline-flex items-center gap-2"
              >
                <ArrowLeft size={13} /> Back to Services
              </Link>
              <button
                type="button"
                onClick={() => window.location.reload()}
                className="border border-navy/30 text-navy text-xs font-semibold uppercase tracking-wider px-6 py-3 hover:bg-navy/5 transition-colors"
              >
                Retry Verification
              </button>
            </div>
          </div>
        </div>
      </main>
    )
  }

  // 3. Success state - Official Receipt Document
  const formattedDate = formatDisplayDateOrDates(booking.bookingDate)

  const calendarDetails = generateCalendarDetails({
    reference: booking.paystackReference,
    serviceTitle: booking.serviceTitle,
    location: booking.location,
    bookingDate: booking.bookingDate,
    startTime: booking.startTime,
    endTime: booking.endTime,
  })

  const handleDownloadIcs = () => {
    const blob = new Blob([calendarDetails.icsContent], { type: 'text/calendar;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `PaperStreet_Booking_${booking.paystackReference}.ics`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  const overtimeFee = (booking as any).overtimeFeeKES || (booking as any).overtime_fee_kes || 0
  const overtimeHours = (booking as any).overtimeHours || (booking as any).overtime_hours || 0

  const dateList = (booking.bookingDate || '').includes(',')
    ? booking.bookingDate.split(',').map((d: string) => d.trim()).filter(Boolean)
    : (booking.bookingDate || '').includes(';')
    ? booking.bookingDate.split(';').map((d: string) => d.trim()).filter(Boolean)
    : [booking.bookingDate || '']

  return (
    <main className="min-h-screen bg-[#fbfaf7] pt-24 pb-28 text-navy print:pt-0 print:pb-0 print:bg-white">
      <div className="container mx-auto px-6 md:px-12 max-w-3xl">
        
        {/* Navigation & Action Bar (Hidden on print) */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-navy/15 pb-4 mb-8 print:hidden">
          <Link
            href="/services"
            className="text-xs uppercase tracking-wider font-semibold text-navy/60 hover:text-navy transition-colors inline-flex items-center gap-1.5"
          >
            <ArrowLeft size={13} /> Back to Services
          </Link>

          <div className="flex flex-wrap items-center gap-2.5">
            <a
              href={calendarDetails.googleUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-navy/25 text-navy text-xs font-semibold uppercase tracking-wider px-3.5 py-2 hover:bg-navy/5 transition-colors inline-flex items-center gap-1.5"
            >
              <Calendar size={13} /> Google Calendar
            </a>

            <button
              type="button"
              onClick={handleDownloadIcs}
              className="border border-navy/25 text-navy text-xs font-semibold uppercase tracking-wider px-3.5 py-2 hover:bg-navy/5 transition-colors inline-flex items-center gap-1.5 cursor-pointer"
            >
              <Download size={13} /> .ICS Event
            </button>

            <button
              type="button"
              onClick={handleDownloadReceipt}
              className="bg-navy text-white text-xs font-semibold uppercase tracking-wider px-5 py-2 hover:bg-navy-600 transition-colors inline-flex items-center gap-1.5 cursor-pointer"
            >
              <Download size={13} /> Download Receipt
            </button>
          </div>
        </div>

        {/* Clean Official Receipt Document (Flat No-Card Layout) */}
        <div className="space-y-8">
          
          {/* Receipt Top Header with Paper Street Logo */}
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
              <span className="font-heading text-sm uppercase tracking-wider font-bold text-navy block">
                Official Booking Receipt
              </span>
              <span className="font-mono text-xs text-navy/70 block">
                Ref: <strong className="text-navy">{booking.paystackReference}</strong>
              </span>
              <div className="text-[11px] font-mono uppercase tracking-wider font-bold text-emerald-800 mt-1">
                ✓ Payment Confirmed &amp; Verified
              </div>
            </div>
          </div>

          {/* Client & Payment Info Grid (Pure Typography) */}
          <div className="grid sm:grid-cols-2 gap-8 text-xs border-b border-navy/15 pb-6">
            <div className="space-y-1">
              <span className="font-mono text-[9px] uppercase tracking-wider text-navy/50 font-bold block mb-1">
                Billed To (Client Details)
              </span>
              <p className="font-semibold text-navy text-sm">{booking.clientName}</p>
              {booking.companyName && (
                <p className="text-navy/70">{booking.companyName}</p>
              )}
              <p className="text-navy/70">{booking.clientEmail}</p>
              <p className="text-navy/70">{booking.clientPhone}</p>
            </div>

            <div className="sm:text-right space-y-1">
              <span className="font-mono text-[9px] uppercase tracking-wider text-navy/50 font-bold block mb-1">
                Payment &amp; Check-in Details
              </span>
              <p className="text-navy"><strong>Payment:</strong> Verified Online Checkout</p>
              <p className="text-navy/80 font-mono text-[11px]"><strong>Confirmation Ref:</strong> {booking.paystackReference}</p>
              <p className="text-navy/80"><strong>Status:</strong> Confirmed (Ready for Check-in)</p>
              <p className="text-navy/80"><strong>Issue Date:</strong> {new Date().toLocaleDateString('en-KE')}</p>
            </div>
          </div>

          {/* Package Details & Individual Scheduled Dates (No Cards) */}
          <div className="space-y-4 border-b border-navy/15 pb-6">
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
              <div>
                <span className="font-mono text-[9px] uppercase tracking-wider text-navy/50 font-bold block mb-0.5">
                  Reserved Package &amp; Location
                </span>
                <h2 className="text-lg font-heading font-bold text-navy">{booking.serviceTitle}</h2>
              </div>
              <span className="text-xs text-navy/70 font-medium">Facility: {booking.location}</span>
            </div>

            {/* Individual Date & Time Rows Table */}
            <div className="pt-2">
              <table className="w-full text-xs border-collapse">
                <thead>
                  <tr className="border-b border-navy/20 text-navy font-semibold uppercase tracking-wider font-mono text-[10px]">
                    <th className="py-2 text-left w-24">Pass Day</th>
                    <th className="py-2 text-left">Scheduled Date</th>
                    <th className="py-2 text-right">Access Hours</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-navy/10">
                  {dateList.map((dStr, idx) => (
                    <tr key={idx}>
                      <td className="py-2.5 font-mono text-[11px] text-navy font-bold">Day {idx + 1}</td>
                      <td className="py-2.5 font-semibold text-navy">{formatDisplayDateOrDates(dStr)}</td>
                      <td className="py-2.5 font-mono text-right text-navy/80 font-medium">
                        {booking.startTime} &mdash; {booking.endTime}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Financial Breakdown Table */}
          <div className="space-y-3 border-b border-navy/15 pb-6">
            <span className="font-mono text-[9px] uppercase tracking-wider text-navy/50 font-bold block mb-1">
              Financial Breakdown &amp; Ledger
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
                    <p className="font-semibold">{booking.serviceTitle}</p>
                    <p className="text-[11px] text-navy/60">Schedule: {dateList.length} Day Pass{dateList.length > 1 ? 'es' : ''} ({booking.startTime} - {booking.endTime})</p>
                  </td>
                  <td className="py-3 text-right font-mono font-semibold text-navy">
                    KES {(booking.rentAmountKES || booking.totalAmountKES).toLocaleString()}
                  </td>
                </tr>

                {overtimeFee > 0 && (
                  <tr>
                    <td className="py-3 text-navy">
                      <p className="font-semibold text-amber-900">Extended-Hours Access ({overtimeHours} hr{overtimeHours > 1 ? 's' : ''})</p>
                      <p className="text-[11px] text-amber-700">Access scheduled beyond standard operating hours</p>
                    </td>
                    <td className="py-3 text-right font-mono font-semibold text-amber-900">
                      KES {overtimeFee.toLocaleString()}
                    </td>
                  </tr>
                )}

                {booking.depositAmountKES > 0 && (
                  <tr>
                    <td className="py-3 text-navy">
                      <p className="font-semibold">Refundable Security Deposit</p>
                      <p className="text-[11px] text-navy/60">Refundable upon term completion</p>
                    </td>
                    <td className="py-3 text-right font-mono font-semibold text-navy">
                      KES {booking.depositAmountKES.toLocaleString()}
                    </td>
                  </tr>
                )}

                <tr className="border-t-2 border-navy text-sm font-bold">
                  <td className="pt-4 text-navy uppercase font-heading tracking-wider">
                    Total Amount Paid
                  </td>
                  <td className="pt-4 text-right font-mono text-navy text-base">
                    KES {booking.totalAmountKES.toLocaleString()}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Front Desk Check-in Instruction (Plain text on background) */}
          <div className="pt-2 text-xs space-y-1">
            <span className="font-mono text-[9px] uppercase tracking-wider text-navy/50 font-bold block">
              Front Desk Check-in Instruction
            </span>
            <p className="text-navy/80 leading-relaxed">
              Present this official confirmation reference (<strong>{booking.paystackReference}</strong>) at Paper Street reception upon arrival. Our front-desk team will verify your reservation, allocate your space, and connect you to high-speed fibre Wi-Fi.
            </p>
          </div>

          {/* Clean Receipt Document Footer */}
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

export default function BookingConfirmationView() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-[#fbfaf7] pt-32 pb-24 px-6 text-navy flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-navy" />
        </main>
      }
    >
      <BookingConfirmationContent />
    </Suspense>
  )
}
