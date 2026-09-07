import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const SUPABASE_URL = Deno.env.get('SUPABASE_URL') || ''
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || Deno.env.get('SUPABASE_ANON_KEY') || ''

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
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
      clientName = 'Client',
      clientEmail = '—',
      clientPhone = '—',
      companyName = '',
      serviceTitle = 'Workspace Reservation',
      tierName = 'Standard Access',
      location = 'Kisumu CBD (CBD Commercial Center)',
      bookingDate = new Date().toISOString().split('T')[0],
      startTime = '08:00 AM',
      endTime = '06:00 PM',
      totalAmountKES = 0,
      rentAmountKES = 0,
      depositAmountKES = 0,
      overtimeHours = 0,
      overtimeFeeKES = 0,
      paystackReference = '—',
      specialRequests = '',
    } = body

    // 1. Check if admin alert was already sent for this transaction
    if (paystackReference && paystackReference !== '—') {
      const { data: existingBooking } = await supabase
        .from('client_bookings')
        .select('admin_alert_sent')
        .eq('paystack_reference', paystackReference)
        .limit(1)

      if (existingBooking && existingBooking.length > 0 && existingBooking[0].admin_alert_sent === true) {
        console.log(`[Send Admin Alert] Admin alert already recorded as sent for ref ${paystackReference}. Skipping duplicate.`)
        return new Response(
          JSON.stringify({ success: true, alreadySent: true }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
        )
      }
    }

    // 2. Fetch credentials
    let apiKey = Deno.env.get('BREVO_API_KEY') || Deno.env.get('SENDINBLUE_API_KEY') || Deno.env.get('BREVO_KEY') || ''
    let senderName = Deno.env.get('BREVO_SENDER_NAME') || 'Paper Street Workspaces'
    let senderEmail = Deno.env.get('BREVO_SENDER_EMAIL') || 'hello@paperstreet.africa'
    let adminEmail = Deno.env.get('ADMIN_EMAIL') || 'otienoalvine925@gmail.com'

    if (!apiKey) {
      const { data: settings } = await supabase.from('system_settings').select('key, value')
      if (settings && settings.length > 0) {
        for (const s of settings) {
          if (s.key === 'brevo_api_key' || s.key === 'brevo_key') apiKey = s.value
          if (s.key === 'brevo_sender_name') senderName = s.value
          if (s.key === 'brevo_sender_email') senderEmail = s.value
          if (s.key === 'admin_email') adminEmail = s.value
        }
      }
    }

    if (!apiKey) {
      console.error('[Send Admin Alert] BREVO_API_KEY is not configured!')
      return new Response(
        JSON.stringify({ error: 'BREVO_API_KEY environment variable is not configured' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
      )
    }

    console.log(`[Send Admin Alert] Sending admin booking notification for ${paystackReference} to ${adminEmail}`)

    // 3. Admin Alert Email HTML
    const adminHtml = `
<!DOCTYPE html>
<html>
<body style="font-family: Arial, sans-serif; color: #0F2D52; padding: 30px 20px; line-height: 1.6;">
  <div style="border-bottom: 2px solid #0F2D52; padding-bottom: 14px; margin-bottom: 20px;">
    <h2 style="margin: 0; letter-spacing: 2px;">PAPER STREET</h2>
    <p style="margin: 4px 0 0 0; font-size: 11px; color: #64748B;">Admin Booking Alert</p>
  </div>
  <h3>New Booking Confirmed &amp; Paid</h3>
  <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
    <tr><td style="padding: 6px 0; color: #64748B; width: 35%;">Client Name:</td><td style="padding: 6px 0; font-weight: bold; color: #0F2D52;">${clientName}</td></tr>
    <tr><td style="padding: 6px 0; color: #64748B;">Client Email:</td><td style="padding: 6px 0; color: #0F2D52;">${clientEmail}</td></tr>
    <tr><td style="padding: 6px 0; color: #64748B;">Client Phone:</td><td style="padding: 6px 0; color: #0F2D52;">${clientPhone}</td></tr>
    ${companyName ? `<tr><td style="padding: 6px 0; color: #64748B;">Company:</td><td style="padding: 6px 0; color: #0F2D52;">${companyName}</td></tr>` : ''}
    <tr><td style="padding: 6px 0; color: #64748B;">Package &amp; Tier:</td><td style="padding: 6px 0; font-weight: bold; color: #0F2D52;">${serviceTitle} — ${tierName}</td></tr>
    <tr><td style="padding: 6px 0; color: #64748B;">Schedule:</td><td style="padding: 6px 0; color: #0F2D52;">${bookingDate} (${startTime} - ${endTime})</td></tr>
    <tr><td style="padding: 6px 0; color: #64748B;">Hub Facility:</td><td style="padding: 6px 0; color: #0F2D52;">${location}</td></tr>
    ${overtimeHours > 0 ? `<tr><td style="padding: 6px 0; color: #B45309;">Extended Hours:</td><td style="padding: 6px 0; font-weight: bold; color: #B45309;">${overtimeHours} hr(s) (+ KES ${overtimeFeeKES.toLocaleString()})</td></tr>` : ''}
    <tr><td style="padding: 6px 0; color: #64748B;">Total Revenue:</td><td style="padding: 6px 0; font-size: 15px; font-weight: bold; color: #0F2D52;">KES ${totalAmountKES.toLocaleString()}</td></tr>
    <tr><td style="padding: 6px 0; color: #64748B;">Transaction Ref:</td><td style="padding: 6px 0; font-family: monospace; color: #0F2D52;">${paystackReference}</td></tr>
    ${specialRequests ? `<tr><td style="padding: 6px 0; color: #64748B;">Special Notes:</td><td style="padding: 6px 0; color: #0F2D52;">${specialRequests}</td></tr>` : ''}
  </table>
  <div style="border-top: 1px solid #E2E8F0; padding-top: 16px; margin-top: 20px; font-size: 11px; color: #94A3B8;">
    <p style="margin: 0;">Automated notification from Paper Street Booking System.</p>
  </div>
</body>
</html>`

    // 4. Send to Admin
    const adminRes = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        'api-key': apiKey,
      },
      body: JSON.stringify({
        sender: { name: senderName, email: senderEmail },
        to: [{ email: adminEmail, name: 'Paper Street Admin' }],
        subject: `[NEW BOOKING] ${clientName} - ${serviceTitle} (KES ${totalAmountKES.toLocaleString()})`,
        htmlContent: adminHtml,
      }),
    })

    const adminData = await adminRes.json().catch(() => ({}))
    console.log('[Brevo Admin Response]', adminRes.status, adminData)

    if (!adminRes.ok) {
      return new Response(
        JSON.stringify({ error: adminData.message || 'Brevo admin alert failed', details: adminData }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      )
    }

    // 5. Update admin_alert_sent = true to prevent duplicate sends
    if (paystackReference && paystackReference !== '—') {
      try {
        await supabase
          .from('client_bookings')
          .update({ admin_alert_sent: true })
          .eq('paystack_reference', paystackReference)
      } catch (dbUpdateErr) {
        console.warn('Could not update admin_alert_sent in DB:', dbUpdateErr)
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        messageId: adminData.messageId,
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
    )
  } catch (err: any) {
    console.error('[Send Admin Alert Exception]', err)
    return new Response(JSON.stringify({ error: err.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    })
  }
})
