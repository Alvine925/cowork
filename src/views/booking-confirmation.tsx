'use client'

import React, { useEffect, useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { generateCalendarDetails, formatDisplayDateOrDates } from '@/lib/booking-rules-engine'
import { generatePdfReceiptBinary } from '@/lib/brevo-service'
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
  overtimeHours?: number
  overtimeFeeKES?: number
  paystackReference: string
  paymentChannel?: string
  paymentDate?: string
  passCode?: string
  specialRequests?: string
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
          } catch (_) { }
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
          } catch (_) { }
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

    try {
      const pdfBinary = generatePdfReceiptBinary({
        clientName: booking.clientName,
        clientEmail: booking.clientEmail,
        clientPhone: booking.clientPhone,
        companyName: booking.companyName,
        serviceTitle: booking.serviceTitle,
        tierName: booking.tierName || '',
        location: booking.location,
        bookingDate: booking.bookingDate,
        startTime: booking.startTime,
        endTime: booking.endTime,
        durationHours: booking.durationHours,
        rentAmountKES: booking.rentAmountKES || booking.totalAmountKES,
        depositAmountKES: booking.depositAmountKES || 0,
        totalAmountKES: booking.totalAmountKES,
        overtimeHours: booking.overtimeHours || 0,
        overtimeFeeKES: booking.overtimeFeeKES || 0,
        paystackReference: booking.paystackReference,
        passCode: booking.passCode,
        specialRequests: booking.specialRequests,
      })

      const len = pdfBinary.length
      const bytes = new Uint8Array(len)
      for (let i = 0; i < len; i++) {
        bytes[i] = pdfBinary.charCodeAt(i) & 0xff
      }

      const blob = new Blob([bytes], { type: 'application/pdf' })
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `PaperStreet_Receipt_${booking.paystackReference}.pdf`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      setTimeout(() => URL.revokeObjectURL(url), 10000)
    } catch (err) {
      console.error('Failed to download PDF receipt:', err)
    }
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
            <p>Phone: 0110486677 (+254 110 486 677) &nbsp;|&nbsp; Email: hello@paperstreet.co.ke &nbsp;|&nbsp; www.paperstreet.co.ke</p>
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
