import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, apikey, content-type, x-supabase-client-version',
}

interface WaitlistPayload {
  waitlistId?: string
  fullName: string
  email: string
  phone: string
  company?: string
  location: string
  serviceInterest?: string
  teamSize?: string
  estimatedLaunchNeed?: string
  notes?: string
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
    const payload: WaitlistPayload = await req.json()
    const {
      waitlistId,
      fullName,
      email,
      phone,
      company,
      location,
      serviceInterest,
      teamSize,
      estimatedLaunchNeed,
      notes,
    } = payload

    if (!email || !fullName || !location) {
      return new Response(
        JSON.stringify({ error: 'Missing required parameters: fullName, email, location' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      )
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL') || ''
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || Deno.env.get('SUPABASE_ANON_KEY') || ''
    const supabase = createClient(supabaseUrl, supabaseKey)

    // 1. Fetch Brevo Credentials from Deno env or Supabase system_settings
    let apiKey = Deno.env.get('BREVO_API_KEY') || Deno.env.get('SENDINBLUE_API_KEY') || ''
    let senderName = Deno.env.get('BREVO_SENDER_NAME') || 'Paper Street Workspaces'
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

    const refCode = waitlistId ? `VIP-${waitlistId.slice(0, 8).toUpperCase()}` : 'PS-VIP'

    // 2. User VIP Confirmation Email HTML (Unboxed, pure background layout)
    const clientHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>VIP Expansion Waitlist - Paper Street Workspaces</title>
</head>
<body style="margin: 0; padding: 40px 24px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #0F2D52; background-color: #ffffff; line-height: 1.6;">
  <div style="max-width: 600px; margin: 0 auto;">
    
    <!-- Top Header -->
    <div style="border-bottom: 2px solid #0F2D52; padding-bottom: 16px; margin-bottom: 28px;">
      <div style="font-size: 20px; font-weight: 700; letter-spacing: 3px; text-transform: uppercase; color: #0F2D52; margin: 0;">
        PAPER STREET
      </div>
      <div style="font-size: 10px; text-transform: uppercase; letter-spacing: 1.5px; color: #64748B; margin-top: 4px;">
        Expansion Network &middot; Kenya Commercial Hubs
      </div>
    </div>

    <!-- Title & VIP Code -->
    <div style="margin-bottom: 24px;">
      <div style="font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 2px; color: #64748B; margin-bottom: 4px;">
        PRIORITY RESERVATION &middot; <span style="color: #0F2D52; font-family: monospace;">${refCode}</span>
      </div>
      <div style="font-size: 22px; font-weight: 300; color: #0F2D52; margin: 0 0 12px 0;">
        You're on the VIP list for ${location}.
      </div>
      <p style="font-size: 13.5px; color: #334155; margin: 0; line-height: 1.6;">
        Hello ${fullName}, thank you for registering for our upcoming <strong>Paper Street ${location}</strong> commercial hub. Your priority profile is confirmed.
      </p>
    </div>

    <!-- VIP Perks List -->
    <div style="border-top: 1px solid #0F2D52; padding: 14px 0 6px 0; margin-bottom: 20px;">
      <div style="font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px; color: #64748B; margin-bottom: 8px;">
        YOUR VIP EARLY-BIRD PRIVILEGES
      </div>
      <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
        <tr style="border-bottom: 1px solid #e2e8f0;">
          <td style="padding: 8px 0; color: #0F2D52; font-weight: 600; width: 40%;">20% Launch Rate Discount:</td>
          <td style="padding: 8px 0; color: #334155;">Applied to your first contracted membership term upon opening.</td>
        </tr>
        <tr style="border-bottom: 1px solid #e2e8f0;">
          <td style="padding: 8px 0; color: #0F2D52; font-weight: 600;">Priority Suite Allocation:</td>
          <td style="padding: 8px 0; color: #334155;">Advance reservation window before public opening.</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #0F2D52; font-weight: 600;">Executive Boardroom Credits:</td>
          <td style="padding: 8px 0; color: #334155;">5 complimentary meeting room hours in your first month.</td>
        </tr>
      </table>
    </div>

    <!-- Registration Profile Table (Unboxed) -->
    <div style="border-top: 1px solid #0F2D52; border-bottom: 1px solid #0F2D52; padding: 6px 0; margin-bottom: 28px;">
      <div style="font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px; color: #64748B; padding: 8px 0 4px 0;">
        REGISTRATION PROFILE
      </div>
      <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
        <tr style="border-bottom: 1px solid #e2e8f0;">
          <td style="padding: 9px 0; color: #64748B; width: 35%;">Target City:</td>
          <td style="padding: 9px 0; color: #0F2D52; font-weight: 600;">${location}</td>
        </tr>
        <tr style="border-bottom: 1px solid #e2e8f0;">
          <td style="padding: 9px 0; color: #64748B;">Workspace Solution:</td>
          <td style="padding: 9px 0; color: #0F2D52; font-weight: 600;">${serviceInterest || 'Virtual Office & Coworking'}</td>
        </tr>
        ${teamSize ? `
        <tr style="border-bottom: 1px solid #e2e8f0;">
          <td style="padding: 9px 0; color: #64748B;">Team Size:</td>
          <td style="padding: 9px 0; color: #0F2D52;">${teamSize}</td>
        </tr>
        ` : ''}
        ${estimatedLaunchNeed ? `
        <tr style="border-bottom: 1px solid #e2e8f0;">
          <td style="padding: 9px 0; color: #64748B;">Target Timeline:</td>
          <td style="padding: 9px 0; color: #0F2D52;">${estimatedLaunchNeed}</td>
        </tr>
        ` : ''}
        ${company ? `
        <tr>
          <td style="padding: 9px 0; color: #64748B;">Company:</td>
          <td style="padding: 9px 0; color: #0F2D52;">${company}</td>
        </tr>
        ` : ''}
      </table>
    </div>

    <!-- Active Hub Notice -->
    <div style="border-bottom: 1px solid #e2e8f0; padding-bottom: 20px; margin-bottom: 24px; font-size: 12.5px; color: #334155; line-height: 1.6;">
      <strong style="color: #0F2D52;">Need an immediate registered address in Kenya?</strong> Our flagship <strong>Kisumu CBD Hub</strong> on Oginga Odinga Street is active and accepting registrations today for eCitizen BRS incorporation, KRA PIN compliance, and daily mail scanning.
    </div>

    <!-- Footer -->
    <div style="font-size: 11px; color: #94A3B8; line-height: 1.6;">
      <div style="font-weight: 600; color: #64748B; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 2px;">Paper Street Workspaces</div>
      <div>Expansion Hubs: Nairobi &middot; Mombasa &middot; Nakuru &middot; Eldoret &middot; Kisumu CBD &middot; hello@paperstreet.africa</div>
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
  <title>New Location Waitlist Lead - Paper Street Admin</title>
</head>
<body style="margin: 0; padding: 40px 24px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #0F2D52; background-color: #ffffff; line-height: 1.6;">
  <div style="max-width: 600px; margin: 0 auto;">
    
    <!-- Top Header -->
    <div style="border-bottom: 2px solid #0F2D52; padding-bottom: 16px; margin-bottom: 24px;">
      <div style="font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 2px; color: #64748B; margin-bottom: 4px;">
        NEW EXPANSION WAITLIST LEAD &middot; <span style="font-family: monospace; color: #0F2D52;">${refCode}</span>
      </div>
      <div style="font-size: 22px; font-weight: 300; color: #0F2D52; margin: 0;">
        ${fullName} &mdash; ${location}
      </div>
    </div>

    <!-- Info Table -->
    <div style="border-bottom: 1px solid #0F2D52; padding-bottom: 12px; margin-bottom: 20px;">
      <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
        <tr style="border-bottom: 1px solid #e2e8f0;">
          <td style="padding: 8px 0; color: #64748B; width: 35%;">Lead Name:</td>
          <td style="padding: 8px 0; color: #0F2D52; font-weight: 600;">${fullName}</td>
        </tr>
        <tr style="border-bottom: 1px solid #e2e8f0;">
          <td style="padding: 8px 0; color: #64748B;">Target City:</td>
          <td style="padding: 8px 0; color: #0F2D52; font-weight: 700; font-size: 14px;">${location}</td>
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
          <td style="padding: 8px 0; color: #64748B;">Service Interest:</td>
          <td style="padding: 8px 0; color: #0F2D52;">${serviceInterest || 'General'}</td>
        </tr>
        <tr style="border-bottom: 1px solid #e2e8f0;">
          <td style="padding: 8px 0; color: #64748B;">Team Size:</td>
          <td style="padding: 8px 0; color: #0F2D52;">${teamSize || 'Not specified'}</td>
        </tr>
        <tr style="border-bottom: 1px solid #e2e8f0;">
          <td style="padding: 8px 0; color: #64748B;">Timeline Requirement:</td>
          <td style="padding: 8px 0; color: #0F2D52;">${estimatedLaunchNeed || 'Not specified'}</td>
        </tr>
        ${notes ? `
        <tr>
          <td style="padding: 8px 0; color: #64748B; vertical-align: top;">Notes:</td>
          <td style="padding: 8px 0; color: #334155; font-style: italic;">"${notes}"</td>
        </tr>
        ` : ''}
      </table>
    </div>

    <!-- Quick Actions -->
    <div style="border-bottom: 1px solid #e2e8f0; padding-bottom: 14px; margin-bottom: 24px;">
      <a href="mailto:${email}?subject=Paper Street ${location} Expansion - VIP Waitlist" style="color: #0F2D52; font-weight: 700; font-size: 12px; text-decoration: underline; margin-right: 24px;">
        Email Lead &rarr;
      </a>
      <a href="https://wa.me/${phone.replace(/[^0-9]/g, '')}" style="color: #166534; font-weight: 700; font-size: 12px; text-decoration: underline;">
        WhatsApp Lead &rarr;
      </a>
    </div>

    <!-- Footer -->
    <div style="font-size: 11px; color: #94A3B8;">
      Automated lead alert from Paper Street Expansion Engine. Saved to Supabase <code>location_waitlists</code>.
    </div>

  </div>
</body>
</html>
`

    let clientSuccess = false
    let adminSuccess = false

    // 4. Send via Brevo API
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
            to: [{ email, name: fullName }],
            subject: `You're on the VIP Waitlist for Paper Street ${location}!`,
            htmlContent: clientHtml,
          }),
        })
        clientSuccess = clientRes.ok
      } catch (clientErr) {
        console.error('[send-waitlist-email] Client email exception:', clientErr)
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
            to: [{ email: adminEmail, name: 'Paper Street Expansion Team' }],
            subject: `[WAITLIST LEAD] ${fullName} - ${location} (${serviceInterest || 'Workspace'})`,
            htmlContent: adminHtml,
          }),
        })
        adminSuccess = adminRes.ok
      } catch (adminErr) {
        console.error('[send-waitlist-email] Admin email exception:', adminErr)
      }
    } else {
      console.log('[send-waitlist-email] Simulated dispatch to:', email, adminEmail)
      clientSuccess = true
      adminSuccess = true
    }

    // 5. Update location_waitlists flags in DB
    if (waitlistId) {
      try {
        await supabase
          .from('location_waitlists')
          .update({
            user_acknowledged: clientSuccess,
            user_acknowledged_at: clientSuccess ? new Date().toISOString() : null,
            admin_notified: adminSuccess,
            admin_notified_at: adminSuccess ? new Date().toISOString() : null,
          })
          .eq('id', waitlistId)
      } catch (updErr) {
        console.warn('Could not update location_waitlists DB flags:', updErr)
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        waitlistId: waitlistId || refCode,
        clientSuccess,
        adminSuccess,
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
    )
  } catch (err: any) {
    console.error('[send-waitlist-email Exception]', err)
    return new Response(JSON.stringify({ error: err.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    })
  }
})
