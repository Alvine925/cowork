import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const query = searchParams.get('q') || searchParams.get('reference') || searchParams.get('token')

    if (!query) {
      return NextResponse.json({ error: 'Missing search query (reference or QR token)' }, { status: 400 })
    }

    const cleanQuery = query.trim()

    // 1. Search in client_bookings
    const { data: bookings, error: bookingErr } = await supabase
      .from('client_bookings')
      .select('*, client_passes(*)')
      .or(`paystack_reference.eq.${cleanQuery},qr_code_token.eq.${cleanQuery},client_email.eq.${cleanQuery}`)
      .limit(1)

    if (bookingErr) {
      return NextResponse.json({ error: bookingErr.message }, { status: 500 })
    }

    if (!bookings || bookings.length === 0) {
      return NextResponse.json({ error: 'No reservation found for this reference or QR token.' }, { status: 404 })
    }

    const b = bookings[0]

    return NextResponse.json({
      success: true,
      booking: {
        id: b.id,
        reference: b.paystack_reference,
        clientName: b.client_name,
        clientEmail: b.client_email,
        clientPhone: b.client_phone,
        companyName: b.company_name,
        serviceTitle: b.service_title,
        location: b.location,
        bookingDate: b.booking_date,
        startTime: b.start_time,
        endTime: b.end_time || b.calculated_end_time,
        overtimeHours: b.overtime_hours || 0,
        overtimeFeeKES: b.overtime_fee_kes || 0,
        totalAmountKES: b.total_amount_kes,
        paymentStatus: b.payment_status,
        checkInStatus: b.check_in_status || 'pending',
        checkedInAt: b.checked_in_at,
        checkedInBy: b.checked_in_by,
        qrToken: b.qr_code_token,
      }
    })
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || 'Server error' }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { reference, staffName = 'Paper Street Front Desk' } = body

    if (!reference) {
      return NextResponse.json({ error: 'Missing booking reference' }, { status: 400 })
    }

    const checkInTime = new Date().toISOString()

    const { data: updated, error: updateErr } = await supabase
      .from('client_bookings')
      .update({
        check_in_status: 'checked_in',
        checked_in_at: checkInTime,
        checked_in_by: staffName,
      })
      .eq('paystack_reference', reference)
      .select()
      .single()

    if (updateErr) {
      return NextResponse.json({ error: updateErr.message }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      message: 'Client checked in successfully',
      checkedInAt: checkInTime,
      checkedInBy: staffName,
      booking: updated,
    })
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || 'Server error' }, { status: 500 })
  }
}
