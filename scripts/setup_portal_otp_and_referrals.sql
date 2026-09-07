-- ==============================================================================
-- PAPER STREET WORKSPACES: CLIENT PORTAL & OTP AUTHENTICATION SCHEMA
-- ==============================================================================

-- 1. Client Auth OTPs Table (Temporary 6-digit verification codes)
CREATE TABLE IF NOT EXISTS public.client_auth_otps (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT NOT NULL,
    otp_code TEXT NOT NULL,
    full_name TEXT,
    phone TEXT,
    company TEXT,
    expires_at TIMESTAMPTZ NOT NULL,
    verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_client_auth_otps_email ON public.client_auth_otps(email);
CREATE INDEX IF NOT EXISTS idx_client_auth_otps_code ON public.client_auth_otps(otp_code);

-- 2. Client Profiles Table (Persistent Client Accounts)
CREATE TABLE IF NOT EXISTS public.client_profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT UNIQUE NOT NULL,
    full_name TEXT NOT NULL,
    phone TEXT,
    company TEXT,
    portal_type TEXT DEFAULT 'client', -- 'client' or 'member'
    referral_code TEXT UNIQUE,
    discount_balance_kes NUMERIC DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_client_profiles_email ON public.client_profiles(email);
CREATE INDEX IF NOT EXISTS idx_client_profiles_referral ON public.client_profiles(referral_code);

-- 3. Client Referrals Table (Referral Tracking & Rewards)
CREATE TABLE IF NOT EXISTS public.client_referrals (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    referrer_email TEXT NOT NULL,
    referred_email TEXT NOT NULL,
    referral_code TEXT NOT NULL,
    status TEXT DEFAULT 'pending', -- 'pending', 'rewarded', 'expired'
    reward_kes NUMERIC DEFAULT 500,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    rewarded_at TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS idx_client_referrals_referrer ON public.client_referrals(referrer_email);
CREATE INDEX IF NOT EXISTS idx_client_referrals_code ON public.client_referrals(referral_code);

-- 4. Client Feedback & Concerns Desk Table
CREATE TABLE IF NOT EXISTS public.client_feedback (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id TEXT,
    client_name TEXT NOT NULL,
    client_email TEXT NOT NULL,
    client_phone TEXT,
    location TEXT DEFAULT 'Kisumu CBD',
    category TEXT DEFAULT 'general', -- 'facility', 'wifi', 'meeting_room', 'billing', 'urgent_concern', 'general'
    priority TEXT DEFAULT 'normal',   -- 'low', 'normal', 'high', 'urgent'
    subject TEXT NOT NULL,
    message TEXT NOT NULL,
    status TEXT DEFAULT 'open',       -- 'open', 'in_progress', 'resolved', 'closed'
    admin_response TEXT,
    admin_notified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    resolved_at TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS idx_client_feedback_email ON public.client_feedback(client_email);
CREATE INDEX IF NOT EXISTS idx_client_feedback_status ON public.client_feedback(status);

-- 5. Row Level Security Policies
ALTER TABLE public.client_auth_otps ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.client_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.client_referrals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.client_feedback ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public insert client_auth_otps" ON public.client_auth_otps;
CREATE POLICY "Public insert client_auth_otps" ON public.client_auth_otps FOR INSERT TO public WITH CHECK (true);

DROP POLICY IF EXISTS "Public select client_auth_otps" ON public.client_auth_otps;
CREATE POLICY "Public select client_auth_otps" ON public.client_auth_otps FOR SELECT TO public USING (true);

DROP POLICY IF EXISTS "Public update client_auth_otps" ON public.client_auth_otps;
CREATE POLICY "Public update client_auth_otps" ON public.client_auth_otps FOR UPDATE TO public USING (true);

DROP POLICY IF EXISTS "Public all client_profiles" ON public.client_profiles;
CREATE POLICY "Public all client_profiles" ON public.client_profiles FOR ALL TO public USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Public all client_referrals" ON public.client_referrals;
CREATE POLICY "Public all client_referrals" ON public.client_referrals FOR ALL TO public USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Public all client_feedback" ON public.client_feedback;
CREATE POLICY "Public all client_feedback" ON public.client_feedback FOR ALL TO public USING (true) WITH CHECK (true);
