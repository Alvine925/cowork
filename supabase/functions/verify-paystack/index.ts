import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const SUPABASE_URL = Deno.env.get('SUPABASE_URL') || ''
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || Deno.env.get('SUPABASE_ANON_KEY') || ''
const PAYSTACK_SECRET_KEY = Deno.env.get('PAYSTACK_SECRET_KEY') || ''

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const url = new URL(req.url)
    let reference = url.searchParams.get('reference') || url.searchParams.get('trxref')
    let fallbackMetadata: any = {}

    if (req.method === 'POST') {
      const body = await req.json().catch(() => ({}))
      if (body.reference) reference = body.reference
      if (body.trxref) reference = body.trxref
      if (body.metadata) fallbackMetadata = body.metadata
    }

    if (!reference) {
      return new Response(JSON.stringify({ error: 'Missing transaction reference' }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      })
    }

    // Fetch credentials
    let secretKey = PAYSTACK_SECRET_KEY || Deno.env.get('PAYSTACK_SECRET_KEY') || ''

    if (!secretKey) {
      const { data: settings } = await supabase.from('system_settings').select('key, value')
      if (settings) {
        for (const s of settings) {
          if (!secretKey && s.key === 'paystack_secret_key') secretKey = s.value
        }
      }
    }

    console.log(`[Verify Paystack Edge Function] Verifying reference: ${reference}`)

    if (!secretKey) {
      return new Response(
        JSON.stringify({ error: 'PAYSTACK_SECRET_KEY is not configured in Supabase' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
      )
    }

    // 1. Verify with Paystack API
    const verifyRes = await fetch(`https://api.paystack.co/transaction/verify/${encodeURIComponent(reference)}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${secretKey}`,
        'Content-Type': 'application/json',
      },
    })

    const verifyData = await verifyRes.json()

    if (!verifyRes.ok || !verifyData.status) {
      return new Response(JSON.stringify({ error: verifyData.message || 'Paystack verification failed' }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      })
    }

    if (verifyData.data.status !== 'success') {
      return new Response(JSON.stringify({ error: `Payment status is ${verifyData.data.status}` }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      })
    }

    const tx = verifyData.data
    const paidAmountKES = tx.amount ? tx.amount / 100 : 0
    const customerEmail = tx.customer?.email || ''
    const paymentChannel = tx.channel || 'Paystack'
    const paymentDate = tx.paid_at || new Date().toISOString()
    const txMeta = tx.metadata || {}
    const bookingMeta = { ...fallbackMetadata, ...txMeta }

    // Parse custom_fields
    const customFields: Record<string, string> = {}
    if (Array.isArray(bookingMeta.custom_fields)) {
      bookingMeta.custom_fields.forEach((cf: any) => {
        if (cf.variable_name && cf.value) {
          customFields[cf.variable_name] = cf.value
        }
      })
    }
    if (Array.isArray(txMeta.custom_fields)) {
      txMeta.custom_fields.forEach((cf: any) => {
        if (cf.variable_name && cf.value) {
          customFields[cf.variable_name] = cf.value
        }
      })
    }

    // Comprehensive client info extraction
    const clientName =
      bookingMeta.clientName ||
      bookingMeta.client_name ||
      customFields.client_name ||
      (tx.customer?.first_name ? `${tx.customer.first_name} ${tx.customer.last_name || ''}`.trim() : '') ||
      customerEmail.split('@')[0] ||
      'Client'

    const clientEmail = customerEmail || bookingMeta.clientEmail || bookingMeta.client_email || 'client@paperstreet.co.ke'
    const clientPhone = bookingMeta.clientPhone || bookingMeta.client_phone || customFields.phone || tx.customer?.phone || '—'
    const companyName = bookingMeta.companyName || bookingMeta.company_name || ''

    const serviceTitle = bookingMeta.serviceTitle || bookingMeta.service_title || customFields.service_title || 'Hot Desk & Day Passes'
    const tierName = bookingMeta.tierName || bookingMeta.tier_name || 'Full-Day Pass'
    const serviceSlug = bookingMeta.serviceSlug || bookingMeta.service_slug || 'hot-desk'
    const location = bookingMeta.location || 'Kisumu CBD (CBD Commercial Center)'

    // Extract all dates
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
    const totalAmountKES = paidAmountKES || (rentAmountKES + depositAmountKES + overtimeFeeKES)
    const specialRequests = bookingMeta.specialRequests || bookingMeta.special_requests || ''
    const qrCodeToken = bookingMeta.qrToken || `QR-${reference}`

    const passSuffix = serviceSlug.substring(0, 3).toUpperCase()
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
    const rndCode = (len: number) => Array.from({ length: len }, () => chars[Math.floor(Math.random() * chars.length)]).join('')
    const passCode = bookingMeta.passCode || bookingMeta.pass_code || `PS-${rndCode(3)}${Math.floor(10 + Math.random() * 90)}-${passSuffix}${rndCode(2)}`
    const userId = `guest_${clientEmail.replace(/[^a-zA-Z0-9]/g, '_')}`

    // 2. Insert or update booking in Supabase client_bookings
    let savedId: any = `bk_${Date.now()}`

    const { data: existingBookings } = await supabase
      .from('client_bookings')
      .select('id, client_name')
      .eq('paystack_reference', reference)
      .limit(1)

    if (existingBookings && existingBookings.length > 0) {
      savedId = existingBookings[0].id
      // Update with paid status and non-generic client details
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
        .eq('id', savedId)

      // Activate pre-created pass
      await supabase
        .from('client_passes')
        .update({ status: 'active' })
        .eq('booking_id', savedId)
    } else {
      const { data: newBooking, error: dbErr } = await supabase
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
            qr_code_token: qrCodeToken,
            special_requests: specialRequests || (companyName ? `Company: ${companyName}` : null),
          }
        ])
        .select()
        .single()

      if (newBooking?.id) {
        savedId = newBooking.id
      }
    }

    // Ensure email is sent if not yet dispatched
    const emailPayload = {
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
      overtimeHours,
      overtimeFeeKES,
      totalAmountKES,
      paystackReference: reference,
      passCode,
      specialRequests,
    }

    supabase.functions.invoke('send-booking-email', { body: emailPayload })
      .then(({ data, error }) => console.log('[Verify -> send-booking-email]', data, error))
      .catch((e) => console.error('[Verify -> send-booking-email error]', e))

    supabase.functions.invoke('send-admin-alert', { body: emailPayload })
      .then(({ data, error }) => console.log('[Verify -> send-admin-alert]', data, error))
      .catch((e) => console.error('[Verify -> send-admin-alert error]', e))

    return new Response(
      JSON.stringify({
        success: true,
        booking: {
          id: savedId,
          clientName,
          clientEmail,
          clientPhone,
          companyName,
          serviceTitle: `${serviceTitle} (${tierName})`,
          location,
          bookingDate,
          startTime,
          endTime,
          durationHours,
          rentAmountKES,
          depositAmountKES,
          overtimeHours,
          overtimeFeeKES,
          totalAmountKES,
          paystackReference: reference,
          passCode,
          paymentChannel,
          paymentDate,
          status: 'confirmed',
        },
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
    )
  } catch (err: any) {
    console.error('[Verify Paystack Exception]', err)
    return new Response(JSON.stringify({ error: err.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    })
  }
})
paystackReference: reference,
  passCode,
  paymentChannel,
  paymentDate,
  status: 'confirmed',
        },
      }),
{ headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
    )
  } catch (err: any) {
  console.error('[Verify Paystack Exception]', err)
  return new Response(JSON.stringify({ error: err.message }), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    status: 500,
  })
}
})
