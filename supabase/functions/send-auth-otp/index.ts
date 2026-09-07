import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, apikey, content-type, x-supabase-client-version',
}

interface OtpPayload {
  type?: 'otp' | 'welcome'
  email: string
  name?: string
  phone?: string
  otp?: string
  referralCode?: string
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
    const payload: OtpPayload = await req.json()
    const { type = 'otp', email, name, phone, otp, referralCode } = payload

    if (!email) {
      return new Response(
        JSON.stringify({ error: 'Missing required parameter: email' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      )
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL') || ''
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || Deno.env.get('SUPABASE_ANON_KEY') || ''
    const supabase = createClient(supabaseUrl, supabaseKey)

    // 1. Fetch credentials from Supabase Edge Secrets or fallback to system_settings table
    let apiKey =
      Deno.env.get('BREVO_API_KEY') ||
      Deno.env.get('SENDINBLUE_API_KEY') ||
      Deno.env.get('BREVO_KEY') ||
      ''
    let senderName =
      Deno.env.get('BREVO_SENDER_NAME') ||
      Deno.env.get('SENDER_NAME') ||
      Deno.env.get('BREVO_FROM_NAME') ||
      Deno.env.get('FROM_NAME') ||
      'Paper Street Workspaces'
    let senderEmail =
      Deno.env.get('BREVO_SENDER_EMAIL') ||
      Deno.env.get('SENDER_EMAIL') ||
      Deno.env.get('BREVO_FROM_EMAIL') ||
      Deno.env.get('FROM_EMAIL') ||
      'hello@paperstreet.africa'

    if (!apiKey || apiKey.includes('placeholder')) {
      const { data: settings } = await supabase.from('system_settings').select('key, value')
      if (settings && settings.length > 0) {
        for (const s of settings) {
          if (s.key === 'brevo_api_key' && s.value) apiKey = s.value
          if (s.key === 'brevo_sender_name' && s.value) senderName = s.value
          if (s.key === 'brevo_sender_email' && s.value) senderEmail = s.value
        }
      }
    }

    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: 'Brevo API key is not configured' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
      )
    }

    let subject = ''
    let htmlContent = ''

    if (type === 'welcome') {
      subject = `Welcome to Paper Street Workspaces, ${name || 'Client'}!`
      const ref = referralCode || 'PAPER-VIP'
      htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Welcome to Paper Street Workspaces</title>
</head>
<body style="margin: 0; padding: 40px 24px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #0F2D52; background-color: #ffffff; line-height: 1.6;">
  <div style="max-width: 600px; margin: 0 auto;">
    <div style="border-bottom: 2px solid #0F2D52; padding-bottom: 16px; margin-bottom: 28px;">
      <div style="font-size: 20px; font-weight: 700; letter-spacing: 3px; text-transform: uppercase; color: #0F2D52; margin: 0;">PAPER STREET</div>
      <div style="font-size: 10px; text-transform: uppercase; letter-spacing: 1.5px; color: #64748B; margin-top: 4px;">Workspaces &amp; Commercial Center &middot; Kisumu CBD, Kenya</div>
    </div>
    <div style="margin-bottom: 24px;">
      <div style="font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 2px; color: #64748B; margin-bottom: 4px;">MEMBERSHIP ONBOARDING</div>
      <div style="font-size: 24px; font-weight: 300; color: #0F2D52; margin: 0 0 12px 0;">Welcome to Paper Street, ${name || 'Client'}.</div>
      <p style="font-size: 13.5px; color: #334155; margin: 0; line-height: 1.6;">Your Paper Street Client Account is active and verified. You now have direct access to on-demand workspace reservations, executive boardrooms, official tax receipts, and member perks.</p>
    </div>
    <div style="border-top: 1px solid #0F2D52; border-bottom: 1px solid #0F2D52; padding: 14px 0; margin-bottom: 24px;">
      <div style="font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px; color: #64748B; margin-bottom: 4px;">YOUR EXCLUSIVE REFERRAL PASSCODE</div>
      <div style="font-family: monospace; font-size: 20px; font-weight: 700; color: #0F2D52; margin: 4px 0;">${ref}</div>
      <div style="font-size: 12.5px; color: #334155; line-height: 1.5;">Share this code with colleagues. They receive <strong>10% off their first booking</strong>, and you earn <strong>KES 500 in workspace credits</strong> for each referral.</div>
    </div>
    <div style="border-bottom: 1px solid #e2e8f0; padding-bottom: 24px; margin-bottom: 24px;">
      <a href="https://paperstreet.africa/portal/client/dashboard" style="display: inline-block; background: #0F2D52; color: #ffffff; text-decoration: none; font-size: 12px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; padding: 12px 24px;">Access Client Portal &rarr;</a>
    </div>
    <div style="font-size: 11px; color: #94A3B8; line-height: 1.6;">
      <div style="font-weight: 600; color: #64748B; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 2px;">Paper Street Workspaces</div>
      <div>CBD Commercial Center, Oginga Odinga Street, Kisumu CBD &middot; hello@paperstreet.africa</div>
    </div>
  </div>
</body>
</html>
      `
    } else {
      subject = `${otp} is your Paper Street verification code`
      htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Verification Code - Paper Street Workspaces</title>
</head>
<body style="margin: 0; padding: 40px 24px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #0F2D52; background-color: #ffffff; line-height: 1.6;">
  <div style="max-width: 600px; margin: 0 auto;">
    <div style="border-bottom: 2px solid #0F2D52; padding-bottom: 16px; margin-bottom: 28px;">
      <div style="font-size: 20px; font-weight: 700; letter-spacing: 3px; text-transform: uppercase; color: #0F2D52; margin: 0;">PAPER STREET</div>
      <div style="font-size: 10px; text-transform: uppercase; letter-spacing: 1.5px; color: #64748B; margin-top: 4px;">Workspaces &amp; Commercial Center &middot; Kisumu CBD, Kenya</div>
    </div>
    <div style="margin-bottom: 24px;">
      <div style="font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 2px; color: #64748B; margin-bottom: 4px;">SECURITY VERIFICATION CODE</div>
      <div style="font-size: 24px; font-weight: 300; color: #0F2D52; margin: 0 0 12px 0;">Verify your email address</div>
      <p style="font-size: 13.5px; color: #334155; margin: 0 0 20px 0; line-height: 1.6;">Use the 6-digit one-time passcode below to authenticate your Paper Street Client Account:</p>
    </div>
    <div style="border-top: 1px solid #0F2D52; border-bottom: 1px solid #0F2D52; padding: 24px 0; margin-bottom: 28px; text-align: center;">
      <div style="font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 2px; color: #64748B; margin-bottom: 8px;">ONE-TIME VERIFICATION PASSCODE</div>
      <div style="font-family: monospace; font-size: 38px; font-weight: 700; letter-spacing: 10px; color: #0F2D52;">${otp}</div>
      <div style="font-size: 11px; color: #64748B; margin-top: 8px;">Valid for <strong>10 minutes</strong>. Do not share this code with anyone.</div>
    </div>
    <div style="border-bottom: 1px solid #e2e8f0; padding-bottom: 20px; margin-bottom: 24px; font-size: 12.5px; color: #334155;">
      If you did not request this verification code, you can safely disregard this email.
    </div>
    <div style="font-size: 11px; color: #94A3B8; line-height: 1.6;">
      <div style="font-weight: 600; color: #64748B; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 2px;">Paper Street Workspaces</div>
      <div>CBD Commercial Center, Oginga Odinga Street, Kisumu CBD &middot; hello@paperstreet.africa</div>
    </div>
  </div>
</body>
</html>
      `
    }

    const brevoRes = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'api-key': apiKey,
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        sender: { name: senderName, email: senderEmail },
        to: [{ email, name: name || 'Client' }],
        subject,
        htmlContent,
      }),
    })

    const brevoData = await brevoRes.json()

    return new Response(
      JSON.stringify({ success: brevoRes.ok, data: brevoData }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: brevoRes.status }
    )
  } catch (error: any) {
    return new Response(
      JSON.stringify({ error: error?.message || 'Internal server error' }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    )
  }
})
