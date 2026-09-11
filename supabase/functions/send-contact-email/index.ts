import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, apikey, content-type, x-supabase-client-version',
}

interface ContactPayload {
  submissionId?: string
  name: string
  email: string
  phone: string
  company?: string
  location: string
  service: string
  message: string
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
    const payload: ContactPayload = await req.json()
    const { submissionId, name, email, phone, company, location, service, message } = payload

    if (!email || !name) {
      return new Response(
        JSON.stringify({ error: 'Missing required parameters: name, email' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      )
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL') || ''
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || Deno.env.get('SUPABASE_ANON_KEY') || ''
    const supabase = createClient(supabaseUrl, supabaseKey)

    // 1. Fetch credentials from Deno env or Supabase system_settings table
    let apiKey = Deno.env.get('BREVO_API_KEY') || Deno.env.get('SENDINBLUE_API_KEY') || ''
    let senderName = Deno.env.get('BREVO_SENDER_NAME') || 'Paper Street Workspaces'
    let senderEmail = Deno.env.get('BREVO_SENDER_EMAIL') || 'hello@paperstreet.co.ke'
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

    const refCode = submissionId ? `INQ-${submissionId.slice(0, 8).toUpperCase()}` : 'PS-INQ'

    // 2. User Acknowledgement Email HTML (Unboxed, pure background layout)
    const clientHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Inquiry Received - Paper Street Workspaces</title>
</head>
<body style="margin: 0; padding: 40px 24px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #0F2D52; background-color: #ffffff; line-height: 1.6;">
  <div style="max-width: 600px; margin: 0 auto;">
    
    <!-- Top Header -->
    <div style="border-bottom: 2px solid #0F2D52; padding-bottom: 16px; margin-bottom: 28px;">
      <div style="font-size: 20px; font-weight: 700; letter-spacing: 3px; text-transform: uppercase; color: #0F2D52; margin: 0;">
        PAPER STREET
      </div>
      <div style="font-size: 10px; text-transform: uppercase; letter-spacing: 1.5px; color: #64748B; margin-top: 4px;">
        Commercial Center &middot; Oginga Odinga St &middot; Kisumu CBD, Kenya
      </div>
    </div>

    <!-- Title & Tracking -->
    <div style="margin-bottom: 24px;">
      <div style="font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 2px; color: #64748B; margin-bottom: 4px;">
        INQUIRY ACKNOWLEDGEMENT &middot; <span style="color: #0F2D52; font-family: monospace;">${refCode}</span>
      </div>
      <div style="font-size: 22px; font-weight: 300; color: #0F2D52; margin: 0 0 12px 0;">
        We have received your message.
      </div>
      <p style="font-size: 13.5px; color: #334155; margin: 0; line-height: 1.6;">
        Dear ${name}, thank you for contacting Paper Street Workspaces. We have recorded your inquiry regarding <strong>${service}</strong> in <strong>${location}</strong> and assigned it to our client services desk. Our relationship team typically responds within <strong>2 business hours</strong>.
      </p>
    </div>

    <!-- Inquiry Details Table (Unboxed, direct on background) -->
    <div style="border-top: 1px solid #0F2D52; border-bottom: 1px solid #0F2D52; padding: 6px 0; margin-bottom: 28px;">
      <div style="font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px; color: #64748B; padding: 8px 0 4px 0;">
        INQUIRY SPECIFICATIONS
      </div>
      <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
        <tr style="border-bottom: 1px solid #e2e8f0;">
          <td style="padding: 10px 0; color: #64748B; width: 35%;">Service Requested:</td>
          <td style="padding: 10px 0; color: #0F2D52; font-weight: 600;">${service}</td>
        </tr>
        <tr style="border-bottom: 1px solid #e2e8f0;">
          <td style="padding: 10px 0; color: #64748B;">Target Hub:</td>
          <td style="padding: 10px 0; color: #0F2D52; font-weight: 600;">${location}</td>
        </tr>
        ${company ? `
        <tr style="border-bottom: 1px solid #e2e8f0;">
          <td style="padding: 10px 0; color: #64748B;">Company / Entity:</td>
          <td style="padding: 10px 0; color: #0F2D52;">${company}</td>
        </tr>
        ` : ''}
        <tr style="border-bottom: 1px solid #e2e8f0;">
          <td style="padding: 10px 0; color: #64748B;">Phone / WhatsApp:</td>
          <td style="padding: 10px 0; color: #0F2D52; font-weight: 600;">${phone}</td>
        </tr>
        <tr>
          <td style="padding: 10px 0; color: #64748B; vertical-align: top;">Your Message:</td>
          <td style="padding: 10px 0; color: #1e293b; font-style: italic; line-height: 1.5;">"${message}"</td>
        </tr>
      </table>
    </div>

    <!-- Direct Contact Line -->
    <div style="border-bottom: 1px solid #e2e8f0; padding-bottom: 20px; margin-bottom: 24px; font-size: 12.5px; color: #334155; line-height: 1.6;">
      <strong style="color: #0F2D52;">Need immediate assistance?</strong> Contact our front desk directly on phone or WhatsApp at <strong style="color: #0F2D52;">0110486677 (+254 110 486 677)</strong> (Mon&ndash;Sat, 8:00 AM &ndash; 6:00 PM).
    </div>

    <!-- Footer -->
    <div style="font-size: 11px; color: #94A3B8; line-height: 1.6;">
      <div style="font-weight: 600; color: #64748B; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 2px;">Paper Street Workspaces</div>
      <div>CBD Commercial Center, Oginga Odinga Street, Kisumu CBD &middot; hello@paperstreet.co.ke &middot; www.paperstreet.co.ke</div>
    </div>

  </div>
</body>
</html>
`

    // 3. Admin Alert Email HTML (Unboxed layout)
    const adminHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>New Contact Message - Paper Street Admin</title>
</head>
<body style="margin: 0; padding: 40px 24px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #0F2D52; background-color: #ffffff; line-height: 1.6;">
  <div style="max-width: 600px; margin: 0 auto;">
    
    <!-- Top Header -->
    <div style="border-bottom: 2px solid #0F2D52; padding-bottom: 16px; margin-bottom: 24px;">
      <div style="font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 2px; color: #64748B; margin-bottom: 4px;">
        NEW INCOMING CONTACT INQUIRY &middot; <span style="font-family: monospace; color: #0F2D52;">${refCode}</span>
      </div>
      <div style="font-size: 22px; font-weight: 300; color: #0F2D52; margin: 0;">
        ${name} &mdash; ${service}
      </div>
    </div>

    <!-- Info Table -->
    <div style="border-bottom: 1px solid #0F2D52; padding-bottom: 12px; margin-bottom: 20px;">
      <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
        <tr style="border-bottom: 1px solid #e2e8f0;">
          <td style="padding: 8px 0; color: #64748B; width: 35%;">Client Name:</td>
          <td style="padding: 8px 0; color: #0F2D52; font-weight: 600;">${name}</td>
        </tr>
        <tr style="border-bottom: 1px solid #e2e8f0;">
          <td style="padding: 8px 0; color: #64748B;">Email Address:</td>
          <td style="padding: 8px 0; color: #0F2D52;"><a href="mailto:${email}" style="color: #0F2D52; font-weight: 600;">${email}</a></td>
        </tr>
        <tr style="border-bottom: 1px solid #e2e8f0;">
          <td style="padding: 8px 0; color: #64748B;">Phone / WhatsApp:</td>
          <td style="padding: 8px 0; color: #0F2D52; font-weight: 600;"><a href="tel:${phone}" style="color: #0F2D52;">${phone}</a></td>
        </tr>
        ${company ? `
        <tr style="border-bottom: 1px solid #e2e8f0;">
          <td style="padding: 8px 0; color: #64748B;">Company:</td>
          <td style="padding: 8px 0; color: #0F2D52;">${company}</td>
        </tr>
        ` : ''}
        <tr style="border-bottom: 1px solid #e2e8f0;">
          <td style="padding: 8px 0; color: #64748B;">Location:</td>
          <td style="padding: 8px 0; color: #0F2D52; font-weight: 600;">${location}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #64748B;">Service:</td>
          <td style="padding: 8px 0; color: #0F2D52; font-weight: 600;">${service}</td>
        </tr>
      </table>
    </div>

    <!-- Message -->
    <div style="margin-bottom: 24px;">
      <div style="font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; color: #64748B; margin-bottom: 6px;">
        CLIENT MESSAGE:
      </div>
      <div style="font-size: 13.5px; color: #0F2D52; line-height: 1.6; white-space: pre-wrap; padding: 4px 0;">${message}</div>
    </div>

    <!-- Actions -->
    <div style="border-top: 1px solid #e2e8f0; border-bottom: 1px solid #e2e8f0; padding: 14px 0; margin-bottom: 24px;">
      <a href="mailto:${email}?subject=RE: Paper Street Inquiry - ${service}" style="color: #0F2D52; font-weight: 700; font-size: 12px; text-decoration: underline; margin-right: 24px;">
        Reply via Email &rarr;
      </a>
      <a href="https://wa.me/${phone.replace(/[^0-9]/g, '')}" style="color: #166534; font-weight: 700; font-size: 12px; text-decoration: underline;">
        WhatsApp Client &rarr;
      </a>
    </div>

    <!-- Footer -->
    <div style="font-size: 11px; color: #94A3B8;">
      Automated alert from Paper Street Inquiries Engine. Record saved to Supabase <code>contact_submissions</code>.
    </div>

  </div>
</body>
</html>
`

    let clientSuccess = false
    let adminSuccess = false

    // 4. Send emails via Brevo if API key is present
    if (apiKey && !apiKey.includes('placeholder')) {
      // Send Client Acknowledgement
      try {
        const clientRes = await fetch('https://api.brevo.com/v3/smtp/email', {
          method: 'POST',
          headers: {
            accept: 'application/json',
            'content-type': 'application/json',
            'api-key': apiKey,
          },
          body: JSON.stringify({
            sender: { name: senderName, email: senderEmail },
            to: [{ email, name }],
            subject: `Thank you for contacting Paper Street [${service}]`,
            htmlContent: clientHtml,
          }),
        })
        clientSuccess = clientRes.ok
      } catch (clientErr) {
        console.error('[send-contact-email] Client email exception:', clientErr)
      }

      // Send Admin Alert
      try {
        const adminRes = await fetch('https://api.brevo.com/v3/smtp/email', {
          method: 'POST',
          headers: {
            accept: 'application/json',
            'content-type': 'application/json',
            'api-key': apiKey,
          },
          body: JSON.stringify({
            sender: { name: senderName, email: senderEmail },
            to: [{ email: adminEmail, name: 'Paper Street Inquiries Team' }],
            subject: `[NEW INQUIRY] ${name} - ${service} (${location})`,
            htmlContent: adminHtml,
          }),
        })
        adminSuccess = adminRes.ok
      } catch (adminErr) {
        console.error('[send-contact-email] Admin email exception:', adminErr)
      }
    } else {
      console.log('[send-contact-email] No live Brevo key configured, simulated send to:', email, adminEmail)
      clientSuccess = true
      adminSuccess = true
    }

    // 5. Update contact_submissions flags
    if (submissionId) {
      try {
        await supabase
          .from('contact_submissions')
          .update({
            user_acknowledged: clientSuccess,
            user_acknowledged_at: clientSuccess ? new Date().toISOString() : null,
            admin_notified: adminSuccess,
            admin_notified_at: adminSuccess ? new Date().toISOString() : null,
          })
          .eq('id', submissionId)
      } catch (updErr) {
        console.warn('Could not update contact_submissions DB flags:', updErr)
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        submissionId: submissionId || refCode,
        clientSuccess,
        adminSuccess,
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
    )
  } catch (err: any) {
    console.error('[send-contact-email Exception]', err)
    return new Response(JSON.stringify({ error: err.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    })
  }
})
