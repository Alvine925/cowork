-- ============================================================================
-- PAPER STREET KISUMU CBD - SYSTEM SETTINGS & CREDENTIALS TABLE
-- RUN THIS SCRIPT IN THE SUPABASE SQL EDITOR
-- ============================================================================

-- 1. CREATE SYSTEM SETTINGS TABLE
CREATE TABLE IF NOT EXISTS system_settings (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL,
  description TEXT,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. ENABLE ROW LEVEL SECURITY
ALTER TABLE system_settings ENABLE ROW LEVEL SECURITY;

-- 3. RLS POLICIES FOR SYSTEM SETTINGS
-- Allow public read so server routes with anon key can fetch credentials
DROP POLICY IF EXISTS "Allow public read system_settings" ON system_settings;
CREATE POLICY "Allow public read system_settings" ON system_settings FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow public insert update system_settings" ON system_settings;
CREATE POLICY "Allow public insert update system_settings" ON system_settings FOR ALL USING (true) WITH CHECK (true);

-- 4. INSERT OR UPDATE DEFAULT CONFIGURATION KEYS
-- Replace the values below with your actual live/test keys in Supabase SQL editor:
INSERT INTO system_settings (key, value, description)
VALUES
  ('paystack_secret_key', 'sk_test_placeholder_replace_with_your_paystack_secret_key', 'Paystack Secret API Key for payment verification'),
  ('paystack_public_key', 'pk_test_placeholder_replace_with_your_paystack_public_key', 'Paystack Public API Key for client transactions'),
  ('brevo_api_key', 'xkeysib-placeholder_replace_with_your_brevo_api_key', 'Brevo (Sendinblue) Transactional API Key'),
  ('brevo_sender_name', 'Paper Street Workspaces', 'Sender name displayed in transactional confirmation emails'),
  ('brevo_sender_email', 'hello@paperstreet.africa', 'Verified Brevo sender email address'),
  ('admin_email', 'otienoalvine925@gmail.com', 'Admin email address for real-time booking alerts and reports')
ON CONFLICT (key) DO UPDATE SET
  value = EXCLUDED.value,
  description = EXCLUDED.description,
  updated_at = NOW();

-- 5. ENSURE COLUMNS EXIST IN CLIENT_BOOKINGS
ALTER TABLE client_bookings 
  ADD COLUMN IF NOT EXISTS paystack_reference TEXT,
  ADD COLUMN IF NOT EXISTS currency TEXT NOT NULL DEFAULT 'KES',
  ADD COLUMN IF NOT EXISTS payment_channel TEXT,
  ADD COLUMN IF NOT EXISTS email_sent BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS admin_alert_sent BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS email_sent_at TIMESTAMPTZ;

-- 6. CREATE INDEX FOR FAST PAYSTACK LOOKUP
CREATE INDEX IF NOT EXISTS idx_client_bookings_paystack_ref ON client_bookings(paystack_reference);
