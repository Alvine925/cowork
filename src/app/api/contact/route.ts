import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { supabase } from '@/lib/supabase'
import { dispatchContactEmails } from '@/lib/brevo-service'

const contactApiSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Valid email is required'),
  phone: z.string().min(7, 'Valid phone number is required'),
  company: z.string().optional().nullable(),
  location: z.string().min(1, 'Location is required'),
  service: z.string().min(1, 'Service is required'),
  message: z.string().min(5, 'Message is required'),
})

export async function POST(req: NextRequest) {
  try {
    const json = await req.json()
    const parsed = contactApiSchema.safeParse(json)

    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          error: 'Validation failed',
          details: parsed.error.flatten().fieldErrors,
        },
        { status: 400 }
      )
    }

    const { name, email, phone, company, location, service, message } = parsed.data

    let submissionId: string | undefined = undefined

    // 1. Save submission to Supabase
    try {
      const { data: dbData, error: dbError } = await supabase
        .from('contact_submissions')
        .insert({
          name,
          email,
          phone,
          company: company || null,
          location,
          service,
          message,
          status: 'new',
        })
        .select('id')
        .single()

      if (!dbError && dbData?.id) {
        submissionId = dbData.id
      } else if (dbError) {
        console.warn('[Contact API] DB insertion notice (table may need migration):', dbError.message)
      }
    } catch (dbErr) {
      console.warn('[Contact API] DB Exception:', dbErr)
    }

    // 2. Dispatch via Supabase Edge Function (send-contact-email) or direct Brevo service
    let clientSuccess = false
    let adminSuccess = false

    try {
      const { data: funcData, error: funcErr } = await supabase.functions.invoke('send-contact-email', {
        body: {
          submissionId,
          name,
          email,
          phone,
          company: company || undefined,
          location,
          service,
          message,
        },
      })

      if (!funcErr && funcData?.success) {
        clientSuccess = funcData.clientSuccess ?? true
        adminSuccess = funcData.adminSuccess ?? true
      } else {
        throw new Error(funcErr?.message || 'Edge function returned unsuccessful status')
      }
    } catch (edgeErr) {
      console.warn('[Contact API] Edge function notice, running direct Brevo dispatcher:', edgeErr)
      const emailRes = await dispatchContactEmails({
        submissionId,
        name,
        email,
        phone,
        company: company || undefined,
        location,
        service,
        message,
      })
      clientSuccess = emailRes.clientSuccess
      adminSuccess = emailRes.adminSuccess
    }

    // 3. Update acknowledgment flags in database if record was created
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
      } catch (updateErr) {
        console.warn('[Contact API] Could not update email status flags:', updateErr)
      }
    }

    return NextResponse.json({
      success: true,
      submissionId: submissionId || `PS-${Date.now().toString().slice(-6)}`,
      message: 'Thank you! Your message has been received. Our team will contact you within 2 business hours.',
      emailsDispatched: {
        userAcknowledged: clientSuccess,
        adminNotified: adminSuccess,
      },
    })
  } catch (err: any) {
    console.error('[Contact API Error]', err)
    return NextResponse.json(
      {
        success: false,
        error: err?.message || 'Internal server error while processing inquiry',
      },
      { status: 500 }
    )
  }
}
