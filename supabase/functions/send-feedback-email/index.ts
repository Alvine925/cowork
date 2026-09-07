import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, apikey, content-type, x-supabase-client-version',
}

interface FeedbackPayload {
  ticketId?: string
  name: string
  email: string
  phone?: string
  category: string
  priority: string
  subject: string
  message: string
  location?: string
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
    const payload: FeedbackPayload = await req.json()
    const { ticketId, name, email, phone, category, priority, subject, message, location } = payload

    if (!email || !subject || !message) {
      return new Response(
        JSON.stringify({ error: 'Missing required parameters' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      )
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL') || ''
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || Deno.env.get('SUPABASE_ANON_KEY') || ''
    const supabase = createClient(supabaseUrl, supabaseKey)

    let apiKey = Deno.env.get('BREVO_API_KEY') || Deno.env.get('SENDINBLUE_API_KEY') || ''
    let senderName = Deno.env.get('BREVO_SENDER_NAME') || 'Paper Street Support Desk'
    let senderEmail = Deno.env.get('BREVO_SENDER_EMAIL') || 'hello@paperstreet.africa'
    let adminEmail = Deno.env.get('ADMIN_EMAIL') || 'otienoalvine925@gmail.com'

    if (!apiKey || apiKey.includes('placeholder')) {
      const { data: settings } = await supabase.from('system_settings').select('key, value')
      if (settings && settings.length > 0) {
        for (const s of settings) {
          if (s.key === 'brevo_api_key') apiKey = s.value
          if (s.key === 'brevo_sender_name') senderName = s.value
          if (s.key === 'brevo_sender_email') senderEmail = s.value
          if (s.key === 'admin_email') adminEmail = s.value
        }
      }
    }

    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: 'Brevo API key is not configured' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
      )
    }

    const ref = ticketId ? `TKT-${ticketId.slice(0, 8).toUpperCase()}` : 'PS-TKT'

    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Client Support Ticket - Paper Street Admin</title>
</head>
<body style="margin: 0; padding: 40px 24px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #0F2D52; background-color: #ffffff; line-height: 1.6;">
  <div style="max-width: 600px; margin: 0 auto;">
    <div style="border-bottom: 2px solid #0F2D52; padding-bottom: 16px; margin-bottom: 24px;">
      <div style="font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 2px; color: #64748B; margin-bottom: 4px;">CLIENT SUPPORT TICKET &middot; <span style="font-family: monospace; color: #0F2D52;">${ref}</span></div>
      <div style="font-size: 22px; font-weight: 300; color: #0F2D52; margin: 0;">[${category.toUpperCase()}] ${subject}</div>
    </div>
    <div style="border-bottom: 1px solid #0F2D52; padding-bottom: 12px; margin-bottom: 20px;">
      <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
        <tr style="border-bottom: 1px solid #e2e8f0;">
          <td style="padding: 8px 0; color: #64748B; width: 35%;">Client Name:</td>
          <td style="padding: 8px 0; color: #0F2D52; font-weight: 600;">${name}</td>
        </tr>
        <tr style="border-bottom: 1px solid #e2e8f0;">
          <td style="padding: 8px 0; color: #64748B;">Email Address:</td>
          <td style="padding: 8px 0; color: #0F2D52; font-weight: 600;">${email}</td>
        </tr>
        ${phone ? `<tr style="border-bottom: 1px solid #e2e8f0;"><td style="padding: 8px 0; color: #64748B;">Phone:</td><td style="padding: 8px 0; color: #0F2D52; font-weight: 600;">${phone}</td></tr>` : ''}
        <tr style="border-bottom: 1px solid #e2e8f0;">
          <td style="padding: 8px 0; color: #64748B;">Priority:</td>
          <td style="padding: 8px 0; color: ${priority === 'urgent' ? '#dc2626' : '#0F2D52'}; font-weight: 700; text-transform: uppercase;">${priority}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #64748B;">Location:</td>
          <td style="padding: 8px 0; color: #0F2D52;">${location || 'Kisumu CBD'}</td>
        </tr>
      </table>
    </div>
    <div style="margin-bottom: 24px;">
      <div style="font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; color: #64748B; margin-bottom: 6px;">CLIENT MESSAGE / CONCERN:</div>
      <div style="font-size: 13.5px; color: #0F2D52; line-height: 1.6; white-space: pre-wrap;">${message}</div>
    </div>
    <div style="border-top: 1px solid #e2e8f0; border-bottom: 1px solid #e2e8f0; padding: 14px 0; margin-bottom: 24px;">
      <a href="mailto:${email}?subject=RE: Paper Street Support [${ref}] - ${subject}" style="color: #0F2D52; font-weight: 700; font-size: 12px; text-decoration: underline;">Reply to Client &rarr;</a>
    </div>
    <div style="font-size: 11px; color: #94A3B8;">Automated ticket alert from Paper Street Support Desk.</div>
  </div>
</body>
</html>
    `

    const brevoRes = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'api-key': apiKey,
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        sender: { name: senderName, email: senderEmail },
        to: [{ email: adminEmail, name: 'Paper Street Support Desk' }],
        subject: `[${priority.toUpperCase()} SUPPORT] ${category.toUpperCase()}: ${subject}`,
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
