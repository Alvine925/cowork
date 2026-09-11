'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Plus, Calendar, Ticket, LifeBuoy, Wifi } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { usePortalAuth } from './auth-context';
import {
  extractBookingDays,
  isBookingUpcomingOrActive,
  ActivePassSkeleton,
  BookingsListSkeleton,
  type ClientBooking,
  type ScheduledDayItem,
} from './index';

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

export function ClientDashboardView() {
  const { user } = usePortalAuth();
  const name = user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'Client';
  const email = user?.email;
  const [bookings, setBookings] = useState<ClientBooking[]>([]);
  const [feedbackCount, setFeedbackCount] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);

        // 1. Client bookings
        let bQuery = supabase
          .from('client_bookings')
          .select('*')
          .order('booking_date', { ascending: false });

        if (user?.id && email) {
          bQuery = bQuery.or(`user_id.eq.${user.id},client_email.eq.${email}`);
        } else if (user?.id) {
          bQuery = bQuery.eq('user_id', user.id);
        } else if (email) {
          bQuery = bQuery.eq('client_email', email);
        }

        const { data: bData } = await bQuery;

        // 2. Feedback count for this user
        let fQuery = supabase
          .from('client_feedback')
          .select('*', { count: 'exact', head: true });

        if (user?.id && email) {
          fQuery = fQuery.or(`user_id.eq.${user.id},client_email.eq.${email}`);
        } else if (user?.id) {
          fQuery = fQuery.eq('user_id', user.id);
        } else if (email) {
          fQuery = fQuery.eq('client_email', email);
        }

        const { count } = await fQuery;

        setBookings(bData || []);
        setFeedbackCount(count || 0);
      } catch (err) {
        console.warn('DB load err:', err);
      } finally {
        setLoading(false);
      }
    }
    void loadData();
  }, [user, name, email]);

  // Active / Upcoming bookings
  const upcomingBookings = bookings.filter((b) => isBookingUpcomingOrActive(b));
  const primaryBooking = upcomingBookings[0] || bookings[0];

  let primaryNextDay: ScheduledDayItem | null = null;
  let primaryDays: ScheduledDayItem[] = [];
  let isMultiDay = false;
  let remainingSessions = 0;

  if (primaryBooking) {
    primaryDays = extractBookingDays(primaryBooking);
    isMultiDay = primaryDays.length > 1;
    primaryNextDay = primaryDays.find((d) => !d.isPast) || primaryDays[0];
    remainingSessions = primaryDays.filter((d) => !d.isPast).length;
  }

  const isTodaySession = primaryNextDay?.isToday;

  return (
    <div className="space-y-8 animate-paper-rise max-w-5xl">
      {/* Calm, Refined Header */}
      <div className="flex flex-wrap items-end justify-between gap-4 pb-6 border-b border-navy/10">
        <div className="space-y-1">
          <p className="text-[11px] font-mono uppercase tracking-widest text-navy/50 font-semibold">Client Desk</p>
          <h1 className="font-heading text-3xl md:text-4xl text-navy font-light tracking-tight">
            Welcome, {name.split(' ')[0]}.
          </h1>
          <p className="text-xs text-navy/60">
            Kisumu CBD Commercial Center &middot; Open Mon&ndash;Fri 8:00 AM &ndash; 8:00 PM
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href="/portal/client/bookings?tab=reserve"
            className="bg-navy text-white px-4 py-2.5 text-xs uppercase tracking-wider font-semibold hover:bg-navy-700 transition-colors inline-flex items-center gap-1.5"
          >
            <Plus size={14} /> New Booking
          </Link>
        </div>
      </div>

      {/* Quiet Status & Facility Info Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-white border border-navy/10 text-xs">
        <div>
          <span className="text-navy/50 block font-mono text-[10px] uppercase">Active Schedule</span>
          <span className="text-navy font-semibold font-mono text-sm mt-0.5 block">
            {upcomingBookings.length} {upcomingBookings.length === 1 ? 'Reservation' : 'Reservations'}
          </span>
        </div>
        <div>
          <span className="text-navy/50 block font-mono text-[10px] uppercase">Total Bookings</span>
          <span className="text-navy font-semibold font-mono text-sm mt-0.5 block">{bookings.length} All Time</span>
        </div>
        <div>
          <span className="text-navy/50 block font-mono text-[10px] uppercase">Desk Wi-Fi</span>
          <span className="text-navy font-semibold font-mono text-xs mt-0.5 block">PaperStreet-CBD-5G</span>
        </div>
        <div>
          <span className="text-navy/50 block font-mono text-[10px] uppercase">Reception Concierge</span>
          <span className="text-navy font-semibold text-xs mt-0.5 block">Floor 2 Desk</span>
        </div>
      </div>

      {/* Current Workspace Reservation (Clean & Serene) */}
      {loading ? (
        <ActivePassSkeleton />
      ) : primaryBooking ? (
        <div className="bg-white border border-navy/15 p-6 md:p-8 space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono uppercase tracking-wider font-bold text-navy/50">
                Current Reservation
              </span>
              {isTodaySession ? (
                <span className="px-2 py-0.5 bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-mono font-semibold">
                  ● Scheduled Today
                </span>
              ) : primaryNextDay && !primaryNextDay.isPast ? (
                <span className="px-2 py-0.5 bg-navy/5 text-navy border border-navy/15 text-[10px] font-mono">
                  Next: {formatDate(primaryNextDay.dateStr)}
                </span>
              ) : null}
              {isMultiDay && (
                <span className="px-2 py-0.5 bg-navy/5 text-navy font-mono text-[10px]">
                  {remainingSessions} of {primaryDays.length} sessions left
                </span>
              )}
            </div>

            <span className="font-mono text-xs text-navy/60">
              Ref: <strong className="text-navy">{primaryBooking.paystack_reference || primaryBooking.id}</strong>
            </span>
          </div>

          <div className="flex flex-wrap items-baseline justify-between gap-4">
            <div className="space-y-1">
              <h2 className="font-heading text-2xl md:text-3xl text-navy font-normal">
                {primaryBooking.service_title}
              </h2>
              <p className="text-xs text-navy/70">
                {primaryNextDay ? (
                  <>
                    <strong>{formatDate(primaryNextDay.dateStr)}</strong> &middot; {primaryNextDay.startTime} &ndash; {primaryNextDay.endTime}
                  </>
                ) : (
                  <>
                    <strong>{formatDate(primaryBooking.booking_date)}</strong> &middot; {primaryBooking.start_time} &ndash; {primaryBooking.end_time}
                  </>
                )}
                <span className="text-navy/40"> &middot; {primaryBooking.location}</span>
              </p>
            </div>

            <Link
              href="/portal/client/bookings?tab=schedule"
              className="border border-navy/20 hover:border-navy text-navy px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-colors inline-flex items-center gap-1.5"
            >
              <Calendar size={13} /> View Schedule &rarr;
            </Link>
          </div>

          <div className="pt-4 border-t border-navy/10 flex flex-wrap items-center justify-between gap-3 text-xs text-navy/60">
            <span className="flex items-center gap-2">
              <Wifi size={13} className="text-navy/50" />
              Wi-Fi Password: <strong className="font-mono text-navy">PaperStreet2026!</strong>
            </span>
            <span>
              Check-in: Give your name or reference <strong className="font-mono text-navy">{primaryBooking.paystack_reference || primaryBooking.id}</strong> at reception.
            </span>
          </div>
        </div>
      ) : (
        <div className="bg-white border border-navy/15 p-8 text-center space-y-3">
          <Calendar className="w-6 h-6 text-navy/30 mx-auto" />
          <h2 className="font-heading text-xl text-navy font-normal">No Active Bookings</h2>
          <p className="text-xs text-navy/60 max-w-md mx-auto leading-relaxed">
            You don&apos;t have any workspace passes scheduled. Reserve a quiet day pass, multi-day flexi bundle, or executive meeting room in seconds.
          </p>
          <div className="pt-2">
            <Link
              href="/portal/client/bookings?tab=reserve"
              className="inline-block bg-navy text-white px-5 py-2.5 text-xs font-semibold uppercase tracking-wider hover:bg-navy-700 transition-colors"
            >
              Reserve Workspace &rarr;
            </Link>
          </div>
        </div>
      )}

      {/* 3 Simple, Functional Navigation Tiles */}
      <div className="grid sm:grid-cols-3 gap-4">
        <Link
          href="/portal/client/bookings?tab=reserve"
          className="p-5 border border-navy/15 bg-white hover:border-navy transition-all group block"
        >
          <div className="flex items-center justify-between text-navy mb-2">
            <Ticket size={16} className="text-navy/60 group-hover:text-navy" />
            <span className="text-xs text-navy/40 group-hover:text-navy">&rarr;</span>
          </div>
          <h3 className="text-sm font-semibold text-navy">Reserve Space</h3>
          <p className="text-xs text-navy/60 mt-1">Book day passes, private booths &amp; boardrooms.</p>
        </Link>

        <Link
          href="/portal/client/bookings?tab=schedule"
          className="p-5 border border-navy/15 bg-white hover:border-navy transition-all group block"
        >
          <div className="flex items-center justify-between text-navy mb-2">
            <Calendar size={16} className="text-navy/60 group-hover:text-navy" />
            <span className="text-xs text-navy/40 group-hover:text-navy">&rarr;</span>
          </div>
          <h3 className="text-sm font-semibold text-navy">My Schedule</h3>
          <p className="text-xs text-navy/60 mt-1">Check scheduled days, hours and itinerary.</p>
        </Link>

        <Link
          href="/portal/client/feedback"
          className="p-5 border border-navy/15 bg-white hover:border-navy transition-all group block"
        >
          <div className="flex items-center justify-between text-navy mb-2">
            <LifeBuoy size={16} className="text-navy/60 group-hover:text-navy" />
            <span className="text-xs text-navy/40 group-hover:text-navy">&rarr;</span>
          </div>
          <h3 className="text-sm font-semibold text-navy">Concierge Desk</h3>
          <p className="text-xs text-navy/60 mt-1">Wi-Fi help, requests, or questions.</p>
        </Link>
      </div>

      {/* Recent & Upcoming Reservations */}
      <div className="bg-white border border-navy/15 p-6 md:p-8 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-navy/10">
          <div>
            <h2 className="font-heading text-xl text-navy font-normal">Recent &amp; Upcoming Bookings</h2>
            <p className="text-xs text-navy/50 mt-0.5">Your latest reservations and scheduled access dates</p>
          </div>
          <Link
            href="/portal/client/bookings?tab=schedule"
            className="text-xs font-semibold text-navy hover:underline"
          >
            All Bookings ({bookings.length}) &rarr;
          </Link>
        </div>

        {loading ? (
          <BookingsListSkeleton />
        ) : bookings.length === 0 ? (
          <p className="text-xs text-navy/50 py-4 italic">No reservations on file yet.</p>
        ) : (
          <div className="divide-y divide-navy/10">
            {bookings.slice(0, 4).map((b) => {
              const days = extractBookingDays(b);
              const isMulti = days.length > 1;
              const nextDay = days.find((d) => !d.isPast) || days[0];
              const remainingCount = days.filter((d) => !d.isPast).length;

              return (
                <div key={b.id} className="py-3.5 flex flex-wrap items-center justify-between gap-4">
                  <div className="space-y-0.5">
                    <div className="flex flex-wrap items-center gap-2">
                      <h4 className="text-sm font-semibold text-navy">{b.service_title}</h4>
                      {isMulti && (
                        <span className="font-mono text-[9px] uppercase px-1.5 py-0.5 bg-navy/5 text-navy font-medium">
                          {days.length} Days ({remainingCount} left)
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-navy/60">
                      {isMulti ? (
                        <>Next: {formatDate(nextDay?.dateStr)} &middot; {nextDay?.startTime} – {nextDay?.endTime}</>
                      ) : (
                        <>{formatDate(b.booking_date)} &middot; {b.start_time} – {b.end_time}</>
                      )}
                      <span className="text-navy/40"> &middot; Ref: {b.paystack_reference || b.id}</span>
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-xs font-mono font-semibold text-navy">{formatMoney(b.total_amount_kes)}</span>
                    <Link
                      href="/portal/client/bookings?tab=schedule"
                      className="text-xs text-navy/70 hover:text-navy hover:underline"
                    >
                      Itinerary &rarr;
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default ClientDashboardView;
