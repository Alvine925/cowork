import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const SUPABASE_URL = Deno.env.get('SUPABASE_URL') || ''
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || Deno.env.get('SUPABASE_ANON_KEY') || ''
const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

function formatDate(dateStr: string): string {
  if (!dateStr) return '—'
  const parts = dateStr.includes(',') ? dateStr.split(',') : dateStr.includes(';') ? dateStr.split(';') : [dateStr]
  return parts.map((d) => {
    const clean = d.trim().match(/^(\d{4}-\d{2}-\d{2})/)?.[1]
    if (!clean) return d.trim()
    const dt = new Date(`${clean}T00:00:00Z`)
    if (isNaN(dt.getTime())) return d.trim()
    return dt.toLocaleDateString('en-KE', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' })
  }).join(', ')
}

function buildAdminEmail(b: Record<string, any>): string {
  const packageLine = b.tierName ? `${b.serviceTitle} — ${b.tierName}` : b.serviceTitle
  const hasDeposit = Number(b.depositAmountKES) > 0
  const hasOvertime = Number(b.overtimeHours) > 0
  const formattedDates = formatDate(b.bookingDate)
  const now = new Date().toLocaleString('en-KE', { timeZone: 'Africa/Nairobi', dateStyle: 'medium', timeStyle: 'short' })

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Booking Alert — Paper Street Admin</title>
</head>
<body style="margin:0;padding:0;background:#ffffff;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;color:#1a2332;">
<div style="max-width:580px;margin:0 auto;padding:48px 32px;">

  <!-- Wordmark -->
  <div style="border-bottom:2px solid #0F2D52;padding-bottom:16px;margin-bottom:32px;">
    <div style="font-size:18px;font-weight:800;letter-spacing:4px;text-transform:uppercase;color:#0F2D52;">PAPER STREET</div>
    <div style="font-size:10px;letter-spacing:2px;text-transform:uppercase;color:#64748b;margin-top:3px;">Admin &mdash; Booking Alert</div>
  </div>

  <!-- Alert headline -->
  <div style="margin-bottom:8px;">
    <span style="display:inline-block;background:#fef3c7;color:#92400e;font-size:10px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;padding:4px 10px;">⚡ NEW PAID BOOKING</span>
  </div>
  <div style="font-size:22px;font-weight:700;color:#0F2D52;margin-bottom:4px;">${b.clientName}</div>
  <div style="font-size:13px;color:#64748b;margin-bottom:32px;">Received ${now} (EAT)</div>

  <!-- Divider -->
  <div style="border-top:1px solid #e2e8f0;margin-bottom:24px;"></div>

  <!-- Client details -->
  <div style="font-size:10px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#64748b;margin-bottom:14px;">Client</div>
  <table style="width:100%;border-collapse:collapse;font-size:13px;margin-bottom:28px;">
    <tr>
      <td style="padding:6px 0;color:#64748b;width:36%;">Name</td>
      <td style="padding:6px 0;color:#0F2D52;font-weight:600;">${b.clientName}</td>
    </tr>
    <tr>
      <td style="padding:6px 0;color:#64748b;">Email</td>
      <td style="padding:6px 0;color:#0F2D52;"><a href="mailto:${b.clientEmail}" style="color:#0F2D52;text-decoration:none;font-weight:600;">${b.clientEmail}</a></td>
    </tr>
    <tr>
      <td style="padding:6px 0;color:#64748b;">Phone</td>
      <td style="padding:6px 0;color:#0F2D52;"><a href="tel:${b.clientPhone}" style="color:#0F2D52;text-decoration:none;">${b.clientPhone || '—'}</a></td>
    </tr>
    ${b.companyName ? `<tr>
      <td style="padding:6px 0;color:#64748b;">Company</td>
      <td style="padding:6px 0;color:#0F2D52;">${b.companyName}</td>
    </tr>` : ''}
  </table>

  <!-- Divider -->
  <div style="border-top:1px solid #e2e8f0;margin-bottom:24px;"></div>

  <!-- Reservation -->
  <div style="font-size:10px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#64748b;margin-bottom:14px;">Reservation</div>
  <table style="width:100%;border-collapse:collapse;font-size:13px;margin-bottom:28px;">
    <tr>
      <td style="padding:6px 0;color:#64748b;width:36%;">Package</td>
      <td style="padding:6px 0;color:#0F2D52;font-weight:600;">${packageLine}</td>
    </tr>
    <tr>
      <td style="padding:6px 0;color:#64748b;">Facility</td>
      <td style="padding:6px 0;color:#0F2D52;">${b.location}</td>
    </tr>
    <tr>
      <td style="padding:6px 0;color:#64748b;">Date(s)</td>
      <td style="padding:6px 0;color:#0F2D52;font-weight:600;">${formattedDates}</td>
    </tr>
    <tr>
      <td style="padding:6px 0;color:#64748b;">Access Window</td>
      <td style="padding:6px 0;color:#0F2D52;font-family:monospace;">${b.startTime} &mdash; ${b.endTime}</td>
    </tr>
    ${hasOvertime ? `<tr>
      <td style="padding:6px 0;color:#92400e;">Extended Hours</td>
      <td style="padding:6px 0;color:#92400e;font-weight:600;">${b.overtimeHours} hr${Number(b.overtimeHours) > 1 ? 's' : ''} (+KES ${Number(b.overtimeFeeKES).toLocaleString()})</td>
    </tr>` : ''}
    ${b.specialRequests ? `<tr>
      <td style="padding:6px 0;color:#64748b;vertical-align:top;">Notes</td>
      <td style="padding:6px 0;color:#334155;">${b.specialRequests}</td>
    </tr>` : ''}
  </table>

  <!-- Divider -->
  <div style="border-top:1px solid #e2e8f0;margin-bottom:24px;"></div>

  <!-- Revenue -->
  <div style="font-size:10px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#64748b;margin-bottom:14px;">Revenue</div>
  <table style="width:100%;border-collapse:collapse;font-size:13px;margin-bottom:8px;">
    <tr style="border-bottom:1px solid #f1f5f9;">
      <td style="padding:7px 0;color:#334155;">${packageLine}</td>
      <td style="padding:7px 0;color:#0F2D52;text-align:right;font-family:monospace;">KES ${Number(b.rentAmountKES || b.totalAmountKES).toLocaleString()}</td>
    </tr>
    ${hasDeposit ? `<tr style="border-bottom:1px solid #f1f5f9;">
      <td style="padding:7px 0;color:#334155;">Security Deposit</td>
      <td style="padding:7px 0;color:#0F2D52;text-align:right;font-family:monospace;">KES ${Number(b.depositAmountKES).toLocaleString()}</td>
    </tr>` : ''}
    ${hasOvertime ? `<tr style="border-bottom:1px solid #f1f5f9;">
      <td style="padding:7px 0;color:#92400e;">Extended Hours</td>
      <td style="padding:7px 0;color:#92400e;text-align:right;font-family:monospace;">KES ${Number(b.overtimeFeeKES).toLocaleString()}</td>
    </tr>` : ''}
  </table>

  <div style="border-top:2px solid #0F2D52;padding-top:10px;margin-bottom:36px;">
    <table style="width:100%;">
      <tr>
        <td style="font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:0.5px;color:#0F2D52;">Total Received</td>
        <td style="font-size:18px;font-weight:700;font-family:monospace;color:#0F2D52;text-align:right;">KES ${Number(b.totalAmountKES).toLocaleString()}</td>
      </tr>
    </table>
  </div>

  <!-- Reference -->
  <div style="border-top:1px solid #e2e8f0;padding-top:20px;margin-bottom:12px;">
    <span style="font-size:10px;text-transform:uppercase;letter-spacing:2px;color:#64748b;">Paystack Reference &nbsp;</span>
    <span style="font-family:monospace;font-size:13px;font-weight:700;color:#0F2D52;">${b.paystackReference}</span>
  </div>

  <!-- Footer -->
  <div style="border-top:1px solid #e2e8f0;margin-top:32px;padding-top:16px;font-size:11px;color:#94a3b8;">
    Automated notification from Paper Street Booking System.
  </div>

</div>
</body>
</html>`
}

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 405,
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
      tierName = '',
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

    // Deduplication
    if (paystackReference && paystackReference !== '—') {
      const { data: existing } = await supabase
        .from('client_bookings')
        .select('admin_alert_sent')
        .eq('paystack_reference', paystackReference)
        .limit(1)
      if (existing?.[0]?.admin_alert_sent === true) {
        console.log(`[send-admin-alert] Already sent for ${paystackReference}`)
        return new Response(JSON.stringify({ success: true, alreadySent: true }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200,
        })
      }
    }

    // Fetch Brevo credentials
    let apiKey = Deno.env.get('BREVO_API_KEY') || Deno.env.get('SENDINBLUE_API_KEY') || ''
    let senderName = Deno.env.get('BREVO_SENDER_NAME') || 'Paper Street Workspaces'
    let senderEmail = Deno.env.get('BREVO_SENDER_EMAIL') || 'hello@paperstreet.co.ke'
    let adminEmail = Deno.env.get('ADMIN_EMAIL') || 'otienoalvine925@gmail.com'

    if (!apiKey) {
      const { data: settings } = await supabase.from('system_settings').select('key, value')
      if (settings) {
        for (const s of settings) {
          if (s.key === 'brevo_api_key') apiKey = s.value
          if (s.key === 'brevo_sender_name') senderName = s.value
          if (s.key === 'brevo_sender_email') senderEmail = s.value
          if (s.key === 'admin_email') adminEmail = s.value
        }
      }
    }

    if (!apiKey) {
      return new Response(JSON.stringify({ error: 'BREVO_API_KEY not configured' }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500,
      })
    }

    const bookingData = {
      clientName, clientEmail, clientPhone, companyName, serviceTitle, tierName,
      location, bookingDate, startTime, endTime, totalAmountKES,
      rentAmountKES: rentAmountKES || totalAmountKES,
      depositAmountKES, overtimeHours, overtimeFeeKES,
      paystackReference, specialRequests,
    }

    const htmlContent = buildAdminEmail(bookingData)
    const packageLabel = tierName ? `${serviceTitle} (${tierName})` : serviceTitle

    const res = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: { accept: 'application/json', 'content-type': 'application/json', 'api-key': apiKey },
      body: JSON.stringify({
        sender: { name: senderName, email: senderEmail },
        to: [{ email: adminEmail, name: 'Paper Street Admin' }],
        subject: `[NEW BOOKING] ${clientName} — ${packageLabel} · KES ${Number(totalAmountKES).toLocaleString()}`,
        htmlContent,
      }),
    })

    const resData = await res.json().catch(() => ({}))
    console.log('[send-admin-alert] Brevo response', res.status, resData)

    if (!res.ok) {
      return new Response(JSON.stringify({ error: resData.message || 'Brevo error', details: resData }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400,
      })
    }

    // Mark admin alert sent
    if (paystackReference && paystackReference !== '—') {
      try {
        await supabase
          .from('client_bookings')
          .update({ admin_alert_sent: true })
          .eq('paystack_reference', paystackReference)
      } catch (_) { }
    }

    return new Response(JSON.stringify({ success: true, messageId: resData.messageId }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200,
    })
  } catch (err: any) {
    console.error('[send-admin-alert] Exception', err)
    return new Response(JSON.stringify({ error: err.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500,
    })
  }
})
