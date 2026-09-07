-- ============================================================================
-- PAPER STREET WORKSPACES - MEMBERSHIP QUOTES TABLE
-- ============================================================================

CREATE TABLE IF NOT EXISTS quote_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  quote_reference TEXT NOT NULL UNIQUE,
  service_slug TEXT NOT NULL,
  service_title TEXT NOT NULL,
  tier_name TEXT NOT NULL,
  commitment_period TEXT NOT NULL,
  duration_months INTEGER NOT NULL DEFAULT 1,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  monthly_rate_kes NUMERIC(10, 2) NOT NULL DEFAULT 0,
  total_commitment_kes NUMERIC(10, 2) NOT NULL DEFAULT 0,
  deposit_amount_kes NUMERIC(10, 2) NOT NULL DEFAULT 0,
  team_size INTEGER NOT NULL DEFAULT 1,
  company_name TEXT,
  client_name TEXT NOT NULL,
  client_email TEXT NOT NULL,
  client_phone TEXT NOT NULL,
  additional_requirements TEXT,
  status TEXT NOT NULL DEFAULT 'quote_sent',  -- 'quote_sent', 'contacted', 'agreement_issued', 'converted', 'closed'
  email_sent BOOLEAN NOT NULL DEFAULT false,
  email_sent_at TIMESTAMPTZ,
  admin_alert_sent BOOLEAN NOT NULL DEFAULT false,
  admin_alert_sent_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE quote_requests ENABLE ROW LEVEL SECURITY;

-- Allow public quote submissions
CREATE POLICY "Allow public insert for quote_requests" 
ON quote_requests FOR INSERT 
TO public 
WITH CHECK (true);

-- Allow reading quote by reference
CREATE POLICY "Allow public read quote by reference" 
ON quote_requests FOR SELECT 
TO public 
USING (true);

-- Allow service role full access
CREATE POLICY "Service role full access on quote_requests" 
ON quote_requests FOR ALL 
TO service_role 
USING (true) 
WITH CHECK (true);
