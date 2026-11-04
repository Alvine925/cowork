import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import {
  QuotePayload,
  buildClientEmail,
  buildAdminEmail,
  buildPdf,
  serviceSubject,
} from '@/lib/quote-email-templates'
import { getSystemConfig } from '@/lib/config-service'

export async function POST(req: NextRequest) {
  try {
    const payload: QuotePayload = await req.json()
    const {
      quoteReference,
      serviceSlug,
      companyName,
      clientName,
      clientEmail,
    } = payload

    if (!quoteReference || !clientEmail || !clientName) {
      return NextResponse.json({ error: 'Missing required quote parameters' }, { status: 400 })
    }

    // 1. Try triggering Supabase Edge Function first
    let edgeSuccess = false
    try {
      const { data, error } = await supabase.functions.invoke('send-quote-email', {
        body: payload,
      })

      if (!error && data?.success) {
        edgeSuccess = true
        return NextResponse.json({ success: true, quoteReference, dispatchedVia: 'edge_function' })
      }
      if (error) {
        console.warn('[Quote API] Edge function notice, will fallback to direct send:', error.message || error)
      }
    } catch (e) {
      console.warn('[Quote API] Edge function exception, will fallback to direct send:', e)
    }

    // 2. Fallback: Direct Brevo send with PDF attachment
    const config = await getSystemConfig()
    const apiKey = config.brevoApiKey || process.env.BREVO_API_KEY
    const senderName = config.brevoSenderName || process.env.BREVO_SENDER_NAME || 'Paper Street'
    const senderEmail = config.brevoSenderEmail || process.env.BREVO_SENDER_EMAIL || 'hello@paperstreet.co.ke'
    const adminEmail = config.adminEmail || process.env.ADMIN_EMAIL || 'otienoalvine925@gmail.com'

    if (apiKey && !apiKey.includes('placeholder')) {
      const clientHtml = buildClientEmail(payload)
      const adminHtml = buildAdminEmail(payload, adminEmail)
      const pdfBase64 = buildPdf(payload)
      const subject = serviceSubject(serviceSlug, companyName)
      const pdfFilename = `PaperStreet_Quotation_${quoteReference}.pdf`

      // Send to client with attached PDF
      try {
        await fetch('https://api.brevo.com/v3/smtp/email', {
          method: 'POST',
          headers: {
            accept: 'application/json',
            'content-type': 'application/json',
            'api-key': apiKey,
          },
          body: JSON.stringify({
            sender: { name: senderName, email: senderEmail },
            to: [{ email: clientEmail, name: clientName }],
            subject,
            htmlContent: clientHtml,
            attachment: [
              {
                name: pdfFilename,
                content: pdfBase64,
              },
            ],
          }),
        })
      } catch (clientErr) {
        console.error('[Quote API] Fallback client email failed:', clientErr)
      }

      // Send alert to admin
      try {
        await fetch('https://api.brevo.com/v3/smtp/email', {
          method: 'POST',
          headers: {
            accept: 'application/json',
            'content-type': 'application/json',
            'api-key': apiKey,
          },
          body: JSON.stringify({
            sender: { name: senderName, email: senderEmail },
            to: [{ email: adminEmail, name: 'Paper Street Admin' }],
            subject: `[NEW QUOTE] ${payload.serviceTitle} — ${companyName || clientName} (${quoteReference})`,
            htmlContent: adminHtml,
          }),
        })
      } catch (adminErr) {
        console.error('[Quote API] Fallback admin email failed:', adminErr)
      }

      // Mark email_sent in Supabase quote_requests
      try {
        await supabase
          .from('quote_requests')
          .update({
            email_sent: true,
            email_sent_at: new Date().toISOString(),
          })
          .eq('quote_reference', quoteReference)
      } catch (dbErr) {
        console.warn('[Quote API] Could not update quote_requests DB status:', dbErr)
      }
    } else {
      console.log('[Quote API] No active Brevo API key found; simulated quote dispatch to:', clientEmail)
    }

    return NextResponse.json({ success: true, quoteReference, dispatchedVia: 'direct_fallback' })
  } catch (err: any) {
    console.error('[Quote API] Error:', err)
    return NextResponse.json({ error: err.message || 'Internal server error' }, { status: 500 })
  }
}
