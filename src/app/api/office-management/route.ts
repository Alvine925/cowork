import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { supabase } from '@/lib/supabase'
import { dispatchOfficeManagementEmails } from '@/lib/brevo-service'

const officeManagementSchema = z.object({
  businessName: z.string().min(2, 'Business name is required'),
  contactName: z.string().min(2, 'Contact person name is required'),
  email: z.string().email('Valid email is required'),
  phone: z.string().min(7, 'Valid phone number is required'),
  location: z.string().min(1, 'Preferred location is required'),
  employees: z.string().min(1, 'Number of employees is required'),
  requirements: z.string().min(5, 'Office requirements description is required'),
  facilities: z.string().optional().nullable(),
  startDate: z.string().optional().nullable(),
  contractDuration: z.string().optional().nullable(),
  additionalInfo: z.string().optional().nullable(),
})

export async function POST(req: NextRequest) {
  try {
    const json = await req.json()
    const parsed = officeManagementSchema.safeParse(json)

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
    } = parsed.data

    let requestId: string | undefined = undefined

    // 1. Save record to office_management_requests table
    try {
      const { data: dbData, error: dbError } = await supabase
        .from('office_management_requests')
        .insert({
          business_name: businessName,
          contact_name: contactName,
          email,
          phone,
          location,
          employees,
          requirements,
          facilities: facilities || null,
          start_date: startDate || null,
          contract_duration: contractDuration || null,
          additional_info: additionalInfo || null,
          status: 'new',
        })
        .select('id')
        .single()

      if (!dbError && dbData?.id) {
        requestId = dbData.id
      } else if (dbError) {
        console.warn('[Office Management API] DB notice:', dbError.message)
      }
    } catch (dbErr) {
      console.warn('[Office Management API] DB Exception:', dbErr)
    }

    // 2. Also log to contact_submissions for unified lead visibility
    try {
      const summaryMessage = [
        `Employees: ${employees}`,
        `Contract Duration: ${contractDuration || 'Not specified'}`,
        `Expected Start Date: ${startDate || 'Not specified'}`,
        `Requirements: ${requirements}`,
        facilities ? `Facilities: ${facilities}` : '',
        additionalInfo ? `Additional Info: ${additionalInfo}` : '',
      ]
        .filter(Boolean)
        .join('\n')

      await supabase.from('contact_submissions').insert({
        name: contactName,
        company: businessName,
        email,
        phone,
        location,
        service: 'Office Management',
        message: summaryMessage,
        status: 'new',
      })
    } catch (subErr) {
      console.warn('[Office Management API] Unified log note:', subErr)
    }

    // 3. Dispatch emails via Supabase Edge Function (same pattern as contact route)
    let clientSuccess = false
    let adminSuccess = false

    try {
      const edgePayload = {
        requestId,
        businessName,
        contactName,
        email,
        phone,
        location,
        employees,
        requirements,
        facilities: facilities || undefined,
        startDate: startDate || undefined,
        contractDuration: contractDuration || undefined,
        additionalInfo: additionalInfo || undefined,
      }

      const { data: funcData, error: funcErr } = await supabase.functions.invoke(
        'send-office-management-email',
        { body: edgePayload }
      )

      if (!funcErr && funcData?.success) {
        clientSuccess = funcData.clientSuccess ?? false
        adminSuccess = funcData.adminSuccess ?? false
      } else {
        // Edge function unavailable — fall back to brevo-service direct call
        const edgeErr = funcErr?.message || JSON.stringify(funcData)
        console.warn('[Office Management API] Edge function notice, running direct dispatcher:', edgeErr)

        const emailRes = await dispatchOfficeManagementEmails({
          requestId,
          businessName,
          contactName,
          email,
          phone,
          location,
          employees,
          requirements,
          facilities: facilities || undefined,
          startDate: startDate || undefined,
          contractDuration: contractDuration || undefined,
          additionalInfo: additionalInfo || undefined,
        })

        clientSuccess = emailRes.clientSuccess
        adminSuccess = emailRes.adminSuccess
      }
    } catch (emailErr) {
      console.error('[Office Management API] Email dispatch exception:', emailErr)
    }

    // 4. Update DB email flags
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
        console.warn('[Office Management API] Could not update email status flags:', updErr)
      }
    }

    return NextResponse.json({
      success: true,
      requestId,
      clientNotified: clientSuccess,
      adminNotified: adminSuccess,
    })
  } catch (err: any) {
    console.error('[Office Management API] Error:', err)
    return NextResponse.json(
      { success: false, error: err.message || 'Internal server error' },
      { status: 500 }
    )
  }
}
