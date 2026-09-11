// Follow this setup guide to deploy: https://supabase.com/docs/guides/functions
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { createHmac } from 'https://deno.land/std@0.168.0/node/crypto.ts'

const SUPABASE_URL = Deno.env.get('SUPABASE_URL') || ''
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || Deno.env.get('SUPABASE_ANON_KEY') || ''
const PAYSTACK_SECRET_KEY = Deno.env.get('PAYSTACK_SECRET_KEY') || ''
const ADMIN_EMAIL = Deno.env.get('ADMIN_EMAIL') || 'otienoalvine925@gmail.com'

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)

serve(async (req) => {
  // Only accept POST requests
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405 })
  }

  try {
    const rawBody = await req.text()
    const paystackSignature = req.headers.get('x-paystack-signature') || ''

    // 1. Get Paystack Secret Key (from Env or Supabase system_settings)
    let secretKey = PAYSTACK_SECRET_KEY

    if (!secretKey) {
      try {
        const { data: settings } = await supabase.from('system_settings').select('key, value')
        if (settings) {
          for (const s of settings) {
            if (s.key === 'paystack_secret_key' && !secretKey) secretKey = s.value
          }
        }
      } catch (e) {
        console.warn('Could not read from system_settings:', e)
      }
    }

    // 2. Validate HMAC SHA512 Signature if secretKey is present
    if (secretKey && paystackSignature) {
      const hash = createHmac('sha512', secretKey).update(rawBody).digest('hex')
      if (hash !== paystackSignature) {
        console.error('Invalid Paystack webhook signature')
        return new Response(JSON.stringify({ error: 'Invalid signature' }), { status: 401 })
      }
    }

    const payload = JSON.parse(rawBody)
    const event = payload.event
    const data = payload.data

    console.log(`[Paystack Webhook] Event received: ${event}, Ref: ${data?.reference}`)

    if (event === 'charge.success') {
      const reference = data.reference
      const paidAmountKES = data.amount ? data.amount / 100 : 0
      const customerEmail = data.customer?.email || ''
      const paymentChannel = data.channel || 'Paystack'
      const paymentDate = data.paid_at || new Date().toISOString()
      const metadata = data.metadata || {}

      // Extract custom_fields from Paystack metadata
      const customFields: Record<string, string> = {}
      if (Array.isArray(metadata?.custom_fields)) {
        metadata.custom_fields.forEach((cf: any) => {
          if (cf.variable_name && cf.value) {
            customFields[cf.variable_name] = cf.value
          }
        })
      }

      // Robust extraction of Client Name (never generic 'Valued Client' if available)
      const clientName =
        metadata.clientName ||
        metadata.client_name ||
        customFields.client_name ||
        (data.customer?.first_name ? `${data.customer.first_name} ${data.customer.last_name || ''}`.trim() : '') ||
        customerEmail.split('@')[0] ||
        'Client'

      const clientEmail = customerEmail || metadata.clientEmail || metadata.client_email || 'client@paperstreet.co.ke'
      const clientPhone = metadata.clientPhone || metadata.client_phone || customFields.phone || data.customer?.phone || '—'
      const companyName = metadata.companyName || metadata.company_name || ''

      // Service and Tier details
      const serviceTitle = metadata.serviceTitle || metadata.service_title || customFields.service_title || 'Hot Desk & Day Passes'
      const tierName = metadata.tierName || metadata.tier_name || 'Full-Day Pass'
      const serviceSlug = metadata.serviceSlug || metadata.service_slug || 'hot-desk'
      const location = metadata.location || 'Kisumu CBD (CBD Commercial Center)'

      // Dates extraction: check array, custom_fields, and comma-separated strings
      let bookingDate = ''
      if (Array.isArray(metadata.selectedDates) && metadata.selectedDates.length > 0) {
        bookingDate = metadata.selectedDates.join(', ')
      } else if (Array.isArray(metadata.selected_dates) && metadata.selected_dates.length > 0) {
        bookingDate = metadata.selected_dates.join(', ')
      } else if (metadata.bookingDate || metadata.booking_date) {
        bookingDate = metadata.bookingDate || metadata.booking_date
      } else if (customFields.schedule) {
        bookingDate = customFields.schedule
      } else {
        bookingDate = new Date().toISOString().split('T')[0]
      }

      const startTime = metadata.startTime || metadata.start_time || '08:00 AM'
      const endTime = metadata.endTime || metadata.end_time || metadata.calculatedEndTime || '06:00 PM'
      const durationHours = metadata.durationHours || metadata.duration_hours || 10
      const rentAmountKES = metadata.rentAmountKES || metadata.rent_amount_kes || paidAmountKES
      const depositAmountKES = metadata.depositAmountKES || metadata.deposit_amount_kes || 0
      const overtimeHours = metadata.overtimeHours || metadata.overtime_hours || 0
      const overtimeFeeKES = metadata.overtimeFeeKES || metadata.overtime_fee_kes || 0
      const totalAmountKES = paidAmountKES || (rentAmountKES + depositAmountKES + overtimeFeeKES)
      const specialRequests = metadata.specialRequests || metadata.special_requests || ''

      // High entropy alphanumeric pass code
      const passSuffix = serviceSlug.substring(0, 3).toUpperCase()
      const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
      const rndCode = (len: number) => Array.from({ length: len }, () => chars[Math.floor(Math.random() * chars.length)]).join('')
      const passCode = `PS-${rndCode(3)}${Math.floor(10 + Math.random() * 90)}-${passSuffix}${rndCode(2)}`
      const userId = `guest_${clientEmail.replace(/[^a-zA-Z0-9]/g, '_')}`

      // Deduplication: Check if already processed
      const { data: existing } = await supabase
        .from('client_bookings')
        .select('id, email_sent')
        .eq('paystack_reference', reference)
        .limit(1)

      if (!existing || existing.length === 0) {
        // Insert into client_bookings
        const { data: newBooking } = await supabase
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
              special_requests: specialRequests || (companyName ? `Company: ${companyName}` : null),
              email_sent: false,
            }
          ])
          .select()
          .single()

        if (newBooking?.id) {
          // Insert client pass
          await supabase.from('client_passes').insert([
            {
              user_id: userId,
              booking_id: newBooking.id,
              pass_code: passCode,
              service_title: `${serviceTitle} (${tierName})`,
              location: location,
              valid_date: bookingDate,
              qr_data: JSON.stringify({ passCode, paystackReference: reference, email: clientEmail, date: bookingDate }),
              status: 'active',
              wifi_network: 'PaperStreet-CBD-5G',
              wifi_pass: 'PaperStreet2026!',
            }
          ])

          // Reward referral if this referee booked a service
          try {
            const { data: refPending } = await supabase
              .from('client_referrals')
              .select('*')
              .eq('referred_email', clientEmail.toLowerCase().trim())
              .eq('status', 'pending')
              .maybeSingle()

            if (refPending) {
              await supabase
                .from('client_referrals')
                .update({ status: 'rewarded', rewarded_at: new Date().toISOString() })
                .eq('id', refPending.id)

              const { data: refProfile } = await supabase
                .from('client_profiles')
                .select('discount_balance_kes')
                .eq('email', refPending.referrer_email)
                .maybeSingle()

              const newBalance = (Number(refProfile?.discount_balance_kes) || 0) + (Number(refPending.reward_kes) || 500)
              await supabase
                .from('client_profiles')
                .update({ discount_balance_kes: newBalance, updated_at: new Date().toISOString() })
                .eq('email', refPending.referrer_email)
            }
          } catch (refErr) {
            console.warn('[Webhook Referral Reward Notice]', refErr)
          }
        }

        // Invoke canonical send-booking-email edge function for client confirmation & PDF
        try {
          await supabase.functions.invoke('send-booking-email', {
            body: {
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
              rentAmountKES,
              depositAmountKES,
              overtimeHours,
              overtimeFeeKES,
              totalAmountKES,
              paystackReference: reference,
              passCode,
            }
          })
        } catch (emailErr) {
          console.error('[Paystack Webhook -> send-booking-email Error]', emailErr)
        }

        // Invoke send-admin-alert edge function
        try {
          await supabase.functions.invoke('send-admin-alert', {
            body: {
              clientName,
              clientEmail,
              clientPhone,
              companyName,
              serviceTitle: `${serviceTitle} (${tierName})`,
              bookingDate,
              totalAmountKES,
              paystackReference: reference,
            }
          })
        } catch (adminErr) {
          console.error('[Paystack Webhook -> send-admin-alert Error]', adminErr)
        }
      }
    }

    return new Response(JSON.stringify({ status: 'success' }), {
      headers: { 'Content-Type': 'application/json' },
      status: 200,
    })
  } catch (err: any) {
    console.error('[Webhook Error]', err)
    return new Response(JSON.stringify({ error: err.message }), {
      headers: { 'Content-Type': 'application/json' },
      status: 500,
    })
  }
})
