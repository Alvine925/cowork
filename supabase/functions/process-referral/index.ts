import { serve } from 'https://deno.land/std@0.177.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.1'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface ReferralRequest {
  action: 'get_or_create_code' | 'link_referral' | 'reward_booking'
  email?: string
  userId?: string
  fullName?: string
  referralCode?: string
  refereeEmail?: string
  bookingId?: string | number
  totalAmountKES?: number
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL') || ''
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || Deno.env.get('SUPABASE_ANON_KEY') || ''
    const supabase = createClient(supabaseUrl, supabaseServiceKey)

    const payload: ReferralRequest = await req.json()
    const { action } = payload

    // 1. GET OR CREATE UNIQUE REFERRAL CODE FOR USER
    if (action === 'get_or_create_code') {
      const email = payload.email?.toLowerCase().trim()
      if (!email) {
        return new Response(JSON.stringify({ error: 'Email is required' }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        })
      }

      // Check existing profile
      const { data: profile } = await supabase
        .from('client_profiles')
        .select('*')
        .eq('email', email)
        .maybeSingle()

      if (profile && profile.referral_code) {
        return new Response(
          JSON.stringify({
            success: true,
            referralCode: profile.referral_code,
            discountBalanceKES: Number(profile.discount_balance_kes) || 0,
            referralLink: `https://paperstreet.co.ke/book?ref=${profile.referral_code}`,
          }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
      }

      // Generate a clean, unique code: PS-XXXX9999
      const prefix = email.slice(0, 4).toUpperCase().replace(/[^A-Z]/g, 'X')
      const randNum = Math.floor(1000 + Math.random() * 9000)
      const newCode = `PS-${prefix}${randNum}`

      if (profile) {
        await supabase
          .from('client_profiles')
          .update({ referral_code: newCode, updated_at: new Date().toISOString() })
          .eq('id', profile.id)
      } else {
        await supabase.from('client_profiles').insert({
          email,
          full_name: payload.fullName || email.split('@')[0],
          referral_code: newCode,
          discount_balance_kes: 0,
        })
      }

      return new Response(
        JSON.stringify({
          success: true,
          referralCode: newCode,
          discountBalanceKES: profile?.discount_balance_kes || 0,
          referralLink: `https://paperstreet.co.ke/book?ref=${newCode}`,
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // 2. LINK REFERRAL WHEN REFEREE JOINS / ENTERS CODE
    if (action === 'link_referral') {
      const refereeEmail = payload.refereeEmail?.toLowerCase().trim()
      const code = payload.referralCode?.trim().toUpperCase()

      if (!refereeEmail || !code) {
        return new Response(JSON.stringify({ error: 'Referee email and referral code required' }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        })
      }

      // Find referrer
      const { data: referrer } = await supabase
        .from('client_profiles')
        .select('email')
        .eq('referral_code', code)
        .maybeSingle()

      if (!referrer || referrer.email === refereeEmail) {
        return new Response(JSON.stringify({ error: 'Invalid or self-referral code' }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        })
      }

      // Insert pending referral if not already existing
      const { data: existing } = await supabase
        .from('client_referrals')
        .select('id, status')
        .eq('referred_email', refereeEmail)
        .maybeSingle()

      if (!existing) {
        await supabase.from('client_referrals').insert({
          referrer_email: referrer.email,
          referred_email: refereeEmail,
          referral_code: code,
          status: 'pending',
          reward_kes: 500,
        })
      }

      return new Response(JSON.stringify({ success: true, message: 'Referral linked successfully' }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    // 3. REWARD WHEN REFEREE ACTUALLY BOOKS A SERVICE
    if (action === 'reward_booking') {
      const refereeEmail = payload.refereeEmail?.toLowerCase().trim()
      if (!refereeEmail) {
        return new Response(JSON.stringify({ error: 'Referee email required' }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        })
      }

      // Find pending referral
      const { data: referral } = await supabase
        .from('client_referrals')
        .select('*')
        .eq('referred_email', refereeEmail)
        .eq('status', 'pending')
        .maybeSingle()

      if (!referral) {
        return new Response(
          JSON.stringify({ success: false, message: 'No pending referral found for this user' }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
      }

      const rewardAmount = Number(referral.reward_kes) || 500

      // Update referral to rewarded
      await supabase
        .from('client_referrals')
        .update({
          status: 'rewarded',
          rewarded_at: new Date().toISOString(),
        })
        .eq('id', referral.id)

      // Credit referrer's discount balance in client_profiles
      const { data: referrerProfile } = await supabase
        .from('client_profiles')
        .select('discount_balance_kes')
        .eq('email', referral.referrer_email)
        .maybeSingle()

      const currentBalance = Number(referrerProfile?.discount_balance_kes) || 0
      const newBalance = currentBalance + rewardAmount

      await supabase
        .from('client_profiles')
        .update({
          discount_balance_kes: newBalance,
          updated_at: new Date().toISOString(),
        })
        .eq('email', referral.referrer_email)

      return new Response(
        JSON.stringify({
          success: true,
          message: `Referrer ${referral.referrer_email} credited KES ${rewardAmount}`,
          rewardAmount,
          newReferrerBalance: newBalance,
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    return new Response(JSON.stringify({ error: 'Unknown action' }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err?.message || 'Server error' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})
