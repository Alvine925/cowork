import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { supabase } from '@/lib/supabase'
import { dispatchWaitlistEmails } from '@/lib/brevo-service'

const waitlistApiSchema = z.object({
  fullName: z.string().min(2, 'Full name is required'),
  email: z.string().email('Valid email is required'),
  phone: z.string().min(7, 'Valid phone number is required'),
  company: z.string().optional().nullable(),
  location: z.string().min(1, 'Target location is required'),
  serviceInterest: z.string().optional().nullable(),
  teamSize: z.string().optional().nullable(),
  estimatedLaunchNeed: z.string().optional().nullable(),
  notes: z.string().optional().nullable(),
})

export async function POST(req: NextRequest) {
  try {
    const json = await req.json()
    const parsed = waitlistApiSchema.safeParse(json)

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

    const {
      fullName,
      email,
      phone,
      company,
      location,
      serviceInterest,
      teamSize,
      estimatedLaunchNeed,
      notes,
    } = parsed.data

    let waitlistId: string | undefined = undefined

    // 1. Save entry to Supabase location_waitlists
    try {
      const { data: dbData, error: dbError } = await supabase
        .from('location_waitlists')
        .insert({
          full_name: fullName,
          email,
          phone,
          company: company || null,
          location,
          service_interest: serviceInterest || 'Virtual Office',
          team_size: teamSize || '1-5',
          estimated_launch_need: estimatedLaunchNeed || 'Within 1-3 months',
          notes: notes || null,
          status: 'waitlisted',
        })
        .select('id')
        .single()

      if (!dbError && dbData?.id) {
        waitlistId = dbData.id
      } else if (dbError) {
        console.warn('[Waitlist API] DB insertion notice (table may need migration):', dbError.message)
      }
    } catch (dbErr) {
      console.warn('[Waitlist API] DB Exception:', dbErr)
    }

    // 2. Dispatch via Supabase Edge Function (send-waitlist-email) or direct Brevo service
    let clientSuccess = false
    let adminSuccess = false

    try {
      const { data: funcData, error: funcErr } = await supabase.functions.invoke('send-waitlist-email', {
        body: {
          waitlistId,
          fullName,
          email,
          phone,
          company: company || undefined,
          location,
          serviceInterest: serviceInterest || undefined,
          teamSize: teamSize || undefined,
          estimatedLaunchNeed: estimatedLaunchNeed || undefined,
          notes: notes || undefined,
        },
      })

      if (!funcErr && funcData?.success) {
        clientSuccess = funcData.clientSuccess ?? true
        adminSuccess = funcData.adminSuccess ?? true
      } else {
        throw new Error(funcErr?.message || 'Edge function returned unsuccessful status')
      }
    } catch (edgeErr) {
      console.warn('[Waitlist API] Edge function notice, running direct Brevo dispatcher:', edgeErr)
      const emailRes = await dispatchWaitlistEmails({
        waitlistId,
        fullName,
        email,
        phone,
        company: company || undefined,
        location,
        serviceInterest: serviceInterest || undefined,
        teamSize: teamSize || undefined,
        estimatedLaunchNeed: estimatedLaunchNeed || undefined,
        notes: notes || undefined,
      })
      clientSuccess = emailRes.clientSuccess
      adminSuccess = emailRes.adminSuccess
    }

    // 3. Update flags in DB if record was created
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
      } catch (updateErr) {
        console.warn('[Waitlist API] Could not update email status flags:', updateErr)
      }
    }

    return NextResponse.json({
      success: true,
      waitlistId: waitlistId || `VIP-${Date.now().toString().slice(-6)}`,
      message: `You're on the VIP list for ${location}! Check your inbox for your confirmation and early-bird benefits.`,
      emailsDispatched: {
        userAcknowledged: clientSuccess,
        adminNotified: adminSuccess,
      },
    })
  } catch (err: any) {
    console.error('[Waitlist API Error]', err)
    return NextResponse.json(
      {
        success: false,
        error: err?.message || 'Internal server error while joining waitlist',
      },
      { status: 500 }
    )
  }
}
