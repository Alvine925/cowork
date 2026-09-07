import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const SUPABASE_URL = Deno.env.get('SUPABASE_URL') || ''
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || Deno.env.get('SUPABASE_ANON_KEY') || ''
const PAYSTACK_SECRET_KEY = Deno.env.get('PAYSTACK_SECRET_KEY') || ''
const PAYSTACK_PUBLIC_KEY = Deno.env.get('PAYSTACK_PUBLIC_KEY') || ''

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// Operating schedule definition
const OPERATING_HOURS: Record<number, { isOpen: boolean; openMin: number; closeMin: number; openStr: string; closeStr: string }> = {
  0: { isOpen: false, openMin: 0, closeMin: 0, openStr: 'Closed', closeStr: 'Closed' }, // Sunday
  1: { isOpen: true, openMin: 480, closeMin: 1080, openStr: '08:00 AM', closeStr: '06:00 PM' }, // Mon
  2: { isOpen: true, openMin: 480, closeMin: 1080, openStr: '08:00 AM', closeStr: '06:00 PM' }, // Tue
  3: { isOpen: true, openMin: 480, closeMin: 1080, openStr: '08:00 AM', closeStr: '06:00 PM' }, // Wed
  4: { isOpen: true, openMin: 480, closeMin: 1080, openStr: '08:00 AM', closeStr: '06:00 PM' }, // Thu
  5: { isOpen: true, openMin: 480, closeMin: 1080, openStr: '08:00 AM', closeStr: '06:00 PM' }, // Fri
  6: { isOpen: true, openMin: 510, closeMin: 1080, openStr: '08:30 AM', closeStr: '06:00 PM' }, // Sat
}

function parseTimeToMinutes(timeStr: string): number {
  if (!timeStr) return 480
  const clean = timeStr.trim().toUpperCase()
  const isPM = clean.includes('PM')
  const isAM = clean.includes('AM')
  const timePart = clean.replace(/[APM\s]/g, '')
  const [hStr, mStr] = timePart.split(':')
  let hours = parseInt(hStr || '0', 10)
  const minutes = parseInt(mStr || '0', 10)
  if (isPM && hours < 12) hours += 12
  if (isAM && hours === 12) hours = 0
  return hours * 60 + minutes
}

function formatMinutesToTime(totalMinutes: number): string {
  let hours = Math.floor(totalMinutes / 60)
  const mins = totalMinutes % 60
  const isPM = hours >= 12 && hours < 24
  const period = isPM ? 'PM' : 'AM'
  if (hours > 12) hours -= 12
  if (hours === 0) hours = 12
  const padH = hours < 10 ? `0${hours}` : `${hours}`
  const padM = mins < 10 ? `0${mins}` : `${mins}`
  return `${padH}:${padM} ${period}`
}

function isPhysicalPackage(slug: string): boolean {
  return ['hot-desk', 'day-pass', 'meeting-rooms', 'meeting-room', 'dedicated-desk'].includes(slug.toLowerCase())
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 405,
    })
  }

  try {
    const body = await req.json()
    const {
      clientName,
      clientEmail,
      clientPhone,
      companyName = '',
      serviceSlug = 'hot-desk',
      serviceTitle = 'Hot Desk & Day Passes',
      tierName = 'Full-Day Pass',
      tierId = 'full-day',
      location = 'Kisumu CBD (CBD Commercial Center)',
      bookingDate = new Date().toISOString().split('T')[0],
      startTime = '08:00 AM',
      endTime,
      rentAmountKES = 1500,
      depositAmountKES = 0,
      overtimeHours = 0,
      overtimeFeeKES = 0,
      totalAmountKES,
      specialRequests = '',
      utm_source = '',
      utm_medium = '',
      utm_campaign = '',
      utm_referrer = '',
      callbackUrl = 'https://paperstreet.africa/book/confirmation',
    } = body

    if (!clientEmail || !clientName) {
      return new Response(
        JSON.stringify({ error: 'Missing required parameters: clientEmail or clientName' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      )
    }

    // Fetch secret key from settings if not in env
    let secretKey = PAYSTACK_SECRET_KEY
    let publicKey = PAYSTACK_PUBLIC_KEY
    if (!secretKey) {
      const { data: settings } = await supabase.from('system_settings').select('key, value')
      if (settings) {
        for (const s of settings) {
          if (s.key === 'paystack_secret_key') secretKey = s.value
          if (s.key === 'paystack_public_key') publicKey = s.value
        }
      }
    }

    if (!secretKey) {
      return new Response(
        JSON.stringify({ error: 'PAYSTACK_SECRET_KEY environment variable is not configured' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
      )
    }

    // Calculate duration & end time
    const isPhysical = isPhysicalPackage(serviceSlug)
    let durationHours = 10
    if (serviceSlug.includes('meeting')) {
      durationHours = tierId === 'hourly' ? 1 : tierId === 'half-day' ? 4 : 2
    } else if (tierId === 'half-day') {
      durationHours = 4
    }

    let calculatedEndTime = endTime || '06:00 PM'
    let calculatedOvertimeHours = overtimeHours || 0
    let calculatedOvertimeFee = overtimeFeeKES || 0

    if (isPhysical && !endTime) {
      const firstDate = bookingDate.split(',')[0].trim()
      const dateObj = new Date(`${firstDate}T00:00:00Z`)
      const dayOfWeek = isNaN(dateObj.getTime()) ? 1 : dateObj.getUTCDay()
      const schedule = OPERATING_HOURS[dayOfWeek] || OPERATING_HOURS[1]

      const startMin = parseTimeToMinutes(startTime)
      const durationMin = durationHours * 60
      const endMin = startMin + durationMin
      calculatedEndTime = formatMinutesToTime(endMin)

      const overtimeMin = Math.max(0, endMin - schedule.closeMin)
      if (overtimeMin > 0) {
        calculatedOvertimeHours = Math.ceil(overtimeMin / 60)
        calculatedOvertimeFee = calculatedOvertimeHours * 200
      }
    }

    const finalTotalKES = totalAmountKES || ((rentAmountKES || 0) + calculatedOvertimeFee + (depositAmountKES || 0))
    const amountInSubunits = Math.round(finalTotalKES * 100)

    // Generate high-entropy reference & QR token
    const todayFormatted = new Date().toISOString().slice(2, 10).replace(/-/g, '')
    const alphaCode = Math.random().toString(36).substring(2, 6).toUpperCase()
    const randomSuffix = Math.floor(1000 + Math.random() * 9000)
    const reference = `PS-${todayFormatted}-${alphaCode}-${randomSuffix}`
    const qrToken = `QR-${reference}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`

    const userId = `guest_${clientEmail.replace(/[^a-zA-Z0-9]/g, '_')}`

    // 1. STORE IN DATABASE IMMEDIATELY BEFORE INITIALIZING PAYMENT
    const { error: dbErr } = await supabase.from('client_bookings').insert([
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
        end_time: calculatedEndTime,
        calculated_end_time: calculatedEndTime,
        duration_hours: durationHours,
        attendees: 1,
        rent_amount_kes: rentAmountKES,
        deposit_amount_kes: depositAmountKES,
        overtime_hours: calculatedOvertimeHours,
        overtime_fee_kes: calculatedOvertimeFee,
        total_amount_kes: finalTotalKES,
        status: 'pending',
        payment_status: 'unpaid',
        payment_method: 'Paystack',
        paystack_reference: reference,
        check_in_status: 'pending',
        qr_code_token: qrToken,
        special_requests: specialRequests || (companyName ? `Company: ${companyName}` : null),
        utm_source: utm_source || null,
        utm_medium: utm_medium || null,
        utm_campaign: utm_campaign || null,
        utm_referrer: utm_referrer || null,
        email_sent: false,
      }
    ])

    if (dbErr) {
      console.error('[Initialize Paystack Pre-DB Insert Error]', dbErr)
    }

    const metadata = {
      clientName,
      clientEmail,
      clientPhone,
      companyName,
      serviceSlug,
      serviceTitle,
      tierName,
      tierId,
      location,
      bookingDate,
      startTime,
      endTime: calculatedEndTime,
      durationHours,
      rentAmountKES,
      depositAmountKES,
      overtimeHours: calculatedOvertimeHours,
      overtimeFeeKES: calculatedOvertimeFee,
      totalAmountKES: finalTotalKES,
      specialRequests,
      qrToken,
      custom_fields: [
        { display_name: 'Client Name', variable_name: 'client_name', value: clientName },
        { display_name: 'Service', variable_name: 'service_title', value: `${serviceTitle} (${tierName})` },
        { display_name: 'Schedule', variable_name: 'schedule', value: `${bookingDate} (${startTime} - ${calculatedEndTime})` },
        { display_name: 'Phone', variable_name: 'phone', value: clientPhone },
      ],
    }

    // 2. Call Paystack API to initialize transaction
    const paystackRes = await fetch('https://api.paystack.co/transaction/initialize', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${secretKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: clientEmail,
        amount: amountInSubunits,
        currency: 'KES',
        reference: reference,
        callback_url: callbackUrl,
        metadata: metadata,
      }),
    })

    const paystackData = await paystackRes.json()

    if (!paystackRes.ok || !paystackData.status) {
      console.error('[Paystack Edge Init Error]', paystackData)
      return new Response(
        JSON.stringify({ error: paystackData.message || 'Failed to initialize Paystack payment session' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      )
    }

    return new Response(
      JSON.stringify({
        success: true,
        publicKey: publicKey || PAYSTACK_PUBLIC_KEY,
        authorization_url: paystackData.data.authorization_url,
        access_code: paystackData.data.access_code,
        reference: paystackData.data.reference,
        amountKES: finalTotalKES,
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
    )
  } catch (err: any) {
    console.error('[Paystack Init Exception]', err)
    return new Response(JSON.stringify({ error: err.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    })
  }
})
