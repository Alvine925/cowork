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

  try {
    const body = await req.json()
    const {
      clientName,
      clientEmail,
      serviceTitle,
      location,
      bookingDate,
      startTime,
      endTime,
      paystackReference,
      wifiNetwork = 'PaperStreet-CBD-5G',
      wifiPass = 'PaperStreet2026!',
    } = body

    if (!clientEmail) {
      return new Response(JSON.stringify({ error: 'Missing clientEmail' }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      })
    }

    // 1. Fetch Brevo configuration from system_settings
    let apiKey = Deno.env.get('BREVO_API_KEY') || ''
    let senderName = Deno.env.get('BREVO_SENDER_NAME') || 'Paper Street Workspaces'
    let senderEmail = Deno.env.get('BREVO_SENDER_EMAIL') || 'hello@paperstreet.co.ke'

    const { data: settings } = await supabase.from('system_settings').select('key, value')
    if (settings) {
      for (const s of settings) {
        if (s.key === 'brevo_api_key' || s.key === 'brevo_key') apiKey = s.value
        if (s.key === 'brevo_sender_name') senderName = s.value
        if (s.key === 'brevo_sender_email') senderEmail = s.value
      }
    }

    if (!apiKey) {
      return new Response(JSON.stringify({ error: 'BREVO_API_KEY not configured' }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      })
    }

    const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Your Paper Street Workspace is Ready Tomorrow</title>
</head>
<body style="margin: 0; padding: 40px 20px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #0F2D52; background-color: #fbfaf7; line-height: 1.6;">
  <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border: 1px solid #e2e8f0; padding: 40px 32px;">
    <div style="border-bottom: 2px solid #0F2D52; padding-bottom: 20px; margin-bottom: 28px; display: flex; justify-content: space-between;">
      <div>
        <div style="font-size: 20px; font-weight: 700; letter-spacing: 3px; text-transform: uppercase; color: #0F2D52;">PAPER STREET</div>
        <div style="font-size: 10px; text-transform: uppercase; letter-spacing: 1.5px; color: #64748B; margin-top: 4px;">Workspaces &amp; Commercial Center · Kisumu CBD</div>
      </div>
      <div style="text-align: right;">
        <span style="display: inline-block; background: #eff6ff; border: 1px solid #bfdbfe; color: #1e40af; font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; padding: 3px 8px;">SESSION TOMORROW</span>
      </div>
    </div>
    <div style="margin-bottom: 24px;">
      <h1 style="font-size: 22px; color: #0F2D52; margin: 0 0 10px 0; font-weight: 600;">See you tomorrow, ${clientName || 'Client'}.</h1>
      <p style="font-size: 13.5px; color: #475569; line-height: 1.6; margin: 0;">
        This is a friendly reminder that your upcoming workspace reservation at Paper Street is scheduled for tomorrow.
      </p>
    </div>
    <div style="background: #0F2D52; color: #ffffff; padding: 18px 20px; margin-bottom: 24px;">
      <div style="font-size: 10px; text-transform: uppercase; letter-spacing: 2px; color: #93c5fd; font-weight: 600;">Booking Check-In Reference</div>
      <div style="font-family: monospace; font-size: 22px; font-weight: 700; letter-spacing: 2px; margin-top: 3px;">${paystackReference || 'PS-REF'}</div>
      <div style="font-size: 11px; color: #cbd5e1; margin-top: 4px;">Provide this reference to the concierge on Floor 2 upon arrival.</div>
    </div>
    <div style="margin-bottom: 24px;">
      <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
        <tr style="border-bottom: 1px solid #e2e8f0;">
          <td style="padding: 10px 0; color: #64748B; width: 35%;">Workspace:</td>
          <td style="padding: 10px 0; color: #0F2D52; font-weight: 600;">${serviceTitle}</td>
        </tr>
        <tr style="border-bottom: 1px solid #e2e8f0;">
          <td style="padding: 10px 0; color: #64748B;">Date:</td>
          <td style="padding: 10px 0; color: #0F2D52; font-weight: 600;">${bookingDate}</td>
        </tr>
        <tr style="border-bottom: 1px solid #e2e8f0;">
          <td style="padding: 10px 0; color: #64748B;">Hours:</td>
          <td style="padding: 10px 0; color: #0F2D52; font-weight: 600; font-family: monospace;">${startTime || '08:00 AM'} &mdash; ${endTime || '06:00 PM'}</td>
        </tr>
        <tr style="border-bottom: 1px solid #e2e8f0;">
          <td style="padding: 10px 0; color: #64748B;">Location:</td>
          <td style="padding: 10px 0; color: #0F2D52;">${location || 'CBD Commercial Center, Oginga Odinga St, Kisumu CBD'}</td>
        </tr>
      </table>
    </div>
    <div style="background: #f8fafc; border: 1px solid #e2e8f0; padding: 16px 20px; margin-bottom: 24px; font-size: 12px; color: #334155; line-height: 1.6;">
      <strong>Amenities Ready:</strong> High-speed Wi-Fi (<code>${wifiNetwork}</code>), 100% generator power backup, quiet phone booths, and complimentary artisan refreshments.
    </div>
    <div style="border-top: 1px solid #e2e8f0; padding-top: 20px; font-size: 11px; color: #94A3B8; text-align: center;">
      Paper Street Workspaces · Kisumu CBD · hello@paperstreet.co.ke
    </div>
  </div>
</body>
</html>`

    const res = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        'api-key': apiKey,
      },
      body: JSON.stringify({
        sender: { name: senderName, email: senderEmail },
        to: [{ email: clientEmail, name: clientName || 'Client' }],
        subject: `Reminder: Your Paper Street Workspace is Ready Tomorrow (${serviceTitle})`,
        htmlContent: html,
      }),
    })

    const data = await res.json()
    if (!res.ok) {
      return new Response(JSON.stringify({ error: data.message || 'Brevo failed' }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      })
    }

    return new Response(JSON.stringify({ success: true, messageId: data.messageId }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    })
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    })
  }
})
