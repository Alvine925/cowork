-- ============================================================================
-- PAPER STREET WORKSPACES - OFFICE MANAGEMENT REQUESTS TABLE
-- Migration: 20261104_create_office_management_table.sql
-- ============================================================================

CREATE TABLE IF NOT EXISTS office_management_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_name TEXT NOT NULL,
  contact_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  location TEXT NOT NULL,
  employees TEXT NOT NULL,
  requirements TEXT NOT NULL,
  facilities TEXT,
  start_date TEXT,
  contract_duration TEXT,
  additional_info TEXT,
  status TEXT NOT NULL DEFAULT 'new', -- 'new', 'in_review', 'proposal_sent', 'contract_signed', 'closed'
  user_acknowledged BOOLEAN NOT NULL DEFAULT false,
  user_acknowledged_at TIMESTAMPTZ,
  admin_notified BOOLEAN NOT NULL DEFAULT false,
  admin_notified_at TIMESTAMPTZ,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes for efficient queries
CREATE INDEX IF NOT EXISTS idx_office_mgmt_email ON office_management_requests(email);
CREATE INDEX IF NOT EXISTS idx_office_mgmt_created_at ON office_management_requests(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_office_mgmt_status ON office_management_requests(status);
CREATE INDEX IF NOT EXISTS idx_office_mgmt_location ON office_management_requests(location);

-- Enable RLS
ALTER TABLE office_management_requests ENABLE ROW LEVEL SECURITY;

-- Allow public insert
DROP POLICY IF EXISTS "Allow public insert for office_management_requests" ON office_management_requests;
CREATE POLICY "Allow public insert for office_management_requests" 
ON office_management_requests FOR INSERT 
TO public 
WITH CHECK (true);

-- Allow public read
DROP POLICY IF EXISTS "Allow public read office_management_requests" ON office_management_requests;
CREATE POLICY "Allow public read office_management_requests" 
ON office_management_requests FOR SELECT 
TO public 
USING (true);

-- Allow service role full access
DROP POLICY IF EXISTS "Service role full access on office_management_requests" ON office_management_requests;
CREATE POLICY "Service role full access on office_management_requests" 
ON office_management_requests FOR ALL 
TO service_role 
USING (true) 
WITH CHECK (true);

-- Auto-update updated_at trigger
CREATE OR REPLACE FUNCTION update_office_mgmt_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_office_mgmt_updated_at ON office_management_requests;
CREATE TRIGGER trigger_office_mgmt_updated_at
  BEFORE UPDATE ON office_management_requests
  FOR EACH ROW
  EXECUTE FUNCTION update_office_mgmt_updated_at();

COMMENT ON TABLE office_management_requests IS 'Inquiries and proposal requests for Paper Street fully managed offices';

