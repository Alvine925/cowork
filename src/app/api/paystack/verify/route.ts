import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { getSystemConfig } from '@/lib/config-service'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const reference = searchParams.get('reference') || searchParams.get('trxref')

  if (!reference) {
    return NextResponse.json({ error: 'Missing transaction reference' }, { status: 400 })
  }

  return verifyAndProcessBooking(reference)
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const reference = body.reference || body.trxref

    if (!reference) {
      return NextResponse.json({ error: 'Missing transaction reference' }, { status: 400 })
    }

    return verifyAndProcessBooking(reference, body.metadata)
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || 'Invalid request body' }, { status: 400 })
  }
}

async function verifyAndProcessBooking(reference: string, fallbackMetadata?: any) {
  try {
    const config = await getSystemConfig()

    // 1. Check if booking is already recorded in Supabase client_bookings
    const { data: existingBookings } = await supabase
      .from('client_bookings')
      .select('*, client_passes(*)')
      .eq('paystack_reference', reference)
      .limit(1)

    if (existingBookings && existingBookings.length > 0) {
      const existing = existingBookings[0]
      const existingPass = existing.client_passes?.[0] || {}

      if (existing.payment_status === 'paid') {
        return NextResponse.json({
          success: true,
          alreadyProcessed: true,
          booking: {
            id: existing.id,
            clientName: existing.client_name,
            clientEmail: existing.client_email,
            clientPhone: existing.client_phone,
            serviceTitle: existing.service_title,
            location: existing.location,
            bookingDate: existing.booking_date,
            startTime: existing.start_time,
            endTime: existing.end_time,
            totalAmountKES: existing.total_amount_kes,
            paystackReference: existing.paystack_reference,
            status: 'confirmed',
            passCode: existingPass.pass_code || existing.qr_code_token || `PS-${reference}`,
            wifiNetwork: existingPass.wifi_network || 'PaperStreet-CBD-5G',
            wifiPass: existingPass.wifi_pass || 'PaperStreet2026!',
          },
        })
      }
    }

    let bookingMeta: any = fallbackMetadata || {}
    let paidAmountKES = 0
    let customerEmail = ''
    let paymentChannel = 'Paystack'
    let paymentDate = new Date().toISOString()

    // 2. Verify with Paystack API if secret key is present
    if (config.paystackSecretKey && !config.paystackSecretKey.includes('placeholder')) {
      const verifyRes = await fetch(`https://api.paystack.co/transaction/verify/${encodeURIComponent(reference)}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${config.paystackSecretKey}`,
          'Content-Type': 'application/json',
        },
      })

      const verifyData = await verifyRes.json()

      if (!verifyRes.ok || !verifyData.status) {
        return NextResponse.json(
          { error: verifyData.message || 'Paystack verification failed' },
          { status: 400 }
        )
      }

      if (verifyData.data.status !== 'success') {
        return NextResponse.json(
          { error: `Transaction status is ${verifyData.data.status}` },
          { status: 400 }
        )
      }

      const tx = verifyData.data
      paidAmountKES = tx.amount ? tx.amount / 100 : 0
      customerEmail = tx.customer?.email || ''
      paymentChannel = tx.channel || 'Paystack'
      paymentDate = tx.paid_at || new Date().toISOString()
      bookingMeta = { ...bookingMeta, ...(tx.metadata || {}) }
    } else {
      // Test / Simulated mode fallback
      paidAmountKES = bookingMeta.totalAmountKES || 1500
      customerEmail = bookingMeta.clientEmail || 'client@paperstreet.africa'
      paymentChannel = 'Simulated Paystack'
    }

    // Extract custom_fields
    const customFields: Record<string, string> = {}
    if (Array.isArray(bookingMeta.custom_fields)) {
      bookingMeta.custom_fields.forEach((cf: any) => {
        if (cf.variable_name && cf.value) {
          customFields[cf.variable_name] = cf.value
        }
      })
    }

    // 3. Extract and normalize booking properties
    const clientName =
      bookingMeta.clientName ||
      bookingMeta.client_name ||
      customFields.client_name ||
      customerEmail.split('@')[0] ||
      'Client'

    const clientEmail = customerEmail || bookingMeta.clientEmail || bookingMeta.client_email || 'client@paperstreet.africa'
    const clientPhone = bookingMeta.clientPhone || bookingMeta.client_phone || customFields.phone || '—'
    const companyName = bookingMeta.companyName || bookingMeta.company_name || ''
    const serviceTitle = bookingMeta.serviceTitle || bookingMeta.service_title || customFields.service_title || 'Hot Desk & Day Passes'
    const tierName = bookingMeta.tierName || bookingMeta.tier_name || 'Full-Day Pass'
    const serviceSlug = bookingMeta.serviceSlug || bookingMeta.service_slug || 'hot-desk'
    const location = bookingMeta.location || 'Kisumu CBD (CBD Commercial Center)'

    let bookingDate = ''
    if (Array.isArray(bookingMeta.selectedDates) && bookingMeta.selectedDates.length > 0) {
      bookingDate = bookingMeta.selectedDates.join(', ')
    } else if (Array.isArray(bookingMeta.selected_dates) && bookingMeta.selected_dates.length > 0) {
      bookingDate = bookingMeta.selected_dates.join(', ')
    } else if (bookingMeta.bookingDate || bookingMeta.booking_date) {
      bookingDate = bookingMeta.bookingDate || bookingMeta.booking_date
    } else if (customFields.schedule) {
      bookingDate = customFields.schedule
    } else {
      bookingDate = new Date().toISOString().split('T')[0]
    }

    const startTime = bookingMeta.startTime || bookingMeta.start_time || '08:00 AM'
    const endTime = bookingMeta.endTime || bookingMeta.end_time || bookingMeta.calculatedEndTime || '06:00 PM'
    const durationHours = bookingMeta.durationHours || bookingMeta.duration_hours || 10
    const rentAmountKES = bookingMeta.rentAmountKES || bookingMeta.rent_amount_kes || paidAmountKES
    const depositAmountKES = bookingMeta.depositAmountKES || bookingMeta.deposit_amount_kes || 0
    const overtimeHours = bookingMeta.overtimeHours || bookingMeta.overtime_hours || 0
    const overtimeFeeKES = bookingMeta.overtimeFeeKES || bookingMeta.overtime_fee_kes || 0
    const totalAmountKES = paidAmountKES || bookingMeta.totalAmountKES || (rentAmountKES + depositAmountKES + overtimeFeeKES)
    const specialRequests = bookingMeta.specialRequests || bookingMeta.special_requests || ''
    const qrCodeToken = bookingMeta.qrToken || `QR-${reference}`

    const passSuffix = serviceSlug.substring(0, 3).toUpperCase()
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
    const rndCode = (len: number) => Array.from({ length: len }, () => chars[Math.floor(Math.random() * chars.length)]).join('')
    const passCode = bookingMeta.passCode || bookingMeta.pass_code || `PS-${rndCode(3)}${Math.floor(10 + Math.random() * 90)}-${passSuffix}${rndCode(2)}`
    const userId = `guest_${clientEmail.replace(/[^a-zA-Z0-9]/g, '_')}`

    // 4. Update or Insert Supabase `client_bookings` table
    let savedBookingId: number | string = `bk_${Date.now()}`
    try {
      if (existingBookings && existingBookings.length > 0) {
        savedBookingId = existingBookings[0].id
        await supabase
          .from('client_bookings')
          .update({
            payment_status: 'paid',
            status: 'confirmed',
            client_name: clientName,
            client_email: clientEmail,
            client_phone: clientPhone,
            company_name: companyName || null,
            service_title: `${serviceTitle} (${tierName})`,
            booking_date: bookingDate,
            start_time: startTime,
            end_time: endTime,
            calculated_end_time: endTime,
            duration_hours: durationHours,
            rent_amount_kes: rentAmountKES,
            deposit_amount_kes: depositAmountKES,
            overtime_hours: overtimeHours,
            overtime_fee_kes: overtimeFeeKES,
            total_amount_kes: totalAmountKES,
          })
          .eq('id', savedBookingId)

        await supabase
          .from('client_passes')
          .update({ status: 'active' })
          .eq('booking_id', savedBookingId)
      } else {
        const { data: bookingData, error: bookingErr } = await supabase
          .from('client_bookings')
          .insert([
            {
              user_id: userId,
              client_name: clientName,
              client_email: clientEmail,
              client_phone: clientPhone,
              company_name: companyName || null,
              service_title: `${serviceTitle} (${tierName})`,
              location: location,
              booking_date: bookingDate,
              start_time: startTime,
              end_time: endTime,
              calculated_end_time: endTime,
              duration_hours: durationHours,
              attendees: 1,
              rent_amount_kes: rentAmountKES,
              deposit_amount_kes: depositAmountKES,
              overtime_hours: overtimeHours,
              overtime_fee_kes: overtimeFeeKES,
              total_amount_kes: totalAmountKES,
              status: 'confirmed',
              payment_status: 'paid',
              payment_method: 'Paystack',
              paystack_reference: reference,
              check_in_status: 'pending',
              qr_code_token: passCode,
              utm_source: bookingMeta.utm_source || null,
              utm_medium: bookingMeta.utm_medium || null,
              utm_campaign: bookingMeta.utm_campaign || null,
              utm_referrer: bookingMeta.utm_referrer || null,
              special_requests: specialRequests || (companyName ? `Company: ${companyName}` : null),
            }
          ])
          .select()
          .single()

        if (!bookingErr && bookingData?.id) {
          savedBookingId = bookingData.id

          // 5. Insert into Supabase `client_passes` table
          const firstDate = bookingDate.split(',')[0].trim()
          await supabase.from('client_passes').insert([
            {
              user_id: userId,
              booking_id: bookingData.id,
              pass_code: passCode,
              service_title: `${serviceTitle} (${tierName})`,
              location: location,
              valid_date: firstDate,
              qr_data: JSON.stringify({ passCode, paystackReference: reference, email: clientEmail, date: bookingDate }),
              status: 'active',
              wifi_network: 'PaperStreet-CBD-5G',
              wifi_pass: 'PaperStreet2026!',
            }
          ])
        }
      }
    } catch (dbErr) {
      console.error('[Database Insertion Warning]', dbErr)
    }

    // 6. Return complete confirmed reservation details
    // NOTE: Email dispatch is handled exclusively by the Paystack webhook (api/webhooks/paystack)
    // to prevent duplicate sends. Do not dispatch emails here.
    return NextResponse.json({
      success: true,
      booking: {
        id: savedBookingId,
        clientName,
        clientEmail,
        clientPhone,
        companyName,
        serviceTitle,
        tierName,
        location,
        bookingDate,
        startTime,
        endTime,
        durationHours,
        rentAmountKES,
        depositAmountKES,
        totalAmountKES,
        paystackReference: reference,
        paymentChannel,
        paymentDate,
        passCode,
        wifiNetwork: 'PaperStreet-CBD-5G',
        wifiPass: 'PaperStreet2026!',
        status: 'confirmed',
      },
    })
  } catch (err: any) {
    console.error('[Paystack Verify Exception]', err)
    return NextResponse.json(
      { error: err?.message || 'Error processing payment verification' },
      { status: 500 }
    )
  }
}
