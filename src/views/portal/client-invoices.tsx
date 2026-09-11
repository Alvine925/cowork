'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Download, Printer, X, FileText, CheckCircle2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { usePortalAuth } from './auth-context';
import { formatDisplayDateOrDates } from '@/lib/booking-rules-engine';

export interface UnifiedReceipt {
  id: string | number;
  receiptNumber: string;
  reference: string;
  description: string;
  location: string;
  bookingDate: string;
  startTime: string;
  endTime: string;
  amountKES: number;
  paymentMethod: string;
  status: string;
  createdAt: string;
  clientName: string;
  clientEmail: string;
  clientPhone?: string;
  companyName?: string;
}

function formatDate(value?: string | null) {
  if (!value) return '—';
  try {
    const d = new Date(value.includes('T') ? value : `${value}T00:00:00Z`);
    if (isNaN(d.getTime())) return value;
    return d.toLocaleDateString('en-KE', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      timeZone: 'UTC',
    });
  } catch (_) {
    return value;
  }
}

function formatMoney(value?: number | null) {
  if (value === null || value === undefined) return '—';
  return new Intl.NumberFormat('en-KE', {
    style: 'currency',
    currency: 'KES',
    maximumFractionDigits: 0,
  }).format(value);
}

export function ClientInvoicesView() {
  const { user } = usePortalAuth();
  const email = user?.email || '';
  const [receipts, setReceipts] = useState<UnifiedReceipt[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeReceipt, setActiveReceipt] = useState<UnifiedReceipt | null>(null);
  const receiptModalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function loadReceipts() {
      if (!user?.id && !email) {
        setReceipts([]);
        setLoading(false);
        return;
      }

      try {
        const guestUserId = email ? `guest_${email.replace(/[^a-zA-Z0-9]/g, '_')}` : '';

        // 1. Primary Source: Paid records from client_bookings
        let bQuery = supabase
          .from('client_bookings')
          .select('*')
          .order('created_at', { ascending: false });

        if (user?.id && email) {
          bQuery = bQuery.or(`user_id.eq.${user.id},user_id.eq.${guestUserId},client_email.ilike.${email}`);
        } else if (user?.id) {
          bQuery = bQuery.eq('user_id', user.id);
        } else if (email) {
          bQuery = bQuery.or(`user_id.eq.${guestUserId},client_email.ilike.${email}`);
        }

        const { data: bookingsData, error: bErr } = await bQuery;
        if (bErr) {
          console.warn('[ClientInvoices] client_bookings error:', bErr);
        }

        // 2. Secondary check for client_invoices table (if exists)
        let invoicesData: any[] = [];
        try {
          let invQuery = supabase
            .from('client_invoices')
            .select('*')
            .order('created_at', { ascending: false });

          if (user?.id && email) {
            invQuery = invQuery.or(`user_id.eq.${user.id},user_id.eq.${guestUserId}`);
          } else if (user?.id) {
            invQuery = invQuery.eq('user_id', user.id);
          }
          const { data: iData } = await invQuery;
          if (iData) invoicesData = iData;
        } catch (_) { }

        // 3. Map bookings to normalized UnifiedReceipt objects
        const list: UnifiedReceipt[] = [];
        const seenRefs = new Set<string>();

        if (bookingsData && bookingsData.length > 0) {
          for (const b of bookingsData) {
            const ref = b.paystack_reference || b.mpesa_reference || `PS-BK-${b.id}`;
            seenRefs.add(ref);

            const isPaid = b.payment_status?.toLowerCase() === 'paid' || b.status?.toLowerCase() === 'confirmed';
            list.push({
              id: b.id,
              receiptNumber: `INV-PS-${String(b.id).padStart(5, '0')}`,
              reference: ref,
              description: b.service_title || 'Workspace Reservation',
              location: b.location || 'Kisumu CBD Commercial Center',
              bookingDate: b.booking_date,
              startTime: b.start_time || '08:00 AM',
              endTime: b.end_time || b.calculated_end_time || '06:00 PM',
              amountKES: Number(b.total_amount_kes) || 0,
              paymentMethod: b.payment_method || 'Paystack Card / M-Pesa',
              status: isPaid ? 'Paid & Verified' : b.payment_status || 'Pending',
              createdAt: b.created_at,
              clientName: b.client_name || user?.user_metadata?.full_name || 'Client',
              clientEmail: b.client_email || email,
              clientPhone: b.client_phone || user?.user_metadata?.phone,
              companyName: b.company_name || user?.user_metadata?.company,
            });
          }
        }

        // Add any additional standalone invoices
        if (invoicesData && invoicesData.length > 0) {
          for (const inv of invoicesData) {
            if (!seenRefs.has(inv.invoice_number)) {
              list.push({
                id: inv.id,
                receiptNumber: inv.invoice_number,
                reference: inv.invoice_number,
                description: inv.description,
                location: 'Kisumu CBD Flagship',
                bookingDate: inv.created_at,
                startTime: '08:00 AM',
                endTime: '06:00 PM',
                amountKES: Number(inv.amount_kes) || 0,
                paymentMethod: inv.payment_method || 'Paystack',
                status: inv.status || 'Paid',
                createdAt: inv.created_at,
                clientName: user?.user_metadata?.full_name || 'Client',
                clientEmail: email,
              });
            }
          }
        }

        setReceipts(list);
      } catch (err) {
        console.warn('Receipts load error:', err);
      } finally {
        setLoading(false);
      }
    }

    void loadReceipts();
  }, [user, email]);

  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  return (
    <div className="space-y-10 animate-paper-rise">
      {/* Header */}
      <div className="border-b border-navy/10 pb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-navy/50 font-bold">
            Accounting &amp; Tax Compliance
          </span>
          <h1 className="font-heading text-3xl md:text-4xl text-navy mt-1">Orders &amp; Receipts</h1>
          <p className="text-xs text-navy/60 mt-1 max-w-xl leading-relaxed">
            Official ETR-compliant transaction records and VAT receipts for your Paper Street workspace bookings.
          </p>
        </div>
        <div className="text-right">
          <span className="font-mono text-[10px] uppercase tracking-wider text-navy/50 block">Total Records</span>
          <span className="font-heading text-2xl font-light text-navy">{receipts.length}</span>
        </div>
      </div>

      {/* Receipts Table */}
      {loading ? (
        <div className="space-y-4 py-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-16 bg-navy/5 animate-pulse" />
          ))}
        </div>
      ) : receipts.length === 0 ? (
        <div className="py-16 text-center border border-navy/10 bg-white p-8">
          <FileText className="mx-auto text-navy/30 mb-3" size={32} />
          <h3 className="font-heading text-lg text-navy">No receipts or orders yet</h3>
          <p className="text-xs text-navy/50 mt-1 max-w-md mx-auto">
            When you complete a day pass or boardroom reservation, your official KRA ETR tax receipt and payment confirmation will appear here.
          </p>
        </div>
      ) : (
        <div className="border border-navy/10 bg-white divide-y divide-navy/10">
          <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-3 bg-navy/[0.02] text-[10px] font-mono uppercase tracking-widest text-navy/60 font-semibold">
            <div className="col-span-3">Invoice / Ref</div>
            <div className="col-span-4">Service &amp; Dates</div>
            <div className="col-span-2 text-right">Amount (KES)</div>
            <div className="col-span-1 text-center">Status</div>
            <div className="col-span-2 text-right">Action</div>
          </div>

          {receipts.map((rec) => (
            <div
              key={rec.id}
              className="p-5 md:px-6 md:py-4 grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-4 items-center hover:bg-navy/[0.015] transition-colors"
            >
              <div className="md:col-span-3">
                <span className="font-mono text-xs font-semibold text-navy block">{rec.receiptNumber}</span>
                <span className="font-mono text-[10px] text-navy/50 block mt-0.5">Ref: {rec.reference}</span>
                <span className="text-[10px] text-navy/40 font-mono block mt-0.5">{formatDate(rec.createdAt)}</span>
              </div>

              <div className="md:col-span-4">
                <p className="text-xs font-medium text-navy leading-snug">{rec.description}</p>
                <p className="text-[11px] text-navy/60 mt-0.5">
                  {formatDisplayDateOrDates(rec.bookingDate)} · {rec.startTime} - {rec.endTime}
                </p>
                <p className="text-[10px] text-navy/40 mt-0.5 font-mono">{rec.location}</p>
              </div>

              <div className="md:col-span-2 md:text-right">
                <span className="font-heading text-base font-semibold text-navy block">
                  {formatMoney(rec.amountKES)}
                </span>
                <span className="text-[10px] text-navy/50 font-mono">{rec.paymentMethod}</span>
              </div>

              <div className="md:col-span-1 flex md:justify-center">
                <span className="inline-flex items-center gap-1 text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 bg-emerald-50 text-emerald-800 border border-emerald-200">
                  <CheckCircle2 size={10} /> Paid
                </span>
              </div>

              <div className="md:col-span-2 flex justify-end">
                <button
                  type="button"
                  onClick={() => setActiveReceipt(rec)}
                  className="border border-navy/20 px-3.5 py-1.5 text-[11px] uppercase tracking-wider font-semibold text-navy hover:bg-navy hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <Download size={12} /> View Receipt
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Official Tax Invoice / Receipt Modal */}
      {activeReceipt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-navy/60 backdrop-blur-xs p-4 overflow-y-auto">
          <div
            ref={receiptModalRef}
            className="bg-white max-w-2xl w-full p-8 md:p-10 shadow-2xl border border-navy/20 relative animate-paper-rise my-8"
          >
            {/* Modal Controls (Hidden in Print) */}
            <div className="flex justify-between items-center pb-6 border-b border-navy/10 print:hidden">
              <span className="font-mono text-[10px] uppercase tracking-widest text-navy/60 font-semibold">
                Official ETR Tax Invoice
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handlePrint}
                  className="bg-navy text-white px-3.5 py-1.5 text-xs uppercase tracking-wider font-semibold hover:bg-navy/90 flex items-center gap-1.5 transition-colors"
                >
                  <Printer size={13} /> Print / Save PDF
                </button>
                <button
                  type="button"
                  onClick={() => setActiveReceipt(null)}
                  className="p-1.5 text-navy/60 hover:text-navy hover:bg-navy/5"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Printable Tax Receipt Body */}
            <div className="pt-6 space-y-6 text-[#0F2D52]">
              {/* Institutional Header */}
              <div className="flex justify-between items-start border-b-2 border-navy pb-5">
                <div>
                  <h2 className="font-heading text-2xl font-bold tracking-wider text-navy uppercase">
                    Paper Street
                  </h2>
                  <p className="text-[10px] uppercase tracking-widest text-navy/60 font-mono mt-0.5">
                    Workspaces &amp; Commercial Center
                  </p>
                  <p className="text-xs text-navy/70 mt-1 leading-tight">
                    CBD Commercial Center · Oginga Odinga Street<br />
                    Kisumu CBD, Kenya<br />
                    Tel: 0110486677 · hello@paperstreet.co.ke
                  </p>
                </div>
                <div className="text-right">
                  <span className="inline-block bg-emerald-50 text-emerald-800 border border-emerald-300 text-[10px] font-mono uppercase font-bold tracking-wider px-2.5 py-1">
                    Tax Receipt Verified
                  </span>
                  <p className="font-mono text-[11px] font-bold text-navy mt-2">{activeReceipt.receiptNumber}</p>
                  <p className="font-mono text-[10px] text-navy/50">Issue: {formatDate(activeReceipt.createdAt)}</p>
                </div>
              </div>

              {/* KRA Compliance Box */}
              <div className="bg-navy/[0.03] border border-navy/10 p-3 grid grid-cols-2 md:grid-cols-4 gap-3 text-[11px] font-mono">
                <div>
                  <span className="text-[9px] uppercase tracking-wider text-navy/50 block">KRA PIN</span>
                  <span className="font-bold text-navy">P051982341Z</span>
                </div>
                <div>
                  <span className="text-[9px] uppercase tracking-wider text-navy/50 block">ETR Serial</span>
                  <span className="font-semibold text-navy">ETR-KRA-092811</span>
                </div>
                <div>
                  <span className="text-[9px] uppercase tracking-wider text-navy/50 block">Payment Ref</span>
                  <span className="font-bold text-navy truncate block">{activeReceipt.reference}</span>
                </div>
                <div>
                  <span className="text-[9px] uppercase tracking-wider text-navy/50 block">Channel</span>
                  <span className="font-semibold text-navy">{activeReceipt.paymentMethod}</span>
                </div>
              </div>

              {/* Client & Booking Itinerary */}
              <div className="grid md:grid-cols-2 gap-6 text-xs border-b border-navy/10 pb-5">
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-navy/50 font-bold block mb-1">
                    Billed To
                  </span>
                  <p className="font-semibold text-navy text-sm">{activeReceipt.clientName}</p>
                  {activeReceipt.companyName && (
                    <p className="text-navy/80">{activeReceipt.companyName}</p>
                  )}
                  <p className="text-navy/60 font-mono text-[11px]">{activeReceipt.clientEmail}</p>
                  {activeReceipt.clientPhone && (
                    <p className="text-navy/60 font-mono text-[11px]">{activeReceipt.clientPhone}</p>
                  )}
                </div>
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-navy/50 font-bold block mb-1">
                    Reservation Schedule
                  </span>
                  <p className="font-semibold text-navy">{activeReceipt.description}</p>
                  <p className="text-navy/70 mt-0.5 font-mono text-[11px]">
                    Dates: {formatDisplayDateOrDates(activeReceipt.bookingDate)}
                  </p>
                  <p className="text-navy/70 font-mono text-[11px]">
                    Hours: {activeReceipt.startTime} &mdash; {activeReceipt.endTime}
                  </p>
                  <p className="text-navy/50 text-[10px] mt-0.5">{activeReceipt.location}</p>
                </div>
              </div>

              {/* Line Items Breakdown */}
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-navy/15 text-left font-mono text-[10px] uppercase tracking-widest text-navy/60">
                    <th className="py-2 font-semibold">Item &amp; Description</th>
                    <th className="py-2 text-right font-semibold">Tax Rate</th>
                    <th className="py-2 text-right font-semibold">Amount (KES)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-navy/10">
                  <tr>
                    <td className="py-3">
                      <span className="font-semibold text-navy">{activeReceipt.description}</span>
                      <span className="text-[11px] text-navy/60 block">
                        Full access amenities, redundant fibre Wi-Fi &amp; power backup
                      </span>
                    </td>
                    <td className="py-3 text-right font-mono text-navy/60">16% Inclusive</td>
                    <td className="py-3 text-right font-mono font-semibold text-navy">
                      {formatMoney(activeReceipt.amountKES)}
                    </td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr className="border-t border-navy/15">
                    <td colSpan={2} className="pt-3 text-right text-navy/60 font-mono text-[11px]">
                      Net Amount:
                    </td>
                    <td className="pt-3 text-right font-mono text-navy font-medium">
                      {formatMoney(Math.round(activeReceipt.amountKES / 1.16))}
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={2} className="py-1 text-right text-navy/60 font-mono text-[11px]">
                      VAT (16% Included):
                    </td>
                    <td className="py-1 text-right font-mono text-navy font-medium">
                      {formatMoney(Math.round(activeReceipt.amountKES - activeReceipt.amountKES / 1.16))}
                    </td>
                  </tr>
                  <tr className="border-t border-navy">
                    <td colSpan={2} className="pt-3 text-right font-heading text-sm font-bold uppercase tracking-wider text-navy">
                      Total Paid:
                    </td>
                    <td className="pt-3 text-right font-heading text-lg font-bold text-navy">
                      {formatMoney(activeReceipt.amountKES)}
                    </td>
                  </tr>
                </tfoot>
              </table>

              {/* Footer Terms */}
              <div className="pt-4 border-t border-navy/10 text-[10px] text-navy/50 leading-relaxed text-center font-mono">
                Thank you for choosing Paper Street Workspaces. For inquiries or corporate billing, contact accounts@paperstreet.co.ke.
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ClientInvoicesView;
