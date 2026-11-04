import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, apikey, content-type, x-supabase-client-version',
}

interface OfficeManagementPayload {
  requestId?: string
  businessName: string
  contactName: string
  email: string
  phone: string
  location: string
  employees: string
  requirements: string
  facilities?: string
  startDate?: string
  contractDuration?: string
  additionalInfo?: string
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
    const payload: OfficeManagementPayload = await req.json()
    const {
      requestId,
      businessName,
      contactName,
      email,
      phone,
      location,
      employees,
      requirements,
      facilities,
      startDate,
      contractDuration,
      additionalInfo,
    } = payload

    if (!email || !contactName || !businessName) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields: businessName, contactName, email' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      )
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL') || ''
    const supabaseKey =
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || Deno.env.get('SUPABASE_ANON_KEY') || ''
    const supabase = createClient(supabaseUrl, supabaseKey)

    // ── Credentials: Deno env secrets first, then system_settings table ──────
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

    const refCode = requestId
      ? `OM-${requestId.slice(0, 8).toUpperCase()}`
      : `OM-${Date.now().toString(36).toUpperCase()}`

    // ── Client Acknowledgement Email ──────────────────────────────────────────
    const clientHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Office Management Proposal Request Received - Paper Street</title>
</head>
<body style="margin: 0; padding: 40px 24px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #1c3227; background-color: #ffffff; line-height: 1.6;">
  <div style="max-width: 600px; margin: 0 auto;">

    <!-- Header -->
    <div style="border-bottom: 2px solid #2b4c3b; padding-bottom: 16px; margin-bottom: 28px;">
      <div style="font-size: 20px; font-weight: 700; letter-spacing: 3px; text-transform: uppercase; color: #2b4c3b; margin: 0;">
        PAPER STREET
      </div>
      <div style="font-size: 10px; text-transform: uppercase; letter-spacing: 1.5px; color: #64748B; margin-top: 4px;">
        Commercial Center &middot; Oginga Odinga St &middot; Kisumu CBD, Kenya
      </div>
    </div>

    <!-- Title -->
    <div style="margin-bottom: 24px;">
      <div style="font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 2px; color: #64748B; margin-bottom: 4px;">
        OFFICE MANAGEMENT &middot; PROPOSAL REQUEST &middot; <span style="color: #2b4c3b; font-family: monospace;">${refCode}</span>
      </div>
      <div style="font-size: 22px; font-weight: 300; color: #2b4c3b; margin: 0 0 12px 0;">
        Your proposal request has been received.
      </div>
      <p style="font-size: 13.5px; color: #334155; margin: 0; line-height: 1.7;">
        Dear ${contactName}, thank you for reaching out to Paper Street. We have received your Office Management proposal request for <strong>${businessName}</strong> and our workspace advisory team will review your specifications and contact you within <strong>1 business day</strong> with shortlisted premises options and next steps.
      </p>
    </div>

    <!-- Specifications Table -->
    <div style="border-top: 1px solid #2b4c3b; border-bottom: 1px solid #2b4c3b; padding: 6px 0; margin-bottom: 28px;">
      <div style="font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px; color: #64748B; padding: 8px 0 4px 0;">
        YOUR SUBMITTED SPECIFICATIONS
      </div>
      <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
        <tr style="border-bottom: 1px solid #e2e8f0;">
          <td style="padding: 10px 0; color: #64748B; width: 38%;">Business / Company:</td>
          <td style="padding: 10px 0; color: #2b4c3b; font-weight: 600;">${businessName}</td>
        </tr>
        <tr style="border-bottom: 1px solid #e2e8f0;">
          <td style="padding: 10px 0; color: #64748B;">Contact Person:</td>
          <td style="padding: 10px 0; color: #2b4c3b; font-weight: 600;">${contactName}</td>
        </tr>
        <tr style="border-bottom: 1px solid #e2e8f0;">
          <td style="padding: 10px 0; color: #64748B;">Phone / WhatsApp:</td>
          <td style="padding: 10px 0; color: #2b4c3b; font-weight: 600;">${phone}</td>
        </tr>
        <tr style="border-bottom: 1px solid #e2e8f0;">
          <td style="padding: 10px 0; color: #64748B;">Office Location:</td>
          <td style="padding: 10px 0; color: #2b4c3b; font-weight: 600;">${location}</td>
        </tr>
        <tr style="border-bottom: 1px solid #e2e8f0;">
          <td style="padding: 10px 0; color: #64748B;">Team Size:</td>
          <td style="padding: 10px 0; color: #2b4c3b;">${employees} employees</td>
        </tr>
        ${contractDuration ? `
        <tr style="border-bottom: 1px solid #e2e8f0;">
          <td style="padding: 10px 0; color: #64748B;">Contract Duration:</td>
          <td style="padding: 10px 0; color: #2b4c3b;">${contractDuration}</td>
        </tr>` : ''}
        ${startDate ? `
        <tr style="border-bottom: 1px solid #e2e8f0;">
          <td style="padding: 10px 0; color: #64748B;">Expected Start:</td>
          <td style="padding: 10px 0; color: #2b4c3b;">${startDate}</td>
        </tr>` : ''}
        <tr style="border-bottom: 1px solid #e2e8f0;">
          <td style="padding: 10px 0; color: #64748B; vertical-align: top;">Office Requirements:</td>
          <td style="padding: 10px 0; color: #1e293b; line-height: 1.5;">${requirements}</td>
        </tr>
        ${facilities ? `
        <tr>
          <td style="padding: 10px 0; color: #64748B; vertical-align: top;">Required Facilities:</td>
          <td style="padding: 10px 0; color: #1e293b; font-size: 12px; line-height: 1.6;">${facilities}</td>
        </tr>` : ''}
      </table>
    </div>

    <!-- What Happens Next -->
    <div style="border-bottom: 1px solid #e2e8f0; padding-bottom: 20px; margin-bottom: 24px; font-size: 12.5px; color: #334155; line-height: 1.6;">
      <strong style="color: #2b4c3b; display: block; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.5px; font-size: 11px;">WHAT HAPPENS NEXT</strong>
      1. Our team reviews your specifications and identifies suitable premises in ${location}.<br>
      2. We prepare a custom proposal with office options matched to your requirements.<br>
      3. A workspace advisor contacts you directly to discuss options and agree on terms.<br>
      4. We furnish and prepare the office. Your team moves in while Paper Street manages everything.
    </div>

    <!-- Direct Contact -->
    <div style="border-bottom: 1px solid #e2e8f0; padding-bottom: 20px; margin-bottom: 24px; font-size: 12.5px; color: #334155; line-height: 1.6;">
      <strong style="color: #2b4c3b;">Need to speak with us sooner?</strong> Contact our workspace advisory team directly:<br>
      Phone / WhatsApp: <strong style="color: #2b4c3b;">0110486677 (+254 110 486 677)</strong> &middot; Mon&ndash;Sat, 8:00 AM &ndash; 6:00 PM
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

    // ── Admin Notification Email ───────────────────────────────────────────────
    const adminHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>New Office Management Request - Paper Street Admin</title>
</head>
<body style="margin: 0; padding: 40px 24px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #1c3227; background-color: #ffffff; line-height: 1.6;">
  <div style="max-width: 600px; margin: 0 auto;">

    <!-- Header -->
    <div style="border-bottom: 2px solid #2b4c3b; padding-bottom: 16px; margin-bottom: 24px;">
      <div style="font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 2px; color: #64748B; margin-bottom: 4px;">
        NEW OFFICE MANAGEMENT REQUEST &middot; <span style="font-family: monospace; color: #2b4c3b;">${refCode}</span>
      </div>
      <div style="font-size: 22px; font-weight: 300; color: #2b4c3b; margin: 0;">
        ${businessName} &mdash; ${contactName}
      </div>
      <div style="font-size: 12px; color: #64748B; margin-top: 4px;">${location} &middot; ${employees} employees</div>
    </div>

    <!-- Client Details -->
    <div style="border-bottom: 1px solid #2b4c3b; padding-bottom: 12px; margin-bottom: 20px;">
      <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
        <tr style="border-bottom: 1px solid #e2e8f0;">
          <td style="padding: 8px 0; color: #64748B; width: 38%;">Business Name:</td>
          <td style="padding: 8px 0; color: #2b4c3b; font-weight: 600;">${businessName}</td>
        </tr>
        <tr style="border-bottom: 1px solid #e2e8f0;">
          <td style="padding: 8px 0; color: #64748B;">Contact Person:</td>
          <td style="padding: 8px 0; color: #2b4c3b; font-weight: 600;">${contactName}</td>
        </tr>
        <tr style="border-bottom: 1px solid #e2e8f0;">
          <td style="padding: 8px 0; color: #64748B;">Email:</td>
          <td style="padding: 8px 0; color: #2b4c3b;"><a href="mailto:${email}" style="color: #2b4c3b; font-weight: 600;">${email}</a></td>
        </tr>
        <tr style="border-bottom: 1px solid #e2e8f0;">
          <td style="padding: 8px 0; color: #64748B;">Phone:</td>
          <td style="padding: 8px 0; color: #2b4c3b; font-weight: 600;"><a href="tel:${phone}" style="color: #2b4c3b;">${phone}</a></td>
        </tr>
        <tr style="border-bottom: 1px solid #e2e8f0;">
          <td style="padding: 8px 0; color: #64748B;">Location:</td>
          <td style="padding: 8px 0; color: #2b4c3b; font-weight: 600;">${location}</td>
        </tr>
        <tr style="border-bottom: 1px solid #e2e8f0;">
          <td style="padding: 8px 0; color: #64748B;">Team Size:</td>
          <td style="padding: 8px 0; color: #2b4c3b; font-weight: 600;">${employees} employees</td>
        </tr>
        ${contractDuration ? `
        <tr style="border-bottom: 1px solid #e2e8f0;">
          <td style="padding: 8px 0; color: #64748B;">Contract Duration:</td>
          <td style="padding: 8px 0; color: #2b4c3b;">${contractDuration}</td>
        </tr>` : ''}
        ${startDate ? `
        <tr style="border-bottom: 1px solid #e2e8f0;">
          <td style="padding: 8px 0; color: #64748B;">Expected Start:</td>
          <td style="padding: 8px 0; color: #2b4c3b;">${startDate}</td>
        </tr>` : ''}
      </table>
    </div>

    <!-- Requirements -->
    <div style="margin-bottom: 20px;">
      <div style="font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; color: #64748B; margin-bottom: 6px;">OFFICE REQUIREMENTS:</div>
      <div style="font-size: 13.5px; color: #2b4c3b; line-height: 1.6; white-space: pre-wrap;">${requirements}</div>
    </div>

    ${facilities ? `
    <div style="margin-bottom: 20px;">
      <div style="font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; color: #64748B; margin-bottom: 6px;">REQUIRED FACILITIES:</div>
      <div style="font-size: 12.5px; color: #2b4c3b; line-height: 1.6;">${facilities}</div>
    </div>` : ''}

    ${additionalInfo ? `
    <div style="margin-bottom: 20px;">
      <div style="font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; color: #64748B; margin-bottom: 6px;">ADDITIONAL INFO:</div>
      <div style="font-size: 12.5px; color: #2b4c3b; line-height: 1.6;">${additionalInfo}</div>
    </div>` : ''}

    <!-- Action Buttons -->
    <div style="border-top: 1px solid #e2e8f0; border-bottom: 1px solid #e2e8f0; padding: 14px 0; margin-bottom: 20px;">
      <a href="mailto:${email}?subject=RE: Office Management Proposal - ${businessName}" style="color: #2b4c3b; font-weight: 700; font-size: 12px; text-decoration: underline; margin-right: 24px;">
        Reply via Email &rarr;
      </a>
      <a href="https://wa.me/${phone.replace(/[^0-9]/g, '')}" style="color: #166534; font-weight: 700; font-size: 12px; text-decoration: underline;">
        WhatsApp Client &rarr;
      </a>
    </div>

    <!-- Footer -->
    <div style="font-size: 11px; color: #94A3B8;">
      Automated alert from Paper Street Office Management Engine. Record ${requestId ? `saved with ID: <code>${requestId}</code>` : 'logged'} in Supabase <code>office_management_requests</code>.
    </div>

  </div>
</body>
</html>
`

    let clientSuccess = false
    let adminSuccess = false

    // ── Send via Brevo if API key is available ────────────────────────────────
    if (apiKey && !apiKey.includes('placeholder')) {
      // Client acknowledgement
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
            to: [{ email, name: contactName }],
            subject: `Office Management Proposal Request Received [${refCode}] | Paper Street`,
            htmlContent: clientHtml,
          }),
        })
        clientSuccess = clientRes.ok
        if (!clientRes.ok) {
          const errBody = await clientRes.text()
          console.error('[send-office-management-email] Client email error:', errBody)
        }
      } catch (clientErr) {
        console.error('[send-office-management-email] Client email exception:', clientErr)
      }

      // Admin notification
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
            to: [{ email: adminEmail, name: 'Paper Street Admin' }],
            subject: `[NEW OFFICE MANAGEMENT REQUEST] ${businessName} (${contactName}) · ${location}`,
            htmlContent: adminHtml,
          }),
        })
        adminSuccess = adminRes.ok
        if (!adminRes.ok) {
          const errBody = await adminRes.text()
          console.error('[send-office-management-email] Admin email error:', errBody)
        }
      } catch (adminErr) {
        console.error('[send-office-management-email] Admin email exception:', adminErr)
      }
    } else {
      console.log(
        '[send-office-management-email] No live Brevo key — simulated send to:',
        email,
        adminEmail
      )
      clientSuccess = true
      adminSuccess = true
    }

    // ── Update office_management_requests DB flags ─────────────────────────────
    if (requestId) {
      try {
        await supabase
          .from('office_management_requests')
          .update({
            user_acknowledged: clientSuccess,
            user_acknowledged_at: clientSuccess ? new Date().toISOString() : null,
            admin_notified: adminSuccess,
            admin_notified_at: adminSuccess ? new Date().toISOString() : null,
          })
          .eq('id', requestId)
      } catch (updErr) {
        console.warn('[send-office-management-email] Could not update DB flags:', updErr)
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        requestId: requestId || refCode,
        clientSuccess,
        adminSuccess,
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
    )
  } catch (err: any) {
    console.error('[send-office-management-email Exception]', err)
    return new Response(JSON.stringify({ error: err.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    })
  }
})

