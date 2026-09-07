import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(req: NextRequest) {
  try {
    const payload = await req.json()
    const {
      quoteReference,
      serviceSlug,
      serviceTitle,
      tierName,
      commitmentPeriod,
      monthlyRateKES,
      totalCommitmentKES,
      depositAmountKES,
      startDate,
      companyName,
      clientName,
      clientEmail,
      clientPhone,
      additionalRequirements,
    } = payload

    if (!quoteReference || !clientEmail || !clientName) {
      return NextResponse.json({ error: 'Missing required quote parameters' }, { status: 400 })
    }

    // Trigger Supabase Edge Function
    try {
      const { data, error } = await supabase.functions.invoke('send-quote-email', {
        body: payload,
      })

      if (!error && data?.success) {
        return NextResponse.json({ success: true, quoteReference })
      }
      if (error) {
        console.warn('Edge function quote dispatch error:', error)
      }
    } catch (e) {
      console.warn('Edge function quote dispatch exception:', e)
    }

    // Fallback: direct Brevo send if configured
    const apiKey = process.env.BREVO_API_KEY
    if (apiKey) {
      const grandTotal = totalCommitmentKES + (depositAmountKES || 0)
      const clientHtml = `
      <div style="font-family: sans-serif; color: #0F2D52; padding: 30px; background: #FBFAF7;">
        <div style="max-width: 600px; margin: 0 auto; background: #fff; border: 1px solid #e2e8f0; padding: 30px;">
          <h2 style="margin: 0 0 4px; color: #0F2D52; text-transform: uppercase;">Paper Street Workspaces</h2>
          <p style="font-size: 11px; color: #64748B; margin: 0 0 20px;">Official Membership Quotation &middot; Ref: ${quoteReference}</p>
          <p style="font-size: 14px;">Dear ${clientName},</p>
          <p style="font-size: 13px; color: #334155;">Thank you for your interest in Paper Street Workspaces. We have prepared your tailored quotation for <strong>${serviceTitle} (${tierName})</strong>.</p>
          <div style="background: #f8fafc; padding: 15px; border: 1px solid #e2e8f0; margin: 20px 0; font-size: 13px;">
            <p style="margin: 4px 0;"><strong>Package:</strong> ${serviceTitle} &mdash; ${tierName}</p>
            <p style="margin: 4px 0;"><strong>Commitment:</strong> ${commitmentPeriod}</p>
            <p style="margin: 4px 0;"><strong>Monthly Rate:</strong> KES ${monthlyRateKES?.toLocaleString()} / mo</p>
            ${depositAmountKES > 0 ? `<p style="margin: 4px 0;"><strong>Deposit:</strong> KES ${depositAmountKES?.toLocaleString()}</p>` : ''}
            <p style="margin: 8px 0 0; font-size: 14px; font-weight: bold; color: #0F2D52;">Total Initial Investment: KES ${grandTotal.toLocaleString()}</p>
          </div>
          <div style="border: 1px solid #e2e8f0; padding: 12px; margin-bottom: 20px; font-size: 11px; color: #475569; line-height: 1.5; background: #fafafa;">
            <strong style="color: #0F2D52; display: block; margin-bottom: 6px; text-transform: uppercase;">Package Terms &amp; Conditions:</strong>
            <p style="margin: 0 0 4px;">&bull; <strong>Registered Address:</strong> Valid for Section 47 Companies Act 2015, eCitizen BRS, and KRA PIN compliance.</p>
            <p style="margin: 0 0 4px;">&bull; <strong>KYC Requirements:</strong> Director ID/Passport, KRA PIN, and CR12 required within 14 days.</p>
            <p style="margin: 0 0 4px;">&bull; <strong>Mail Handling:</strong> 300 DPI PDF scans delivered within 2 hours; 60 days physical holding.</p>
            <p style="margin: 0 0 4px;">&bull; <strong>Hours &amp; Facilities:</strong> Mon&ndash;Fri 08:00 AM &ndash; 06:00 PM with 100% generator power backup.</p>
            <p style="margin: 0;">&bull; <strong>Notice &amp; Cancellation:</strong> 30 days notice for rolling contracts; 48h notice for 90% meeting room refund.</p>
          </div>
          <p style="font-size: 12px; color: #475569;">A Paper Street client relationship specialist will be in touch shortly to assist with agreement execution and onboarding.</p>
        </div>
      </div>
      `

      await fetch('https://api.brevo.com/v3/smtp/email', {
        method: 'POST',
        headers: {
          accept: 'application/json',
          'content-type': 'application/json',
          'api-key': apiKey,
        },
        body: JSON.stringify({
          sender: { 
            name: process.env.BREVO_SENDER_NAME || 'Paper Street Workspaces', 
            email: process.env.BREVO_SENDER_EMAIL || '' 
          },
          to: [{ email: clientEmail, name: clientName }],
          subject: `Membership Quotation [${quoteReference}] - ${serviceTitle} | Paper Street`,
          htmlContent: clientHtml,
        }),
      })
    }

    return NextResponse.json({ success: true, quoteReference })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
