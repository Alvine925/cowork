import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { sendBookingReminderEmail } from '@/lib/brevo-service';

export const dynamic = 'force-dynamic';

/**
 * Helper to get tomorrow's date string in YYYY-MM-DD format (EAT / UTC+3)
 */
function getTomorrowDateStr(): string {
  const now = new Date();
  // Add 24 hours
  const tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000);
  return tomorrow.toISOString().split('T')[0];
}

export async function GET(req: NextRequest) {
  return handleReminders(req);
}

export async function POST(req: NextRequest) {
  return handleReminders(req);
}

async function handleReminders(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const forceId = searchParams.get('force_id');
    const testEmail = searchParams.get('test_email');
    const targetDate = searchParams.get('target_date') || getTomorrowDateStr();

    // 1. Manual / Test Mode: Send immediate test reminder email
    if (testEmail) {
      const testBooking = {
        id: 99999,
        client_name: 'Test Client',
        client_email: testEmail,
        client_phone: '+254 700 000 000',
        company_name: 'Paper Street Test Lab',
        service_title: 'Hot Desk & Day Passes (Full-Day Pass)',
        location: 'CBD Commercial Center, Oginga Odinga St, Kisumu CBD',
        booking_date: targetDate,
        start_time: '08:00 AM',
        end_time: '06:00 PM',
        total_amount_kes: 1500,
        paystack_reference: 'PS-TEST-REMINDER-01',
        pass_code: 'PS-TST99-HOT01',
      };

      const res = await sendBookingReminderEmail(testBooking);
      return NextResponse.json({
        success: res.success,
        mode: 'test_dispatch',
        recipient: testEmail,
        result: res,
      });
    }

    // 2. Force a specific booking ID
    if (forceId) {
      const { data: b, error } = await supabase
        .from('client_bookings')
        .select('*')
        .eq('id', forceId)
        .single();

      if (error || !b) {
        return NextResponse.json({ error: 'Booking not found', forceId }, { status: 404 });
      }

      const res = await sendBookingReminderEmail(b);
      return NextResponse.json({
        success: res.success,
        mode: 'force_single',
        bookingId: forceId,
        recipient: b.client_email,
        result: res,
      });
    }

    // 3. Automated Cron Scan for bookings occurring tomorrow
    // Match single date or comma-separated dates containing targetDate
    const { data: bookings, error } = await supabase
      .from('client_bookings')
      .select('*')
      .or('payment_status.eq.paid,status.eq.confirmed')
      .neq('reminder_sent', true);

    if (error) {
      console.error('[Booking Reminders Scan Error]', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const eligibleBookings = (bookings || []).filter((b) => {
      if (!b.booking_date) return false;
      // Exact match for single date
      if (b.booking_date === targetDate) return true;
      // Match within comma or semicolon separated multi-day dates
      const dates = b.booking_date.split(/[,;]/).map((s: string) => s.trim());
      return dates.includes(targetDate);
    });

    const results = [];
    for (const booking of eligibleBookings) {
      try {
        const sendRes = await sendBookingReminderEmail(booking);
        results.push({
          bookingId: booking.id,
          email: booking.client_email,
          service: booking.service_title,
          success: sendRes.success,
          error: sendRes.error,
        });
      } catch (err: any) {
        results.push({
          bookingId: booking.id,
          email: booking.client_email,
          success: false,
          error: err?.message,
        });
      }
    }

    return NextResponse.json({
      success: true,
      targetDate,
      scanned: bookings?.length || 0,
      eligibleCount: eligibleBookings.length,
      dispatchedCount: results.filter((r) => r.success).length,
      details: results,
    });
  } catch (err: any) {
    console.error('[Booking Reminders Route Exception]', err);
    return NextResponse.json({ error: err?.message || 'Internal error' }, { status: 500 });
  }
}
