import { NextResponse } from 'next/server'
import crypto from 'crypto'
import { supabase } from '@/lib/supabase'
import { getSystemConfig } from '@/lib/config-service'
import { dispatchBookingEmails, BookingEmailData } from '@/lib/brevo-service'

export async function POST(req: Request) {
  try {
    const rawBody = await req.text()
    const paystackSignature = req.headers.get('x-paystack-signature') || ''
    const config = await getSystemConfig()

    // 1. Verify Paystack HMAC SHA512 Signature
    if (config.paystackSecretKey && !config.paystackSecretKey.includes('placeholder') && paystackSignature) {
      const hash = crypto.createHmac('sha512', config.paystackSecretKey).update(rawBody).digest('hex')
      if (hash !== paystackSignature) {
        console.error('[Paystack Webhook] Invalid HMAC signature')
        return NextResponse.json({ error: 'Invalid signature' }, { status: 401 })
      }
    }

    const payload = JSON.parse(rawBody)
    const { event, data } = payload

    console.log(`[Paystack Webhook API] Received event: ${event}, Ref: ${data?.reference}`)

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
      let selectedDatesList: string[] = []
      if (Array.isArray(metadata.selectedDates) && metadata.selectedDates.length > 0) {
        selectedDatesList = metadata.selectedDates
      } else if (Array.isArray(metadata.selected_dates) && metadata.selected_dates.length > 0) {
        selectedDatesList = metadata.selected_dates
      } else if (metadata.bookingDate || metadata.booking_date) {
        const rawDate = String(metadata.bookingDate || metadata.booking_date)
        selectedDatesList = rawDate.includes(',')
          ? rawDate.split(',').map((s) => s.trim()).filter(Boolean)
          : [rawDate.trim()]
      } else if (customFields.schedule) {
        selectedDatesList = customFields.schedule.includes(',')
          ? customFields.schedule.split(',').map((s) => s.trim()).filter(Boolean)
          : [customFields.schedule.trim()]
      } else {
        selectedDatesList = [new Date().toISOString().split('T')[0]]
      }

      const primaryDate = selectedDatesList[0] || new Date().toISOString().split('T')[0]
      const bookingDateDisplay = selectedDatesList.join(', ')

      const startTime = metadata.startTime || metadata.start_time || '08:00 AM'
      const endTime = metadata.endTime || metadata.end_time || metadata.calculatedEndTime || '06:00 PM'
      const durationHours = metadata.durationHours || metadata.duration_hours || 10
      const rentAmountKES = metadata.rentAmountKES || metadata.rent_amount_kes || paidAmountKES
      const depositAmountKES = metadata.depositAmountKES || metadata.deposit_amount_kes || 0
      const overtimeHours = metadata.overtimeHours || metadata.overtime_hours || 0
      const overtimeFeeKES = metadata.overtimeFeeKES || metadata.overtime_fee_kes || 0
      const calculatedEndTime = metadata.endTime || metadata.calculatedEndTime || endTime
      const totalAmountKES = paidAmountKES || (rentAmountKES + depositAmountKES + overtimeFeeKES)
      const qrCodeToken = metadata.qrCodeToken || `QR-${reference}`

      const scheduleMetadata = selectedDatesList.length > 1 ? {
        isMultiDay: true,
        totalDays: selectedDatesList.length,
        dates: selectedDatesList,
      } : null

      const specialRequests = [
        metadata.specialRequests || metadata.special_requests || '',
        companyName ? `Company: ${companyName}` : null,
        selectedDatesList.length > 1 ? `Schedule: ${bookingDateDisplay}` : null,
        scheduleMetadata ? `[SCHEDULE_DATA]:${JSON.stringify(scheduleMetadata)}` : null,
      ].filter(Boolean).join(' | ')

      const passSuffix = serviceSlug.substring(0, 3).toUpperCase()
      const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
      const rndCode = (len: number) => Array.from({ length: len }, () => chars[Math.floor(Math.random() * chars.length)]).join('')
      const passCode = `PS-${rndCode(3)}${Math.floor(10 + Math.random() * 90)}-${passSuffix}${rndCode(2)}`
      const userId = `guest_${clientEmail.replace(/[^a-zA-Z0-9]/g, '_')}`

      // Check if already processed
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
              booking_date: primaryDate,
              start_time: startTime,
              end_time: calculatedEndTime,
              calculated_end_time: calculatedEndTime,
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
              qr_code_token: qrCodeToken,
              utm_source: metadata.utm_source || null,
              utm_medium: metadata.utm_medium || null,
              utm_campaign: metadata.utm_campaign || null,
              utm_referrer: metadata.utm_referrer || null,
              special_requests: specialRequests || (companyName ? `Company: ${companyName}` : null),
            }
          ])
          .select()
          .single()

        if (newBooking?.id) {
          // Insert client passes for each scheduled day
          const passesToInsert = selectedDatesList.map((dStr, idx) => {
            const daySuffix = selectedDatesList.length > 1 ? `-D${idx + 1}` : ''
            const specificPassCode = `${passCode}${daySuffix}`
            return {
              user_id: userId,
              booking_id: newBooking.id,
              pass_code: specificPassCode,
              service_title: `${serviceTitle} (${tierName})`,
              location: location,
              valid_date: dStr,
              qr_data: JSON.stringify({
                passCode: specificPassCode,
                paystackReference: reference,
                email: clientEmail,
                date: dStr,
                dayNumber: idx + 1,
                totalDays: selectedDatesList.length,
              }),
              status: 'active',
              wifi_network: 'PaperStreet-CBD-5G',
              wifi_pass: 'PaperStreet2026!',
            }
          })
          await supabase.from('client_passes').insert(passesToInsert)
        }

        // Dispatch Brevo Emails (with single-send database deduplication lock)
        const emailData: BookingEmailData = {
          clientName,
          clientEmail,
          clientPhone,
          companyName,
          serviceTitle,
          tierName,
          location,
          bookingDate: bookingDateDisplay,
          startTime,
          endTime: calculatedEndTime,
          durationHours,
          rentAmountKES,
          depositAmountKES,
          overtimeHours,
          overtimeFeeKES,
          totalAmountKES,
          paystackReference: reference,
          passCode,
          specialRequests,
          wifiNetwork: 'PaperStreet-CBD-5G',
          wifiPass: 'PaperStreet2026!',
          paymentDate,
        }

        try {
          await dispatchBookingEmails(emailData)
        } catch (e) {
          console.warn('[Webhook Brevo Email Warning]', e)
        }
      }
    }

    return NextResponse.json({ status: 'success' }, { status: 200 })
  } catch (err: any) {
    console.error('[Paystack Webhook API Error]', err)
    return NextResponse.json({ error: err?.message || 'Internal Server Error' }, { status: 500 })
  }
}
