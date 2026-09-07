-- ============================================================================
-- PAPER STREET WORKSPACES - SETUP CONTACT INQUIRIES & LOCATION WAITLIST TABLES
-- RUN THIS SCRIPT DIRECTLY IN SUPABASE SQL EDITOR
-- ============================================================================

-- 1. CONTACT SUBMISSIONS TABLE
CREATE TABLE IF NOT EXISTS contact_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  company TEXT,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  location TEXT NOT NULL,
  service TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'new', -- 'new', 'contacted', 'in_progress', 'resolved', 'closed'
  user_acknowledged BOOLEAN NOT NULL DEFAULT false,
  user_acknowledged_at TIMESTAMPTZ,
  admin_notified BOOLEAN NOT NULL DEFAULT false,
  admin_notified_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_contact_submissions_email ON contact_submissions(email);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_created_at ON contact_submissions(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_status ON contact_submissions(status);

ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public insert for contact_submissions" ON contact_submissions;
CREATE POLICY "Allow public insert for contact_submissions" 
ON contact_submissions FOR INSERT 
TO public 
WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public read contact_submissions" ON contact_submissions;
CREATE POLICY "Allow public read contact_submissions" 
ON contact_submissions FOR SELECT 
TO public 
USING (true);

DROP POLICY IF EXISTS "Service role full access on contact_submissions" ON contact_submissions;
CREATE POLICY "Service role full access on contact_submissions" 
ON contact_submissions FOR ALL 
TO service_role 
USING (true) 
WITH CHECK (true);


-- 2. LOCATION WAITLISTS TABLE
CREATE TABLE IF NOT EXISTS location_waitlists (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  company TEXT,
  location TEXT NOT NULL, -- 'Nairobi', 'Mombasa', 'Nakuru', 'Eldoret', 'Kisumu'
  service_interest TEXT NOT NULL DEFAULT 'Virtual Office',
  team_size TEXT DEFAULT '1-5',
  estimated_launch_need TEXT DEFAULT 'Within 1-3 months',
  notes TEXT,
  status TEXT NOT NULL DEFAULT 'waitlisted',
  user_acknowledged BOOLEAN NOT NULL DEFAULT false,
  user_acknowledged_at TIMESTAMPTZ,
  admin_notified BOOLEAN NOT NULL DEFAULT false,
  admin_notified_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_location_waitlists_email ON location_waitlists(email);
CREATE INDEX IF NOT EXISTS idx_location_waitlists_location ON location_waitlists(location);
CREATE INDEX IF NOT EXISTS idx_location_waitlists_created_at ON location_waitlists(created_at DESC);

ALTER TABLE location_waitlists ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public insert for location_waitlists" ON location_waitlists;
CREATE POLICY "Allow public insert for location_waitlists" 
ON location_waitlists FOR INSERT 
TO public 
WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public read location_waitlists" ON location_waitlists;
CREATE POLICY "Allow public read location_waitlists" 
ON location_waitlists FOR SELECT 
TO public 
USING (true);

DROP POLICY IF EXISTS "Service role full access on location_waitlists" ON location_waitlists;
CREATE POLICY "Service role full access on location_waitlists" 
ON location_waitlists FOR ALL 
TO service_role 
USING (true) 
WITH CHECK (true);
